 

var HomeView = Backbone.View.extend({
    events: {
        "click #btnRegister": "register",
        "click #btnLogin": "login"
    },
    initialize: function () {
        this.template = _.template(tpl.getDlg('home'));
        //this.model.on("reset", this.render, this);
        this.loadData(false);
    },
    loadData: function (isAll) {

    },
    register: function (e) {
        e.preventDefault();
        AppRouter.register();
    },
    login: function (e) {
        e.preventDefault();
        AppRouter.login();
    },
    dataLoaded: function (response) {

    },
    render: function () {
        var data = {}; //this.model.toJSON();
        $(this.el).html(this.template({
            results: data
        }));
        $(this.el).trigger("pagecreate");
        return this;
    }
});



var HomeListPageView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('home-list-page'));
        this.reloadData();
    },
    reloadData: function () {
        this.collection.query = new Parse.Query(ItemModel);
        this.collection.fetch({
            success: function (data) {

            },
            error: function (myObject, error) {
                AppDlg.ShowError("<p class='error'>" + error.message + "</p>");
            }
        });
    },
    render: function (eventName) {
        $(this.el).html(this.template());
        this.listView = new ItemListView({ el: $('ul', this.el), collection: this.collection });
        return this;
    }
});

