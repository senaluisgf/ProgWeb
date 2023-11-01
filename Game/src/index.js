import express from 'express';
import { engine } from 'express-handlebars';
import sass from 'node-sass-middleware';

import logs from './middlewares/logs';
import router from './router/router';

const app = express()
const PORT = 3000

app.engine('handlebars', engine({
  helpers: require(`${__dirname}/../src/views/helpers/helpers`),
  layoutsDir: `${__dirname}/../src/views/layouts`,
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `src/views`);

app.use(logs('simples'));

app.use(sass({
  src: `${__dirname}/../public/scss`,
  dest: `${__dirname}/../public/css`,
  outputStyle: "compressed",
  prefix: '/css'
}));

app.use('/img', [
  express.static(`${__dirname}/../public/img`),
  express.static(`${__dirname}/../../tRex/img`),
]);
app.use('/css', [
  express.static(`${__dirname}/../public/css`),
  express.static(`${__dirname}/../../tRex/css`),
]);
app.use('/webfonts', express.static(`${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`));
app.use('/js', [
  express.static(`${__dirname}/../public/js`),
  express.static(`${__dirname}/../node_modules/bootstrap/dist/js`),
  express.static(`${__dirname}/../../tRex/js`),
]);

app.use(router)

app.listen(PORT, () => {
  console.log(`Executando no endereço http://localhost:${PORT}`)
});