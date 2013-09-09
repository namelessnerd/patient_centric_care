var mongooseHelper= require('./mongooseHelper.js');
var responseHelper= require('./responseHelper');
var devIDChecker= require('./devIDChecker');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Demographics 
 *
 */

exports.add= function(req, res){
  var addCarePlan= function(checkStatus){
        if (checkStatus){
            if (req.body.payload.carePlan){
              var carePlanObj= req.body.payload.carePlan;
              console.log(carePlanObj);
              var carePlan= new mongooseHelper.getCarePlanModel()({
                consumerID: req.body.consumerID,
                medication: carePlanObj.medication, 
                vitals: carePlanObj.vitals, 
                diet: carePlanObj.diet, 
                exercise: carePlanObj.exercise
              });
              console.log(carePlan);
              mongooseHelper.saveDB(carePlan,function(err, response){
                                        if (err){
                                            console.log(err);
                                            res.send(responseHelper.errorMSG('Error saving carePlan')); 
                                        }
                                        else
                                            res.send(responseHelper.successMSG('Successfully saved carePlan'));
                                      });
            } // end if demographics keycheck
            else{
                res.send(responseHelper.errorMSG('CarePlan data missing in payload')); 
            }// end else demographics keycheck
        }// end if developer has access to consumer record
        else{
            res.send(responseHelper.errorMSG('The developer ID you are using does not have permissions'+ 
                                             'to edit the consumer object with ID' + req.body.consumerID));
        }// end else developer does not have access to consumer record
    
    }// end closure function addPersonalInfo
  
  if (req.body.developerID && req.body.consumerID){
    console.log(" Both IDs are present ");
    devIDChecker.check(req.body.developerID, req.body.consumerID, addCarePlan);
  }
  else
    res.send(responseHelper.errorMSG('Adding Personal Info requires a consumer ID and a developerID'));
}

exports.update= function(req, res){
  var updateCarePlan= function(checkStatus){
    if (checkStatus){
      if (req.body.payload.attributes){
        var updateObj={};  
        var attributes= req.body.payload.attributes;
        for (attribute in attributes){
          updateObj[attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var carePlan= new mongooseHelper.getCarePlanModel();
        mongooseHelper.updateDB(carePlan,{_id: req.body.carePlanID},{$set:updateObj},{upsert:true}, 
                                function(err, response){
                                  if (err)
                                    res.send(responseHelper.errorMSG('Error updating CarePlan ' + err)); 
                                  else{
                                    console.log("response message on a non error update" + response);
                                    res.send(responseHelper.successMSG('Successfully updated CarePlan'));
                                  }
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
  
  if (req.body.developerID && req.body.consumerID && req.body.carePlanID){
    console.log(" Both IDs are present ");
    devIDChecker.check(req.body.developerID, req.body.consumerID, updateCarePlan);
  }
  else
    res.send(responseHelper.errorMSG('Updating CarePlan requires a carePlan ID, consumer ID, and a developerID'));
}
