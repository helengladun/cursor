$(document).ready(function(){

  $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      }
  );

  jQuery.validator.addMethod("notEqualTo", function(v, e, p) {
    return this.optional(e) || v != p;
  }, "Please specify a different value");

  $(".form-create-casino").validate({
    rules: {
      cashNumber: {
        required: true,
        minlength: 4,
        digits: true,
        notEqualTo: 0
      },
      quantityNumber: {
        required: true,
        minlength: 1,
        digits: true,
        notEqualTo: 0
      }
    },
    messages: {
      cashNumber:{
        required: "Enter a balance number",
        minlength: "Enter at least 4 digits",
        digits: "You can enter only digits",
        notEqualTo: "You can't enter zero"
      },
      quantityNumber:{
        required: "Enter a quantity of slot machines",
        minlength: "Enter at least 1 digit",
        digits: "You can enter only digits",
        notEqualTo: "You can't enter zero"
      }
    },
    errorElement : 'div',
    errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

  $('.collapsible').collapsible();

  $('#create-casino-modal').modal({
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '4%',
    endingTop: '10%'
  });

  $('#create-casino-btn').click(function() {
    if ($(".form-create-casino").valid()) {

      var cash = $('#create-casino-modal .form-create-casino input[name="cashNumber"]').val();
      var quantity = $('#create-casino-modal .form-create-casino input[name="quantityNumber"]').val();

      $('#create-casino-modal').modal('close');
      casino = new Casino(quantity, cash);

      if (casino instanceof Casino && casino.getSlotMachineArr().length > 0) {
        changeBalanceAndQuant(casino);
        $('#opened-casino-block').removeClass('hidden');
        $('#opened-casino-block').addClass('visible');
        $("html, body").delay(1000).animate({
          scrollTop:  $('#opened-casino-block').position().top - window.pageYOffset
        }, 2000);
        setTimeout(function(){
          $('#create-casino-block').removeClass('visible');
          $('#create-casino-block').addClass('hidden');
        }, 3000);
      } else {
        alert ('Incorrect data, you should have more money for the quantity of machines you wish, sorry!');
      }
    }
  })
});

