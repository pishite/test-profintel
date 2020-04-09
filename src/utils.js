
export function sizeToPixel(size) {
    return size * 84
}

export function random(max) {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1
}

export function getRandomCoords(maxX, maxY, coords) {
    let x = random(maxX);
    let y = random(maxY);

    if (coords.filter(([x1,y1]) => x1 === x && y1 === y).length)
        return getRandomCoords(maxX, maxY, coords);

    return [x, y];
}
