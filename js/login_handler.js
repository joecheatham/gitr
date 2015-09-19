$(document).ready(function() {
	$('#reg_btn').click(function(event) {
		registerHandler($(this));
	});
	$('#signin_btn').click(function(event) {
		signInHandler($(this));
	});
	$('#fb_btn').click(function(event) {
		console.log('facebook sign in');
	});
});
function signInHandler($el) {
	signInMarkup = '<form class="form-signin">'
        		 + '<h2 class="form-signin-heading"></h2>'
                 + '<label for="inputEmail" class="sr-only">Email address</label>'
        		 + '<input type="email" id="inputEmail" class="form-control" placeholder='
        		 + '"Email address" required autofocus>'
        		 + '<label for="inputPassword" class="sr-only">Password</label>'
        		 + '<input type="password" id="inputPassword" class="form-control"' 
        		 + 'placeholder="Password" required><div class="checkbox">'
          		 + '<label><input type="checkbox" value="remember-me"> Remember me</label>'
        		 + '</div><button class="btn btn-lg btn-primary btn-block" type="submit">' 
        		 + 'Sign in</button><br></form>';
    $el.after(signInMarkup);
}
function registerHandler($el) {
	registerMarkup = '<form class="form-signin">'
        		 + '<h2 class="form-signin-heading"></h2>'
                 + '<label for="inputEmail" class="sr-only">Email address</label>'
        		 + '<input type="email" id="inputEmail" class="form-control" placeholder='
        		 + '"Email address" required autofocus>'
        		 + '<label for="inputPassword" class="sr-only">Password</label>'
        		 + '<label for="passwordConfirm" class="sr-only">Confirm</label>'
        		 + '<input type="password" id="inputPassword" class="form-control"'
        		 + 'placeholder="Password" required>'
        		 + '<input type="password" id="passwordConfirm" class="form-control"' 
        		 + 'placeholder="Re-Enter Password" required><div class="checkbox">'
          		 + '<label><input type="checkbox" value="remember-me"> Remember me</label>'
        		 + '</div><button class="btn btn-lg btn-primary btn-block" type="submit">' 
        		 + 'Register</button><br></form>';
    $el.after(registerMarkup);
}
