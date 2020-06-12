class Snake extends Entity {

    constructor(xp, yp, score) {
        super(xp, yp, undefined, 20, 20)

        this.speed = 150
        this.x = 0
        this.y = 0
        this.dx = 20
        this.dy = 0
        this.x1 = 0
        this.x2 = 0
        this.total = 0
        this.score = score
        this.taille = []
        this.j = 0
    }


    update() {

        this.j = this.j + 1
        
        if (this.j == 5) {

            for (let i=0; i<this.taille.length - 1; i++) {
                this.taille[i] = this.taille[i+1]
            }
    
            this.taille[this.total - 1] = { x: this.x, y: this.y }

        this.x = this.x + this.dx
        this.y = this.y + this.dy

        this.x1 = this.x + this.dx
        this.y1 = this.y + this.dy

        this.j = 0
        }
        


        //limites
        if (this.x > CANVAS_WIDTH - 20) {
            this.x = 0
        }

        if (this.y > CANVAS_HEIGHT - 20) {
            this.y = 100
        }

        if (this.x < 0) {
            this.x = CANVAS_WIDTH - 20
        }

        if (this.y < 100) {
            this.y = CANVAS_HEIGHT - 20
        }

    }


    render() {

        for (let i=0; i<this.taille.length; i++) {
            fill(255, 255, 255)
            strokeWeight(1)
            stroke(1)
            rect(this.taille[i].x, this.taille[i].y, SCALE, SCALE)
        }

        fill(200, 200, 0)
        strokeWeight(1)
        stroke(1)
        rect(this.x, this.y, SCALE, SCALE)

        super.renderDebug()
    }


    move() {

        if (gInput.isKeyPressed(RIGHT_ARROW) && this.x1 > this.x) {
            this.dx = 0; this.dy = SCALE * 1;
        }
        if (gInput.isKeyPressed(RIGHT_ARROW) && this.y1 > this.y) {
            this.dy = 0; this.dx = - SCALE * 1;
        }
        if (gInput.isKeyPressed(RIGHT_ARROW) && this.x1 < this.x) {
            this.dx = 0; this.dy = - SCALE * 1;
        }
        if (gInput.isKeyPressed(RIGHT_ARROW) && this.y1 < this.y) {
            this.dy = 0; this.dx = SCALE * 1;
        }
        if (gInput.isKeyPressed(LEFT_ARROW) && this.x1 > this.x) {
            this.dx = 0; this.dy = - SCALE * 1;
        }
        if (gInput.isKeyPressed(LEFT_ARROW) && this.y1 > this.y) {
            this.dy = 0; this.dx = SCALE * 1;
        }
        if (gInput.isKeyPressed(LEFT_ARROW) && this.x1 < this.x) {
            this.dx = 0; this.dy = SCALE * 1;
        }
        if (gInput.isKeyPressed(LEFT_ARROW) && this.y1 < this.y) {
            this.dy = 0; this.dx = - SCALE * 1;
        }
    }



    collideSnake() {
           for(let i=0; i<this.taille.length; i++) {
               if(this.x == this.taille[i].x && this.y == this.taille[i].y) {
                   this.total = 0
                   this.taille.length = 0
    
                   return true
               }
           }
            return false
    }



    eat(bonbon) {
        console.log(bonbon)
        if (this.x === bonbon.x && this.y === bonbon.y) {
            this.total++
            return true
        }
        return false
    }

}


///////////////////////////////////////////////////////////////////////////

class Bonbon extends Entity {

    constructor(Snake) {
        super(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3, undefined, 20, 20)

        this.speed = 0
        this.dx = 0
        this.dy = 0
    }

    pickLocation() {
        this.x = (Math.floor(Math.random() * LIGNES - 1) + 1) * SCALE
        this.y = (Math.floor(Math.random() * COLONNES - 1) + 1) * SCALE

        if (this.x > 580) {
            this.pickLocation()
        }
        if (this.x < 0) {
            this.pickLocation()
        }
        if (this.y > 480) {
            this.pickLocation()
        }
        if (this.y < 100) {
            this.pickLocation()
        }
    }


    update(dt) {
        super.update(dt)

    }

    render() {
        fill(255, 0, 255)
        strokeWeight()
        ellipse(this.x + 10, this.y + 10, 15)

        //super.renderDebug()
    }

}