/*jshint esversion: 6 */
 let image= [];

(() =>{
    const $employeeData = "https://randomuser.me/api/?results=12&nat=us";
    function displayEmployees(data){
       $.each(data.results, function(i, employee){
           // create div and append to DOM
        let list = document.createElement('div');
        document.getElementById("main").appendChild(list);
        list.classList.add('card');
        // create image and append to div class card
         image= document.createElement("img");
        image.src=employee.picture.thumbnail;
        image.classList.add("round");
        list.appendChild(image);
        
        //create div to hold details of employee and append to div card
        // name first last, email and city
        let detailsDiv=document.createElement("div");
        detailsDiv.classList.add("makeCol");
        list.appendChild(detailsDiv);
        //console.log(detailsDiv);

        //Capitalise name
        let name= document.createElement("p");
        let firstNameUpper= employee.name.first;
        let lastNameUpper= employee.name.last;
        

        firstNameUpper= firstNameUpper.charAt(0).toUpperCase() + firstNameUpper.slice(1);
        lastNameUpper= lastNameUpper.charAt(0).toUpperCase() + lastNameUpper.slice(1);
        let nameUpper= firstNameUpper + " " + lastNameUpper;
        name.innerText= nameUpper;
        detailsDiv.appendChild(name).classList.add("nameBold");
        //console.log(name);


        // get email and city
        let email = document.createElement("p");
        email.innerText= employee.email;
        detailsDiv.appendChild(email);
        let city = document.createElement("p");

        //capitalize city name
        city.innerText= titleCase(employee.location.city);
        detailsDiv.appendChild(city);
        emCity = employee.location.city; 
        detailsDiv += "</div>";
        list += "</div>";
        });
       
        }
//function to capitalise city name
        function titleCase(city){
           let str= city.split(' ');
           for (i=0; i< str.length; i++){
              str[i]= str[i].charAt(0).toUpperCase() + str[i].slice(1);

           }
           return str.join(' ');
        }

// get info from api
    $.getJSON($employeeData, displayEmployees);
      
})();


//listener on cards to prompt overlay
let modal = document.getElementById("modal");
let modalDetails= document.getElementById("modalDetails");
//let span = document.getElementById("close");

function moreDetails(){

}
let cardListener= document.getElementById("main");
    cardListener.addEventListener("click", (event) =>{
        modal.style.display="block";
        let employeeMore = event.target;
        moreDetails();
        modalDetails.style.display="block";
        console.log("hi");
    });

//listener on overlay close 
let span=document.getElementById("close");
span.addEventListener("click", (event)=>{
modal.style.display="none";
});
 
 

