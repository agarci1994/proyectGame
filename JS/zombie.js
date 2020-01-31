class Zombie {
    constructor(ctx, w, h, urlLeft, urlRight) {
        this._ctx = ctx;
        this._width = 30
        this._height = 70
        this._velX = 10;
        this._posX = Math.random() * (w * 0.9)
        this._posY = Math.random() * ((h * 0.8) - 100) + 100
        this._posX0 = this._posX
        this._vel = 1.2

        this._image = new Image();
        this._image.src = urlLeft
        this._imageRight = urlRight
        this._imageLeft = urlLeft
        this._image.frames = 5;
        this._image.framesIndex = 0;
        this.nightCat = false
        this._imageCatRight = "RECURSOS/PERSONAJES/catleft.png"
        this._imageCatLeft = "RECURSOS/PERSONAJES/cat.png"
    }

    draw(framesCounter) {
        this._ctx.drawImage(
            this._image,
            this._image.framesIndex * Math.floor(this._image.width / this._image.frames),
            0,
            Math.floor(this._image.width / this._image.frames),
            this._image.height,
            this._posX,
            this._posY,
            this._width,
            this._height
        );

        this.animate(framesCounter);
    }

    animate(framesCounter) {
        framesCounter % 40 == 0 ? this._image.framesIndex++ : null
        this._image.framesIndex > 2 ? this._image.framesIndex = 0 : null
    }

    move() {
        if (this._posX >= this._posX0 * 1.2) {
            !this.nightCat ? this.changeImgDirection(this._imageRight) : this.changeImgDirection(this._imageCatRight)
            this.changeDirection()
        }

        if (this._posX <= this._posX0 / 1.2) {
            !this.nightCat ? this.changeImgDirection(this._imageLeft) : this.changeImgDirection(this._imageCatLeft)
            this.changeDirection()
        }

        this._posX += this._vel

    }

    changeImgDirection(src) {
        this._image.src = src
    }

    changeDirection() {
        this._vel *= -1
    }
}