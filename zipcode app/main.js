// submit event
document.querySelector("#zipForm").addEventListener('submit', getLocationInfo);
document.querySelector('body').addEventListener('click', deleteLocation);

function getLocationInfo(e) {
  e.preventDefault();
  let zip = document.querySelector(".zip").value;
  console.log(zip);

  fetch(`http://api.zippopotam.us/us/${zip}`)
    .then(res => {
      if(res.status != 200){
        showIcon("remove");
        document.querySelector("#output").innerHTML = `
              <article class="message is-danger">
              <div class="message-body">Invalid Zipcode, please try again</div></article>
            `;
        throw Error(response.statusText);
      }
      else{
        showIcon("check");
       return res.json();
      }
    })
    .then(data => {
      let output = '';
      data.places.forEach(place => {
        output += `
      <article class="message is-primary">
        <div class="message-header">
          <p>Location Info</p>
          <button class="delete"></button>
        </div>
        <div class="message-body">
          <ul>
            <li><strong>City: </strong>${place["place name"]}</li>
            <li><strong>State: </strong>${place["state"]}</li>
            <li><strong>Longitude: </strong>${place["longitude"]}</li>
            <li><strong>Latitude: </strong>${place["latitude"]}</li>
          </ul>
        </div>
      </article>
    `;
      });
      document.querySelector('#output').innerHTML = output;
    })
}

function showIcon(icon) {
  // Clear icons
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}
function deleteLocation(e) {
  if (e.target.className == 'delete') {
    document.querySelector('#output').innerHTML = '';
    document.querySelector(".zip").value = '';
  }
}