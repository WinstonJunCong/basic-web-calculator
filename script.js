// --- Operations ---

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "X": (a, b) => a * b,
    "/": (a, b) => a / b ? a / b : null,
};

function operate(operator, a, b) {
    return operations[operator] ? operations[operator](a, b) : a;
}

// --- State ---

const createArray = () => [];
const resetPercentageState = () => ({ firstValue: false, secondValue: false });

let firstValue = createArray();
let secondValue = createArray();
let percentageState = resetPercentageState();
let operator;
let result;

// --- Helpers ---

const hasDigit = (arr) => arr.some(el => /\d/.test(el));
const convertToNumber = (arr) => Number(arr.join(""));
const convertToArray = (num) => String(num).split("");
const convertToPercentage = (arr) => convertToArray(convertToNumber(arr) / 100);

function assignOperator(valueStr) {
    operator = valueStr;
    for (const [key, btn] of Object.entries(operatorButtons)) {
        btn.style.backgroundColor = operator === key ? "orange" : "";
    }
}

// --- Button handlers ---

function handleDigit(buttonText) {
    if (operator) {
        const isLeadingZero = buttonText === "0" && secondValue.length === 0;
        if (!isLeadingZero) secondValue.push(buttonText);
    } else {
        const isLeadingZero = buttonText === "0" && firstValue.length === 0;
        if (!isLeadingZero) firstValue.push(buttonText);
    }
}

function handleDecimal(buttonText) {
    if (operator && !secondValue.includes(".")) {
        if (secondValue.length === 0) secondValue.push("0");
        secondValue.push(buttonText);
    } else if (!operator && !firstValue.includes(".")) {
        if (firstValue.length === 0) firstValue.push("0");
        firstValue.push(buttonText);
    }
}

function handlePolarity() {
    if (!operator || result !== undefined) {
        if (firstValue.includes("-")) firstValue.shift();
        else firstValue.unshift("-");
    } else {
        if (secondValue.includes("-")) secondValue.shift();
        else secondValue.unshift("-");
    }
}

function handleEquals() {
    let a = convertToNumber(firstValue);
    let b = convertToNumber(secondValue);

    if (Boolean(percentageState.firstValue) !== Boolean(percentageState.secondValue)
        && (operator === "-" || operator === "+")) {
        if (percentageState.firstValue) a = a * b;
        else b = a * b;
    }

    result = operate(operator, a, b);
    firstValue = convertToArray(result);
    percentageState.firstValue = false;
}

function handleOperator(buttonText) {
    if (result !== undefined) {
        percentageState = resetPercentageState();
        secondValue = createArray();
        result = undefined;
    }
    assignOperator(buttonText);
}

function handleBackspace() {
    if (result !== undefined) {
        firstValue.pop();
        result = undefined;
        assignOperator(undefined);
        secondValue = createArray();
    } else if (operator) {
        secondValue.pop();
    } else {
        firstValue.pop();
    }
}

function handleClear() {
    firstValue = createArray();
    secondValue = createArray();
    assignOperator(undefined);
    percentageState = resetPercentageState();
    result = undefined;
}

function handlePercent() {
    if (result !== undefined) {
        result = undefined;
        percentageState = resetPercentageState();
        assignOperator(undefined);
        secondValue = createArray();
        firstValue = convertToPercentage(firstValue);
        percentageState.firstValue = true;
    } else if (operator && !percentageState.secondValue && hasDigit(secondValue)) {
        secondValue = convertToPercentage(secondValue);
        percentageState.secondValue = true;
    } else if (!operator && !percentageState.firstValue && hasDigit(firstValue)) {
        firstValue = convertToPercentage(firstValue);
        percentageState.firstValue = true;
    }
}

// --- Display ---

function updateDisplay() {
    if (!operator || result !== undefined) {
        if (percentageState.firstValue) {
            output.innerText = String(convertToNumber(firstValue) * 100) + "%";
        } else {
            output.innerText = firstValue.join("") || 0;
        }
    } else {
        if (hasDigit(secondValue)) {
            if (percentageState.secondValue) {
                output.innerText = String(convertToNumber(secondValue) * 100) + "%";
            } else {
                output.innerText = secondValue.join("");
            }
        }
    }
}

// --- Main click handler ---

function onClick() {
    const buttonClass = this.className;
    const buttonText = this.innerText;

    if (buttonClass === "digit")          handleDigit(buttonText);
    else if (buttonClass === "decimal")   handleDecimal(buttonText);
    else if (buttonClass === "polarity")  handlePolarity();
    else if (buttonText === "=")          handleEquals();
    else if (buttonClass === "operators") handleOperator(buttonText);
    else if (buttonText === "&")          handleBackspace();
    else if (buttonText === "AC")         handleClear();
    else if (buttonText === "%")          handlePercent();

    updateDisplay();
}

// --- Init ---

const buttons = document.querySelectorAll("button");
const operatorButtons = {};
const output = document.getElementById("output");

for (const button of buttons) {
    button.addEventListener("click", onClick);
    if (button.className === "operators") {
        operatorButtons[button.innerText] = button;
    }
}