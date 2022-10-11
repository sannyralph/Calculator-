
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operator = undefined
}

comput(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current) ) return
    switch (this.operator){
        case '+': 
            computation = prev + current
            break 
        case '-': 
            computation = prev - current
            break 
        case '*': 
            computation = prev * current
            break 
        case '÷': 
            computation = prev / current
            break 
        default:
            return
    }
    this.currentOperand = computation
    this.operator = undefined
    this.previousOperand = ''
}

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

chooseOperator(operator){
    if (this.currentOperand === '') return
    if (this.previousOperand !== ''){
        this.comput()
    }
    this.operator = operator
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.'))return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay 
    if (isNaN(integerDigits)){
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

updateDisplay(){
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand)
    if (this.operator != null) {
        this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operator}` 
    } else {
        this.previousOperandTextElement.innerText = ''
    }
}
}


const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]")
const deleteButton = document.querySelector("[data-delete]")
const equalButton = document.querySelector("[data-equal]")
const allclearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.comput()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
} )