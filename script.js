"use strict";

const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id *= tecla]");
const operadores = document.querySelectorAll("[id *= opera]");

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent.replace(",", "."));
    novoNumero = true;
    const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    atualizaDisplay(resultado);
  }
};

const atualizaDisplay = (text) => {
  if (novoNumero) {
    display.textContent = text.toLocaleString("BR");
    novoNumero = false;
  } else {
    display.textContent += text.toLocaleString("BR");
  }
};

const inserirNumero = (event) => atualizaDisplay(event.target.textContent);
numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));

const selecionarOperador = (event) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(",", "."));
  }
};
operadores.forEach((operador) =>
  operador.addEventListener("click", selecionarOperador)
);

const ativarIgual = () => {
  calcular();
  operador = undefined;
};
document.getElementById("resultado").addEventListener("click", ativarIgual);

document.getElementById("cleanAll").addEventListener("click", () => {
  display.textContent = "";
});

const limparCalc = () => {
  display.textContent = "";
  operador = undefined;
  numeroAnterior = undefined;
  novoNumero = true;
};

document.getElementById("clean").addEventListener("click", limparCalc);

const removerCarac = () => {
  display.textContent = display.textContent.slice(0, -1);
};
document.getElementById("backSpace").addEventListener("click", removerCarac);

const mudaSinal = () => {
  novoNumero = true;
  atualizaDisplay(display.textContent * -1);
};
document.getElementById("sinal").addEventListener("click", mudaSinal);

const existeVirgula = () => display.textContent.indexOf(",") != -1;
const existValor = () => display.textContent.length > 0;
const decimal = () => {
  if (!existeVirgula()) {
    if (existValor()) {
      atualizaDisplay(",");
    } else {
      atualizaDisplay("0,");
    }
  }
};
document.getElementById("virgula").addEventListener("click", decimal);

const mapaTeclado = {
  0: "tecla0",
  1: "tecla1",
  2: "tecla2",
  3: "tecla3",
  4: "tecla4",
  5: "tecla5",
  6: "tecla6",
  7: "tecla7",
  8: "tecla8",
  9: "tecla9",
  "+": "operaSoma",
  "-": "operaSubtracao",
  "*": "operaMultiplicacao",
  "/": "operaDivisao",
  "=": "resultado",
  "Enter": "resultado",
  "Backspace": "backSpace",
  "c": "clean",
  ",": "virgula",
  "Escape": "cleanAll",
};

const mapearTeclado = (event) => {
  const tecla = event.key;
  const teclaValida = () => Object.keys(mapaTeclado).indexOf(tecla != -1);
  if (teclaValida()) document.getElementById(mapaTeclado[tecla]).click();
};

document.addEventListener("keypress", mapearTeclado);
