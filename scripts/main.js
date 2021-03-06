let myHeading = document.querySelector('h1');
let myButton = document.querySelector('button');
/*
document.querySelector('html').onclick = function() {
    alert('别戳我，我怕疼。');
}
*/



if(!localStorage.getItem("name")){
    setUserName();
    let storedName = localStorage.getItem("name");
    myHeading.textContent = '你也来看肥鸡吗？'+storedName+'!';    
}else {
    let storedName = localStorage.getItem("name");
    myHeading.textContent = '你也来看肥鸡吗？'+storedName+'!';
}

function setUserName(){
    let myName = prompt("请输入你的昵称");
    localStorage.setItem('name',myName);
    myHeading.textContent = '你也来看肥鸡吗？'+myName+'!';
}

myButton.onclick = function(){
    setUserName();
}

let changePhoto = document.querySelector('img');

changePhoto.onclick = function(){
    let mySrc = changePhoto.getAttribute('src');
    if(mySrc === "image/chicken.png"){
        changePhoto.setAttribute('src',"image/test2.png");
    }else{
        changePhoto.setAttribute('src',"image/chicken.png");
    }
}