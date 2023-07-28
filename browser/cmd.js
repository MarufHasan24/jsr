function command() {
  let local = {
    print: function (text) {
      print(text);
    },
    copy: function (text) {
      navigator.clipboard.writeText(text);
    },
    paste: function () {
      return navigator.clipboard.readText();
    },
    select: function (selector) {
      const node = document.getElementById(selector);
      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        console.warn("Could not select text in node: Unsupported browser.");
      }
    },
  };
}
