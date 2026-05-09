// ============================================
// TO-DO APP - COMPLETE IMPLEMENTATION
// Using Arrays + DOM + LocalStorage
// ============================================

// Task Data Model
let tasks = [];
let currentFilter = 'all'; // 'all', 'active', 'completed'

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');
const taskStats = document.getElementById('taskStats');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// ============================================
// INITIALIZATION
// ============================================

// Load tasks from localStorage on page load
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ============================================
// TASK CRUD OPERATIONS
// ============================================

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        showNotification('Please enter a task!', 'warning');
        return;
    }
    
    if (text.length > 100) {
        showNotification('Task is too long! Max 100 characters.', 'error');
        return;
    }
    
    const newTask = {
        id: Date.now(), // Unique ID using timestamp
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    taskInput.focus();
    
    showNotification('Task added successfully!', 'success');
}

// Delete single task
function deleteTask(id) {
    const taskElement = document.querySelector(`[data-task-id="${id}"]`);
    if (taskElement) {
        taskElement.classList.add('removing');
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
            showNotification('Task deleted!', 'info');
        }, 200);
    } else {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        showNotification('Task deleted!', 'info');
    }
}

// Toggle task completion status
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        
        const status = task.completed ? 'completed' : 'active';
        showNotification(`Task marked as ${status}!`, 'success');
    }
}

// Clear all completed tasks
function clearCompletedTasks() {
    const completedCount = tasks.filter(task => task.completed).length;
    
    if (completedCount === 0) {
        showNotification('No completed tasks to clear!', 'info');
        return;
    }
    
    if (confirm(`Delete ${completedCount} completed task${completedCount !== 1 ? 's' : ''}?`)) {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        showNotification(`Removed ${completedCount} completed task${completedCount !== 1 ? 's' : ''}!`, 'success');
    }
}

// Delete all tasks
function deleteAllTasks() {
    if (tasks.length === 0) {
        showNotification('No tasks to delete!', 'info');
        return;
    }
    
    if (confirm(`⚠️ WARNING: This will delete ALL ${tasks.length} tasks. Are you sure?`)) {
        tasks = [];
        saveTasks();
        renderTasks();
        showNotification('All tasks deleted!', 'success');
    }
}

// ============================================
// FILTERING & RENDERING
// ============================================

// Get filtered tasks based on current filter
function getFilteredTasks() {
    switch(currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Update filter active state
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active class on filter buttons
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTasks();
}

// Update task statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    
    taskStats.innerHTML = `
        <span>📋 ${total} task${total !== 1 ? 's' : ''}</span>
        <span>✅ ${completed} completed</span>
        <span>🔄 ${active} active</span>
    `;
}

// Render tasks to DOM
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        // Show empty state
        let emptyMessage = '';
        if (currentFilter === 'active') {
            emptyMessage = 'No active tasks! 🎉';
        } else if (currentFilter === 'completed') {
            emptyMessage = 'No completed tasks yet.';
        } else {
            emptyMessage = 'No tasks yet. Add your first task above!';
        }
        
        tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">${currentFilter === 'active' ? '🎯' : currentFilter === 'completed' ? '✅' : '📝'}</div>
                <p>${emptyMessage}</p>
            </div>
        `;
    } else {
        // Render tasks
        tasksList.innerHTML = filteredTasks.map(task => `
            <div class="task-item" data-task-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <div class="task-content">
                    <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
                    <span class="task-date">📅 ${task.createdAt}</span>
                </div>
                <button class="delete-task-btn" onclick="deleteTask(${task.id})" title="Delete task">
                    ✕
                </button>
            </div>
        `).join('');
    }
    
    updateStats();
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification (toast)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
        color: ${type === 'warning' ? '#333' : 'white'};
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// ADDITIONAL FEATURES
// ============================================

// Edit task (double-click to edit)
function enableEditTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const taskElement = document.querySelector(`[data-task-id="${id}"] .task-text`);
    const originalText = task.text;
    
    // Create input for editing
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    input.className = 'edit-input';
    input.style.cssText = `
        flex: 1;
        padding: 8px 12px;
        border: 2px solid #667eea;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
    `;
    
    // Replace text with input
    taskElement.parentNode.replaceChild(input, taskElement);
    input.focus();
    
    // Save on blur or enter
    const saveEdit = () => {
        const newText = input.value.trim();
        if (newText && newText !== originalText) {
            task.text = newText;
            saveTasks();
            renderTasks();
            showNotification('Task updated!', 'success');
        } else if (!newText) {
            showNotification('Task cannot be empty!', 'warning');
        } else {
            renderTasks(); // Revert to original
        }
    };
    
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
}

// Add double-click edit functionality after render
function attachEditListeners() {
    document.querySelectorAll('.task-text').forEach(el => {
        el.removeEventListener('dblclick', handleEdit);
        el.addEventListener('dblclick', handleEdit);
    });
}

function handleEdit(e) {
    const taskItem = e.target.closest('.task-item');
    if (taskItem) {
        const taskId = parseInt(taskItem.dataset.taskId);
        enableEditTask(taskId);
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

// Add task on Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter: Add task
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
    
    // Ctrl/Cmd + Delete: Clear completed
    if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
        e.preventDefault();
        clearCompletedTasks();
    }
    
    // Escape: Clear input focus
    if (e.key === 'Escape') {
        taskInput.blur();
    }
});

// ============================================
// EVENT LISTENERS
// ============================================

addBtn.addEventListener('click', addTask);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);
deleteAllBtn.addEventListener('click', deleteAllTasks);

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// ============================================
// PERSISTENCE & AUTO-SAVE
// ============================================

// Auto-save on window close (just in case)
window.addEventListener('beforeunload', () => {
    saveTasks();
});

// Load tasks when page loads
loadTasks();

// ============================================
// BONUS: EXPORT/IMPORT TASKS
// ============================================

// Export tasks to JSON
function exportTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks_backup_${new Date().toISOString().slice(0,19)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Tasks exported!', 'success');
}

// Import tasks from JSON
function importTasks(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedTasks = JSON.parse(e.target.result);
            if (Array.isArray(importedTasks)) {
                tasks = importedTasks;
                saveTasks();
                renderTasks();
                showNotification('Tasks imported successfully!', 'success');
            } else {
                throw new Error('Invalid format');
            }
        } catch (error) {
            showNotification('Invalid file format!', 'error');
        }
    };
    reader.readAsText(file);
}

// Add export/import buttons dynamically (optional)
function addExportImportButtons() {
    const footer = document.querySelector('.app-footer');
    const exportBtn = document.createElement('button');
    exportBtn.textContent = '📤 Export Tasks';
    exportBtn.className = 'clear-btn';
    exportBtn.style.background = '#28a745';
    exportBtn.style.color = 'white';
    exportBtn.onclick = () => exportTasks();
    
    const importBtn = document.createElement('button');
    importBtn.textContent = '📥 Import Tasks';
    importBtn.className = 'clear-btn';
    importBtn.style.background = '#17a2b8';
    importBtn.style.color = 'white';
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    fileInput.onchange = (e) => {
        if (e.target.files[0]) importTasks(e.target.files[0]);
        fileInput.value = '';
    };
    importBtn.onclick = () => fileInput.click();
    
    footer.appendChild(exportBtn);
    footer.appendChild(importBtn);
    footer.appendChild(fileInput);
}

// Uncomment to add export/import features
// addExportImportButtons();

// ============================================
// CONSOLE HELPERS (For debugging)
// ============================================

console.log('✅ To-Do App Loaded!');
console.log('💡 Features available:');
console.log('   • Add/Delete tasks');
console.log('   • Mark complete/incomplete');
console.log('   • Filter tasks (All/Active/Completed)');
console.log('   • Clear completed tasks');
console.log('   • Delete all tasks');
console.log('   • Double-click to edit tasks');
console.log('   • Keyboard shortcuts: Ctrl+Enter to add, Ctrl+Delete to clear completed');
console.log('   • LocalStorage persistence');
console.log(`   • Current tasks: ${tasks.length}`);