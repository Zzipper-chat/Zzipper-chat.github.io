function atBottom(ele) {
  // https://stackoverflow.com/questions/8480466/how-to-check-if-scrollbar-is-at-the-bottom
  var sh = ele.scrollHeight;
  var st = ele.scrollTop;
  var ht = ele.offsetHeight;
  if (ht == 0) {
    return true;
  }
  if (st + 4 > sh - ht) {
    return true;
  } else {
    return false;
  }
}

var scrollLock = true;
function scrolls(event) {
  console.log(atBottom(event.target));
  if (atBottom(event.target)) {
    scrollLock = true;
  } else {
    scrollLock = false;
  }
}
function createMessage(username, msg, old) {
  let obj = document.createElement("p");
  obj.classList.add("message");
  let name = document.createElement("b");
  name.classList.add("username");
  name.textContent = username;
  obj.appendChild(name);
  obj.appendChild(document.createTextNode(`: ${msg}\u00A0`));
  if (old) {
    let oldtag = document.createElement("span");
    oldtag.textContent = "Old";
    oldtag.classList.add("old");
    obj.appendChild(oldtag);
  }
  return obj;
}
function loads(event) {
  event.preventDefault();
  let url = event.target.url.value;
  let auth = event.target.auth.value;
  ModifConn(url, auth);
}
function setupSocket(ws) {
  let cont = document.getElementById("msg-container");
  cont.innerHTML = "";
  ws.addEventListener("message", (event) => {
    let json = JSON.parse(event.data);
    let msg = createMessage(json.username, json.msg, json.old);
    cont.appendChild(msg);
    if (cont.childElementCount > 50) {
      cont.removeChild(cont.children[0]);
    }
    if (scrollLock) {
      cont.scrollTop = cont.scrollHeight;
    }
  });
}
function sendmsg(event) {
  event.preventDefault();
  let name = event.target.username.value;
  let msg = event.target.msg.value;
  let json = JSON.stringify({
    username: name,
    msg: msg,
    auth: document.forms[0].auth.value,
  });
  ConnControl.socketobj.send(json);
  event.target.msg.value = "";
}
window.onload = () => {
  document.addEventListener("ConnModify", () => {
    let name = document.getElementById("server-name");
    let img = document.getElementById("server-img");
    let descript = document.getElementById("server-descript");
    name.textContent = ConnControl.name;
    img.src = `${ConnControl.host}/pfp`;
    descript.textContent = ConnControl.description;
    setupSocket(ConnControl.socketobj);
    ConnControl.socketobj.onclose = () => {
      if (confirm("Your connection was interrupted! Reload the site?")) {
        window.location.reload();
      }
    };
  });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("server")) {
    document.forms[0].url.value = urlParams.get("server");
  }
  if (urlParams.has("user")) {
    document.forms[1].username.value = urlParams.get("user");
  }
  if (urlParams.has("auth")) {
    document.forms[0].auth.value = urlParams.get("auth");
  }
  if (urlParams.has("autojoin")) {
    ModifConn(document.forms[0].url.value, document.forms[0].auth.value);
  }
};
