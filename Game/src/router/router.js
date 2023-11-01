import express from 'express';
import dinoController from '../contollers/chrome-dino';
import mainController from '../contollers/main';
import userController from '../contollers/user';
const router = express.Router()

router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/ui', mainController.ui);

router.get('/game', dinoController.index);

router.get('/users', userController.index);

router.use(function(req, res) {
  res.statusCode = 404;
  res.end("Page not Found")
})

export default router;