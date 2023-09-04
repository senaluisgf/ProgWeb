let player = 0;
let pc
let cont = 0;
let win = 1;

while(win) {
  //recebe o numero
  player = parseInt(prompt());
  //gera numero aleatorio

  if (player === 1) {
    if (pc === 1) { //empate
      continue;
    } else {
      if (pc === 2) { //jogador ganha
        cont++
      } else { //computador ganha
        win = 0;
      }
    }
  } else {
    if (player === 2) {
      if (pc === 1) { //computador ganha
        win = 0;
      } else {
        if (pc === 2) { //empate
          continue;
        } else { //jogador ganha
          cont++
        }
      }
    } else {
      if (pc === 1) { //jogador ganha
        cont++
      } else {
        if (pc === 2) { //computador ganha
          win = 0;
        } else { //empate
          continue;
        }
      }
    }
  }
}