var RegisterView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('register'));
        //Backbone.Validation.bind(this);
    },
    events: {
        "click #btnCreate": "createUser"
    },
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    createUser: function (e) {
        var user = new Parse.User();
        user.set("fullname", $("#txtName").val());
        user.set("password", $("#txtPassword").val());
        user.set("username", $("#txtUser").val());
        user.set("phone", $("#txtPhone").val());
        user.signUp(null, {
            success: function (user) {
                var data = user.toJSON();
                localStorage.setItem('cuser', data);
                AppRouter.login();
            },
            error: function (user, error) {
                AppDlg.ShowError("<p class='error'>Not able to create user. Please try again.<br>" + error.message + "</p>");
            }
        });
    }
});
 

var LoginView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('login'));
    },
    events: {
        "click #btnLogin": "login",
        "click #btnRegister": "register"
    },
    render: function () {
        var data = localStorage.getItem('cuser') || {};
        $(this.el).html(this.template(data));
        return this;
    },
    register: function (e) {
        e.preventDefault();
        AppRouter.register();
    },
    login: function (e) {
        e.preventDefault();
        if (Validator.Validate(this.model)) {
            Parse.User.logIn($("#txtUser").val(), $("#txtPassword").val(), {
                success: function (user) {
                    var data = user.toJSON();
                    
                    AppRouter.mylist();
                },
                error: function (user, error) {
                    AppDlg.ShowError("<p class='error'>" + error.message + "</p>");
                }
            });
        }
        return false;
    }
});

 