import {sizeToPixel} from "../utils";

/**
 * Класс объекта на игровом поле
 */
class GameObject
{
    x         = 1;
    y         = 1;
    points    = 0;
    element   = null;
    className = 'game-object';

    /**
     * метод отрисовывает объект на игровом поле areaElement, запоминаем ссылку на элемент в свойстве element экземпляра
     */
    create(areaElement, [x,y]) {
        this.x = x;
        this.y = y;

        if (!this.element) {
            this.element = document.createElement('div');
            areaElement.appendChild(this.element);
        }

        this.element.className = this.className;
        this.setCoords([x,y]);
        this.setPoints();
    };

    /**
     * Отрисовываем значение points в объект
     */
    setPoints = (points = this.points) => {
        this.element.innerHTML = `<span>${points}</span>`;
    };

    /**
     * Меняем координаты элемента
     */
    setCoords(coords = null) {
        if (coords) {
            const [x, y] = coords;
            this.x = x;
            this.y = y;
        }

        this.element.style.left = sizeToPixel(this.x) + 'px';
        this.element.style.top = sizeToPixel(this.y) + 'px';
    }
}

export default GameObject