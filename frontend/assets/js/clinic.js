document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const clinicCode = urlParams.get("clinicCode");

  try {
    const response = await fetch(`/api/queues/${clinicCode}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    if (!response.ok) {
      updateQueueDisplay("--");
      throw new Error("Failed to fetch queue data");
    }
    const queue = await response.json();
    updateQueueDisplay(clinicCode, queue.clinicName, queue.number);
  } catch (error) {
    console.error(error);
  }

  const socket = io();

  socket.on("updateQueue", (data) => {
    if (data.clinicCode === clinicCode) {
      updateQueueDisplay(data.clinicCode, data.clinicName, data.number);
    }
  });

  socket.on("resetQueue", (data) => {
    if (data.clinicCode === clinicCode) {
      updateQueueDisplay(data.clinicCode, data.clinicName, data.number);
    }
  });

  socket.on("previousQueue", (data) => {
    if (data.clinicCode === clinicCode) {
      updateQueueDisplay(data.clinicCode, data.clinicName, data.number);
    }
  });
});

function updateQueueDisplay(clinicCode, clinicName, number) {
  const clinicNameHeader = document.getElementById("clinicNameHeader");
  const queueNumber = document.getElementById("queueNumber");
  clinicNameHeader.textContent = `Poliklinik ${clinicName}`;
  queueNumber.textContent = number ? `${clinicCode}${number}` : "--";
}