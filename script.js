const perguntas = [
  { dica: "Unidade usada para contar partículas na química", rescolta: "MOL" },
  { dica: "Valor da constante de Avogadro", rescolta: "6.022E23" },
  { dica: "Massa de 1 mol de uma substância", rescolta: "MASSAMOLAR" },
];

const palavrasCertas = ["MOL", "AVOGADRO", "MASSAMOLAR"];

const areaPalavras = document.querySelector(".areaPalavras");
const linhas = 15;
const colunas = 15;

let grid = Array.from({ length: linhas }, () => Array(colunas).fill(""));

for (let i = 0; i < linhas * colunas; i++) {
  const cel = document.createElement("div");
  cel.classList.add("cel");
  areaPalavras.appendChild(cel);
}

function colocarPalavras(palavra) {

  const direcoes = [
    { dx: 1, dy: 0 }, // direita
    { dx: -1, dy: 0 }, // esquerda
    { dx: 0, dy: 1 }, // baixo
    { dx: 0, dy: -1 }, // cima
    { dx: 1, dy: 1 }, // diagonal baixo direita
    { dx: -1, dy: 1 }, // diagonal baixo esquerda
    { dx: 1, dy: -1 }, // diagonal cima direita
    { dx: -1, dy: -1 }, // diagonal cima esquerda
  ];

  let linhaC = Math.floor(Math.random() * linhas);
  let colC = Math.floor(Math.random() * colunas);
  let dir = direcoes[Math.floor(Math.random() * direcoes.length)];
  let dx = dir.dx
  let dy = dir.dy
  let cabe = true;

  for (let i = 0; i < palavra.length; i++) {
    let linha = linhaC + dy * i;
    let coluna = colC + dx * i;

    if (linha < 0 || linha >= linhas || coluna < 0 || coluna >= colunas) {
      cabe = false;
      break;
    }
  }

  if (cabe) {
    for (let i = 0; i < palavra.length; i++) {
      let linha = linhaC + dy * i;
      let coluna = colC + dx * i;

      grid[linha][coluna] = palavra[i];
    }
  } else {
    console.log("deu errado");
    colocarPalavras("MOL");
  }

  console.log(`A palavra está em:\nLinha: ${linhaC}\nColuna: ${colC}\ndx: ${dx}\ndy: ${dy}`)
}

for(let i = 0; i < palavrasCertas.length; i++){
  colocarPalavras(`${palavrasCertas[i]}`)
}


function preencherComLetras() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (grid[i][j] === "") {
        let letra = Math.floor(Math.random() * letras.length);
        grid[i][j] = letras[letra];
      }
    }
  }
}

preencherComLetras();

const celulas = document.querySelectorAll(".cel");

for (let i = 0; i < linhas; i++) {
  for (let j = 0; j < colunas; j++) {
    const index = i * linhas + j;
    celulas[index].textContent = grid[i][j];
  }
}

let selecionando = false;
let celInicial = null;

function pegarPosicao(cel) {
  const index = Array.from(celulas).indexOf(cel);
  const linha = Math.floor(index / colunas);
  const coluna = index % colunas;
  return { linha, coluna };
}

function pegarCelulaPorPosicao(linha, coluna) {
  if (linha < 0 || coluna < 0 || linha >= linhas || coluna >= colunas)
    return null;
  const index = linha * colunas + coluna;
  return celulas[index];
}

function gerarCaminho(linha1, col1, linha2, col2) {
  const dx = col2 - col1;
  const dy = linha2 - linha1;

  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const dirX = dx === 0 ? 0 : dx / Math.abs(dx);
  const dirY = dy === 0 ? 0 : dy / Math.abs(dy);

  let caminho = [];

  for (let i = 0; i <= steps; i++) {
    const linha = linha1 + dirY * i;
    const coluna = col1 + dirX * i;
    const cel = pegarCelulaPorPosicao(linha, coluna);
    if (cel) caminho.push(cel);
  }

  return caminho;
}

celulas.forEach((cel) => {
  cel.addEventListener("mousedown", () => {
    selecionando = true;
    celInicial = cel;
    cel.classList.add("selecionada");
  });

  cel.addEventListener("mouseover", () => {
    if (!selecionando || !celInicial) return;
  });

  cel.addEventListener("mouseup", () => {
    if (!selecionando || !celInicial) return;
    cel.classList.add("selecionada");

    const inicio = pegarPosicao(celInicial);
    const fim = pegarPosicao(cel);

    const caminho = gerarCaminho(
      inicio.linha,
      inicio.coluna,
      fim.linha,
      fim.coluna
    );

    // Só permite se for linha reta (horizontal, vertical ou diagonal)
    const dx = fim.coluna - inicio.coluna;
    const dy = fim.linha - inicio.linha;

    if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
      const palavraSelecionada = caminho.map((c) => c.textContent).join("");
      console.log("Palavra selecionada:", palavraSelecionada);

      if (palavrasCertas.includes(palavraSelecionada)) {
        caminho.forEach((c) => {
          c.classList.add("selecionada");
          setTimeout(() => {
            c.classList.add("achada");
            c.style.pointerEvents = "none";
          }, 500);
        });
      } else {
        caminho.forEach((c) => {
          c.classList.add("selecionada");
          setTimeout(() => c.classList.remove("selecionada"), 500);
        });
      }
    }

    selecionando = false;
    celInicial = null;
  });
});

console.log(grid);
