import express from 'express';
import logs from './middlewares/logs';
import router from './router/router';

const app = express()
const PORT = 3001

app.use(logs('simples'));

app.use(router)

app.listen(PORT, () => {
  console.log(`Executando no endereço http://localhost:${PORT}`)
});