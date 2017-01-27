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


$("input[type=text]").keyup(function(){
	validate(this);
});

$("#birth-month, #birth-day, #birth-year").change(function(){
	validate_birth_date();
});

$("input[type=radio]").change(function(){
	validate(this);
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
}

function validate_fieldset_one(){
	if($name_valid == true && $birth_date_valid == true && $sex_valid == true){
		return true;
	}else{
		return false;
	}
}

function validate_fieldset_two(){
	if($name_valid == true && $birth_date_valid == true && $sex_valid == true){
		return true;
	}else{
		return false;
	}
}

function activate_button($selected_button){
	$($selected_button).css('background-color','#6c9d1b');
	$($selected_button).css('cursor','pointer');
}

$("#next-one").click(function(){
	if(validate_fieldset_one()){
		show_next_fieldset(this);
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
