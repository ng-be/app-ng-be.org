import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Session } from '../../../entities';

@Component({
  selector: 'session-navbar',
  templateUrl: 'session-navbar.component.html'
})
export class SessionNavbarComponent {
  @Input() session: Session;
  @Output() favorite = new EventEmitter();
  @Output() rate = new EventEmitter();
}
