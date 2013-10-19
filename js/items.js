var ItemModel = Parse.Object.extend('myitems');

var ItemListModel = Parse.Collection.extend({

});

var ItemNewView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('newitem'));
        Backbone.Validation.bind(this);
    },
    events: {
        "click #btnSave": "save"
    },
    render: function () {
        var data = this.model.toJSON();
        $(this.el).html(this.template(data));
        return this;
    },
    getData: function () {
        var id =    $("#hidId").val() || null;
        var item = {
            title: $('#txtTitle').val(),
            description: $("#txtDesc").val(),
            price : $("#txtPrice").val(),
        };
        return item;
    },
    save: function (e) {
        e.preventDefault();
        var data = this.getData();
        this.model.set(data);
        if (Validator.Validate(this.model)) {
            this.model.save(null, {
                success: function (obj) {
                    AppRouter.mylist();
                },
                error: function (obj, error) {
                    AppDlg.ShowError("<p class='error'>" + error.message + "</p>");
                }
            });
        }
        return this;
    }
});

var ItemListItemView = Backbone.View.extend({
    tagName: "li",
    className: '',
    initialize: function () {
        this.template = _.template(tpl.getDlg('my-items-item'));
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.destroy, this);
    },
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    destroy: function () {
        this.remove();
    }
});

var ItemListView = Backbone.View.extend({
    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.append, this);
    },
    render: function () {
        $(this.el).empty();
        _.each(this.collection.models, this.append, this);
        $(this.el).listview();
        return this;
    },
    append: function (item) {
        $(this.el).append(new ItemListItemView({ model: item }).render().el);
    }
})

var ItemListPageView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('my-items-page'));
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



var ItemDetailView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('detail'));
    },
    events: {
        "click #btnSave": "save"
    },
    render: function () {
        var data = this.model.toJSON();
        $(this.el).html(this.template(data));
        return this;
    },
    getData: function () {
        var item = {
            eventid: $("#hidId").val() || null,
        };
        return item;
    },
    save: function (e) {
        e.preventDefault();
        var feedback = new FeedbackModel();
        var data = this.getData();
        feedback.set(data);
        if (Validator.Validate(this.model)) {
            feedback.save(null, {
                success: function (obj) {
                    AppRouter.mylist();
                },
                error: function (obj, error) {
                    AppDlg.ShowError("<p class='error'>" + error.message + "</p>");
                }
            });
        }
        return this;
    }
});