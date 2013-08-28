var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
/*
 * Update Vitals
 *
 */
exports.update= function(req, res){
  console.log(req.body);
  if (req.body){
    var vitals= new mongooseHelper.getVitalsModel(mongoose);
    mongoose.connect('mongodb://localhost/patientcare');

    vitals.update({_id:req.body.id}, {$push:{value:req.body.value}},{upsert:true}, function (err, vitals){
      if(err){
        console.log('Error');
        console.log(err);
      }
      else{
       console.log('Updated!');
       mongoose.disconnect();
      }
     });
   }
  res.send('I am sending a text instead of a template');
};
