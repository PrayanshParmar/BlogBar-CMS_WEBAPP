export function formatNumber(number) {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    if (number >= billion) {
        return (number / billion).toFixed(1) + 'B';
    } else if (number >= million) {
        return (number / million).toFixed(1) + 'M';
    } else if (number >= thousand) {
        return (number / thousand).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}
