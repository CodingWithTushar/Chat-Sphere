
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChat();
  const { onlineUsers } = useAuth();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button className="cursor-pointer" onClick={() => setSelectedUser(null)}>
          <XMarkIcon className="w-9" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
