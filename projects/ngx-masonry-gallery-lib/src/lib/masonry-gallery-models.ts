export class MasonryGalleryImage {

    /**
     * Url of the image
     */
    public imageUrl: string;

    public alt?: string;

    constructor(options: {
        // required
        imageUrl: string,

        // optional
        alt?: string,
    }) {
        Object.assign(this, options);
    }
}
