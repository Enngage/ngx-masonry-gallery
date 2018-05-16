import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import * as imagesloaded from "imagesloaded";
import * as masonry from "masonry-layout";

import { IMasonryGalleryImage } from "./masonry-gallery-models";
import { utilities } from "./utilities";

@Component({
    selector: "ngx-masonry-gallery",
    template: '<div [id]="galleryGuid"></div>'
})
export class MasonryGalleryComponent
    implements AfterViewInit, OnDestroy, OnChanges {
    @Input() images: IMasonryGalleryImage[] = [];
    @Input() width: number = 330;
    @Input() gutter: number = 5;
    @Input() verticalGutter: number = 5;
    @Input() imageClasses: string[] = [];

    @Output() clickImage = new EventEmitter<IMasonryGalleryImage>();
    @Output() removeComplete = new EventEmitter<any[]>();
    @Output() layoutComplete = new EventEmitter<any[]>();

    /**
     * Unique gallery guid used for distinguishing between multiple galleries on page
     */
    public readonly galleryGuid: string = utilities.newGuid();
    private readonly mansonryItemSelectorClass = `grid-item-${this.galleryGuid}`;
    private idWithImages: IdWithImage[] = [];

    private msnry?: any;
    private grid?: any;
    private changesToProcess?: SimpleChanges;

    private viewReady: boolean = false;

    constructor(private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.images && changes.images.currentValue) {
            if (!this.viewReady) {
                // process images once we can
                this.changesToProcess = changes;
            } else {
                this.processImages(changes);
            }
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
        if (this.changesToProcess) {
            this.processImages(this.changesToProcess);
            this.changesToProcess = undefined;
        }
    }

    addImages(images: IMasonryGalleryImage[]): void {
        if (images && images.length > 0) {
            this.addImagesToGallery(images);
        }
    }

    removeImages(images: IMasonryGalleryImage[]): void {
        if (images && images.length > 0) {
            images.forEach(image => {
                this.removeImageFromGallery(image);
            });
        }
    }

    private processImages(changes: SimpleChanges): void {
        const imagesToProcess = this.getAddedAndRemovesImages(changes);

        // add images to mansonry layout
        this.addImages(imagesToProcess.addedImages);

        // removes images from layout
        this.removeImages(imagesToProcess.removedImages);
    }

    private getAddedAndRemovesImages(
        changes: SimpleChanges
    ): {
            addedImages: IMasonryGalleryImage[];
            removedImages: IMasonryGalleryImage[];
        } {
        let addedImages: IMasonryGalleryImage[] = [];
        let removedImages: IMasonryGalleryImage[] = [];


        const newImagesValue = changes.images
            .currentValue as IMasonryGalleryImage[];
        const oldImagesValue = changes.images
            .previousValue as IMasonryGalleryImage[];

        if (!oldImagesValue) {
            // all images are new ones
            addedImages = changes.images.currentValue;
        } else {
            // process added images
            newImagesValue.forEach(newImage => {
                const existingImage = oldImagesValue.find(
                    m => m.imageUrl.toLowerCase() === newImage.imageUrl.toLowerCase()
                );

                if (existingImage) {
                    // image was in previous value && is in new, do nothing
                } else {
                    // image is new
                    addedImages.push(newImage);
                }
            });

            // process removed images
            oldImagesValue.forEach(oldImage => {
                const existingImage = newImagesValue.find(
                    m => m.imageUrl.toLowerCase() === oldImage.imageUrl.toLowerCase()
                );

                if (existingImage) {
                    // image was in previous value && is in new, do nothing
                } else {
                    // image is removed
                    removedImages.push(oldImage);
                }
            });
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

        const that = this;

        this.msnry.on("layoutComplete", function (items) {
            that.layoutComplete.next(items);
        });

        this.msnry.on("removeComplete", function (items) {
            that.removeComplete.next(items);
        });
    }

    private removeImageFromGallery(image: IMasonryGalleryImage): void {
        // get image guid
        const imageIdResult = this.idWithImages.find(
            m => m.image.imageUrl.toLowerCase() === image.imageUrl.toLowerCase()
        );

        if (!imageIdResult) {
            // image was not found, this is probably an error
            console.warn(
                `Image with url '${
                image.imageUrl
                }' was not found. If you are adding images, make sure to 'replace' the images array with a new one so that detection change can be executed instead of just adding an image to array (which doesn't fire change detection on array property)`
            );
            return;
        }

        // find image based on its id
        const imageElem = document.getElementById(imageIdResult.id);

        if (!imageElem) {
            // image was not found in DOM
            console.warn(
                `Image with id '{${
                imageIdResult.id
                }}' was not found in DOM. Have you manipulated the DOM in some way?`
            );
            return;
        }

        // remove image from gallery
        this.msnry.remove(imageElem);

        // refresh layout
        this.msnry.layout();

        // remove image from array
        for (let i = 0; i < this.idWithImages.length; i++) {
            const idWithImage = this.idWithImages[i];
            if (idWithImage.image.imageUrl.toLowerCase() === imageIdResult.image.imageUrl.toLowerCase()) {
                this.idWithImages.splice(i, 1);
            }
        }
    }

    private addImagesToGallery(images: IMasonryGalleryImage[]): void {
        if (!this.grid) {
            throw Error(
                "Grid element is not yet ready, are you trying to add image too soon?"
            );
        }

        const imagesWrapper = this.renderer.createElement("span");

        images.forEach(image => {
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
                `display: none; max-width: ${this.width}px; margin-bottom: ${
                this.verticalGutter
                }px`
            );
            imageElem.className = this.getImageClass();
            imageElem.addEventListener("click", () => {
                this.handleClick(image);
            });

            // store guid with this image
            this.idWithImages.push({
                id: imageId,
                image: image
            });

            // add to dom and mansory & refresh layout
            imagesWrapper.appendChild(imageElem);
        });

        // add html to dom
        this.grid.appendChild(imagesWrapper);

        // wait until all images in wrapped are loaded
        imagesloaded(imagesWrapper, imagesLoadedResult => {
            if (imagesLoadedResult.images && imagesLoadedResult.images.length > 0) {
                imagesLoadedResult.images.forEach(loadedImage => {
                    // unhide image
                    loadedImage.img.style.display = null;
                });

                if (imagesLoadedResult.images.length === 1) {
                    // if layout is empty, use appended so that transition is nice
                    this.msnry.appended(imagesLoadedResult.images[0].img);
                } else {
                    // using 'appended' will cause image to not transition correctly in Angular production build
                    // when 'optimization' flag is enabled && when there are already some images loaded
                    this.msnry.reloadItems();
                    this.msnry.layout();
                }
            }
        });
    }

    private getImageClass(): string {
        let className = this.mansonryItemSelectorClass;

        if (this.imageClasses && this.imageClasses.length > 0) {
            const customClass = this.imageClasses.join(" ");

            className += " " + customClass;
        }

        return className;
    }

    private getImageId(): string {
        return this.galleryGuid + "_" + utilities.newGuid();
    }
}

interface IdWithImage {
    id: string;
    image: IMasonryGalleryImage;
}
