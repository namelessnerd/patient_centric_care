var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
var responseHelper= require('./responseHelper');
/*
 * Add a new consumer.
 */
exports.add= function(req, res){
  //res.render('index', { title: 'Express Home Page Reloads' });
  console.log('printing body');
  console.log(req.body);


  if (req.body.demographics){
    console.log(req.body.demographics);
    var demographicsInstance= {
      ethnicity:req.body.demographics.ethnicity, 
	    age: req.body.demographics.age, 
		  gender: req.body.demographics.gender, 
		  employment: req.body.demographics.employment, 
			industry: req.body.demographics.industry, 
			when: Date.now
		};     
  }

  if (req.body.personalinfo){
    console.log(req.body.personalinfo);
    var personalInfoInstance= {
      first_name:req.body.personalinfo.first_name, 
			last_name:req.body.personalinfo.last_name, 
			city:req.body.personalinfo.city, 
			state:req.body.personalinfo.state, 
			date_of_birth:req.body.personalinfo.date_of_birth, 
			username:req.body.personalinfo.username, 
			password:req.body.personalinfo.password
    };     
  }
         
  var consumer= new mongooseHelper.getConsumerModel(mongoose)({
    "demographics":demographicsInstance,
    "personal_info":personalInfoInstance,
  });

    mongoose.connect('mongodb://localhost/patientcare');
    consumer.save(function (err, consumer){
      if(err){
        console.log('Error');
        res.send(responseHelper.errorMSG('Consumer object cannot be added at this time.'));
      }
      else{
       res.send(responseHelper.successMSG('Added consumer with ID: ' + consumer._id));
       mongoose.disconnect();
      }
     });
   //}

};

exports.get= function(req, res){
    var queryObj= req.query['values'];
    if (queryObj)
      console.log(typeof(JSON.parse(queryObj)));

    //if ('consumerID' in queryObj)

      //  console.log('ID Found');

    queryObj= JSON.parse(queryObj) ? queryObj : {};
    var consumer= new mongooseHelper.getConsumerModel();
    consumer.find(queryObj, function (err, result){
      if(err){
        console.log('Error');
        console.log(err);
      }else{
       console.log('Got it!');
       res.send(result);
      }
    });
};


