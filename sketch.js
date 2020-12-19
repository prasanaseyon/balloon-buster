var gamestate = "play";
var pink, green, blue, red;
var redb, blueb, pinkb, greenb;
var redbi, bluebi, pinkbi, greenbi;
var arrow, arrowimg, unseenarrow;
var bow, bowimg;
var bg, bgi;
var arrowshootable = true;
var edges, bg;
var redB, blueB, pinkB, greenB;
var score;
var lives;
var iwall, ig, ib, ir;

function reset() {
  score = 0;
  lives = 10;
  bow.y = 300;
  greenB.destroyEach();
  blueB.destroyEach();
  redB.destroyEach();
  gamestate = "play";
}

function preload() {
  redbi = loadImage("red_balloon0.png");
  bluebi = loadImage("blue_balloon0.png");
  pinkbi = loadImage("pink_balloon0.png");
  greenbi = loadImage("green_balloon0.png");
  arrowimg = loadImage("arrow0.png");
  bowimg = loadImage("bow0.png");
  bgi = loadImage("background0.png")


}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bow = createSprite(width - 60, height, 30, 10);
  bow.addImage(bowimg);
  bow.scale = 4;

  unseenarrow = createSprite((2 * width), height, 10, 10);
  unseenarrow.visible = false;

  score = 0;
  lives = 10;

  greenB = new Group(green);
  blueB = new Group(blue);
  redB = new Group(red);


}

function draw() {
  background(bgi);
  textSize(20);
  text("score: " + score, 50, 45);
  text("lives: " + lives, 280, 45);

  bow.y = World.mouseY;
  edges = createEdgeSprites();
  if (gamestate === "play") {

    if (unseenarrow.isTouching(edges[0])) {
      arrowshootable = true;
    }
    if (unseenarrow.isTouching(redB)) {
      redB.destroyEach();
      arrowshootable = true;
      score = score + 1;
    } else if (unseenarrow.isTouching(greenB) == true) {

      greenB.destroyEach();
      arrowshootable = true;
      score = score + 1;
    } else if (unseenarrow.isTouching(blueB) == true) {
      blueB.destroyEach();

      arrowshootable = true;
      score = score + 1;
    }


    if (touches.length > 0 || keyDown("space")) {
      if (arrowshootable == true) {
        arrow = createSprite(bow.x, bow.y, 10, 10);
        arrow.addImage(arrowimg);
        arrow.lifetime = 300;
        arrow.scale = 0.5;
        arrow.velocityX = -15;
        unseenarrow.x = arrow.x;
        unseenarrow.y = arrow.y;
        unseenarrow.velocityX = arrow.velocityX;
        arrowshootable = false;
        touches = [];
      }
    }

    if (frameCount % 10 === 0) {
      var rand = Math.round(random(1, 4));
      switch (rand) {
        case 1:
          green = createSprite(0, Math.round(random(40, height - 60)), 10, 40);
          green.addImage(greenbi);
          green.scale = 0.15;
          green.lifetime = width;
          green.velocityX = 8;
          greenB.add(green);
          break;

        case 2:
          blue = createSprite(0, Math.round(random(40, height - 60)), 10, 40);
          blue.velocityX = 8;
          blue.addImage(bluebi);
          blue.scale = 0.15;
          blue.lifetime = width;
          blueB.add(blue);


          break;
        case 3:
          red = createSprite(0, Math.round(random(40, height - 60)), 10, 40);
          red.velocityX = 8;
          red.addImage(redbi);
          red.scale = 0.15;
          red.lifetime = width;
          redB.add(red);


          break;
        default:
          break;
      }

    }

    var wall = createSprite(width - 20, height, 10, 2 * height);
    wall.visible = false;
    if (greenB.isTouching(wall) == true) {
      greenB.destroyEach();
      lives = lives - 1;
    } else if (redB.isTouching(wall) == true) {
      redB.destroyEach();
      lives = lives - 1;
    } else if (blueB.isTouching(wall) == true) {
      blueB.destroyEach();
      lives = lives - 1;
    }

    if (lives === 0) {
      reset();
      gamestate = "end";
    }
    drawSprites();

  }
  if (gamestate === "end") {
    lives = 0;
    fill("maroon");
    textSize(26);
    text("Game over", width - (width / 1.8), height - (height / 2));

    if (touches.length > 0 || keyDown("space")) {
      reset();
      touches = [];
    }
  }
}