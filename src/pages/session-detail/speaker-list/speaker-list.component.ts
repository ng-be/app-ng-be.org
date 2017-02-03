import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Speaker } from '../../../entities';

@Component({
  selector: 'session-speaker-list',
  templateUrl: 'speaker-list.component.html'
})
export class SpeakerListComponent {
  @Input() speakers: Speaker[];
  @Output() select = new EventEmitter<Speaker>();
}
