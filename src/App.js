import React, {Component} from 'react';
import './App.css';
import Field from "./Components/Field/Field";
import Cell from "./Components/Field/Cell/Cell";
import Counter from "./Components/Counter/Counter";
import Button from "./Components/Button/Button";

// Чтобы FIELD_SIZE корректно работал, нужно ширину поля и ячеек задавать динамически
// через style в Cell.js, а не через классы. Тем не менее,
// количество ячеек на поле можно менять прямо сейчас, но они будут некорректно отображаться -
// будут выходить за границы поля или не заполнять поле, если их слишком мало.
const FIELD_SIZE = 6;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: this.generateCells(),
            counter: 0,
            itemFound: false
        }
    }

    generateCells = () => {
        let cells = [];
        let cellsCount = FIELD_SIZE ** 2;
        for (let i = 0; i < cellsCount; i++) {
            cells.push({
                open: false,
                hasItem: false,
            })
        }
        let randomIndex = Math.floor(Math.random() * cellsCount);
        cells[randomIndex].hasItem = true;
        return cells;
    };

    openCell = (id) => {
        //  копируем ячейку с нужным id
        // (id - это index, переданный в openCell при вызове функции map)
        let cell = {...this.state.cells[id]};

        // открываем ячейку, только если она закрыта
        // и элемент еще не найден
        if (!cell.open && !this.state.itemFound) {
            cell.open = true;

            // меняем ячейку в копии списка ячеек
            let cells = [...this.state.cells];
            cells[id] = cell;

            // меняем список ячеек в копии state и увеличиваем количество попыток на 1
            let state = {...this.state};
            state.cells = cells;
            state.counter = state.counter + 1;

            if (cell.hasItem) {
              state.itemFound = true;
            }

            // обновляем state
            this.setState(state);
        }
    };

    resetGame = () => {

      this.setState({
        cells: this.generateCells(),
        counter: 0,
        itemFound: false
      });
    }

    // index - выдает Индекс текущего обрабатываемого элемента в массиве
    // это встроенный аргумент map, идет на втором месте при вызове функции
    // после самого обрабатываемого элемента
    render() {
        return (
            <div className="container">
                <Field>
                    {this.state.cells.map((item, index) =>
                        <Cell
                            cell={item}
                            key={index}
                            click={() => this.openCell(index)}
                        />
                    )}
                </Field>
                <Counter counter={this.state.counter}/>
                <Button resetGame={this.resetGame}/>
            </div>
        );
    }
}

export default App;