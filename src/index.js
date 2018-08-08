import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reduxTest from './reduxTest';

// react 是一个采用声明式，高效而且灵活的用来构建用户界面的框架
// 包含各种组件 React.Component{}
// class Square extends React.Component {
//     // constructor() {
//     //     // 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象
//     //     super();
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     // 每当 this.setState 方法被触发时，组件都会开始准备更新，React 通过比较状态的变化来更新组件当中跟随数据改变了的内容。当组件重新渲染时，this.state.value 会变成 'X' ，所以你也就能够在格子里看到 X 的字样。
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {/* TODO  来自 <Square
//                                 value={this.state.squares[i]}*/
//                     this.props.value
//                 }
//             </button>
//         );
//     }
// }
// 注意不能写成 onClick={props.onClick()}
// 否则 props.onClick 方法会在 Square 组件渲染时被直接触发而不是等到 Board 组件渲染完成时通过点击触发，"
// 又因为此时 Board 组件正在渲染中（即 Board 组件的 render() 方法正在调用），又触发 handleClick(i) 方法调用 setState() 会再次调用 render() 方法导致死循环。
// 函数定义的方式重写Square组件：
function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// 现在每次格子被点击时就会触发传入的 onClick 方法。我们来捋一下这其中发生了什么：

// 添加 onClick 属性到内置的 DOM 元素 <button> 上让 React 开启了对点击事件的监听。
// 当按钮，也就是棋盘格子被点击时, React 会调用 Square 组件的 render() 方法中的 onClick 事件处理函数。
// 事件处理函数触发了传入其中的 this.props.onClick() 方法。这个方法是由 Board 传递给 Square 的。
// Board 传递了 onClick={() => this.handleClick(i)} 给 Square，所以当 Square 中的事件处理函数触发时，其实就是触发的 Board 当中的 this.handleClick(i) 方法。
// 现在我们还没有编写 handleClick() 方法，所以代码还不能正常工作。

//  JSX语法   <div /> 会被编译为 React.createElement('div') 
// class Board extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             // arr.fill(value, start, end)
//             squares: Array(9).fill(null),
//             xIsNext: true,
//         };
//     }
//     /**
//      * 落子操作
//      * 
//      * @param {any} i 
//      * @memberof Board
//      */
//     handleClick(i) {
//         const squares = this.state.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             squares: squares,
//             xIsNext: !this.state.xIsNext,
//         });
//     }
//     renderSquare(i) {
//         return (
//             <Square
//                 value={this.props.squares[i]}
//                 onClick={() => this.props.onClick(i)} />
//         )
//     }

//     render() {
//         const winner = calculateWinner(this.state.squares);
//         let status;
//         if (winner) {
//             status = 'Winner: ' + winner;
//         }else {
//             status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//         }
//         return (
//             <div>
//                 <div className="status">{status}</div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }
// 我们将 Board 中的状态数据全都移动到 Game 组件当中。Board 现在通过 props 获取从 Game 传递下来的数据和事件处理函数。
// 删除 Board 的构造方法 constructor 。
// 把 Board 的 renderSquare 方法中的 this.state.squares[i] 替换为 this.props.squares[i] 。
// 把 Board 的 renderSquare 方法中的 this.handleClick(i) 替换为 this.props.onClick(i) 。
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} />
        )
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

/**
 * 判断赢家
 * 
 * @param {any} squares 
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null
}


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }
    /**
     * 落子操作
     * 
     * @param {any} i 
     * @memberof Board
     */
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Move #' + move : 'Game start';
            return (
                <li key={move}>
                    <button href="" onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
