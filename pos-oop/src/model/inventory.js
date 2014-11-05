function getDatetime() {
    dateDigitToString = function(num) {
            return num < 10 ? '0' + num : num;
        };
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return formattedDateString;
}

function Inventory(shoppingList) {
    this.separator    = '----------------------';
    this.borderline   = '**********************';
    this.shoppingList = shoppingList;

    this.getInventory = function() {
        var list  = this.shoppingList.list;
        var gifts = this.shoppingList.gifts;
        var inventory = '***<没钱赚商店>购物清单***\n';
        inventory += '打印时间：' + getDatetime() + '\n' + this.separator + '\n';
        for (var i = 0; i < list.length; i++) {
            var item = list[i].item;
            inventory += '名称：' + item.name + '，数量：' + list[i].amount + item.unit +
                         '，单价：' + item.price.toFixed(2) + '(元)，' +
                         '小计：' + list[i].price.toFixed(2) + '(元)\n';
        };
        inventory += this.separator + '\n' + '挥泪赠送商品：\n';
        for (var i = 0; i < gifts.length; i++) {
            inventory += '名称：' + gifts[i].item.name + '，数量：' + gifts[i].amount + gifts[i].item.unit + '\n';
        };
        inventory += this.separator + '\n' +
                     '总计：' + this.shoppingList.totalPrice.toFixed(2) + '(元)\n' +
                     '节省：' + this.shoppingList.discount.toFixed(2) + '(元)\n' +
                     this.borderline;
        return inventory;
    }
}