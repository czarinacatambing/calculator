let currentOp;
let semiOp;
let firstOperand;
let secondOperand;
let currentResult;
let currentFormula;
let isRepeat = false;
let prevKey;
let curKey;





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
  isRepeat = false;
  prevKey = null;
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
  return (a.indexOf('.') !== 0) ? a.toString()+"." : a.toString()
  //parseFloat(a.toString()+'.00').toFixed(1)
}


function updateDisplay(type){
  const formula = document.querySelector('div#formula')
  const result = document.querySelector('div#result')
  // type 1: [action] 1stOp clicked [formula] 1stOp only [result] N/A
  if(type===1){
    (typeof prevKey=== 'undefined' ) || (prevKey===null) ? 
    formula.innerHTML = '' : 
    formula.innerHTML=firstOperand+currentOp['char']
    result.innerHTML = firstOperand
  } else if(type===2){// type 2: [action] operator clicked [formula] 1stOp, operator [result] N/A

    // firstOperator of first run  or first Operator of succeeding runs
    (typeof secondOperand === 'undefined'|| (isRepeat && prevKey.innerTexT==="=" ) ) ?  result.innerHTML = '' : result.innerHTML = secondOperand
    formula.innerHTML = firstOperand+currentOp['char']
  } else if(type===3) { // WITH 2 DIGITS--> firstOperator  of first run  or first Operator of succeeding runs
    formula.innerHTML = '' 
    result.innerHTML = firstOperand
  } else if(type===4) { // WITH 2 DIGITS--> secondOperator  of first run  or second Operator of succeeding runs
    formula.innerHTML = firstOperand+currentOp['char']
    result.innerHTML = secondOperand
  } else if(type===5) { // DECIMAL or +/- on first operand
    formula.innerHTML = ''
    result.innerHTML = firstOperand
  } else if(type===6) { // DECIMAL or +/- on 2nd operand
    formula.innerHTML = firstOperand+currentOp['char']
    result.innerHTML = secondOperand
  } else if(type===7) { // AC
    formula.innerHTML = ''
    result.innerHTML = ''
  } else { // type 3 : [action] = clicked [formula] 1st Op, operator, 2ndOp [result] calculation 
    formula.innerHTML = firstOperand+currentOp['prevChar']+secondOperand
    result.innerHTML=currentOp['result']
  }
  

  
}


function pickSemiOp(key){
  switch(key.innerText){
    case '+/-':
      return {'function':plusminus, 'char': key.innerText};
    case '.':
      return {'function':decimal, 'char': key.innerText};
    default:
      return
  }
}

function pickOperation(key){

  switch(key.innerText){
    case 'AC': 
      clear();
    case 'Xy': 
      return {'function': power, 'char':key.innerText}
    case '/':
      return {'function': divide, 'char':key.innerText}
    case 'x':
      return {'function':multiply, 'char': key.innerText};
    case '-':
      return {'function':subtract, 'char': key.innerText};
    case '+':
      return {'function':add, 'char': key.innerText};
    case '=': 
        isRepeat = true;
        return {'result': currentOp['function'](firstOperand, secondOperand), 'char':'=', 'prevChar': currentOp['char']}

    default:  // equals only applies if 2 operands

        if(!(['.','+/-'].includes(key.innerText))){
          result = currentOp(firstOperand, secondOperand)
          currentOp='equals'
          isRepeat = true;
          currentResult=result;
          updateDisplay(currentFormula+secondOperand, result)
          return result;
        } 

}}



function processInput(e) {
    // figure out the operation from the button pressed
    // console.log(e.currentTarget['innerHTML'])
    let key = e.currentTarget

    if(isRepeat) {
      if(key.className=='utility' && key.innerText==="=") {
        currentOp = pickOperation(key)
        updateDisplay(9)
        prevKey=key
      } else if(key.className=='utility' && !(key.innerText==="=") && !(key.innerText==="AC")){ //first operator of nth run 
        firstOperand = currentOp['result'];
        secondOperand = null;
        currentOp = pickOperation(key)
        updateDisplay(2)
        prevKey=key
      } else if (key.className==='digit'){ 
        if(prevKey.className==='digit'){ 
          // currentOp = pickOperation(key)
          if (typeof secondOperand==='undefined') {   
            firstOperand = firstOperand+key.innerText 
            updateDisplay(3)
          } else if(prevKey.className==='semiUtility'){
            firstOperand = firstOperand+key.innerText 
            updateDisplay(5)
          } else {  //2 digit 2ndOperand on first run
            secondOperand = secondOperand+key.innerText 
            updateDisplay(4)

            
          }
          prevKey=key
        } else if(prevKey.className==='semiUtility'){ 
          secondOperand = secondOperand+key.innerText 
          updateDisplay(6)
        } else { // first run and 2nd operator clicked
          secondOperand=key.innerText
          updateDisplay(2)
          prevKey=key
        }
      } else if(key.className==='semiUtility') {
        
        if(prevKey.className==='digit'){ 
          semiOp = pickSemiOp(key)
          secondOperand = semiOp['function'](secondOperand)
          updateDisplay(6)
            
          
          prevKey=key
        
        } else if(key.className==='semiUtility') {
          // placeholder for case when decimal and +/- clicked twice
        } else { // first run and operator clicked. 2nd operand 1 digit
          secondOperand=semiOp['function'](secondOperand)
          updateDisplay(6)
          prevKey=key
        }
      } else {
        console.log("---Warning: Unhandled -----")
        currentOp = pickOperation(key)
        if(key.innerText==='AC'){
          updateDisplay(7)
          prevKey=null;
        }
      }

    } 
    
    
    else { 
      // first run and initiating first operand
      if(!(prevKey) && key.className=='digit') {
        firstOperand = key.innerText;
        updateDisplay(1)
        prevKey = key
      } else if (key.className==='digit'){ 
        if(prevKey.className==='digit'){ 
          // currentOp = pickOperation(key)
          if (typeof secondOperand==='undefined') {   
            firstOperand = firstOperand+key.innerText 
            updateDisplay(3)
          } else {  //2 digit 2ndOperand on first run
            secondOperand = secondOperand+key.innerText 
            updateDisplay(4)
            
          }
          prevKey=key
        } else if(prevKey.className==='semiUtility'){
          if (typeof secondOperand==='undefined') {   
            firstOperand = firstOperand+key.innerText 
            updateDisplay(5)
          } else {  //2 digit 2ndOperand on first run
            secondOperand = secondOperand+key.innerText 
            updateDisplay(6)
            
          }
        
        } else { // first run and operator clicked; 2nd operand 1 digit
          secondOperand=key.innerText
          updateDisplay(2)
          prevKey=key
        }
      } else if(key.className==='semiUtility') {
        
        if(prevKey.className==='digit'){ 
          semiOp = pickSemiOp(key)
          if (typeof secondOperand==='undefined') {   
            firstOperand = semiOp['function'](firstOperand)
            updateDisplay(5)
          } else {  //2 digit 2ndOperand on first run
            secondOperand = semiOp['function'](secondOperand)
            updateDisplay(6)
            
          }
          prevKey=key
        } else if(key.className==='semiUtility') {
          // placeholder for case when decimal and +/- clicked twice
        } else { // first run and operator clicked. 2nd operand 1 digit
          secondOperand=semiOp['function'](secondOperand)
          updateDisplay(6)
          prevKey=key
        }
      //  if operator was clicked before  any operand
      } else if (key.className==='utility' && (typeof firstOperand=== 'undefined' || firstOperand=== '')){
        return;
      } else {
        currentOp = pickOperation(key)
        if (key.innerText==='=') {
          updateDisplay(9) } // when = clicked during first run
        // else if(key)
        else if(key.innerText==='AC'){
          updateDisplay(7)
        }
        else {
          updateDisplay(2) //first run and first operator clicked
        }
        // (key.innerText==='=') ? updateDisplay(3) : updateDisplay(2)

        (key.innerText==='AC')? prevKey=null : prevKey=key // needed so next digit will be assigned to first operand
      }
    }



  }


  const keys = document.querySelectorAll(`button`)
  keys.forEach(key=>key.addEventListener('click', 
      processInput)
  );
  

