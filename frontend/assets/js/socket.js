const socket = io();

socket.on("updateQueue", (data) => {
  const queueElement = document.getElementById("queue");
  if (queueElement) {
    queueElement.innerText = `Current Queue: ${data.clinicCode}${data.number}`;
  }

  const queuesElement = document.getElementById("queues");
  if (queuesElement) {
    let queueItem = document.getElementById(`queue-${data.clinicCode}`);
    if (queueItem) {
      queueItem.innerText = `Clinic ${data.clinicCode}: ${data.number}`;
    } else {
      queueItem = document.createElement("div");
      queueItem.id = `queue-${data.clinicCode}`;
      queueItem.innerText = `Clinic ${data.clinicCode}: ${data.number}`;
      queuesElement.appendChild(queueItem);
    }
  }
});
