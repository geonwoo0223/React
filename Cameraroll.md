# Cameraroll

> https://www.npmjs.com/package/@react-native-community/cameraroll

```bash
yarn add @react-native-community/cameraroll

yarn add react-native-unimodules

yarn add fbjs
```



1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.reactnativecommunity.cameraroll.CameraRollPackage;` to the imports at the top of the file
- Add `new CameraRollPackage()` to the list returned by the `getPackages()` method

1. Append the following lines to

    

   ```
   android/settings.gradle
   ```

   ```
   include ':@react-native-community_cameraroll'
   project(':@react-native-community_cameraroll').projectDir = new File(rootProject.projectDir, 	'../node_modules/@react-native-community/cameraroll/android')
   ```

2. Insert the following lines inside the dependencies block in

    

   ```
   android/app/build.gradle
   ```

   ```
     compile project(':@react-native-community_cameraroll')
   ```

Starting with Android 10, the concept of [scoped storage](https://developer.android.com/training/data-storage#scoped-storage) is introduced. Currently, to make it working with that change, you have to add `android:requestLegacyExternalStorage="true"` to `AndroidManifest.xml`:

```
<manifest ... >
  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```



permission

```
<manifest>
...
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
...
<application
 ...
 android:requestLegacyExternalStorage="true"
 >
```

