import express from 'express';
import { engine } from 'express-handlebars';

import logs from './src/middlewares/logs';
import router from './src/router/router';

const app = express()
const PORT = 3000

app.engine('handlebars', engine({
  helpers: require(`${__dirname}/src/views/helpers/helpers`)
}));
app.set('view engine', 'handlebars');
app.set('views', `src/views`);

app.use(logs('simples'));

app.use(router)

app.listen(PORT, () => {
  console.log(`Executando no endereço http://localhost:${PORT}`)
});