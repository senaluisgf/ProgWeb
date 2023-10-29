import express from 'express';
import mainController from '../contollers/main';
import userController from '../contollers/user';
const router = express.Router()

router.get('/', mainController.index)
router.get('/about', mainController.about)
router.get('/ui', mainController.ui)

router.get('/users', userController.index);

router.use(function(req, res) {
  res.statusCode = 404;
  res.end("Page not Found")
})

export default router;