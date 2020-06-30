$(document).ready(function() {
  $('#class-search-form-wrapper .search-autocomplete input').attr('placeholder', 'Accounting');
  $('#class-search-form-wrapper .search-instructor-autocomplete input').attr('placeholder', 'First name or last name');
  addBackToTop({
    diameter: 36,
    backgroundColor: '#0065bd',
    textColor: '#fff',
    showWhenScrollTopIs: 2000
});
})