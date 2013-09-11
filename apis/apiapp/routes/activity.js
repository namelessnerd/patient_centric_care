var mongooseHelper= require('./mongooseHelper.js');
var responseHelper= require('./responseHelper');
var devIDChecker= require('./devIDChecker');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Demographics 
 *
 */

exports.add= function(req, res){
  var addActivity= function(checkStatus){
        if (checkStatus){
            if (req.body.payload.activity){
              var activityObj= req.body.payload.activity;
                if (activityObj.measurement){
                  if (activityObj.measurement.length<=5){
                     var activity= new mongooseHelper.getActivityModel()({
                       consumerID: req.body.consumerID,
                       activity: activityObj.activity,
                       measurement: activityObj.measurement,
                       intensity: activityObj.intensity, 
                       device: activityObj.device, 
                       when: activityObj.when, 
                       vitals:activityObj.vitals
                     });
                    mongooseHelper.saveDB(activity,function(err, response){
                      if (err){
                        console.log(err);
                        res.send(responseHelper.errorMSG('Error saving activity')); 
                      }
                      else
                        if (response)
                          res.send(responseHelper.successMSG('Successfully saved activity'));
                        else
                          res.send(responseHelper.errorMSG('Could not save activity. Please check' + 
                                                           ' the schema of the object'));
                    });
                  }// end if length of activity is less than 5
                  else{
                    res.send(responseHelper.errorActionFailed("Add","Activity","Activity has more than 5 measurements"));
                  }
                }
                else
                  res.send(responseHelper.errorActionFailed("Add","Activity","Missing measurement data in Activity"));
              }// end if activity keycheck
              else{
                res.send(responseHelper.errorActionFailed("Add","Activity","Missing attribute data in payload"));
              }// end else demographics keycheck
          }// end if developer has access to consumer record
          else{
            res.send(responseHelper.errorActionFailed("Add","Activity","Missing developer ID, consumer ID or "+
                                                      "payload attribute or bad Content-Type in header"));
          }// end else developer does not have access to consumer record
    }// end closure function addActivity
  console.log(req.get('developerID'));
  devIDChecker.check(req, addActivity); 
}

exports.update= function(req, res){
  var updateActivity= function(checkStatus){
    if (checkStatus){
      if (req.body.attributes){
        var updateObj={};  
        var attributes= req.body.attributes;
        for (attribute in attributes){
          updateObj[attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var activity= new mongooseHelper.getActivityModel();
        mongooseHelper.updateDB(activity,{_id: req.body.activityID},{$set:updateObj},{upsert:true}, 
                                function(err, response){
                                  if (err)
                                    res.send(responseHelper.errorMSG('Error updating Activity ' + err)); 
                                  else
                                    if (response)
                                      res.send(responseHelper.successMSG('Successfully updated Activity'));
                                    else
                                      res.send(responseHelper.errorMSG('Error updating Activity. Please check ' + 
                                               'the object structure you have posted.')); 
                                });
            } // end if attributes keycheck
            else{
              res.send(responseHelper.errorActionFailed("Update","Activity","Missing attribute data in payload"));
            }// end else attributes keycheck
        }// end if developer has access to consumer record
        else{
          res.send(responseHelper.errorActionFailed("Update","Activity","Missing developer ID, consumer ID or "+
                                                      "payload attribute"));
        }// end else developer does not have access to consumer record
  }// end closure function addPersonalInfo
  devIDChecker.check(req, updateActivity); 
}


exports.updateMeasurement= function(req, res){
  var updateActivity= function(checkStatus){
    if (checkStatus.status==1){
      if (req.body.activityID && req.body.measurementID && req.body.attributes){
        var updateObj={};  
        var attributes= req.body.attributes;
        for (attribute in attributes){
          updateObj["measurement.$."+attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var updateCondition={_id: req.body.activityID,"measurement._id":req.body.measurementID};
        console.log(updateCondition);
        var activity= new mongooseHelper.getActivityModel();
        mongooseHelper.updateDB(activity,updateCondition,
                                         {$set:updateObj},{upsert:false}, 
                                function(err, response){
                                  if (err)
                                    res.send(responseHelper.errorMSG('Error updating Measurement' + err)); 
                                  else
                                    if (response)
                                      res.send(responseHelper.successMSG('Successfully updated Measurement'));
                                    else
                                      res.send(responseHelper.errorMSG('Error updating Measurement. Please check ' + 
                                               'the object structure you have posted.')); 
                                });
            } // end if attributes keycheck
            else{
              res.send(responseHelper.errorActionFailed("Update","Activity","Missing attribute data in payload"));
            }// end else attributes keycheck
        }// end if developer has access to consumer record
        else{
          res.send(responseHelper.errorActionFailed("Update","Activity","Missing developer ID or  consumer ID"));
        }// end else developer does not have access to consumer record
  }// end closure function addPersonalInfo
  devIDChecker.check(req, updateActivity); 
}

exports.updateVitals= function(req, res){
  var updateActivity= function(checkStatus){
    if (checkStatus){
      if (req.body.activityID && req.body.attributes){
        var updateObj={};  
        var attributes= req.body.attributes;
        for (attribute in attributes){
          updateObj["vitals."+attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var updateCondition={_id: req.body.activityID};
        console.log(updateCondition);
        var activity= new mongooseHelper.getActivityModel();
        mongooseHelper.updateDB(activity,updateCondition,
                                         {$set:updateObj},{upsert:false}, 
                                function(err, response){
                                  if (err)
                                    res.send(responseHelper.errorMSG('Error updating Measurement' + err)); 
                                  else
                                    if (response)
                                      res.send(responseHelper.successMSG('Successfully updated Vitals'));
                                    else
                                      res.send(responseHelper.errorMSG('Error updating Vitals. Please check ' + 
                                               'the object structure you have posted.')); 
                                });
            } // end if attributes keycheck
            else{
              res.send(responseHelper.errorActionFailed("Update","Activity","Missing attribute data in payload"));
            }// end else attributes keycheck
        }// end if developer has access to consumer record
        else{
          res.send(responseHelper.errorActionFailed("Update","Activity","Missing developer ID or  consumer ID"));
        }// end else developer does not have access to consumer record
  }// end closure function addPersonalInfo
  devIDChecker.check(req, updateActivity); 
}
