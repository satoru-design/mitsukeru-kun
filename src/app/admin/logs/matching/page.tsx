"use client";

import React from 'react';
import { 
  BarChart, 
  Search, 
  ArrowRightLeft,
  Filter,
  Download
} from 'lucide-react';

const mockMatchingLogs = [
  { id: "M-1001", propId: "PROP-3001", propTitle: "新宿駅徒歩5分 1LDK", ownerId: "OWN-10023", vendorId: "VEND-20041", vendorName: "株式会社クリーンアップ", score: 98, status: "matched", date: "2026/03/16 14:30" },
  { id: "M-1002", propId: "PROP-3001", propTitle: "新宿駅徒歩5分 1LDK", ownerId: "OWN-10023", vendorId: "VEND-20043", vendorName: "山田清掃", score: 85, status: "contacted", date: "2026/03/16 10:15" },
  { id: "M-1003", propId: "PROP-3002", propTitle: "浅草雷門 新築戸建", ownerId: "OWN-10024", vendorId: "VEND-20042", vendorName: "鈴木カメラマン", score: 95, status: "completed", date: "2026/03/10 09:00" },
  { id: "M-1004", propId: "PROP-3004", propTitle: "京都町屋 ゲストハウス", ownerId: "OWN-10027", vendorId: "VEND-20044", vendorName: "合同会社サポート", score: 92, status: "urgent_matched", date: "2026/03/17 08:45" },
  { id: "M-1005", propId: "PROP-3003", propTitle: "大阪難波 リノベM", ownerId: "OWN-10027", vendorId: "VEND-20045", vendorName: "Minpaku Solutions", score: 45, status: "ignored", date: "2026/03/15 11:20" },
];

export default function MatchingLogsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart className="h-6 w-6 mr-3 text-pink-600" />
            マッチングデータログ
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            オーナー案件と業者の自動マッチング結果、スコア傾向、成約ステータスのログを監視します。
          </p>
        </div>
        <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
          <Download className="h-4 w-4 mr-2" />
          CSV出力
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="案件ID, オーナーID, 業者IDで検索" className="w-full pl-9 pr-3 py-2 border rounded-md text-sm" />
          </div>
          <select className="border rounded-md px-3 py-2 text-sm bg-white">
            <option>すべてのステータス</option>
            <option>マッチング済</option>
            <option>交渉中</option>
            <option>完了</option>
            <option>見送り</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">マッチング日時</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">オーナー案件 (依頼側)</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"><ArrowRightLeft className="h-4 w-4 mx-auto" /></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">業者・サービス (受託側)</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">マッチ度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockMatchingLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{log.propTitle}</div>
                    <div className="text-xs text-gray-500">案件: {log.propId} | 依頼者: {log.ownerId}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="h-px bg-gray-300 w-8 mx-auto relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{log.vendorName}</div>
                    <div className="text-xs text-gray-500">業者: {log.vendorId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-sm
                      ${log.score >= 90 ? 'border-pink-500 text-pink-600' : 
                        log.score >= 70 ? 'border-blue-500 text-blue-600' : 
                        'border-gray-300 text-gray-500'}">
                      {log.score}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-700">
                      {log.status}
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
