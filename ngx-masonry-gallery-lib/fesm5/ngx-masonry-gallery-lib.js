import { Component, EventEmitter, Input, Output, Renderer2, NgModule } from '@angular/core';
import * as masonry from 'masonry-layout';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    /**
     * @return {?}
     */
    Utilities.prototype.newGuid = /**
     * @return {?}
     */
    function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise triple-equals
            var /** @type {?} */ r = Math.random() * 16 | 0, /** @type {?} */ v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Utilities;
}());
var /** @type {?} */ utilities = new Utilities();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MasonryGalleryModule = /** @class */ (function () {
    function MasonryGalleryModule() {
    }
    MasonryGalleryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        MasonryGalleryComponent,
                    ],
                    exports: [
                        MasonryGalleryComponent,
                    ],
                },] },
    ];
    return MasonryGalleryModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MasonryGalleryImage = /** @class */ (function () {
    function MasonryGalleryImage(options) {
        Object.assign(this, options);
    }
    return MasonryGalleryImage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MasonryGalleryModule, MasonryGalleryImage, MasonryGalleryComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc29ucnktZ2FsbGVyeS1saWIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1tYXNvbnJ5LWdhbGxlcnktbGliL2xpYi91dGlsaXRpZXMudHMiLCJuZzovL25neC1tYXNvbnJ5LWdhbGxlcnktbGliL2xpYi9tYXNvbnJ5LWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFzb25yeS1nYWxsZXJ5LWxpYi9saWIvbWFzb25yeS1nYWxsZXJ5Lm1vZHVsZS50cyIsIm5nOi8vbmd4LW1hc29ucnktZ2FsbGVyeS1saWIvbGliL21hc29ucnktZ2FsbGVyeS1tb2RlbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFV0aWxpdGllcyB7XHJcbiAgICBuZXdHdWlkKCkge1xyXG4gICAgICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZSB0cmlwbGUtZXF1YWxzXHJcbiAgICAgICAgICAgY29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XHJcbiAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgfSk7XHJcbiAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCB1dGlsaXRpZXMgPSBuZXcgVXRpbGl0aWVzKCk7XHJcbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIG1hc29ucnkgZnJvbSAnbWFzb25yeS1sYXlvdXQnO1xyXG5cclxuaW1wb3J0IHsgTWFzb25yeUdhbGxlcnlJbWFnZSB9IGZyb20gJy4vbWFzb25yeS1nYWxsZXJ5LW1vZGVscyc7XHJcbmltcG9ydCB7IHV0aWxpdGllcyB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWFzb25yeS1nYWxsZXJ5JyxcclxuICAgIHRlbXBsYXRlOiAnPGRpdiBbaWRdPVwiZ2FsbGVyeUd1aWRcIj48L2Rpdj4nLFxyXG4gICAgc3R5bGVzOiBbJy5oaWRkZW4geyBkaXNwbGF5OiBub25lOyB9J11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hc29ucnlHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBJbnB1dCgpIGltYWdlczogTWFzb25yeUdhbGxlcnlJbWFnZVtdID0gW107XHJcbiAgICBASW5wdXQoKSBjb2x1bW5XaWR0aDogbnVtYmVyID0gMzMwO1xyXG4gICAgQElucHV0KCkgZ3V0dGVyOiBudW1iZXIgPSA1O1xyXG4gICAgQElucHV0KCkgaW1hZ2VDbGFzc2VzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIEBPdXRwdXQoKSBjbGlja0ltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXNvbnJ5R2FsbGVyeUltYWdlPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIGdhbGxlcnkgZ3VpZCB1c2VkIGZvciBkaXN0aW5ndWlzaGluZyBiZXR3ZWVuIG11bHRpcGxlIGdhbGxlcmllcyBvbiBwYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBnYWxsZXJ5R3VpZDogc3RyaW5nID0gdXRpbGl0aWVzLm5ld0d1aWQoKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWFuc29ucnlJdGVtU2VsZWN0b3JDbGFzcyA9ICdncmlkLWl0ZW0nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBoaWRkZW5DbGFzczogc3RyaW5nID0gJ2hpZGRlbic7XHJcblxyXG4gICAgcHJpdmF0ZSBtc25yeT86IGFueTtcclxuICAgIHByaXZhdGUgZ3JpZD86IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHZpZXdSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlld1JlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hc29ucnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubXNucnkpIHtcclxuICAgICAgICAgICAgdGhpcy5tc25yeS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGltYWdlOiBNYXNvbnJ5R2FsbGVyeUltYWdlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGlja0ltYWdlLm5leHQoaW1hZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXdSZWFkeSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbml0TWFzb25yeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdE1hc29ucnkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nYWxsZXJ5R3VpZCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5ncmlkKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBDb3VsZCBub3QgaW5pdCBtYW5zb3J5IGR1ZSB0byBub24gZXhpc3RpbmcgZWxlbSB3aXRoIGlkICcke3RoaXMuZ2FsbGVyeUd1aWR9J2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tc25yeSA9IG5ldyBtYXNvbnJ5KHRoaXMuZ3JpZCwge1xyXG4gICAgICAgICAgICAvLyBvcHRpb25zLi4uXHJcbiAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy4nICsgdGhpcy5tYW5zb25yeUl0ZW1TZWxlY3RvckNsYXNzLFxyXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogdGhpcy5jb2x1bW5XaWR0aCxcclxuICAgICAgICAgICAgZ3V0dGVyOiB0aGlzLmd1dHRlcixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1hZ2VjbGFzcyA9IHRoaXMuZ2V0SW1hZ2VDbGFzcygpO1xyXG5cclxuICAgICAgICAvLyBhZGQgaW1hZ2VzIHRvIG1hbnNvbnJ5IGxheW91dFxyXG4gICAgICAgIHRoaXMuaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xyXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB1bmlxdWUgaW1hZ2UgaWRcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VJZCA9IHRoaXMuZ2V0SW1hZ2VJZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGVsZW1lbnRcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VFbGVtID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpbWFnZUlkKTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLnNldEF0dHJpYnV0ZSgnYWx0JywgaW1hZ2UuYWx0ID8gaW1hZ2UuYWx0IDogJ25vIGRlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltYWdlLmltYWdlVXJsKTtcclxuICAgICAgICAgICAgLy8gbm90ZSAtIGltYWdlcyBhcmUgaGlkZGVuIGJ5IGRlZmF1bHQgYW5kIHNob3VsZCBiZSBzaG93biBvbmx5IGFmdGVyIHRoZXkgYXJlIGxvYWRlZFxyXG4gICAgICAgICAgICBpbWFnZUVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBtYXgtd2lkdGg6ICR7dGhpcy5jb2x1bW5XaWR0aH1weDsgbWFyZ2luLWJvdHRvbTogJHt0aGlzLmd1dHRlcn1weGApO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uY2xhc3NOYW1lID0gaW1hZ2VjbGFzcztcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUltYWdlTG9hZChpbWFnZUlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2soaW1hZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0byBkb20gYW5kIG1hbnNvcnkgJiByZWZyZXNoIGxheW91dFxyXG4gICAgICAgICAgICB0aGlzLmdyaWQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEltYWdlQ2xhc3MoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5oaWRkZW5DbGFzcyArICcgJyArIHRoaXMubWFuc29ucnlJdGVtU2VsZWN0b3JDbGFzcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VDbGFzc2VzICYmIHRoaXMuaW1hZ2VDbGFzc2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tQ2xhc3MgPSB0aGlzLmltYWdlQ2xhc3Nlcy5qb2luKCcgJyk7XHJcblxyXG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJyAnICsgY3VzdG9tQ2xhc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlHdWlkICsgYF9gICsgdXRpbGl0aWVzLm5ld0d1aWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUltYWdlTG9hZChpbWFnZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAvLyBmaW5kIGxvYWRlZCBpbWFnZVxyXG4gICAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW1hZ2VJZCk7XHJcblxyXG4gICAgICAgIGlmICghaW1hZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdW5oaWRlIGltYWdlXHJcbiAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmhpZGRlbkNsYXNzKTtcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kIGltYWdlIHRvIG1hc29ucnlcclxuICAgICAgICB0aGlzLm1zbnJ5LmFwcGVuZGVkKGltYWdlKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWFzb25yeUdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL21hc29ucnktZ2FsbGVyeS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBNYXNvbnJ5R2FsbGVyeUNvbXBvbmVudCxcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgTWFzb25yeUdhbGxlcnlDb21wb25lbnQsXHJcbiAgICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFzb25yeUdhbGxlcnlNb2R1bGUgeyB9XHJcbiIsImV4cG9ydCBjbGFzcyBNYXNvbnJ5R2FsbGVyeUltYWdlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVybCBvZiB0aGUgaW1hZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGFsdD86IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiB7XHJcbiAgICAgICAgLy8gcmVxdWlyZWRcclxuICAgICAgICBpbWFnZVVybDogc3RyaW5nLFxyXG5cclxuICAgICAgICAvLyBvcHRpb25hbFxyXG4gICAgICAgIGFsdD86IHN0cmluZyxcclxuICAgIH0pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUE7Ozs7OztJQUNJLDJCQUFPOzs7SUFBUDtRQUNHLE9BQU8sc0NBQXNDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7O1lBRXRFLHFCQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsbUJBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDckUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztLQUNOO29CQVBKO0lBUUMsQ0FBQTtBQVJELEFBVU8scUJBQUksU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7Ozs7OztBQ1Z2QztJQWdDSSxpQ0FDWTtRQUFBLGFBQVEsR0FBUixRQUFRO3NCQXBCcUIsRUFBRTsyQkFDWixH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