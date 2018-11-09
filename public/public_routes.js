const express = require('express')
const dataAccess = require(__dirname + '/data_access')
const router = express.Router()


module.exports = router

//routes
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/about', (req, res) => {
    res.render('about')
})
router.post('/login', (req, res) => {
    console.log("--------------------");
    //params.rusername = req.body.form_username;
    //params.rpassword = req.body.form_password;
    //console.log(params.rusername);
    //console.log(params.rpassword);

dataAccess.studentlogin(req.body,() =>{
if (req.body.form_username == "JSD" && req.body.form_password == "JSD123")
{
        // var paramsCall = {
        //  username: req.body.form_username || '',
        //ghuyguyguy  password: req.body.form_password || ''
        // }
        res.render('about')
}
else
{
    console.log("Login Failed");
    res.render('index')
}
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/messageSent', (req, res) => {
    res.render('messageSent')
})

router.get('/portfolioSaved', (req, res) => {
    res.render('portfolioSaved')
})

router.get('/addContent', (req, res) => {
    res.render('addContent')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/teacherlogin', (req, res) => {
    res.render('teacherlogin')
})


router.get('/slideshow', (req, res) => {
    res.render('slideshow')
})

router.get('/portfolio', (req,res)=>{
    dataAccess.getAllPortfolios((results)=>{
        res.render('allPortfolios', {portfolios: results})
    })
})

router.get('/privacy', (req, res) => {
    res.render('privacy')
})

router.get("/basicInfo", (req, res) => {
    res.render("basicInfo");
  });

router.get('/portfolio/:id', (req, res) => {
        dataAccess.getPortfolioByID(req.params.id, (result)=>{completeQuery({portfolio: result})})
        dataAccess.getSlidesByID(req.params.id, (result)=>{completeQuery({slides: result})})

        var portfolio
        var slides

        let completeQuery = (result) =>{

            if(result.portfolio != null)portfolio = result.portfolio[0]
            if(result.slides != null)slides = result.slides
            if (portfolio != null && slides != null) {
                res.render('portfolio', {portfolio: portfolio, slides: slides})
            }
        }
})

router.get('/search', (req, res) => {
    const search = require(__dirname + '/aif-search')
    var params = {
        name: req.query.name || '',
        place: req.query.place || '',
        regNum: req.query.regNum || '',
        battalion: req.query.battalion || ''
    }

    var aifResult
    var portfolioResult
    let completeQuery = (result) =>{
        if (result.portfolioResult != undefined) portfolioResult = result.portfolioResult
        if (result.aifResult != undefined) aifResult = result.aifResult
        if (portfolioResult != undefined && aifResult != undefined) {
            res.render('search', {params: params, aifResults: aifResult, portfolioResults: portfolioResult })
        }
    }
    dataAccess.portfolioSearch(params, (results)=>{completeQuery({portfolioResult: results})})
    search.search(params, (err, listings) => {
        if (err) {
            consoel.log(err)
        }else{
            completeQuery({aifResult: listings})
        }
    })
})

router.get('/editSlideshow', (req, res) => {
    res.render('editSlideshow')
})
})