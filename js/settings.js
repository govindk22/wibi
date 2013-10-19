
var SettingsView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('settings'));
        Backbone.Validation.bind(this);
    },
    events: {
        "click #btnSave": "sae",
    },
    render: function () {
        var data = localStorage.getItem('cuser') || {};
        $(this.el).html(this.template(data));
        return this;
    },

    save: function (e) {
        e.preventDefault();
        if (Validator.Validate(this.model)) {

        }
        return false;
    }
});