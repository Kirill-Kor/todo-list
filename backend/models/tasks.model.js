const sql = require('./db');

const Task = function(task) {
    this.text = task.text;
}

Task.create = (newTask, result) => {
    sql.query('insert into tasks set ?', newTask, (err, res) => {
        if(err) {
            result.status(400).send(err);
            return;
        }

        result.send(res);
    });
}

Task.getAll = (result) => {
    sql.query(`select tasks.*, datediff(date_end, curdate()) as rest_time, date_format(date_end, '%Y %m %d') as date_end, responsible.first_name as responsible_name, responsible.last_name as responsible_lastname 
    from tasks as tasks
    left join users as responsible
    on tasks.responsible = responsible.id`, (err, res) => {
        if(err) result.send(err);
        
        result.send(res);
    })
}

Task.getTaskById = (request, response) => {
    const taskId = request.params.taskId;

    sql.query(`select task.*, datediff(date_end, curdate()) as rest_time, date_format(date_end, '%Y-%m-%d') as date_end, responsible.first_name as responsible_name, responsible.last_name as responsible_lastname 
    from tasks as task 
    left join users as responsible
    on task.responsible = responsible.id
    where task.id = ?`, taskId, (err, res) => {
        if (err) {
            response.send(err);
            return;
        }

        response.send(res);
    })
}

Task.patchTaskById = (request, response) => {
    const taskId = request.params.taskId;
    const task = request.body;
    
    sql.query(`update tasks set ? where id = ${taskId}`, task, (err, res) => {
        if(err) {
            response.send(err);
            return;
        }
        response.send(res);
    })


}

module.exports = Task;