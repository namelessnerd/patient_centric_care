var datamodels= require('../dataModels/datamodels.js');
var mongoose= require('mongoose');
var dbConnection= mongoose.createConnection('mongodb://localhost/patientcare',{server: { poolSize: 100 }});
var vitalsModel= dbConnection.model('vitals', datamodels.getVitalsSchema(mongoose.Schema));
var consumerModel= dbConnection.model('consumer', datamodels.getConsumerSchema(mongoose.Schema));
var activityModel= dbConnection.model('activities', datamodels.getActivitySchema(mongoose.Schema));
var carePlanModel= dbConnection.model('careplan', datamodels.getCareplanSchema(mongoose.Schema));
var developerModel=dbConnection.model('developers', datamodels.getDeveloperSchema(mongoose.Schema));

exports.getConsumerModel= function(){
	return consumerModel;
}

exports.getCarePlanModel= function(){
	return carePlanModel;
}

exports.getVitalsModel= function(mongoose){
	return vitalsModel;
}


exports.getActivityModel= function(mongoose){
  return activityModel;
}

exports.getCareplanModel= function(mongoose){
  return careplanModel;
}

exports.getDeveloperModel= function(){
    return developerModel;
}

exports.updateDB= function(modelToUpdate, updateCondition,updateValue, isUpsert, callback){
    modelToUpdate.update(updateCondition, updateValue, {upsert:isUpsert}, function (err, updateStatus){
        callback(err, updateStatus);
    });
}

exports.saveDB= function(modelToSave, callback){
    modelToSave.save(function (err, updateStatus){
        callback(err, updateStatus);
    });
}
