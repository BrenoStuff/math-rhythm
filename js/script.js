window.onload = new function() {

        let contador = 0;
        let notas = [];
        let pontos = 1;

        let btt = 0;
        let err = 0;
        let acc = 0;
     
        // ----------- PODE IGNORAR ESSE TRECHO ---------------- //

        let botao = document.getElementById("key1");

        // ----------------------------------------------------- //

        let posKey = botao.getBoundingClientRect();

        // ----------------------------------------------------- //

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

                console.log(i);
                console.log(contador);
                //console.log(newNote.getBoundingClientRect().y);

                i = 0;
        }

        var key1 = document.querySelector("#key1");
        var key2 = document.querySelector("#key2");
        var key3 = document.querySelector("#key3");
        var key4 = document.querySelector("#key4");

        document.addEventListener("keydown", (e) => {
                if (e.key === "D" || e.key === "d") {
                        btt = 1;
                        key1.style.border = " 3px solid red";
                        console.log("Tecla D pressionada!");
                } else if (e.key === "F" || e.key === "f") {
                        btt = 1;
                        key2.style.border = " 3px solid green";
                        console.log("Tecla F pressionada!");
                } else if (e.key === "J" || e.key === "j") {
                        btt = 1;
                        key3.style.border = " 3px solid yellow";
                        console.log("Tecla J pressionada!");
                } else if (e.key === "K" || e.key === "k") {
                        btt = 1;
                        key4.style.border = " 3px solid blue";
                        console.log("Tecla K pressionada!");
                }
        })

        document.addEventListener("keyup", (e) => {
                if (e.key === "D" || e.key === "d") {
                        btt = 0;
                        key1.style.border = " 1px solid black";
                        console.log("Tecla D pressionada!");
                } else if (e.key === "F" || e.key === "f") {
                        btt = 0;
                        key2.style.border = " 1px solid black";
                        console.log("Tecla F pressionada!");
                } else if (e.key === "J" || e.key === "j") {
                        btt = 0;
                        key3.style.border = " 1px solid black";
                        console.log("Tecla J pressionada!");
                } else if (e.key === "K" || e.key === "k") {
                        btt = 0;
                        key4.style.border = " 1px solid black";
                        console.log("Tecla K pressionada!");
                }
        })

        function descerDiv() {
                var acertos = document.getElementById("acertos");
                var contagem = document.getElementById("contagem");
                var erros = document.getElementById("erros");
                var combos = document.getElementById("combos");

                for (i = 0; i <= notas.length; i++) {
                        let nota = notas[i];
                        let posY = parseInt(nota.style.top || 0);
                        posY += 3;
                        nota.style.top = posY + "px";

                        if (posY >= posKey.y - 40 && posY <= posKey.y - 10 && btt == 1) {
                                nota.remove();
                                err = err + 1;
                                erros.innerHTML = "Erros: " + err;
                                
                        } else if (posY > posKey.y - 10 && posY <= posKey.y + 10 && btt == 1) {
                                nota.remove();
                                acc = acc + 1;
                                acertos.innerHTML = "Acertos: " + acc;
                        } else if (posY > posKey.y + 10 && posY <= posKey.y + 24 && btt == 1) {
                                nota.remove();
                                acc = acc + 1;
                                acertos.innerHTML = "Acertos: " + acc;
                        } else if (posY > posKey.y + 24 && btt == 0) {
                                nota.remove();
                                err = err + 1;
                                erros.innerHTML = "Erros: " + err;
                        }

                }
        }

        setInterval(criarDiv, 500);
        setInterval(descerDiv, 5);
}