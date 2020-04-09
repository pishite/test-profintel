import Player from "./Player";
import Foot from "./Foot";
import KeyEvent from "./KeyEvent";
import Area from "./Area";
import {getRandomCoords} from "../utils";

class Game
{
    area  = null;
    player  = null;
    objects = [];

    /**
     * Создаем игровое поле, объекты на нем;
     * запускаем слушатель событий нажития клавиш на клавиатуре;
     * тамер окончания игры
     * */
    init() {
        this.area = new Area();

        this.area.draw();

        // Create player
        this.player = new Player(this.area.element, this.setRandomCoords());

        // Create objects
        this.objects.push(new Foot(this.area.element, this.setRandomCoords()));
        this.objects.push(new Foot(this.area.element, this.setRandomCoords()));
        this.objects.push(new Foot(this.area.element, this.setRandomCoords()));

        // Create KeyEvent
        const event = new KeyEvent(this.setPlayerCoords);

        setTimeout(() => {
            event.destroy();
            alert(`Your score: ${this.player.points}`)
        }, 60 * 1000)

    }

    /**
     * Меняем координаты игрока на величину x,y (значения от -1 до 1)
     * При достижении края поля - не уходим за край
     * Проверяем - находится ли игрок на одной клетке с объектами.
     */
    setPlayerCoords = ([x, y]) => {
        this.player.x = Math.max(Math.min(x + this.player.x, this.area.width), 1);
        this.player.y = Math.max(Math.min(y + this.player.y, this.area.height), 1);
        this.player.setCoords();
        this.isEat();
    };

    /**
     * Поиск совпадения координат игрока с объектами
     * Если координаты совпали, присваиваем игроку очки и плавно меняем координаты объекта на новые, геенерируем очки в нем заново от 1 до 3
     */
    isEat() {
        const foot =  this.objects.filter(({x,y}) => x === this.player.x && y === this.player.y);

        if (!foot.length || foot[0].isKill)
            return;

        this.player.points += foot[0].points;
        this.player.setPoints();

        foot[0].kill(this.setRandomCoords());
    };

    /**
     * Метод возвращает случайные координаты, не пересекающиеся с другими объектами
     * В нем генериреум массив координат текщих объектов, в том числе пользователя
     */
    setRandomCoords() {
        const coords = this.objects.map(({x,y}) => [x, y]);

        // Вначале значение равно null
        if (this.player)
            coords.push([this.player.x, this.player.y]);

        return getRandomCoords(this.area.width, this.area.height, coords);
    }
}

export default Game