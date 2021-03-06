// 3d party imports
import { Component, OnDestroy } from '@angular/core';
import {
  NavParams,
  NavController,
  ModalController,
  ToastController,
  AlertController,
  App
} from 'ionic-angular';
import { Subscription } from 'rxjs';

// app imports
import { Session, Speaker } from '../../entities';
import { SpeakerDetailPage, RateSessionPage, LoginPage } from '../';
import { ConferenceDataService, AuthService, ConnectionService } from '../../services';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage implements OnDestroy{

  session: Session;
  isAuthenticated = false;

  private subscriptions = Array<Subscription>();

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private conferenceData: ConferenceDataService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private connectionService: ConnectionService,
              private app: App) {

    this.session = navParams.data.session;
    this.setupSubscriptions();

  }

  ionViewDidEnter() {
    this.app.setTitle(this.session.title + ' - Schedule - NG-BE 2016');
  }

  toggleFavorite() {

    if (this.session.favorite) {

      let alert = this.alertCtrl.create({
        title: 'Defavorite',
        message: 'Would you like to remove this session from your favorites?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              return;
            }
          },
          {
            text: 'Defavorite',
            handler: () => {
              this.toggleFavoriteToast();
            }
          }
        ]
      });

      // now present the alert on top of all other content
      alert.present();

    } else {
      this.toggleFavoriteToast();
    }

  }

  toggleFavoriteToast() {

    if (!this.connectionService.isConnected()) {
      const toast = this.toastCtrl.create({
        message: `You need an internet connection to ${this.session.favorite ? 'defavorite' : 'favorite'} the session.`,
        showCloseButton: true,
        closeButtonText: 'close',
        duration: 3000
      });
      toast.present();
    } else if (this.isAuthenticated) {
      if (!this.session.favorite) {
        this.conferenceData.setFavorite(this.session.$key);
      } else {
        this.conferenceData.removeFavorite(this.session.favorite.$key);
        delete this.session.favorite;
      }

      let toast = this.toastCtrl.create({
        message: this.session.favorite ? 'Session has been favorited' : 'Session has been defavorited',
        showCloseButton: true,
        closeButtonText: 'close',
        duration: 3000
      });
      toast.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Not logged in',
        message: 'You need to be logged in to favorite the session.',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
            }
          },
          {
            text: 'Go to login',
            handler: () => {
              this.navCtrl.push(LoginPage);
              alert.dismiss();
            }
          }
        ]
      });

      // now present the alert on top of all other content
      alert.present();
    }

  }

  goToSpeakerDetail(speaker: Speaker): void {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }

  openRatingModal() {

    if (!this.connectionService.isConnected()) {
      const toast = this.toastCtrl.create({
        message: `You need an internet connection to rate the session.`,
        showCloseButton: true,
        closeButtonText: 'close',
        duration: 3000
      });
      toast.present();
    } else if (this.isAuthenticated) {
      let modal = this.modalCtrl.create(RateSessionPage, {
        session: this.session
      });
      modal.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Not logged in',
        message: 'You need to be logged in to rate the session.',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
            }
          },
          {
            text: 'Go to login',
            handler: () => {
              this.navCtrl.push(LoginPage);
              alert.dismiss();
            }
          }
        ]
      });

      // now present the alert on top of all other content
      alert.present();
    }
  }

  private setupSubscriptions() {
    this.subscriptions.push(
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
