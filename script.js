class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [
            
        ];
        this.term = ""; 
        this.draw();
    }

  
    draw() {
        const taskContainer = document.getElementById("taskContainer");
        taskContainer.innerHTML = ""; 

        this.getFilteredTasks().forEach(task => this.renderTask(task)); 
    }

  
    getFilteredTasks() {
        return this.tasks.filter(task => 
            task.text.toLowerCase().includes(this.term.toLowerCase())
        );
    }

  
    renderTask(task) {
    const taskContainer = document.getElementById("taskContainer");

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

   
    const taskText = document.createElement("p");
    taskText.innerHTML = this.highlightText(task.text); 

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = task.date;
    dateInput.addEventListener("change", (e) => this.updateDate(task.id, e.target.value));

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.deleteTask(task.id);
    });

 
    taskDiv.addEventListener("click", (e) => {
        if (e.target !== checkbox && e.target !== deleteButton) {
            this.editTask(task.id);
        }
    });

 
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(dateInput);
    taskDiv.appendChild(deleteButton);
    taskContainer.appendChild(taskDiv);
}

highlightText(text) {
    if (!this.term) return text;

    const regex = new RegExp(`(${this.term})`, 'gi'); 
    return text.replace(regex, '<span class="highlight">$1</span>');
}

    // Add a new task
    addTask(text, date) {
        if (text.length < 3 || text.length > 255) {
            alert("Task must be between 3 and 255 characters.");
            return;
        }
        if (date && new Date(date) < new Date()) {
            alert("Date must be in the future or empty.");
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            text,
            date,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks(); 
        this.draw();
    }

    // Edit task text
    editTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) return;

        const taskDiv = document.querySelector(`[data-id="${id}"]`);
        const taskText = taskDiv.querySelector("p");

       
        if (!taskText) return;

        const input = document.createElement("input");
        input.type = "text";
        input.value = task.text;
        input.addEventListener("blur", () => {
            task.text = input.value;
            this.saveTasks(); 
            this.draw();
        });
        
        taskDiv.replaceChild(input, taskText);
        input.focus();
    }


    updateDate(id, newDate) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) return;

        task.date = newDate;
        this.saveTasks();
        this.draw();
    }


    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.draw();
    }

    
    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}

const todoApp = new Todo();

document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskText = document.getElementById("taskText").value.trim();
    const taskDate = document.getElementById("taskDate").value;

    todoApp.addTask(taskText, taskDate);

    document.getElementById("taskText").value = "";
    document.getElementById("taskDate").value = "";
});

document.getElementById("searchInput").addEventListener("input", (e) => {
    todoApp.term = e.target.value; 
    todoApp.draw();
});
