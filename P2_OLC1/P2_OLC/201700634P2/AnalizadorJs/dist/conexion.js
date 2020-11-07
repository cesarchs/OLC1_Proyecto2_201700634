"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const peticionesAPI = require("./peticionesAPI");
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.set('port', 5000);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(`Compiladores 1 - Sección B, http://localhost:${app.get('port')}`);
});
app.get('/abi', (request, response) => {
    let j = [
        {
        'id': 1,
        'nombre': "Abi"
        }
    ];
    response.send(j);
});
app.post('/analizar', peticionesAPI.analyzer);
app.listen(app.get('port'), () => {
    console.log("BackendJs inicializado en", app.get('port'));
});
