
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 500
const CANVAS_HEIGHT2 = 400
const SCALE = 20
const LIGNES = CANVAS_WIDTH / SCALE
const COLONNES = CANVAS_HEIGHT / SCALE
const COLONNES2 = (CANVAS_HEIGHT2 + 100) / SCALE 
const GRILLE = { LIGNES, COLONNES }


const gStages = new Map()
const gsm = new StageManager()

let gTextures = {}
let gSounds = {}
//let gFonts = {}

const gInput = new InputManager()

let now = 0
let ex = 0
let dt = 0
let timer = 0
let fps = 0

let pFps = undefined


function preload() {
	
	gSounds["intro"] = loadSound("/Snake_js_assets-master/assets/musics/intro.mp3")
	gSounds["play"] = loadSound("/Snake_js_assets-master/assets/musics/underground.ogg")
	gSounds["conclu"] = loadSound("/Snake_js_assets-master/assets/musics/the_grid.mp3")
	gSounds["hurt"] = loadSound("/Snake_js_assets-master/assets/sounds/hurt.wav")
	gSounds["score"] = loadSound("/Snake_js_assets-master/assets/sounds/score.wav")
}

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

	gStages.set("playstage", new PlayStage(gsm))
	gStages.set("introstage", new IntroStage(gsm))
	gStages.set("conclustage", new ConcluStage(gsm))

	//gsm.pushStage(gStages.get("playstage"))
	gsm.pushStage(gStages.get("introstage"))

	pFps = createP("Fps")

}

function draw() {
	background(51)
	now = millis()
	dt = (now - ex) / 1000.0
	//
	timer += dt 
	fps++
	if (timer > 1) {
		pFps.html("Fps= " + fps)
		fps = 0
		timer = 0
	}
	//
	gsm.update(dt)
	gInput.update()
	gsm.render()
	//
	ex = now
}


function keyPressed() {
	console.log("presser "+keyCode)
	gInput.setKeyboardPressed(keyCode)
}

function keyReleased() {
	console.log("lacher "+keyCode)
	gInput.setKeyboardReleased(keyCode)
}

function mousePressed() {

}

function mouseReleased() {

}