var IMPRIMIR_SE = "";
var PHYTON_CASE = "";
var LIST_VARIABLE = "";
var VariablesList;
var Sintactic = /** @class */ (function () {
    function Sintactic() {
        this.imprimirhtml = false;
        this.returnfuncion = false;
        this.returnmetodo = false;
        this.verdafuncion = false;
        this.breakrepeticion = false;
        this.continuerepeticion = false;
        this.returnsifs = false;
        this.esswitch = false;
        this.esmetodo = false;
        this.esfor = false;
        this.esconsole = false;
        this.eswhile = "";
        this.constante = 0;
        this.eswhiletrue = false;
        this.booleanisfuncion = false;
        this.identificadores = "";
        this.Tipo_variable = "";
    }
    Sintactic.prototype.Sintactico = function (l) {
        PHYTON_CASE = "";
        this.eswhile = "";
        this.HTML_LIST = new Array();
        VariablesList = new Array();
        alert("entrando");
        this.listatokens = l;
        this.preanalisis = this.listatokens[0];
        this.numPreanalisis = 0;
        this.L_CLASESINTERNAS();
        //this.EXP();
        IMPRIMIR_SE = PRINTHTML(this.HTML_LIST);
    };
    Sintactic.prototype.L_CLASESINTERNAS = function () {
        if (this.preanalisis.tipo == Tipo.RESERVADA && this.preanalisis.lexema == "class") {
            //rclass id:a BLOQUE;   MAIN DEFAULT VOID CLASS
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.RESERVADA);
            this.match(Tipo.IDENTIFICADOR);
            this.BLOQUE();
        }
        else if (this.preanalisis.tipo == Tipo.SLASHASTERISCO) {
            PHYTON_CASE += "\"\'";
            this.match(Tipo.SLASHASTERISCO);
            this.COMENTARIOS();
            this.match(Tipo.SLASHASTERISCO);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += "\"\'\n";
            }
            this.L_CLASESINTERNAS();
        }
        else if (this.preanalisis.tipo == Tipo.DOBLESLASH) {
            PHYTON_CASE += "#";
            this.match(Tipo.DOBLESLASH);
            this.COMENTARIOS();
            this.L_CLASESINTERNAS();
        }
    };
    Sintactic.prototype.BLOQUE = function () {
        if (this.preanalisis.tipo == Tipo.LLAVEIZQ) {
            if (this.esswitch) {
                PHYTON_CASE += this.preanalisis.getValor().toString() + "\n\r\t";
                this.esswitch = false;
            }
            else {
                PHYTON_CASE += ": " + "\n\r\t";
            }
            this.match(Tipo.LLAVEIZQ);
            this.BLOQUED();
        }
    };
    Sintactic.prototype.BLOQUED = function () {
        if (this.preanalisis.tipo == Tipo.LLAVEDER) {
            if (this.esswitch) {
                PHYTON_CASE += this.preanalisis.getValor().toString() + "\n\t";
                this.esswitch = false;
            }
            else {
                PHYTON_CASE += "" + "\n";
            }
            if (this.returnsifs) {
            }
            else {
                this.returnfuncion = false;
                this.returnmetodo = false;
                this.breakrepeticion = false;
            }
            this.match(Tipo.LLAVEDER);
        }
        else {
            this.L_INSTRUCCIONES();
            if (this.returnsifs) {
            }
            else {
                this.returnfuncion = false;
                this.returnmetodo = false;
                this.breakrepeticion = false;
            }
            this.match(Tipo.LLAVEDER);
            if (this.verdafuncion) { }
            else {
                if (this.esswitch) {
                    PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString() + "\n\t";
                    this.esswitch = false;
                }
                else {
                    PHYTON_CASE += "\n\r\t";
                }
            }
        }
    };
    Sintactic.prototype.L_INSTRUCCIONES = function () {
        this.INSTRUCCION();
    };
    Sintactic.prototype.INSTRUCCION = function () {
        if (this.preanalisis.tipo == Tipo.TIPO_DATO) {
            this.Tipo_variable = "";
            this.Tipo_variable = this.preanalisis.getValor().toString();
            this.booleanisfuncion = true;
            this.identificadores = "";
            this.match(Tipo.TIPO_DATO);
            this.L_ID(); /////en este puede ir una lista con comas
            this.DECLARACION();
            this.booleanisfuncion = false;
        }
        else if (this.preanalisis.tipo == Tipo.SLASHASTERISCO) {
            PHYTON_CASE += "\"\'";
            this.match(Tipo.SLASHASTERISCO);
            this.COMENTARIOS();
            this.match(Tipo.SLASHASTERISCO);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += "\"\'\n";
            }
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.DOBLESLASH) {
            PHYTON_CASE += "#";
            this.match(Tipo.DOBLESLASH);
            this.COMENTARIOS();
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.IDENTIFICADOR) {
            this.identificadores += this.preanalisis.getValor().toString();
            this.match(Tipo.IDENTIFICADOR);
            this.DECLARACION();
        }
        else if (this.preanalisis.tipo == Tipo.IMPRIMIR) {
            if (this.preanalisis.lexema.toLowerCase() == "console") {
                this.esconsole = true;
                this.imprimirhtml = true;
                this.match(Tipo.IMPRIMIR);
                this.IMPRIMIENDO();
                this.esconsole = false;
            }
        }
        else if (this.preanalisis.tipo == Tipo.RESERVADA && this.preanalisis.lexema.toLowerCase() == "void") {
            PHYTON_CASE += "def ";
            this.match(Tipo.RESERVADA);
            if (this.listatokens[this.numPreanalisis].tipo == Tipo.RESERVADA && this.listatokens[this.numPreanalisis].lexema.toLowerCase() == "main") {
                PHYTON_CASE += this.listatokens[this.numPreanalisis].getValor().toString();
                this.match(Tipo.RESERVADA);
                this.match(Tipo.PARIZQ);
                if (this.verdafuncion) { }
                else {
                    PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
                }
                this.match(Tipo.PARDER);
                if (this.verdafuncion) { }
                else {
                    PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
                }
                this.BLOQUE();
                PHYTON_CASE += "if __name__ = “__main__”: \n\tmain()\n\t";
                this.INSTRUCCION();
            }
            else {
                /// va solo funcion
                this.returnmetodo = true;
                this.match(Tipo.IDENTIFICADOR);
                if (this.verdafuncion) { }
                else {
                    PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
                }
                this.match(Tipo.PARIZQ);
                if (this.verdafuncion) { }
                else {
                    PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
                }
                this.METODOS();
                this.BLOQUE();
                this.INSTRUCCION();
            }
        }
        else if (this.preanalisis.tipo == Tipo.RETURN) {
            this.match(Tipo.RETURN);
            if (this.returnmetodo) {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
                if (this.returnsifs) {
                }
                else {
                    this.returnmetodo = false;
                }
            }
            else if (this.returnfuncion) {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
                this.EXP();
                if (this.returnsifs) {
                }
                else {
                    this.returnfuncion = false;
                }
            }
            else {
                this.match(Tipo.SENTENCIAS);
            }
            this.match(Tipo.PUNTOYCOMA);
            PHYTON_CASE += "\n";
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.IF) {
            this.L_IF();
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.BREAK) {
            if (this.breakrepeticion) {
                PHYTON_CASE += this.preanalisis.getValor().toString();
                this.match(Tipo.BREAK);
            }
            else {
                this.match(Tipo.SENTENCIAS);
            }
            this.match(Tipo.PUNTOYCOMA);
            PHYTON_CASE += "\n";
            this.breakrepeticion = false;
            this.continuerepeticion = false;
            if (this.listatokens[this.numPreanalisis].tipo == Tipo.PUNTOYCOMA && this.verdafuncion) {
                this.match(Tipo.PUNTOYCOMA);
                PHYTON_CASE += "\n";
                this.verdafuncion = false;
            }
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.CONTINUE) {
            if (this.continuerepeticion) {
                PHYTON_CASE += this.preanalisis.getValor().toString();
                this.match(Tipo.CONTINUE);
            }
            else {
                this.match(Tipo.SENTENCIAS);
            }
            this.match(Tipo.PUNTOYCOMA);
            PHYTON_CASE += "\n";
            this.breakrepeticion = false;
            this.continuerepeticion = false;
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.SWITCH) {
            this.esswitch = true;
            PHYTON_CASE += "def switch";
            this.match(Tipo.SWITCH);
            this.match(Tipo.PARIZQ);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += "(case, ";
            }
            this.EXP();
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += "):\n\t switcher=\n\t";
            }
            this.BLOQUE();
            this.INSTRUCCION();
            this.constante = 0;
            this.breakrepeticion = false;
        }
        else if (this.preanalisis.tipo == Tipo.CASE) {
            if (this.constante == 0) {
                this.constante++;
            }
            else {
                PHYTON_CASE += "\t\t, \n\t";
                this.constante++;
            }
            PHYTON_CASE += "\t\t";
            this.match(Tipo.CASE);
            this.EXP();
            this.match(Tipo.DOSPUNTOS);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += ": ";
            }
            this.breakrepeticion = true;
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.RESERVADA && this.preanalisis.lexema.toLowerCase() == "default") {
            PHYTON_CASE += "\t\t" + this.preanalisis.getValor().toString();
            this.match(Tipo.RESERVADA);
            this.match(Tipo.DOSPUNTOS);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += ": ";
            }
            this.breakrepeticion = true;
            this.INSTRUCCION();
            PHYTON_CASE += ", \n\t";
        }
        else if (this.preanalisis.tipo == Tipo.FOR) {
            this.esfor = true;
            PHYTON_CASE += this.preanalisis.getValor().toString() + " ";
            this.match(Tipo.FOR);
            this.match(Tipo.PARIZQ);
            if (this.listatokens[this.numPreanalisis].tipo == Tipo.TIPO_DATO) {
                this.Tipo_variable = "";
                this.Tipo_variable = this.listatokens[this.numPreanalisis].getValor().toString();
                this.match(Tipo.TIPO_DATO);
            }
            this.match(Tipo.IDENTIFICADOR); /////en este puede ir una lista con comas
            addVariable(this.Tipo_variable, this.listatokens[this.numPreanalisis - 1].getValor().toString());
            PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString() + " in a range(1,";
            this.match(Tipo.IGUAL);
            this.EXP();
            PHYTON_CASE += "): \n\t";
            this.match(Tipo.PUNTOYCOMA);
            this.EXP();
            this.match(Tipo.PUNTOYCOMA);
            this.match(Tipo.IDENTIFICADOR);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            if (this.listatokens[this.numPreanalisis].tipo = Tipo.SUMA) {
                this.match(Tipo.SUMA);
                this.match(Tipo.SUMA);
            }
            else {
                this.match(Tipo.RESTA);
                this.match(Tipo.RESTA);
            }
            this.esfor = false;
            this.match(Tipo.PARDER);
            this.breakrepeticion = true;
            this.continuerepeticion = true;
            this.BLOQUE();
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.DO) {
            this.eswhiletrue = true;
            this.breakrepeticion = true;
            this.continuerepeticion = true;
            PHYTON_CASE += "while True: \n\t";
            this.match(Tipo.DO);
            this.BLOQUE();
            this.match(Tipo.WHILE);
            this.match(Tipo.PARIZQ);
            this.EXP();
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString() + ": \n\t\t break\n\t";
            }
            this.eswhile = "";
            this.match(Tipo.PUNTOYCOMA);
            this.eswhiletrue = false;
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.WHILE) {
            PHYTON_CASE += this.preanalisis.getValor().toString() + " ";
            this.match(Tipo.WHILE);
            this.match(Tipo.PARIZQ);
            this.EXP();
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += " :\n\t";
            }
            this.breakrepeticion = true;
            this.continuerepeticion = true;
            this.BLOQUE();
            this.INSTRUCCION();
        }
        else {
            if (this.preanalisis.tipo != Tipo.LLAVEDER) {
                this.match(Tipo.ANTIPANICO_L_CLASESINTERNAS);
                if (this.listatokens[this.numPreanalisis].tipo == Tipo.PUNTOYCOMA && this.verdafuncion) {
                    this.match(Tipo.PUNTOYCOMA);
                    PHYTON_CASE += "\n";
                    this.verdafuncion = false;
                }
            }
        }
    };
    Sintactic.prototype.L_IF = function () {
        if (this.preanalisis.tipo == Tipo.IF) {
            PHYTON_CASE += this.preanalisis.getValor().toString() + " ";
            this.match(Tipo.IF);
            this.match(Tipo.PARIZQ);
            this.EXP();
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += ":\n\t";
            }
            this.returnsifs = true;
            if (this.returnfuncion) {
                this.returnfuncion = true;
            }
            if (this.returnmetodo) {
                this.returnmetodo = true;
            }
            this.BLOQUE();
            this.L_IF();
        }
        else if (this.listatokens[this.numPreanalisis].tipo == Tipo.ELSE && this.listatokens[this.numPreanalisis + 1].tipo == Tipo.IF) {
            PHYTON_CASE += "el";
            this.match(Tipo.ELSE);
            this.match(Tipo.IF);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += "if ";
            }
            this.match(Tipo.PARIZQ);
            this.EXP();
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += ":\n\t";
            }
            if (this.returnfuncion) {
                this.returnfuncion = true;
            }
            if (this.returnmetodo) {
                this.returnmetodo = true;
            }
            this.BLOQUE();
            this.L_IF();
        }
        else if (this.preanalisis.tipo == Tipo.ELSE) {
            PHYTON_CASE += this.preanalisis.getValor().toString() + ":\n\t\r";
            this.match(Tipo.ELSE);
            this.returnsifs = false;
            if (this.returnfuncion) {
                this.returnfuncion = true;
            }
            if (this.returnmetodo) {
                this.returnmetodo = true;
            }
            this.BLOQUE();
        }
    };
    Sintactic.prototype.FUNCIONES = function () {
        if (this.preanalisis.tipo == Tipo.PARDER) {
            PHYTON_CASE += this.preanalisis.getValor().toString() + ":\n\t\r";
            this.match(Tipo.PARDER);
        }
        else {
            this.identificadores = "";
            this.L_ID();
            PHYTON_CASE += this.identificadores.toString();
            this.identificadores = "";
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString() + ":\n\t\r";
            }
        }
    };
    Sintactic.prototype.METODOS = function () {
        if (this.preanalisis.tipo == Tipo.PARDER) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.PARDER);
        }
        else {
            this.esmetodo = true;
            this.identificadores = "";
            this.L_ID();
            PHYTON_CASE += this.identificadores.toString();
            this.identificadores = "";
            this.esmetodo = false;
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
            }
        }
    };
    Sintactic.prototype.IMPRIMIENDO = function () {
        if (this.preanalisis.tipo == Tipo.IMPRIMIR) {
            if (this.preanalisis.lexema.toLowerCase() == "write") {
                PHYTON_CASE += "print";
                this.match(Tipo.IMPRIMIR);
                this.match(Tipo.PARIZQ);
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
                this.LLAMADAMETODOS();
                this.match(Tipo.PUNTOYCOMA);
                PHYTON_CASE += "\n";
                this.esconsole = false;
                this.INSTRUCCION();
            }
        }
        else if (this.preanalisis.tipo == Tipo.PUNTO) {
            this.match(Tipo.PUNTO);
            this.IMPRIMIENDO();
        }
    };
    Sintactic.prototype.L_ID = function () {
        if (this.preanalisis.tipo == Tipo.TIPO_DATO) {
            if (this.esmetodo) { }
            else if (this.booleanisfuncion) { }
            else {
                PHYTON_CASE += "var ";
            }
            this.match(Tipo.TIPO_DATO);
        }
        if (this.preanalisis.tipo == Tipo.IDENTIFICADOR && this.listatokens[this.numPreanalisis + 1].tipo == Tipo.IDENTIFICADOR) {
            if (this.booleanisfuncion) {
                this.identificadores += this.preanalisis.getValor().toString();
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            addVariable(this.Tipo_variable, this.preanalisis.getValor().toString());
            this.match(Tipo.IDENTIFICADOR);
        }
        this.ID();
        this.A();
    };
    Sintactic.prototype.A = function () {
        if (this.preanalisis.tipo == Tipo.COMA) {
            if (this.booleanisfuncion) {
                this.identificadores += ", ";
            }
            else {
                PHYTON_CASE += ", ";
            }
            this.match(Tipo.COMA);
            if (this.listatokens[this.numPreanalisis].tipo == Tipo.TIPO_DATO) {
                if (this.esmetodo) { }
                else if (this.booleanisfuncion) { }
                else {
                    PHYTON_CASE += "var ";
                }
                this.match(Tipo.TIPO_DATO);
            }
            if (this.listatokens[this.numPreanalisis].tipo == Tipo.IDENTIFICADOR && this.listatokens[this.numPreanalisis + 1].tipo == Tipo.IDENTIFICADOR) {
                if (this.booleanisfuncion) {
                    this.identificadores += this.listatokens[this.numPreanalisis].getValor().toString();
                }
                else {
                    PHYTON_CASE += this.listatokens[this.numPreanalisis].getValor().toString();
                }
                addVariable(this.Tipo_variable, this.preanalisis.getValor().toString());
                this.match(Tipo.IDENTIFICADOR);
            }
            this.ID();
            this.A();
        }
    };
    Sintactic.prototype.ID = function () {
        if (this.preanalisis.tipo == Tipo.IDENTIFICADOR) {
            if (this.booleanisfuncion) {
                this.identificadores += this.preanalisis.getValor().toString();
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            addVariable(this.Tipo_variable, this.preanalisis.getValor().toString());
            this.match(Tipo.IDENTIFICADOR);
        }
        else if (this.preanalisis.tipo == Tipo.NUMERO) {
            addVariable(this.Tipo_variable, this.preanalisis.getValor().toString());
            if (this.booleanisfuncion) {
                this.identificadores += this.preanalisis.getValor().toString();
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.NUMERO);
        }
        else {
            this.match(Tipo.L_ID);
        }
    };
    Sintactic.prototype.DECLARACION = function () {
        if (this.preanalisis.tipo == Tipo.IGUAL) {
            PHYTON_CASE += "var " + " " + this.identificadores + " ";
            this.identificadores = "";
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.IGUAL);
            this.EXP();
            this.match(Tipo.PUNTOYCOMA);
            PHYTON_CASE += "\n";
            this.INSTRUCCION();
        }
        else if (this.preanalisis.tipo == Tipo.PARIZQ) { ///////////////////////////////me va a servir para las funciones
            this.returnfuncion = true;
            PHYTON_CASE += "def" + " " + this.identificadores + " " + this.preanalisis.getValor().toString();
            this.identificadores = "";
            this.match(Tipo.PARIZQ);
            this.FUNCIONES();
            this.BLOQUE();
            this.INSTRUCCION();
        }
        else {
            this.match(Tipo.PUNTOYCOMA);
            PHYTON_CASE += "\n";
            this.INSTRUCCION();
        }
    };
    Sintactic.prototype.COMENTARIOS = function () {
        if (this.preanalisis.tipo == Tipo.COMENTARIO) {
            PHYTON_CASE += this.preanalisis.getValor().toString() + "\n";
            this.match(Tipo.COMENTARIO);
        }
        else {
            this.match(Tipo.MULTILINEA);
            if (this.verdafuncion) {
            }
            else {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
            }
        }
    };
    Sintactic.prototype.EXP = function () {
        this.FACTOR();
        this.EP();
    };
    Sintactic.prototype.EP = function () {
        if (this.preanalisis.tipo == Tipo.SUMA) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.SUMA);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.RESTA) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.RESTA);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.MULTIPLICACION) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.MULTIPLICACION);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.DIVISION) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.DIVISION);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.AND) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.AND);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.OR) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.OR);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.NOT) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.NOT);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.MAYOR) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.MAYOR);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.MENOR) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.MENOR);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.MAYORIGUAL) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.MAYORIGUAL);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.MENORIGUAL) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.MENORIGUAL);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.IGUALIGUAL) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.IGUALIGUAL);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.DESIGUAL) {
            if (this.esfor) { }
            else if (this.esconsole) {
                PHYTON_CASE += ", ";
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.DESIGUAL);
            this.FACTOR();
            this.EP();
        }
        else if (this.preanalisis.tipo == Tipo.COMA) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.COMA);
            this.FACTOR();
            this.EP();
        }
    };
    Sintactic.prototype.LLAMADAMETODOS = function () {
        if (this.preanalisis.tipo == Tipo.PARDER) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.PARDER);
        }
        else {
            this.EXP();
            this.match(Tipo.PARDER);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
            }
        }
    };
    Sintactic.prototype.FACTOR = function () {
        if (this.preanalisis.tipo == Tipo.NUMERO) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.NUMERO);
        }
        else if (this.preanalisis.tipo == Tipo.CADENA) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.CADENA);
        }
        else if (this.preanalisis.tipo == Tipo.CARACTER) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            if (this.imprimirhtml && this.esconsole) {
                this.imprimirhtml = false;
                if (this.preanalisis.getValor().toString().length > 1) {
                    this.HTML_LIST.push(this.preanalisis.getValor().toString());
                }
            }
            this.match(Tipo.CARACTER);
        }
        else if (this.preanalisis.tipo == Tipo.IDENTIFICADOR) {
            if (this.esconsole) {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            else if (this.eswhiletrue) {
                this.eswhile += this.preanalisis.getValor().toString() + "= " +
                    this.preanalisis.getValor().toString()
                    + "+1\n\t   if(" + this.preanalisis.getValor().toString();
                PHYTON_CASE += this.eswhile.toString();
            }
            else {
                PHYTON_CASE += this.preanalisis.getValor().toString();
            }
            this.match(Tipo.IDENTIFICADOR); // este servira para hacer operaciones de metodos;
            if (this.listatokens[this.numPreanalisis].tipo == Tipo.PARIZQ) {
                PHYTON_CASE += this.listatokens[this.numPreanalisis].getValor().toString();
                this.match(Tipo.PARIZQ);
                this.LLAMADAMETODOS();
            }
        }
        else if (this.preanalisis.tipo == Tipo.COMILLA) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.COMILLA);
            this.FACTOR();
            this.match(Tipo.COMILLA);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
            }
        }
        else if (this.preanalisis.tipo == Tipo.COMILLASIMPLE) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.COMILLASIMPLE);
            this.FACTOR();
            this.match(Tipo.COMILLASIMPLE);
            if (this.verdafuncion) { }
            else {
                PHYTON_CASE += this.listatokens[this.numPreanalisis - 1].getValor().toString();
            }
        }
        else if (this.preanalisis.tipo == Tipo.VERDADERO) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.VERDADERO);
        }
        else if (this.preanalisis.tipo == Tipo.FALSO) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.FALSO);
        }
        else if (this.preanalisis.tipo == Tipo.PARIZQ) {
            PHYTON_CASE += this.preanalisis.getValor().toString();
            this.match(Tipo.PARIZQ);
            this.LLAMADAMETODOS();
        }
        else {
            this.match(Tipo.EXPRESION);
        }
    };
    Sintactic.prototype.match = function (p) {
        if (p != this.preanalisis.tipo) {
            errores.push(new Token(Tipo.SINTACTICO, this.preanalisis.lexema, "Se esperaba " + this.getTipoParaError(p), this.preanalisis.fila, this.preanalisis.columna));
            console.log("Se esperaba " + this.getTipoParaError(p));
            this.antipanico(this.preanalisis.tipo);
        }
        else if (this.preanalisis.tipo != Tipo.ULTIMO) {
            this.verdafuncion = false;
            this.numPreanalisis += 1;
            this.preanalisis = this.listatokens[this.numPreanalisis];
        }
    };
    Sintactic.prototype.antipanico = function (p) {
        /// este lo voy a recorrer hasta encontrar un ; o { 
        if (p == Tipo.PUNTOYCOMA) {
            //que se valla a instruccion\
            this.verdafuncion = true;
            return;
        }
        else if (p == Tipo.LLAVEIZQ) {
            return;
        }
        else if (p == Tipo.LLAVEDER) {
            return;
        }
        else {
            if (this.preanalisis.tipo != Tipo.ULTIMO) {
                this.numPreanalisis += 1;
                this.preanalisis = this.listatokens[this.numPreanalisis];
                this.antipanico(this.preanalisis.tipo);
            }
        }
    };
    Sintactic.prototype.getTipoParaError = function (p) {
        switch (p) {
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
            case Tipo.ANTIPANICO_L_CLASESINTERNAS:
                return "Lista de instrucciones";
            case Tipo.LEXICO:
                return " Error Lexico ";
            case Tipo.SINTACTICO:
                return " Error Sintactico ";
            case Tipo.SENTENCIAS:
                return "Sentencia correcta";
            default:
                return "desconocido";
        }
    };
    return Sintactic;
}());
function imprimir_errores() {
    var htmlsalida = "";
    var numero = 0;
    errores.forEach(function (value) {
        htmlsalida += "<tr bgcolor=#E1B3F6>\n"
            + "	<p align=\"center\">\n"
            + "<DIV ALIGN=center>\n"
            + "    <td><center>" + numero++ + "</center></td>\n"
            + "    <td><center>" + value.getTipoEnString().toString() + "</center></td>\n"
            + "    <td><center>" + value.getValor() + "</center></td>\n"
            + "    <td><center>" + value.getDescripcion() + "</center></td>\n"
            + "    <td><center>" + value.getFila() + "</center></td>\n"
            + "    <td><center>" + value.getColumna() + "</center></td>\n"
            + "</DIV>\n"
            + "	</p>\n"
            + "  </tr>\n"
            + "<tr>";
    });
    return htmlsalida;
}
function imprimir_variables() {
    LIST_VARIABLE = "";
    var htmlsalida = "";
    var numero = 0;
    this.VariablesList.forEach(function (value) {
        htmlsalida += "<tr bgcolor=#AAFFDC>\n"
            + "	<p align=\"center\">\n"
            + "<DIV ALIGN=center>\n"
            + "    <td><center>" + numero++ + "</center></td>\n"
            + "    <td><center>" + value.getTipovariable() + "</center></td>\n"
            + "    <td><center>" + value.getValor() + "</center></td>\n"
            + "</DIV>\n"
            + "	</p>\n"
            + "  </tr>\n"
            + "<tr>";
    });
    return htmlsalida.toString();
}
function PRINTHTML(l) {
    var htmlsalida = "";
    var numero = 0;
    l.forEach(function (value) {
        htmlsalida += value + "\n";
    });
    return htmlsalida;
}
function PRINTHTML_STRING() {
    return this.IMPRIMIR_SE;
}
function PHYTON_PRINT() {
    return this.PHYTON_CASE;
}
function addVariable(tipo, auxLex) {
    this.VariablesList.push(new Variable(tipo, auxLex));
}
var Variable = /** @class */ (function () {
    function Variable(tipotoken, lexema) {
        this.lexemasvar = lexema;
        this.tiposvariable = tipotoken;
    }
    Variable.prototype.getTipovariable = function () {
        return this.tiposvariable;
    };
    Variable.prototype.setTipovariable = function (tipotoken) {
        this.tiposvariable = tipotoken;
    };
    Variable.prototype.getValor = function () {
        return this.lexemasvar;
    };
    Variable.prototype.setValor = function (valor) {
        this.lexemasvar = valor;
    };
    return Variable;
}());
