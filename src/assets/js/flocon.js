// SETTINGS
const canvas = document.querySelector( '#myCanvas' ),
ctx = canvas.getContext( '2d' ),
w = window.innerWidth,
h = window.innerHeight,
radius = w * 0.25,
dpr = window.devicePixelRatio,
raf = window.requestAnimationFrame,
colors = '#FFFFFF,#F4F4F4,#EFEFEF,#E0E0E0,#EDEDED,#F1F1F1,#E9E9E9,#F6F6F6'.split(',');

// Le tableau qui contiendra nos particules
let particules = [];

const rand = ( max, min = 0, rounded = false ) => {
let n = Math.random() * ( max - min ) + min;
if( rounded ){
n = Math.round( n );
}
return n;
};

const getRandomElement = ( array ) => {
const randomIndex = Math.floor( rand( array.length ) );
return array[ randomIndex ];
};

// CLASSES
class Particule {
constructor( ) {
this.radius = rand(1, 5, true);
this.x = rand( w, 0, true );
this.gravity = rand(1,0.2);
this.wind = rand(1,-1,true) * 0.2;
this.duration = rand(200,150, true) * 100;
this.color = getRandomElement( colors );

this.reset();
}

reset() {
this.x = rand( w, 0, true );
this.y = rand( h, this.radius, true) * -1;
}
}

// FUNCTIONS
const createParticules = () => {

// On s'assure que notre tableau soit vide.
particules = [];

const n = 500;

for( let i = 0; i < n; i++ ){
particules.push( new Particule() );
}
};

const canvasSetup = () => {
canvas.width = w;
canvas.height = h;
// canvas.style.transform = `translate(-50%,-50%) scale(${ 1/dpr })`;
ctx.scale( dpr, dpr );
};

const draw = ( time ) => {

ctx.clearRect( 0, 0, canvas.width, canvas.height );

for( const p of particules ){
const k = ( time % p.duration ) / p.duration;

p.x += p.wind;
p.y += p.gravity;
if( p.x > w + p.radius || p.x < 0 - p.radius || p.y > h + p.radius ){
p.reset();
}

ctx.beginPath();
ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
ctx.closePath();

ctx.fillStyle = p.color;
ctx.fill();
}
};

const tick = () => {
const now = performance.now();
draw( now - beginTime );
raf( tick );
};

createParticules();
canvasSetup();
draw();
beginTime = performance.now();
tick();
