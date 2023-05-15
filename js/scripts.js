window.onload = new function() {
	// Configs
	var plataform = "desktop";
	var music = "msc/music1.mp3";
	var gamemode = "par";
	var speed = 1;
	const array_primo = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
	var volume = 0.04;
	const array_textos = ["Visite a pagina de ajuda caso seja a sua primeira vez jogando!", "Isso tudo foi feito em JavaScript.", "Uma variavel abudabi ja fez muita historia.", "O cérebro humano pesa cerca de 1,4 quilos."
	, "Obrigado por jogar!", "O jogo esta muito dificil ou muito facil? Visite a pagina de configurações!",];

	var mapDiv = document.getElementById('map');
	var scoreboard = document.getElementById("scoreboard"); 
	var som = document.getElementById("audio");
	var textoAleatorio = document.getElementById("texto-aleatorio");

	var tecla1 = "D";
	var tecla2 = "F";
	var tecla3 = "J";
	var tecla4 = "K";
	
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

	document.addEventListener("keydown", (e) => {
		if (!e.repeat) {
			if (e.key === tecla1.toUpperCase() || e.key === tecla1.toLowerCase()) {
				btt = 1;
				console.log("Tecla " + tecla1 + " pressionada!");
				key1.style.backgroundColor = "#9c009f";
			} else if (e.key === tecla2.toUpperCase() || e.key === tecla2.toLowerCase()) {
				btt = 2;
				console.log("Tecla " + tecla2 + " pressionada!");
				key2.style.backgroundColor = "#9c009f";
			} else if (e.key === tecla3.toUpperCase() || e.key === tecla3.toLowerCase()) {
				btt = 3;
				console.log("Tecla " + tecla3 + " pressionada!");
				key3.style.backgroundColor = "#9c009f";
			} else if (e.key === tecla4.toUpperCase() || e.key === tecla4.toLowerCase()) {
				btt = 4;
				console.log("Tecla " + tecla4 + " pressionada!");
				key4.style.backgroundColor = "#9c009f";
			}
		} else {
			btt = 0;
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.key === tecla1.toUpperCase() || e.key === tecla1.toLowerCase()) {
			btt = 0;
			console.log("Tecla " + tecla1 + " despressionada!");
			key1.style.backgroundColor = "white";
		} else if (e.key === tecla2.toUpperCase() || e.key === tecla2.toLowerCase()) {
			btt = 0;
			console.log("Tecla " + tecla2 + " despressionada!");
			key2.style.backgroundColor = "white";
		} else if (e.key === tecla3.toUpperCase() || e.key === tecla3.toLowerCase()) {
			btt = 0;
			console.log("Tecla " + tecla3 + " despressionada!");
			key3.style.backgroundColor = "white";
		} else if (e.key === tecla4.toUpperCase() || e.key === tecla4.toLowerCase()) {
			btt = 0;
			console.log("Tecla " + tecla4 + " despressionada!");
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
		}, 1000 * 3);
        document.getElementById("menu").style.display = "none";
    });

    // Botão de configurações do jogo
    document.querySelector('#button-config').addEventListener('click', function() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu-config").style.display = "flex";
    });

	document.querySelector('#button-ajuda').addEventListener('click', function() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu-ajuda").style.display = "flex";
    });

    // Botão de voltar - Menu configurações
    document.querySelector('#button-back').addEventListener('click', function() {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("menu-config").style.display = "none";

		// Coisas de configuração
		plataform = document.querySelector('#plataforma').value
		music = document.querySelector('#musica').value
		gamemode = document.querySelector('#modo').value
		speed = document.querySelector('#velocidade').value
		volume = document.querySelector('#volume').value / 100

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
    });

	// Botão de voltar - Ajuda
	document.getElementById('#button-back-ajuda').addEventListener('click', function() {
		document.getElementById("menu").style.display = "flex";
		document.getElementById("menu-ajuda").style.display = "none";
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
					comboMax.push(combo);
					combo = 0;
					pontos += 150;
					erros.innerHTML = err;
					combos.innerHTML = combo + "x";
					contagem.innerHTML = pontos;
					cbFinal = maiorValor(comboMax);
					comboM.innerHTML = maiorValor(comboMax) + "x";
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
					acertos.innerHTML = acc;
					combos.innerHTML = combo + "x";
					contagem.innerHTML = pontos;
					cbFinal = maiorValor(comboMax)
					comboM.innerHTML = maiorValor(comboMax) + "x";
					nota.remove();
					console.log(nota.style.top);
					nota.style.top = null;
					notas.shift();
				} else if (posY >= posKey.y + 30 && btt == 0 || posY >= posKey.y + 30 && btt == notas[i][j + 1]) {
					err = err + 1;
					comboMax.push(combo);
					combo = 0;
					pontos += 75;
					erros.innerHTML = err;
					combos.innerHTML = combo + "x";
					contagem.innerHTML = pontos;
					cbFinal = maiorValor(comboMax);
					comboM.innerHTML = maiorValor(comboMax) + "x";
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
			clearInterval(abudabi);
			if (gamemode != "primo"){
				var criar = setInterval(criarDiv, 200);
			} else {
				var criar = setInterval(criarDiv, 500);
			}
			var descer = setInterval(descerDiv, speed * 5);
			som.addEventListener("ended", () => {
				clearInterval(criar);
				setTimeout(() => {
					var pontuacoes = [pontos, acc, err, cbFinal];
					window.location.href = 'views/finalScore.html?pontuacoes=' + pontuacoes;
				}, 3000);
			});

			// Evento caso queira sair do mapa
			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape") {
					console.log("Apertou ESC")
				}
			});
		} else {
			console.log ("OK");
		}
	}
}