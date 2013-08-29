var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
var responseHelper= require('./responseHelper');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Activity 
 *
 */

function updateActivity(updateCondition, updateValue, res){
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    console.log(updateCondition);
    console.log(updateValue);

    var updateFunction= function(err, updateResponse){
          if (err)
            res.send(responseHelper.errorMSG('Adding a activity requires a consumer ID and a activity object'));
          else
            res.send(responseHelper.successMSG('Added a activity object'));
        }
    mongooseHelper.updateDB(consumer, updateCondition, updateValue,{upsert:true}, updateFunction);

}

exports.add= function(req, res){
  console.log(req.body);
  if (req.body.activity && req.body.consumerID)
    updateActivity({_id:req.body.consumerID}, {$push:{activity:req.body.activity}}, res);
  else
    res.send(responseHelper.errorMSG('Adding a activity requires a consumer ID and a activity object'));
}

exports.update= function(req, res){
  console.log(req.body);
  var postbody= req.body
  if (postbody.activityID && postbody.consumerID){
    var updateObj={};  
    for (attribute in postbody.attributes){
        console.log(postbody.attributes[attribute]);
        updateObj["activity.$."+postbody.attributes[attribute]["attr"]]= postbody.attributes[attribute]["value"];
    }
    console.log(updateObj);
    updateActivity({"activity._id":postbody.activityID}, {$set:updateObj}, res);
   }
  else{
    res.send(responseHelper.errorMSG('Updating a activity requires a consumer ID and a activity ID'));
  }
};

