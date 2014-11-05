function getPromotion(type) {
    var promotions = loadPromotions();
    for (var i = 0; i < promotions.length; i++) {
        if (promotions[i].type == type) {
            return promotions[i];
        };
    };
}

function ShoppingList(List) {
    this.list  = List || [];
    this.gifts = [];
    this.totalPrice = 0;
    this.discount   = 0;

    this.hasItem = function(item) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].item.barcode == item.barcode) 
                return i;
        };
        return null;
    }

    this.addItem = function(item) {
        var j = this.hasItem(item);
        if (j == null) {
            this.list.push({ 'item': item, amount: 1 });
        }
        else {
            this.list[j].amount ++;
        };
    }

    this.calcuateDiscount = function(promotionType) {
        var promotion = getPromotion(promotionType);
        for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i].item;
            if (promotion.hasItem(item)) {
                var giftedNum = Math.floor(this.list[i].amount / 3);
                this.gifts.push({ 'item': item, amount: giftedNum });
                this.discount += item.price * giftedNum;
                this.list[i].price = item.price * (this.list[i].amount - giftedNum);
            }
            else {
                this.list[i].price = item.price * this.list[i].amount;
            };
            this.totalPrice += this.list[i].price;
        };
    }
}