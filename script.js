const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "X": (a, b) => a * b,
    "/": (a, b) => a / b,
};

function operate(operator, a, b) {
    return operations[operator] ? operations[operator](a, b) : a;
}
const hasDigit = (arr) => arr.some(el => !isNaN(Number(el)) && el !== " ")
const createArray = () => []
const resetPercentageState = () => {
    return {
        'firstValue': false, 
        'secondValue': false}
    }
let firstValue = createArray();
let secondValue = createArray();
let percentageState = resetPercentageState()
let operator;
let result;

function convertToNumber(inputArray){
    return Number(inputArray.join(''))
}
function convertToArray(inputNumber){
    return String(inputNumber).split("")
}

function convertToPercentage(inputArray){
    return convertToArray(Number(inputArray.join(""))/100)
}

function onClick(e){
    const buttonClass = this.className
    const buttonText = this.innerText

    if (buttonClass == "digit"){
        if (operator){
            secondValue.push(buttonText)
        }
        else{
            firstValue.push(buttonText)
        }
    }
    else if (buttonClass == "decimal"){
        if (operator && !secondValue.includes(".")){
            secondValue.push(buttonText)
        }
        else if (!operator && !firstValue.includes(".")){
            firstValue.push(buttonText)
        }
    }
    else if (buttonClass == "polarity"){
        if (!operator || result!==undefined){
            if (firstValue.includes("-")){
                firstValue.shift()
            }
            else{
                firstValue.unshift("-")
            }
        }
        else{
            if (secondValue.includes("-")){
                secondValue.shift()
            }
            else{
                secondValue.unshift("-")
            }
        }
    }
    else if (buttonClass =="operators"){
        if (buttonText == "="){
                let a= convertToNumber(firstValue);
                let b= convertToNumber(secondValue);

            if ((Boolean(percentageState.firstValue) !== Boolean(percentageState.secondValue)&& (operator=="-" || operator=="+"))) {
                if (percentageState.firstValue){
                a = a*b
            }
                else{
                b = a*b
            }
            }
            result = operate(operator,a,b)
            firstValue = convertToArray(result);
            percentageState.firstValue = false
            if (result !== undefined) {
                console.log(result)
            } 
        } 
        else{
            if (result !== undefined){
                percentageState = resetPercentageState()
                secondValue = createArray()
                result =undefined
            }
            operator =buttonText
        }
    }
    else if (buttonText == "&"){
        if (result !== undefined) {
            firstValue.pop()
            result = undefined
            operator = undefined
            secondValue = createArray()
        }
        else if (operator){
            secondValue.pop()
        }
        else{
            firstValue.pop()
        }
    }
    else if (buttonText =="AC"){
        firstValue = createArray();
        secondValue = createArray();
        operator = undefined;
        percentageState = resetPercentageState()
        result = undefined
    }
    else if (buttonText == "%"){
        if (result!==undefined) {
            result = undefined
            percentageState = resetPercentageState()
            operator = undefined
            secondValue = createArray()
            firstValue = convertToPercentage(firstValue)
            percentageState.firstValue = true
        }
        else if (operator && !percentageState.secondValue && hasDigit(secondValue)){
                secondValue = convertToPercentage(secondValue)
                percentageState.secondValue = true
        }
        else if (!operator && !percentageState.firstValue && hasDigit(firstValue)){
            firstValue = convertToPercentage(firstValue)
            percentageState.firstValue = true
        }
    }


    if (!operator || result!==undefined) {
        if (percentageState.firstValue){
            console.log("here")
            output.innerText = String(convertToNumber(firstValue)*100)+"%"
        }
        else{
            output.innerText = String(convertToNumber(firstValue))
        }
    }

    else {
        if (hasDigit(secondValue)){
            if (percentageState.secondValue){
            output.innerText = String(convertToNumber(secondValue)*100)+"%"
            }
            else{
            output.innerText = String(convertToNumber(secondValue))
            }
        }
    }
    console.log(firstValue, secondValue, percentageState, result)
}
const buttons = document.querySelectorAll("button")
for (let i = 0; i<buttons.length; i++){
    // console.log(buttons[i].innerHTML)
    buttons[i].addEventListener('click', onClick)
}

const output = document.getElementById("output")
