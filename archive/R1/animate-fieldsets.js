// initialize variables
var current_fieldset;
var next_fieldset;
var previous_fieldset;
var left;
var opacity;
var scale;
var animating;

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fieldset = $(this).parent();
	next_fieldset = $(this).parent().next();
	
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
});

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
