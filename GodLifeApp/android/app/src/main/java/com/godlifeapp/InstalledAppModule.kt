package com.godlifeapp

import android.content.pm.PackageManager
import com.facebook.react.bridge.*

class InstalledAppsModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "InstalledApps"

  @ReactMethod
  fun getInstalledApps(promise: Promise) {
    try {
      val pm = reactApplicationContext.packageManager
      val packages = pm.getInstalledApplications(PackageManager.GET_META_DATA)

      val appList = WritableNativeArray()

      for (app in packages) {
        // 실행 가능한 앱만 필터링
        val launchIntent = pm.getLaunchIntentForPackage(app.packageName)
        if (launchIntent != null) {
          val label = pm.getApplicationLabel(app).toString()
          val packageName = app.packageName

          val appInfo = WritableNativeMap()
          appInfo.putString("label", label)
          appInfo.putString("packageName", packageName)
          appList.pushMap(appInfo)
        }
      }

      promise.resolve(appList)
    } catch (e: Exception) {
      promise.reject("APP_LIST_ERROR", e.message)
    }
  }
}
