let salida: Array<Token> ;
let errores: Array<Token> ;
let MacroConjuntos :String = "";
let estado: number;
let  auxLex: String;
let  fila: number;
let  imprime: String = "";
let  nombreconjunto: String = "";
let  inicioconj, finconj, identificador:String;
let contador : number= 0;
let bandera:boolean = false;
function Lex(entrada:string):Array<Token>{
    
    let columna :number;
    salida = new Array<Token>();
    errores = new Array<Token>();
    estado = 0;
    columna = 0;
    fila = 1;
    auxLex = "";
    let c="";
    let d;
    let activarcomentariosimple:boolean=false;
    let activarmultiple:boolean=false;
    let comentario:number=0;
    let decimal:boolean=false;
    let contacadena=0;
    let contachar=0;
    let flagcad :boolean= false;
    let flagchar:boolean=false;
    for (var i = 0; i < entrada.length; i++) {
        c = (String)(entrada.charAt(i));
        d = String.fromCharCode(entrada.charCodeAt(i));
        columna++;
        switch (estado) {
            case 0: //// en este se va a ver si viene un comentario de todo tipo 
            console.log(fila);
                if (isLetter(c) || isDigit(c) || c == "_") {
                    auxLex += c;
                    
                    if (auxLex.toLowerCase() == "class") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.RESERVADA, auxLex, fila, columna);
                        estado = 0;
                        auxLex = "";
                        break;
                    }
                    else if ((auxLex.toLowerCase().trim() == "int" || auxLex.toLowerCase().trim() == "double"
                        || auxLex.toLowerCase().trim() == "char" || auxLex.toLowerCase().trim() == "bool"
                        || auxLex.toLowerCase().trim().trim() == "string") ) {
                            if (activarcomentariosimple) {
                                estado = 0;
                                auxLex += c;
                                break;
                            }
                            if (activarmultiple) {
                                auxLex += c;
                                estado = 0;
                                break;
                            }
                        addToken(Tipo.TIPO_DATO, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "void" ) {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.RESERVADA, auxLex, fila, columna);
                        estado = 2; //////////////////////////////  QUEDA PENDIENTE EL NUMERO DE ESTADO
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "return") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.RETURN, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "continue") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.CONTINUE, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "break") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.BREAK, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "console.write" || auxLex.toUpperCase() == "Console.Write") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.IMPRIMIR, auxLex, fila, columna);
                        estado = 1; ///////////////////////////////////QUEDA PENDIENTE EL NUMERO DE ESTADO
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "console") {
                        
                        if (entrada.charAt(i + 1) == ".") {
                            if (activarcomentariosimple) {
                                estado = 0;
                                auxLex += c;
                                break;
                            }
                            if (activarmultiple) {
                                auxLex += c;
                                estado = 0;
                                break;
                            }
                            addToken(Tipo.IMPRIMIR, auxLex, fila, columna);
                            addToken(Tipo.PUNTO, ".", fila, columna);
                            estado = 0;
                            i++;
                            auxLex = "";
                            break;
                        }
                        else {
                            if (activarcomentariosimple) {
                                estado = 0;
                                auxLex += c;
                                break;
                            }
                            if (activarmultiple) {
                                auxLex += c;
                                estado = 0;
                                break;
                            }
                            addToken(Tipo.IMPRIMIR, auxLex, fila, columna);
                            estado = 0;
                            auxLex = "";
                            break;
                        }
                    }
                    else if (auxLex.toLowerCase() == "write") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.IMPRIMIR, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "true") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.VERDADERO, auxLex, fila, columna);
                        estado = 0;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "false") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.FALSO, auxLex, fila, columna);
                        estado = 0;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "main") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.RESERVADA, auxLex, fila, columna);
                        estado = 0;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "else if") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.ELSEIF, auxLex, fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "if") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.IF, auxLex, fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "else") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.ELSE, auxLex, fila, columna);
                        estado = 0;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "while") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.WHILE, auxLex, fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }else if (auxLex.toLowerCase() == "do") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        if(entrada.charAt(i + 1) == " "|| entrada.charAt(i + 1) == "{"){
                        addToken(Tipo.DO, auxLex, fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                        }else{
                            estado=0;
                            break;
                        }
                    }
                    else if (auxLex.toLowerCase() == "for") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.FOR, auxLex, fila, columna);
                        estado = 3;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "switch") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.SWITCH, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "case") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        addToken(Tipo.CASE, auxLex, fila, columna);
                        estado = 4;
                        auxLex = "";
                        break;
                    }else if( isLetter(c) && entrada.charAt(i + 1) == "+"){
                        addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                        addToken(Tipo.SUMA, "+",fila,columna);
                        i++;
                        estado = 0;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "default") {
                        if (activarcomentariosimple) {
                            estado = 0;
                            auxLex += c;
                            break;
                        }
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                            break;
                        }
                        if( entrada.charAt(i + 1) == ":"){
                            addToken(Tipo.RESERVADA, auxLex, fila, columna);
                            addToken(Tipo.DOSPUNTOS, ":",fila,columna);
                            i++;
                            estado = 0;
                            auxLex = "";
                            break;
                        }
                        addToken(Tipo.RESERVADA, auxLex, fila, columna);
                        estado = 4;
                        auxLex = "";
                        break;
                    }
                    estado = 0;
                }
                else if (c == ";") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        this.fila++;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        this.fila++;
                        estado = 0;
                        break;
                    }
                    auxLex += c;
                    this.fila++;
                    addToken(Tipo.PUNTOYCOMA, auxLex, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == "*") {
                    comentario++;
                    if (c == "*" && entrada.charAt(i + 1) == "/") {
                        addToken(Tipo.MULTILINEA, auxLex, fila, columna);
                        addToken(Tipo.SLASHASTERISCO, c + "/", fila, columna);
                        this.fila++;
                        estado = 0;
                        comentario = 0;
                        i++;
                        auxLex = "";
                        activarmultiple = false;
                        break;
                    }
                    else if (c == "*" && entrada.charAt(i - 1) == "/") {
                        if (comentario == 1) {
                            activarmultiple = true;
                            comentario = 0;
                        }
                        addToken(Tipo.SLASHASTERISCO, "/" + c, fila, columna);
                        estado = 0;
                        auxLex = "";
                    }
                    else {
                        if (activarmultiple) {
                            auxLex += c;
                            estado = 0;
                        }
                        else {
                            auxLex += c;
                            addToken(Tipo.ASTERISCO, auxLex, fila, columna);
                            estado = 0;
                            auxLex = "";
                        }
                    }
                }
                else if (c == "/") {
                    if (c == "/" && entrada.charAt(i + 1) == "/") {
                        activarcomentariosimple = true;
                        auxLex += c;
                        addToken(Tipo.DOBLESLASH, c + c, fila, columna);
                        estado = 0;
                        i++;
                        auxLex = "";
                        break;
                    }
                }
                else if (c == "\n") {
                    if (activarcomentariosimple  && auxLex!="") {
                        addToken(Tipo.COMENTARIO, auxLex, fila, columna);
                        estado = 0;
                        activarcomentariosimple = false;
                        auxLex = "";
                        this.fila++;
                        columna = 0;
                        break;
                    }
                    if (activarmultiple) {
                        estado = 0;
                        this.fila++;
                        auxLex += c;
                        break;
                    }
                }
                else if (c == "\t" || c == "\r") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        break;
                    }
                    columna++;
                    estado = 0;
                }
                else if (c == " ") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                }
                else if (c == "=") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    if (auxLex != "") {
                        addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                        addToken(Tipo.IGUAL, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    addToken(Tipo.IGUAL, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "{") {
                    this.fila++;
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    if(auxLex.trim()==""){
                        addToken(Tipo.LLAVEIZQ, c, fila, columna);
                        estado = 0;
                        auxLex = "";
                        break;
                    }
                    addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                    addToken(Tipo.LLAVEIZQ, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == "}") {
                    this.fila++;
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    addToken(Tipo.LLAVEDER, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == ".") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    addToken(Tipo.PUNTO, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == ":") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    addToken(Tipo.DOSPUNTOS, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == "+") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    addToken(Tipo.SUMA, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "-") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    addToken(Tipo.RESTA, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "*") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    addToken(Tipo.MULTIPLICACION, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "/") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    addToken(Tipo.DIVISION, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == ">") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    if(entrada.charAt(i-1)!=" "){
                        if(isLetter(entrada.charAt(i-1))){
                            addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                        }
                    }else{
                        if(isLetter(entrada.charAt(i-2))){
                            addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                        }
                    }
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MAYORIGUAL, c + "=", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MAYOR, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "<") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    if(entrada.charAt(i-1)!=" "){
                        if(isLetter(entrada.charAt(i-1))){
                            addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                        }
                    }else{
                        if(isLetter(entrada.charAt(i-2))){
                            addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                        }
                    }
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MENORIGUAL, c + "=", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MENOR, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "!") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.DESIGUAL, c + "=", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.NOT, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "|") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    if (entrada.charAt(i + 1) == "|") {
                        addToken(Tipo.OR, c + "|", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.OR, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "&") {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    
                    if (entrada.charAt(i + 1) == "&") {
                        addToken(Tipo.AND, c + "&", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.AND, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else {
                    if (activarcomentariosimple) {
                        estado = 0;
                        auxLex += c;
                        break;
                    }
                    else if (activarmultiple) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    else {
                        auxLex += c;
                        addError(Tipo.DESCONOCIDO, auxLex, "Caracter no definido", fila, columna);
                        console.log("ERROR LEXICO0 CON: " + auxLex + " " + fila + "," + columna);
                        auxLex = "";
                        estado = 0;
                    }
                }
                break;
            case 1:
                /* este va a servir para adentro del class puede venir una declaracion, asignacion
                    metodos, funciones,contructores, incremento, decremento
                */
                if (isLetter(c)) {
                    auxLex += c;
                    if (auxLex.toLowerCase().trim() == "true") {
                        addToken(Tipo.VERDADERO, auxLex.trim(), fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase().trim() == "false") {
                        addToken(Tipo.FALSO, auxLex.trim(), fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "return") {
                        addToken(Tipo.RETURN, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "main") {
                        addToken(Tipo.RESERVADA, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "continue") {
                        addToken(Tipo.CONTINUE, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "break") {
                        addToken(Tipo.BREAK, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "case") {
                        addToken(Tipo.CASE, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    if ((auxLex.toLowerCase().trim() == "int" || auxLex.toLowerCase().trim() == "double"
                        || auxLex.toLowerCase().trim() == "char" || auxLex.toLowerCase().trim() == "bool"
                        || auxLex.toLowerCase().trim().trim() == "string") && entrada.charAt(i + 1) == " ") {
                        addToken(Tipo.TIPO_DATO, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                        break;
                    }
                    if (isLetter(entrada.charAt(i + 1)) || isDigit(entrada.charAt(i + 1)) || entrada.charAt(i + 1) == "_") {
                        estado = 1;
                    }
                    else {
                        if (flagcad ||flagchar) {
                            estado = 1;
                        }
                        else {
                            addToken(Tipo.IDENTIFICADOR, auxLex.trim(), fila, columna);
                            estado = 1;
                            auxLex = "";
                        }
                    }
                }
                else if (isDigit(c)) {
                    var validar = void 0;
                    try {
                        validar = entrada.charAt(i + 1);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if (isDigit(validar) || validar == ".") {
                        if (flagcad ||flagchar) {
                            auxLex += c;
                            estado = 1;
                            break;
                        }
                        decimal = true;
                        estado = 1;
                        auxLex += c;
                    }
                    else {
                        if (flagcad ||flagchar) {
                            auxLex += c;
                            estado = 1;
                            break;
                        }
                        else if (isCadena(auxLex)&& isLetter(entrada.charAt(i-2))) {
                            auxLex += c;
                            addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                            estado = 1;
                            auxLex = "";
                            break;
                        }
                        auxLex += c;
                        addToken(Tipo.NUMERO, auxLex, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == ",") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.COMA, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == ":") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.DOSPUNTOS, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == ";") {
                    this.fila++;
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    contacadena=0;
                    addToken(Tipo.PUNTOYCOMA, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == "=") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.IGUALIGUAL, c + "=", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                    }
                    else {
                        addToken(Tipo.IGUAL, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == ".") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (decimal) {
                        auxLex += c;
                        estado = 1;
                        decimal = false;
                        break;
                    }
                    addToken(Tipo.PUNTO, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "\'") {
                    contachar++;
                    
                    if (flagcad) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (contachar==1) {
                        auxLex += c;
                        addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                        estado = 1;
                        flagchar=true;
                        auxLex = "";
                        break;
                    }
                    else {
                        if ((entrada.charAt(i + 2) == ";" || entrada.charAt(i + 2) == ")"||entrada.charAt(i + 1) == ";")||entrada.charAt(i + 2) == "+" ||entrada.charAt(i + 1) == "+"|| auxLex!="") {
                            addToken(Tipo.CARACTER, auxLex, fila, columna);
                            addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                            estado = 1;
                            flagchar = false;
                            contachar = 0;
                            auxLex = "";
                        }
                        else {
                            auxLex += c;
                            estado = 1;
                        }
                    }
                }
                else if (c == "\"") {
                    contacadena++;
                    var validar = void 0;
                    try {
                        validar = entrada.charAt(i + 1);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if(flagchar){
                        auxLex+=c;
                        estado=1;
                        break;
                    }
                    if (contacadena == 1) {
                        flagcad = true;
                        auxLex += c;
                        addToken(Tipo.COMILLA, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                    else {
                        if ((entrada.charAt(i + 2) == ";" || entrada.charAt(i + 2) == ")"||entrada.charAt(i + 1) == ";" )||entrada.charAt(i + 2) == "+"||entrada.charAt(i + 1) == "+"|| auxLex!="") {
                            addToken(Tipo.CADENA, auxLex, fila, columna);
                            addToken(Tipo.COMILLA, c, fila, columna);
                            estado = 1;
                            flagcad = false;
                            contacadena = 0;
                            auxLex = "";
                        }
                        else {
                            auxLex += c;
                            estado = 1;
                        }
                    }
                }
                else if (c == " ") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    auxLex += c;
                    estado = 1;
                }
                else if (c == "(") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.PARIZQ, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == ")") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    
                    addToken(Tipo.PARDER, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "+") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.SUMA, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "-") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.RESTA, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "*") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.MULTIPLICACION, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == "/") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.DIVISION, c, fila, columna);
                    estado = 1;
                    auxLex = "";
                }
                else if (c == ">") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MAYORIGUAL, c + "=", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MAYOR, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "<") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MENORIGUAL, c + "=", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MENOR, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "!") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.DESIGUAL, c + "=", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.NOT, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "|") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (entrada.charAt(i + 1) == "|") {
                        addToken(Tipo.OR, c + "|", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.OR, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "&") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    if (entrada.charAt(i + 1) == "&") {
                        addToken(Tipo.AND, c + "&", fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.AND, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "\n") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        this.fila++;
                        estado = 1;
                        break;
                    }
                    estado = 1;
                    auxLex = "";
                    fila++;
                    columna = 0;
                }
                else if (c == "\t" || c == "\r") {
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    columna++;
                    estado = 1;
                }
                else if (c == "{") {
                    if (flagcad ||flagchar) {
                        this.fila++;
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    this.fila++;
                    addToken(Tipo.LLAVEIZQ, c, fila, columna);
                    estado = 0; //// porque va al principio tambien pueden haber declaraciones de variables
                    auxLex = "";
                }else if (c == "}") {
                    this.fila++;
                    if (flagcad ||flagchar) {
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    addToken(Tipo.LLAVEDER, c, fila, columna);
                    estado = 0; //// porque va al principio tambien pueden haber declaraciones de variables
                    auxLex = "";
                }
                else {
                    if (flagcad ||flagchar) {
                        if (entrada.charAt(i + 1) == "\"" && (entrada.charAt(i + 2) == ";" || entrada.charAt(i + 2) == ")")) {
                            auxLex+=c;
                            estado = 1;
                            break;
                        }
                        auxLex += c;
                        estado = 1;
                        break;
                    }
                    else {
                        auxLex += c;
                        addError(Tipo.DESCONOCIDO, auxLex, "Caracter no definido", fila, columna);
                        console.log("ERROR LEXICO1 CON: " + auxLex + " " + fila + "," + columna);
                        auxLex = "";
                        estado = 1;
                    }
                }
                break;
            case 2: ////////////////////////ESTE SERVIRA PARA LOS PARAMETROS DENTRO DE FUNCIONES, O VOID
                /////O TAMBIEN PARA EXPRESIONES
                if (isLetter(c) || isDigit(c) || c == "_") {
                    auxLex += c;
                    if (auxLex.toLowerCase().trim() == "true") {
                        addToken(Tipo.VERDADERO, auxLex.trim(), fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase().trim() == "false") {
                        addToken(Tipo.FALSO, auxLex.trim(), fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase() == "return") {
                        addToken(Tipo.RETURN, auxLex, fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }else if (auxLex.toLowerCase() == "main") {
                        addToken(Tipo.RESERVADA, auxLex, fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }

                    
                    if ((auxLex.toLowerCase().trim() == "int" || auxLex.toLowerCase().trim() == "double"
                        || auxLex.toLowerCase().trim() == "char" || auxLex.toLowerCase().trim() == "bool"
                        || auxLex.toLowerCase().trim().trim() == "string") && entrada.charAt(i + 1) == " ") {
                        addToken(Tipo.TIPO_DATO, auxLex, fila, columna);
                        estado = 2;
                        auxLex = "";
                        break;
                    }
                    else if (isLetter(c)) {
                        if (isLetter(entrada.charAt(i + 1)) || isDigit(entrada.charAt(i + 1)) || entrada.charAt(i + 1) == "_") {
                            estado = 2;
                        }
                        else {
                            if (flagcad) {
                                estado = 2;
                            }
                            else {
                                addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                                estado = 2;
                                auxLex = "";
                            }
                        }
                    }

                    else if (isDigit(c)) {
                        var validar = void 0;
                        try {
                            validar = entrada.charAt(i + 1);
                        }
                        catch (error) {
                            console.error(error);
                        }
                        if (isDigit(validar) || validar == ".") {
                            if(validar=="."){
                                addToken(Tipo.NUMERO, auxLex, fila, columna);
                                addToken(Tipo.PUNTO, validar,fila,columna);
                                i++;
                                estado = 2;
                                auxLex = "";
                                decimal=false;
                                break;
                            }else{
                                 decimal = true;
                                 estado = 2;
                            }
                           
                        }
                        else {
                            if(isLetter(entrada.charAt(i-2))){
                                addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                                estado = 2;
                                auxLex = "";
                                break;
                            }
                            addToken(Tipo.NUMERO, auxLex, fila, columna);
                            estado = 2;
                            auxLex = "";
                        }
                    }
                    estado = 2;
                }
                else if (c == ".") {
                    if (decimal) {
                        auxLex += c;
                        estado = 2;
                        decimal = false;
                        break;
                    }
                    addToken(Tipo.PUNTO, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == ",") {
                    addToken(Tipo.COMA, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == ")") {
                    addToken(Tipo.PARDER, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == "(") {
                    addToken(Tipo.PARIZQ, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == ";") { ///////////POR SI VINIESE UNO DE PARAMETROS;
                    this.fila++;
                    addToken(Tipo.PUNTOYCOMA, c, fila, columna);
                    estado = 0;
                    auxLex = "";
                }
                else if (c == "{") {
                    this.fila++;
                    addToken(Tipo.LLAVEIZQ, c, fila, columna);
                    estado = 0; //// porque va al principio tambien pueden haber declaraciones de variables
                    auxLex = "";
                }
                else if (c == "=") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.IGUALIGUAL, c + "=", fila, columna);
                        estado = 2;
                        i++;
                        auxLex = "";
                    }
                    else {
                        addToken(Tipo.IGUAL, c, fila, columna);
                        estado = 2;
                        auxLex = "";
                    }
                }
                else if (c == "\'") {
                    var validar = void 0;
                    try {
                        validar = entrada.charAt(i + 1);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if (isLetter(validar)) {
                        auxLex += c;
                        addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                        addToken(Tipo.CARACTER, validar, fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        auxLex += c;
                        addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "\"") {
                    contacadena++;
                    var validar = void 0;
                    try {
                        validar = entrada.charAt(i + 1);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if (contacadena==1) {
                        flagcad = true;
                        auxLex += c;
                        addToken(Tipo.COMILLA, c, fila, columna);
                        estado = 2;
                        auxLex = "";
                    }
                    else {
                        addToken(Tipo.CADENA, auxLex, fila, columna);
                        addToken(Tipo.COMILLA, c, fila, columna);
                        estado = 2;
                        contacadena=0;
                        flagcad = false;
                        auxLex = "";
                    }
                }
                else if (c == "+") {
                    addToken(Tipo.SUMA, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == "-") {
                    addToken(Tipo.RESTA, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == "*") {
                    addToken(Tipo.MULTIPLICACION, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == "/") {
                    addToken(Tipo.DIVISION, c, fila, columna);
                    estado = 2;
                    auxLex = "";
                }
                else if (c == ">") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MAYORIGUAL, c + "=", fila, columna);
                        estado = 2;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MAYOR, c, fila, columna);
                        estado = 2;
                        auxLex = "";
                    }
                }
                else if (c == "<") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MENORIGUAL, c + "=", fila, columna);
                        estado = 2;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MENOR, c, fila, columna);
                        estado = 2;
                        auxLex = "";
                    }
                }
                else if (c == "!") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.DESIGUAL, c + "=", fila, columna);
                        estado = 2;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.NOT, c, fila, columna);
                        estado = 2;
                        auxLex = "";
                    }
                }
                else if (c == "|") {
                    if (entrada.charAt(i + 1) == "|") {
                        addToken(Tipo.OR, c + "|", fila, columna);
                        estado = 2;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.OR, c, fila, columna);
                        estado = 2;
                        auxLex = "";
                    }
                }
                else if (c == "&") {
                    if (entrada.charAt(i + 1) == "&") {
                        addToken(Tipo.AND, c + "&", fila, columna);
                        estado = 2;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.AND, c, fila, columna);
                        estado = 2;
                        auxLex = "";
                    }
                }
                else if (c == "\n") {
                    estado = 2;
                    auxLex = "";
                    this.fila++;
                    columna = 0;
                }
                else if (c == "\t" || c == "\r") {
                    columna++;
                    estado = 2;
                }
                else if (c == " ") {
                    columna++;
                    estado = 2;
                }
                else {
                    auxLex += c;
                    addError(Tipo.DESCONOCIDO, auxLex, "Caracter no definido", fila, columna);
                    console.log("ERROR LEXICO2 CON: " + auxLex + " " + fila + "," + columna);
                    auxLex = "";
                    estado = 2;
                }
                break;
            case 3:
                if (isLetter(c) || isDigit(c) || c == "_") {
                    auxLex += c;
                    if (auxLex.toLowerCase().trim() == "true") {
                        addToken(Tipo.VERDADERO, auxLex.trim(), fila, columna);
                        estado = 3;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase().trim() == "false") {
                        addToken(Tipo.FALSO, auxLex.trim(), fila, columna);
                        estado = 3;
                        auxLex = "";
                        break;
                    }
                    else if (auxLex.toLowerCase().trim() == "return") {
                        addToken(Tipo.RETURN, auxLex, fila, columna);
                        estado = 3;
                        auxLex = "";
                        break;
                    }else if (auxLex.toLowerCase() == "main") {
                        addToken(Tipo.RESERVADA, auxLex, fila, columna);
                        estado = 3;
                        auxLex = "";
                        break;

                    }
                    if ((auxLex.toLowerCase().trim() == "int" || auxLex.toLowerCase().trim() == "double"
                        || auxLex.toLowerCase().trim() == "char" || auxLex.toLowerCase().trim() == "bool"
                        || auxLex.toLowerCase().trim().trim() == "string") && entrada.charAt(i + 1) == " ") {
                        addToken(Tipo.TIPO_DATO, auxLex, fila, columna);
                        estado = 3;
                        auxLex = "";
                        break;
                    }
                    else if (isLetter(c)) {
                        if (isLetter(entrada.charAt(i + 1)) || isDigit(entrada.charAt(i + 1)) || entrada.charAt(i + 1) == "_") {
                            estado = 3;
                        }
                        else {
                            addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                            estado = 3;
                            auxLex = "";
                        }
                    }
                    else if (isDigit(c)) {
                        var validar = void 0;
                        try {
                            validar = entrada.charAt(i + 1);
                        }
                        catch (error) {
                            console.error(error);
                        }
                        if (isDigit(validar) || validar == ".") {
                            decimal = true;
                            estado = 3;
                        }
                        else {
                            addToken(Tipo.NUMERO, auxLex, fila, columna);
                            estado = 3;
                            auxLex = "";
                        }
                    }
                    estado = 2;
                }
                else if (c == ".") {
                    if (decimal) {
                        auxLex += c;
                        estado = 3;
                        decimal = false;
                        break;
                    }
                    addToken(Tipo.PUNTO, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == ",") {
                    if (auxLex != "") {
                        addToken(Tipo.COMA, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                    else {
                        addToken(Tipo.COMA, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                }
                else if (c == ")") {
                    addToken(Tipo.PARDER, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == "(") {
                    addToken(Tipo.PARIZQ, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == ";") { ///////////POR SI VINIESE UNO DE PARAMETROS;
                    this.fila++;
                    addToken(Tipo.PUNTOYCOMA, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == "{") {
                    this.fila++;
                    addToken(Tipo.LLAVEIZQ, c, fila, columna);
                    estado = 0; //// porque va al principio tambien pueden haber declaraciones de variables
                    auxLex = "";
                }
                else if (c == "=") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.IGUALIGUAL, c + "=", fila, columna);
                        estado = 3;
                        i++;
                        auxLex = "";
                    }
                    else {
                        addToken(Tipo.IGUAL, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                }
                else if (c == "\'") {
                    var validar = void 0;
                    try {
                        validar = entrada.charAt(i + 1);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if (isLetter(validar)) {
                        auxLex += c;
                        addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                        addToken(Tipo.CARACTER, validar, fila, columna);
                        estado = 1;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        auxLex += c;
                        addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                }
                else if (c == "\"") {
                    var validar = void 0;
                    try {
                        validar = entrada.charAt(i + 1);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if (isLetter(validar)) {
                        flagcad = true;
                        auxLex += c;
                        addToken(Tipo.COMILLA, c, fila, columna);
                        estado = 1;
                        auxLex = "";
                    }
                    else {
                        addToken(Tipo.CADENA, auxLex, fila, columna);
                        addToken(Tipo.COMILLA, c, fila, columna);
                        estado = 1;
                        flagcad = false;
                        auxLex = "";
                    }
                }
                else if (c == "+") {
                    addToken(Tipo.SUMA, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == "-") {
                    addToken(Tipo.RESTA, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == "*") {
                    addToken(Tipo.MULTIPLICACION, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == "/") {
                    addToken(Tipo.DIVISION, c, fila, columna);
                    estado = 3;
                    auxLex = "";
                }
                else if (c == ">") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MAYORIGUAL, c + "=", fila, columna);
                        estado = 3;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MAYOR, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                }
                else if (c == "<") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.MENORIGUAL, c + "=", fila, columna);
                        estado = 3;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.MENOR, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                }
                else if (c == "!") {
                    if (entrada.charAt(i + 1) == "=") {
                        addToken(Tipo.DESIGUAL, c + "=", fila, columna);
                        estado = 3;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.NOT, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                }
                else if (c == "|") {
                    if (entrada.charAt(i + 1) == "|") {
                        addToken(Tipo.OR, c + "|", fila, columna);
                        estado = 3;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.OR, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                }
                else if (c == "&") {
                    if (entrada.charAt(i + 1) == "&") {
                        addToken(Tipo.AND, c + "&", fila, columna);
                        estado = 3;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        addToken(Tipo.AND, c, fila, columna);
                        estado = 3;
                        auxLex = "";
                    }
                }
                else if (c == "\n") {
                    estado = 3;
                    auxLex = "";
                    this.fila++;
                    columna = 0;
                }
                else if (c == "\t" || c == "\r") {
                    columna++;
                    estado = 3;
                }
                else if (c == " ") {
                    columna++;
                    estado = 3;
                }
                else {
                    auxLex += c;
                    addError(Tipo.DESCONOCIDO, auxLex, "Caracter no definido", fila, columna);
                    console.log("ERROR LEXICO3 CON: " + auxLex + " " + fila + "," + columna);
                    auxLex = "";
                    estado = 3;
                }
                break;
            case 4: /////////////////////////////////////////////////////////////ESTE LO USO SOLO PARA LOS CASE
                if (isLetter(c) || isDigit(c) || c == "_") {
                    auxLex += c;
                    if ((auxLex.toLowerCase() == "int" || auxLex.toLowerCase() == "double"
                        || auxLex.toLowerCase() == "char" || auxLex.toLowerCase() == "bool"
                        || auxLex.toLowerCase() == "string") && entrada.charAt(i + 1) == " ") {
                        addToken(Tipo.TIPO_DATO, auxLex, fila, columna);
                        estado = 4;
                        auxLex = "";
                        break;
                    }
                    estado = 4;
                }
                else if (c == "\'") {
                    var validar = void 0;
                    try {
                        validar = entrada.charAt(i + 1);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if (isLetter(validar) || isDigit(validar)) {
                        auxLex += c;
                        addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                        addToken(Tipo.CARACTER, validar, fila, columna);
                        estado = 4;
                        i++;
                        auxLex = "";
                        break;
                    }
                    else {
                        auxLex += c;
                        addToken(Tipo.COMILLASIMPLE, c, fila, columna);
                        estado = 4;
                        auxLex = "";
                    }
                }
                else if (c == "\"") {
                    contacadena++;
                    if (contacadena == 1) {
                        flagcad = true;
                        auxLex += c;
                        addToken(Tipo.COMILLA, c, fila, columna);
                        estado = 4;
                        auxLex = "";
                    }
                    else {
                        addToken(Tipo.CADENA, auxLex, fila, columna);
                        addToken(Tipo.COMILLA, c, fila, columna);
                        estado = 4;
                        contacadena = 0;
                        flagcad = false;
                        auxLex = "";
                    }
                }
                else if (c == ":") {
                    if (entrada.charAt(i - 1) == "\"" || entrada.charAt(i - 1) == "\'") {
                        addToken(Tipo.DOSPUNTOS, c, fila, columna);
                        estado = 0;
                        auxLex = "";
                        fila++;
                        columna = 0;
                    }
                    else {
                        addToken(Tipo.IDENTIFICADOR, auxLex, fila, columna);
                        addToken(Tipo.DOSPUNTOS, c, fila, columna);
                        estado = 0;
                        auxLex = "";
                        fila++;
                        columna = 0;
                    }
                }
                else if (c == "\n") {
                    estado = 4;
                    auxLex = "";
                    this.fila++;
                    columna = 0;
                }
                else if (c == "\t" || c == "\r") {
                    columna++;
                    estado = 4;
                }
                else if (c == " ") {
                    columna++;
                    estado = 4;
                }
                else {
                    if (flagcad) {
                        auxLex += c;
                        estado = 0;
                        break;
                    }
                    auxLex += c;
                    addError(Tipo.DESCONOCIDO, auxLex, "Caracter no definido", fila, columna);
                    console.log("ERROR LEXICO4 CON: " + auxLex + " " + fila + "," + columna);
                    auxLex = "";
                    estado = 3;
                }
                break;
        }
    }
    addToken(Tipo.ULTIMO,"",0,0);
    return salida;
    
}
function addToken( tipo:Tipo,  auxLex:String,  fila1:number, columna:number):void {
    salida.push(new Token(tipo, auxLex, "" ,fila1, columna));
    auxLex = "";
    estado = 0;
}

function addError( tipo:Tipo,  auxLex:String, descripcion:String, fila1:number, columna:number): void {
    errores.push(new Token(Tipo.LEXICO, auxLex, descripcion, fila1,columna));
    auxLex = "";
    estado = 0;
}
function imprimirLista( l:Array<Token>):String {
    let imprime:String="";
    l.forEach(function (value) {
        imprime +=value.getTipoEnString().toString()+ " <--> " + value.getValor() 
        + " <--> " + value.getFila() + " <--> " + value.getColumna()+"\n";
    });
    return imprime;
}
function devolverSalida():string {
    let htmlsalida="";
    let numero=0;
    this.salida.forEach(function (value) {
        htmlsalida+= "<tr bgcolor=#FFEB3B >\n"
        + "	<p align=\"center\">\n"
        + "<DIV ALIGN=center>\n"
        + "    <td><center>" + numero++ + "</center></td>\n"
        + "    <td><center>" + value.getTipoEnString().toString() + "</center></td>\n"
        + "    <td><center>" + value.getValor()  + "</center></td>\n"
        + "    <td><center>" + value.getFila() + "</center></td>\n"
        + "    <td><center>" + value.getColumna() + "</center></td>\n"
        + "</DIV>\n"
        + "	</p>\n"
        + "  </tr>\n"
        + "<tr>";
    });
    return htmlsalida;
}
function devolverErrores():Array<Token> {
    return this.errores;
}

function isLetter(elemento) {
    return elemento.length === 1 &&elemento.match(/^[A-Za-z]+$/);
}
function isCadena(elemento){
    return elemento.match(/^[A-Za-z0-9_]+/i);
}
function isDigit(elemento) {
    return elemento.length === 1 && elemento.match(/[0-9]/i);
}
function isDecimal(elemento){
    return elemento.match(/[0-9]+"."[0-9]+/i);
}
function isSpace(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
enum Tipo {
    LETRA,
    NUMERO,
    CARACTER,
    RESERVADA,
    MULTILINEA,
    COMENTARIO,
    TIPO_DATO,
    ASTERISCO,
    SLASHASTERISCO,
    DOBLESLASH,
    IDENTIFICADOR,
    LLAVEIZQ,
    LLAVEDER,
    LINEA_EN_BLANCO,
    PUNTOYCOMA,
    DOSPUNTOS,
    COMA,
    PARDER,
    PARIZQ,
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    VOID,
    IF, 
    IMPRIMIR,
    CADENA,
    ELSE,
    ELSEIF,
    PUNTO,
    COMILLA,
    COMILLASIMPLE,
    OR,
    AND,
    NOT,
    MAYOR,
    MENOR,
    MAYORIGUAL,
    MENORIGUAL,
    IGUALIGUAL,
    DESIGUAL,
    RETURN,
    BREAK,
    CONTINUE,
    IGUAL,
    ID_PADRAMETROS,
    VERDADERO,
    FALSO,
    WHILE,
    FOR,
    SWITCH,
    CASE,
    DEFAULT,
    DO,
    ULTIMO,
    EXPRESION,
    L_ID,
    ANTIPANICO_L_CLASESINTERNAS,
    LEXICO,
    SINTACTICO,
    SENTENCIAS,
    DESCONOCIDO
}
class Token{
    public tipo: Tipo;
    public lexema:String;
    public filas:number;
    public columna: number;
    public descripcion: String;
    constructor(tipotoken:Tipo, lexema:String, descripcion: String, fila2:number, columna:number){
        this.lexema = lexema;
        this.filas = fila2;
        this.columna  = columna;
        this.tipo= tipotoken;
        this.descripcion=descripcion;
    }
    public getTipotoken():Tipo{
        return this.tipo;
    }
    public setTipotoken(tipotoken: Tipo):void{
        this.tipo = tipotoken;
    }
    public  getValor():String {
        return this.lexema;
    }
    public setValor(valor:String):void {
        this.lexema = valor;
    }
    public getDescripcion():String {
        return this.descripcion;
    }
    public setDescripcion(descripcion: String):void {
        this.descripcion = descripcion;
    }
    public getFila():number {
        return this.filas;
    }
    public setFila(fila2:number):void  {
        this.filas = fila2;
    }
    public getColumna():number {
        return this.columna;
    }

    public setColumna(columna: number):void  {
        this.columna = columna;
    }
    public getTipoEnString():String {
        switch (this.tipo) {
            case Tipo.LETRA:
                return "Letra";
            case Tipo.NUMERO:
                return "Numero";
            case Tipo.RESERVADA:
                return "Palabra reservada";
            case Tipo.DIVISION:
                return "Division";
            case Tipo.CARACTER:
                return "Caracter";
            case Tipo.MULTILINEA:
                return "Multilinea";
            case Tipo.COMILLA:
                return "Comilla";
            case Tipo.COMILLASIMPLE:
                return "Comilla simple";
            case Tipo.DOSPUNTOS:
                return "Dos puntos";
            case Tipo.PUNTO:
                return "Punto";
            case Tipo.PUNTOYCOMA:
                return "Punto y coma";
            case Tipo.COMA:
                return "Coma";
            case Tipo.MULTIPLICACION:
                return "Multiplicacion";
            case Tipo.SUMA:
                return "suma";
            case Tipo.RESTA:
                return "Resta";
            case Tipo.OR:
                return "Or";
            case Tipo.AND:
                return "And";
            case Tipo.NOT:
                return "Not";
            case Tipo.MAYOR:
                return "Mayor";
            case Tipo.MENOR:
                return "Menor";
            case Tipo.MENORIGUAL:
                return "Menor igual";
            case Tipo.MAYORIGUAL:
                return "Mayor igual";
            case Tipo.IGUAL:
                return "Igual";
            case Tipo.DESIGUAL:
                return "Desigual";
            case Tipo.LLAVEDER:
                return "LLave derecha";
            case Tipo.LLAVEIZQ:
                return "LLave izquierda";
            case Tipo.CADENA:
                return "Cadena";
            case Tipo.LINEA_EN_BLANCO:
                return "Linea en blanco";
            case Tipo.IDENTIFICADOR:
                return "Identificador";
            case Tipo.COMENTARIO:
                return "Comentario";
            case Tipo.RETURN:
                return "Return";
            case Tipo.BREAK:
                return "Break";
            case Tipo.CONTINUE:
                return "Continue";
            case Tipo.SLASHASTERISCO:
                return "Slash asterisco comentario";
            case Tipo.DOBLESLASH:
                return "Doble slash";
            case Tipo.ID_PADRAMETROS:
                return "Identificador de parametros";
            case Tipo.IGUALIGUAL:
                return "Igual que";
            case Tipo.VERDADERO:
                return "True";
            case Tipo.FALSO:
                return "False";
            case Tipo.PARDER:
                return "Paréntesis derecho";
            case Tipo.PARIZQ:
                return "Paréntesis izquierdo";
            case Tipo.TIPO_DATO:
                return "Tipo de dato";
            case Tipo.IF:
                return "If";
            case Tipo.ELSE:
                return "Else";
            case Tipo.WHILE:
                return "While";
            case Tipo.FOR:
                return "For";
            case Tipo.SWITCH:
                return "Switch";
            case Tipo.CASE:
                return "Casos";
            case Tipo.IMPRIMIR:
                return "Imprimir ";
            case Tipo.DEFAULT:
                return "Default";
            case Tipo.DO:
                return "Do";
            case Tipo.DESCONOCIDO:
                return "Valor Desconocido";
            case Tipo.ULTIMO:
                return "#";
            case Tipo.EXPRESION:
                return "Expresion";
            case Tipo.L_ID:
                return "Identificador";
            case Tipo.SENTENCIAS:
                return "Sentencia correcta";
            case Tipo.LEXICO:
                return " Error Lexico ";
            case Tipo.SINTACTICO:
                return " Errror Sintactico ";
            case Tipo.ANTIPANICO_L_CLASESINTERNAS:
                return "Se esperaba una clase o comentarios";
            default:
                return "desconocido";
        }
    }
}