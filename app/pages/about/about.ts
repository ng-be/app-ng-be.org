// 3d party imports
import { Component } from '@angular/core';
import { PopoverController, ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list style="margin-bottom:0;">
      <button ion-item (click)="openUp('https://ng-be.org')">NG-BE 2016 website</button>
      <button ion-item (click)="openUp('https://github.com/ng-be')">Github repositories</button>
    </ion-list>
  `
})
class PopoverPage {

  constructor(public viewCtrl: ViewController) {
  }

  openUp(url) {
    window.open(url, '_system');
    this.viewCtrl.dismiss();
  }

}

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {

  conferenceDate = '2047-05-17';

  constructor(public popoverCtrl: PopoverController) {
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: event});
  }

}
