 
var app = {
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    unbindEvents: function () {
        document.removeEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function (remote) {
        tpl.loadTemplates(['home', 'footer', 'login', 'register', 'qrcode', 'buyitem',
            'newitem', 'my-items-item', 'my-items-page', 'detail', 'settings', ], function () {
                AppRouter = new AppRouter(); Backbone.history.start();
            });
    },
};

var LoginModel = Parse.Object.extend('Login');
var RegisterModel = Parse.Object.extend('Register');

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "mylist",
        "home": "home",
        "settings": "settings",
        "register": "register",
        "mylist": "mylist",
        "newitem": "newitem",
        "login": "login",
        "logout": "logout",
        "buyitem/:id": "buyitem",
        "qrcode/:id": "qrcode",
        "detail/:id": "detail"
    },
    loggedIn: function () {
        var currentUser = Parse.User.current();
        return (currentUser !== null);
    },
    user: function () {
        var currentUser = Parse.User.current();
        return currentUser || {};
    },
    home: function () {
        if (AppRouter.loggedIn()) {
            AppRouter.changePage(new HomeView({
                model: new LoginModel()
            }));
        }
        else {
            AppRouter.login()
        }
    },
    login: function () {
        AppRouter.changePage(new LoginView({
            model: new LoginModel()
        }));
    },
    logout: function () {
        localStorage.removeItem('cuser');
        Parse.User.logOut();
        AppRouter.home();
    },
    mylist: function () {
        var listdata = new ItemListModel();
        AppRouter.changePage(new ItemListPageView({
            collection: listdata
        }));
    },
    register: function () {
        AppRouter.changePage(new RegisterView({
            model: new LoginModel()
        }));
    },
    newitem: function () {
        var m = new ItemModel();
        m.set({
            title: '',
            price: '',
            shipprice: '',
            description: '',
            objectId: null
        });
        AppRouter.changePage(new ItemNewView({
            model: m
        }));
    },
    buyitem: function (id) {
        var query = new Parse.Query(ItemModel);
        query.get(id, {
            success: function (obj) {
                AppRouter.changePage(new BuyItemView({
                    model: obj
                }));
            },
            error: function (object, error) {
                AppDlg.ShowError("<p class='error'>" + error.message + "</p>");
            }
        });
    },
    qrcode: function (id) {
        var query = new Parse.Query(ItemModel);
        query.get(id, {
            success: function (obj) {
                AppRouter.changePage(new QRCodeView({
                    model: obj
                }));
            },
            error: function (object, error) {
                AppDlg.ShowError("<p class='error'>" + error.message + "</p>");
            }
        });
    },
    detail: function (id) {
        var query = new Parse.Query(ItemModel);
        query.get(id, {
            success: function (obj) {
                AppRouter.changePage(new ItemDetailView({
                    model: obj
                }));
            },
            error: function (object, error) {
                AppDlg.ShowError("<p class='error'>" + error.message + "</p>");
            }
        });
    },
    settings: function () {
        AppRouter.changePage(new SettingsView({
            model: new LoginModel({})
        }));
    },
    changePage: function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {
            changeHash: false,
            transition: transition
        });
    }
});


