window.onload = new function() {

        let contador = 0;
        let notas = [];
     
        // ----------- PODE IGNORAR ESSE TRECHO ---------------- //

        let botao1 = document.getElementById("key1");
        let botao2 = document.getElementById("key2");
        let botao3 = document.getElementById("key3");
        let botao4 = document.getElementById("key4");

        let posKey1 = botao1.getBoundingClientRect();
        let posKey2 = botao2.getBoundingClientRect();
        let posKey3 = botao3.getBoundingClientRect();
        let posKey4 = botao4.getBoundingClientRect();

        console.log(posKey1);
        console.log(posKey2);
        console.log(posKey3);
        console.log(posKey4);

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
                console.log(piano);

                i = 0;
        }

        function descerDiv() {
                for (i = 0; i <= notas.length; i++) {
                        let nota = notas[i];
                        let posY = parseInt(nota.style.top || 0);
                        posY += 1;
                        nota.style.top = posY + "px";

                        if (posY >= (posKey1.y + 25)) {
                                nota.remove();
                        }

                }
        }
        
        setInterval(criarDiv, 500);
        setInterval(descerDiv, 5);
}