import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Session } from '../../../entities';

@Component({
  selector: 'session-actions',
  templateUrl: 'session-actions.component.html'
})
export class SessionActionsComponent {
  @Input() session: Session;
  @Output() favorite = new EventEmitter();
  @Output() rate = new EventEmitter();
}
