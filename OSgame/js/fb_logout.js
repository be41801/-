window.fbAsyncInit = function() {
    FB.init({
      appId      : '1735321060028427',
      cookie     : true,
      status      : true,
	  oauth       : true,
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.2' // use version 2.2
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  
  
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    // ('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    });
  }
  
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status == 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status == 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

function fb_logout() {
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                window.location.replace("oslogin.html");
            });
        }
    });
	window.location.replace("oslogin.html");
	
}
