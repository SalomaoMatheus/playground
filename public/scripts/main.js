const type = !PIXI.utils.isWebGLSupported() ? "canvas" : "WebGL";
const Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

const app = new Application({ 
    width: 256,        
    height: 256,       
    antialias: true,   
    transparent: false,
    resolution: 1      
});
app.renderer.backgroundColor = 0x061639;
document.body.appendChild(app.view);

loader.add("images/anyImage.png").load(setup);

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    return key;
}

let sprite, state;

function setup() {
    sprite = new Sprite(resources["images/anyImage.png"].texture);
    sprite.x = 120;
    sprite.y = 120;
    //sprite.position.set(x, y)
    sprite.vx = 0;
    sprite.vy = 0;
    app.stage.addChild(sprite);

    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    //Left
        left.press = () => {
            sprite.vx = -5;
            sprite.vy = 0;
        };
        left.release = () => {
            if (!right.isDown && sprite.vy === 0) {
            sprite.vx = 0;
            }
        };
    //Up
        up.press = () => {
            sprite.vy = -5;
            sprite.vx = 0;
        };
        up.release = () => {
            if (!down.isDown && sprite.vx === 0) {
            sprite.vy = 0;
            }
        };
    //Right
        right.press = () => {
            sprite.vx = 5;
            sprite.vy = 0;
        };
        right.release = () => {
            if (!left.isDown && sprite.vy === 0) {
            sprite.vx = 0;
            }
        };
    //Down
        down.press = () => {
            sprite.vy = 5;
            sprite.vx = 0;
        };
        down.release = () => {
            if (!up.isDown && sprite.vx === 0) {
            sprite.vy = 0;
            }
        };

    state = play;    
    app.ticker.add(gameLoop);
}

const gameLoop = (delta) => state(delta);

function play(delta) {
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
}