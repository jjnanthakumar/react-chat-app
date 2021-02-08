import MessageForm from "./MessageForm"
import MyMessage from "./MyMesssage"
import TheirMessage from "./TheirMessage"

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages, setUser } = props
    const chat = chats && chats[activeChat]
    const renderReactReceipts = (message, isMymessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMymessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
    };
    const renderMessages = () => {
        const keys = Object.keys(messages);
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessage = index === 0 ? null : keys[index - 1]
            const isMymessage = userName === message.sender.username
            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            isMymessage ?
                                <MyMessage message={message} />
                                : <TheirMessage message={message} lastMessage={lastMessage} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMymessage ? '18px' : '0px', marginLeft: isMymessage ? '0px' : '68px', marginTop: '5px' }}>
                        {renderReactReceipts(message, isMymessage)}
                    </div>
                </div>
            )
        })
    }
    if (!chat) return 'Loading...'
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat?.title}
                </div>
                <div className="chat-subtitle">
                    {chat?.people.map((person) => ` ${person.person.username}`)}
                </div>
                {renderMessages()}
                <div style={{ height: '100px' }} />
                <div className="message-form-container">
                    <MessageForm {...props} chatId={activeChat} />
                </div>
            </div>
        </div>
    )
}

export default ChatFeed