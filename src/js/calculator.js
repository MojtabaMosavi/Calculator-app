

export default class Calculator{

    constructor(){

        // dom caching 
        this._calculator = document.querySelector(".calculator");
        this._calculatorKeys = this._calculator.querySelectorAll(".calculator__keyboard-key");
        this._calculatorScreen = this._calculator.querySelector(".calculator__screen-input");
        this._calculatorDisplay = this._calculator.querySelector(".calculator__screen-display")
        this._firstOperand = "";
        this._secondOperand= "";
        this._operation;
        this._regex = /\d{1,20}$/


       // rendering 
       this.render();
    }

    // event binding 
    bindEvents(){

        // linking the keys to keyboard 
        document.addEventListener("keypress",(event)=>{
            this._calculatorKeys.forEach(key => {
                if(key.dataset.value === event.key){
                    key.classList.add("calculator__keyboard-key--active");
                    setTimeout(()=>{
                        key.classList.remove("calculator__keyboard-key--active")},100);
                    this.runOperation(key.dataset.input,key.dataset.value)
                }
            })
        })

     
        // responding to key inteaction 
        this._calculatorKeys.forEach(key => {
            key.addEventListener("click",(event)=> {
                const keyInput = key.dataset.input;
                const keyValue = key.dataset.value;
                this.runOperation(keyInput,keyValue)
            })
        });
    }


    // rendering 
    render(){
        this.clearScreen();
        this.bindEvents();
    }

    runOperation(keyInput="",keyValue=""){
        // if the keyInput is a operand 
        if(keyInput === "operand"){
            this._calculatorScreen.value += `${keyValue}`;

        // if the keyInput is a operator
        }else if(keyInput === "operator"){
            const input = this._calculatorScreen.value;
            // validate input 
            if(this.validateInput(input)){
                (keyValue === "=") ? 
                (this.calculateResult()):
                this.startCalculation(input,keyValue);
            }else{
                // invalid input, notify the user and reset calculator
                let message = "Invalid input";
                this.outputErorrMessage(message);
                setTimeout(()=>{ this.resetCalculator()},2000)
            }

        
        // if the keyInput is a setting 
        }else if (keyInput === "setting"){
            if(keyValue === "reset"){
                this.resetCalculator();

            }else{
                this.clearScreen();
                this.updateDisplay();
            }
        
        }else{
            throw Error(`Invalid operation${keyInput}`)
        }
    }


    startCalculation(operand="",operator=""){
        this._firstOperand = parseFloat(operand);
        this._operation = operator;
        this.updateDisplay();
        this.clearScreen();
    }

    clearDisplay(){
        this._calculatorDisplay.textContent = "";
    }

    // reset the calculator 
    updateDisplay(content=""){
        (!content) ? 
        (this._calculatorDisplay.textContent = 
        `${this._firstOperand} ${this._operation } ${this._secondOperand}`) :
        (this._calculatorDisplay.textContent = content);
    }

    validateInput(input){
        return this._regex.test(input) ? input : "";
    }
    
    resetCalculator(){
        this._firstOperand = "";
        this._secondOperand = "";
        this._operation = "";
        this.clearDisplay();
        this.clearScreen();
    }

    // completing calculation
    calculateResult(){
        this._secondOperand = parseFloat(this._calculatorScreen.value);
        this.updateDisplay();
        this.clearScreen();
        let operationValue= eval(`${this._firstOperand} ${this._operation} ${this._secondOperand}`);
        this.setScreenValue(operationValue)
        this.resetSecondOperand();
    }

    outputErorrMessage(message="invalid input"){
        this._calculatorScreen.value = `${message}`
    }
    
    resetFirstOperand(){
        this._firstOperand = "";
    }

    resetSecondOperand(){
        this._secondOperand = "";
    }

    setScreenValue(value=""){
        this._calculatorScreen.value += value;
    }

    clearScreen(){
        this._calculatorScreen.value = "";
    }

  
}