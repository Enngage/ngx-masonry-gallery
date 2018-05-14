(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('masonry-layout'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-masonry-gallery-lib', ['exports', '@angular/core', 'masonry-layout', '@angular/common'], factory) :
    (factory((global['ngx-masonry-gallery-lib'] = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,core,masonry,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Utilities = (function () {
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
    var MasonryGalleryComponent = (function () {
        function MasonryGalleryComponent(renderer) {
            this.renderer = renderer;
            this.images = [];
            this.columnWidth = 330;
            this.gutter = 5;
            this.imageClasses = [];
            this.clickImage = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'ngx-masonry-gallery',
                        template: '<div [id]="galleryGuid"></div>',
                        styles: ['.hidden { display: none; }']
                    },] },
        ];
        /** @nocollapse */
        MasonryGalleryComponent.ctorParameters = function () {
            return [
                { type: core.Renderer2, },
            ];
        };
        MasonryGalleryComponent.propDecorators = {
            "images": [{ type: core.Input },],
            "columnWidth": [{ type: core.Input },],
            "gutter": [{ type: core.Input },],
            "imageClasses": [{ type: core.Input },],
            "clickImage": [{ type: core.Output },],
        };
        return MasonryGalleryComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MasonryGalleryModule = (function () {
        function MasonryGalleryModule() {
        }
        MasonryGalleryModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
    var MasonryGalleryImage = (function () {
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

    exports.MasonryGalleryModule = MasonryGalleryModule;
    exports.MasonryGalleryImage = MasonryGalleryImage;
    exports.MasonryGalleryComponent = MasonryGalleryComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc29ucnktZ2FsbGVyeS1saWIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtbWFzb25yeS1nYWxsZXJ5LWxpYi9saWIvdXRpbGl0aWVzLnRzIiwibmc6Ly9uZ3gtbWFzb25yeS1nYWxsZXJ5LWxpYi9saWIvbWFzb25yeS1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hc29ucnktZ2FsbGVyeS1saWIvbGliL21hc29ucnktZ2FsbGVyeS5tb2R1bGUudHMiLCJuZzovL25neC1tYXNvbnJ5LWdhbGxlcnktbGliL2xpYi9tYXNvbnJ5LWdhbGxlcnktbW9kZWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBVdGlsaXRpZXMge1xyXG4gICAgbmV3R3VpZCgpIHtcclxuICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2UgdHJpcGxlLWVxdWFsc1xyXG4gICAgICAgICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xyXG4gICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgICAgIH0pO1xyXG4gICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgdXRpbGl0aWVzID0gbmV3IFV0aWxpdGllcygpO1xyXG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBtYXNvbnJ5IGZyb20gJ21hc29ucnktbGF5b3V0JztcclxuXHJcbmltcG9ydCB7IE1hc29ucnlHYWxsZXJ5SW1hZ2UgfSBmcm9tICcuL21hc29ucnktZ2FsbGVyeS1tb2RlbHMnO1xyXG5pbXBvcnQgeyB1dGlsaXRpZXMgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hc29ucnktZ2FsbGVyeScsXHJcbiAgICB0ZW1wbGF0ZTogJzxkaXYgW2lkXT1cImdhbGxlcnlHdWlkXCI+PC9kaXY+JyxcclxuICAgIHN0eWxlczogWycuaGlkZGVuIHsgZGlzcGxheTogbm9uZTsgfSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXNvbnJ5R2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSBpbWFnZXM6IE1hc29ucnlHYWxsZXJ5SW1hZ2VbXSA9IFtdO1xyXG4gICAgQElucHV0KCkgY29sdW1uV2lkdGg6IG51bWJlciA9IDMzMDtcclxuICAgIEBJbnB1dCgpIGd1dHRlcjogbnVtYmVyID0gNTtcclxuICAgIEBJbnB1dCgpIGltYWdlQ2xhc3Nlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2xpY2tJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFzb25yeUdhbGxlcnlJbWFnZT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBnYWxsZXJ5IGd1aWQgdXNlZCBmb3IgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBtdWx0aXBsZSBnYWxsZXJpZXMgb24gcGFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZ2FsbGVyeUd1aWQ6IHN0cmluZyA9IHV0aWxpdGllcy5uZXdHdWlkKCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1hbnNvbnJ5SXRlbVNlbGVjdG9yQ2xhc3MgPSAnZ3JpZC1pdGVtJztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaGlkZGVuQ2xhc3M6IHN0cmluZyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIHByaXZhdGUgbXNucnk/OiBhbnk7XHJcbiAgICBwcml2YXRlIGdyaWQ/OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSB2aWV3UmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdSZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRNYXNvbnJ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1zbnJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubXNucnkuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljayhpbWFnZTogTWFzb25yeUdhbGxlcnlJbWFnZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xpY2tJbWFnZS5uZXh0KGltYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3UmVhZHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaW5pdE1hc29ucnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNYXNvbnJ5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2FsbGVyeUd1aWQpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZ3JpZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ291bGQgbm90IGluaXQgbWFuc29yeSBkdWUgdG8gbm9uIGV4aXN0aW5nIGVsZW0gd2l0aCBpZCAnJHt0aGlzLmdhbGxlcnlHdWlkfSdgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubXNucnkgPSBuZXcgbWFzb25yeSh0aGlzLmdyaWQsIHtcclxuICAgICAgICAgICAgLy8gb3B0aW9ucy4uLlxyXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuJyArIHRoaXMubWFuc29ucnlJdGVtU2VsZWN0b3JDbGFzcyxcclxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IHRoaXMuY29sdW1uV2lkdGgsXHJcbiAgICAgICAgICAgIGd1dHRlcjogdGhpcy5ndXR0ZXIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGltYWdlY2xhc3MgPSB0aGlzLmdldEltYWdlQ2xhc3MoKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGltYWdlcyB0byBtYW5zb25yeSBsYXlvdXRcclxuICAgICAgICB0aGlzLmltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdW5pcXVlIGltYWdlIGlkXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlSWQgPSB0aGlzLmdldEltYWdlSWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBlbGVtZW50XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlRWxlbSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaW1hZ2VJZCk7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGltYWdlLmFsdCA/IGltYWdlLmFsdCA6ICdubyBkZXNjcmlwdGlvbicpO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZS5pbWFnZVVybCk7XHJcbiAgICAgICAgICAgIC8vIG5vdGUgLSBpbWFnZXMgYXJlIGhpZGRlbiBieSBkZWZhdWx0IGFuZCBzaG91bGQgYmUgc2hvd24gb25seSBhZnRlciB0aGV5IGFyZSBsb2FkZWRcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbWF4LXdpZHRoOiAke3RoaXMuY29sdW1uV2lkdGh9cHg7IG1hcmdpbi1ib3R0b206ICR7dGhpcy5ndXR0ZXJ9cHhgKTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtLmNsYXNzTmFtZSA9IGltYWdlY2xhc3M7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVJbWFnZUxvYWQoaW1hZ2VJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKGltYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdG8gZG9tIGFuZCBtYW5zb3J5ICYgcmVmcmVzaCBsYXlvdXRcclxuICAgICAgICAgICAgdGhpcy5ncmlkLmFwcGVuZENoaWxkKGltYWdlRWxlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZUNsYXNzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuaGlkZGVuQ2xhc3MgKyAnICcgKyB0aGlzLm1hbnNvbnJ5SXRlbVNlbGVjdG9yQ2xhc3M7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmltYWdlQ2xhc3NlcyAmJiB0aGlzLmltYWdlQ2xhc3Nlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUNsYXNzID0gdGhpcy5pbWFnZUNsYXNzZXMuam9pbignICcpO1xyXG5cclxuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICcgJyArIGN1c3RvbUNsYXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEltYWdlSWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5R3VpZCArIGBfYCArIHV0aWxpdGllcy5uZXdHdWlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVJbWFnZUxvYWQoaW1hZ2VJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgLy8gZmluZCBsb2FkZWQgaW1hZ2VcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGltYWdlSWQpO1xyXG5cclxuICAgICAgICBpZiAoIWltYWdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVuaGlkZSBpbWFnZVxyXG4gICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5oaWRkZW5DbGFzcyk7XHJcblxyXG4gICAgICAgIC8vIGFwcGVuZCBpbWFnZSB0byBtYXNvbnJ5XHJcbiAgICAgICAgdGhpcy5tc25yeS5hcHBlbmRlZChpbWFnZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE1hc29ucnlHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9tYXNvbnJ5LWdhbGxlcnkuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgTWFzb25yeUdhbGxlcnlDb21wb25lbnQsXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIE1hc29ucnlHYWxsZXJ5Q29tcG9uZW50LFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hc29ucnlHYWxsZXJ5TW9kdWxlIHsgfVxyXG4iLCJleHBvcnQgY2xhc3MgTWFzb25yeUdhbGxlcnlJbWFnZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcmwgb2YgdGhlIGltYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbWFnZVVybDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBhbHQ/OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczoge1xyXG4gICAgICAgIC8vIHJlcXVpcmVkXHJcbiAgICAgICAgaW1hZ2VVcmw6IHN0cmluZyxcclxuXHJcbiAgICAgICAgLy8gb3B0aW9uYWxcclxuICAgICAgICBhbHQ/OiBzdHJpbmcsXHJcbiAgICB9KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiUmVuZGVyZXIyIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFBLElBQUE7Ozs7OztRQUNJLDJCQUFPOzs7WUFBUDtnQkFDRyxPQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDOztvQkFFdEUscUJBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxtQkFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDckUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN6QixDQUFDLENBQUM7YUFDTjt3QkFQSjtRQVFDLENBQUE7QUFSRCxJQVVPLHFCQUFJLFNB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