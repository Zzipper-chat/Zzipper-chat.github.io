let ConnControl = {
  host: null,
  socketobj: null,
  description: null,
  name: null,
};
const ConnModify = new Event("ConnModify");
function ModifConn(host, auth) {
  let ws = new WebSocket(`wss://${host}/ws`);
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        datetime: new Date().toLocaleString(),
        auth: auth,
      })
    );
  };
  ConnControl.host = `https://${host}`;
  ConnControl.socketobj = ws;
  fetch(`${ConnControl.host}/info`)
    .then((resp) => resp.json())
    .then((data) => {
      ConnControl.name = data.name;
      ConnControl.description = data.description;
      document.dispatchEvent(ConnModify);
    });
}
