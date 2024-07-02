const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const clinicCode = urlParams.get("clinicCode");

socket.on("updateQueue", (data) => {
  if (data.clinicCode === clinicCode) {
    updateQueueDisplay(data.clinicName, data.number);
  }
});

socket.on("resetQueue", (data) => {
  if (data.clinicCode === clinicCode) {
    updateQueueDisplay(data.clinicName, data.number);
  }
});

socket.on("previousQueue", (data) => {
  if (data.clinicCode === clinicCode) {
    updateQueueDisplay(data.clinicName, data.number);
  }
});

function updateQueueDisplay(clinicName, number) {
  const clinicNameHeader = document.getElementById("clinicNameHeader");
  const queueNumber = document.getElementById("queueNumber");
  clinicNameHeader.textContent = `Poliklinik ${clinicName}`;
  queueNumber.textContent = `${clinicCode}${number}`;
}
