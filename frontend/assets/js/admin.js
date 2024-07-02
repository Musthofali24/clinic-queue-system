const socket = io();

const fetchClinics = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/clinics", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch clinics:", res.statusText);
    return;
  }

  const clinics = await res.json();
  console.log("Fetched clinics:", clinics); // Debugging log

  const clinicSelect = document.getElementById("clinicSelect");
  clinicSelect.innerHTML = "";

  if (clinics.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.innerText = "No clinics available";
    clinicSelect.appendChild(option);
  } else {
    clinics.forEach((clinic) => {
      const option = document.createElement("option");
      option.value = clinic.code;
      option.innerText = clinic.name;
      clinicSelect.appendChild(option);
    });
  }
};

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
  const clinicNameHeader = document.getElementById("currentClinicName");
  const clinicQueueNumber = document.getElementById("currentQueueNumber");
  clinicNameHeader.innerText = `Poliklinik ${clinicName}`;
  clinicQueueNumber.innerText = `${clinicCode}${number}`;
}

document.getElementById("nextButton").addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const clinicCode = document.getElementById("clinicSelect").value;

  const res = await fetch(`/api/queues/${clinicCode}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.error);
  }
});

document.getElementById("prevButton").addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const clinicCode = document.getElementById("clinicSelect").value;

  const res = await fetch(`/api/queues/previous/${clinicCode}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.error);
  }
});

document.getElementById("resetButton").addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const clinicCode = document.getElementById("clinicSelect").value;

  const res = await fetch(`/api/queues/reset/${clinicCode}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.error);
  }
});

document.getElementById("clinicSelect").addEventListener("change", async () => {
  const token = localStorage.getItem("token");
  const clinicCode = document.getElementById("clinicSelect").value;

  if (!clinicCode) {
    updateQueueDisplay("--", "--", "--");
    return;
  }

  const res = await fetch(`/api/queues/${clinicCode}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (res.ok) {
    updateQueueDisplay(data.clinicCode, data.number, data.clinicName);
  } else {
    alert(data.error);
  }
});

document.getElementById("clinicForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const clinicCode = document.getElementById("clinicCode").value;
  const clinicName = document.getElementById("clinicName").value;

  const res = await fetch("/api/clinics", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: clinicCode, name: clinicName }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Clinic added successfully");
    fetchClinics();

    // Initialize queue for new clinic
    const resetRes = await fetch(`/api/queues/reset/${clinicCode}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const resetData = await resetRes.json();
    if (resetRes.ok) {
      updateQueueDisplay(resetData.clinicCode, resetData.number, clinicName);
    } else {
      alert(resetData.error);
    }

    document.getElementById("clinicForm").reset();
    $("#addClinicModal").modal("hide");
  } else {
    alert(data.error);
  }
});

document
  .getElementById("deleteClinicButton")
  .addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const clinicCode = document.getElementById("clinicSelect").value;

    if (confirm("Are you sure you want to delete this clinic?")) {
      const res = await fetch(`/api/clinics/${clinicCode}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Clinic deleted successfully");
        fetchClinics(); // Memperbarui daftar klinik
      } else {
        alert(data.error);
      }
    }
  });

// Memanggil fetchClinics saat halaman dimuat
window.onload = fetchClinics;
