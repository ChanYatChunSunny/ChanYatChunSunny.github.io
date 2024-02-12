/*Created by Chan Yat Chun, please give credits when using*/

var btnClickCount = 0;

$(document).ready(function () {
    switch (localStorage.getItem("loc")) {
        case "summary":
        case "skills":
        case "programming_languages":
        case "experiences":
        case "other":
        case "this":
        case "contacts":
        case "tools":
            contentTyper(localStorage.getItem("loc"));
            break;
        default:
            localStorage.setItem("loc", "summary");
            contentTyper(localStorage.getItem("loc"));
            break;
    }
    $('#summary-btn').click(function () {
        $(document).prop("title", "Sunny's summary");
        localStorage.setItem("loc", "summary");
        contentTyper("summary");
    });
    $('#skills-btn').click(function () {
        $(document).prop("title", "Sunny's skills");
        localStorage.setItem("loc", "skills");
        contentTyper("skills");
    });
    $('#languages-btn').click(function () {
        $(document).prop("title", "Sunny's programming languages");
        localStorage.setItem("loc", "programming_languages");
        contentTyper("programming_languages");
    });
    $('#experiences-btn').click(function () {
        $(document).prop("title", "Sunny's experiences");
        localStorage.setItem("loc", "experiences");
        contentTyper("experiences");
    });
    $('#other-btn').click(function () {
        $(document).prop("title", "Sunny's other trivials");
        localStorage.setItem("loc", "other");
        contentTyper("other");
    });
    $('#this-btn').click(function () {
        $(document).prop("title", "Sunny's website");
        localStorage.setItem("loc", "this");
        contentTyper("this");
    });
    $('#contacts-btn').click(function () {
        $(document).prop("title", "Sunny's contacts");
        localStorage.setItem("loc", "contacts");
        contentTyper("contacts");
    });
    $('#tools-btn').click(function () {
        $(document).prop("title", "Sunny's tools");
        localStorage.setItem("loc", "tools");
        contentTyper("tools");
    });
});

function contentTyper(contentName) {
    btnClickCount += 1;
    var contentDisplay = $("#main-content");
    contentDisplay.html('');
    if (btnClickCount <= 1) {
        contentDisplay.fadeTo(0, 0);
    }
    $.ajax({
        url: "content/"+contentName+".html",
        success: function (content) {
            contentDisplay.html(content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            contentDisplay.html("Error: "+errorThrown);
        }
    });
    contentDisplay.fadeTo(1000, 1);
    setTimeout(function () {
        btnClickCount -= 1;
    }, 1000);
}