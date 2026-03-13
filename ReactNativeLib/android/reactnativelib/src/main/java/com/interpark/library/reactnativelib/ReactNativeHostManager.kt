package com.interpark.library.reactnativelib

import android.app.Application
import com.callstack.reactnativebrownfield.OnJSBundleLoaded
import com.callstack.reactnativebrownfield.ReactNativeBrownfield
import com.facebook.react.PackageList
import com.facebook.react.ReactPackage
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative

object ReactNativeHostManager {
    fun initialize(application: Application, reactPackageList: ArrayList<ReactPackage>? = null, onJSBundleLoaded: OnJSBundleLoaded? = null) {
        loadReactNative(application) // **Only required for RN >= 0.80.0**

        val packageList = PackageList(application).packages.apply { 
            reactPackageList?.let { addAll(it) }
         }
        ReactNativeBrownfield.initialize(application, packageList, onJSBundleLoaded)
    }
}