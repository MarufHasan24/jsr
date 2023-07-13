const cnsl = cons;
const inp = inputdiv;
const head = scriptm;
function main(data) {
  const _name = { JSON, Number, String, Error };
  globalThis.global = {
    printf: function (...args) {
      var text = "";
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var type = typeof arg;
        if (type == "object") {
          text += _name.JSON.stringify(arg).replace(/"/g, "");
        } else if (type == "function") {
          text += "ƒ" + arg + "(){ [code] }";
        } else {
          text += arg;
        }
      }
      cnsl.innerHTML += "$ " + text + "\n";
    },
    input: function (qustion) {
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
    exit: function () {
      cnsl.innerHTML += "$_";
      throw new _name.Error("Exit code 0");
    },
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    num(str) {
      return _name.Number(str);
    },
    str(num) {
      return _name.String(num);
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
      return (!a && b) || (a && !b);
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
  };
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
    .replace(/exit\(\)/g, "global.exit()")
    .replace(/sleep\(/g, "await global.sleep(")
    .replace(/'/g, "\\'")
    .replace(/`/g, "\\`")
    .trim();
  const blocks = data
    .replace(/>(?=.*?\{)/g, "><token:devider>")
    .replace(/}/g, "<token:x2775><token:devider>")
    .replace(/{/g, "<token:x2774><token:devider>")
    .split("<token:devider>")
    .filter((e) => e);
  let returncode = "";
  for (let i = 0; i < blocks.length; i++) {
    //console.log(blocks[i]);
    var functionArray = [];
    let block = blocks[i].replace(/\([\w]+\)\(.*?\);/g, function (match) {
      functionArray.push(match.replace(/\(/, "").replace(/\)/, ""));
      return "";
    });
    returncode += functionArray.join(";") + compiler(block);
  }
  function compiler(data) {
    let len = 1,
      regex = /\w+\s*\w*\(?.*\)?\{/g,
      objregex = /(velc|velt)\s+\w+\s+=\s*{(\w+:.*,?)*}/g;
    let jsmatch = data.match(/^(var|let|const)\s+/g);
    if (jsmatch) {
      throw new Error("SyntaxError: Unexpected token '" + jsmatch + "'");
    }
    data = data.replace(/(var|let|const|main)/g, function (match) {
      return "_" + match;
    });
    let lines = "";
    if (data.includes("#include")) {
      data = getIncludes(data);
    } else if (data.includes("#exclude")) {
      data = getExcude(data);
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
        .replace(/dt/, "new global.date")
        .replace(/math/, "global.math")
        .replace(/input/g, "await global.input")
        .replace(/print/g, "global.printf")
        .replace(/json/g, "global.json")
        .replace(/error/g, "global.error")
        .replace(/Object/g, "global.object")
        .replace(/Array/g, "global.array")
        .replace(/String/g, "global.string")
        .replace(/Number/g, "global.number")
        .replace(/Boolean/g, "global.boolean")
        .replace(/Func/g, "global.Func")
        .replace(/velc/g, "const")
        .replace(/velt/g, "let")
        .replace(/num/g, "global.num")
        .replace(/str/g, "global.str")
        .replace(/eval\(/g, "main(")
        .replace(/[\d\w]+\s?\^\s?[\d\w]+/g, (match) => {
          return "global.XOR(" + match.replace(/\s?\^\s?/, ",") + ")";
        })
        .replace(/[\d\w]+\s?\!\^\s?[\d\w]+/g, (match) => {
          return "global.XNOR(" + match.replace(/\s?\!\^\s?/, ",") + ")";
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
  //fs.writeFileSync("index.js", returncode, "utf8");
  returncode = returncode.replace(/<token:s\d+/g, function (match) {
    let sindex = parseInt(match.replace(/<token:s/, ""));
    return strtingArray[sindex];
  });
  strtingArray = undefined;
  console.log(returncode);
  if (defaultExport) {
    return returncode;
  }
  return "(async function () {" + returncode + "})()";

  function getIncludes(data) {
    return data
      .replace(/#include\<[\w\d\,]+\>/g, function (match) {
        let sname = match.replace(/#include\<|\>/g, "");
        if (sname == "global") {
          global.date = Date;
          global.math = Math;
          global.json = JSON;
          global.error = function (...args) {
            throw new Error(...args);
          };
        } else {
          //console.log(sname, sname.includes("json"), sname.includes("obj"));
          if (!sname.includes("std")) {
            throw new Error("start with std");
          }
          if (sname.includes("json")) {
            global.json = JSON;
          }
          if (sname.includes("error")) {
            global.error = function (...args) {
              throw new Error(...args);
            };
          }
          if (sname.includes("math")) {
            global.math = Math;
          }
          if (sname.includes("date")) {
            global.date = Date;
          }
          if (!sname.includes("obj")) {
            Object = undefined;
          }
          if (!sname.includes("arr")) {
            Array = undefined;
          }
          if (!sname.includes("str")) {
            String = undefined;
          }
          if (!sname.includes("num")) {
            Number = undefined;
          }
          if (!sname.includes("bool")) {
            Boolean = undefined;
          }
          if (sname.includes("func")) {
            global.Func = Function;
          }
          if (!sname.includes("reg")) {
            RegExp = undefined;
          }
        }
        JSON = undefined;
        Math = undefined;
        Date = undefined;
        Error = undefined;
        return "";
      })
      .replace(/#include\<\"\w+\"\>/g, (match) => {
        let sname = match.split('"')[1];
        return "const " + sname + ' = await import("./' + sname + '.js");';
      });
  }
}