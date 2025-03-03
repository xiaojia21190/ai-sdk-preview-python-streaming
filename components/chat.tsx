"use client";

import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { MultimodalInput } from "@/components/multimodal-input";
import { Overview } from "@/components/overview";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";

export function Chat() {
  const chatId = "001";

  const { messages, setMessages, handleSubmit, input, setInput, append, status, stop } = useChat({
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    onError: (error) => {
      console.error("聊天错误:", error);
      toast.error(error.message || "聊天请求出错，请稍后再试");
    },
    onResponse: (response) => {
      if (!response.ok) {
        toast.error(`服务器响应错误: ${response.status}`);
      }
    },
    onFinish: (res) => {
      console.log("流式响应结束");
    },
  });

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
      <div ref={messagesContainerRef} className="flex flex-col flex-1 min-w-0 gap-6 px-4 pt-4 overflow-y-scroll">
        {messages.length === 0 && <Overview />}

        {messages.map((message, index) => (
          <PreviewMessage key={message.id} chatId={chatId} message={message} />
        ))}

        {status === "streaming" && messages.length > 0 && messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        {status === "error" && <div className="text-sm text-center text-muted-foreground">出错了！！！</div>}

        <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
      </div>

      <form className="flex w-full gap-2 px-4 pb-4 mx-auto bg-background md:pb-6 md:max-w-3xl">
        <MultimodalInput chatId={chatId} input={input} setInput={setInput} handleSubmit={handleSubmit} isLoading={status} stop={stop} messages={messages} setMessages={setMessages} append={append} />
      </form>
    </div>
  );
}
