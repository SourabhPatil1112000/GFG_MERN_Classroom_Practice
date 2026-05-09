// ============================================
// STUDENTS DATA ARRAY
// ============================================
const students = [
    { name: "Ali", marks: 80 },
    { name: "Sara", marks: 45 },
    { name: "John", marks: 90 },
    { name: "Zoya", marks: 60 }
];

// ============================================
// DISPLAY ORIGINAL DATA ON PAGE LOAD
// ============================================
function displayOriginalData() {
    const tbody = document.getElementById('originalData');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = tbody.insertRow();
        const status = student.marks >= 60 ? 'Pass' : 'Fail';
        const statusClass = status === 'Pass' ? 'status-pass' : 'status-fail';
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td><strong>${student.marks}</strong></td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
        `;
    });
}

// ============================================
// TASK 1: map() - Create new array of names
// ============================================
function demonstrateMap() {
    const resultDiv = document.getElementById('mapResult');
    
    // Using map() to extract all names
    const namesArray = students.map(student => student.name);
    
    // Alternative way using map with index
    const numberedNames = students.map((student, index) => `${index + 1}. ${student.name}`);
    
    // Display result
    resultDiv.innerHTML = `
        <div class="result-success" style="padding: 12px; border-radius: 8px;">
            <strong>📝 Original Array:</strong><br>
            <code style="font-size: 0.8rem;">[${JSON.stringify(students.map(s => s.name))}]</code>
            <br><br>
            <strong>✅ .map() Result:</strong><br>
            <ul class="result-list">
                ${namesArray.map(name => `<li>📌 ${name}</li>`).join('')}
            </ul>
            <div style="margin-top: 10px; padding: 8px; background: rgba(0,0,0,0.05); border-radius: 5px;">
                <small>💡 <strong>What map() does:</strong> Creates a NEW array by calling a function on EVERY element</small><br>
                <small>📊 Original length: ${students.length} | New length: ${namesArray.length}</small>
            </div>
        </div>
    `;
    
    // Console output for learning
    console.log('=== .map() Demonstration ===');
    console.log('Original students array:', students);
    console.log('Names array using map():', namesArray);
    console.log('Numbered names:', numberedNames);
}

// ============================================
// TASK 2: filter() - Get students with marks > 60
// ============================================
function demonstrateFilter() {
    const resultDiv = document.getElementById('filterResult');
    
    // Using filter() to get high achievers
    const highAchievers = students.filter(student => student.marks > 60);
    
    // Get names only of high achievers
    const highAchieverNames = highAchievers.map(s => s.name);
    
    // Calculate percentage of high achievers
    const percentage = (highAchievers.length / students.length) * 100;
    
    // Display result
    if (highAchievers.length === 0) {
        resultDiv.innerHTML = `
            <div class="result-info" style="padding: 12px; border-radius: 8px;">
                ❌ No students scored above 60 marks.
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="result-success" style="padding: 12px; border-radius: 8px;">
                <strong>🎯 Students with marks > 60:</strong><br><br>
                ${highAchievers.map(student => `
                    <div class="student-card">
                        <span class="student-name">👨‍🎓 ${student.name}</span>
                        <span class="student-marks">⭐ ${student.marks} marks</span>
                    </div>
                `).join('')}
                <div style="margin-top: 10px; padding: 8px; background: rgba(0,0,0,0.05); border-radius: 5px;">
                    <small>📊 <strong>Statistics:</strong> ${highAchievers.length} out of ${students.length} students (${percentage}%)</small><br>
                    <small>💡 <strong>What filter() does:</strong> Creates NEW array with elements that PASS the test</small>
                </div>
            </div>
        `;
    }
    
    // Console output
    console.log('=== .filter() Demonstration ===');
    console.log('Students with marks > 60:', highAchievers);
    console.log('Their names:', highAchieverNames);
}

// ============================================
// TASK 3: reduce() - Calculate total marks
// ============================================
function demonstrateReduce() {
    const resultDiv = document.getElementById('reduceResult');
    
    // Using reduce() to sum all marks
    const totalMarks = students.reduce((accumulator, currentStudent) => {
        return accumulator + currentStudent.marks;
    }, 0); // Start from 0
    
    // Calculate average marks
    const averageMarks = totalMarks / students.length;
    
    // Find max marks using reduce (bonus within task)
    const maxMarks = students.reduce((max, student) => {
        return student.marks > max ? student.marks : max;
    }, 0);
    
    // Find min marks using reduce
    const minMarks = students.reduce((min, student) => {
        return student.marks < min ? student.marks : min;
    }, Infinity);
    
    // Display result
    resultDiv.innerHTML = `
        <div class="result-success" style="padding: 12px; border-radius: 8px;">
            <strong>📊 Calculation Results:</strong><br><br>
            <div class="student-card">
                <span>💰 <strong>Total Marks:</strong></span>
                <span style="font-size: 1.3rem; font-weight: bold; color: #667eea;">${totalMarks}</span>
            </div>
            <div class="student-card">
                <span>📈 <strong>Average Marks:</strong></span>
                <span>${averageMarks.toFixed(2)}</span>
            </div>
            <div class="student-card">
                <span>🏆 <strong>Highest Score:</strong></span>
                <span>${maxMarks}</span>
            </div>
            <div class="student-card">
                <span>📉 <strong>Lowest Score:</strong></span>
                <span>${minMarks}</span>
            </div>
            <div style="margin-top: 10px; padding: 8px; background: rgba(0,0,0,0.05); border-radius: 5px;">
                <small>💡 <strong>What reduce() does:</strong> Reduces array to SINGLE value by accumulating</small><br>
                <small>🔢 Formula used: ${students.map(s => s.marks).join(' + ')} = ${totalMarks}</small>
            </div>
        </div>
    `;
    
    // Step-by-step console demonstration
    console.log('=== .reduce() Demonstration ===');
    console.log('Step-by-step accumulation:');
    let stepSum = 0;
    students.forEach((student, i) => {
        stepSum += student.marks;
        console.log(`  Step ${i + 1}: +${student.marks} = ${stepSum}`);
    });
    console.log(`Final total: ${totalMarks}`);
    console.log(`Average: ${averageMarks.toFixed(2)}`);
}

// ============================================
// TASK 4: forEach() - Print all students
// ============================================
function demonstrateForEach() {
    const resultDiv = document.getElementById('forEachResult');
    
    let outputHTML = `
        <div class="result-info" style="padding: 12px; border-radius: 8px;">
            <strong>📋 All Students List:</strong><br><br>
    `;
    
    // Using forEach() to iterate and display
    const studentList = [];
    
    students.forEach((student, index) => {
        const status = student.marks >= 60 ? '✅' : '⚠️';
        outputHTML += `
            <div class="student-card">
                <span>${status} <strong>${index + 1}. ${student.name}</strong></span>
                <span>📖 Marks: ${student.marks}</span>
            </div>
        `;
        studentList.push(`${student.name} (${student.marks})`);
    });
    
    // Add additional info
    outputHTML += `
            <div style="margin-top: 10px; padding: 8px; background: rgba(0,0,0,0.05); border-radius: 5px;">
                <small>💡 <strong>What forEach() does:</strong> Executes a function ONCE for each array element</small><br>
                <small>🔄 Total students iterated: ${students.length}</small><br>
                <small>📝 Console output: ${studentList.join(' | ')}</small>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = outputHTML;
    
    // Console output (important for forEach demonstration)
    console.log('=== .forEach() Demonstration ===');
    console.log('Printing each student:');
    students.forEach((student, index) => {
        console.log(`  ${index + 1}. Name: ${student.name}, Marks: ${student.marks}`);
    });
    console.log('forEach() completed - no return value (undefined)');
}

// ============================================
// BONUS: Function that returns topper student
// ============================================

// Method 1: Using reduce() - Most efficient
function getTopperWithReduce() {
    return students.reduce((topper, current) => {
        return current.marks > topper.marks ? current : topper;
    }, students[0]);
}

// Method 2: Using sort() - Simple but modifies array
function getTopperWithSort() {
    return [...students].sort((a, b) => b.marks - a.marks)[0];
}

// Method 3: Using for loop - Traditional approach
function getTopperWithLoop() {
    let topper = students[0];
    for (let i = 1; i < students.length; i++) {
        if (students[i].marks > topper.marks) {
            topper = students[i];
        }
    }
    return topper;
}

// Method 4: Using Math.max with find - Creative approach
function getTopperWithMathMax() {
    const maxMarks = Math.max(...students.map(s => s.marks));
    return students.find(s => s.marks === maxMarks);
}

// Main topper function (calls all methods for demonstration)
function findTopper() {
    const resultDiv = document.getElementById('topperResult');
    
    const topper1 = getTopperWithReduce();
    const topper2 = getTopperWithSort();
    const topper3 = getTopperWithLoop();
    const topper4 = getTopperWithMathMax();
    
    resultDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #f5af19, #f12711); padding: 20px; border-radius: 10px; color: white;">
            <div style="text-align: center; margin-bottom: 15px;">
                <span style="font-size: 3rem;">🏆</span>
                <h3 style="margin: 10px 0;">Class Topper</h3>
            </div>
            <div style="background: white; color: #333; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <strong>👨‍🎓 Name:</strong> 
                        <span style="font-size: 1.3rem; color: #f12711;">${topper1.name}</span>
                    </div>
                    <div>
                        <strong>⭐ Marks:</strong> 
                        <span style="font-size: 1.5rem; font-weight: bold; color: #f5af19;">${topper1.marks}</span>
                    </div>
                </div>
            </div>
            <div style="font-size: 0.85rem; text-align: center;">
                🎉 Congratulations ${topper1.name}! 🎉
            </div>
        </div>
        <div style="margin-top: 15px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <strong>🔍 Multiple Approaches (All return same result):</strong><br><br>
            <div style="display: grid; gap: 8px;">
                <div><strong>📌 reduce():</strong> ${topper1.name} (${topper1.marks})</div>
                <div><strong>📌 sort():</strong> ${topper2.name} (${topper2.marks})</div>
                <div><strong>📌 for loop:</strong> ${topper3.name} (${topper3.marks})</div>
                <div><strong>📌 Math.max():</strong> ${topper4.name} (${topper4.marks})</div>
            </div>
            <div style="margin-top: 12px; padding: 8px; background: #e8f4f8; border-radius: 5px;">
                <small>💡 <strong>Pro Tip:</strong> reduce() is most efficient (O(n) time complexity)</small>
            </div>
        </div>
    `;
    
    // Console outputs
    console.log('=== BONUS: Topper Student ===');
    console.log(`🏆 Topper (reduce): ${topper1.name} - ${topper1.marks} marks`);
    console.log(`🏆 Topper (sort): ${topper2.name} - ${topper2.marks} marks`);
    console.log(`🏆 Topper (loop): ${topper3.name} - ${topper3.marks} marks`);
    console.log(`🏆 Topper (Math.max): ${topper4.name} - ${topper4.marks} marks`);
}

// ============================================
// EXTRA BONUS: Additional Array Method Examples
// ============================================

// some() - Check if any student passed
function hasAnyPassed() {
    return students.some(student => student.marks >= 60);
}

// every() - Check if all students passed
function hasAllPassed() {
    return students.every(student => student.marks >= 60);
}

// find() - Find first student with specific marks
function findStudentByMarks(marks) {
    return students.find(student => student.marks === marks);
}

// sort() - Sort students by marks
function sortStudentsByMarks(ascending = true) {
    return [...students].sort((a, b) => {
        return ascending ? a.marks - b.marks : b.marks - a.marks;
    });
}

// Display additional stats in console
function displayAdditionalStats() {
    console.log('\n=== Additional Statistics ===');
    console.log(`Any student passed? ${hasAnyPassed() ? 'Yes ✅' : 'No ❌'}`);
    console.log(`All students passed? ${hasAllPassed() ? 'Yes ✅' : 'No ❌'}`);
    console.log(`Sorted by marks (ascending):`, sortStudentsByMarks(true));
    console.log(`Sorted by marks (descending):`, sortStudentsByMarks(false));
}

// ============================================
// INITIALIZE PAGE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    displayOriginalData();
    console.log('=== Array Methods Mini Lab Loaded ===');
    console.log('Original students array:', students);
    displayAdditionalStats();
});

// Export functions for console access (for learning)
window.students = students;
window.getTopperWithReduce = getTopperWithReduce;
window.getTopperWithSort = getTopperWithSort;
window.getTopperWithLoop = getTopperWithLoop;
window.sortStudentsByMarks = sortStudentsByMarks;