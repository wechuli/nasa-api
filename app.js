const nasaKey = "ouPgFKGYFsg9o2XW5Y6msf7LVymwJYVeWnGnBJE1"; //get your own if you are another person who bumped into this simple appplication :)

//Get references to items on the DOM
const inputField = document.getElementById("date");
// const btn = document.getElementById("searchButton");
const display = document.querySelector(".nasacontent");

//Attach event listeners to items on the DOM
// btn.addEventListener("click", displayContent);
inputField.addEventListener("input", displayContent);

function displayContent() {
  const response = new fetchData();
  date = inputField.value;

  //console.log(inputField.value);
  response.getData(date).then(data => {
    let output = "";
    console.log(data);
    if(data.code){
        output = `
        <h2>Sorry, can't fetch that</h2>
       <p>${data.msg}</p>
        `; 
    }else{
        if (data.media_type === "image") {
            output = `
              <h2>${data.title}</h2>
              <div class="row">
                  <div class="col-md-6 col-sm-12">
                  <img src="${data.url}" class="img-fluid" alt="${data.title}">
                  </div>
          
                  <div class="col-md-6 col-sm-12"
                      <p>${data.explanation}</p>
                  </div>
          
          
              </div>
              `;
          } else {
            output = `
              <h2>${data.title}</h2>
              <div class="row">
                  <div class="col-md-6 col-sm-12">
                  <embed width="420" height="315"
                  src="${data.url}">
                  </div>
          
                  <div class="col-md-6 col-sm-12">
                      <p class="para">${data.explanation}</p>
                  </div>
          
          
              </div>
              `;
          }
    }
    

    display.innerHTML = output;
    console.log(output);
  });
}

//define class that will house methods for fetching data
class fetchData {
  async getData(date) {
    const data = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${date}`
    );
    const response = await data.json();

    return response;
  }
}


