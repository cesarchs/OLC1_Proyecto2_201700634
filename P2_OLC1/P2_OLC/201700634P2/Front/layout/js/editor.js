
const consoleLogList1 = document.querySelector(".editor__console-logs1");
const executeCodeBtn = document.querySelector('.editor__run');
const inputFile = document.querySelector('input[type="file"]');
const downloadFile = document.querySelector('input[name="downloadFile"]');
const downloadJavascript = document.querySelector('input[name="downloadJavascript"]');
const tableError = document.querySelector('.tableError');
const tableToken = document.querySelector('.tableToken');
let codeEditor = ace.edit("editorCode");
var nameCurrentFile = "";
let traductionJS = "";
let dot = "";
let listaTJS = [];
let listaEJS = [];


let editorLib = {
    clearConsoleScreen() {
    while (consoleLogList1.firstChild) {
        consoleLogList1.removeChild(consoleLogList1.firstChild);
    }
    let i = tableError.rows.length;
    while (i > 1) {
        i--;
        tableError.deleteRow(i);
    }
    i = tableToken.rows.length;
    while (i > 1) {
        i--;
        tableToken.deleteRow(i);
    }
    d3.select("#graph").graphviz().renderDot('digraph G{}');
    },
    printToConsole() {
        let conteo = 1;
        listaEJS.forEach(log => {
         let rowError = conteo.toString() + " -- " + log.caracterError + " -- T:" + log.tipoTokenErrorEnString + " -- D:" + log.descripcionError;
            rowError += " -- f:" + log.filaError + " -- c:" + log.columnaError;
         const newLogItem = document.createElement('li');
         const newLogText = document.createElement('pre');
         newLogText.textContent = rowError;
         newLogItem.appendChild(newLogText);
         consoleLogList1.appendChild(newLogItem);
         conteo++;
        });
    },
    runResponse(data) {
        listaTJS = data[0].listaToken;
        listaEJS = data[0].listaErrores;
        traductionJS = "";
        dot = "";
        let conteo = 1;
        if (tableError) {
            listaEJS.forEach(tokenE => {
            let newRow = tableError.insertRow(tableError.rows.length);
            let no = newRow.insertCell(0);
            let lexema = newRow.insertCell(1);
            let tipo = newRow.insertCell(2);
            let descripcion = newRow.insertCell(3);
            let linea = newRow.insertCell(4);
            let columna = newRow.insertCell(5);
            no.innerHTML = conteo.toString();
            lexema.innerHTML = tokenE.caracterError;
            tipo.innerHTML = tokenE.tipoTokenErrorEnString;
            descripcion.innerHTML = tokenE.descripcionError;
            linea.innerHTML = tokenE.filaError.toString();
            columna.innerHTML = tokenE.columnaError.toString();
            conteo++;
            });
        }

        conteo = 1;
        if (tableToken) {
            listaTJS.forEach(token => {
            let newRow = tableToken.insertRow(tableToken.rows.length);
            let no = newRow.insertCell(0);
            let lexema = newRow.insertCell(1);
            let tipo = newRow.insertCell(2);
            let linea = newRow.insertCell(3);
            let columna = newRow.insertCell(4);
            no.innerHTML = conteo.toString();
            lexema.innerHTML = token.lexema;
            tipo.innerHTML = token.tipoTokenEnString;
            linea.innerHTML = token.filaToken.toString();
            columna.innerHTML = token.columnaToken.toString();
            conteo++;
            });
        }
        if (listaEJS.length > 0) {
            alert("no se tradujo, el archivo tiene errores");
            editorLib.printToConsole();
            d3.select("#graph").graphviz().renderDot('digraph G{}');
        } else {
            traductionJS = data[0].traduccion;
            dot = data[0].dot;
            d3.select("#graph").graphviz().renderDot(dot);
            alert("se tradujo correctamente");
        }
    },
    init() {
        codeEditor.setTheme("ace/theme/dracula");
        codeEditor.session.setMode("ace/mode/java");
        codeEditor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        });
    }
}
executeCodeBtn.addEventListener('click', () => {
    editorLib.clearConsoleScreen();
    const userCode = codeEditor.getValue();
    if (userCode != "") {
        let nodeUrl = "http://localhost:5000/analizar";
        $.post(nodeUrl,
            {
                code: userCode
            },
            function (data, status) {
             if (status.toString() == "success") {
                 editorLib.runResponse(data);
             } else {
                 alert("Error estado de conexion: " + status);
             }
            })
    } else { alert("ingrese contenido");}

});
inputFile.addEventListener('change', function (e) {
    const reader = new FileReader();
    let files = e.target.files, file = files[0];
    if (!file) {
        return;
    }
    nameCurrentFile = file.name;
    reader.onload = function () {
    let fileContent = reader.result;
    codeEditor.setValue(fileContent);
    editorLib.clearConsoleScreen();
    }
    reader.readAsText(inputFile.files[0])
}, false)
downloadFile.addEventListener('click', () => {
    let text = codeEditor.getValue();
    if (text != "") {
        if (nameCurrentFile == "") {
            nameCurrentFile = "Download.java"
        }
    var blob = new Blob([text], { type: 'text/plain' });
    var link = document.createElement("a");
    link.download = nameCurrentFile;
    link.innerHTML = "Download File";
    link.href = window.URL.createObjectURL(blob);
    link.onclick = destroyClickedElement;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    }
    else {
        alert("no hay contenido");
    }
})
downloadJavascript.addEventListener('click', () => {
    let text = traductionJS;
    if (text != "") {
        if (nameCurrentFile == "") {
            nameCurrentFile = "Download.js"
        }
        else {
            nameCurrentFile = nameCurrentFile.replace(".java", "");
            nameCurrentFile = nameCurrentFile + ".js";
        }
        var blob = new Blob([text], { type: 'text/plain' });
        var link = document.createElement("a");
        link.download = nameCurrentFile;
        link.innerHTML = "Download File";
        link.href = window.URL.createObjectURL(blob);
        link.onclick = destroyClickedElement;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
    }
    else {
        alert("aun no se ha traducido ningun archivo!");
    }
})
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}
editorLib.init();