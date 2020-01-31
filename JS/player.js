class Player {
    constructor(ctx, w, h, keys, urlLeft, urlRight) {
        this._ctx = ctx;
        this._gameWidth = w * 0.95;
        this._gameHeight = h * 0.9;

        this._image = new Image();
        this._image.src = urlRight;
        this._imageRight = urlRight
        this._imageLeft = urlLeft

        this.directions = {
            top: false,
            right: false,
            left: false,
            down: false
        }

        this._width = 60;
        this._height = 80;

        this._posX = this._gameWidth - 100;
        this._posY = 50;
        this._0posX = 1050
        this._0posY = 50

        this.velX = 3
        this.velY = 3

        this._image.frames = 4;
        this._image.framesIndex = 0;

        this._keys = keys;

        this.setListeners();

    }

    draw() {
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
    }


    animate(framesCounter) {
    framesCounter % 12 == 0 ? this._image.framesIndex++ : null
    this._image.framesIndex > 2 ? this._image.framesIndex = 0 : null
    }

    setListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {
                case this._keys.DOWN:
                    this.directions.down = true
                    break;
                case this._keys.RIGHT:
                    this.directions.right = true
                    break;
                case this._keys.LEFT:
                    this.directions.left = true
                    break;
                case this._keys.UP:
                    this.directions.top = true
                    break;

            }
        };
        document.onkeyup = e => {
            switch (e.keyCode) {
                case this._keys.DOWN:
                    this.directions.down = false
                    break;
                case this._keys.RIGHT:
                    this.directions.right = false
                    break;
                case this._keys.LEFT:
                    this.directions.left = false
                    break;
                case this._keys.UP:
                    this.directions.top = false
                    break;

            }
        };
    }


    move(framesCounter) {
        if (this.directions.down && this._posY < this._gameHeight) {
            game.collisionHouse(0, 3) ? null : this._posY += 3
        }
        if (this.directions.right && this._posX < this._gameWidth) {
            this._image.src = this._imageLeft
            this.animate(framesCounter)
            game.collisionHouse(3, 0) ? null : this._posX += 3
        }
        if (this.directions.left && this._posX > 0) {
            this._image.src = this._imageRight
            this.animate(framesCounter)
            game.collisionHouse(-3, 0) ? null : this._posX -= 3
        }
        if (this.directions.top && this._posY > 0) {
            game.collisionHouse(0, -3) ? null : this._posY -= 3
        }
    }
}