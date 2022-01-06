console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  onReadyToTransfer();
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
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  }).then((res) => {
    console.log(res);
    //********************************** make a new render koalas function and call it here
  }).catch((err) => {
    console.log("error in GET /koalas", err);
  })
} // end getKoalas


function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala);
  // ajax call to server to get koalas

}

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
}

  // sending to server as "req.body"
  $.ajax({
    method: 'POST',
    url:    '/koalas',
    data:   newKoala,
  })
  .then((response) => {
    console.log('in POST /koalas', response);
    
  })
  .catch((err) => {
    console.log('POST /koalas Failed!! 🤯', err);
    alert('Unable to connect to server, please try again!!')
  })
}; // End of saveKoala POST function

