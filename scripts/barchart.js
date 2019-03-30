// Sorting 2D array with the assistance of a Comparator function, usage: array.sort(Comparator)
function Comparator(a, b) {
    var index = 0;
    if (a[index] > b[index]) return -1;
    if (a[index] < b[index]) return 1;
    return 0; // in case of equals, which you can then move on to sorting by a second column
}

// Load up my arrays and sort them because I can't be bothered to do it manually
var arrayCSharp = [
    [3, "Primitive types"],
    [3, "Windows Form controls"],
    [2, "Objects, classes, inheritance"],
    [2, "LINQ and SQL queries"],
    [2, "Regular expressions"],
    [1, "ASP.NET Razor"],
    [1, "Delegates"],
    [1, "Asychronous methods"],
    [1, "WPF XAML"],
    [1, "WPF data binding"],
    [0, "Events and exceptions"],
    [0, "Azure deployment"],
    [0, "Security"],
    [0, "Unsafe methods"]
];

var arrayFrontEnd = [
    [3, "Flex box"],
    [2, "Grids"],
    [2, "Chart.JS"],
    [3, "Responsive pages"],
    [0, "Multi-browser support"],
    [0, "One JS Framework"],
    [1, "Forms"],
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
    [2, "Git"],
    [1, "SLDC"],
    [0, "SOLID"],
    [3, "Recursion"],
]

function getArrayColumn(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

chooseChart(0);

function chooseChart(choice) {
    switch (choice) {
        case 0:
            makeChart(arrayCSharp, "csharp-chart");
            break;
        case 1:
            makeChart(arrayFrontEnd, "frontend-chart");
            break;
        case 2:
            makeChart(arrayDataStructures, "datastructures-chart");
            break;
        case 3:
            makeChart(arrayGeneral, "general-chart");
            break;
    }
}

function makeChart(my2DArray, chartID) {
    my2DArray.sort(Comparator);
    var arrayAxisX = getArrayColumn(my2DArray, 0);
    var arrayAxisY = getArrayColumn(my2DArray, 1);

    var charts = document.getElementsByTagName("canvas");

    for (var i = 0; i < charts.length; i++) {
        charts[i].style.display = "none";
    }

    var activeChart = document.getElementById(chartID);
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
                text: "Test",
                fontSize: 20,
                fontColor: "black"
            },
            tooltips: {
                enabled: false,

            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 10
                    }
                }],
                xAxes: [{
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

