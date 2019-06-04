import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const msgList = this.props.msg.map(message => { return (<Message username={message.username} content={message.content} notify={message.type} key={message.key}/>)})
    return (
      <main className="messages">
        {msgList}
      </main>
    )
  }
}

export default MessageList;