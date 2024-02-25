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
    $("#magic-circle-generator-btn").click(function () {
        window.location.href = "/tools/magic_circle_generator.html";
    });
});