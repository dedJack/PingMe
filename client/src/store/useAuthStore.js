import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

const BaseUrl = "http://localhost:5000";
export const useAuthStore = create((set, get) => ({
    //defining initial state
    authUser: null,
    isSigningUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const result = await axiosInstance.get('/auth/getUser');
            set({ authUser: result.data });
            get().connectSocket();
        } catch (e) {
            console.log("Error in checkAuth store: ", e);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    //SignUp
    signUp: async (data) => {
        try {
            set({ isSigningUp: true });
            const result = await axiosInstance.post('/auth/register', data);
            set({ authUser: result.data });
            get().connectSocket();
            toast.success("Account created successfully")
        } catch (e) {
            toast.error(e.response?.data?.message || "Signup failed");
            console.log("Error in signUp store: ", e);
        } finally {
            set({ isSigningUp: false });
        }
    },

    //login
    login: async (data) => {
        try {
            set({ isLoggedIn: true });
            const result = await axiosInstance.post("/auth/login", data);
            set({ authUser: result.data });
            get().connectSocket();
            toast.success("login successfully")
        } catch (e) {
            toast.error(e.response?.data?.message || "Login failed");
            console.log("Error in login store: ", e);
        } finally {
            set({ isLoggedIn: false });
        }
    },

    //Logout
    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null });
            get().disconnectSocket();
            toast.success("logout seccessfully")
        } catch (e) {
            toast.error(e.response?.data?.message || "Logout failed");
            console.log("Error in Logout store: ", e);
        }
    },

    //updateProfile
    updateProfile: async (data) => {
        try {
            set({ isUpdatingProfile: true })
            const result = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: result.data });
            toast.success("Profile Updated")
        } catch (e) {
            toast.error(e.response?.data?.message || "Profile updating failed");
            console.log("Error in UpdateProfile store: ", e);
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    //socket.io connection establish
    connectSocket: () => {

        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        
        const socket = io(BaseUrl,{
            query:{userId: authUser._id},
        })
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        })
    },

    //socket.io connection deleted
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket?.disconnect();
    },

}))