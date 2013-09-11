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
app.post('/add/consumer/demographics', demographics.add);
app.post('/add/consumer/personalInfo', personalInfo.add);
app.post('/add/careplan', careplan.add);
app.post('/add/vital', vitals.add);
app.post('/add/activity', activity.add);

/* update methods. All methods to update records go in here */

app.put('/update/consumer/demographics', demographics.update);
app.put('/update/consumer/personalInfo', personalInfo.update);
app.put('/update/vital', vitals.update);
app.put('/update/activity', activity.update);
app.put('/update/activity/measurement', activity.updateMeasurement);
app.put('/update/activity/vitals', activity.updateVitals);
app.put('/update/careplan/medications', careplan.update);
app.put('/update/careplan/exercise', careplan.update);
app.put('/update/careplan/vitals', careplan.update);
app.put('/update/careplan/diet', careplan.update);


/* delete methods. All methods to delete records go in here 

app.delete('/delete/vital', vitals.delete);
app.delete('/delete/activity', activity.delete);
app.delete('/delete/careplan', careplan.delete);
app.delete('/delete/careplan/medication', careplan.update);
app.delete('/delete/careplan/exercise', careplan.update);
app.delete('/delete/careplan/vital', careplan.update);
app.delete('/delete/careplan/diet', careplan.update);

*/



/* get methods go here */
app.get('/', main.index);
//app.get('/get/consumer', consumer.get);

//app.post('/test/add',testingScripts.add);
//app.post('/test/update',testingScripts.update);
//app.get('/test/get',testingScripts.get);
