package com.godlifeapp

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.*

class BlockListModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val prefs: SharedPreferences = reactContext.getSharedPreferences("blocklist", Context.MODE_PRIVATE)

  override fun getName(): String = "BlockList"

  @ReactMethod
  fun setBlockedApps(packageNames: ReadableArray) {
    val editor = prefs.edit()
    val set = mutableSetOf<String>()
    for (i in 0 until packageNames.size()) {
      set.add(packageNames.getString(i) ?: "")
    }
    editor.putStringSet("blocked_apps", set)
    editor.apply()
  }

  fun getBlockedApps(): Set<String> {
    return prefs.getStringSet("blocked_apps", emptySet()) ?: emptySet()
  }
}
