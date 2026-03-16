"use client";

import React from 'react';
import { 
  Heart, 
  Search, 
  ArrowRightLeft,
  Filter,
  Download
} from 'lucide-react';

const mockLikeLogs = [
  { id: "L-2001", fromType: "owner", fromName: "鈴木 一郎", toType: "vendor", toName: "株式会社クリーンアップ", date: "2026/03/17 10:15", status: "active" },
  { id: "L-2002", fromType: "vendor", fromName: "株式会社クリーンアップ", toType: "owner", toName: "鈴木 一郎", date: "2026/03/16 09:30", status: "active" }, // 相互いいね
  { id: "L-2003", fromType: "owner", fromName: "佐藤 美咲", toType: "vendor", toName: "鈴木カメラマン", date: "2026/03/15 14:20", status: "active" },
  { id: "L-2004", fromType: "vendor", fromName: "山田清掃", toType: "owner", toName: "インベスターズ合同会社", date: "2026/03/14 11:05", status: "removed" },
  { id: "L-2005", fromType: "owner", fromName: "高橋 健太", toType: "vendor", toName: "合同会社サポート", date: "2026/03/12 16:40", status: "active" },
];

export default function LikesLogsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Heart className="h-6 w-6 mr-3 text-rose-500" />
            いいねデータログ (保存リスト)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            オーナーと業者の双方向の「いいね（お気に入り保存）」アクションの履歴と相互マッチ状況を確認します。
          </p>
        </div>
        <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
          <Download className="h-4 w-4 mr-2" />
          CSV出力
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="ユーザー名、IDで検索" className="w-full pl-9 pr-3 py-2 border rounded-md text-sm" />
          </div>
          <select className="border rounded-md px-3 py-2 text-sm bg-white">
            <option>方向：すべて</option>
            <option>オーナー ➡ 業者</option>
            <option>業者 ➡ オーナー</option>
            <option>相互いいね成立</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">アクション日時</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">いいね 送信元</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"><ArrowRightLeft className="h-4 w-4 mx-auto" /></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">いいね 送信先</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockLikeLogs.map((log) => (
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
                    <div className="h-px bg-gray-300 w-12 mx-auto relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-400 rotate-45 transform origin-center"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <span className={`text-xs px-1.5 py-0.5 rounded ${log.toType === 'owner' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                         {log.toType === 'owner' ? 'ｵｰﾅｰ' : '業者'}
                       </span>
                       <span className="text-sm font-bold text-gray-900">{log.toName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.status === 'active' ? (
                      <span className="text-rose-500">
                        <Heart className="h-4 w-4 fill-current" />
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">取り消し済</span>
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
