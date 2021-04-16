// let h1;

// let x = 0;
// let y = 0;
// let mx = 0;
// let my = 0;
// let speed = 0.05;

// window.onload = function(){
//     h1 = document.getElementsByClassName('h1')[0];
//     human = document.getElementsByClassName("human")[0];
//     window.addEventListener('mousemove', mouseFunc, false);

//     function mouseFunc(e) {
//         x = e.clientX;
//         y = e.clientY;
//     }
//     loop();
// }

// function loop() {
//     mx += (x-mx) * speed;
//     my += (y-my) * speed;

//     h1.innerHtml = "x: " + x + " mx: " + mx;
//     window.requestAnimationFrame(loop);
// }