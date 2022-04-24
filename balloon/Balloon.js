let CurrentID;

class Balloon {
  params = {
    imgWidth: 200,
    imgHeight: 250,
    imgName: "balloon/balloon.png",
    className: 'balloon obj'
  }
  // координаты div
  curX; 
  curY;
  // координаты шариков
  ballsX = 0; 
  ballsY = 0;
  ballsAngle = 0;
  imgId;
  dy = 5;
  angle = 0;


  constructor(x, y, id, params = this.params) {
    // создаем div, если его нет
    if (!document.getElementById(id)) {
      this.mainDiv = document.createElement('div');
      this.mainDiv.className = 'container';
      this.mainDiv.id = id;
      this.mainDiv.style.left = x + "px";
      this.mainDiv.style.top = y + "px";
      document.body.appendChild(this.mainDiv);
    }
    // добавляем картинку в div
    this.imgId = document.createElement('img');
    this.imgId.src = params.imgName;
    this.imgId.id = id;
    this.imgId.className = params.className;
    this.imgId.style.width = params.imgWidth + "px";
    this.imgId.style.height = params.imgHeight + "px";
    this.curX = x;
    this.curY = y;
    params.className === 'balls obj' ? this.imgId.style.left = this.params.imgWidth / 2: null;
    this.ballsX = params.imgWidth / 2;
    //this.ballsY = params.imgHeight;
    this.mainDiv = document.getElementById(id);
    this.mainDiv.appendChild(this.imgId);
    console.log(this);
    this.mainDiv.addEventListener("click", (event) => this.focus(event));
  }

  focus(event) {
    CurrentID = this;
    this.dropSahdow(event);
  }

  dropSahdow(event) {
    let elems = document.getElementsByClassName('obj');
    for (let i = 0; i < elems.length; i++) {
      elems[i].style.filter = null;
      if (elems[i].id === this.imgId.id) {
        elems[i].style.filter = "drop-shadow(5px 4px 5px #808)";
      }
    }
    event.stopPropagation();
  }

  move(direction) {
    this.curY += this.dy * direction;
    requestAnimationFrame( () => {
      this.mainDiv.style.top = this.curY + "px";
    });
    this.animationBalls();
  }
  
  transform(direction) {
    this.angle += direction*Math.PI/36
    this.imgId.style.transform = "rotate(" + this.angle + "rad)";
  }

  animationBalls() {
    const mainElem = document.getElementById(this.mainDiv.id);
    let elem = mainElem.getElementsByClassName('balls');
    elem ? elem = elem[0] : null;
    this.ballsAngle += Math.PI / 18;
    this.ballsY += this.params.imgHeight / 10 * Math.sin(this.ballsAngle);
    this.ballsX += this.params.imgWidth / 10 * Math.cos(this.ballsAngle);
    elem.style.left = this.ballsX + 'px';
    elem.style.top = this.ballsY + 'px';
  }
}