module.exports = {
  getTask: function(req, res, next) {
    let db = req.app.get('db');
    db.getTask()
      .then(task => {
        let theTask = [];
        for (var i = 0; i < task.length; i++) {
          theTask.push(task[i].task)
        }
        return res.status(200).json(theTask)
      })
      .catch(err => {
        console.log('error getting task on serverCtrl', err)
        res.status(500).json(err)
      })
  },
  postTask: function(req, res, next) {
    let db = req.app.get('db');
    let task = req.body.task;
    db.postTask(task)
      .then(task => {
        let theTask = [];
        for (var i = 0; i < task.length; i++) {
          theTask.push(task[i].task)
        }
        return res.status(200).json(theTask)
      })
      .catch(err => {
        console.log('error posting task on serverCtrl', err)
        res.status(500).json(err)
      })
  },
  completedTask: function(req, res, next) {
    let db = req.app.get('db');
    let task = req.body.task.task;
    db.completedTask(task)
      .then(task => {
        let theTask = [];
        for (var i = 0; i < task.length; i++) {
          theTask.push(task[i].task)
        }
        return res.status(200).json(theTask)
      })
      .catch(err => {
        console.log('error updating task on serverCtrl', err)
        res.status(500).json(err)
      })
  },
  getCompletedTask: function(req, res, next) {
    let db = req.app.get('db');
    db.getCompletedTask()
      .then(task => {
        let theTask = [];
        for (var i = 0; i < task.length; i++) {
          theTask.push(task[i].task)
        }
        return res.status(200).json(theTask)
      })
      .catch(err => {
        console.log('error getting completed task on serverCtrl', err)
        res.status(500).json(err)
      })
  }
}
