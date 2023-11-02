import Courses from '../services/course';

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
    await Courses.create(body);
    res.redirect('/curso');
  }
}

const update = async (req, res) => {
  if(req.route.methods.get) {
    const { id } = req.params;
    const course = await Courses.findOne(parseInt(id))
    res.render('courses/update', course);
  } else {
    const { id } = req.params
    const { body } = req;
    await Courses.update(parseInt(id), body);
    res.redirect('/curso/'+id);
  }
}

const remove = async (req, res) => {
  const { id } = req.params;
  await Courses.remove(parseInt(id));
  res.redirect('/curso')
}

const getOne = async (req, res) => {
  const { id } = req.params;
  const course = await Courses.findOne(parseInt(id))
  res.render('courses/show', course)
}

export default { index, create, getOne, update, remove }