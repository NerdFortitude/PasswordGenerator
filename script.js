// fetching all the elements from the dom
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButtons");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '~!@#$%^&*()-_+=[]|}{:;",.<>/?';

let password = "";
let passwordLength = 10;
let checkcount = 1;
//set strength circle color to grey
handleSlider();


// sets password length
function handleSlider(){
        inputSlider.value = passwordLength;
        lengthDisplay.innerText = passwordLength;
        //or kuch bhi karna chahiye

}


function setIndicator(color){
       indicator.style.backgroundcolor = color;
}



// generating random password

function getRandInterger(min,max){
    return Math.ceil(Math.random()*min + (max-min));
}

function generateRandomNumber() {
   return getRandInterger(1,9);
}

function generatelowerCase(){
    return String.fromCharCode(getRandInterger(97,122));
}

function generateupperCase(){
    return String.fromCharCode(getRandInterger(65,90));
}


function generateSymbol(){
    const randNum = getRandInterger(0,symbols.length-1);
    return symbols.charAt(randNum); 
}

//password strength

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0F0");
    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }

}









