const mongoose = require('mongoose');

// === Client inquiries Schema ===
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  budget: { type: Number, default: 0 },
  interestedProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property"
    }
  ],
  status: {
    type: String,
    enum: ["new", "contacted", "follow-up", "closed"],
    default: "new"
  },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
