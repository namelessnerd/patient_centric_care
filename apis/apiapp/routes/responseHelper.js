
exports.errorActionFailed= function(action, entity, reason){
    return {"status":0, "message": "Cannot perform " + action + "on "+entity + 
                        ". Most likely reason is " + reason};
}

exports.errorMSG= function(message){
    return {"status":0, "message": message};
}

exports.successMSG= function(message){
    return {"status":1, "message": message};
}

