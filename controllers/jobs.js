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
  if (!job) {
    throw new NotFound(`No job found with id: ${jobId}`);
};

const updateJob = (req, res) => {
  res.send('Update Job');
};

const deleteJob = (req, res) => {
  res.send('Delete Job');
};

module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
