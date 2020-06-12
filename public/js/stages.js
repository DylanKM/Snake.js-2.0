class PlayStage extends Stage {
    constructor(gsm) {
        super(gsm) 
        this.score = new ScoreManager()

        this.snake = new Snake(this.score)
        this.snake.setCenterX((CANVAS_WIDTH/2)-10)
        this.snake.setCenterY(CANVAS_HEIGHT/2)

        this.bonbon = new Bonbon(this.snake)

        this.bonbon.pickLocation()
        console.log(this.bonbon)

    } 

    update(dt) {
        
        this.bonbon.update(dt)
        this.snake.update(dt)
        this.snake.move()


        if (this.snake.eat(this.bonbon)) {
            console.log("EATING")
            this.bonbon.pickLocation()
            gSounds["score"].setVolume(0.5)
            gSounds["score"].play()
            this.score.incrementsPoints(1)
        }

        if (this.snake.collideSnake()) {
            gSounds["hurt"].setVolume(0.5)
            gSounds["hurt"].play()
            this.score.decrementsLives()
        }


        if (this.score.isGameOver()) {
            let options = {
                score: this.score
            }
            this.gsm.changeStage(gStages.get("conclustage"), options)
        }
    }

    render() {
        this.bonbon.render()
        this.snake.render()
        this.score.render()

        noFill()
        strokeWeight(1)
        stroke(200)
        rect(0, 100, 600, 500)
    }

    onEnter(datas) {
        gSounds["play"].setLoop(true)
        gSounds["play"].setVolume(0.5)
        gSounds["play"].play()

        if (datas != undefined) {
            this.score.setName(datas.nom)
            this.score.reset()

        }
    }

    onExit() {
        gSounds["play"].setLoop(false)
        gSounds["play"].stop()
        
    }
}

//////////////////////////////////////////////////////////////////////

class IntroStage extends Stage {
    constructor(gsm) {
        super(gsm)

        this.score = new ScoreManager()
        //textFont(gFonts)
        textAlign(CENTER)
        textSize(70)
        fill(255, 255, 0)
        

    }

    update(dt) {
        if (gInput.isKeyPressed(ENTER)) {

            let options={
                nom:"Dylan",
                points:0
            }

            this.gsm.changeStage(gStages.get("playstage"),options)
        }
    }

    render() {
        background(0)

        text("Snake.js", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4)

        text("Dylan", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)

        text("Press Enter", CANVAS_WIDTH / 2, 3 * CANVAS_HEIGHT / 4)
    }

    onEnter(datas) {
        gSounds["intro"].setLoop(true)
        gSounds["intro"].setVolume(0.5)
        gSounds["intro"].play()

        if (datas != undefined) {
            //console.log(datas)
            this.score.setName(datas.nom)
            this.score.reset()
        }
    }

    onExit() {
        gSounds["intro"].setLoop(false)
        gSounds["intro"].stop()
    }
}

////////////////////////////////////////////////////////////////////////

class ConcluStage extends Stage {
    constructor(gsm) {
        super(gsm)

        this.score = new ScoreManager()
        this.name = ""
        this.points = 0
    }

    update(dt) {
        if (gInput.isKeyPressed(ENTER)) {

            this.gsm.changeStage(gStages.get("introstage"))
        }
    }

    render() {
        background(0)

        text("Game Over ", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4)

        let str = this.name + ":" + this.points + " pts"

        text(str, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)

        text("Press Enter", CANVAS_WIDTH / 2, 3 * CANVAS_HEIGHT / 4)
    }


    onEnter(datas) {
        textAlign(CENTER)
        textSize(70)
        fill(255, 255, 0)

        gSounds["conclu"].setLoop(true)
        gSounds["conclu"].setVolume(0.5)
        gSounds["conclu"].play()

        if (datas != undefined) {
            console.log(datas)
            this.name = datas.score.name
            this.points = datas.score.points
        }
    }

    onExit() {
        gSounds["conclu"].setLoop(false)
        gSounds["conclu"].stop()
        this.score.reset()
    
    }
} 