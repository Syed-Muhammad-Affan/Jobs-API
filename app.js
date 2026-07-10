require('dotenv').config();
require('express-async-errors');

const express = require('express');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
const connectDB = require('./db/connect');
const jobsRouter = require('./routes/jobs');
const authenticateUser = require('./middleware/auth');

// Extra Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// Middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
