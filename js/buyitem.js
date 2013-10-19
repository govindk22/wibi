var BuyItemView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('buyitem'));
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


var QRCodeView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('qrcode'));

      

    },
    events: {
        "click #btnSave": "save"
    },
    render: function () {
        var data = this.model.toJSON();

        $(this.el).html(this.template(data));

        //this.qrcode = new QRCode("QRCode", {
        //    text: data.objectId,
        //    width: 128,
        //    height: 128,
        //    colorDark: "#000000",
        //    colorLight: "#ffffff",
        //    correctLevel: QRCode.CorrectLevel.H
        //});

        var elememt = $("#qrcode", this.el)[0];

        this.qrcode = new QRCode(elememt, {
            width: 100,
            height: 100
        });

        this.qrcode.makeCode(data.objectId);
         
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