
exports.getCareplanSchema= function(schema){
    return new schema({
      consumerID: String,
      medication:[{
          name: String, 
          dosage: {quantity: Number, unit: String},
          constraint: String, 
          repeatsWhen: {frequency: Number, unit: String},  
          repeatsFor: { length:Number, unit: String}
      }],
      vitals:[{
               constraint: Number, 
               frequency: Number, 
               repeatsWhen: {frequency: Number, unit: String},  
               repeatsFor: { length:Number, unit: String},
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
                 repeatsWhen: {frequency: Number, unit: String},  
                 repeatsFor: { length:Number, unit: String}
                }]
    });
};

exports.getVitalsSchema= function(schema){
    return new schema({
      consumerID: String,
      type: String, 
      value: Number, 
      unit: String, 
      when: Date,
      device: String
    });
}

exports.getActivitySchema= getActivitySchema= function(schema){
    return new schema({
        consumerID: String,
        activityCategory: String,
        activityType: String,
        measurement: [{name:String, value: Number, unit: String}],
        intensity: String, 
        device: String, 
        when: Date 
        //vitals:{heartRate: Number}
    });
}
// to be deleted

exports.getPersonalHealthConditionSchema=  function (schema){
    return new schema ({ 
      consumerID: String, 
      condition_name: String, 
      diagnosis: String, 
      when: Date
    });
}

exports.getPersonalHabitsSchema = function (schema){
    return new schema ({ 
      consumerID: String,
      habitName: String, 
      frequency: Number 
    });
}

exports.getDeveloperSchema= function (schema){
    return new schema ({ 
      developerID: String, 
      consumerID: [String]
    });
}

// changing the consumer model to not store vitals, activities, and such as a list. 
exports.getConsumerSchema= function(schema){
    return new schema ({
        personal_info: {
                        first_name: String, 
                        last_name: String, 
                        city: String, 
                        state: String, 
                        date_of_birth: Date,
                        age: Number, 
                        username: String, 
                        password: String
                       },
        demographics: {  
                       ethnicity: String, 
                       gender: String,
                       employment: String,
                       industry: String
                      }
            });
}


