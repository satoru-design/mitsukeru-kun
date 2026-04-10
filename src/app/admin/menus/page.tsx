'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Settings, 
  ListOrdered,
  CheckCircle2,
  ChevronRight,
  FolderOpen
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
}

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
      numberUnit: '㎡'
    }
  ]);

  // Form states
  const [categoryName, setCategoryName] = useState('');
  const [itemName, setItemName] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [questionName, setQuestionName] = useState('');
  const [description, setDescription] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('number');
  const [useWizard, setUseWizard] = useState<boolean>(false);
  
  // Specific to 'number' type
  const [numberMin, setNumberMin] = useState<number | ''>('');
  const [numberMax, setNumberMax] = useState<number | ''>('');
  const [numberStep, setNumberStep] = useState<number | ''>('');
  const [numberUnit, setNumberUnit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MenuItem = {
      id: Math.random().toString(36).substring(7),
      categoryName,
      itemName,
      minPrice,
      maxPrice,
      questionName,
      description,
      questionType,
      useWizard,
      ...(questionType === 'number' ? {
        numberMin,
        numberMax,
        numberStep,
        numberUnit,
      } : {})
    };

    setMenuItems([newItem, ...menuItems]);

    // Reset some form fields
    setItemName('');
    setQuestionName('');
    setDescription('');
    setMinPrice('');
    setMaxPrice('');
    setNumberMin('');
    setNumberMax('');
    setNumberStep('');
    setNumberUnit('');
  };

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 text-gray-900 w-full">
      {/* 左カラム: サービス一覧 */}
      <div className="w-1/4 min-w-[250px] bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex sticky top-0">
          <FolderOpen className="w-5 h-5 mr-2 text-indigo-600" />
          <h2 className="font-bold text-gray-800">サービス一覧</h2>
        </div>
        <ul className="p-2 space-y-1">
          {MOCK_SERVICES.map(service => (
            <li key={service.id}>
              <button
                onClick={() => setSelectedServiceId(service.id)}
                className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
                  selectedServiceId === service.id
                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent'
                }`}
              >
                <span className="font-medium">{service.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedServiceId === service.id ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-500'
                }`}>
                  {service.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 右カラム: 管理UIとフォーム */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-6 max-w-5xl mx-auto w-full">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-indigo-600" />
              メニュー・見積項目管理
            </h1>
            <p className="text-gray-500 mt-2">
              選択中のサービスに対する見積メニューと、ユーザーへのヒアリング設問を設定します。
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* メニュー登録フォーム */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  新規メニュー登録
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* 1. 見積分類名 & 2. 明細名 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">見積分類名</label>
                    <input 
                      type="text" 
                      required
                      placeholder="例: 床清掃"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">明細名</label>
                    <input 
                      type="text" 
                      required
                      placeholder="例: 床清掃(㎡単価)"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* 3. 単価下限 & 4. 単価上限 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">単価下限 (円)</label>
                    <input 
                      type="number" 
                      required
                      min={0}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">単価上限 (円)</label>
                    <input 
                      type="number" 
                      required
                      min={0}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* 5. 設問名 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">設問名</label>
                  <input 
                    type="text" 
                    required
                    placeholder="例: 床面積を教えてください"
                    value={questionName}
                    onChange={(e) => setQuestionName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* 6. 補足説明文 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">補足説明文 <span className="text-xs text-gray-500 font-normal ml-2">(ユーザーへの注釈)</span></label>
                  <textarea 
                    rows={2}
                    placeholder="UX改善のための追加項目例: 見積りに影響が出る可能性があるため、障害物がある場合は事前にお知らせください。"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* 7. 設問種類 & 8. ウィザード利用 */}
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">設問種類</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="questionType" 
                          value="number" 
                          checked={questionType === 'number'} 
                          onChange={() => setQuestionType('number')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">数値選択</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="questionType" 
                          value="boolean" 
                          checked={questionType === 'boolean'} 
                          onChange={() => setQuestionType('boolean')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">ありなし選択</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ウィザード利用</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="useWizard" 
                          checked={useWizard === true} 
                          onChange={() => setUseWizard(true)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">する</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="useWizard" 
                          checked={useWizard === false} 
                          onChange={() => setUseWizard(false)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">しない</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 動的UI: 数値選択の場合のみ表示 */}
                {questionType === 'number' && (
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-semibold text-indigo-800 border-b border-indigo-200 pb-2">数値入力設定</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-indigo-700 mb-1">最小値 (Min)</label>
                        <input 
                          type="number" 
                          required={questionType === 'number'}
                          value={numberMin}
                          onChange={(e) => setNumberMin(e.target.value ? Number(e.target.value) : '')}
                          className="w-full px-3 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-indigo-700 mb-1">最大値 (Max)</label>
                        <input 
                          type="number" 
                          required={questionType === 'number'}
                          value={numberMax}
                          onChange={(e) => setNumberMax(e.target.value ? Number(e.target.value) : '')}
                          className="w-full px-3 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-indigo-700 mb-1">数値刻み (Step)</label>
                        <input 
                          type="number" 
                          required={questionType === 'number'}
                          value={numberStep}
                          onChange={(e) => setNumberStep(e.target.value ? Number(e.target.value) : '')}
                          className="w-full px-3 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-indigo-700 mb-1">数値単位</label>
                        <input 
                          type="text" 
                          required={questionType === 'number'}
                          placeholder="例: ㎡、台、箇所"
                          value={numberUnit}
                          onChange={(e) => setNumberUnit(e.target.value)}
                          className="w-full px-3 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-sm px-4 rounded-md shadow-sm transition-colors flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    このメニューを登録する
                  </button>
                </div>
              </form>
            </div>

            {/* 登録済みアイテム一覧リスト */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[400px]">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                  <ListOrdered className="w-5 h-5 mr-2 text-gray-500" />
                  登録済み項目
                </h2>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                  {menuItems.length} 件
                </span>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto bg-gray-50/50">
                {menuItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <CheckCircle2 className="w-12 h-12 mb-2 text-gray-300" />
                    <p>登録済みのメニューはまだありません</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {menuItems.map(item => (
                      <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group hover:border-indigo-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                              {item.categoryName}
                            </span>
                            <h3 className="font-bold text-gray-900 mt-2 text-lg">
                              {item.itemName}
                            </h3>
                          </div>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="削除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3 font-medium">
                          <span className="bg-gray-100 px-2 py-0.5 rounded">¥{item.minPrice?.toLocaleString()} 〜 ¥{item.maxPrice?.toLocaleString()}</span>
                        </div>

                        <div className="bg-gray-50 rounded p-3 text-sm border border-gray-100">
                          <div className="flex mb-1">
                            <span className="text-gray-500 w-24 shrink-0">設問:</span>
                            <span className="font-medium text-gray-800">{item.questionName}</span>
                          </div>
                          <div className="flex mb-1">
                            <span className="text-gray-500 w-24 shrink-0">タイプ:</span>
                            <span className="text-gray-800">
                              {item.questionType === 'number' ? '数値選択' : 'ありなし選択'}
                            </span>
                          </div>
                          <div className="flex mb-1">
                            <span className="text-gray-500 w-24 shrink-0">ウィザード:</span>
                            <span className="text-gray-800">
                              {item.useWizard ? '利用する' : '利用しない'}
                            </span>
                          </div>
                          
                          {item.questionType === 'number' && (
                            <div className="flex mt-2 pt-2 border-t border-gray-200 text-xs">
                              <span className="text-indigo-600 font-medium mr-4">
                                Min: {item.numberMin}
                              </span>
                              <span className="text-indigo-600 font-medium mr-4">
                                Max: {item.numberMax}
                              </span>
                              <span className="text-indigo-600 font-medium mr-4">
                                Step: {item.numberStep}
                              </span>
                              <span className="text-indigo-600 font-medium">
                                単位: {item.numberUnit}
                              </span>
                            </div>
                          )}
                          
                          {item.description && (
                            <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500 bg-yellow-50/50 p-2 rounded">
                              <span className="font-semibold text-gray-700">備考: </span>{item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
