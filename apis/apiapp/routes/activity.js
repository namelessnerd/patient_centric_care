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
                    res.send(responseHelper.errorMSG('You cannot have more than 5 measurements for an activity'));  
                  }
                }
                else
                    res.send(responseHelper.errorMSG('You cannot save an activity without a measurement'));  
              }// end if activity keycheck
              else{
                res.send(responseHelper.errorMSG('Activity data missing in payload')); 
              }// end else demographics keycheck
          }// end if developer has access to consumer record
          else{
            res.send(responseHelper.errorMSG('The developer ID you are using does not have permissions'+ 
                                             'to edit the consumer object with ID' + req.body.consumerID));
          }// end else developer does not have access to consumer record
    }// end closure function addActivity
  
  if (req.body.developerID && req.body.consumerID && req.body.payload){
    console.log(" Both IDs are present ");
    devIDChecker.check(req.body.developerID, req.body.consumerID, addActivity);
  }
  else
    res.send(responseHelper.errorMSG('Adding activity requires a consumer ID ,a developerID, a payload object' + 
                                     'wrapping the object to be added'));
}

exports.update= function(req, res){
  var updateActivity= function(checkStatus){
    if (checkStatus){
      if (req.body.payload.attributes){
        var updateObj={};  
        var attributes= req.body.payload.attributes;
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
                res.send(responseHelper.errorMSG('No attributes to update. Please refer to update documentation.')); 
            }// end else attributes keycheck
        }// end if developer has access to consumer record
        else{
            res.send(responseHelper.errorMSG('The developer ID you are using does not have permissions'+ 
                                             'to edit the consumer object with ID' + req.body.consumerID));
        }// end else developer does not have access to consumer record
  }// end closure function addPersonalInfo
  
  if (req.body.developerID && req.body.consumerID && req.body.vitalsID){
    console.log(" Both IDs are present ");
    devIDChecker.check(req.body.developerID, req.body.consumerID, updateActivity);
  }
  else
    res.send(responseHelper.errorMSG('Updating Activity requires an activity ID, consumer ID, and a developerID'));
}
