class Video {
  constructor(width, height, numCircles=15) {
    this.colors = {
      yellow: [200, 200, 75],
      blue: [75, 175, 255],
      white: [200, 200, 200],
      green: [100, 200, 100],
      red: [200, 100, 100],
    };
    this.text = [
      [`function `, this.colors.blue, false],
      [`introToJS`, this.colors.yellow, false],
      [`(`, this.colors.yellow, false],
      [`student`, this.colors.blue, false],
      [`)`, this.colors.yellow, false],
      [`{`, this.colors.blue, false],
      [`  // On Feb. 22, 2022 at 6pm ET`, this.colors.green, true],
      [`  if `, this.colors.blue, true],
      [`(`, this.colors.yellow, false],
      [`student.attends`, this.colors.white, false],
      [`(`, this.colors.yellow, false],
      [`"Intro To JS"`, this.colors.red, false],
      [`)`, this.colors.yellow, false],
      [`)`, this.colors.yellow, false],
      [` {`, this.colors.blue, false],
      [`    student.knowsJS = `, this.colors.white, true],
      [`true`, this.colors.blue, false],
      [`;`, this.colors.white, false],
      [`  }`, this.colors.blue, true],
      [`  // This video made using JS (in a browser!)`, this.colors.green, true],
      [`  return`, this.colors.blue, true],
      [` student.knowsJS;`, this.colors.white, false],
      [`}`, this.colors.blue, true],
      [`;`, this.colors.white, false],
    ];
    this.current_char = 0;
    let colors = [
      [200, 200, 75, 50],
      [75, 175, 255, 50],
      [200, 200, 200, 50],
      [100, 200, 100, 50],
      [200, 100, 100, 50],
    ];
    this.numCircles = numCircles;
    this.circles = [];
    for (let i = 0; i <= this.numCircles; i++) {
        this.circles.push({
            dia: Math.floor(200 * Math.random()),
            growAmount: 1,
            grow: [true, false][Math.floor(Math.random())],
            x: Math.floor(width * Math.random()),
            y: Math.floor(height * Math.random()),
            color: colors[Math.floor(colors.length * Math.random())]
          });
    }
  }

  drawtext(x = 0, y = 0, fNumber = 0, fRate = 30, speed = 10) {
    let pos_x = x;
    let pos_y = y;
    for (var i = 0; i < this.text.length; ++i) {
      var part = this.text[i];
      this.current_char++;
      if (part[2]) {
        pos_x = x;
        pos_y += textAscent() + Math.floor(textAscent() / 10);
      }
      var t = part[0];
      var c = part[1];
      var w = textWidth(t);
      fill(c);
      text(t, pos_x, pos_y);
      pos_x += w;
    }
  }

  fadeIn(fNumber = 0, fRate = 30, speed = 10) {
    // Did this in Adobe Premiere because of time constraints.
  }

  background(fNumber = 0, fRate = 30, speed = 10) {
      noStroke();
    this.circles.forEach((circ) => {
      fill(circ.color);
      circle(circ.x, circ.y, circ.dia);

      if (circ.dia > 200) {
        circ.grow = false;
      }
      if (circ.dia < 0) {
        circ.grow = true;
      }

      if (circ.grow == true) {
        circ.dia += circ.growAmount;
      } else {
        circ.dia -= circ.growAmount;
      }
    });
  }
}

function introToJS(student) {
  if (student.knowsJS === false) {
    student.knowsJS = true;
  }
  return student.knowsJS;
}

let scpro;
const vidFramerate = 30;
const vid = new Video(1280, 720, 10);

function preload() {
  scpro = loadFont("assets/scpro/SourceCodePro-ExtraLight.ttf");
}

function setup() {
  frameRate(vidFramerate);
  createCanvas(1280, 720);
  textFont(scpro);
  textSize(45);
}

function draw() {
  background(0);
  vid.background();
  vid.drawtext(35, 175);
}
