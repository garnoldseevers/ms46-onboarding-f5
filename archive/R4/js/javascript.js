// initialize fieldset animation variables
var current_fieldset;
var next_fieldset;
var previous_fieldset;
var left;
var opacity;
var scale;
var animating;
// initialize validation variables
var name_valid = false;
var birth_date_valid = false;
var sex_valid = false;
var retirement_age_valid = false;
var email_valid = false;
var password_valid = false;
// initialize time
var current_date = new Date();
var current_year = current_date.getFullYear();

// initialize javascript enabled state of form
$(document).ready(function(){
	$('.next, .submit').removeClass("active");
	$('.next, .submit').addClass("inactive");
});

// add event listeners
$("input[type=text]").keyup(function(){
	validate(this);
});

$("#name").keyup(function(){
	if(validate_fieldset_one()){
		activate_button("#next-one");
	}else{
		deactivate_button("#next-one");
	}
});
$('select').change(function(){
	$(this).css('background-color','#80b729');
	$(this).css('color','#ffffff');
	$(this).siblings(".select-arrow").css('border-color','#ffffff');
});
$("input[type=radio]").change(function(){
	validate(this);
	validate_gender();
});

$("input[type=date]").change(function(){
	validate_birth_date_mobile();
});

$("#birth-month, #birth-day, #birth-year").change(function(){
	validate_birth_date();
});

document.getElementById("retirement-age").onchange = function(){
	validate_retirement_age();
}

document.getElementById("email").onkeyup = function(){
	validate_email();
}

document.getElementById("password").onkeyup = function(){
	validate_password();
}

/*
**	General Validation
*/

function validate(selected_element){
	// Assign the ID of the selected element to a variable
	var selected_element_id = document.getElementById(selected_element.id);
	// Assign the value of the selected element to a variable
	var selected_element_value = sanitize_input(selected_element_id.value);
	// Assign the name of the selected element to a variable
	var selected_element_name = selected_element_id.getAttribute("name");
	// Display the selected element's validation icon
	$(selected_element).siblings(".validation-icon").css('display','block');
	// Test to see if value of selected element is empty
	if(selected_element_value == "" || selected_element_value == null){
		window[selected_element_name + "_valid"] = false;
		display_validation_messages(selected_element_id,false);
	}else{
		window[selected_element_name + "_valid"] = true;
		display_validation_messages(selected_element_id,true);
	}
}

function sanitize_input(input_value){
	// replace anything in the input_value that does not match a regular expression for a-z 0-9 spanish characters commas periods hypens underscores and spaces
    var sanitized_string = input_value.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return sanitized_string;
}

function display_validation_messages(selected_element_id, validation_result){
	if(validation_result == true){
		$(selected_element_id).siblings(".error").css('display','none');
		$(selected_element_id).siblings(".validation-message").css('display','none');
		$(selected_element_id).siblings(".additional-info").css('display','block');
		$(selected_element_id).siblings(".validation-icon").attr('src','images/validation-checkmark.png');
		$(selected_element_id).siblings(".validation-icon").css('display','block');
	}else{
		$(selected_element_id).siblings(".validation-icon").attr('src','images/validation-x.png');
		$(selected_element_id).siblings(".validation-icon").css('display','block');
		$(selected_element_id).siblings(".validation-message").css('display','block');
		$(selected_element_id).siblings(".additional-info").css('display','block');
	}
}

/*
** Validate Gender
*/

function validate_gender(){
	if(sex_valid == false){
		display_validation_messages("#sex-f-container",false);
	}else{
		display_validation_messages("#sex-f-container",true);
	}

}

/*
**	Validate Birth Date
*/

function validate_birth_date_mobile(){
	var birth_date_value = document.getElementById("birth_date_mobile").value;
	document.getElementById("birth_date").value = birth_date_value;
	if(birth_date_value != null && !isNaN(birth_date_value)){
		birth_date = new Date(birth_date_value);
		birth_year = birth_date.getFullYear();
		years_old = current_year - birth_year;
		document.getElementById("birth_age").innerHTML = years_old;
		$("#birth-date-validation-icon").css('display','block');
		$(selected_element_id).siblings(".validation-message").css('display','none');
		$("#birth-date-age-display").css('display','block');
		birth_date_valid = true;
	}else{
		$("#birth-date-validation-icon").css('display','none');
		$(selected_element_id).siblings(".validation-message").css('display','block');
		$("#birth-date-age-display").css('display','none');
		birth_date_valid = false;
	}
	validate_retirement_age();
	if(validate_fieldset_one()){
		activate_button("#next-one");
	}else{
		deactivate_button("#next-one");
	}
}

function validate_birth_date(){
	var birth_month = document.getElementById("birth-month").value;
	var birth_day = document.getElementById("birth-day").value;
	var birth_year = document.getElementById("birth-year").value;
	if(birth_month == 04 || birth_month == 06 || birth_month == 09 || birth_month == 11){
		$('#birth-day option[value=31]').removeAttr('selected');
		$('#birth-day option[value=31]').css('display','none');
	}
	if(birth_month == 02){
		$('#birth-day option[value=31]').removeAttr('selected');
		$('#birth-day option[value=31]').css('display','none');
		$('#birth-day option[value=30]').removeAttr('selected');
		$('#birth-day option[value=30]').css('display','none');
		if(!is_leap_year(birth_year)){
			$('#birth-day option[value=29]').css('display','none');
			$('#birth-day option[value=29]').removeAttr('selected');
		}else{
			$('#birth-day option[value=29]').css('display','block');
		}
	}else{
		$('#birth-day option[value=30]').css('display','block');
		$('#birth-day option[value=31]').css('display','block');
	}
	if(birth_month != null && birth_day != null && birth_year != null){
		var birth_date = birth_year + "-" + birth_month + "-" + birth_day;
		$("#birth_date").val(birth_date);
		var years_old = current_year - birth_year;
		$("#birth_age").html(years_old);
		$("#birth-date-validation-icon").css('display','block');
		$("#birth-date-age-display").css('display','block');
		birth_date_valid = true;
	}else{
		$("#birth-date-validation-icon").css('display','none');
		$("#birth-date-age-display").css('display','none');
		birth_date_valid = false;
	}
	validate_retirement_age();
	if(validate_fieldset_one()){
		activate_button("#next-one");
	}else{
		deactivate_button("#next-one");
	}
}

function is_leap_year($year)
{
  return (($year % 4 == 0) && ($year % 100 != 0)) || ($year % 400 == 0);
}

function validate_retirement_age(){
	var birth_date_value = document.getElementById("birth_date").value;
	var birth_date = new Date(birth_date_value);
	var birth_year = birth_date.getFullYear();
	var years_old = parseInt(current_year - birth_year);
	if(isNaN(years_old)){
		return false;
	}
	var retirement_age = parseInt(document.getElementById("retirement-age").value);
	if(retirement_age >= years_old){
		retirement_age_valid = true;

		display_validation_messages("retirement-age",true);
		$('#retirement-age-validation-icon').css('display','block');
		$('#retirement-age-validation-icon').attr('src','images/validation-checkmark.png');
		$('#retirement-age-display').css('display','none');
	}else{
		retirement_age_valid = false;
		years_till_retirement = years_old - retirement_age;
		$('#retirement-age-display').css('display','block');
		$('#retirement-age-validation-icon').attr('src','images/validation-x.png');
		if(years_till_retirement == 1){
			document.getElementById("years-ago").innerHTML = "1 year";
		}else{
			document.getElementById("years-ago").innerHTML = years_till_retirement + " years";
		}
	}
	if(validate_fieldset_one()){
		activate_button("#next-one");
	}else{
		deactivate_button("#next-one");
	}
}

function validate_email(){
	var email_field_value = document.getElementById("email").value;
	if(test_email_pattern(email_field_value)){
		email_valid = true;
		$("#email").siblings(".validation-icon").attr('src','images/validation-checkmark.png');
		$("#email").siblings(".validation-icon").css('display','block');
		$("#email").siblings(".validation-message").css('display','none');
		$.ajax({
	    	type: "GET",
	    	url: "https://blooom-api-staging.herokuapp.com/email_check",
	    	data: {id: email_field_value},
	    	success: function (response) {
	    	},
	    	error: function (xhr, status, error) {
	    		if(xhr.status==403) {
					$("#email").siblings(".validation-icon").attr('src','images/validation-x.png');
					$("#email").siblings(".validation-message").html("Hmm, there's already an account associated with that address");
					$("#email").siblings(".validation-message").css('display','block');
	    		}	
	    	}
	    });
  		validate_fieldset_two()
	}else{
		email_valid = false;
		$("#email").siblings(".validation-icon").attr('src','images/validation-x.png');
		$("#email").siblings(".validation-icon").css('display','block');
		$("#email").siblings(".validation-message").css('display','block');
		validate_fieldset_two()
	}
}

function test_email_pattern(email_field_value){
  	var email_regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return email_regex_pattern.test(email_field_value);
}

// Create array to contain password_message objects
var password_message = [];

// Push password_message objects into password_message array
password_message.push({
	width: "10px",
	background: "rgb(254,133,48)",
	strength_message: "too weak",
	valid: false
});
password_message.push({
	width: "25px",
	background: "rgb(255, 167, 114)",
	strength_message: "could be better",
	valid: false
});
password_message.push({
	width: "50px",
	background: "rgb(167, 205, 82)",
	strength_message: "shows potential",
	valid: true
});
password_message.push({
	width: "100px",
	background: "rgb(136, 186, 39)",
	strength_message: "well played",
	valid: true
});
password_message.push({
	width: "150px",
	background: "rgb(104, 141, 26)",
	strength_message: "wowzer",
	valid: true
});

function validate_password(){
	// assign value of password field to variable
	var password_field_value = document.getElementById('password').value;
	// pass password field value to zxcvbn function and assign result to variable
	var result = zxcvbn(password_field_value);
	// assign the value of the result's score property to a variable
	var password_strength = result.score;
	// use the password_strength variable as an index to access the appropriate object in the password_message array and apply the properties to the page display
	$("#password-strength-bar").css('width',password_message[password_strength].width);
	$("#password-strength-bar").css('background-color',password_message[password_strength].background);
	document.getElementById("password-strength-message").innerHTML = password_message[password_strength].strength_message;
	// check if the valid property of the password_message object is true
	if(password_message[password_strength].valid == true){
		// if true, hide validation message and show checkmark
		$("#password").siblings(".validation-message").css('display','none');
		$("#password").siblings(".validation-icon").css('display','block');
		$("#password").siblings(".validation-icon").attr('src',"images/validation-checkmark.png");
		// set password_valid variable to true
		password_valid = true;
	}else{
		// if true, show validation message and show x
		$("#password").siblings(".validation-message").css('display','block');
		$("#password").siblings(".validation-icon").css('display','block');
		$("#password").siblings(".validation-icon").attr('src',"images/validation-x.png");
		// set password_valid variable to false
		password_valid = false;
	}
	validate_fieldset_two()
}

function validate_fieldset_one(){
	// test to see if all field valid variables for current fieldset are true
	if(name_valid == true && birth_date_valid == true && sex_valid == true && retirement_age_valid == true){
		return true;
	}else{
		return false;
	}
}

function validate_fieldset_two(){
	// test to see if all field valid variables for current fieldset are true
	if(email_valid == true && password_valid == true){
		// change submit input attribute from button to submit
		$("#submit").attr('type','submit');
		// adjust display of submit button
		activate_button("#submit");
		return true;
	}else{
		// change submit input attribute from button to submit
		$("#submit").attr('type','button');
		// adjust display of submit button
		deactivate_button("#submit");
		return false;
	}
}

function activate_button(selected_button){
	$(selected_button).addClass("active");
	$(selected_button).removeClass("inactive");
}

function deactivate_button(selected_button){
	$(selected_button).addClass("inactive");
	$(selected_button).removeClass("active");
}

$("#next-one").click(function(){
	if(validate_fieldset_one()){
		show_next_fieldset(this);
		$("#submit").attr('type','button');
	}
});

/* 
**	Fieldset Navigation 
*/

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fieldset = $(this).parent();
	previous_fieldset = $(this).parent().prev();
	
	//de-activate current step on progress-bar
	$("#progress-bar li").eq($("fieldset").index(current_fieldset)).removeClass("active");
	
	//show the previous fieldset
	previous_fieldset.show(); 
	//hide the current fieldset with style
	current_fieldset.animate({opacity: 0}, {
		step: function(now, mx) {
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fieldset to 1 as it moves in
			opacity = 1 - now;
			current_fieldset.css({'left': left});
			previous_fieldset.css('opacity', opacity);
		}, 
		duration: 300, 
		complete: function(){
			current_fieldset.hide();
			animating = false;
		}, 
		easing: 'swing'
	});
});

$(".next").click(function(){
	if(name_valid == false){
		display_validation_messages("#name",false);
	}else{
		display_validation_messages("#name",true);
	}
	validate_gender();
	if(birth_date_valid == false){
		$("#birth_date").siblings(".validation-icon").attr('src','images/validation-x.png');
		$("#birth_date").siblings(".validation-icon").css('display','block');
		$("#birth_date").siblings(".validation-message").css('display','block');
	}else{
		$("#birth_date").siblings(".validation-icon").attr('src','images/validation-checkmark.png');
		$("#birth_date").siblings(".validation-icon").css('display','block');
		$("#birth_date").siblings(".validation-message").css('display','none');
	}
})
$(".submit").click(function(){
	if(email_valid == false){
		display_validation_messages("#email",false);
	}else{
		display_validation_messages("#email",true);
	}
	if(password_valid == false){
		display_validation_messages("#password",false);
	}else{
		display_validation_messages("#password",true);
	}
})

/*
**	Fieldset Animation
*/

function show_next_fieldset($clicked_button){
	if(animating) return false;
	animating = true;
	
	current_fieldset = $($clicked_button).parent();
	next_fieldset = $($clicked_button).parent().next();
	
	//activate next step on progress-bar using the index of next_fieldset
	$("#progress-bar li").eq($("fieldset").index(next_fieldset)).addClass("active");
	
	//show the next fieldset
	next_fieldset.show(); 
	//hide the current fieldset with style
	current_fieldset.animate({opacity: 0}, {
		step: function(now, mx) {
			left = (now * 50)+"%";
			opacity = 1 - now;
			current_fieldset.css({'transform': 'scale('+scale+')'});
			next_fieldset.css({'left': left, 'opacity': opacity});
		}, 
		duration: 300, 
		complete: function(){
			current_fieldset.hide();
			animating = false;
		}, 
		easing: 'swing'
	});
}