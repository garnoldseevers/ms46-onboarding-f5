<link href="style.css" rel="stylesheet">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
<!--<form name="user" method="post" action="https://blooom-api-staging.herokuapp.com/users" id="onboarding-form">-->
<form name="user" method="post" action="https://blooom-api-staging.herokuapp.com/users" id="onboarding-form">
	<input type="hidden" name="external" value="true" />
	<a href="https://secure.blooom.com/signin" id="sign-in-link">Sign In</a>
	<img src="images/blooom-emblem.png" alt="blooom inc" id="blooom-emblem"/>
	<!--<ul id="progress-bar">
		<li class="active">About You</li>
		<li>Retirement Goals</li>
		<li>Log In</li>
	</ul>-->
	<fieldset>
		<h2 class="headline"><span class="light">We'd Fill This Out For You</span> But We Don't Have E.S.P.</h2>
		<div class="form-row">
			<label for="name">My first name is...</label>
			<input type="text" name="name" placeholder="First Name" value="" required/>
			<img src="images/validation-checkmark.png" class="validation-icon"></span>
		</div><!-- .form-row -->
		<div class="form-row" id="birth-date-row">
			<label for="birth_date">I was born on...</label>
			<div class="select-container" id="birth-month-select-container">
				<div class="select-arrow"></div>
				<select name="birth_month" id="birth-month" required>
					<option value="Month" selected disabled>Month</option>
					<?php 
						$months = array(
							"01" => "January",
							"02" => "February",
							"03" => "March",
							"04" => "April",
							"05" => "May",
							"06" => "June",
							"07" => "July",
							"08" => "August",
							"09" => "September",
							"10" => "October",
							"11" => "November",
							"12" => "December"
						);
						foreach($months as $month_numeric => $month_text){
							?>
							<option value="<?php echo $month_numeric; ?>"><?php echo $month_text; ?></option>
							<?php
						}
					?>
				</select>
			</div><!-- .select-container -->
			<div class="select-container" id="birth-day-select-container">
				<div class="select-arrow"></div>
				<select name="birth_day" id="birth-day" required>
					<option value="Month" selected disabled>Day</option>
					<?php 
						for($counter = 1; $counter <= 31; $counter += 1){
							?>
							<option value="<?php echo sprintf('%02d',$counter); ?>" ><?php echo $counter; ?></option>
							<?php
						}
					?>
				</select>
			</div><!-- .select-container -->
			<div class="select-container" id="birth-year-select-container">
				<div class="select-arrow"></div>
				<select name="birth_year" id="birth-year" required>
					<option value="Year" selected disabled>Year</option>
					<?php 
						$current_year = date("Y");
						$starting_year = $current_year - 14;
						$max_year = $current_year - 78;
						for($counter = $starting_year; $counter >= $max_year; $counter -= 1){
							?>
							<option value="<?php echo $counter; ?>"><?php echo $counter; ?></option>
							<?php
						}
					?>
				</select>
			</div><!-- .select-container -->
			<input type="hidden" name="birth_date" id="birth_date"/>
			<p class="validation-message" id="birth-date-validation-message">
				So you're saying you are <span class="validation-callout" id="birth_age">15</span>
			</p>
			<img src="images/validation-checkmark.png" class="validation-icon" id="birth-date-validation-icon"></span>
		</div><!-- .form-row -->
		<div class="form-row clearfix">
			<label for="sex">I am a...</label>
			<div class="radio-button-container">
				<input type="radio" name="sex" value="m" id="radio-button-man"/>
				<label for="radio-button-man" class="radio-button-label" id="radio-button-label-man"></label>Man
			</div>
			<div class="radio-button-container">
				<input type="radio" name="sex" value="f" id="radio-button-woman"/>
				<label for="radio-button-woman" class="radio-button-label" id="radio-button-label-woman"></label>Woman
			</div>
		</div><!-- .form-row -->
		<img src="images/norton-seal.png" alt="Norton Secured powered by VeriSign" id="norton-seal"/>
		<input type="button" name="next-one" class="next button" value="Next" id="next-one"/>
	</fieldset>
	<fieldset>
		<h2 class="headline">Retirement Goals</h2>
		<label for="sex">I'd like to smash my alarm clock at age...</label>
		<div class="form-row" id="retirement-age-row">
			<div class="select-container">
				<div class="select-arrow"></div>
				<select name="retirement_age" required>
					<?php 
						for($counter = 35; $counter <= 75; $counter += 1){
							?>
							<option value="<?php echo $counter; ?>" <?php if( $counter == 65 ){ echo "selected";} ?> ><?php echo $counter; ?></option>
							<?php
						}
					?>
				</select>
			</div><!-- .select-container -->
			<img src="images/validation-checkmark.png" class="validation-icon"></span>
		</div><!-- .form-row -->
		<input type="button" name="previous" class="previous button" value="Previous" />
		<input type="button" name="next" class="next button" value="Next" />
	</fieldset>
	<fieldset>
		<h2 class="headline"><span class="light">First Things First.</span> Let's Make Sure We Keep You Safe</h2>
		<p class="subhead">
			Why do you need to create an account? Easy. Safety first kids. Plus, if you get distracted (i.e. your boss walks past your desk), you can pick up right where you left off.
		</p>
		<label for="email">Email Address</label>
		<input type="email" name="email" placeholder="email address" />
		<label for="email">Password</label>
		<input type="password" name="password"/>
		<input type="hidden" name="password_verify" value=""/>
		<input type="button" name="previous" class="previous button" value="Previous" />
		<input type="submit" name="submit" class="submit button" value="Submit" />
	</fieldset>
</form>
<script src="http://thecodeplayer.com/uploads/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="animate-fieldsets.js" type="text/javascript"></script>