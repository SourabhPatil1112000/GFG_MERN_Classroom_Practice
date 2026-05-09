// ============================================
// SECTION 1: CLOSURE COUNTER IMPLEMENTATION
// ============================================

// Factory function that creates counter objects using closure
function createCounter(initialValue = 0) {
    // Private variable - only accessible inside this function
    let count = initialValue;
    
    // These inner functions "close over" the count variable
    // They maintain access to count even after createCounter returns
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        reset: function() {
            count = initialValue;
            return count;
        },
        getValue: function() {
            return count;
        }
    };
}

// Create multiple independent counters
let mainCounter = createCounter(0);
let additionalCounters = [];

// Display function for main counter
function updateCounterDisplay() {
    const counterDisplay = document.getElementById('counterValue');
    if (counterDisplay) {
        counterDisplay.textContent = mainCounter.getValue();
    }
}

function incrementCounter() {
    mainCounter.increment();
    updateCounterDisplay();
}

function decrementCounter() {
    mainCounter.decrement();
    updateCounterDisplay();
}

function resetCounter() {
    mainCounter.reset();
    updateCounterDisplay();
}

function createNewCounter() {
    const newCounter = createCounter(0);
    additionalCounters.push(newCounter);
    
    const counterInfo = document.getElementById('counterInfo');
    const counterCount = additionalCounters.length;
    
    counterInfo.innerHTML = `
        <small>💡 Created ${counterCount} new counter${counterCount !== 1 ? 's' : ''}! 
        Each has its OWN independent state (check console)</small>
    `;
    
    // Demonstrate independent state in console
    console.log(`\n=== New Counter Created (Total: ${counterCount + 1}) ===`);
    console.log(`Main counter value: ${mainCounter.getValue()}`);
    console.log(`New counter value: ${newCounter.getValue()}`);
    console.log(`Incrementing new counter 3 times...`);
    newCounter.increment();
    newCounter.increment();
    newCounter.increment();
    console.log(`New counter value after 3 increments: ${newCounter.getValue()}`);
    console.log(`Main counter value (unchanged): ${mainCounter.getValue()}`);
    console.log(`✨ Closure keeps each counter's state PRIVATE and INDEPENDENT!\n`);
    
    setTimeout(() => {
        counterInfo.innerHTML = `<small>💡 Each counter has its OWN independent state (closure magic!) - ${additionalCounters.length + 1} total counters exist</small>`;
    }, 3000);
}

// ============================================
// SECTION 2: SCOPE DEMONSTRATIONS
// ============================================

// Global scope variables
var globalVar = "🌍 I'm a global variable (var)";
let globalLet = "🌍 I'm a global variable (let)";
const globalConst = "🌍 I'm a global constant (const)";

function demoGlobalScope() {
    const resultDiv = document.getElementById('globalResult');
    
    // Accessing global variables from inside a function
    resultDiv.innerHTML = `
        <strong>✅ Global variables are accessible here!</strong><br>
        • globalVar: "${globalVar}"<br>
        • globalLet: "${globalLet}"<br>
        • globalConst: "${globalConst}"<br><br>
        <span style="color: #28a745;">✓ Accessible from ANYWHERE in the code</span>
    `;
    
    console.log('=== Global Scope Demo ===');
    console.log('Global var:', globalVar);
    console.log('Global let:', globalLet);
    console.log('Global const:', globalConst);
}

function demoFunctionScope() {
    const resultDiv = document.getElementById('functionResult');
    
    // Function-scoped variables
    function myFunction() {
        var functionVar = "🔧 I'm function-scoped (var)";
        let functionLet = "🔧 I'm function-scoped (let)";
        const functionConst = "🔧 I'm function-scoped (const)";
        
        return { functionVar, functionLet, functionConst };
    }
    
    const result = myFunction();
    
    resultDiv.innerHTML = `
        <strong>✅ Inside the function, I can access:</strong><br>
        • functionVar: "${result.functionVar}"<br>
        • functionLet: "${result.functionLet}"<br>
        • functionConst: "${result.functionConst}"<br><br>
        <span style="color: #dc3545;">❌ But I CANNOT access them OUTSIDE the function!</span><br>
        <small>Try: console.log(functionVar) → ReferenceError</small>
    `;
    
    console.log('=== Function Scope Demo ===');
    console.log('Inside function:', result);
    console.log('Outside function - functionVar is NOT accessible:', typeof functionVar === 'undefined' ? 'undefined (cannot access)' : functionVar);
}

function demoBlockScope() {
    const resultDiv = document.getElementById('blockResult');
    
    let output = '';
    
    // Block scope demonstration
    if (true) {
        var varInBlock = "⚠️ var - I LEAK outside the block!";
        let letInBlock = "✅ let - I stay INSIDE the block";
        const constInBlock = "✅ const - I stay INSIDE the block";
        
        output += `<strong>🔹 INSIDE the block { }</strong><br>`;
        output += `• varInBlock: "${varInBlock}"<br>`;
        output += `• letInBlock: "${letInBlock}"<br>`;
        output += `• constInBlock: "${constInBlock}"<br><br>`;
    }
    
    // Trying to access block-scoped variables outside
    output += `<strong>🔸 OUTSIDE the block</strong><br>`;
    output += `• varInBlock: "${varInBlock}" <span style="color: #ffc107;">(LEAKED out!)</span><br>`;
    
    try {
        output += `• letInBlock: `;
        output += typeof letInBlock !== 'undefined' ? `"${letInBlock}"` : `<span style="color: #dc3545;">❌ ReferenceError (cannot access)</span>`;
        output += `<br>`;
    } catch(e) {
        output += `<span style="color: #dc3545;">❌ ReferenceError - let is block-scoped!</span><br>`;
    }
    
    try {
        output += `• constInBlock: `;
        output += typeof constInBlock !== 'undefined' ? `"${constInBlock}"` : `<span style="color: #dc3545;">❌ ReferenceError (cannot access)</span>`;
        output += `<br>`;
    } catch(e) {
        output += `<span style="color: #dc3545;">❌ ReferenceError - const is block-scoped!</span><br>`;
    }
    
    output += `<br><span style="color: #28a745;">💡 Key Takeaway: Use let/const for block-level scoping!</span>`;
    
    resultDiv.innerHTML = output;
    
    console.log('=== Block Scope Demo ===');
    console.log('varInBlock (leaked):', varInBlock);
    console.log('letInBlock:', typeof letInBlock !== 'undefined' ? letInBlock : 'ReferenceError (block scoped)');
}

// ============================================
// SECTION 3: HOISTING DEMONSTRATIONS
// ============================================

function demoVarHoisting() {
    const resultDiv = document.getElementById('varResult');
    
    let output = '';
    
    try {
        // Demonstrating var hoisting
        output += `<strong>📌 Step 1: Access before declaration</strong><br>`;
        output += `console.log(myVarBefore); // `;
        
        // This shows that var is hoisted (returns undefined, not error)
        output += `<span style="color: #ffc107;">undefined</span> (NOT an error!)<br><br>`;
        
        var myVarBefore = "I was declared after!";
        
        output += `<strong>📌 Step 2: After declaration</strong><br>`;
        output += `console.log(myVarBefore); // `;
        output += `<span style="color: #28a745;">"${myVarBefore}"</span><br><br>`;
        
        output += `<strong>✅ What happens during hoisting:</strong><br>`;
        output += `<code>// JavaScript moves declaration to top<br>`;
        output += `var myVarBefore;  // Declaration hoisted<br>`;
        output += `console.log(myVarBefore); // undefined<br>`;
        output += `myVarBefore = "I was declared after!"; // Assignment stays</code><br><br>`;
        
        output += `<span style="color: #ffc107;">⚠️ var is hoisted but initialized as undefined</span>`;
        
        resultDiv.innerHTML = output;
    } catch(e) {
        resultDiv.innerHTML = `<span style="color: #dc3545;">Error: ${e.message}</span>`;
    }
    
    console.log('=== var Hoisting Demo ===');
    console.log('Before declaration (due to hoisting):', typeof myVarBefore !== 'undefined' ? myVarBefore : 'undefined');
}

function demoLetHoisting() {
    const resultDiv = document.getElementById('letResult');
    
    let output = '';
    
    try {
        output += `<strong>🔒 Step 1: Access before declaration</strong><br>`;
        output += `console.log(myLetBefore); // `;
        
        // This will throw an error - let is hoisted but NOT initialized
        // We'll catch it to show the error
        try {
            eval('console.log(myLetBefore);');
        } catch(e) {
            output += `<span style="color: #dc3545;">❌ ReferenceError: Cannot access before initialization</span><br><br>`;
        }
        
        let myLetBefore = "I was declared after!";
        
        output += `<strong>📌 Step 2: After declaration</strong><br>`;
        output += `console.log(myLetBefore); // `;
        output += `<span style="color: #28a745;">"${myLetBefore}"</span><br><br>`;
        
        output += `<strong>✅ What happens:</strong><br>`;
        output += `<code>// let IS hoisted but goes into "Temporal Dead Zone" (TDZ)<br>`;
        output += `// Cannot access before declaration line<br>`;
        output += `console.log(myLetBefore); // ReferenceError!<br>`;
        output += `let myLetBefore = "value";</code><br><br>`;
        
        output += `<span style="color: #28a745;">✅ let IS hoisted but NOT initialized (TDZ)</span>`;
        
        resultDiv.innerHTML = output;
    } catch(e) {
        resultDiv.innerHTML = `<span style="color: #dc3545;">Error: ${e.message}</span>`;
    }
    
    console.log('=== let Hoisting Demo ===');
    console.log('let is hoisted but in Temporal Dead Zone (TDZ)');
}

function demoFunctionHoisting() {
    const resultDiv = document.getElementById('funcResult');
    
    let output = '';
    
    try {
        output += `<strong>⚡ Step 1: Call function BEFORE declaration</strong><br>`;
        output += `sayHello(); // `;
        
        // Function declaration is hoisted - this works!
        function sayHello() {
            return "Hello from hoisted function!";
        }
        
        output += `<span style="color: #28a745;">"${sayHello()}"</span> (WORKS!)<br><br>`;
        
        output += `<strong>📌 Step 2: Function expression (var) VS declaration</strong><br>`;
        
        // Function expression with var
        output += `// Function EXPRESSION (var)<br>`;
        output += `console.log(myFuncExp); // `;
        
        try {
            eval('console.log(myFuncExp);');
        } catch(e) {
            output += `<span style="color: #dc3545;">undefined (var hoisted, but not function)</span><br>`;
        }
        
        var myFuncExp = function() { return "expression"; };
        
        output += `myFuncExp(); // Works AFTER assignment<br><br>`;
        
        output += `<strong>✅ Function DECLARATIONS are fully hoisted</strong><br>`;
        output += `<strong>⚠️ Function EXPRESSIONS follow variable hoisting rules</strong>`;
        
        resultDiv.innerHTML = output;
    } catch(e) {
        resultDiv.innerHTML = `<span style="color: #dc3545;">Error: ${e.message}</span>`;
    }
    
    console.log('=== Function Hoisting Demo ===');
    console.log('Function declaration called before definition:', sayHello());
}

// ============================================
// SECTION 4: QUIZ ANSWERS
// ============================================

function answerQuestion1() {
    const resultDiv = document.getElementById('quiz1Result');
    
    resultDiv.innerHTML = `
        <strong>🎯 Answer:</strong> 3, 3, 3 (three times)<br><br>
        <strong>📖 Explanation:</strong><br>
        • <code>var</code> is function-scoped, NOT block-scoped<br>
        • By the time setTimeout runs, the loop has finished<br>
        • The same variable <code>i</code> is shared across all iterations<br>
        • Value of <code>i</code> becomes 3 after loop ends<br><br>
        <span style="color: #ffc107;">💡 Fix: Use <code>let</code> instead of <code>var</code> for block scoping!</span>
    `;
}

function answerQuestion2() {
    const resultDiv = document.getElementById('quiz2Result');
    
    resultDiv.innerHTML = `
        <strong>🎯 Answer:</strong> 0, 1, 2<br><br>
        <strong>📖 Explanation:</strong><br>
        • <code>let</code> is block-scoped - creates a new binding for each iteration<br>
        • Each setTimeout gets its OWN copy of <code>i</code><br>
        • Value is preserved for each callback<br><br>
        <span style="color: #28a745;">✅ This is why <code>let</code> is preferred in loops!</span>
    `;
}

function answerQuestion3() {
    const resultDiv = document.getElementById('quiz3Result');
    
    resultDiv.innerHTML = `
        <strong>🎯 Answer:</strong><br>
        • <code>console.log(a);</code> → <span style="color: #ffc107;">1</span> (var leaks out!)\n<br>
        • <code>console.log(b);</code> → <span style="color: #dc3545;">ReferenceError</span> (let is block-scoped)\n<br>
        • <code>console.log(c);</code> → <span style="color: #dc3545;">ReferenceError</span> (const is block-scoped)\n<br><br>
        <strong>📖 Explanation:</strong><br>
        • <code>var</code> ignores block scopes (function-scoped only)\n<br>
        • <code>let</code> and <code>const</code> respect block scopes { }<br><br>
        <span style="color: #28a745;">💡 Always prefer let/const for predictable scoping!</span>
    `;
}

// ============================================
// ADDITIONAL DEMONSTRATIONS (Console Only)
// ============================================

// Closure example with practical use case
function createMultiplier(factor) {
    // This closure "remembers" the factor
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log('\n=== Closure Practical Example ===');
console.log('double(5):', double(5));  // 10
console.log('triple(5):', triple(5));  // 15
console.log('Each multiplier remembers its OWN factor via closure!');

// Private variables using closure (like OOP)
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // Private variable
    
    return {
        deposit: function(amount) {
            balance += amount;
            return `Deposited ${amount}. New balance: ${balance}`;
        },
        withdraw: function(amount) {
            if (amount > balance) {
                return `Insufficient funds! Balance: ${balance}`;
            }
            balance -= amount;
            return `Withdrew ${amount}. New balance: ${balance}`;
        },
        getBalance: function() {
            return balance;
        }
    };
}

const myAccount = createBankAccount(1000);
console.log('\n=== Bank Account using Closure ===');
console.log(myAccount.getBalance());  // 1000 (can't access balance directly!)
console.log(myAccount.deposit(500));   // Deposited 500. New balance: 1500
console.log(myAccount.withdraw(200));  // Withdrew 200. New balance: 1300
console.log('Balance private?', myAccount.balance);  // undefined (truly private!)

// IIFE (Immediately Invoked Function Expression) for scope isolation
(function() {
    const privateVariable = "I'm private to this IIFE";
    console.log('\n=== IIFE Scope Isolation ===');
    console.log(privateVariable);  // Accessible inside
})();
// console.log(privateVariable);  // Error! Not accessible outside

// Display summary in console
console.log('\n' + '='.repeat(50));
console.log('✅ CLOSURE + SCOPE CHALLENGE COMPLETE');
console.log('='.repeat(50));
console.log('🎯 Concepts Demonstrated:');
console.log('  1. Closure (Counter, Multiplier, Bank Account)');
console.log('  2. Global Scope vs Function Scope vs Block Scope');
console.log('  3. Hoisting (var, let, function)');
console.log('  4. Temporal Dead Zone (TDZ)');
console.log('  5. IIFE for scope isolation');
console.log('='.repeat(50));