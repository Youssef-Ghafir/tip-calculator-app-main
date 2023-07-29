let bill = document.getElementById('bill');
let person = document.getElementById('person')
let custom = document.getElementById('custom')
let err_select = document.getElementById('err-select');
custom.onfocus = _ => custom.value = ''
bill.onfocus = _ => bill.value = ''
person.onfocus = _ => person.value = ''
function CheckInputs(input) {
    if(Number(input) > 0 && !isNaN(Number(input))) {
        return input;
    }else {
        return false;
    }
}
let values_inpt = ['',''];
function AddClassError(el_1,el_2,etat=false) {
    if(etat) {
        el_1.classList.add('error');
        el_2.classList.add('error');
    }else {
        el_1.classList.remove('error');
        el_2.classList.remove('error');
    }
}
bill.addEventListener('blur',_ => {
    if(CheckInputs(bill.value)) {
        values_inpt[0] = CheckInputs(bill.value);
        AddClassError(bill,bill.parentElement.previousElementSibling.children[0])
        ShowResult()
    }else {
        bill.value = 0;
        AddClassError(bill,bill.parentElement.previousElementSibling.children[0],true)
    }
})
function CheckSelect() {
    let value = '';
    let box_select = document.querySelectorAll('.box_select > li')
    box_select.forEach(e => {
        if(e.classList.contains('active')) {
            value = e.getAttribute('data-value')
        }
    })
    if(CheckInputs(custom.value) && custom.value > 0 && custom.value <= 100) {
        value = CheckInputs(custom.value)
    }
   if(value != '') {
        return value
    }else {
        return false
    }
}
document.querySelectorAll('.box_select > *').forEach(el => {
    el.addEventListener('click',_ => {
        document.querySelectorAll('.box_select > *').forEach(e => e.classList.remove('active'))
        err_select.classList.remove('error')
        custom.classList.remove('error')
        el.classList.add('active')
            ShowResult();
    })
})
custom.addEventListener('blur', _ => {
    if(custom.value > 0 && custom.value <= 100) {
        err_select.classList.remove('error')
        custom.classList.remove('error')
        ShowResult()
    }else {
        err_select.classList.add('error')
        custom.classList.add('error')
    }
})
let tip = document.getElementById('tip');
let total = document.getElementById('total')
function ShowResult() {
    if(CheckSelect() && values_inpt[0] != '' && values_inpt[1] != '') {
        tip = document.getElementById('tip');
        total = document.getElementById('total')
        let total_num = ((values_inpt[0] * CheckSelect()) / 100).toFixed(2)
        let tip_num = (total_num / values_inpt[1]).toFixed(2);
        total.innerHTML = `$${total_num}`;
        tip.innerHTML = `$${tip_num}`;
        return true
    }
    return false
}
person.addEventListener('blur', _ => {
    if(CheckInputs(person.value)) {
        values_inpt[1] = CheckInputs(person.value);
        AddClassError(person,person.parentElement.previousElementSibling.children[0])
        if(!CheckSelect()) {
            err_select.textContent = 'Please Choose A Correct tip !'
            err_select.classList.add('error')
        }
        ShowResult()
    }else {
        person.value = 0;
        AddClassError(person,person.parentElement.previousElementSibling.children[0],true)
    }
})
function Reset() {
    tip.textContent = '$0.00';
    total.textContent = '$0.00';
    bill.value = 0;
    person.value = 0;
    custom.value = 0;
    AddClassError(person,person.parentElement.previousElementSibling.children[0])
    AddClassError(bill,bill.parentElement.previousElementSibling.children[0])
    err_select.classList.remove('error')
    custom.classList.remove('error')
    document.querySelectorAll('.box_select > *').forEach(el => el.classList.remove('active'))
}