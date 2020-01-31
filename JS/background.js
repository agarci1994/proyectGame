class Background {
    constructor(ctx, w, h, url, keys) {
        this._ctx = ctx
        this._width = w
        this._height = h

        this._image = new Image()
        this._image.src = url

        this._posX = 0
        this._posY = 0

        this._keys = keys
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }




}