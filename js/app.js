let todos = renderTodos();

//Get input from search field
const searchText = document.getElementById('input_todo-search');
if(searchText.value === ""){
    renderTable(todos);
}else if(searchText.value === "*0000#"){
    const incompleteTodos = todos.filter((todo) => {
        if(todo.status === false){
            return true;
        }
    });
    renderTable(incompleteTodos);
    searchText.value = "";
}else if(searchText.value === "*0101#"){
    const completeTodos = todos.filter((todo) => {
        if(todo.status === true){
            return true;
        }
    });
    renderTable(completeTodos);
    searchText.value = "";
}else{
    //search using regular expression
    const filteredTodos = todos.filter((todo) => {
        // console.log(searchText.value.toLowerCase());
        // console.log(searchText.value);
        searchRegex = new RegExp(searchText.value,"i");
        if(searchRegex.exec(todo.title)){
            return true;
        }
    });
    renderTable(filteredTodos);
}