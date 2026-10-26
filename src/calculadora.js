
function calcular(a, b, operador) {
    switch (operador) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                throw new Error("Não é possível dividir por zero.");
            }
            return a / b;
        default:
            throw new Error("Operador inválido.");
    }
}

if (typeof module !== "undefined") {
    module.exports = { calcular };
}
