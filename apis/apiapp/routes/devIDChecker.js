
var mongooseHelper= require('./mongooseHelper.js');
exports.check=function (req, callback){
  console.log("Inside ID Checker " + req.body);
  var developerID= req.get('DeveloperID'); 
  var consumerID= req.get('ConsumerID'); 
  if (req.get('Content-Type')=='application/json' && developerID && consumerID){
    console.log("Inside developer ID check " +  developerID+ " with consumer" + consumerID);
    var developer= new mongooseHelper.getDeveloperModel();
    try{
      developer.findOne({developerID:developerID}, function(err, developer){
        console.log("Inside developer callback " +  developer);
        if (!err && developer){
          if (developer.consumerID.indexOf(consumerID)!=-1)
            callback({status: 1});
          else
            callback({status: -1});
        }
        else
          callback({status: -1});
      });
    }
    catch(e){
      callback({status: 0});
    }
  }
  else 
    callback({status: -2});
}
