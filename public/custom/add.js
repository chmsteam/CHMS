$(document).ready(function(){
    $('form#add').submit(function(s){
        s.preventDefault();
        $(function(){
                location.reload();
                }).then(
                    swal({
                        title:'Success', 
                        text:'Added', 
                        icon:'success',
                        closeOnConfirm: true}),
            $('#Add').modal('hide')
        );
    });
});
// $(document).ready(function(){
//     $('form#add').submit(function(e){
//         e.preventDefault();
//         $.ajax({
//             url: '/request_add/createlist_services/createlist',
//             method: 'post',
//             data: $('form#add').serialize(),
//             success: function(response){
//                 console.log(response);
//                 if(response == 'success'){
//                     swal({
//                         title:'Success', 
//                         text:'Added', 
//                         icon:'success',
//                         closeOnConfirm: false}
//                     ).then(function(){
//                         location.reload();
//                         })
//                     }   
//                 }
//             })
//         });
//     });