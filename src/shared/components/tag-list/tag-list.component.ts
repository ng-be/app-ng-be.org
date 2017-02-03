import { Component, Input } from '@angular/core';

@Component({
  selector: 'tag-list',
  templateUrl: 'tag-list.component.html'
})
export class TagListComponent {
  @Input() tags: string[];
}
