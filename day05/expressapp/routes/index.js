var express = require('express');
var router = express.Router();

const user = [
  {
    id : "aldo",
    name : "Aldo Wiratama Hersan",
    age : "20",
    nationality : "Indonesia",
    work : "Twitter Login Page, NekoCafe Site"
  },{
  id : "azu",
  name : "Azhandi Usemahu",
  age : "26",
  nationality : "Indonesia",
  work : "Weather API,  NekoCafe Site"
},{
  id : "sugata",
  name : "Sugata Stevan",
  age : "20",
  nationality : "Indonesia",
  work : "Weather API, Login Page"
},{
  id : "kane",
  name : "Liu Kane Maxwell",
  age : "20",
  nationality : "Indonesia",
  work : "Twitter Clone, JSQuery Page"
}]
var index = 1;
/* GET home page. */

router.get('/user/:id', function(req, res, next) {

  for(let i = 0 ; i < user.length ; i++){
    const foundUser = user.find((data)=>data.id === req.params.id)
    if(foundUser){
      res.render('user', { user: foundUser.name, about : `/about/${foundUser.id}` , portofolio : `/portofolio/${foundUser.id}`});
    }else {}
    res.render('error',{message:"User Not found"})
  }
});

router.get('/about/:id', function(req, res, next) {
  const foundUser = user.find((data)=>data.id === req.params.id)
  if(foundUser){
    res.render('about', { 
      name: foundUser.name,
      age : foundUser.age,
      nationality : foundUser.nationality
    });
  }else{
    res.render('error',{message:"User Not found"})
  }

});

router.get('/portofolio/:id', function(req, res, next) {
  const foundUser = user.find((data)=>data.id === req.params.id)
  if(foundUser){
    res.render('portofolio', {work : foundUser.work});
  }else {
    res.render('error',{message:"User Not found"})
  }
  
});


router.get('/', function(req, res, next) {
  res.render('index', { 
    azu : '/user/azu',
    aldo : '/user/aldo',
    sugata : '/user/sugata',
    kane : '/user/kane'
 });
});

module.exports = router;
