// var users = [

//     //BURAYA DATADAN MUSTERİLER GELECEK
//     'Goku',
//     'Naruto',
//     'Ichigo',
//     'Flash',
//     'Batman',
//     'Sherlock Holmes',
//     'Khaleesi',
//     'Steve Fox'
//   ];

//   ul = document.getElementById("customers-list");

//   var render_lists = function(lists){
//     var li = "";
//     for(index in lists){
//       li += "<li>" + lists[index] + "</li>";
//     }
//     ul.innerHTML = li;
//   }

//   render_lists(users);

//   // lets filters it
//   input = document.getElementById('filter_customers');

//   var filterUsers = function(event){
//     keyword = input.value.toLowerCase();
//     filtered_users = users.filter(function(user){
//           user = user.toLowerCase();
//          return user.indexOf(keyword) > -1; 
//     });

//     render_lists(filtered_users);
//   }

//   input.addEventListener('keyup', filterUsers);




var id = localStorage.getItem("id", id);
var category = localStorage.getItem("category", category);
var baseurl = "https://accountancy-app-api.herokuapp.com/api/v1";


getData();



function getData() {
    var url = `${baseurl}/customers/${id}`;
    //var url = `http://e3b5dab837cc.ngrok.io/api/v1/customers/${id}`;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onload = function () {


        var post = JSON.parse(this.response);
        console.log(post);
        console.log(post.data.customers);

        var array = post.data.customers;

        var customerFiltered = post.data.customers.filter((item) => item.whichCategory == 1)
        var supplierFiltered = post.data.customers.filter((item) => item.whichCategory == 0)
        console.log("customerFiltered", customerFiltered)
        // var totalAmount = post.data.userbalance.totalMoney;
        // console.log(post.data);
        // console.log(totalAmount);



        ul = document.createElement('ul');


        document.getElementById('rightBackground').appendChild(ul);

        array.forEach(function (item) {
            let div = document.createElement('div');
            div.classList = "customers";

            ul.appendChild(div);
            div = "";

         
            // FOR LOOP
            // if(category == "1") {
            //     for (var i = 0; i < customerFiltered.length; i++) {
            //         // console.log(array[i].whichCategory);
            //         // var category = localStorage.getItem("category", category);
    
    
            //             //Every buttons have own id from customers array
            //         div += `
            //         <button class="customers" id = " aaaaaa${customerFiltered[i].id}" onclick="showData(this)">
            //             <p class="companyName">Şirket adı: ${customerFiltered[i].customerName}</p>
            //             <p class="companyName">Şirket ünvanı: ${customerFiltered[i].customerInfo}</p>
    
            //             <div class="deleteCustomer">
            //                 <button class="deleteButton" id = "${customerFiltered[i].id}"  onClick="deleteData(this)"><img src=" ./assets/img/delete.png " width="9" height="9"></button>
            //             </div>
            //         </button>`;
    
            //         div.innerHTML += customerFiltered[i].customerName;
    
            //         document.querySelector("#rightBackground").innerHTML = div;
            //     }
    
            // } else {
            //     for (var i = 0; i < supplierFiltered.length; i++) {
            //         // console.log(array[i].whichCategory);
            //         // var category = localStorage.getItem("category", category);
    
    
            //             //Every buttons have own id from customers array
            //         div += `
            //         <button class="customers" id = "${supplierFiltered[i].id}" onclick="showData(this)">
            //             <p class="companyName">Şirket adı: ${supplierFiltered[i].customerName}</p>
            //             <p class="companyName">Şirket ünvanı: ${supplierFiltered[i].customerInfo}</p>
    
            //             <div class="deleteCustomer">
            //                 <button class="deleteButton" id = "${supplierFiltered[i].id}"  onClick="deleteData(this)"><img src=" ./assets/img/delete.png " width="9" height="9"></button>
            //             </div>
            //         </button>`;
    
            //         div.innerHTML += supplierFiltered[i].customerName;
    
            //         document.querySelector("#rightBackground").innerHTML = div;
            //     }
    
            // }
            
            



            userInfo = "";
            userInfo += `
            <p class="nameSurname">${post.data.fullName}</p>
            <p class="homePageCompanyName">${post.data.companyName}</p>`;
            document.querySelector("#userInfo").innerHTML = userInfo;

            topInfo = "";
            topInfo += `
            <p class="inWithKDV">KDV'li Alınan:  ${post.data.userbalance.inMoney}</p>
            <p class="amountofKDV">KDV Miktarı: ${post.data.userbalance.amountVAT}</p>
            <p class="inWithoutKDV">KDV'siz Alınan: ${post.data.userbalance.inMoneyVAT}</p>
            <p class="out">Ödenen: ${post.data.userbalance.outMoney}</p>`;
            document.querySelector("#topInfo").innerHTML = topInfo;


            totalAmount = "";
            totalAmount += `
            <p class="total">Toplam Bakiye: ${post.data.userbalance.totalMoney}</p>
            `;
            document.querySelector("#leftLittleWhite").innerHTML = totalAmount;


            localStorage.setItem('totalAmount', post.data.userbalance.totalMoney);

        });
        
        

    }
    xhr.send();
}


function showData(item) {
    var custid = item.id;
    localStorage.setItem("customerid", custid);
    window.location = "detail.html";


}
function deneme(item){
    var customerid = item.id;
    
    localStorage.setItem("customerid", customerid);
    if( confirm("silmek istediğinizden emin misiniz ?")){
        deleteData();
    }else {
        getData();
    }
}

//DELETİNG DATA

function deleteData(item) {
    //Find customer id
    // var customerid = item.id;
   var customerid = localStorage.getItem("customerid");

    // Delete POST
    var urldelete = `${baseurl}/customers/delete/${customerid}`
    var xhrdelete = new XMLHttpRequest();
    xhrdelete.open('DELETE', urldelete, true);
    xhrdelete.setRequestHeader('Content-type', 'application/json; charset=UTF-8');


    xhrdelete.onload = function () {
        var result = JSON.parse(xhrdelete.response);
        window.location.reload();
    }
    xhrdelete.send();

}


// getUser();

// function getUser() {
//     var cID = sessionStorage.getItem('cID');
//     var url = `http://192.168.1.142:3000/api/v1/customers/${id}/details/${cID}`;
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.onload = function() {
//         var post = JSON.parse(this.response);
//         console.log(post.customer);

//         div = "";
//         div += `
//         <p class="nameSurname"></p>
//         <p class="homePageCompanyName"></p>`;
//         document.querySelector("#leftInBackground").innerHTML = div;

//     }
//     xhr.send();


// }