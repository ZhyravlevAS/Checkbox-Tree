import { Component, Input } from '@angular/core';
import { CheckboxTreeRoot } from '../checkbox-tree-root/checkbox-tree-root';

@Component({
  selector: '[app-checkbox-tree-node]',
  templateUrl: './checkbox-tree-node.component.html',
})
export class CheckboxTreeNodeComponent {

  @Input()
  public data: CheckboxTreeNode;

  public trackBy(index: number, item: any): number {
    return item.uid;
  }

  public onClick(): void {
    if (!_.has(this.data, 'children') || !this.data.children.length) {
      return;
    }

    this.data.isOpen = !this.data.isOpen;
    CheckboxTreeRoot.TOGGLE_NESTED_EVENT.next(this.data);
  }

  public onChange(): void {
    CheckboxTreeRoot.CHANGE_CHECKBOX_EVENT.next(this.data);
  }
}
