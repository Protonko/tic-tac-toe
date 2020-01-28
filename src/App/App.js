import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner : undefined,
      turn : 'X',
      gameIsLock : false,
      gameIsEnd : false,
      squares : Array(9).fill(''),
      moves : 0,
      display : 'none',
      globalCount : [0, 0, 0],
      name : '',
      winnerLine : '',
    };
    this.registerUser = this.registerUser.bind(this);
    this.changeName = this.changeName.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  registerUser(e) {
    e.preventDefault();
    if (this.state.name.trim() == '') {
      alert('Для начала игры необходимо ввести свое имя!');
    } else {
      this.setState({display : 'block'});
      e.target.style.display = 'none';
    }
  }

  changeName(e) {
    this.setState({name : e.target.value});
  }

  clicked(e) {
    if (this.state.gameIsEnd || this.state.gameIsLock) return;
    // Отрисовываем X и O
    console.log(this.state.squares);
    if (this.state.squares[e.dataset.square] == '') { // Если ячейка свободна
      this.state.squares[e.dataset.square] = this.state.turn;
      this.setState({squares : this.state.squares})
      // Чередуем X и O
      this.state.turn = (this.state.turn === 'X') ? 'O' : 'X';
      this.state.moves++;
    }


    if (this.checkWinner() == 'X') {
      this.state.gameIsEnd = true;
      this.setState({
        winner: 'X',
        winnerLine: `Победил ${this.state.name}`,
        globalCount : [this.state.globalCount[0] + 1, this.state.globalCount[1], this.state.globalCount[2]],
      });
    } else if (this.checkWinner() == 'O') {
      this.state.gameIsEnd = true;
      this.setState({
        winner: 'O',
        winnerLine: 'Победил компьютер',
        globalCount : [this.state.globalCount[0], this.state.globalCount[1] + 1, this.state.globalCount[2]],
      });
    } else if (this.checkWinner() == 'draw') {
      this.state.gameIsEnd = true;
      this.setState({
        winner: 'Ничья',
        winnerLine: 'Ничья',
        globalCount : [this.state.globalCount[0], this.state.globalCount[1], this.state.globalCount[2] + 1],
      })
    }
    
    // Игра с компьютером
    if (this.state.turn == 'O' && !this.state.gameIsEnd) {
      this.state.gameIsLock = true; // Блокируем поле, чтобы пользователь не сходил два раза
      setTimeout(()=> {
        let random;
        do {
          random = Math.floor(Math.random()*9);
        } while (this.state.squares[random] != '');
        this.state.gameIsLock = false;
        this.clicked(document.querySelectorAll('.crosszero-grid')[random]);
      }, 600);

    }

  }

  checkWinner() {
    let winCombinations = [
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6], 
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8]
    ];
    let squares = this.state.squares;
    for (let i = 0; i < winCombinations.length; i++) {
      let currentLine = winCombinations[i];
      if (squares[currentLine[0]] == squares[currentLine[1]] 
          && squares[currentLine[1]] == squares[currentLine[2]])
        return squares[currentLine[0]];
    }

    if (this.state.moves === 9) {
      return 'draw';
    }
  }

  resetGame() {
    console.log('work');
    this.setState({
      squares : Array(9).fill(''),
      gameIsEnd : false,
      moves : 0,
      winner : undefined,
      winnerLine : '',
      turn : 'X',
    });
  }

  render() {
    return (
      <div id="App">
          <form onSubmit={this.registerUser}>
            <input type="text" placeholder="Введите Ваше имя" onChange={this.changeName} />
            <input className="button-new" type="submit" />
          </form>
          <div className="text" style={{display: this.state.display}}>
            <p>Здравствуйте, {this.state.name}! Вы ходите первым</p>
            <div id="status">{this.state.winnerLine}</div>
          </div>
            <div className="crosszero-wrapper" style={{display: this.state.display}}>
            <div className="crosszero" onClick={event =>  this.clicked(event.target)}>
                <div className="crosszero-grid" data-square="0">
                  {this.state.squares[0]}
                </div>
                <div className="crosszero-grid" data-square="1">
                  {this.state.squares[1]}
                </div>
                <div className="crosszero-grid" data-square="2">
                  {this.state.squares[2]}
                </div>
                <div className="crosszero-grid" data-square="3">
                  {this.state.squares[3]}
                </div>
                <div className="crosszero-grid" data-square="4">
                  {this.state.squares[4]}
                </div>
                <div className="crosszero-grid" data-square="5">
                  {this.state.squares[5]}
                </div>
                <div className="crosszero-grid" data-square="6">
                  {this.state.squares[6]}
                </div>
                <div className="crosszero-grid" data-square="7">
                  {this.state.squares[7]}
                </div>
                <div className="crosszero-grid" data-square="8">
                  {this.state.squares[8]}
                </div>
              </div>
                <button className="button-new" onClick={this.resetGame}>Новая игра</button>
                <p>Победы {this.state.name}: {this.state.globalCount[0]}</p>
                <p>Победы Компьютера: {this.state.globalCount[1]}</p>
                <p>Ничьи: {this.state.globalCount[2]}</p>
            </div>
      </div>      
    );
  }
}

export default App;
