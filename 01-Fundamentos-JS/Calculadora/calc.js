const upperScreen = document.getElementsByTagName('label')[0];
const screen = document.getElementById('calculator-screen');
const buttons = document.querySelectorAll('button');

const calc = {
    screenValue: 0,
    upperScreen: '\xA0',
    firtValue: null,
    secondValue: null,
    operator: ''
}

const calculator = e => async () => {
    if (!isNaN(e)) {
        //alert(calc.operator)
        if (calc.operator == '=') {
            screen.value = '';
            calc.operator = '';
        }
        if (screen.value === '0.') {
            calc.screenValue += e;
        } else if (screen.value == 0) {
            calc.screenValue = e;
        } else if (calc.firtValue !== 0) {
            calc.screenValue += e;
        }
        screen.value = calc.screenValue;
    } else if (e == ',' & !screen.value.includes('.')) {
        screen.value = calc.screenValue = calc.screenValue + '.';
    } else if (e == 'CE') {
        screen.value = calc.screenValue = '';
    } else if (e == 'C') {
        screen.value = calc.screenValue = calc.upperScreen = calc.firtValue = calc.secondValue = calc.operator = '';
        upperScreen.innerText = '\u00a0';
    } else if (e == 'del') {
        screen.value = screen.value.slice(0, -1);
        calc.screenValue = screen.value;
    } else if (e == '+/-') {
        calc.screenValue = screen.value = calc.screenValue * (-1);
    } else if (isNaN(e) & e !== '=' & e !== ',') {
        calc.firtValue = parseFloat(calc.screenValue);
        calc.screenValue = screen.value = '0';
        calc.operator = e;
        switch (calc.operator) {
            case 'radic': {
                calc.screenValue = Math.sqrt(calc.firtValue);
                screen.value = new Intl.NumberFormat().format(calc.screenValue);
                calc.upperScreen = upperScreen.innerText = '√' + calc.firtValue + '=';
                calc.operator = '=';
                break
            }
            case 'square': {
                calc.screenValue = Math.pow(calc.firtValue, 2);
                screen.value = new Intl.NumberFormat().format(calc.screenValue);
                calc.upperScreen = upperScreen.innerText = calc.firtValue + '² =';
                calc.operator = '=';
                break
            }
            case 'invested': {
                screen.value = calc.screenValue = 1 / calc.firtValue;
                calc.upperScreen = upperScreen.innerText = '1/' + calc.firtValue + '=';
                calc.operator = '=';
                break
            }
            case '%': {
                screen.value = calc.screenValue = calc.firtValue / 100;
                calc.upperScreen = upperScreen.innerText = +calc.firtValue + '%=';
                calc.operator = '=';
                break
            }
        }
    } else {
        switch (calc.operator) {
            case '+': {
                calc.secondValue = parseFloat(calc.screenValue);
                screen.value = calc.screenValue = calc.firtValue + calc.secondValue;
                calc.upperScreen = upperScreen.innerText = calc.firtValue + ' + ' + calc.secondValue + '=';
                calc.operator = '=';
                break
            }
            case '-': {
                calc.secondValue = parseFloat(calc.screenValue);
                screen.value = calc.screenValue = calc.firtValue - calc.secondValue;
                calc.upperScreen = upperScreen.innerText = calc.firtValue + ' - ' + calc.secondValue + '=';
                calc.operator = '=';
                break
            }
            case '*': {
                calc.secondValue = parseFloat(calc.screenValue);
                screen.value = calc.screenValue = calc.firtValue * calc.secondValue;
                calc.upperScreen = upperScreen.innerText = calc.firtValue + ' * ' + calc.secondValue + '=';
                calc.operator = '=';
                break
            }
            case '/': {
                calc.secondValue = parseFloat(calc.screenValue);
                screen.value = calc.screenValue = calc.firtValue / calc.secondValue;
                calc.upperScreen = upperScreen.innerText = calc.firtValue + ' / ' + calc.secondValue + '=';
                calc.operator = '=';
                break
            }
        }
    }
}
buttons.forEach(button => {
    button.addEventListener("click", calculator(button.value));
});