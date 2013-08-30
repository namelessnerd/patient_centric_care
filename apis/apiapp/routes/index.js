// list of resources to be imported. The resource main.js has non restful methods. API methods for each object
// is captured in js file with its own name. 
console.log('Index added');
var main= require('./main');
var consumer= require('./consumer');
var vitals= require('./vitals');
var careplan= require('./careplan');
var demographics= require('./demographics');
var activity= require('./activity');
var personalInfo= require('./personalInfo');
//var testingScripts= require('./testingScript');


/* add methods. All methods to add a new entity go in here */

app.post('/add/consumer', consumer.add);
app.post('/add/careplan', careplan.add);
app.post('/add/vitals', vitals.add);
app.post('/add/demographics', demographics.add);
app.post('/add/activity', activity.add);
app.post('/add/personalInfo', personalInfo.add);

/* update methods. All methods to update records go in here */

app.put('/update/vitals', vitals.update);
app.put('/update/activity', activity.update);
app.put('/update/demographics', demographics.update);
app.put('/update/careplan', careplan.update);
app.put('/update/personalInfo', personalInfo.update);

/* get methods go here */
app.get('/', main.index);
//app.get('/get/consumer', consumer.get);

//app.post('/test/add',testingScripts.add);
//app.post('/test/update',testingScripts.update);
//app.get('/test/get',testingScripts.get);
