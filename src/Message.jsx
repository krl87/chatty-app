import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className="messageSystem">
        <div className="message">
          { this.props.message.type === "incomingMessage" ?
            <div>
              <span className="message-username">{this.props.message.username}</span>
              <span className="message-content">{this.props.message.content}</span>
            </div> : <span><strong> {this.props.message.content} </strong></span>
          }
        </div>
        <div className="message system">
        </div>

      </div>
    )
  }
}

export default Message;