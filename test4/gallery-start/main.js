const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
let srcImage=['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];

for(let i=0;i<5;i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/'+srcImage[i]);
    thumbBar.appendChild(newImage);
    newImage.onclick =function(){
        displayedImage.setAttribute('src', 'images/'+srcImage[i]);
    }
}


/* Wiring up the Darken/Lighten button */
let state = 0.5;

btn.onclick = function() {


    if(btn.textContent === 'Darken'){
        btn.textContent = 'Light';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }else{
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.0)';
    }
}

