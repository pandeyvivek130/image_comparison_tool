import mongoose from 'mongoose';

const imgDataSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    set_id: { type: Number, required: true },
    image: { type: String, required: true },
    isBaseImg: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    result: { type: String, required: true, default : 'select' },
  },
  {
    timestamps: true,
  }
);
const ImgData = mongoose.model('ImgData', imgDataSchema);

export default ImgData;
