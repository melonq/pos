function getItemFrom(barcode) {
    var items = loadAllItems();
    for (var i = 0; i < items.length; i++) {
        if (items[i].barcode == barcode) {
            return items[i];
        };
    };
    return null;
}

function seperateInputs(inputs) {
    var inputList  = new Array();
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
            inputList.push(item);
        };
    };
    return inputList;
}

function getShoppingList(list) {
    var shoppingList = new ShoppingList();
    for (var i = 0; i < list.length; i++) {
        shoppingList.addItem(list[i]); 
    };
    return shoppingList;
}

function printInventory(inputs) {
    var inputList = seperateInputs(inputs);
    var shoppingList = getShoppingList(inputList);
    var promotionType = "BUY_TWO_GET_ONE_FREE";
    shoppingList.calcuateDiscount(promotionType);
    var inv = new Inventory(shoppingList);
    
    console.log(inv.getInventory());
}