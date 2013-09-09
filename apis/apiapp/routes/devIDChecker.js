
var mongooseHelper= require('./mongooseHelper.js');
exports.check=function (devID, consumerID, callback){
    console.log("Inside developer ID check " +  devID + " with consumer" + consumerID);
    var developer= new mongooseHelper.getDeveloperModel();
    developer.findOne({developerID:devID}, function(err, developer){
        console.log("Inside developer callback " +  developer);
        if (!err){
            if (developer.consumerID.indexOf(consumerID)!=-1)
                callback(true);
            else 
                callback(false);
        }
        else
            callback(false);
    });
}
