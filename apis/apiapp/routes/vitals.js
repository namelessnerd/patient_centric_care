var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
var responseHelper= require('./responseHelper');
var dataModels= require('../datamodels/datamodels.js');

/*
 * Update Vitals
 *
 */

function updateVital(updateCondition, updateValue){
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    console.log(updateCondition);
    console.log(updateValue);
    mongooseHelper.updateDB(consumer, updateCondition, updateValue,{upsert:true}, function (err, vitals){
        if (err){
            console.log(err);
            return 0;
        }
        else{
            console.log(responseHelper.successMSG(vitals));
            return 1;
        }
    });

}

exports.add= function(req, res){
  console.log(req.body);
  if (req.body.vitals && req.body.consumerID){
    var vitals= dataModels.getVitalsObject(req.body.vitals);
    if (vitals){
        if (updateVital({_id:req.body.consumerID}, {$push:{vitals:vitals}})){
            res.send(responseHelper.successMSG('Vitals added'));
        }
    }
    else
        res.send(responseHelper.errorMSG('Adding a vital requires a valid vital object. Check that you have both the type and value for the vital.'));
  }
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
    var consumer= new mongooseHelper.getConsumerModel(mongoose);
    mongooseHelper.updateDB(consumer, {"vitals._id":postbody.vitalsID}, {$set:updateObj},{upsert:true}, function (err, vitals){
      if(err){
        console.log('Error');
        console.log(err);
      }
      else{
       console.log('Updated!');
        res.send(responseHelper.successMSG(vitals));
      }
     });
   }
  else{
    res.send(responseHelper.errorMSG('Updating a vital requires a consumer ID and a vitals ID'));
  }
};

