import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxTreeNodeComponent } from './components/checkbox-tree-node/checkbox-tree-node.component';
import { CheckboxTreeRootComponent } from './components/checkbox-tree-root/checkbox-tree-root.component';
import { IndeterminateDirective } from './directives/indeterminate.directive';
import { CheckboxTreeService } from './services/checkbox-tree.service';

@NgModule({
  declarations: [
    CheckboxTreeRootComponent,
    CheckboxTreeNodeComponent,
    IndeterminateDirective,
  ],
  exports: [
    CheckboxTreeRootComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    CheckboxTreeService
  ]
})
export class CheckboxTreeModule {
}
