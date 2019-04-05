

// Load up my arrays and sort them because I can't be bothered to do it manually
var arrayConcepts = [
    [3, "Primitive data types"],
    [2, "Objects, classes, inheritance"],
    [2, "Regular expressions"],
    [1, "Delegates"],
    [1, "Asychronous methods"],
    [0, "Exceptions"],
    [0, "Security"],
    [0, "Unsafe methods"],
    [2, "Recursive methods"],
    [1, "Debugging"],
];

var arrayLanguages = [
    [3, "C#"],
    [1, "Python"],
    [1, "Java"],
    [2, "JavaScript"],
    [1, "XAML"],
    [3, "HTML"],
    [2, "CSS"],
    [1, "Ruby"],
    [3, "MQL4"],
    [0, "Solidity"],
];

var arrayDotNet = [
  [3, "Windows Form controls"],
  [1, "Razor Pages"],
  [1, "LINQ and SQL queries"],
  [1, "WPF XAML"],
  [0, "Azure deployment"],
  [0, "Xamarin"],
];

var arrayFrontEnd = [
    [3, "Flex box"],
    [2, "Grids"],
    [2, "Chart.js"],
    [3, "Responsive pages"],
    [0, "Multi-browser support"],
    [0, "One JS Framework"],
    [1, "Forms"],
    [3, "Event handlers"],
    [0, "Bootstrap"],
    [1, "Transforms"],
];

var arrayDataStructures = [
    [3, "Arrays"],
    [3, "Lists"],
    [2, "Dictionaries/Hashes"],
    [2, "Big O Complexity"],
    [1, "Stacks"],
    [1, "Queues"],
    [1, "Linked lists"],
    [0, "Trees"],
    [0, "Graphs"]
];

var arrayGeneral = [
    [3, "Windows environments"],
    [2, "Ubuntu Linux environment"],
    [2, "Git version control"],
    [1, "SDLC"],
    [0, "SOLID"],
    [1, "TDD/BDD"],
    [1, "UI/UX"]
];

var arraySoftwarePackages = [
    [3, "Visual Studio"],
    [3, "Visual Studio Code"],
    [2, "Android Studio"],
    [2, "Blender"],
    [2, "Photoshop Elements"],
    [2, "Microsoft Office"],
    [0, ""],
];

let currentChartIndex = 0;
chooseChart(0);

// Note to self: make objects
function chooseChart(choice) {
    currentChartIndex = choice;
    switch (choice) {
        case 0:
            makeChart(arrayConcepts, "programming-chart", "Programming Concepts");
            break;
        case 2:
            makeChart(arrayFrontEnd, "frontend-chart", "Front End Knowledge");
            break;
        case 3:
            makeChart(arrayDataStructures, "datastructures-chart", "Data Structures Knowledge");
            break;
        case 4:
            makeChart(arrayGeneral, "software-chart", "General Software Development");
            break;
        case 1:
            makeChart(arrayDotNet, "dotnet-chart", ".NET Knowledge");
            break;
    }

    var buttons = document.getElementsByClassName("chart-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("quarternary-gradient");
    }
    buttons[choice].classList.add("quarternary-gradient");
}

function removeMonitors() {
    //Clean up the chart js monitor
    var monitors = document.getElementsByClassName("chartjs-size-monitor");
    while (monitors[monitors.length - 1]) {
        monitors[monitors.length - 1].remove();
    }
}

function makeChart(dataMatrix2D, canvasID, chartTitle) {
    removeMonitors();

    // Sort array
    dataMatrix2D.sort(Comparator);
    var arrayAxisX = getArrayColumn(dataMatrix2D, 0);
    var arrayAxisY = getArrayColumn(dataMatrix2D, 1);

    var canvases = document.getElementsByTagName("canvas");
    //Make all charts disappear (alternatively could use z-index)
    for (var i = 0; i < canvases.length; i++) {
        canvases[i].style.display = "none";
    }

    var activeChart = document.getElementById(canvasID);
    activeChart.style.display = "block";

    var ctx = activeChart.getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: arrayAxisY,
            datasets: [{
                label: 'Data',
                backgroundColor: 'rgb(0, 0, 182)',
                borderColor: 'rgb(255, 99, 132)',
                data: arrayAxisX
            }]
        },

        // Configuration options go here
        options: {
            layout: {
                padding: {
                    left: 5,
                    right: 25,
                    top: 5,
                    bottom: 5,
                }
            },
            title: {
                display: true,
                text: chartTitle,
                fontSize: 20,
                fontColor: "black",
                padding: 24
            },
            tooltips: {
                enabled: false,

            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: false,
                        labelString: "Concept",
                        fontColor: "black",

                    },

                    ticks: {
                        fontColor: "black",
                        fontSize: 10
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Proficiency level",
                        fontColor: "black",
                        fontSize: 16
                    },
                    ticks: {
                        autoSkip: false,
                        minRotation: 45,
                        maxRotation: 90,
                        fontColor: "black",
                        fontSize: 12,
                        stepSize: 1,

                        callback: function (value, index, values) {
                            //return '$' + value;
                            switch (true) {
                                case (value < 1):
                                    return "☆☆☆ Uninitiated";
                                case (value < 2):
                                    return "★☆☆ Improving";
                                case (value < 3):
                                    return "★★☆ Capable";
                                case (value < 4):
                                    return "★★★ Comfortable";
                                default:
                                    return "N/A";
                            }
                        }
                    }
                }]
            }
        }
    });
}

function getArrayColumn(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

// Sorting 2D array by sub-column with the assistance of a Comparator function, usage: array.sort(Comparator)
function Comparator(a, b) {
    var index = 0;
    if (a[index] > b[index]) return -1;
    if (a[index] < b[index]) return 1;
    return 0; // in case of equals, which you can then move on to sorting by a second column
}