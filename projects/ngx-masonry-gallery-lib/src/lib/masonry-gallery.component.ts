import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, Renderer2 } from '@angular/core';
import * as masonry from 'masonry-layout';

import { MasonryGalleryImage } from './masonry-gallery-models';
import { utilities } from './utilities';

@Component({
    selector: 'ngx-masonry-gallery',
    template: '<div [id]="galleryGuid"></div>',
    styles: ['.hidden { display: none; }']
})
export class MasonryGalleryComponent implements AfterViewInit, OnDestroy, OnChanges {

    @Input() images: MasonryGalleryImage[] = [];
    @Input() columnWidth: number = 330;
    @Input() gutter: number = 5;
    @Input() imageClasses: string[] = [];

    @Output() clickImage = new EventEmitter<MasonryGalleryImage>();

    /**
     * Unique gallery guid used for distinguishing between multiple galleries on page
     */
    public readonly galleryGuid: string = utilities.newGuid();
    private readonly mansonryItemSelectorClass = 'grid-item';
    private readonly hiddenClass: string = 'hidden';

    private msnry?: any;
    private grid?: any;

    private viewReady: boolean = false;

    constructor(
        private renderer: Renderer2
    ) {
    }

    ngOnChanges(): void {
        if (this.viewReady) {
            this.initMasonry();
        }
    }

    ngOnDestroy(): void {
        if (this.msnry) {
            this.msnry.destroy();
        }
    }

    handleClick(image: MasonryGalleryImage): void {
        this.clickImage.next(image);
    }

    ngAfterViewInit(): void {
        this.viewReady = true;
        this.initMasonry();
    }

    private initMasonry(): void {
        this.grid = document.getElementById(this.galleryGuid);

        if (!this.grid) {
            throw Error(`Could not init mansory due to non existing elem with id '${this.galleryGuid}'`);
        }

        this.msnry = new masonry(this.grid, {
            // options...
            itemSelector: '.' + this.mansonryItemSelectorClass,
            columnWidth: this.columnWidth,
            gutter: this.gutter,
        });

        const imageclass = this.getImageClass();

        // add images to mansonry layout
        this.images.forEach(image => {
            // generate unique image id
            const imageId = this.getImageId();

            // create element
            const imageElem = this.renderer.createElement('img');
            imageElem.setAttribute('id', imageId);
            imageElem.setAttribute('alt', image.alt ? image.alt : 'no description');
            imageElem.setAttribute('src', image.imageUrl);
            // note - images are hidden by default and should be shown only after they are loaded
            imageElem.setAttribute('style', `max-width: ${this.columnWidth}px; margin-bottom: ${this.gutter}px`);
            imageElem.className = imageclass;
            imageElem.addEventListener('load', () => {
                this.handleImageLoad(imageId);
            });
            imageElem.addEventListener('click', () => {
                this.handleClick(image);
            });

            // add to dom and mansory & refresh layout
            this.grid.appendChild(imageElem);
        });
    }

    private getImageClass(): string {
        let className = this.hiddenClass + ' ' + this.mansonryItemSelectorClass;

        if (this.imageClasses && this.imageClasses.length > 0) {
            const customClass = this.imageClasses.join(' ');

            className += ' ' + customClass;
        }

        return className;
    }

    private getImageId(): string {
        return this.galleryGuid + `_` + utilities.newGuid();
    }

    private handleImageLoad(imageId: string): void {
        // find loaded image
        const image = document.getElementById(imageId);

        if (!image) {
            return;
        }

        // unhide image
        image.classList.remove(this.hiddenClass);

        // append image to masonry
        this.msnry.appended(image);
    }
}
