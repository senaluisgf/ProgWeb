import Areas from '../repositories/area';
// import { Areas } from '../models/index';

const index = async (req, res) => {
  const areas = await Areas.findAll();
  res.render('areas', {
    // areas: areas.map(area => area.toJSON())
    areas: areas
  });
}

export default { index }