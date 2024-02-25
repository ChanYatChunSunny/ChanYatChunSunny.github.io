/*Created by Chan Yat Chun, please give credits when using*/


$(document).ready(function () {
    let pickerCanvas = $("#picker-canvas")[0];
    let isClickMode = false;
    $("#change-mode-btn").click(function () {
        isClickMode = !isClickMode;
        if (isClickMode) {
            $("#curr-mode").text("Current mode: Click mode");
        } else {
            $("#curr-mode").text("Current mode: Move mode");
        }
    });
    $("#img-sel-btn").on("change", function (e) {
        //Source: https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
        let img = new Image();
        img.onload = paint;
        img.onerror = loadFailed;
        img.src = URL.createObjectURL(this.files[0]);
    });
    function paint() {
        pickerCanvas.width = this.width;
        pickerCanvas.height = this.height;
        pickerCanvas.getContext("2d").drawImage(this, 0, 0);
    }
    function loadFailed() {
        $("#rgba-display").text("Unable to load the image in your device, try again.");
    }
    $(pickerCanvas).mousemove(function (e) {
        if (!isClickMode) {
            detectColor(e);
        }
    });
    $(pickerCanvas).mousedown(function (e) {
        if (isClickMode) {
            detectColor(e);
        }
    });

    function detectColor(e) {
        //Source: http://www.java2s.com/example/javascript/canvas/get-color-at-mouse-position-in-a-canvas.html
        let x = e.clientX - $(pickerCanvas).offset().left;
        let y = e.clientY - $(pickerCanvas).offset().top;
        let outputData = pickerCanvas.getContext("2d").getImageData(x, y, 1, 1).data;
        $("#rgba-display").html("Red: " + outputData[0] + ", green: " + outputData[1] + ", blue: " + outputData[2] + ", alpha: " + outputData[3] +
            "<br/>RGB: #" + byteToHex(outputData[0]) + byteToHex(outputData[1]) + byteToHex(outputData[2]) +
            "<br/>RGBA: #" + byteToHex(outputData[0]) + byteToHex(outputData[1]) + byteToHex(outputData[2]) + byteToHex(outputData[3])
        );

    }
    function byteToHex(byteInt) {
        if (!typeof (byteInt) === "number") { throw "Not a number"; }
        return byteInt.toString(16).padStart(2, '0');
    }
});