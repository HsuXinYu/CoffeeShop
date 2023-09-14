app.component("login-display", {
  template:
    /*html*/
    `<div id="login">
        <form id="login-form" method="post" onsubmit="return false;">
            <div class="img-container">
                <img src="images/logo_150x150.png" alt="logo" />
            </div>
            <label for="uname"><b>Username</b></label>
            <input id="uname" type="text" name="uname" placeholder="Enter Username" @input="updateUser"/>
            <br />
            <label for="psw"><b>Password</b></label>
            <input id="psw" type="password" name="psw" placeholder="Enter Password"/>
            <br />
            <button type="submit" @click="login(event)">Login</button>
            <button type="submit" @click="show_sign_up()">Sign Up</button>
        </form>
        <form id="sign-up-form" method="post" onsubmit="return false;">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label for="name"><b>Name</b></label>
            <input id="name" type="text" placeholder="Enter Name" name="name" />
            <br />
            <label for="address"><b>Address</b></label>
            <select id="address" name="address">
                <option>Keelung</option>
                <option>Taipei</option>
                <option>Taoyuan</option>
                <option>Hsinchu</option>
                <option>Miaoli</option>
                <option>Taichung</option>
                <option>Changhua</option>
                <option>Yunlin</option>
                <option>Nantou</option>
                <option>Chiayi</option>
                <option>Tainan</option>
                <option>Kaohsiung</option>
                <option>Pingtung</option>
                <option>Yilan</option>
                <option>Hualien</option>
                <option>Taitung</option>
            </select>
            <br />
            <label for="phone"><b>Phone</b></label>
            <input id="phone" type="text" placeholder="Enter Phone" name="phone" />
            <br />
            <label for="email"><b>Email</b></label>
            <input id="email" type="email" placeholder="Enter Email" name="email" />
            <br />
            <label for="sign-up-uname"><b>Username</b></label>
            <input id="sign-up-uname" type="text" placeholder="Enter Username" name="sign-up-uname" />
            <br />
            <label for="sign-up-psw"><b>Password</b></label>
            <input id="sign-up-psw" type="password" placeholder="Enter Password" name="sign-up-psw" />
            <br />
            <button id="cancel" type="reset" @click="logout()">Cancel</button>
            <button id="sign-up" type="submit" @click="sign_up_to(event)"> Sign Up </button>
        </form>
        <button id="logout" @click="logout()">Logout</button>
        <button id="delete-mumber" @click="delete_mumber(event)"> Delete Member </button>
        <div id="message"></div>
    </div>`,
  data() {
    return {
      BASE_URL: "http://127.0.0.1:8080",
    };
  },
  methods: {
    updateUser(e) {
      let uname = $("#uname").val();
      this.$emit("update-user", uname);
    },
    login(e) {
      let uname = $("#uname").val();
      let psw = $("#psw").val();
      let info_creds = { login_uname: uname, login_psw: psw };

      console.log(info_creds);

      if ((uname === "" && psw === "") || uname === "" || psw === "") {
        $("#message").text("You must to type something!");
        return;
      }

      $.ajax({
        type: "POST",
        url: this.BASE_URL + "/login/coffee",
        data: JSON.stringify(info_creds),
        contentType: "application/json",
        // success: function (response){login_success(response)},
        success: this.login_success,
        // error: login_success,
        error: this.login_error,
      });
    },
    login_success(response) {
      console.log("inside success");
      console.log(response);

      if (response == "login_ok!") {
        console.log("ok");
        let uname = $("#uname").val();
        $("#login .close-modal").click();
        $("#login-member").text("Welcome!" + uname);
        $("#login-member").css("font-size", "1.2em");
        $("#logout").css("display", "inline-block");
        $("#delete-mumber").css("display", "inline-block");
        $("#message").css("display", "none");
      }

      if (response == "login_wrong!") {
        console.log("wrong");
        $("#message").text("Your account or password is wrong!");
      }

      if (response == "user_not_found!") {
        console.log("not found!");
        $("#message").text("Your account doesn't exist!");
      }
    },
    login_error(request, status, error) {
      console.log("inside error");
      console.log(request);
      console.log(status);
      console.log(error);
      $("#message").text("Server could not connect!");
    },
    show_sign_up() {
      $("#sign-up-form")[0].reset();
      $("#login-form").css("display", "none");
      $("#sign-up-form").css("display", "inline-block");
    },
    sign_up_to(e) {
      let name = $("#name").val();
      let address = $("#address").val();
      let phone = $("#phone").val();
      let email = $("#email").val();
      let sign_up_uname = $("#sign-up-uname").val();
      let sign_up_psw = $("#sign-up-psw").val();

      let info_creds = {
        name: $("#name").val(),
        address: $("#address").val(),
        phone: $("#phone").val(),
        email: $("#email").val(),
        sign_up_uname: $("#sign-up-uname").val(),
        sign_up_psw: $("#sign-up-psw").val(),
      };

      console.log(info_creds);

      if (
        name === "" ||
        address === "" ||
        phone === "" ||
        email === "" ||
        sign_up_uname === "" ||
        sign_up_psw === ""
      ) {
        $("#message").text("You should fill out the form!");
        return;
      }

      let phone_reg = new RegExp(/^[0-9]{10}$/g);
      if (!phone_reg.test(phone)) {
        $("#message").text("Your phone number is not currect!");
        return;
      }

      let email_reg = new RegExp(
        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      );
      if (!email_reg.test(email)) {
        $("#message").text("Your email is not currect!");
        return;
      }

      $.ajax({
        type: "POST",
        url: this.BASE_URL + "/sign_up/coffee",
        data: JSON.stringify(info_creds),
        contentType: "application/json",
        success: this.sign_up_success,
        error: this.sign_up_error,
      });
    },
    sign_up_success(response) {
      console.log("inside success");
      console.log(response);

      if (response == "sign_up_ok!") {
        console.log("ok");
        alert("Your sign up is success!");
        $("#message").css("display", "none");
        $("#login .close-modal").click();
        this.show_login();
      }

      if (response == "sign_up_wrong!") {
        console.log("wrong");
        $("#message").text("Your account already exist!");
        this.show_login();
      }
    },
    sign_up_error(request, status, error) {
      console.log("inside error");
      console.log(request);
      console.log(status);
      console.log(error);
      alert(request, status, error);
    },
    logout() {
      window.localStorage.clear();
      window.location.reload(true);
      // window.location.replace(BASE_URL);
    },
    delete_mumber(e) {
      let uname = $("#uname").val();
      let info_creds = { sign_up_uname: uname };

      console.log(this.BASE_URL + "/delete_mumber/coffee");
      $.ajax({
        type: "DELETE",
        url: this.BASE_URL + "/delete_mumber/coffee",
        data: JSON.stringify(info_creds),
        contentType: "application/json",
        success: this.delete_mumber_success,
        error: this.delete_mumber_error,
      });
    },
    delete_mumber_success(response) {
      if (response == "delete_mumber_ok!") {
        console.log("ok");
        alert("Your account has been deleted!");
        $("#login .close-modal").click();
        this.logout();
      }
    },
    delete_mumber_error(request, status, error) {
      console.log("inside error");
      console.log(request);
      console.log(status);
      console.log(error);
      alert(request, status, error);
    },
  },
});
