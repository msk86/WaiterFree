Template.confirmOrder.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);
});


Template.confirmOrder.helpers({
    order() {
        return Orders.findOne() || {price: 0, dishes: []};
    }
});

Template.confirmOrder.helpers({
    totalPrice() {
        return this.price * this.count;
    },
    gt(a, b) {
        return a > b;
    }
});

Template.confirmOrder.events({
    'click .confirm-order': function() {
        var orderId = Orders.findOne()._id,
            remark = $('textarea[name=remark]').val(),
            invoiceTitle = $('input[name=invoiceTitle]').val();

        Popups.confirm({
            message: '确认要提交订单吗？',
            buttonText: '确认',
            cancelButtonText: '取消'
        }, (isConfirmed) => {
            if(isConfirmed) {
                Meteor.call('confirmOrder', orderId, remark, invoiceTitle, function(e) {
                    if(e) return throwError(e);
                })
            }
        })
    },

    'click .request-invoice': function() {
        $('.request-invoice').hide();
        $('.invoice-section').show();
    }
});
