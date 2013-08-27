var datamodels= require('../dataModels/datamodels.js');

exports.getConsumerModel= function(mongoose){
  return  mongoose.model('consumer', datamodels.getConsumerSchema(mongoose.Schema));
}

exports.getVitalsModel= function(mongoose){
  return  mongoose.model('myVitals', datamodels.getVitalsSchema(mongoose.Schema));
}
