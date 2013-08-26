var datamodels= require('../dataModels/datamodels.js');
var mongoose= require('mongoose');
var ConsumerModel= mongoose.model('consumer', datamodels.getConsumerSchema(mongoose.Schema));
var vitalsModel= mongoose.model('myVitals', datamodels.getVitalsSchema(mongoose.Schema));
/*
 * Add a new consumer.
 */
exports.add= function(req, res){
  //res.render('index', { title: 'Express Home Page Reloads' });
  console.log(req.body);
  if (req.body.activity){
    console.log(req.body.activity);
    var vitalInstance= new vitalsModel({type:req.body.activity.type, value: req.body.activity.value, when: Date.now});     
      
    var consumer= new ConsumerModel({
      "vitals":vitalInstance 
    });
    mongoose.connect('mongodb://localhost/patientcare');

    consumer.save(function (err, consumer){
      if(err)
        console.log('Error');
      else{
       console.log('Saved!');
       mongoose.disconnect();
      }
     });
   }
  res.send('I am sending a text instead of a template');
};
