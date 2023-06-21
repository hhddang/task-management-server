const client = require('./connection');

const parseTaskToQuery = (task) => {
    var {id, name, content, status, is_prioritized, participant, deadline, project, creator } = {...task}
    id = (id === undefined) ? null : id
    name = (name === undefined) ? null : `'${name}'`
    content = (content === undefined) ? null : `'${content}'`
    status = (status === undefined) ? null : `'${status}'`
    is_prioritized = (is_prioritized === undefined) ? null : is_prioritized
    if (participant === undefined || participant.length <= 0) {
        participant = null
    } else {
        participant = "array['" + participant.join("','") + "']::varchar[]"
    }
    deadline = (deadline === undefined) ? null : deadline
    project = (project === undefined) ? null : `'${project}'`
    creator = (creator === undefined) ? null : `'${creator}'`
    return {id, name, content, status, is_prioritized, participant, deadline, project, creator }
}

exports.createOne = (task, callback) => {
    let {id, name, content, status, is_prioritized, participant, deadline, project, creator } = parseTaskToQuery(task)
    let createTaskQuery = `insert into tasks (name, content, status, is_prioritized, participant, deadline, project, creator)
                            values(${name}, ${content}, ${status}, ${is_prioritized}, ${participant}, ${deadline}, ${project}, ${creator})`

    console.log("Try this query: ", createTaskQuery)
    client.query(createTaskQuery, (err, result) => {
            return callback(err, result.rows)
    });
}

exports.readAll = (task, callback) => {
    let {id, name, content, status, is_prioritized, participant, deadline, project, creator } = parseTaskToQuery(task)
    let readTaskQuery = `select * from tasks 
                            where (name like '%' || LOWER(${name}) || '%' or ${name} is null)                            
                            and (content ilike ${content} or ${content} is null)
                            and (status ilike ${status} or ${status} is null)
                            and (is_prioritized = ${is_prioritized} or ${is_prioritized} is null)
                            and (participant && ${participant} or ${participant} is null)
                            and (project ilike ${project} or ${project} is null)
                            and (creator ilike ${creator} or ${creator} is null)
                            `
    console.log("Try this query: ", readTaskQuery)
    client.query(readTaskQuery, (err, result) => {
        return callback(err, result.rows);
    })
}

exports.updateOne = (task, callback) => {
    let {id, name, content, status, is_prioritized, participant, deadline, project, creator } = parseTaskToQuery(task)
    let updateTaskQuery = `update tasks 
                            set name = coalesce(${name}, name),
                            content = coalesce(${content}, content),
                            status = coalesce(${status}, status),
                            is_prioritized = coalesce(${is_prioritized}, is_prioritized),
                            participant = coalesce(${participant}, participant),
                            deadline = coalesce(${deadline}, deadline),
                            project = coalesce(${project}, project),
                            creator = coalesce(${creator}, creator)
                            where id = ${id}
                            `
    console.log("Try this query: ", updateTaskQuery)
    client.query(updateTaskQuery, (err, result) => {
        return callback(err, result.rows)
});
}

exports.deleteOne = (task, callback) => {
    let {id, name, content, status, is_prioritized, participant, deadline, project, creator } = parseTaskToQuery(task)
    let deleteTaskQuery = `delete from tasks where id = ${id}`

    console.log("Try this query: ", deleteTaskQuery)
    client.query(deleteTaskQuery, (err, result) => {
            return callback(err, result.rows)
    });
}