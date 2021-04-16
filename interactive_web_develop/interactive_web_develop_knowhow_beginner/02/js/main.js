let scrollTop = 0;
let bar;
let cloudWrap;

window.onload = function() {
    bar = document.getElementsByClassName('bar')[0];
    cloudWrap = document.getElementsByClassName('cloudWrap')[0];
}

window.addEventListener('scroll', function(e){
    scrollTop = document.documentElement.scrollTop;
    let per = Math.ceil(scrollTop / (document.body.scrollHeight - window.outerHeight) * 100);

    bar.style.height = per +"%";
    cloudWrap.style.transform = "translate(0," + scrollTop / 1.2 +"px)"
    

}, false)