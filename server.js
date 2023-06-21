const express = require('express');
var cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

app.use('/project', require('./controllers/project.controller.js'));
app.use('/task', require('./controllers/task.controller.js'));

app.listen(3300, () => {
    console.log("SERVER IS LISTENING AT PORT: 3300");
})
