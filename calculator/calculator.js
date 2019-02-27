const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
    button.addEventListener("mouseup", function (e) {
        console.log(e);
        e.target.style.boxShadow = "2px 2px";
    });
    button.addEventListener("mousedown", function (e) {
        console.log(e);
        e.target.style.boxShadow = "-2px -2px";
    });
});