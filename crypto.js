!(function (t, e = 19600) {
  let l = "";
  for (let e = 0; e < t.length; e++)
    l += t.charCodeAt(e).toString(2).padStart(8, "0");
  let n = l;
  (l = ""), (e = e >= 53e6 || e <= 1 ? 19600 : e), e--;
  const o = Math.floor(1 + Math.random() * e);
  n =
    n.substring(0, n.length - (n.length % o)) +
    n.substring(n.length - (n.length % o)).padStart(o, "0");
  let r = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "D",
    "E",
    "F",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "-",
    "=",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "'",
    "<",
    ">",
    ".",
    "/",
    "?",
    "|",
    "~",
    "`",
  ];
  r = r.slice(0, o);
  for (let t = 0; t < n.length; t += o) {
    let e = n.slice(t, t + o);
    e = parseInt(e, 2);
    let h = "";
    do {
      (h = (e % o) + h), (e = Math.floor(e / o));
      for (let t = r.length - 1; t >= 0; t--) h = h.replace(t, r[t]);
    } while (e);
    l += h;
  }
})("Hello World", 30);
