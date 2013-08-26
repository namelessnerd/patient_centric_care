var datamodels= require('./dataModels/datamodels.js');
var mongoose= require('mongoose');


//Create a class handle of the careplan schema
var vitals= mongoose.model('myVitals', datamodels.getVitalsSchema(mongoose.Schema));
var MyCareplan= mongoose.model('myCarePlan', datamodels.getConsumerSchema(mongoose.Schema));



//connect to the database

mongoose.connect('mongodb://localhost/patientcare');

var vitalsInstance= new vitals({type:'height', value: 167, when: Date.now});


var careplanInstance= new MyCareplan({
    vitals:vitalsInstance 
});

careplanInstance.save(function (err, careplan){
    if(err)
      console.log('Error');
    else{
      console.log('Saved!');
      mongoose.disconnect();
    }
      

});
