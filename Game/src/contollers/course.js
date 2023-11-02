import { default as Courses } from '../services/course';

const index = async (req, res) => {
  const courses = await Courses.findAll();
  res.render('courses', {
    courses: courses
  })
}

const create = async (req, res) => {
  if(req.route.methods.get) {
    res.render('courses/create');
  } else {
    const { body } = req;
    const courses = await Courses.create(body);
    res.redirect('/cursos');
  }
}

const getOne = async (req, res) => {
  const { id } = req.params;
  const course = await Courses.findOne(parseInt(id))
  res.render('courses/show', course)
}

export default { index, create, getOne }