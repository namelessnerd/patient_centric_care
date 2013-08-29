var mongooseHelper= require('../routes/mongooseHelper');

exports.getCareplanSchema= getCareplanSchema= function(schema){

    return new schema({
      id: String,
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

exports.getVitalsObject= function(vitalObj){

  if (vitalObj.type && vitalObj.value)
      return new mongooseHelper.getVitalsModel()({
			                                     type:vitalObj.type, 
			                                     value: vitalObj.value, 
			                                     when: vitalObj.date ? vitalObj.date : Date.now,
			                                     device: vitalObj.device
		                                      });
  else
      return 0;


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
        when: Date, 
        vitals:{heartRate: Number}
    });
}


exports.personalHealthConditionSchema= getPersonalHealthConditionSchema= function (schema){
    medicalConditions=[{condition_name: String, diagnosis: String, when: Date}]
}

exports.personalHabitsSchema= getPersonalHabitsSchema= function (schema){
    personalHabits=[{habitName: String, frequency: Number}]
}

exports.getPersonalInfoSchema= getPersonalInfoSchema= function(schema){
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
        personal_info: [getPersonalInfoSchema(schema)],
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
