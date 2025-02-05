import ChatInterface from "@/components/chat-interface";
import { Suspense } from "react";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChatInterface />
    </main>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
};

export default Page;
