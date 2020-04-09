import GameObject from "./GameObject";
import {random} from "../utils";

/**
 * Игровой объект на поле, который игрок должен отловить
 */
class Foot extends GameObject
{
    isKill = false;

    constructor(areaElement, coords) {
        super();
        this.create(areaElement, coords);
        this.points = random(3);
        this.setPoints();
    }

    /**
     * При совпадении координат с игроком, плавно скрываем объект и через примерно десятую секунду отображаем объект с новыми координатами и очками.
     */
    kill = (coords) => {
        this.isKill = true;
        this.element.className += ' kill';

        setTimeout(() => {
            const clazz = this.element.className;
            this.element.className = clazz.substr(0, clazz.length-5);
            this.isKill = false;
            this.points = random(3);
            this.setPoints();
            this.setCoords(coords);
        }, 100)
    }
}

export default Foot