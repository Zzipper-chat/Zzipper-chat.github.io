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
        });
      }
      function sendmsg(event) {
        event.preventDefault();
        let name = event.target.username.value;
        let msg = event.target.msg.value;
        ConnControl.socketobj.send(JSON.stringify({username: name, msg: msg}))
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
