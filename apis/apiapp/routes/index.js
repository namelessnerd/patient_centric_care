

// list of resources to be imported. The resource main.js has non restful methods. API methods for each object
// is captured in js file with its own name. 
console.log('Index added');
var main= require('./main');
var consumer= require('./consumer');

app.get('/', main.index);
app.post('/consumer/add',consumer.add);


