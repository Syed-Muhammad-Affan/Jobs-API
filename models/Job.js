const { required, string } = require('joi');
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: string,
      required: [true, 'Please provide company'],
      maxlenght: 50,
    },
    position: {
      type: string,
      required: [true, 'Please provide position'],
      maxlenght: 100,
    },
    status: {
      type: string,
      enum: ['interview', 'decline', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please prove user'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Job', JobSchema);
