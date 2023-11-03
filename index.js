// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import carRoute from "./routes/carRoute.js"
const express = require('express'),
      cors = require('cors'),
      dotenv = require('dotenv'),
      carRoute = require('./routes/carRoute.js')
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json({ strict: false }));
app.use('/images', express.static('public/images'))
app.use('/api/v1', carRoute);
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
  