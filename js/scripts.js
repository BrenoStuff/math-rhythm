window.onload = new function() {
	// Configs
	var plataform = "desktop";
	var music = "msc/music1.mp3";
	var gamemode = "par";
	const array_primo = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
	var volume = 0.5;

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

	var cbFinal;
 
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

		if (gamemode === "par") {
			if (contador % 2 == 0){
				var teste = [];
				var piano = document.getElementById("noteMove" + i);
				newNote.innerHTML = contador + "";
				piano.appendChild(newNote);
				teste.push(newNote, i);
				notas.push(teste);
			}
		} else if (gamemode === "impar") {
			if (contador % 2 != 0){
				var teste = [];
				var piano = document.getElementById("noteMove" + i);
				newNote.innerHTML = contador + "";
				piano.appendChild(newNote);
				teste.push(newNote, i);
				notas.push(teste);
			}
		} else if (gamemode === "primo") {
			const randomPrimo = Math.floor(Math.random() * array_primo.length);
			var teste = [];
			var piano = document.getElementById("noteMove" + i);
			newNote.innerHTML = array_primo[randomPrimo] + "";
			piano.appendChild(newNote);
			teste.push(newNote, i);
			notas.push(teste);
		}
		i = 0;
	}

	// Área de configuração
	var setupConfig = function() {
		// Configuração da música
		som.src = music;
		som.volume = volume;
	}

	// Adaptação para Mobile
	var setupMobile = function() {
		if (plataform === "mobile") {
			document.getElementById("scoreboard").style.display = "none";

			document.addEventListener("touchstart", (e) => {
				if (e.target.id === "key1") {
					btt = 1;
					key1.style.backgroundColor = "black";
				} else if (e.target.id === "key2") {
					btt = 2;
					key2.style.backgroundColor = "black";
				} else if (e.target.id === "key3") {
					btt = 3;
					key3.style.backgroundColor = "black";
				} else if (e.target.id === "key4") {
					btt = 4;
					key4.style.backgroundColor = "black";
				} else {
					btt = 0;
				}
			});

			document.addEventListener("touchend", (e) => {
				if (e.target.id === "key1") {
					btt = 0;
					key1.style.backgroundColor = "var(--cor3)";
				} else if (e.target.id === "key2") {
					btt = 0;
					key2.style.backgroundColor = "var(--cor3)";
				} else if (e.target.id === "key3") {
					btt = 0;
					key3.style.backgroundColor = "var(--cor3)";
				} else if (e.target.id === "key4") {
					btt = 0;
					key4.style.backgroundColor = "var(--cor3)";
				} else {
					btt = 0;
				}
			});
		}
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
			btt = 0;
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
<<<<<<< HEAD
        setTimeout(() => {
		iniciar = 1;
        	som.play();
	}, 5000);
=======
		// Carregar Configurações
		setupMobile();
		setupConfig();
>>>>>>> da866f47f2588d8ab055400cfe61c52edfbca9ce

		// Timer para começar o jogo realmente
		setTimeout(function() {
			iniciar = 1;
        	som.play();
		}, 1000 * 3);
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

		// Coisas de configuração
		plataform = document.querySelector('#plataforma').value
		music = document.querySelector('#musica').value
		gamemode = document.querySelector('#modo').value
		volume = document.querySelector('#volume').value / 100
    });

	// Botão de checar audio
	document.querySelector('#btn-music').addEventListener('click', function() {
		som.src = document.querySelector('#musica').value
		if (document.getElementById("btn-music").innerHTML == "Parar") {
			som.pause();
			som.currentTime = 0;
			document.getElementById("btn-music").innerHTML = "Tocar"
		} else {
			document.getElementById("btn-music").innerHTML = "Parar"
			som.volume = document.querySelector('#volume').value / 100
			som.play();
		}
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
					cbFinal = maiorValor(comboMax)
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
					cbFinal = maiorValor(comboMax)
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
					cbFinal = maiorValor(comboMax)
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
			if (gamemode != "primo"){
				var criar = setInterval(criarDiv, 200);
			} else {
				var criar = setInterval(criarDiv, 500);
			}
			var descer = setInterval(descerDiv, 5);
			som.addEventListener("ended", () => {
				clearInterval(criar);
				setTimeout(() => {
<<<<<<< HEAD
					var pontuacoes = [pontos, acc, err, cbFinal];
					window.location.href = 'views/finalScore.html?pontuacoes=' + pontuacoes;
=======
					window.location.assign("https://math-rhythm.pages.dev/views/finalScore");
>>>>>>> da866f47f2588d8ab055400cfe61c52edfbca9ce
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