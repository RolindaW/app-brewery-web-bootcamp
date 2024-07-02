$("button").on("click", toggleTitleStyle);

function toggleTitleStyle() {
    $("h1").toggleClass("title-color title-size");
}

$("input").on("keydown", this, setTitleText);

function setTitleText(e) {
    $("h1").text(e.key);
}
