var datamodels= require('../dataModels/datamodels.js');
var mongoose= require('mongoose')


var tempArrayModel= mongoose.model('testingScript', datamodels.getTempArraySchema(mongoose.Schema));
var vitalsModel= mongoose.model('myVitals', datamodels.getVitalsSchema(mongoose.Schema));
var consumerModel= mongoose.model('consumer', datamodels.getConsumerSchema(mongoose.Schema));

exports.getConsumerModel= function(){
  return  consumerModel;
}

exports.getVitalsModel= function(){
  return  vitalsModel;
}

exports.getTempArrayModel= function(){
  return  tempArrayModel ;
}
