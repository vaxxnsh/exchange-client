export const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num >= 1000) {
        return num.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
    return num.toFixed(2);
};

export const formatPercentage = (percent: string) => {
    const num = parseFloat(percent);
    return num >= 0 ? `+${num.toFixed(2)}%` : `${num.toFixed(2)}%`;
};

export const formatVolume = (volume: string) => {
    const num = parseFloat(volume);
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const getBaseCurrency = (symbol: string) => {
    return symbol.split('_')[0];
};

export const formatSymbol = (symbol: string) => {
    if (symbol.includes('USDT')) {
        return symbol.replace('USDT', '/USDT');
    }
    if (symbol.includes('USD')) {
        return symbol.replace('USD', '/USD');
    }
    return symbol;
};