import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        currentUser: "Bob", // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            key: 1,
            type: "incomingMessage",
            content: "I won't be impressed with technology until I can download food.",
            username: "Anonymous1"
          },
          {
            key: 2,
            type: "incomingNotification",
            content: "Anonymous1 changed their name to nomnom",
          },
          {
            key: 3,
            type: "incomingMessage",
            content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
            username: "Anonymous2"
          },
          {
            key: 4,
            type: "incomingMessage",
            content: "...",
            username: "nomnom"
          },
          {
            key: 5,
            type: "incomingMessage",
            content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
            username: "Anonymous2"
          },
          {
            key: 6,
            type: "incomingMessage",
            content: "This isn't funny. You're not funny",
            username: "nomnom"
          },
          {
            key: 7,
            type: "incomingNotification",
            content: "Anonymous2 changed their name to NotFunny",
          },
        ]
      }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList msg = {this.state.messages}/>
        <ChatBar ign = {this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
