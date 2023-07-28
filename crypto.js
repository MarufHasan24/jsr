function cid(text) {
  const length = text.length;
  let result = "";
  const keys = [
    "UUU",
    "UUC",
    "UUA",
    "UUG",
    "CUU",
    "CUC",
    "CUA",
    "CUG",
    "AUU",
    "AUC",
    "AUA",
    "GUU",
    "GUC",
    "GUA",
    "GUG",
    "UCU",
    "UCC",
    "UCA",
    "UCG",
    "CCU",
    "CCC",
    "CCA",
    "CCG",
    "ACU",
    "ACC",
    "ACA",
    "ACG",
    "GCU",
    "GCC",
    "GCA",
    "GCG",
    "UAU",
    "UAC",
    "CAU",
    "CAC",
    "CAA",
    "CAG",
    "AAU",
    "AAC",
    "AAA",
    "AAG",
    "GAU",
    "GAC",
    "GAA",
    "GAG",
    "UGU",
    "UGC",
    "UGG",
    "CGU",
    "CGC",
    "CGA",
    "CGG",
    "AGU",
    "AGC",
    "AGA",
    "AGG",
    "GGU",
    "GGC",
    "GGA",
    "GGG",
  ];
  text = binarytopre(text);
}
console.clear();
console.log(binarytopre("hello world!"));
function binarytopre(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += text.charCodeAt(i).toString(2).padStart(8, "0");
  }
  let binary = result;
  result = "";
  const rand = /* Math.floor(Math.random() * 58); */ 5e8;
  binary =
    binary.substring(0, binary.length - (binary.length % rand)) +
    binary
      .substring(binary.length - (binary.length % rand))
      .padStart(rand, "0");
  for (let i = 0; i < binary.length; i += rand) {
    let lr = binary.slice(i, i + rand);
    lr = parseInt(lr, 2);
    let num = "";
    do {
      num = " " + (lr % rand) + num;
      lr = Math.floor(lr / rand);
    } while (lr);
    result += num + ",";
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

function replacer() {}
536870888;
