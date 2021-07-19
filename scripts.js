let nums = document.querySelectorAll('.num');
let display = document.querySelector('.display');
let operators = document.querySelectorAll('.operator');
let others = document.querySelectorAll('.other');
let clearButton = document.querySelector('#C');
let equalButton = document.querySelector('.equal');
let percentButton = document.querySelector('#percent');
let minusButton = document.querySelector('#minusplus');
let firstNum = 0, secondNum = 0;
let operatorClicked = 0;
let numsClicked = 0;
let operatorMemory = 0;
let equalClicked = 0;
function sum(a, b){
    display.textContent = a + b;
    return a + b;
}
function substract(a, b){
    display.textContent = a-b;
    return a - b;
}
function divide(a, b){
    if(b == 0) display.textContent = 'BRUH';
    else {
        display.textContent = a / b;
        return a / b;
    }
}
function multiply(a, b){
    display.textContent = a * b;
    return a * b;
}


percentButton.addEventListener('click', ()=>{
    display.textContent = +display.textContent / 100;
})

minusButton.addEventListener('click', ()=>{
    display.textContent = -(+display.textContent);
})

nums.forEach(num => num.addEventListener('click', clicknum));
function clicknum(){
    operators.forEach(o => o.classList.remove("operatorClicked"));
    numsClicked = 1;
    if(display.textContent == '0') if(this.textContent == ".") display.textContent += "."; else {display.textContent = this.textContent;}
    else if(operatorClicked != 0 || equalClicked == 1) {
        display.textContent = this.textContent; 
        operatorClicked = 0;
        if(equalClicked){
            firstNum = 0;
            secondNum = 0;
            operatorMemory = 0;
            equalClicked = 0;
        }
    }
    else{   
        if(this.textContent == "." && display.textContent.includes(".")) return;
        display.textContent += this.textContent;
    }
}

clearButton.addEventListener('click', ()=>{
    operators.forEach(o => o.classList.remove("operatorClicked"));
    display.textContent='0'; 
    operatorClicked = 0;
    firstNum = 0;
    secondNum = 0;
    operatorMemory = 0;
    numsClicked = 0;
    equalClicked = 0;
});

operators.forEach(operator => operator.addEventListener('click', operatorClick));
function operatorClick(event){
    operators.forEach(o => o.classList.remove("operatorClicked"));
    this.classList.add("operatorClicked");
    operatorClicked = 1;
    equalClicked = 0;
    if(operatorMemory == 0){
        firstNum = +display.textContent;
        operatorMemory = this.textContent;
        console.log(operatorMemory);
        console.log(`firstNum = ${firstNum}`);
        numsClicked  = 0;
    }
    if(operatorMemory != 0 && numsClicked == 1){
        numsClicked = 0;
        secondNum = +display.textContent;
        console.log(`secondNum = ${secondNum}`);
        console.log(operatorMemory);
        switch(operatorMemory){
            case "+":{
                firstNum = sum(firstNum, secondNum);
                break;
            }
            case '-':{
                firstNum = substract(firstNum, secondNum);
                break;
            }
            case '×':{
                firstNum = multiply(firstNum, secondNum);
                break;
            }
            case '÷':{
                firstNum = divide(firstNum, secondNum);
                break;
            }
        }
        operatorMemory = this.textContent;
    }
    if(operatorMemory != 0 && numsClicked == 0){
        operatorMemory = this.textContent;
        numsClicked = 0;
    }
}

equalButton.addEventListener('click', ()=>{
    operators.forEach(o => o.classList.remove("operatorClicked"));
    numsClicked = 0;
    equalClicked = 1;
    
    secondNum = +display.textContent;
    switch(operatorMemory){
        case "+":{
            firstNum = sum(firstNum, secondNum);
            break;
        }
        case '-':{
            firstNum = substract(firstNum, secondNum);
            break;
        }
        case '×':{
            firstNum = multiply(firstNum, secondNum);
            break;
        }
        case '÷':{
            firstNum = divide(firstNum, secondNum);
            break;
        }
    }

})
//#3B3C4B nums click
let xposition = 0;
display.addEventListener('mousedown', e =>{
    console.log(e.offsetX);
    xposition = e.offsetX;
})
display.addEventListener('mouseup', e =>{
    console.log(e.offsetX);
    if((e.offsetX - xposition > 35 || e.offsetX - xposition < 35) && display.textContent != '0' ){
        display.textContent = display.textContent.toString().slice(0, -1);
    }
})