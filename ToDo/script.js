let form=document.getElementById('form');
let msg=document.getElementById('msg');
let textInput=document.getElementById('input-text');
let dateInput=document.getElementById('DD-Date');
let textarea=document.getElementById('Desc-data');
let tasks=document.getElementById('tasks');
let add=document.getElementById('add');
let close=document.getElementById('close');

let bring_form=document.querySelector('#addNew');
let form_display=document.querySelector('.form-class');
let close_form=document.querySelector('.del');
//Form in out
add.onclick=()=>{
    window.location.reload();
}
bring_form.onclick=()=>{
    form_display.classList.add('active');
}
close_form.onclick=()=>{
    form_display.classList.remove('active');
}
close.onclick=()=>{
    form_display.classList.remove('active');
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation= () =>{
    if(textInput.value===""){
        console.log("failure");
        msg.innerHTML="Task cannot be left blank";
    }
    else{
        console.log("success");
        msg.innerHTML="";
        acceptData();
        createTasks();
        clearAll();
    }
}

let data=[];

let acceptData = () => {
    data.push({
        text:textInput.value,
        date:dateInput.value,
        desc:textarea.value,
    });


    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
};


let clearAll=()=>{
    textInput.value="";
    dateInput.value="";
    textarea.value="";
}

let createTasks=()=>{
    tasks.innerHTML="";
    data.map((x,y)=>{
        return (tasks.innerHTML+=`
        <div id=${y}>
            <span class="task-data">${x.text}</span>
            <span class="task-date">${x.date}</span>
            <p class="task-desc">${x.desc}</p>

            <span class="options">
                <i class="fa-solid fa-pen-to-square edit" onclick="editTask(this)" style="color: #101114;"></i>
                <i class="fa-solid fa-trash del" onclick="DelTask(this);createTasks()" style="color: #ff0000;"></i>
            </span>
            </div>        
        `)
    });
    clearAll();
};

let DelTask = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice( e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
}

let editTask = (e) =>{

    let selectedTask=e.parentElement.parentElement;
    textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
    form_display.classList.add('active');

    DelTask(e);
}

(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
    // window.location.reload();
})();
