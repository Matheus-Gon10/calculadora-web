
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { calcular } = require("../src/calculadora.js");

test("deve somar dois números", () => {
    assert.equal(calcular(5, 3, "+"), 8);
});

test("deve subtrair dois números", () => {
    assert.equal(calcular(9, 4, "-"), 5);
});

test("deve multiplicar dois números", () => {
    assert.equal(calcular(6, 7, "*"), 42);
});

test("deve dividir dois números", () => {
    assert.equal(calcular(8, 2, "/"), 4);
});

test("deve impedir divisão por zero", () => {
    assert.throws(
        () => calcular(5, 0, "/"),
        /Não é possível dividir por zero/
    );
});

test("deve rejeitar operadores inválidos", () => {
    assert.throws(
        () => calcular(5, 3, "%"),
        /Operador inválido/
    );
});
