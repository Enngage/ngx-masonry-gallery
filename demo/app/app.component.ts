import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IMasonryGalleryImage } from 'projects/ngx-masonry-gallery-lib/src/lib';

declare var hljs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private readonly numberOfInitiallyShownImages = 8;
  private readonly numberOfImages: number = 23;
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

  public readonly usage: string = `<ngx-masonry-gallery [width]="250" [images]="images"></ngx-masonry-gallery>`;

  /**
   * This is here because the change event needs to be executed by the gallery to detect new/removed images
   */
  public get activeImages(): IMasonryGalleryImage[] {
    const images: IMasonryGalleryImage[] = [];
    return this.images.map(m => <IMasonryGalleryImage>{
      imageUrl: m.imageUrl
    });
  }

  public images: IMasonryGalleryImage[] = [];
  public pool: IMasonryGalleryImage[] = [];

  constructor(
  ) {
    for (let i = 1; i <= this.numberOfImages; i++) {
      const image: IMasonryGalleryImage = { imageUrl: `${this.imagePath}${i}.${this.imageExt}` };

      if (i > this.numberOfInitiallyShownImages) {
        this.pool.push(image);
      } else {
        this.images.push(image);
      }
    }
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
    this.images.push(image);

    // assign images so that detection change is fired
    this.images = this.images;

    // remove image from pool
    this.pool = this.pool.filter(m => m.imageUrl.toLowerCase() !== image.imageUrl.toLowerCase());
  }

  removeRandomImage(): void {
    const image = this.images[Math.floor(Math.random() * this.images.length)];
    this.images = this.images.filter(m => m.imageUrl.toLowerCase() !== image.imageUrl.toLowerCase());

    // add image back to pool
    this.pool.push(image);
  }

  private prettify(): void {
    hljs.initHighlightingOnLoad();
  }
}

