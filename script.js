const perguntas = [
  "Quantos mols existem em 36 g de água?",
  "Qual a massa de 1,5 mols de glicose (C₆H₁₂O₆)?",
  "Calcule a massa molar do etanol (C₂H₆O).",
  "Qual o número de moléculas em 0,5 mol de oxigênio?",
  "Quantas moléculas existem em 2 mols de amônia (NH₃)?",
  "Qual a massa molar do gás butano (C₄H₁₀)?",
  "Calcule a massa de 4 mols de óxido de ferro (Fe₂O₃).",
  "Calcule a massa molar da sacarose (C₁₂H₂₂O₁₁).",
  "Calcule o número de átomos em 2 mols de alumínio metálico.",
  "Quantos elétrons há em 1 mol de átomos de sódio neutros?",
  "Calcule a massa molar do ácido sulfúrico (H₂SO₄).",
  "Quantos mols há em 120 g de cálcio?"
];

const respostas = [
  "2",            // H2O: 36g / 18g/mol
  "270",          // 1,5 mol * 180g/mol
  "46",           // etanol
  "3.01e23",      // 0.5 * 6.022e23
  "1.204e24",     // 2 * 6.022e23
  "58",           // C4H10
  "639.6",        // 4 * 159.9
  "342",          // sacarose
  "1.204e24",     // 2 mol * 6.022e23
  "6.022e23",     // 1 mol de sódio → 1 elétron por átomo
  "98",           // H2SO4
  "3"             // 120 / 40 (massa molar do Ca)
];

const alternativas = [
  // 1. Quantos mols existem em 36 g de água? (36 / 18 = 2)
  ["1", "1.5", "2", "2.5", "3"],

  // 2. Qual a massa de 1,5 mols de glicose (C₆H₁₂O₆)? (1.5 * 180 = 270)
  ["270", "250", "180", "300", "330"],

  // 3. Calcule a massa molar do etanol (C₂H₆O). (2*12 + 6*1 + 1*16 = 46)
  ["44", "45", "47", "46", "48"],

  // 4. Qual o número de moléculas em 0,5 mol de oxigênio? (0.5 * 6.022e23 ≈ 3.01e23)
  ["6.022e23", "1.204e24", "3.01e23", "2e23", "4.5e23"],

  // 5. Quantas moléculas existem em 2 mols de amônia (NH₃)? (2 * 6.022e23 ≈ 1.204e24)
  ["6.022e23", "1.204e24", "2.01e23", "1e24", "2e24"],

  // 6. Qual a massa molar do gás butano (C₄H₁₀)? (4*12 + 10*1 = 48 + 10 = 58)
  ["56", "58", "60", "62", "64"],

  // 7. Calcule a massa de 4 mols de óxido de ferro (Fe₂O₃). (159.9 * 4 ≈ 639.6)
  ["620", "600", "650.7", "670", "639.6"],

  // 8. Calcule a massa molar da sacarose (C₁₂H₂₂O₁₁). (12*12 + 22*1 + 11*16 = 342)
  ["342", "340", "345", "350", "355"],

  // 9. Calcule o número de átomos em 2 mols de alumínio metálico. (2 * 6.022e23 ≈ 1.204e24)
  ["6.022e23", "1e24", "1.204e24", "2e24", "1.5e24"],

  // 10. Quantos elétrons há em 1 mol de átomos de sódio neutros? (1 mol = 6.022e23 elétrons)
  ["1e23", "3.01e23", "1e24", "9e23", "6.022e23"],

  // 11. Calcule a massa molar do ácido sulfúrico (H₂SO₄). (2*1 + 32 + 4*16 = 98)
  ["96", "98", "100", "102", "94"],

  // 12. Quantos mols há em 120 g de cálcio? (massa molar = 40 → 120 / 40 = 3)
  ["2", "2.5", "4", "3.5", "3"]
];


const modal = document.getElementById("pergunta")
const perguntaText = document.getElementById("perguntaText")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const e_text = document.getElementById("e_text")

let contador = 0
let perguntasRespondidas = 0


const palavrasCertas = [
  "agua", "glicose", "etanol", "oxigenio", "amonia", "butano", "ferro", "sacarose", "aluminio", "sodio", "acido", "calcio"
].map((palavra) => palavra.toUpperCase());

let palavrasAchadas = []

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

  let tentativas = 0;
  let maxTentativas = 100;

  while (tentativas < maxTentativas) {
    let linhaC = Math.floor(Math.random() * linhas);
    let colC = Math.floor(Math.random() * colunas);
    let dir = direcoes[Math.floor(Math.random() * direcoes.length)];
    let dx = dir.dx;
    let dy = dir.dy;
    let cabe = true;

    for (let i = 0; i < palavra.length; i++) {
      let linha = linhaC + dy * i;
      let coluna = colC + dx * i;

      if (linha < 0 || linha >= linhas || coluna < 0 || coluna >= colunas) {
        cabe = false;
        break;
      }

      // impede sobrescrever letras diferentes
      if (grid[linha][coluna] !== "" && grid[linha][coluna] !== palavra[i]) {
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
      return;
    }

    tentativas++;
  }
}

for (let i = 0; i < palavrasCertas.length; i++) {
  colocarPalavras(`${palavrasCertas[i]}`);
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

  if (palavrasCertas.includes(palavraSelecionada)) {

     document.querySelectorAll("li").forEach((li) => {
        li.classList.remove("respCerta", "respErrada");
      });

    caminho.forEach((c) => {
      c.classList.add("selecionada");
    });

      if(!palavrasAchadas.includes(palavraSelecionada)){
      setTimeout(() => {
        caminho.forEach((c) => {
        
        c.classList.add("achada");

        modal.style.display = "block";
        const indicePalavra = palavrasCertas.indexOf(palavraSelecionada);
        perguntaText.innerText = perguntas[indicePalavra];
        a_text.innerText = alternativas[indicePalavra][0];
        b_text.innerText = alternativas[indicePalavra][1];
        c_text.innerText = alternativas[indicePalavra][2];
        d_text.innerText = alternativas[indicePalavra][3];
        e_text.innerText = alternativas[indicePalavra][4];

        // Remove listeners anteriores para evitar múltiplos handlers
        const btnClone = btn.cloneNode(true);
        btn.parentNode.replaceChild(btnClone, btn);

        btnClone.addEventListener("click", (event) => {
          perguntasRespondidas++
          btnClone.disabled = true
          event.preventDefault();

          const radios = document.querySelectorAll('input[name="q1"]');
          let respostaSelecionada = null;
          let liSelecionado = null

          radios.forEach((radio) => {
            if (radio.checked) {
              const spanSelecionado = document.getElementById(`${radio.value}_text`)
              respostaSelecionada = spanSelecionado.textContent
              liSelecionado = spanSelecionado.closest("li")
            }

            setTimeout(() => {
              radio.checked = null
            }, 1000)
          });

          if (respostaSelecionada === respostas[indicePalavra]) {
            if (liSelecionado) {
              liSelecionado.classList.add("respCerta")
              contador-=-1 //brinks
              document.getElementById("pontos").innerHTML = contador
            }
          } else {
            if (liSelecionado) {
              liSelecionado.classList.add("respErrada")
              caminho.forEach((cels) => {
                cels.style.backgroundColor = "#e74c3c"
              })
            }
          }

          setTimeout(() => {
            modal.style.display = "none"
            btnClone.disabled = false

             if (palavrasAchadas.length === 12 && perguntasRespondidas === 12) {
              document.getElementById("pontuacaoFinal").innerHTML = contador
              const msg = mensagemFinal(contador)
              document.getElementById("mensagemFinal").innerText = msg
               document.getElementById("fimJogo").style.display = "flex";
             }
          }, 1000)

        });
      }, 500);
      })
    }

    if(!palavrasAchadas.includes(palavraSelecionada)){
      palavrasAchadas.push(palavraSelecionada)
    }

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

function mensagemFinal(pontuacao) {
  if (pontuacao === 12) return "🔥 Mestre supremo da sabedoria!";
  if (pontuacao >= 9) return "💪 Por detalhe hein!";
  if (pontuacao >= 6) return "😎 Dá pra melhorar!";
  if (pontuacao >= 3) return "🤔 Talvez seja bom reler a matéria...";
  return "💀 Foi sua avó apertando os botões?";
}
