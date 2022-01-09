(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/o+h":
/*!**********************!*\
  !*** ./demo/main.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "Ep9k");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "HfbC");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./demo/main.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\OpenSource\ngx-masonry-gallery\demo\main.ts */"/o+h");


/***/ }),

/***/ "9/qy":
/*!*******************************************************************************!*\
  !*** ./projects/ngx-masonry-gallery-lib/src/lib/masonry-gallery.component.ts ***!
  \*******************************************************************************/
/*! exports provided: MasonryGalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasonryGalleryComponent", function() { return MasonryGalleryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "vX6Q");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! masonry-layout */ "sMUb");
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(masonry_layout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities */ "YfVy");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MasonryGalleryComponent = /** @class */ (function () {
    function MasonryGalleryComponent(renderer) {
        this.renderer = renderer;
        this.images = [];
        this.width = 330;
        this.gutter = 5;
        this.verticalGutter = 5;
        this.imageClasses = [];
        this.clickImage = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.removeComplete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.layoutComplete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.galleryGuid = _utilities__WEBPACK_IMPORTED_MODULE_3__["utilities"].newGuid();
        this.mansonryItemSelectorClass = "grid-item-" + this.galleryGuid;
        this.activeImages = [];
        this.viewReady = false;
    }
    MasonryGalleryComponent.prototype.ngOnChanges = function (changes) {
        if (changes.images && changes.images.currentValue) {
            if (!this.viewReady) {
                // process images once we can
                this.changesToProcess = changes;
            }
            else {
                this.processImages(changes);
            }
        }
    };
    MasonryGalleryComponent.prototype.ngOnDestroy = function () {
        if (this.msnry) {
            this.msnry.destroy();
        }
    };
    MasonryGalleryComponent.prototype.handleClick = function (image) {
        this.clickImage.next(image);
    };
    MasonryGalleryComponent.prototype.ngAfterViewInit = function () {
        this.viewReady = true;
        this.initMasonry();
        // process images now
        if (this.changesToProcess) {
            this.processImages(this.changesToProcess);
            this.changesToProcess = undefined;
        }
    };
    MasonryGalleryComponent.prototype.addImages = function (images) {
        if (images && images.length > 0) {
            this.addImagesToGallery(images);
        }
    };
    MasonryGalleryComponent.prototype.removeImages = function (images) {
        var _this = this;
        if (images && images.length > 0) {
            images.forEach(function (image) {
                _this.removeImageFromGallery(image);
            });
        }
    };
    MasonryGalleryComponent.prototype.processImages = function (changes) {
        var imagesToProcess = this.getAddedAndRemovesImages(changes);
        // add images to mansonry layout
        this.addImages(imagesToProcess.addedImages);
        // removes images from layout
        this.removeImages(imagesToProcess.removedImages);
    };
    MasonryGalleryComponent.prototype.getAddedAndRemovesImages = function (changes) {
        var addedImages = [];
        var removedImages = [];
        var newImagesValue = changes.images
            .currentValue;
        var oldImagesValue = changes.images
            .previousValue;
        if (!oldImagesValue) {
            // all images are new ones
            addedImages = changes.images.currentValue;
        }
        else {
            // process added images
            newImagesValue.forEach(function (newImage) {
                var existingImage = oldImagesValue.find(function (m) { return m.imageUrl.toLowerCase() === newImage.imageUrl.toLowerCase(); });
                if (existingImage) {
                    // image was in previous value && is in new, do nothing
                }
                else {
                    // image is new
                    addedImages.push(newImage);
                }
            });
            // process removed images
            oldImagesValue.forEach(function (oldImage) {
                var existingImage = newImagesValue.find(function (m) { return m.imageUrl.toLowerCase() === oldImage.imageUrl.toLowerCase(); });
                if (existingImage) {
                    // image was in previous value && is in new, do nothing
                }
                else {
                    // image is removed
                    removedImages.push(oldImage);
                }
            });
        }
        return {
            addedImages: addedImages,
            removedImages: removedImages
        };
    };
    MasonryGalleryComponent.prototype.initMasonry = function () {
        this.grid = document.getElementById(this.galleryGuid);
        // remove all existing data from grid
        this.grid.innerHTML = '';
        if (!this.grid) {
            throw Error("Could not init mansory due to non existing elem with id '" + this.galleryGuid + "'");
        }
        this.msnry = new masonry_layout__WEBPACK_IMPORTED_MODULE_2__(this.grid, {
            // options...
            itemSelector: '.' + this.mansonryItemSelectorClass,
            columnWidth: this.width,
            gutter: this.gutter,
        });
        var that = this;
        this.msnry.on('layoutComplete', function (items) {
            that.layoutComplete.next(items);
        });
        this.msnry.on('removeComplete', function (items) {
            that.removeComplete.next(items);
        });
    };
    MasonryGalleryComponent.prototype.removeImageFromGallery = function (image) {
        // get image guid
        var imageIdResult = this.activeImages.find(function (m) { return m.image.imageUrl.toLowerCase() === image.imageUrl.toLowerCase(); });
        if (!imageIdResult) {
            // image was not found, this is probably an error
            console.warn("Image with url '" + image.imageUrl + "' was not found. If you are adding images, make sure to 'replace' the images array with a new one\n                so that detection change can be executed instead of just adding an image to array\n                (which doesn't fire change detection on array property)");
            return;
        }
        // find image based on its id
        var imageElem = document.getElementById(imageIdResult.id);
        if (!imageElem) {
            // image was not found in DOM
            console.warn("Image with id '{" + imageIdResult.id + "}' was not found in DOM. Have you manipulated the DOM in some way?");
            return;
        }
        // remove image from gallery
        this.msnry.remove(imageElem);
        // refresh layout
        this.msnry.layout();
        // remove image from array
        for (var i = 0; i < this.activeImages.length; i++) {
            var idWithImage = this.activeImages[i];
            if (idWithImage.image.imageUrl.toLowerCase() ===
                imageIdResult.image.imageUrl.toLowerCase()) {
                this.activeImages.splice(i, 1);
            }
        }
    };
    MasonryGalleryComponent.prototype.addImagesToGallery = function (images) {
        var _this = this;
        if (!this.grid) {
            throw Error('Grid element is not yet ready, are you trying to add image too soon?');
        }
        var imagesWrapper = this.renderer.createElement('span');
        images.forEach(function (image) {
            // generate unique image id
            var imageId = _this.getImageId();
            // create element
            var imageElem = _this.renderer.createElement('img');
            imageElem.setAttribute('id', imageId);
            imageElem.setAttribute('alt', image.alt ? image.alt : 'no description');
            imageElem.setAttribute('src', image.imageUrl);
            // note - images are hidden by default and should be shown only after they are loaded
            imageElem.setAttribute('style', "display: none; width: " + _this.width + "px; margin-bottom: " + _this.verticalGutter + "px");
            imageElem.className = _this.getImageClass();
            imageElem.addEventListener('click', function () {
                _this.handleClick(image);
            });
            // store guid with this image
            _this.activeImages.push({
                id: imageId,
                image: image
            });
            // add to dom and mansory & refresh layout
            _this.renderer.appendChild(imagesWrapper, imageElem);
        });
        // add html to dom
        this.renderer.appendChild(this.grid, imagesWrapper);
        // add images once they are loaded
        var imgLoad = imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(imagesWrapper);
        imgLoad.on('progress', function (instance, image) {
            if (image.isLoaded) {
                _this.renderer.appendChild(_this.grid, image.img);
                // unhide image
                _this.renderer.setStyle(image.img, 'display', 'block');
                _this.msnry.appended(image.img);
                _this.msnry.reloadItems();
            }
        });
    };
    MasonryGalleryComponent.prototype.getImageClass = function () {
        var className = this.mansonryItemSelectorClass;
        if (this.imageClasses && this.imageClasses.length > 0) {
            var customClass = this.imageClasses.join(' ');
            className += ' ' + customClass;
        }
        return className;
    };
    MasonryGalleryComponent.prototype.getImageId = function () {
        return this.galleryGuid + '_' + _utilities__WEBPACK_IMPORTED_MODULE_3__["utilities"].newGuid();
    };
    MasonryGalleryComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
    ]; };
    MasonryGalleryComponent.propDecorators = {
        images: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        width: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        gutter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        verticalGutter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        imageClasses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        clickImage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        removeComplete: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        layoutComplete: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
    };
    MasonryGalleryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            selector: 'ngx-masonry-gallery',
            template: '<div [id]="galleryGuid"></div>'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], MasonryGalleryComponent);
    return MasonryGalleryComponent;
}());



/***/ }),

/***/ "Ep9k":
/*!********************************!*\
  !*** ./demo/app/app.module.ts ***!
  \********************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _projects_ngx_masonry_gallery_lib_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projects/ngx-masonry-gallery-lib/src/public_api */ "Ob7k");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "LoHn");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _projects_ngx_masonry_gallery_lib_src_public_api__WEBPACK_IMPORTED_MODULE_2__["MasonryGalleryModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "HfbC":
/*!******************************************!*\
  !*** ./demo/environments/environment.ts ***!
  \******************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Kcz/":
/*!************************************!*\
  !*** ./demo/app/app.component.css ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "LoHn":
/*!***********************************!*\
  !*** ./demo/app/app.component.ts ***!
  \***********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./app.component.html */ "uNA4");
/* harmony import */ var _app_component_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.css */ "Kcz/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var projects_ngx_masonry_gallery_lib_src_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! projects/ngx-masonry-gallery-lib/src/lib */ "eLUV");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.numberOfInitiallyShownImages = 8;
        this.numberOfImages = 23;
        this.multipleImagesCount = 3;
        this.imagePath = 'assets/images-compressed/';
        this.imageExt = 'jpg';
        this.installation = "npm install ngx-masonry-gallery --save";
        this.moduleRegistration = "\nimport { NgModule } from '@angular/core';\nimport { MasonryGalleryModule } from 'ngx-masonry-gallery';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    MasonryGalleryModule\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }\n";
        this.tsCode = "\nimport { IMasonryGalleryImage } from 'ngx-masonry-gallery';\n\nexport class AppComponent {\n\n    private urls: string[] = [\n        'https://www.ogttx.org/wp-content/themes/ogt/media/_frontend/img/bkg.jpg',\n        'http://www.magicalkenya.com/wp-content/uploads/2014/08/homebannerimg4.jpg',\n        'https://media.gadventures.com/media-server/cache/12/59/12591a5497a563245d0255824103842e.jpg',\n        'https://i.pinimg.com/originals/1c/aa/c5/1caac55143e3e11461c6ae5962403deb.jpg',\n        'http://littleguyintheeye.com/wp-content/uploads/2014/08/nature-3.jpg',\n    ];\n\n    public get images(): IMasonryGalleryImage[] {\n        return this.urls.map(m => <IMasonryGalleryImage>{\n            imageUrl: m\n    });\n  }\n}\n";
        this.usage = "<ngx-masonry-gallery [width]='250' [images]='images'></ngx-masonry-gallery>";
        this.usedImages = [];
        this.pool = [];
        // init pool
        for (var i = 1; i <= this.numberOfImages; i++) {
            var image = {
                imageUrl: "" + this.imagePath + i + "." + this.imageExt
            };
            this.pool.push(image);
        }
        // init initial images
        var images = [];
        for (var i = 1; i <= this.numberOfInitiallyShownImages; i++) {
            var image = this.pool[Math.floor(Math.random() * this.pool.length)];
            // remove image from pool
            this.removeFromPoolImages(image);
            images.push(image);
            this.usedImages.push(image);
        }
        this.initialImages = images;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.prettify();
    };
    AppComponent.prototype.addRandomImage = function () {
        if (this.pool.length === 0) {
            alert('No more images!');
            return;
        }
        var image = this.pool[Math.floor(Math.random() * this.pool.length)];
        if (image) {
            this.masonryGallery.addImages([image]);
            this.usedImages.push(image);
            // remove image from pool
            this.removeFromPoolImages(image);
        }
    };
    AppComponent.prototype.removeRandomImage = function () {
        var image = this.usedImages[Math.floor(Math.random() * this.usedImages.length)];
        if (image) {
            this.usedImages = this.usedImages.filter(function (m) { return m.imageUrl.toLowerCase() !== image.imageUrl.toLowerCase(); });
            // add image back to pool
            this.pool.push(image);
            // remove
            this.masonryGallery.removeImages([image]);
        }
    };
    AppComponent.prototype.addMultipleImages = function () {
        var imagesToAdd = [];
        for (var i = 0; i < this.multipleImagesCount; i++) {
            var image = this.pool[Math.floor(Math.random() * this.pool.length)];
            if (image) {
                this.usedImages.push(image);
                imagesToAdd.push(image);
                // remove image from pool
                this.removeFromPoolImages(image);
            }
        }
        this.masonryGallery.addImages(imagesToAdd);
    };
    AppComponent.prototype.removeMultipleImages = function () {
        var imagesToRemove = [];
        for (var i = 0; i < this.multipleImagesCount; i++) {
            var image = this.usedImages[Math.floor(Math.random() * this.usedImages.length)];
            if (image) {
                this.pool.push(image);
                imagesToRemove.push(image);
                this.removeFromUsedImages(image);
            }
        }
        this.masonryGallery.removeImages(imagesToRemove);
    };
    AppComponent.prototype.removeFromPoolImages = function (image) {
        for (var i = 0; i < this.pool.length; i++) {
            var usedImage = this.pool[i];
            if (usedImage.imageUrl.toLowerCase() === image.imageUrl.toLowerCase()) {
                this.pool.splice(i, 1);
            }
        }
    };
    AppComponent.prototype.removeFromUsedImages = function (image) {
        for (var i = 0; i < this.usedImages.length; i++) {
            var usedImage = this.usedImages[i];
            if (usedImage.imageUrl.toLowerCase() === image.imageUrl.toLowerCase()) {
                this.usedImages.splice(i, 1);
            }
        }
    };
    AppComponent.prototype.prettify = function () {
        hljs.initHighlightingOnLoad();
    };
    AppComponent.ctorParameters = function () { return []; };
    AppComponent.propDecorators = {
        masonryGallery: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: ['masonryGallery', { static: false },] }]
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-root',
            template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_app_component_css__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "Ob7k":
/*!************************************************************!*\
  !*** ./projects/ngx-masonry-gallery-lib/src/public_api.ts ***!
  \************************************************************/
/*! exports provided: MasonryGalleryModule, IMasonryGalleryImage, MasonryGalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index */ "eLUV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MasonryGalleryModule", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["MasonryGalleryModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IMasonryGalleryImage", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["IMasonryGalleryImage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MasonryGalleryComponent", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["MasonryGalleryComponent"]; });

/*
 * Public API
 */



/***/ }),

/***/ "YfVy":
/*!***************************************************************!*\
  !*** ./projects/ngx-masonry-gallery-lib/src/lib/utilities.ts ***!
  \***************************************************************/
/*! exports provided: Utilities, utilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utilities", function() { return Utilities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utilities", function() { return utilities; });
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    Utilities.prototype.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise triple-equals
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Utilities;
}());

var utilities = new Utilities();


/***/ }),

/***/ "eLUV":
/*!***********************************************************!*\
  !*** ./projects/ngx-masonry-gallery-lib/src/lib/index.ts ***!
  \***********************************************************/
/*! exports provided: MasonryGalleryModule, IMasonryGalleryImage, MasonryGalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _masonry_gallery_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masonry-gallery.module */ "zWV5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MasonryGalleryModule", function() { return _masonry_gallery_module__WEBPACK_IMPORTED_MODULE_0__["MasonryGalleryModule"]; });

/* harmony import */ var _masonry_gallery_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./masonry-gallery-models */ "hCLF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IMasonryGalleryImage", function() { return _masonry_gallery_models__WEBPACK_IMPORTED_MODULE_1__["IMasonryGalleryImage"]; });

/* harmony import */ var _masonry_gallery_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./masonry-gallery.component */ "9/qy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MasonryGalleryComponent", function() { return _masonry_gallery_component__WEBPACK_IMPORTED_MODULE_2__["MasonryGalleryComponent"]; });






/***/ }),

/***/ "hCLF":
/*!****************************************************************************!*\
  !*** ./projects/ngx-masonry-gallery-lib/src/lib/masonry-gallery-models.ts ***!
  \****************************************************************************/
/*! exports provided: IMasonryGalleryImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMasonryGalleryImage", function() { return IMasonryGalleryImage; });
var IMasonryGalleryImage = /** @class */ (function () {
    function IMasonryGalleryImage() {
    }
    return IMasonryGalleryImage;
}());



/***/ }),

/***/ "uNA4":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./demo/app/app.component.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Masonry gallery demo</h1>\r\n\r\n<div class=\"alert alert-warning\" role=\"alert\">\r\n  More features will be added depending on how much traction this gets. To show support, please consider starring the <a href=\"https://github.com/Enngage/ngx-masonry-gallery\">repo</a>.\r\n</div>\r\n\r\n<div class=\"mt-4\">\r\n    <button (click)=\"addRandomImage()\" type=\"button\" class=\"btn btn-success\">Add random image</button>\r\n    <button (click)=\"removeRandomImage()\" type=\"button\" class=\"btn btn-danger ml-2\">remove random image</button>\r\n    <button (click)=\"addMultipleImages()\" type=\"button\" class=\"btn btn-success ml-2\">Add {{ multipleImagesCount }} images</button>\r\n    <button (click)=\"removeMultipleImages()\" type=\"button\" class=\"btn btn-danger ml-2\">Remove {{ multipleImagesCount }} images</button>\r\n</div>\r\n\r\n<div class=\"mt-2\">\r\n    <ngx-masonry-gallery #masonryGallery [width]=\"250\" [images]=\"initialImages\"></ngx-masonry-gallery>\r\n</div>\r\n\r\n<h2 class=\"mt-3\">\r\n    Installation\r\n</h2>\r\n\r\n<div class=\"mt-2\">\r\n    <pre>\r\n        <code [innerText]=\"installation\"></code>\r\n    </pre>\r\n</div>\r\n\r\n<h2>\r\n    Module inicialization\r\n</h2>\r\n\r\n<div>\r\n    <pre class=\"mt-2\">\r\n        <code [innerText]=\"moduleRegistration\"></code>\r\n    </pre>\r\n</div>\r\n\r\n<h2>\r\n    Usage\r\n</h2>\r\n\r\n<div class=\"mt-2\">\r\n    <pre >\r\n        <code [innerText]=\"usage\"></code>\r\n        <code [innerText]=\"tsCode\"></code>\r\n    </pre>\r\n</div>\r\n\r\n<h2>\r\n    Configuration\r\n</h2>\r\n\r\n<div class=\"mt-2\">\r\n    <table class=\"table\">\r\n        <thead>\r\n            <tr>\r\n                <th scope=\"col\">Property</th>\r\n                <th scope=\"col\">Type</th>\r\n                <th scope=\"col\">Description</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td>width</td>\r\n                <td>number</td>\r\n                <td>Width of the column in pixels</td>\r\n            </tr>\r\n            <tr>\r\n                <td>gutter</td>\r\n                <td>number</td>\r\n                <td>Size of gutter between columns in pixels</td>\r\n            </tr>\r\n            <tr>\r\n                <td>verticalGutter</td>\r\n                <td>number</td>\r\n                <td>Size of the gutter between particular items in pixels. Can be combined with gutter to create all around gutter.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>imageClasses</td>\r\n                <td>string[]</td>\r\n                <td>Array of classes added to images for custom styling</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n\r\n\r\n<h2>\r\n    Methods\r\n</h2>\r\n\r\n<div class=\"mt-2\">\r\n    <table class=\"table\">\r\n        <thead>\r\n            <tr>\r\n                <th scope=\"col\">Method</th>\r\n                <th scope=\"col\">Input</th>\r\n                <th scope=\"col\">Description</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td>addImages</td>\r\n                <td>IMasonryGalleryImage[]</td>\r\n                <td>Adds given images to gallery</td>\r\n            </tr>\r\n            <tr>\r\n                <td>removeImages</td>\r\n                <td>IMasonryGalleryImage[]</td>\r\n                <td>Removes selected images from gallery</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n\r\n<h2>\r\n    Events\r\n</h2>\r\n\r\n<div class=\"mt-2\">\r\n    <table class=\"table\">\r\n        <thead>\r\n            <tr>\r\n                <th scope=\"col\">Event</th>\r\n                <th scope=\"col\">Type</th>\r\n                <th scope=\"col\">Description</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td>clickImage</td>\r\n                <td>Output</td>\r\n                <td>Executes when an image is clicked.\r\n                    <strong>IMasonryGalleryImage</strong> is passed to event.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>layoutComplete</td>\r\n                <td>Output</td>\r\n                <td>See <a href=\"https://masonry.desandro.com/events.html#layoutcomplete\">layoutComplete</a>. Contains layout items.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>removeComplete</td>\r\n                <td>Output</td>\r\n                <td>See <a href=\"https://masonry.desandro.com/events.html#removecomplete\">removeComplete</a>. Contains removed items.</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>");

/***/ }),

/***/ "zWV5":
/*!****************************************************************************!*\
  !*** ./projects/ngx-masonry-gallery-lib/src/lib/masonry-gallery.module.ts ***!
  \****************************************************************************/
/*! exports provided: MasonryGalleryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasonryGalleryModule", function() { return MasonryGalleryModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _masonry_gallery_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./masonry-gallery.component */ "9/qy");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MasonryGalleryModule = /** @class */ (function () {
    function MasonryGalleryModule() {
    }
    MasonryGalleryModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
            ],
            declarations: [
                _masonry_gallery_component__WEBPACK_IMPORTED_MODULE_2__["MasonryGalleryComponent"],
            ],
            exports: [
                _masonry_gallery_component__WEBPACK_IMPORTED_MODULE_2__["MasonryGalleryComponent"],
            ],
        })
    ], MasonryGalleryModule);
    return MasonryGalleryModule;
}());



/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map