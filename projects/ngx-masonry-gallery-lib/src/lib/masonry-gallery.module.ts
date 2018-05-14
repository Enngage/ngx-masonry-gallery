import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MasonryGalleryComponent } from './masonry-gallery.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MasonryGalleryComponent,
    ],
    exports: [
        MasonryGalleryComponent,
    ],
})
export class MasonryGalleryModule { }
