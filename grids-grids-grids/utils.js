let formatCurrency = value => value.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
let capitalizeFirstLetter = value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export {
    formatCurrency,
    capitalizeFirstLetter
}