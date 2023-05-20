window.onload = new function() {
	// Configs
	var plataform = "desktop";
	var music = "msc/music1.mp3";
	var gamemode = "par";
	var speed = 1;
	var descer;
	const array_primo = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
	var volume = 0.05;
	const array_textos = ["Visite a pagina de ajuda caso seja a sua primeira vez jogando!", "Isso tudo foi feito em JavaScript.", "Uma variavel abudabi ja fez muita historia.", "O cérebro humano pesa cerca de 1,4 quilos."
	, "Obrigado por jogar!", "O jogo esta muito dificil ou muito facil? Visite a pagina de configurações!", "O infinito pode ser dividido ao meio, resultando em pares e impares", "O infinito é um numero par ou impar?", "Não existe uma fórmula para gerar números primos"];

	var mapDiv = document.getElementById('map');
	var scoreboard = document.getElementById("scoreboard"); 
	var som = document.getElementById("audio");
	var textoAleatorio = document.getElementById("texto-aleatorio");

	var tecla1 = "D";
	var tecla2 = "F";
	var tecla3 = "J";
	var tecla4 = "K";
	
	var iniciar = 0;
	var criar;
	var pause = false;
	var contadorPause = 2;

	var contador = 0;
	var contadorV = 10;
	var contadorVidasRestantes = 3;
	var notas = [];
	var pontos = 0;
	var comboMax = [];

	var btt = 0;
	var err = 0;
	var acc = 0;
	var combo = 0;
	var resposta;

	var cbFinal;

	var animacao = document.getElementById("path");
	var classes = Array.from(animacao.classList);
 
	// ----------- PODE IGNORAR ESSE TRECHO ---------------- //

	var botao = document.getElementById("key1");
	var posKey = botao.getBoundingClientRect();

	// ----------------------------------------------------- //

	var barraDeVida = document.getElementById("lifebar");
	var acertos = document.getElementById("acertos");
	var contagem = document.getElementById("contagem");
	var erros = document.getElementById("erros");
	var combos = document.getElementById("combos");
	var comboM = document.getElementById("maxCombo");

	function criarDiv() {
		contador++;
		var newNote = document.createElement("div");
		var txt = document.createElement("p");
		txt.classList.add("txt");
		newNote.classList.add("beat");
		
		var i = Math.floor(Math.random() * 4) + 1;

		if (gamemode === "par") {
			if (contador % 2 == 0){
				var teste = [];
				var piano = document.getElementById("noteMove" + i);
				piano.appendChild(newNote);
				newNote.appendChild(txt);
				txt.innerHTML = contador;
				teste.push(newNote, i);
				notas.push(teste);
			}
		} else if (gamemode === "impar") {
			if (contador % 2 != 0){
				var teste = [];
				var piano = document.getElementById("noteMove" + i);
				piano.appendChild(newNote);
				newNote.appendChild(txt);
				txt.innerHTML = contador;
				teste.push(newNote, i);
				notas.push(teste);
			}
		} else if (gamemode === "primo") {
			const randomPrimo = Math.floor(Math.random() * array_primo.length);
			var teste = [];
			var piano = document.getElementById("noteMove" + i);
			piano.appendChild(newNote);
			newNote.appendChild(txt);
			txt.innerHTML = array_primo[randomPrimo];
			teste.push(newNote, i);
			notas.push(teste);
		}
		i = 0;
	}

	// Texto aleatório
	setInterval(changeText, 1000 * 7)
	function changeText() {
		const randomText = Math.floor(Math.random() * array_textos.length);
		textoAleatorio.innerHTML = array_textos[randomText];
	}

	// Área de configuração
	var setupConfig = function() {
		// Configuração da música
		som.src = music;
		som.volume = volume;
	}

	// Check if it's mobile //
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {
		plataform = "mobile";
		document.getElementById("mobileOption").selected = true;
	}

	// Adaptação para Mobile
	var setupPlataform = function() {
		if (plataform === "mobile") {
			// const huds = document.querySelectorAll('.hud');
			// huds.forEach(hud => {
			// hud.style.width = '20%';
			// });
			document.getElementById("pauseBTNinfo").innerHTML = "Pausar";
			
			var tamanhoTela = window.innerHeight
			document.getElementById("path").style.height = (tamanhoTela / 100 * 90.9) + "px"
			document.getElementById("path-buttons").style.height = (tamanhoTela / 100 * 9.1) + "px"
			document.getElementById("comboDiv").classList.remove("container")
			document.getElementById("comboDiv").style.display = "none"
			document.getElementById("alterar-teclas").remove();
			scoreboard.classList.remove("score")
			scoreboard.classList.remove("container")
			scoreboard.style.display = "none"

			document.addEventListener("touchstart", (e) => {
				if (e.target.id === "key1") {
					btt = 1;
					key1.style.backgroundColor = "#9c009f";
				} else if (e.target.id === "key2") {
					btt = 2;
					key2.style.backgroundColor = "#9c009f";
				} else if (e.target.id === "key3") {
					btt = 3;
					key3.style.backgroundColor = "#9c009f";
				} else if (e.target.id === "key4") {
					btt = 4;
					key4.style.backgroundColor = "#9c009f";
				} else {
					btt = 0;
				}
			});

			document.addEventListener("touchend", (e) => {
				if (e.target.id === "key1") {
					btt = 0;
					key1.style.backgroundColor = "white";
				} else if (e.target.id === "key2") {
					btt = 0;
					key2.style.backgroundColor = "white";
				} else if (e.target.id === "key3") {
					btt = 0;
					key3.style.backgroundColor = "white";
				} else if (e.target.id === "key4") {
					btt = 0;
					key4.style.backgroundColor = "white";
				} else {
					btt = 0;
				}
			});
		} else if (plataform === "desktop") {
			scoreboard.classList.add("score")
			scoreboard.classList.add("container")
			scoreboard.style.display = null

			document.getElementById("comboDiv").classList.add("container")
			document.getElementById("comboDiv").style.display = null
		}
	}

	//Importante
	var incrementoDecremento = 400;

	document.addEventListener("keydown", (e) => {
		if (!e.repeat) {
			if (e.key === tecla1.toUpperCase() || e.key === tecla1.toLowerCase()) {
				btt = 1;
				key1.style.backgroundColor = "#9c009f";
			} else if (e.key === tecla2.toUpperCase() || e.key === tecla2.toLowerCase()) {
				btt = 2;
				key2.style.backgroundColor = "#9c009f";
			} else if (e.key === tecla3.toUpperCase() || e.key === tecla3.toLowerCase()) {
				btt = 3;
				key3.style.backgroundColor = "#9c009f";
			} else if (e.key === tecla4.toUpperCase() || e.key === tecla4.toLowerCase()) {
				btt = 4;
				key4.style.backgroundColor = "#9c009f";
			}
		} else {
			btt = 0;
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.key === tecla1.toUpperCase() || e.key === tecla1.toLowerCase()) {
			btt = 0;
			key1.style.backgroundColor = "white";
		} else if (e.key === tecla2.toUpperCase() || e.key === tecla2.toLowerCase()) {
			btt = 0;
			key2.style.backgroundColor = "white";
		} else if (e.key === tecla3.toUpperCase() || e.key === tecla3.toLowerCase()) {
			btt = 0;
			key3.style.backgroundColor = "white";
		} else if (e.key === tecla4.toUpperCase() || e.key === tecla4.toLowerCase()) {
			btt = 0;
			key4.style.backgroundColor = "white";
		}
	});

	// Botão para começar o jogo
    document.querySelector('#button-play').addEventListener('click', function() {
		// Carregar Configurações
		setupPlataform();
		setupConfig();

		// Timer para começar o jogo realmente
		setTimeout(function() {
			iniciar = 1;
        	som.play();
		}, 3000);
        document.getElementById("menu").style.display = "none";
    });

    // Botão de configurações do jogo
    document.querySelector('#button-config').addEventListener('click', function() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu-config").style.display = "flex";
    });

	// Botão de ajuda
	document.getElementById('button-ajuda').addEventListener('click', function() {
		document.getElementById("menu").style.display = "none";
		document.getElementById("menu-ajuda").style.display = "flex";
	});

    // Botão de voltar - Menu configurações
    document.querySelector('#button-back').addEventListener('click', function() {
		// Coisas de configuração
		plataform = document.querySelector('#plataforma').value
		music = document.querySelector('#musica').value
		gamemode = document.querySelector('#modo').value
		speed = document.querySelector('#velocidade').value
		volume = document.querySelector('#volume').value / 100

		// parar som
		som.pause();
		som.currentTime = 0;

		// Setando teclas de jogo
		if (document.getElementById("tecla1").value != "") {
			tecla1 = document.getElementById("tecla1").value
			document.getElementById("ajuda-key1").innerHTML = tecla1
		}
		if (document.getElementById("tecla2").value != "") {
			tecla2 = document.getElementById("tecla2").value
			document.getElementById("ajuda-key2").innerHTML = tecla2
		}
		if (document.getElementById("tecla3").value != "") {
			tecla3 = document.getElementById("tecla3").value
			document.getElementById("ajuda-key3").innerHTML = tecla3
		}
		if (document.getElementById("tecla4").value != "") {
			tecla4 = document.getElementById("tecla4").value
			document.getElementById("ajuda-key4").innerHTML = tecla4

		}

		// Checando se tem alguma tecla repetida
		if (tecla1 === tecla2 || tecla1 === tecla3 || tecla1 === tecla4 || tecla2 === tecla3 || tecla2 === tecla4 || tecla3 === tecla4) {
			alert("Não pode ter teclas repetidas!")
		} else {
			document.getElementById("menu").style.display = "flex";
        	document.getElementById("menu-config").style.display = "none";
		}
    });

	// Mudar volume da música
	document.getElementById('volume').addEventListener("input", function() {
		som.volume = document.getElementById('volume').value;
	});

	// Botão de voltar - Ajuda
	document.getElementById('button-back-ajuda').addEventListener('click', function() {
		document.getElementById("menu").style.display = "flex";
		document.getElementById("menu-ajuda").style.display = "none";
	});

	//Botão de voltar - Pause
	document.getElementById("button-back-pause").addEventListener("click", function() {
		iniciar = 0;
		pause = false;
		contadorPause = 2;

		contador = 0;
		pontos = 0;
		comboMax = [];

		acertos.innerHTML = 0;
		contagem.innerHTML = 0;
		erros.innerHTML = 0;
		combos.innerHTML = 0 + "x";
		comboM.innerHTML = 0 + "x";

		animacao.classList.remove("path-correct");
		animacao.classList.remove("path-wrong");

		notas = [];
		const notes = document.querySelectorAll('.beat');
		notes.forEach((note) => {
			note.remove();
		});
		abudabi = setInterval(verificaIniciar, 1);

		btt = 0;
		err = 0;
		acc = 0;
		combo = 0;
		contadorV = 10;

		som.currentTime = 0;

		document.getElementById("menu").style.display = "flex";
		document.getElementById("menu-pause").style.display = "none";
	});

	// Botão check geral
	document.getElementById("check").addEventListener("click", function() {
		alert('Plataforma: ' + plataform + '\rMúsica: ' + music + '\rModo: ' + gamemode + '\rVolume: ' + volume + '\rAltura da tela: ' + mapDiv.offsetHeight + 'px' + '\rTecla1: ' + tecla1 + '\rTecla2: ' + tecla2 + '\rTecla3: ' + tecla3 + '\rTecla4: ' + tecla4);
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
					if (contadorV >= 0){
						contadorV--;
					} else if (contadorV < 0){
						contadorV = 0;
					}
					incrementoDecremento -= 40;
					barraDeVida.style.width = incrementoDecremento + "px";
					animacao.classList.remove("path-correct");
					animacao.classList.add("path-wrong");
					comboMax.push(combo);
					combo = 0;
					pontos += 150;
					erros.innerHTML = err;
					combos.innerHTML = combo + "x";
					contagem.innerHTML = pontos;
					cbFinal = maiorValor(comboMax);
					comboM.innerHTML = maiorValor(comboMax) + "x";
					nota.remove();
					nota.style.top = null;
					notas.shift();
				} else if (posY >= posKey.y - 40 && posY < posKey.y + 30 && btt == notas[i][j + 1]) {
					acc = acc + 1;
					if (contadorV <= 10){
						contadorV++;
						if (parseInt(barraDeVida.style.width) + 40 < 400){
							incrementoDecremento += 40;
							barraDeVida.style.width = incrementoDecremento + "px";
						}
					} else if (contadorV > 10){
						contadorV = 10;
					}
					animacao.classList.remove("path-wrong");
					animacao.classList.add("path-correct");
					combo++;
					comboMax.push(combo);
					if (combo != 0) {
							pontos += 300 * combo;
					} else {
							pontos += 300;
					}
					acertos.innerHTML = acc;
					combos.innerHTML = combo + "x";
					contagem.innerHTML = pontos;
					cbFinal = maiorValor(comboMax)
					comboM.innerHTML = maiorValor(comboMax) + "x";
					nota.remove();
					nota.style.top = null;
					notas.shift();
				} else if (posY >= posKey.y + 30 && btt == 0 || posY >= posKey.y + 30 && btt == notas[i][j + 1]) {
					err = err + 1;
					if (contadorV >= 0){
						contadorV--;
					} else if (contadorV < 0){
						contadorV = 0;
					}
					incrementoDecremento -= 40;
					barraDeVida.style.width = incrementoDecremento + "px";
					animacao.classList.remove("path-correct");
					animacao.classList.add("path-wrong");
					comboMax.push(combo);
					combo = 0;
					pontos += 75;
					erros.innerHTML = err;
					combos.innerHTML = combo + "x";
					contagem.innerHTML = pontos;
					cbFinal = maiorValor(comboMax);
					comboM.innerHTML = maiorValor(comboMax) + "x";
					nota.remove();
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

	var gamePause = setInterval(verificaVida, 1);

	function verificaVida() {
		if (contadorV <= 0) {
			pause = true;
			clearInterval(gamePause);
			som.pause();

			clearInterval(criar);
			clearInterval(descer);
			
			document.getElementById("menu-quest").style.display = "flex";
			geraPergunta();
		}
	}

	function geraPergunta() {
		var sinal = Math.floor(Math.random() * 2) + 1;
		var razao = Math.floor(Math.random() * 9) + 1;
		var elemento = Math.floor(Math.random() * 15) + 4;
		
		var primeiroNumero = Math.floor(Math.random() * 100) + 1;
		var segundoNumero = 0;
		var terceiroNumero = 0;
		
		if (sinal == 1){
			razao *= -1;
			segundoNumero = primeiroNumero + razao;
			terceiroNumero = segundoNumero + razao;
		} else if (sinal == 2){
			razao *= 1;
			segundoNumero = primeiroNumero + razao;
			terceiroNumero = segundoNumero + razao;
		}

		resposta = primeiroNumero + (elemento - 1) * razao
		
		document.getElementById("pergunta-random").innerHTML = "Dada a sequência ( " + primeiroNumero + ", " + segundoNumero + ", " + terceiroNumero + " ... ) em que a razão é igual a " + razao + ". Qual é o " + elemento + "º número?";
	}

	document.getElementById("button-addon2").addEventListener("click", () => {
		if (resposta == document.getElementById("resposta").value){
			document.getElementById("menu-quest").style.display = "none";
			contadorV = 10;

			setTimeout(() => {
				gamePause = setInterval(verificaVida, 1);
				pause = false;
				som.play();
				if (gamemode != "primo"){
					criar = setInterval(criarDiv, 200);
				} else {
					criar = setInterval(criarDiv, 500);
				}
				barraDeVida.style.width = 400 + "px";
				descer = setInterval(descerDiv, speed * 5)
			}, 1500);
		} else {
			if (contadorVidasRestantes >= 0){
				alert("Resposta errada! Você tem mais " + contadorVidasRestantes + " tentativas.");
				contadorVidasRestantes--;
			} else {
				alert("Resposta errada! Você não tem mais tentativas. O jogo será finalizado.");
				var pontuacoes = [pontos, acc, err, cbFinal];
				window.location.href = 'views/finalScore.html?pontuacoes=' + pontuacoes;
			}
		}
	})

	function verificaIniciar() {
		if (iniciar == 1) {
			if (pause == false){
				clearInterval(abudabi);
				if (gamemode != "primo"){
					criar = setInterval(criarDiv, 200);
				} else {
					criar = setInterval(criarDiv, 500);
				}
				// Abrir menu de pause
				document.addEventListener("keydown", (e) => {
					if (!e.repeat){
						//Pause
						var isKeyPause = false;
						if (e.key === "Escape" || e.key === " ") {
							isKeyPause = true;
						}
						if (isKeyPause && iniciar == 1 && pause == false) {
							som.pause();
							clearInterval(criar);
							clearInterval(descer);
							document.getElementById("menu-pause").style.display = "flex";
							pause = true;
							if (contadorPause % 2 == 0){
								contadorPause++;
								verificaIniciar();
							}
						}
					}
				});

				clearInterval(descer)
				descer = setInterval(descerDiv, speed * 5);

				som.addEventListener("ended", () => {
					clearInterval(criar);
					setTimeout(() => {
						var pontuacoes = [pontos, acc, err, cbFinal];
						window.location.href = 'views/finalScore.html?pontuacoes=' + pontuacoes;
					}, 3000);
				});
			} else if (pause == true){
				if (gamemode != "primo"){
					criar = setInterval(criarDiv, 200);
				} else {
					criar = setInterval(criarDiv, 500);
				}

				// Botão fechar menu de pause
				document.getElementById("button-continue").addEventListener("click", () => {
					document.getElementById("menu-pause").style.display = "none";
					setTimeout(() => {
						som.play();
						pause = false;
						clearInterval(descer);
						descer = setInterval(descerDiv, speed * 5);
						if (contadorPause % 2 != 0){
							contadorPause++;
							verificaIniciar();
						}
					}, 1500);
				});

				clearInterval(criar);
				clearInterval(descer);
			}
		}
	}
}