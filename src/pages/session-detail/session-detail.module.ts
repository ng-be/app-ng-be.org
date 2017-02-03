import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { SessionDetailPage } from './session-detail';
import { SessionNavbarComponent } from './session-navbar/session-navbar.component';
import { SessionInfoComponent } from './session-info/session-info.component';
import { SessionActionsComponent } from './session-actions/session-actions.component';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { SpeakerItemComponent } from './speaker-item/speaker-item.component';

@NgModule({
  imports: [
    IonicModule,
    SharedModule
  ],
  declarations: [
    SessionDetailPage,
    SessionNavbarComponent,
    SessionInfoComponent,
    SessionActionsComponent,
    SpeakerListComponent,
    SpeakerItemComponent
  ],
  entryComponents: [
    SessionDetailPage
  ]
})
export class SessionDetailModule { }
