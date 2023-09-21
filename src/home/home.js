import { format } from "date-fns"

function updateBalance() {
    localStorage.setItem("balance", balance)
}

function updateDeposit() {
    localStorage.setItem("deposits", JSON.stringify(depositsArray))
}

function updateExpense() {
    localStorage.setItem("expenses", JSON.stringify(expensesArray))
}

function checkStorage() {
    localStorage.getItem("balance") ? 
        balance = localStorage.getItem("balance") : 
        updateBalance()
    localStorage.getItem("deposits") ?
        depositsArray = JSON.parse(localStorage.getItem("deposits")) :
        updateDeposit()
    localStorage.getItem("expenses") ?
        expensesArray = JSON.parse(localStorage.getItem("expenses")) :
        updateExpense()
    updateDepositList()
    updateExpenseList()
}

function randomHexcode() {
    // Storing all letter and digit combinations
    // for html color code
    let letters = "0123456789ABCDEF";

    // HTML color code starts with #
    let color = '#';

    // Generating 6 times as HTML color code
    // consist of 6 letter or digits
    for (let i = 0; i < 6; i++)
        color += letters[(Math.floor(Math.random() * 16))];

    return color
}

function setBalance() {
    balanceElemeent.textContent = `₹ ${balance}`
}

function updateDepositList() {
    const last5Deposits = depositsArray.slice(-5, depositsArray.length).reverse()
    const depoUl = document.querySelector(".deposits ul")
    let depositInnerHTML = ``
    const dots = ".."
    for (depo of last5Deposits) {
        depositInnerHTML += `<li>${depo.type.slice(0,12) === depo.type ? depo.type : depo.type.slice(0,10) + dots} : ₹ ${depo.value}</li>`
    }
    depoUl.innerHTML = depositInnerHTML
}

function updateExpenseList() {
    const last5Expenses = expensesArray.slice(-5, expensesArray.length).reverse()
    const expenseUl = document.querySelector(".expenses ul")
    let expenseInnerHTML = ``
    const dots = ".."
    for (expe of last5Expenses) {
        expenseInnerHTML += `<li>${expe.type.slice(0,12) === expe.type ? expe.type : expe.type.slice(0,10) + dots} : ₹ ${expe.value}</li>`
    }
    expenseUl.innerHTML = expenseInnerHTML
}

function depositAction() {
    //Accept the input value
    const depositInput = document.querySelector(".deposits .form .number")
    const depositType = document.querySelector(".deposits .form .type").value
    const depositValue = parseInt(depositInput.value)

    depositsArray = JSON.parse(localStorage.getItem("deposits"))
    depositObj = {
        dateTime: format(new Date(), "do-MMM-yyyy"),
        value: depositValue,
        type: depositType,
        hexcode: randomHexcode(),
    }
    depositsArray.push(depositObj)
    updateDeposit()

    balance = localStorage.getItem("balance")
    balance = parseInt(balance) + depositValue
    updateBalance()
    setBalance()

    updateDepositList()

    depositInput.value = ""
    document.querySelector(".deposits .form .type").value = ""
}

function expenseAction() {
    const expenseInput = document.querySelector(".expenses .form .number")
    const expenseType = document.querySelector(".expenses .form .type").value
    const expenseValue = parseInt(expenseInput.value) || expenseInput.value

    if(!(expenseInput.value) || expenseValue > balance) {
        return
    }

    expensesArray = JSON.parse(localStorage.getItem("expenses"))
    expenseObj = {
        dateTime: format(new Date(), "do-MMM-yyyy"),
        value: expenseValue,
        type: expenseType,
        hexcode: randomHexcode(),
    }
    expensesArray.push(expenseObj)
    updateExpense()

    balance = localStorage.getItem("balance")
    balance = parseInt(balance) - expenseValue
    updateBalance()
    setBalance()

    updateExpenseList()

    expenseInput.value = ""
    document.querySelector(".expenses .form .type").value = ""
}

function btnClick(event) {
    const id = event.target.id
    id === "deposit" ? depositAction() : expenseAction()
}

const balanceElemeent = document.querySelector(".balance .money")
const depositButton = document.querySelector(".deposits .form .btn-add")
const expenseButton = document.querySelector(".expenses .form .btn-add")

let balance = 0;
let depositsArray = []
let expensesArray =[]

checkStorage()
setBalance()

depositButton.addEventListener("click", btnClick)
expenseButton.addEventListener("click", btnClick)
