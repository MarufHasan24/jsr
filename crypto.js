function binarytopre(text, range = 1.96e4) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += text.charCodeAt(i).toString(2).padStart(8, "0");
  }
  let binary = result;
  result = "";
  range = range >= 5.3e7 || range <= 1 ? 1.96e4 : range;
  range--;
  const rand = Math.floor(1 + Math.random() * range);
  binary =
    binary.substring(0, binary.length - (binary.length % rand)) +
    binary
      .substring(binary.length - (binary.length % rand))
      .padStart(rand, "0");
  let raw = [
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
  raw = raw.slice(0, rand);
  console.log(raw, rand);
  for (let i = 0; i < binary.length; i += rand) {
    let lr = binary.slice(i, i + rand);
    lr = parseInt(lr, 2);
    let num = "";
    do {
      num = (lr % rand) + num;
      lr = Math.floor(lr / rand);
      for (let r = raw.length - 1; r >= 0; r--) {
        num = num.replace(r, raw[r]);
      }
    } while (lr);

    result += num;
  }
  return [result, rand];
}
function patri(arr, key) {
  var temp = [...arr];
  if (key > arr.length) {
    key = key - arr.length;
  }
  arr.forEach((elem, i) => {
    if (i + key < arr.length) {
      temp[i + key] = elem;
    } else {
      temp[i + key - arr.length] = elem;
    }
  });
  return temp;
}
binarytopre("Hello World", 30);
