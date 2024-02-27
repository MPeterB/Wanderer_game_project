import './style.css';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx: any = canvas.getContext('2d');

ctx.fillRect(10, 10, 100, 100);
