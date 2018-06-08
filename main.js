/*jshint esversion: 6 */


(() =>{
    const $employeeData = "https://randomuser.me/api/?results=12&nat=us";
    function displayEmployees(data){
       $.each(data.results, function(i, employee){
           // create div and append to DOM
        let list = document.createElement('div');
        document.body.appendChild(list);
        list.classList.add('card');
        // create image and append to div class card
        let image= document.createElement("img");
        image.src=employee.picture.thumbnail;
        image.classList.add("round");
        list.appendChild(image);
        console.log(image);
        //create div to hold details of employee and append to div card
        // name first last, email and city
        let detailsDiv=document.createElement("div");
        detailsDiv.classList.add("makeCol");
        list.appendChild(detailsDiv);
        console.log(detailsDiv);
        let name= document.createElement("p");
        nameUpper= String(employee.name.first + " " + employee.name.last);
        console.log(nameUpper);

        //nameUpper= nameUpper.charAt(0).toUpperCase() + string.slice(1);
        name.innerText=nameUpper;
        let email = document.createElement("p");
        email.innerText= employee.email;
        detailsDiv.appendChild(email);
        let city = document.createElement("p");
        city.innerText=employee.location.city;
        detailsDiv.appendChild(city);
        //emEmail = employee.email; 
        emCity = employee.location.city; 
        detailsDiv += "</div>";
        list += "</div>";
        });
       
        }

    $.getJSON($employeeData, displayEmployees);
      
})();