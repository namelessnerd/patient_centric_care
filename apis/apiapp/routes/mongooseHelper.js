var datamodels= require('../dataModels/datamodels.js');
var mongoose= require('mongoose');

var tempArrayModel= mongoose.model('testingScript', datamodels.getTempArraySchema(mongoose.Schema));
var vitalsModel= mongoose.model('myVitals', datamodels.getVitalsSchema(mongoose.Schema));
var consumerModel= mongoose.model('consumer', datamodels.getConsumerSchema(mongoose.Schema));
var demographicsModel= mongoose.model('myDemographics', datamodels.getDemographicsSchema(mongoose.Schema));
var activityModel= mongoose.model('myActivity', datamodels.getActivitySchema(mongoose.Schema));
var personalinfoModel= mongoose.model('myPersonalInfo', datamodels.getPersonalInfoSchema(mongoose.Schema));
var careplanModel= mongoose.model('myCareplan', datamodels.getCareplanSchema(mongoose.Schema));

exports.getConsumerModel= function(mongoose){
	return consumerModel;
}

exports.getVitalsModel= function(mongoose){
	return vitalsModel;
}

exports.getDemographicsModel= function(mongoose){
  return demographicsModel;
}

exports.getActivityModel= function(mongoose){
  return activityModel;
}

exports.getPersonalInfoModel= function(mongoose){
  return personalinfoModel;
}

exports.getCareplanModel= function(mongoose){
  return careplanModel;
}

exports.getTempArrayModel= function(mongoose){
  return tempArrayModel;
}


exports.updateDB= function(modelToUpdate, updateCondition,updateValue, isUpsert, callback){
    mongoose.connect('mongodb://localhost/patientcare');
    modelToUpdate.update(updateCondition, updateValue, {upsert:isUpsert}, function (err, updateStatus){
        mongoose.disconnect();
        callback(err, updateStatus);
    });

}
