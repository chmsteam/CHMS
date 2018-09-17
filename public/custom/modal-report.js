let txtcount1;
function submitBtn(){
  if(!$('input#agree').is(':checked')){
    $('#report button[type=submit]').attr('disabled','disabled');
  }
  else if($('textarea').attr('hidden')){
    $('#report button[type=submit]').removeAttr('disabled');
  }
  else if($("textarea").val()){
    $('#report button[type=submit]').removeAttr('disabled');
  }
  else {
    $('#report button[type=submit]').attr('disabled','disabled');
  }
}

$('#myselect').on('change', function(){
  if($(this).val()=='other'){
    $('#textt').removeAttr('hidden');
  }
  else{
    $('#textt').attr('hidden','hidden');
    $('.txtcount-div').removeClass('block')
    $('.txtcount-div').addClass('block-none')
  }
  submitBtn();
})
$('input#agree').on('click', function(){
  submitBtn();
})
$('#textarea1').keyup(function(){
  clearTimeout(txtcount1);
  $('#txtcount').text(`${$(this).val().length}/150`);
  $('.txtcount-div').removeClass('block-none')
  $('.txtcount-div').addClass('block')
  txtcount1 = setTimeout(()=>{
    $('.txtcount-div').removeClass('block')
    $('.txtcount-div').addClass('block-none')
  },2000);

  submitBtn();
});
// $('#myselect').on('change', function(){
//   if($(this).val()!= 'other' && $(this).val()){
//     $('#reas').removeAttr('hidden');
//   }
//   else{
//     $('#reas').attr('hidden','hidden');
//   }
//   submitBtn();
// })