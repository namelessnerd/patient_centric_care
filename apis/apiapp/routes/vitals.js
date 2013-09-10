var mongooseHelper= require('./mongooseHelper.js');
var responseHelper= require('./responseHelper');
var devIDChecker= require('./devIDChecker');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Demographics 
 *
 */

exports.add= function(req, res){
  var addVitals= function(checkStatus){
        if (checkStatus){
            if (req.body.payload.vital){
              var vitalObj= req.body.payload.vital;
              var vitals= new mongooseHelper.getVitalsModel()({
                consumerID: req.body.consumerID,
                type: vitalObj.type, 
                value: vitalObj.value, 
                units: vitalObj.units, 
                when: vitalObj.when,
                device: vitalObj.device
              });
              console.log(vitals);
              mongooseHelper.saveDB(vitals,function(err, response){
                                        if (err){
                                            console.log(err);
                                            res.send(responseHelper.errorMSG('Error saving vitals')); 
                                        }
                                        else{
                                            console.log(response);
                                            res.send(responseHelper.successMSG('Successfully saved vitals'));
                                        }
                                      });
            } // end if demographics keycheck
            else{
                res.send(responseHelper.errorMSG('Vitals data missing in payload')); 
            }// end else demographics keycheck
        }// end if developer has access to consumer record
        else{
            res.send(responseHelper.errorMSG('The developer ID you are using does not have permissions'+ 
                                             'to edit the consumer object with ID' + req.body.consumerID));
        }// end else developer does not have access to consumer record
    
    }// end closure function addPersonalInfo
  console.log(req.body); 
  if (req.body.developerID && req.body.consumerID && req.body.payload){
    console.log(" Both IDs are present ");
    devIDChecker.check(req.body.developerID, req.body.consumerID, addVitals);
  }
  else
    res.send(responseHelper.errorMSG('Adding Vital Info requires a consumer ID ,a developerID, a payload object' + 
                                     'wrapping the object to be added'));
}

exports.update= function(req, res){
  var updateVitals= function(checkStatus){
    if (checkStatus){
      if (req.body.payload.attributes){
        var updateObj={};  
        var attributes= req.body.payload.attributes;
        for (attribute in attributes){
          updateObj[attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var vitals= new mongooseHelper.getVitalsModel();
        mongooseHelper.updateDB(vitals,{_id: req.body.vitalsID},{$set:updateObj},{upsert:true}, 
                                function(err, response){
                                  if (err)
                                    res.send(responseHelper.errorMSG('Error updating Vitals ' + err)); 
                                  else
                                    res.send(responseHelper.successMSG('Successfully updated Vitals'));
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
    devIDChecker.check(req.body.developerID, req.body.consumerID, updateVitals);
  }
  else
    res.send(responseHelper.errorMSG('Updating Vitals requires a vitals ID, consumer ID, and a developerID'));
}
