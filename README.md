Patient Centric Care
====================





Vitals
=======

>> #### Updating a vital 
   The end point for updating a vital is _/update/vitals_.
           ```javascript
            {{
              "consumerID": "52290e1c436f838a24000006",
    "developerID": "123",
    "vitalsID": "522a8b88857d93d028000006",
    "payload": {
        "attributes": [{
            "attributeName": "value",
            "newValue": 115
        }, {
            "attributeName": "device",
            "newValue": "Beuer"
        }]
    }
}
            ```
   
  
>> #### Data objectives of the app

>>> * Care plan objectives should be synced with the provider via API
>>> * Collect / allow for completion demographic data if not already available in the care plan. 
>>> * Lifestyle data via APIs
>>> * Checkins we want to get: 
         1. Medication checkin
         2. Sync with exercise app for exercise checkin
         3. Food nutrition data either via MyFitnessPal (if things go through) or via a mock API
         4. Mood information based on checkin (asking questions about how users are feeling)
         5. Share information button with support group
         
>> #### Screens and Dashboards to create for user information 

>>>    * MyHealth showing key stats from medical records 

>>>    * MyCarePlan  showing 
       * Next upcoming checkin
       * Care plan adherence analytics to the user 
       * Relative analytics with respect to demographics, support network (_nice to have_)
    * Support network  
       * Show people that are supporting them 
       * Show people the user is supporting 
         * Tap on the profile to view more information (_nice to have_)
         
>> #### Screens

   >>> ##### Where are the design files for the screens?
   
>> #### Data and Control flows


