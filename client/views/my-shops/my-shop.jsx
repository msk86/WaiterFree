function moneyFormatter(price) {
    return price ? `￥${price.toFixed(1)}` : '';
}

Template.menu.helpers({
    dishByTag(tag) {
        var dishes = Template.instance().data.menu.dishes;
        return _.filter(dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    }
});

Template.dish.helpers({
    money: moneyFormatter
});

Template.dishOption.helpers({
    money: moneyFormatter
});
