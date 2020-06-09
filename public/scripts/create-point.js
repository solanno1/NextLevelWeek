function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(city of cities){
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)    



// itens de coleta 
const itemsToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

            console.log('ITEM ID: ', itemId)


    const alreadySelected = selectItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectItems = filteredItems
    }    else   {
            selectItems.push(itemId)
        }    

         console.log('selectedItems: ', selectItems)


    collectedItems.value = selectItems
   

        // if(collectedItems.value == ""){
        //     return res.send("Erro no cadastro")
        // }

}