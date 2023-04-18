let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let count=document.getElementById("count");
let total=document.getElementById("total");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let inputs=document.querySelectorAll(".price input");
let mood="create";
let temp;

inputs.forEach(input =>{
    input.onkeyup=function getTotal(){
        if(price.value !== ""){
            let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
            total.innerHTML=result;
            total.style.background="#040";
        }else{
            total.innerHTML="";
            total.style.background="#db1212";
        };
    };
});


let datapro=[];
if(localStorage.product !== null){
    datapro=JSON.parse(localStorage.product);
}else{
    datapro=[];
};


submit.onclick=function(){

    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value !==""&& price.value!==""&&category.value!=="" &&count.value<100){
        if(mood ==="create"){
            if(newpro.count>1){
                
                for(let i=0;i<newpro.count;i++){
                    datapro.push(newpro);
                };
                
            }else{
                datapro.push(newpro);
            };
        }else{
            datapro[temp]=newpro;
            mood="create";
            submit.textContent="Create";
            count.style.display="block";
            
            clearData();
        };

    }
    
    localStorage.setItem("product",JSON.stringify(datapro));
    

    showData();
};


function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    count.value="";
    category.value="";
    total.innerHTML="";
}

function showData(){
    
    let table="";
    for(let i=0;i<datapro.length;i++){
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updata(${i})" id="updata">Updata</button></td>
            <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML=table;
    let deleteAll=document.getElementById("deletall")
    
    if(datapro.length >0){
        deleteAll.innerHTML=`
        <button onclick="deleteall()">Delete All (${datapro.length})</button>
        `
    }else{
        deleteAll.innerHTML=""
    }
    
    
};

showData();


function deletedata(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    
    showData();
}
function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}


function updata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    count.value=datapro[i].count;
    category.value=datapro[i].category;
    total.innerHTML=datapro[i].total;
    mood="updata";
    submit.textContent="Updata";
    count.style.display="none";
    temp=i;
    scroll({
        top:0,
        behavior:"smooth"
    });
};


let searchMood="title";
function getsearchMood(id){
    let search=document.getElementById("search");
    if(id ==="by-title"){
        searchMood="title";
        search.placeholder="search by title";
    }else{
        searchMood="catecory";
        search.placeholder="search by category";
    };
    search.focus();
    search.value="";
    showData();
};

function searchData(value){
    let table=""
    if(searchMood ==="title"){
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updata(${i})" id="updata">Updata</button></td>
            <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
            </tr>
                `
            }
        }
    }else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updata(${i})" id="updata">Updata</button></td>
            <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
            </tr>
                `
            }
        }
    }
    document.getElementById("tbody").innerHTML=table;
}