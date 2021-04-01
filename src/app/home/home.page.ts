import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    deviceInfo: any;
    appInfo: AppInfo = { appName: "null", packageName: "null", versionCode: "null", versionNumber: "null" };
    AppName: string;
    constructor(
        private platform: Platform,
        public appVersion: AppVersion,
        public device: Device
    ) {
        this.platform.ready().then(() => {
            alert("cordova : " +  this.device.cordova);
            alert("isVirtual : " +  this.device.isVirtual);
            alert("manufacturer : " +  this.device.manufacturer);
            alert("model : " +  this.device.model);
            alert("platform : " +  this.device.platform);
            alert("serial : " +  this.device.serial);
            alert("uuid : " +  this.device.uuid);
            alert("version : " +  this.device.version);
        });
    }

    print() {
        this.appVersion.getAppName().then(x => this.AppName = x).catch(err => { alert(err); });
        this.appVersion.getAppName().then(x => this.appInfo.appName = x);
        this.appVersion.getPackageName().then(x => this.appInfo.packageName = x);
        this.appVersion.getVersionCode().then(x => this.appInfo.versionCode = x);
        this.appVersion.getVersionNumber().then(x => this.appInfo.versionNumber = x);

        this.deviceInfo = this.device;
    }

}

interface AppInfo {
    appName: string,
    packageName: string,
    versionCode: string | number,
    versionNumber: string
}