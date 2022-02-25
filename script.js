let isPrevUtility=false; //only to determine if 1st/2nd operand
let isCurrentUtility=false; // only to determine if shows on result/formula on updateDisplay
let currentOp;
let firstOperand;
let secondOperand;
let prevSelection;
let currentFormula;



function add(a, b) {
	return a+b
};

function subtract(a,b) {
	return a-b
};

// function sum(a,b) {
//   // if(arr.length>0 ) {
//   //   return arr.reduce(( total, i) => total += i)
//   // }
//   // else return 0
//   return a+b
// };

function multiply(a,b) {
  // if(arr.length>0) return arr.reduce( (total, i) => total * i)
  // else return 0
  console.log(parseInt(a))
  console.log(parseInt(a)*parseInt(b))
  return a*b
};

function power(a,b) {
	return Math.pow(a,b)
};

function factorial(a) {
  let total=1;
	for(let i=a;i>0;i--){
   total = total*i
  }
  return total
};

function clear(a) {
  return
}

function equals(a){
  return a;
}

const divide = function(a,b){
  return a/b;
}

function plusminus(a){
  if(a<0){
    return Math.abs(a)
  } else {
    return Math.abs(a) * -1
  }
}

const decimal = function(a){
  return parseFloat(CONCAT(a.toString(),'.00'))
}

// NEXT STEP: UPDATE THIS FOR AFTER EQUALS IS PRESSED
function updateDisplay(formulaVal, resultVal){
  
  const formula = document.querySelector('div#formula')
  const result = document.querySelector('div#result')
  currentFormula = formula.innerText;

  if (isCurrentUtility==false){
    result.innerHTML= (isPrevUtility==true) ? formulaVal: resultVal;
    formula.innerHTML=currentFormula; // this only works 

  } else if (isCurrentUtility==true) {
    formula.innerHTML=formulaVal;
    if(currentOp=='equals') result.innerHTML = resultVal; // result of op
  }

  //first digit shows undefined on results
  //second operand does not show up on results after clicking number.
  //    it shows up on formula and results
  // does not show up as 7x3 on formula after equals
}

function processInput(e) {
    // figure out the operation from the button pressed
    // console.log(e.currentTarget['innerHTML'])
    var key = e.currentTarget
    // ['innerHTML']
  
    

    if(key.className=='utility') {
      isPrevUtility=true;
      isCurrentUtility=true;

      switch(key.innerText){
        case 'AC': 
          return clear;
        case 'Xy': 
          updateDisplay(firstOperand+key.innerText)
          currentOp= power;
          break;
        // case 'x!':
        //   return factorial;
        case '/':
          updateDisplay(firstOperand+key.innerText)
          currentOp = divide;
          break;
        case 'x':
          updateDisplay(firstOperand+key.innerText)
          currentOp = multiply;
          break;
        case '-':
          updateDisplay(firstOperand+key.innerText)
          currentOp= subtract;
          break;
        case '+':
          updateDisplay(firstOperand+key.innerText)
          currentOp = add;
          break;
        case '+/-':
          return plusminus;
        case '.':
            return decimal;
        default:  // equals only applies if 2 operands

          if(!(['decimal','plusminus'].includes(key.innerText))){
            result = currentOp(firstOperand, secondOperand)
            currentOp='equals'
            updateDisplay(currentFormula+secondOperand, result)
            return result;
          } 
      }
    } else if(key.className=='digit'){
      isCurrentUtility=false;

      // type out digits one by one
      if(isPrevUtility==false) {
        (firstOperand==null)? firstOperand=key.innerText:firstOperand=firstOperand+key.innerText
        updateDisplay('',firstOperand)}
      else if(isPrevUtility==true){
        (secondOperand==null)? secondOperand=key.innerText:secondOperand=secondOperand+key.innerText
        updateDisplay(secondOperand)
      }else{
        console.log('unhandled')
        
      }
      isPrevUtility=false;
      
      
    }
    



}


const keys = document.querySelectorAll(`button`)
keys.forEach(key=>key.addEventListener('click', 
    processInput)
);


