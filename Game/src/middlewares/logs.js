const morgan = require('morgan')
function logs(tipo) {
  if(tipo === 'simples') {
    return morgan('short')
  } else if(tipo === 'completo'){
    return morgan('combined')
  }
}

export default logs