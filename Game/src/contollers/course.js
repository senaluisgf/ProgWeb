const create = (req, res) => {
  if(req.route.methods.get) {
    res.render('courses/create');
  } else {
    res.send('Salvou')
  }
}

const getOne = (req, res) => {
  res.render('courses/show', {
    name: 'Ciência da Computação',
    sigla: 'IE07',
    description: 'Ementa do curso',
    area: 'Ciências Exatas'
  })
}

export default { create, getOne }