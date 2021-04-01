import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CodePush, InstallMode } from '@ionic-native/code-push/ngx';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private codePush: CodePush,
    ) {

        // this.initializeApp();
    }

    initializeApp() { 
        this.platform.ready().then(() => {
            this.checkCodePush();
        });
    }
    // 检查热更新
    checkCodePush() {
        this.codePush.sync({
            installMode: InstallMode.IMMEDIATE,
            updateDialog: {
                mandatoryUpdateMessage: "Force Update",
                mandatoryContinueButtonLabel: "Update Now",
                optionalInstallButtonLabel: "Update Now",
                optionalIgnoreButtonLabel: "Skip",
                optionalUpdateMessage: "Update Now？",
                updateTitle: "New Version Detective",
            }
        }).subscribe((syncStatus) => {
            if (syncStatus == 7) {
                alert('Do not close app, updating')
            }
        }, err => { alert('Error' + err); });
    }
}