const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

const WHITE = [255, 255, 255];

function luminance(r, g, b) {
    var a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, GAMMA);
    });

    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast (rgb) {
    var lum = luminance(...rgb);
    var lumWhite = luminance(...WHITE);

    var brightest = Math.max(lum, lumWhite);
    var darkest = Math.min(lum, lumWhite);
    return (brightest + 0.05) / (darkest + 0.05);
}

export default contrast;


// If it is under the 7 then change