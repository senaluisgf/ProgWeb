/*
Código particialmente correto. A função document.writeln substitui todo o conteudo do body.
Não foi usado o addEventListener
Nota: 1.2
*/

function soma() {
  let a = 0;
  let b = 0;

  a = parseInt(prompt('Digite um número'));
  b = parseInt(prompt('Digite outro número'));

  document.write(`<div>A soma entre ${a} e ${b} é igual a ${a + b}!</div>`)
}