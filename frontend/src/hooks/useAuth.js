import { create } from "zustand";
import { axiosInstanace } from "../lib/axios.js";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "develpoment" ? "http://localhost:3000" : "/";

export const useAuth = create((set, get) => ({
  authUser: null,
  isSigingUp: false,
  isLoggingIn: false,
  onlineUsers: [],
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstanace.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (e) {
      set({ authUser: null });
      console.error;
      console.log(`Error in CheckAuth ${e}`);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigingUp: true });
    try {
      const response = await axiosInstanace.post("/auth/signup", data);
      console.log(response.data);
      toast.success("Account created successfully");
      set({ authUser: response.data });
    } catch (e) {
      toast.error(`Error Happened in useAuth Hook ${e}`);
    } finally {
      set({ isSigingUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstanace.post("/auth/logout");
      set({ authUser: null });
      toast.success("You have Logged out successfully");
      get().disconnectSocket();
    } catch (e) {
      console.error;
      toast.error(`Error Happened in Logout ${e}`);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstanace.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (e) {
      toast.error(`Error Happened In Log In ${e}`);
      console.error;
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstanace.put("auth/update-profile", data);
      set({ authUser: response.data });
      toast.success(`Profile updated successfully`);
    } catch (e) {
      toast.error(`Error Happened in Updating Profile ${e}`);
    } finally {
    }
  },
  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers : userIds});
    });
  },
  disconnectSocket: async () => {
    if (get().socket.connected) {
      get().socket.disconnect();
    }
  },
}));
