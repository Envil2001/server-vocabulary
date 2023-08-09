// Генерация случайного телесного цвета
function randomSkinToneColor() {
    // Ограничим диапазон hue для телесных цветов в пределах 20-40 (выберите подходящий диапазон)
    const hue = Math.floor(Math.random() * 21) + 20;

    // Зададим среднее значение насыщенности (50%) для телесных цветов
    const saturation = 50;

    // Ограничим диапазон lightness для телесных цветов в пределах 60-80 (выберите подходящий диапазон)
    const lightness = Math.floor(Math.random() * 21) + 60;

    // Соберем цвет в формате HSL
    const skinToneColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return skinToneColor;
}

module.exports = randomSkinToneColor;


