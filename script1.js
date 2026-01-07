document.addEventListener('DOMContentLoaded',() => {
    let todoInput = document.getElementById("todoInput");
let Addbutton =document.getElementById("addTaskBtn");
let todoList = document.getElementById("todoList");

let tasks = JSON.parse(localStorage.getItem("task")) || [];
tasks.forEach((task) => renderTask(task));

Addbutton.addEventListener('click',() => {
    const taskText = todoInput.value.trim();
    if(taskText === "") return ;

    const newTask = {
        id : Date.now(),
        text : taskText,
        complete : false
    }

    tasks.push(newTask);
    saveTask(); 
    renderTask(newTask);
    todoInput.value = ""; // clean input 
    console.log(tasks)

})
 
function renderTask(task){
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.completed) li.classList.add("completed")
    li.innerHTML = `<span> ${task.text}</span>
                 <button> Done </button> `;
    li.addEventListener("click",(e)=>{
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle('completed');
        saveTask();
    })

    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // prevent event bubbling
        tasks = tasks.filter((t)=> t.id !== task.id);
        li.remove;
        saveTask();
        window.location.reload();
    })
    todoList.appendChild(li);

}

function saveTask(){
    localStorage.setItem("task" , JSON.stringify(tasks))
}
})