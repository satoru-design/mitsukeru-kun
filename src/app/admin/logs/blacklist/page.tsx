"use client";

import React from 'react';
import Link from 'next/link';
import { 
  UserMinus, 
  Search, 
  ArrowRightLeft,
  AlertTriangle,
  Download
} from 'lucide-react';

const mockBlacklistLogs = [
  { id: "BL-3001", fromType: "vendor", fromName: "株式会社クリーンアップ", toType: "owner", toName: "トラブル 太郎", reason: "連絡が途絶えたため", date: "2026/03/15 14:00" },
  { id: "BL-3002", fromType: "owner", fromName: "佐藤 美咲", toType: "vendor", toName: "山田清掃", reason: "作業品質が著しく低かった", date: "2026/03/10 11:30" },
  { id: "BL-3003", fromType: "vendor", fromName: "鈴木カメラマン", toType: "owner", toName: "加藤 裕子", reason: "不当な要求があった", date: "2026/02/25 09:15" },
];

export default function BlacklistLogsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <UserMinus className="h-6 w-6 mr-3 text-slate-700" />
            ブラックリストログ
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            ユーザー間でのブロック（ブラックリスト追加）履歴を確認し、プラットフォーム内のトラブルの芽を監視します。
          </p>
        </div>
        <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
          <Download className="h-4 w-4 mr-2" />
          CSV出力
        </button>
      </div>

      {/* Alert Panel */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
        <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-bold text-red-800">注視すべきユーザー</h3>
          <p className="text-xs text-red-700 mt-1">
            短期間に複数のユーザーからブラックリストに追加されたアカウントは、重大な規約違反を行っている可能性があります。詳細ログをご確認の上、ペナルティ等の対応を検討してください。
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="ユーザー名、IDで検索" className="w-full pl-9 pr-3 py-2 border rounded-md text-sm" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">登録日時</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">登録した人 (ブロック元)</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"><UserMinus className="h-4 w-4 mx-auto text-slate-400" /></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">登録された人 (ブロック先)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">理由・メモ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockBlacklistLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <span className={`text-xs px-1.5 py-0.5 rounded ${log.fromType === 'owner' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                         {log.fromType === 'owner' ? 'ｵｰﾅｰ' : '業者'}
                       </span>
                       <span className="text-sm font-bold text-gray-900">{log.fromName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Block</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <span className={`text-xs px-1.5 py-0.5 rounded ${log.toType === 'owner' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                         {log.toType === 'owner' ? 'ｵｰﾅｰ' : '業者'}
                       </span>
                       <Link href={`/admin/users/dummy-id`} className="text-sm font-bold text-red-600 hover:underline">{log.toName}</Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {log.reason}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
