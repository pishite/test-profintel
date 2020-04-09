/**
 * Класс отслеживает собития нажатия клавишь на клавиатуре и вызывает callback для изменения коордиат игрока.
 */
class KeyEvent
{
    step = [0, 0]; // x, y величины изменения координат
    status = false; // Если на;ата хотя ,ы одна клавиша стрелки? присваиваем значение true
    intervalID = null;
    activeKey = { // Храним состояние нажатия клавиши по ее коду
        37: false, // left
        38: false, // up
        39: false, // right
        40: false // bottom
    };

    setStep = () => {};

    constructor(setStep) {
        this.setStep = setStep;
        document.addEventListener('keydown', this.start);
        document.addEventListener('keyup', this.stop);
    }

    /**
     * Метод вызывается при событии нажатия клавши
     * Чтобы избежать повоторного вызова обработчиков, при удерживании клавиши в нажатом состоянии,
     *  проверяем что нажата стрелка и что она ранее не была зажата
     * При первом вызове, запускаем только изменение координаты по текущему нажатию и запускаем таймер, для переменщения при зажатой клавише с нужной нам скоростью.
     */
    start = (event) => {
        if (event.keyCode in this.activeKey && this.activeKey[event.keyCode])
            return;

        switch (event.keyCode) {
            case 37:
                this.step[0] = -1;
                this.setStep([-1, 0]);
                break;
            case 38:
                this.step[1] = -1;
                this.setStep([0, -1]);
                break;
            case 39:
                this.step[0] = 1;
                this.setStep([1, 0]);
                break;
            case 40:
                this.step[1] = 1;
                this.setStep([0, 1]);
                break;
            default:
                return;
        }

        this.status = true;
        this.activeKey[event.keyCode] = true;

        setTimeout(() => {
            if (this.status && !this.intervalID)
                this.intervalID = setInterval(() => {
                    if (!this.status) {
                        clearInterval(this.intervalID);
                        this.intervalID = null;
                        return;
                    }

                    this.setStep(this.step);
                }, 200)
        }, 1000)
    };

    /**
     * Метод вызывается при отпускании\отжати клавиши на клавитуре
     * Меняем сотояние нажатия текущей клавиши
     * Если все стрелки не нажаты - нужно остановить таймер, вызывающий перемещение игрорка
     */
    stop = (event) => {
        switch (event.keyCode) {
            case 37: if (this.step[0] < 0) this.step[0] = 0; break;
            case 38: if (this.step[1] < 0) this.step[1] = 0; break;
            case 39: if (this.step[0] > 0) this.step[0] = 0; break;
            case 40: if (this.step[1] > 0) this.step[1] = 0; break;
            default: return;
        }

        this.activeKey[event.keyCode] = false;

        if (Object.entries(this.activeKey).filter(([k, v]) => v).length)
            return;

        this.status = false;
    };

    destroy() {
        document.removeEventListener('keydown', this.start);
        document.removeEventListener('keyup', this.stop);
    }
}

export default KeyEvent