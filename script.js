// theme changing logic
const operators = ['+','-','%','/','*']
let ctBtn = document.querySelector("#change-theme")
let body = document.querySelector("body")
let currentThemeIndex=0

const themes = [
  "default-theme", "theme-blue", "theme-green", "theme-purple", "theme-red", 
  "theme-orange", "theme-yellow", "theme-cyan", "theme-pink", "theme-teal",
];

ctBtn.addEventListener("click", ()=> {
    body.classList.remove(themes[currentThemeIndex])
    currentThemeIndex = (currentThemeIndex + 1) % themes.length; // for wrapping the index around the themes array
    body.classList.add(themes[currentThemeIndex]) 
})

//function to calculate the result

function calculate(firstNum, operator, secondNum) {
    let num1 = parseFloat(firstNum);
    let num2 = parseFloat(secondNum);
    let finalResult;

    if (operator === '/' && num2 === 0) {
        eraseAll(); // Optional: clear the calculator
        return "Error"; // Return a user-friendly message
    }

    // 2. Perform calculation
    switch (operator) {
        case "+":
            finalResult = num1 + num2
            break
        case "*":
            finalResult = num1 * num2
            break
        case "-":
            finalResult = num1 - num2
            break
        case "/":
            finalResult = num1 / num2
            break
        case "%":
            finalResult = num1 % num2
            break
        default:
            return "Invalid Operator"
    }
    if (finalResult.toString().length > 10) { 
        return finalResult.toFixed(7)
    }
    
    return finalResult
}

// function to erase all info 
function eraseAll() {
    operatorStatus= false
    resultDisplay.textContent = ''
    operator=''
    inputDisplay.textContent = ''
    result = ''
    firstNum = ''
    secondNum = ''
    inputString=''
}

// function to update the variables as user clicks escape button

function updateVariables() {
    firstNum = ''
    operator = ''
    secondNum = ''

    operatorStatus = false
    let operatorIndex

    
    for (let i = inputString.length-1; i>=0; i--) {
        if (operators.includes(inputString[i])) {
            operator = inputString[i]
            operatorIndex = i
            operatorStatus= true
            break
        }
    }

    if (operator) {
        firstNum = inputString.substring(0,operatorIndex)
        secondNum = inputString.substring(operatorIndex+1)
        console.log(firstNum)
        console.log(secondNum)
        console.log(operator)
    } else {
        firstNum = inputString;
        console.log(firstNum)
        console.log(secondNum)
        console.log(operator)
    }
}

// function to check whether firstNum or secondNum contains "." or not 

function checkDecimal() {
    if (firstNum.includes(".") && !operatorStatus) {
        return false
    } else if (secondNum.includes(".") && operatorStatus) {
        return false
    } else {
        return true
    }
}

// main functionality of events

let inputDisplay = document.querySelector(".input-display")
let buttonContainer = document.querySelector(".buttons-container")
let resultDisplay = document.querySelector(".result-display")

let firstNum = ''
let inputString = ''
let operator
let secondNum = ''
let operatorStatus = false

buttonContainer.addEventListener("click", function (element) {
  let targetButton = element.target.closest("button")
  if (!targetButton) return

  let buttonId = targetButton.id
  let buttonClass = targetButton.className

  if (buttonClass === "numbers") {
    if (operatorStatus === false) {
      console.log(`${buttonId} pressed going in firstNUM`)
      firstNum += buttonId
      inputString += buttonId
      inputDisplay.textContent = inputString
    } else {
      console.log(`${buttonId} pressed going in SecondNum`)
      secondNum += buttonId
      inputString += buttonId
      inputDisplay.textContent = inputString
    }
  } else if (buttonClass === "operator") {
    if (operatorStatus && (!secondNum)) {
      alert("please enter valid expression")
    } else if (operatorStatus && secondNum) {
      console.log(`${buttonId} pressed`)
      console.log("second operator entered successfully")
      inputString += buttonId
      inputDisplay.textContent = inputString
      firstNum = calculate(firstNum, operator, secondNum)
      secondNum = ''
      console.log(`previous pair result : ${firstNum}`)
      operator = buttonId
    } else {
      currentInput = "operator"
      console.log(`${buttonId} pressed`)
      operator = buttonId
      inputString += buttonId
      inputDisplay.textContent = inputString
      operatorStatus = true
    }
  } else if (buttonId === "equal") {
    if ((!firstNum) || (!operator) || (!secondNum)) {
      alert("please enter valid expression")
      eraseAll()
    } else {
      console.log("equal sign pressed")
      let result = calculate(firstNum, operator, secondNum)
      resultDisplay.textContent = result
    }
  } else if (buttonId === "AC") {
    console.log("AC pressed")
    eraseAll()
  } else if (buttonId === "escape") {
    inputString = inputString.slice(0, inputString.length - 1)
    updateVariables()
    inputDisplay.textContent = inputString
  } else if (buttonId === "decimal") {
    if (!(operators.includes(inputString.slice(inputString.length - 1))) && checkDecimal()) {
      console.log(`${buttonId} pressed going `)
      inputString += "."
      inputDisplay.textContent = inputString
      if (operatorStatus) {
        secondNum += "."
      } else {
        firstNum += "."
      }
    } else {
      alert("please enter valid expression")
    }
  }
})
    