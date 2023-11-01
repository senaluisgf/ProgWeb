import { Area } from '../models/index';
const index = async (req, res) => {
  const areas = await Area.findAll();
  res.render('areas/inde', {
    areas: areas.map(area => area.toJSON())
  });
}

export default { index }