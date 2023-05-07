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


var total = parseInt(acc) + parseInt(err);
var pct = (acc * 100) / total;
console.log(total);
console.log(pct);

var letra = document.getElementById("letras");
var pontos = document.getElementById("pontuacao");
var acertos = document.getElementById("acertos");
var erros = document.getElementById("erros");
var combo = document.getElementById("comboMax");
var porcentagem = document.getElementById("porcentagem");

if (pct == 100){
	letra.innerHTML = "SS";
} else if (pct >= 95 && pct < 100) {
	letra.innerHTML = "S";
} else if (pct >= 90 && pct < 95) {
	letra.innerHTML = "A";
} else if (pct >= 80 && pct < 90){
	letra.innerHTML = "B";
} else if (pct < 80){
	letra.innerHTML = "C";
}

pontos.innerHTML = pts;
acertos.innerHTML = acc;
erros.innerHTML = err;
combo.innerHTML = cbs + "x";
porcentagem.innerHTML = pct.toFixed(2) + "% de acertos";
