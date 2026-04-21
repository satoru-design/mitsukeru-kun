import React from 'react';
import Link from 'next/link';
import { Users, Search, MoreVertical, ShieldAlert } from 'lucide-react';

export default function AdminUsersList() {
  const users = [
    { id: 1, name: '株式会社クリーンアップ', type: '業者', status: 'Active', email: 'contact@cleanup.example.com' },
    { id: 2, name: '山田 太郎', type: 'オーナー', status: 'Active', email: 'yamada@example.com' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" /> ユーザー管理
          </h1>
          <p className="text-sm text-gray-500 mt-1">全オーナーおよび業者のアカウントを監視・管理します</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="ユーザー名やメールアドレスで検索..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 hover:shadow-sm transition-all">
            フィルター追加
          </button>
        </div>
        
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold">ユーザー名 / メールアドレス</th>
              <th className="px-6 py-3 font-semibold">アカウント区分</th>
              <th className="px-6 py-3 font-semibold">ステータス</th>
              <th className="px-6 py-3 font-semibold text-right">アクション</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    user.type === '業者' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/users/${user.id}`} className="bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600 text-gray-600 px-3 py-1.5 rounded shadow-sm text-xs font-bold transition-all inline-flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> 詳細・監視
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
