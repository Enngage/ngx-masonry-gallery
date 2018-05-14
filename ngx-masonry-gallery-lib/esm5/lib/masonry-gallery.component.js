/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import * as masonry from 'masonry-layout';
import { utilities } from './utilities';
var MasonryGalleryComponent = /** @class */ (function () {
    function MasonryGalleryComponent(renderer) {
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
    MasonryGalleryComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this.viewReady) {
            this.initMasonry();
        }
    };
    /**
     * @return {?}
     */
    MasonryGalleryComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.msnry) {
            this.msnry.destroy();
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    MasonryGalleryComponent.prototype.handleClick = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        this.clickImage.next(image);
    };
    /**
     * @return {?}
     */
    MasonryGalleryComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewReady = true;
        this.initMasonry();
    };
    /**
     * @return {?}
     */
    MasonryGalleryComponent.prototype.initMasonry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.grid = document.getElementById(this.galleryGuid);
        if (!this.grid) {
            throw Error("Could not init mansory due to non existing elem with id '" + this.galleryGuid + "'");
        }
        this.msnry = new masonry(this.grid, {
            // options...
            itemSelector: '.' + this.mansonryItemSelectorClass,
            columnWidth: this.columnWidth,
            gutter: this.gutter,
        });
        var /** @type {?} */ imageclass = this.getImageClass();
        // add images to mansonry layout
        this.images.forEach(function (image) {
            // generate unique image id
            var /** @type {?} */ imageId = _this.getImageId();
            // create element
            var /** @type {?} */ imageElem = _this.renderer.createElement('img');
            imageElem.setAttribute('id', imageId);
            imageElem.setAttribute('alt', image.alt ? image.alt : 'no description');
            imageElem.setAttribute('src', image.imageUrl);
            // note - images are hidden by default and should be shown only after they are loaded
            imageElem.setAttribute('style', "max-width: " + _this.columnWidth + "px; margin-bottom: " + _this.gutter + "px");
            imageElem.className = imageclass;
            imageElem.addEventListener('load', function () {
                _this.handleImageLoad(imageId);
            });
            imageElem.addEventListener('click', function () {
                _this.handleClick(image);
            });
            // add to dom and mansory & refresh layout
            // add to dom and mansory & refresh layout
            _this.grid.appendChild(imageElem);
        });
    };
    /**
     * @return {?}
     */
    MasonryGalleryComponent.prototype.getImageClass = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ className = this.hiddenClass + ' ' + this.mansonryItemSelectorClass;
        if (this.imageClasses && this.imageClasses.length > 0) {
            var /** @type {?} */ customClass = this.imageClasses.join(' ');
            className += ' ' + customClass;
        }
        return className;
    };
    /**
     * @return {?}
     */
    MasonryGalleryComponent.prototype.getImageId = /**
     * @return {?}
     */
    function () {
        return this.galleryGuid + "_" + utilities.newGuid();
    };
    /**
     * @param {?} imageId
     * @return {?}
     */
    MasonryGalleryComponent.prototype.handleImageLoad = /**
     * @param {?} imageId
     * @return {?}
     */
    function (imageId) {
        // find loaded image
        var /** @type {?} */ image = document.getElementById(imageId);
        if (!image) {
            return;
        }
        // unhide image
        image.classList.remove(this.hiddenClass);
        // append image to masonry
        this.msnry.appended(image);
    };
    MasonryGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-masonry-gallery',
                    template: '<div [id]="galleryGuid"></div>',
                    styles: ['.hidden { display: none; }']
                },] },
    ];
    /** @nocollapse */
    MasonryGalleryComponent.ctorParameters = function () { return [
        { type: Renderer2, },
    ]; };
    MasonryGalleryComponent.propDecorators = {
        "images": [{ type: Input },],
        "columnWidth": [{ type: Input },],
        "gutter": [{ type: Input },],
        "imageClasses": [{ type: Input },],
        "clickImage": [{ type: Output },],
    };
    return MasonryGalleryComponent;
}());
export { MasonryGalleryComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzb25yeS1nYWxsZXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXNvbnJ5LWdhbGxlcnktbGliLyIsInNvdXJjZXMiOlsibGliL21hc29ucnktZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxLQUFLLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDOztJQTRCcEMsaUNBQ1k7UUFBQSxhQUFRLEdBQVIsUUFBUTtzQkFwQnFCLEVBQUU7MkJBQ1osR0FBRztzQkFDUixDQUFDOzRCQUNPLEVBQUU7MEJBRWIsSUFBSSxZQUFZLEVBQXVCOzs7OzJCQUt4QixTQUFTLENBQUMsT0FBTyxFQUFFO3lDQUNaLFdBQVc7MkJBQ2pCLFFBQVE7eUJBS2xCLEtBQUs7S0FLakM7Ozs7SUFFRCw2Q0FBVzs7O0lBQVg7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7S0FDSjs7OztJQUVELDZDQUFXOzs7SUFBWDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN4QjtLQUNKOzs7OztJQUVELDZDQUFXOzs7O0lBQVgsVUFBWSxLQUEwQjtRQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMvQjs7OztJQUVELGlEQUFlOzs7SUFBZjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FB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TSxDQUFDO1NBQ1Y7O1FBR0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUd6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O2dCQXpIbEMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLE1BQU0sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN6Qzs7OztnQkFWcUYsU0FBUzs7OzJCQWExRixLQUFLO2dDQUNMLEtBQUs7MkJBQ0wsS0FBSztpQ0FDTCxLQUFLOytCQUVMLE1BQU07O2tDQWxCWDs7U0FXYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBtYXNvbnJ5IGZyb20gJ21hc29ucnktbGF5b3V0JztcclxuXHJcbmltcG9ydCB7IE1hc29ucnlHYWxsZXJ5SW1hZ2UgfSBmcm9tICcuL21hc29ucnktZ2FsbGVyeS1tb2RlbHMnO1xyXG5pbXBvcnQgeyB1dGlsaXRpZXMgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hc29ucnktZ2FsbGVyeScsXHJcbiAgICB0ZW1wbGF0ZTogJzxkaXYgW2lkXT1cImdhbGxlcnlHdWlkXCI+PC9kaXY+JyxcclxuICAgIHN0eWxlczogWycuaGlkZGVuIHsgZGlzcGxheTogbm9uZTsgfSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXNvbnJ5R2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSBpbWFnZXM6IE1hc29ucnlHYWxsZXJ5SW1hZ2VbXSA9IFtdO1xyXG4gICAgQElucHV0KCkgY29sdW1uV2lkdGg6IG51bWJlciA9IDMzMDtcclxuICAgIEBJbnB1dCgpIGd1dHRlcjogbnVtYmVyID0gNTtcclxuICAgIEBJbnB1dCgpIGltYWdlQ2xhc3Nlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2xpY2tJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFzb25yeUdhbGxlcnlJbWFnZT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBnYWxsZXJ5IGd1aWQgdXNlZCBmb3IgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBtdWx0aXBsZSBnYWxsZXJpZXMgb24gcGFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZ2FsbGVyeUd1aWQ6IHN0cmluZyA9IHV0aWxpdGllcy5uZXdHdWlkKCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1hbnNvbnJ5SXRlbVNlbGVjdG9yQ2xhc3MgPSAnZ3JpZC1pdGVtJztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaGlkZGVuQ2xhc3M6IHN0cmluZyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIHByaXZhdGUgbXNucnk/OiBhbnk7XHJcbiAgICBwcml2YXRlIGdyaWQ/OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSB2aWV3UmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdSZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRNYXNvbnJ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1zbnJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubXNucnkuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljayhpbWFnZTogTWFzb25yeUdhbGxlcnlJbWFnZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xpY2tJbWFnZS5uZXh0KGltYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3UmVhZHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaW5pdE1hc29ucnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNYXNvbnJ5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2FsbGVyeUd1aWQpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZ3JpZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ291bGQgbm90IGluaXQgbWFuc29yeSBkdWUgdG8gbm9uIGV4aXN0aW5nIGVsZW0gd2l0aCBpZCAnJHt0aGlzLmdhbGxlcnlHdWlkfSdgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubXNucnkgPSBuZXcgbWFzb25yeSh0aGlzLmdyaWQsIHtcclxuICAgICAgICAgICAgLy8gb3B0aW9ucy4uLlxyXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuJyArIHRoaXMubWFuc29ucnlJdGVtU2VsZWN0b3JDbGFzcyxcclxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IHRoaXMuY29sdW1uV2lkdGgsXHJcbiAgICAgICAgICAgIGd1dHRlcjogdGhpcy5ndXR0ZXIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGltYWdlY2xhc3MgPSB0aGlzLmdldEltYWdlQ2xhc3MoKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGltYWdlcyB0byBtYW5zb25yeSBsYXlvdXRcclxuICAgICAgICB0aGlzLmltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdW5pcXVlIGltYWdlIGlkXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlSWQgPSB0aGlzLmdldEltYWdlSWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBlbGVtZW50XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlRWxlbSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaW1hZ2VJZCk7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGltYWdlLmFsdCA/IGltYWdlLmFsdCA6ICdubyBkZXNjcmlwdGlvbicpO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZS5pbWFnZVVybCk7XHJcbiAgICAgICAgICAgIC8vIG5vdGUgLSBpbWFnZXMgYXJlIGhpZGRlbiBieSBkZWZhdWx0IGFuZCBzaG91bGQgYmUgc2hvd24gb25seSBhZnRlciB0aGV5IGFyZSBsb2FkZWRcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbWF4LXdpZHRoOiAke3RoaXMuY29sdW1uV2lkdGh9cHg7IG1hcmdpbi1ib3R0b206ICR7dGhpcy5ndXR0ZXJ9cHhgKTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLmNsYXNzTmFtZSA9IGltYWdlY2xhc3M7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVJbWFnZUxvYWQoaW1hZ2VJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKGltYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdG8gZG9tIGFuZCBtYW5zb3J5ICYgcmVmcmVzaCBsYXlvdXRcclxuICAgICAgICAgICAgdGhpcy5ncmlkLmFwcGVuZENoaWxkKGltYWdlRWxlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZUNsYXNzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuaGlkZGVuQ2xhc3MgKyAnICcgKyB0aGlzLm1hbnNvbnJ5SXRlbVNlbGVjdG9yQ2xhc3M7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmltYWdlQ2xhc3NlcyAmJiB0aGlzLmltYWdlQ2xhc3Nlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUNsYXNzID0gdGhpcy5pbWFnZUNsYXNzZXMuam9pbignICcpO1xyXG5cclxuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICcgJyArIGN1c3RvbUNsYXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEltYWdlSWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5R3VpZCArIGBfYCArIHV0aWxpdGllcy5uZXdHdWlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVJbWFnZUxvYWQoaW1hZ2VJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgLy8gZmluZCBsb2FkZWQgaW1hZ2VcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGltYWdlSWQpO1xyXG5cclxuICAgICAgICBpZiAoIWltYWdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVuaGlkZSBpbWFnZVxyXG4gICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5oaWRkZW5DbGFzcyk7XHJcblxyXG4gICAgICAgIC8vIGFwcGVuZCBpbWFnZSB0byBtYXNvbnJ5XHJcbiAgICAgICAgdGhpcy5tc25yeS5hcHBlbmRlZChpbWFnZSk7XHJcbiAgICB9XHJcbn1cclxuIl19