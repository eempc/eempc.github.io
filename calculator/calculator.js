const buttons = document.querySelectorAll(".button");
const screen = document.getElementById("screen");
const buttonsNum = document.querySelectorAll(".num");
const buttonsOp = document.querySelectorAll(".op");

// Add press effect for all buttons
buttons.forEach(button => {
    button.addEventListener("mouseup", function (e) {
        e.target.style.boxShadow = "2px 2px";
    });
    button.addEventListener("mousedown", function (e) {
        e.target.style.boxShadow = "-2px -2px";     
    });
});

buttonsNum.forEach(button => {
    button.addEventListener("click", function (e) {
        screenAppendNumber(e.target.textContent);
    }); 
});

buttonsOp.forEach(button => {
    button.addEventListener("click", function (e) {
        screenAppendOperator(e.target.textContent);
    });
});

function screenAppendNumber(x) {
    screen.textContent += x;
}

let currentOperator = "";

function screenAppendOperator(x) {    
    if (!operatorPresent()) {
        screen.textContent += x;
        currentOperator = x;
    } else {
        screen.textContent = screen.textContent.replace(currentOperator, x);
        currentOperator = x;
    }
}

function screenAppendDecimal() {
    var str = screen.textContent;

    // Two methods of detecting decimals here
    // First is to split string into array and count the array.length
    // Second is to use .includes
    if (!operatorPresent() && str.split(".").length-1 == 0) {
        screen.textContent += ".";
    }

    else if (operatorPresent()) {
        let opIndex = str.indexOf(currentOperator);
        var hasDecimal = str.includes(".", opIndex);
        
        if (!hasDecimal) {
            screen.textContent += ".";
        }
    }
}

function operatorPresent() {
    var str = screen.textContent;
    return (str.includes("*") || str.includes("/") || str.includes("+") || str.includes("-"));
}

function backspace() {
    if (screen.textContent)
        screen.textContent = screen.textContent.slice(0, -1);
}

function clearScreen() {
    screen.textContent = "";
}

function operate() {

}

