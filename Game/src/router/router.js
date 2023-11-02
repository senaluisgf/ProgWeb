import express from 'express';
import areaController from '../contollers/area';
import courseController from '../contollers/course';
import dinoController from '../contollers/dino';
import mainController from '../contollers/main';
import userController from '../contollers/user';
const router = express.Router()

router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/ui', mainController.ui);

router.get('/game', dinoController.index);

router.get('/area', areaController.index);

router.get('/curso', courseController.index);
router.get('/curso/create', courseController.create);
router.post('/curso/create', courseController.create);

router.get('/curso/:id', courseController.getOne);
router.get('/curso/:id/update', courseController.update);
router.post('/curso/:id/update', courseController.update);
router.get('/curso/:id/delete', courseController.remove)

router.get('/users', userController.index);

router.use(function(req, res) {
  res.statusCode = 404;
  res.end("Page not Found")
})

export default router;