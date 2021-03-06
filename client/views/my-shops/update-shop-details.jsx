Template.updateShopDetails.onCreated(function() {
    Sub.subscribe('myShop', this.data.shopId);
});

Template.updateShopDetails.helpers({
    shop() {
        return Shops.findOne(this.shopId);
    }
});

Template.updateShopDetails.events({
    'submit form.update-shop': function(e) {
        e.preventDefault();

        var currentShopId = this.shopId;
        var shopDetails = {
            name: $(e.target).find('[name=name]').val(),
            desc: $(e.target).find('[name=desc]').val(),
            address: $(e.target).find('[name=address]').val(),
            tel: $(e.target).find('[name=tel]').val(),
            tags: $(e.target).find('[name=tags]').val().split(/[,\s]/).map((t)=>{return t.trim();}).filter((t)=>{return t;})
        };

        Meteor.call('shopDetailsUpdate', currentShopId, shopDetails, function(error, result) {
            if (error) return throwError(error);
            Router.go('myShop', {shopId: currentShopId});
        });
    },

    'click .btn-cancel': function(e) {
        e.preventDefault();
        Router.go('myShop', {shopId: this.shopId});
    }
});
