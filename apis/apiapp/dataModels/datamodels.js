
exports.getCareplanSchema= getCareplanSchema= function(schema){

    return new schema({
      medication:[{
                   dosage: Number, 
                   constraint: String, 
                   frequency: Number, 
                   length:Number
                 }],
      vitals:[{
               constraint: Number, 
               frequency: Number, 
               device: String
             }],
      diet:[{
              permittedFoods:[String], 
              notPermittedFoods:[String],
              calories:Number, 
              nutrition:{
                         carbs: Number, 
                         fat: Number, 
                         protein: Number
                        }
            }],
      exercise:[{
                 intensity: String, 
                 minDuration: Number, 
                 maxDuration: Number, 
                 device: String, 
                 frequency: Number 
                }]
    });
};

exports.getVitalsSchema= getVitalsSchema=  function(schema){

    return new schema({
      id: String,
      type: String, 
      value: Number, 
      when: Date,
      device: String
    });
}

exports.getDemographicsSchema= getDemographicsSchema= function(schema){
    return new schema({  
      ethnicity: String, 
      age: Number, 
      gender: String,
      employment: String,
      industry: String
    });
}

exports.getActivitySchema= getActivitySchema= function(schema){
    return new schema({
        id: String, 
        activity: String,
        measurement: [{key:String, value: Number}],
        intensity: String, 
        device: String, 
        vitals:{heartRate: Number}
    });
}

exports.getPersonalInfoSchema= getPersonalInfo= function(schema){
    return new schema({
        first_name: String, 
        last_name: String, 
        city: String, 
        state: String, 
        date_of_birth: Date,
        username: String, 
        password: String
    });
}

exports.getConsumerSchema= function(schema){
    return new schema ({
        id: String,
        personal_info: [getPersonalInfo(schema)],
        careplan: [getCareplanSchema(schema)],
        demographics: [getDemographicsSchema(schema)],
        vitals: [getVitalsSchema(schema)],
        activity: [getActivitySchema(schema)]
    });
}


exports.getTempArraySchema= function(schema){
    return new schema({
      id:  schema.ObjectId, 
      name: [String], 
      age: [Number]
    });
}
