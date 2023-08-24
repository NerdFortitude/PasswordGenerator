// fetching all the elements from the dom
const bodyElement = document.querySelector("body");
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
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const themeChanger = document.querySelector(".themeChanger");
const inputContainer = document.querySelector(".input-container");
// const themeChanger1 = document.querySelector("#themechanger1");
// const themeChanger2 = document.querySelector("#themechanger2");
const logo = document.querySelector(".logo");
const symbols = '~!@#$%^&*()-_+=[]|}{:;",.<>/?';

let password = "";
let passwordLength = 10;
let checkcount = 0;

themeChanger.addEventListener("click",()=>{
    bodyElement.classList.toggle("bg-body-dark");
    themeChanger.classList.toggle("bg-body-dark");
    logo.classList.toggle("bg-body-dark");
    generateBtn.classList.toggle("bg-body-dark");
    inputContainer.classList.toggle("shadow");
    // themeChanger1.classList.toggle("deactive-theme");
    // themeChanger2.classList.toggle("deactive-theme");



    // if(themeChanger.innerText === "🔆"){
    //     console.log("this is inside if");
    //     themeChanger.textContent = "🌙";
    // }
    // if(themeChanger.innerText === "🌙"){

    //     themeChanger.innerText = "🔆";
    // }

})
//set strength circle color to grey
handleSlider();
setIndicator("#ccc");


// sets password length
function handleSlider(){
        inputSlider.value = passwordLength;
        lengthDisplay.innerText = passwordLength;
        //or kuch bhi karna chahiye
         
        const min = inputSlider.min;
        const max = inputSlider.max;
        inputSlider.style.backgroundSize = (passwordLength-min)*100/(max-min)+"% 100%";

}

function setIndicator(color){
       indicator.style.backgroundColor = color;
       //shadow
       indicator.style.boxShadow = "0px 0px 12px 1px ${color}";

}



// generating random password

function getRandInterger(min,max){
    return Math.ceil(Math.random()*(max-min) + min);
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



async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = 'Copied';
    }
    catch(e){
        copyMsg.innerText = 'Failed';
    }
   
    //to make copy waala span invisible
    copyMsg.classList.add('active');
    setTimeout(()=>{
        copyMsg.classList.remove('active');
    },2000);
    
}


inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})



copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
       copyContent();
});


function handleCheckBoxChange(){
    checkcount = 0;
    
       for(let checkbox of allCheckBox){
       if(checkbox.checked){
        checkcount++;
       }
    }


    //special condition
     if(passwordLength<checkcount){
        passwordLength = checkcount;
        handleSlider();
     }

}

for(let checkbox of allCheckBox){
    checkbox.addEventListener('change',handleCheckBoxChange);
 }
// allCheckBox.forEach(checkbox => {
//     checkbox.addEventListener('change',handleCheckBoxChange);
// });


function shufflePassword(array){

    //Fisher Yates Method
    for(let i = array.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }
    let str = "";
    array.forEach((el)=>str+=el);
    return str;
}



generateBtn.addEventListener('click',()=>{

    if(checkcount <=0){
        return;
    }

    if(passwordLength<checkcount){
        passwordLength = checkcount;
        handleSlider();
    }

    //reset old passoword
    password = "";

    //this functionArr depends on the condition is the checkboxes are checked
    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateupperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generatelowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked){
        funcArr.push(generateSymbol);
    }

   
    //compulsory values
    for(let i = 0;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    // remaining values

    for(let i = 0;i<passwordLength-funcArr.length;i++){   
        let randIndex = Math.floor(Math.random()*(funcArr.length));
        password += funcArr[randIndex]();
    }

    
    //shuffle the password
 
     password = shufflePassword(Array.from(password));

    //adding password to the display
    passwordDisplay.value = password;


    calStrength();

});


function themeIconChanger(){
    

}





