// Purpose: Compiler for the JSR programming language
const cnsl = cons;
const inp = inputdiv;
const head = scriptm;
function main(data) {
  var std = false;
  let global = {
    jro: function (...args) {
      var text = "";
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        text += JSON.stringify(arg, function (key, value) {
          if (value instanceof Set) {
            let temp = Array.from(value);
            return "Set(" + temp.length + "){" + temp.toString() + "}";
          } else if (value instanceof Map) {
            let temp = Array.from(value),
              str = "Map(" + temp.length / 2 + "){";
            for (let i = 0; i < temp.length; i++) {
              str += "{'" + temp[i][0] + "' => " + temp[i][1] + "},";
            }
            return str + "}";
          } else if (value.toString().indexOf("class") !== -1) {
            if (key.trim()) {
              key = " " + key.trim()[0].toUpperCase() + key.trim().slice(1);
            } else {
              key = "";
            }
            return (
              "constructor" +
              key +
              " : " +
              "class " +
              value.name +
              "{[native code]}"
            );
          } else if (typeof value == "function") {
            return "f " + key + "() {[code]}";
          } else {
            return value;
          }
        }).replace(/"/g, "");
      }
      cnsl.innerHTML += "$ " + text + "\n";
    },
    jrin: function (qustion) {
      return new Promise((resolve, reject) => {
        inp.innerHTML = "";
        inp.innerHTML =
          '<div style="color: #fff;">' +
          qustion +
          '</div><input type="text" name="prompt" id="prompttxt" spellcheck="true" autocomplete="off">';
        let prompttxt = document.getElementById("prompttxt");
        prompttxt.innerHTML = "";
        prompttxt.focus();
        prompttxt.addEventListener("keyup", (e) => {
          if (e.key == "Enter") {
            resolve(prompttxt.value);
            inp.innerHTML = "";
          } else if (e.key == "Escape") {
            reject();
            inp.innerHTML = "";
          }
        });
      });
    },
    clear: function () {
      cnsl.innerHTML = "";
    },
    exit: function (num) {
      cnsl.innerHTML += "$_";
      throw new Error("Exit code " + num ? num : 0);
    },
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    num(str) {
      return Number(str);
    },
    str(num) {
      return String(num);
    },
    abs(num) {
      if (num < 0) {
        return -num;
      } else {
        return num;
      }
    },
    fact: function (num) {
      if (num == 0) {
        return 1;
      } else {
        return num * this.fact(num - 1);
      }
    },
    XOR: function (a, b) {
      let result = false;
      if (typeof a == "number" && typeof b == "number") {
        result = a * !b + !a * b;
      } else {
        result = (!a && b) || (a && !b);
      }
      return result;
    },
    XNOR: function (a, b) {
      return (!a && !b) || (a && b);
    },
    NOR: function (a, b) {
      return !(a || b);
    },
    NAND: function (a, b) {
      return !(a && b);
    },
    getch: function () {
      return new Promise((resolve) => {
        document.addEventListener("keydown", (e) => {
          resolve(e.key);
        });
      });
    },
  };
  var header = "";
  var strtingArray = [],
    objArray = [],
    setArray = [];
  var data = data
    .replace(/\/\/.+/g, "")
    .replace(/\n|\r/g, "")
    .replace(/\s+/g, " ")
    .replace(/'.*?'/g, "")
    .replace(/(?<![\w\$\_\d\.])eval\(`[\s\S\n]+`\);/g, function (match) {
      match = match.replace(/eval\(`/g, "").replace(/`\);?/g, "");
      return "(async function () {" + match + "})()";
    })
    .replace(/\"[\s\S]*?\"/g, function (match) {
      strtingArray.push(match);
      return "<token:s" + (strtingArray.length - 1);
    })
    .replace(
      /vel(c|t)\s[\w\d\$_]+\s?=\s?{([\w\d\$_"]:?[^\s],?)*};?/,
      function (match) {
        var temp = match.replace(/{([\w\d\$_"]:?[^\s],?)*};?/, "");
        objArray.push(match.replace(temp, ""));
        return temp + "<token:obj" + (objArray.length - 1) + ";";
      }
    )
    .replace(
      /vel(c|t)\s[\w\d\$_]+\s?=\s?{([\w\d\$_"]+\s?)*};?/,
      function (match) {
        var temp = match.replace(/{([\w\d\$_"]+\s?)*};?/, "");
        setArray.push(
          match
            .replace(temp, "")
            .replace(/\s/g, ",")
            .replace(/{/g, "new Set([")
            .replace(/};?/g, "])")
        );
        return temp + "<token:set" + (setArray.length - 1) + ";";
      }
    )
    .replace(/clear\(\)/g, "global.clear()")
    .replace(/exit\(/g, "global.exit(")
    .replace(/sleep\(/g, "await global.sleep(")
    .replace(/`/g, "\\`")
    .trim();
  var functionArray = [];
  const blocks = data
    .replace(/>(?=.*?\{)/g, "><token:devider>")
    .replace(/}/g, "<token:x2775><token:devider>")
    .replace(
      /(function|class)\s([\w\d\$\_])+\([\w\d\$\_\s,\[\]]*\)\s?{/g,
      function (match) {
        functionArray.push(match);
        return "<token:devider><token:f" + (functionArray.length - 1);
      }
    )
    .replace(/{/g, "<token:x2774><token:devider>")
    .split("<token:devider>")
    .filter((e) => e);
  let returncode = "";
  for (let i = 0; i < blocks.length; i++) {
    //console.log(blocks[i]);
    returncode += compiler(blocks[i])
      .replace(/dt\(/, "new global.date(")
      .replace(/(?<![\w\$\_\d\.])jrin\(/g, "await global.jrin(")
      .replace(/(?<![\w\$\_\d\.])jro\(/g, "global.jro(")
      .replace(/(?<![\w\$\_\d\.])json\./g, "global.json.")
      .replace(/(?<![\w\$\_\d\.])exclude\s/g, "delete ")
      .replace(/(?<![\w\$\_\d\.])error(?![\w\d\$\_])/g, " global.error")
      .replace(/(?<![\w\$\_\d\.])String(?![\w\d\$\_])/g, " global.string")
      .replace(/(?<![\w\$\_\d\.])Number(?![\w\d\$\_])/g, " global.number")
      .replace(/(?<![\w\$\_\d\.])Boolean(?![\w\d\$\_])/g, " global.boolean")
      .replace(/(?<![\w\$\_\d\.])Func(?![\w\d\$\_])\(/g, " global.Func(")
      .replace(/(?<![\w\$\_\d\.])velc(?![\w\d\$\_])\s/g, "const ")
      .replace(/(?<![\w\$\_\d\.])velt(?![\w\d\$\_])\s/g, "let ")
      .replace(/(?<![\w\$\_\d\.])num(?![\w\d\$\_])\(/g, " global.num(")
      .replace(/(?<![\w\$\_\d\.])str(?![\w\d\$\_])\(/g, " global.str(")
      .replace(/[\d\w]+\s?\\s?[\d\w]+/g, (match) => {
        return "global.XOR(" + match.replace(/\s?\\s?/, ",") + ")";
      })
      .replace(/[\d\w]+\s?\!\\s?[\d\w]+/g, (match) => {
        return "global.XNOR(" + match.replace(/\s?\!\\s?/, ",") + ")";
      })
      .replace(/[\d\w]+\s?\!\|\s?[\d\w]+/g, (match) => {
        return "global.NOR(" + match.replace(/\s?\!\|\s?/, ",") + ")";
      })
      .replace(/[\d\w]+\s?\!\&\s?[\d\w]+/g, (match) => {
        return "global.NAND(" + match.replace(/\s?\!\&\s?/, ",") + ")";
      })
      .replace(/\|[+-\d\w]+\|/g, function (match) {
        return "global.abs(" + match.replace(/\|/g, "") + ")";
      })
      .replace(/[\d\w]+!/, function (match) {
        return "global.fact(" + match.replace(/!/, "") + ")";
      });
  }
  function compiler(data) {
    let len = 1;
    data = data.replace(
      /(?<![\w\d\$_])(var|let|const|main|(D|d)ocument|(W|w)indow|JSON|String|Boolean|Number|(D|d)ate|globalThis|navigator|localStorage|atob|btoa|this|console)(?![\w\d\$_])/g,
      function (match) {
        return "_" + match;
      }
    );
    let lines = "";
    if (data.includes("#include")) {
      data = getIncludes(data);
    }
    if (data.includes(";")) {
      lines = data.replace(/;/g, ";<token:003B>").split("<token:003B>");
      len = lines.length;
      if (!lines[len - 1]) {
        lines.pop();
        len--;
      }
    } else {
      lines = [data];
    }
    //console.log("start:", [data]);
    let code = "",
      semiclone = "";
    for (let i = len - 1; i >= 0; --i) {
      let line = lines[i];
      if (line.includes("=+")) {
        let a = line.replace(/;/g, "").split("=+");
        line = a[0] + "=" + a[1] + "+" + a[0] + ";";
      } else if (line.includes("=-")) {
        let a = line.replace(/;/g, "").split("=-");
        line = a[0] + "=" + a[1] + "-" + a[0] + ";";
      } else if (line.includes("=*")) {
        let a = line.replace(/;/g, "").split("=*");
        line = a[0] + "=" + a[1] + "*" + a[0] + ";";
      } else if (line.includes("=/")) {
        let a = line.replace(/;/g, "").split("=/");
        line = a[0] + "=" + a[1] + "/" + a[0] + ";";
      } else if (line.includes("=%")) {
        let a = line.replace(/;/g, "").split("=%");
        line = a[0] + "=" + a[1] + "%" + a[0] + ";";
      }
      line = line.replace(/(?<=for\(.+),/g, ";");
      if (line === ";") {
        semiclone = ";";
      }
      code += line;
      //console.log([line]);
    }
    code = semiclone + code;
    code = code.replace(/;+/g, ";");
    if (code.includes("<token:x2774>")) {
      code = code.replace("<token:x2774>", "") + "{";
    }
    if (code.includes("<token:x2775>")) {
      code = code.replace("<token:x2775>", "") + "}";
    }
    if (code.match(/<token:f\d+/g)) {
      let match = code.match(/<token:f\d+/g);
      for (let i = 0; i < match.length; i++) {
        let findex = parseInt(match[i].replace(/<token:f/, ""));
        code = code.replace(match[i], "");
        code = functionArray[findex] + code;
      }
    }
    return code;
  }
  //console.log(returncode);
  //fs.writeFileSync("index.js", returncode, "utf8");
  returncode = returncode
    .replace(/<token:s\d+/g, function (match) {
      let sindex = parseInt(match.replace(/<token:s/, ""));
      return strtingArray[sindex];
    })
    .replace(/<token:obj\d+/g, function (match) {
      let sindex = parseInt(match.replace(/<token:obj/, ""));
      return objArray[sindex];
    })
    .replace(/<token:set\d+/g, function (match) {
      let sindex = parseInt(match.replace(/<token:set/, ""));
      return setArray[sindex];
    })
    .replace(
      /class\s([\w\d\$\_])+\([\w\d\$\_\s,\[\]]*\){.*?(};)/g,
      function (match) {
        let temp = match.replace(/class\s([\w\d\$\_])+/, "");
        let temp2 = match.replace(temp, "");
        return temp2 + "{constructor" + temp + "};";
      }
    )
    .replace(/@(?=[\w\d\$_])/g, "this.")
    .replace(/@/g, "this");
  strtingArray = undefined;
  objArray = undefined;
  setArray = undefined;
  console.log("result : ", header + returncode);
  return "(async function () {" + header + returncode + "})()";
  function getIncludes(data) {
    return data
      .replace(/#include\s?\<[\w\d\,]+\>/g, function (match) {
        let sname = match.replace(/#include\<|\>/g, "");
        if (sname == "all") {
          header += `global.json = JSON; global.date = Date; global.error = function (...args) { throw new Error(...args); }; let math = await import('./math_laibrary.js'); let _crypto = await import('./crypto_laibrary.js'); let fs = await import('./browser/fs.js'); let request = await import('./browser/req.js'); let cmd = await import('./browser/cmd.js');`;
          global.error = function (...args) {
            throw new Error(...args);
          };
          std = true;
          globalThis.global = global;
        } else {
          if (sname.includes("std") && !std) {
            std = true;
            globalThis.global = global;
          }
          if (sname.includes("json")) {
            header += "global.json = JSON;";
          }
          if (sname.includes("error")) {
            global.error = function (...args) {
              throw new Error(...args);
            };
          }
          if (sname.includes("math")) {
            header += 'let math = await import("./math_laibrary.js");';
          } else if (sname.includes("num")) {
            addNumProto();
          }
          if (sname.includes("date")) {
            header += "global.date = Date; Date = undefined;";
          }
          if (sname.includes("arr")) {
            addArrProto();
          }
          if (sname.includes("str")) {
            addArrProto();
          }
          if (sname.includes("func")) {
            global.Func = Function;
          }
          if (!sname.includes("reg")) {
            RegExp = undefined;
          }
        }
        return "";
      })
      .replace(/#include\s<"[\w\d]+"\|[\w\d]+?>/g, (match) => {
        let sname = match.replace(/#include<"|"|>/g, "").split("|");
        return "const " + sname[1] + " = await import('" + sname[0] + "');";
      });
  }
  function addNumProto() {
    Number.__proto__.isOdd = function () {
      return this % 2 !== 0;
    };
    Number.__proto__.isPrime = function () {
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
  }
  function addArrProto() {
    Array.__proto__.range = function (start, end, step) {
      if (step === undefined) {
        step = 1;
      }
      let result = [];
      if (start < end) {
        for (let i = start; i < end; i += step) {
          result.push(i);
        }
      } else {
        for (let i = start; i > end; i += step) {
          result.push(i);
        }
      }
      return result;
    };
    Array.__proto__.sum = function () {
      let result = 0;
      for (let i = 0; i < this.length; i++) {
        result += this[i];
      }
      return result;
    };
    Array.__proto__.product = function () {
      let result = 1;
      for (let i = 0; i < this.length; i++) {
        result *= this[i];
      }
      return result;
    };
    Array.__proto__.mean = function () {
      return this.sum() / this.length;
    };
    Array.__proto__.median = function () {
      let sorted = this.sort();
      if (sorted.length % 2 === 0) {
        return (sorted[sorted.length / 2] + sorted[sorted.length / 2 - 1]) / 2;
      } else {
        return sorted[Math.floor(sorted.length / 2)];
      }
    };
    Array.__proto__.mode = function () {
      let count = {};
      for (let i = 0; i < this.length; i++) {
        if (count[this[i]] === undefined) {
          count[this[i]] = 1;
        } else {
          count[this[i]] += 1;
        }
      }
      let max = 0;
      let result;
      for (let i in count) {
        if (count[i] > max) {
          max = count[i];
          result = i;
        }
      }
      return result;
    };
    Array.__proto__.GCD = function () {};
  }
}
function run() {
  localStorage.setItem("ide", ide.value);
  rundiv.disabled = true;
  var ap = async () => {
    return await new Promise((resolve, reject) => {
      try {
        let code = fs.readFileSync("index.fg", "utf8");
        console.time("compilation time");
        resolve(eval(code));
        console.timeEnd("compilation time");
      } catch (e) {
        global.jro("Error > " + e.message);
      }
    });
  };
  ap()
    .then()
    .catch((e) => {
      console.log(e);
      let msg =
        typeof e !== "string"
          ? e.message
              ?.replace(/import/g, "include")
              .replace(/global\./g, "")
              ?.replace(
                /_(var|let|const|main|(D|d)ocument|(W|w)indow|JSON|String|Boolean|Number|(D|d)ate|globalThis|navigator|localStorage|atob|btoa|this)/g,
                function (match) {
                  return match.replace("_", "");
                }
              )
          : e;
      cons.innerHTML += !msg.includes("Exit code ") ? "\n$Error >" + msg : msg;
    });
}
class refer {
  #obj = [];
  constructor() {
    this.name = "Refer";
  }
  add(name, value) {
    this.#obj.push([name, value]);
    return this.#obj.length - 1;
  }
  get(name) {
    if (typeof name === "string") {
      for (let i = 0; i < this.#obj.length; i++) {
        if (this.#obj[i][0] === name) {
          return this.#obj[i][1];
        }
      }
    } else if (typeof name === "number") {
      return this.#obj[name][1];
    } else {
      throw "Require a string as name or index";
    }
  }
  set(name, value) {
    if (typeof name === "string") {
      for (let i = 0; i < this.#obj.length; i++) {
        if (this.#obj[i][0] === name) {
          this.#obj[i][1] = value;
        }
      }
    } else if (typeof name === "number") {
      this.#obj[name][1] = value;
    } else {
      throw "Require a string as name or index";
    }
  }
  remove(name) {
    if (typeof name === "string") {
      for (let i = 0; i < this.#obj.length; i++) {
        if (this.#obj[i][0] === name) {
          this.#obj.splice(i, 1);
        }
      }
    } else if (typeof name === "number") {
      this.#obj.splice(name, 1);
    } else {
      throw "Require a string as name or index";
    }
  }
  exicute() {
    for (let i = 0; i < this.#obj.length; i++) {
      this.#obj[i][1]();
    }
  }
}
function pico(template, expressions, initilizations) {}
