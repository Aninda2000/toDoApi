const toDoTask=require('../models/toDoTask');


module.exports.createToDo = async function (req, res) {
  try {
    if (req.user) {
      let task = await toDoTask.create({
        title: req.body.title,
        catagory: req.body.catagory,
        date: new Date().getDate(),
        completed: false,
        user: req.user.id,
      });
      return res.status(200).json({
        success: true,
        message: "task created successfully",
        todotask: task,
      });
    } else {
      return res.status(401).json({
        success: true,
        message: "unauthorized!! ",
      });
    }
  } catch (error) {
    console.log(`Error in creating to-do-task***** ${error}`);
    return res.status(500).json({
      failure: true,
      message: "Internal server Error!!",
    });
  }
};

module.exports.updateToDo = async function (req, res) {
  try {
    if (req.user) {
      let task = await toDoTask.findById(req.params.id);
      if (task.user == req.user.id) {
        (task.title = req.body.title),
          (task.catagory = req.body.catagory),
          (task.completed = req.body.completed),
          task.save();
        return res.status(200).json({
          success: true,
          message: "task updated successfully",
          task,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "you are unauthorized!!",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "please log in to continue!",
      });
    }
  } catch (error) {
    console.log(`Error in updating task******${error}`);
    return res.status(500).json({
      failure: true,
      message: "Internal server Error!!",
    });
  }
};

module.exports.deleteToDo = async function (req, res) {
  try {
    if (req.user) {
      let task = await toDoTask.findById(req.params.id);
      if (task.user == req.user.id) {
        await toDoTask.deleteOne({ _id: req.params.id });
        return res.status(200).json({
          success: true,
          message: "task Deleted successfully!!",
          task,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "you are unauthorized!!",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "please log in to continue!",
      });
    }
  } catch (error) {
    console.log(`Error in updating task******${error}`);
    return res.status(500).json({
      failure: true,
      message: "Internal server Error!!",
    });
  }
};

module.exports.todo = async function (req, res) {
  try {
    var query = {
      date: {
        $gte: new Date(req.query.fromdate).toISOString().split("T")[0],
        $lte: new Date(req.query.todate).toISOString().split("T")[0],
      },
    };

    let page = req.query.page;
    let pagesize = req.query.pagesize;

    const tasks = await toDoTask
      .find(query)
      .limit(pagesize * 1)
      .skip((page - 1) * pagesize)
      .exec();

    const count = await tasks.countDocuments();

    return res.status(200).json({
      success: true,
      totalPages: Math.ceil(count / pagesize),
      currentPage: page,
      data: tasks,
    });
  } catch (err) {
    console.log(`Error in getting Data*******${err}`);
    return res.json(500, {
      failure: true,
      message: "Internal Server Error !!",
    });
  }
};