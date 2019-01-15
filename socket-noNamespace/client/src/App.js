import React, { Component } from 'react';
import io from 'socket.io-client';
import NameForm from './components/NameForm';
// import { set } from 'mongoose';


class App extends Component {

  state = {
    playerName: "",
    displayPlayerName: "",
    numberOfPlayers: 0,
    score: 0
  }

  componentDidMount() {
    // The initial connection to the other server
    this.socket = io('http://localhost:3000');
    this.checkConnection();
  }

  // A function to check server connection
  checkConnection() {
    this.socket.on('MSG From Server', dataFromServer => {
      console.log(dataFromServer.message);

      this.socket.emit('MSG To Server', {
        message: `SocketID: ${dataFromServer.socketid} has connected to server!`,
        socketid: dataFromServer.socketid
      });

    });
  }

  // Changes state of the search
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // Join BTN
  joinBTN = event => {
    event.preventDefault();
    console.log('join clicked')
    console.log(this.state.playerName);

    // Initializes the login for server
    this.socket.emit('LOGIN', this.state.playerName);

    // An alret message will appear when text area is empty
    this.socket.on('LOGIN_ERROR', error => {
      alert(error);
    })

    // Renders the state when login is successful
    this.socket.on('LOGIN_SUCCESS', player => {
      // I know its redundant but whatever...
      this.setState({
        displayPlayerName: player.playerName,
        score: player.score
      })
    })

    // Shows message when join is successful
    this.socket.on('ROOM_JOIN_SUCCESS', msg => {
      console.log(msg);
    })

    // Lets everyone in Room 1 see number of players
    this.socket.on('Number of Players', numberOfPlayers => {
      console.log(numberOfPlayers);
      this.setState({ numberOfPlayers: numberOfPlayers })
    })

  }

  render() {
    return (
      <div className="App">
        <NameForm
          value={this.state.playerName}
          handleInputChange={this.handleInputChange}
          joinBTN={this.joinBTN}
        />

        <div>
          Welcome: {this.state.displayPlayerName}
        </div>

        <div>
          Score: {this.state.score}
        </div>

        <div>
          Number of Players: {this.state.numberOfPlayers}
        </div>

      </div>
    );
  }
}

export default App;
