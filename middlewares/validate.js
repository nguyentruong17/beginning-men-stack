const VALIDATION_ERR_KEY = 'VALIDATION_ERR_KEY'
module.exports = (req, res, next) => {
  //console.log('validate')
  if (!req.body.title || !req.body.body) {
    const errs = []
    if(!req.body.title) errs.push('Missing Title')
    if(!req.body.body) errs.push('Missing Body')
    req.flash(VALIDATION_ERR_KEY, errs)
    return res.redirect("/posts/new");
  }
  next();
};
