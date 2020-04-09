import GameObject from "./GameObject";

/**
 *
 */
class Player extends GameObject
{
    className = 'game-object-player';

    constructor(areaElement, coords) {
        super();
        this.create(areaElement, coords);
    }
}

export default Player