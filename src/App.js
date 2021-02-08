import './App.css';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './Components/ChatFeed';
import LoginForm from './Components/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import mp3 from './notify.mp3';
const projectId = process.env.REACT_APP_CHAT_PROJECT_ID;

// const projectId = "fb71f969-9166-46ab-818b-b732ac4c977d"
const initialstate = { username: '', first_name: '', last_name: '', avatar: '', is_online: false }

function App() {
  const [user, setUser] = useState(initialstate)
  if (!localStorage.getItem('username')) return (
    <>
      <LoginForm />
      <ToastContainer />
    </>
  )
  const connectHandler = (creds) => {
    let username = creds.userName
    let password = creds.userSecret
    if (username && password) {
      const authObject = { 'Project-ID': projectId, 'User-Name': username, 'User-Secret': password }
      axios.get("https://api.chatengine.io/chats/me/", { headers: authObject })
        .then(res => {
          setUser({
            username: res?.data?.username,
            first_name: res.data.first_name,
            last_name: res?.data?.last_name !== null ? res.data.last_name : '',
            avatar: res?.data?.avatar,
            is_online: res?.data?.is_online
          })
          localStorage.setItem('user_data', user)
        })
    }
  }
  return (
    <div className="App">
      <Navbar {...user} setUser={setUser} />
      <ChatEngine
        onNewMessage={(chatId, message) => {
          console.log(chatId, message);
          var audio = new Audio(mp3)
          audio.play()
        }}
        height="100vh"
        onConnect={connectHandler}
        publicKey={projectId}
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        renderChatFeed={(props) => <ChatFeed {...props} setUser={setUser} />}
      />
    </div>
  );
}

export default App;
