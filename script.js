const setupPort = async() => {
    port = await navigator.serial.requestPort();
    console.log(port);

    const serialConnection = new Serial();
    
    serialConnection.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
    serialConnection.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
    serialConnection.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
    serialConnection.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);

    await serialConnection.autoConnectAndOpenPreviouslyApprovedPort();
    document.getElementById('connectSerial').style.display="none";
    return;
  }

const mapSound = (value) => {
    let level = (value/150) * 0.9 + 0.1;
    if (level > 1) level = 0;
    return level;
}

const onSerialDataReceived = async(eventSender, newData) => {
    console.log("onSerialDataReceived", newData);
    const soundLevel = mapSound(newData);
    const brightness = soundLevel*100;

    document.getElementById("player").volume = soundLevel;
    document.body.style.backgroundColor = `hsl(235, 59%, ${brightness}%)`;
    return;
}

function onSerialErrorOccurred(eventSender, error) {
    console.log("onSerialErrorOccurred", error);
}

function onSerialConnectionOpened(eventSender) {
    console.log("onSerialConnectionOpened");
}

function onSerialConnectionClosed(eventSender) {
    console.log("onSerialConnectionClosed");
}

const init = () => {
    document.body.style.backgroundColor = `hsl(235, 59%, 15%)`
    document.getElementById("connectSerial").addEventListener("click", setupPort);

    const audioSelect = document.getElementById("audioTractSelect");

}

window.onload = init;