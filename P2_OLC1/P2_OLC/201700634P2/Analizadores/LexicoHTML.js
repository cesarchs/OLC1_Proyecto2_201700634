var estados;
var etiqueta;
var cadena = "";
var esCierre = false;
var counter = 0;
function AnalizarTexto(entradashtml) {
    estados = 0;
    etiqueta = "";
    var c;
    var d;
    for (var i = 0; i < entradashtml.length; i++) {
        c = (String)(entradashtml.charAt(i));
        d = String.fromCharCode(entradashtml.charCodeAt(i));
        switch (estados) {
            case 0:
                if (c == "<") {
                    cadena += "\n";
                    estados = 5;
                }
                else {
                    cadena += c;
                    estados = 0;
                }
                break;
            case 2: //reconoce cadena de cierre
                if (isLetter(d) || isDigit(d)) {
                    estados = 2;
                }
                else if (c == ">") {
                    estados = 0;
                }
                break;
            case 4: //RECONOCE CADENAS
                if (c == "\"") {
                    cadena += "\"";
                    estados = 5;
                }
                else {
                    cadena += c;
                    estados = 4;
                }
                break;
            case 5: //RECONOCIMIENTO DE ETIQUETAS
                if (isLetter(d) || isDigit(d)) {
                    etiqueta += c.toString();
                    estados = 5;
                }
                else if (c == " ") { //significa que hay style
                    estados = 6;
                    cadena += " ";
                }
                else if (c == ">") {
                    if (esCierre) {
                        esCierre = false;
                    }
                    else {
                        switch (etiqueta.toLowerCase().trim()) {
                            case "html":
                                cadena += "\"HTML\":{\n";
                                break;
                            case "head":
                                cadena += "\"HEAD\":{\n";
                                break;
                            case "body":
                                cadena += "\"BODY\":{\n";
                                break;
                            case "title":
                                cadena += "\"TITLE\":{\n \"TEXTO\":";
                                break;
                            case "div":
                                cadena += "\"DIV\":{\n";
                                break;
                            case "br":
                                cadena += "\"br\":{}\n";
                                break;
                            case "p":
                                cadena += "\"P\":{\n \"TEXTO\":";
                                break;
                            case "h1":
                                cadena += "\"H1\":{\n \"TEXTO\":";
                                break;
                            case "h2":
                                cadena += "\"H2\":{\n \"TEXTO\":";
                                break;
                            case "h3":
                                cadena += "\"H3\":{\n \"TEXTO\":";
                                break;
                            case "h4":
                                cadena += "\"H4\":{\n \"TEXTO\":";
                                break;
                            case "button":
                                cadena += "\"BUTTON\":{\n \"TEXTO\":";
                                break;
                            case "label":
                                cadena += "\"LABEL\":{\n \"TEXTO\":";
                                break;
                            case "input":
                                cadena += "\"INPUT\":{\n";
                                break;
                            default:
                        }
                    }
                    if (c == "<") {
                        cadena += "\n";
                        etiqueta = "";
                        estados = 5;
                    }
                    else {
                        etiqueta = "";
                        estados = 0;
                    }
                }
                else if (c == "/") {
                    estados = 5;
                    cadena += "}";
                    esCierre = true;
                }
                break;
            case 6: //STYLE 
                if ((etiqueta.toLowerCase().toString() == "body" || etiqueta.toLowerCase().toString() == "div")) {
                    cadena += "\"" + etiqueta.toUpperCase() + "\":{\n";
                    etiqueta = c;
                    estados = 6;
                }
                else if (etiqueta.toLowerCase().toString() == "style") {
                    cadena += "\"STYLE\":";
                    etiqueta = "";
                    estados = 6;
                }
                else if (isLetter(d) || isDigit(d)) {
                    etiqueta += c.toString();
                    estados = 6;
                }
                else if (c == "\"") {
                    cadena += "\"";
                    estados = 4;
                }
                break;
        }
    }
    return cadena;
}
