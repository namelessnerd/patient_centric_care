var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
var responseHelper= require('./responseHelper');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Demographics 
 *
 */

function updateDemographics(updateCondition, updateValue, res){
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    console.log(updateCondition);
    console.log(updateValue);

    var updateFunction= function(err, updateResponse){
          if (err)
            res.send(responseHelper.errorMSG('Adding a demographics requires a consumer ID and a demographics object'));
          else
            res.send(responseHelper.successMSG('Added a demographics object'));
        }
    mongooseHelper.updateDB(consumer, updateCondition, updateValue,{upsert:true}, updateFunction);

}

exports.add= function(req, res){
  console.log(req.body);
  if (req.body.demographics && req.body.consumerID)
    updateDemographics({_id:req.body.consumerID}, {$push:{demographics:req.body.demographics}}, res);
  else
    res.send(responseHelper.errorMSG('Adding a demographics requires a consumer ID and a demographics object'));
}

exports.update= function(req, res){
  console.log(req.body);
  var postbody= req.body
  if (postbody.demographicsID && postbody.consumerID){
    var updateObj={};  
    for (attribute in postbody.attributes){
        console.log(postbody.attributes[attribute]);
        updateObj["demographics.$."+postbody.attributes[attribute]["attr"]]= postbody.attributes[attribute]["value"];
    }
    console.log(updateObj);
    updateDemographics({"demographics._id":postbody.demographicsID}, {$set:updateObj}, res);
   }
  else{
    res.send(responseHelper.errorMSG('Updating a demographics requires a consumer ID and a demographics ID'));
  }
};

