

var saving = 0;
var list = document.getElementById("expenses");
var expenses = [];
var incomeError = document.querySelector('#incomeError')
var expenseError = document.querySelector('#expenseError')
var datePicker = document.querySelector('#date')
var modalValue = document.querySelector('#modalValue')
var searchDate = document.querySelector('#searchDate')

function Expense(expense, category, date) {
    this.expense = expense;
    this.category = category;
    this.date = date
}
function addIncome() {
    var inCome = document.getElementById("income");
    if (inCome.value !== '') {
        saving += parseInt(inCome.value)
        showIncome();
        incomeError.innerHTML = '';
    }
    else {
        incomeError.innerHTML = 'Enter Income Value';
        inCome.focus();
    }

}

function showIncome() {
    document.getElementById("currentIncome").innerText = "Saving " + saving;
    document.getElementById("income").value = '';
}

function addExpense() {
    var expense = document.getElementById("expense");
    var category = document.getElementById("category");
    if (datePicker.value !== '' && expense.value !== '') {
        var newExpense = new Expense(parseInt(expense.value), category.value, datePicker.value)
        expenses.push(newExpense)
        console.log(newExpense)
        saving -= parseInt(expense.value)
        showIncome()
        renderItem()
        expenseError.innerHTML = '';
    }
    else {
        expenseError.innerHTML = 'Enter Expense Value';
        expense.focus()
    }
    expense.value = '';
}

function renderItem() {
    var item = "";

    for (var i = 0; i < expenses.length; i++) {
        var li = document.createElement('li')
        var deleteButton = document.createElement('button')
        var editButton = document.createElement('button')
        var span = document.createElement('span')
        li.setAttribute('class', 'list-group-item list-group-item-action')

        deleteButton.setAttribute('class', 'btn btn-danger right')
        deleteButton.setAttribute('onclick', 'deleteTodo(this)')
        deleteButton.appendChild(document.createTextNode('Delete'))

        editButton.setAttribute('class', 'btn btn-warning default right')
        editButton.setAttribute('onclick', 'editTodo(this)')
        editButton.setAttribute('data-toggle', 'modal')
        editButton.setAttribute('data-target', '#exampleModal')

        editButton.appendChild(document.createTextNode('Edit'))
        li.appendChild(document.createTextNode(`${expenses[i].expense} - ${expenses[i].category}`))
        span.appendChild(document.createTextNode(`Date : ${expenses[i].date}`))
        li.appendChild(span)
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        list.appendChild(li)
    }
}

function showFilterExpense() {
    var category = document.getElementById("showExpense").value;

    var item = "";
    for (var i = 0; i < expenses.length; i++) {
        if (category === "all") {
            item += "<li class='list-group-item list-group-item-action'>" + expenses[i].expense + " - " + expenses[i].category + "</li>"
        } else if (category === expenses[i].category) {
            item += "<li class='list-group-item list-group-item-action'>" + expenses[i].expense + " - " + expenses[i].category + "</li>"
        }
    }
    list.innerHTML = item
}
function showFilterExpenseDate() {
    var item = "";
    var found = false;
    for (var i = 0; i < expenses.length; i++) {
        if (searchDate.value === expenses[i].date) {
            found = true;
            item += "<li class='list-group-item list-group-item-action'>" + expenses[i].expense + " - " + expenses[i].category + "</li>"
        }
    }
    if (!found) {
        item = `<li class='list-group-item list-group-item-action'> No Result Found </li>`;
    }
    console.log(item)
    console.log(searchDate.value,  ' = searchDate.value ')
    list.innerHTML = item
}

const editTodo = (e) => {
    // modalValue.value
    console.log(e.parentNode.firstChild.nodeValue)
}
deleteTodo = (e) => {
    e.parentNode.remove();
}
// editTodo = (e) => {
//     var updateTodoValue = document.getElementById('updateTodoValue')
//     updateTodoValue.value = e.parentNode.firstChild.nodeValue
//     localStorage.setItem('id', e.parentNode.id);
// }
updatetodo = () => {
    var id = localStorage.getItem('id');
    document.getElementById(id).firstChild.nodeValue = updateTodoValue.value;
    document.getElementById(id).firstChild.nodeValue.style.color = 'green';
    localStorage.removeItem('id')
}