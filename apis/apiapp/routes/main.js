/*
 * GET home page.
 */
exports.index= function(req, res){
  //res.render('index', { title: 'Express Home Page Reloads' });
  res.send('I am sending a text instead of a template');
};

