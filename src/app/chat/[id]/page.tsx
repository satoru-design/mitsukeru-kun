import { mockChats } from "../../../data/mockData";
import ChatClient from "./ChatClient";

// Required for Static Export (output: 'export') with dynamic routes
export async function generateStaticParams() {
  return mockChats.map((chat) => ({
    id: chat.id.toString(),
  }));
}

export default async function ChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const chat = mockChats.find(c => c.id === resolvedParams.id);

  if (!chat) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>チャットが見つかりません</div>;
  }

  return <ChatClient chat={chat} mockChats={mockChats} />;
}
