$(document).ready(function () {
    //Assign functions to btns
    $("#home-btn").click(function () {
        window.location.href = "/";
    });
    $("#more-tools-btn").click(function () {
        window.location.href = "/tools";
    });
    $("#color-picker-btn").click(function () {
        window.location.href = "/tools/color_picker.html";
    });
});