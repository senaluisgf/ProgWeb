const index = (req, res) => {
  res.render('main/index');
}

const about = (req, res) => {
  res.render('main/about');
}

export default { index, about };