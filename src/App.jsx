import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: "Bob", // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      };
  }

  messageSend = (e) => {
    // e.preventDefault();
    if (e.keyCode === 13 && e.target.value.length > 0) {
      let newMessage = {
        username: this.state.currentUser,
        content: e.target.value
      }
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    this.setState({socket});
    socket.onopen = () => {
      console.log("Connected to the server");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      const newMessage = {
        id: data.id,
        username: data.username,
        content: data.content
      }
      this.setState({
        messages: this.state.messages.concat([newMessage])
      });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList msg = {this.state.messages}/>
        <ChatBar ign = {this.state.currentUser} newMessage = {this.messageSend}/>
      </div>
    );
  }
}
export default App;
