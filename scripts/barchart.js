// Sorting 2D array with the assistance of a Comparator function, usage: array.sort(Comparator)
function Comparator(a, b) {
    var index = 0;
    if (a[index] > b[index]) return -1;
    if (a[index] < b[index]) return 1;
    return 0; // in case of equals, which you can then move on to sorting by a second column
}

var myArray1 = [
    [3, "Primitive types"],
    [3, "Windows Form controls"],
    [2, "Objects, classes, inheritance"],
    [2, "LINQ and SQL queries"],
    [2, "Regular expressions"],
    [1, "ASP.NET Razor"],
    [1, "Delegates"],
    [1, "Asychronous methods"],
    [1, "WPF XAML"],
    [0, "Events and exceptions"],
    [0, "Azure deployment"],
    [0, "Security"]
];

myArray1.sort(Comparator);

function getArrayColumn(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

var scoreArray = getArrayColumn(myArray1,0);
var labelArray = getArrayColumn(myArray1,1);


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        labels: labelArray,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(0, 0, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: scoreArray
        }]
    },

    // Configuration options go here
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes:[{
                ticks: {
                    stepSize: 1,
                    callback: function(value, index, values) {
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