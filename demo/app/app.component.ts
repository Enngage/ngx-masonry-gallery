import { Component, AfterViewInit } from '@angular/core';
import { IMasonryGalleryImage } from 'projects/ngx-masonry-gallery-lib/src/lib';

declare var hljs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

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

  public readonly usage: string = `<ngx-masonry-gallery [width]="250" [images]="images"></ngx-masonry-gallery>`;

  public urls: string[] = [
    'https://www.ogttx.org/wp-content/themes/ogt/media/_frontend/img/bkg.jpg',
    'http://www.magicalkenya.com/wp-content/uploads/2014/08/homebannerimg4.jpg',
    'https://media.gadventures.com/media-server/cache/12/59/12591a5497a563245d0255824103842e.jpg',
    'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/resources/far-west-texas/horned-lizard.jpg',
    'https://t-ec.bstatic.com/data/xphoto/1182x887/201/20146928.jpg?size=S',
    'https://www.awf.org/sites/default/files/media/gallery/Pillar%20Images/corrfred.jpg?itok=6GMy3XAY',
    'https://lonelyplanetimages.imgix.net/copilot/images/interest/wildlife-nature.jpg?auto=compress&h=800',
    'http://www.aigas.co.uk/wp-content/uploads/2017/08/banner02-1.jpg',
    'http://files.all-free-download.com//downloadfiles/wallpapers/1920_1200/fall_ginkgo_trees_autumn_japan_15428.jpg',
    'https://i.pinimg.com/originals/1c/aa/c5/1caac55143e3e11461c6ae5962403deb.jpg',
    'http://littleguyintheeye.com/wp-content/uploads/2014/08/nature-3.jpg',
    'https://www.planwallpaper.com/static/images/4-Nature-Wallpapers-2014-1_cDEviqY.jpg',
    'http://bdfjade.com/data/out/43/5506594-animals-pictures.jpg',
    'http://animalhealthmedia.com/wp-content/uploads/2013/10/Mates-wild-animals-3633264-1600-1177.jpg',
    'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?cs=srgb&dl=animals-wildlife-calf-66898.jpg&fm=jpg',
    'http://www.greenacresrescue.org.uk/cms/wp-content/uploads/2016/11/rudyjrt.jpg',
  ];

  public get images(): IMasonryGalleryImage[] {
    return this.urls.map(m => <IMasonryGalleryImage>{
      imageUrl: m
    });
  }

  ngAfterViewInit(): void {
    this.prettify();
  }

  private prettify(): void {
    hljs.initHighlightingOnLoad();
  }
}

