import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push/ngx';
import { Device } from '@ionic-native/device/ngx';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    deviceInfo: any;
    appInfo: AppInfo = { appName: "null", packageName: "null", versionCode: "null", versionNumber: "null" };
    AppName: string;
    curPackage: any;
    constructor(
        private platform: Platform,
        public appVersion: AppVersion,
        public codePush: CodePush,
        public device: Device,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController
    ) {
    }

    codePushResponse: any;

    async print() {
        this.appVersion.getAppName().then(x => this.AppName = x).catch(err => { alert(err); });
        this.appVersion.getAppName().then(x => this.appInfo.appName = x);
        this.appVersion.getPackageName().then(x => this.appInfo.packageName = x);
        this.appVersion.getVersionCode().then(x => this.appInfo.versionCode = x);
        this.appVersion.getVersionNumber().then(x => this.appInfo.versionNumber = x);
        this.appInfo.appName = await this.appVersion.getAppName();
        this.appInfo.packageName = await this.appVersion.getPackageName();
        this.appInfo.versionCode = await this.appVersion.getVersionCode();
        this.appInfo.versionNumber = await this.appVersion.getVersionNumber();
        this.deviceInfo = this.device;
    }



    checkForUpdate() {
        this.platform.ready().then(() => {
            this.codePush.checkForUpdate().then((x) => {
                this.codePushResponse = JSON.stringify(x);
            });
        });
    }

    getCurrentPackage() {
        this.platform.ready().then(() => {
            this.codePush.getCurrentPackage().then((x) => {
                this.codePushResponse = JSON.stringify(x);
                this.curPackage = x;
            });
        });
    }

    getPendingPackage() {
        this.platform.ready().then(() => {
            this.codePush.getPendingPackage().then((x) => {
                this.codePushResponse = JSON.stringify(x);
            });
        });
    }

    notifyApplicationReady() {
        this.platform.ready().then(() => {
            this.codePush.notifyApplicationReady().then((x) => {
                this.codePushResponse = JSON.stringify(x);
            });
        });
    }

    restartApplication() {
        this.platform.ready().then(() => {
            this.codePush.restartApplication().then((x) => {
                this.codePushResponse = JSON.stringify(x);
            });
        });
    }

    async sync() {
        // const loading = await this.loadingCtrl.create({
        //     message: "Updateing now...",
        //     duration: 30000,
        //     translucent: true,
        //     backdropDismiss: false
        // });

        // this.platform.ready().then(() => {
        //     this.codePush.sync(
        //         {
        //             installMode: InstallMode.IMMEDIATE,
        //             updateDialog: {
        //                 mandatoryUpdateMessage: "Force Update",
        //                 mandatoryContinueButtonLabel: "Update Now",
        //                 optionalInstallButtonLabel: "Update Now",
        //                 optionalIgnoreButtonLabel: "Skip",
        //                 optionalUpdateMessage: "Update Now？",
        //                 updateTitle: "An new version available",
        //             }
        //         },
        //         (progress) => alert(JSON.stringify(progress))
        //     ).subscribe(async (syncStatus: SyncStatus) => {
        //         this.codePushResponse = JSON.stringify(syncStatus);
        //         if (syncStatus == SyncStatus.DOWNLOADING_PACKAGE) {
        //             loading.present();
        //         }
        //     }, err => {
        //         loading.dismiss().then(async () => {
        //             const toast = await this.toastCtrl.create({
        //                 message: "Update error, Please contact admin!",
        //                 color: "danger",
        //                 position: "top",
        //                 duration: 5000
        //             });
        //             toast.present();
        //         })
        //     }, () => this.codePush.restartApplication());
        // });

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
        const loading = await this.loadingCtrl.create({
            message: "Updateing now...",
            duration: 30000,
            translucent: true,
            backdropDismiss: false
        });

        this.platform.ready().then(() => {
            this.codePush.sync(
                {
                    installMode: InstallMode.ON_NEXT_RESTART,
                    updateDialog: true
                },
                (progress) => console.log(JSON.stringify(progress))
            ).subscribe(async (syncStatus: SyncStatus) => {
                this.codePushResponse = JSON.stringify(syncStatus);
                if (syncStatus == SyncStatus.DOWNLOADING_PACKAGE) {
                    loading.present();
                }
            }, err => {
                loading.dismiss().then(async () => {
                    const toast = await this.toastCtrl.create({
                        message: "Update error, Please contact admin!",
                        color: "danger",
                        position: "top",
                        duration: 5000
                    });
                    toast.present();
                })
            }, () => this.codePush.restartApplication());
        });
    }
}

// enum SyncStatus {
//     UP_TO_DATE = 0,
//     UPDATE_INSTALLED = 1,
//     UPDATE_IGNORED = 2,
//     ERROR = 3,
//     IN_PROGRESS = 4,
//     CHECKING_FOR_UPDATE = 5,
//     AWAITING_USER_ACTION = 6,
//     DOWNLOADING_PACKAGE = 7,
//     INSTALLING_UPDATE = 8
// }

interface AppInfo {
    appName: string,
    packageName: string,
    versionCode: string | number,
    versionNumber: string
}