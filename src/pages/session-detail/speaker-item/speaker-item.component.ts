import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Speaker } from '../../../entities';

@Component({
  selector: 'session-speaker-item',
  templateUrl: 'speaker-item.component.html'
})
export class SpeakerItemComponent {
  @Input() speaker: Speaker;
  @Output() select = new EventEmitter();
}
