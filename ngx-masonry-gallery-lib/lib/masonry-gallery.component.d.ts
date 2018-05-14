import { AfterViewInit, EventEmitter, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { MasonryGalleryImage } from './masonry-gallery-models';
export declare class MasonryGalleryComponent implements AfterViewInit, OnDestroy, OnChanges {
    private renderer;
    images: MasonryGalleryImage[];
    columnWidth: number;
    gutter: number;
    imageClasses: string[];
    clickImage: EventEmitter<MasonryGalleryImage>;
    /**
     * Unique gallery guid used for distinguishing between multiple galleries on page
     */
    readonly galleryGuid: string;
    private readonly mansonryItemSelectorClass;
    private readonly hiddenClass;
    private msnry?;
    private grid?;
    private viewReady;
    constructor(renderer: Renderer2);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    handleClick(image: MasonryGalleryImage): void;
    ngAfterViewInit(): void;
    private initMasonry();
    private getImageClass();
    private getImageId();
    private handleImageLoad(imageId);
}
