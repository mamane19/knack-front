baseUrl = "https://knack-back.herokuapp.com";

// SignIn / LogIn
function onLoginDetailsSubmit() {
  var formData = {};
  formData["email_address"] = document.getElementById("email_address").value;
  formData["password"] = document.getElementById("password").value;

  userLogin(formData);
}
function userLogin(data) {
  var postData = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: baseUrl + "/users/signin",
    dataType: "json",
    data: postData,
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      var data = response.user;
      if (response.success) {
        alert("Logged in successfully....");
      } else {
        alert(response.error.msg);
      }
      console.log(data);

      console.log("token:" + response.token);

      document.cookie = "authToken=" + response.token;
      console.log("hey there");
      //   document.cookie = "authToken=" + response.token;
      window.location.href = "./home.html";
    },
    error: function (response) {
      // executes only if ajax fails
      document.getElementById("message").innerHTML =
        "<span id='message-box'>Email or Password is wrong...</span>";
      setTimeout(function () {
        document.getElementById("message").innerHTML = "";
      }, 3000);
    },

    headers: {
      Accept: "application/json; charset=utf-8",
      Content_Type: "application/json; charset=utf-8",
      Authorization: getCookie("authToken"),
    },
  });
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie valu
      console.log("cookie:" + decodeURIComponent(cookiePair[1]));
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

// SignUp
function onCreateUser() {
  var formData = {};
  formData["email_address"] = document.getElementById("email-create").value;
  formData["password"] = document.getElementById("password-create").value;
  formData["user_name"] = document.getElementById("name-create").value;
  addUser(formData);
  // window.location.href = "./index.html";
  //   clearUserForm();
}
function addUser(data) {
  var postData = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: baseUrl + "/users/signup",
    dataType: "json",
    data: postData,
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      var data = response.data;
      console.log(data);
      //   addUserRecordToTable(data);
      window.location.href = "./home.html";
    },

    headers: {
      Accept: "application/json; charset=utf-8",
      Content_Type: "application/json; charset=utf-8",
      Authorization: getCookie("authToken"),
    },
  });
}
