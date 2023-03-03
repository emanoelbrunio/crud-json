//classe funcionario
class Employee {
    name;
    sallary;
    office;
    id;

    constructor(name, sallary, office, id) {
        this.name = name;
        this.sallary = sallary;
        this.office = office;
        this.id = id;
    }
}


//colocando valores no array
let arrayEmployee= [];
window.addEventListener('load', function(){

    if (JSON.parse(localStorage.getItem('ListEmployee')) !== null){
        arrayEmployee = [...JSON.parse(localStorage.getItem('ListEmployee'))];
        
        arrayEmployee.forEach(e => createLI(e.name, e.office, e.sallary, e.id))
    }
})


//mostra e esconde form
let disabled = false;
document.querySelector('.btt-add').onclick = function() {

    if(!disabled){
        document.querySelector('.form').classList.add('block');
        document.querySelector('.btt-add').classList.add('none');
        disabled = !disabled;
    }
    else {
        document.querySelector('.form').classList.remove('block');
        document.querySelector('.btt-add').classList.remove('none');
        disabled = !disabled;
    }
}



//função para criar componenete li
function createLI(name, office, sallary, id){
    const li = document.createElement('li')
    li.classList.add('item');
    li.id = id;
    
    //h2
    const nameL = document.createElement('h2');
    nameL.innerText =`${name}`;
    nameL.classList.add('h2')
    nameL.classList.add('n')
    
    const officeL = document.createElement('h2');
    officeL.innerText = `${office}`;
    officeL.classList.add('h2')
    officeL.classList.add('o')

    const sallaryL = document.createElement('h2');
    sallaryL.innerText = `R$ ${parseFloat(sallary).toFixed(2)}`
    sallaryL.classList.add('h2')
    sallaryL.classList.add('s')
   
    li.appendChild(nameL);
    li.appendChild(officeL);
    li.appendChild(sallaryL);
    
    const divButts = document.createElement('div');
    divButts.classList.add('itemIcons');
    
    divButts.appendChild(butEditar(name, office, sallary, id))
    divButts.appendChild(butExcluir(name, office, sallary, id))

    li.appendChild(divButts)
    const ul = document.querySelector('#ul');
    ul.appendChild(li);
}



//funcao para criar modal
function createModalDelete(name, office, sallary) {
    const modal = document.querySelector('.modalDelete'); 
    
    //textos do modal
    const nameL = document.createElement('h2');
    nameL.innerText =`${name}`;
    nameL.classList.add('h2Modal')

    const officeL = document.createElement('h2');
    officeL.innerText = `${office}`;
    officeL.classList.add('h2Modal')

    const sallaryL = document.createElement('h2');
    sallaryL.innerText = `R$ ${sallary}`
    sallaryL.classList.add('h2Modal')
    
    const divLine1 = document.querySelector('.line1')

    //para iniciar linha1 no 0, caso já tenha algo
    divLine1.innerHTML = ''
    divLine1.appendChild(nameL);
    divLine1.appendChild(officeL);
    divLine1.appendChild(sallaryL);

    //msg de confirmação
    const txt = document.createElement('h2');
    txt.classList.add('txtConfirm')
    txt.innerText = "Você realmente deseja excluir esse funcionário?"

    //btt cancelar
    const cancel = document.createElement('button');
    cancel.classList.add('cancel')
    cancel.innerText = 'Cancelar'

    //btt cta
    const cta = document.createElement('button');
    cta.classList.add('delete')
    cta.innerText = 'Excluir definitivamente'
    

    const div = document.createElement('div')
    div.classList.add('divButts');

    div.appendChild(cancel)
    div.appendChild(cta)
    
    const divLine2 = document.querySelector('.line2');
    divLine2.innerHTML = ''

    divLine2.appendChild(txt)
    divLine2.appendChild(div)

    modal.appendChild(divLine1)
    modal.appendChild(divLine2)
 
    return modal;
}



//modal de editar
function createModalEdit(name, office, sallary) {
    const modal = document.querySelector('.modalDelete'); 
    
    //textos do modal
    const nameL = document.createElement('input');
    nameL.value=`${name}`;
    nameL.classList.add('inputModal')
    nameL.classList.add('name')
    
    const officeL = document.createElement('input');
    officeL.value = `${office}`;
    officeL.classList.add('inputModal')
    officeL.classList.add('office')

    const sallaryL = document.createElement('input');
    sallaryL.value= `${sallary}`
    sallaryL.classList.add('inputModal')
    sallaryL.classList.add('sallary')
    
    const divLine1 = document.querySelector('.line1')

    divLine1.innerHTML = ''
    divLine1.appendChild(nameL);
    divLine1.appendChild(officeL);
    divLine1.appendChild(sallaryL);

    //msg de confirmação
    const txt = document.createElement('h2');
    txt.classList.add('txtConfirmEdit')
    txt.innerText = "Você realmente deseja editar esse funcionário?"

    //btt cancelar
    const cancel = document.createElement('button');
    cancel.classList.add('cancel')
    cancel.innerHTML = 'Cancelar'
    //btt cta
    const cta = document.createElement('button');
    cta.classList.add('saveEdit')
    cta.innerText = 'Salvar alterações'
    
    const div = document.createElement('div')
    div.classList.add('divButts');

    div.appendChild(cancel)
    div.appendChild(cta)
    
    const divLine2 = document.querySelector('.line2');
    divLine2.innerHTML = ''
    divLine2.appendChild(txt)

    divLine2.appendChild(div)


    modal.appendChild(divLine1)
    modal.appendChild(divLine2)
 
    return modal;
}



//funcao para gerar ID
function generateId() {
    // pegando data e hora em mls desde 01/01/1970
    const times = new Date().getTime();

    //numero aleatorio
    const random = Math.floor(Math.random() * 1000000);

    //retornando uma string
    return `${times}-${random}-${times}`;
}



//salvando o funcionario novo no array e localstorage
const buttSave = document.querySelector('#save');
buttSave.addEventListener('click', function(e) {
    e.preventDefault()
        
    const name = document.querySelector('#name').value;
    const office = document.querySelector('#office').value;
    const sallary= document.querySelector('#sallary').value;
    const id = generateId();
    
    if( name.trim().length
        && office.trim().length
        && sallary > 0
    ){   
        const employee= new Employee(name, sallary, office, id);  
        arrayEmployee.push(employee); 
        createLI(name, office, sallary, id)
        saveLocal();
    }
    else {
        alert("Preencha todos os campos corretamente antes de adicionar um funcionário!")
    }
})



//excluir
const butExcluir = (name, office, sallary, id) => {
    const deletar = document.createElement('div');
    deletar.innerHTML = `<img src="assets/imgs/delete.svg" alt="">`;

    deletar.addEventListener('click', (evento) => {

        arrayEmployee.forEach((e)=> {
            if(e.id === id){
                name = e.name;
                office = e.office;
                sallary = e.sallary;
            }
        });

        let modal = createModalDelete(name, office, sallary);
        modal.showModal();
        modal.classList.remove('noneModal');
        
        //fechar modal
        const cancel = document.querySelector('.cancel');
        cancel.addEventListener('click', function(){ 
            modal.classList.add('noneModal');
            modal.close();               
        });
        
        const cta = document.querySelector('.delete');
        cta.addEventListener('click', function(){
            modal.classList.add('noneModal');
            modal.close();
            const botaoExcluir = evento.target
            const tarefaCompleta = botaoExcluir.parentElement.parentElement.parentElement
            tarefaCompleta.remove();
            
            let newList = arrayEmployee.filter(e => e.id !== id);
            arrayEmployee = [...newList]
            saveLocal();
        });
     
        
    })

    return deletar
}



//editar
const butEditar = (name, office, sallary, id) => {
    const editar = document.createElement('div');
    editar.classList.add('editar')

    editar.innerHTML = `<img src="assets/imgs/edit.svg" alt="">`;
    
    editar.addEventListener('click', (evento) => {
        arrayEmployee.forEach((e)=> {
            if(e.id === id){
                name = e.name;
                office = e.office;
                sallary = e.sallary;
            }
        });
        
        let modal = createModalEdit(name, office, sallary);
        modal.showModal();
        modal.classList.remove('noneModal');

        //fechar modal
        const cancel = document.querySelector('.cancel');
        cancel.addEventListener('click', function(){
            modal.classList.add('noneModal');
            modal.close();               
        });

        const cta = document.querySelector('.saveEdit');
        cta.addEventListener('click', function(){
            
            let name = document.querySelector('.name').value;
            let sallary = document.querySelector('.sallary').value;
            let office = document.querySelector('.office').value;

            if( name.trim().length
                && office.trim().length
                && sallary > 0
            ) {
                modal.classList.add('noneModal');
                modal.close();

                arrayEmployee.forEach((e) => {
                    if(e.id === id){
                        e.name = name;
                        e.sallary = sallary;
                        e.office = office;                        
                    }
                })

                const li = document.getElementById(`${id}`)
                li.querySelector('.n').innerHTML = name;
                li.querySelector('.o').innerHTML = office;
                li.querySelector('.s').innerHTML = 'R$ ' + parseFloat(sallary).toFixed(2);
                        
                saveLocal();
            }
            else {
                alert("Preencha todos os campos corretamente antes de adicionar um funcionário!")
            }
           
        });
    })

    return editar
}


//para salvar no local storage
function saveLocal () {
    //salvar no localstorange
    localStorage.setItem('ListEmployee', JSON.stringify(arrayEmployee));
}


//fechando modal com esc
window.addEventListener('keydown', function(e){
    const modal = document.querySelector('dialog');

    if(modal.open){
        if(e.keyCode === 27){
            modal.classList.add('noneModal')
        }
    }
});