import Areas from './area';

const courses = [
//   {id: 1, cod: "IE07", name: "Ciencia da Computação", areaId: 1, description: 'ementa do curso'},
//   {id: 2, cod: "IE08", name: "Engenharia da Computação", areaId: 3, description: 'ementa do curso'}
]
let count = courses.length

async function findAll() {
  return await courses;
}

async function findOne(id) {
  const course = courses.find(c => c.id === id);
  if (course){
    const {areaId} = course;
    const area = await Areas.findOne(parseInt(areaId));

    return {
      id: course.id,
      name: course.name,
      cod: course.cod,
      area: area.name,
      description: course.description,
    }
  } else {
    return null
  }
}

async function create(body) {
  const course = {
    id: count + 1,
    name: body.name,
    areaId: body.areaId,
    cod: body.cod,
    description: body.description,
  }
  count++
  await courses.push(course);
  return courses;
}

export default { findAll, findOne, create }