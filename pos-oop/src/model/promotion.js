function Promotion(type, barcodes) {
    this.type = type;
    this.barcodes = barcodes || [];

    this.hasItem = function(item) {
        for (var i = 0; i < this.barcodes.length; i++) {
            if (this.barcodes[i] == item.barcode)
                return true;
        };
        return false;
    }
}