window.onload = new function() {

	var som = document.getElementById("audio");
	var iniciar = 0;
	var desespero = [1, 2];

	var contador = 0;
	var notas = [];
	var pontos = 0;
	var comboMax = [];

	var btt = 0;
	var err = 0;
	var acc = 0;
	var combo = 0;
 
	// ----------- PODE IGNORAR ESSE TRECHO ---------------- //

	var botao = document.getElementById("key1");
	var posKey = botao.getBoundingClientRect();

	// ----------------------------------------------------- //

	var acertos = document.getElementById("acertos");
	var contagem = document.getElementById("contagem");
	var erros = document.getElementById("erros");
	var combos = document.getElementById("combos");
	var comboM = document.getElementById("maxCombo");

	function criarDiv() {
		contador++;
		var newNote = document.createElement("div");
		newNote.classList.add("beat");
		
		var i = Math.floor(Math.random() * 4) + 1;

		if (contador % 2 == 0){
			var teste = [];
			var piano = document.getElementById("noteMove" + i);
			newNote.innerHTML = contador + "";
			piano.appendChild(newNote);
			teste.push(newNote, i);
			notas.push(teste);

			console.log(botao);
		} 

		i = 0;
	}

	document.addEventListener("keydown", (e) => {
		if (!e.repeat) {
			if (e.key === "D" || e.key === "d") {
				btt = 1;
				key1.style.backgroundColor = "black";
				console.log("Tecla D pressionada!");
			} else if (e.key === "F" || e.key === "f") {
				btt = 2;
				console.log("Tecla F pressionada!");
					key2.style.backgroundColor = "black";
			} else if (e.key === "J" || e.key === "j") {
				btt = 3;
				console.log("Tecla J pressionada!");
					key3.style.backgroundColor = "black";
			} else if (e.key === "K" || e.key === "k") {
				btt = 4;
				console.log("Tecla K pressionada!");
				key4.style.backgroundColor = "black";
			}
		} else {
			btt =0;
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.key === "D" || e.key === "d") {
			btt = 0;
			console.log("Tecla D pressionada!");
			key1.style.backgroundColor = "var(--cor3)";
		} else if (e.key === "F" || e.key === "f") {
			btt = 0;
			console.log("Tecla F pressionada!");
			key2.style.backgroundColor = "var(--cor3)";
		} else if (e.key === "J" || e.key === "j") {
			btt = 0;
			console.log("Tecla J pressionada!");
			key3.style.backgroundColor = "var(--cor3)";
		} else if (e.key === "K" || e.key === "k") {
			btt = 0;
			console.log("Tecla K pressionada!");
			key4.style.backgroundColor = "var(--cor3)";
		}
	});

	// Botão para começar o jogo
    document.querySelector('#button-play').addEventListener('click', function() {
        iniciar = 1;
        som.play();

        document.getElementById("menu").style.display = "none";
    });

    // Botão de configurações do jogo
    document.querySelector('#button-config').addEventListener('click', function() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu-config").style.display = "flex";
    });

    // Botão de voltar
    document.querySelector('#button-back').addEventListener('click', function() {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("menu-config").style.display = "none";
    });

	function descerDiv() {
		for (i = 0; i <= notas.length; i++) {
			for (j = 0; j < 1; j++) {
				let nota = notas[i][j];
				let posY = parseInt(nota.style.top || 0);
				posY += 3;
				nota.style.top = posY + "px";

				if (posY >= posKey.y - 70 && posY < posKey.y - 40 && btt == notas[i][j + 1]) {
					err = err + 1;
					comboMax.push(combo);
					combo = 0;
					pontos += 150;
					erros.innerHTML = "Erros: " + err;
					combos.innerHTML = "Combo: " + combo;
					contagem.innerHTML = pontos;
					comboM.innerHTML = "Combo Max: " + maiorValor(comboMax);
					nota.remove();
					console.log(nota.style.top);
					nota.style.top = null;
					notas.shift();
				} else if (posY >= posKey.y - 40 && posY < posKey.y + 30 && btt == notas[i][j + 1]) {
					acc = acc + 1;
					combo++;
					comboMax.push(combo);
					if (combo != 0) {
							pontos += 300 * combo;
					} else {
							pontos += 300;
					}
					acertos.innerHTML = "Acertos: " + acc;
					combos.innerHTML = "Combo: " + combo;
					contagem.innerHTML = pontos;
					comboM.innerHTML = "Combo Max: " + maiorValor(comboMax);
					nota.remove();
					console.log(nota.style.top);
					nota.style.top = null;
					notas.shift();
				} else if (posY >= posKey.y + 30 && btt == 0 || posY >= posKey.y + 30 && btt == notas[i][j + 1]) {
					err = err + 1;
					comboMax.push(combo);
					combo = 0;
					pontos += 75;
					erros.innerHTML = "Erros: " + err;
					combos.innerHTML = "Combo: " + combo;
					contagem.innerHTML = pontos;
					comboM.innerHTML = "Combo Max: " + maiorValor(comboMax);
					nota.remove();
					console.log(nota.style.top);
					nota.style.top = null;
					notas.shift();
				}
			}
		}
	}
	
	var abudabi = setInterval(verificaIniciar, 1);

	function maiorValor(arr) {
		return Math.max(...arr);
	}

	function verificaIniciar() {
		if (iniciar == 1) {
			clearInterval (abudabi);
			var criar = setInterval(criarDiv, 200);
			var descer = setInterval(descerDiv, 5);
			som.addEventListener("ended", () => {
				clearInterval(criar);
				setTimeout(() => {
					window.location.assign("https://math-rhythm.pages.dev/views/finalScoree");
				}, 3000);
			});
		} else {
			console.log ("OK");
		}
	}

	for (i = 0; i <= desespero.length - 1; i++) {
		verificaIniciar();
	}
}