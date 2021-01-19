import mongoose from 'mongoose';

const imgSetSchema = new mongoose.Schema(
  {
    set_id: { type: Number, required: true, unique: true },
    isComplete: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
const ImgSet = mongoose.model('ImgSet', imgSetSchema);
export default ImgSet;
