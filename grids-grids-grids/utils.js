let formatCurrency = value => value.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
let capitalizeFirstLetter = value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
const createCalculationsFromBlocks = blocks => {
    let _blocks = _.flattenDeep(blocks)
    let display = { items: [], taxItems: [], subtotal: 0, taxes: 0, total: 0 };
    _blocks.forEach(b => {
        if (b.category == 'TAX_STATE' || b.category == 'TAX_LOCAL') {
            display.taxItems.push(b);
            display.taxes += b.amount;
        } else {
            display.items.push(b)
            display.subtotal += b.amount;
        }
    })
    display.total = display.subtotal + display.taxes;
    display.items.forEach((item, i) => {
        let test = parseInt(item.explanation.slice(-2))
        if (isNaN(test) == false) {
            display.items[i].groupBy = item.explanation
        } else {
            display.items[i].groupBy = "misc"
        }
    })
    display.items = _.groupBy(display.items, 'groupBy')
    display.misc = display.items.misc;
    delete display.items.misc;
    
    return display;
}

export {
    formatCurrency,
    capitalizeFirstLetter,
    createCalculationsFromBlocks
}