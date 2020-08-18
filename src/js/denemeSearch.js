var id = localStorage.getItem("id", id);
var category = localStorage.getItem("category", category);
var baseurl = "https://accountancy-app-api.herokuapp.com/api/v1";


getData();
// function myfunction(val){
    // var value= document.getElementById("filter_customers").value;
    
//     console.log(val);
// }



function getData(value) {
    var url = `${baseurl}/customers/${id}`;
    //var url = `http://e3b5dab837cc.ngrok.io/api/v1/customers/${id}`;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onload = function () {


        var post = JSON.parse(this.response);
        console.log(post);
        console.log(post.data.customers);

        var array = post.data.customers;
        console.log(array);
        var customerFiltered = array.filter(category => category.whichCategory == "1");
        console.log("customerFiltered", customerFiltered);
        var supplierFiltered = array.filter(category => category.whichCategory == "0");
        console.log("supplierFiltered", supplierFiltered);
        // console.log(totalAmount);
        ul = document.createElement('ul');


        document.getElementById('rightBackground').appendChild(ul);

        let div = document.createElement('div');
            div.classList = "customers";

            ul.appendChild(div);
            div = "";
            // console.log("category", category);
        // function myfunction(val){
        //     var value = val.value;
        //     console.log(value);
        // }
        


        var value= document.getElementById("filter_customers").value;
        // var value ="";
        console.log("value : " +value);
    
        if( category == "1"){
            customerFiltered.filter((customerItem) => customerItem.customerInfo.includes(value) 
                               || customerItem.customerName.includes(value))
                               .map((item, index) =>{
                                div += `
                                <div class="customers">
                                  <button class="yeterButton" id = "${item.id}" onclick="showData(this)"><img src=" ./assets/img/info.png " width="15" height="15"></button>
                                  <p class="companyName">Şirket adı: ${item.customerName}</p>
                                  <p class="companyName">Şirket ünvanı: ${item.customerInfo}</p>
                                  <button class="deleteButton" id = "${item.id}"  onClick="deleteData(this)"><img src=" ./assets/img/delete.png " width="9" height="9"></button>
                                </div>`;
                
                                div.innerHTML += item.customerName;
                                 })
                               document.querySelector("#rightBackground").innerHTML = div;
        }else{
            supplierFiltered.filter((supplierItem) => supplierItem.customerInfo.includes(value) 
                               || supplierItem.customerName.includes(value))
                               .map((item, index) =>{
                                div += `
                                <div class="customers">
                                  <button class="yeterButton" id = "${item.id}" onclick="showData(this)"><img src=" ./assets/img/info.png " width="15" height="15"></button>
                                  <p class="companyName">Şirket adı: ${item.customerName}</p>
                                  <p class="companyName">Şirket ünvanı: ${item.customerInfo}</p>
                                  <button class="deleteButton" id = "${item.id}"  onClick="deleteData(this)"><img src=" ./assets/img/delete.png " width="9" height="9"></button>
                                </div>`;
                
                                div.innerHTML += item.customerName;
                                 })
                               document.querySelector("#rightBackground").innerHTML = div;
        }
        

        array.forEach(function (item) {
        //     let div = document.createElement('div');
        //     div.classList = "customers";

        //     ul.appendChild(div);
        //     div = "";
        //     // console.log("category", category);



        // var value= "";
        // console.log("value : " +value)

        // array.filter((array) => array.customerInfo.includes(value) 
        //                        || array.customerName.includes(value))
        //                        .map((item, index) =>{
        //                         div += `
        //                         <button class="customers" id = "${item.id}" onclick="showData(this)">
        //                             <p class="companyName">Şirket adı: ${item.customerName}</p>
        //                             <p class="companyName">Şirket ünvanı: ${item.customerInfo}</p>
                
        //                             <div class="deleteCustomer">
        //                                 <button class="deleteButton" id = "${item.id}"  onClick="deleteData(this)"><img src=" ./assets/img/delete.png " width="9" height="9"></button>
        //                             </div>
        //                         </button>`;
                
        //                         div.innerHTML += item.customerName;
        //                          })
        //                        document.querySelector("#rightBackground").innerHTML = div; 



        
         
            // // FOR LOOP
            // for (var i = 0; i < post.data.customers.length; i++) {
            //     // console.log(array[i].whichCategory);
            //     // var category = localStorage.getItem("category", category);
            //     console.log("category", category);


            //     if(post.data.customers[i].whichCategory ==  category  ){
            //         //Every buttons have own id from customers array
            //         console.log(post.data.customers[i].whichCategory);
            //     div += `
            //     <button class="customers" id = "${array[i].id}" onclick="showData(this)">
            //         <p class="companyName">Şirket adı: ${array[i].customerName}</p>
            //         <p class="companyName">Şirket ünvanı: ${array[i].customerInfo}</p>

            //         <div class="deleteCustomer">
            //             <button class="deleteButton" id = "${array[i].id}"  onClick="deleteData(this)"><img src=" ./assets/img/delete.png " width="9" height="9"></button>
            //         </div>
            //     </button>`;

            //     div.innerHTML += array[i].customerName;
            //     }

            //     document.querySelector("#rightBackground").innerHTML = div;
            // }



           

        });
        

    }
    xhr.send();
}