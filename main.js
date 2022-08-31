const brain = require('brain.js')
const tweets = require("./tweets.js");
const dadosParaTreinarRedeNeural = tweets.dados();

let redeTreinada;

function encodar(arg) {
    return arg.split(' ').map(x => (x.charCodeAt(0) / 256));
}

function processarDadosParaTreinamento(dados) {
    return dados.map(d => {

        return {
        input: encodar(d.input),
        output: d.output
        }
    })
}

function train(dados) {
    let hiddenLayers = {hiddenLayers: [2,0]};
    let net = new brain.NeuralNetwork(hiddenLayers);

    console.log( "REDE NEURAL ESTÁ APRENDENDO ", net.train(
    processarDadosParaTreinamento(dados) , {log: false}) );
    redeTreinada = net.toFunction();
};

function executar(input) {
let = resultados = redeTreinada(encodar(input));

    console.log("RESULTADOS ->", resultados)
    console.log("-----------------------")


    let output;
    
    let porcentagemDeCerteza;

    if (resultados.lula > resultados.bolsonaro) {
        output = 'Lula'
        porcentagemDeCerteza = Math.floor(resultados.lula * 100)
    
    }else{
        output = 'Bolsonaro'
        porcentagemDeCerteza = Math.floor(resultados.bolsonaro * 100)
    }
    
    return "Olá, me chamo Tiffany e eu tenho " + porcentagemDeCerteza + "% de certeza que a porcaria desse Tweet foi escrito pelo " + output +  ", estou certa?";
}

// Treinando Rede Neural
train(dadosParaTreinarRedeNeural);

//Tweets
let tweetLula = "Conto com vocês para vencermos as eleições e construirmos um país fraterno de combate ao ódio e às fake news. #BrasilDaEsperança 🎥: @ricardostuckert https://t.co/IJ5NDYYHho"

let tweetBolsonaro = "- Obra do PT - Unila - Universidade da Integração Latino-Americana - Foz do Iguaçu/PR"

// Exec
console.log("-----------------------")
console.log( executar(tweetLula));
