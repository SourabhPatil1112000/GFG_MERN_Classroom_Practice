// ============================================
// PROGRAM 1: Even / Odd Checker
// ============================================
function checkEvenOdd() {
    const input = document.getElementById('numberInput');
    const resultDiv = document.getElementById('evenOddResult');
    let num = parseInt(input.value);
    
    // Validation
    if (isNaN(num)) {
        showResult(resultDiv, '❌ Please enter a valid number!', 'error');
        return;
    }
    
    // Using conditionals (if-else)
    if (num % 2 === 0) {
        showResult(resultDiv, `✅ ${num} is an EVEN number`, 'success');
    } else {
        showResult(resultDiv, `✅ ${num} is an ODD number`, 'success');
    }
    
    // Bonus: Show negative check
    if (num < 0) {
        resultDiv.innerHTML += `<small style="display:block; margin-top:5px;">ℹ️ ${num} is negative</small>`;
    }
}

// ============================================
// PROGRAM 2: Grade Calculator
// ============================================
function calculateGrade() {
    const input = document.getElementById('marksInput');
    const resultDiv = document.getElementById('gradeResult');
    let marks = parseFloat(input.value);
    
    // Validation
    if (isNaN(marks)) {
        showResult(resultDiv, '❌ Please enter valid marks!', 'error');
        return;
    }
    
    if (marks < 0 || marks > 100) {
        showResult(resultDiv, '❌ Marks should be between 0 and 100!', 'error');
        return;
    }
    
    // Grade calculation using multiple conditionals
    let grade;
    let status;
    
    if (marks >= 90) {
        grade = 'A+';
        status = '🌟 Excellent!';
    } else if (marks >= 80) {
        grade = 'A';
        status = '👍 Very Good!';
    } else if (marks >= 70) {
        grade = 'B';
        status = '📘 Good!';
    } else if (marks >= 60) {
        grade = 'C';
        status = '📖 Average';
    } else if (marks >= 50) {
        grade = 'D';
        status = '⚠️ Need Improvement';
    } else {
        grade = 'F';
        status = '❌ Failed. Better luck next time!';
    }
    
    showResult(resultDiv, 
        `📊 Marks: ${marks} | Grade: ${grade}<br>${status}`, 
        'success');
}

// ============================================
// PROGRAM 3: Multiplication Table Generator
// ============================================
function generateTable() {
    const input = document.getElementById('tableNumber');
    const resultDiv = document.getElementById('tableResult');
    let num = parseInt(input.value);
    
    if (isNaN(num)) {
        showResult(resultDiv, '❌ Please enter a valid number!', 'error');
        return;
    }
    
    // Using loop (for loop)
    let tableHTML = '<div class="table-output">';
    tableHTML += `<strong>📐 Multiplication Table of ${num}</strong><br><br>`;
    
    for (let i = 1; i <= 10; i++) {
        let result = num * i;
        tableHTML += `<p>${num} × ${i} = ${result}</p>`;
    }
    
    tableHTML += '</div>';
    resultDiv.innerHTML = tableHTML;
    resultDiv.className = 'result';
    
    // Bonus: Show full table with animation
    resultDiv.style.animation = 'fadeIn 0.3s ease';
}

// ============================================
// PROGRAM 4: Prime Number Checker
// ============================================
function checkPrime() {
    const input = document.getElementById('primeInput');
    const resultDiv = document.getElementById('primeResult');
    let num = parseInt(input.value);
    
    // Validation
    if (isNaN(num)) {
        showResult(resultDiv, '❌ Please enter a valid number!', 'error');
        return;
    }
    
    if (num < 2) {
        showResult(resultDiv, `❌ ${num} is NOT a prime number (Prime numbers start from 2)`, 'error');
        return;
    }
    
    // Prime number logic using loop
    let isPrime = true;
    let divisors = [];
    
    // Using loop - check divisibility from 2 to sqrt(num)
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            isPrime = false;
            divisors.push(i);
        }
    }
    
    // Display result
    if (isPrime) {
        showResult(resultDiv, `✅ ${num} is a PRIME number! 🔐`, 'success');
    } else {
        showResult(resultDiv, 
            `❌ ${num} is NOT a prime number<br>
            <small>It is divisible by: ${divisors.join(', ')}, ${num / divisors[0]}</small>`, 
            'error');
    }
}

// ============================================
// PROGRAM 5: Reverse a String
// ============================================
function reverseString() {
    const input = document.getElementById('stringInput');
    const resultDiv = document.getElementById('reverseResult');
    let str = input.value;
    
    if (!str.trim()) {
        showResult(resultDiv, '❌ Please enter some text!', 'error');
        return;
    }
    
    // Method 1: Using built-in methods
    const reversed1 = str.split('').reverse().join('');
    
    // Method 2: Using loop (for demonstration)
    let reversed2 = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed2 += str[i];
    }
    
    // Show both methods for learning
    showResult(resultDiv, 
        `📝 Original: "${str}"<br>
         🔄 Reversed: "<strong>${reversed1}</strong>"<br>
         <small>💡 Method 1: split().reverse().join()</small><br>
         <small>💡 Method 2: for loop from end to start</small>`,
        'info');
    
    // Bonus: Palindrome check
    if (str.toLowerCase() === reversed1.toLowerCase()) {
        resultDiv.innerHTML += `<br><span style="color:#28a745;">🎉 Palindrome detected! (Reads same backwards)</span>`;
    }
}

// ============================================
// PROGRAM 6: Find Largest Number in Array
// ============================================
function findLargest() {
    const input = document.getElementById('arrayInput');
    const resultDiv = document.getElementById('arrayResult');
    let inputStr = input.value;
    
    if (!inputStr.trim()) {
        showResult(resultDiv, '❌ Please enter numbers separated by commas!', 'error');
        return;
    }
    
    // Convert string to array of numbers
    let numArray = inputStr.split(',')
        .map(item => parseFloat(item.trim()))
        .filter(num => !isNaN(num));
    
    if (numArray.length === 0) {
        showResult(resultDiv, '❌ Please enter valid numbers (e.g., 5,12,8,23)', 'error');
        return;
    }
    
    // Method 1: Using Math.max() with spread operator
    const max1 = Math.max(...numArray);
    
    // Method 2: Using loop (for learning)
    let max2 = numArray[0];
    for (let i = 1; i < numArray.length; i++) {
        if (numArray[i] > max2) {
            max2 = numArray[i];
        }
    }
    
    // Method 3: Using reduce
    const max3 = numArray.reduce((max, current) => current > max ? current : max, numArray[0]);
    
    // Sort array for fun
    const sorted = [...numArray].sort((a, b) => a - b);
    
    showResult(resultDiv, 
        `📊 Array: [${numArray.join(', ')}]<br>
         🏆 Largest Number: <strong>${max1}</strong><br><br>
         <small>📈 Sorted: [${sorted.join(', ')}]</small><br>
         <small>📍 Minimum: ${sorted[0]}</small><br>
         <small>📐 Total numbers: ${numArray.length}</small>`,
        'success');
    
    // Bonus: Show all methods
    console.log(`Max using Math.max(): ${max1}`);
    console.log(`Max using loop: ${max2}`);
    console.log(`Max using reduce: ${max3}`);
}

// ============================================
// Helper Function: Display results consistently
// ============================================
function showResult(element, message, type = 'info') {
    element.innerHTML = message;
    element.className = `result ${type}`;
    element.style.animation = 'fadeIn 0.3s ease';
}

// ============================================
// Bonus: Enter key support for all inputs
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key support for each input
    const inputs = [
        { id: 'numberInput', func: checkEvenOdd },
        { id: 'marksInput', func: calculateGrade },
        { id: 'tableNumber', func: generateTable },
        { id: 'primeInput', func: checkPrime },
        { id: 'stringInput', func: reverseString },
        { id: 'arrayInput', func: findLargest }
    ];
    
    inputs.forEach(item => {
        const input = document.getElementById(item.id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    item.func();
                }
            });
        }
    });
});

// ============================================
// Additional Bonus Functions
// ============================================

// Function to demonstrate all prime numbers between 1 and N
function getAllPrimes(limit) {
    let primes = [];
    for (let i = 2; i <= limit; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
    }
    return primes;
}

// Function to demonstrate array operations
function demonstrateArrayOperations(arr) {
    return {
        original: arr,
        sum: arr.reduce((a,b) => a + b, 0),
        average: arr.reduce((a,b) => a + b, 0) / arr.length,
        max: Math.max(...arr),
        min: Math.min(...arr),
        sorted: [...arr].sort((a,b) => a - b)
    };
}

// Export functions for console testing
console.log('✅ All JavaScript programs loaded!');
console.log('💡 Try: getAllPrimes(50) to see all primes up to 50');
console.log('💡 Try: demonstrateArrayOperations([5,12,8,23,4])');