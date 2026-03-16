import groovy.json.JsonOutput
import groovy.json.JsonSlurper

plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("com.facebook.react")
    id("com.callstack.react.brownfield")
    `maven-publish`
}

react {
    autolinkLibrariesWithApp()
}

android {
    namespace = "com.interpark.library.reactnativelib"
    compileSdk = 36

    defaultConfig {
        minSdk = 28

        buildConfigField("boolean", "IS_EDGE_TO_EDGE_ENABLED", properties["edgeToEdgeEnabled"].toString())
        buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", properties["newArchEnabled"].toString())
        buildConfigField("boolean", "IS_HERMES_ENABLED", properties["hermesEnabled"].toString())

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles("consumer-rules.pro")
    }

    publishing {
        multipleVariants {
            allVariants()
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    // Match your version of React Native
    api("com.facebook.react:react-android:0.84.1")
    // For React Native 0.84+:
    api("com.facebook.hermes:hermes-android:0.15.1")
}


publishing {
    publications {
        create<MavenPublication>("mavenAar") {
            groupId = "com.interpark.library"
            artifactId = "reactnativelib"
            version = "0.0.21-local"
            afterEvaluate {
                from(components.getByName("default"))
            }

            pom {
                withXml {
                    val dependenciesNode = (asNode().get("dependencies") as groovy.util.NodeList).first() as groovy.util.Node
                    dependenciesNode.children()
                        .filterIsInstance<groovy.util.Node>()
                        .filter { (it.get("groupId") as groovy.util.NodeList).text() == rootProject.name }
                        .forEach { dependenciesNode.remove(it) }
                }
            }
        }
    }

    repositories {
        mavenLocal()
    }
}

val moduleBuildDir: Directory = layout.buildDirectory.get()

tasks.register("removeDependenciesFromModuleFile") {
    doLast {
        file("$moduleBuildDir/publications/mavenAar/module.json").run {
            val json = inputStream().use { JsonSlurper().parse(it) as Map<String, Any> }
            (json["variants"] as? List<MutableMap<String, Any>>)?.forEach { variant ->
                (variant["dependencies"] as? MutableList<Map<String, Any>>)?.removeAll { it["group"] == rootProject.name }
            }
            writer().use { it.write(JsonOutput.prettyPrint(JsonOutput.toJson(json))) }
        }
    }
}

tasks.named("generateMetadataFileForMavenAarPublication") {
   finalizedBy("removeDependenciesFromModuleFile")
}