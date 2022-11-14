let ConnControl = {
  host: null,
  socketobj: null,
  description: null,
  name: null,
};
const ConnModify = new Event("ConnModify");
function ModifConn(host) {
  
  let ws = new WebSocket(`wss://${host}/ws`);
  ConnControl.host = `https://${host}`;
  ConnControl.socketobj = ws;
  fetch(`${host}/info`)
    .then((resp) => resp.json())
    .then((data) => {
      ConnControl.name = data.name;
      ConnControl.description = data.description;
      document.dispatchEvent(ConnModify);
    });
}
