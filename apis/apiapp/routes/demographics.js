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
                                          if (response){
                                            res.send(responseHelper.successMSG('Successfully added demographic info'));
                                          }
                                          else
                                            res.send(responseHelper.errorActionFailed("Add", "demographics", 
                                                     "Incorrect schema"));
                                      });
            } // end if demographics keycheck
            else{
              res.send(responseHelper.errorActionFailed("Add","demographics","Missing Demographic data in payload"));
            }// end else demographics keycheck
        }// end if developer has access to consumer record
        else{
            res.send(responseHelper.errorActionFailed("Add","demographics","Missing developer ID, consumer ID or "+
                                                      "payload attribute"));
        }// end else developer does not have access to consumer record
    
    }// end closure function addDemographics
  devIDChecker.check(req, addDemographics);
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
                                  else{
                                    if (response){
                                      res.send(responseHelper.successMSG('Successfully updated demographic info'));
                                    }
                                    else
                                      res.send(responseHelper.errorActionFailed("Update", "demographics", "Incorrect schema"));
                                
                                  }
                                });
            } // end if attributes keycheck
            else{
                res.send(responseHelper.errorMSG('No attributes to update. Please refer to update documentation.')); 
            }// end else attributes keycheck
        }// end if developer has access to consumer record
        else{
            res.send(responseHelper.errorActionFailed("Update","demographics","Missing developer ID, consumer ID or "+
                                                      "payload attribute"));
        }// end else developer does not have access to consumer record
  }// end closure function addDemographics
  console.log(" Both IDs are present ");
  devIDChecker.check(req, updateDemographics);
}
