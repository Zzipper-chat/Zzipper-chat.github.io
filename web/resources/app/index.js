if (typeof Cookies.get("session-name") !== "undefined") {
  window.location.replace("./name");
} else {
  var session_named = document.getElementsByClassName("session-name-here");
  for (var i = 0; i < slides.length; i++) {
    var item = slides.item(i);
    item.textContent = Cookies.get("session-name");
  }
}
