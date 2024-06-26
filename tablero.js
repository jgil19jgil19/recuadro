let nSudoku=9;
let caracteres = ['9', '1', '2', '3', '4', '5', '6', '7', '8'];

const desordena = (vector) => {
    //let nuevo=[];
    for (let i = 0; i < vector.length; i++) {
        let n = Math.floor(vector.length * Math.random())
        let a = vector[i];
        vector[i] = vector[n];
        vector[n] = a;
    }
}

const generaMenosUnos=(n)=>{
    let elem=[];
    for(let i=0;i<n;i++){
        elem.push(-1)
    }
    return elem;
}
const generaCeros=(n)=>{
    let elem=[];
    for(let i=0;i<n;i++){
        elem.push(0)
    }
    return elem;
}
const generaConjuntosVacios=(n)=>{
    let elem=[];
    for(let i=0;i<n;i++){
        elem.push([]);
    }
    return elem;
}
const generaObjetosVacios=(n)=>{
    let elem=[];
    for(let i=0;i<n;i++){
        elem.push({});
    }
    return elem;
}

const GeneraCuadroEspacios = (n)=>{
    let res=[]
    for(let i=0;i<n;i++){
        res.push([]);
        for(let j=0; j<n;j++){
            res[i].push(' ')
        }
    }
    return res;
}

const GeneraNumerosSeg=(n)=>{
    let res=[]
    for(let i=0;i<n;i++){
        res.push(i)
    }
    return res;
}



const ponCaracteres = ( id ) => {
    let mios = document.getElementById(id).value;
    let aux = [];
    if (mios.length < nSudoku) {
        alert('Debe tener '+nSudoku+' caracteres');
        throw new Error('Debe tener '+nSudoku+' caracteres');
    }
    //alert(''+document.getElementById('miInput').value.length)
    for (let i = 0; i < nSudoku; i++) {
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
    //alert (JSON.stringify(caracteres))
}

let tablero = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
//tabla con el bloque al que pertenece una casilla con [f][c]
let bloques = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
//stringifi(bloques)
let TabDis;
//tabla con la [fila y columna] de la casilla n-sima del bloque
let casillasBloque = [];
//tabla que devuelbe la posicion de la casilla en el bloque localizado por su [f][c]
let casillasBloquePos = generaConjuntosVacios(nSudoku);



const inicia = ()=>{
    tablero = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
    if(TabDis){//alert('definido'+TabDis)
        bloques=JSON.parse(TabDis)
        ponCasillas(TabDis);
    }else{
        bloques = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
        casillasBloque = [];
        casillasBloquePos = generaConjuntosVacios(nSudoku);
        ponCasillas();
    }
    tableroNuevo(TabDis)
    //alert('vv'+JSON.stringify(bloques))
}

const ponCasillas = (patron) => {//alert(patron)
    //alert(JSON.stringify(casillasBloquePos))
    if (!patron) {//alert('sin')
        let b = 0;
        for (let i = 0; i < nSudoku; i++) {//alert(i)
            let auxi = Math.floor(i / Math.sqrt(nSudoku));
            for (let j = 0; j < nSudoku; j++) {
                let auxj = Math.floor(j / Math.sqrt(nSudoku));
                //alert(auxi+'-'+auxj+'='+(3*auxi+auxj)+' ll '+casillasBloque[3*auxi+auxj])
                if (!casillasBloque[Math.sqrt(nSudoku) * auxi + auxj]) casillasBloque[Math.sqrt(nSudoku) * auxi + auxj] = [];
                casillasBloque[Math.sqrt(nSudoku) * auxi + auxj].push([i, j]);
                casillasBloquePos[i][j]=casillasBloque[Math.sqrt(nSudoku) * auxi + auxj].length-1;
                bloques[i][j] = Math.sqrt(nSudoku) * auxi + auxj;
            }
        }
    }else {//alert('con')
        bloques=JSON.parse(patron);
        casillasBloque = [];
        for (let i = 0; i < nSudoku; i++){
            casillasBloque.push([]);
        }
        for (let i = 0; i < nSudoku; i++){
            for (let j = 0; j < nSudoku; j++){
                let bk=bloques[i][j];
                casillasBloque[bk].push([i,j]);
                casillasBloquePos[i][j]=casillasBloque[bk].length-1;
            }
        }
    }
    /*alert('bloques:'+JSON.stringify(bloques)+'\n'+
    'casillasBloque:'+JSON.stringify(casillasBloque)+'\n'+
    'casillasBloquePos:'+JSON.stringify(casillasBloquePos))*/
}

const disenaTablero = (id)=>{
    //alert(JSON.stringify( bloques))
    let cuerpo = document.getElementById(id);
    let container = document.createElement("div");
    container.id = 'sudoku-diseno';
    
    //container.innerHTML = "";
    container.className = "sudoku-container";
    container.style.gridTemplateColumns= 'repeat('+nSudoku+', 1fr)';
    container.style.gridTemplateRows='repeat('+nSudoku+', 1fr)';
    container.innerHTML = "";
    //alert('lll'+JSON.stringify(bloques))
    for (let i = 0; i < nSudoku; i++) {
        for (let j = 0; j < nSudoku; j++) {
            let div = document.createElement("div");
            div.id = 'd' + i + '_' + j;
            
            let nb=bloques[i][j];
            div.textContent = nb.toString(nSudoku);
            div.style.backgroundColor= genColContrastado (nSudoku,nb);
            let bordes=ponBordes(i,j,nb)
            div.style.borderBottomWidth=bordes.abajo;
            div.style.borderTopWidth=bordes.arr;
            div.style.borderLeftWidth=bordes.iz;
            div.style.borderRightWidth=bordes.der;
            
            let cccc = GeneraNumerosSeg(nSudoku);
            div.addEventListener("click", () => {
                constructor(bloques[i][j], i, j, cccc, id);
            });
            container.appendChild(div);
        }
        
    }
    while (cuerpo.firstChild) {
        cuerpo.removeChild(cuerpo.firstChild);
    }
    cuerpo.appendChild(container);
}

const genColContrastado = (n,b) =>{
    let r=Math.sqrt(n)
    let paso=(255-150)/r/2;
    let pasob=75/n;
    let pf=Math.floor(b/r);
    let pc=b%r;
    let rr;
    let gg;
    let bb;
    if(pf%2===0) rr=Math.floor(150+paso*pc);
    else rr=Math.ceil(202+paso*pc);
    if((pc+1)%2===0) gg=Math.floor(150+paso*pc);
    else gg=Math.ceil(202+paso*pc);
    if((b+r)%2===0) bb=Math.floor(150+pasob*b);
    else bb=Math.ceil(255-pasob*b);
    let col='rgb('+rr+','+ gg+', '+bb+')'; 
    return col;

}
const ponBordes=(f,c,b)=>{
    let fino='0.05em';
    let gordo='0.15em';
    let tipo={der:fino,iz:fino,arr:fino,abajo:fino}
    if(f-1<0||bloques[f-1][c]!==b)tipo.arr=gordo;
    else tipo.arr=fino; 
    if (nSudoku-f<2||bloques[f+1][c]!==b)tipo.abajo=gordo;
    else tipo.abajo=fino;
    if(c-1<0||bloques[f][c-1]!==b)tipo.iz=gordo;
    else tipo.iz=fino;
    if (nSudoku-c<2||bloques[f][c+1]!==b)tipo.der=gordo;
    else tipo.der=fino;
    return tipo;
}

const constructor = (nb, i,j, elegibles, id)=>{//alert(elegibles)
    activo = false;
    let sel = '<select id="cons_' + i + '_' + j + '" name="cons" onchange="disena(this.value,' + i + ',' + j + ',\''+ id+'\')">';
    elegibles.forEach(p => {
        if(p=== +nb) sel += '<option value="' + p + '" selected> ' + p.toString(nSudoku) + '</option>';
        else sel += '<option value="' + p + '"> ' + p.toString(nSudoku) + '</option>';
    });
    sel += '</select>';
    let ddiv = document.getElementById('ddiv');
    ddiv.style.zIndex = 200;
    ddiv.style.backgroundColor = '#ccc';
    ddiv.style.left = pos.x + 'px';
    ddiv.style.top = pos.y + 'px';
    ddiv.innerHTML = sel;
    ddiv.style.display = "block";
}
const disena=(nb, i, j, id)=>{
    //alert(`nb=${nb}, i=${i}, j=${j}`);
    let ddiv = document.getElementById('ddiv');
    ddiv.style.display = "none";
    let div = document.getElementById('d'+ i + '_' + j)
    div.textContent = nb;
    bloques[i][j]=+nb;
    
    disenaTablero(id);
            
    activo = true;
    //alert(JSON.stringify(bloques))
}
const finDisenno=()=>{//alert(JSON.stringify(bloques))
    //comprobamos que los bloques son correctos.
    let casBlok=generaCeros(nSudoku);
    bloques.forEach(fila=>{
        fila.forEach(col=>{
            casBlok[col]++;
        })
    })
    let correcto=true;
    let errores='Los bloques siguientes presentan errores:\n';
    casBlok.forEach((b,i)=>{
        if(b!==nSudoku){
            correcto=false;
            errores+=`\t-El bloque ${i} tiene ${b} casillas.\n`
        }
    })
    if(correcto){
        TabDis=JSON.stringify(bloques);
        ponCasillas(TabDis);
        ponTablero();
        generaHtml("cuerpo")
    }else{
        alert(errores);
    }
    //alert(JSON.stringify(tablero))
}


let filas = [];
let columnas = [];
let valBloque = [];
let numeros = [];

//registra la lista de casillas puestas,
let puestas = [];
//Contienne todas las celdas que hay en el tablero y se va ajustando quitando las puestas y eliminadas
let quedan = [];
//registra el total de celdas que quedan por poner en un momento dado.
let quedanN = 0;
const ponTablero = () => {
    for (let i = 0; i < nSudoku; i++) {
        filas[i] = { huecos: nSudoku, numeros: [] }
        columnas[i] = { huecos: nSudoku, numeros: [] }
        valBloque[i] = { huecos: nSudoku, numeros: [] }
        numeros[i] = { n: nSudoku, filas: [] }
        for (let ii = 0; ii < nSudoku; ii++) {
            filas[i].numeros.push({ v: ii, q: nSudoku, celdas: [] })
            columnas[i].numeros.push({ v: ii, q: nSudoku, celdas: [] })
            valBloque[i].numeros.push({ v: ii, q: nSudoku, celdas: [] })
            numeros[i].filas.push({ f: ii, q: nSudoku, col: [] })

        }
    }
    //let iaux=-1;
    for (let i = 0; i < nSudoku; i++) {
        for (let j = 0; j < nSudoku; j++) {
            tablero[i][j] = { valor: -1, posibles: { n: nSudoku, numeros: [] } }

            for (let k = 0; k < nSudoku; k++) {
                let celda = { v: k, f: i, c: j, b: bloques[i][j], estado: 'c', pos: [nSudoku * nSudoku * i + nSudoku * j + k] }
                tablero[i][j].posibles.numeros.push(celda);

                filas[i].numeros[k].celdas.push(celda);
                columnas[j].numeros[k].celdas.push(celda);
                valBloque[celda.b].numeros[k].celdas.push(celda);
                numeros[celda.v].filas[celda.f].col.push(celda);
                quedan.push(celda);
            }
        }
    }
    quedanN = quedan.length;
}


const generaHtml = (id) => {//alert('siiii'+JSON.stringify(tablero))
    //let container = document.getElementById("sudoku-container");
    //container.innerHTML = "";
    let cuerpo = document.getElementById(id);

    let container = document.createElement("div");
    container.id = 'sudoku-container';
    container.className = "sudoku-container";
    container.style.gridTemplateColumns= 'repeat('+nSudoku+', 1fr)';
    container.style.gridTemplateRows='repeat('+nSudoku+', 1fr)';
    /*if( nSudoku===4)container.className = "sudoku-container4";
    else if(nSudoku===16 ) container.className = "sudoku-container16";
    else container.className = "sudoku-container";//sudoku de 9*/
    container.innerHTML = "";//alert(tablero[0][0].valor);
    //container = document.getElementById("sudoku-container"+contenedor);
    for (let i = 0; i < nSudoku; i++) {
        for (let j = 0; j < nSudoku; j++) {
            let div = document.createElement("div");
            div.id = 'c' + i + '_' + j;
            // div.style.minHeight='100 px';
            if (tablero[i][j].valor >= 0) {//alert(i+'-'+j);
                //div.textContent = tablero[i][j].valor;
                div.textContent = caracteres[tablero[i][j].valor];

                let nb=bloques[i][j];
                div.style.backgroundColor= genColContrastado (nSudoku,nb);
                let bordes=ponBordes(i,j,nb)
                div.style.borderBottomWidth=bordes.abajo;
                div.style.borderTopWidth=bordes.arr;
                div.style.borderLeftWidth=bordes.iz;
                div.style.borderRightWidth=bordes.der;


                if (tablero[i][j].posibles.numeros[tablero[i][j].valor].estado === 'f') {//alert('mmm')
                    div.classList.add("fixed");
                }else  if (tablero[i][j].posibles.numeros[tablero[i][j].valor].estado === 'r') {//alert('mmm')
                    div.classList.add("resolved");
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
                let nb=bloques[i][j];
                let bordes=ponBordes(i,j,nb)
                
                div.style.borderBottomWidth=bordes.abajo;
                div.style.borderTopWidth=bordes.arr;
                div.style.borderLeftWidth=bordes.iz;
                div.style.borderRightWidth=bordes.der;
            }
            container.appendChild(div);
        }
    }

    while (cuerpo.firstChild) {
        cuerpo.removeChild(cuerpo.firstChild);
    }
    cuerpo.appendChild(container);
    document.getElementById('historial').innerHTML = genHistorial(puestas.length - 1);
    
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
    let sel = '<select id="sel_' + i + '_' + j + '" name="eleccion" onchange="cierra(this.value,' + i + ',' + j + ',\'s\')"><option onclick="cierra(\'-1\',' + i + ',' + j + ',\'s\')" value="-1"></option>';
    elegibles.forEach(p => {
        sel += '<option value="' + p + '"> ' + caracteres[p] + '</option>';
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

let fijados = [];
const eliminaCelda = (celda, v, i, j, kk) => {//alert(JSON.stringify(fijados)+'SIIII'+JSON.stringify(celda));
    let texto = JSON.stringify(celda)
    if (kk === 'si') alert(kk + texto)
    if (celda.estado === 'c') {
        celda.estado = 'e';
        actQuedan(celda);
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
       
    }

}



const cierra = (v, i, j, estado, mantenHist) => {//alert(estado)//alert(JSON.stringify(bbloques)+'\n'+JSON.stringify(lbloques));
    //lbloques=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
    //bbloques = [];
    let ddiv = document.getElementById('ddiv');
    ddiv.style.display = "none";
    let div = document.getElementById('c' + i + '_' + j);
    //alert(div)

    //let bloques = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    if (v !== '-1') {
        let valor = parseInt(v);
        let bq = tablero[i][j].posibles.numeros[valor].b;
        //let bqsF=generaMenosUnos(nSudoku);
        //let bqsC=generaMenosUnos(nSudoku);//alert(bqsF)
        //alert(valor+'bloque: '+tablero[i][j].posibles.numeros[valor].b+estado)
        tablero[i][j].posibles.numeros[valor].estado = estado;//'s';
        tablero[i][j].valor = valor;
        //alert(tablero[i][j].posibles.numeros[valor].estado+': '+tablero[i][j].valor)
        if (estado === 's'|| estado ==='r') {
            puestas.push([tablero[i][j].posibles.numeros[valor]]);
            posHistoria = puestas.length;
        } else {
            let grupoFijadas = puestas[puestas.length - 1];
            grupoFijadas.push(tablero[i][j].posibles.numeros[valor]);
        }
        actQuedan(tablero[i][j].posibles.numeros[valor])
        filas[i].huecos--;
        columnas[j].huecos--;
        valBloque[bq].huecos--;
        ///
        //trataGrupos(tablero[i][j].posibles.numeros[valor],bq,'b');


        /*if (bloques[bq] === -1) bbloques.push(bq)
        bloques[bq] = bq;*/
        

        let porBlok=valBloque[bq].numeros[valor].celdas;
        //alert('--++--'+JSON.stringify(valBloque[bq].numeros[valor].celdas))
        
        let nceldasE=0
        for (let k = 0; k < nSudoku; k++) {
            //tablero[i][j] = { valor: -1, posibles:{n:9, numeros:[]}}
            if (k !== valor) {
                let celda = tablero[i][j].posibles.numeros[k];
                if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                //if (numeros[k].filas[i].col[j].estado === 'c') eliminaCelda(numeros[k].filas[i].col[j], valor, i, j);
                nceldasE++
            }

            if(porBlok[k].estado==='c'){
                let celda=porBlok[k];
                eliminaCelda(celda, celda.v, celda.f, celda.c);
                nceldasE++
            }
            //let bqsF=generaMenosUnos();
            //let bqsC=generaMenosUnos();
            if (tablero[i][k].posibles.numeros[valor].estado === 'c') {
                let celda = tablero[i][k].posibles.numeros[valor];
                eliminaCelda(celda, celda.v, celda.f, celda.c);
                nceldasE++
                ////nuevo proceso
                //alert(celda.b+'-'+bq+'-'+bqsF[celda.b])
                /*if(celda.b!==bq&&bqsF[celda.b]===-1){//alert('en fila'+i)
                    trataGrupos(celda,bq,'f');
                    bqsF[celda.b]=celda.b
                }*/
            }
            if (tablero[k][j].posibles.numeros[valor].estado === 'c') {
                let celda = tablero[k][j].posibles.numeros[valor];
                eliminaCelda(celda, celda.v, celda.f, celda.c);
                nceldasE++
                //nuevo proceso
                /*if(celda.b!==bq&&bqsC[celda.b]===-1){
                    trataGrupos(celda,bq,'c');
                    bqsC[celda.b]=celda.b
                }*/
            }
            
        }
        
        //alert('siii')
        div.textContent = valor;
        div.style.color = 'red';
        //ponfijados();
        /*while(normalizables.length>0||filasColLimpiables.length>0){
            normaliza();
        //while(filasColLimpiables.length>0){
            //alert(JSON.stringify(filasColLimpiables))
            limpiaFilasCol();
        }*/
        //alert(JSON.stringify(tablero));
        if (fijados.length > 0) {
            //alert(JSON.stringify(fijados));
            ponfijados(mantenHist);
            
        } else {
            //if (estado === 's')repasoEliminables.push(JSON.stringify({conjBq,gruposBq,numGBq, nBqFC}))
            generaHtml("cuerpo");
            //alert('pp'+'\n'+posHistoria+mantenHist+(!mantenHist))
            if(!mantenHist)HistPuestas = JSON.stringify({nSudoku, caracteres, TabDis,  puestas});
        };
       
    }
    activo = true;
    
}

const actQuedan = (celda) => {
    let aux = quedan[quedanN - 1];
    //alert(JSON.stringify(celda)+'-'+JSON.stringify(aux))
    //kacososo+=JSON.stringify(celda)+'-'+JSON.stringify(aux)+'\n'
    if (aux !== celda) {
        quedan[quedanN - 1] = celda;
        let pos = celda.pos[celda.pos.length - 1];
        aux.pos.push(pos);
        /*if (celda.pos === undefined){
            pos = 9 * 9 * celda.f + 9 * celda.c + celda.v 
            aux.pos = pos;
        } else { 
            aux.pos = celda.pos; 
            pos = celda.pos 
        }*/
        quedan[pos] = aux;
    }
    //alert('++++'+JSON.stringify(celda)+'+'+JSON.stringify(aux))
    //kacososo+=JSON.stringify(celda)+'-'+JSON.stringify(aux)+'\n\n'

    //reubicadas.push(quedan[pos]);
    quedanN--;
}

const ponfijados = (mantenHist) => {
    //alert(JSON.stringify(fijados))
    let deshace = false;
    let causas = '';
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
            cierra(caso.v, caso.f, caso.c, 'f', mantenHist)
        else {
            if (tablero[caso.f][caso.c].posibles.numeros[caso.v].estado === 'e') {//ya no se puede resolver
                causas += 'No es posible poner ' + caso.v + ' en [' + caso.f + ', ' + caso.c + ']\n';
                //alert('No es posible poner ' + caso.v + ' en [' + caso.f + ', ' + caso.c + ']\n')
                deshace = true;
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
    if (causas !== '') {
        //alert(causas + '----\n');
        //deshacer();
        /*let aux = puestas.splice(puestas.length - 1, 1)[0][0]
        fijados = [];
        posHistoria = puestas.length - 1;
        eliminadosExtra.push(aux);
        reGeneraHtml(posHistoria)*/
        let sol = {};
        fijados = [];//limpiamos fijados 
        let problematica=deshacer();
        //alert(JSON.stringify(problematica))
        if (problematica.estado === 'c') {
            eliminaCelda(problematica, problematica.v, problematica.f, problematica.c);
            generaHtml("cuerpo");
        }else alert('Ha fallado algo: '+JSON.stringify(problematica));
        if(false&&puestas.length>90){//bloqueamos esto
        do {
            //deshacer();
            sol = muestraTablero3();
            if(sol.resultados.length===0){
                problematica=deshacer();
                if (problematica.estado === 'c') eliminaCelda(problematica, problematica.v, problematica.f, problematica.c);
                else alert('Ha fallado algo: '+JSON.stringify(problematica));
            }
            //alert('ppppp'+sol.resultados.length);
        } while (sol.resultados.length < 1)
        //{ puestosIni, resultados: TEnsayos}
        //cierra = (v, i, j, estado)
        if(sol.resultados.length > 1) {
            //let ens = JSON.parse(sol.resultados[Math.floor(2 * Math.random())])[sol.puestosIni];
            let ens = JSON.parse(sol.resultados[Math.floor(2 * Math.random())]);
            let p=sol.puestosIni;
            //alert('nnnn '+JSON.stringify(ens))
            while (quedanN > 0) {
                //let c = quedan[Math.floor(quedanN * Math.random())];
                //alert(JSON.stringify(tablero[ens[p].f][ens[p].c].posibles.numeros[ens[p].v]))
                if(tablero[ens[p].f][ens[p].c].posibles.numeros[ens[p].v].estado==='c') cierra(ens[p].v, ens[p].f, ens[p].c, 's');
                p++;
                /*if((new Date()).getMilliseconds-milisegundos>10000){
                    vuelve=true;
                    break;
                }*/
            }
            /*cierra(ens.v, ens.f, ens.c, 's')
            sol = muestraTablero3();*/
        }else if (sol.resultados.length === 1) {
            //let ens=JSON.parse(sol.resultados[Math.floor(2*Math.random())])
            //alert(JSON.stringify(sol))
            let ens = JSON.parse(sol.resultados[0]);
            let pini = sol.puestosIni;
            while (quedanN > 0) {
                cierra(ens[pini].v, ens[pini].f, ens[pini].c, 'f');
                pini++
            }

        }
        }

        //eliminaCelda(ce,ce.v,ce.f,ce.c,'si');

        //cierra (PuestasAux[n][0].v, PuestasAux[n][0].f, PuestasAux[n][0].c, 's');
        //alert('fff')
        //alert('entramos++'+JSON.stringify(eliminadosExtra))   
    }
}

function cargarArchivo() {
    var archivoInput = document.getElementById('archivoInput');
    var contenidoArchivo = document.getElementById('contenidoArchivo');

    var archivo = archivoInput.files[0];
    var lector = new FileReader();

    lector.onload = function (event) {
        var contenido = event.target.result;
        //contenidoArchivo.textContent = contenido;
        HistPuestas = contenido;
        //alert(HistPuestas)
        puestas = JSON.parse(HistPuestas);
        //alert(JSON.stringify(puestas.puestas))
        nSudoku=puestas.nSudoku;
        document.getElementById('tipo').value=nSudoku
        caracteres=puestas.caracteres
        document.getElementById('miInput').value=caracteres.join('')
        TabDis=puestas.TabDis;
        let auxPuestas=puestas.puestas;
        //tableroNuevo(TabDis);
        puestas=auxPuestas
        //alert('+++'+JSON.stringify(puestas.puestas))puestas=puestas.puestas;
        //alert(JSON.stringify(puestas)) 
        //ponCaracteres();tableroNuevo(TabDis);GenConjBq();GenNBqFC();ponRepasoEliminables();      
        reGeneraHtml(puestas.length - 1)
    }

    lector.readAsText(archivo);
}
function guardarArchivo(texto) {
    //const contenido = document.getElementById('contenido').value;
    const contenido = texto;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    let date = new Date();
    let coleta = '-' + date.getTime();
    enlaceDescarga.download = 'miarchivo' + coleta + '.txt';
    enlaceDescarga.innerHTML = 'Descargar Archivo';
    document.body.appendChild(enlaceDescarga);

    enlaceDescarga.click();

    // Liberar el recurso URL creado
    URL.revokeObjectURL(url);
}

let HistPuestas;//=JSON.stringify()
let posHistoria;




const reGeneraHtml = (n) => {//alert('entramos: '+n+'\n'+posHistoria)
    //alert(n+' - '+puestas.length)
    if (n === undefined || n === null || n >= puestas.length) {//alert(n+'iii'+posHistoria);
        //dejamos lo que se ve
        /*let aux = puestas.splice(0, posHistoria);
        puestas = aux;*/
        if(HistPuestas===undefined||n===undefined||n === null) {
            HistPuestas = JSON.stringify({nSudoku, caracteres, TabDis,  puestas});
            n=puestas.length
        }
        let PuestasAux = JSON.parse(HistPuestas);
        nSudoku=PuestasAux.nSudoku;
        caracteres=PuestasAux.caracteres;
        TabDis=PuestasAux.TabDis;
        //tableroNuevo(TabDis)
        PuestasAux=PuestasAux.puestas;
        let naux=puestas.length;
        for (let i = naux; i <= n; i++) {
            let aux = PuestasAux[i][0];//alert(i+': '+JSON.stringify(aux))
            cierra(aux.v, aux.f, aux.c, aux.estado, true);
        }
        
        document.getElementById('historial').innerHTML = genHistorial(n,PuestasAux/*posHistoria - 1*/);
    } else {//alert('carga?')
        posHistoria = n + 1;//alert(HistPuestas+'\n'+JSON.stringify(gruposBq));
        if(HistPuestas===undefined) HistPuestas = JSON.stringify({nSudoku, caracteres, TabDis,  puestas});
        let PuestasAux = JSON.parse(HistPuestas);
        nSudoku=PuestasAux.nSudoku;
        caracteres=PuestasAux.caracteres;
        TabDis=PuestasAux.TabDis;
        //tableroNuevo(TabDis)
        PuestasAux=PuestasAux.puestas;
        let cuerpo = document.getElementById("cuerpo");
        cuerpo.innerHTML = '';
        inicia();
        
        for (let i = 0; i <= n; i++) {
            let aux = PuestasAux[i][0];//alert(i+': '+JSON.stringify(aux))
            cierra(aux.v, aux.f, aux.c, aux.estado, true);
        }
        
        let kk=JSON.parse(HistPuestas).puestas;
        
        document.getElementById('historial').innerHTML = genHistorial(n,kk/*n*/);
    }
    

}

const tableroNuevo = (patron) => {
    puestas = [];
    quedan = [];
    tablero = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
    bloques = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
    casillasBloque = [];
    filas = [];
    columnas = [];
    valBloque = [];
    numeros = [];
    quedan = [];
    if(patron!==undefined)ponCasillas(patron);
    else ponCasillas();
    ponTablero();
    ponCaracteres('miInput');
    generaHtml('cuerpo');
}

const genHistorial = (n, p) => {
    let texto = '';
    if(p===undefined)p=puestas;
    let estiloResueltas='';
    p.forEach((elem, i) => {
        if (i === n) {            
            texto += `<span style="color:red; cusor: pointer;" title="pulsa para ir a este" onclick="reGeneraHtml(${i})">${i}; </span>`;
        } else {
            if(elem[0].estado==='r')estiloResueltas='class="resolved"';
            else estiloResueltas='';
            texto += `<span ${estiloResueltas} style="cusor: pointer;" title="pulsa para ir a este" onclick="reGeneraHtml(${i})">${i}; </span>`;
        }
    })
    return texto;
}

const deshacer = () => {
    let ttx = '['
    for (let i = quedanN; i < quedan.length; i++) {
        ttx += (i) + ': ' + JSON.stringify(quedan[i]) + ',\n'
    }
    //alert(ttx+']');
    let ultimaSeleccionada;
    let p = quedanN;
    let ultimaJugada = [];
    //alert('ll'+p)
    let sel = 0;
    //let kkkkk=quedanN+'\n';
    //let primero=false;
    do {
        //if(p===0)primero=true;
        let celda = quedan[p++];
        if (celda.estado === 's' || celda.estado === 'r') sel++;
        //kkkkk+=(p-1)+': '+JSON.stringify(celda)+' - '+JSON.stringify(quedan[celda.pos[celda.pos.length-1]])+'\n';
        // alert(p+JSON.stringify(celda));
        ultimaJugada.push(celda);//alert('ñ'+celda.estado)
    } while (p < quedan.length && (sel === 0 || quedan[p].estado === 's' || quedan[p].estado === 'r'))//celda.estado!=='s')
    //alert(kkkkk);
    //alert(quedanN+'-'+p+'='+ultimaJugada.length+'\n'+JSON.stringify(ultimaJugada))
    let paux = quedanN;
    quedanN += ultimaJugada.length;
    ultimaJugada.forEach((celda, i) => {
        //return    

        //actQuedan(celda);
        let pos = celda.pos[celda.pos.length - 1];
        let celda2 = quedan[pos];
        let aux = JSON.stringify(celda2);
        //if(celda2!==celda)celda2.pos.pop();
        let pos2 = -1;
        if (celda2 !== celda) {
            celda2.pos.pop();
            pos2 = celda2.pos[celda2.pos.length - 1];
            quedan[pos2] = celda2;
            quedan[pos] = celda;
        }
        //let pos2=celda2.pos[celda2.pos.length-1];
        //if (pos2!==(paux+i))alert(aux+'\n'+JSON.stringify(celda2)+'\n'+JSON.stringify(celda)+': '+(paux+i)+'-'+pos2+'pos'+pos)
        //if(pos>quedanN||pos2>quedanN)alert(aux+'\n'+JSON.stringify(celda2)+'\n'+JSON.stringify(celda)+': '+(paux+i)+'+'+pos2+'pos'+pos)
        if (celda.estado === 'e') {
            tablero[celda.f][celda.c].posibles.n++;
            filas[celda.f].numeros[celda.v].q++;
            columnas[celda.c].numeros[celda.v].q++;
            valBloque[celda.b].numeros[celda.v].q++;
            numeros[celda.v].filas[celda.f].q++;
        } else {//seleccionadas o fijadas
            //tablero[i][j].posibles.numeros[valor].estado = estado;//'s';
            tablero[celda.f][celda.c].valor = -1;
            //alert(JSON.stringify(celda)+tablero[celda.f][celda.c].valor)
            if (celda.estado === 's'||celda.estado === 'r') {
                ultimaSeleccionada=celda;
                puestas.pop();
                //puestas.push([tablero[i][j].posibles.numeros[valor]]);
                posHistoria = puestas.length;
            } else {/*
                let grupoFijadas = puestas[puestas.length - 1];
                grupoFijadas.push(tablero[i][j].posibles.numeros[valor]);
            */}
            //actQuedan(tablero[i][j].posibles.numeros[valor])
            filas[celda.f].huecos++;
            columnas[celda.c].huecos++;
            valBloque[celda.b].huecos++;
        }

        /*if(celda2!==celda)celda2.pos.pop();
        else{
            quedan[pos]=celda2;
            quedan[pos2]=celda;
        }*/
        celda.estado = 'c';


    })
    //puestas.pop();
    //alert('siii'+JSON.stringify(tablero));
    generaHtml("cuerpo");//alert('se deshace: '+repasoEliminables)
    /*repasoEliminables.pop();
    let repant=JSON.parse(repasoEliminables[repasoEliminables.length-1])//.push(JSON.stringify({conjBq,gruposBq,numGBq, nBqFC}))
    conjBq=repant.conjBq;
    gruposBq=repant.gruposBq;
    numGBq=repant.numGBq;
    nBqFC=repant.nBqFC;*/
    //normalizables=[];
    //alert(JSON.stringify(repant))
    return ultimaSeleccionada;

}

//se puede forzar una busqueda por fuerza bruta, si hay mas de una solucion encuetra las dos primeras
const ResuelveBruta = () => {
    //alert(puestas.length)
    //if (puestas.length < 2) generaAlAzar(true);
    //else {
    if (puestas.length === 0) {
        alert('Debe rellenarse alguna casilla, estando vacío vale cualquier solución.')
        return;
    }
    let sol = muestraTablero(2);

    if (sol.resultados.length < 1) {
        alert('NO TIENE SOLUCION')
    } else {
        let elegida;
        let pini = sol.puestosIni;
        if (sol.resultados.length > 1) {
            //alert(sol.puestosIni + '\n' + sol.resultados[0]);
            //alert(sol.puestosIni + '\n' + sol.resultados[1]);
            let result = confirm('Hay al menos dos soluciones ¿pongo la primera encontrada?');
            if (result) elegida = JSON.parse(sol.resultados[0]);
            else elegida = JSON.parse(sol.resultados[1]);
        } else {
            elegida = JSON.parse(sol.resultados[0]);
        }
        while (quedanN > 0) {
            if (tablero[elegida[pini].f][elegida[pini].c].valor === -1) cierra(elegida[pini].v, elegida[pini].f, elegida[pini].c, 'r');
            pini++
        }
        generaHtml('cuerpo')
        //alert(JSON.stringify(puestas))
        //generaHtml();
    }
    //}
}


///Es para resolver por fuerza bruta, en nSoluciones se pasa cuantas queremos encontrar.
const muestraTablero = (nSoluciones) => {
    let nSudokuCuad=nSudoku*nSudoku;
    //alert(JSON.stringify(tablero))
    let ensayos = generaConjuntosVacios(nSudoku+1);//[[], [], [], [], [], [], [], [], [], []];
    let fil_N = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
    let col_N = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
    let blok_N = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
    //alert(JSON.stringify(ensayos))
    //let kk=[];
    for (let i = 0; i < nSudoku; i++)
        for (let j = 0; j < nSudoku; j++) {
            fil_N[i][j] = false;
            col_N[i][j] = false;
            blok_N[i][j] = false;
        }
    //alert(JSON.stringify(fil_N));
    //alert(JSON.stringify(col_N));
    //alert(JSON.stringify(blok_N));
    for (let i = 0; i < nSudoku; i++)
        for (let j = 0; j < nSudoku; j++) {//if(i===0&&j===0)alert(i+' '+j)
            if (tablero[i][j].valor === -1) {
                let itemEnsayo = {};
                itemEnsayo.f = i;
                itemEnsayo.c = j;
                itemEnsayo.b = bloques[i][j];
                itemEnsayo.Vs = [];
                tablero[i][j].posibles.numeros.forEach(celda => {
                    if (celda.estado === 'c') {
                        itemEnsayo.Vs.push(celda.v)
                    }
                })
                desordena(itemEnsayo.Vs)
                ensayos[tablero[i][j].posibles.n].push(itemEnsayo)
            } else {
                ensayos[1].push(tablero[i][j].posibles.numeros[tablero[i][j].valor]);
                fil_N[i][tablero[i][j].valor] = true;
                col_N[j][tablero[i][j].valor] = true;
                blok_N[bloques[i][j]][tablero[i][j].valor] = true;
            }
            //if(i===8&&j===8){kk[3]=1;alert(i+' '+j); alert(JSON.stringify(kk))}
        }
    for (let i = 2; i < ensayos.length; i++) {
        desordena(ensayos[i]);
    }
    //alert(JSON.stringify(ensayos));
    //alert(JSON.stringify(fil_N));
    //alert(JSON.stringify(col_N));
    //alert(JSON.stringify(blok_N));  
    let ensayo = [];
    let puestos = ensayos[1].length;
    for (let i = 0; i < puestos; i++) {
        ensayo[i] = ensayos[1][i];
    }
    let ensayosL = [];
    for (let i = 2; i < nSudoku+1; i++) {
        for (let j = 0; j < ensayos[i].length; j++) {
            ensayosL.push(ensayos[i][j])
        }
    }
    //alert(JSON.stringify(ensayosL))
    let puestosIni = puestos;
    let posEn = 0;
    let posVal = 0;
    let imposible = false;
    let TEnsayos = [];
    //alert('+++\n' + JSON.stringify(ensayosL))
    do { //alert(puestos+'ll\n'+JSON.stringify(ensayo)+'--'+posEn+': '+JSON.stringify(ensayosL[posEn]));
        let e = ensayosL[posEn];
        //if (e === undefined) alert(posEn + JSON.stringify(ensayosL) + ensayo.length + ' puestos ' + puestos + 't' + TEnsayos.length)
        if (e === undefined) break;//daba error en las marchas atras
        //alert(puestos);
        //alert(puestos+'ll'+imposible);
        //alert(JSON.stringify(e))
        // alert('ss'+(!fil_N[e.f][e.Vs[posVal]]&&!col_N[e.c][e.Vs[posVal]]&&!blok_N[e.b][e.Vs[posVal]]))
        if (!fil_N[e.f][e.Vs[posVal]] && !col_N[e.c][e.Vs[posVal]] && !blok_N[e.b][e.Vs[posVal]]) {//se avanza
            //alert('ss'+!fil_N[e.f][e.Vs[posVal]]&&!col_N[e.c][e.Vs[posVal]]&&!blok_N[e.b][e.Vs[posVal]])
            ensayo[puestos++] = { f: e.f, c: e.c, b: e.b, v: e.Vs[posVal], p: posVal };
            fil_N[e.f][e.Vs[posVal]] = true;
            col_N[e.c][e.Vs[posVal]] = true;
            blok_N[e.b][e.Vs[posVal]] = true;
            posVal = 0;
            posEn++;
        } else {
            while (++posVal >= ensayosL[posEn].Vs.length) {//marcha atras
                if (--posEn < 0) {
                    imposible = true;
                    break;
                }
                //alert(puestos+'pe'+posEn+'\n'+JSON.stringify(ensayo));
                let e = ensayo[--puestos];
                fil_N[e.f][e.v] = false;
                col_N[e.c][e.v] = false;
                blok_N[e.b][e.v] = false;
                posVal = e.p
            }
            //alert(posEn+':'+ensayosL[posEn].Vs.length+'llll'+posVal+'puestos'+puestos+'\n'+JSON.stringify(ensayo))
        }
        //alert('---'+puestos)
        if (puestos === nSudokuCuad) {//alert('entramos')
            TEnsayos.push(JSON.stringify(ensayo));
            let ee = ensayo[--puestos];
            fil_N[ee.f][ee.v] = false;
            col_N[ee.c][ee.v] = false;
            blok_N[ee.b][ee.v] = false;
            posEn--;
            posVal = ee.p

            while (++posVal >= ensayosL[posEn].Vs.length) {//marcha atras
                if (--posEn < 0) {
                    imposible = true;
                    break;
                }
                //alert(puestos+'pe'+posEn+'\n'+JSON.stringify(ensayo));
                let e = ensayo[--puestos];
                fil_N[e.f][e.v] = false;
                col_N[e.c][e.v] = false;
                blok_N[e.b][e.v] = false;
                posVal = e.p
            }
        }
    }//while (puestos<81&&!imposible) 
    while (/*puestos<81*/posEn < ensayosL.length && !imposible && TEnsayos.length < nSoluciones)
    //while (/*puestos<81*/posEn < ensayosL.length && !imposible)
    //alert('mmm' + TEnsayos.length);
    //alert('imposible: ' + imposible + ' se acaba' + puestos + '\n' + JSON.stringify(ensayo));
    //alert('+++'+JSON.stringify(JSON.parse(TEnsayos[0])[puestosIni-1])+'\n'+JSON.stringify(JSON.parse(TEnsayos[0])[puestosIni])+'\n'+JSON.stringify(JSON.parse(TEnsayos[0])[puestosIni+1]))
    return { puestosIni: puestosIni, resultados: TEnsayos }
}

const generaAlAzar = () => {

    /*let ahora = new Date();
    let  milisegundos = ahora.getMilliseconds();
    let vuelve=false;*/
    
    //tableroNuevo(TabDis);
    inicia()
    /*puestas = [];
    quedan = [];
    tablero = [[], [], [], [], [], [], [], [], []];
    bloques = [[], [], [], [], [], [], [], [], []];
    casillasBloque = [];
    filas = [];
    columnas = [];
    valBloque = [];
    numeros = [];
    quedan = [];
    //ponCasillas();
    ponTablero();
    ponCaracteres();
    generaHtml();*/
    let aux=-1;

    while (quedanN > 0 && puestas.length>aux) {
        let c = quedan[Math.floor(quedanN * Math.random())];
        aux=puestas.length;
        cierra(c.v, c.f, c.c, 's', false);
        /*if((new Date()).getMilliseconds-milisegundos>10000){
            vuelve=true;
            break;
        }*/
    }
    if(quedanN!==0){
      
        if (puestas.length<20) generaAlAzar();
        else {
            alert(puestas.length)
            let sol = muestraTablero(1);
            let veces=0
            while (sol.resultados.length < 1 && puestas.length>19 && veces<3) {
                //alert('NO TIENE SOLUCION')
                deshacer();
                sol = muestraTablero(1);
                veces++
            }
            //alert(sol.resultados.length+JSON.stringify(sol))
            if (sol.resultados.length === 1) {
                let elegida = JSON.parse(sol.resultados[0]);
                let pini = sol.puestosIni;
                while (quedanN > 0) {
                    if (tablero[elegida[pini].f][elegida[pini].c].valor === -1) cierra(elegida[pini].v, elegida[pini].f, elegida[pini].c, 'r');
                    pini++
                }
                generaHtml('cuerpo')
            }else{
                generaAlAzar();
            }
        }
        
    }
    
    //if(vuelve)generaAlAzar()
    //if(vuelve)generaAlAzar()
    //alert(JSON.stringify(puestas))
    //reGeneraHtml()
}
const kks=()=>{
    let a=[];
    a[7]=7;
    a[2]=2;
    alert(a.length);
    alert(JSON.stringify(a));
    for(let i in a){
        alert(i+':'+a[i])
    }
    a.forEach((e,i)=>{
        alert(e+','+i)
    })
}

///Para generar pdf con recuadros tipo puzle

const cuadro = (pdf, inx, iny, cuadroSize, filas, grosorLinea, tfuente, cuadSudoku, bloquesij) => {
    // Ajusta el tamaño del cuadro grande
    let columnas = filas;
    let tamañoCuadroGrande = cuadroSize * columnas;


    // Establece el grosor de la línea
    pdf.setLineWidth(2*grosorLinea);

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
            //pdf.rect(x, y, cuadroSize, cuadroSize);
	    // Grosor de cada lado del rectángulo
let grosorSuperior = grosorLinea*0.5;
let grosorDerecho = grosorLinea*0.5;
let grosorInferior = grosorLinea*0.5;
let grosorIzquierdo = grosorLinea*0.5;
if(i===0||bloquesij[i][j]!==bloquesij[i-1][j])grosorSuperior=2*grosorLinea;
if(i===filas-1||bloquesij[i][j]!==bloquesij[i+1][j])grosorInferior=2*grosorLinea;
if(j===0||bloquesij[i][j]!==bloquesij[i][j-1])grosorIzquierdo=2*grosorLinea;
if(j===filas-1||bloquesij[i][j]!==bloquesij[i][j+1])grosorDerecho=2*grosorLinea;

// Dibujar el lado superior con un grosor específico
pdf.setLineWidth(grosorSuperior);
pdf.line(x, y, x + cuadroSize, y);

// Dibujar el lado derecho con un grosor específico
pdf.setLineWidth(grosorDerecho);
pdf.line(x + cuadroSize, y, x + cuadroSize, y + cuadroSize);

// Dibujar el lado inferior con un grosor específico
pdf.setLineWidth(grosorInferior);
pdf.line(x + cuadroSize, y + cuadroSize, x, y + cuadroSize);

// Dibujar el lado izquierdo con un grosor específico
pdf.setLineWidth(grosorIzquierdo);
pdf.line(x, y + cuadroSize, x, y);

pdf.setLineWidth(grosorLinea);//le ponemos el pequeño
//pdf.save("rectangulo.pdf");

        }
    }
    //se pintan los grupos de cuadros.
    /*let gl = grosorLinea * 2;
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
    }*/

}

function generarPDF(datosSudoku) {
    // Crea un nuevo objeto jsPDF
    var pdf = new jsPDF();
    /*let tamannos=[];
    let aux=0
    for(let i=0;i<100;i++){
        tamannos.push({i:Math.round(1000*(pdf.getTextDimensions('A').h-aux))/1000, t:Math.round(1000*pdf.getTextDimensions('A').h)/1000 })
        aux=pdf.getTextDimensions('A').h;
    }*/
    //let caracteres=['9','1','2','3','4','5','6','7','8'];
    let miNsudoku
    let misCaracteres=['9','1','2','3','4','5','6','7','8'];
    let misBloqes;
    let sudoku = [[{ v: 8, f: 0, c: 0, b: 0, estado: 's' }], [{ v: 3, f: 1, c: 2, b: 0, estado: 's' }], [{ v: 7, f: 2, c: 1, b: 0, estado: 's' }], [{ v: 6, f: 1, c: 3, b: 1, estado: 's' }], [{ v: 0, f: 2, c: 4, b: 1, estado: 's' }], [{ v: 2, f: 2, c: 6, b: 2, estado: 's' }], [{ v: 5, f: 3, c: 1, b: 3, estado: 's' }], [{ v: 1, f: 5, c: 3, b: 4, estado: 's' }], [{ v: 4, f: 4, c: 4, b: 4, estado: 's' }], [{ v: 5, f: 4, c: 5, b: 4, estado: 's' }], [{ v: 7, f: 3, c: 5, b: 4, estado: 's' }], [{ v: 7, f: 4, c: 6, b: 5, estado: 's' }], [{ v: 3, f: 5, c: 7, b: 5, estado: 's' }], [{ v: 1, f: 6, c: 2, b: 6, estado: 's' }], [{ v: 8, f: 7, c: 2, b: 6, estado: 's' }], [{ v: 0, f: 8, c: 1, b: 6, estado: 's' }], [{ v: 5, f: 7, c: 3, b: 7, estado: 's' }], [{ v: 4, f: 8, c: 6, b: 8, estado: 's' }], [{ v: 1, f: 7, c: 7, b: 8, estado: 's' }], [{ v: 6, f: 6, c: 7, b: 8, estado: 's' }], [{ v: 8, f: 6, c: 8, b: 8, estado: 's' }], [{ v: 0, f: 0, c: 8, b: 2, estado: 's' }, { v: 0, f: 1, c: 0, b: 0, estado: 'f' }], [{ v: 1, f: 8, c: 4, b: 7, estado: 's' }], [{ v: 1, f: 3, c: 0, b: 3, estado: 's' }, { v: 1, f: 2, c: 5, b: 1, estado: 'f' }, { v: 1, f: 0, c: 1, b: 0, estado: 'f' }, { v: 1, f: 4, c: 8, b: 5, estado: 'f' }, { v: 1, f: 1, c: 6, b: 2, estado: 'f' }], [{ v: 2, f: 5, c: 0, b: 3, estado: 's' }, { v: 7, f: 5, c: 2, b: 3, estado: 'f' }, { v: 0, f: 5, c: 5, b: 4, estado: 'f' }, { v: 0, f: 6, c: 3, b: 7, estado: 'f' }, { v: 0, f: 7, c: 6, b: 8, estado: 'f' }], [{ v: 8, f: 8, c: 5, b: 7, estado: 's' }, { v: 2, f: 1, c: 5, b: 1, estado: 'f' }, { v: 6, f: 7, c: 5, b: 7, estado: 'f' }, { v: 6, f: 4, c: 1, b: 3, estado: 'f' }, { v: 4, f: 6, c: 5, b: 7, estado: 'f' }, { v: 3, f: 0, c: 5, b: 1, estado: 'f' }, { v: 3, f: 2, c: 8, b: 2, estado: 'f' }, { v: 3, f: 4, c: 0, b: 3, estado: 'f' }, { v: 0, f: 4, c: 2, b: 3, estado: 'f' }, { v: 8, f: 5, c: 1, b: 3, estado: 'f' }, { v: 4, f: 5, c: 8, b: 5, estado: 'f' }, { v: 4, f: 3, c: 2, b: 3, estado: 'f' }, { v: 6, f: 0, c: 6, b: 2, estado: 'f' }, { v: 3, f: 6, c: 6, b: 8, estado: 'f' }, { v: 3, f: 8, c: 3, b: 7, estado: 'f' }, { v: 3, f: 7, c: 1, b: 6, estado: 'f' }, { v: 3, f: 3, c: 4, b: 4, estado: 'f' }, { v: 6, f: 3, c: 8, b: 5, estado: 'f' }, { v: 5, f: 6, c: 0, b: 6, estado: 'f' }, { v: 5, f: 5, c: 6, b: 5, estado: 'f' }, { v: 7, f: 0, c: 3, b: 1, estado: 'f' }, { v: 6, f: 5, c: 4, b: 4, estado: 'f' }, { v: 8, f: 1, c: 4, b: 1, estado: 'f' }, { v: 4, f: 7, c: 0, b: 6, estado: 'f' }, { v: 5, f: 0, c: 4, b: 1, estado: 'f' }, { v: 4, f: 2, c: 3, b: 1, estado: 'f' }, { v: 8, f: 2, c: 7, b: 2, estado: 'f' }, { v: 4, f: 1, c: 1, b: 0, estado: 'f' }, { v: 2, f: 6, c: 1, b: 6, estado: 'f' }, { v: 2, f: 0, c: 2, b: 0, estado: 'f' }, { v: 6, f: 8, c: 2, b: 6, estado: 'f' }, { v: 2, f: 8, c: 8, b: 8, estado: 'f' }, { v: 7, f: 6, c: 4, b: 7, estado: 'f' }, { v: 2, f: 7, c: 4, b: 7, estado: 'f' }, { v: 7, f: 7, c: 8, b: 8, estado: 'f' }, { v: 6, f: 2, c: 0, b: 0, estado: 'f' }, { v: 4, f: 0, c: 7, b: 2, estado: 'f' }, { v: 5, f: 2, c: 2, b: 0, estado: 'f' }, { v: 8, f: 4, c: 3, b: 4, estado: 'f' }, { v: 8, f: 3, c: 6, b: 5, estado: 'f' }, { v: 2, f: 3, c: 3, b: 4, estado: 'f' }, { v: 0, f: 3, c: 7, b: 5, estado: 'f' }, { v: 2, f: 4, c: 7, b: 5, estado: 'f' }, { v: 7, f: 8, c: 0, b: 6, estado: 'f' }, { v: 5, f: 8, c: 7, b: 8, estado: 'f' }, { v: 7, f: 1, c: 7, b: 2, estado: 'f' }, { v: 5, f: 1, c: 8, b: 2, estado: 'f' }]]
    let deDatos
    if(datosSudoku!==undefined){
        deDatos=JSON.parse(datosSudoku);
        misCaracteres=deDatos.caracteres;
        sudoku = deDatos.puestas;
        miNsudoku=deDatos.nSudoku
        misBloqes=JSON.parse(deDatos.TabDis)

    }else{ //lo generamos del activo
        misCaracteres=caracteres;
        sudoku = JSON.parse(JSON.stringify(puestas));
        miNsudoku=nSudoku;
        misBloqes=bloques;
    }

    
    let cuadSudoku = GeneraCuadroEspacios(miNsudoku);/*[[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];*/
    let solSudoku = JSON.parse(JSON.stringify(cuadSudoku))
    //alert(cuadSudoku)
    let fijados = [];
    sudoku.forEach(el => {
        cuadSudoku[el[0].f][el[0].c] = misCaracteres[el[0].v]
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
        cuadSudoku[kk[0].f][kk[0].c] = misCaracteres[kk[0].v]
        /*if (kk[0].v === 0) cuadSudoku[kk[0].f][kk[0].c] = '9'
        else cuadSudoku[kk[0].f][kk[0].c] = '' + kk[0].v;*/
    }
    //generamos el cuadro solución
    fijados.forEach(fj => {
        solSudoku[fj.f][fj.c] = misCaracteres[fj.v];
        /*if(fj.v===0)solSudoku[fj.f][fj.c]='9'
        else solSudoku[fj.f][fj.c]=''+fj.v;*/
    })


    cuadro(pdf, 10, 20, 9, miNsudoku, .5, 10, cuadSudoku,misBloqes );
    cuadro(pdf, 120, 20, 9, miNsudoku, .5, 10, solSudoku,misBloqes);

    cuadro(pdf, 10, 110, 9, miNsudoku, .5, 10, cuadSudoku,misBloqes);
    cuadro(pdf, 10, 200, 9, miNsudoku, .5, 10, cuadSudoku,misBloqes);
    9

    // Guarda el PDF con un nombre específico
    pdf.save('recuadros_9x9.pdf');
}

function cargarImprimeArchivo() {
    var archivoInput = document.getElementById('archivoInput');
    var contenidoArchivo = document.getElementById('contenidoArchivo');

    var archivo = archivoInput.files[0];
    var lector = new FileReader();

    lector.onload = function (event) {
        var contenido = event.target.result;
        //alert(contenido)
        //contenidoArchivo.textContent = contenido;
        generarPDF(contenido)
        //alert(HistPuestas)
        
    }

    lector.readAsText(archivo);
}


