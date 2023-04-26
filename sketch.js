// Variables
var charter = []; 
var diferencial = 10;
var dibujando = 'circulo';
var btnCirculo = null;
var btnRectangulo = null;
let puntuacion;
var lava;
let x = 0;
let y = 0;

//Botones, letras y demas componentes visuales
function setup() {
  cnv = createCanvas(600, 400);
  // Titulo
 let titulo = createDiv('¡No caigas en la lava!');
  titulo.position(190,70);
  titulo.style('font-size', '18px');
  titulo.style('color', '#fff');

  puntuacion = createDiv('Puntuacion = 0');
  puntuacion.position(20, 40);
  puntuacion.id = 'score';
  puntuacion.style('color', 'white');
  // Boton
  btnCirculo = createButton('Circulo');
  btnCirculo.position(485, 30);
  btnCirculo.mousePressed(changeCirculo);
  btnCirculo.style('background-color','#7257E0');
  btnCirculo.size(90,30);
  btnCirculo.style('color','#fff');
  
  // Boton
  btnRectangulo = createButton('Square');
  btnRectangulo.position(485, 70);
  btnRectangulo.mousePressed(changeRectangulo);
  btnRectangulo.style('background-color','#7257E0');
  btnRectangulo.size(90,30);
  btnRectangulo.style('color','#fff');
  //Lava
  lava = new Lava(0,300,600,200);
  
}

// Clase charters
class Charters {
  constructor(x,y,velx,vely, ancho, alto) {
    this.posicion = createVector(x,y,velx,vely);
    this.velocidad = createVector(velx,vely);
    this.alto = alto;
    this.ancho = ancho;
    this.fillred = 265;
    this.fillgreen = 60;
    this.fillblue = 6;
  }
  caer () {
   if (this.posicion.x + this.ancho >= 600){
     this.velocidad.x = this.velocidad.x*-1; 
     this.velocidad.y = this.velocidad.y *-1 + (diferencial*0.2);
    }
    this.posicion.add(this.velocidad);
  }
   subir () {
     this.velocidad.y = this.velocidad.y - random(diferencial  * 5);
     this.posicion.add(this.velocidad);
     this.velocidad.y = 0;
  } 
  
  colision (){
 if (this.posicion.y >= x + 450){
   noLoop();
    puntuacion.html('Juego finalizado, tu puntuacion es 0');
   
 } else if(this.posicion.x <= 0 ) {
   noLoop();
    puntuacion.html('Juego finalizado, tu puntuacion es 100');
  
 }
}  
}

// Clase CharterCircle
class CharterCircle extends Charters {
  constructor(x,y,velx,vely, alto, ancho) {
    super(x,y,velx,vely, alto, ancho);
  } 
draw (){ 
ellipse(this.posicion.x,this.posicion.y,this.alto,this.ancho);
fill(this.fillred,this.fillgreen,this.fillblue);
  } 
}

// Clase CharterSquare
class CharterSquare extends Charters {
  constructor(x,y,velx,vely, alto, ancho) {
    super(x,y,velx,vely, alto, ancho);
  }
draw (){ 
rect(this.posicion.x,this.posicion.y,this.alto,this.ancho);
fill(this.fillred,this.fillgreen,this.fillblue);
  } 
  }

/* Ambas funciones cambian el color de los botones cuando no estan disponibles.*/
function changeCirculo()
   {
     btnCirculo.style( 'background-color','#5634DC');
     btnRectangulo.style( 'background-color','#6D63C4');
     dibujando = 'circulo';
   }
function changeRectangulo()
   {
     btnRectangulo.style( 'background-color','#5634DC');
     btnCirculo.style( 'background-color','#6D63C4');
     dibujando = 'rectangulo'; 
   }

/* La clase Lava dibuja un rectangulo que contiene el metodo llenarse, este ultimo permite que los objetos llamados por el jugador efectuen la colision contra el, asi como le pemite subir.*/
class Lava {
  constructor(x,y,alto,ancho){
    this.posicion = createVector(x,y);
    this.alto = alto;
    this.ancho = ancho;
    this.fillred = 232;
    this.fillgreen = 60;
    this.fillblue = 6;
  }
  
  draw (){
    rect(this.posicion.x, this.posicion.y, this.alto, this.ancho);
    fill(this.fillred, this.fillgreen, this.fillblue);
  }
  llenarse (){
     lava = new Lava(0, x + 450,600,600);
   }
 
}

/* Se ejecutan los metodos de charter "draw", "caer" y "colsion", asi como se dibuja la lava y se declara el incremento que tendra x para que esta suba */
function draw() {
 background(26,26,26); 
 lava.draw();
  x = x - 0.8;
 lava.llenarse();
 charter.forEach(function(value, index, array){
 value.draw();
 value.caer();
 value.colision();
 });
 }

/* Se agregan los objetos segun sean seleccionados en los botones de la derecha.*/
function mouseClicked(){
   if (dibujando == 'circulo'){
  charter.push(new CharterCircle(2,2,4,8,20,20));
  }
  else if (dibujando == 'rectangulo'){ 
  charter.push(new CharterSquare(2,2,4,8,20,20));
  }
}
function keyPressed(){
  charter.forEach(function(value, index, array){
  value.subir();
  });
}
