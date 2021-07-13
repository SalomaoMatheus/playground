import { keyboard, hitTestRectangle, rotateToPoint } from './utils.js';
const type = !PIXI.utils.isWebGLSupported() ? "canvas" : "WebGL";

// Definições
const Application = PIXI.Application,
    Graphics = PIXI.Graphics,
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
//   dropShadow: true,
//   dropShadowColor: "#000000",
//   dropShadowBlur: 4,
//   dropShadowAngle: Math.PI / 6,
//   dropShadowDistance: 6,
});

//Carrega imagens em Cache
loader
    .add("images/player.png")
    .add("images/shoot.png")
.load(setup);

let player, bullet, state, bg, message, rectangle;
let bullets = [];
const bulletSpeed = 8;

function setup() {
    //Parâmetros do Sprite do Player
    player = new Sprite(resources["images/player.png"].texture);
    player.x = 392;
    player.y = 292;
    player.vx = 0;
    player.vy = 0;
    const playerSpeed = 5; 

    // Parâmetros do Backgroud
    bg = new Sprite(PIXI.Texture.WHITE);
    bg.width = app.screen.width;
    bg.height = app.screen.height;
    bg.tint = 0x9FC5E8;
    bg.interactive = true;

    // Parâmetros de Texto
    message = new PIXI.Text("Anda com W, atira com mouse", style);
    message.position.set(18, 20);

    // Prâmetros do Retângulo
    rectangle = new Graphics();
    rectangle.beginFill(0x6AA84F);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    
    // Adicionando à cena.
    app.stage.addChild(bg);
    app.stage.addChild(player);
    app.stage.addChild(message);
    //app.stage.addChild(rectangle);

    // Controles do Teclado
    let up = keyboard("w");

    player.anchor.x = 0.5;  
    player.anchor.y = 0.5;

    bg.on("click", function(e){  
        shoot(player.rotation, {
            x: player.position.x + Math.cos(player.rotation)*16,
            y: player.position.y + Math.sin(player.rotation*16)
        });
    })

    up.press = () => {
        player.vx = playerSpeed;
        player.vy = playerSpeed;
    };
    up.release = () => {
        player.vx = 0;
        player.vy = 0;
    };

    state = play;    
    app.ticker.add(gameLoop);
}

const gameLoop = (delta) => state(delta);

function shoot(rotation, startPosition){  
    bullet = new Sprite(resources["images/shoot.png"].texture);
    bullet.x = startPosition.x;
    bullet.y = startPosition.y;
    bullet.rotation = rotation;
    app.stage.addChild(bullet);
    bullets.push(bullet);
}

function play(delta) {
    player.x += Math.cos(player.rotation) * player.vx;
    player.y += Math.sin(player.rotation) * player.vy;

    bg.on('mousemove', (e) => {
        player.rotation = rotateToPoint(e.data.global.x, e.data.global.y, player.position.x, player.position.y);
    });

    for(var b=bullets.length-1;b>=0;b--){
        bullets[b].x += Math.cos(bullets[b].rotation) * bulletSpeed;
        bullets[b].y += Math.sin(bullets[b].rotation) * bulletSpeed;
    }

    // if (hitTestRectangle(player, rectangle)) {
    //     message.text = "Encostou!";
    //     rectangle.tint = 0xCC0000;
    // } else {
    //     message.text = "Não enconstou.";
    //     rectangle.tint = 0x6AA84F;
    // }
}

function teste (){

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
}