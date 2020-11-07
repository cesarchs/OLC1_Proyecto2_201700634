"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const Token_Error_1 = require("./Token_Error");
class Analizador_Lexico {
    constructor() {
        this.lista_Tokens = new Array();
        this.lista_Errores = new Array();
    }
    analizador(textoDocumento) {
        this.estado = 0;
        this.auxLexema = "";
        this.textoDocumento = textoDocumento + "#";
        let filaToken = 0;
        let columnaToken = 0;
        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
        let estadoComentario = 0; //Guarda el estado anterior del comentario para saber si es de linea o bloque
        let filaComentarioBloque = 0;
        let columnaComentarioBloque = 0;
        let inicioComentarioBloque = false;
        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
        for (let i = 0; i < this.textoDocumento.length; i++) {
            const c = this.textoDocumento[i];
            columnaToken += 1;
            switch (this.estado) {
                /** ESTADO S0 **/
                case 0:
                    if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
                        this.estado = 1;
                        this.auxLexema += c;
                    }
                    else if (c >= '0' && c <= '9') {
                        this.estado = 2;
                        this.auxLexema += c;
                    }
                    else if (c == '{' || c == '}' || c == ',' || c == ';' || c == '^' || c == '*'
                        || c == '[' || c == ']' || c == '(' || c == ')' || c == '.') {
                        this.estado = 5;
                        this.auxLexema += c;
                    }
                    else if (c == '"') {
                        this.estado = 6;
                        this.auxLexema += c;
                    }
                    else if (c == "'") {
                        this.estado = 8;
                        this.auxLexema += c;
                    }
                    else if (c == '/') {
                        this.estado = 10;
                        this.auxLexema += c;
                    }
                    else if (c == '&') {
                        this.estado = 15;
                        this.auxLexema += c;
                    }
                    else if (c == '|') {
                        this.estado = 17;
                        this.auxLexema += c;
                    }
                    else if (c == '+') {
                        this.estado = 19;
                        this.auxLexema += c;
                    }
                    else if (c == '-') {
                        this.estado = 21;
                        this.auxLexema += c;
                    }
                    else if (c == '<' || c == '>' || c == '!' || c == '=') {
                        this.estado = 23;
                        this.auxLexema += c;
                    }
                    else if (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
                        this.estado = 0;
                        if (c == '\n') {
                            columnaToken = 0;
                            filaToken += 1;
                        }
                        continue;
                    }
                    else {
                        if (c == '#' && i == this.textoDocumento.length - 1) {
                            if (this.lista_Errores.length > 0) {
                                console.log("Se han encontrado errores lexicos");
                            }
                            console.log("Se ha concluido el analisis lexico");
                        }
                        else {
                            this.addTokenError(c, filaToken, columnaToken);
                        }
                    }
                    break;
                /** ESTADO S1 **/
                case 1:
                    if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '_') {
                        this.estado = 1;
                        this.auxLexema += c;
                    }
                    else {
                        if (this.auxLexema == 'public') {
                            this.addToken(Token_1.Tipo.RESERVADA_PUBLIC, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'class') {
                            this.addToken(Token_1.Tipo.RESERVADA_CLASS, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'interface') {
                            this.addToken(Token_1.Tipo.RESERVADA_INTERFACE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'void') {
                            this.addToken(Token_1.Tipo.RESERVADA_VOID, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'for') {
                            this.addToken(Token_1.Tipo.RESERVADA_FOR, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'while') {
                            this.addToken(Token_1.Tipo.RESERVADA_WHILE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'do') {
                            this.addToken(Token_1.Tipo.RESERVADA_DO, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'if') {
                            this.addToken(Token_1.Tipo.RESERVADA_IF, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'else') {
                            this.addToken(Token_1.Tipo.RESERVADA_ELSE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'break') {
                            this.addToken(Token_1.Tipo.RESERVADA_BREAK, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'continue') {
                            this.addToken(Token_1.Tipo.RESERVADA_CONTINUE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'return') {
                            this.addToken(Token_1.Tipo.RESERVADA_RETURN, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'int') {
                            this.addToken(Token_1.Tipo.RESERVADA_INT, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'boolean') {
                            this.addToken(Token_1.Tipo.RESERVADA_BOOLEAN, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'true') {
                            this.addToken(Token_1.Tipo.RESERVADA_TRUE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'false') {
                            this.addToken(Token_1.Tipo.RESERVADA_FALSE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'double') {
                            this.addToken(Token_1.Tipo.RESERVADA_DOUBLE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'String') {
                            this.addToken(Token_1.Tipo.RESERVADA_STRING, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'char') {
                            this.addToken(Token_1.Tipo.RESERVADA_CHAR, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'static') {
                            this.addToken(Token_1.Tipo.RESERVADA_STATIC, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'main') {
                            this.addToken(Token_1.Tipo.RESERVADA_MAIN, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'args') {
                            this.addToken(Token_1.Tipo.RESERVADA_ARGS, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'System') {
                            this.addToken(Token_1.Tipo.RESERVADA_SYSTEM, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'out') {
                            this.addToken(Token_1.Tipo.RESERVADA_OUT, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'println') {
                            this.addToken(Token_1.Tipo.RESERVADA_PRINTLN, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'print') {
                            this.addToken(Token_1.Tipo.RESERVADA_PRINT, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == 'new') {
                            this.addToken(Token_1.Tipo.RESERVADA_NEW, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else {
                            this.addToken(Token_1.Tipo.IDENTIFICADOR, filaToken, columnaToken - this.auxLexema.length);
                        }
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S2 **/
                case 2:
                    if (c >= '0' && c <= '9') {
                        this.estado = 2;
                        this.auxLexema += c;
                    }
                    else if (c == '.') {
                        this.estado = 3;
                        this.auxLexema += c;
                    }
                    else {
                        this.addToken(Token_1.Tipo.NUMERO_ENTERO, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S3 **/
                case 3:
                    if (c >= '0' && c <= '9') {
                        this.estado = 4;
                        this.auxLexema += c;
                    }
                    else {
                        this.addTokenError(this.auxLexema, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S4 **/
                case 4:
                    if (c >= '0' && c <= '9') {
                        this.estado = 4;
                        this.auxLexema += c;
                    }
                    else {
                        this.addToken(Token_1.Tipo.NUMERO_DECIMAL, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S5 **/
                case 5:
                    if (this.auxLexema == '{') {
                        this.addToken(Token_1.Tipo.LLAVE_IZQ, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '}') {
                        this.addToken(Token_1.Tipo.LLAVE_DER, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == ',') {
                        this.addToken(Token_1.Tipo.COMA, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == ';') {
                        this.addToken(Token_1.Tipo.PUNTO_Y_COMA, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '^') {
                        this.addToken(Token_1.Tipo.SIGNO_XOR, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '*') {
                        this.addToken(Token_1.Tipo.SIGNO_POR, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '[') {
                        this.addToken(Token_1.Tipo.CORCHETE_IZQ, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == ']') {
                        this.addToken(Token_1.Tipo.CORCHETE_DER, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '(') {
                        this.addToken(Token_1.Tipo.PARENTESIS_IZQ, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == ')') {
                        this.addToken(Token_1.Tipo.PARENTESIS_DER, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '.') {
                        this.addToken(Token_1.Tipo.PUNTO, filaToken, columnaToken - this.auxLexema.length);
                    }
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S6 **/
                case 6:
                    if (c == '"') {
                        this.estado = 7;
                        this.auxLexema += c;
                    }
                    else {
                        this.estado = 6;
                        this.auxLexema += c;
                    }
                    break;
                /** ESTADO S7 **/
                case 7:
                    this.addToken(Token_1.Tipo.CADENA_STRING, filaToken, columnaToken - this.auxLexema.length);
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S8 **/
                case 8:
                    if (c == "'") {
                        this.estado = 9;
                        this.auxLexema += c;
                    }
                    else {
                        this.estado = 8;
                        this.auxLexema += c;
                    }
                    break;
                /** ESTADO S9 **/
                case 9:
                    this.addToken(Token_1.Tipo.CADENA_CHAR, filaToken, columnaToken - this.auxLexema.length);
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S10 **/
                case 10:
                    if (c == '*') {
                        this.estado = 11;
                        this.auxLexema += c;
                    }
                    else if (c == '/') {
                        this.estado = 13;
                        this.auxLexema += c;
                    }
                    else {
                        this.addToken(Token_1.Tipo.SIGNO_DIVISION, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S11 **/
                case 11:
                    if (c == '*') {
                        this.estado = 12;
                        this.auxLexema += c;
                    }
                    else {
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                        if (c == '#' && i == this.textoDocumento.length - 1) {
                            if (inicioComentarioBloque) {
                                this.addTokenError(this.auxLexema, filaComentarioBloque, columnaComentarioBloque);
                            }
                            else {
                                this.addTokenError(this.auxLexema, filaToken, columnaToken - this.auxLexema.length);
                                i -= 1;
                                columnaToken -= 1;
                                continue;
                            }
                        }
                        else if (c == '\n') {
                            if (inicioComentarioBloque == false) {
                                columnaComentarioBloque = columnaToken - this.auxLexema.length;
                                filaComentarioBloque = filaToken;
                                inicioComentarioBloque = true;
                            }
                            filaToken += 1;
                            columnaToken = 0;
                        }
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                        this.estado = 11;
                        this.auxLexema += c;
                    }
                    break;
                /** ESTADO S12 **/
                case 12:
                    if (c == '/') {
                        this.estado = 14;
                        this.auxLexema += c;
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                        estadoComentario = 12;
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                    }
                    else if (c == '*') {
                        this.estado = 11;
                        i -= 1;
                        columnaToken -= 1;
                    }
                    else {
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                        if (c == '#' && i == this.textoDocumento.length - 1) {
                            if (inicioComentarioBloque) {
                                this.addTokenError(this.auxLexema, filaComentarioBloque, columnaComentarioBloque);
                            }
                            else {
                                this.addTokenError(this.auxLexema, filaToken, columnaToken - this.auxLexema.length);
                                i -= 1;
                                columnaToken -= 1;
                                continue;
                            }
                        }
                        else if (c == '\n') {
                            if (inicioComentarioBloque == false) {
                                columnaComentarioBloque = columnaToken - this.auxLexema.length;
                                filaComentarioBloque = filaToken;
                                inicioComentarioBloque = true;
                            }
                            filaToken += 1;
                            columnaToken = 0;
                        }
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                        this.estado = 11;
                        this.auxLexema += c;
                    }
                    break;
                /** ESTADO S13 **/
                case 13:
                    if (c == '\n') {
                        this.estado = 14;
                        /** VALIDACIONES PARA COMENTARIO_LINEA **/
                        estadoComentario = 13;
                        i -= 1;
                        columnaToken -= 1;
                        /** VALIDACIONES PARA COMENTARIO_LINEA **/
                    }
                    else if (c == '#' && i == this.textoDocumento.length - 1) {
                        this.estado = 14;
                        /** VALIDACIONES PARA COMENTARIO_LINEA **/
                        estadoComentario = 13;
                        i -= 1;
                        columnaToken -= 1;
                        /** VALIDACIONES PARA COMENTARIO_LINEA **/
                    }
                    else {
                        this.estado = 13;
                        this.auxLexema += c;
                    }
                    break;
                /** ESTADO S14 **/
                case 14:
                    if (estadoComentario == 13) {
                        this.addToken(Token_1.Tipo.COMENTARIO_LINEA, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else {
                        this.addToken(Token_1.Tipo.COMENTARIO_BLOQUE, filaComentarioBloque, columnaComentarioBloque);
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                        columnaComentarioBloque = 0;
                        filaComentarioBloque = 0;
                        inicioComentarioBloque = false;
                        /** VALIDACIONES PARA COMENTARIO_BLOQUE **/
                    }
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S15 **/
                case 15:
                    if (c == '&') {
                        this.estado = 16;
                        this.auxLexema += c;
                    }
                    else {
                        this.addTokenError(this.auxLexema, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S16 **/
                case 16:
                    this.addToken(Token_1.Tipo.SIGNO_AND, filaToken, columnaToken - this.auxLexema.length);
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S17 **/
                case 17:
                    if (c == '|') {
                        this.estado = 18;
                        this.auxLexema += c;
                    }
                    else {
                        this.addTokenError(this.auxLexema, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S18 **/
                case 18:
                    this.addToken(Token_1.Tipo.SIGNO_OR, filaToken, columnaToken - this.auxLexema.length);
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S19 **/
                case 19:
                    if (c == '+') {
                        this.estado = 20;
                        this.auxLexema += c;
                    }
                    else {
                        this.addToken(Token_1.Tipo.SIGNO_MAS, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S20 **/
                case 20:
                    this.addToken(Token_1.Tipo.SIGNO_POS_INCREMENTO, filaToken, columnaToken - this.auxLexema.length);
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S21 **/
                case 21:
                    if (c == '-') {
                        this.estado = 22;
                        this.auxLexema += c;
                    }
                    else {
                        this.addToken(Token_1.Tipo.SIGNO_MENOS, filaToken, columnaToken - this.auxLexema.length);
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S22 **/
                case 22:
                    this.addToken(Token_1.Tipo.SIGNO_POS_DECREMENTO, filaToken, columnaToken - this.auxLexema.length);
                    i -= 1;
                    columnaToken -= 1;
                    break;
                /** ESTADO S23 **/
                case 23:
                    if (c == '=') {
                        this.estado = 24;
                        this.auxLexema += c;
                    }
                    else {
                        if (this.auxLexema == '<') {
                            this.addToken(Token_1.Tipo.SIGNO_MENOR_QUE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == '>') {
                            this.addToken(Token_1.Tipo.SIGNO_MAYOR_QUE, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == '!') {
                            this.addToken(Token_1.Tipo.SIGNO_NOT, filaToken, columnaToken - this.auxLexema.length);
                        }
                        else if (this.auxLexema == '=') {
                            this.addToken(Token_1.Tipo.SIGNO_IGUAL, filaToken, columnaToken - this.auxLexema.length);
                        }
                        i -= 1;
                        columnaToken -= 1;
                    }
                    break;
                /** ESTADO S24 **/
                case 24:
                    if (this.auxLexema == '<=') {
                        this.addToken(Token_1.Tipo.SIGNO_MENOR_IGUAL_QUE, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '>=') {
                        this.addToken(Token_1.Tipo.SIGNO_MAYOR_IGUAL_QUE, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '!=') {
                        this.addToken(Token_1.Tipo.SIGNO_DIFERENTE_DE, filaToken, columnaToken - this.auxLexema.length);
                    }
                    else if (this.auxLexema == '==') {
                        this.addToken(Token_1.Tipo.SIGNO_DOBLE_IGUAL, filaToken, columnaToken - this.auxLexema.length);
                    }
                    i -= 1;
                    columnaToken -= 1;
                    break;
            }
        }
        return this.lista_Tokens;
    }
    analizador_Error() {
        return this.lista_Errores;
    }
    addToken(tipo, fila, columna) {
        this.lista_Tokens.push(new Token_1.Token(tipo, this.auxLexema, fila, columna));
        this.auxLexema = "";
        this.estado = 0;
    }
    addTokenError(caracter, fila, columna) {
        if (this.auxLexema == "") {
            this.lista_Errores.push(new Token_Error_1.Token_Error(caracter, Token_Error_1.TipoError.LEXICO, "El simbolo no pertenece al lenguaje", fila, columna));
        }
        else {
            this.lista_Errores.push(new Token_Error_1.Token_Error(caracter, Token_Error_1.TipoError.LEXICO, "Lexema no definido en el lenguaje", fila, columna));
        }
        this.auxLexema = "";
        this.estado = 0;
    }
}
exports.Analizador_Lexico = Analizador_Lexico;