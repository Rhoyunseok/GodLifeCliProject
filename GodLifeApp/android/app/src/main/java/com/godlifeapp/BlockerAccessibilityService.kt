package com.godlifeapp

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.content.Intent
import android.content.Context
import android.widget.Toast

class BlockerAccessibilityService : AccessibilityService() {

  override fun onAccessibilityEvent(event: AccessibilityEvent) {
    if (event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
      val packageName = event.packageName?.toString() ?: return

      // SharedPreferences에서 차단 리스트 불러오기
      val prefs = getSharedPreferences("blocklist", Context.MODE_PRIVATE)
      val blockedApps = prefs.getStringSet("blocked_apps", emptySet()) ?: emptySet()

      if (blockedApps.contains(packageName)) {
        // 사용자에게 알림
        Toast.makeText(this, "이 앱은 제한되어 있어요", Toast.LENGTH_SHORT).show()

        // 홈 화면으로 강제 이동
        val intent = Intent(Intent.ACTION_MAIN)
        intent.addCategory(Intent.CATEGORY_HOME)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        startActivity(intent)
      }
    }
  }

  override fun onInterrupt() {
    // 접근성 서비스가 중단될 때 처리 (필요시 사용)
  }
}
