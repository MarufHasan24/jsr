function MATH() {
  let MathArray = Object.getOwnPropertyNames(Math);
  let local = {};
  for (let i = 0; i < MathArray.length; i++) {
    local[MathArray[i]] = Math[MathArray[i]];
  }
  Number.__proto__.odd = function () {
    return this % 2 !== 0;
  };
  Number.__proto__.prime = function () {
    if (this > 0) {
      if (this === 2) {
        return true;
      } else if (this > 1) {
        for (let i = 2; i < this; i++) {
          if (this % i !== 0) {
            return true;
          } else if (this === i * i) {
            return false;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } else {
      throw "Require a positive number";
    }
  };
  Number.__proto__.fact = function () {
    let result = 1;
    if (this > 0) {
      for (let i = 1; i <= this; i++) {
        result *= i;
      }
      return result;
    } else {
      throw "Require a positive number";
    }
  };
  local.random = function (maximum = 1, minimum = 0, type = null) {
    let result;
    let res;
    res = minimum + Math.random() * (maximum - minimum);
    if (type === 0) {
      result = Math.floor(res);
    } else if (type === null || type >= 12) {
      result = res;
    } else {
      result = parseFloat(res.toFixed(type));
    }
    return result;
  };
  local.qudrt = function (a = 0, b = 0, c = 0) {
    let x1, x2, d;
    d = bN ** 2 - 4 * aN * cN;
    if (d < 0) {
      throw "Require some valid number for a,b,c in qudrt function";
    } else {
      x1 = (d ** 0.5 - bN) / (2 * aN);
      x2 = (-(d ** 0.5) - bN) / (2 * aN);
      return [x1, x2];
    }
  };
  local.linearEq = function (
    first_Equation = [0, 0, 0],
    second_Equation = [0, 0, 0]
  ) {
    first_Equation[0] && "number" == typeof first_Equation[0]
      ? (a1 = first_Equation[0])
      : (a1 = 0),
      first_Equation[1] && "number" == typeof first_Equation[1]
        ? (b1 = first_Equation[1])
        : (b1 = 0),
      first_Equation[2] && "number" == typeof first_Equation[2]
        ? (c1 = first_Equation[2])
        : (c1 = 0),
      second_Equation[0] && "number" == typeof second_Equation[0]
        ? (a2 = second_Equation[0])
        : (a2 = 0),
      second_Equation[1] && "number" == typeof second_Equation[1]
        ? (b2 = second_Equation[1])
        : (b2 = 0),
      second_Equation[2] && "number" == typeof second_Equation[2]
        ? (c2 = second_Equation[2])
        : (c2 = 0);
    //declireing results main object
    let result = {};
    let x = !Number.isNaN((c1 * b2 - c2 * b1) / (a1 * b2 - b1 * a2))
      ? (c1 * b2 - c2 * b1) / (a1 * b2 - b1 * a2)
      : false;
    let y = !Number.isNaN((c1 * a2 - c2 * a1) / (b1 * a2 - a1 * b2))
      ? (c1 * a2 - c2 * a1) / (b1 * a2 - a1 * b2)
      : false;
    if (x !== false && y !== false) {
      result = { x, y };
      return result;
    } else {
      return {};
    }
  };
  local.mean = function (...number) {
    var num = [],
      sum = 0;
    let result;
    for (let i = 0; i < number.length; i++) {
      num[i] = typeof number[i] === "number" ? number[i] : false;
      if (num[i] !== false) {
        sum += num[i];
      } else {
        if (num[i] === false) {
          throw `${i + 1}no. input is not a number`;
        } else {
          throw "Somthing went wrong in mean function";
        }
      }
    }
    result = sum / num.length;
    return result;
  };
  local.logx = function (base, angle) {
    let bs = typeof base === "number" && base !== 1 && base > 0 ? base : false,
      ang = typeof angle === "number" && angle > 0 ? angle : false;
    if (bs !== false && ang !== false) {
      let result = Math.log10(ang) / Math.log10(bs);
      return result;
    } else {
      if (bs === false) {
        throw "base should be a number which is grater than 0 and not equal to 1";
      } else if (ang === false) {
        throw "angle should be a number which is grater than 0";
      } else {
        throw "Somthing went wrong in logx function";
      }
    }
  };
  local.rootx = function (base = 0, power = 1) {
    let b = typeof base === "number" ? base : NaN,
      p = typeof power === "number" ? power : false;
    if (b !== false && p !== false) {
      if (!p.odd() && base >= 0) {
        result = Math.pow(b, 1 / p);
      } else if (p.odd() && base >= 0) {
        result = Math.pow(b, 1 / p);
      } else if (p.odd() && base < 0 && p > 0) {
        b = -b;
        result = -Math.pow(b, 1 / p);
      } else if (p.odd() && p < 0 && base < 0) {
        b = -b;
        p = -p;
        result = -1 / Math.pow(b, 1 / p) - 1e-16;
      } else {
        result = NaN;
      }
    } else {
      if (b === false) {
        throw "base should be a number";
      } else if (p === false) {
        throw "power should be a number";
      } else {
        throw "Somthing went wrong in rootx function";
      }
    }
    return result;
  };
  local.permut = function (n = 0, r = 0) {
    let _n = typeof n === "number" && n > 0 ? n : false,
      _r = typeof r === "number" && r >= 0 && r <= n ? r : false;
    if (_n !== false && _r !== false) {
      let result = _n.fact() / (_n - _r).fact();
      return result;
    } else {
      if (_n === false) {
        throw "n should be a number which is grater than 0";
      } else if (_r === false) {
        throw "r should be a number which is grater than 0 and less than or equal to n";
      } else {
        throw "Somthing went wrong in permut function";
      }
    }
  };
  local.combin = function (n = 0, r = 0) {
    let _n = typeof n === "number" ? n : NaN,
      _r = typeof r === "number" ? r : false;
    if (_n >= 0 && _r >= 0) {
      let result = _n.fact() / (_r.fact() * (_n - _r).fact());
      return result;
    } else {
      if (_n === false || _n < 0) {
        throw "n should be a number which is grater than 0";
      } else if (_n === false || _n <= 0) {
        throw "r should be a number which is grater than 0";
      } else {
        throw "Somthing went wrong in combin function";
      }
    }
  };
  local.sec = function (radian = 0) {
    let d = typeof radian === "number" ? radian : false;
    if (d !== false) {
      return 1 / Math.cos(d);
    } else {
      throw "radian should be a number in sec function";
    }
  };
  local.cosec = function (radian = 0) {
    let d = typeof radian === "number" ? radian : false;
    if (d !== false) {
      return 1 / Math.sin(d);
    } else {
      throw "radian should be a number in cosec function";
    }
  };
  local.cot = function (radian = 0) {
    let d = typeof radian === "number" ? radian : false;
    if (d !== false) {
      return 1 / Math.tan(d);
    } else {
      throw "radian should be a number in cot function";
    }
  };
  local.sinh = function (radian = 0) {
    let d = typeof radian === "number" ? radian : false;
    if (d !== false) {
      return (Math.pow(Math.E, d) - Math.pow(Math.E, -d)) / 2;
    } else {
      throw "radian should be a number in sinh function";
    }
  };
  local.cosh = function (radian = 0) {
    let d = typeof radian === "number" ? radian : false;
    if (d !== false) {
      return (Math.pow(Math.E, d) + Math.pow(Math.E, -d)) / 2;
    } else {
      throw "radian should be a number in cosh function";
    }
  };
  local.tanh = function (radian = 0) {
    let d = typeof radian === "number" ? radian : false;
    if (d !== false) {
      return (
        (Math.pow(Math.E, d) - Math.pow(Math.E, -d)) /
        (Math.pow(Math.E, d) + Math.pow(Math.E, -d))
      );
    } else {
      throw "radian should be a number in tanh function";
    }
  };
  return local;
}
const math = MATH();
export { math };
