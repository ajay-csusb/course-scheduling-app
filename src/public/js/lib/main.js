$(document).ready(function() {
  const searchAutocompleteSelector = $('#class-search-form-wrapper .search-autocomplete input');
  $('#class-search-form-wrapper .search-autocomplete input').attr('placeholder', 'Accounting');
  $('#class-search-form-wrapper .search-instructor-autocomplete input').attr('placeholder', 'First name or last name');
  
  $('button[type=submit]').click(function () {
    validateSubject();
  });
  
  $('button[type=reset]').click(function () {
    removeValidationMessage();
  });

  function validateSubject() {
    removeValidationMessage();
    setTimeout(function() {
      if ($('#class-search-form-wrapper .subject-validation').length !== 0) {
        $(searchAutocompleteSelector).addClass('bp3-intent-danger');
      }
    }, 100);
  }
  
  function removeValidationMessage () {
    if ($(searchAutocompleteSelector).length !== 0) {
      $(searchAutocompleteSelector).removeClass('bp3-intent-danger');
    }
  }
  
  addBackToTop({
    diameter: 36,
    backgroundColor: '#0065bd',
    textColor: '#fff',
    showWhenScrollTopIs: 2000
  });
})