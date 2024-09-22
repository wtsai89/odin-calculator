let displayValue = null;
const display = document.querySelector("#display");

function updateDisplay() {
    if (displayValue === null)
        display.textContent = "0";
    else
        display.textContent = displayValue;
}

updateDisplay();

let num1 = null;
let num2 = null;
let op = null;

function toNum(value) {
    if (value.includes("."))
        return parseFloat(value);
    return parseInt(value);
}

function pushNum(num) {
    if (displayValue === null)
        displayValue = num.toString();
    else if(displayValue.length < 9)
        displayValue = displayValue + num;

    updateDisplay();
}

function pushDecimal() {
    if (displayValue === null)
        displayValue = "0.";
    else if (!displayValue.includes(".") && displayValue.length < 9)
        displayValue = displayValue + ".";

    updateDisplay();
}

function pushDelete() {
    if (displayValue != null)
        displayValue = displayValue.slice(0,displayValue.length-1);
    if (displayValue === "")
        displayValue = null;

    updateDisplay();
}

const zero = document.querySelector("#zero");
zero.addEventListener("click", () => pushNum(0));
const one = document.querySelector("#one");
one.addEventListener("click", () => pushNum(1));
const two = document.querySelector("#two");
two.addEventListener("click", () => pushNum(2));
const three = document.querySelector("#three");
three.addEventListener("click", () => pushNum(3));
const four = document.querySelector("#four");
four.addEventListener("click", () => pushNum(4));
const five = document.querySelector("#five");
five.addEventListener("click", () => pushNum(5));
const six = document.querySelector("#six");
six.addEventListener("click", () => pushNum(6));
const seven = document.querySelector("#seven");
seven.addEventListener("click", () => pushNum(7));
const eight = document.querySelector("#eight");
eight.addEventListener("click", () => pushNum(8));
const nine = document.querySelector("#nine");
nine.addEventListener("click", () => pushNum(9));
const dot = document.querySelector("#dot");
dot.addEventListener("click", pushDecimal);
const del = document.querySelector("#delete");
del.addEventListener("click", pushDelete);

function operate() {
    switch (op) {
        case "add":
            num1 = num1 + num2;
            break;
        case "subtract":
            num1 = num1 - num2;
            break;
        case "multiply":
            num1 = num1 * num2;
            break;
        case "divide":
            if (num2 === 0) {
                displayValue = "FAIL";
                updateDisplay();
                num1 = 0;
                num2 = null;
                op = null;
                displayValue = null;
                unHighlight();
                return;
            }
            num1 = num1 / num2;
            break;
    }
    displayValue = num1.toString();
    displayValue = resize(displayValue)
    if (isNaN(displayValue))
    {
        num1 = null;
        op = null;
    }
    num2 = null;
    updateDisplay();
    displayValue = null;
}

function resize(value) {
    if ((!value.includes(".") && value.length > 9) || value.indexOf(".") > 9) {
        return "OVERFLOW";
    }
    value = value.slice(0,9);
    return value;
}

function unHighlight() {
    add.setAttribute("style", "filter: brightness(1);");
    subtract.setAttribute("style", "filter: brightness(1);");
    multiply.setAttribute("style", "filter: brightness(1);");
    divide.setAttribute("style", "filter: brightness(1);");
}

function pushOp(newOp) {
    if (num1 === null || (op === null && displayValue != null)) {
        num1 = (displayValue === null) ? 0 : toNum(displayValue);
        displayValue = null;
    }
    else if (num2 === null && displayValue != null) {
        num2 = toNum(displayValue);
        operate();
    }

    op = newOp;
    unHighlight();
    switch (op) {
        case "add":
            add.setAttribute("style", "filter: brightness(2);");
            break;
        case "subtract":
            subtract.setAttribute("style", "filter: brightness(2);");
            break;
        case "multiply":
            multiply.setAttribute("style", "filter: brightness(2);");
            break;
        case "divide":
            divide.setAttribute("style", "filter: brightness(2);");
            break;
    }
}

function pushEquals() {
    if (num1 != null && displayValue != null) {
        num2 = toNum(displayValue);
        operate();
        op = null;
        unHighlight();
        //num1 = null;
    }
}

const add = document.querySelector("#add");
add.addEventListener("click", () => pushOp("add"));
const subtract = document.querySelector("#subtract");
subtract.addEventListener("click", () => pushOp("subtract"));
const multiply = document.querySelector("#multiply");
multiply.addEventListener("click", () => pushOp("multiply"));
const divide = document.querySelector("#divide");
divide.addEventListener("click", () => pushOp("divide"));
const equals = document.querySelector("#equals");
equals.addEventListener("click", pushEquals);
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    num1 = null;
    num2 = null;
    op = null;
    displayValue = null;
    unHighlight();
    updateDisplay();
})

const dict = {
    '+': "add",
    '-': "subtract",
    '*': "multiply",
    '/': "divide",
}
window.addEventListener("keydown", event => {
    if (['1','2','3','4','5','6','7','8','9','0'].includes(event.key))
        pushNum(parseInt(event.key));
    else if (['+','-','*','/'].includes(event.key))
        pushOp(dict[event.key]);
    else if (event.key === "=")
        pushEquals();
    else if (event.key === "Delete" || event.key === "Backspace")
        pushDelete();
    else if (event.key === ".")
        pushDecimal();
})

flashBtns = [zero, one, two, three, four, five, six, seven, eight, nine, clear, equals, dot, del];
for (const item of flashBtns) {
    item.addEventListener("mousedown", () => {
        item.setAttribute("style", "filter: brightness(2);");
        setTimeout(() => {
            item.setAttribute("style", "filter: brightness(1);");
        }, 500);
    })
}