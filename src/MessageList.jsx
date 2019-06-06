import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {;

    const msgList = this.props.msg.map(message => {
      console.log(message);
      return (<Message message = {message}/>)})
    return (
      <main className="messages">
        {msgList}
      </main>
    )
  }
}

export default MessageList;