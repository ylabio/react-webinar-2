export const formatPrice = (price, frDigits) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: frDigits,
    }).format(price);
};
