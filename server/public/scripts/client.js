console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  // Calling deleteKoala to show that it console logs and works
  deleteKoala();

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
    saveKoala( koalaToSend );
  }); 
};

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

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas

}

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
    .then( () => {
      console.log('delete successful!');
      // Add refresh/render function here
      res.sendStatus(200);
    })
    .catch( (err) => {
      console.log('delete failed', err);
      res.sendStatus(500);
      
    })
} // end deleteKoala
