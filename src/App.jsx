import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    };
  }

  messageSend = (e) => {
    e.preventDefault();
    if (e.keyCode === 13 && e.target.value.length > 0) {
      let newMessage = {
        type: "postMessage",
        username: this.state.currentUser,
        content: e.target.value
      }
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  usernameUpdate = (e) => {
    e.preventDefault();
    if (e.keyCode === 13 && e.target.value.length > 0) {
      let newUsername = {
        type: "postNotification",
        content: `${this.state.currentUser} has changed their name to ${e.target.value}`
      }
      this.setState({
        currentUser: e.target.value
      });
      this.state.socket.send(JSON.stringify(newUsername));
    }
  }

  setUserCount = (e) => {
   if (e.type === "onlineUsers") {
    this.setState({
      userCount: e.userCount
    });
   }
  }

  componentDidMount() {
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    this.setState({socket});
    socket.onopen = () => {
      console.log("Connected to the server")
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      const newMessage = {
        id: data.id,
        username: data.username,
        content: data.content,
        type: data.type
      }
      if (data.type === "onlineUsers") {
        this.setUserCount(data);
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
          <div className="navFlex"><span className="countColor">{this.state.userCount}</span> users online</div>
        </nav>
        <MessageList msg = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} newUsername = {this.usernameUpdate} newMessage = {this.messageSend} />
      </div>
    )
  }
}
export default App;
