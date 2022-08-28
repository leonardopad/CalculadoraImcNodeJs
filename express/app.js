const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile('form.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
})

app.post('/imc', (req, res) => {
    const nome = req.body.nome;
    const peso = req.body.peso;
    const altura = req.body.altura;
    const result = peso / (altura * altura);

    let classificacao = '';

    if(result < 18.5){
        classificacao = 'Peso abaixo do ideal';
    }else if(result < 25){
        classificacao = 'Peso ideal';
    }else if(result < 30){
        classificacao = 'levemente acima do ideal';
    }else if(result < 35){
        classificacao = 'obesidade grau 1';
    }else if(result < 40){
        classificacao = 'Obesidade morbida';
    }
    res.send(`Olá ${nome} seu IMC é ${result.toFixed(2)} e você esta ${classificacao}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})