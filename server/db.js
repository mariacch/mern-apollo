//const {connect} = require('mongoose')
import {connect} from "mongoose";

import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
   try {
      await connect(MONGODB_URI,{
       useNewUrlParser: true, 
       useUnifiedTopology: true,
       family: 4,
      })
      console.log('mongodb connected')
   } catch (error) {
       console.log(error)
   }
};