import React, { useState } from "react";
import { SendHorizontal, Image } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useRef } from "react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessages, selectedUser } = useChatStore();
  const fileInputRef = useRef(null);

  //removing image from preview if not liked
  const removePreview = () => {
    setImagePreview(null);
    if (!fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //previewing Image before sending
  const handleImageChange = (e) => {
    const file = e.target.files[0]; //takes 1st file if selected multiple
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (!text.trim() && !imagePreview) {
        toast.error("type something");
        return;
      } else {
        await sendMessages({ text: text.trim(), image: imagePreview });
        
        //clear field
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (e) {
      console.log("Failed to send message ", e);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Image Preview (if present) */}
      {imagePreview && (
        <div className="flex justify-start mb-2">
          <div className="indicator">
            <button
              className="indicator-item badge badge-primary"
              onClick={removePreview}
            >
              X
            </button>
            <img
              src={imagePreview}
              alt="selected"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-500"
            />
          </div>
        </div>
      )}
      {/* Input Bar */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center rounded-xl gap-2 bg-base-100 p-2 border-t border-gray-700"
      >
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here"
          autoComplete="off"
          className="input input-ghost flex-1 focus:outline-none text-white"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`p-2 rounded hover:text-gray-700 ${
            imagePreview ? "text-green-200" : "text-gray-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="size-6" />
        </button>

        <button
          className="p-2 rounded bg-green-700 hover:bg-green-800"
          type="submit"
        >
          <SendHorizontal className="size-6 text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
