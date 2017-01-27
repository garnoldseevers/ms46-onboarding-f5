// initialize variables
var current_fieldset;
var next_fieldset;
var previous_fieldset;
var left;
var opacity;
var scale;
var animating;
// initialize validation variables
$name_valid = false;
$birth_date_valid = false;
$sex_valid = false;
$retirement_age_valid = false;
$email_valid = false;
$password_valid = false;

// Create an array of password messages
var password_message = [];
// Push objects into password array to store settings
password_message.push({
	width: "10px",
	background: "rgb(254,133,48)",
	strength_message: "too weak",
	validation_message: "block",
	validation_icon: "validation-x.png",
	valid: false
});
password_message.push({
	width: "25px",
	background: "rgb(255, 167, 114)",
	strength_message: "could be better",
	validation_message: "block",
	validation_icon: "validation-x.png",
	valid: false
});
password_message.push({
	width: "50px",
	background: "rgb(167, 205, 82)",
	strength_message: "shows potential",
	validation_message: "none",
	validation_icon: "validation-checkmark.png",		
	valid: true
});
password_message.push({
	width: "100px",
	background: "rgb(136, 186, 39)",
	strength_message: "well played",
	validation_message: "none",
	validation_icon: "validation-checkmark.png",	
	valid: true
});
password_message.push({
	width: "150px",
	background: "rgb(104, 141, 26)",
	strength_message: "wowzer",
	validation_message: "none",
	validation_icon: "validation-checkmark.png",	
	valid: true
});

$(document).ready(function(){
	$('.next, .submit').removeClass("active");
	$('.next, .submit').addClass("inactive");
});

$("input[type=text]").keyup(function(){
	validate(this);
});

$("input[type=radio]").change(function(){
	validate(this);
});

$("#birth-month, #birth-day, #birth-year").change(function(){
	validate_birth_date();
});

$("#retirement-age").change(function(){
	validate_retirement_age();
});

$("#email").keyup(function(){
	validate_email();
});

$("#password").keyup(function(){
	validate_password(this);
});


function validate($selected_element){
	$value = $($selected_element).val();
	if($value != ""){
		$this_name = $($selected_element).attr("name");
		window["$" + $this_name + "_valid"] = true;
		$($selected_element).siblings(".validation-icon").css('display','block');
	}else{
		window["$" + $this_name + "_valid"] = false;
	}
	if(validate_fieldset_one()){
		activate_button("#next-one");
	}
}

function validate_birth_date(){
	$birth_month = $('#birth-month').val();
	$birth_day = $('#birth-day').val();
	$birth_year = $('#birth-year').val();
	if($birth_month == 04 || $birth_month == 06 || $birth_month == 09 || $birth_month == 11){
		$('#birth-day option[value=31]').removeAttr('selected');
		$('#birth-day option[value=31]').css('display','none');
	}
	if($birth_month == 02){
		$('#birth-day option[value=31]').removeAttr('selected');
		$('#birth-day option[value=31]').css('display','none');
		$('#birth-day option[value=30]').removeAttr('selected');
		$('#birth-day option[value=30]').css('display','none');
		if(!is_leap_year($birth_year)){
			$('#birth-day option[value=29]').css('display','none');
			$('#birth-day option[value=29]').removeAttr('selected');
		}else{
			$('#birth-day option[value=29]').css('display','block');
		}
	}else{
		$('#birth-day option[value=30]').css('display','block');
		$('#birth-day option[value=31]').css('display','block');
	}
	if($birth_month != null && $birth_day != null && $birth_year != null){
		$birth_date = $birth_year + "-" + $birth_month + "-" + $birth_day;
		$("#birth_date").val($birth_date);
		$current_date = new Date();
		$current_year = $current_date.getFullYear();
		$years_old = $current_year - $birth_year;
		$("#birth_age").html($years_old);
		$("#birth-date-validation-icon").css('display','block');
		$("#birth-date-validation-message").css('display','block');
		$birth_date_valid = true;
	}else{
		$("#birth-date-validation-icon").css('display','none');
		$("#birth-date-validation-message").css('display','none');
		$birth_date_valid = false;
	}
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
	$birth_year = $('#birth-year').val();
	$current_year = $current_date.getFullYear();
	$years_old = parseInt($current_year - $birth_year);
	$retirement_age = parseInt($('#retirement-age').val());
	if($retirement_age >= $years_old){
		$retirement_age_valid = true;
		$('#retirement-age-validation-icon').css('display','block');
		$('#retirement-age-validation-message').css('display','none');
	}else{
		$years_till_retirement = $years_old - $retirement_age;
		$retirement_age_valid = false;
		$('#retirement-age-validation-message').css('display','block');
		$('#retirement-age-validation-icon').css('display','none');
		if($years_till_retirement == 1){
			$('#retirement-age-validation-message .validation-callout').html('1 year');
		}else{
			$('#retirement-age-validation-message .validation-callout').html($years_till_retirement + ' years');
		}
	}
	if(validate_fieldset_two()){
		activate_button("#next-two");
	}else{
		deactivate_button("#next-two");
	}
}

function validate_email(){
	$email = $("#email").val();
	if(regex_email($email)){
		$email_valid = true;
		$('#email-validation-icon').css('display','block');
  		validate_fieldset_three()
	}else{
		$email_valid = false;
		$('#email-validation-icon').css('display','none');
		validate_fieldset_three()
	}
}


function validate_password(){
	var password_field = document.getElementById('password');
	var password_field_value = password_field.value;
	var result = zxcvbn(password_field_value);
	var password_strength = result.score;
	// Set display of password message by accesing object values with password strength as index
	$("#password-strength-bar").css('width',password_message[password_strength].width);
	$("#password-strength-bar").css('background-color',password_message[password_strength].background);
	$("#password-strength-message").html(password_message[password_strength].strength_message);
	$("#password-validation-message").css('display',password_message[password_strength].validation_message);
	$("#password").siblings(".validation-icon").attr('src',password_message[password_strength].validation_icon);
	$password_valid = password_message[password_strength].valid;
	validate_fieldset_three()
}


function regex_email($email_to_test){
  	var $email_regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return $email_regex_pattern.test($email_to_test);
}


function validate_fieldset_one(){
	if($name_valid == true && $birth_date_valid == true && $sex_valid == true){
		return true;
	}else{
		return false;
	}
}

function validate_fieldset_two(){
	if($retirement_age_valid == true){
		return true;
		activate_button("#next-two");
	}else{
		return false;
		deactivate_button("#next-two");
	}
}

function validate_fieldset_three(){
	if($email_valid == true && $password_valid == true){
		$("#submit").attr('type','submit');
		activate_button("#submit");
		return true;
	}else{
		$("#submit").attr('type','button');
		deactivate_button("#submit");
		return false;
	}
}

function activate_button($selected_button){
	$($selected_button).addClass("active");
	$($selected_button).removeClass("inactive");
}

function deactivate_button($selected_button){
	$($selected_button).addClass("inactive");
	$($selected_button).removeClass("active");
}

$("#next-one").click(function(){
	if(validate_fieldset_one()){
		show_next_fieldset(this);
		validate_retirement_age();
	}
});

$("#next-two").click(function(){
	if(validate_fieldset_two()){
		show_next_fieldset(this);
		$("#submit").attr('type','button');
	}
});

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

$(".submit").click(function(){
})

