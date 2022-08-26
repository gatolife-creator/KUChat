import Sketch from "react-p5";
import { Point, Line } from "../../ts/react-shapeshape";

export const PerpendicularBisector = () => {
  let canvas;
  let min = -400;
  let max = 400;
  let b = -100;
  let bs = 1.5;

  let r = 100;
  let tmp;

  const setup = (p5, canvasParentRef) => {
    canvas = p5
      .createCanvas(
        window.innerWidth < 599 ? window.innerWidth : window.innerWidth - 15,
        window.innerHeight
      )
      .parent(canvasParentRef);
      p5.angleMode(p5.DEGREES);
  };

  const draw = (p5) => {
    p5.background(30);
    p5.translate(p5.width / 2, p5.height / 2);

    let p1 = new Point(p5.cos(0) * r, p5.sin(0) * r);
    let p2 = new Point(p5.mouseX - p5.width / 2, p5.mouseY - p5.height / 2);
    let l = new Line(p1, p2);

    tmp = l.getPerpendicularBisector();

    // x軸、y軸の表示
    p5.stroke("gray");
    p5.line(-p5.width / 2, 0, p5.width / 2, 0);
    p5.line(0, -p5.height / 2, 0, p5.height / 2);

    // 定義域の直線
    p5.line(min, -p5.height / 2, min, p5.height / 2);
    p5.line(max, -p5.height / 2, max, p5.height / 2);

    b += bs;
    if (b < -300 || 300 < b) {
        bs *= -1;
    }

    p5.stroke("white");
    p5.strokeWeight(2);
    tmp.draw(min, max, p5);

    p5.push();
    p5.stroke("red");
    p5.strokeWeight(10);
    p1.draw(p5);
    p2.draw(p5);
    p5.pop();
  };

  const windowResized = (p5) => {
    canvas = p5.resizeCanvas(
      window.innerWidth <= 599 ? window.innerWidth : window.innerWidth - 15,
      window.innerHeight
    );
  };

  return (
    <>
      <Sketch
        className="error-page-background"
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />

      <div className="plate">
        <h1>404</h1>
        <p>Not found...</p>
        <p style={{ borderBottom: "2px solid black" }}>
            Please turn to the previous page.
        </p>
      </div>
    </>
  );
};
