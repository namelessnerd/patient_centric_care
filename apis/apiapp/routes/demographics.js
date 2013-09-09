var mongooseHelper= require('./mongooseHelper.js');
var responseHelper= require('./responseHelper');
var devIDChecker= require('./devIDChecker');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Demographics 
 *
 */

exports.add= function(req, res){
  var addDemographics= function(checkStatus){
        if (checkStatus){
            if (req.body.payload.demographics){
              var consumer= new mongooseHelper.getConsumerModel();
              mongooseHelper.updateDB(consumer,{_id: req.body.consumerID},{$set:{demographics:req.body.payload.demographics}}, 
                                      {upsert:true}, function(err, response){
                                        if (err)
                                            res.send(responseHelper.errorMSG('Error updating demographic')); 
                                        else
                                            res.send(responseHelper.successMSG('Successfully updated demographic info'));
                                      });
            } // end if demographics keycheck
            else{
                res.send(responseHelper.errorMSG('Demographics data missing in payload')); 
            }// end else demographics keycheck
        }// end if developer has access to consumer record
        else{
            res.send(responseHelper.errorMSG('The developer ID you are using does not have permissions'+ 
                                             'to edit the consumer object with ID' + req.body.consumerID));
        }// end else developer does not have access to consumer record
    
    }// end closure function addDemographics
  
  if (req.body.developerID && req.body.consumerID){
    console.log(" Both IDs are present ");
    devIDChecker.check(req.body.developerID, req.body.consumerID, addDemographics);
  }
  else
    res.send(responseHelper.errorMSG('Adding demographics requires a consumer ID and a developerID'));
}

exports.update= function(req, res){
  var updateDemographics= function(checkStatus){
    if (checkStatus){
      if (req.body.payload.attributes){
        var updateObj={};  
        var attributes= req.body.payload.attributes;
        for (attribute in attributes){
          
          updateObj["demographics."+attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var consumer= new mongooseHelper.getConsumerModel();
        mongooseHelper.updateDB(consumer,{_id: req.body.consumerID},{$set:updateObj},{upsert:true}, 
                                function(err, response){
                                  if (err)
                                    res.send(responseHelper.errorMSG('Error updating demographic')); 
                                  else
                                    res.send(responseHelper.successMSG('Successfully updated demographic info'));
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
  }// end closure function addDemographics
  
  if (req.body.developerID && req.body.consumerID){
    console.log(" Both IDs are present ");
    devIDChecker.check(req.body.developerID, req.body.consumerID, updateDemographics);
  }
  else
    res.send(responseHelper.errorMSG('Updating demographics requires a consumer ID and a developerID'));
}
