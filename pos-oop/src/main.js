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

function getPromotion(type) {
    var promotions = loadPromotions();
    for (var i = 0; i < promotions.length; i++) {
        if (promotions[i].type == type) {
            return promotions[i];
        };
    };
}

function search(key, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == key)
            return true;
    };
    return false;
}

function getGiftsInventory(gifts) {
    var total = 0, discount = 0;
    var giftsInventory = '----------------------\n' + '挥泪赠送商品：\n';
    for (var i = 0; i < gifts.length; i++) {
        giftsInventory += '名称：' + gifts[i].name + '，数量：' + gifts[i].amount + 
                     gifts[i].unit + '\n';
    };
    return giftsInventory;
}

function getDatetime() {
    dateDigitToString = function (num) {
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

function getInventoryFrom(list) {
    var separator = '----------------------';
    var borderline = '**********************';
    var inventory = '***<没钱赚商店>购物清单***\n';
    inventory += '打印时间：' + getDatetime() + '\n' + separator + '\n';
    var promotionType = "BUY_TWO_GET_ONE_FREE"
    var promotion = getPromotion(promotionType);
    var gifts = new Array();
    var total = 0, discount = 0;
    for (var i = 0; i < list.length; i++) {
        var item = getItemFrom(list[i].barcode);
        inventory += '名称：' + item.name + '，数量：' + list[i].amount + item.unit +
                     '，单价：' + item.price.toFixed(2) + '(元)，'
        if (search(list[i].barcode, promotion.barcodes)) {
            var giftedNum = Math.floor(list[i].amount / 3);
            gifts.push({ name: item.name, amount: giftedNum, unit: item.unit });
            discount += item.price * giftedNum;
            list[i].price = item.price * (list[i].amount - giftedNum);
            inventory += '小计：' + list[i].price.toFixed(2) + '(元)\n';
        }
        else {
            list[i].price = item.price * list[i].amount;
            inventory += '小计：' + list[i].price.toFixed(2) + '(元)\n';
        };
        total += list[i].price;
    };
    inventory += getGiftsInventory(gifts);
    inventory += separator + '\n' +
                 '总计：' + total.toFixed(2) + '(元)\n' +
                 '节省：' + discount.toFixed(2) + '(元)\n' +
                 borderline;
    return inventory;
}

function seperateInputs(inputs) {
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
    return shoppingList;
}

function printInventory(inputs) {
    var shoppingList = seperateInputs(inputs);

    var mergedList = merge(shoppingList);
    var inventory  = getInventoryFrom(mergedList);

    console.log(inventory);
}