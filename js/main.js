document.addEventListener("DOMContentLoaded", function () {
    const redRange = document.getElementById("redRange");
    const greenRange = document.getElementById("greenRange");
    const blueRange = document.getElementById("blueRange");

    const redInput = document.getElementById("redInput");
    const greenInput = document.getElementById("greenInput");
    const blueInput = document.getElementById("blueInput");

    const colorBox = document.getElementById("colorBox");
    const hexCode = document.getElementById("hexCode");
    const colorPicker = document.getElementById("colorPicker");

    function updateColor() {
        let r = parseInt(redRange.value);
        let g = parseInt(greenRange.value);
        let b = parseInt(blueRange.value);
        let hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCode.textContent = hex;
        colorPicker.value = hex;

        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;
    }

    function updateFromInput() {
        let r = validateColorValue(redInput.value);
        let g = validateColorValue(greenInput.value);
        let b = validateColorValue(blueInput.value);

        redRange.value = r;
        greenRange.value = g;
        blueRange.value = b;
        updateColor();
    }

    function updateFromColorPicker() {
        let hex = colorPicker.value;
        let rgb = hexToRgb(hex);

        if (rgb) {
            redRange.value = rgb.r;
            greenRange.value = rgb.g;
            blueRange.value = rgb.b;
            updateColor();
        }
    }

    function validateColorValue(value) {
        value = parseInt(value);
        return isNaN(value) ? 0 : Math.min(255, Math.max(0, value));
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + +b).toString(16).slice(1).toUpperCase()}`;
    }

    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    redRange.addEventListener("input", updateColor);
    greenRange.addEventListener("input", updateColor);
    blueRange.addEventListener("input", updateColor);

    redInput.addEventListener("input", updateFromInput);
    greenInput.addEventListener("input", updateFromInput);
    blueInput.addEventListener("input", updateFromInput);

    colorPicker.addEventListener("input", updateFromColorPicker);

    updateColor(); // Inicializa el color
});
