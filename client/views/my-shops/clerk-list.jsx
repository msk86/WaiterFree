Template.clerkList.onCreated(function() {
    Sub.subscribe('myClerks', this.data.shopId);
});

Template.clerkList.helpers({
    clerks() {
        return Meteor.users.find({'profile.shop': this.shopId, 'profile.type': 'clerk'})
    }
});

Template.clerkList.events({
    'click .delete-clerk': function(e, template) {
        var clerkId = this._id,
            shopId = template.data.shopId;

        Popups.confirm({
            message: `确定要删除${this.profile.name}吗？`,
            buttonText: '删除',
            cancelButtonText: '取消'
        }, (isDelete) => {
            if(isDelete) {
                Meteor.call('deleteClerk', shopId, clerkId, function(error, result) {
                    if (error) return throwError(error);
                });
            }
        });
    }
});
