module.exports = {

  // show the home page
  showHome: (req, res) => {
    res.render('pages/home',{
      errors: req.flash('errors'),
      success: req.flash('success')
    });
  }
};
