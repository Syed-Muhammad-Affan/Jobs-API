const createJob = (req, res) => {
  res.json(req.user);
};

const getAllJobs = (req, res) => {
  res.send('Get All Jobs');
};

const getSingleJob = (req, res) => {
  res.send('Get Single Job');
};

const updateJob = (req, res) => {
  res.send('Update Job');
};

const deleteJob = (req, res) => {
  res.send('Delete Job');
};

module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
