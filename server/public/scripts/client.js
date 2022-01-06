console.log('js');
// let fakeKoala = {
//   name: 'Fakey',
//   age:  1,
//   gender: 'F',
//   ready_to_transfer: true,
//   notes:  'This is fake',
// };

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      ready_to_transfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
  $(document).on('click', '.deleteBtn', deleteKoala );
  $(document).on('click', '.transferBtn', onReadyToTransfer );
};

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  }).then((res) => {
    console.log(res);
    renderKoalas(res);
  }).catch((err) => {
    console.log("error in GET /koalas", err);
  })
} // end getKoalas


function saveKoala(){
  console.log( 'in saveKoala');
  // ajax call to server to get koalas
  // sending to server as "req.body"
  $.ajax({
    method: 'POST',
    url:    '/koalas',
    // Commenting out until we're ready to create click
    // Need render function complete first
    // data:   newKoala,
  })
  .then((response) => {
    console.log('in POST /koalas', response);
  })
  .catch((err) => {
    console.log('POST /koalas Failed!! 🤯', err);
    alert('Unable to connect to server, please try again!!')
  })
}; // End of saveKoala POST function


// Creating ajax request for deleting a Koala
function deleteKoala() {
  // Need to grab the koala ID after we render
  let koalaId = $(this).parents('tr').data('id');
  console.log('in delete Koala');

  // Create boiler plate ajax request to delete koala
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`,
  })
    .then( (reponse) => {
      console.log('delete successful!', response);
      // Add refresh/render function here
    })
    .catch( (err) => {
      console.log('delete failed', err);
    })
} // end deleteKoala

function onReadyToTransfer() {
  console.log( 'in onReadyToTransfer' );

  // Pull koalaId and transfer status from table
  let koalaId = $(this).parents('tr').data('id');
  let transferStatus = $(this).parents('tr').data('ready_to_transfer');

  // Check if true/false then reassign to false/true respectively (stretch goal toggle)
  if (transferStatus) {
     transferStatus = false;
  } else {
    transferStatus = true;
  }

  // Make PUT request to /koalas/:id
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
    data: {
      ready_to_transfer: transferStatus
    }
  })
    .then( () => {
      console.log('PUT success');
      getKoalas();
    })
    .catch( err => {
      console.log('PUT failed', err);
    });
} // end onReadyToTransfer()

function renderKoalas(koalas) {
  console.log('in renderKoalas');

  // Empty the table
  $('#viewKoalas').empty();

  // Render each koala
  for (let koala of koalas) {
    $('#viewKoalas').append(`
      <tr data-id="${koala.id}" data-ready_to_transfer="${koala.ready_to_transfer}">
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button class="transferBtn">
            Ready for Transfer
          </button>
        </td>
        <td>
          <button class="deleteBtn">
          Delete
          </button>
        </td>
      </tr>
    `);

  }
}