import { keyboard } from './utils.js';
const type = !PIXI.utils.isWebGLSupported() ? "canvas" : "WebGL";

// Definições
const Application = PIXI.Application,
    TextStyle = PIXI.TextStyle,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});

// Parâmetros da Aplicação.
const app = new Application({ 
    width: 800,        
    height: 600,       
    antialias: true,   
    transparent: false,
    resolution: 1      
});
document.body.appendChild(app.view);

let style = new TextStyle({
  fontFamily: "Tahoma",
  fontSize: 25,
  fill: "white",
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

//Carrega imagens em Cache
loader
    .add("images/player.png")
.load(setup);

let player, state, bg, message;
function setup() {
    //Parâmetros do Sprite do Player
    player = new Sprite(resources["images/player.png"].texture);
    player.x = 368;
    player.y = 268;
    player.vx = 0;
    player.vy = 0;
    const playerSpeed = 8; 

    // Parâmetros do Backgroud
    bg = new Sprite(PIXI.Texture.WHITE);
    bg.width = app.screen.width;
    bg.height = app.screen.height;
    bg.tint = 0x9FC5E8;
    bg.interactive = true;
    bg.on('click', function(){
        console.log('hello');
    });

    // Parâmetros de Texto
    message = new PIXI.Text("Text Sample", style);
    message.position.set(18, 20);

    // Adicionando à cena.
    app.stage.addChild(bg);
    app.stage.addChild(player);
    app.stage.addChild(message);

    // Controles do Teclado
    let left = keyboard("a"),
        up = keyboard("w"),
        right = keyboard("d"),
        down = keyboard("s");

    //Left
        left.press = () => {
            player.vx = -playerSpeed;
            player.vy = 0;
        };
        left.release = () => {
            if (!right.isDown && player.vy === 0) {
            player.vx = 0;
            }
        };
    //Up
        up.press = () => {
            player.vy = -playerSpeed;
            player.vx = 0;
        };
        up.release = () => {
            if (!down.isDown && player.vx === 0) {
            player.vy = 0;
            }
        };
    //Right
        right.press = () => {
            player.vx = playerSpeed;
            player.vy = 0;
        };
        right.release = () => {
            if (!left.isDown && player.vy === 0) {
            player.vx = 0;
            }
        };
    //Down
        down.press = () => {
            player.vy = playerSpeed;
            player.vx = 0;
        };
        down.release = () => {
            if (!up.isDown && player.vx === 0) {
            player.vy = 0;
            }
        };

    state = play;    
    app.ticker.add(gameLoop);
}

const gameLoop = (delta) => state(delta);

function play(delta) {
    player.x += player.vx;
    player.y += player.vy;
    
}