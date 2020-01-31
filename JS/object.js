class Object {
    constructor(ctx, w, h, x, y, url) {
        this._ctx = ctx;
        this._width = w
        this._height = h
        this._posX = x
        this._posY = y

        this._image = new Image()
        this._image.src = url
    }

    draw() {

        this._ctx.drawImage(
            this._image,
            this._posX,
            this._posY,
            this._width,
            this._height
        );
    }
}