if (typeof Cookies.get("session-name") !== "undefined") {
  console.log("RE....");
  window.location.replace("./name");
} else {
  var session_named = document.getElementsByClassName("session-name-here");
  for (var i = 0; i < session_named.length; i++) {
    var item = slides.item(i);
    item.textContent = Cookies.get("session-name");
  }
}
