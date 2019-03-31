// Sorting 2D array with the assistance of a Comparator function, usage: array.sort(Comparator)
function Comparator(a, b) {
    var index = 0;
    if (a[index] > b[index]) return -1;
    if (a[index] < b[index]) return 1;
    return 0; // in case of equals, which you can then move on to sorting by a second column
}

// Load up my arrays and sort them because I can't be bothered to do it manually
// Should become objects (tuple) in future
var arrayCSharp = [
    [3, "Primitive data types"],
    [3, "Windows Form controls"],
    [2, "Objects, classes, inheritance"],
    [2, "LINQ and SQL queries"],
    [2, "Regular expressions"],
    [1, "ASP.NET Razor"],
    [1, "Delegates"],
    [1, "Asychronous methods"],
    [1, "WPF XAML"],
    [1, "WPF data binding"],
    [0, "Exceptions"],
    [0, "Azure deployment"],
    [0, "Security"],
    [0, "Unsafe methods"],
    [3, "Recursive methods"]
];

var arrayFrontEnd = [
    [3, "Flex box"],
    [2, "Grids"],
    [2, "Chart.JS"],
    [3, "Responsive pages"],
    [0, "Multi-browser support"],
    [0, "One JS Framework"],
    [1, "Forms"],
    [3, "Event handlers"],
    [0, "Bootstrap"],
    [1, "Transforms"]
];

var arrayDataStructures = [
    [3, "Arrays"],
    [3, "Big O Complexity"],
    [2, "Stacks"],
    [2, "Queues"],
    [1, "Linked lists"],
    [1, "Binary trees"],
    [0, "Other trees"]
];

var arrayGeneral = [
    [3, "Windows environments"],
    [2, "Ubuntu Linux environment"],
    [2, "Git version control"],
    [1, "SLDC"],
    [0, "SOLID"],
    [1, "TDD"]
]

function getArrayColumn(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}


let currentChartIndex = 0;
chooseChart(0);

// Note to self: make objects
function chooseChart(choice) {
    switch (choice) {
        case 0:
            makeChart(arrayCSharp, "csharp-chart", "Programming Concepts (C#)");
            currentChartIndex = 0;
            break;
        case 1:
            makeChart(arrayFrontEnd, "frontend-chart", "Front End Knowledge");
            currentChartIndex = 1;
            break;
        case 2:
            makeChart(arrayDataStructures, "datastructures-chart", "Data Structures Knowledge");
            currentChartIndex = 2;
            break;
        case 3:
            makeChart(arrayGeneral, "general-chart", "General Software Development");
            currentChartIndex = 3;
            break;
    }

    var buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "darkgrey";
    }
    buttons[choice].style.backgroundColor = "blue";
}

function makeChart(dataMatrix2D, canvasID, chartTitle) {
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
                backgroundColor: 'rgb(0, 0, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: arrayAxisX
            }]
        },

        // Configuration options go here
        options: {
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
                        fontSize: 14
                    },
                    ticks: {
                        fontColor: "black",
                        fontSize: 10
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Competence level",
                        fontColor: "black",
                        fontSize: 14
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        fontColor: "black",
                        fontSize: 12,
                        stepSize: 1,

                        callback: function (value, index, values) {
                            //return '$' + value;
                            switch (true) {
                                case (value < 1):
                                    return "Uninitiated";
                                case (value < 2):
                                    return "Improving";
                                case (value < 3):
                                    return "Capable";
                                case (value < 4):
                                    return "Comfortable";
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