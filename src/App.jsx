import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: [],
      userCount: 0
    };
  }
//check for value in input and update message state with value on enter
  messageSend = (e) => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      let newMessage = {
        type: "postMessage",
        username: this.state.currentUser,
        content: e.target.value
      }
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = " ";
    }
  }

//check for value in input and update currentUser state with value on enter
  usernameUpdate = (e) => {
    if (e.target.value.length > 0) {
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

//update userCount state
  setUserCount = (e) => {
   if (e.type === "onlineUsers") {
    this.setState({
      userCount: e.userCount
    });
   }
  }

// socket connection
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
