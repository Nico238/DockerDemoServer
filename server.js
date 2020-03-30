//imports
const exp = require('express');
const bp = require('body-parser');
const cors = require('cors');
const JSONdb = require('simple-json-db');

var app = exp();
const router = exp.Router();
const db = new JSONdb('./database.json');

//config
const port = 3000;

//setup + start server
app.use(bp.json());
app.use(cors());
app.use('/api', router);
app.listen(port, () => {
    console.log('server startet on port ' + port);
});

//get all tasks
router.get('/', (req, res) => {
    var ans = [];
    const content = db.JSON();
    for (key in content){
        var val = JSON.parse(content[key]);
        ans.push(createTaskObj(key, val.task, val.done));
    }
    res.send(ans);
});

//get single task
router.get('/:id', (req, res) => {
    if (!db.has(req.params.id)){
        res.status(400).send('no task with id ' + req.params.id);
    }
    else {
        const val = JSON.parse(db.get(req.params.id));
        res.send(createTaskObj(req.params.id, val.task, val.done));
    }
});

//post task
router.post('/', (req, res) => {
    try{
        const id = getNextId();
        db.set(id, JSON.stringify({task: req.body.task, done: req.body.done}));
        const val = JSON.parse(db.get(id));
        let ans = createTaskObj(id, val.task, val.done);
        res.send(ans);    
    }
    catch(error){
        res.status(500).send('internal error:\n' + JSON.stringify(error, undefined, 2));
    }
});

//put task
router.put('/:id', (req, res) => {
    if (!db.has(req.params.id)){
        res.status(400).send('no task with id ' + req.params.id);
    }
    else {
        try{
            db.set(req.params.id, JSON.stringify({task: req.body.task, done: req.body.done}));
            const val = JSON.parse(db.get(req.params.id));
            let ans = createTaskObj(req.params.id, val.task, val.done);
            res.send(ans);    
        }
        catch(error){
            res.status(500).send('internal error:\n' + JSON.stringify(error, undefined, 2));
        }
    }
});

//delete task
router.delete('/:id', (req, res) => {
    if (!db.has(req.params.id)){
        res.status(400).send('no task with id ' + req.params.id);
    }
    else {
        try{
            const val = JSON.parse(db.get(req.params.id));
            db.delete(req.params.id);
            let ans = createTaskObj(req.params.id, val.task, val.done);
            res.send(ans);    
        }
        catch(error){
            res.status(500).send('internal error:\n' + JSON.stringify(error, undefined, 2));
        }
    }
});


//helpers
function getNextId() {
    var i = 1;
    while (db.has(i)){
        i++;
    }
    return i.toString();
}

function createTaskObj(_id, _task, _done) {
    return {
        id: _id,
        task: _task,
        done: _done
    };
}