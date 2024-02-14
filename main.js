/*Created by Chan Yat Chun, please give credits when using*/

let btnClickCount = 0;

$(document).ready(function () {
    //This implementation of "page switching" is NOT great for SEO, this is merely a proof of concept 
    //Ensure the value in local storage is valid
    const possibleLocalItems = ["summary", "skills", "programming_languages", "experiences", "other", "this", "contacts", "tools"];
    var storedItem = localStorage.getItem("loc");
    var isStoredItemExists = false;
    for (let comparedItem in possibleLocalItems) {
        if (storedItem === comparedItem) {
            contentTyper(currItem);
            isStoredItemExists = true;
            break;
        }
    }
    if (!storedItem) {
        contentTyper(storedItem);
    }
    //Assign functions to menu's btns
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
    let contentDisplay = $("#main-content");
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