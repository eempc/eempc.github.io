const buttons = document.querySelectorAll(".button");
const screen = document.getElementById("screen");
const buttonsNum = document.querySelectorAll(".num");
const buttonsOp = document.querySelectorAll(".op");

// Buttons setup here //

// All buttons get the press effect
buttons.forEach(button => {
    button.addEventListener("mouseup", function (e) {
        e.target.style.boxShadow = "2px 2px";
    });
    button.addEventListener("mousedown", function (e) {
        e.target.style.boxShadow = "-2px -2px";
    });
});

// Number buttons access this function
buttonsNum.forEach(button => {
    button.addEventListener("click", function (e) {
        screenAppendNumber(e.target.textContent);
    });
});

// Operator buttons access this function
buttonsOp.forEach(button => {
    button.addEventListener("click", function (e) {
        screenAppendOperator(e.target.textContent);
    });
});

// Functions //

function screenAppendNumber(x) {
    if (wasTheLastButtonPressedEquals) {
        clearScreen();
        wasTheLastButtonPressedEquals = false;
    }
    screen.textContent += x;
    wasTheLastButtonPressedEquals = false;
}

let currentOperator = "";

function screenAppendOperator(x) {
    wasTheLastButtonPressedEquals = false;
    if (screen.textContent === "." || screen.textContent === "") {

    }
    else if (!operatorPresent()) {
        screen.textContent += x;
        currentOperator = x;
    } else {
        screen.textContent = screen.textContent.replace(currentOperator, x);
        currentOperator = x;
    }
}

// Two methods of detecting decimals here
// First is to split string into array and count the array.length
// Second is to use .includes
function screenAppendDecimal() {
    if (wasTheLastButtonPressedEquals) {
        clearScreen();
        wasTheLastButtonPressedEquals = false;
    }
    var str = screen.textContent;
    if (!operatorPresent() && str.split(".").length-1 == 0) {
        screen.textContent += ".";
    } else if (operatorPresent()) {
        let opIndex = str.indexOf(currentOperator);
        var hasDecimal = str.includes(".", opIndex);
        if (!hasDecimal) screen.textContent += ".";        
    }
}

// Find operator from screen (alternatively could check the var = currentOperator)
function operatorPresent() {
    var str = screen.textContent;
    return (str.includes("*") || str.includes("/") || str.includes("+") || str.includes("-"));
}

function backspace() {
    if (wasTheLastButtonPressedEquals) {
        clearScreen();
        wasTheLastButtonPressedEquals = false;
    }
    if (screen.textContent)
        screen.textContent = screen.textContent.slice(0, -1);
}

function clearScreen() {
    screen.textContent = "";
    wasTheLastButtonPressedEquals = false;
}

var wasTheLastButtonPressedEquals = false;

function operate() {
    var str = screen.textContent;
    var lastChar = str.charAt(str.length-1);
    var num1 = parseFloat(str.substring(0,str.indexOf(currentOperator)));
    var num2 = parseFloat(str.substring(str.indexOf(currentOperator)+1));
    console.log(num1 + " " + num2);

    if (operatorPresent() && lastChar !== currentOperator) {        
        var result = basicMathsFunctions[currentOperator](num1, num2);
        screen.textContent = result;
        currentOperator = "";
        wasTheLastButtonPressedEquals = true;
    }
}

function makeNegative() {
    var str = screen.textContent;
    // Problem here minus is the same as negative :(
}

function random() {
    clearScreen();
    screen.textContent = Math.random().toFixed(2);
    wasTheLastButtonPressedEquals = false;
}

// Access these obj functions by e.g. basicMathsFunctions["+"](5,3) resulting in 8
var basicMathsFunctions = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '/': function (x, y) { return x / y },
    '*': function (x, y) { return x * y },
}
