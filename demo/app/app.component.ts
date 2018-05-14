import { Component } from '@angular/core';
import { IMasonryGalleryImage } from 'projects/ngx-masonry-gallery-lib/src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public urls: string[] = [
    'http://files.all-free-download.com//downloadfiles/wallpapers/1920_1200/fall_ginkgo_trees_autumn_japan_15428.jpg',
    'https://i.pinimg.com/originals/1c/aa/c5/1caac55143e3e11461c6ae5962403deb.jpg',
    'https://www.planwallpaper.com/static/images/colorful-nature-wallpaper.jpg',
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

}
