window.onload = new function() {

        let contador = 0;
        let notas = [];
        let pontos = 0;
        let comboMax = [];

        let btt = 0;
        let err = 0;
        let acc = 0;
        let combo = 0;
     
        // ----------- PODE IGNORAR ESSE TRECHO ---------------- //

        let botao = document.getElementById("key1");

        // ----------------------------------------------------- //

        let posKey = botao.getBoundingClientRect();

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
                
                let i = Math.floor(Math.random() * 4) + 1;

                if (contador % 2 == 0){
                        var piano = document.getElementById("noteMove" + i);
                        newNote.innerHTML = contador + ""; 
                        piano.appendChild(newNote);
                        notas.push(newNote);
                } 

                //console.log(i);
                //console.log(contador);
                //console.log(newNote.getBoundingClientRect().y);

                i = 0;
        }

        var key1 = document.querySelector("#key1");
        var key2 = document.querySelector("#key2");
        var key3 = document.querySelector("#key3");
        var key4 = document.querySelector("#key4");

        document.addEventListener("keydown", (e) => {
                if (!e.repeat) {
                        if (e.key === "D" || e.key === "d") {
                                btt = 1;
                                key1.style.backgroundColor = "black";
                                console.log("Tecla D pressionada!");
                        } else if (e.key === "F" || e.key === "f") {
                                btt = 1;
                                console.log("Tecla F pressionada!");
                                key2.style.backgroundColor = "black";
                        } else if (e.key === "J" || e.key === "j") {
                                btt = 1;
                                console.log("Tecla J pressionada!");
                                key3.style.backgroundColor = "black";
                        } else if (e.key === "K" || e.key === "k") {
                                btt = 1;
                                console.log("Tecla K pressionada!");
                                key4.style.backgroundColor = "black";
                        }
                } else {
                        btt =0;
                }
        })

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
        })

        function descerDiv() {

                for (i = 0; i <= notas.length; i++) {
                        let nota = notas[i];
                        let posY = parseInt(nota.style.top || 0);
                        posY += 3;
                        nota.style.top = posY + "px";

                        if (posY >= posKey.y - 70 && posY < posKey.y - 40 && btt == 1) {
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
                        } else if (posY >= posKey.y - 40 && posY < posKey.y + 30 && btt == 1) {
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
                        } else if (posY >= posKey.y + 30 && btt == 0 || posY >= posKey.y + 30 && btt == 1) {
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

        function maiorValor(arr) {
                return Math.max(...arr);
              }

        setInterval(criarDiv, 200);
        setInterval(descerDiv, 5);
}