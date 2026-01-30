"use client";

import PageHolder from "@/app/dashboard/DashboardPageHolder";
import { useGetAllMessages } from "@/hooks/useMessage";
import { Message } from "@/types/global";
import MessageItem from "./Message";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";

const MessagesPage: React.FC = () => {
  const { data, isFetching, isError, error, refetch } = useGetAllMessages()
  const messages: Message[] = data?.data || [];

  return (
    <PageHolder
      title="Messages"
      desc="View and manage messages sent by users."
    >
      {isFetching ? <LoadingPage />
        : isError ? <ErrorPage action={refetch} msg={error.message} />
          : messages.length === 0 ? <EmptyElement
            title="No Messages yet"
            desc="You have not received any messages yet."
          />
            : <div className="space-y-4 overflow-y-auto">

              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </div>
      }
    </PageHolder>
  );
};

export default MessagesPage;
