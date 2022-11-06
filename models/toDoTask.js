const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    completed:{
        type:Boolean,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", toDoSchema);
module.exports = ToDo;
