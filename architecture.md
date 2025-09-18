```mermaid
graph TB
    subgraph "Cliente"
        U[👤 Usuário]
    end
    
    subgraph "Frontend"
        B[🌐 Navegador Web]
        H[📄 index.html]
        C[🎨 style.css]
        J[⚡ script.js]
    end
    
    subgraph "Armazenamento Local"
        M[💾 Memória do Navegador<br/>Array tasks[]]
    end
    
    subgraph "Funcionalidades"
        A[➕ Adicionar Tarefa]
        T[✅ Marcar Concluída]
        D[🗑️ Excluir Tarefa]
        R[🔄 Renderizar Lista]
    end
    
    U --> B
    B --> H
    H --> C
    H --> J
    J --> M
    J --> A
    J --> T
    J --> D
    J --> R
    
    A --> M
    T --> M
    D --> M
    R --> B
    
    style U fill:#e1f5fe
    style B fill:#f3e5f5
    style M fill:#fff3e0
    style A fill:#e8f5e8
    style T fill:#e8f5e8
    style D fill:#ffebee
    style R fill:#f1f8e9
```