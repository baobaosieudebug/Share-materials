class IntroduceController {
    index(req, res, next) {
      res.render("introduce");
    }
}  
module.exports = new IntroduceController();