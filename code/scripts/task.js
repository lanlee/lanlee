//selectors
const titleInput = document.querySelector('.title_input');
const descriptionInput = document.querySelector('.description_input');
//buttons
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter_todo');

//event listeners
//todoButton.addEventListener("click", addNew)
//todoList.addEventListener("click", deleteCheck)
//filterOption.addEventListener("click", filterTodo)
//functions

function addNew() {

    var newUpdate = Bmob.Object.extend("newUpdate");
    var newUpdate = new newUpdate();
    newUpdate.set("updateTitle",titleInput.value);
    newUpdate.set("updateDescription",descriptionInput.value);
    //添加数据，第一个入口参数是null
    newUpdate.save(null, {
    success: function(newUpdate) {
    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
    alert('添加数据成功，返回的objectId是：' + newUpdate.id);
    },
    error: function(newUpdate, error) {
    // 添加失败
    alert('添加数据失败，返回错误信息：' + error.description);
    }
    });
    
    //check mark BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn')
    todoDiv.appendChild(completedButton);
    //delete BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete_btn')
    todoDiv.appendChild(deleteButton);

    //todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.innerHTML = '<div class="card card-style"> <div class="content"> <p class="font-600 mb-n1"> 更新信息卡片</p> <h1>'+titleInput.value+'</h1><p>'+descriptionInput.value+'</p></div></div>';

    if(titleInput.value === "" || descriptionInput.value === ""){
        return null
    }

    //Append to Actual LIST
    todoList.appendChild(todoDiv);

    //Clear todo input VALUE
    titleInput.value = ""
    descriptionInput.value = ""
}

//DELETE & CHECK
function deleteCheck(e) {
    const item = e.target;
    //DELETE ITEM
    if (item.classList[0] === "delete_btn") {
        const todo = item.parentElement;
        //ANIMATION TRANSITION
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    //COMPLETE ITEM
    if (item.classList[0] === "complete_btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completedItem")
    }
}
//FILTERING THE TASKS ACCORDING THE OPTION
function filterTodo(e) {
    const todos = todoList.childNodes;
    for(let i = 1; i<todos.length; i++ ){
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
        }
    }
} 

//Add complete card
/*function addCard(event) {
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.innerHTML = '<div class="card card-style"> <div class="content"> <p class="font-600 mb-n1"> Update Info Card</p> <h1>'+titleInput.value+'</h1><p>'+descriptionInput.value+'</p></div></div>';

    if(titleInput.value === "" || descriptionInput.value === ""){
        return null
    }

    //check mark BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn')
    todoDiv.appendChild(completedButton);
    //delete BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete_btn')
    todoDiv.appendChild(deleteButton);
    //Append to Actual LIST
    todoList.appendChild(todoDiv);
    //Clear todo input VALUE
    titleInput.value = ""
    descriptionInput.value = ""
}*/

/*
var newUpdate = new Bmob.newUpdate();
newUpdate.set("updateTitle",titleInput.value);
newUpdate.set("updateDescription",descriptionInput.value);
//添加数据，第一个入口参数是null
newUpdate.save(null, {
success: function(newUpdate) {
  // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
  alert('添加数据成功，返回的objectId是：' + newUpdate.id);
},
error: function(newUpdate, error) {
  // 添加失败
  alert('添加数据失败，返回错误信息：' + error.description);
}
});
*/