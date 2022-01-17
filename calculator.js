class Calculator {
    constructor(_prev, _curr) {
        this.prevElement= _prev; // Mini Display Element
        this.currElement = _curr;// Main Display Element
        this.clear(); //clear display and assign initial values
        localStorage.setItem('time', 0);
        localStorage.setItem('name','');
    }

    
    clear() {
        if(localStorage.getItem('time')) {
            //Display only first time when user use it
            this.currElement.innerText = 'Super Calculator';
            localStorage.setItem('time', 1);
        }
      
        this.prevNumber = ''; // Previous Operand as a Srting
        this.currNumber = ''; // Current Operand as a String
        this.operation  = undefined; // Operation as a String
        
    }

    deleteNumber() {
        if(this.currNumber === '') {
            // It will delete operation than put prev number as a current number 
            this.currNumber = this.prevNumber;
            this.prevNumber = '';
            this.operation  = undefined;
        }
        else {
            //It will delete last digit of a number
            this.currNumber = this.currNumber.toString().slice(0,-1);
        }
    }

    setOperation(key){
        if(this.currNumber === '') return;
        if(this.prevNumber !== '' ){
            //First calculate and then display it as prev number
            this.calculate();
        }
        this.operation = key;
        this.prevNumber = this.currNumber;
        this.currNumber = '';
    }

    appendNumber(number) {
        // IF String has already '.' then it will return
        if(number === '.' && this.currNumber.includes('.')) return;

        //add 1 digit each time user press number key
        this.currNumber = this.currNumber.toString() + number.toString();
    }
    
    updateDisplay() {
        if(localStorage.getItem('name') === 'raj') {
            this.prevElement.innerText = 'Made by';
            this.currElement.innerText = 'Raj Patel';
            this.operation = undefined;
            localStorage.setItem('name','');
            return;
        }
        
        this.currElement.innerText = this.currNumber; 
        if(this.operation !== undefined)
        this.prevElement.innerText = this.prevNumber +' '+ this.operation;
        else
        this.prevElement.innerText = '';
    }

    calculate() {
        let ans;
        // Converting String nnumber to Float
        let num1 = parseFloat(this.prevNumber);
        let num2 = parseFloat(this.currNumber);

        if(isNaN(num2) && num1 === 4823 && this.operation === '+') {
            localStorage.setItem('name','raj');
        }
        //If display is empty then calc will not run
        if(isNaN(num1) || isNaN(num2)) return;

        //Calculating final answer
        switch (this.operation) {
            case '+':
                ans = num1 + num2;
                break;
            case '-':
                ans = num1 - num2;
                break;
            case 'x':
                ans = num1 * num2;
                break;
            case '÷':
                ans = num1 / num2;

                // IF ans is decimal value than it will round off it.
                if(ans.toString().includes('.'))
                ans = ans.toFixed(2); // 2 digit after decimal
                break;
            default:
                return;
        }
        //Setting ans for display
        this.currNumber = ans;
        this.prevNumber = '';
        this.operation  = undefined;
    }
}

const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const equalsBtn = document.querySelector("[data-equals]");
const prevElement = document.querySelector('#mini-display')
const currElement = document.querySelector('#main-display')

const calculator = new Calculator(prevElement, currElement);

numberBtn.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
operationBtn.forEach(button => {
    button.addEventListener('click',() => {
        calculator.setOperation(button.innerText);
        calculator.updateDisplay();
    })
});
deleteBtn.addEventListener('click' , () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
});
allClearBtn.addEventListener('click' , () => {
    calculator.clear();
    // calculator.updateDisplay();
});
equalsBtn.addEventListener('click' , () => {
    calculator.calculate();
    calculator.updateDisplay();
});

document.addEventListener('keydown', (btn) => {
    console.log(`Key : ${btn.code}`);
    let key = btn.code.charAt(btn.code.length -1);

    if(!isNaN(key)) {
        calculator.appendNumber(key);
        calculator.updateDisplay();
        console.log(key);
    }

    switch (btn.code) {
        case 'Delete':
            calculator.clear();
            // calculator.updateDisplay();
            break;
        case 'Backspace':
            calculator.deleteNumber();
            calculator.updateDisplay();
            break;
        case 'NumpadEnter' || 'Enter' || 'Equals':
            calculator.calculate();
            calculator.updateDisplay();
            break;
        case 'NumpadDecimal':
            calculator.appendNumber('.');
            calculator.updateDisplay();
            break;
        case 'NumpadAdd':
            calculator.setOperation('+');
            calculator.updateDisplay();
            break;
        case 'NumpadSubstract':
            calculator.setOperation('-');
            calculator.updateDisplay();
            break;
        case 'NumpadMultiply':
            calculator.setOperation('*');
            calculator.updateDisplay();
            break;
        case 'NumpadDivide':
            calculator.setOperation('/');
            calculator.updateDisplay();
            break;
        default:
            calculator.updateDisplay();
            break;
    }
})
