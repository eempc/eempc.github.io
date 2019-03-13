const container = document.querySelector("#container");

function makeSquareGrid(x) {
    // Clear the current grid first
    deleteGrid();

    // Set up the grid-template via JS instead of the CSS, requires display: grid
    container.style.gridTemplateColumns = "repeat(" + x + ", 1fr)"; // e.g. repeat(8, 1fr)
    container.style.gridTemplateRows = "repeat(" + x + ", 1fr)";

    // Some nice gaps to separate the boxes (aesthetic, unnecessary)
    container.style.gridColumnGap = "0px";
    container.style.gridRowGap = "0px";

    // Retrieve the container width in pixels
     let containerWidth = container.offsetWidth;

    for (var i = 0; i < x*x; i++) {
        // Create cell
        var newDiv = document.createElement("div");
        newDiv.classList.add("grid-cell");
        //newDiv.appendChild(document.createTextNode(i));

        // Aesthetic style section, nothing important here
        newDiv.style.height = ((containerWidth / x) * 0.6) + "px"; // Make height % of the width
        newDiv.style.border = "1px dotted black";
        newDiv.style.textAlign = "center";
        newDiv.style.lineHeight = containerWidth / x + "px"; // Required for verticalAlign to work
        newDiv.style.verticalAlign = "middle";

        // Add to the container
        container.appendChild(newDiv);
    }
    addChangeColourEvent();
}

function addChangeColourEvent() {
    var cells = document.querySelectorAll(".grid-cell");
    cells.forEach((cell) => {
        cell.addEventListener('mouseover', function(e) {
            // Check which radio button is checked to determine which colour
            if (document.getElementById("random-radio").checked)
                e.target.style.backgroundColor = randomColour();
            else
                e.target.style.backgroundColor = "rgb(000%,000%,000%)";
        });

        cell.addEventListener('click', function(e) {
            let currentColour = e.target.style.backgroundColor;
            console.log(currentColour);
        });

        // cell.addEventListener('mouseout', function(e) {
        //     e.target.style.backgroundColor = "aqua";
        // });
    });
}

makeSquareGrid(64);

function deleteGrid() {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
}

function newGrid() {
    var size = prompt("Choose an integer from 1 to 64");
    if (Number.isInteger(parseInt(size)) && size > 0 && size <= 64) {
        makeSquareGrid(size);
    }
    else {
        alert("Please enter an integer between 1 and 64 inclusive");
    }
}

function resetColours() {
    var cells = document.querySelectorAll(".grid-cell");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "rgb(130,130,130)";
    });
}

function randomInt(lower, upper) {
    //Inclusive of lower and upper
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function randomColour() {
    return "rgb(" + randomInt(0,100) + "%," + randomInt(0,100) + "%," + randomInt(0,100) + "%)";
}

function regexExtraction(str, start, end) {

}

function testFunction() {
    var redButton = document.getElementById("red-radio").checked;
    var randomButton = document.getElementById("random-radio").checked;
    console.log(redButton + " " + randomButton);
}