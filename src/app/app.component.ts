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

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.checkCodePush();
        });
    }
    // 检查热更新
    checkCodePush() {
        this.codePush.sync({
            installMode: InstallMode.ON_NEXT_RESUME,
            updateDialog: {
                mandatoryUpdateMessage: "必须更新后才能使用",
                mandatoryContinueButtonLabel: "立即更新",
                optionalInstallButtonLabel: "立即更新",
                optionalIgnoreButtonLabel: "下次再说",
                optionalUpdateMessage: "是否马上更新？",
                updateTitle: "发现新版本",
            }
        }).subscribe((syncStatus) => {
            if (syncStatus == 7) {
                alert('更新中，请不要退出应用')
            }
        }, err => { alert('错误' + err); });
    }
}