let dgram = require('react-native-udp');

let socket;
const listeningPort = 3020;
const sendingPort = 3030; // default 3030
const sendingHost = 'localhost'; //'172.17.90.177'

function toByteArray(obj) {
  var uint = new Uint8Array(obj.length)
  for (var i = 0, l = obj.length; i < l; i++){
    uint[i] = obj.charCodeAt(i)
  }

  return new Uint8Array(uint);
}

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false
  }
  return true
}

export function createSocket() {
  socket = dgram.createSocket('udp4')
  socket.bind(listeningPort)
}

export function send(msg) {
  msg = JSON.stringify(msg)
  console.log('sending message', msg);
  let buf = toByteArray(msg)
  socket.send(buf, 0, buf.length, sendingPort, sendingHost, function(err) {
      if (err) throw err
      console.log('message was sent')
  })
}

export function listen(callBackFn) {
  socket.once('message', function(msg, rinfo) {
    console.log('message was received', msg)
    let msgDecoded = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(msg)));
    console.log('socketutil msgDecoded', msgDecoded);
    if (msgDecoded.msgId == -1) {
      alert('Error: (Code -1) Error with controller Pi')
    } else if (isEmpty(msgDecoded)) {
      alert('Error: Received message was empty')
    } else {
      callBackFn(msgDecoded)
    }
  })
}