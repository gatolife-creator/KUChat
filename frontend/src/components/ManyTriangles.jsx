import Sketch from "react-p5";
import { Quad, Point } from "../ts/react-shapeshape";

export const ManyTriangles = () => {
  let canvas;
  let r;

  let quads;

  let x = 50;
  let xs = 1 / 8;
  let m;
  let n;

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
    r = Math.min(window.innerWidth, window.innerHeight - 58) / 2;
    p5.background(30);
    p5.translate(p5.width / 2, p5.height / 2 + 29);

    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke("white");

    x += xs;
    m = 100 - x;
    n = x;
    quads = [
      new Quad(
        new Point(p5.cos(0) * r, p5.sin(0) * r),
        new Point(p5.cos(90) * r, p5.sin(90) * r),
        new Point(p5.cos(180) * r, p5.sin(180) * r),
        new Point(p5.cos(270) * r, p5.sin(270) * r)
      ),
    ];

    if (x >= 99 || x <= 1) {
      xs *= -1;
    }

    for (let i = 0; i < 30; i++) {
      let newQuad = new Quad(
        quads[i].l1.getInteriorPoint(m, n),
        quads[i].l2.getInteriorPoint(m, n),
        quads[i].l3.getInteriorPoint(m, n),
        quads[i].l4.getInteriorPoint(m, n)
      );
      quads.push(newQuad);
    }

    for (let quad of quads) {
      quad.draw(p5);
    }
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
          clutter, clutter, clutter...
        </p>
      </div>
    </>
  );
};
