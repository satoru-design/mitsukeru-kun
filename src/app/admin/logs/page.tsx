import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Heart, MessageSquare } from 'lucide-react';

export default function AdminLogsRootPage() {
  const logCategories = [
    { title: 'マッチング＆システム処理', path: '/admin/logs/matching', icon: <Activity className="w-6 h-6 text-blue-500"/>, desc: 'トランザクションやバックエンドの処理ログ' },
    { title: '不正アクセス・ブラックリスト', path: '/admin/logs/blacklist', icon: <ShieldAlert className="w-6 h-6 text-red-500"/>, desc: 'アクセスブロックやペナルティ実行ログ' },
    { title: 'お気に入り・保存アクション', path: '/admin/logs/likes', icon: <Heart className="w-6 h-6 text-pink-500"/>, desc: 'ユーザーのブックマーク等のアクティビティ' },
    { title: 'メッセージ送受信監査', path: '/admin/logs/messages', icon: <MessageSquare className="w-6 h-6 text-emerald-500"/>, desc: 'プラットフォーム内の全チャットメッセージ通信ログ' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            システム監査ログ
          </h1>
          <p className="text-sm text-gray-500 mt-1">システム全体の稼働やユーザーのアクティビティを監視します</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logCategories.map((cat, i) => (
          <Link key={i} href={cat.path} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex gap-4 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="p-3 bg-gray-50 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{cat.title}</h2>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
