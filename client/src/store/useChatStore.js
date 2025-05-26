import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

// const {authUser} = useAuthStore();
export const useChatStore = create((set, get) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    isMessageSending: false,

    getUser: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/message/getAllUser");
            set({ users: res.data });
            // console.log("message from message Store",res.data);
        } catch (e) {
            toast.error(e.response.data.message);
            console.log("Error in getUser store", e)
        } finally {
            set({ isUserLoading: false });
        }
    },

    getSingleUserMessage: async (id) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${id}`)
            set({ message: res.data })
        } catch (e) {
            toast.error(e.response.data.message);
            console.log("Error in getSingleUserMessage store", e)
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessages: async (messageData) => {
        const {selectedUser, message} = get()
        set({ isMessageSending: true });
        try {
            const res = await axiosInstance.post(`/message/sendMessage/${selectedUser._id}`, messageData)
            set({message:[...message,res.data]});
            toast.success("message sent")
            set({ isMessageSending: false });
        } catch (e) {
            toast.error(e.response.data.message);
            console.log("Error in sendMessages store", e)
        } finally {
            set({ isMessageSending: false });
        }
    },

    //setting the selectedUser using set.
    setSelectedUser: (user) => set({ selectedUser: user }),
}))