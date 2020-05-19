/**
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';

export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent {
}
