document.addEventListener("DOMContentLoaded",() => {
    const expenseForm = document.getElementById("expense-form")
    const expenseNameInput = document.getElementById("expense-name")
    const expenseAmountInput = document.getElementById("expense-amount")
    const expenseList = document.getElementById("expense-list")
    const totalAmountDisplay = document.getElementById("total-amount")

let expenses = JSON.parse(localStorage.getItem('expenses'))|| [];
let totalAmount = calTotal();
renderExpenses();

expenseForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if(name !== "" && !isNaN(amount) && amount > 0){
        const newExpence = {
            id: Date.now(),
            name : name ,
            amount : amount
        };

        expenses.push(newExpence);
        saveExpenceToLocal();
        renderExpenses();
        updateTotal();
        
        //clear input 
        expenseNameInput.value = "";
        expenseAmountInput.value = "";

    };
});

expenseList.addEventListener("click",(e) => {
    if(e.target.tagName === "BUTTON"){
        const expenceId = parseInt(e.target.getAttribute("data-id"));
        expenses = expenses.filter(expense => expense.id !== expenceId );

        saveExpenceToLocal();
        renderExpenses();
        updateTotal();
    };

});

function renderExpenses (){
    expenseList.innerHTML = "";
    expenses.forEach(expence => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${expence.name} - $${expence.amount} 
        <button data-id="${expence.id}"> Delete </button>
        `;
        expenseList.appendChild(li);
    });    
};
function calTotal(){
    return expenses.reduce((sum ,expense) => sum + expense.amount, 0)
};

function saveExpenceToLocal(){
    localStorage.setItem('expenses',JSON.stringify(expenses));
};

function updateTotal(){
    totalAmount = calTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);

}


});