const Clinic = require("../models/Clinic");

exports.getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createClinic = async (req, res) => {
  const { code, name } = req.body;

  try {
    const clinic = new Clinic({ code, name });
    await clinic.save();

    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClinic = async (req, res) => {
  const { id } = req.params;
  const { code, name } = req.body;

  try {
    const clinic = await Clinic.findByIdAndUpdate(
      id,
      { code, name },
      { new: true }
    );
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }

    res.json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClinic = async (req, res) => {
  const { code } = req.params;

  try {
    const clinic = await Clinic.findOneAndDelete({ code });
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }

    res.json({ message: "Clinic deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
