const buttons = document.querySelectorAll(".button");
const screen0 = document.getElementById("screen0");
const screen1 = document.getElementById("screen1");
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

// Empty array will have numbers and operators pushed to it
var myArray = [];

var operatorsArray = ["+", "-", "/", "*"]; // Just to be able to access these with a foreach or includes
var wasTheLastButtonPressedEquals = false; // Detect if the calculator just calculated something or not

// Function for numbers buttons
function screenAppendNumber(x) {
    if (wasTheLastButtonPressedEquals) {
        clearAll();
        wasTheLastButtonPressedEquals = false;
        
    }
    screen1.textContent += x;
}

// Function for the operator buttons (is more complicated when trying to mimic an old school calculator)
function screenAppendOperator(op) {
    var str = screen1.textContent;

    if (wasTheLastButtonPressedEquals) {
        wasTheLastButtonPressedEquals = false
        myArray = [];
        myArray.push(str);
        myArray.push(op);
        updateScreen0();
        clearScreen1();
    } else {
        if (!(str === "" || str === ".")) {
            myArray.push(str);
            myArray.push(op);
            updateScreen0();
            clearScreen1();
        } else if (str === "" && screen0.textContent != "") {
            myArray.pop();
            myArray.push(op);
            updateScreen0();
        }
    }
}

function updateScreen0() {
    var fullEquation = "";
    for (var i = 0; i < myArray.length; i++) {
        //Detect the negative number and surround with brackets
        if (myArray[i].charAt(0) === "-" && myArray[i].length > 1)
            fullEquation += myArray[i];
        else 
            fullEquation += myArray[i];
    }   
    screen0.textContent = fullEquation;
}

function clearScreen0() {
    screen0.textContent = "";
}

function clearScreen1() {
    screen1.textContent = "";
}

function screenAppendDecimal() {
    if (wasTheLastButtonPressedEquals) {
        clearAll();
        wasTheLastButtonPressedEquals = false;
    }
    var str = screen1.textContent;
    if (!str.includes(".")) screen1.textContent += ".";
}

function makeNegative() {
    var str = screen1.textContent;
    wasTheLastButtonPressedEquals = false
    if (!str.includes("-"))
        screen1.textContent = "-" + str;
}

function backspace(){
    if (wasTheLastButtonPressedEquals) {
        clearAll();
        wasTheLastButtonPressedEquals = false;
    }
    if (screen1.textContent) {
        screen1.textContent = screen1.textContent.slice(0, -1);
    }
}

function clearAll() {
    clearScreen1();
    myArray = [];
    clearScreen0();
    wasTheLastButtonPressedEquals = false;
}

function operate() {
    if (wasTheLastButtonPressedEquals) {
        // Maybe one day I will do the continuous multiplier
        return;
    }
    wasTheLastButtonPressedEquals = true;
    var str = screen1.textContent;
    
    if (str === "." || str === "") {
        //If last element in the array is an operator
        if (operatorsArray.includes(myArray[myArray.length-1])) {
            myArray.pop();            
            updateScreen0();
        }       
    } else {
        myArray.push(str);
        clearScreen1();
        updateScreen0();
    }
    
    // Modify the new array to do the multiplication and divisions first
    var newArray = myArray;

    for (var i = 0; i < newArray.length; i++) {
        if (newArray[i+1] === "*") {
            newArray.splice(i, 3, parseFloat(newArray[i]) * parseFloat(newArray[i+2])); // Do the multiplication
            i--; // Go backwards 1 because the array was shortened
        } 
        if (newArray[i+1] === "/") {
            if (newArray[i+2] == 0) {
                alert("Divide by 0. Idiot.");
                clearAll();
                return;
            }
            newArray.splice(i, 3, parseFloat(newArray[i]) / parseFloat(newArray[i+2])); // Do the division
            i--;
        }
    }
    
    // The final leg, an array that is only add or subtract, should be easy right?
    for (var i = 0; i < newArray.length; i++) {
        if (newArray[i+1] === "+") {
            newArray.splice(i, 3, parseFloat(newArray[i]) + parseFloat(newArray[i+2]));
            i--;
        } 
        if (newArray[i+1] === "-") {
            newArray.splice(i, 3, parseFloat(newArray[i]) - parseFloat(newArray[i+2]));
            i--; 
        }
    }
    
    screen1.textContent = (newArray[0] % 1 === 0) ? newArray[0] : newArray[0].toFixed(2);

    // for (var i = 0; i < myArray.length; i++) {
    //     if (myArray[i] === "*" || myArray[i] === "/") {
    //         var n = strMathsFunctions[myArray[i]](i-1,i+1);
    //         myArray.splice(i-1,3,n);
    //         i--;
    //     }
    // }
    // console.log(myArray);
};

var strMathsFunctions = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '/': function (x, y) { return x / y },
    '*': function (x, y) { return x * y },
};

/* // Functions //

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
 */