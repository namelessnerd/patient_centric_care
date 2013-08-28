var mongooseHelper= require('./mongooseHelper.js');
var mongoose= require('mongoose');
/*
 * Add a new consumer.
 */
exports.add= function(req, res){
  //res.render('index', { title: 'Express Home Page Reloads' });
  console.log('printing body');
  console.log(req.body);
  if (req.body.name){
    var tempArray= new mongooseHelper.getTempArrayModel(mongoose)({name:req.body.name, age:req.body.age})
    mongoose.connect('mongodb://localhost/testingDB');
    tempArray.save(function (err, tempArray){
      if(err)
        console.log('Error');
      else{
       console.log('Saved!');
       mongoose.disconnect();
      }
     });
   }
  res.send('I am sending a text instead of a template');
};

exports.get= function(req, res){

    // ID that we use for testing 
    // 521e383b4cd6090d0c000001
  //if (req.body.id){
    var tempArray= new mongooseHelper.getTempArrayModel(mongoose);
    mongoose.connect('mongodb://localhost/testingDB');
    tempArray.findOne({_id:'521e37943e0b5ef20b000001'}, function (err, result){
      if(err){
        console.log('Error');
        console.log(err);
          res.send('I am sending a text instead of a template');
      }
      else{
       console.log('Updated!');
       mongoose.disconnect();
       res.send(result.name);
      }
     });
   //}
};


exports.update= function(req, res){
    // ID that we use for testing 
    // 521e383b4cd6090d0c000001
  console.log(req.body);
  if (req.body.name){
    var tempArray= new mongooseHelper.getTempArrayModel(mongoose);
    mongoose.connect('mongodb://localhost/testingDB');
    tempArray.update({_id:req.body.id}, {$push:{name: req.body.name}},{upsert:true}, function (err, tempArray){
      if(err){
        console.log('Error');
        console.log(err);
      }
      else{
       console.log('Updated!');
       mongoose.disconnect();
      }
     });
   }
  res.send('I am sending a text instead of a template');
};
