package com.godlifeapp

import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.*

class AccessibilityHelperModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val context = reactContext

  override fun getName(): String = "AccessibilityHelper"

  @ReactMethod
  fun openAccessibilitySettings() {
    val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
    context.startActivity(intent)
  }
}
