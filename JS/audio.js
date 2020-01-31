class Sound {
    constructor(soundBackground) {
        this._sound = document.createElement("audio")
        this._sound.src = soundBackground
        this._sound.setAttribute("preload", "auto")
        this._sound.setAttribute("control", "none")
        this._sound.style.display = "none"
        document.body.appendChild(this._sound)
    }
    play() {
        this._sound.play()
    }
    stop() {
        this._sound.pause()
    }
}