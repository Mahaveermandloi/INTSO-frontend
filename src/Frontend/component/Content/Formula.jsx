import React from "react";
import MathJax from "react-mathjax2";

const Formula = () => {
  const formulas = [
    `(a+b)^2 = a^2 + b^2 + 2ab`,
    `(a-b)^2 = a^2 + b^2 - 2ab`,
    `(a+b)(a-b) = a^2 - b^2`,
    `(x + a)(x + b) = x^2 + (a + b)x + ab`,
    `(x + a)(x - b) = x^2 + (a - b)x - ab`,
    `(x - a)(x + b) = x^2 + (b - a)x - ab`,
    `(x - a)(x - b) = x^2 - (a + b)x + ab`,
    `(a + b)^3 = a^3 + b^3 + 3ab(a + b)`,
    `(a - b)^3 = a^3 - b^3 - 3ab(a - b)`,
    `(x + y + z)^2 = x^2 + y^2 + z^2 + 2xy + 2yz + 2xz`,
    `(x + y - z)^2 = x^2 + y^2 + z^2 + 2xy - 2yz - 2xz`,
    `(x - y + z)^2 = x^2 + y^2 + z^2 - 2xy - 2yz + 2xz`,
    `(x - y - z)^2 = x^2 + y^2 + z^2 - 2xy + 2yz - 2xz`,
    `x^3 + y^3 + z^3 - 3xyz = (x + y + z)(x^2 + y^2 + z^2 - xy - yz - xz)`,
    `x^2 + y^2 = \\frac{1}{2}[(x + y)^2 + (x - y)^2]`,
    `(x + a)(x + b)(x + c) = x^3 + (a + b + c)x^2 + (ab + bc + ca)x + abc`,
    `x^3 + y^3 = (x + y)(x^2 - xy + y^2)`,
    `x^3 - y^3 = (x - y)(x^2 + xy + y^2)`,
    `x^2 + y^2 + z^2 - xy - yz - zx = \\frac{1}{2}[(x-y)^2 + (y-z)^2 + (z-x)^2]`,
  ];

  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-16 px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-bold text-lg">
              <span>Q.1- </span>Quadratic Equation and Formula
            </h1>
            <p>
              <span className="font-bold">Ans </span>

              <MathJax.Context input="tex">
                <div>
                  <MathJax.Node>{`x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`}</MathJax.Node>
                </div>
              </MathJax.Context>
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="font-bold text-lg">
              <span>Q.1- </span>Algebraic formulas
            </h1>
            <MathJax.Context input="tex">
              <div>
                {formulas.map((formula, index) => (
                  <div key={index} className="my-2">
                    <MathJax.Node>{formula}</MathJax.Node>
                  </div>
                ))}
              </div>
            </MathJax.Context>
          </div>
        </div>
      </div>
    </>
  );
};

export default Formula;
