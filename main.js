(function () {
    'use strict'
    let done=0
    const lista=document.querySelector('.list_container')
  
    /*verificar y llenar tareas almacenadas*/
    if(localStorage.getItem('misTareas')!=null){
        const tareitas=JSON.parse(localStorage.getItem('misTareas'))
        for(let i=0;i<tareitas.length;i++){
            añadirTarea(tareitas[i])
        }
    }

    /*agregar tarea del usuario*/
    user_input.addEventListener('click',(event)=>{
        event.preventDefault()
        if(event.target.id=="addBtn"){
                if (tarea.value==''){
                    alert('no se añadió la tarea. Campo vacío')
                }else{
                    añadirTarea(tarea.value)
                }
        }

    })
    
    /*crear componente tarea*/
    function añadirTarea(nuevaTarea){
    const tareaBloque=document.createElement('div')
    const textoTarea=document.createElement('p')
    textoTarea.textContent=nuevaTarea
    textoTarea.setAttribute('id','textoTarea')
    tareaBloque.setAttribute('class','tarea-text')
    const btnEliminar=document.createElement('img')
    btnEliminar.src='./img/trashcan.svg'
    const btnEditar=document.createElement('img')
    btnEditar.src='./img/pencil.svg'
    const botones=document.createElement('div')
    botones.setAttribute('class','botones')
    btnEliminar.setAttribute('id','eliminar')
    btnEditar.setAttribute('id', 'editar')
    botones.append(btnEditar,btnEliminar)
    tareaBloque.append(textoTarea)
    tareaBloque.append(botones)
    lista.append(tareaBloque)
    tarea.value=''
    actualizar()
    }

    lista.addEventListener('click',(event)=>{
        /*Eliminar tarea*/
        if(event.target.id=="eliminar"){
            lista.removeChild(event.target.parentElement.parentElement)
            done++
            actualizar()
        }
        /*editar tarea*/
        if(event.target.id=="editar"){
            const textoTarea = event.target.parentElement.parentElement.querySelector('#textoTarea')
            const nuevoTexto = prompt('Ingresa el nuevo texto')
            if (nuevoTexto) {
                textoTarea.textContent = nuevoTexto
            }
            actualizar()
        }
    })
    
    function actualizar(){
        const tareasAlmacenadas=[]
        const pendientes=document.querySelectorAll('.tarea-text')
        estadoTarea.textContent=`Tareas pendientes ${pendientes.length} Tareas Realizadas ${done}`
        if(pendientes.length>0){
            for(let i=0;i<pendientes.length;i++){
            tareasAlmacenadas.push(pendientes[i].textContent)
            }
        }
       
        localStorage.setItem('misTareas',JSON.stringify(tareasAlmacenadas))
    }
    console.log('@ByChrisayuron')
    limpiar.addEventListener('click',()=>{
        done=0
        localStorage.clear()
        location.reload()
    })
})();

