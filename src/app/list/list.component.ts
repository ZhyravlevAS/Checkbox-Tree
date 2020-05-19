import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {

  @Input()
  public data: CheckboxTreeNode[] = [];
}
