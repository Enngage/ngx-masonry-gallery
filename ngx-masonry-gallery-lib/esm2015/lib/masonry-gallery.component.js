/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import * as masonry from 'masonry-layout';
import { utilities } from './utilities';
export class MasonryGalleryComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.images = [];
        this.columnWidth = 330;
        this.gutter = 5;
        this.imageClasses = [];
        this.clickImage = new EventEmitter();
        /**
         * Unique gallery guid used for distinguishing between multiple galleries on page
         */
        this.galleryGuid = utilities.newGuid();
        this.mansonryItemSelectorClass = 'grid-item';
        this.hiddenClass = 'hidden';
        this.viewReady = false;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.viewReady) {
            this.initMasonry();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.msnry) {
            this.msnry.destroy();
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    handleClick(image) {
        this.clickImage.next(image);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.viewReady = true;
        this.initMasonry();
    }
    /**
     * @return {?}
     */
    initMasonry() {
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
        const /** @type {?} */ imageclass = this.getImageClass();
        // add images to mansonry layout
        this.images.forEach(image => {
            // generate unique image id
            const /** @type {?} */ imageId = this.getImageId();
            // create element
            const /** @type {?} */ imageElem = this.renderer.createElement('img');
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
    /**
     * @return {?}
     */
    getImageClass() {
        let /** @type {?} */ className = this.hiddenClass + ' ' + this.mansonryItemSelectorClass;
        if (this.imageClasses && this.imageClasses.length > 0) {
            const /** @type {?} */ customClass = this.imageClasses.join(' ');
            className += ' ' + customClass;
        }
        return className;
    }
    /**
     * @return {?}
     */
    getImageId() {
        return this.galleryGuid + `_` + utilities.newGuid();
    }
    /**
     * @param {?} imageId
     * @return {?}
     */
    handleImageLoad(imageId) {
        // find loaded image
        const /** @type {?} */ image = document.getElementById(imageId);
        if (!image) {
            return;
        }
        // unhide image
        image.classList.remove(this.hiddenClass);
        // append image to masonry
        this.msnry.appended(image);
    }
}
MasonryGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-masonry-gallery',
                template: '<div [id]="galleryGuid"></div>',
                styles: ['.hidden { display: none; }']
            },] },
];
/** @nocollapse */
MasonryGalleryComponent.ctorParameters = () => [
    { type: Renderer2, },
];
MasonryGalleryComponent.propDecorators = {
    "images": [{ type: Input },],
    "columnWidth": [{ type: Input },],
    "gutter": [{ type: Input },],
    "imageClasses": [{ type: Input },],
    "clickImage": [{ type: Output },],
};
function MasonryGalleryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MasonryGalleryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MasonryGalleryComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MasonryGalleryComponent.propDecorators;
    /** @type {?} */
    MasonryGalleryComponent.prototype.images;
    /** @type {?} */
    MasonryGalleryComponent.prototype.columnWidth;
    /** @type {?} */
    MasonryGalleryComponent.prototype.gutter;
    /** @type {?} */
    MasonryGalleryComponent.prototype.imageClasses;
    /** @type {?} */
    MasonryGalleryComponent.prototype.clickImage;
    /**
     * Unique gallery guid used for distinguishing between multiple galleries on page
     * @type {?}
     */
    MasonryGalleryComponent.prototype.galleryGuid;
    /** @type {?} */
    MasonryGalleryComponent.prototype.mansonryItemSelectorClass;
    /** @type {?} */
    MasonryGalleryComponent.prototype.hiddenClass;
    /** @type {?} */
    MasonryGalleryComponent.prototype.msnry;
    /** @type {?} */
    MasonryGalleryComponent.prototype.grid;
    /** @type {?} */
    MasonryGalleryComponent.prototype.viewReady;
    /** @type {?} */
    MasonryGalleryComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzb25yeS1nYWxsZXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXNvbnJ5LWdhbGxlcnktbGliLyIsInNvdXJjZXMiOlsibGliL21hc29ucnktZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxLQUFLLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT3hDLE1BQU07Ozs7SUFxQkYsWUFDWTtRQUFBLGFBQVEsR0FBUixRQUFRO3NCQXBCcUIsRUFBRTsyQkFDWixHQUFHO3NCQUNSLENBQUM7NEJBQ08sRUFBRTswQkFFYixJQUFJLFlBQVksRUFBdUI7Ozs7MkJBS3hCLFNBQVMsQ0FBQyxPQUFPLEVBQUU7eUNBQ1osV0FBVzsyQkFDakIsUUFBUTt5QkFLbEIsS0FBSztLQUtqQzs7OztJQUVELFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7S0FDSjs7OztJQUVELFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7S0FDSjs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBMEI7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDL0I7Ozs7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RC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Q0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUd6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztZQXpIbEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLE1BQU0sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQ3pDOzs7O1lBVnFGLFNBQVM7Ozt1QkFhMUYsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgbWFzb25yeSBmcm9tICdtYXNvbnJ5LWxheW91dCc7XHJcblxyXG5pbXBvcnQgeyBNYXNvbnJ5R2FsbGVyeUltYWdlIH0gZnJvbSAnLi9tYXNvbnJ5LWdhbGxlcnktbW9kZWxzJztcclxuaW1wb3J0IHsgdXRpbGl0aWVzIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXNvbnJ5LWdhbGxlcnknLFxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2IFtpZF09XCJnYWxsZXJ5R3VpZFwiPjwvZGl2PicsXHJcbiAgICBzdHlsZXM6IFsnLmhpZGRlbiB7IGRpc3BsYXk6IG5vbmU7IH0nXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFzb25yeUdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KCkgaW1hZ2VzOiBNYXNvbnJ5R2FsbGVyeUltYWdlW10gPSBbXTtcclxuICAgIEBJbnB1dCgpIGNvbHVtbldpZHRoOiBudW1iZXIgPSAzMzA7XHJcbiAgICBASW5wdXQoKSBndXR0ZXI6IG51bWJlciA9IDU7XHJcbiAgICBASW5wdXQoKSBpbWFnZUNsYXNzZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgQE91dHB1dCgpIGNsaWNrSW1hZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1hc29ucnlHYWxsZXJ5SW1hZ2U+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmlxdWUgZ2FsbGVyeSBndWlkIHVzZWQgZm9yIGRpc3Rpbmd1aXNoaW5nIGJldHdlZW4gbXVsdGlwbGUgZ2FsbGVyaWVzIG9uIHBhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGdhbGxlcnlHdWlkOiBzdHJpbmcgPSB1dGlsaXRpZXMubmV3R3VpZCgpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtYW5zb25yeUl0ZW1TZWxlY3RvckNsYXNzID0gJ2dyaWQtaXRlbSc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhpZGRlbkNsYXNzOiBzdHJpbmcgPSAnaGlkZGVuJztcclxuXHJcbiAgICBwcml2YXRlIG1zbnJ5PzogYW55O1xyXG4gICAgcHJpdmF0ZSBncmlkPzogYW55O1xyXG5cclxuICAgIHByaXZhdGUgdmlld1JlYWR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3UmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0TWFzb25yeSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tc25yeSkge1xyXG4gICAgICAgICAgICB0aGlzLm1zbnJ5LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2xpY2soaW1hZ2U6IE1hc29ucnlHYWxsZXJ5SW1hZ2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsaWNrSW1hZ2UubmV4dChpbWFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmlld1JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmluaXRNYXNvbnJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TWFzb25yeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdhbGxlcnlHdWlkKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmdyaWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENvdWxkIG5vdCBpbml0IG1hbnNvcnkgZHVlIHRvIG5vbiBleGlzdGluZyBlbGVtIHdpdGggaWQgJyR7dGhpcy5nYWxsZXJ5R3VpZH0nYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1zbnJ5ID0gbmV3IG1hc29ucnkodGhpcy5ncmlkLCB7XHJcbiAgICAgICAgICAgIC8vIG9wdGlvbnMuLi5cclxuICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLicgKyB0aGlzLm1hbnNvbnJ5SXRlbVNlbGVjdG9yQ2xhc3MsXHJcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiB0aGlzLmNvbHVtbldpZHRoLFxyXG4gICAgICAgICAgICBndXR0ZXI6IHRoaXMuZ3V0dGVyLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZWNsYXNzID0gdGhpcy5nZXRJbWFnZUNsYXNzKCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBpbWFnZXMgdG8gbWFuc29ucnkgbGF5b3V0XHJcbiAgICAgICAgdGhpcy5pbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHVuaXF1ZSBpbWFnZSBpZFxyXG4gICAgICAgICAgICBjb25zdCBpbWFnZUlkID0gdGhpcy5nZXRJbWFnZUlkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgZWxlbWVudFxyXG4gICAgICAgICAgICBjb25zdCBpbWFnZUVsZW0gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uc2V0QXR0cmlidXRlKCdpZCcsIGltYWdlSWQpO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uc2V0QXR0cmlidXRlKCdhbHQnLCBpbWFnZS5hbHQgPyBpbWFnZS5hbHQgOiAnbm8gZGVzY3JpcHRpb24nKTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1hZ2UuaW1hZ2VVcmwpO1xyXG4gICAgICAgICAgICAvLyBub3RlIC0gaW1hZ2VzIGFyZSBoaWRkZW4gYnkgZGVmYXVsdCBhbmQgc2hvdWxkIGJlIHNob3duIG9ubHkgYWZ0ZXIgdGhleSBhcmUgbG9hZGVkXHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYG1heC13aWR0aDogJHt0aGlzLmNvbHVtbldpZHRofXB4OyBtYXJnaW4tYm90dG9tOiAke3RoaXMuZ3V0dGVyfXB4YCk7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5jbGFzc05hbWUgPSBpbWFnZWNsYXNzO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlSW1hZ2VMb2FkKGltYWdlSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljayhpbWFnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRvIGRvbSBhbmQgbWFuc29yeSAmIHJlZnJlc2ggbGF5b3V0XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5hcHBlbmRDaGlsZChpbWFnZUVsZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VDbGFzcygpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLmhpZGRlbkNsYXNzICsgJyAnICsgdGhpcy5tYW5zb25yeUl0ZW1TZWxlY3RvckNsYXNzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pbWFnZUNsYXNzZXMgJiYgdGhpcy5pbWFnZUNsYXNzZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXN0b21DbGFzcyA9IHRoaXMuaW1hZ2VDbGFzc2VzLmpvaW4oJyAnKTtcclxuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnICcgKyBjdXN0b21DbGFzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjbGFzc05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZUlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FsbGVyeUd1aWQgKyBgX2AgKyB1dGlsaXRpZXMubmV3R3VpZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlSW1hZ2VMb2FkKGltYWdlSWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIC8vIGZpbmQgbG9hZGVkIGltYWdlXHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbWFnZUlkKTtcclxuXHJcbiAgICAgICAgaWYgKCFpbWFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bmhpZGUgaW1hZ2VcclxuICAgICAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuaGlkZGVuQ2xhc3MpO1xyXG5cclxuICAgICAgICAvLyBhcHBlbmQgaW1hZ2UgdG8gbWFzb25yeVxyXG4gICAgICAgIHRoaXMubXNucnkuYXBwZW5kZWQoaW1hZ2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==