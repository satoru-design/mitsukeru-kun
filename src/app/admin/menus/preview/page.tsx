"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Maximize,
  Layout,
  Clock,
  Layers,
  ArrowUpDown,
  Car,
  Calculator,
  Save,
  Send,
  Plus
} from 'lucide-react';

export default function VendorQuotePreviewPage() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    'item-1': 80,
    'item-2': 1,
    'item-3': 0,
  });

  const menuItems = [
    { id: 'item-1', category: '床清掃', name: 'フローリングワックス掛け', type: 'number', unitPrice: 1500, unit: '㎡', notice: '障害物が多い場合は加算検討', min: 10, max: 200 },
    { id: 'item-2', category: '水回り', name: '浴室カビ取りコーティング', type: 'boolean', unitPrice: 18000, unit: '式', notice: '窓なし浴室の場合は必須推奨' },
    { id: 'item-3', category: '水回り', name: '洗面台撥水コート', type: 'boolean', unitPrice: 5000, unit: '箇所', notice: '不要な場合は0を入力してください' },
  ];

  const handleQuantityChange = (id: string, value: string) => {
    const val = parseInt(value, 10);
    setQuantities({
      ...quantities,
      [id]: isNaN(val) ? 0 : val
    });
  };

  const calculateTotal = () => {
    return menuItems.reduce((acc, item) => {
      const q = quantities[item.id] || 0;
      return acc + (item.unitPrice * q);
    }, 0);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/menus" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              見積作成画面プレビュー
              <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
                業者側UI確認用
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-colors flex items-center">
            <Save className="h-4 w-4 mr-2" />
            下書き保存
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm flex items-center transition-colors">
            <Send className="h-4 w-4 mr-2" />
            見積もりを送信
          </button>
        </div>
      </div>

      <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex gap-3 text-sm text-blue-900 mb-8">
        <div className="mt-0.5">💡</div>
        <p>
          この画面は、業者がオーナーへ見積もりを提示する際の画面イメージです。<br/>
          ここで入力された数量と単価を基に見積もりが計算され、オーナーへ送信されます。
        </p>
      </div>

      {/* 物件情報カード (Property Information Card) */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
          対象の物件情報 (事前ヒアリング内容)
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="font-bold text-gray-900 text-lg">新宿御苑前 マンション 302号室</div>
            <div className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
              オーナー入力済
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" /> 物件所在地
                </div>
                <div className="text-sm font-bold text-gray-900">〒160-0022 東京都新宿区...</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1" /> 物件種別
                </div>
                <div className="text-sm font-bold text-gray-900">マンション</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <Maximize className="w-3.5 h-3.5 mr-1" /> 広さ(㎡)
                </div>
                <div className="text-sm font-bold text-gray-900">85 ㎡</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <Layout className="w-3.5 h-3.5 mr-1" /> 間取り
                </div>
                <div className="text-sm font-bold text-gray-900">3LDK</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" /> 築年数
                </div>
                <div className="text-sm font-bold text-gray-900">築15年</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1" /> 階数 / 部屋位置
                </div>
                <div className="text-sm font-bold text-gray-900">3階 / 角部屋</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <ArrowUpDown className="w-3.5 h-3.5 mr-1" /> エレベーター
                </div>
                <div className="text-sm font-bold text-gray-900">あり</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 flex items-center">
                  <Car className="w-3.5 h-3.5 mr-1" /> 駐車場
                </div>
                <div className="text-sm font-bold text-gray-900">なし (近隣コインパーキング近)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 見積明細テーブル (Estimation Detail Table) */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
          見積明細作成
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm">
                  <th className="px-6 py-4 font-bold text-gray-600">お見積り項目</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-right w-40">単価</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-center w-32">数量</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-right w-48">金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {menuItems.map((item) => {
                  const qty = quantities[item.id] || 0;
                  const total = item.unitPrice * qty;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <span className="font-bold text-gray-900">{item.name}</span>
                          </div>
                          {item.notice && (
                            <div className="mt-1 text-xs text-amber-800 bg-amber-50 py-1 px-2 rounded-md border border-amber-100 inline-block fit-content">
                              <span className="font-bold mr-1">注意:</span> {item.notice}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-medium text-gray-700">
                        ¥ {item.unitPrice.toLocaleString()} <span className="text-xs text-gray-400">/ {item.unit}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <input 
                            type="number"
                            min="0"
                            className="w-20 text-center border border-gray-300 rounded-md py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            value={quantities[item.id] || ''}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-gray-900 text-lg">
                        ¥ {total.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-50 border-t border-gray-200 p-6 flex flex-col items-end gap-2">
             <div className="flex items-center gap-8 text-gray-600">
               <span className="font-medium text-sm">小計</span>
               <span className="w-32 text-right font-bold">¥ {calculateTotal().toLocaleString()}</span>
             </div>
             <div className="flex items-center gap-8 text-gray-600">
               <span className="font-medium text-sm">消費税 (10%)</span>
               <span className="w-32 text-right font-bold">¥ {Math.floor(calculateTotal() * 0.1).toLocaleString()}</span>
             </div>
             <div className="flex items-center gap-8 mt-2 pt-4 border-t border-gray-300">
               <span className="font-bold text-gray-800 text-lg">合計見積金額</span>
               <span className="w-40 text-right font-black text-indigo-700 text-3xl">
                 ¥ {Math.floor(calculateTotal() * 1.1).toLocaleString()}
               </span>
             </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-8">
        <button className="bg-white border-2 border-dashed border-gray-300 text-gray-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold flex items-center justify-center transition-all w-full md:w-2/3">
          <Plus className="w-5 h-5 mr-2" />
          自由入力で項目を追加する
        </button>
      </div>

    </div>
  );
}
