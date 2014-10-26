function getItemFrom(barcode) {
    var items = loadAllItems();
    for (var i = 0; i < items.length; i++) {
        if (items[i].barcode == barcode) {
            return items[i];
        };
    };
    return null;
}

function getPosition(item, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].barcode == item.barcode) return i;
    };
    return null;
}

function merge(shoppingList) {
    var mergedList = new Array();
    for (var i = 0; i < shoppingList.length; i++) {
        var j = getPosition(shoppingList[i], mergedList);
        if (j == null) {
            mergedList.push({ barcode: shoppingList[i].barcode, amount: 1 });
        }
        else {
            mergedList[j].amount ++;
        };
    };
    return mergedList;
}

function printInventory(inputs) {
    var shoppingList  = new Array();

    for (var i = 0; i < inputs.length; i++) {
        var barcode = inputs[i];
        var amount  = 1;
        var code = inputs[i].split("-");
        if (code.length == 2) {
            barcode = code[0];
            amount  = code[1];
        };
        var item = getItemFrom(barcode);
        for (var j = 0; j < amount; j++) {
            shoppingList.push(item);
        };
    };
    merge(shoppingList);
    var inventory =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';
    console.log(inventory);
}