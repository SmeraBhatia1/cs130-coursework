const makeBigger = () => {
   // alert('make bigger!');
   document.querySelector(".content").style.fontSize = "2.5em";
};

const makeSmaller = () => {
   // alert('make smaller!');
   document.querySelector(".content").style.fontSize = "1em";
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;

