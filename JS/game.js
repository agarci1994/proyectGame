const game = {
  // INFORMACION
  title: "Kind of Trippy",
  author: "Alejandro García",
  license: null,
  version: "1.0",
  canvas: undefined,
  ctx: undefined,
  wWidth: undefined,
  wHeight: undefined,
  fps: 60,
  zombie: [],
  house: [],
  framesCounter: 0,
  score: undefined,
  keys: {
    DOWN: 40,
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
  },
  lives: 3,
  power: 3,
  backgroundNight: "RECURSOS/MAPA/1mapa/MAPA1black.png",
  houseNight: "RECURSOS/MAPA/OBJETOS/casanoche1.png",
  homeNight: "RECURSOS/MAPA/OBJETOS/casanoche3.png",
  bigHouseNight: "RECURSOS/MAPA/OBJETOS/casanoche2.png",
  background0: "RECURSOS/MAPA/1mapa/MAPA1.png",
  house0: "RECURSOS/MAPA/OBJETOS/casa.png",
  home0: "RECURSOS/MAPA/OBJETOS/casa2.png",
  bigHouse0: "RECURSOS/MAPA/OBJETOS/casa3.png",
  catNight: "RECURSOS/PERSONAJES/cat.png",
  countPower: 0,
  audio: undefined,
  track: 0,
  win: 0,
  end: false,
  counted: undefined,

  //FUNCION DE INICIO
  init(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;
    this.canvas.width = this.wWidth;
    this.canvas.height = this.wHeight;
    this.setListeners();
    this.start();
  },

  //MOTOR
  start() {
    setTimeout(() => {
      this.sound();
    }, 3000);
    this.create();

    this.interval = setInterval(() => {
      this.framesCounter++;
      this.drawAll();
      this.moveAll();
      this.generateZombie();
      this.collisionZombie() && this.framesCounter % 30 == 0 ?
        (this.lives -= 1) :
        null;
      this.countLive();
      this.countPL(this.power, this.importObject[3], this.importObject[4], this.importObject[5]);
      if (this.track === 0) {
        this.findTrask(this.importObject[0]);
      } else if (this.track === 1) {
        this.findTrask(this.importObject[1]);
      } else if (this.track === 2) {
        this.findTrask(this.importObject[2]);
      }
      this.checkVictory();
      this.changeLevel();
    }, 1000 / this.fps);
  },

  sound() {
    this.audio = new Audio("RECURSOS/SONIDO/anfetamina.mp3");
    this.audio.loop = true;
    this.audio.play();
  },

  create() {
    this.backgroundDay = new Background(
      this.ctx,
      this.wWidth,
      this.wHeight,
      "RECURSOS/MAPA/1mapa/MAPA1.png",
      this.keys
    );
    this.playerDay = new Player(
      this.ctx,
      this.wWidth,
      this.wHeight,
      this.keys,
      "RECURSOS/PERSONAJES/playerleft.png",
      "RECURSOS/PERSONAJES/playerright.png"
    );

    let houses = [{
        target: this.house1,
        ctx: this.ctx,
        width: this.wWidth * 0.09,
        height: this.wHeight * 0.2,
        posX: this.wWidth / 2 + 180,
        posY: -50,
        url: "RECURSOS/MAPA/OBJETOS/casa.png"
      },
      {
        target: this.house2,
        ctx: this.ctx,
        width: this.wWidth * 0.09,
        height: this.wHeight * 0.2,
        posX: this.wWidth / 2 - 230,
        posY: -50,
        url: "RECURSOS/MAPA/OBJETOS/casa.png"
      },
      {
        target: this.house3,
        ctx: this.ctx,
        width: this.wWidth * 0.09,
        height: this.wHeight * 0.2,
        posX: this.wWidth / 2 - 30,
        posY: -50,
        url: "RECURSOS/MAPA/OBJETOS/casa.png"
      },
      {
        target: this.house4,
        ctx: this.ctx,
        width: this.wWidth * 0.09,
        height: this.wHeight * 0.2,
        posX: this.wWidth / 2 + 150,
        posY: this.wHeight * 0.86,
        url: "RECURSOS/MAPA/OBJETOS/casa.png"
      },
      {
        target: this.house5,
        ctx: this.ctx,
        width: this.wWidth * 0.09,
        height: this.wHeight * 0.2,
        posX: this.wWidth / 2,
        posY: this.wHeight * 0.86,
        url: "RECURSOS/MAPA/OBJETOS/casa.png"
      },
      {
        target: this.home,
        ctx: this.ctx,
        width: this.wWidth * 0.09,
        height: this.wHeight * 0.2,
        posX: this.wWidth * 0.93,
        posY: 0,
        url: "RECURSOS/MAPA/OBJETOS/casa2.png"
      },
      {
        target: this.bighouse,
        ctx: this.ctx,
        width: this.wWidth * 0.15,
        height: this.wHeight * 0.3,
        posX: this.wWidth / 2 - 350,
        posY: this.wHeight * 0.8,
        url: "RECURSOS/MAPA/OBJETOS/casa3.png"
      },
      {
        target: this.stop,
        ctx: this.ctx,
        width: this.wWidth * 0.08,
        height: this.wHeight * 0.1,
        posX: 170,
        posY: 10,
        url: "RECURSOS/OBJETOS/barrera.png"
      },
      {
        target: this.stop2,
        ctx: this.ctx,
        width: this.wWidth * 0.08,
        height: this.wHeight * 0.1,
        posX: 170,
        posY: this.wHeight * 0.87,
        url: "RECURSOS/OBJETOS/barrera.png"
      }
    ]


    let importantObject = [{
        target: this.track1,
        ctx: this.ctx,
        width: this.wWidth * 0.04,
        height: this.wHeight * 0.06,
        posX: this.wWidth / 2 - 400,
        posY: this.wHeight * 0.93,
        url: "RECURSOS/OBJETOS/bufanda.png"
      },
      {
        target: this.track2,
        ctx: this.ctx,
        width: 0,
        height: 0,
        posX: -800,
        posY: 150,
        url: "RECURSOS/OBJETOS/papel.png"
      },
      {
        target: this.track3,
        ctx: this.ctx,
        width: 0,
        height: 0,
        posX: -400,
        posY: this.wHeight * 0.8,
        url: "RECURSOS/OBJETOS/cadaver.png"
      },
      {
        target: this.power1,
        ctx: this.ctx,
        width: this.wWidth * 0.06,
        height: this.wHeight * 0.09,
        posX: this.wWidth * 0.93,
        posY: this.wHeight * 0.9,
        url: "RECURSOS/OBJETOS/pastillarosa.png"
      },
      {
        target: this.power2,
        ctx: this.ctx,
        width: this.wWidth * 0.06,
        height: this.wHeight * 0.09,
        posX: this.wWidth * 0.9,
        posY: this.wHeight * 0.9,
        url: "RECURSOS/OBJETOS/pastillarosa.png"
      },
      {
        target: this.power3,
        ctx: this.ctx,
        width: this.wWidth * 0.06,
        height: this.wHeight * 0.09,
        posX: this.wWidth * 0.87,
        posY: this.wHeight * 0.9,
        url: "RECURSOS/OBJETOS/pastillarosa.png"
      },
      {
        target: this.heart1,
        ctx: this.ctx,
        width: this.wWidth * 0.02,
        height: this.wHeight * 0.03,
        posX: 15,
        posY: 20,
        url: "RECURSOS/OBJETOS/corazon.png"
      },
      {
        target: this.heart2,
        ctx: this.ctx,
        width: this.wWidth * 0.02,
        height: this.wHeight * 0.03,
        posX: 45,
        posY: 20,
        url: "RECURSOS/OBJETOS/corazon.png"
      },
      {
        target: this.heart3,
        ctx: this.ctx,
        width: this.wWidth * 0.02,
        height: this.wHeight * 0.03,
        posX: 75,
        posY: 20,
        url: "RECURSOS/OBJETOS/corazon.png"
      },
      {
        target: this.pop1,
        ctx: this.ctx,
        width: this.wWidth * 0.4,
        height: this.wHeight * 0.5,
        posX: this.wWidth / 3,
        posY: this.wHeight / 4,
        url: "RECURSOS/OBJETOS/pop1.png"
      },
      {
        target: this.pop2,
        ctx: this.ctx,
        width: this.wWidth * 0.4,
        height: this.wHeight * 0.5,
        posX: this.wWidth / 3,
        posY: this.wHeight / 4,
        url: "RECURSOS/OBJETOS/pop2.png"
      },
      {
        target: this.gameover,
        ctx: this.ctx,
        width: this.wWidth * 0.4,
        height: this.wHeight * 0.5,
        posX: this.wWidth / 3,
        posY: this.wHeight / 4,
        url: "RECURSOS/OBJETOS/gameover.png"
      },
      {
        target: this.popEnd,
        ctx: this.ctx,
        width: this.wWidth * 0.4,
        height: this.wHeight * 0.5,
        posX: this.wWidth / 3,
        posY: this.wHeight / 4,
        url: "RECURSOS/OBJETOS/end.png"
      }
    ]

    this.importObject = importantObject.map(elm => elm.target = new Object(elm.ctx, elm.width, elm.height, elm.posX, elm.posY, elm.url))

    this.allHouse = houses.map(elm => elm.target = new Object(elm.ctx, elm.width, elm.height, elm.posX, elm.posY, elm.url))

  },

  drawAll() {
    this.backgroundDay.draw();
    this.importObject[0].draw()
    this.importObject[1].draw()
    this.importObject[2].draw()
    this.playerDay.draw(this.framesCounter);
    this.zombie.forEach(obs => obs.draw(this.framesCounter))
    this.allHouse.forEach(ho => ho.draw());
    this.counted + 400 > this.framesCounter && this.track === 1 ? this.importObject[9].draw() : null
    this.counted + 400 > this.framesCounter && this.track === 2 ? this.importObject[10].draw() : null
    this.track === 3 ? this.importObject[12].draw() : null
  },

  generateZombie() {
    if (this.zombie.length < 10) {
      this.zombie.push(
        new Zombie(
          this.ctx,
          this.wWidth,
          this.wHeight,
          "RECURSOS/PERSONAJES/Walk1.png",
          "RECURSOS/PERSONAJES/Walkright.png"
        )
      );
    }
  },

  moveAll() {
    this.playerDay.move(this.framesCounter);
    this.zombie.forEach(obs => obs.move());
  },

  collisionZombie() {
    return this.zombie.some(zomb => {
      if (zomb.nightCat == true) return;
      return (
        this.playerDay._posX + this.playerDay._width >= zomb._posX &&
        this.playerDay._posY <= zomb._posY + zomb._height / 2.2 &&
        this.playerDay._posX <= zomb._posX + zomb._width &&
        this.playerDay._posY + this.playerDay._height / 2 >= zomb._posY
      );
    });
  },

  collisionHouse(nextPosX, nextPosY) {
    let posX = this.playerDay._posX + nextPosX;
    let posY = this.playerDay._posY + nextPosY;

    return this.allHouse.some(house => {
      if (
        posX + this.playerDay._width >= house._posX + 15 &&
        posY <= house._posY + house._height - 50 &&
        posX <= house._posX + house._width - 15 &&
        posY + this.playerDay._height >= house._posY + 50
      ) {
        return true;
      }
    });
  },

  countLive() {
    this.countPL(this.lives, this.importObject[6], this.importObject[7], this.importObject[8]);

    if (this.lives <= 0) {
      this.popAlert("gameover");
    }
  },

  countPL(count, x1, x2, x3) {
    if (count === 3) {
      x1.draw();
      x2.draw();
      x3.draw();
    }
    if (count === 2) {
      x1.draw();
      x2.draw();
    }
    if (count === 1) {
      x1.draw();
    }
  },

  numberRandom() {
    return Math.floor(Math.random() * (41 - 37) + 37);
  },

  activePower() {
    if (this.power > 0) {
      this.power -= 1;
      this.backgroundDay._image.src = this.backgroundNight;
      this.zombie.forEach(e => {
        e.nightCat = true;
      });

      this.keys.DOWN = this.numberRandom();
      this.keys.UP = this.numberRandom();
      this.keys.LEFT = this.numberRandom();
      this.keys.RIGHT = this.numberRandom();

      this.house.forEach((ho, i) => {
        i <= 4 ? (ho._image.src = this.houseNight) : null;
        i == 5 ? (ho._image.src = this.homeNight) : null;
        i == 6 ? (ho._image.src = this.bigHouseNight) : null;
      });

      this.timePower();
    }
  },

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === this.keys.SPACE) {
        this.activePower();
      }
    });
  },

  collision(object) {
    if (
      this.playerDay._posX + this.playerDay._width >= object._posX &&
      this.playerDay._posY <= object._posY + object._height &&
      this.playerDay._posX <= object._posX + object._width &&
      this.playerDay._posY + this.playerDay._height >= object._posY
    ) {
      return true;
    }
  },

  findTrask(object) {
    if (this.collision(object)) {
      this.importObject[0]._posX = this.wWidth * 0.78;
      this.importObject[1]._posX = this.wWidth * 0.7;

      object._posY = this.wHeight * 0.9;
      object._height = this.wHeight * 0.1;
      object._width = this.wWidth * 0.1;

      this.track++;
      this.win++;

      this.popAlert(object);
    }
  },

  popAlert(object) {
    switch (object) {
      case this.importObject[0]:
        this.counted = this.framesCounter;
        break;
      case this.importObject[1]:
        this.counted = this.framesCounter;
        this.allHouse[8]._image.src = "RECURSOS/OBJETOS/flechadown.png";
        this.allHouse[8]._width = this.wWidth * 0.08;
        this.allHouse[8]._posX = 170
        break;
      case "gameover":
        this.importObject[11].draw();
        clearInterval(this.interval);
        break;
    }
  },

  timePower() {
    setTimeout(() => {
      this.keys.DOWN = 40;
      this.keys.UP = 38;
      this.keys.LEFT = 37;
      this.keys.RIGHT = 39;

      this.backgroundDay._image.src = this.background0;

      this.zombie.forEach(e => {
        e.nightCat = false;
      });
      this.allHouse.forEach((ho, i) => {
        i <= 4 ? (ho._image.src = this.house0) : null;
        i == 5 ? (ho._image.src = this.home0) : null;
        i == 6 ? (ho._image.src = this.bigHouse0) : null;
      });
    }, 15000);
  },

  checkVictory() {
    this.collision(this.allHouse[5]) && this.track == 1 ?
      (this.allHouse[7]._image.src = "RECURSOS/OBJETOS/flecha.png") :
      null;
    if (this.collision(this.allHouse[5]) && this.track == 2) {
      this.allHouse[8]._posX = 150;
      this.end = true;
    }
  },

  changeLevel() {

    if (this.collision(this.allHouse[7]) && this.track == 1) {
      this.backgroundDay._image.src = "RECURSOS/MAPA/2mapa/MAPA1.png";
      this.allHouse[0]._posX = -200;
      this.allHouse[1]._posX = -200;
      this.allHouse[2]._posX = -200;
      this.allHouse[5]._posX = -200;
      this.playerDay._posY = this.wHeight;
      this.allHouse[7]._posX = -200;
      this.allHouse[8]._posX = 100;
      this.allHouse[8]._width = 0
      this.backgroundNight = "RECURSOS/MAPA/2mapa/MAPA2BLACK.png";
      this.background0 = "RECURSOS/MAPA/2mapa/MAPA1.png";
      this.importObject[1]._width = this.wWidth * 0.02;
      this.importObject[1]._height = this.wHeight * 0.04;
      this.importObject[1]._posX = this.wWidth - 800;
    }

    if (this.collision(this.allHouse[8]) && this.end === true) {
      this.backgroundDay._image.src = "RECURSOS/MAPA/3mapa/MAPA3.png";
      this.allHouse[0]._posX = -200;
      this.allHouse[1]._posX = -200;
      this.allHouse[2]._posX = -200;
      this.allHouse[5]._posX = -200;
      this.allHouse[3]._posX = -200;
      this.allHouse[4]._posX = -200;
      this.allHouse[6]._posX = -200;
      this.playerDay._posY = 100;
      this.allHouse[7]._posX = -200;
      this.allHouse[8]._posX = -200;

      this.backgroundNight = "RECURSOS/MAPA/3mapa/MAPA3black.png";
      this.background0 = "RECURSOS/MAPA/3mapa/MAPA3.png";

      this.importObject[2]._width = this.wWidth * 0.08;
      this.importObject[2]._height = this.wHeight * 0.08;
      this.importObject[2]._posX = this.wWidth - 400;
    }
    if (this.collision(this.allHouse[8]) && this.track == 2) {
      this.backgroundDay._image.src = "RECURSOS/MAPA/1mapa/MAPA1.png";
      this.allHouse[0]._posX = this.wWidth / 2 + 180;
      this.allHouse[1]._posX = this.wWidth / 2 - 230;
      this.allHouse[2]._posX = this.wWidth / 2 - 30;
      this.allHouse[5]._posX = this.wWidth * 0.93;
      this.playerDay._posY = 100;
      this.allHouse[7]._posX = 170;
      this.allHouse[8]._posX = -200;
      this.backgroundNight = "RECURSOS/MAPA/1mapa/MAPA1black.png";
      this.background0 = "RECURSOS/MAPA/1mapa/MAPA1.png";
    }
  }
};