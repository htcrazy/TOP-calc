document.getElementById('calcContainer').addEventListener('keydown', function(event){
    if (event.code == 'NumLock') {
        addNeg();
    } else if (event.code == 'NumpadDivide') {
        addOperation('divide');
    } else if (event.code == 'NumpadMultiply') {
        addOperation('multiply');
    } else if (event.code == 'NumpadSubtract') {
        addOperation('subtract');
    } else if (event.code == 'NumpadAdd') {
        addOperation('add');
    } else if (event.code == 'Backspace') {
        backspace();
    } else if (event.code == 'Escape') {
        clearClick();
    } else if (event.code == 'NumpadLock' || event.code == 'Period') {
        addDecimal();
    } else if (event.code == 'NumpadEnter' || event.code == 'Enter') {
        operate();
    } else if (event.code == 'Numpad9' || event.code == 'Digit9') {
        addNum(9);
    } else if (event.code == 'Numpad8' || event.code == 'Digit8') {
        addNum(8);
    } else if (event.code == 'Numpad7' || event.code == 'Digit7') {
        addNum(7);
    } else if (event.code == 'Numpad6' || event.code == 'Digit6') {
        addNum(6);
    } else if (event.code == 'Numpad5' || event.code == 'Digit5') {
        addNum(5);
    } else if (event.code == 'Numpad4' || event.code == 'Digit4') {
        addNum(4);
    } else if (event.code == 'Numpad3' || event.code == 'Digit3') {
        addNum(3);
    } else if (event.code == 'Numpad2' || event.code == 'Digit2') {
        addNum(2);
    } else if (event.code == 'Numpad1' || event.code == 'Digit1') {
        addNum(1);
    } else if (event.code == 'Numpad0' || event.code == 'Digit') {
        addNum(0);
    }
});

const divByzero = "No dividing by 0!"

function clearClick() {
    const passive = document.getElementById('passiveScreen');
    while (passive.firstChild) {
        passive.removeChild(passive.lastChild);
    }
    document.getElementById('activeScreen').textContent = "";
}

function backspace() {
    const expression = expressionSplitter();
    if (expression[expression.length - 1].length == 0) {
        expression.pop();
        expression.pop();
    } else if (expression[expression.length - 1].length == 1) {
        expression.pop();
    } else {
        expression[expression.length - 1] = expression[expression.length - 1].slice(0, -1);
    }

    document.getElementById('activeScreen').textContent = expression.join(' ');
}

function addNum(number) {
    document.getElementById('activeScreen').textContent += number;
}

function addDecimal() {
    const expression = expressionSplitter();
    if (!expression[expression.length - 1].includes('.')) { 
        document.getElementById('activeScreen').textContent += ".";
    }
}

function addOperation(thing) {
    const symbol = operationSymbol(thing);
    const expression = expressionSplitter();
    operate();

    if (expression.length == 1 && expression != '') {
        document.getElementById('activeScreen').textContent += symbol;
    }

    if ((expression.length == 3 && expression[2] != '') || (expression == '' && 
    document.getElementById('passiveScreen').lastElementChild && 
    document.getElementById('passiveScreen').lastElementChild.textContent != divByzero)) {
        document.getElementById('activeScreen').textContent = document.getElementById('passiveScreen').lastElementChild.textContent + symbol;
    }
}

function operationSymbol(thing) {
    if (thing == 'add') {
        return ' \u002B '
    } else if (thing == 'subtract') {
        return ' \u2212 '
    } else if (thing == 'multiply') {
        return ' \u00D7 '
    } else if (thing == 'divide') {
        return ' \u00F7 '
    }
}   

function addNeg() {
    const expression = expressionSplitter();
    if (expression[expression.length - 1] == '') {
        document.getElementById('activeScreen').textContent += '\-';
    }
}

function operate() {
    const expression = expressionSplitter();

    if (expression.length == 3 && expression[2] != '') {
        const old = document.getElementById('passiveScreen');
    
        const operation = document.createElement('div');
        operation.textContent = expression.join(' ');
        old.appendChild(operation);
    
        let answer = document.createElement('div');
        answer.classList.add('answer');
    
        if (expression[1] == '\u002B') {
            answer.textContent = Number(expression[0]) + Number(expression[2])
        }
        else if (expression[1] == '\u2212') {
            answer.textContent = Number(expression[0]) - Number(expression[2])
        }
        else if (expression[1] == '\u00D7') {
            answer.textContent = Number(expression[0]) * Number(expression[2])
        }
        else if (expression[1] == '\u00F7') {
            if (expression[2] == '0') {
                answer.textContent = divByzero;
            } else {
                answer.textContent = Number(expression[0]) / Number(expression[2])
            }
        }
    
        old.appendChild(answer);
        clearActive();
    }
}

function clearActive() {
    document.getElementById('activeScreen').textContent = "";
}

function expressionSplitter() {
    return document.getElementById('activeScreen').textContent.split(' ');
}