import React from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function VendorMessagesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300 h-full flex flex-col justify-center items-center py-20 text-center">
      <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
        <MessageSquare className="w-10 h-10" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">メッセージ管理</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        オーナーからの新規見積もり依頼や、現在進行中のプロジェクトに関するコミュニケーションはすべてこちらで管理します。
      </p>
      
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 w-full max-w-md">
        <p className="text-sm font-bold text-gray-600 mb-4">現在、コンバージョンにつながりやすい「SaaS CRM専用ダッシュボード」への完全移行を進めております。</p>
        <Link href="/vendor-admin" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:-translate-y-0.5">
          新CRMダッシュボード（Kanban）を開く <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
