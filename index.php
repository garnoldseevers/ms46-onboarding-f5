<link href="css/style.css" rel="stylesheet">
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
			<label for="name" autofocus>My first name is...</label>
			<input type="text" name="name" placeholder="First Name" value="" id="name" required/>
			<img src="images/validation-checkmark.png" class="validation-icon"></span>
			<p class="validation-message" id="birth-date-validation-message">
				required
			</p>
		</div><!-- .form-row -->
		<div class="form-row clearfix" id="gender-row">
			<label for="sex">I am a...</label>
			<div class="radio-button-container" id="sex-m-container">
				<input type="radio" name="sex" value="m" id="radio-button-man"/>
				<label for="radio-button-man" class="radio-button-label" id="radio-button-label-man">Man</label>
			</div>
			<div class="radio-button-container" id="sex-f-container">
				<input type="radio" name="sex" value="f" id="radio-button-woman"/>
				<label for="radio-button-woman" class="radio-button-label" id="radio-button-label-woman">Woman</label>
			</div>
			<img src="images/validation-checkmark.png" class="validation-icon"></span>
			<p class="validation-message" id="gener-validation-message">
				required
			</p>
		</div><!-- .form-row -->
		<div class="form-row" id="birth-date-row">
			<label for="birth_date">I was born on...</label>
			<input type="date" name="birth_date_picker" class="mobile" value="1999-12-31" id="birth_date_mobile" />
			<div class="desktop">
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
				<div class="select-container clearfix" id="birth-year-select-container">
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
			</div><!-- .desktop -->
			<p class="validation-message" id="birth-date-validation-message">
				required
			</p>
			<input type="hidden" name="birth_date" id="birth_date"/>
			<p class="additional-info" id="birth-date-age-display">
				So you're saying you are <span class="validation-callout" id="birth_age">15</span>
			</p>
			<img src="images/validation-checkmark.png" class="validation-icon" id="birth-date-validation-icon"></span>
		</div><!-- .form-row -->
		<label for="retirement-age">I'd like to retire at age...</label>
		<div class="form-row" id="retirement-age-row">
			<div class="select-container">
				<div class="select-arrow"></div>
				<select name="retirement_age" id="retirement-age" required>
					<?php 
						for($counter = 35; $counter <= 75; $counter += 1){
							?>
							<option value="<?php echo $counter; ?>" <?php if( $counter == 65 ){ echo "selected";} ?> ><?php echo $counter; ?></option>
							<?php
						}
					?>
				</select>
			</div><!-- .select-container -->
			<img src="images/validation-checkmark.png" class="validation-icon" id="retirement-age-validation-icon"></span>
		</div><!-- .form-row -->
		<p class="additional-info error" id="retirement-age-display">
			You aren't going to retire <span class="validation-callout" id="years-ago">2 years</span> ago, it's just not going to happen!
		</p>
		<img src="images/norton-seal.png" alt="Norton Secured powered by VeriSign" id="norton-seal"/>
		<div class="next button active" id="next-one"/>Next<span class="button-arrow"></span></div>
	</fieldset>
	<fieldset>
		<h2 class="headline"><span class="light">First Things First.</span> Let's Make Sure We Keep You Safe</h2>
		<p class="subhead">
			Why do you need to create an account? Easy. Safety first kids. Plus, if you get distracted (i.e. your boss walks past your desk), you can pick up right where you left off.
		</p>
		<div class="form-row" id="email-row">
			<label for="email">Email Address</label>
			<input type="email" name="email" placeholder="email address" id="email" />
			<img src="images/validation-checkmark.png" class="validation-icon" id="email-validation-icon"></span>
		</div><!-- .form-row -->
		<div class="form-row" id="password-row">
			<label for="password">Password</label>
			<input type="password" name="password" id="password"/>
			<img src="images/validation-checkmark.png" class="validation-icon" id="password-validation-icon"></span>
			<div id="password-strength-meter">
				<img src="images/security-icon.png" id="security-icon" alt="padlock" />
				<span id="password-strength-bar"></span>
				<span id="password-strength-message"></span>
			</div>
			<p class="validation-message" id="password-validation-message">
				Try adding numbers, symbols, or different case letters
			</p>
		</div><!-- .form-row -->
		<input type="hidden" name="password_verify" value="" id="password_verify"/>
		<div class="previous button"/>
			<span class="button-arrow"></span>Previous
		</div>
		<input type="submit" name="submit" class="submit button active" value="Submit" id="submit"/>
	</fieldset>
</form>
<script src="http://thecodeplayer.com/uploads/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/zxcvbn.js"></script>
<script src="js/javascript.js" type="text/javascript"></script>