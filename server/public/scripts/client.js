console.log('js');
// let fakeKoala = {
//   name: 'Fakey',
//   age:  1,
//   gender: 'F',
//   ready_to_transfer: true,
//   notes:  'This is fake',
// };

// Create global variables for some functions
let koalaEditID = null;
let editMode = false;

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#koalaForm').on('submit', function (event) {
    event.preventDefault();
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
  $(document).on('change', '.transferCheckbox', onReadyToTransfer );
  $(document).on('click', '#sweet', sweetA );
  $(document).on('click', '#editBtn', editKoalas);

};

function sweetA() {
  Swal.fire('Any fool can use a computer')
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

  // creating newKoala Object by accessing input fields with jQuery
  let newKoala = {
    name: $('#nameIn').val(),
    gender: $('#genderIn').val(),
    age: $('#ageIn').val(),
    ready_to_transfer: false, 
    notes: $('#notesIn').val(),
  }

  if (newKoala.name === '') {
    alert('You must enter a name')
    return;
  }

  // checks if check box is checked!!
  if ($('#readyForTransferIn').is(':checked')) {
    newKoala.ready_to_transfer = true;
  } 
  // ajax call to server to get koalas
  // sending to server as "req.body"
  $.ajax({
    method: 'POST',
    url:    '/koalas',
    data:   newKoala,
  })
  .then((response) => {
    console.log('in POST /koalas', response);
    $('.koalaInput').val('');
    $('#readyForTransferIn').prop('checked', false)
    getKoalas();
  })
  .catch((err) => {
    console.log('POST /koalas Failed!! 🤯', err);
    alert('Unable to connect to server, please try again!!');
  })
}; // End of saveKoala POST function


// Creating ajax request for deleting a Koala
function deleteKoala() {
 // Need to grab the koala ID after we render
 let koalaId = $(this).parents('tr').data('id');
 console.log('in delete Koala');

// This is sweetAlert2
// When delete button clicked it will pop out a window
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't get him back 🐨!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    // When confirmed is the result then it would run $.ajax
    // to delete the item from database
    if (result.isConfirmed) {
      // Create boiler plate ajax request to delete koala
      $.ajax({
        method: 'DELETE',
        url: `/koalas/${koalaId}`,
      })
        .then( (response) => {
          console.log('delete successful!', response);
          getKoalas();
        })
        .catch( (err) => {
          console.log('delete failed', err);
        })};
  });
} // end deleteKoala

function onReadyToTransfer() {
  console.log('in onReadyToTransfer');

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
        <td class="name">${koala.name}</td>
        <td class="age">${koala.age}</td>
        <td class="gender">${koala.gender}</td>
        <td>${checkTransferStatus(koala)}</td>
        <td class="notes">${koala.notes}</td>
        <td>
          <button class="deleteBtn">
          Delete
          </button>
        </td>
      </tr>
    `);
  }
}

// Function to check transfer status
function checkTransferStatus(koala) {
  if (koala.ready_to_transfer) {
    return '<input type="checkbox" class="transferCheckbox" checked>'
  } else {
    return '<input type="checkbox" class="transferCheckbox">'
  }
} // end checkTransferStatus

// Function to filter/search for koalas
function filterKoalas() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterField");
  filter = input.value.toUpperCase();
  table = document.getElementById("koalaTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows and hide those who don't match
  // the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1){
        tr[i].style.display = ""
      }
      else{
        tr[i].style.display = "none";
      }
    }
  }
};


function editKoalas() {
  console.log('in edit koalas');

  // // Setting variables to target editable inputs
  // koalaEditID = $(this).parents('tr').data('id');
  // let koalaName = $(this).parent().siblings('.name').text();
  // let koalaAge = $(this).parent().siblings('.age').text();
  // let koalaGender = $(this).parent().siblings('.gender').text();
  // let koalaNotes = $(this).parent().siblings('.notes').text();

  // // Toggle edit mode
  // editMode = true;

  // // Fill form with currently edited Koala information
  // $('#nameIn').val(koalaName);
  // $('#ageIn').val(koalaAge);
  // $('#genderIn').val(koalaGender);
  // $('#notesIn').val(koalaNotes);

  // Change heading from add to edit
  $('#heading').text('Editing Koala Details');

    // Append submit button to exit edit mode and return to add mode
    $('#editSection').append(`
    <button class="someBtns" id="submitBtn">
    Submit edits
    </button>
  `);

  // Append cancel button to exit edit mode and return to add mode
  $('#editSection').append(`
    <button class="someBtns" id="cancelEditBtn">
    Cancel edits
    </button>
  `);

  $('td').on('click', function() {
    var $this = $(this);
    var $input = $('<input>', {
        value: $this.text(),
        type: 'text',
        blur: function() {
          $this.text(this.value);
        },
        keyup: function(e) {
          if (e.which === 13) $input.blur();
        }
    }).appendTo( $this.empty() ).focus();
});

// Remove edit button, needs to be appended again in both the
// cancel and submit functions
$(this).remove();

};