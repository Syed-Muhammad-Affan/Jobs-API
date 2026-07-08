const express = require('express');
const Router = express.Router();

const {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
} = require('../controllers/jobs');

Router.route('/').post(createJob).get(getAllJobs);
Router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports = Router;
