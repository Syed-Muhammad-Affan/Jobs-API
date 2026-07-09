const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFound } = require('../errors');

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFound(`No job found with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequest('Company or Position field is empty');
  }

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    { runValidators: true, returnDocument: 'after' },
  );

  if (!job) {
    throw new NotFound(`No job found with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFound(`No job found with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
