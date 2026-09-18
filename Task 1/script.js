function add_task(){
    let tsk_name = document.querySelector('.txt .form-input')
    let sub = document.querySelector('.dropdown1 .form-input')
    let priority = document.querySelector('.dropdown2 .form-input')
    let date = document.querySelector('.date .form-input')

    let list = document.querySelector('.taskBody')

    let newList = `<tr class="task-card">
        <td><input type="checkbox"></td>
        <td class="tsk_name">${tsk_name.value}</td>
        <td class="tsk_sub">${sub.value}</td>
        <td class="tsk_priority"><span class="badge ${priority.value}">${priority.value}</span></td>
        <td class="tsk_deadline">${date.value}</td>
      </tr>`;

    let emptyState = document.querySelector('.emptyState')
    emptyState.style.display = 'none';

    list.insertAdjacentHTML('beforeend', newList)

    taskStats();
}

function erase(){
    let list = document.querySelector('.taskBody')
    list.innerHTML = '';

    let emptyState = document.querySelector('.emptyState')
    emptyState.style.display = 'block';

    taskStats();
}

function eraseSelected(){
    let temp = document.querySelectorAll('.taskBody input[type="checkbox"]')

    for(let i = 0; i<temp.length; i++){
        if(temp[i].checked){
            temp[i].closest('tr').remove(); // CHANGED: remove the whole row
        }
    }

    taskStats()
}

function taskStats(){
    let taskNos = document.querySelectorAll('.taskBody input[type="checkbox"]')
    let a = document.querySelector('.num1')
    a.textContent = taskNos.length
    let completed = 0

    for(let i = 0; i<taskNos.length; i++){

        taskNos[i].onchange = function(){
            taskStats()
        }

        if(taskNos[i].checked){
            completed++
        }
    }
    let b = document.querySelector('.num2')
    b.textContent = completed

    let c = document.querySelector('.num3')
    c.textContent = taskNos.length-completed

    let d = document.querySelector('.num4')
    d.textContent = taskNos.length ? ((completed/taskNos.length)*100).toFixed(0) + '%' : '0%'

    let e = document.querySelector('.progress-bar')
    e.setAttribute("value", taskNos.length ? ((completed/taskNos.length)*100).toFixed(0) : 0)
}

function search(){
    let name = document.querySelector('.search input[type="search"]')
    let tasks = document.querySelectorAll('.taskBody tr')
    for(let i = 0; i<tasks.length; i++){
        let t = tasks[i].querySelector('.tsk_name')
        if(t.textContent.toLowerCase().includes(name.value.toLowerCase())){
            tasks[i].style.display = 'table-row' // CHANGED: was 'flex'
        }
        else{
            tasks[i].style.display = 'none'
        }
    }
}

function realDate(){
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth()
    let year = today.getFullYear()

    let months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December']

    let mid = document.querySelector('.date')
    mid.textContent = `${months[month]} ${day}, ${year}`
}

function filter(){
    let f = document.querySelector('.filterList')
    let l = document.querySelectorAll('.taskBody tr')
    for(let i = 0; i<l.length; i++){
        let pr = l[i].querySelector('.tsk_priority')
        if(pr.textContent.toLocaleLowerCase().includes(f.value)){
            l[i].style.display = 'table-row' // CHANGED: was 'flex'
        }
        else{
            l[i].style.display = 'none'
        }
    }
}

let btn = document.querySelector('.addTaskBtn')
btn.addEventListener('click', add_task)

let btn1 = document.querySelector('.clearAll .control_btn')
btn1.addEventListener('click', erase)

let btn2 = document.querySelector('.clear .control_btn')
btn2.addEventListener('click', eraseSelected)

let btn3 = document.querySelector('.find .control_btn')
btn3.addEventListener('click', search)

realDate()
setInterval(realDate, 1000)

let btn4 = document.querySelector('.filterBtn .control_btn')
btn4.addEventListener('click', filter)