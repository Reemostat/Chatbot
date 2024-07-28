import { useEffect } from "react";
import Chat from "./Components/chat/Chat"
import Detail from "./Components/Detail/Detail"
import List from "./Components/List/List"
import Login from "./Components/login/Login";
import Notification from "./Components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/Firebase"
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";



const App = () => {

  // const user = false;
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user)=> {
      fetchUserInfo(user?.uid)
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);



  if(isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container'>
      {
        currentUser ? (
          <>
            <List/>
            {chatId && <Chat/>}
            {chatId && <Detail/>}
          </>
        ) : (
          <Login/>
        )
      }
      <Notification/>
    </div>
  );
}

export default App