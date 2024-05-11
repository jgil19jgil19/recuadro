let nSudoku=9;
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

let tablero = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
//alert('oo')
let bloques = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
let casillasBloque = [];
let casillasBloquePos = generaConjuntosVacios(nSudoku);
let filas = [];
let columnas = [];
let valBloque = [];
let numeros = [];

const ponCasillas = (patron) => {//alert(patron)
    if (!patron) {//alert('nnn')
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
    }else {
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
    //alert('se acaba')
}

let conjBq=generaConjuntosVacios(nSudoku);
const GenConjBq=()=>{
    for (let b = 0; b < nSudoku; b++){
        conjBq[b]={f:generaMenosUnos(nSudoku), c:generaMenosUnos(nSudoku)};
        let cas= casillasBloque[b];
        cas.forEach(c=>{
            if (conjBq[b].f[c[0]]===-1)conjBq[b].f[c[0]]=1;
            else conjBq[b].f[c[0]]++;
            if (conjBq[b].c[c[1]]===-1)conjBq[b].c[c[1]]=1;
            else conjBq[b].c[c[1]]++;
        })
    }
}
//valBloque[i] = { huecos: nSudoku, numeros: [] }
//valBloque[i].numeros.push({ v: ii, q: nSudoku, celdas: [] })
let gruposBq=generaObjetosVacios(nSudoku);
let numGBq=generaConjuntosVacios(nSudoku);
let nBqFC=generaConjuntosVacios(nSudoku);
let repasoEliminables=[]//para hacer un historico de todos estos elementos;
const ponRepasoEliminables=()=>{
    repasoEliminables.push(JSON.stringify({conjBq,gruposBq,numGBq, nBqFC}))
}
const GenNBqFC=()=>{
    for(let i=0;i<nSudoku;i++){
        nBqFC[i]=generaConjuntosVacios(nSudoku);
        for(let j=0;j<nSudoku;j++){
            nBqFC[i][j]={}
            nBqFC[i][j].f=generaMenosUnos(nSudoku);
            nBqFC[i][j].nf=0;
            nBqFC[i][j].c=generaMenosUnos(nSudoku);
            nBqFC[i][j].nc=0;
            nBqFC[i][j].Fpendiente=true; 
            nBqFC[i][j].Cpendiente=true; 
        }
    }
    //alert(1+JSON.stringify(nBqFC))
    for(let i=0;i<nSudoku;i++){//alert(i)
        let cs=casillasBloque[i];
        //alert(JSON.stringify(cs))
        cs.forEach(c=>{
            if(nBqFC[0][i].f[c[0]]===-1){
                for(let j=0;j<nSudoku;j++){
                    nBqFC[j][i].f[c[0]]=c[0];
                    nBqFC[j][i].nf++;
                }
            }
            if(nBqFC[0][i].c[c[1]]===-1){
                for(let j=0;j<nSudoku;j++){
                    nBqFC[j][i].c[c[1]]=c[1];
                    nBqFC[j][i].nc++;
                }
            }
        })
    }
    //alert(JSON.stringify(nBqFC))
}
//GenNBqFC()
const GenNumGBq=()=>{
    for(let i=0;i<nSudoku;i++){
        numGBq[i]=generaConjuntosVacios(nSudoku);
    }
    /*numGBq.forEach(b=>{
        b=generaConjuntosVacios(nSudoku);
    })*/
    //alert(JSON.stringify(numGBq));
}
GenNumGBq();
let normalizables=[];
const trataGrupos=(celda,bq,tipo)=>{//alert(bq+'-'+celda.b)
    if(bq!==celda.b){ bq=celda.b
            //alert('bloque: '+bq+', valor: '+celda.v+' ,'+JSON.stringify(numGBq[bq][celda.v]));
            let casos=JSON.parse(JSON.stringify(numGBq[bq][celda.v]))
            let fusionado=false;
            let limpiables=[];
            casos.forEach((caso,pos)=>{
                let el=gruposBq[bq][caso];
                if(gruposBq[bq][caso]===undefined){
                    //alert('++++'+caso);
                    limpiables.push({caso,pos})
                }else{
                //alert(caso+':\n'+JSON.stringify(el))
                let nfc=el.nfc;
                let nfilas='';
                let ncol='';
                let nom='';
                let lfil=[];
                let lcol=[];
                for(let i=0;i<nSudoku;i++){
                    if(el.f[i]>=0){
                        nfilas+='_'+el.f[i];
                        lfil.push(el.f[i]);
                        nfc--
                    }else{
                        if(tipo==='f'&&celda.f===i){
                            nfilas+='_'+celda.f;
                            lfil.push(celda.f);
                        }
                    }
                    if(el.c[i]>=0){
                        ncol+='_'+el.c[i];
                        lcol.push(el.c[i]);
                        nfc--
                    }else{
                        if(tipo==='c'&&celda.c===i){
                            ncol+='_'+celda.c;
                            lcol.push(celda.c);
                        }
                    }
                    if(nfc===0){
                        if(tipo==='f'&&celda.f>i){
                            nfilas+='_'+celda.f;
                            lfil.push(celda.f);
                        }
                        if(tipo==='c'&&celda.c>i){
                            ncol+='_'+celda.c;
                            lcol.push(celda.c);
                        }
                        break;
                    };
                }
                if(nfilas!=='')nom='f'+nfilas;
                if(ncol!=='')nom+='c'+ncol;
                //alert('----'+nom);
                let elemento='';
                if(gruposBq[bq][nom]!==undefined){
                    elemento=gruposBq[bq][nom];
                    elemento.v[celda.v]=celda.v;
                    elemento.nv++;
                }else{
                    elemento={v:generaMenosUnos(nSudoku),
                     nv:1,
                     f:JSON.parse(JSON.stringify(el.f)),
                     c:JSON.parse(JSON.stringify(el.c)),
                     n:-1,
                     nfc:el.nfc+1}
                     elemento.v[celda.v]=celda.v
                     if(tipo==='f'){
                        elemento.f[celda.f]=celda.f
                     }else{
                        elemento.c[celda.c]=celda.c
                     }
                    elemento.n=valBloque[bq].huecos;//-conjBq[bq].c[celda.c]
                    lfil.forEach(f=>{
                        elemento.n-=conjBq[bq].f[f];
                        for(let ii=0;ii<lcol.length;ii++){
                            //tablero[i][j].posibles.n
                            if(bloques[f][lcol]===bq&&tablero[f][lcol].posibles.n>1){
                                elemento.n++;
                            }
                        }
                    })
                    lcol.forEach(c=>{
                        elemento.n-=conjBq[bq].c[c];
                    })
                    elemento.pendiente=true;
                    gruposBq[bq][nom]=elemento;
                }
                numGBq[bq][celda.v].push(nom);
                if(elemento.pendiente && elemento.nv===elemento.n && elemento.nv>1){
                    normalizables.push({b:bq, el:elemento});
                    //alert(1+':|n'+JSON.stringify(normalizables))
                }
                //alert(JSON.stringify(gruposBq[bq]))
                
                //alert(',....'+JSON.stringify(el))
                /*if (el.nv>1){
                    el.v[celda.v]=-1;
                    el.nv--;
                }else delete gruposBq[bq][caso];*/
                //alert(',....'+JSON.stringify(gruposBq[bq][caso]));


            }
            })
            //alert(JSON.stringify(limpiables)+'\n'+JSON.stringify(numGBq[bq][celda.v]))
            for(let il=limpiables.length-1;il>=0;il--){
                numGBq[bq][celda.v].splice(limpiables[il].pos,1);
            }
            //alert(JSON.stringify(numGBq[bq][celda.v]))
            /*if(casos.length>0){
                fusionado=true;
                alert(JSON.stringify(casos)+',....'+JSON.stringify(numGBq[bq][celda.v]));
                numGBq[bq][celda.v].splice(0,casos.length);
                alert(',....'+JSON.stringify(numGBq[bq][celda.v]));
            }*/

            if(!fusionado){

            let key=tipo+'_';
            if(tipo==='f'){
                key+=celda.f;
            }else if(tipo==='c'){
                key+=celda.c;
            }
            let elem;//alert(elem)
            if(gruposBq[bq][key]!==undefined){
                elem=gruposBq[bq][key];
            }else{
                elem={v:generaMenosUnos(nSudoku),
                 nv:0,
                 f:generaMenosUnos(nSudoku),
                 c:generaMenosUnos(nSudoku),
                 n:-1,
                 nfc:1}
                 elem.pendiente=true;
            }          
            //nBqFC[i][j].Fpendiente=true;
            if(tipo==='f'){
                if( nBqFC[celda.v][celda.b].Fpendiente&&nBqFC[celda.v][celda.b].nf>0){
                    //alert(celda.v+', '+celda.b+', f:'+celda.f+';\n'+JSON.stringify(nBqFC[celda.v][celda.b]))
                    nBqFC[celda.v][celda.b].f[celda.f]=-2
                    nBqFC[celda.v][celda.b].nf--;
                }
                if(nBqFC[celda.v][celda.b].Fpendiente&&nBqFC[celda.v][celda.b].nf===1){
                    //alert('por filas')
                    let fci=0;
                    while (nBqFC[celda.v][celda.b].f[fci]<0){
                        fci++;
                    }
                    filasColLimpiables.push({tipo:'f', v:celda.v, b:celda.b,fc:fci})
                    //limpiaFilasCol=('f', nBqFC[i],b,fc)
                }
                elem.nv++;
                elem.f[celda.f]=celda.f;
                elem.n=valBloque[bq].huecos-conjBq[bq].f[celda.f]
            }else if(tipo==='c'){
                if( nBqFC[celda.v][celda.b].Cpendiente&&nBqFC[celda.v][celda.b].nc>0){
                    nBqFC[celda.v][celda.b].c[celda.c]=-2
                    nBqFC[celda.v][celda.b].nc--;
                }
                if(nBqFC[celda.v][celda.b].Cpendiente&&nBqFC[celda.v][celda.b].nc===1){
                    //alert('por col')
                    let fci=0;
                    while (nBqFC[celda.v][celda.b].c[fci]<0){
                        fci++;
                    }
                    filasColLimpiables.push({tipo:'c', v:celda.v, b:celda.b, fc:fci})
                    //filasColLimpiables.push({tipo:'c', v:celda.v, b:celda.b,fc:celda.c})
                }
                elem.nv++;
                elem.c[celda.c]=celda.c;
                elem.n=valBloque[bq].huecos-conjBq[bq].c[celda.c]
            }
            elem.v[celda.v]=celda.v;//alert(key);
            //elem.nfc++;
            //alert(key+JSON.stringify(elem)+valBloque[bq].huecos/*+''+JSON.stringify(conjBq)*/);
            gruposBq[bq][key]=elem;
            numGBq[bq][celda.v].push(key);
            if(elem.pendiente&&elem.nv===elem.n && elem.nv>1)normalizables.push({b:bq, el:elem});
            }
            //alert(JSON.stringify(numGBq));
        
    }else{
        //alert('+++'+JSON.stringify(celda)+'\n'+bq)
        let kkss=JSON.stringify(conjBq[celda.b])+'\n';
        conjBq[celda.b].f[celda.f]--;/////////////////////////////
        //alert(JSON.stringify(nBqFC[celda.v][celda.b]))
        nBqFC[celda.v][celda.b].Fpendiente=false;
        nBqFC[celda.v][celda.b].Cpendiente=false;
        for(let i=0;i<nSudoku;i++){
            if(nBqFC[celda.v][celda.b].f[i]!==-1){
                nBqFC[celda.v][celda.b].f[i]=-2
                nBqFC[celda.v][celda.b].nf=0;
            }
            if(nBqFC[celda.v][celda.b].c[i]!==-1){
                nBqFC[celda.v][celda.b].c[i]=-2
                nBqFC[celda.v][celda.b].nc=0;
            }
        }
        //alert(celda.v+'; '+celda.b+':--\n'+JSON.stringify(nBqFC[celda.v][celda.b]))
        if(conjBq[celda.b].f[celda.f]===0){
            /*nBqFC[celda.v][celda.b].Fpendiente=false;
            nBqFC[celda.v][celda.b].Cpendiente=false;*/
            for(let i=0;i<nSudoku;i++){
                //alert(i+'; '+celda.b+':++\n'+JSON.stringify(nBqFC[i][celda.b]))
                if(i!==celda.v && nBqFC[i][celda.b].nf>0  && nBqFC[i][celda.b].f[celda.f]>-1){
                    nBqFC[i][celda.b].f[celda.f]=-2
                    nBqFC[i][celda.b].nf--;
                }
                //alert(i+'; '+celda.b+':\n'+JSON.stringify(nBqFC[i][celda.b]))
                if(nBqFC[i][celda.b].nf===1&&nBqFC[i][celda.b].Fpendiente){
                    //alert('por filas')
                    let fci=0;
                    while (nBqFC[i][celda.b].f[fci]<0){
                        fci++;
                    }
                    filasColLimpiables.push({tipo:'f', v:i, b:celda.b,fc:fci})
                    //filasColLimpiables.push({tipo:'f', v:nBqFC[i], b:[celda.b],fc:celda.f})
                    //limpiaFilasCol=('f', nBqFC[i],b,fc)
                }
                //alert(i+'; '+celda.b+':++\n'+JSON.stringify(nBqFC[i][celda.b]))
                //alert(i+';++\n'+JSON.stringify(nBqFC[i]))
            }
            for (let ii in gruposBq[bq]){
                if(gruposBq[bq][ii].f[celda.f]>-1){
                    delete(gruposBq[bq][ii]);
                }
            } 
        };
        conjBq[celda.b].c[celda.c]--;
        if(conjBq[celda.b].c[celda.c]===0){
            for(let i=0;i<nSudoku;i++){
                if(i!==celda.v && nBqFC[i][celda.b].nc>0 && nBqFC[i][celda.b].c[celda.c]>-1){
                    nBqFC[i][celda.b].c[celda.c]=-2
                    nBqFC[i][celda.b].nc--;
                }
                if(nBqFC[i][celda.b].nc===1&&nBqFC[i][celda.b].Cpendiente){
                    //alert('por col')
                    let fci=0;
                    while (nBqFC[i][celda.b].c[fci]<0){
                        fci++;
                    }
                    filasColLimpiables.push({tipo:'c', v:i, b:celda.b,fc:fci})
                    //filasColLimpiables.push({tipo:'c', v:nBqFC[i], b:[celda.b],fc:celda.c})
                    //limpiaFilasCol=('f', nBqFC[i],b,fc)
                }
            }
            for (let ii in gruposBq[bq]){
                if(gruposBq[bq][ii].c[celda.c]>-1){
                    delete(gruposBq[bq][ii]);
                }
            } 
        };
        //alert('---'+kkss+JSON.stringify(conjBq[celda.b])+'\n'+JSON.stringify(numGBq[celda.b]))
        let casos=numGBq[bq][celda.v];
        casos.forEach(caso=>{
            let el=gruposBq[bq][caso];
            //alert('....'+JSON.stringify(el))
            if (el!==undefined&&el.nv>1){
                el.v[celda.v]=-1;
                el.nv--;
            }else delete gruposBq[bq][caso];
            //alert('....'+JSON.stringify(gruposBq[bq][caso]));
        })
        let zz='++..++';
        for (let ii in gruposBq[bq]){
            zz+=ii;
            if(gruposBq[bq][ii].f[celda.f]===-1&&gruposBq[bq][ii].c[celda.c]===-1){
                gruposBq[bq][ii].n--;
                if(gruposBq[bq][ii].pendiente&&gruposBq[bq][ii].nv===gruposBq[bq][ii].n && gruposBq[bq][ii].nv>1)normalizables.push({b:bq, el:gruposBq[bq][ii]});
            }
        }
        //alert (zz);
    }
    //alert('****'+JSON.stringify(normalizables))
    //alert(JSON.stringify(filasColLimpiables))
    /* if (filasColLimpiables.length>0){
        alert(JSON.stringify(filasColLimpiables))
        limpiaFilasCol();
    }*/
}
//filasColLimpiables.push({tipo:'c', v:i, b:celda.b,fc:fci}
let filasColLimpiables=[];
const limpiaFilasCol=(/*tipo,v,b,fc*/)=>{
    while(filasColLimpiables.length>0){
        let fcp=filasColLimpiables.splice(0,1)[0];
        //alert(JSON.stringify(fcp))
        if(fcp.tipo==='f'){ //alert(JSON.stringify( nBqFC[fcp.v][fcp.b]))
            //{tipo:'c', v:i, b:celda.b,fc:fci}
            //nBqFC[fcp.v][fcp.b].Fpendiente=false;
            let bqsF=generaMenosUnos(nSudoku);
            for(let i=0;i<nSudoku;i++){
                    let celda = tablero[fcp.fc][i].posibles.numeros[fcp.v];
                    nBqFC[celda.v][celda.b].Fpendiente=false;
                    if(celda.b!==fcp.b&&celda.estado==='c'){//alert(fcp.b+'||'+JSON.stringify(celda))
                        eliminaCelda(celda, celda.v, celda.f, celda.c);
                        if(bqsF[celda.b]===-1){
                            trataGrupos(celda,fcp.b,'f');
                            bqsF[celda.b]=celda.b
                        }
                    }                
            }
            //alert('***'+JSON.stringify( nBqFC[fcp.v][fcp.b]))

        }else{
            let bqsC=generaMenosUnos(nSudoku);
            for(let i=0;i<nSudoku;i++){
                let celda = tablero[i][fcp.fc].posibles.numeros[fcp.v];
                nBqFC[fcp.v][fcp.b].Cpendiente=false;
                if(celda.b!==fcp.b&&celda.estado==='c'){
                    eliminaCelda(celda, celda.v, celda.f, celda.c);
                    nBqFC[celda.v][celda.b].Cpendiente=false;
                    if(bqsC[celda.b]===-1){
                        trataGrupos(celda,fcp.b,'c');
                        bqsC[celda.b]=celda.b
                    }
                }
        }

        }

    }

}


const getCasBloque = (fil, col) => {
    return casillasBloque[bloques[fil][col]];
}

let puestas = [];
let quedan = [];
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

const generar2Pdf = () => {
    let tanda = [];
    let sudoku = []

    //alert(cuadSudoku)
    //adicionales
    let adicionales = +document.getElementById('miSelect3').value;
    nSudoku=16;
    //ponCaracteres();tableroNuevo();
    document.getElementById('tipo').value=nSudoku;

    for (let i = 0; i < 6; i++) {
        generaAlAzar();
        //alert('vamos por el sudoku: '+i)
        let fijados = [];
        let cuadSudoku = GeneraCuadroEspacios(nSudoku);/* [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];*/
        let solSudoku = JSON.parse(JSON.stringify(cuadSudoku))
        sudoku = JSON.parse(JSON.stringify(puestas));
        sudoku.forEach(el => {
            cuadSudoku[el[0].f][el[0].c] = caracteres[el[0].v]
            /*if (el[0].v === 0) cuadSudoku[el[0].f][el[0].c] = '9'
            else cuadSudoku[el[0].f][el[0].c] = '' + el[0].v;*/
            el.forEach((it, i) => {
                if (i > 0) fijados.push(it);
            })
        })

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

        tanda.push({ problema: JSON.stringify(cuadSudoku), solucion: JSON.stringify(solSudoku) })
    }
    //alert('kkk'+adicionales)
    let pdf = new jsPDF();
    cuadro(pdf, 10, 15, 8, nSudoku, .5, 10, JSON.parse(tanda[0].problema));
    //cuadro(pdf, 120, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[1].problema));

    cuadro(pdf, 10, 159, 8, nSudoku, .5, 10, JSON.parse(tanda[1].problema));
    //cuadro(pdf, 120, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[3].problema));

   /*cuadro(pdf, 10, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[4].problema));
    cuadro(pdf, 120, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[5].problema));*/

    pdf.addPage();

    pdf.text('SOLUCIONES', 90, 10);

    cuadro(pdf, 10, 15, 8, nSudoku, .5, 10, JSON.parse(tanda[0].solucion));
    //cuadro(pdf, 120, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[1].solucion));

    cuadro(pdf, 10, 159, 8, nSudoku, .5, 10, JSON.parse(tanda[1].solucion));
    //cuadro(pdf, 120, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[3].solucion));

    /*cuadro(pdf, 10, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[4].solucion));
    cuadro(pdf, 120, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[5].solucion));*/
    // Guarda el PDF con un nombre específico
    pdf.save('Hojas2pdfs.pdf');
}

const generar6Pdf = () => {
    let tanda = [];
    let sudoku = []

    //alert(cuadSudoku)
    //adicionales
    let adicionales = +document.getElementById('miSelect').value;
    nSudoku=9;
    //ponCaracteres();tableroNuevo();
    document.getElementById('tipo').value=nSudoku;

    for (let i = 0; i < 6; i++) {
        generaAlAzar();
        //alert('vamos por el sudoku: '+i)
        let fijados = [];
        let cuadSudoku = GeneraCuadroEspacios(nSudoku);/* [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];*/
        let solSudoku = JSON.parse(JSON.stringify(cuadSudoku))
        sudoku = JSON.parse(JSON.stringify(puestas));
        sudoku.forEach(el => {
            cuadSudoku[el[0].f][el[0].c] = caracteres[el[0].v]
            /*if (el[0].v === 0) cuadSudoku[el[0].f][el[0].c] = '9'
            else cuadSudoku[el[0].f][el[0].c] = '' + el[0].v;*/
            el.forEach((it, i) => {
                if (i > 0) fijados.push(it);
            })
        })

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

        tanda.push({ problema: JSON.stringify(cuadSudoku), solucion: JSON.stringify(solSudoku) })
    }
    //alert('kkk'+adicionales)
    let pdf = new jsPDF();
    cuadro(pdf, 10, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[0].problema));
    cuadro(pdf, 120, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[1].problema));

    cuadro(pdf, 10, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[2].problema));
    cuadro(pdf, 120, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[3].problema));

    cuadro(pdf, 10, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[4].problema));
    cuadro(pdf, 120, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[5].problema));

    pdf.addPage();

    pdf.text('SOLUCIONES', 90, 10);

    cuadro(pdf, 10, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[0].solucion));
    cuadro(pdf, 120, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[1].solucion));

    cuadro(pdf, 10, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[2].solucion));
    cuadro(pdf, 120, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[3].solucion));

    cuadro(pdf, 10, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[4].solucion));
    cuadro(pdf, 120, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[5].solucion));
    // Guarda el PDF con un nombre específico
    pdf.save('Hojas6pdfs.pdf');
}

const generar24Pdf = () => {
    let tanda = [];
    let sudoku = []

    //alert(cuadSudoku)
    //adicionales
    let adicionales = +document.getElementById('miSelect2').value;
    nSudoku=4;
    //ponCaracteres();tableroNuevo();
    document.getElementById('tipo').value=nSudoku;


    for (let i = 0; i < 24; i++) {
        generaAlAzar();
        //alert('vamos por el sudoku: '+i)
        let fijados = [];
        let cuadSudoku = GeneraCuadroEspacios(nSudoku);/* [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];*/
        let solSudoku = JSON.parse(JSON.stringify(cuadSudoku))
        sudoku = JSON.parse(JSON.stringify(puestas));
        sudoku.forEach(el => {
            cuadSudoku[el[0].f][el[0].c] = caracteres[el[0].v]
            /*if (el[0].v === 0) cuadSudoku[el[0].f][el[0].c] = '9'
            else cuadSudoku[el[0].f][el[0].c] = '' + el[0].v;*/
            el.forEach((it, i) => {
                if (i > 0) fijados.push(it);
            })
        })

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

        tanda.push({ problema: JSON.stringify(cuadSudoku), solucion: JSON.stringify(solSudoku) })
    }
    //alert('kkk'+adicionales)
    let pdf = new jsPDF();
    cuadro(pdf, 10, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[0].problema));
    cuadro(pdf, 56, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[1].problema));
    cuadro(pdf, 120, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[2].problema));
    cuadro(pdf, 166, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[3].problema));

    cuadro(pdf, 10, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[4].problema));
    cuadro(pdf, 56, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[5].problema));
    cuadro(pdf, 120, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[6].problema));
    cuadro(pdf, 166, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[7].problema));

    cuadro(pdf, 10, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[8].problema));
    cuadro(pdf, 56, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[9].problema));
    cuadro(pdf, 120, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[10].problema));
    cuadro(pdf, 166, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[11].problema));

    cuadro(pdf, 10, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[12].problema));
    cuadro(pdf, 56, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[13].problema));
    cuadro(pdf, 120, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[14].problema));
    cuadro(pdf, 166, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[15].problema));

    cuadro(pdf, 10, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[16].problema));
    cuadro(pdf, 56, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[17].problema));
    cuadro(pdf, 120, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[18].problema));
    cuadro(pdf, 166, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[19].problema));

    cuadro(pdf, 10, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[20].problema));
    cuadro(pdf, 56, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[21].problema));
    cuadro(pdf, 120, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[22].problema));
    cuadro(pdf, 166, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[23].problema));

    pdf.addPage();

    pdf.text('SOLUCIONES', 90, 10);

    //cuadro(pdf, 10, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[0].solucion));
    cuadro(pdf, 10, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[0].solucion));
    cuadro(pdf, 56, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[1].solucion));
    cuadro(pdf, 120, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[2].solucion));
    cuadro(pdf, 166, 20, 9, nSudoku, .5, 10, JSON.parse(tanda[3].solucion));

    cuadro(pdf, 10, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[4].solucion));
    cuadro(pdf, 56, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[5].solucion));
    cuadro(pdf, 120, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[6].solucion));
    cuadro(pdf, 166, 66, 9, nSudoku, .5, 10, JSON.parse(tanda[7].solucion));

    cuadro(pdf, 10, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[8].solucion));
    cuadro(pdf, 56, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[9].solucion));
    cuadro(pdf, 120, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[10].solucion));
    cuadro(pdf, 166, 110, 9, nSudoku, .5, 10, JSON.parse(tanda[11].solucion));

    cuadro(pdf, 10, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[12].solucion));
    cuadro(pdf, 56, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[13].solucion));
    cuadro(pdf, 120, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[14].solucion));
    cuadro(pdf, 166, 156, 9, nSudoku, .5, 10, JSON.parse(tanda[15].solucion));

    cuadro(pdf, 10, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[16].solucion));
    cuadro(pdf, 56, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[17].solucion));
    cuadro(pdf, 120, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[18].solucion));
    cuadro(pdf, 166, 200, 9, nSudoku, .5, 10, JSON.parse(tanda[19].solucion));

    cuadro(pdf, 10, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[20].solucion));
    cuadro(pdf, 56, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[21].solucion));
    cuadro(pdf, 120, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[22].solucion));
    cuadro(pdf, 166, 246, 9, nSudoku, .5, 10, JSON.parse(tanda[23].solucion));
    // Guarda el PDF con un nombre específico
    pdf.save('Hojas24pdfs.pdf');
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
    ponCaracteres();
    generaHtml();
}

let  TabDis;
//para hacer condiseños diferentes de tablero
let generaAlAzarTab = () => {alert(TabDis)
    let kk='';
    for(let i=0;i<casillasBloque.length;i++){
        kk+=i+': '+JSON.stringify(casillasBloque[i])+'\n';
    }
    alert(kk)
    alert ('posBloque\n'+JSON.stringify(casillasBloquePos))
    kk='';
    for(let i=0;i<nSudoku;i++){
        kk+='[';
        for(let j=0;j<nSudoku;j++){
            kk+=bloques[i][j]+'-'+casillasBloquePos[i][j]+', ';
        }
        kk+=']\n';
    }
    alert(kk);
    //casillasBloque[bloques[fil][col]]
    tableroNuevo(TabDis);
    while (quedanN > 0) {
        let c = quedan[Math.floor(quedanN * Math.random())];
        cierra(c.v, c.f, c.c, 's');
    }
}


const generaAlAzar = () => {

    /*let ahora = new Date();
    let  milisegundos = ahora.getMilliseconds();
    let vuelve=false;*/
    
    tableroNuevo();
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

    while (quedanN > 0) {
        let c = quedan[Math.floor(quedanN * Math.random())];
        cierra(c.v, c.f, c.c, 's');
        /*if((new Date()).getMilliseconds-milisegundos>10000){
            vuelve=true;
            break;
        }*/
    }
    //if(vuelve)generaAlAzar()
    //alert(JSON.stringify(puestas))
    //reGeneraHtml()
}
//let finiquitadas=[];
//let reubicadas=[];
let kacososo='kacososo: ';
const actQuedan = (celda) => {
    let aux = quedan[quedanN - 1];
    //alert(JSON.stringify(celda)+'-'+JSON.stringify(aux))
    kacososo+=JSON.stringify(celda)+'-'+JSON.stringify(aux)+'\n'
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
    kacososo+=JSON.stringify(celda)+'-'+JSON.stringify(aux)+'\n\n'

    //reubicadas.push(quedan[pos]);
    quedanN--;
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
        if (celda.estado === 's') sel++;
        //kkkkk+=(p-1)+': '+JSON.stringify(celda)+' - '+JSON.stringify(quedan[celda.pos[celda.pos.length-1]])+'\n';
        // alert(p+JSON.stringify(celda));
        ultimaJugada.push(celda);//alert('ñ'+celda.estado)
    } while (p < quedan.length && (sel === 0 || quedan[p].estado === 's'))//celda.estado!=='s')
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
            if (celda.estado === 's') {
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

    //alert('siii'+JSON.stringify(tablero));
    generaHtml();
    repasoEliminables.pop();
    let repant=JSON.parse(repasoEliminables[repasoEliminables.length-1])//.push(JSON.stringify({conjBq,gruposBq,numGBq, nBqFC}))
    conjBq=repant.conjBq;
    gruposBq=repant.gruposBq;
    numGBq=repant.numGBq;
    nBqFC=repant.nBqFC;
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
    let sol = muestraTablero3();

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
            if (tablero[elegida[pini].f][elegida[pini].c].valor === -1) cierra(elegida[pini].v, elegida[pini].f, elegida[pini].c, 'f');
            pini++
        }
        generaHtml();
    }
    //}
}

const ResuelveBruta2 = () => {

    

    while (quedanN > 0) {
        let c = quedan[Math.floor(quedanN * Math.random())];
        cierra(c.v, c.f, c.c, 's');
        
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
        puestas = JSON.parse(HistPuestas);
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
const reGeneraHtml = (n) => {//alert('entramos: '+n)

    if (n === undefined || n === null || n >= puestas.length) {//alert(n);
        //dejamos lo que se ve
        let aux = puestas.splice(0, posHistoria);
        puestas = aux;
        HistPuestas = JSON.stringify(puestas);
        ponExtras(true);
        document.getElementById('historial').innerHTML = genHistorial(posHistoria - 1);
    } else {//alert('carga?')
        posHistoria = n + 1;
        HistPuestas = JSON.stringify(puestas);
        let PuestasAux = JSON.parse(HistPuestas);
        let cuerpo = document.getElementById("cuerpo");
        cuerpo.innerHTML = '';
        puestas = [];
        tablero = generaConjuntosVacios(nSudoku);//;
        bloques = generaConjuntosVacios(nSudoku);//;
        casillasBloque = [];
        filas = [];
        columnas = [];
        valBloque = [];
        numeros = [];
        quedan = [];
        ponCasillas();
        ponTablero();
        generaHtml();
        ponExtras();
        for (let i = 0; i <= n; i++) {
            let aux = PuestasAux[i][0];
            cierra(aux.v, aux.f, aux.c, 's');
        }
        //alert(quedan.length)
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

        puestas = JSON.parse(HistPuestas);
        document.getElementById('historial').innerHTML = genHistorial(n);
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
const ponExtras = (repinta) => {
    //alert('ee'+JSON.stringify(eliminadosExtra))
    if (eliminadosExtra.length > 0) {
        for (let ei = 0; ei < eliminadosExtra.length; ei++) {
            let ce = eliminadosExtra[ei];
            //alert(ei+''+JSON.stringify(ce));
            let cel = tablero[ce.f][ce.c].posibles.numeros[ce.v]
            if (cel.estado === 'c') {//alert(cel.estado)
                eliminaCelda(cel, ce.v, ce.f, ce.c/*,'si'*/);
            } else {//alert('--'+cel.estado)
                //cel.estado='c';

                //eliminaCelda(cel,ce.v,ce.f,ce.c/*,'si'*/);
            }
        }
        if (repinta) generaHtml();
    }
}
const genHistorial = (n) => {
    let texto = '';
    puestas.forEach((elem, i) => {
        if (i === n) {
            texto += `<span style="color:red; cusor: pointer;" title="pulsa para ir a este" onclick="reGeneraHtml(${i})">${i}; </span>`;
        } else {
            texto += `<span style="cusor: pointer;" title="pulsa para ir a este" onclick="reGeneraHtml(${i})">${i}; </span>`;
        }
    })
    return texto;
}

ponCasillas();
ponTablero();


const generaHtml = () => {//alert('siiii'+JSON.stringify(tablero))
    //let container = document.getElementById("sudoku-container");
    //container.innerHTML = "";
    let cuerpo = document.getElementById("cuerpo");

    let container = document.createElement("div");
    container.id = 'sudoku-container';
   // container.className = "sudoku-container";
    if( nSudoku===4)container.className = "sudoku-container4";
    else if(nSudoku===16 ) container.className = "sudoku-container16";
    else container.className = "sudoku-container";//sudoku de 9
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
                //div.textContent = nb;
                //rgb(255, 255, 128)
                div.style.backgroundColor='rgb('+(100+Math.floor(155/nSudoku)*nb)+','+ (255-Math.floor(155/nSudoku)*nb)+', 255)';
            


                //div.style.color("red");
                //div.classList.add("fixed");
                //alert(''+i+','+j+' : '+tablero[i][j].posibles.numeros[tablero[i][j].valor].estado)
                if (tablero[i][j].posibles.numeros[tablero[i][j].valor].estado === 'f') {//alert('mmm')
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
    document.getElementById('historial').innerHTML = genHistorial(puestas.length - 1);
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
//para diseñar tableros con bloques no cuadrados
const disenaTablero=()=>{
    let cuerpo = document.getElementById("diseno");
    let container = document.createElement("div");
    container.id = 'sudoku-diseno';
    if( nSudoku===4)container.className = "sudoku-container4";
    else if(nSudoku===16 ) container.className = "sudoku-container16";
    else container.className = "sudoku-container";//sudoku de 9
    container.innerHTML = "";
    //container.className = "sudoku-container";
    container.innerHTML = "";
    for (let i = 0; i < nSudoku; i++) {
        for (let j = 0; j < nSudoku; j++) {
            let div = document.createElement("div");
            div.id = 'd' + i + '_' + j;
            //getCasBloque = (i, j)
            //bloques[fil][col]
            //div.textContent = getCasBloque(i, j);
            let nb=bloques[i][j];
            div.textContent = nb;
            //rgb(255, 255, 128)
            let col1=100+Math.floor(155/nSudoku)*nb;
            let col2=255-Math.floor(155/nSudoku)*nb;//alert(nb%2)
            //div.style.backgroundColor='rgb('+(100+Math.floor(155/nSudoku)*nb)+','+ (255-Math.floor(155/nSudoku)*nb)+', 255)';        
            div.style.backgroundColor='rgb('+(nb%2===0?col1:col2)+','+ (nb%2===0?col2:col1)+', 255)';        
    
            //div.style.backgroundColor='rgb('+(100+Math.floor(155/nSudoku)*nb)+','+ (255-Math.floor(155/nSudoku)*nb)+', 255)';
            //alert(getCasBloque(i, j));
            let cccc = GeneraNumerosSeg(nSudoku);
            div.addEventListener("click", () => {
                constructor(bloques[i][j], i, j, cccc);
            });
            container.appendChild(div);
        }
        
    }
    while (cuerpo.firstChild) {
        cuerpo.removeChild(cuerpo.firstChild);
    }
    cuerpo.appendChild(container);
}

const constructor = (nb, i,j, elegibles)=>{//alert(elegibles)
    activo = false;
    let sel = '<select id="cons_' + i + '_' + j + '" name="cons" onchange="disena(this.value,' + i + ',' + j + ')">';
    elegibles.forEach(p => {
        if(p=== +nb) sel += '<option value="' + p + '" selected> ' + p + '</option>';
        else sel += '<option value="' + p + '"> ' + p + '</option>';
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
const disena=(nb, i, j)=>{
    //alert(`nb=${nb}, i=${i}, j=${j}`);
    let ddiv = document.getElementById('ddiv');
    ddiv.style.display = "none";
    let div = document.getElementById('d'+ i + '_' + j)
    div.textContent = nb;
    bloques[i][j]=+nb;
    let col1=100+Math.floor(155/nSudoku)*nb;
    let col2=255-Math.floor(155/nSudoku)*nb;//alert(nb%2)
    //div.style.backgroundColor='rgb('+(100+Math.floor(155/nSudoku)*nb)+','+ (255-Math.floor(155/nSudoku)*nb)+', 255)';        
    div.style.backgroundColor='rgb('+(nb%2===0?col1:col2)+','+ (nb%2===0?col2:col1)+', 255)';        
    activo = true;
    //alert(JSON.stringify(bloques))
}
const finDisenno=()=>{//alert(JSON.stringify(bloques))
    TabDis=JSON.stringify(bloques);
    ponCasillas(TabDis);
    ponTablero();
    //alert(JSON.stringify(tablero))
}
//Fin para diseñar tableros con bloques no cuadrados

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

//let lbloques = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let lbloques = generaMenosUnos(nSudoku); //[-1, -1, -1, -1, -1, -1, -1, -1, -1];
let bbloques = [];
let lfilas = generaMenosUnos(nSudoku); // [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let bfilas = [];
let lcolumnas = generaMenosUnos(nSudoku); // [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let bcolumnas = [];
let lnumeros = generaMenosUnos(nSudoku); // [-1, -1, -1, -1, -1, -1, -1, -1, -1];
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
        let valor = parseInt(v);
        let bq = tablero[i][j].posibles.numeros[valor].b;
        let bqsF=generaMenosUnos(nSudoku);
        let bqsC=generaMenosUnos(nSudoku);//alert(bqsF)
        //alert(valor+'bloque: '+tablero[i][j].posibles.numeros[valor].b+estado)
        tablero[i][j].posibles.numeros[valor].estado = estado;//'s';
        tablero[i][j].valor = valor;
        //alert(tablero[i][j].posibles.numeros[valor].estado+': '+tablero[i][j].valor)
        if (estado === 's') {
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
        trataGrupos(tablero[i][j].posibles.numeros[valor],bq,'b');


        /*if (bloques[bq] === -1) bbloques.push(bq)
        bloques[bq] = bq;*/
        if (lbloques[bq] === -1) {
            bbloques.push(bq);
            lbloques[bq] = bq;
            //nbloques.push(bq);
            //mbloques[bq] = bq;
        }

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
                if(celda.b!==bq&&bqsF[celda.b]===-1){//alert('en fila'+i)
                    trataGrupos(celda,bq,'f');
                    bqsF[celda.b]=celda.b
                }
            }
            if (tablero[k][j].posibles.numeros[valor].estado === 'c') {
                let celda = tablero[k][j].posibles.numeros[valor];
                eliminaCelda(celda, celda.v, celda.f, celda.c);
                nceldasE++
                //nuevo proceso
                if(celda.b!==bq&&bqsC[celda.b]===-1){
                    trataGrupos(celda,bq,'c');
                    bqsC[celda.b]=celda.b
                }
            }
            

            //if()

            /*if (!(valBloque[bq].numeros[valor].celdas[k].f === i && valBloque[bq].numeros[valor].celdas[k].c === j)) {
                let celda = valBloque[bq].numeros[valor].celdas[k];
                if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                if (numeros[valor].filas[celda.f].col[celda.c].estado === 'c') eliminaCelda(numeros[valor].filas[celda.f].col[celda.c], valor, i, j);
            }

            let bqfaux = tablero[i][k].posibles.numeros[valor].b;

            if (bqfaux !== bq) {
                
                if (tablero[i][k].posibles.numeros[valor].estado === 'c') {

                    let celda = tablero[i][k].posibles.numeros[valor];
                    if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                    if (numeros[valor].filas[celda.f].col[celda.c].estado === 'c') eliminaCelda(numeros[valor].filas[celda.f].col[celda.c], valor, i, j);
                }
            }
            let bqcaux = tablero[k][j].posibles.numeros[valor].b;;

            if (bqcaux !== bq) {
                
                if (tablero[k][j].posibles.numeros[valor].estado === 'c') {

                    let celda = tablero[k][j].posibles.numeros[valor];
                    if (celda.estado === 'c') eliminaCelda(celda, valor, i, j);
                    if (numeros[valor].filas[celda.f].col[celda.c].estado === 'c') eliminaCelda(numeros[valor].filas[celda.f].col[celda.c], valor, i, j);
                }

            }*/
        }
        //alert(JSON.stringify(fijados)+'++++----'+ nceldasE+'\n'+kacososo)
        /*tablero[i][j].posibles.numeros[valor].estado = estado;//'s';
        tablero[i][j].valor = valor;
        if (estado === 's') {
            puestas.push([tablero[i][j].posibles.numeros[valor]]);
            posHistoria = puestas.length;
        } else {
            let grupoFijadas = puestas[puestas.length - 1];
            grupoFijadas.push(tablero[i][j].posibles.numeros[valor]);
        }
        actQuedan(tablero[i][j].posibles.numeros[valor])
        filas[i].huecos--;
        columnas[j].huecos--;
        valBloque[bq].huecos--;*/

        /*alert(fijados.length+',,,B '+JSON.stringify(lbloques)+'-'+JSON.stringify(bbloques)+'\n'+
        'f '+JSON.stringify(lfilas)+'-'+JSON.stringify(bfilas)+'\n'+
        'c '+JSON.stringify(lcolumnas)+'-'+JSON.stringify(bcolumnas)+'\n'+
        'v '+JSON.stringify(lnumeros)+'-'+JSON.stringify(bnumeros)+'\n')*/

        //alert(fijados.length+'\n'+JSON.stringify(fijados))
        //no se hace comprobacion de agrupaciones de más de una
        /*while (bbloques.length > 0 || bfilas.length > 0 || bcolumnas.length > 0) {
            
            fijaGen('b');
            fijaGen('f');
            fijaGen('c');

            
        }*/
        //alert('+++'+fijados.length)
        //alert('siii')
        div.textContent = valor;
        div.style.color = 'red';
        //ponfijados();
        while(normalizables.length>0||filasColLimpiables.length>0){
            normaliza();
        //while(filasColLimpiables.length>0){
            //alert(JSON.stringify(filasColLimpiables))
            limpiaFilasCol();
        }
        //alert(JSON.stringify(tablero));
        if (fijados.length > 0) {
            //alert(JSON.stringify(fijados));
            ponfijados();
            
        } else {
            if (estado === 's')repasoEliminables.push(JSON.stringify({conjBq,gruposBq,numGBq, nBqFC}))
            generaHtml()
        };
        //alert(JSON.stringify(valBloque))

        //repasaTodo();
        ///////////////
        //if(elem.nv===elem.n)normalizables.push({b:bq, el:elem});
        
        /////////////
    }
    activo = true;
    //alert(JSON.stringify(gruposBq))
    //alert(kacososo);
    //alert(JSON.stringify(puestas));
}

const normaliza=()=>{
    //alert(JSON.stringify(normalizables)+'++..'+normalizables.length)
        while(normalizables.length>0){//alert(JSON.stringify(normalizables))
            let pack=normalizables.splice(0,1)[0];
            let el=pack.el;
            let cs=casillasBloque[pack.b];
            let filas = generaConjuntosVacios(nSudoku);
            let col=generaConjuntosVacios(nSudoku);
            //alert(JSON.stringify(el)+'\n'+JSON.stringify(cs))
            cs.forEach(c=>{
                
                //alert(c[0]+':'+el.f[c[0]]+'\n'+c[1]+':'+el.c[c[1]]+'\n'+
                //JSON.stringify(el.v)+'\n'+JSON.stringify( tablero[c[0]][c[1]].posibles.numeros))
                if(el.f[c[0]]===-1&&el.c[c[1]]===-1){//en filas
                    
                    for(let i=0;i<nSudoku;i++){
                        if(el.v[i]===-1){
                            let celda = tablero[c[0]][c[1]].posibles.numeros[i];
                            //alert(JSON.stringify(celda))
                            if (celda.estado==='c'){//alert(JSON.stringify(celda))
                                eliminaCelda(celda, celda.v, celda.f, celda.c);
                                /*if(filas.lengh===0){
                                    filas.push(c[0])
                                }else{
                                    if(filas[0]!==c[0])filas.push(c[0]);
                                }
                                if(col.lengh===0){
                                    col.push(c[1])
                                }else{
                                    if(col[0]!==c[1])col.push(c[1]);
                                }*/
                            }
                        }else{
                            let celda = tablero[c[0]][c[1]].posibles.numeros[i];
                            if (celda.estado==='c'){
                                if(filas[i].lengh===0){
                                    filas[i].push(c[0])
                                }else{
                                    if(filas[i][0]!==c[0])filas[i].push(c[0]);
                                }
                                if(col[i].lengh===0){
                                    col[i].push(c[1])
                                }else{
                                    if(col[i][0]!==c[1])col[i].push(c[1]);
                                }
                            }
                        }
                    }
                }else{
                    //if(!(el.f[c[0]]===-1||el.c[c[1]]===-1))
                    for(let i=0;i<nSudoku;i++){
                        if(el.v[i]===-1){
                            let celda = tablero[c[0]][c[1]].posibles.numeros[i];
                            if (celda.estado==='c'){
                                if(filas[i].lengh===0){
                                    filas[i].push(c[0])
                                }else{
                                    if(filas[i][0]!==c[0])filas[i].push(c[0]);
                                }
                                if(col[i].lengh===0){
                                    col[i].push(c[1])
                                }else{
                                    if(col[i][0]!==c[1])col[i].push(c[1]);
                                }
                            }
                        }
                    }
                }
            })            
            el.pendiente=false;
            //alert('f:'+JSON.stringify(filas)+'\nc:'+JSON.stringify(col))
            for(let ei=0;ei<filas.length;ei++){
                let nforg=nBqFC[ei][pack.b].nf
                let j=0;
                let ncam=0;
                nBqFC[ei][pack.b].nf=0;
                while (ncam<nforg){
                    if(nBqFC[ei][pack.b].f[j]>-1){
                        nBqFC[ei][pack.b].f[j]=-2;
                        ncam++
                    }
                    j++
                }
                
                 //nBqFC[i][j]={}
            //nBqFC[i][j].f=generaMenosUnos(nSudoku);
            //nBqFC[i][j].nf=0;
            //nBqFC[i][j].c=generaMenosUnos(nSudoku);
            //nBqFC[i][j].nc=0;
            //nBqFC[i][j].Fpendiente=true; 
            //nBqFC[i][j].Cpendiente=true; 
                 
                for(let j=0;j<filas[ei].length;j++){
                    if(nBqFC[ei][pack.b].f[filas[ei][j]]===-2){
                        nBqFC[ei][pack.b].f[filas[ei][j]]=filas[ei][j];
                        nBqFC[ei][pack.b].nf++;
                    }
                }
                nBqFC[ei][pack.b].Fpendiente=true;
            //if(nBqFC[i][celda.b].nc===1&&nBqFC[i][celda.b].Cpendiente){
            //filasColLimpiables.push({tipo:'c', v:i, b:celda.b,fc:fci}
            if(filas[ei].length===1){//alert(ei+':\n'+JSON.stringify(filas)+'\n'+ei+'-'+pack.b+JSON.stringify(nBqFC[ei][pack.b]))
                if(/*nBqFC[ei][pack.b].nf===1&&*/nBqFC[ei][pack.b].Fpendiente){
                    filasColLimpiables.push({tipo:'f', v:ei, b:pack.b,fc:filas[ei][0]})
                    //alert('++++'+JSON.stringify(filasColLimpiables))
                }
                /*let bqsF=generaMenosUnos(nSudoku);
                for(let i=0;i<nSudoku;i++){
                    //for(let j=0;j<nSudoku;j++){
                        let celda = tablero[filas[ei][0]][i].posibles.numeros[ei];
                        if(celda.b!==pack.b&&celda.estado==='c'){
                            eliminaCelda(celda, celda.v, celda.f, celda.c);
                            if(bqsF[celda.b]===-1){
                                trataGrupos(celda,pack.b,'f');
                                bqsF[celda.b]=celda.b
                            }
                        }
                    //}
                }*/
            }}
            for(let ei=0;ei<col.length;ei++){

                //for(let ei=0;ei<col.length;ei++){
                    let ncorg=nBqFC[ei][pack.b].nc
                    let j=0;
                    let ncam=0;
                    nBqFC[ei][pack.b].nc=0;
                    while (ncam<ncorg){
                        if(nBqFC[ei][pack.b].c[j]>-1){
                            nBqFC[ei][pack.b].c[j]=-2;
                            ncam++
                        }
                        j++
                    }
                    
                     //nBqFC[i][j]={}
                //nBqFC[i][j].f=generaMenosUnos(nSudoku);
                //nBqFC[i][j].nf=0;
                //nBqFC[i][j].c=generaMenosUnos(nSudoku);
                //nBqFC[i][j].nc=0;
                //nBqFC[i][j].Fpendiente=true; 
                //nBqFC[i][j].Cpendiente=true; 
                     
                    for(let j=0;j<col[ei].length;j++){
                        if(nBqFC[ei][pack.b].c[col[ei][j]]===-2){
                            nBqFC[ei][pack.b].c[col[ei][j]]=col[ei][j];
                            nBqFC[ei][pack.b].nc++;
                        }
                    }
                    nBqFC[ei][pack.b].Cpendiente=true;
            if(col[ei].length===1){              

                if(/*nBqFC[ei][pack.b].nc===1&&*/nBqFC[ei][pack.b].Cpendiente){
                    filasColLimpiables.push({tipo:'c', v:ei, b:pack.b,fc:col[ei][0]})
                    //alert('++++'+JSON.stringify(filasColLimpiables))
                }
                /*let bqsC=generaMenosUnos(nSudoku);
                for(let i=0;i<nSudoku;i++){
                    //for(let j=0;j<nSudoku;j++){
                        let celda = tablero[i][col[ei][0]].posibles.numeros[ei];
                        if(celda.b!==pack.b&&celda.estado==='c'){
                            eliminaCelda(celda, celda.v, celda.f, celda.c);
                            if(bqsC[celda.b]===-1){
                                trataGrupos(celda,pack.b,'c');
                                bqsC[celda.b]=celda.b
                            }
                        }
                    //}
                }*/
            }}
        }
        //alert(JSON.stringify(filasColLimpiables))
        /*if (filasColLimpiables.length>0){
            //alert('*'+JSON.stringify(filasColLimpiables))
            limpiaFilasCol();
        }*/
        //filasColLimpiables.push({tipo:'c', v:i, b:celda.b,fc:fci}
        //let filasColLimpiables=[];
        //const limpiaFilasCol=(/*tipo,v,b,fc*/)=>{
        //alert(JSON.stringify(normalizables)+'++..'+normalizables.length)
}


const fijaGen = (tipo) => {//alert(tipo)
    let fulminadas = [];
    let fcb1 = bbloques;
    switch (tipo) {
        case 'b': fcb1 = bbloques; break;
        case 'f': fcb1 = bfilas; break;
        case 'c': fcb1 = bcolumnas; break;
    }
    while (fcb1.length > 0) {//alert('..')        
        let b = bbloques[0];
        let fcbTipo = GeneraNumerosSeg(nSudoku);//[0, 1, 2, 3, 4, 5, 6, 7, 8]
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
        let grupos = generaConjuntosVacios(nSudoku+1);//[[], [], [], [], [], [], [], [], [], []];//alert('..') 
        let gruposAcum = generaConjuntosVacios(nSudoku+1);//[[], [], [], [], [], [], [], [], [], []];
        let filasNum = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
        let colsNum = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
        let bloquesNum = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
        let encontrados = [];
        let pendientes = [];
        fcbTipo.forEach((c, ic) => {//alert(c)
            //let celda = { v: k, f: i, c: j, b: bloques[i][j], estado: 'c' }
            //tablero[i][j].posibles.numeros.push(celda);
            //tablero[i][j] = { valor: -1, posibles: { n: 9, numeros: [] } }
            let ns = [];
            let lns = generaMenosUnos(nSudoku); // [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            let lc = generaMenosUnos(nSudoku); // [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            //let fi=[];
            //let co=[];
            //let lfi=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
            //let lco=[-1,-1,-1,-1,-1,-1,-1,-1,-1];

            for (let i = 0; i < nSudoku; i++) {
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
        for (let num = 0; num < nSudoku; num++) { //alert(JSON.stringify(filasNum))
            if (tipo === 'b') {
                if (filasNum[num].length === 1) {
                    /*[0, 1, 2, 3, 4, 5, 6, 7, 8]*/GeneraNumerosSeg(nSudoku).forEach(cf => {
                        let celda = tablero[filasNum[num][0]][cf].posibles.numeros[num];
                        if (celda.b !== b && celda.estado === 'c') {
                            fulminadas.push(celda)
                        }
                    })
                }
                if (colsNum[num].length === 1) {
                    /*[0, 1, 2, 3, 4, 5, 6, 7, 8]*/GeneraNumerosSeg(nSudoku).forEach(cf => {
                        let celda = tablero[cf][colsNum[num][0]].posibles.numeros[num];
                        if (celda.b !== b && celda.estado === 'c') {
                            fulminadas.push(celda)
                        }
                    })
                }
            } else {//filas y columnas
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
        let ttt = '++b: ' + b + '\n';
        let celdAcum = generaCeros(nSudoku);//[0, 0, 0, 0, 0, 0, 0, 0, 0];
        let celdAcumCon = 0;
        let resul = 0;
        let finalizado = false;
        let tope;
        let comienzo = 0;
        let inconceldas = 0;
        /*filas[i].numeros.push({ v: ii, q: 9, celdas: [] })
            columnas[i].numeros.push({ v: ii, q: 9, celdas: [] })
            valBloque[i].numeros.push({ v: ii, q: 9, celdas: [] })*/
        switch (tipo) {
            case 'b':
                tope = valBloque[b].huecos
                break;
            case 'f':
                tope = filas[b].huecos
                break;
            case 'c':
                tope = columnas[b].huecos
                break;
        }
        for (let i = 2; i < tope; i++) {//alert(i+'--h: '+valBloque[b].huecos)
            let nceld = 0;
            for (let j = 0; j < grupos[i].length; j++) { //alert('b:'+b+'i'+i+'j'+j+' l: '+grupos[i].length+'\n'+JSON.stringify(grupos[i][j]))
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
                nceld += grupos[i][j].c.length;
                if (i === grupos[i][j].c.length) {
                    if (valBloque[b].huecos === i) ttt += '*' + i + '*';
                    else ttt += '¡*' + i + '*!'
                }
                //let encontrados=[];
                //let pendientes=[];
                if (i === grupos[i][j].c.length) encontrados.push(grupos[i][j]);
                else pendientes.push(grupos[i][j]);
                //pendientes.push (grupos[i][j]);
                //if(finalizado)break;
            }
            celdAcumCon += nceld;
            if (comienzo === 0 && celdAcumCon >= i) comienzo = i;
            if (inconceldas === 0 && celdAcumCon > 0) inconceldas = i
            celdAcum[i] = celdAcumCon;
            ttt += 'num: ' + i + '; celdas: ' + nceld + '\n';
            //if(finalizado)break;
        }
        //alert("Empezar: "+comienzo+'; con cdldas: '+inconceldas+'\n'+ttt+'\n'+JSON.stringify(celdAcum)+'\n'+finalizado+'\n'+JSON.stringify(resul)+'\n'
        //+JSON.stringify(encontrados)+'\n++'+JSON.stringify(pendientes)+'\n'+Number.isInteger(pendientes));
        for (let i = 0; i < pendientes.length; i++) {
            for (let j = i + 1; j < pendientes.length; j++) {
                let ajuntar = true;
                if (Number.isInteger(pendientes[i].c[0])) {//alert('jjj')
                    if (pendientes[j].lc[pendientes[i].c[0]] !== -1) ajuntar = false;
                } else {
                    let aux = pendientes[i].c[0];
                    for (let k = 0; k < pendientes[j].c.length; k++) {
                        let aux2 = pendientes[j].c[k];
                        if (aux[0] === aux2[0] && aux[1] === aux2[1]) {
                            ajuntar = false;
                            break;
                        }
                    }
                }
                if (ajuntar) {
                    resul = une(pendientes[j], pendientes[i]);
                    if (resul.c.length === resul.ns.length) encontrados.push(resul);
                    else {
                        if (resul.lns.length < tope) {
                            pendientes.push(resul);
                        }
                    }
                }
                //if (j > 10) alert('i: ' + i + ' j: ' + j + '\n' + JSON.stringify(pendientes))
            }
        }
        encontrados.forEach(elem => {
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

const une = (c1, c2) => {
    let in1 = 0;
    let in2 = 0;
    let ic1 = 0;
    let ic2 = 0;
    let res = { c: [], ns: [], lc: [], lns: [] }
    //json.parse(json.stringify(c1));
    //let c2=json.parse(json.stringify(c2));
    for (let i = 0; i < nSudoku; i++) {
        if (c1.lns[i] !== -1 && c2.lns[i] !== -1) {
            res.lns.push(i);
            res.ns.push(c1.ns[in1++]);
            in2++;
        } else if (c1.lns[i] !== -1 && c2.lns[i] === -1) {
            res.lns.push(i);
            res.ns.push(c1.ns[in1++]);
        } else if (c2.lns[i] !== -1 && c1.lns[i] === -1) {
            res.lns.push(i);
            res.ns.push(c2.ns[in2++]);
        } else {
            res.lns.push(-1);
        }
        if (c1.lc[i] !== -1 && c2.lc[i] !== -1) {
            res.lc.push(i);
            res.c.push(c1.c[ic1++]);
            ic2++;
        } else if (c1.lc[i] !== -1 && c2.lc[i] === -1) {
            res.lc.push(i);
            res.c.push(c1.c[ic1++]);
        } else if (c2.lc[i] !== -1 && c1.lc[i] === -1) {
            res.lc.push(i);
            res.c.push(c2.c[ic2++]);
        } else {
            res.lc.push(-1);
        }
    }
    return res;

}

const fijaNum = () => {
    let fulminadas = [];
    if (bbloques.length > 0) {
        //while (bbloques.length > 0) {//alert('..')        
        let b = bbloques[0];
        /*lbloques[b] = -1;
        bbloques.splice(0, 1);*/

        let grupos = generaConjuntosVacios(nSudoku+1);//[[], [], [], [], [], [], [], [], [], []];//alert('..') 
        let gruposAcum = generaConjuntosVacios(nSudoku+1);//[[], [], [], [], [], [], [], [], [], []];
        let filasNum = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];
        let colsNum = generaConjuntosVacios(nSudoku);//[[], [], [], [], [], [], [], [], []];//[0, 1, 2, 3, 4, 5, 6, 7, 8]
        //valBloque[i].numeros.push({ v: ii, q: 9, celdas: [] })
        let encontrados = [];
        let pendientes = [];
        /*[0, 1, 2, 3, 4, 5, 6, 7, 8]*/GeneraNumerosSeg(nSudoku).forEach((c, ic) => {//alert(c)
            //casillasBloque[b].forEach((c, ic) => {//alert(c)
            //let celda = { v: k, f: i, c: j, b: bloques[i][j], estado: 'c' }
            //tablero[i][j].posibles.numeros.push(celda);
            //tablero[i][j] = { valor: -1, posibles: { n: 9, numeros: [] } }
            let ns = [];
            let lns = generaMenosUnos(nSudoku); // [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            let lc = generaMenosUnos(nSudoku); // [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            //let fi=[];
            //let co=[];
            //let lfi=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
            //let lco=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
            for (let i = 0; i < nSudoku; i++) {
                let celda = valBloque[b].numeros[c].celdas[i];
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
            let grupo = grupos[valBloque[b].numeros[c].q]
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
        for (let num = 0; num < nSudoku; num++) { //alert(JSON.stringify(filasNum))           
            if (filasNum[num].length === 1) {
                /*[0, 1, 2, 3, 4, 5, 6, 7, 8]*/GeneraNumerosSeg(nSudoku).forEach(cf => {
                    let celda = tablero[filasNum[num][0]][cf].posibles.numeros[num];
                    if (celda.b !== b && celda.estado === 'c') {
                        fulminadas.push(celda)
                    }
                })
            }
            if (colsNum[num].length === 1) {
                /*[0, 1, 2, 3, 4, 5, 6, 7, 8]*/GeneraNumerosSeg(nSudoku).forEach(cf => {
                    let celda = tablero[cf][colsNum[num][0]].posibles.numeros[num];
                    if (celda.b !== b && celda.estado === 'c') {
                        fulminadas.push(celda)
                    }
                })
            }
        }


        let ttt = '++b: ' + b + '\n';
        let celdAcum = generaCeros(nSudoku);//[0, 0, 0, 0, 0, 0, 0, 0, 0];
        let celdAcumCon = 0;
        let resul = 0;
        let finalizado = false;
        let tope = valBloque[b].huecos;
        let comienzo = 0;
        let inconceldas = 0;

        for (let i = 2; i < tope; i++) {//alert(i+'--h: '+valBloque[b].huecos)
            let nceld = 0;
            for (let j = 0; j < grupos[i].length; j++) { //alert('b:'+b+'i'+i+'j'+j+' l: '+grupos[i].length+'\n'+JSON.stringify(grupos[i][j]))
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
                nceld += grupos[i][j].c.length;
                if (i === grupos[i][j].c.length) {
                    if (valBloque[b].huecos === i) ttt += '*' + i + '*';
                    else ttt += '¡*' + i + '*!'
                }
                //let encontrados=[];
                //let pendientes=[];
                if (i === grupos[i][j].c.length) encontrados.push(grupos[i][j]);
                else pendientes.push(grupos[i][j]);
                //if(finalizado)break;
            }
            celdAcumCon += nceld;
            if (comienzo === 0 && celdAcumCon >= i) comienzo = i;
            if (inconceldas === 0 && celdAcumCon > 0) inconceldas = i
            celdAcum[i] = celdAcumCon;
            ttt += 'num: ' + i + '; celdas: ' + nceld + '\n';
            //if(finalizado)break;
        }
        //alert(ttt+'\n'+JSON.stringify(celdAcum)+'\n'+finalizado+'\n'+JSON.stringify(resul));
        for (let i = 0; i < pendientes.length; i++) {
            for (let j = i + 1; j < pendientes.length; j++) {
                let ajuntar = true;
                if (Number.isInteger(pendientes[i].c[0])) {//alert('jjj')
                    if (pendientes[j].lc[pendientes[i].c[0]] !== -1) ajuntar = false;
                } else {
                    let aux = pendientes[i].c[0];
                    for (let k = 0; k < pendientes[j].c.length; k++) {
                        let aux2 = pendientes[j].c[k];
                        if (aux[0] === aux2[0] && aux[1] === aux2[1]) {
                            ajuntar = false;
                            break;
                        }
                    }
                }
                if (ajuntar) {
                    resul = une(pendientes[j], pendientes[i]);
                    if (resul.c.length === resul.ns.length) encontrados.push(resul);
                    else {
                        if (resul.lns.length < tope) {
                            pendientes.push(resul);
                        }
                    }
                }
                //if (j > 10) alert('i: ' + i + ' j: ' + j + '\n' + JSON.stringify(pendientes))
            }
        }
        encontrados.forEach(elem => {
            /*[0, 1, 2, 3, 4, 5, 6, 7, 8]*/GeneraNumerosSeg(nSudoku).forEach((c, ci) => {
                if (elem.lc[ci] === -1) {
                    let celdas = valBloque[b].numeros[c].celdas;
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

let eliminadosExtra = [];
const ponfijados = () => {
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
            cierra(caso.v, caso.f, caso.c, 'f')
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
        if (problematica.estado === 'c') eliminaCelda(problematica, problematica.v, problematica.f, problematica.c);
        else alert('Ha fallado algo: '+JSON.stringify(problematica));
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



const muestraTablero = () => {
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
    } while (/*puestos<81*/posEn < ensayosL.length && !imposible)
    alert('mmm' + TEnsayos.length);
    alert('imposible: ' + imposible + ' se acaba' + puestos + '\n' + TEnsayos);
    let DensayosL = JSON.parse(JSON.stringify(ensayosL));
    for (let i = 0; i < DensayosL.length; i++) {//alert('se entra'+JSON.stringify(DensayosL))
        let VVs = [];
        for (let j = 0; j < DensayosL[i].Vs.length; j++) {//alert('mm')
            let aux = { v: DensayosL[i].Vs[j], n: 0 }
            VVs.push(aux)
        }
        DensayosL[i].nV = 0;
        DensayosL[i].VVs = VVs;
    }
    alert(JSON.stringify(DensayosL));
    for (let i = 0; i < TEnsayos.length; i++) {
        for (let j = 0; j < DensayosL.length; j++) {//alert(i+'-'+j+'-----'+puestosIni+'\n'+JSON.stringify(TEnsayos[i])+'\n'+JSON.stringify(JSON.parse(TEnsayos[i])[puestosIni+j]))
            let p = JSON.parse(TEnsayos[i])[puestosIni + j].p;//alert('-----'+p)
            if (DensayosL[j].VVs[p].n++ === 0) {
                DensayosL[j].nV++;
            }
        }
    }
    //alert('+++\n' + JSON.stringify(DensayosL));
    for (let i = 0; i < DensayosL.length; i++) {
        //eliminaCelda(cel,ce.v,ce.f,ce.c);
        if (DensayosL[i].nV === 1) {//fijamos
            for (let j = 0; j < DensayosL[i].VVs.length; j++) {
                if (DensayosL[i].VVs[j].n === 1) {
                    let caso = tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v];
                    if (caso.estado === 'c') cierra(caso.v, caso.f, caso.c, 'f')
                }
            }
            /*tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v].estado='f';
            tablero[DensayosL[i].f][[DensayosL[i].c]].valor=DensayosL[i].VVs[j].v;*/
        } else {
            for (let j = 0; j < DensayosL[i].VVs.length; j++) {
                if (DensayosL[i].VVs[j].n === 0) {//eliminamos
                    let caso = tablero[DensayosL[i].f][[DensayosL[i].c]].posibles.numeros[DensayosL[i].VVs[j].v];
                    if (caso.estado === 'c') eliminaCelda(caso, caso.v, caso.f, caso.c);
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

const desordena = (vector) => {
    //let nuevo=[];
    for (let i = 0; i < vector.length; i++) {
        let n = Math.floor(vector.length * Math.random())
        let a = vector[i];
        vector[i] = vector[n];
        vector[n] = a;
    }
}


const muestraTablero2 = () => {
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
        /*if (puestos === 81) {//alert('entramos')
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
        }*/
    } while (puestos < nSudokuCuad && !imposible)
    //while (/*puestos<81*/posEn < ensayosL.length && !imposible)
    alert('mmm' + TEnsayos.length);
    alert('imposible: ' + imposible + ' se acaba' + puestos + '\n' + JSON.stringify(ensayo));
}

const muestraTablero3 = () => {
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
    while (/*puestos<81*/posEn < ensayosL.length && !imposible && TEnsayos.length < 2)
    //while (/*puestos<81*/posEn < ensayosL.length && !imposible)
    //alert('mmm' + TEnsayos.length);
    //alert('imposible: ' + imposible + ' se acaba' + puestos + '\n' + JSON.stringify(ensayo));
    //alert('+++'+JSON.stringify(JSON.parse(TEnsayos[0])[puestosIni-1])+'\n'+JSON.stringify(JSON.parse(TEnsayos[0])[puestosIni])+'\n'+JSON.stringify(JSON.parse(TEnsayos[0])[puestosIni+1]))
    return { puestosIni: puestosIni, resultados: TEnsayos }
}