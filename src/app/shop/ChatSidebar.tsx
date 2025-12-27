"use client";

import CustomButton from "@/components/forms/Button";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import { postMessage as postMessageValidation } from "@/constants/formValidation";
import { postMessage as postMessageValues } from "@/constants/formValues";
import { Form, Formik } from "formik";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 How can I help you find the perfect product today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {

    const userMessage: Message = {
      id: Date.now().toString(),
      text: "This is a user message.",
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm here to help with product recommendations.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hi! 👋 How can I help you find the perfect product today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div>
      <div className="mb-4 py-4 flex items-center gap-2 border-b border-muted">
        <div className="flex-1 flex items-center gap-2">
          <MessageCircle size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            Chat Assistant
          </h3>
        </div>

        <CustomButton
          onClick={clearChat}
          variant="danger-outline"
          className="w-fit rounded-sm"
          icon={Trash2}
          iconClassName="w-3 h-3"
        />
      </div>

      <div className="max-h-100 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.isUser
                ? "bg-primary text-background"
                : "bg-muted text-foreground"
                }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-3 py-2 rounded-lg text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <Formik
        initialValues={postMessageValues}
        validationSchema={postMessageValidation}
        onSubmit={handleSendMessage}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form
            onSubmit={handleSendMessage}
            className="pt-3 flex gap-2 border-t border-muted"
          >
            <InputField
              name="message"
              type="text"
              placeholder="Ask me anything..."
            />

            <SubmitButton
              isDirty={dirty}
              isValid={isValid}
              isSubmitting={isSubmitting}
              Icon={Send}
              iconStyle="w-4 h-4"
              label=""
              disabledLabel=""
              submittingLabel=""
              className="w-[50px]"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
