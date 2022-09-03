if (typeof Cookies.get("session-name") !== "string") {
  console.log("RE....");
  window.location.replace("./name#redirected");
} else {
  var session_named = document.getElementsByClassName("session-name-here");
  for (var i = 0; i < session_named.length; i++) {
    var item = session_named.item(i);
    item.textContent = Cookies.get("session-name");
  }
}
