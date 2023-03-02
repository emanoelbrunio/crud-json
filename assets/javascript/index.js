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

    //h2
    const nameL = document.createElement('h2');
    nameL.innerText =`${name}`;
    nameL.classList.add('h2')
    
    const officeL = document.createElement('h2');
    officeL.innerText = `${office}`;
    officeL.classList.add('h2')

    const sallaryL = document.createElement('h2');
    sallaryL.innerText = `${sallary}`
    sallaryL.classList.add('h2')
   
    li.appendChild(nameL);
    li.appendChild(officeL);
    li.appendChild(sallaryL);
    
    const divButts = document.createElement('div');
    divButts.classList.add('itemIcons');
    
    divButts.appendChild(butEditar())
    divButts.appendChild(butExcluir(name, office, sallary, id))

    li.appendChild(divButts)
    const ul = document.querySelector('#ul');
    ul.appendChild(li);
}

//funcao para criar modal

function createModalDelete(name, office, sallary, idClass) {
    const modal = document.querySelector('.modalDelete'); 
    
    
    //textos do modal
    const nameL = document.createElement('h2');
    nameL.innerText =`${name}`;
    nameL.classList.add('h2')
    const officeL = document.createElement('h2');
    officeL.innerText = `${office}`;
    officeL.classList.add('h2')
    const sallaryL = document.createElement('h2');
    sallaryL.innerText = `R$ ${sallary}`
    sallaryL.classList.add('h2')
    
    const divLine1 = document.querySelector('.line1')

    divLine1.innerHTML = ''
    divLine1.appendChild(nameL);
    divLine1.appendChild(officeL);
    divLine1.appendChild(sallaryL);

    //btt cancelar
    const cancel = document.createElement('button');
    cancel.classList.add('cancel')
    cancel.innerHTML = 'Cancelar'

    //btt cta
    const cta = document.createElement('button');
    if(idClass === 1){
        cta.classList.add('delete')
        cta.innerText = 'Excluir definitivamente'
    }
    else {
        cta.classList.add('saveUpdate')
        cta.innerText = `Salvar alterações`
    }
    
    const divLine2 = document.querySelector('.line2');
    divLine2.innerHTML = ''
    divLine2.appendChild(cancel)
    divLine2.appendChild(cta)  

    modal.appendChild(divLine1)
    modal.appendChild(divLine2)
 
    return modal;
}

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

    const employee= new Employee(name, sallary, office, id);

    arrayEmployee.push(employee);

    createLI(name, office, sallary, id)

    saveLocal();
})


//excluir
const butExcluir = (name, office, sallary, id) => {
    const deletar = document.createElement('div');
    deletar.classList.add('deletar')

    deletar.innerHTML = `<img src="assets/imgs/delete.svg" alt="">`;

    deletar.addEventListener('click', (evento) => {
       
        let modal = createModalDelete(name, office, sallary, 1);
        modal.showModal();
        modal.classList.remove('noneModal');
        
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
const butEditar = (id) => {
    const editar = document.createElement('div');
    editar.classList.add('editar')

    editar.innerHTML = `<img src="assets/imgs/edit.svg" alt="">`;
    // deletar.innerText = "deletar"
    editar.addEventListener('click', editarTarefa)


    return editar
}

function editarTarefa (evento){
    const botaoEditar = evento.target
    const edicao = botaoEditar.parentElement.parentElement.parentElement
    //proceder edicao
}



function saveLocal () {
    //salvar no localstorange
    localStorage.setItem('ListEmployee', JSON.stringify(arrayEmployee));
}

