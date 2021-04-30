const defaultTheme = () => {
   alert('switch to default theme');
   document.querySelector("body").className = "container";
};

const oceanTheme = () => {
   alert('switch to ocean theme');
   document.querySelector("body").className = "ocean";

};

const desertTheme = () => {
   alert('switch to desert theme');
   document.querySelector("body").className = "desert";

};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;

