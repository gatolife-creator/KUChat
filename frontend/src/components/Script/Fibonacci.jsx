import Sketch from "react-p5";

class Fib {
  constructor(count) {
    this.count = count;
    this.numbers = [];
    this.x = [];
    this.y = [];
    this.col = [];

    this.resize = 50;
  }
  fibS(p5) {
    p5.rectMode(p5.CENTER);
    for (let i = 0; i < this.count; i++) {
      if (i <= 1) {
        this.numbers[0] = 0;
        this.numbers[1] = 1;
      } else {
        this.numbers[i] = this.numbers[i - 2] + this.numbers[i - 1];
      }

      switch (i % 4) {
        case 0: //左or零番目
          if (i === 0) {
            this.x[0] = this.y[0] = 0;
          } else {
            this.x[i] =
              this.x[i - 1] - (this.numbers[i] + this.numbers[i - 1]) / 2;
            this.y[i] =
              this.y[i - 1] + (this.numbers[i] - this.numbers[i - 1]) / 2;
          }
          break;

        case 1: //下or基準
          if (i === 1) {
            this.x[1] = this.y[1] = 0;
          } else {
            this.x[i] =
              this.x[i - 1] + (this.numbers[i] - this.numbers[i - 1]) / 2;
            this.y[i] =
              this.y[i - 1] + (this.numbers[i] + this.numbers[i - 1]) / 2;
          }
          break;

        case 2: //右
          this.x[i] =
            this.x[i - 1] + (this.numbers[i] + this.numbers[i - 1]) / 2;
          this.y[i] =
            this.y[i - 1] - (this.numbers[i] - this.numbers[i - 1]) / 2;
          break;

        case 3: //上
          this.x[i] =
            this.x[i - 1] - (this.numbers[i] - this.numbers[i - 1]) / 2;
          this.y[i] =
            this.y[i - 1] - (this.numbers[i] + this.numbers[i - 1]) / 2;
          break;
        default:
          break;
      }
    }
  }

  fibD(p5) {
    p5.background(0);
    p5.translate(p5.width / 2, p5.height / 2);

    if (this.resize > 50) this.resize = 50;
    if (this.resize < 5.791724706488976e-38)
      this.resize = 5.791724706488976e-38;

    for (let i = 0; i < this.count; i++) {
      p5.fill(0);
      p5.stroke(0, 125, 255);
      p5.strokeWeight(5);
      p5.rect(
        this.x[i] * this.resize,
        this.y[i] * this.resize,
        this.numbers[i] * this.resize,
        this.numbers[i] * this.resize
      );
    }
  }
}

export const Fibonacci = () => {
  let canvas;
  let fib;

  const setup = (p5, canvasParentRef) => {
    canvas = p5
      .createCanvas(
        window.innerWidth < 599 ? window.innerWidth : window.innerWidth - 15,
        window.innerHeight
      )
      .parent(canvasParentRef);
    fib = new Fib(100);
    fib.fibS(p5);
  };

  const draw = (p5) => {
    fib.fibD(p5);
    fib.resize -= (1 / 75) * fib.resize;
  };

  const windowResized = (p5) => {
    canvas = p5.resizeCanvas(
      window.innerWidth <= 599 ? window.innerWidth : window.innerWidth - 15,
      window.innerHeight
    );
  };

  const mouseWheel = (p5, event) => {
    fib.resize -= (event.delta / 1000) * fib.resize;
  };

  return (
    <>
      <Sketch
        className="error-page-background"
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mouseWheel={mouseWheel}
      />

      <div className="plate">
        <h1>404</h1>
        <p>Not found...</p>
        <p style={{ borderBottom: "2px solid black" }}>
          This page got caught in a fibonacci vortex.
        </p>
      </div>
    </>
  );
};
