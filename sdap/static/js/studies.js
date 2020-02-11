$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

$(function () {

  /* Functions */
/* In case we want to limit character numbers
  var loadTableInput = function (){
    var input = $(this);
    console.log(input.val())
    if (input.val().length > 1){
        loadTable()
    }
  }
*/
  selectRows = [];
  currentPage = 1;

  var loadTable = function () {
    var form = $("#study-form")
    var type = form.attr("data-type");
    var pagination_nbr = $("#pagination-value").val()
    var search_data = form.serialize() + '&page=' + currentPage + '&type=' + type + '&pagination=' + pagination_nbr;
    $.ajax({
      url: form.attr("data-url"),
      type: 'get',
      dataType: 'json',
      data: search_data,
      success: function (data) {
        $("#table").html(data['table']);
        $(".partial_paginate").html(data['pagination']);
        $(".partial_modal").html(data['modal']);
      }
    });
  };
  // Reset pagination if search
  var search = function(){
    currentPage = 1;
    loadTable()
  }

  var paginate = function(){
    currentPage = $(this).attr("target");
    loadTable()
  }

  var select_pagination = function(){
    currentPage = 1;
    loadTable()
  }

  var goToDocuments = function () {
    var btn = $(this);
    var url = btn.attr("data-url");
    var study = btn.attr("data-object");
    var url_ref = url + "?id=" + study;
    document.location.href = url_ref;
  }

  var checkSelect = function(){
    if($('option[disabled]:selected').length == 0){
        $("#graphButton").prop('disabled', false);
    }
  }

  var graphMe = function () {
    var select = $("#document_select");
    var study_id = select.attr("study_id");
    var document_id = select.val();
    var url = $("#graphButton").attr("data-url");
    document.location.href = url + "?study_id=" + study_id + "&document_id=" + document_id;
  }

  /* Binding */
    $("#filter").on("change", "select", search);
    $("#filter").on("keyup", "input", search);
    $("#studies").on("click", ".select_study", goToDocuments);
    $("#table_analyse").on("change", "select", checkSelect);
    $("#graphButton").on("click", graphMe);
    $(".partial_paginate").on('click', ".page-action", paginate);
    $("#pagination-value").on('change', select_pagination);
});
