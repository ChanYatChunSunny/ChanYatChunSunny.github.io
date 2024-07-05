$(document).ready(function () {
    let magicCircleCanvas = $("#magic-circle-canvas")[0];
    let canvasContext = magicCircleCanvas.getContext("2d");
    let radiusSlider = $("#radius-slider");
    let distanceSlider = $("#inner-outer-distance-slider");
    let complexitySlider = $("#complexity-slider");

    let radius = 192;
    let distance = 32;
    let complexity = 32;

    radiusSlider.val(radius);
    distanceSlider.val(distance);
    complexitySlider.val(complexity);

    radiusSlider.on("input", function () {
        radius = $(this).val();
    });
    distanceSlider.on("input", function () {
        distance = $(this).val();
    });
    complexitySlider.on("input", function () {
        complexity = $(this).val();
    });

    $("#generate-btn").click(function () {
        draw();
    });

    $("#download-btn").click(function () {
        let temp = document.createElement("a");
        temp.href = magicCircleCanvas.toDataURL("image/png");
        temp.download = "magic_circle.png";
        temp.click();
    });

    draw();

    function draw() {
        console.log(radius);
        console.log(distance);
        console.log(complexity);
        let points = makeEdge();
        let isBlobeds = makeBlobs(points);
        connectPointsOnEdge(points, isBlobeds);
    }

    function makeEdge() {
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, magicCircleCanvas.width, magicCircleCanvas.height);
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = "purple";
        let originX = magicCircleCanvas.width / 2;
        let originY = magicCircleCanvas.height / 2;
        //Outer circle
        canvasContext.beginPath();
        canvasContext.arc(originX, originY, radius, 0, 2 * Math.PI);
        canvasContext.stroke();
        //Inner circle
        let innerRadius = radius - distance;
        canvasContext.beginPath();
        canvasContext.arc(originX, originY, innerRadius, 0, 2 * Math.PI);
        canvasContext.stroke();

        let points = [];

        for (let i = 0; i < complexity; i++) {

            let x = originX;
            let y = originY;
            let angle = (Math.floor(Math.random() * 36) * 10) / 360 * 2 * Math.PI;
            if (Math.random() < 0.38) {
                x += radius * Math.cos(angle);
                y += radius * Math.sin(angle);
            } else if (Math.random() < 0.96) {
                x += innerRadius * Math.cos(angle);
                y += innerRadius * Math.sin(angle);
            }
            points.push({ x: x, y: y });
        }
        return points
    }

    function makeBlobs(points) {
        let isBlobeds = Array(complexity).fill(false);
        canvasContext.lineWidth = 3;
        canvasContext.strokeStyle = "purple";
        for (let i = 0; i < complexity; i++) {
            if (Math.random() < 0.48) {
                canvasContext.beginPath();
                canvasContext.arc(points[i].x, points[i].y, 8, 0, 2 * Math.PI);
                canvasContext.stroke();
                isBlobeds[i] = true;
            }
        }
        return isBlobeds;
    }

    function connectPointsOnEdge(points, isBlobeds) {

        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = "purple";

        //First stage connection
        for (let i = 1; i < complexity; i++) {
            if (isBlobeds[i] ? Math.random() < 0.8 : Math.random() < 0.6) {
                canvasContext.beginPath();
                canvasContext.moveTo(points[i - 1].x, points[i - 1].y);
                canvasContext.lineTo(points[i].x, points[i].y);
                canvasContext.stroke();
            }
        }

        //Second stage connection
        let halfComplexity = Math.floor(complexity / 2);
        let maxRandConnectCount = Math.floor((halfComplexity / 2) + Math.random() * halfComplexity);
        for (let i = 0; i < maxRandConnectCount; i++) {
            let a = Math.floor(Math.random() * complexity);
            let b = Math.floor(Math.random() * complexity);
            let aAcceptProb = isBlobeds[a] ? 0.8 : 0.4;
            let bAcceptProb = isBlobeds[b] ? 0.8 : 0.4;
            if (!(Math.random() < aAcceptProb * bAcceptProb)) { continue; }
            canvasContext.beginPath();
            canvasContext.moveTo(points[a].x, points[a].y);
            canvasContext.lineTo(points[b].x, points[b].y);
            canvasContext.stroke();
        }  
    }
 
});