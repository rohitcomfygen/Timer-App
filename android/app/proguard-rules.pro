# Add project-specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt

# Keep classes related to Zego
-keep class **.zego.** { *; }
-keep class **.**.zego_zpns.** { *; }

# Keep classes for Flutter CallKit Incoming
-keep class com.hiennv.flutter_callkit_incoming.SharedPreferencesUtils* { *; }

# Keep Jackson classes
-keep class com.fasterxml.jackson.** { *; }
-dontwarn com.fasterxml.jackson.databind.ext.Java7SupportImpl
-dontwarn com.fasterxml.jackson.databind.ext.DOMSerializer
-dontwarn java.beans.**
-keep class java.beans.** { *; }

# Keep Google Play Services classes
-keep class com.google.android.gms.common.** { *; }

# Keep Google Firebase Services classes
-keepattributes *Annotation*
-keep class com.google.firebase.** { *; }
-keep class com.crashlytics.** { *; }
-keep class io.fabric.** { *; }


# Retain the PushProvisioningActivity class (Stripe)
-keep class com.stripe.android.pushProvisioning.PushProvisioningActivity$g { *; }
-keep class com.stripe.android.pushProvisioning.* { *; }

# Suppress warnings for Stripe Push Provisioning
-dontwarn com.stripe.android.pushProvisioning.PushProvisioningActivityStarter$Args
-dontwarn com.stripe.android.pushProvisioning.PushProvisioningActivityStarter$Error
-dontwarn com.stripe.android.pushProvisioning.PushProvisioningActivityStarter
-dontwarn com.stripe.android.pushProvisioning.PushProvisioningEphemeralKeyProvider
-dontwarn com.stripe.android.pushProvisioning.**

# Keep XML DOM classes
-dontwarn org.w3c.dom.bootstrap.DOMImplementationRegistry
-keep class org.w3c.dom.bootstrap.DOMImplementationRegistry { *; }
