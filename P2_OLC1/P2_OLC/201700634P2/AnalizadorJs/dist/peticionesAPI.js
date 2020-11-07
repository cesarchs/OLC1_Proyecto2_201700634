"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Grammar = require("../Grammar/grammar");
const Template_Grafo_1 = require("./AST/Template_Grafo");
const Listas_1 = require("./TOKENS/Listas");
exports.analyzer = (request, response) => {
    /**
     * @var textoDocumento 
     * @var t_g 
     * @instance 
     * @instance 
     * @var resultado
     * @var listaToken 
     * @var listaErrores
     * @var traduccionJS
     * @var dot
     * @var r
     */
    let textoDocumento = request.body.code;
    var t_g = new Template_Grafo_1.Template_Grafo(0);
    let r = [];
    Listas_1.Listas.setListaTokens([]);
    Listas_1.Listas.setListaErrores([]);
    let resultado = Grammar.parse(textoDocumento);
    let listaToken = Listas_1.Listas.getListaTokens();
    let listaErrores = Listas_1.Listas.getListaErrores();
    if (listaErrores.length > 0) {
        r = [
            {
            'listaErrores': listaErrores,
            'listaToken': listaToken
            }
        ];
    }
    else {
        let traduccionJS = resultado.traductorJS();
        let dot = "digraph G{\n";
        dot += "node[shape = box, fontsize = 8.0]\n\n";
        dot += "nodo0[label=\"INICIO\"]\n";
        dot += resultado.recolectarDot(t_g);
        dot += "\n}";
        r = [
            {
            'listaErrores': listaErrores,
            'listaToken': listaToken,
            'traduccion': traduccionJS,
            'dot': dot
            }
        ];
    }
    response.send(r);
};
