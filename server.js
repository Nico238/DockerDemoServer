const exp = require('express');
const bp = require('body-parser');
const cors = require('cors');
const jsondb = require('simple-json-db');

const controller = require('./controller');

const app = express();

const port = 3000;

app.use(bp.json());
app.use(cors());
app.use('/api', controller);

app.listen(port, () => {
    console.log('server startet on port ' + port);
});
