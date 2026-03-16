"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockChats } from "../../data/mockData";

export default function ChatIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // If there are existing chats, redirect to the most recent one automatically
    if (mockChats.length > 0) {
      router.replace(`/chat/${mockChats[0].id}`);
    } else {
      router.replace(`/mypage`);
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
      <p>メッセージを読み込み中...</p>
    </div>
  );
}
