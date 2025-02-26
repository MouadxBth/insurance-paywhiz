"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Bot,
  ChevronDown,
  ChevronUp,
  Loader2,
  MessageSquare,
  Send,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hi there! I'm your PayWhiz Insurance Assistant. How can I help you choose the right insurance plan today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "What insurance plan is best for me?",
  "How do I compare different plans?",
  "What does employer contribution mean?",
  "How much coverage do I need?",
  "What's the difference between deductible and premium?",
];

export function InsuranceChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<{
    id: string;
    content: string;
    fullContent: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const [suggestionsOpen, setSuggestionsOpen] = useState(true);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // Auto-open the chatbot after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setSuggestionsOpen(false);

    // Simulate API delay before starting to stream
    setTimeout(() => {
      const response = generateResponse(input);
      const messageId = (Date.now() + 1).toString();

      // Initialize streaming message
      setStreamingMessage({
        id: messageId,
        content: "",
        fullContent: response,
      });

      // Start streaming the message character by character

      let index = 0;
      const streamInterval = setInterval(() => {
        if (index < response.length) {
          setStreamingMessage((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              content: prev.content + response[index],
            };
          });
          index++;
        } else {
          // Streaming complete
          clearInterval(streamInterval);

          // Add the complete message to the messages array
          setMessages((prev) => [
            ...prev,
            {
              id: messageId,
              content: response,
              role: "assistant",
              timestamp: new Date(),
            },
          ]);

          // Clear streaming state
          setStreamingMessage(null);
          setIsLoading(false);
        }
      }, 15);
    }, 500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSendMessage();
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("best") || lowerQuery.includes("recommend")) {
      return "The best insurance plan depends on your specific needs. For most employees, I recommend starting with our Standard Auto and Home plans which provide good coverage at reasonable rates. If you have dependents, consider our Family Protection Plan for life insurance. Would you like me to explain any of these plans in more detail?";
    }

    if (lowerQuery.includes("compare")) {
      return "You can compare plans by going to the 'Compare' tab where you can select specific plans to see side-by-side. Look at monthly premiums, coverage amounts, deductibles, and special features. Remember that the lowest premium isn't always the best value - consider the coverage you're getting for the price.";
    }

    if (lowerQuery.includes("employer contribution")) {
      return "Employer contribution is the percentage of your insurance premium that your company pays for you. For example, if your plan costs $100/month with a 15% employer contribution, your company pays $15 and you pay $85. This is a valuable benefit that effectively reduces your insurance costs.";
    }

    if (lowerQuery.includes("coverage") && lowerQuery.includes("need")) {
      return "For auto insurance, your coverage should at minimum meet state requirements, but ideally cover the full value of your vehicle plus enough liability to protect your assets. For home insurance, you need enough to rebuild your home and replace possessions. For life insurance, a common recommendation is 10x your annual salary, but this varies based on your dependents and financial situation.";
    }

    if (lowerQuery.includes("deductible") && lowerQuery.includes("premium")) {
      return "Your premium is the amount you pay monthly for insurance coverage. Your deductible is what you pay out-of-pocket before insurance covers the rest of a claim. Generally, plans with higher deductibles have lower premiums, and vice versa. If you rarely make claims, a higher deductible/lower premium plan might save you money.";
    }

    return "That's a great question about insurance. To give you the most accurate information, I'd recommend checking the plan details in the 'Explore Plans' tab or using the comparison tool in the 'Compare' tab. You can also speak with your HR representative for personalized advice about your specific situation.";
  };

  return (
    <>
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 9999px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Chatbot toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg z-50"
        size="icon"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageSquare className="h-5 w-5" />
        )}
      </Button>

      {/* Chatbot window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-20 right-4 w-80 md:w-96 shadow-xl z-40 transition-all duration-300 ease-in-out flex flex-col",
            isMinimized ? "h-14" : "h-[500px] max-h-[80vh]"
          )}
        >
          <CardHeader
            className="p-3 border-b flex flex-row items-center justify-between cursor-pointer shrink-0"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm">Insurance Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
            >
              {isMinimized ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-0 overflow-hidden flex flex-col h-[calc(100%-110px)]">
                <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 max-w-[80%] text-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && !streamingMessage && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-3 py-2 bg-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}

                  {streamingMessage && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-3 py-2 max-w-[80%] text-sm bg-muted">
                        {streamingMessage.content}
                        {streamingMessage.content.length <
                          streamingMessage.fullContent.length && (
                          <span className="inline-block w-1 h-4 ml-0.5 bg-primary animate-pulse" />
                        )}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {suggestionsOpen ? (
                  <div className="px-3 py-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-auto py-1 px-2"
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </CardContent>

              <CardFooter className="p-3 pt-0 border-t mt-auto shrink-0">
                <form
                  onSubmit={handleSendMessage}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
}
