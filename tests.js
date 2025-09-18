// Framework de testes simples
class TestRunner {
    constructor() {
        this.tests = [];
        this.results = [];
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    run() {
        this.results = [];
        this.tests.forEach(test => {
            try {
                test.fn();
                this.results.push({ name: test.name, status: 'pass' });
            } catch (error) {
                this.results.push({ name: test.name, status: 'fail', error: error.message });
            }
        });
        this.displayResults();
    }

    displayResults() {
        const resultsDiv = document.getElementById('test-results');
        const summaryDiv = document.getElementById('test-summary');
        
        resultsDiv.innerHTML = '';
        
        this.results.forEach(result => {
            const div = document.createElement('div');
            div.className = `test-result ${result.status}`;
            div.innerHTML = `
                <strong>${result.status === 'pass' ? '✓' : '✗'} ${result.name}</strong>
                ${result.error ? `<br>Erro: ${result.error}` : ''}
            `;
            resultsDiv.appendChild(div);
        });

        const passed = this.results.filter(r => r.status === 'pass').length;
        const total = this.results.length;
        
        summaryDiv.innerHTML = `
            <h3>Resumo dos Testes</h3>
            <p><strong>${passed}/${total}</strong> testes passaram</p>
            <p>Status: ${passed === total ? '✅ Todos os testes passaram!' : '❌ Alguns testes falharam'}</p>
        `;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// Inicializar testes
const runner = new TestRunner();

// Testes das funções principais
runner.test('Deve adicionar uma nova tarefa', () => {
    // Reset do estado
    tasks = [];
    taskId = 0;
    
    // Simular input
    document.body.innerHTML += '<input type="text" id="taskInput" value="Teste tarefa">';
    
    addTask();
    
    assert(tasks.length === 1, 'Deve ter 1 tarefa');
    assert(tasks[0].text === 'Teste tarefa', 'Texto da tarefa deve estar correto');
    assert(tasks[0].completed === false, 'Tarefa deve estar incompleta');
});

runner.test('Deve marcar tarefa como concluída', () => {
    tasks = [{ id: 0, text: 'Teste', completed: false }];
    
    toggleTask(0);
    
    assert(tasks[0].completed === true, 'Tarefa deve estar concluída');
});

runner.test('Deve desmarcar tarefa concluída', () => {
    tasks = [{ id: 0, text: 'Teste', completed: true }];
    
    toggleTask(0);
    
    assert(tasks[0].completed === false, 'Tarefa deve estar incompleta');
});

runner.test('Deve excluir uma tarefa', () => {
    tasks = [
        { id: 0, text: 'Tarefa 1', completed: false },
        { id: 1, text: 'Tarefa 2', completed: false }
    ];
    
    deleteTask(0);
    
    assert(tasks.length === 1, 'Deve ter 1 tarefa restante');
    assert(tasks[0].id === 1, 'Deve manter a tarefa correta');
});

runner.test('Não deve adicionar tarefa vazia', () => {
    tasks = [];
    document.body.innerHTML += '<input type="text" id="taskInput" value="">';
    
    addTask();
    
    assert(tasks.length === 0, 'Não deve adicionar tarefa vazia');
});

runner.test('Deve incrementar ID das tarefas', () => {
    tasks = [];
    taskId = 0;
    document.body.innerHTML += '<input type="text" id="taskInput" value="Tarefa 1">';
    
    addTask();
    document.getElementById('taskInput').value = 'Tarefa 2';
    addTask();
    
    assert(tasks[0].id === 0, 'Primeira tarefa deve ter ID 0');
    assert(tasks[1].id === 1, 'Segunda tarefa deve ter ID 1');
});

runner.test('Deve lidar com tarefa inexistente no toggle', () => {
    tasks = [{ id: 0, text: 'Teste', completed: false }];
    const originalLength = tasks.length;
    
    toggleTask(999); // ID inexistente
    
    assert(tasks.length === originalLength, 'Não deve alterar array de tarefas');
    assert(tasks[0].completed === false, 'Não deve alterar tarefa existente');
});

// Executar testes quando a página carregar
window.addEventListener('load', () => {
    setTimeout(() => runner.run(), 100);
});