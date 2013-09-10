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
            if (req.body.demographics){
              var consumer= new mongooseHelper.getConsumerModel();
              mongooseHelper.updateDB(consumer,{_id: req.get('consumerID')},{$set:{demographics:req.body.demographics}}, 
                                      {upsert:true}, function(err, response){
                                        if (err)
                                            res.send(responseHelper.errorMSG('Error updating Demographic')); 
                                        else
                                          if (response){
                                            res.send(responseHelper.successMSG('Successfully added Demographic info'));
                                          }
                                          else
                                            res.send(responseHelper.errorActionFailed("Add", "Demographics", 
                                                     "Incorrect schema"));
                                      });
            } // end if demographics keycheck
            else{
              res.send(responseHelper.errorActionFailed("Add","Demographics","Missing Demographic data"));
            }// end else demographics keycheck
        }// end if developer has access to consumer record
         else if (checkStatus.status==0){
          console.log('id server responded with an error');
          res.send(responseHelper.errorActionFailed("Add","Demographics","The developerID you sent is not valid."));
        }// end else developer does not have access to consumer record
        else if (checkStatus.status==-1){
          console.log('id server responded with an error');
          res.send(responseHelper.errorActionFailed("Add","Demographics","You do not have permissions to edit" + 
                                                " the consumer object. Please check your developer and consumerIDs"));
        }// end else developer does not have access to consumer record
        else if (checkStatus.status==-2){
          console.log('id server responded with an error');
          res.send(responseHelper.errorActionFailed("Add","Demographics","Missing developer ID or consumer ID"));
        }// end else developer does not have access to consumer record
    }// end closure function addDemographics
  devIDChecker.check(req, addDemographics);
}

exports.update= function(req, res){
  var updateDemographics= function(checkStatus){
    if (checkStatus){
      if (req.body.attributes){
        var updateObj={};  
        var attributes= req.body.attributes;
        for (attribute in attributes){
          updateObj["demographics."+attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var consumer= new mongooseHelper.getConsumerModel();
        mongooseHelper.updateDB(consumer,{_id: req.get('consumerID')},{$set:updateObj},{upsert:true}, 
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
            res.send(responseHelper.errorActionFailed("Update","demographics","Missing developer ID or consumer ID"));
        }// end else developer does not have access to consumer record
  }// end closure function addDemographics
  console.log(" Both IDs are present ");
  devIDChecker.check(req, updateDemographics);
}
