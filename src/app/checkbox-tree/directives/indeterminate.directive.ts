import { Directive, ElementRef, Input } from '@angular/core';

/**
 * Вспомогательная директива для установки свойства indeterminate
 */

@Directive({selector: '[indeterminate]'})
export class IndeterminateDirective {

  @Input()
  set indeterminate(value) {
    this.elementRef.nativeElement.indeterminate = value;
  }

  constructor(private elementRef: ElementRef) {
  }
}
