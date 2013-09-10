
var mongooseHelper= require('./mongooseHelper.js');
exports.check=function (req, callback){
  if (req.body.developerID && req.body.consumerID && req.body.payload){
    console.log("Inside developer ID check " +  devID + " with consumer" + consumerID);
    var developer= new mongooseHelper.getDeveloperModel();
    try{
      developer.findOne({developerID:req.body.developerID}, function(err, developer){
        console.log("Inside developer callback " +  developer);
        if (!err && developer){
          if (developer.consumerID.indexOf(req.body.consumerID)!=-1)
            callback(true);
          else 
            callback(false);
        }
        else
          callback(false);
      });
    }
    catch(e){
      callback(false);
    }
  }
}
