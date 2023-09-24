function printGraph() {
  const barra1 = document.getElementById('barra1');
  const barra2 = document.getElementById('barra2');
  const barra3 = document.getElementById('barra3');
  const barra4 = document.getElementById('barra4');
  const barra5 = document.getElementById('barra5');

  const largura = document.getElementById('largura').value;

  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;
  const input3 = document.getElementById('input3').value;
  const input4 = document.getElementById('input4').value;
  const input5 = document.getElementById('input5').value;


  barra1.style.cssText = `height: ${input1}px; width: ${largura}px`
  barra2.style.cssText = `height: ${input2}px; width: ${largura}px`
  barra3.style.cssText = `height: ${input3}px; width: ${largura}px`
  barra4.style.cssText = `height: ${input4}px; width: ${largura}px`
  barra5.style.cssText = `height: ${input5}px; width: ${largura}px`
}