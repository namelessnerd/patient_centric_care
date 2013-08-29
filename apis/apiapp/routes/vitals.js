var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
var responseHelper= require('./responseHelper');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Vitals
 *
 */

function updateVital(updateCondition, updateValue, res){
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    console.log(updateCondition);
    console.log(updateValue);

    var updateFunction= function(err, updateResponse){
          if (err)
            res.send(responseHelper.errorMSG('Adding a vital requires a consumer ID and a vital object'));
          else
            res.send(responseHelper.successMSG('Added a vitals object'));
        }
    mongooseHelper.updateDB(consumer, updateCondition, updateValue,{upsert:true}, updateFunction);

}

exports.add= function(req, res){
  console.log(req.body);
  if (req.body.vitals && req.body.consumerID)
        updateVital({_id:req.body.consumerID}, {$push:{vitals:req.body.vitals}}, res);
  else
    res.send(responseHelper.errorMSG('Adding a vital requires a consumer ID and a vital object'));
}

exports.update= function(req, res){
  console.log(req.body);
  var postbody= req.body
  // b.consumers.update({"vitals._id": ObjectId('521e997061dc6da30f000011')},{$set:{"vitals.$.device":"beuer"}}, {upsert: true});
  if (postbody.vitalsID && postbody.consumerID){
    var updateObj={};  
    for (attribute in postbody.attributes){
        console.log(postbody.attributes[attribute]);
        updateObj["vitals.$."+postbody.attributes[attribute]["attr"]]= postbody.attributes[attribute]["value"];
    }
    console.log(updateObj);
    updateVital({"vitals._id":postbody.vitalsID}, {$set:updateObj}, res);
    /*var consumer= new mongooseHelper.getConsumerModel(mongoose);
    mongooseHelper.updateDB(consumer, {"vitals._id":postbody.vitalsID}, {$set:updateObj},{upsert:true}, function (err, vitals){
      if(err){
        console.log('Error');
        console.log(err);
      }
      else{
       console.log('Updated!');
        res.send(responseHelper.successMSG(vitals));
      }
     });*/
   }
  else{
    res.send(responseHelper.errorMSG('Updating a vital requires a consumer ID and a vitals ID'));
  }
};

