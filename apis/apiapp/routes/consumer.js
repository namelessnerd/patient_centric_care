var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
/*
 * Add a new consumer.
 */
exports.add= function(req, res){
  //res.render('index', { title: 'Express Home Page Reloads' });
  console.log('printing body');
  console.log(req.body);
  if (req.body.activity){
    console.log(req.body.activity);
    var vitalInstance= new mongooseHelper.getVitalsModel(mongoose)({type:req.body.activity.type, value: req.body.activity.value, when: Date.now});     
      
    var consumer= new mongooseHelper.getConsumerModel(mongoose)({
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
