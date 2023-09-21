function fillExpensesArray() {
    expensesArray = JSON.parse(localStorage.getItem("expenses"))
}

function displayTypes() {
    const typesUl = document.querySelector(".types-ul")

    let allTypesArray = []
    let typesUlInnerHTML = ``
    for (expe of expensesArray) {
        allTypesArray.includes(expe.type) ? null : allTypesArray.push(expe.type)
    }
    for (type of allTypesArray.reverse()) {
        typesUlInnerHTML += `<li class="types-li">${type}</li>`
    }

    typesUl.insertAdjacentHTML("beforeend", typesUlInnerHTML)
}

function displayExpensesArray(type) {
    const expensesUl = document.querySelector(".expenses")

    let expensesInnerHTML = ``
    let totalValue = 0
    revArr = expensesArray.reverse()

    if (type === "ALL") {
        for (expe of revArr) {
            expensesInnerHTML += `
                <li class="expense">
                    <p class="type">${expe.type}</p>
                    <p class="cost">₹ ${expe.value}</p>
                    <p class="time">DATE: ${expe.dateTime}</p>
                    <p class="unique-id">ID: ${expe.hexcode}</p>
                </li>       
            `
            totalValue += parseInt(expe.value)
        }
    }
    else {
        for (expe of revArr) {
            if (expe.type === type) {
                expensesInnerHTML += `
                <li class="expense">
                    <p class="type">${expe.type}</p>
                    <p class="cost">₹ ${expe.value}</p>
                    <p class="time">DATE: ${expe.dateTime}</p>
                    <p class="unique-id">ID: ${expe.hexcode}</p>
                </li>       
            `
            totalValue += parseInt(expe.value)
            }
        }
    }

    expensesUl.innerHTML = `
        <p class="total">Total: ₹ ${totalValue}</p>
    ` + expensesInnerHTML
}

function typeClickedFunction(event) {
    if (event.target.classList.length === 2) {
        return
    }

    typesButtons.forEach(Button => {
        Button.classList.remove("selected")
    })
    event.target.classList.add("selected")

    const type = event.target.textContent
    displayExpensesArray(type)
}

let expensesArray = []
let type = "all"

fillExpensesArray()
displayTypes()
displayExpensesArray("ALL")

const typesButtons = document.querySelectorAll(".types-li")

typesButtons.forEach(typesButton => { 
    typesButton.addEventListener("click", typeClickedFunction)
})
