const users = [
  {name: 'Luis Guilherme', course: "Ciência da Computação"},
  {name: 'Rebeca Moraes', course: "Engenharia de Materiais"},
  {name: 'Eliza', course: "Ciência da Computação"},
];

const index = (req, res) => {
  res.render('users', {
    users,
    layout: false
  });
}

export default { index }