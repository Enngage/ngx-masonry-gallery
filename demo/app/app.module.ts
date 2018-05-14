import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MasonryGalleryModule } from '../../projects/ngx-masonry-gallery-lib/src/public_api';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MasonryGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
