import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    date: any = new Date();
    constructor(
    ) {
        console.log(new Date())


    }

}