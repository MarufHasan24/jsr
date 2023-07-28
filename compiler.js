// Purpose: Compiler for the JSR programming language
const cnsl = cons;
const inp = inputdiv;
const head = scriptm;
function main(data) {
  var std = false;
  let global = {
    jro: function (...n) {
      let e = "";
      for (let t = 0; t < n.length; t++) {
        let r = n[t];
        e += JSON.stringify(r, function (n, e) {
          return "function" == typeof e ? "f " + n + "() {[code]}" : e;
        }).replace(/"/g, "");
      }
      cnsl.innerHTML += "$ " + e + "\n";
    },
    jrin: function (n) {
      return new Promise((e, t) => {
        (inp.innerHTML = ""),
          (inp.innerHTML =
            '<div style="color: #fff;">' +
            n +
            '</div><input type="text" name="prompt" id="prompttxt" spellcheck="true" autocomplete="off">');
        let r = document.getElementById("prompttxt");
        (r.innerHTML = ""),
          r.focus(),
          r.addEventListener("keyup", (n) => {
            "Enter" == n.key
              ? (e(r.value), (inp.innerHTML = ""))
              : "Escape" == n.key && (t(), (inp.innerHTML = ""));
          });
      });
    },
    clear: function () {
      cnsl.innerHTML = "";
    },
    exit: function (n) {
      throw ((cnsl.innerHTML += "$_"), new Error(n));
    },
    sleep: function (n) {
      return new Promise((e) => setTimeout(e, n));
    },
    num: (n) => Number(n),
    str: (n) => String(n),
    abs: (n) => (n < 0 ? -n : n),
    fact: function (n) {
      return 0 == n ? 1 : n * this.fact(n - 1);
    },
    XOR: function (n, e) {
      return (!n && e) || (n && !e);
    },
    XNOR: function (n, e) {
      return (!n && !e) || (n && e);
    },
    NOR: function (n, e) {
      return !(n || e);
    },
    NAND: function (n, e) {
      return !(n && e);
    },
  };
  var header = "";
  var strtingArray = [];
  var data = data
    .replace(/\/\/.+/g, "")
    .replace(/\n|\r/g, "")
    .replace(/\s+/g, " ")
    .replace(/'.*?'/g, "")
    .replace(/\"[\s\S]*?\"/g, function (match) {
      strtingArray.push(match);
      return "<token:s" + (strtingArray.length - 1);
    })
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
      /function\s([\w\d\$\_])+\([\w\d\$\_\s{},\[\]]*\)\s?{/g,
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
    returncode += compiler(blocks[i]);
  }
  function compiler(data) {
    let len = 1,
      regex = /\w+\s*\w*\(?.*\)?\{/g,
      objregex = /velc|velt)\s+\w+\s+=\s*{(\w+:.*,?)*}/g;
    data = data.replace(
      /?<![\w\d\$_])(var|let|const|main|(D|d)ocument|(W|w)indow|JSON|String|Boolean|Number|(D|d)ate|globalThis|navigator|localStorage|atob|btoa|crypto)(?![\w\d\$_])/g,
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
      line = line
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
        .replace(/(?<![\w\$\_\d\.])eval(?![\w\d\$\_])\(/g, "evaluate(")
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
        })
        .replace(/(?<=for\(.+),/g, ";");
      if (line === ";") {
        semiclone = ";";
      }
      code += line;
      //console.log([line]);
    }
    code = semiclone + code;
    //console.log(regex.test(code), [code]);
    if (regex.test(code) && !objregex.test(code)) {
      let searchTxt = code.match(regex);
      code = code.replace(regex, "");
      for (i = 0; i < searchTxt.length; i++) {
        code += searchTxt[i];
      }
    }
    if (objregex.test(code)) {
      let searchTxt = code.match(objregex);
      let objstr = "";
      for (i = 0; i < searchTxt.length; i++) {
        objstr += searchTxt[i] + ";";
      }
      code = code.replace(objregex, "");
      code = objstr + code;
    }
    //console.log("end", [code]);
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
  returncode = returncode.replace(/<token:s\d+/g, function (match) {
    let sindex = parseInt(match.replace(/<token:s/, ""));
    return strtingArray[sindex];
  });
  strtingArray = undefined;
  console.log(header + returncode);
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
        console.time("Execution time");
        resolve(eval(main(ide.value)));
        console.timeEnd("Execution time");
      } catch (e) {
        reject(e);
      }
    });
  };
  ap()
    .then((res) => {
      //console.log(res);
    })
    .catch((e) => {
      console.log(e);
      let msg =
        typeof e !== "string"
          ? e.message
              ?.replace(/import/g, "include")
              .replace(/global\./g, "")
              ?.replace(
                /_(var|let|const|main|(D|d)ocument|(W|w)indow|JSON|String|Boolean|Number|(D|d)ate|globalThis|navigator|localStorage|atob|btoa|crypto)/g,
                function (match) {
                  return match.replace("_", "");
                }
              )
          : e;
      cons.innerHTML += !msg.includes("Exit code ") ? "\nError >" + msg : msg;
    });
}
