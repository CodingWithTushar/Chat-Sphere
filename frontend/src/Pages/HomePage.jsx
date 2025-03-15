import React from 'react';
import { useChat } from '../hooks/useChat';
import SideBar from '../components/SideBar';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';

const HomePage = () => {
  const { selectedUser, users, messages, userId } = useChat();

  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl h-[calc(100vh-8rem)] rounded-lg shadow-xl hover:shadow-2xl overflow-hidden bg-base-100">
          <div className="flex h-full">
            {/* Sidebar Section */}
            <aside className="w-1/4">
              <SideBar 
                users={users}
                userId={userId}
                selectedUser={selectedUser}
              />
            </aside>

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;