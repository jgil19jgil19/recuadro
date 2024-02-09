let caracteres = ['9', '1', '2', '3', '4', '5', '6', '7', '8'];
const ponCaracteres = () => {
    let mios = document.getElementById('miInput').value;
    let aux = [];
    if (mios.length < 9) {
        alert('Debe tener nueve caracteres');
        throw new Error('Debe tener nueve caracteres');
    }
    //alert(''+document.getElementById('miInput').value.length)
    for (let i = 0; i < 9; i++) {
        let ch = mios.substring(i, i + 1);
        //alert(''+ch)
        aux.forEach(a => {
            if (a === ch) {
                alert('No debe haber caracteres repetidos:' + a);
                throw new Error('No debe haber caracteres repetidos:' + a);
            }
        })
        aux.push(mios.substring(i, i + 1));
    }
    caracteres = aux;
}

const cuadro = (pdf, inx, iny, cuadroSize, filas, grosorLinea, tfuente, cuadSudoku) => {
    // Ajusta el tamaño del cuadro grande
    let columnas = filas;
    let tamañoCuadroGrande = cuadroSize * columnas;


    // Establece el grosor de la línea
    pdf.setLineWidth(grosorLinea);

    // Dibuja el cuadro grande
    pdf.rect(inx, iny, tamañoCuadroGrande, tamañoCuadroGrande);

    // Bucle para dibujar los recuadros
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            // Calcula las coordenadas x, y del cuadro actual
            let x = inx + j * cuadroSize;
            let y = iny + i * cuadroSize;

            // Establece el estilo de texto (puedes ajustar según tus preferencias)
            pdf.setFontSize(tfuente);
            pdf.setTextColor(0, 0, 0); // Color del texto: negro

            // Calcula la posición para centrar la letra 'A' en el cuadro grande
            let xTexto = x + cuadroSize / 2;
            let yTexto = y + cuadroSize / 2;

            // Obtén la altura del texto para centrarlo verticalmente
            let alturaTexto = pdf.getTextDimensions('A').h / 5
            yTexto = yTexto + alturaTexto / 2;

            // Coloca el numero en el centro de cada cuador o el blanco
            pdf.text(cuadSudoku[i][j], xTexto, yTexto, null, null, 'center');

            // Restablece el estilo de texto a los valores predeterminados
            pdf.setFontSize(tfuente);
            pdf.setTextColor(0, 0, 0); // Puedes ajustar según tus preferencias


            // Dibuja el cuadro en las coordenadas calculadas
            pdf.rect(x, y, cuadroSize, cuadroSize);
        }
    }
    //se pintan los grupos de cuadros.
    let gl = grosorLinea * 2;
    pdf.setLineWidth(gl);
    let cs = cuadroSize * Math.sqrt(filas);
    let bloque = Math.sqrt(filas);
    pdf.rect(inx, iny, tamañoCuadroGrande, tamañoCuadroGrande);
    for (let i = 0; i < bloque; i++) {
        for (let j = 0; j < bloque; j++) {
            let x = inx + j * cs;
            let y = iny + i * cs;
            pdf.rect(x, y, cs, cs);
        }
    }

}

function generarPDF() {
    // Crea un nuevo objeto jsPDF
    var pdf = new jsPDF();
    /*let tamannos=[];
    let aux=0
    for(let i=0;i<100;i++){
        tamannos.push({i:Math.round(1000*(pdf.getTextDimensions('A').h-aux))/1000, t:Math.round(1000*pdf.getTextDimensions('A').h)/1000 })
        aux=pdf.getTextDimensions('A').h;
    }*/
    //let caracteres=['9','1','2','3','4','5','6','7','8'];
    //let caracteres=['A','B','C','D','E','F','G','H','I'];
    let sudoku = [[{ v: 8, f: 0, c: 0, b: 0, estado: 's' }], [{ v: 3, f: 1, c: 2, b: 0, estado: 's' }], [{ v: 7, f: 2, c: 1, b: 0, estado: 's' }], [{ v: 6, f: 1, c: 3, b: 1, estado: 's' }], [{ v: 0, f: 2, c: 4, b: 1, estado: 's' }], [{ v: 2, f: 2, c: 6, b: 2, estado: 's' }], [{ v: 5, f: 3, c: 1, b: 3, estado: 's' }], [{ v: 1, f: 5, c: 3, b: 4, estado: 's' }], [{ v: 4, f: 4, c: 4, b: 4, estado: 's' }], [{ v: 5, f: 4, c: 5, b: 4, estado: 's' }], [{ v: 7, f: 3, c: 5, b: 4, estado: 's' }], [{ v: 7, f: 4, c: 6, b: 5, estado: 's' }], [{ v: 3, f: 5, c: 7, b: 5, estado: 's' }], [{ v: 1, f: 6, c: 2, b: 6, estado: 's' }], [{ v: 8, f: 7, c: 2, b: 6, estado: 's' }], [{ v: 0, f: 8, c: 1, b: 6, estado: 's' }], [{ v: 5, f: 7, c: 3, b: 7, estado: 's' }], [{ v: 4, f: 8, c: 6, b: 8, estado: 's' }], [{ v: 1, f: 7, c: 7, b: 8, estado: 's' }], [{ v: 6, f: 6, c: 7, b: 8, estado: 's' }], [{ v: 8, f: 6, c: 8, b: 8, estado: 's' }], [{ v: 0, f: 0, c: 8, b: 2, estado: 's' }, { v: 0, f: 1, c: 0, b: 0, estado: 'f' }], [{ v: 1, f: 8, c: 4, b: 7, estado: 's' }], [{ v: 1, f: 3, c: 0, b: 3, estado: 's' }, { v: 1, f: 2, c: 5, b: 1, estado: 'f' }, { v: 1, f: 0, c: 1, b: 0, estado: 'f' }, { v: 1, f: 4, c: 8, b: 5, estado: 'f' }, { v: 1, f: 1, c: 6, b: 2, estado: 'f' }], [{ v: 2, f: 5, c: 0, b: 3, estado: 's' }, { v: 7, f: 5, c: 2, b: 3, estado: 'f' }, { v: 0, f: 5, c: 5, b: 4, estado: 'f' }, { v: 0, f: 6, c: 3, b: 7, estado: 'f' }, { v: 0, f: 7, c: 6, b: 8, estado: 'f' }], [{ v: 8, f: 8, c: 5, b: 7, estado: 's' }, { v: 2, f: 1, c: 5, b: 1, estado: 'f' }, { v: 6, f: 7, c: 5, b: 7, estado: 'f' }, { v: 6, f: 4, c: 1, b: 3, estado: 'f' }, { v: 4, f: 6, c: 5, b: 7, estado: 'f' }, { v: 3, f: 0, c: 5, b: 1, estado: 'f' }, { v: 3, f: 2, c: 8, b: 2, estado: 'f' }, { v: 3, f: 4, c: 0, b: 3, estado: 'f' }, { v: 0, f: 4, c: 2, b: 3, estado: 'f' }, { v: 8, f: 5, c: 1, b: 3, estado: 'f' }, { v: 4, f: 5, c: 8, b: 5, estado: 'f' }, { v: 4, f: 3, c: 2, b: 3, estado: 'f' }, { v: 6, f: 0, c: 6, b: 2, estado: 'f' }, { v: 3, f: 6, c: 6, b: 8, estado: 'f' }, { v: 3, f: 8, c: 3, b: 7, estado: 'f' }, { v: 3, f: 7, c: 1, b: 6, estado: 'f' }, { v: 3, f: 3, c: 4, b: 4, estado: 'f' }, { v: 6, f: 3, c: 8, b: 5, estado: 'f' }, { v: 5, f: 6, c: 0, b: 6, estado: 'f' }, { v: 5, f: 5, c: 6, b: 5, estado: 'f' }, { v: 7, f: 0, c: 3, b: 1, estado: 'f' }, { v: 6, f: 5, c: 4, b: 4, estado: 'f' }, { v: 8, f: 1, c: 4, b: 1, estado: 'f' }, { v: 4, f: 7, c: 0, b: 6, estado: 'f' }, { v: 5, f: 0, c: 4, b: 1, estado: 'f' }, { v: 4, f: 2, c: 3, b: 1, estado: 'f' }, { v: 8, f: 2, c: 7, b: 2, estado: 'f' }, { v: 4, f: 1, c: 1, b: 0, estado: 'f' }, { v: 2, f: 6, c: 1, b: 6, estado: 'f' }, { v: 2, f: 0, c: 2, b: 0, estado: 'f' }, { v: 6, f: 8, c: 2, b: 6, estado: 'f' }, { v: 2, f: 8, c: 8, b: 8, estado: 'f' }, { v: 7, f: 6, c: 4, b: 7, estado: 'f' }, { v: 2, f: 7, c: 4, b: 7, estado: 'f' }, { v: 7, f: 7, c: 8, b: 8, estado: 'f' }, { v: 6, f: 2, c: 0, b: 0, estado: 'f' }, { v: 4, f: 0, c: 7, b: 2, estado: 'f' }, { v: 5, f: 2, c: 2, b: 0, estado: 'f' }, { v: 8, f: 4, c: 3, b: 4, estado: 'f' }, { v: 8, f: 3, c: 6, b: 5, estado: 'f' }, { v: 2, f: 3, c: 3, b: 4, estado: 'f' }, { v: 0, f: 3, c: 7, b: 5, estado: 'f' }, { v: 2, f: 4, c: 7, b: 5, estado: 'f' }, { v: 7, f: 8, c: 0, b: 6, estado: 'f' }, { v: 5, f: 8, c: 7, b: 8, estado: 'f' }, { v: 7, f: 1, c: 7, b: 2, estado: 'f' }, { v: 5, f: 1, c: 8, b: 2, estado: 'f' }]]
    sudoku = JSON.parse(JSON.stringify(puestas));
    let cuadSudoku = [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];
    let solSudoku = JSON.parse(JSON.stringify(cuadSudoku))
    //alert(cuadSudoku)
    let fijados = [];
    sudoku.forEach(el => {
        cuadSudoku[el[0].f][el[0].c] = caracteres[el[0].v]
        /*if (el[0].v === 0) cuadSudoku[el[0].f][el[0].c] = '9'
        else cuadSudoku[el[0].f][el[0].c] = '' + el[0].v;*/
        el.forEach((it, i) => {
            if (i > 0) fijados.push(it);
        })
    })
    //adicionales
    let adicionales = 0;
    for (let i = 0; i < adicionales; i++) {
        let aux = Math.floor(fijados.length * Math.random());
        let kk = fijados.splice(aux, 1);
        cuadSudoku[kk[0].f][kk[0].c] = caracteres[kk[0].v]
        /*if (kk[0].v === 0) cuadSudoku[kk[0].f][kk[0].c] = '9'
        else cuadSudoku[kk[0].f][kk[0].c] = '' + kk[0].v;*/
    }
    //generamos el cuadro solución
    fijados.forEach(fj => {
        solSudoku[fj.f][fj.c] = caracteres[fj.v];
        /*if(fj.v===0)solSudoku[fj.f][fj.c]='9'
        else solSudoku[fj.f][fj.c]=''+fj.v;*/
    })


    cuadro(pdf, 10, 20, 9, 9, .5, 10, cuadSudoku);
    cuadro(pdf, 120, 20, 9, 9, .5, 10, solSudoku);

    cuadro(pdf, 10, 110, 9, 9, .5, 10, cuadSudoku);
    cuadro(pdf, 10, 200, 9, 9, .5, 10, cuadSudoku);


    // Guarda el PDF con un nombre específico
    pdf.save('recuadros_9x9.pdf');
}