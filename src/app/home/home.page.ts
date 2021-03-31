import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    appInfo: AppInfo = { appName: "null", packageName: "null", versionCode: "null", versionNumber: "null" };
    AppName: string;
    constructor(public appVersion: AppVersion) {

    }

    print() {
        this.appVersion.getAppName().then(x => this.AppName = x).catch(err => { alert(err); });
        this.appVersion.getAppName().then(x => this.appInfo.appName = x);
        this.appVersion.getPackageName().then(x => this.appInfo.packageName = x);
        this.appVersion.getVersionCode().then(x => this.appInfo.versionCode = x);
        this.appVersion.getVersionNumber().then(x => this.appInfo.versionNumber = x);
    }

}

interface AppInfo {
    appName: string,
    packageName: string,
    versionCode: string | number,
    versionNumber: string
}