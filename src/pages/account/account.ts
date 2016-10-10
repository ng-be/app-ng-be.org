// 3d party imports
import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

// app imports
import { LoginPage } from '../';
import { UserDataService } from '../../services';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements AfterViewInit {

  username: string;

  constructor(private nav: NavController,
              private userData: UserDataService) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  logout() {
    //this.userData.logout();
    this.nav.setRoot(LoginPage);
  }

  private getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

}
