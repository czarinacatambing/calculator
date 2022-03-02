let isPrevUtility=false; //only to determine if 1st/2nd operand
let isCurrentUtility=false; // only to determine if shows on result/formula on updateDisplay
let currentOp;
let firstOperand;
let secondOperand;
let currentResult;
let currentFormula;





function add(a, b) {
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
	return a+b;
};

function subtract(a,b) {
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
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
  return a*b
};

function power(a,b) {
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
	return Math.pow(a,b)
};



function clear() {
  isPrevUtility=false; //only to determine if 1st/2nd operand
  isCurrentUtility=false; // only to determine if shows on result/formula on updateDisplay
  currentOp=null;
  firstOperand='';
  secondOperand='';
  currentResult=null;
  currentFormula=null;
  let formula = document.querySelector('div#formula')
  let result = document.querySelector('div#result')

  formula.innerText = ''
  result.innerText = ''
}


const divide = function(a,b){
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
  return a/b;
}

function plusminus(a){
  if(typeof a == 'string' ) a = Number(a)

  if(a<0){
    return Math.abs(a)
  } else {
    return Math.abs(a) * -1
  }
}

function decimal(a){
  return parseFloat(a.toString()+'.00').toFixed(1)
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
    formula.innerHTML= formulaVal;
    // result.innerHTML = (i)
    if(currentOp=='equals'|| currentOp==decimal || currentOp==plusminus) result.innerHTML = resultVal; // result of op
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
  
    if(currentOp==='equals'){
      firstOperand = currentResult;
      secondOperand = null;
    }

    if(key.className=='utility') {
      isPrevUtility=true;
      isCurrentUtility=true;

      switch(key.innerText){
        case 'AC': 
          clear();
        case 'Xy': 
          updateDisplay(firstOperand+key.innerText,'')
          currentOp= power;
          break;
        case '/':
          updateDisplay(firstOperand+key.innerText,'')
          currentOp = divide;
          break;
        case 'x':
          updateDisplay(firstOperand+key.innerText,'')
          currentOp = multiply;
          break;
        case '-':
          updateDisplay(firstOperand+key.innerText,'')
          currentOp= subtract;
          break;
        case '+':
          updateDisplay(firstOperand+key.innerText,'')
          currentOp = add;
          break;
        case '+/-':
          return plusminus(firstOperand);
        case '.':
            currentOp=decimal
            firstOperand = decimal(firstOperand+key.innerText)
            updateDisplay('', firstOperand)
        default:  // equals only applies if 2 operands

          if(!(['.','+/-'].includes(key.innerText))){
            result = currentOp(firstOperand, secondOperand)
            currentOp='equals'
            currentResult=result;
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

// issues to fix:
// 1. should consider secondOperand as operands on functions
// 2. round long decimals
// 3. pressing clear should wipe out existing data
// 4. display error when dividing by 0
// 5. check that prefmature "=" wont cause errors
