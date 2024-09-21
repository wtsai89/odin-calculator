let displayValue = null;
const display = document.querySelector("#display");

function updateDisplay() {
    if (displayValue === null)
        display.textContent = 0;
    else
        display.textContent = displayValue;
}

updateDisplay();

let num1 = null;
let num2 = null;
let op = null;

function pushNum(num) {
    if (displayValue === null)
        displayValue = num;
    else if(displayValue >= -9999999 && displayValue <= 99999999)
        displayValue = displayValue * 10 + num;

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

function operate() {
    switch (op) {
        case "add":
            displayValue = num1 + num2;
            break;
        case "subtract":
            displayValue = num1 - num2;
            break;
        case "multiply":
            displayValue = num1 * num2;
            break;
        case "divide":
            displayValue = num1 / num2;
            break;
    }
    num1 = displayValue;
    num2 = null;
    updateDisplay();
    displayValue = null;
}

function unHighlight() {
    add.setAttribute("style", "filter: brightness(1);");
    subtract.setAttribute("style", "filter: brightness(1);");
    multiply.setAttribute("style", "filter: brightness(1);");
    divide.setAttribute("style", "filter: brightness(1);");
}

function pushOp(newOp) {
    if (num1 === null) {
        num1 = (displayValue === null) ? 0 : displayValue;
        displayValue = null;
    }
    else if (num2 === null && displayValue != null) {
        num2 = displayValue;
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

const add = document.querySelector("#add");
add.addEventListener("click", () => pushOp("add"));
const subtract = document.querySelector("#subtract");
subtract.addEventListener("click", () => pushOp("subtract"));
const multiply = document.querySelector("#multiply");
multiply.addEventListener("click", () => pushOp("multiply"));
const divide = document.querySelector("#divide");
divide.addEventListener("click", () => pushOp("divide"));
const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
    if (num1 != null && displayValue != null) {
        num2 = displayValue;
        operate();
        unHighlight();
        //num1 = null;
    }
});
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    num1 = null;
    num2 = null;
    op = null;
    displayValue = null;
    unHighlight();
    updateDisplay();
})

flashBtns = [zero, one, two, three, four, five, six, seven, eight, nine, clear, equals];
for (const item of flashBtns) {
    item.addEventListener("mousedown", () => {
        item.setAttribute("style", "filter: brightness(2);");
        setTimeout(() => {
            item.setAttribute("style", "filter: brightness(1);");
        }, 500);
    })
}