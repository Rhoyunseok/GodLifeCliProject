package com.godlifeapp

import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.util.Base64
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import com.facebook.react.bridge.*
import java.io.ByteArrayOutputStream

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
        val label = pm.getApplicationLabel(app).toString()
        val packageName = app.packageName
        val iconDrawable = pm.getApplicationIcon(app)

        val iconBase64 = drawableToBase64(iconDrawable)

        val appInfo = WritableNativeMap()
        appInfo.putString("label", label)
        appInfo.putString("packageName", packageName)
        appInfo.putString("icon", iconBase64)

        appList.pushMap(appInfo)
      }

      promise.resolve(appList)
    } catch (e: Exception) {
      promise.reject("APP_LIST_ERROR", e.message)
    }
  }

  private fun drawableToBase64(drawable: Drawable): String {
    val bitmap = if (drawable is BitmapDrawable) {
      drawable.bitmap
    } else {
      val bmp = Bitmap.createBitmap(
        drawable.intrinsicWidth.coerceAtLeast(1),
        drawable.intrinsicHeight.coerceAtLeast(1),
        Bitmap.Config.ARGB_8888
      )
      val canvas = Canvas(bmp)
      drawable.setBounds(0, 0, canvas.width, canvas.height)
      drawable.draw(canvas)
      bmp
    }

    val stream = ByteArrayOutputStream()
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
    val byteArray = stream.toByteArray()
    return Base64.encodeToString(byteArray, Base64.NO_WRAP)
  }
}
