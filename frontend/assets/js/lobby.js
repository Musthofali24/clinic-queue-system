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

// Fetch all active queues when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token'); // Ambil token dari localStorage

  fetch("/api/queues", {
    headers: {
      'Authorization': 'Bearer ' + token // Tambahkan header Authorization
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data fetched:', data);  // Log untuk debug
      data.forEach(queue => {
        updateQueueDisplay(queue.clinicCode, queue.number, queue.clinicName);
      });
    })
    .catch(error => console.error('Error fetching queues:', error));
});

function updateDateTime() {
  const now = new Date();
  const formattedTime = now.toTimeString().slice(0, 8);
  const formattedDate = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  document.getElementById("currentTime").textContent = formattedTime;
  document.getElementById("currentDate").textContent = formattedDate;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // initial call
