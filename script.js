// ACORDEÃO
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        const conteudo = botao.nextElementSibling;
        const aberto = conteudo.style.display === "block";
        conteudo.style.display = aberto ? "none" : "block";
        botao.querySelector("span").textContent = aberto ? "+" : "−";
    });
});

// QUIZ
const perguntas = [
    {pergunta: "O que caracteriza uma projeção ortogonal?",
     alternativas: ["Uma linha curva entre o objeto e o plano", "Linhas de projeção perpendiculares ao plano", "Uma imagem obrigatoriamente em perspectiva", "Uma projeção feita somente de cima"],
     correta: 1, explicacao: "Na projeção ortogonal, as linhas de projeção formam 90° com o plano."},
    {pergunta: "Qual é o ângulo entre duas retas perpendiculares?",
     alternativas: ["30°", "45°", "90°", "180°"],
     correta: 2, explicacao: "Retas perpendiculares se cruzam formando um ângulo reto, de 90°."},
    {pergunta: "Qual é a projeção de um ponto que já pertence ao plano?",
     alternativas: ["O próprio ponto", "Uma reta", "Um círculo", "Um ponto fora do plano"],
     correta: 0, explicacao: "Se o ponto já está no plano, sua projeção é ele mesmo."},
    {pergunta: "A projeção ortogonal de um segmento perpendicular ao plano é:",
     alternativas: ["Um triângulo", "Uma reta com o mesmo comprimento", "Um ponto", "Sempre um círculo"],
     correta: 2, explicacao: "Todos os pontos do segmento são projetados sobre o mesmo ponto do plano."},
    {pergunta: "Um segmento de 10 cm forma um ângulo de 60° com o plano. Qual é o comprimento de sua projeção?",
     alternativas: ["10 cm", "8 cm", "5 cm", "20 cm"],
     correta: 2, explicacao: "p = L · |cos θ| = 10 · 0,5 = 5 cm."},
    {pergunta: "Qual vista representa um objeto observado perpendicularmente de cima?",
     alternativas: ["Vista frontal", "Vista superior", "Vista lateral", "Vista em perspectiva"],
     correta: 1, explicacao: "A vista superior mostra o objeto como se fosse observado de cima."},
    {pergunta: "Qual destes elementos é essencial para uma projeção ortogonal?",
     alternativas: ["Um ângulo de 45° obrigatoriamente", "Uma linha perpendicular ao plano", "Uma superfície curva", "Uma lente de aumento"],
     correta: 1, explicacao: "A perpendicular ao plano de projeção é o que torna a projeção ortogonal."},
    {pergunta: "Um cubo apoiado sobre uma face, paralela ao plano horizontal, tem qual projeção superior?",
     alternativas: ["Um círculo", "Um triângulo", "Um quadrado", "Um pentágono"],
     correta: 2, explicacao: "A face superior é paralela ao plano, então a projeção mantém o formato de quadrado."},
    {pergunta: "Em qual área a projeção ortogonal é utilizada?",
     alternativas: ["Desenho técnico", "Arquitetura", "Engenharia", "Todas as anteriores"],
     correta: 3, explicacao: "Ela é usada em desenho técnico, arquitetura, engenharia e construção civil."},
    {pergunta: "Qual afirmação sobre projeções ortogonais é verdadeira?",
     alternativas: ["Sempre preservam todas as dimensões", "São sempre imagens em perspectiva", "Podem reduzir uma figura a um ponto ou a uma linha", "Só podem representar cubos"],
     correta: 2, explicacao: "Dependendo da posição, a projeção pode ser reduzida a um ponto ou a um segmento."}
];

let perguntaAtual = 0, pontos = 0;

function mostrarPergunta() {
    const p = perguntas[perguntaAtual];
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = p.pergunta;
    const box = document.getElementById("alternativas");
    box.innerHTML = "";
    p.alternativas.forEach((alt, i) => {
        const b = document.createElement("button");
        b.textContent = `${"ABCD"[i]}) ${alt}`;
        b.onclick = () => verificarResposta(i);
        box.appendChild(b);
    });
    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(i) {
    const p = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll("#alternativas button");
    botoes.forEach(b => b.disabled = true);
    if (i === p.correta) {
        botoes[i].classList.add("correta");
        document.getElementById("feedback").textContent = "Resposta correta! " + p.explicacao;
        pontos++;
    } else {
        botoes[i].classList.add("errada");
        botoes[p.correta].classList.add("correta");
        document.getElementById("feedback").textContent = "Resposta incorreta. " + p.explicacao;
    }
    const prox = document.getElementById("proxima");
    prox.textContent = perguntaAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
    prox.style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    perguntaAtual < perguntas.length ? mostrarPergunta() : mostrarResultado();
}

function mostrarResultado() {
    const msg = pontos === perguntas.length ? "Excelente! Você acertou todas!"
              : pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";
    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id="refazer" onclick="refazerQuiz()">Refazer quiz</button>`;
}

function refazerQuiz() {
    perguntaAtual = 0; pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p><h3 id="pergunta"></h3><div id="alternativas"></div>
        <p id="feedback"></p><button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>`;
    mostrarPergunta();
}

if (document.getElementById("quiz-container")) mostrarPergunta();
