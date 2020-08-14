var list  = [
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"7.40"},
    {"desc":"meet","amount":"1","value":"6.40"}
]

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
 
}

function setList(list){
    var table = ` <thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>`

for(var key in list){
    table +=  '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td> <Button class="btn btn-default" onclick="setUpdate('+key+')">Editar</button> | <Button onclick="deleteData('+key+')" class="btn btn-danger" >Apagar</button> </td></tr>'
}
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}


function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".",",");
    str = "R$" + str;
    return str;
}
 
function formatAmount(amount){
    return parseInt(amount);
}

function addData(){
    if(!validation()){
        return;
    }

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    if(desc == '' || amount == '' || value == ''){
        var result = document.getElementById('result')
        return result.innerHTML = "<p>Campos inválidos ou vazios</p>";
    } else {
    list.unshift({"desc":desc, "amount":amount, "value":value})
    setList(list)
    }
}

function setUpdate(id){
    console.log(id);
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';

}

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIdUpdate").innerHTML = "";
    
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount":amount, "value":value};
    resetForm();
    setList(list)

}

function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    document.getElementById("errors").style.display = "none";

    if(desc === ""){
        errors += '<p>campo descrição inválido<p>'
    }
    if(amount === ""){
        errors += '<p>campo quantidade inválido<p>'
    } else if(amount != parseInt(amount)) {
        errors += '<p>O campo quantidade não é um nº inteiro'
    } 
    if(value === "") {
        errors += '<p>campo preço inválido<p>'
    } else if(value != parseFloat(value)){
        errors += '<p>campo preço não é valor float<p>'
    } 

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "green";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";





        document.getElementById("errors").innerHTML = errors;
        return 0;
    } else {
        return 1;
    }

}

function deleteData(id) {
    if(confirm("Delete este item?")){
        if(id === list.length - 1){
            list.pop()
        } else if(id === 0) {
            list.shift()
        } else {
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);

            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
        
    }
}

function deleteList(){
    if(confirm("Delete this list?")){
        list = [];
        setList(list);

    }
}

function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
} 
initListStorage()

