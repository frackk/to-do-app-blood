const renderTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
};

const addTodo = (form) => {
    const input = input_todo;
    const timestamp = Date.now();
    if(input.title.value !== ""){
        let todo = new Todo(input.title.value, input.category.value, input.priority.value, timestamp, false);
        todos = renderTodos();
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
    }else{
        alert("Enter a valid Todo");
    }
};

const renderTable = (todos) => {
    todos.forEach((todo) => {
        const todo_row = document.createElement('tr');
        const id = document.createElement('td');
        const title = document.createElement('td');
        const category = document.createElement('td');
        const priority = document.createElement('td');
        const date = document.createElement('td');
        const status = document.createElement('td');
        // const remove = document.createElement('td');
        id.innerHTML = todo.id;
        title.innerHTML = todo.title;
        category.innerHTML = todo.category;
        priority.innerHTML = todo.priority;
        date.className = "date_column";
        ddate = new Date(todo.date);
        date.innerHTML = ddate;
        status.appendChild(check_box(todo.status, todo));
        status.appendChild(addEditBtn());
        status.appendChild(addRemoveBtn());

        todo_row.appendChild(id);
        todo_row.appendChild(title);
        todo_row.appendChild(category);
        todo_row.appendChild(priority);
        todo_row.appendChild(date);
        todo_row.appendChild(status);
        // todo_row.appendChild(remove);

        // Disabling checkbox if checked
        if(todo_row.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.checked){
            todo_row.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.style.display = "none";
        }
        document.getElementById('todo_table').appendChild(todo_row);

    });
};

const check_box = (val) => {
    const box = document.createElement('input');
    box.className = "table_checkbox";
    box.type = "checkbox";
    if(val === true){
        box.checked = true;
    }else{
        box.checked = false;
    }
    box.addEventListener("change", () => {
        let todos = renderTodos();
        
        console.log(box.parentNode.parentNode.firstChild.innerHTML);
        // console.log(Date.parse(box.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML));
        
        const td_id = box.parentNode.parentNode.firstChild.innerHTML;
        const todo = todos.find((todo) => { return todo.id === td_id; });
        const idx = todos.indexOf(todo);
        if(box.checked){
            todo.status = true;
        }else{
            todo.status = false;
        }
        todos.splice(idx, 1, todo);
        localStorage.setItem('todos',JSON.stringify(todos));
        // console.log(box.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling);
        const status_td = box.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
        if(status_td.firstChild.checked){
            status_td.firstChild.nextSibling.style.display = "none";
        }else{
            status_td.firstChild.nextSibling.style.display = "inline";
        }
    });
    return box;
};

const addEditBtn = () => {
    const edit_btn = document.createElement('button');
    edit_btn.className = "edit-btn";
    edit_btn.innerHTML = "Edit";
    edit_btn.addEventListener('click', () => {
        const tr = edit_btn.parentNode.parentNode;
        document.getElementById('todo-id').innerHTML = tr.firstChild.innerHTML;
        document.getElementById('todo-id').style.display = "inline";
        document.getElementById('input_todo-title').value = tr.firstChild.nextSibling.innerHTML;
        document.getElementById('input_todo-category').value = tr.firstChild.nextSibling.nextSibling.innerHTML;
        document.getElementById('input_todo-priority').value = tr.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
        document.getElementById('input_todo-submit').style.display = "none";
        document.getElementById('update_todo').style.display = "inline";
        document.getElementById('remove_todo').style.display = "inline";
        // console.log(tr);
    });
    return edit_btn;
};

const addRemoveBtn = () => {
    const remove_btn = document.createElement('button');
    remove_btn.className = "remove-btn";
    remove_btn.innerHTML = "Del";
    remove_btn.addEventListener('click', () => {
        const id = remove_btn.parentNode.parentNode.firstChild;
        const todos = renderTodos();
        const todo = todos.find((todo) => { return todo.id === id.innerHTML; });
        console.log(todo);
        
        const title = document.getElementById('input_todo-title');
    
        const idx = todos.indexOf(todo);
        todos.splice(idx, 1);
        localStorage.setItem('todos',JSON.stringify(todos));
        location.reload();
    });

    return remove_btn;
};

document.getElementById('update_todo').addEventListener('click', () => {
    const id = document.getElementById('todo-id');
    const title = document.getElementById('input_todo-title');
    const category = document.getElementById('input_todo-category');
    const priority = document.getElementById('input_todo-priority');
    
    const todos = renderTodos();
    const todo = todos.find((todo) => { return todo.id === id.innerHTML; });
    todo.title = title.value;
    todo.category = category.value;
    todo.priority = priority.value;
    todo.date =  Date.now();
    todo.status = false;
    
    const idx = todos.indexOf(todo);
    todos.splice(idx, 1, todo);
    localStorage.setItem('todos',JSON.stringify(todos));
    location.reload();
    
    title.value = "";
});

// document.querySelectorAll(".remove-btn").forEach((btn) => {
//     btn.addEventListener('click', () => {
//         const id = document.getElementById('todo-id');
//         const todos = renderTodos();
//         const todo = todos.find((todo) => { return todo.id === id.innerHTML; });
//         const title = document.getElementById('input_todo-title');
    
//         const idx = todos.indexOf(todo);
//         todos.splice(idx, 1);
//         localStorage.setItem('todos',JSON.stringify(todos));
//         location.reload();
    
//         title.value = "";
//     });
// });
// console.log(document.getElementsByClassName('remove-btn'));

document.getElementById("remove_todo").addEventListener('click', () => {
    const id = document.getElementById('todo-id');
    const todos = renderTodos();
    const todo = todos.find((todo) => { return todo.id === id.innerHTML; });
    const title = document.getElementById('input_todo-title');
    
    const idx = todos.indexOf(todo);
    todos.splice(idx, 1);
    localStorage.setItem('todos',JSON.stringify(todos));
    location.reload();
    
    title.value = "";
});

// document.getElementById('search_todo').addEventListener('click', () => {
//     const searchText = document.getElementById('input_todo-search');
//     const todos = renderTodos();
//     const filteredTodos = todos.filter((todo) => {
//         if(todo.title.search(searchText)){
//             return true;
//         }
//     });
//     console.log(filteredTodos);
// });

document.getElementById('display_todo-incomplete').addEventListener('click', () => {
    document.getElementById('input_todo-search').value = "*0000#";
    location.reload();
});

document.getElementById('display_todo-complete').addEventListener('click', () => {
    document.getElementById('input_todo-search').value = "*0101#";
    location.reload();
});

document.getElementById('display_todo').addEventListener('click', () => {
    document.getElementById('input_todo-search').value = "";
    location.reload();
});

document.getElementById('input_todo-search').addEventListener('change',() =>{
    location.reload();
});