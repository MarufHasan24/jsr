const{match:match}=require("assert"),cnsl=cons,inp=inputdiv,head=scriptm;function main(data){let global={jro:function(...e){for(var r="",t=0;t<e.length;t++){var n=e[t];r+=JSON.stringify(n,(function(e,r){if(void 0===r)return"undefined";if(null===r)return"null";if(r===1/0)return"Infinity";if(r===-1/0)return"-Infinity";if(Number.isNaN(r))return"Not a Number";if(r instanceof WeakSet){let e=Array.from(r);return"WeakSet("+e.length+"){"+e.toString()+"}"}if(r instanceof Set){let e=Array.from(r);return"Set("+e.length+"){"+e.toString()+"}"}if(r instanceof Map){let e=Array.from(r),t="Map("+e.length/2+"){";for(let r=0;r<e.length;r++)t+="{'"+e[r][0]+"' => "+e[r][1]+"},";return t+"}"}return-1!==r.toString().indexOf("class")?"constructor"+(e=e.trim()?" "+e.trim()[0].toUpperCase()+e.trim().slice(1):"")+" : class "+r.name+"{[native code]}":"function"==typeof r?"f "+e+"() {[code]}":r}))}cnsl.innerHTML+="$ "+r+"\n"},jrin:function(e){return new Promise(((r,t)=>{inp.innerHTML="",inp.innerHTML='<div style="color: #fff;">'+e+'</div><input type="text" name="prompt" id="prompttxt" spellcheck="true" autocomplete="off">';let n=document.getElementById("prompttxt");n.innerHTML="",n.focus(),n.addEventListener("keyup",(e=>{"Enter"==e.key?(r(n.value),inp.innerHTML=""):"Escape"==e.key&&(t(),inp.innerHTML="")}))}))},clear:function(){cnsl.innerHTML=""},exit:function(e){throw cnsl.innerHTML+="$_",new Error(e)},sleep:function(e){return new Promise((r=>setTimeout(r,e)))},num:e=>Number(e),str:e=>String(e),abs:e=>e<0?-e:e,fact:function(e){return 0==e?1:e*this.fact(e-1)},XOR:function(e,r){let t=!1;return t="number"==typeof e&&"number"==typeof r?e*!r+!e*r:!e&&r||e&&!r,t},XNOR:function(e,r){return!e&&!r||e&&r},NOR:function(e,r){return!(e||r)},NAND:function(e,r){return!(e&&r)},getch:function(){return new Promise((e=>{document.addEventListener("keydown",(r=>{e(r.key)}))}))}};var header="",strtingArray=[],objArray=[],setArray=[],picoarray=[],data=data.replace(/\/\/.+?\n/g,"").replace(/\n|\r/g,"").replace(/'.*?'/g,"").replace(/((\[([\w\d\$_\s,]+?)+\])|(~?{[\w\d\$_\s:,]+?}))pico\([\w\d\$_\s,]+\){.+}:\([\w\d\$_\s,\-\+]+\)/g,(function(e){return picoarray.push(e),"<token:pico"+(picoarray.length-1)})).replace(/\s+/g," ").replace(/(?<![\w\$\_\d\.])eval\(`[\s\S\n]+`\);/g,(function(e){return"(async function () {"+(e=e.replace(/eval\(`/g,"").replace(/`\);?/g,""))+"})()"})).replace(/\\/gi,"").replace(/\"[\s\S]*?\"/g,(function(e){return strtingArray.push(e),"<token:s"+(strtingArray.length-1)})).replace(/vel(c|t)\s[\w\d\$_]+\s?=\s?{([\w\d\$_"]:?[^\s],?)*};?/,(function(e){var r=e.replace(/{([\w\d\$_"]:?[^\s],?)*};?/,"");return objArray.push(e.replace(r,"")),r+"<token:obj"+(objArray.length-1)+";"})).replace(/vel(c|t)\s[\w\d\$_]+\s?=\s?{([\w\d\$_"]+\s?)*};?/,(function(e){var r=e.replace(/{([\w\d\$_"]+\s?)*};?/,"");return setArray.push(e.replace(r,"").replace(/\s/g,",").replace(/{/g,"new Set([").replace(/};?/g,"])")),r+"<token:set"+(setArray.length-1)+";"})).replace(/clear\(\)/g,"global.clear()").replace(/exit\(/g,"global.exit(").replace(/sleep\(/g,"await global.sleep(").replace(/`/g,"\\`").trim(),functionArray=[];const blocks=data.replace(/>(?=.*?\{)/g,"><token:devider>").replace(/}/g,"<token:x2775><token:devider>").replace(/(function|class)\s([\w\d\$\_])+\([\w\d\$\_\s,\[\]]*\)\s?{/g,(function(e){return functionArray.push(e),"<token:devider><token:f"+(functionArray.length-1)})).replace(/{/g,"<token:x2774><token:devider>").split("<token:devider>").filter((e=>e));let returncode="";for(let e=0;e<blocks.length;e++)returncode+=compiler(blocks[e]).replace(/dt\(/,"new global.date(").replace(/(?<![\w\$\_\d\.])jrin\(/g,"await global.jrin(").replace(/(?<![\w\$\_\d\.])jro\(/g,"global.jro(").replace(/(?<![\w\$\_\d\.])json\./g,"global.json.").replace(/(?<![\w\$\_\d\.])exclude\s/g,"delete ").replace(/(?<![\w\$\_\d\.])error(?![\w\d\$\_])/g," global.error").replace(/(?<![\w\$\_\d\.])String(?![\w\d\$\_])/g," global.string").replace(/(?<![\w\$\_\d\.])Number(?![\w\d\$\_])/g," global.number").replace(/(?<![\w\$\_\d\.])Boolean(?![\w\d\$\_])/g," global.boolean").replace(/(?<![\w\$\_\d\.])Func(?![\w\d\$\_])\(/g," global.Func(").replace(/(?<![\w\$\_\d\.])velc(?![\w\d\$\_])\s/g,"const ").replace(/(?<![\w\$\_\d\.])velt(?![\w\d\$\_])\s/g,"let ").replace(/(?<![\w\$\_\d\.])num(?![\w\d\$\_])\(/g," global.num(").replace(/(?<![\w\$\_\d\.])str(?![\w\d\$\_])\(/g," global.str(").replace(/[\d\w]+\s?\\s?[\d\w]+/g,(e=>"global.XOR("+e.replace(/\s?\\s?/,",")+")")).replace(/[\d\w]+\s?\!\\s?[\d\w]+/g,(e=>"global.XNOR("+e.replace(/\s?\!\\s?/,",")+")")).replace(/[\d\w]+\s?\!\|\s?[\d\w]+/g,(e=>"global.NOR("+e.replace(/\s?\!\|\s?/,",")+")")).replace(/[\d\w]+\s?\!\&\s?[\d\w]+/g,(e=>"global.NAND("+e.replace(/\s?\!\&\s?/,",")+")")).replace(/\|[+-\d\w]+\|/g,(function(e){return"global.abs("+e.replace(/\|/g,"")+")"})).replace(/[\d\w]+!/,(function(e){return"global.fact("+e.replace(/!/,"")+")"}));function compiler(e){let r=1;e=e.replace(/(?<![\w\d\$_])(var|let|const|main|(D|d)ocument|(W|w)indow|JSON|String|Boolean|Number|(D|d)ate|globalThis|navigator|localStorage|atob|btoa|this|console)(?![\w\d\$_])/g,(function(e){return"_"+e}));let t="";e.includes("#include")&&(e=getIncludes(e)),e.includes(";")?(t=e.replace(/;/g,";<token:003B>").split("<token:003B>"),r=t.length,t[r-1]||(t.pop(),r--)):t=[e];let n="",o="";for(let e=r-1;e>=0;--e){let r=t[e],l=r.match(/=(\+|\-|\/|\*|\%)/g);if(l){let e=r.match(/[^(]+=(\+|\-|\/|\*|\%).+(?=(\)|;))/g)[0];r=r.replace(e,(function(){return temp=e.split(l[0]),temp[0]+" = "+temp[1]+l[0].replace("=","")+temp[0]}))}r=r.replace(/(?<=for\(.+),/g,";"),";"===r&&(o=";"),n+=r}if(n=o+n,n=n.replace(/;+/g,";"),n.includes("<token:x2774>")&&(n=n.replace("<token:x2774>","")+"{"),n.includes("<token:x2775>")&&(n=n.replace("<token:x2775>","")+"}"),n.match(/<token:f\d+/g)){let e=n.match(/<token:f\d+/g);for(let r=0;r<e.length;r++){let t=parseInt(e[r].replace(/<token:f/,""));n=n.replace(e[r],""),n=functionArray[t]+n}}return n}return returncode=returncode.replace(/<token:s\d+/g,(function(e){let r=parseInt(e.replace(/<token:s/,""));return strtingArray[r]})).replace(/<token:obj\d+/g,(function(e){let r=parseInt(e.replace(/<token:obj/,""));return objArray[r]})).replace(/<token:set\d+/g,(function(e){let r=parseInt(e.replace(/<token:set/,""));return setArray[r]})).replace(/class\s([\w\d\$\_])+\([\w\d\$\_\s,\[\]]*\){.*?(};)/g,(function(e){let r=e.replace(/class\s([\w\d\$\_])+/,"");return e.replace(r,"")+"{constructor"+r+"};"})).replace(/@(?=[\w\d\$_])/g,"this.").replace(/@/g,"this").replace(/<token:pico\d+?/g,(function(i){let match=picoarray[parseInt(i.replace(/<token:pico/,""))],whatodo="",picoarr="",regexs=[/{(([\w\$_]+\d*)(\s*:\s*[\w\$_]+\d*)*,)+}/g,/\[([\w\$_]+\d*,)+,?\]/g,/{([\w\$_]+\d*\s)*[\w\$_]+\d*\s?}/g,/~{([\w\$_]+\d*\s)*[\w\$_]+\d*\s?}/g],temp=match.match(/((\[([\w\d\$_\s,]+?)+\])|(~?{[\w\d\$_\s:,]+?}))(?=pico)/g),pico=match.replace(temp,"").split(":");if(temp=temp[0],temp)if(temp.match(regexs[0]))picoarr="{}",temp=temp.replace(/{|}/g,"").split(",").filter((e=>e)),temp.forEach((function(e){let r=e.split(":").filter((e=>e));whatodo+="pico["+r[0]+"] = "+(r[1]||r[0])+";"}));else if(temp.match(regexs[1]))picoarr="[]",temp.replace(/^\[|\]$/g,"").split(",").filter((e=>e)).forEach((function(e){whatodo+="pico.push("+e+");"}));else if(temp.match(regexs[3]))picoarr="new WeakSet()",temp=temp.replace(/~{|}/g,"").replace(/\s/g,",").split(",").filter((e=>e)),temp.forEach((function(e){whatodo+="pico.add("+e+");"}));else{if(!temp.match(regexs[2]))throw new Error("SyntaxError: Invalid template literal in pico");picoarr="new Set()",temp=temp.replace(/{|}/g,"").replace(/\s/g,",").split(",").filter((e=>e)),temp.forEach((function(e){whatodo+="pico.add("+e+");"}))}let result=pico[0].replace("pico","(function").replace(/{.+}/g,(function(e){let r=e.match(/(;|{)[^;]+till.+}/g)[0].replace(/(;|{|})/g,"").split(" till "),t=e.replace(r.join(" till "),"").replace(/{|}/g,"");return`{let pico = ${picoarr};while(${r[1]}){${t};${whatodo}${r[0]};};return pico;})`}))+pico[1];return result=eval(result),result instanceof WeakSet?"new WeakSet("+JSON.stringify(Array.from(result))+");":result instanceof Set?"new Set("+JSON.stringify(Array.from(result))+");":JSON.stringify(result)})),strtingArray=void 0,objArray=void 0,setArray=void 0,"(async function () {"+header+returncode+"})()";function getIncludes(e){return e.replace(/#include\s?\<[\w\d\,]+\>/g,(function(e){let r=e.replace(/#include\<|\>/g,"");return"all"==r?(header+="global.json = JSON; global.date = Date; global.error = function (...args) { throw new Error(...args); }; let math = await import('./math_laibrary.js'); let _crypto = await import('./crypto_laibrary.js'); let fs = await import('./browser/fs.js'); let request = await import('./browser/req.js'); let cmd = await import('./browser/cmd.js');",global.error=function(...e){throw new Error(...e)},globalThis.global=global):(r.includes("std")&&(globalThis.global=global),r.includes("json")&&(header+="global.json = JSON;"),r.includes("error")&&(global.error=function(...e){throw new Error(...e)}),r.includes("math")?header+='let math = await import("./math_laibrary.js");':r.includes("num")&&addNumProto(),r.includes("date")&&(header+="global.date = Date; Date = undefined;"),r.includes("arr")&&addArrProto(),r.includes("str")&&addArrProto(),r.includes("func")&&(global.Func=Function),r.includes("reg")||(RegExp=void 0)),""})).replace(/#include\s<"[\w\d]+"\|[\w\d]+?>/g,(e=>{let r=e.replace(/#include<"|"|>/g,"").split("|");return"const "+r[1]+" = await import('"+r[0]+"');"}))}function addNumProto(){Number.__proto__.isOdd=function(){return this%2!=0},Number.__proto__.isPrime=function(){if(!(this>0))throw"Require a positive number";if(2===this)return!0;if(!(this>1))return!1;for(let e=2;e<this;e++)return this%e!=0},Number.__proto__.fact=function(){let e=1;if(this>0){for(let r=1;r<=this;r++)e*=r;return e}throw"Require a positive number"}}function addArrProto(){Array.__proto__.range=function(e,r,t){void 0===t&&(t=1);let n=[];if(e<r)for(let o=e;o<r;o+=t)n.push(o);else for(let o=e;o>r;o+=t)n.push(o);return n},Array.__proto__.sum=function(){let e=0;for(let r=0;r<this.length;r++)e+=this[r];return e},Array.__proto__.product=function(){let e=1;for(let r=0;r<this.length;r++)e*=this[r];return e},Array.__proto__.mean=function(){return this.sum()/this.length},Array.__proto__.median=function(){let e=this.sort();return e.length%2==0?(e[e.length/2]+e[e.length/2-1])/2:e[Math.floor(e.length/2)]},Array.__proto__.mode=function(){let e={};for(let r=0;r<this.length;r++)void 0===e[this[r]]?e[this[r]]=1:e[this[r]]+=1;let r,t=0;for(let n in e)e[n]>t&&(t=e[n],r=n);return r},Array.__proto__.GCD=function(){}}}function run(){localStorage.setItem("ide",ide.value),rundiv.disabled=!0;var ap=async()=>await new Promise(((resolve,reject)=>{try{resolve(eval(main(ide.value)))}catch(e){global.jro("Error > "+e.message)}}));ap().then().catch((e=>{let r="string"!=typeof e?e.message?.replace(/import/g,"include").replace(/global\./g,"")?.replace(/_(var|let|const|main|(D|d)ocument|(W|w)indow|JSON|String|Boolean|Number|(D|d)ate|globalThis|navigator|localStorage|atob|btoa|this)/g,(function(e){return e.replace("_","")})):e;cons.innerHTML+=r.includes("Exit code ")?r:"\n$Error >"+r}))}class refer{#e=[];constructor(){this.name="Refer"}add(e,r){return this.#e.push([e,r]),this.#e.length-1}get(e){if("string"!=typeof e){if("number"==typeof e)return this.#e[e][1];throw"Require a string as name or index"}for(let r=0;r<this.#e.length;r++)if(this.#e[r][0]===e)return this.#e[r][1]}set(e,r){if("string"==typeof e)for(let t=0;t<this.#e.length;t++)this.#e[t][0]===e&&(this.#e[t][1]=r);else{if("number"!=typeof e)throw"Require a string as name or index";this.#e[e][1]=r}}remove(e){if("string"==typeof e)for(let r=0;r<this.#e.length;r++)this.#e[r][0]===e&&this.#e.splice(r,1);else{if("number"!=typeof e)throw"Require a string as name or index";this.#e.splice(e,1)}}}