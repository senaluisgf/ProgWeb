let player = 0;
let pc = 0;
let score = 0;
let lose = 0;

while(!lose) {
  console.log('Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura');
  //recebe o numero
  player = parseInt(prompt());
  //gera numero aleatorio (de 1 a 3)
  pc = Math.floor(Math.random() * 3 + 1);

  if (player === 1) {
    if (pc === 1) { //empate
      console.log("O computador jogou Papel");
      console.log("A rodada empatou");
      continue;
    } else {
      if (pc === 2) { //jogador ganha
        console.log("O computador jogou Pedra");
        console.log("Você ganhou!");
        score++
      } else { //computador ganha
        console.log("O computador jogou Tesoura");
        console.log("Você perdeu! A sua pontuação foi de ",score);
        lose = 1;
        break;
      }
    }
  } else {
    if (player === 2) {
      if (pc === 1) { //computador ganha
        console.log("O computador jogou Papel");
        console.log("Você perdeu! A sua pontuação foi de ",score);
        lose = 1;
        break;
      } else {
        if (pc === 2) { //empate
          console.log("O computador jogou Pedra");
          console.log("A rodada empatou");
          continue;
        } else { //jogador ganha
          console.log("O computador jogou Tesoura");
          console.log("Você ganhou!");
          score++
        }
      }
    } else {
      if (player === 3) {
        if (pc === 1) { //jogador ganha
          console.log("O computador jogou Papel");
          console.log("Você ganhou!");
          score++
        } else {
          if (pc === 2) { //computador ganha
            console.log("O computador jogou Pedra");
            console.log("Você perdeu! A sua pontuação foi de ",score);
            lose = 1;
            break;
          } else { //empate
            console.log("O computador jogou Tesoura");
            console.log("A rodada empatou");
            continue;
          }
        }
      } else {
        console.log("Você perdeu! A sua pontuação foi de ",score);
        break;
      }
    }
  }
}