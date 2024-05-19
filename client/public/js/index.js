document.getElementById('loginForm').addEventListener('submit', function(event) {
		event.preventDefault();
		
		// Get the username and password from the form
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		// Make a POST request to your authentication API
		fetch('/api/login', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
		})
		.then(response => {
				if (response.ok) {
						// Redirect to the profile page if authentication is successful
						window.location.href = '/profile';
				} else {
						// Display an error message if authentication fails
						alert('Invalid username or password');
				}
		})
		.catch(error => {
				console.error('Error:', error);
		});
});