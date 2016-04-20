# GameStart App
###### Final Project | Module 2 / Cross-Platform Block | Infnet Master in Technology - Mobile Development

GameStart is a catalog for console games and a social network for people who enjoy collecting and playing game.

## API Keys & Login Client IDs

Changes necessary before using/running this project:
* Rename the file **constants-template.js** to **constants.js** on "www/js/" and change **&#60;GOOGLE_CLIENT_ID&#62;** and **&#60;FACEBOOK_CLIENT_ID&#62;** to your app credentials

## Configuring ngCordovaOAuth to work with Google and Facebook

#### Google Step By Step
1. Go to the [Google Developers Console](https://console.developers.google.com/projectselector/apis/library).
From the project drop-down, select an existing [project](https://support.google.com/cloud/answer/6158853), or create a new one by selecting **Create a new project**.
3. In the sidebar under "API Manager", select **Credentials**, then select the OAuth consent screen tab.
  * Choose an **Email Address**, specify a **Product Name**, and press **Save**.
4. In the **Credentials** tab, select the **New credentials** drop-down list, and choose **OAuth client ID**.
5. Under **Application type**, select **Web application**.
Register the origins from which your app is allowed to access the Google APIs, as follows. An origin is a unique combination of protocol, hostname, and port.
  * In the **Authorized JavaScript origins** field, enter the origin for ngCordovaOAuth: **https://localhost**
  * In the **Authorized redirect URIs** field, enter the redirect URI for ngCordovaOAuth: **http://localhost/callback**
  * Press the Create button.
<img src="https://github.com/biamacedo/gamestart-ionic/blob/master/assets/google_sign_in_configuration.png" width="200">
6. From the resulting OAuth client dialog box, copy the Client ID to paste it on the **constants.js** file. The Client ID lets your app access enabled Google APIs.
Now you can try Google Sign-In on the app.

#### Facebook Step By Step
1. Go to the [Facebook Developers Console](https://developers.facebook.com/).
2. Click on **Create a new app**.
3. Select **Website** Platform.
4. If on Quick Start, click on Skip Quick Start.
5. Go to the **Settings** page.
6. Go to the **Basic** page if not already there.
(Optional: Copy the **App ID** to paste it on the **constants.js** file)
7. On **App Domains**, add ngCordovaOAuth domain: **localhost**
8. On **Site URL**, add ngCordovaOAuth url: **http://localhost/callback**
9. Go to the **Advanced** page.
10. Go to the **Client OAuth Settings** section.
11. Enable **Client OAuth Login**, **Web OAuth Login** and **Embedded Browser OAuth Login**.
12. On **Valid OAuth redirect URIs**, add ngCordovaOAuth redirect URI: **http://localhost/callback**
<img src="https://github.com/biamacedo/gamestart-ionic/blob/master/assets/facebook_sign_in_configuration.png" width="200">
12. To finish click on **Save Changes**.

## Functionalities

## Frameworks & Libraries

## Device Sensors

## Plugins Used

* [cordova-plugin-whitelist](https://github.com/apache/cordova-plugin-whitelist)
* [cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser), used on the Facebook Login only
* [cordova-plugin-dialogs](https://github.com/apache/cordova-plugin-dialogs) for native alert dialogs
* [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera), used for the user to take pictures and add them to their comments
* [cordova-plugin-splashscreen](https://github.com/apache/cordova-plugin-splashscreen)


> To add plugins use the following command on terminal:
> ```
> cordova plugin add <plugin-name> --save
> ```
> To list plugins installed use the following command on terminal:
> ```
> cordova plugin list
> ```

## Pre-Requisites

* [Node.js](https://nodejs.org/) installed
* [Apache Cordova](https://cordova.apache.org/) installed
* [Ionic](http://ionicframework.com/) installed

> To install Apache Cordova and Ionic use the following command on terminal:
> ```
> npm install -g cordova ionic
> ```

## Steps to run

1. Clone repository
2. Add platforms using: ```ionic platforms add <browser/android/ios>```
3. Run app using: ```ionic run <browser/android/ios>```

## Screen Shots

* * *

*Author: Beatriz Macedo*
