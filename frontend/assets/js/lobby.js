const socket = io();

socket.on("updateQueue", (data) => {
  updateQueueDisplay(data.clinicCode, data.number, data.clinicName);
});

socket.on("resetQueue", (data) => {
  updateQueueDisplay(data.clinicCode, data.number, data.clinicName);
});

socket.on("previousQueue", (data) => {
  updateQueueDisplay(data.clinicCode, data.number, data.clinicName);
});

function updateQueueDisplay(clinicCode, number, clinicName) {
  const allQueuesElement = document.getElementById("allQueues");
  let queueItem = document.getElementById(`queue-${clinicCode}`);

  if (!queueItem) {
    const template = document.getElementById("queueCardTemplate");
    queueItem = template.content.cloneNode(true).children[0];
    queueItem.id = `queue-${clinicCode}`;
    allQueuesElement.appendChild(queueItem);
  }

  queueItem.querySelector(".clinic-name").textContent = clinicName;
  queueItem.querySelector(".queue-number").textContent = `${clinicCode}${number}`;
}
