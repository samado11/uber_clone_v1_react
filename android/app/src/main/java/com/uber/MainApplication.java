package com.uber;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Arrays;

 public class MainApplication extends NavigationApplication {
 
     @Override
     protected ReactGateway createReactGateway() {
         ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
             @Override
             protected String getJSMainModuleName() {
                 return "index";
             }
         };
         return new ReactGateway(this, isDebug(), host);
     }
 
     @Override
     public boolean isDebug() {
         return BuildConfig.DEBUG;
     }
 
     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             new GeolocationPackage(),
             new AsyncStoragePackage(),
             new MapsPackage(),
             new FBSDKPackage(),
             new ReactNativeFirebaseAppPackage(),
             new ReactNativeFirebaseAuthPackage()
         );
     }
 
     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }
 }
