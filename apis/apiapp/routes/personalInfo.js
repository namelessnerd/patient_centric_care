var mongooseHelper= require('./mongooseHelper.js');
var responseHelper= require('./responseHelper');
var devIDChecker= require('./devIDChecker');
var dataModels= require('../dataModels/datamodels.js');

/*
 * Update Demographics 
 *
 */

exports.add= function(req, res){
  var addPersonalInfo= function(checkStatus){
        if (checkStatus){
            if (req.body.payload.personalInfo){
              var consumer= new mongooseHelper.getConsumerModel();
              mongooseHelper.updateDB(consumer,{_id: req.get('consumerID')},{$set:{personal_info:req.body.payload.personalInfo}}, 
                                      {upsert:true}, function(err, response){
                                        if (err)
                                            res.send(responseHelper.errorMSG('Error updating Personal Info')); 
                                        else
                                            res.send(responseHelper.successMSG('Successfully added Personal Info'));
                                      });
            } // end if demographics keycheck
            else{
              res.send(responseHelper.errorActionFailed("Add","Personal Info","Missing Personal Info data in payload"));
            }// end else demographics keycheck
        }// end if developer has access to consumer record
        else if (checkStatus.status==0){
          console.log('id server responded with an error');
          res.send(responseHelper.errorActionFailed("Add","Personal Info","The developerID you sent is not valid."));
        }// end else developer does not have access to consumer record
        else if (checkStatus.status==-1){
          console.log('id server responded with an error');
          res.send(responseHelper.errorActionFailed("Add","Personal Info","You do not have permissions to edit" + 
                                                " the consumer object. Please check your developer and consumerIDs"));
        }// end else developer does not have access to consumer record
        else if (checkStatus.status==-2){
          console.log('id server responded with an error');
          res.send(responseHelper.errorActionFailed("Add","Personal Info","Missing developer ID, consumer ID or "+
                                                      "payload attribute"));
        }// end else developer does not have access to consumer record

            
    }// end closure function addPersonalInfo
  devIDChecker.check(req,  addPersonalInfo);
}

exports.update= function(req, res){
  var updatePersonalInfo= function(checkStatus){
    if (checkStatus.status==1){
      if (req.body.payload.attributes){
        var updateObj={};  
        var attributes= req.body.payload.attributes;
        for (attribute in attributes){
          updateObj["personal_info."+attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var consumer= new mongooseHelper.getConsumerModel();
        mongooseHelper.updateDB(consumer,{_id: req.get('consumerID')},{$set:updateObj},{upsert:true}, 
          function(err, response){
            if (err){
              console.log(err);  
              res.send(responseHelper.errorMSG('Error updating Personal Info')); 
            }
            else{
              console.log(response);
              res.send(responseHelper.successMSG('Successfully updated Personal Info'));
            }
          });
      } // end if attributes keycheck
      else{
        res.send(responseHelper.errorActionFailed("Update","Personal Info","Missing attribute data in payload"));
      }// end else attributes keycheck
    }// end if developer has access to consumer record
    else if (checkStatus.status==0){
      console.log('id server responded with an error');
      res.send(responseHelper.errorActionFailed("Update","Personal Info","The developerID you sent is not valid."));
    }// end else developer does not have access to consumer record
    else if (checkStatus.status==-1){
      console.log('id server responded with an error');
      res.send(responseHelper.errorActionFailed("Update","Personal Info","You do not have permissions to edit" + 
                                                " the consumer object. Please check your developer and consumerIDs"));
    }// end else developer does not have access to consumer record
    else if (checkStatus.status==-2){
      console.log('id server responded with an error');
      res.send(responseHelper.errorActionFailed("Update","Personal Info","Missing developer ID, consumer ID or "+
                                                      "payload attribute"));
    }// end else developer does not have access to consumer record
  }// end closure function addPersonalInfo
  devIDChecker.check(req,  updatePersonalInfo);
}
