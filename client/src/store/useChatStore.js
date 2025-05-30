import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

// const {authUser} = useAuthStore();
export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

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
            set({ messages: res.data })
        } catch (e) {
            toast.error(e.response.data.message);
            console.log("Error in getSingleUserMessage store", e)
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axiosInstance.post(`/message/sendMessage/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] });
            // console.log(messages)
            toast.success("message sent")
        } catch (e) {
            toast.error(e.response.data.message);
            console.log("Error in sendMessages store", e)
        }
    },

    subscribeToMessage: async () => {
        try {
            const { selectedUser } = get();
            if (!selectedUser) return;


            const socket = useAuthStore.getState().socket;

            // ✅ Clear previous listeners before adding new one
            socket.off("newMessage");

            socket.on("newMessage", (newMessage) => {

                //allow messages only from selected User
                const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
                if (!isMessageFromSelectedUser) return;

                set((state) => ({
                    messages: [...state.messages, newMessage],
                }));
            });

        } catch (e) {
            toast.error(e?.response?.data?.message || "Socket subscription error");
            console.log("Error in subscribeToMessage store", e);
        }
    },

    UnSubscribeToMessage: async () => {

        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    //setting the selectedUser using set.
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))