// Todo Storage Key
const STORAGE_KEY = 'todoList';
const currentFilter = { type: 'all' };

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    updateUI();
    setupEnterKey();
});

// Setup Enter Key
function setupEnterKey() {
    const input = document.getElementById('todoInput');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
}

// Add Todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') {
        alert('Lütfen bir görev gir!');
        return;
    }

    if (text.length > 100) {
        alert('Görev 100 karakterden uzun olamaz!');
        return;
    }

    const todos = getTodos();
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString('tr-TR')
    };

    todos.push(newTodo);
    saveTodos(todos);
    input.value = '';
    input.focus();
    loadTodos();
    updateUI();
}

// Get Todos from Storage
function getTodos() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('LocalStorage hatası:', error);
        return [];
    }
}

// Save Todos to Storage
function saveTodos(todos) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error('LocalStorage kayıt hatası:', error);
        alert('Görevler kaydedilirken hata oluştu!');
    }
}

// Load and Display Todos
function loadTodos() {
    const todos = getTodos();
    const todoList = document.getElementById('todoList');
    const emptyState = document.getElementById('emptyState');

    // Filter todos
    let filteredTodos = todos;
    if (currentFilter.type === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter.type === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }

    // Show/hide empty state
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
        todoList.innerHTML = filteredTodos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
                <div style="flex: 1;">
                    <div class="todo-text">${escapeHtml(todo.text)}</div>
                    <div class="todo-meta">Oluşturuldu: ${todo.createdAt}</div>
                </div>
                <div class="todo-actions">
                    <button class="todo-btn edit-btn" onclick="editTodo(${todo.id})">✏️</button>
                    <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }
}

// Toggle Todo Completion
function toggleTodo(id) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        loadTodos();
        updateUI();
    }
}

// Edit Todo
function editTodo(id) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    
    if (!todo) return;

    const newText = prompt('Görevi düzenle:', todo.text);
    
    if (newText === null) return; // User cancelled
    
    if (newText.trim() === '') {
        alert('Görev boş olamaz!');
        return;
    }

    if (newText.length > 100) {
        alert('Görev 100 karakterden uzun olamaz!');
        return;
    }

    todo.text = newText.trim();
    saveTodos(todos);
    loadTodos();
    updateUI();
}

// Delete Todo
function deleteTodo(id) {
    if (confirm('Bu görevi silmek istediğine emin misin?')) {
        let todos = getTodos();
        todos = todos.filter(t => t.id !== id);
        saveTodos(todos);
        loadTodos();
        updateUI();
    }
}

// Clear Completed Todos
function clearCompleted() {
    if (confirm('Tümü tamamlanmış görevleri silmek istediğine emin misin?')) {
        let todos = getTodos();
        const completed = todos.filter(t => t.completed).length;
        
        if (completed === 0) {
            alert('Tamamlanmış görev yok!');
            return;
        }

        todos = todos.filter(t => !t.completed);
        saveTodos(todos);
        loadTodos();
        updateUI();
    }
}

// Filter Todos
function filterTodos(type) {
    currentFilter.type = type;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${type}"]`).classList.add('active');

    loadTodos();
}

// Update UI Statistics
function updateUI() {
    const todos = getTodos();
    const completed = todos.filter(t => t.completed).length;
    const total = todos.length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Update counts
    document.getElementById('countAll').textContent = total;
    document.getElementById('countActive').textContent = active;
    document.getElementById('countCompleted').textContent = completed;

    // Update stats
    document.getElementById('totalTodos').textContent = total;
    document.getElementById('completedTodos').textContent = completed;
    document.getElementById('progressPercent').textContent = progress + '%';

    // Update progress bar
    document.getElementById('progressBar').style.width = progress + '%';
}

// Export Todos
function exportTodos() {
    const todos = getTodos();
    
    if (todos.length === 0) {
        alert('Dışa aktarılacak görev yok!');
        return;
    }

    const csvContent = [
        ['Görev', 'Durum', 'Oluşturuldu'],
        ...todos.map(t => [
            `"${t.text}"`,
            t.completed ? 'Tamamlandı' : 'Aktif',
            t.createdAt
        ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `GorevListesi_${new Date().toLocaleDateString('tr-TR')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Reset All Todos
function resetAll() {
    if (confirm('TÜM GÖREVLERİ KAYBEDECEKSEN! Emin misin? Bu işlem geri alınamaz!')) {
        if (confirm('Son kez sor: Tüm görevleri silmek istediğine emin misin?')) {
            localStorage.removeItem(STORAGE_KEY);
            loadTodos();
            updateUI();
            alert('Tüm görevler silindi!');
        }
    }
}

// Escape HTML for security
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}