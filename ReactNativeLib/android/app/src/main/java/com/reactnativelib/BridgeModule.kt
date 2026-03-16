package com.reactnativelib

import com.facebook.fbreact.specs.NativeBridgeModuleSpec
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.Promise

class BridgeModule(reactContext: ReactApplicationContext) : NativeBridgeModuleSpec(reactContext) {

    override fun getName(): String = NAME

    override fun onClose() {
        // TODO: 네이티브 설정 화면 닫기 처리
        reactApplicationContext.currentActivity?.finish()
    }
    
    override fun getUserInfoAsync(promise: Promise?) {
    }

    companion object {
        const val NAME = "BridgeModule"
    }
}
