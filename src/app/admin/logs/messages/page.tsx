"use client";

import React from 'react';
import { 
  MessageSquare, 
  Search, 
  ArrowRightLeft,
  AlertOctagon,
  Download
} from 'lucide-react';

const mockMessageLogs = [
  { id: "MSG-101", fromType: "owner", fromName: "鈴木 一郎", toType: "vendor", toName: "株式会社クリーンアップ", content: "お世話になります。明日の清掃の件ですが...", date: "2026/03/17 09:30", hasAlert: false },
  { id: "MSG-102", fromType: "vendor", fromName: "株式会社クリーンアップ", toType: "owner", toName: "鈴木 一郎", content: "承知いたしました。予定通り10時に伺います。", date: "2026/03/17 09:45", hasAlert: false },
  { id: "MSG-103", fromType: "owner", fromName: "トラブル 太郎", toType: "vendor", toName: "山田清掃", content: "システムを通さずに直接LINEでやり取りしませんか？ IDは...", date: "2026/03/16 15:20", hasAlert: true, alertReason: "直接取引の勧誘・連絡先交換" },
  { id: "MSG-104", fromType: "vendor", fromName: "山田清掃", toType: "owner", toName: "トラブル 太郎", content: "申し訳ありませんが、規約により直接のやり取りは...", date: "2026/03/16 15:25", hasAlert: false },
];

export default function MessageLogsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="h-6 w-6 mr-3 text-cyan-600" />
            メッセージデータログ監視
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            プラットフォーム上のすべてのメッセージ送受信履歴を監視します。NGワード等のアラート検知もここで行います。
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="メッセージ内容、ユーザー名で検索" className="w-full pl-9 pr-3 py-2 border rounded-md text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-2 border rounded-md cursor-pointer">
            <input type="checkbox" className="text-red-500 rounded focus:ring-red-500" />
            <AlertOctagon className="h-4 w-4 text-red-500" />
            アラート検知分のみ表示
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">送受信日時</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">送信者 / 受信者</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">メッセージ内容</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">システム検知</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockMessageLogs.map((log) => (
                <tr key={log.id} className={`hover:bg-gray-50 ${log.hasAlert ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <span className={`text-xs px-1.5 py-0.5 rounded ${log.fromType === 'owner' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                         {log.fromType === 'owner' ? 'ｵｰﾅｰ' : '業者'}
                       </span>
                       <span className="text-sm font-bold">{log.fromName}</span>
                    </div>
                    <div className="text-gray-400 my-1 ml-6"><ArrowRightLeft className="h-3 w-3 rotate-90" /></div>
                    <div className="flex items-center gap-2">
                       <span className={`text-xs px-1.5 py-0.5 rounded ${log.toType === 'owner' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                         {log.toType === 'owner' ? 'ｵｰﾅｰ' : '業者'}
                       </span>
                       <span className="text-sm">{log.toName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm ${log.hasAlert ? 'font-medium text-gray-900' : 'text-gray-600'} line-clamp-3`}>
                      {log.content}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.hasAlert && (
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                          <AlertOctagon className="h-3 w-3 mr-1" />
                          アラート発報
                        </span>
                        <span className="text-[11px] text-red-500">{log.alertReason}</span>
                      </div>
                    )}
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
