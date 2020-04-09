import {sizeToPixel} from "../utils";

class Area
{
    width   = 10;
    height  = 10;
    element = null;

    /**
     * Отрисовываем игровое поле. Размеры поля указаны в игровых единицах, при помощи функции sizeToPixel преобразуем размер в пикселы
     */
    draw() {
        const element = this.getElement();

        element.style.width = sizeToPixel(this.width) + 'px';
        element.style.height = sizeToPixel(this.height) + 'px';
    };

    /**
     * Ищем елемент в DOM html, если не находим - выкидываем исключение, останавливаем выполнение кода.
     */
    getElement() {
        if (!this.element) {
            this.element = document.getElementsByClassName('game-area');

            if (!this.element.length)
                throw new Error('HTML Element Area not found');

            this.element = this.element[0];
        }

        return this.element;
    };
}

export default Area