let tablero = [[], [], [], [], [], [], [], [], []];
//alert('oo')
let bloques = [[], [], [], [], [], [], [], [], []];
let casillasBloque = [];
let filas = [];
let columnas = [];
let valBloque = [];
let numeros = [];

const ponCasillas = (patron) => {//alert(patron)
    if (!patron) {//alert('nnn')
        let b = 0;
        for (let i = 0; i < 9; i++) {//alert(i)
            let auxi = Math.floor(i / 3);
            for (let j = 0; j < 9; j++) {
                let auxj = Math.floor(j / 3);
                //alert(auxi+'-'+auxj+'='+(3*auxi+auxj)+' ll '+casillasBloque[3*auxi+auxj])
                if (!casillasBloque[3 * auxi + auxj]) casillasBloque[3 * auxi + auxj] = [];
                casillasBloque[3 * auxi + auxj].push([i, j]);
                bloques[i][j] = 3 * auxi + auxj;
            }
        }
    }
    //alert('se acaba')
}

const getCasBloque = (fil, col) => {
    return casillasBloque[bloques[fil][col]];
}

let puestas=[];
let quedan=[];
let quedanN=0;
const ponTablero = () => {
    for (let i = 0; i < 9; i++) {
        filas[i] = { huecos: 9, numeros: [] }
        columnas[i] = { huecos: 9, numeros: [] }
        valBloque[i] = { huecos: 9, numeros: [] }
        numeros[i] = { n: 9, filas: [] }
        for (let ii = 0; ii < 9; ii++) {
            filas[i].numeros.push({ v: ii, q: 9, celdas: [] })
            columnas[i].numeros.push({ v: ii, q: 9, celdas: [] })
            valBloque[i].numeros.push({ v: ii, q: 9, celdas: [] })
            numeros[i].filas.push({ f: ii, q: 9, col: [] })

        }
    }
    //let iaux=-1;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            tablero[i][j] = { valor: -1, posibles: { n: 9, numeros: [] } }

            for (let k = 0; k < 9; k++) {
                let celda = { v: k, f: i, c: j, b: bloques[i][j], estado: 'c' }
                tablero[i][j].posibles.numeros.push(celda);

                filas[i].numeros[k].celdas.push(celda);
                columnas[j].numeros[k].celdas.push(celda);
                valBloque[celda.b].numeros[k].celdas.push(celda);
                numeros[celda.v].filas[celda.f].col.push(celda);
                quedan.push(celda);
            }
        }
    }
    quedanN=quedan.length;
}
function cargarArchivo() {
    var archivoInput = document.getElementById('archivoInput');
    var contenidoArchivo = document.getElementById('contenidoArchivo');
  
    var archivo = archivoInput.files[0];
    var lector = new FileReader();
  
    lector.onload = function(event) {
      var contenido = event.target.result;
      //contenidoArchivo.textContent = contenido;
      HistPuestas=contenido;
      puestas=JSON.parse(HistPuestas);
      reGeneraHtml(puestas.length-1)
    }
  
    lector.readAsText(archivo);
  }
  function guardarArchivo(texto) {
    //const contenido = document.getElementById('contenido').value;
    const contenido=texto;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    let date=new Date();
    let coleta='-'+date.getTime();
    enlaceDescarga.download = 'miarchivo'+coleta+'.txt';
    enlaceDescarga.innerHTML = 'Descargar Archivo';
    document.body.appendChild(enlaceDescarga);

    enlaceDescarga.click();

    // Liberar el recurso URL creado
    URL.revokeObjectURL(url);
}
let HistPuestas;//=JSON.stringify()
let posHistoria;
const reGeneraHtml=(n)=>{//alert('entramos: '+n)
    
    if(n===undefined||n===null||n>=puestas.length){//alert(n);
        //dejamos lo que se ve
        let aux=puestas.splice(0,posHistoria);
        puestas=aux;
        HistPuestas=JSON.stringify(puestas);
        ponExtras(true);
        document.getElementById('historial').innerHTML=genHistorial(posHistoria-1);
    }else{
        posHistoria=n+1;
        HistPuestas=JSON.stringify(puestas);
        let PuestasAux=JSON.parse(HistPuestas);
        let cuerpo = document.getElementById("cuerpo");
        cuerpo.innerHTML='';
        puestas=[];
        tablero = [[], [], [], [], [], [], [], [], []];
        bloques = [[], [], [], [], [], [], [], [], []];
        casillasBloque = [];
        filas = [];
        columnas = [];
        valBloque = [];
        numeros = [];
        ponCasillas();
        ponTablero();
        generaHtml();
        ponExtras();
        for(let i=0;i<=n;i++){
            let aux=PuestasAux[i][0];
            cierra (aux.v, aux.f, aux.c, 's');
        }
        //ponExtras();
        /*alert('ee'+JSON.stringify(eliminadosExtra))
        for(let ei=0;ei<eliminadosExtra.length;ei++){
            let ce=eliminadosExtra[ei];
            //alert(ei+''+JSON.stringify(ce));
            let cel=tablero[ce.f][ce.c].posibles.numeros[ce.v]
            cel.estado='c';
            eliminaCelda(cel,ce.v,ce.f,ce.c);
        }*/
        //cierra (PuestasAux[n][0].v, PuestasAux[n][0].f, PuestasAux[n][0].c, 's');
        //alert('fff');
       
        puestas=JSON.parse(HistPuestas);
        document.getElementById('historial').innerHTML=genHistorial(n);
    }
    /*alert('ee'+JSON.stringify(eliminadosExtra))
        if(eliminadosExtra.length>0){
            for(let ei=0;ei<eliminadosExtra.length;ei++){
                let ce=eliminadosExtra[ei];
                alert(ei+''+JSON.stringify(ce));
                let cel=tablero[ce.f][ce.c].posibles.numeros[ce.v]
                if(cel.estado==='c'){alert(cel.estado)
                    eliminaCelda(cel,ce.v,ce.f,ce.c);
                }else{alert('--'+cel.estado)
                    //cel.estado='c';
                    
                    //eliminaCelda(cel,ce.v,ce.f,ce.c);
                }
            }
            //generaHtml();
        }*/

}
const ponExtras = (repinta)=>{
    //alert('ee'+JSON.stringify(eliminadosExtra))
    if(eliminadosExtra.length>0){
        for(let ei=0;ei<eliminadosExtra.length;ei++){
            let ce=eliminadosExtra[ei];
            //alert(ei+''+JSON.stringify(ce));
            let cel=tablero[ce.f][ce.c].posibles.numeros[ce.v]
            if(cel.estado==='c'){//alert(cel.estado)
                eliminaCelda(cel,ce.v,ce.f,ce.c/*,'si'*/);
            }else{//alert('--'+cel.estado)
                //cel.estado='c';
                
                //eliminaCelda(cel,ce.v,ce.f,ce.c/*,'si'*/);
            }
        }
        if(repinta)generaHtml();
    }
}
const genHistorial=(n)=>{
    let texto='';
    puestas.forEach((elem,i)=>{
        if(i===n){
            texto+=`<span style="color:red; cusor: pointer;" title="pulsa para ir a este" onclick="reGeneraHtml(${i})">${i}; </span>`;
        }else{
            texto+=`<span style="cusor: pointer;" title="pulsa para ir a este" onclick="reGeneraHtml(${i})">${i}; </span>`;
        }
    })
    return texto;
}

ponCasillas();
ponTablero();

const generaHtml = () => {//alert('siiii')
    //let container = document.getElementById("sudoku-container");
    //container.innerHTML = "";
    let cuerpo = document.getElementById("cuerpo");
    let container = document.createElement("div");
    container.id = 'sudoku-container';
    container.className = "sudoku-container";
    container.innerHTML = "";
    //container = document.getElementById("sudoku-container"+contenedor);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let div = document.createElement("div");
            div.id = 'c' + i + '_' + j;
            // div.style.minHeight='100 px';
            if (tablero[i][j].valor >= 0) {//alert(i+'-'+j);
                //div.textContent = tablero[i][j].valor;
                div.textContent = caracteres[tablero[i][j].valor];
                //div.style.color("red");
                //div.classList.add("fixed");
                //alert(''+i+','+j+' : '+tablero[i][j].posibles.numeros[tablero[i][j].valor].estado)
                if(tablero[i][j].posibles.numeros[tablero[i][j].valor].estado==='f'){//alert('mmm')
                    div.classList.add("fixed");
                }
            } else {//alert(i+''+j);
                let cccc = compactaPosibles(tablero[i][j].posibles.numeros);//alert(JSON.stringify(cccc));
                // div.textContent = '.';
                let numPosibles = cccc.length;
                let elegibles = cccc;
                div.style.backgroundColor = 'rgb(' + numPosibles * 25 + ', ' + (255 - numPosibles * 25) + ', ' + numPosibles * 25 + ')';//'#009000';
                div.addEventListener("click", () => {
                    selector(i, j, elegibles);
                });
            }
            container.appendChild(div);
        }
    }

    //let cuerpo=document.getElementById("cuerpo");
    //alert('niii'+container.innerHTML)
    //alert (cuerpo.childNodes[0])
    while (cuerpo.firstChild) {
        cuerpo.removeChild(cuerpo.firstChild);
    }
    cuerpo.appendChild(container);
    //cuerpo.insertBefore(container, cuerpo.childNodes[0]);
    document.getElementById('historial').innerHTML=genHistorial(puestas.length-1);
    //cuerpo.appendChild(container);
    //alert('niii'+cuerpo.innerHTML)
}

const compactaPosibles = (arreglo) => {
    let posibles = [];
    arreglo.forEach(elem => {
        if (elem.estado === 'c') posibles.push(elem.v)
    });
    return posibles;
}

const compactaPosiblesCeldas = (arreglo) => {
    let posibles = [];
    arreglo.forEach(elem => {
        if (elem.estado === 'c') posibles.push(elem)
    });
    return posibles;
}

const selector = (i, j, elegibles) => {//alert(i+','+j+' kkk'+elegibles)
    activo = false;
    let sel = '<select name="eleccion" onchange="cierra(this.value,' + i + ',' + j + ',\'s\')"><option onclick="cierra(\'-1\',' + i + ',' + j + ',\'s\')" value="-1"></option>';
    elegibles.forEach(p => {
        sel += '<option value="'+p+'"> ' + caracteres[p] + '</option>';
    });
    sel += '<option value="-1">-</option></select>';
    //<option>1</option><option>2</option><option>3</option><option>4</option></select>'
    let ddiv = document.getElementById('ddiv');
    ddiv.style.zIndex = 200;
    ddiv.style.backgroundColor = '#ccc';
    ddiv.style.left = pos.x + 'px';
    ddiv.style.top = pos.y + 'px';
    ddiv.innerHTML = sel;
    ddiv.style.display = "block";
    //document.appendChild(ddiv);
   //alert(pos.x+'entramos'+pos.y)
}

let activo = true;
let pos = {};
function obtenerCoordenadas(event) {
    if (activo) {
        var x = event.clientX;
        var y = event.clientY;
        pos.x = x;
        pos.y = y;
    }
    //document.getElementById("coordenadas").innerHTML = "Coordenadas del ratón: " + x + ", " + y+'; '+JSON.stringify(pos);
}

let fijados = [];
const eliminaCelda = (celda, v, i, j,kk) => {//alert(JSON.stringify(fijados)+'SIIII'+JSON.stringify(celda));
    let texto = JSON.stringify(celda)
    if(kk==='si') alert(kk+texto)
    if (celda.estado === 'c') {
        celda.estado = 'e';
        tablero[celda.f][celda.c].posibles.n--;
        if (tablero[celda.f][celda.c].posibles.n === 1) {
            //return celda
            let aux = compactaPosiblesCeldas(tablero[celda.f][celda.c].posibles.numeros)
            if (aux.length === 1 && aux[0] !== tablero[i][j].posibles.numeros[v]) {
                //alert('por huecos'+JSON.stringify(aux));
                if (fijados.length === 0 || fijados[fijados.length - 1] !== aux[0]) fijados.push(aux[0]);
            }
        }
        filas[celda.f].numeros[celda.v].q--;
        if (filas[celda.f].numeros[celda.v].q === 1) {
            //return celda
            let aux = compactaPosiblesCeldas(filas[celda.f].numeros[celda.v].celdas)
            if (aux.length === 1 && aux[0] !== tablero[i][j].posibles.numeros[v]) {
                //alert('por filas'+JSON.stringify(aux));
                if (fijados.length === 0 || fijados[fijados.length - 1] !== aux[0]) fijados.push(aux[0]);
            }
        }
        columnas[celda.c].numeros[celda.v].q--;
        if (columnas[celda.c].numeros[celda.v].q === 1) {
            //return celda
            let aux = compactaPosiblesCeldas(columnas[celda.c].numeros[celda.v].celdas)
            if (aux.length === 1 && aux[0] !== tablero[i][j].posibles.numeros[v]) {
                //alert('por columnas'+JSON.stringify(aux));
                if (fijados.length === 0 || fijados[fijados.length - 1] !== aux[0]) fijados.push(aux[0]);
            }
        }
        valBloque[celda.b].numeros[celda.v].q--;
        if (valBloque[celda.b].numeros[celda.v].q === 1) {
            //return celda
            let aux = compactaPosiblesCeldas(valBloque[celda.b].numeros[celda.v].celdas)
            //alert(JSON.stringify(aux)+'---'+v)
            if (aux.length === 1 && aux[0] !== tablero[i][j].posibles.numeros[v]) {
                //alert('por bloques'+JSON.stringify(aux));
                if (fijados.length === 0 || fijados[fijados.length - 1] !== aux[0]) fijados.push(aux[0]);
            }
            //alert('....')
        }
        /*eliminaCelda(numeros[valor].filas[celda.f].col[celda.c],valor,i,j);
        numeros[i].filas.push({f:ii, q:9, col:[]})*/
        numeros[celda.v].filas[celda.f].q--;
        if (numeros[celda.v].filas[celda.f].q === 1) {
            let aux = compactaPosiblesCeldas(numeros[celda.v].filas[celda.f].col)
            //alert(JSON.stringify(aux)+'---'+v)
            if (aux.length === 1 && aux[0] !== tablero[i][j].posibles.numeros[v]) {
                //alert('por bloques'+JSON.stringify(aux));
                if (fijados.length === 0 || fijados[fijados.length - 1] !== aux[0]) fijados.push(aux[0]);
            }

        }
        //if(fijados.length>0)alert(JSON.stringify(fijados)+'nooo\n'+JSON.stringify(celda)+'\n'+texto);

        if (lbloques[celda.b] === -1) {
            bbloques.push(celda.b);
            lbloques[celda.b] = celda.b;
        }
        if (lfilas[celda.f] === -1) {
            bfilas.push(celda.f);
            lfilas[celda.f] = celda.f;
        }
        if (lcolumnas[celda.c] === -1) {
            bcolumnas.push(celda.c);
            lcolumnas[celda.c] = celda.c;
        }
        if (lnumeros[celda.v] === -1) {
            bnumeros.push(celda.v);
            lnumeros[celda.v] = celda.v;
        }
    }

}

//let bloques=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
let lbloques = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let bbloques = [];
let lfilas = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let bfilas = [];
let lcolumnas = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let bcolumnas = [];
let lnumeros = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let bnumeros = [];
//let nbloques = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
//let mbloques = [];
const cierra = (v, i, j, estado) => {//alert(estado)//alert(JSON.stringify(bbloques)+'\n'+JSON.stringify(lbloques));
    //lbloques=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
    //bbloques = [];
    let ddiv = document.getElementById('ddiv');
    ddiv.style.display = "none";
    let div = document.getElementById('c' + i + '_' + j);
    //let bloques = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    if (v !== '-1') {
        let valor = parseInt(v);//alert(valor)
        let bq = tablero[i][j].posibles.numeros[valor].b;
        /*if (bloques[bq] === -1) bbloques.push(bq)
        bloques[bq] = bq;*/
        if (lbloques[bq] === -1) {
            bbloques.push(bq);
            lbloques[bq] = bq;
            //nbloques.push(bq);
            //mbloques[bq] = bq;
        }

        for (let k = 0; k < 9; k++) {
            //tablero[i][j] = { valor: -1, posibles:{n:9, numeros:[]}}
            if (k !== valor) {
                let celda = tablero[i][j].posibles.numeros[k];
                if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                if (numeros[k].filas[i].col[j].estado === 'c') eliminaCelda(numeros[k].filas[i].col[j], valor, i, j);

            }

            if (!(valBloque[bq].numeros[valor].celdas[k].f === i && valBloque[bq].numeros[valor].celdas[k].c === j)) {
                let celda = valBloque[bq].numeros[valor].celdas[k];
                if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                if (numeros[valor].filas[celda.f].col[celda.c].estado === 'c') eliminaCelda(numeros[valor].filas[celda.f].col[celda.c], valor, i, j);
            }

            let bqfaux = tablero[i][k].posibles.numeros[valor].b;

            if (bqfaux !== bq) {
                //if (bloques[bqfaux] === -1) bbloques.push(bqfaux)
                //bloques[bqfaux] = bqfaux;
                /*if (lbloques[bqfaux] === -1){ 
                    bbloques.push(bqfaux);
                    lbloques[bqfaux] = bqfaux;
                    nbloques.push(bqfaux);
                    mbloques[bqfaux] = bqfaux;
                }*/
                if (tablero[i][k].posibles.numeros[valor].estado === 'c') {

                    let celda = tablero[i][k].posibles.numeros[valor];
                    if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                    if (numeros[valor].filas[celda.f].col[celda.c].estado === 'c') eliminaCelda(numeros[valor].filas[celda.f].col[celda.c], valor, i, j);
                }
            }
            let bqcaux = tablero[k][j].posibles.numeros[valor].b;;

            if (bqcaux !== bq) {
                //if (bloques[bqcaux] === -1) bbloques.push(bqcaux)
                //bloques[bqcaux] = bqcaux;
                /*if (lbloques[bqcaux] === -1){ 
                    bbloques.push(bqcaux);
                    lbloques[bqcaux] = bqcaux;
                    nbloques.push(bqcaux);
                    mbloques[bqfaux] = bqcaux;
                }*/
                if (tablero[k][j].posibles.numeros[valor].estado === 'c') {

                    let celda = tablero[k][j].posibles.numeros[valor];
                    if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                    if (numeros[valor].filas[celda.f].col[celda.c].estado === 'c') eliminaCelda(numeros[valor].filas[celda.f].col[celda.c], valor, i, j);
                }

            }
        }
        
        tablero[i][j].posibles.numeros[valor].estado = estado;//'s';
        tablero[i][j].valor = valor;
        if(estado==='s'){
            puestas.push([tablero[i][j].posibles.numeros[valor]]);
            posHistoria=puestas.length;
        }else{
            let grupoFijadas=puestas[puestas.length-1];
            grupoFijadas.push(tablero[i][j].posibles.numeros[valor]);
        }
        filas[i].huecos--;
        columnas[j].huecos--;
        valBloque[bq].huecos--;

    /*alert(fijados.length+',,,B '+JSON.stringify(lbloques)+'-'+JSON.stringify(bbloques)+'\n'+
    'f '+JSON.stringify(lfilas)+'-'+JSON.stringify(bfilas)+'\n'+
    'c '+JSON.stringify(lcolumnas)+'-'+JSON.stringify(bcolumnas)+'\n'+
    'v '+JSON.stringify(lnumeros)+'-'+JSON.stringify(bnumeros)+'\n')*/
        while (bbloques.length > 0 || bfilas.length > 0 || bcolumnas.length > 0) {
            /*fija2();
            fija3();
            fija4();*/
            //fijaNum();
            fijaGen('b');
            fijaGen('f');
            fijaGen('c');
           
            //fija();
        }
        

        div.textContent = valor;
        div.style.color = 'red';
        //alert(JSON.stringify(tablero));
        if (fijados.length > 0) {
            //alert(JSON.stringify(fijados));
            ponfijados();
        } else generaHtml();
        //alert(JSON.stringify(valBloque))

        //repasaTodo();
    }
    activo = true;
    //alert(JSON.stringify(puestas));
}


const fijaGen = (tipo) => {//alert(tipo)
    let fulminadas = [];
    let fcb1=bbloques;
    switch(tipo){
        case 'b': fcb1=bbloques;break;
        case 'f': fcb1=bfilas;break;
        case 'c': fcb1=bcolumnas;break;
    }
    while (fcb1.length > 0) {//alert('..')        
        let b = bbloques[0];
        let fcbTipo = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        switch (tipo) {
            case 'b':
                fijaNum()
                lbloques[b] = -1;
                bbloques.splice(0, 1);
                fcbTipo = casillasBloque[b]
                break;
            case 'f':
                //fijaNumf()
                b = bfilas[0];
                lfilas[b] = -1;
                bfilas.splice(0, 1);
                break;
            case 'c':
                //fijaNumc()
                b = bcolumnas[0];
                lcolumnas[b] = -1;
                bcolumnas.splice(0, 1);
                break;
        }
        //alert(JSON.stringify(fcbTipo))
        let grupos = [[], [], [], [], [], [], [], [], [], []];//alert('..') 
        let gruposAcum = [[], [], [], [], [], [], [], [], [], []];
        let filasNum = [[], [], [], [], [], [], [], [], []];
        let colsNum = [[], [], [], [], [], [], [], [], []];
        let bloquesNum = [[], [], [], [], [], [], [], [], []];
        let encontrados=[];
        let pendientes=[];
        fcbTipo.forEach((c, ic) => {//alert(c)
            //let celda = { v: k, f: i, c: j, b: bloques[i][j], estado: 'c' }
            //tablero[i][j].posibles.numeros.push(celda);
            //tablero[i][j] = { valor: -1, posibles: { n: 9, numeros: [] } }
            let ns = [];
            let lns = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            let lc = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            //let fi=[];
            //let co=[];
            //let lfi=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
            //let lco=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
            
            for (let i = 0; i < 9; i++) {
                let celda;
                switch (tipo) {
                    case 'b':
                        celda = tablero[c[0]][c[1]].posibles.numeros[i];
                        break;
                    case 'f':
                        celda = tablero[b][c].posibles.numeros[i];
                        break;
                    case 'c':
                        celda = tablero[c][b].posibles.numeros[i];
                        break;
                }
                //alert(JSON.stringify(celda)+'\n'+JSON.stringify(filasNum))
                if (celda.estado === 'c') {
                    if (tipo === 'b') {
                        if (filasNum[celda.v].length === 0) {
                            filasNum[celda.v].push(celda.f)
                        } else {
                            if (filasNum[celda.v][filasNum[celda.v].length - 1] !== celda.f) filasNum[celda.v].push(celda.f)
                        }
                        if (colsNum[celda.v].length === 0) {
                            colsNum[celda.v].push(celda.c)
                        } else {
                            if (colsNum[celda.v][colsNum[celda.v].length - 1] !== celda.c) colsNum[celda.v].push(celda.c)
                        }
                    } else {
                        if (bloquesNum[celda.v].length === 0) {
                            bloquesNum[celda.v].push(celda.b)
                        } else {
                            if (bloquesNum[celda.v][bloquesNum[celda.v].length - 1] !== celda.b) bloquesNum[celda.v].push(celda.b)
                        }
                    }
                }
                //alert(JSON.stringify(celda)+'\n'+JSON.stringify(filasNum))
                if (celda.estado === 'c' && lns[celda.v] === -1) {
                    lns[celda.v] = celda.v;
                    ns.push(celda.v);
                    lc[ic] = ic;
                }
            }
            let grupo;
            switch (tipo) {
                case 'b':
                    grupo = grupos[tablero[c[0]][c[1]].posibles.n];
                    break;
                case 'f':
                    grupo = grupos[tablero[b][c].posibles.n];
                    break;
                case 'c':
                    grupo = grupos[tablero[c][b].posibles.n];
                    break;
            }

            //let grupo=grupos[tablero[b][c].posibles.n];
            //alert('b:'+b+'c:'+c+'\n'+JSON.stringify(ns)+'..\n'+JSON.stringify(lns)+'..\n'+JSON.stringify(grupo)) 
            let nuevo = true;
            for (let i = 0; i < grupo.length; i++) {
                let agru = grupo[i];
                //alert(JSON.stringify(agru)+'\nc'+c+'ns'+ns)
                let pertenece = true;
                for (let j = 0; j < ns.length; j++) {
                    //alert(ns[j]+':'+agru.ns[j])
                    if (ns[j] !== agru.ns[j]) {
                        //alert(ns[j])
                        pertenece = false;
                        break;
                    }
                }
                //alert(pertenece)
                if (pertenece) {
                    agru.c.push(c);
                    agru.lc[ic] = ic;
                    nuevo = false;
                    break;
                }
            }
            if (nuevo && ns.length > 0) {
                grupo.push({ ns: ns, c: [c], lns: lns, lc: lc/*, fi:fi, lfi:lfi */ })
            }

        })
        //alert(JSON.stringify(grupos))
        for (let num = 0; num < 9; num++) { //alert(JSON.stringify(filasNum))
            if (tipo === 'b') {
                if (filasNum[num].length === 1) {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(cf => {
                        let celda = tablero[filasNum[num][0]][cf].posibles.numeros[num];
                        if (celda.b !== b && celda.estado === 'c') {
                            fulminadas.push(celda)
                        }
                    })
                }
                if (colsNum[num].length === 1) {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(cf => {
                        let celda = tablero[cf][colsNum[num][0]].posibles.numeros[num];
                        if (celda.b !== b && celda.estado === 'c') {
                            fulminadas.push(celda)
                        }
                    })
                }
            }else {//filas y columnas
                if (bloquesNum[num].length === 1) {
                    casillasBloque[bloquesNum[num][0]].forEach(cf => {
                        let celda = tablero[cf[0]][cf[1]].posibles.numeros[num];
                        if (tipo === 'f') {//fila
                            if (celda.f !== b && celda.estado === 'c') {
                                fulminadas.push(celda)
                            }
                        } else {//columna
                            if (celda.c !== b && celda.estado === 'c') {
                                fulminadas.push(celda)
                            }
                        }

                    })
                }
                
            }
        }
        //alert(JSON.stringify(fulminadas));
        let ttt='++b: '+b+'\n';
        let celdAcum=[0,0,0,0,0,0,0,0,0];
        let celdAcumCon=0;
        let resul=0;
        let finalizado=false;
        let tope;
        let comienzo=0;
        let inconceldas=0;
        /*filas[i].numeros.push({ v: ii, q: 9, celdas: [] })
            columnas[i].numeros.push({ v: ii, q: 9, celdas: [] })
            valBloque[i].numeros.push({ v: ii, q: 9, celdas: [] })*/
        switch (tipo) {
            case 'b':
                tope=valBloque[b].huecos
                break;
            case 'f':
                tope=filas[b].huecos
                break;
            case 'c':
                tope=columnas[b].huecos
                break;
        }
        for(let i=2;i<tope;i++){//alert(i+'--h: '+valBloque[b].huecos)
            let nceld=0;
            for(let j=0;j<grupos[i].length;j++){ //alert('b:'+b+'i'+i+'j'+j+' l: '+grupos[i].length+'\n'+JSON.stringify(grupos[i][j]))
                /*if(j===0 && resul===0){//alert('entro')
                    resul=JSON.parse(JSON.stringify(grupos[i][j]))
                }else{
                    if(grupos[i][j].c.length===grupos[i][j].ns.length){
                        resul=grupos[i][j];
                        finalizado=true;
                    }
                    //alert('ooo')
                    if(!finalizado){//unimos
                        resul=une(resul,grupos[i][j])
                        
                    }
                }*/
                //alert(JSON.stringify(resul));
                //if(resul.ns.length===resul.c.length)finalizado=true;
                nceld+=grupos[i][j].c.length;
                if(i===grupos[i][j].c.length){
                    if(valBloque[b].huecos===i)ttt+='*'+i+'*';
                    else ttt+='¡*'+i+'*!'
                }
                //let encontrados=[];
                //let pendientes=[];
                if (i===grupos[i][j].c.length) encontrados.push(grupos[i][j]);
                else pendientes.push (grupos[i][j]);
                //pendientes.push (grupos[i][j]);
                //if(finalizado)break;
            }
            celdAcumCon+=nceld;
            if(comienzo===0&&celdAcumCon>=i)comienzo=i;
            if(inconceldas===0&&celdAcumCon>0)inconceldas=i
            celdAcum[i]=celdAcumCon;
            ttt+='num: '+i+'; celdas: '+nceld+'\n';
            //if(finalizado)break;
        }
        //alert("Empezar: "+comienzo+'; con cdldas: '+inconceldas+'\n'+ttt+'\n'+JSON.stringify(celdAcum)+'\n'+finalizado+'\n'+JSON.stringify(resul)+'\n'
        //+JSON.stringify(encontrados)+'\n++'+JSON.stringify(pendientes)+'\n'+Number.isInteger(pendientes));
        for(let i=0;i<pendientes.length;i++){
            for(let j=i+1;j<pendientes.length;j++){
                let ajuntar=true;
                if(Number.isInteger(pendientes[i].c[0])){//alert('jjj')
                    if(pendientes[j].lc[pendientes[i].c[0]]!==-1)ajuntar=false;
                }else{
                    let aux=pendientes[i].c[0];
                    for(let k=0;k<pendientes[j].c.length;k++){
                        let aux2=pendientes[j].c[k];
                        if(aux[0]===aux2[0]&&aux[1]===aux2[1]){
                            ajuntar=false;
                            break; 
                        }
                    }
                }
                if(ajuntar){
                    resul=une(pendientes[j],pendientes[i]);
                    if(resul.c.length===resul.ns.length)encontrados.push(resul);
                    else {
                        if(resul.lns.length<tope){
                            pendientes.push(resul);
                        }
                    }
                }
                if(j>10)alert('i: '+i+' j: '+j+'\n'+JSON.stringify(pendientes))
            }
        }
        encontrados.forEach(elem=>{
            fcbTipo.forEach((c, ci) => {
            if (elem.lc[ci] === -1) {
                let celdas;
                switch (tipo) {
                    case 'b':
                        celdas = tablero[c[0]][c[1]].posibles.numeros;
                        break;
                    case 'f':
                        celdas = tablero[b][c].posibles.numeros;
                        break;
                    case 'c':
                        celdas = tablero[c][b].posibles.numeros;
                        break;
                }
                //let celdas=tablero[c[0]][c[1]].posibles.numeros;
                elem.ns.forEach(n => {
                    if (celdas[n].estado === 'c') {
                        fulminadas.push(celdas[n])
                    }
                })
            }
            })
        })
    }
    //alert(tipo+'fff'+JSON.stringify(fulminadas))
    fulminadas.forEach(c => {
        eliminaCelda(c, c.v, c.f, c.c);
    })
    //alert(JSON.stringify(lbaux)+'\n'+JSON.stringify(baux)+'\G'+JSON.stringify(lbloques)+'\n'+JSON.stringify( bbloques))
    //if(bbloques.length>0)fija2()
    //alert(JSON.stringify(lbaux)+'\n'+JSON.stringify(baux)+'\G'+JSON.stringify(lbloques)+'\n'+JSON.stringify( bbloques))
}

const une=(c1,c2)=>{
    let in1=0;
    let in2=0;
    let ic1=0;
    let ic2=0;
    let res={c:[],ns:[],lc:[],lns:[]}
    //json.parse(json.stringify(c1));
    //let c2=json.parse(json.stringify(c2));
    for(let i=0;i<9;i++){
        if(c1.lns[i]!==-1&&c2.lns[i]!==-1){
            res.lns.push(i);
            res.ns.push(c1.ns[in1++]);
            in2++;
        }else if(c1.lns[i]!==-1&&c2.lns[i]===-1){
            res.lns.push(i);
            res.ns.push(c1.ns[in1++]);
        }else if(c2.lns[i]!==-1&&c1.lns[i]===-1){
            res.lns.push(i);
            res.ns.push(c2.ns[in2++]);
        }else{
            res.lns.push(-1);
        }
        if(c1.lc[i]!==-1&&c2.lc[i]!==-1){
            res.lc.push(i);
            res.c.push(c1.c[ic1++]);
            ic2++;
        }else if(c1.lc[i]!==-1&&c2.lc[i]===-1){
            res.lc.push(i);
            res.c.push(c1.c[ic1++]);
        }else if(c2.lc[i]!==-1&&c1.lc[i]===-1){
            res.lc.push(i);
            res.c.push(c2.c[ic2++]);
        }else{
            res.lc.push(-1);
        }
    }
    return res;

}

const fijaNum = () => {
    let fulminadas = [];
    if(bbloques.length > 0) {
    //while (bbloques.length > 0) {//alert('..')        
        let b = bbloques[0];
        /*lbloques[b] = -1;
        bbloques.splice(0, 1);*/

        let grupos = [[], [], [], [], [], [], [], [], [], []];//alert('..') 
        let gruposAcum = [[], [], [], [], [], [], [], [], [], []];
        let filasNum = [[], [], [], [], [], [], [], [], []];
        let colsNum = [[], [], [], [], [], [], [], [], []];//[0, 1, 2, 3, 4, 5, 6, 7, 8]
        //valBloque[i].numeros.push({ v: ii, q: 9, celdas: [] })
        let encontrados=[];
        let pendientes=[];
        [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((c, ic) => {//alert(c)
        //casillasBloque[b].forEach((c, ic) => {//alert(c)
            //let celda = { v: k, f: i, c: j, b: bloques[i][j], estado: 'c' }
            //tablero[i][j].posibles.numeros.push(celda);
            //tablero[i][j] = { valor: -1, posibles: { n: 9, numeros: [] } }
            let ns = [];
            let lns = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            let lc = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            //let fi=[];
            //let co=[];
            //let lfi=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
            //let lco=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
            for (let i = 0; i < 9; i++) {
                let celda =valBloque[b].numeros[c].celdas[i];
                //let celda = tablero[c[0]][c[1]].posibles.numeros[i];
                //alert(JSON.stringify(celda))
                if (celda.estado === 'c') {
                    if (filasNum[celda.v].length === 0) {
                        filasNum[celda.v].push(celda.f)
                    } else {
                        if (filasNum[celda.v][filasNum[celda.v].length - 1] !== celda.f) filasNum[celda.v].push(celda.f)
                    }
                    if (colsNum[celda.v].length === 0) {
                        colsNum[celda.v].push(celda.c)
                    } else {
                        if (colsNum[celda.v][colsNum[celda.v].length - 1] !== celda.c) colsNum[celda.v].push(celda.c)
                    }
                }
                if (celda.estado === 'c' && lns[i] === -1) {
                    lns[i] = i;
                    ns.push(i);
                    lc[ic] = ic;

                    /*if(lfi[c[0]]===-1){
                        fi.push(c[0]);
                        lfi[c[0]]=c[0];
                    }*/
                }
            }
            //valBloque[b].numeros[c].celdas[i]
            let grupo =grupos[valBloque[b].numeros[c].q]
            //let grupo = grupos[tablero[c[0]][c[1]].posibles.n];
            //alert('b:'+b+'c:'+c+'\n'+JSON.stringify(ns)+'..\n'+JSON.stringify(lns)+'..\n'+JSON.stringify(grupo)) 
            let nuevo = true;
            for (let i = 0; i < grupo.length; i++) {
                let agru = grupo[i];
                //alert(JSON.stringify(agru)+'\nc'+c+'ns'+ns)
                let pertenece = true;
                for (let j = 0; j < ns.length; j++) {
                    //alert(ns[j]+':'+agru.ns[j])
                    if (ns[j] !== agru.ns[j]) {
                        //alert(ns[j])
                        pertenece = false;
                        break;
                    }
                }
                //alert(pertenece)
                if (pertenece) {
                    agru.c.push(c);
                    agru.lc[ic] = ic;
                    /*if(agru.lfi[c[0]]===-1){
                        agru.fi.push(c[0]);
                        agru.lfi[c[0]]=c[0];
                    }*/
                    nuevo = false;
                    break;
                }
            }
            if (nuevo && ns.length > 0) {
                grupo.push({ ns: ns, c: [c], lns: lns, lc: lc/*, fi:fi, lfi:lfi */ })
            }

        })
        for (let num = 0; num < 9; num++) { //alert(JSON.stringify(filasNum))           
            if (filasNum[num].length === 1) {
                [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(cf => {
                    let celda = tablero[filasNum[num][0]][cf].posibles.numeros[num];
                    if (celda.b !== b && celda.estado === 'c') {
                        fulminadas.push(celda)
                    }
                })
            }
            if (colsNum[num].length === 1) {
                [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(cf => {
                    let celda = tablero[cf][colsNum[num][0]].posibles.numeros[num];
                    if (celda.b !== b && celda.estado === 'c') {
                        fulminadas.push(celda)
                    }
                })
            }
        }
      

        let ttt='++b: '+b+'\n';
        let celdAcum=[0,0,0,0,0,0,0,0,0];
        let celdAcumCon=0;
        let resul=0;
        let finalizado=false;
        let tope=valBloque[b].huecos;
        let comienzo=0;
        let inconceldas=0;

        for(let i=2;i<tope;i++){//alert(i+'--h: '+valBloque[b].huecos)
            let nceld=0;
            for(let j=0;j<grupos[i].length;j++){ //alert('b:'+b+'i'+i+'j'+j+' l: '+grupos[i].length+'\n'+JSON.stringify(grupos[i][j]))
                /*if(j===0 && resul===0){//alert('entro')
                    resul=JSON.parse(JSON.stringify(grupos[i][j]))
                }else{
                    if(grupos[i][j].c.length===grupos[i][j].ns.length){
                        resul=grupos[i][j];
                        finalizado=true;
                    }
                    //alert('ooo')
                    if(!finalizado){//unimos
                        resul=une(resul,grupos[i][j])
                        
                    }
                }*/
                //alert(JSON.stringify(resul));
                //if(resul.ns.length===resul.c.length)finalizado=true;
                nceld+=grupos[i][j].c.length;
                if(i===grupos[i][j].c.length){
                    if(valBloque[b].huecos===i)ttt+='*'+i+'*';
                    else ttt+='¡*'+i+'*!'
                }
                //let encontrados=[];
                //let pendientes=[];
                if (i===grupos[i][j].c.length) encontrados.push(grupos[i][j]);
                else pendientes.push (grupos[i][j]);
                //if(finalizado)break;
            }
            celdAcumCon+=nceld;
            if(comienzo===0&&celdAcumCon>=i)comienzo=i;
            if(inconceldas===0&&celdAcumCon>0)inconceldas=i
            celdAcum[i]=celdAcumCon;
            ttt+='num: '+i+'; celdas: '+nceld+'\n';
            //if(finalizado)break;
        }
        //alert(ttt+'\n'+JSON.stringify(celdAcum)+'\n'+finalizado+'\n'+JSON.stringify(resul));
        for(let i=0;i<pendientes.length;i++){
            for(let j=i+1;j<pendientes.length;j++){
                let ajuntar=true;
                if(Number.isInteger(pendientes[i].c[0])){//alert('jjj')
                    if(pendientes[j].lc[pendientes[i].c[0]]!==-1)ajuntar=false;
                }else{
                    let aux=pendientes[i].c[0];
                    for(let k=0;k<pendientes[j].c.length;k++){
                        let aux2=pendientes[j].c[k];
                        if(aux[0]===aux2[0]&&aux[1]===aux2[1]){
                            ajuntar=false;
                            break; 
                        }
                    }
                }
                if(ajuntar){
                    resul=une(pendientes[j],pendientes[i]);
                    if(resul.c.length===resul.ns.length)encontrados.push(resul);
                    else {
                        if(resul.lns.length<tope){
                            pendientes.push(resul);
                        }
                    }
                }
                if(j>10)alert('i: '+i+' j: '+j+'\n'+JSON.stringify(pendientes))
            }
        }
        encontrados.forEach(elem=>{
            [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((c, ci) => {
            if (elem.lc[ci] === -1) {
                let celdas=valBloque[b].numeros[c].celdas;
                //let celdas=tablero[c[0]][c[1]].posibles.numeros;
                elem.ns.forEach(n => {
                    if (celdas[n].estado === 'c') {
                        fulminadas.push(celdas[n])
                    }
                })
            }
            })
        })       

    }
    //let lbaux = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    //let baux = []
    fulminadas.forEach(c => {
        eliminaCelda(c, c.v, c.f, c.c);
        /*if(lbaux[c.b]===-1){
            lbaux[c.b]=c.b;
            baux.push(c.b)
        }
        if (lbloques[c.b] === -1) {
            bbloques.push(c.b);
            lbloques[c.b] = celda.b;
        }*/
    })
    //alert(JSON.stringify(lbaux)+'\n'+JSON.stringify(baux)+'\G'+JSON.stringify(lbloques)+'\n'+JSON.stringify( bbloques))
    //if(bbloques.length>0)fija2()
    //alert(JSON.stringify(lbaux)+'\n'+JSON.stringify(baux)+'\G'+JSON.stringify(lbloques)+'\n'+JSON.stringify( bbloques))
}

let eliminadosExtra=[];
const ponfijados = () => {
    let deshace=false;
    let causas='';
    while (fijados.length > 0) {
        let caso = fijados.splice(0, 1)[0]
        for (let i = 0; i < fijados.length; i++) {
            let c = fijados[i];
            while (c === caso) {
                fijados.splice(i, 1);
                c = fijados[i];
            }
        }
        //let aux=compactaPosiblesCeldas(tablero[celda.f][celda.c].posibles.numeros)
        if (tablero[caso.f][caso.c].posibles.numeros[caso.v].estado === 'c')
            cierra(caso.v, caso.f, caso.c, 'f')
        else {
            if(tablero[caso.f][caso.c].posibles.numeros[caso.v].estado === 'e'){//ya no se puede resolver
            causas+='No es posible poner ' + caso.v + ' en [' + caso.f + ', ' + caso.c + ']\n';
            //alert('No es posible poner ' + caso.v + ' en [' + caso.f + ', ' + caso.c + ']\n')
            deshace=true;
            break;
            }
        }
        /*if(caso.b!==undefined){
            let aux=casillasBloque[caso.b];
            for(let i=0;i<9;i++){
                if(tablero[aux[i][0]][aux[i][1]].posibles[caso.v-1]!==0){
                    if(tablero[aux[i][0]][aux[i][1]].valor===0){
                        cierra(caso.v, aux[i][0], aux[i][1])
                    }else{ alert('Ya se había puesto: ['+aux[i][0]+','+aux[i][1]+'] es: '+tablero[aux[i][0]][aux[i][1]].valor
                    +' buscamos otro para poner :'+caso.v);
                    }
                }
            } 
        }*/
    }
    if(causas!==''){
        alert(causas+'----\n');
    /*if (deshace){ alert('entramos')*/
        let aux=puestas.splice(puestas.length-1,1)[0][0]
        
        //alert('++entramos'+JSON.stringify(aux))
        fijados=[];
        posHistoria=puestas.length-1;
        eliminadosExtra.push(aux);
        reGeneraHtml(posHistoria)
        //eliminaCelda(ce,ce.v,ce.f,ce.c,'si');
        
        //cierra (PuestasAux[n][0].v, PuestasAux[n][0].f, PuestasAux[n][0].c, 's');
        //alert('fff')
        //alert('entramos++'+JSON.stringify(eliminadosExtra))   
    }
}

const muestraTablero=()=>{
    //alert(JSON.stringify(tablero))
    let ensayos=[[],[],[],[],[],[],[],[],[],[]];
    let fil_N=[[],[],[],[],[],[],[],[],[]];
    let col_N=[[],[],[],[],[],[],[],[],[]];
    let blok_N=[[],[],[],[],[],[],[],[],[]];
    //alert(JSON.stringify(ensayos))
    //let kk=[];
    for(let i=0;i<9;i++)
        for(let j=0;j<9;j++){
            fil_N[i][j]=false;
            col_N[i][j]=false;
            blok_N[i][j]=false;
        }
        //alert(JSON.stringify(fil_N));
        //alert(JSON.stringify(col_N));
        //alert(JSON.stringify(blok_N));
    for (let i=0;i<9;i++)
        for(let j=0;j<9;j++){//if(i===0&&j===0)alert(i+' '+j)
            if (tablero[i][j].valor===-1){
                let itemEnsayo={};
                itemEnsayo.f=i;
                itemEnsayo.c=j;
                itemEnsayo.b=bloques[i][j];
                itemEnsayo.Vs=[];
                tablero[i][j].posibles.numeros.forEach(celda=>{
                    if(celda.estado==='c'){
                        itemEnsayo.Vs.push(celda.v)
                    }
                })
                desordena(itemEnsayo.Vs)
                ensayos[tablero[i][j].posibles.n].push(itemEnsayo)
            }else{
                ensayos[1].push(tablero[i][j].posibles.numeros[tablero[i][j].valor]);
                fil_N[i][tablero[i][j].valor]=true;
                col_N[j][tablero[i][j].valor]=true;
                blok_N[bloques[i][j]][tablero[i][j].valor]=true;
            }
            //if(i===8&&j===8){kk[3]=1;alert(i+' '+j); alert(JSON.stringify(kk))}
    }
    for (let i=2;i<ensayos.length;i++){
        desordena(ensayos[i]);
    }
    //alert(JSON.stringify(ensayos));
    //alert(JSON.stringify(fil_N));
    //alert(JSON.stringify(col_N));
    //alert(JSON.stringify(blok_N));  
    let ensayo=[];
    let puestos=ensayos[1].length;
    for(let i=0;i<puestos;i++){
        ensayo[i]=ensayos[1][i];
    }
    let ensayosL=[];
    for(let i=2;i<10;i++){
        for(let j=0;j<ensayos[i].length;j++){
            ensayosL.push(ensayos[i][j])
        }
    }
    //alert(JSON.stringify(ensayosL))
    let puestosIni=puestos; 
    let posEn=0;
    let posVal=0;
    let imposible=false;
    let TEnsayos=[];
    alert('+++\n'+JSON.stringify(ensayosL))
    do{ //alert(puestos+'ll\n'+JSON.stringify(ensayo)+'--'+posEn+': '+JSON.stringify(ensayosL[posEn]));
        let e=ensayosL[posEn];
        
        //alert(puestos);
        //alert(puestos+'ll'+imposible);
        //alert(JSON.stringify(e))
       // alert('ss'+(!fil_N[e.f][e.Vs[posVal]]&&!col_N[e.c][e.Vs[posVal]]&&!blok_N[e.b][e.Vs[posVal]]))
        if(!fil_N[e.f][e.Vs[posVal]]&&!col_N[e.c][e.Vs[posVal]]&&!blok_N[e.b][e.Vs[posVal]]){//se avanza
            //alert('ss'+!fil_N[e.f][e.Vs[posVal]]&&!col_N[e.c][e.Vs[posVal]]&&!blok_N[e.b][e.Vs[posVal]])
            ensayo[puestos++]={f:e.f,c:e.c,b:e.b,v:e.Vs[posVal],p:posVal};
            fil_N[e.f][e.Vs[posVal]]=true;
            col_N[e.c][e.Vs[posVal]]=true;
            blok_N[e.b][e.Vs[posVal]]=true;
            posVal=0;
            posEn++;
        }else{ 
            while(++posVal>=ensayosL[posEn].Vs.length){//marcha atras
                if(--posEn<0){
                    imposible=true;
                    break;
                }
                //alert(puestos+'pe'+posEn+'\n'+JSON.stringify(ensayo));
                let e=ensayo[--puestos];
                fil_N[e.f][e.v]=false;
                col_N[e.c][e.v]=false;
                blok_N[e.b][e.v]=false;
                posVal=e.p
            }
            //alert(posEn+':'+ensayosL[posEn].Vs.length+'llll'+posVal+'puestos'+puestos+'\n'+JSON.stringify(ensayo))
        }
        //alert('---'+puestos)
        if(puestos===81){//alert('entramos')
            TEnsayos.push(JSON.stringify(ensayo));
            let ee=ensayo[--puestos];
            fil_N[ee.f][ee.v]=false;
            col_N[ee.c][ee.v]=false;
            blok_N[ee.b][ee.v]=false;
            posEn--;
            posVal=ee.p

            while(++posVal>=ensayosL[posEn].Vs.length){//marcha atras
                if(--posEn<0){
                    imposible=true;
                    break;
                }
                //alert(puestos+'pe'+posEn+'\n'+JSON.stringify(ensayo));
                let e=ensayo[--puestos];
                fil_N[e.f][e.v]=false;
                col_N[e.c][e.v]=false;
                blok_N[e.b][e.v]=false;
                posVal=e.p
            }
        }
    }while(/*puestos<81*/posEn<ensayosL.length&&!imposible)
    alert('mmm'+TEnsayos.length);
    alert('imposible: '+imposible+' se acaba'+puestos+'\n'+TEnsayos);
    let DensayosL=JSON.parse(JSON.stringify(ensayosL));
    for(let i=0;i<DensayosL.length;i++){//alert('se entra'+JSON.stringify(DensayosL))
        let VVs=[];
        for(let j=0;j<DensayosL[i].Vs.length;j++){//alert('mm')
            let aux={v:DensayosL[i].Vs[j],n:0}
            VVs.push(aux)
        }
        DensayosL[i].nV=0;
        DensayosL[i].VVs=VVs;
    }
    alert(JSON.stringify(DensayosL));
    for (let i=0;i<TEnsayos.length;i++){
        for(let j=0;j<DensayosL.length;j++){//alert(i+'-'+j+'-----'+puestosIni+'\n'+JSON.stringify(TEnsayos[i])+'\n'+JSON.stringify(JSON.parse(TEnsayos[i])[puestosIni+j]))
            let p=JSON.parse(TEnsayos[i])[puestosIni+j].p;//alert('-----'+p)
            if(DensayosL[j].VVs[p].n++===0){
                DensayosL[j].nV++;
            }
        }
    }
    alert('+++\n'+JSON.stringify(DensayosL));
    for(let i=0;i<DensayosL.length;i++){
        //eliminaCelda(cel,ce.v,ce.f,ce.c);
        if(DensayosL[i].nV===1){//fijamos
            for(let j=0;j<DensayosL[i].VVs.length;j++){
                if(DensayosL[i].VVs[j].n===1){
                    let caso=tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v];
                    if(caso.estado==='c')cierra(caso.v, caso.f, caso.c, 'f')
                }
            }
            /*tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v].estado='f';
            tablero[DensayosL[i].f][[DensayosL[i].c]].valor=DensayosL[i].VVs[j].v;*/
        }else{
            for(let j=0;j<DensayosL[i].VVs.length;j++){
                if(DensayosL[i].VVs[j].n===0){//eliminamos
                    let caso=tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v];
                    if(caso.estado==='c')eliminaCelda(caso,caso.v,caso.f,caso.c);
                }
            }
        }

        //for(let j=0;j<DensayosL[i].VVs.length;j++){
        //    if(DensayosL[i].VVs[j].n===0){//eliminamos
        //        let caso=tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v];
        //            if(caso.estado==='c')eliminaCelda(caso,caso.v,caso.f,caso.c);
                //tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v].estado='e';
                              /*if(celda.estado==='c'){
                        itemEnsayo.Vs.push(celda.v)
                    }*/
        //    }else{
        //        if(DensayosL[i].nV===1){//fijamos
        //            let caso=tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v];
        //            if(caso.estado==='c')cierra(caso.v, caso.f, caso.c, 'f')
                    /*tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v].estado='f';
                    tablero[DensayosL[i].f][[DensayosL[i].c]].valor=DensayosL[i].VVs[j].v;*/
        //        }
        //    }
        //}
        

    }
    generaHtml()
    

    /*tablero.forEach(elem=>{
        if(elem.valor===-1){
            let itemEnsayo={}
            elem.posibles.

        }
        tablero[i][j] = { valor: -1, posibles: { n: 9, numeros: [] } }
        let celda = { v: k, f: i, c: j, b: bloques[i][j], estado: 'c' }
                tablero[i][j].posibles.numeros.push(celda);

                filas[i].numeros[k].celdas.push(celda);
                columnas[j].numeros[k].celdas.push(celda);
                valBloque[celda.b].numeros[k].celdas.push(celda);
                numeros[celda.v].filas[celda.f].col.push(celda);
                quedan.push(celda);
    });*/

}

const desordena=(vector)=>{
    //let nuevo=[];
    for (let i=0;i<vector.length;i++){
        let n=Math.floor(vector.length*Math.random())
        let a=vector[i];
        vector[i]=vector[n];
        vector[n]=a;
    }
}