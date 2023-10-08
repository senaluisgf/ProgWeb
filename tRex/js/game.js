(function () {

  let FPS = 300;
  const HEIGHT = 300;
  const WIDTH = 1024;
  const PROB_NUVEM = 5;

  const NIVEL_1 = 500;
  const NIVEL_2 = 450;
  const NIVEL_3 = 400;
  const NIVEL_4 = 300;

  const posicoesPtero = ['170px', '190px', '240px'];

  const pequenosCactus = {
    1: {
      height:['-335px', '-360px', '-386px', '-412px', '-437px', '-463px'],
      width: '23px'
    },
    2: {
      height: ['-335px', '-360px', '-386px', '-412px', '-437px'],
      width: '50px'
    },
    3: {
      height: ['-335px', '-412px', '-360px', '-386px'],
      width: '75px'
    },
    4: {
      height: ['-335px', '-360px', '-386px'],
      width: '100px'
    },
  };

  const grandesCactus = {
    1: {
      height: ['-490px', '-527px', '-565px', '-602px', '-681px'],
      width: '35px'
    },
    2: {
      height: ['-490px', '-527px', '-565px', '-638px'],
      width: '71px'
    },
    3: {
      height: ['-490px', '-527px', '-567px', '-602px'],
      width: '110px'
    },
    4: {
      height: ['-490px'],
      width: '146px'
    },
  };

  const digitosPx = {
    0: '-970px',
    1: '-986px',
    2: '-999px',
    3: '-1015px',
    4: '-1029px',
    5: '-1044px',
    6: '-1059px',
    7: '-1075px',
    8: '-1089px',
    9: '-1105px',
    'H': '-1120px',
    'I': '-1136px',
  };

  let gameLoop;
  let scoreLoop;
  let deserto;
  let dino;
  let nuvens = [];
  let frame = 0;
  let pontuacao = [0, 0, 0, 0, 0];
  let obstaculos = [];
  let paused = false;
  let over = false;
  let tipo = '';
  let exibirObstaculo = false;
  let contador = 0;
  let nivel = 0;
  


  function init() {
    deserto = new Deserto(document);
    dino = new Dino(deserto, document);
    pontuacao = new Pontuacao(document);
    pontuacao.listarDigitos();
    pontuacao.adicionarPontos();

    window.addEventListener('keydown', function (e) {
      if (
        (e.key === 'ArrowUp'|| e.code === 'Space') &&
        dino.status === -1 &&
        !over
      ) {
        dino.status = 0;
        aumentaFrames = setInterval(function(e){      
          console.log('NIVEL:', nivel);
          nivel += 1;
          FPS += 100;
        }, 1 * 1000);
        gameLoop = setInterval(run, 1000 / FPS);
        turno = setInterval(noiteDia, 60 * 1000);
        scoreLoop = setInterval(function () {
          if (!paused && !over) {
            pontuacao.incrementar(document);
            pontuacao.listarDigitos();
          }
        }, 1000 / 15);
      }
    });
  }


  class Deserto {
    constructor() {
      this.element = document.createElement("div")
      this.element.className = "deserto";
      this.element.style.width = `${WIDTH}px`;
      this.element.style.height = `${HEIGHT}px`;
      document.getElementById("game").appendChild(this.element)

      this.chao = document.createElement("div")
      this.chao.className = "chao"
      this.chao.style.backgroundPositionX = 0;
      this.element.appendChild(this.chao)
    }
    mover() {
      this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`
    }
  }


  class Dino {
    #status
    constructor() {
      this.#status = -1; // -1: parado; 0:correndo; 1:subindo; 2: descendo; 3: agachado;
      this.alturaMinima = 2;
      this.alturaMaxima = 120;
      this.backgroundPositionsX = {
        correndo1: "-1391px",
        correndo2: "-1457px",
        pulando: "-1259px",
        agachado1: "-1653px",
        agachado2: "-1742px",
        parado: "-56px" 
      };

      this.element = document.createElement('div');
      this.element.className = 'dino';
      this.element.style.backgroundPositionX = this.backgroundPositionsX.parado;
      this.element.style.backgroundPositionY = "-2px";
      this.element.style.bottom = `${this.alturaMinima}px`

      deserto.element.appendChild(this.element);
    }
    /**
     * @param {number} value
     */
    set status(value) {
      if (value >= 0 && value <= 3) this.#status = value;
    }
    get status() {
      return this.#status;
    }
    correr() {
      if (this.#status === 0 && frame % 20 === 0){ //correndo
      this.element.style.width = '67px';
      this.element.style.height = '71px';
      this.element.style.backgroundPositionY = '-4px';
      this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.correndo1 ? this.backgroundPositionsX.correndo2 : this.backgroundPositionsX.correndo1;
      }else if (this.#status == 1) { //subindo
        this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
        this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
        if (parseInt(this.element.style.bottom) >= this.alturaMaxima) this.status = 2;
      }
      else if (this.#status == 2) { //descendo
        this.element.style.bottom = `${parseInt(this.element.style.bottom) - 1}px`;
        if (parseInt(this.element.style.bottom) <= this.alturaMinima) this.status = 0;
      } 
      else if (this.#status == 3) { //agachado
        this.element.style.width = '87px';
        this.element.style.height = '47px';
        this.element.style.backgroundPositionY = '-22px'; 
        this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.agachado1 ? this.backgroundPositionsX.agachado2 : this.backgroundPositionsX.agachado1; 
      }
    }
  }
  

  class Nuvem {
    constructor(document) {
      this.element = document.createElement('div');
      this.element.className = 'nuvem';
      this.element.style.right = '-50px';
      this.element.style.top = `${parseInt(Math.random() * 200)}px`;
      deserto.element.appendChild(this.element);
    }

    mover() {
      this.element.style.right = (parseInt(this.element.style.right) + 1) + 'px';
    }

    remover() {
      this.element.parentNode.removeChild(this.element);
    }
  }

  function run() {
    contador += 1;
    frame += 1
    if (frame === FPS) frame = 0;
    if (nivel <= 1 && contador >= NIVEL_1) {
      exibirObstaculo = true;
      contador = 0;
    } else if (nivel > 5 && contador >= NIVEL_4){
      exibirObstaculo = true;
      contador = 0;
    } else if (nivel <= 5 && contador >= NIVEL_3){
      exibirObstaculo = true;
      contador = 0;
    } else if (nivel <= 2 && contador >= NIVEL_2) {
      exibirObstaculo = true;
      contador = 0;
    }
    if (!paused) {
      deserto.mover();
      dino.correr();

      if (Math.floor(Math.random() * 1000) <= PROB_NUVEM) {
        nuvens.push(new Nuvem(document));
      }
      if(frame % 2 === 0) nuvens.forEach(function (n) {
        n.mover();
        if (n.element.style.right === `${WIDTH}px`) n.remover();
      });
      if (exibirObstaculo) {
        escolheObstaculo(document);
        exibirObstaculo = false;
      }
      obstaculos.forEach(function (o) {
        o.mover();
        if (o.element.style.right === `${WIDTH}px`) o.remover();
        if (colisao(o)) {
          over = true;
          endgame();
          clearInterval(gameLoop);
          clearInterval(turno);
          clearInterval(scoreLoop);
          clearInterval(aumentaFrames);
        };
      });
    }
  }

  class Digito {
    constructor(item, index) {
      this.valor = 0;
      this.element = document.createElement('div');
      this.element.className = 'digito';
      this.element.id = `${index}`;
      this.element.style.backgroundPositionY = '2px';
      this.element.style.backgroundPositionX = digitosPx[item];
    }
    atualizar(item) {
      this.element.style.backgroundPositionX = digitosPx[item];
    }
  }

  class Pontuacao {
    constructor() {
      this.valor = 0;
      this.element = document.createElement('div');
      this.element.className = 'pontuacao';
      deserto.element.appendChild(this.element);
    }

    zerar() {
      this.valor = 0;
    }

    listarDigitos() {
      this.lista = [];
      let pontos = this.valor.toString(10).split('');
      pontos.forEach(ponto => {
        this.lista.push(parseInt(ponto));
      });

      while (this.lista.length !== 5) {
        this.lista.unshift(0);
      }
      return this.lista;
    }

    adicionarPontos() {
      let index = 0;
      this.lista.forEach(item => {
        const ponto = new Digito(item, index);
        index = index + 1;
        this.element.appendChild(ponto.element);
      });
    }

    incrementar(document) {
      this.valor = this.valor + 1;
      this.listarDigitos();
      for (let i = 0; i < this.lista.length; i = i + 1) {
        const elemento = document.getElementById(`${i}`);
        elemento.style.backgroundPositionX = digitosPx[this.lista[i]];
      }
    }
  }

  class Obstaculo {
    constructor(document) {
      this.tipo = (Math.floor(Math.random() * (+3 - +1)) + +1 === 1) ? 'cactus' : 'peterodactilo';
    }

    mover() {
      this.element.style.right = (parseInt(this.element.style.right) + 1) + 'px';
    }

    remover() {
      this.element.parentNode.removeChild(this.element);
    }
  }
  class Cactus extends Obstaculo {
    constructor(document) {
      var index;
      super();
      this.tipo = 'cactus';
      if (nivel === 0) {
        this.quantidade = 1;
      } else if ( nivel === 1) {
        this.quantidade = Math.floor(Math.random() * (+3 - +1)) + +1  
      } else if ( nivel === 2) {
        this.quantidade = Math.floor(Math.random() * (+4 - +1)) + +1 
      } else {
        this.quantidade = Math.floor(Math.random() * (+5 - +1)) + +1 
      }
      this.tamanho = (Math.floor(Math.random() * (+3 - +1)) + +1 === 1) ? 'grande' : 'pequeno';
      if (this.quantidade >= 0) {
        this.element = document.createElement('div');
        this.element.style.right = '-50px';
        this.element.style.bottom = '0px';
        if (this.tamanho === 'pequeno') {
          index = Math.floor(Math.random() * pequenosCactus[this.quantidade].height.length);
          this.element.className = 'cactus pequeno';
          this.element.style.backgroundPositionX = pequenosCactus[this.quantidade].height[index];
          this.element.style.width = pequenosCactus[this.quantidade].width;
          deserto.element.appendChild(this.element);
        } else if (this.tamanho === 'grande') {
          index = Math.floor(Math.random() * grandesCactus[this.quantidade].height.length);
          this.element.className = 'cactus grande';
          this.element.style.backgroundPositionX = grandesCactus[this.quantidade].height[index];
          this.element.style.width = grandesCactus[this.quantidade].width;
          deserto.element.appendChild(this.element);
        }
      }
    }
  }
  class Pterodactilo extends Obstaculo {
    constructor(document) {
      super();
      var index = Math.floor(Math.random() * 3); 
      this.baixo = true;
      this.tipo = 'pterodactilo';
      this.element = document.createElement('div');
      this.element.className = 'pterodactilo';
      this.element.style.right = '-50px';
      this.element.style.top = posicoesPtero[index];
      this.element.style.backgroundPositionX = '-196px';
      this.element.style.backgroundPositionY = '-13px';
      deserto.element.appendChild(this.element);
    }

    mover() {
      this.element.style.right = (parseInt(this.element.style.right) + 1) + 'px';
      if (this.baixo) {
        this.element.style.backgroundPositionX = '-266px';
        this.element.style.backgroundPositionY = '-3px';
        this.element.style.height = '39px';
        this.baixo = false;
      } else {
        this.element.style.backgroundPositionX = '-196px';
        this.element.style.backgroundPositionY = '-13px';
        this.element.style.height = '45px';
        this.baixo = true;
      }
    }
  }

  function noiteDia() {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'black' ?
      'white': 'black';
    document.body.style.wbebkitFilter = document.body.style.wbebkitFilter === 'invert(1)' ? 
      'none' : 'invert(1)';
    document.body.style.filter = document.body.style.filter === 'invert(1)' ? 
      'none' : 'invert(1)';
  }

  function pause() {
    if (!paused) paused = true;
    else if (paused) paused = false;
  }

  function escolheObstaculo(document) {
    tipo = (Math.floor(Math.random() * 2) + 1 !== 1) ? 'cactus' : 'pterodactilo';
    if (tipo === 'cactus') {
      obstaculos.push(new Cactus(document));
    } else {
      obstaculos.push(new Pterodactilo(document));
    }
  }

  function colisao(obs) {
    const dinox = dino.element.offsetLeft;
    const dinoy = dino.element.offsetTop; 
    const dinow = dino.element.offsetWidth - 10;
    const dinoh = dino.element.offsetHeight - 5;

    const obsx = obs.element.offsetLeft;
    const obsw = obs.element.offsetWidth - 10;
    const obsh = obs.element.offsetHeight;
    const obsy = obs.element.offsetTop + 10;
    
    const colisao1 = (obsx + obsw >= dinox) && (dinox + dinow >= obsx);
    const colisao2 = (obsy + obsh >= dinoy) && (dinoy + dinoh >= obsy);

    return colisao1 && colisao2;
  }

  function endgame() {
    const element = document.createElement('div');
    element.className = 'endgame';
    element.over = document.createElement('div');
    element.over.className = 'over';
    document.querySelector('.over').style.display = 'block';
    element.restart = document.createElement('button');
    element.restart.className = 'restart';
    document.querySelector('.restart').style.display = 'block';
    dino.element.style.backgroundPositionX = '-1526px';
    dino.element.style.backgroundPositionY = '-4px';
    dino.element.style.width = '60px';
    dino.element.style.height = '66px';
    element.appendChild(element.over);
    element.appendChild(element.restart);
    document.body.appendChild(element);
    element.restart.addEventListener('click', function() {
      document.location.href = '';
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' || e.code === 'Space') document.location.href = '';
    });

  }

  window.addEventListener('keydown', function (e) {
    var key = e.key;
    if (e.repeat) {
      return;
    }
    if ((e.key === 'ArrowUp'|| e.code === 'Space') && dino.status === 0) dino.status = 1;
    if (key === 'ArrowDown' && dino.status === 0) dino.status = 3;
    if (key === 'p') pause();
  });
  window.addEventListener('keyup', function (e) {
    var key = e.key;
    if (key === 'ArrowDown' && dino.status === 3) dino.status = 0;
  });
  
  
  init();

})();