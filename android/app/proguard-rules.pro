-keep public class com.facebook.react.** { public *; }
-keep public class com.facebook.debug.holder.** { public *; }
-keep public class com.facebook.hermes.unicode.** { public *; }
-keep public class com.facebook.jni.** { public *; }
-keepclasseswithmembernames class * {
    native <methods>;
}
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
