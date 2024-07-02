const Queue = require("../models/Queue");
const Clinic = require("../models/Clinic");

exports.getAllQueues = async (req, res) => {
  try {
    const queues = await Queue.find();
    const clinics = await Clinic.find();

    const activeQueues = queues.map(queue => {
      const clinic = clinics.find(clinic => clinic.code === queue.clinicCode);
      return {
        clinicCode: queue.clinicCode,
        number: queue.number,
        clinicName: clinic ? clinic.name : 'Unknown Clinic'
      };
    });

    res.json(activeQueues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQueue = async (req, res) => {
  const { clinicCode } = req.params;
  try {
    const queue = await Queue.findOne({ clinicCode });
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const clinic = await Clinic.findOne({ code: clinicCode });
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.json({
      clinicCode: queue.clinicCode,
      number: queue.number,
      clinicName: clinic.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQueue = async (req, res) => {
  const { clinicCode } = req.params;
  try {
    const queue = await Queue.findOne({ clinicCode });
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    queue.number += 1;
    await queue.save();

    const clinic = await Clinic.findOne({ code: clinicCode });

    const io = req.app.get("socketio");
    io.emit("updateQueue", {
      clinicCode: queue.clinicCode,
      number: queue.number,
      clinicName: clinic.name,
    });

    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.skipQueue = async (req, res) => {
  const { clinicCode } = req.params;
  try {
    let queue = await Queue.findOne({ clinicCode });
    if (!queue) {
      queue = new Queue({ clinicCode, number: 1 });
    } else {
      queue.number += 1;
    }
    await queue.save();

    const io = req.app.get("socketio");
    io.emit("skipQueue", { clinicCode, number: queue.number });

    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.previousQueue = async (req, res) => {
  const { clinicCode } = req.params;
  try {
    const queue = await Queue.findOne({ clinicCode });
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    if (queue.number > 1) {
      queue.number -= 1;
      await queue.save();
    } else {
      return res.status(400).json({ message: "Queue number cannot be less than 1" });
    }

    const clinic = await Clinic.findOne({ code: clinicCode });

    const io = req.app.get("socketio");
    io.emit("previousQueue", {
      clinicCode: queue.clinicCode,
      number: queue.number,
      clinicName: clinic.name,
    });

    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetQueue = async (req, res) => {
  const { clinicCode } = req.params;
  try {
    let queue = await Queue.findOne({ clinicCode });
    if (!queue) {
      queue = new Queue({ clinicCode, number: 1 });
    } else {
      queue.number = 1; // Reset queue to 1
    }
    await queue.save();

    const clinic = await Clinic.findOne({ code: clinicCode });

    const io = req.app.get("socketio");
    io.emit("resetQueue", {
      clinicCode: queue.clinicCode,
      number: queue.number,
      clinicName: clinic.name,
    });

    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


