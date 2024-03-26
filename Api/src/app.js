const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const spaceRoutes = require('./routes/spaceRoute');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const followingRoutes = require('./routes/followingRoutes');
const app_route = require('./routes/app-routes');
const admin_route = require('./routes/admin-routes');

app.use(
  cors({ origin: 'https://my-quora-remake.onrender.com', credentials: true }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit request from the same API
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);
app.use('/admin', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, welcome to my remake of quora blog API server🫡',
  });
});

app.use('/admin', admin_route);
app.use('/api/v1', userRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v1', reactionRoutes);
app.use('/api/v1', followingRoutes);
app.use('/api/v1', spaceRoutes);
app.use('/', app_route);

app.use((err, req, res, next) => {
  if (err) {
    res.json({ message: 'opps soemthing went wrong!' });
  }
});

module.exports = app;
