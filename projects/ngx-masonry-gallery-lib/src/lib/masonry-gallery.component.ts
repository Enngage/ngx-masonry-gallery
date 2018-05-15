import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import * as masonry from "masonry-layout";

import { IMasonryGalleryImage } from "./masonry-gallery-models";
import { utilities } from "./utilities";

@Component({
    selector: "ngx-masonry-gallery",
    template: '<div [id]="galleryGuid"></div>',
    styles: [".hidden { display: none; }"]
})
export class MasonryGalleryComponent
    implements AfterViewInit, OnDestroy, OnChanges {
    @Input() images: IMasonryGalleryImage[] = [];
    @Input() width: number = 330;
    @Input() gutter: number = 5;
    @Input() verticalGutter: number = 5;
    @Input() imageClasses: string[] = [];

    @Output() clickImage = new EventEmitter<IMasonryGalleryImage>();

    /**
     * Unique gallery guid used for distinguishing between multiple galleries on page
     */
    public readonly galleryGuid: string = utilities.newGuid();
    private readonly mansonryItemSelectorClass = "grid-item";
    private readonly hiddenClass: string = "hidden";
    private idWithImages: IdWithImage[] = [];

    private msnry?: any;
    private grid?: any;

    private viewReady: boolean = false;
    private processImagesAfterViewIsReady: boolean = false;

    constructor(private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.viewReady) {
            this.processImages(changes);
        } else {
            // process images once we can
            this.processImagesAfterViewIsReady = true;
        }
    }

    ngOnDestroy(): void {
        if (this.msnry) {
            this.msnry.destroy();
        }
    }

    handleClick(image: IMasonryGalleryImage): void {
        this.clickImage.next(image);
    }

    ngAfterViewInit(): void {
        this.viewReady = true;
        this.initMasonry();

        // process images now
        if (this.processImagesAfterViewIsReady) {
            this.processImages();
            this.processImagesAfterViewIsReady = false;
        }
    }

    private processImages(changes?: SimpleChanges): void {
        const imagesToProcess = this.getAddedAndRemovesImages(changes);

        // add images to mansonry layout
        imagesToProcess.addedImages.forEach(image => {
            this.addImageToGallery(image, this.grid);
        });

        // removes images from layout
        imagesToProcess.removedImages.forEach(image => {
            this.removeImageFromGallery(image, this.grid);
        });
    }

    private getAddedAndRemovesImages(
        changes: SimpleChanges | undefined
    ): {
            addedImages: IMasonryGalleryImage[];
            removedImages: IMasonryGalleryImage[];
        } {
        let addedImages: IMasonryGalleryImage[] = [];
        let removedImages: IMasonryGalleryImage[] = [];

        if (changes) {
            // change is available
            const newImagesValue = changes.images.currentValue as IMasonryGalleryImage[];
            const oldImagesValue = changes.images.previousValue as IMasonryGalleryImage[];

            if (!oldImagesValue && !changes) {
                // all images are added because there was no previous value
                addedImages = newImagesValue;
            } else {
                // process added images
                newImagesValue.forEach(newImage => {
                    const existingImage = oldImagesValue.find(m => m.imageUrl.toLowerCase() === newImage.imageUrl.toLowerCase());

                    if (existingImage) {
                        // image was in previous value && is in new, do nothing
                    } else {
                        // image is new
                        addedImages.push(newImage);
                    }
                });

                // process removed images
                oldImagesValue.forEach(oldImage => {
                    const existingImage = newImagesValue.find(m => m.imageUrl.toLowerCase() === oldImage.imageUrl.toLowerCase());

                    if (existingImage) {
                        // image was in previous value && is in new, do nothing
                    } else {
                        // image is removed
                        removedImages.push(oldImage);
                    }
                });
            }
        } else {
            // change is not available, all images are new images
            addedImages = this.images;
        }

        return {
            addedImages: addedImages,
            removedImages: removedImages
        };
    }

    private initMasonry(): void {
        this.grid = document.getElementById(this.galleryGuid);

        // remove all existing data from grid
        this.grid.innerHTML = "";

        if (!this.grid) {
            throw Error(
                `Could not init mansory due to non existing elem with id '${
                this.galleryGuid
                }'`
            );
        }

        this.msnry = new masonry(this.grid, {
            // options...
            itemSelector: "." + this.mansonryItemSelectorClass,
            columnWidth: this.width,
            gutter: this.gutter
        });
    }

    private removeImageFromGallery(
        image: IMasonryGalleryImage,
        grid: any
    ): void {
        if (!grid) {
            throw Error(
                "Grid element is not yet ready, are you trying to add image too soon?"
            );
        }

        // get image guid
        const imageIdResult = this.idWithImages.find(m => m.image.imageUrl.toLowerCase() === image.imageUrl.toLowerCase());

        if (!imageIdResult) {
            // image was not found, this is probably an error
            console.warn(`Image with url '${image.imageUrl}' was not found locally. This is probably an error within gallery and not your fault.`)
            return;
        }

        // find image based on its id
        const imageElem = document.getElementById(imageIdResult.id);

        if (!imageElem) {
            // image was not found in DOM
            console.warn(`Image with id '{${imageIdResult.id}}' was not found in DOM. Have you manipulated the DOM in some way?`);
            return;
        }

        // remove image from gallery
        this.msnry.remove(imageElem);

        // refresh layout
        this.msnry.layout();

        // remove image from array
        this.idWithImages = this.idWithImages.filter(m => m.id !== imageIdResult.id);
    }

    private addImageToGallery(image: IMasonryGalleryImage, grid: any): void {
        if (!grid) {
            throw Error(
                "Grid element is not yet ready, are you trying to add image too soon?"
            );
        }
        // generate unique image id
        const imageId = this.getImageId();

        // create element
        const imageElem = this.renderer.createElement("img");
        imageElem.setAttribute("id", imageId);
        imageElem.setAttribute("alt", image.alt ? image.alt : "no description");
        imageElem.setAttribute("src", image.imageUrl);
        // note - images are hidden by default and should be shown only after they are loaded
        imageElem.setAttribute(
            "style",
            `max-width: ${this.width}px; margin-bottom: ${this.verticalGutter}px`
        );
        imageElem.className = this.getImageClass();
        imageElem.addEventListener("load", () => {
            this.handleImageLoad(imageId);
        });
        imageElem.addEventListener("click", () => {
            this.handleClick(image);
        });

        // add to dom and mansory & refresh layout
        this.grid.appendChild(imageElem);

        // store guid with this image
        this.idWithImages.push({
            id: imageId,
            image: image
        })
    }

    private getImageClass(): string {
        let className = this.hiddenClass + " " + this.mansonryItemSelectorClass;

        if (this.imageClasses && this.imageClasses.length > 0) {
            const customClass = this.imageClasses.join(" ");

            className += " " + customClass;
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

interface IdWithImage {
    id: string;
    image: IMasonryGalleryImage
}
