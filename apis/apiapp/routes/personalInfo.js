var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
var responseHelper= require('./responseHelper');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update PersonalInfo 
 *
 */

function updatePersonalInfo(updateCondition, updateValue, res){
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    console.log(updateCondition);
    console.log(updateValue);

    var updateFunction= function(err, updateResponse){
          if (err)
            res.send(responseHelper.errorMSG('Adding a personalInfo requires a consumer ID and a personalInfo object'));
          else
            res.send(responseHelper.successMSG('Added a personalInfo object'));
        }
    mongooseHelper.updateDB(consumer, updateCondition, updateValue,{upsert:true}, updateFunction);

}

exports.add= function(req, res){
  console.log(req.body);
  if (req.body.personalInfo && req.body.consumerID)
    updatePersonalInfo({_id:req.body.consumerID}, {$push:{personalInfo:req.body.personalInfo}}, res);
  else
    res.send(responseHelper.errorMSG('Adding a personalInfo requires a consumer ID and a personalInfo object'));
}

exports.update= function(req, res){
  console.log(req.body);
  var postbody= req.body
  if (postbody.personalInfoID && postbody.consumerID){
    var updateObj={};  
    for (attribute in postbody.attributes){
        console.log(postbody.attributes[attribute]);
        updateObj["personalInfo.$."+postbody.attributes[attribute]["attr"]]= postbody.attributes[attribute]["value"];
    }
    console.log(updateObj);
    updatePersonalInfo({"personalInfo._id":postbody.personalInfoID}, {$set:updateObj}, res);
   }
  else{
    res.send(responseHelper.errorMSG('Updating a personalInfo requires a consumer ID and a personalInfo ID'));
  }
};

