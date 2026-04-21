'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Trash2, 
  Save, 
  Settings, 
  ListOrdered,
  CheckCircle2,
  ChevronRight,
  FolderOpen,
  ChevronLeft,
  LayoutTemplate,
  Building2,
  Copy,
  Edit3
} from 'lucide-react';

type QuestionType = 'number' | 'boolean';

interface MenuItem {
  id: string;
  categoryName: string;
  itemName: string;
  minPrice: number | '';
  maxPrice: number | '';
  questionName: string;
  description: string;
  questionType: QuestionType;
  useWizard: boolean;
  numberMin?: number | '';
  numberMax?: number | '';
  numberStep?: number | '';
  numberUnit?: string;
  notice: string;
}

const PROPERTY_HEARING_ITEMS = [
  '物件所在地(郵便番号)', 
  '物件種別', 
  '広さ(㎡)', 
  '間取り', 
  '築年数', 
  '階数', 
  '部屋位置', 
  'エレベーター', 
  '駐車場'
];

const MOCK_SERVICES = [
  { id: '1', name: 'ハウスクリーニング', count: 12 },
  { id: '2', name: 'リフォーム', count: 5 },
  { id: '3', name: '害虫駆除', count: 3 },
  { id: '4', name: '庭木剪定', count: 8 },
];

export default function MenusManagementPage() {
  const [selectedServiceId, setSelectedServiceId] = useState('1');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 'm1',
      categoryName: '床清掃',
      itemName: 'フローリングワックス掛け',
      minPrice: 1000,
      maxPrice: 3000,
      questionName: '清掃面積を教えてください',
      description: '家具の移動が必要な場合は事前にお知らせください。',
      questionType: 'number',
      useWizard: true,
      numberMin: 10,
      numberMax: 100,
      numberStep: 1,
      numberUnit: '㎡',
      notice: '不要な場合は0を入力してください'
    }
  ]);

  // Service Basic Info States
  const [currentServiceName, setCurrentServiceName] = useState('ハウスクリーニング');
  const [hearingItems, setHearingItems] = useState<string[]>(['物件所在地(郵便番号)', '広さ(㎡)', '間取り']);

  const toggleHearingItem = (item: string) => {
    if (hearingItems.includes(item)) {
      setHearingItems(hearingItems.filter(i => i !== item));
    } else {
      setHearingItems([...hearingItems, item]);
    }
  };

  // Form states
  const [categoryName, setCategoryName] = useState('');
  const [itemName, setItemName] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [questionName, setQuestionName] = useState('');
  const [description, setDescription] = useState('');
  const [notice, setNotice] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('number');
  const [useWizard, setUseWizard] = useState<boolean>(false);
  
  // Specific to 'number' type
  const [numberMin, setNumberMin] = useState<number | ''>('');
  const [numberMax, setNumberMax] = useState<number | ''>('');
  const [numberStep, setNumberStep] = useState<number | ''>('');
  const [numberUnit, setNumberUnit] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName || !itemName || !questionName) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      categoryName,
      itemName,
      minPrice,
      maxPrice,
      questionName,
      description,
      questionType,
      useWizard,
      numberMin: questionType === 'number' ? numberMin : undefined,
      numberMax: questionType === 'number' ? numberMax : undefined,
      numberStep: questionType === 'number' ? numberStep : undefined,
      numberUnit: questionType === 'number' ? numberUnit : undefined,
      notice
    };

    setMenuItems([...menuItems, newItem]);
    
    // Reset fields except category
    setItemName('');
    setMinPrice('');
    setMaxPrice('');
    setQuestionName('');
    setDescription('');
    setNotice('');
    setNumberMin('');
    setNumberMax('');
    setNumberStep('');
    setNumberUnit('');
  };

  const handleDeleteItem = (id: string) => {
    if(confirm('この項目を削除しますか？')){
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F1F5F9] pb-12 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-8 py-5 sticky top-0 z-30 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                <LayoutTemplate className="w-6 h-6 text-blue-600" />
                サービス＆見積項目マスタ設定
              </h1>
              <p className="text-sm font-bold text-gray-500 mt-1">業者およびオーナーが利用するテンプレートの管理</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/admin/menus/preview" className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl text-sm font-black transition-all shadow-sm">
              変更をプレビュー
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
              <Save className="w-4 h-4" /> 全て保存して公開
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar: Services List */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          
          {/* Service Selector Block */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="font-black text-gray-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-gray-400" />
                対象サービス
              </h2>
              <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
              {MOCK_SERVICES.map(service => (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`
                    w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all
                    ${selectedServiceId === service.id 
                      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100 scale-[1.02]' 
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                    }
                  `}
                >
                  {service.name}
                  <span className={`px-2 py-0.5 rounded-md text-[10px] ${selectedServiceId === service.id ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                    {service.count} 項目
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Wide Settings */}
          {selectedServiceId && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 animate-in slide-in-from-left-4 duration-300">
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                サービス基本設定
              </h3>
              
              <div className="mb-5">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">サービス名</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={currentServiceName}
                    onChange={(e) => setCurrentServiceName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all pr-10"
                  />
                  <Edit3 className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest">要・事前のヒアリング項目</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_HEARING_ITEMS.map((item) => {
                    const isSelected = hearingItems.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleHearingItem(item)}
                        className={`
                          text-xs font-bold px-3 py-2 rounded-lg border transition-all active:scale-95
                          ${isSelected 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                          }
                        `}
                      >
                       <div className="flex items-center gap-1.5">
                         {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                         {item}
                       </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[11px] font-bold text-gray-400 mt-3 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  ※これらの項目は、このサービスで依頼が進む際にオーナー様へ入力を促します。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Builder */}
        <div className="flex-1 min-w-0 flex flex-col xl:flex-row gap-6">
          
          {/* Builder Form */}
          <div className="flex-1 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-200 p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="border-b border-gray-100 pb-5 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Plus className="w-6 h-6 text-blue-600 bg-blue-50 rounded-lg p-1" />
                  新規見積項目の追加
                </h2>
                <p className="text-xs font-bold text-gray-500 mt-2">ウィザードなどで使用される詳細な質問・単価計算ロジックを構成します</p>
              </div>
            </div>

            <form onSubmit={handleAddItem} className="space-y-8 max-w-2xl">
              {/* Category & Item */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-900 uppercase">大分類カテゴリ</label>
                  <input required type="text" placeholder="例: 床清掃" value={categoryName} onChange={e => setCategoryName(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-900 uppercase">項目名</label>
                  <input required type="text" placeholder="例: フローリングワックス掛け" value={itemName} onChange={e => setItemName(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm" />
                </div>
              </div>

              {/* Pricing */}
              <div>
                 <label className="block text-sm font-black text-gray-900 mb-3 border-l-4 border-amber-400 pl-3">業者側設定可能 単価レンジ</label>
                 <div className="flex items-center gap-4 bg-amber-50/30 p-5 rounded-2xl border border-amber-100">
                   <div className="flex items-center">
                     <span className="bg-white border-y border-l border-gray-200 text-gray-500 px-4 py-3 rounded-l-xl font-bold">¥</span>
                     <input required type="number" placeholder="1000" value={minPrice} onChange={e => setMinPrice(e.target.value ? Number(e.target.value) : '')} className="w-32 bg-white border border-gray-200 border-x-0 py-3 px-3 text-sm font-bold text-center focus:z-10 outline-none focus:border-blue-500" />
                   </div>
                   <span className="font-black text-gray-400">〜</span>
                   <div className="flex items-center">
                     <span className="bg-white border-y border-l border-gray-200 text-gray-500 px-4 py-3 rounded-l-xl font-bold">¥</span>
                     <input required type="number" placeholder="3000" value={maxPrice} onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : '')} className="w-32 bg-white border border-gray-200 py-3 px-3 text-sm font-bold rounded-r-xl text-center focus:z-10 outline-none focus:border-blue-500 shadow-sm" />
                   </div>
                 </div>
              </div>

              <div className="border-t border-gray-100"></div>

              {/* Question Definition */}
              <div>
                 <label className="block text-sm font-black text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">見込み顧客への質問（ウィザード表示用）</label>
                 <div className="space-y-5">
                   <div className="space-y-2">
                     <label className="text-xs font-black text-gray-500">質問タイトル</label>
                     <input required type="text" placeholder="例: 清掃面積を教えてください" value={questionName} onChange={e => setQuestionName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all" />
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs font-black text-gray-500">質問タイプ</label>
                       <div className="flex bg-gray-100 p-1 rounded-xl">
                         <button type="button" onClick={() => setQuestionType('number')} className={`flex-1 py-2 text-sm font-black rounded-lg transition-all ${questionType === 'number' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                           数値入力 (数量)
                         </button>
                         <button type="button" onClick={() => setQuestionType('boolean')} className={`flex-1 py-2 text-sm font-black rounded-lg transition-all ${questionType === 'boolean' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                           「はい/いいえ」
                         </button>
                       </div>
                     </div>
                     <div className="space-y-3 pt-6">
                       <label className="flex justify-center items-center gap-3 p-3 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                         <input type="checkbox" checked={useWizard} onChange={e => setUseWizard(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                         <span className="text-sm font-black text-gray-700">自動見積もりの対象にする</span>
                       </label>
                     </div>
                   </div>

                   {/* Conditional Numeric Inputs */}
                   {questionType === 'number' && (
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                       <div className="col-span-2 md:col-span-1 space-y-2">
                         <label className="text-[10px] font-black text-blue-800 uppercase">最小値</label>
                         <input type="number" value={numberMin} onChange={e => setNumberMin(e.target.value ? Number(e.target.value) : '')} placeholder="例: 10" className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-bold focus:border-blue-500 outline-none text-center shadow-sm" />
                       </div>
                       <div className="col-span-2 md:col-span-1 space-y-2">
                         <label className="text-[10px] font-black text-blue-800 uppercase">最大値</label>
                         <input type="number" value={numberMax} onChange={e => setNumberMax(e.target.value ? Number(e.target.value) : '')} placeholder="例: 100" className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-bold focus:border-blue-500 outline-none text-center shadow-sm" />
                       </div>
                       <div className="col-span-2 md:col-span-1 space-y-2">
                         <label className="text-[10px] font-black text-blue-800 uppercase">ステップ</label>
                         <input type="number" value={numberStep} onChange={e => setNumberStep(e.target.value ? Number(e.target.value) : '')} placeholder="例: 1" className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-bold focus:border-blue-500 outline-none text-center shadow-sm" />
                       </div>
                       <div className="col-span-2 md:col-span-1 space-y-2">
                         <label className="text-[10px] font-black text-blue-800 uppercase">単位</label>
                         <input type="text" value={numberUnit} onChange={e => setNumberUnit(e.target.value)} placeholder="例: ㎡" className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-bold focus:border-blue-500 outline-none text-center shadow-sm" />
                       </div>
                     </div>
                   )}

                   <div className="space-y-2">
                     <label className="text-xs font-black text-gray-500 flex justify-between">
                       <span>説明・補足テキスト</span>
                       <span className="text-gray-400">オプショナル</span>
                     </label>
                     <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="顧客向けに、どう入力すればよいかのヒントを記載" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all resize-y" />
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs font-black text-red-500 flex justify-between">
                       <span>注意書きフィールド</span>
                       <span className="text-red-300">Phase 0 要件</span>
                     </label>
                     <textarea rows={2} value={notice} onChange={e => setNotice(e.target.value)} placeholder="例：駐車スペースがない場合は別途パーキング代を頂戴します。" className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-bold text-red-900 placeholder-red-300 focus:bg-white focus:border-red-400 outline-none transition-all resize-y" />
                   </div>
                 </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button type="submit" className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-black transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> 変更をリストに追加
                </button>
              </div>
            </form>
          </div>

          {/* Current Items List */}
          <div className="w-full xl:w-[450px] shrink-0 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-200 flex flex-col h-[800px] xl:sticky xl:top-28 xl:self-start">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 rounded-t-3xl">
              <h3 className="font-black text-gray-900 flex items-center justify-between">
                <span className="flex items-center gap-2"><ListOrdered className="w-5 h-5 text-gray-400" /> 現在の設定項目</span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2.5 py-0.5 rounded-md">{menuItems.length} 件</span>
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
               {menuItems.map(item => (
                 <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm relative group hover:border-blue-300 hover:shadow-md transition-all">
                   <div className="absolute -top-3 -left-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md z-10 border border-gray-900">
                     {item.categoryName}
                   </div>
                   <button onClick={() => handleDeleteItem(item.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                     <Trash2 className="w-4 h-4" />
                   </button>
                   
                   <div className="pt-2 mb-3 pr-8">
                     <h4 className="font-black text-gray-900 text-base leading-snug">{item.itemName}</h4>
                     <p className="text-[11px] font-bold text-gray-500 mt-1 flex gap-1">
                       {item.questionType === 'number' ? <span className="text-blue-600 bg-blue-50 px-1 rounded">数値型</span> : <span className="text-emerald-600 bg-emerald-50 px-1 rounded">真偽型</span>}
                       {item.useWizard && <span className="text-amber-600 bg-amber-50 px-1 rounded">見積反映</span>}
                     </p>
                   </div>
                   
                   <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mb-3 relative overflow-hidden">
                     <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-500"></div>
                     <p className="text-xs font-bold text-gray-800 leading-relaxed mb-1">{item.questionName}</p>
                     {item.notice && <p className="text-[10px] font-bold text-red-600 leading-snug break-words">【注】{item.notice}</p>}
                   </div>

                   <div className="flex items-center justify-between mt-auto">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">単価設定幅</span>
                     <span className="font-black text-gray-900">¥{item.minPrice.toLocaleString()} 〜 ¥{item.maxPrice.toLocaleString()}</span>
                   </div>
                 </div>
               ))}
               
               {menuItems.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 border-2 border-dashed border-gray-200 rounded-2xl m-2 opacity-60 bg-white">
                   <ListOrdered className="w-10 h-10 text-gray-300" />
                   <div className="text-sm font-bold text-center">
                     まだ項目がありません<br/><p className="text-xs font-medium mt-1 text-gray-400">フォームから新規追加してください</p>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
