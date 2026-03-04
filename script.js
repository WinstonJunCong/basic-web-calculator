function add(a,b){return a+b};
function subtract(a,b){return a-b};
function multiple(a,b) {return a*b};
function divide(a,b) {return a/b};

let firstValue;
let secondValue;
let operator;
function operate(operator, firstValue, secondValue) {
    operator(firstValue, secondValue) 
}

const buttons = document.querySelectorAll("button")
for (let i = 0; i<buttons.length; i++){
    console.log(buttons[i])
    if (Number.isFinite(+(buttons[i].innerText))){
        console.log(buttons[i].innerHTML)
    }
}
