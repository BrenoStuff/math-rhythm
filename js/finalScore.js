const params = new URLSearchParams(window.location.search);
const pontuacoes = params.get('pontuacoes');


pontos = [];

var pts;
var err;
var acc;
var cbs;
var ctd = 1;

for (i = 0; i <= pontuacoes.length - 1; i++) {
	if (pontuacoes[i] != ",") {
		pontos.push(pontuacoes[i]);
		if (ctd == 4) {
			cbs = pontos.join("");
			if (pontuacoes[i] == pontuacoes.length - 1) {
				pontos.length = 0;
			}
		}
	} else {
		if (ctd == 1){
			pts = pontos.join("");
			pontos.length = 0;
			ctd++;
		} else if (ctd == 2) {
			acc = pontos.join("");
			pontos.length = 0;
			ctd++;
		} else if (ctd == 3) {
			err = pontos.join("");
			pontos.length = 0;
			ctd++;
		}
	}
}

var pontos = document.getElementById("pontuacao");
var acertos = document.getElementById("acertos");
var erros = document.getElementById("erros");
var combo = document.getElementById("comboMax");

pontos.innerHTML = pts;
acertos.innerHTML = acc;
erros.innerHTML = err;
combo.innerHTML = cbs;
