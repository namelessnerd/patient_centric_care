
exports.errorMSG= function(message){
    return {"status":"Error", "reason": message};
}

exports.successMSG= function(message){
    return {"status":"success", "value": message};
}
