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
        if (checkStatus.status==1){
            if (req.body.vital){
              var vitalObj= req.body.vital;
              var vitals= new mongooseHelper.getVitalsModel()({
                consumerID: req.get('ConsumerID'),
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
                                            res.send(responseHelper.successMSG(response));
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
     devIDChecker.check(req, addVitals); 
}

exports.update= function(req, res){
  var updateVitals= function(checkStatus){
    if (checkStatus.status){
      if (req.body.attributes){
        var updateObj={};  
        var attributes= req.body.attributes;
        for (attribute in attributes){
          updateObj[attributes[attribute]["attributeName"]]= attributes[attribute]["newValue"];
        }
        console.log(updateObj);
        var vitals= new mongooseHelper.getVitalsModel();
        mongooseHelper.updateDB(vitals,{_id: req.body.vitalID},{$set:updateObj},{upsert:true}, 
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
  
    devIDChecker.check(req, updateVitals);  
}

exports.delete= function(req, res){
  var deleteVitals= function(checkStatus){
    if (checkStatus.status==1){
      var vitalID= req.params.vitalID;
      console.log(vitalID + ' is the vital that will be deleted');
      if (vitalID){

        mongooseHelper.deleteFromDB( new mongooseHelper.getVitalsModel(), vitalID, function(err, message){
          if (!err){
            res.send(responseHelper.successMSG('Successfully deleted the Vital record'));
          }
          else{
            res.send(responseHelper.errorMSG('Error deleting Vital record' + err));
          }
        }); // end delete callback
      }// vital present. delete it
      else{
        res.send(responseHelper.errorMSG('You are trying to delete a Vital, but did not send a VitalID'));
      }// send payload missing error
    }// user has access. go ahead and delete the record
    else if (checkStatus.status==-1){
      res.send(responseHelper.errorMSG('You are trying to delete a Vital, but do not have access to the consumer record'));
    }
    else if (checkStatus.status==-2){
      res.send(responseHelper.errorMSG('Error in HTTP packet sent to server. Either the content type is wrong (for post or put) or you missed a field'));
    }
  }// end deleteVitals closure anon
  devIDChecker.check(req, deleteVitals);

}

exports.get= function(req, res){
    var queryObj=1;
  console.log( Object.keys(req.query).length);
  if (Object.keys(req.query).length){
     queryObj= req.query['values'];
  }

    if (queryObj)
      try{
        queryObj= JSON.parse(queryObj);
      }
      catch (e){
        res.send('Error parsing inputs');
      }
    else
      queryObj={}
    var consumer= new mongooseHelper.getVitalsModel();
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
