import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import '../styles/styles.scss';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { CheckboxTreeModule } from './checkbox-tree/checkbox-tree.module';
import { WINDOW_PROVIDERS } from './custom/window.service';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { NoContentComponent } from './no-content/no-content.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    NoContentComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    CheckboxTreeModule,
  ],
  providers: [
    WINDOW_PROVIDERS,
  ],
})
export class AppModule {
}
