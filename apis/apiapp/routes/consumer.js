var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
/*
 * Add a new consumer.
 */
exports.add= function(req, res){
  //res.render('index', { title: 'Express Home Page Reloads' });
  console.log('printing body');
  console.log(req.body);

  var demographicsInstance;
  var vitalInstance;
  var activityInstance;
  var personalInfoInstance;
  var careplanInstance;

  //if (req.body.vital){
  //  console.log(req.body.vital);
   if (req.body.demographics){
     console.log(req.body.demographics);

     demographicsInstance= new mongooseHelper.getDemographicsModel(mongoose)({ethnicity:req.body.demographics.ethnicity, 
			                                               age: req.body.demographics.age, 
			                                               gender: req.body.demographics.gender, 
			                                               employment: req.body.demographics.employment, 
			                                               industry: req.body.demographics.industry, 
				                                             when: Date.now
		                                                });     
	  }

   if (req.body.vital){
     console.log(req.body.vital);
     vitalInstance= new mongooseHelper.getVitalsModel(mongoose)({
			                                     type:req.body.vital.type, 
			                                     value: req.body.vital.value, 
			                                     when: Date.now,
			                                     device: req.body.vital.device
		                                      });     
	 }

   if (req.body.activity){
     console.log(req.body.activity);
     activityInstance= new mongooseHelper.getActivityModel(mongoose)({activity:req.body.activity.activity, 
			                                       measurement: req.body.activity.measurement, 
			                                       intensity: req.body.activity.intensity, 
			                                       device: req.body.activity.device, 
			                                       vitals: req.body.activity.vitals, 
				                                     when: Date.now
		                                        });     
	 }

   if (req.body.personalinfo){
     console.log(req.body.personalinfo);
     personalInfoInstance= new mongooseHelper.getPersonalInfoModel(mongoose)({
			                                      first_name:req.body.personalinfo.first_name, 
			                                      last_name:req.body.personalinfo.last_name, 
			                                      city:req.body.personalinfo.city, 
			                                      state:req.body.personalinfo.state, 
			                                      date_of_birth:req.body.personalinfo.date_of_birth, 
			                                      username:req.body.personalinfo.username, 
			                                      password:req.body.personalinfo.password
		                                        });     
	 }

   if (req.body.careplan){
     console.log(req.body.careplan);
     careplanInstance= new mongooseHelper.getCareplanModel(mongoose)({
			                                        medication:req.body.careplan.medication, 
			                                        vitals:req.body.careplan.vitals, 
			                                        diet:req.body.careplan.diet, 
			                                        exercise:req.body.careplan.exercise
		                                        });     
	 }
      
    var consumer= new mongooseHelper.getConsumerModel(mongoose)({
			"demographics":demographicsInstance,
      "vitals":vitalInstance,
      "activity":activityInstance,
			"personal_info":personalInfoInstance,
			"careplan":careplanInstance
    });

    mongoose.connect('mongodb://localhost/patientcare');
    consumer.save(function (err, consumer){
      if(err)
        console.log('Error');
      else{
       console.log(consumer._id);
       mongoose.disconnect();
      }
     });
   //}

  res.send('I am sending a text instead of a template');
};

/*
 * Get a consumer.
 */
exports.get= function(req, res){
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    mongoose.connect('mongodb://localhost/patientcare');

    consumer.findOne({_id:'521e6b7269f5e96d29000015'}, function (err, result){
      if(err){
        console.log('Error');
        console.log(err);
        res.send('I am sending a text instead of a template');
      }else{
       console.log('Got it!');
       mongoose.disconnect();
       res.send(result);
      }
    });
};

exports.update= function(req, res){
};
