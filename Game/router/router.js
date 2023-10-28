import express from 'express';
import userController from '../contollers/user';
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Home Page')
});

router.get('/about', (req, res) => {
  res.send('About')
});

router.get('/users', userController.index);

router.use(function(req, res) {
  res.statusCode = 404;
  res.end("Page not Found")
})

export default router;