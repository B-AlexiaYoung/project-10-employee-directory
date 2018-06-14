/*jshint esversion: 6 */

// function to load cards onto DOM   MAJOR FUNCTION
let personDetails=[];
(() =>{
    const $employeeData = "https://randomuser.me/api/?results=12&nat=us";
    function displayEmployees(data){
        personDetails=data.results;
        //console.log(personDetails);

       $.each(data.results, function(i, employee){
           // create div and append to DOM
        let list = document.createElement('div');
        document.getElementById("main").appendChild(list);
        list.classList.add('card');
        list.setAttribute("data-cardnumber", i);
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
        

        
        name.innerText= capital(firstNameUpper, lastNameUpper);
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

    //search listener and function
     let search=document.getElementById("search");
         search.addEventListener("keyup",(event) =>{
             let searchTerm =search.value;
             searchTerm=searchTerm.toLowerCase();
             console.log(personDetails[0].name.first);

             for (k=0; k<personDetails.length; k++){
                 console.log(personDetails[k].name.first);
                let getlist =document.getElementsByClassName("card");
                let getCard = getlist[k].getAttribute("data-cardnumber");
                     console.log(getCard);
                     console.log(personDetails[k].login.username);
                 if(personDetails[k].name.first.indexOf(searchTerm) && personDetails[k].name.last.indexOf(searchTerm) && personDetails[k].login.username.indexOf(searchTerm)){
                    getlist[k].style.display="none";

                 }else{
                    
                    getlist[k].style.display="flex";

                 }

             } //end loop
         });  // search
    
      
})(); // displayemployees

//function to capitalise employee  name and concatenate
function capital(firstNameUpper, lastNameUpper){
    firstNameUpper= firstNameUpper.charAt(0).toUpperCase() + firstNameUpper.slice(1);
    lastNameUpper= lastNameUpper.charAt(0).toUpperCase() + lastNameUpper.slice(1);
    let nameUpper= firstNameUpper + " " + lastNameUpper;
    return nameUpper;
}//end capital


//function to capitalise city name
function titleCase(city){
    let str= city.split(' ');
    for (i=0; i< str.length; i++){
       str[i]= str[i].charAt(0).toUpperCase() + str[i].slice(1);

    }
    return str.join(' ');
 }//end titleCase
 function address(cardNum){
    let address=  personDetails[cardNum].location.street + ", " + personDetails[cardNum].location.state +" "+ personDetails[cardNum].location.postcode;
console.log(titleCase(address));
    return titleCase(address); 

}//end address

//listener on cards to prompt overlay
let modal = document.getElementById("modal");
let modalDetails= document.getElementById("modalDetails");
//let span = document.getElementById("close");

// function to display employee details in modal   MAJOR FUNCTION
function moreDetails(cardNum){
    //clear modal of children
     while (modalDetails.firstChild) {
         modalDetails.removeChild(modalDetails.firstChild);
      }
     //add new children for employee card
     let span = document.createElement('span');
     span.innerHTML="&times;";
     span.setAttribute("id","close");
     modalDetails.appendChild(span);
        let detailImage = document.createElement("img");

        detailImage.src=personDetails[cardNum].picture.thumbnail;
        detailImage.classList.add("detailRound");
        modalDetails.appendChild(detailImage);


    //insert into modal employee name
    let name= document.createElement("p");
    let firstNameUpper= personDetails[cardNum].name.first;
    let lastNameUpper= personDetails[cardNum].name.last;
    name.innerText= capital(firstNameUpper, lastNameUpper);
    modalDetails.appendChild(name).classList.add("nameBold");


    //insert into modal employee email
    let email = document.createElement("p");
        email.innerText= personDetails[cardNum].email;
        modalDetails.appendChild(email);

        //capitalize city name
        let city = document.createElement("p");

        city.innerText= titleCase(personDetails[cardNum].location.city);
        modalDetails.appendChild(city);
        let line= document.createElement("hr");
        modalDetails.appendChild(line);
     // add phone details
     let phone= document.createElement("p");
     phone.innerText= personDetails[cardNum].phone;
     modalDetails.appendChild(phone);
     let addr= document.createElement("p");
     let location= address(cardNum);
     addr.innerText = location;
     modalDetails.appendChild(addr);

     // get DOB
     let dob=document.createElement("p");
     let smDate=personDetails[cardNum].dob;

     // chop off unneeded bits  and split; then reassemble date
     smDate=smDate.slice(2, 10).split("-");
     smDate= smDate[1]+ "/"+ smDate[2] + "/" +smDate[0];
       console.log(smDate);
     dob.innerText= smDate;

    // prev and next buttons no prev on card 0 no next on card 11
     modalDetails.appendChild(dob);
     if( cardNum > 0){
        let prev=document.createElement("button");
     modalDetails.appendChild(prev);
     prev.classList.add("nav1");
     prev.innerHTML=" < prev";
      // listener on buttons
      prev.addEventListener("click",(event)=>{
        moreDetails(cardNum - 1);
     });
     }
     if(cardNum <11){
     let next=document.createElement("button");
     modalDetails.appendChild(next);
     next.classList.add("nav2");
     next.innerHTML="next >";
     // listener on buttons
     next.addEventListener("click",(event)=>{
         console.log (cardNum++);
        //  console.log("going from card " + cardNum + " to card " + cardNum++);
        moreDetails(cardNum= (cardNum ++));
     });
     }
    
    
     //listener on overlay close 
    let close =document.getElementById("close");
    close.addEventListener("click", (event)=>{
    modal.style.display="none";
    modalDetails.style.display="none";
    });

}



// function change to prev or next card when modal is open
let cardListener= document.getElementById("main");
    cardListener.addEventListener("click", (event) =>{
        modal.style.display="block";
        let emMore=$(event.target).closest(".card");
        console.log(emMore[0].getAttribute("data-cardnumber"));
        let cardNum= emMore[0].getAttribute("data-cardnumber");
        moreDetails(cardNum);
        modalDetails.style.display="block";
        // console.log("hi");



    });


 
 

