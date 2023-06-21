const client = require('./connection');

const parseProjectToQuery = (project) => {
    var {id, name, description, owner} = {...project}
    id = (id === undefined) ? null : id
    name = (name === undefined) ? null : `'${name}'`
    description = (description === undefined) ? null : `'${description}'`
    owner = (owner === undefined) ? null : `'${owner}'`
    return {id, name, description, owner}
}

exports.createOne = (project, callback) => {
    let {id, name, description, owner} = parseProjectToQuery(project)
    let createProjectQuery = `insert into projects (name, description, owner)
                            values(${name}, ${description}, ${owner})`

    console.log("Try this query: ", createProjectQuery)
    client.query(createProjectQuery, (err, result) => {
            return callback(err, result.rows)
    });
}

exports.readAll = (project, callback) => {
    let {id, name, description, owner} = parseProjectToQuery(project)
    let readProjectQuery = `select * from projects 
                            where (name ilike ${name} or ${name} is null)
                            and (description ilike ${description} or ${description} is null)
                            and (owner ilike ${owner} or ${owner} is null)`

    console.log("Try this query: ", readProjectQuery)
    client.query(readProjectQuery, (err, result) => {
        return callback(err, result.rows);
    })
}

exports.updateOne = (project, callback) => {
    let {id, name, description, owner} = parseProjectToQuery(project)
    let updateProjectQuery = `update projects 
                                set name = coalesce(${name}, name),
                                description = coalesce(${description}, description),
                                owner = coalesce(${owner}, owner)
                                where id = ${id}`

    console.log("Try this query: ", updateProjectQuery)
    client.query(updateProjectQuery, (err, result) => {
        return callback(err, result.rows)
});
}

exports.deleteOne = (project, callback) => {
    let {id, name, description, owner} = parseProjectToQuery(project)
    let deleteProjectQuery = `delete from projects where id = ${id}`

    console.log("Try this query: ", deleteProjectQuery)
    client.query(deleteProjectQuery, (err, result) => {
            return callback(err, result.rows)
    });
}