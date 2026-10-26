
const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");

let currentValue = "0";
let previousValue = null;
let operator = null;
let waitingForOperand = false;

function updateDisplay() {
    display.value = currentValue;
}

function inputNumber(number) {
    if (waitingForOperand) {
        currentValue = number;
        waitingForOperand = false;
    } else if (currentValue === "0") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        currentValue = "0.";
        waitingForOperand = false;
    } else if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

function calculate(a, b, operation) {
    return calcular(a, b, operation);
}

function formatResult(value) {
    if (!Number.isFinite(value)) {
        throw new Error("Resultado inválido.");
    }

    return String(Number(value.toPrecision(12)));
}

function chooseOperator(nextOperator) {
    const inputValue = Number(currentValue);

    if (operator && !waitingForOperand) {
        try {
            currentValue = formatResult(
                calculate(previousValue, inputValue, operator)
            );
        } catch (error) {
            clearCalculator();
            currentValue = error.message;
            updateDisplay();
            return;
        }

        updateDisplay();
    } else if (!operator) {
        previousValue = inputValue;
    }

    operator = nextOperator;
    previousValue = Number(currentValue);
    waitingForOperand = true;
}

function performCalculation() {
    if (operator === null || waitingForOperand) {
        return;
    }

    try {
        currentValue = formatResult(
            calculate(previousValue, Number(currentValue), operator)
        );
    } catch (error) {
        currentValue = error.message;
    }

    previousValue = null;
    operator = null;
    waitingForOperand = true;
    updateDisplay();
}

function clearCalculator() {
    currentValue = "0";
    previousValue = null;
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

function handleAction(action) {
    switch (action) {
        case "clear":
            clearCalculator();
            break;
        case "decimal":
            inputDecimal();
            break;
        case "equals":
            performCalculation();
            break;
        case "sign":
            if (currentValue !== "0" &&
                !currentValue.startsWith("Não é possível") &&
                !currentValue.startsWith("Resultado inválido")) {
                currentValue = String(-Number(currentValue));
                updateDisplay();
            }
            break;
        case "percent":
            currentValue = formatResult(Number(currentValue) / 100);
            updateDisplay();
            break;
        case "backspace":
            if (!waitingForOperand) {
                currentValue = currentValue.length > 1
                    ? currentValue.slice(0, -1)
                    : "0";

                if (currentValue === "-") {
                    currentValue = "0";
                }

                updateDisplay();
            }
            break;
    }
}

buttons.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.number !== undefined) {
        inputNumber(button.dataset.number);
    } else if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
    } else if (button.dataset.action) {
        handleAction(button.dataset.action);
    }
});

updateDisplay();
