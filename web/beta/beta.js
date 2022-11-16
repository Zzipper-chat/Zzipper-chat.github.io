function preload(event) {
  event.target.submit();
}

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
function createMessage(username, msg) {
  let obj = document.createElement("p");
  obj.classList.add("message");
  let name = document.createElement("b");
  name.classList.add("username");
  name.textContent = username;
  obj.appendChild(name);
  obj.appendChild(document.createTextNode(`: ${msg}`));
  return obj;
}
function loads(event) {
  event.preventDefault();
  let url = event.target.url.value;
  ModifConn(url);
}
function setupSocket(ws) {
  let cont = document.getElementById("msg-container");
  ws.addEventListener("message", (event) => {
    let json = JSON.parse(event.data);
    let msg = createMessage(json.username, json.msg);
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
  let json = JSON.stringify({ username: name, msg: msg });
  ConnControl.socketobj.send(json);
  event.target.msg.value = "";
}
window.onload = () => {
  document.addEventListener("ConnModify", () => {
    let name = document.getElementById("server-name");
    let img = document.getElementById("server-img");
    let descript = document.getElementById("server-descript");
    name.textContent = ConnControl.name;
    img.src = `${ConnControl.host}/pfp.png`;
    descript.textContent = ConnControl.description;
    setupSocket(ConnControl.socketobj);
  });
};
