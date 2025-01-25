# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# 기본적으로 모든 코드 난독화를 비활성화
-dontobfuscate

# 기본적으로 모든 코드 최적화 비활성화
-dontoptimize

# 모든 클래스가 난독화되지 않도록 하기 위해 추가적인 keep 규칙을 적용
-keep class * {
    *;
}
