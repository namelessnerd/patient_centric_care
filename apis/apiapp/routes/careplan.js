var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
var responseHelper= require('./responseHelper');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update careplan
 *
 */

function updateCareplan(updateCondition, updateValue, res){
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    console.log(updateCondition);
    console.log(updateValue);

    var updateFunction= function(err, updateResponse){
          if (err)
            res.send(responseHelper.errorMSG('Adding a careplan requires a consumer ID and a careplan object'));
          else
            res.send(responseHelper.successMSG('Added a careplan object'));
        }
    mongooseHelper.updateDB(consumer, updateCondition, updateValue,{upsert:true}, updateFunction);

}

exports.add= function(req, res){
  console.log(req.body);
  if (req.body.careplan && req.body.consumerID)
    updateCareplan({_id:req.body.consumerID}, {$push:{careplan:req.body.careplan}}, res);
  else
    res.send(responseHelper.errorMSG('Adding a careplan requires a consumer ID and a careplan object'));
}

exports.update= function(req, res){
  console.log(req.body);
  var postbody= req.body
  if (postbody.careplanID && postbody.consumerID){
    var updateObj={};  
    for (attribute in postbody.attributes){
        console.log(postbody.attributes[attribute]);
        updateObj["careplan.$."+postbody.attributes[attribute]["attr"]]= postbody.attributes[attribute]["value"];
    }
    console.log(updateObj);
    updateCareplan({"careplan._id":postbody.careplanID}, {$set:updateObj}, res);
   }
  else{
    res.send(responseHelper.errorMSG('Updating a careplan requires a consumer ID and a careplan ID'));
  }
};

