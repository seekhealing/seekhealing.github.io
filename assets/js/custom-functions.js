// Get Campaign progress
$(document).ready(function(){
  if ($('.progress-bar').length) {
    $.get( "https://seekhealing.kindful.com/public/api/v1/campaigns/0efd7b88-00fa-4b91-848e-629db0677a23.json", function( data ) {
      let raisedAmt = Math.round(data.campaign.total_raised_amount_in_cents / 100);
      let goalAmt = Math.round(data.campaign.goal_amount_in_cents / 100);
      let percentComplete = Math.round(raisedAmt / goalAmt);
      
      $(".label-raised").text("$" + raisedAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Raised");
      $(".label-goal").text("$" + goalAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Goal");
      $(".progress-bar").text(percentComplete + "% Complete");
      $(".progress-bar").attr({
        "style" : "width:" + percentComplete + "%",
        "aria-valuenow" : percentComplete
      });
    });
  }
});

$(document).ready(function () {
  $("[rel=tooltip]").tooltip();
});

// Connection Agent Form Submission
$(function () {
    if ($("#cuForm").length) {
      $("#cuForm").submit(function() {

        var pgHistory = "&pageHistory=0&fbzx=6549222362718651000&fvv=1";
        var url = "https://docs.google.com/forms/d/e/1FAIpQLSeTtbYt0OKcqCYJqvwyQr284R_18TIXde02beSnvwATZCvxJQ/formResponse";
        if ($("#form-identifier").val() == "volunteer") {
          url = "https://docs.google.com/forms/d/e/1FAIpQLScEc_LvhC85sTBeHLUKUlEf7BG8m-kXZxJXdj9NE5uj6jmm8g/formResponse";
          pgHistory = "&pageHistory=0,1,2,3&fbzx=6340107043479412568&fvv=1"
        }

        $.ajax({
          type: 'POST',
          url: url,
          data: $("#cuForm").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '') + pgHistory,
          dataType: "xml",
          complete: function() {
           $(".alert.alert-success").show();
           $(".connection-agent-form").hide();
           $(".form-container").hide();
          }
        });

        // prevent submitting form again
        return false;
      });

        // Make sure other is checked when text field is entered
      $(".form-control.other").on( "focus", function() {
        var grpNm = $(this).attr('name').replace(".other_option_response", "");
        document.getElementById(grpNm+'.other-option').checked = true;
      });

      // Replace the validation UI for all forms
      var forms = document.querySelectorAll( "form" );
      for ( var i = 0; i < forms.length; i++ ) {
          replaceValidationUI( forms[ i ] );
      }
    }

});

function replaceValidationUI( form ) {
    // Suppress the default bubbles
    form.addEventListener( "invalid", function( event ) {
        event.preventDefault();
    }, true );

    // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
    // form submissions by default
    form.addEventListener( "submit", function( event ) {
        if ( !this.checkValidity() ) {
            event.preventDefault();
        }
    });

    var submitButton = form.querySelector( ".submitbtn" );
    submitButton.addEventListener( "click", function( event ) {
      var invalidFields = form.querySelectorAll( ":invalid" ),
          errorMessages = form.querySelectorAll( ".error-message" ),
          radioError = false;
          radioErrorArr = [];
          parent;

        // Remove any existing messages
        $('.error-message').remove();
        $('.invalid-row').removeClass('invalid-row');

        for ( var i = 0; i < invalidFields.length; i++ ) {
          radioError = false;
          if (invalidFields[ i ].type == "radio") {
            for (var j = 0; j < radioErrorArr.length; j++) {
              if (radioErrorArr[j] == invalidFields[i].name) {
                radioError = true;
                break;
              }
            }
            radioErrorArr.push(invalidFields[i].name);
            if (!radioError) {
              parent = invalidFields[ i ].parentNode.parentNode;
              parent.insertAdjacentHTML( "beforeend", "<div class='error-message'>" + 
                  invalidFields[ i ].validationMessage +
                  "</div>" );
              $(invalidFields[ i ].parentNode.parentNode.parentNode.parentNode).addClass("invalid-row");  
              radioError = true;
            }
          } else if (invalidFields[ i ].type == "checkbox") {
            var cbx_group = $("input:checkbox[name='" + invalidFields[i].name + "']");
            if (!cbx_group.is(":checked")) {
              cbx_group.attr('required', 'required');
              for (var j = 0; j < radioErrorArr.length; j++) {
                if (radioErrorArr[j] == invalidFields[i].name) {
                  radioError = true;
                  break;
                }
              }
              radioErrorArr.push(invalidFields[i].name);
              if (!radioError) {
                parent = invalidFields[ i ].parentNode.parentNode;
                parent.insertAdjacentHTML( "beforeend", "<div class='error-message'>" + 
                    invalidFields[ i ].validationMessage +
                    "</div>" );
                $(invalidFields[ i ].parentNode.parentNode.parentNode.parentNode).addClass("invalid-row");
              }
            } else {
              cbx_group.removeAttr('required');
            }
          } else {
            parent = invalidFields[ i ].parentNode;
            parent.insertAdjacentHTML( "beforeend", "<div class='error-message'>" + 
                invalidFields[ i ].validationMessage +
                "</div>" );
            $(invalidFields[ i ].parentNode.parentNode.parentNode).addClass("invalid-row");
          }
        }

        // If there are errors, give focus to the first invalid field
        if ( invalidFields.length > 0 ) {
          invalidFields[ 0 ].focus();
        }
    });
}

$(function () {
  $('.donate-btn-group').click(function(){
    $('#donate-amount').val(($(this).val()).substr(1));
  })

  $('#holiday-donate-form').submit(function(e){
    e.preventDefault(); 
    try {
      var items = 0;
      var donation_amount = $('#donate-amount').val();
      var campaign_id = 1048136;
      
      var url = "https://seekhealing.kindful.com/widget?campaign_id=" + campaign_id;
      url += "&schedule=0" 
      url += "&success_action=GET"
      url += "&success_url=http%3A//seekhealing.org/"
      url += "&cart[desc]=Holiday Fundraiser Donation from website";
      
      if (donation_amount > 0){
        url += "&cart[items]["+items+"][amount]="+donation_amount;
        url += "&cart[items]["+items+"][desc]=Online Donation"
        url += "&cart[items]["+items+"][product_id]=online_donation"
        url += "&cart[items]["+items+"][quantity]=1";
        items ++;
      }
      if (items > 0){
        window.location.href = url;
      }else{
        alert('Please select a donation amount')
      }
    } catch (e) {
     throw new Error(e.message);
    }
    return false;   
  })
});

