"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Settings2,
  DollarSign,
  AlignLeft,
  ListTodo,
  CheckSquare
} from 'lucide-react';
import { getQuestionnaireForCategory } from '../../../../../data/questionnaireData';

export default function CategoryDetailClient() {
  const params = useParams();
  // id パラメータを使って実際のデータを引く想定だが、今回は固定で「定期清掃」のデータをモック表示
  const [questions, setQuestions] = useState(getQuestionnaireForCategory("定期清掃") || []);
  
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `new_col_${Date.now()}`,
        title: "新しい設問",
        type: "select",
        group: "details",
        required: false,
        options: []
      }
    ]);
  };

  const getIconForType = (type: string) => {
    switch(type) {
      case 'text':
      case 'textarea': return <AlignLeft className="h-4 w-4 text-gray-500" />;
      case 'number': return <DollarSign className="h-4 w-4 text-emerald-500" />;
      case 'select':
      case 'radio': return <ListTodo className="h-4 w-4 text-blue-500" />;
      case 'checkbox': return <CheckSquare className="h-4 w-4 text-purple-500" />;
      default: return <Settings2 className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/master/categories" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              定期清掃 <span className="text-sm font-normal text-gray-500 ml-3">の料金・設問マスタ</span>
            </h1>
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-sm flex items-center transition-colors">
          <Save className="h-4 w-4 mr-2" />
          マスタを保存
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        <p><strong>自動見積もりと業者単価設定の連動について</strong></p>
        <p className="mt-1">
          ここで設定した「設問（小カテゴリ）」と「選択肢」が、顧客の依頼フォームおよび業者の「単価設定画面」に自動で反映されます。
          <span className="bg-orange-100 text-orange-800 px-1 rounded ml-1 font-bold">基本料金</span> や 
          <span className="bg-emerald-100 text-emerald-800 px-1 rounded ml-1 font-bold">従量課金</span> のフラグを立てることで、見積もり計算エンジンが作動します。
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            
            {/* 設問ヘッダー部 */}
            <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-start gap-4">
              <div className="mt-2 text-gray-400 cursor-grab hover:text-gray-600">
                <GripVertical className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  {getIconForType(q.type)}
                  <input 
                    type="text" 
                    className="flex-1 font-bold text-lg bg-transparent border-b border-dashed border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                    defaultValue={q.title}
                  />
                  
                  <div className="flex items-center gap-2">
                    <select className="text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" defaultValue={q.type}>
                      <option value="select">プルダウン (Select)</option>
                      <option value="radio">単一選択 (Radio)</option>
                      <option value="checkbox">複数選択 (Checkbox)</option>
                      <option value="number">数値入力 (Number)</option>
                      <option value="text">一行テキスト (Text)</option>
                      <option value="textarea">複数行テキスト (Textarea)</option>
                    </select>
                    
                    <label className="flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer ml-2">
                      <input type="checkbox" defaultChecked={q.required} className="rounded text-blue-600 focus:ring-blue-500 mr-1.5" />
                      必須
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">内部変数名:</span>
                    <input type="text" className="font-mono text-xs border border-gray-200 rounded px-2 py-1 bg-gray-100 w-48" defaultValue={q.id} />
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-16">UI表示枠:</span>
                    <select className="border border-gray-200 rounded px-2 py-1 w-32" defaultValue={q.group}>
                      <option value="numerical">数値・時間</option>
                      <option value="rules">運用ルール</option>
                      <option value="scope">作業範囲</option>
                      <option value="details">詳細内容</option>
                      <option value="preferences">希望条件</option>
                    </select>
                  </div>
                  {q.type === 'number' && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-12">単位:</span>
                      <input type="text" className="border border-gray-200 rounded px-2 py-1 w-16" defaultValue={q.unitLabel || ""} placeholder="例: 室" />
                    </div>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-600 transition-colors p-2 mt-1 rounded-md hover:bg-red-50">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {/* 選択肢・単価設定部 (options がある場合) */}
            {['select', 'radio', 'checkbox', 'number'].includes(q.type) && (
              <div className="p-4 bg-white">
                <h4 className="text-sm font-bold text-gray-700 mb-3 ml-9">選択肢および単価設定</h4>
                
                {q.options && q.options.length > 0 ? (
                  <div className="space-y-2 ml-9">
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg p-2.5">
                        <div className="text-gray-400 cursor-grab hover:text-gray-600">
                          <GripVertical className="h-4 w-4" />
                        </div>
                        
                        <input type="text" className="flex-1 text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" defaultValue={opt.label} placeholder="表示名" />
                        <input type="text" className="w-32 font-mono text-xs border-gray-300 rounded bg-gray-100 focus:ring-blue-500 focus:border-blue-500" defaultValue={opt.value} placeholder="内部値" />
                        
                        <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                          <label className="flex items-center text-xs font-bold whitespace-nowrap cursor-pointer">
                            <input type="checkbox" defaultChecked={opt.isBaseMultiplier} className="rounded text-orange-500 focus:ring-orange-500 mr-1.5" />
                            <span className={opt.isBaseMultiplier ? "text-orange-600" : "text-gray-500"}>基本料金化</span>
                          </label>
                          <label className="flex items-center text-xs font-bold whitespace-nowrap cursor-pointer">
                            <input type="checkbox" defaultChecked={opt.isQuantityItem} className="rounded text-emerald-500 focus:ring-emerald-500 mr-1.5" />
                            <span className={opt.isQuantityItem ? "text-emerald-600" : "text-gray-500"}>従量課金化</span>
                          </label>
                        </div>
                        
                        <button className="text-gray-400 hover:text-red-500 transition-colors ml-2">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ml-9 text-sm text-gray-500 italic">
                    選択肢がありません。
                  </div>
                )}
                
                <button className="ml-9 mt-3 text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center transition-colors hover:bg-blue-50 px-2 py-1 rounded">
                  <Plus className="h-4 w-4 mr-1" />
                  選択肢を追加
                </button>
              </div>
            )}
          </div>
        ))}
        
        <button 
          onClick={addQuestion}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex justify-center items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          新しい設問・小カテゴリを追加
        </button>
      </div>
    </div>
  );
}
