Template.qrCode.onRendered(function () {
    var dataContext = Template.currentData();
    var tableOrderUrl = `${location.protocol}//${location.host}/orders/${dataContext.shopId}/${dataContext.tableId}`;
    console.log(tableOrderUrl);
    this.$('.qr-code').qrcode({text: tableOrderUrl, width: 100, height: 100});
});
