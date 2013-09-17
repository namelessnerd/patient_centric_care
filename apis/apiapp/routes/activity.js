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
            if (req.body.activity){
              var activityObj= req.body.activity;
                if (activityObj.measurement){
                  if (activityObj.measurement.length<=5){
                     var activity= new mongooseHelper.getActivityModel()({
                       consumerID: req.get('consumerID'),
                       activityCategory: activityObj.activityCategory,
                       activityType: activityObj.activityType,
                       measurement: activityObj.measurement,
                       intensity: activityObj.intensity, 
                       device: activityObj.device, 
                       when: activityObj.when 
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

exports.delete= function(req, res){
  var deleteActivity= function(checkStatus){
    if (checkStatus.status==1){
      var activityID= req.params.activityID;
      console.log(activityID + ' is the activity that will be deleted');
      if (activityID){
        mongooseHelper.deleteFromDB( new mongooseHelper.getActivityModel(), activityID, function(err, message){
          if (!err){
            res.send(responseHelper.successMSG('Successfully deleted the Activity record'));
          }
          else{
            res.send(responseHelper.errorMSG('Error deleting Activity record' + err));
          }
        }); // end delete callback
      }// vital present. delete it
      else{
        res.send(responseHelper.errorMSG('You are trying to delete a Activity, but did not send a ActivityID'));
      }// send payload missing error
    }// user has access. go ahead and delete the record
    else if (checkStatus.status==-1){
      res.send(responseHelper.errorMSG('You are trying to delete a Activity, but do not have access to the consumer record'));
    }
    else if (checkStatus.status==-2){
      res.send(responseHelper.errorMSG('Error in HTTP packet sent to server. Either the content type is wrong (for post or put) or you missed a field'));
    }
  }// end deleteVitals closure anon
  devIDChecker.check(req, deleteActivity);
}


exports.get= function(req, res){
  var queryObj=1;
  console.log( Object.keys(req.query).length);
  if (Object.keys(req.query).length){
     queryObj= req.query['values'];
  }
    console.log(req.query);
    console.log("Before try" + queryObj);
    if (queryObj)
      try{
        queryObj= JSON.parse(queryObj);
        console.log("In try " + queryObj);
      }
      catch (e){
        res.send('Error parsing inputs');
      }
    else
        res.send('Error parsing inputs');
    //if ('consumerID' in queryObj)

      //  console.log('ID Found');
    console.log(queryObj);
    var consumer= new mongooseHelper.getActivityModel();
    //consumer.find(queryObj, function (err, result){
    consumer.find(queryObj, function (err, result){
      if(err){
        console.log('Error');
        console.log(err);
      }else{
       console.log('Got it!');
       res.send(result);
      }
    });
};
