/*
**	Initialize
*/

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
// Assign DOM elements to variables
var birth_month_dom = document.getElementById("birth-month");
var birth_day_dom = document.getElementById("birth-day");
var birth_date_dom = document.getElementById("birth-date");
var birth_date_mobile_dom = document.getElementById("birth-date-mobile");
var birth_age_dom = document.getElementById("birth_age");
var birth_year_dom = document.getElementById("birth-year");
var retirement_age_dom = document.getElementById("retirement-age");
var years_ago_dom = document.getElementById("years-ago");
var email_dom = document.getElementById("email");
var password_dom = document.getElementById('password');
var password_strength_message_dom = document.getElementById("password-strength-message");

// initialize javascript enabled state of form
$(document).ready(function(){
	$('.next, .submit').removeClass("active");
	$('.next, .submit').addClass("inactive");
	get_dcode();
});

/*
**	DCODE
*/

// get dcode variable from query string and apply to "discount_code_id" field
function get_dcode(){
	var dcode = get_variable_from_query("dcode");
	if(dcode){
		$("discount_code_id").attr('value',dcode);
	}
}

// Parse query string
function get_variable_from_query(variable){
	var query = window.location.search.substring(1);
	var parameters = query.split("&");
	var parameters_length = parameters.length;
	for (var i = 0; i < parameters_length; i++) {
		var parameter = parameters[i].split("=");
		if(parameter[0] == variable){
			return parameter[1];
		}
	}
	return(false);
}

/* 
**	Event Listeners
*/

$("input[type=text]").keyup(function(){
	validate(this);
});

$("#name").keyup(function(){
	validate_fieldset_one();
});

$('select').change(function(){
	$(this).css('background-color','#80b729');
	$(this).css('color','#ffffff');
	$(this).siblings(".select-arrow").css('border-color','#ffffff');
});

$("input[type=radio]").change(function(){
	validate(this);
	adjust_gender_validation_messages();
});

$("#birth-date-mobile").change(function(){
	validate_birth_date_mobile();
});

$("#birth-month").change(function(){
	set_days_in_month();
});

$("#birth-year").change(function(){
	set_days_in_month();
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
    var sanitized_string = input_value.replace(/[^a-z0-9áéíóúñü@!&?~: \.,_-]/gim,"");
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

function adjust_gender_validation_messages(){
	$("#sex-f-container").siblings(".validation-icon").css('display','none');
}

/*
**	Validate Birth Date
*/

function validate_birth_date_mobile(){
	var birth_date_value = sanitize_input(birth_date_mobile_dom.value);
	birth_date_dom.value = birth_date_value;
	if(birth_date_value != null){
		birth_date = new Date(birth_date_value);
		birth_year = birth_date.getFullYear();
		years_old = current_year - birth_year;
		birth_age_dom.innerHTML = years_old;
		$('#birth-date-validation-icon').attr('src','images/validation-checkmark.png');
		$("#birth-date-validation-icon").css('display','block');
		$("#birth-date-age-display").css('display','block');
		$("#birth-date-mobile").siblings(".validation-message").css('display','none');
		$("#birth-date-validation-message").css('display','none');
		birth_date_valid = true;
	}else{
		birth_date_valid = false;
	}
	validate_retirement_age();
}

function validate_birth_date(){
	var birth_month = sanitize_input(birth_month_dom.value);
	var birth_day = sanitize_input(birth_day_dom.value);
	var birth_year = sanitize_input(birth_year_dom.value);
	if(birth_month != null && birth_month != "Month" && birth_day != null && birth_day != "Day" && birth_year != null && birth_year != "Year"){
		var birth_date = birth_year + "-" + birth_month + "-" + birth_day;
		$("#birth-date").val(birth_date);
		var years_old = current_year - birth_year;
		$("#birth_age").html(years_old);
		$("#birth-date").siblings(".validation-message").css('display','none');
		$('#birth-date-validation-icon').attr('src','images/validation-checkmark.png');
		$("#birth-date-validation-icon").css('display','block');
		$("#birth-date-age-display").css('display','block');
		birth_date_valid = true;
	}else{
		birth_date_valid = false;
	}
	validate_retirement_age();
}

function set_days_in_month(){
	var birth_month = sanitize_input(birth_month_dom.value);
	var birth_year = sanitize_input(birth_year_dom.value);
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
	}else if(birth_month == 04 || birth_month == 06 || birth_month == 09 || birth_month == 11){
		$('#birth-day option[value=31]').removeAttr('selected');
		$('#birth-day option[value=31]').css('display','none');
	}else{
		$('#birth-day option[value=30]').css('display','block');
		$('#birth-day option[value=31]').css('display','block');
	}
	
}

function is_leap_year($year){
	return (($year % 4 == 0) && ($year % 100 != 0)) || ($year % 400 == 0);
}

/*
**	Validate Retirement Age
*/

function validate_retirement_age(){
	var birth_date_value = sanitize_input(birth_date_dom.value);
	var birth_date = new Date(birth_date_value);
	var birth_year = birth_date.getFullYear();
	if(!isNaN(birth_year)){
		var years_old = parseInt(current_year - birth_year);
		var retirement_age = parseInt(sanitize_input(retirement_age_dom.value));
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
				years_ago_dom.innerHTML = "1 year";
			}else{
				years_ago_dom.innerHTML = years_till_retirement + " years";
			}
		}
	}
	validate_fieldset_one();
}

/*
**	Validate Email
*/

function validate_email(){
	var email_field_value = sanitize_input(email_dom.value);
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

/*
**	Validate Password
*/

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
	// assign value of password field to variable, we do NOT sanitize this. I am told that all characters are accepted
	var password_field_value = password_dom.value;
	// pass password field value to zxcvbn function and assign result to variable
	var result = zxcvbn(password_field_value);
	// assign the value of the result's score property to a variable
	var password_strength = result.score;
	// use the password_strength variable as an index to access the appropriate object in the password_message array and apply the properties to the page display
	$("#password-strength-bar").css('width',password_message[password_strength].width);
	$("#password-strength-bar").css('background-color',password_message[password_strength].background);
	password_strength_message_dom.innerHTML = password_message[password_strength].strength_message;
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

/*
**	Check Fieldsets for validation
*/

function validate_fieldset_one(){
	// test to see if all field valid variables for current fieldset are true
	if(name_valid == true && birth_date_valid == true && sex_valid == true && retirement_age_valid == true){
		activate_button("#next-one");
		return true;
	}else{
		deactivate_button("#next-one");
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

/* 
**	Fieldset Navigation 
*/

// Activate Navigation Buttons
function activate_button(selected_button){
	$(selected_button).addClass("active");
	$(selected_button).removeClass("inactive");
}

// Deactive Navigation Buttons
function deactivate_button(selected_button){
	$(selected_button).addClass("inactive");
	$(selected_button).removeClass("active");
}

// Ensure all fields in fieldset one are valid before proceeding to next

$("body").on('click','#next-one.active',function(){
	show_next_fieldset(this);
	$("#submit").attr('type','button');
});

$("body").on('click','#next-one.inactive',function(){
	if(name_valid == false){
		display_validation_messages("#name",false);
	}else{
		display_validation_messages("#name",true);
	}
	if(sex_valid == true){
		display_validation_messages("#sex-f-container",true);
	}else{
		display_validation_messages("#sex-f-container",false);
	}
	adjust_gender_validation_messages();
	// Display Birthdate Validation Messages for either mobile or desktop
	if(birth_date_valid == false){
		$("#birth-date-validation-icon").attr('src','images/validation-x.png');
		$("#birth-date-validation-icon").css('display','block');
		$("#birth-date-validation-message.validation-message").css('display','block');
	}else{
		$("#birth-date-validation-icon").attr('src','images/validation-checkmark.png');
		$("#birth-date-validation-icon").css('display','block');
		$("#birth-date-validation-message.validation-message").css('display','none');
	}
});

// Ensure all fields in fieldset two are valid before proceeding to next
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
});


/*
**	Fieldset Animation
*/

// show next fieldset
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

// Show previous fieldset
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