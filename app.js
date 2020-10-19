var saving = 0;
var list = document.getElementById('expenses');
var expenses = [];
var incomeError = document.querySelector('#incomeError');
var expenseError = document.querySelector('#expenseError');
var dateError = document.querySelector('#dateError');
var datePicker = document.querySelector('#date');
var editExpenseValue = document.querySelector('#editExpense');
var editCategory = document.querySelector('#editCategory');
var searchDate = document.querySelector('#searchDate');
var DateObj;
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime
	.timeline({ loop: true })
	.add({
		targets: '.ml2 .letter',
		scale: [ 4, 1 ],
		opacity: [ 0, 1 ],
		translateZ: 0,
		easing: 'easeOutExpo',
		duration: 950,
		delay: (el, i) => 70 * i
	})
	.add({
		targets: '.ml2',
		opacity: 0,
		duration: 1000,
		easing: 'easeOutExpo',
		delay: 1000
	});


function Expense(expense, category, date) {
	this.expense = expense;
	this.category = category;
	this.date = date;
}

function addIncome() {
	var inCome = document.getElementById('income');
	if (inCome.value !== '') {
		saving += parseInt(inCome.value);
		showIncome();
		incomeError.innerHTML = '';
	} else {
		incomeError.innerHTML = 'Enter Income Value';
		inCome.focus();
	}
}

function showIncome() {
	document.getElementById('currentIncome').innerText = 'Your Balance ' + saving;
	document.getElementById('income').value = '';
}

function addExpense() {
	var expense = document.getElementById('expense');
	var category = document.getElementById('category');
	if (datePicker.value !== '' && expense.value !== '') {
		var newExpense = new Expense(parseInt(expense.value), category.value, datePicker.value);
		expenses.push(newExpense);
		saving -= parseInt(expense.value);
		showIncome();
		renderItem();
		expenseError.innerHTML = '';
        dateError.innerHTML = '';
        datePicker.value = '';
        expense.value = '';
    } 
    else if(datePicker.value == ''){
        dateError.innerHTML = 'Please Select Date';
        datePicker.focus();
    }
    else{
        expenseError.innerHTML = 'Enter Expense Value';
        dateError.innerHTML = '';
		expense.focus();
	}
}

function renderItem() {
	var item = '';
	
	for (var i = 0; i < expenses.length; i++) {
		DateObj = expenses[i].date;
		item += `<li class='list-group-item list-group-item-action' id='${i}'>${expenses[i].expense}
        <span class="mx-3"><b>Category:</b> ${expenses[i].category}</span>
        <span class="mx-3"><b>Date:</b> ${DateObj.split('-').reverse().join('/')}</span>
            <button class='btn btn-danger default right' onclick='deleteExpense(this)'>Delete</button>
            <button class='btn btn-warning right' onclick='editExpense(this)' data-target='#exampleModal' data-toggle='modal'>Edit</button> </li>`;
	}
	list.innerHTML = item;
}

function showFilterExpense() {
	var category = document.getElementById('showExpense').value;

	var item = '';
	for (var i = 0; i < expenses.length; i++) {
		if (category === 'all') {
            item += `<li class='list-group-item list-group-item-action' id='${i}'>${expenses[i].expense}
            <span class="mx-3"><b>Category:</b> ${expenses[i].category}</span>
               <span class="mx-3"><b>Date:</b> ${DateObj.split('-').reverse().join('/')}</span>
            <button class='btn btn-danger default right' onclick='deleteExpense(this)'>Delete</button>
            <button class='btn btn-warning  right' onclick='editExpense(this)' data-target='#exampleModal' data-toggle='modal'>Edit</button> </li>`;
		} else if (category === expenses[i].category) {
            item += `<li class='list-group-item list-group-item-action' id='${i}'>${expenses[i].expense}
            <span class="mx-3"><b>Category:</b> ${expenses[i].category}</span>
           <span class="mx-3"><b>Date:</b> ${DateObj.split('-').reverse().join('/')}</span>
            <button class='btn btn-danger default right' onclick='deleteExpense(this)'>Delete</button>
            <button class='btn btn-warning  right' onclick='editExpense(this)' data-target='#exampleModal' data-toggle='modal'>Edit</button> </li>`;
		}
	}
	list.innerHTML = item;
}
function showFilterExpenseDate() {
	var item = '';
	var found = false;
	for (var i = 0; i < expenses.length; i++) {
		if (searchDate.value === expenses[i].date) {
			found = true;
            item += `<li class='list-group-item list-group-item-action' id='${i}'>${expenses[i].expense}
            <span class="mx-3"><b>Category:</b> ${expenses[i].category}</span>
            <span class="mx-3"><b>Date:</b> ${DateObj.split('-').reverse().join('/')}</span>
            <button class='btn btn-danger default right' onclick='deleteExpense(this)'>Delete</button>
            <button class='btn btn-warning  right' onclick='editExpense(this)' data-target='#exampleModal' data-toggle='modal'>Edit</button> </li>`;
		}
	}
	if (!found) {
		item = `<li class='list-group-item list-group-item-action'> No Result Found </li>`;
	}
	list.innerHTML = item;
}

editExpense = (e) => {
	var listIndex = e.parentNode;
	localStorage.setItem('id', parseInt(listIndex.id));
	var data = expenses[parseInt(listIndex.id)];
	editExpenseValue.value = parseInt(data.expense);
	var UpdateSelectedIndex = editCategory.selectedIndex;
	editCategory.selectedIndex = UpdateSelectedIndex;
};

updateExpense = () => {
	var id = localStorage.getItem('id');
	var updatedCategoryValue = editCategory.value;
	var updatedExpenseValue = editExpenseValue.value;

	localStorage.removeItem('id');
	expenses.splice(parseInt(id), 1, {
		expense: updatedExpenseValue,
		category: updatedCategoryValue,
		date: expenses[parseInt(id)].date
	});
	renderItem();
};

deleteExpense = (e) => {
	var listIndex = e.parentNode;
	listIndex.remove();
	expenses.splice(parseInt(listIndex.id), 1);
	renderItem();
};
