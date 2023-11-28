
$(document).ready(function () {
   //Fetch all data
        loadRecords();
});

function loadRecords() {
    //Appear spinner when loading data
    $('#loadingSpinner').show();
        $.ajax({
            url: '/api/records',
            method: 'GET',
            success: function (data) {
                if (data.length === 0 || data == null) {
                    //No records, show the message and hide the table
                    $('#noRecordsMessage').show();
                    $('#recordsTable').hide();
                } else {
                    $('#noRecordsMessage').hide();
                    $('#recordsTable').show();
                    //Populate the data in the table
                    populateTable(data);
                }
            },
            error: function (error) {
                console.error('Error loading records:', error);
            },
            complete: function () {
                //Hide the spinner 
                $('#loadingSpinner').hide();
            }
        });
}

function populateTable(records) {
    var tableBody = $('#recordsTable tbody');
        tableBody.empty();

        //Append all rows data
$.each(records, function (index, record) {
    var row = $('<tr>');
    row.append('<td>' + record.id + '</td>');
    row.append('<td>' + record.name + '</td>');
    row.append('<td>' + record.activated + '</td>');
    
    // Create Delete btn
    var deleteButton = $('<button class="btn btn-primary btn-sm">Delete</button>');
    deleteButton.on('click', function () {
        openDeleteModal(record.id, record.name);
    });
    var deleteCell = $('<td>').append(deleteButton);
    row.append(deleteCell);

    // Append rows in body of table
    tableBody.append(row);
    });
}

// Modals Functions
function openModalAdd() {
    // Clear inputs
   $('#inputDefault').val('');
   $('#optionsRadios1').prop('checked', true);
   $('#optionsRadios2').prop('checked', false);
   
   // Show add record modal
   $('#addRecordModal').modal('show');
}

function openDeleteModal(recordId, recordName) {
    //Set recordName in modal
    $('#recordNameToDelete').text(recordName);

    //Show delete modal
    $('#deleteRecordModal').modal('show');

    //Like passing recordId as a data attribute on delete btn
    $('#deleteRecordBtn').data('record-id', recordId);
}

// Add & Delete Function
function deleteRecord() {
    //Get recordId from data attribute
    var recordId = $('#deleteRecordBtn').data('record-id');

    if (recordId !== undefined) {
       
        $.ajax({
            url: `/api/records/${recordId}`, 
            method: 'DELETE',
            success: function (response) {
                console.log('Record deleted successfully:', response);
                //Reload all records after deleting
                loadRecords();
                //Close delete modal
                $('#deleteRecordModal').modal('hide');
            },
            error: function (error) {
                console.error('Error deleting record:', error);
            }
        });
    }
}

function addRecord() {
    //Get values from the form modal
    var name = $('#inputDefault').val();
    var activated = $('input[name=optionsRadios]:checked').val() === 'option1';

    //New object of record data
    var newRecord = {
        id: 0,
        name: name,
        activated: activated
    };

    $.ajax({
        url: '/api/records',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newRecord),
        success: function (response) {
            console.log('Record added successfully:', response);
            //Reload all records after adding
            loadRecords();
            //Close adding modal
            $('#addRecordModal').modal('hide');
        },
        error: function (error) {
            console.error('Error adding record:', error);
        }
    });
}

// Validations
function validateNameInput(input) {
    var nameValidationError = document.getElementById('nameValidationError');

    if (input.value.length < 3 && input.value.trim() !== '') {
        nameValidationError.classList.remove('d-none');
    } else {
        nameValidationError.classList.add('d-none');
    }
}

function validateAndAddRecord() {
    var form = document.getElementById('addRecordForm');
    var nameInput = document.getElementById('inputDefault');

    if (form.checkValidity() && nameInput.value.length >= 3) {
        //Call add function after correct validation
        addRecord();
    } else {
        //Trigger Bootstrap's automatic validation styling
        form.classList.add('was-validated');
    }
}