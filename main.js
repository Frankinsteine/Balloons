const pos = 1;
const neg = -1;
const ImgWidth = 1920;
const ImgHeight = 1080;


// счетчик id
function makeCounter() {
    let count = 0;
    return function () {
        return count++;
    }
};

document.addEventListener("mousemove", 
 function(e){
    //console.log(window.innerHeight, window.innerWidth);
    var X = (e.clientX*100)/window.innerWidth;
    var Y = (e.clientY*100)/window.innerHeight;
    setTimeout( function() {requestAnimationFrame(function() { 
       document.body.style.backgroundPosition = X+"%"+Y+"%";
     })}, 1000/this.FPC);
}
);

let counter = makeCounter();

// обработка событий // 
function Down(key) {
    switch(key.code) {
        case "Space":
            break;
        case "ArrowUp":
            if (CurrentID) CurrentID.move(neg);
            break;
        case "ArrowDown":
            if (CurrentID) CurrentID.move(pos);
            break;
        case "ArrowLeft":
            if (CurrentID) CurrentID.transform(pos);
            break;
        case "ArrowRight":
            if (CurrentID) CurrentID.transform(neg);
            break;
        case "ControlLeft":
            let count = counter();
            x = Math.round(Math.random() * window.innerWidth * 0.9);
            y = Math.round(Math.random() * window.innerHeight * 0.7);
            balls = new Balls(x, y, count);
            balloon = new Balloon(x, y, count);
            console.log(document.body);
            break;
    }
}

window.onload = function () {
    document.addEventListener('keydown', Down);
}