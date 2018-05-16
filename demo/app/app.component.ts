import { Component, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IMasonryGalleryImage, MasonryGalleryComponent } from 'projects/ngx-masonry-gallery-lib/src/lib';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var hljs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private readonly numberOfInitiallyShownImages = 8;
  private readonly numberOfImages: number = 23;
  public readonly multipleImagesCount: number = 3;
  private readonly imagePath: string = 'assets/images-compressed/';
  private readonly imageExt: string = 'jpg';

  public readonly installation: string = `npm install ngx-masonry-gallery --save`;

  public readonly moduleRegistration: string = `
import { NgModule } from '@angular/core';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MasonryGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

  public readonly tsCode: string = `
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';

export class AppComponent {

    private urls: string[] = [
        'https://www.ogttx.org/wp-content/themes/ogt/media/_frontend/img/bkg.jpg',
        'http://www.magicalkenya.com/wp-content/uploads/2014/08/homebannerimg4.jpg',
        'https://media.gadventures.com/media-server/cache/12/59/12591a5497a563245d0255824103842e.jpg',
        'https://i.pinimg.com/originals/1c/aa/c5/1caac55143e3e11461c6ae5962403deb.jpg',
        'http://littleguyintheeye.com/wp-content/uploads/2014/08/nature-3.jpg',
    ];

    public get images(): IMasonryGalleryImage[] {
        return this.urls.map(m => <IMasonryGalleryImage>{
            imageUrl: m
    });
  }
}
`;

  public readonly usage: string = `<ngx-masonry-gallery [width]='250' [images]='images'></ngx-masonry-gallery>`;

  /**
   * This is here because the change event needs to be executed by the gallery to detect new/removed images
   */
  public initialImages?: IMasonryGalleryImage[];
  public usedImages: IMasonryGalleryImage[] = [];
  public pool: IMasonryGalleryImage[] = [];

  @ViewChild('masonryGallery') masonryGallery: MasonryGalleryComponent;

  constructor() {
    // init pool
    for (let i = 1; i <= this.numberOfImages; i++) {
      const image: IMasonryGalleryImage = {
        imageUrl: `${this.imagePath}${i}.${this.imageExt}`
      };

      this.pool.push(image);
    }

    // init initial images
    const images: IMasonryGalleryImage[] = [];
    for (let i = 1; i <= this.numberOfInitiallyShownImages; i++) {
      const image = this.pool[Math.floor(Math.random() * this.pool.length)];
      // remove image from pool
      this.removeFromPoolImages(image);
      images.push(image);
      this.usedImages.push(image);
    }

    this.initialImages = images;
  }

  ngAfterViewInit(): void {
    this.prettify();
  }

  addRandomImage(): void {
    if (this.pool.length === 0) {
      alert('No more images!');
      return;
    }

    const image = this.pool[Math.floor(Math.random() * this.pool.length)];

    if (image) {
      this.masonryGallery.addImages([image]);
      this.usedImages.push(image);

      // remove image from pool
      this.removeFromPoolImages(image);
    }
  }

  removeRandomImage(): void {
    const image = this.usedImages[Math.floor(Math.random() * this.usedImages.length)];

    if (image) {
      this.usedImages = this.usedImages.filter(m => m.imageUrl.toLowerCase() !== image.imageUrl.toLowerCase());
      // add image back to pool
      this.pool.push(image);
      // remove
      this.masonryGallery.removeImages([image]);
    }
  }

  addMultipleImages(): void {
    const imagesToAdd = [];
    for (let i = 0; i < this.multipleImagesCount; i++) {
      const image = this.pool[Math.floor(Math.random() * this.pool.length)];

      if (image) {
        this.usedImages.push(image);
        imagesToAdd.push(image);
        // remove image from pool
        this.removeFromPoolImages(image);
      }
    }

    this.masonryGallery.addImages(imagesToAdd);
  }

  removeMultipleImages(): void {
    const imagesToRemove = [];
    for (let i = 0; i < this.multipleImagesCount; i++) {
      const image = this.usedImages[Math.floor(Math.random() * this.usedImages.length)];

      if (image) {
        this.pool.push(image);
        imagesToRemove.push(image);
        this.removeFromUsedImages(image);
      }
    }

    this.masonryGallery.removeImages(imagesToRemove);
  }

  private removeFromPoolImages(image: IMasonryGalleryImage): void {
    for (let i = 0; i < this.pool.length; i++) {
      const usedImage = this.pool[i];
      if (usedImage.imageUrl.toLowerCase() === image.imageUrl.toLowerCase()) {
        this.pool.splice(i, 1);
      }
    }
  }

  private removeFromUsedImages(image: IMasonryGalleryImage): void {
    for (let i = 0; i < this.usedImages.length; i++) {
      const usedImage = this.usedImages[i];
      if (usedImage.imageUrl.toLowerCase() === image.imageUrl.toLowerCase()) {
        this.usedImages.splice(i, 1);
      }
    }
  }

  private prettify(): void {
    hljs.initHighlightingOnLoad();
  }
}
