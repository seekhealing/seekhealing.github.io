// Gauges being used on Board-of-Directors page
$(document).ready(function(){
  $(".GaugeMeter").gaugeMeter();
});

$(document).ready(function () {
  $("[rel=tooltip]").tooltip();
});

// Connection Agent Form Submission
$(function () {
    if ($("#cuForm").length) {
      $("#cuForm").submit(function() {

        var pgHistory = "&pageHistory=0&fbzx=6549222362718651000&fvv=1"

        $.ajax({
          type: 'POST',
          url: "https://docs.google.com/forms/d/e/1FAIpQLSeTtbYt0OKcqCYJqvwyQr284R_18TIXde02beSnvwATZCvxJQ/formResponse",
          data: $("#cuForm").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '') + pgHistory,
          dataType: "xml",
          complete: function() {
           $(".alert.alert-success").show();
           $(".connection-agent-form").hide();
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