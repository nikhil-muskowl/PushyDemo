import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
declare var Pushy: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      document.addEventListener('deviceready', function () {
        // Start the Pushy service
        Pushy.listen();
        Pushy.requestStoragePermission();

        Pushy.register(function (err, deviceToken) {
          // Handle registration errors
          if (err) {
            return console.log(err);
          }

          // Display an console with device token
          console.log('Pushy device token: ' + deviceToken);

          // Send the token to your backend server via an HTTP GET request
          //await fetch('https://your.api.hostname/register/device?token=' + deviceToken);

          // Succeeded, optionally do something to alert the user
        });
      });

      Pushy.setNotificationListener(function (data) {
        // Print notification payload data
        console.log('Received notification: ' + JSON.stringify(data));
    
        // Display an alert with the "message" payload value
        console.log(data.message);
    });
    });
  }
}

