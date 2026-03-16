"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Image as ImageIcon, 
  MapPin, 
  Tag, 
  CreditCard,
  Plus,
  Save,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export default function VendorProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Building2 className="mr-3 h-6 w-6 text-blue-600" />
            マイページ・プロフィール設定
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            オーナー（顧客）の検索結果や公開プロフィールに表示される情報を登録します。情報が充実しているほどマッチング率が高まります。
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold shadow-sm hover:bg-blue-700 transition flex items-center"
        >
          {isSaved ? <CheckCircle2 className="h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />}
          {isSaved ? '保存しました' : '設定を保存'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('basic')}
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            基本情報・紹介文
          </button>
          <button 
            onClick={() => setActiveTab('images')}
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'images' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            写真・実績ギャラリー
          </button>
          <button 
            onClick={() => setActiveTab('tags')}
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'tags' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            特徴・エリア・支払い
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  屋号 / 会社名 <span className="text-red-500">*</span>
                </label>
                <input type="text" defaultValue="株式会社リベンライズ" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  キャッチコピー（一覧で目立ちます） <span className="text-red-500">*</span>
                </label>
                <input type="text" defaultValue="【定期清掃】定期的な特別清掃は弊社リベンライズにおまかせ下さい。" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-blue-500 focus:border-blue-500" placeholder="例: 経験豊富！丁寧で迅速な対応をお約束します" />
                <p className="text-xs text-gray-500 mt-1">最大40文字</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  自己紹介・プロの紹介 (事業内容・提供するサービス) <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={8} 
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={`こんにちは、株式会社リベンライズと申します。
 
普段民泊 Airbnb として利用している客室も定期的（3ヶ月〜半年に1度が目安）な特別清掃は必須です。(水回り・窓、冊子、ベランダ、エアコン洗浄など)
 
蓄積した汚れは普段の簡易清掃では綺麗になりません...そんな時はハウスクリーニング・水回りクリーニングを専門にしている弊社リベンライズにお任せ下さい！ 

また急なトラブル対応も可能（水栓金具交換、ウォシュレット交換、配管洗浄など）`}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  これまでの実績
                </label>
                <textarea 
                  rows={3} 
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="弊社は神奈川県を拠点に一都三県（東京・神奈川・埼玉・千葉）幅広く対応しており、ハウスクリーニングは年間200件以上、その他クリーニング全般を年間1,000件以上ご依頼頂いております。"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  アピールポイント
                </label>
                <textarea 
                  rows={4} 
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={`ホテル業界出身の私達は清掃に関しては一切妥協しません。
多種多様な薬剤テストを繰り返し行い、素材を傷つけることなく汚れを落とす方法を常に追求しています。
お客様の生活がより清潔で快適なものになるように、探求心を持って汚れと向き合ってまいります。`}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">経験年数</label>
                  <div className="flex items-center">
                    <input type="number" defaultValue="5" className="w-24 border border-gray-300 rounded-md p-2.5 focus:ring-blue-500 focus:border-blue-500" />
                    <span className="ml-2 text-gray-600">年</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">従業員数</label>
                  <div className="flex items-center">
                    <input type="number" defaultValue="6" className="w-24 border border-gray-300 rounded-md p-2.5 focus:ring-blue-500 focus:border-blue-500" />
                    <span className="ml-2 text-gray-600">人</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex items-start">
                 <ImageIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                 <p className="text-sm text-blue-800">
                   プロフィールや検索結果に表示される画像です。施工のBefore/After写真や、スタッフの顔写真などを掲載すると成約率が大幅にアップします。（最大10枚）
                 </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Mock Images */}
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="h-8 w-8 mb-1" />
                      <span className="text-xs">写真 {item}</span>
                    </div>
                    {item === 1 && (
                       <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">メイン表示</div>
                    )}
                    <button className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {/* Upload Button */}
                <button className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-blue-400 hover:text-blue-500 transition-colors">
                  <Plus className="h-8 w-8 mb-1" />
                  <span className="text-sm font-medium">画像を追加</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tags' && (
            <div className="space-y-8">
              {/* Features / Badges */}
              <section>
                <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
                  <Tag className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-800">プロの特徴（タグ）</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 cursor-pointer">
                  {/* Mock badges based on screenshot */}
                  <label className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg justify-center">
                    <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded border-blue-400 mr-2" />
                    <span className="text-sm font-bold text-blue-900">損害保険あり</span>
                  </label>
                  <label className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg justify-center">
                    <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded border-blue-400 mr-2" />
                    <span className="text-sm font-bold text-blue-900">経験5年以上</span>
                  </label>
                  <label className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg justify-center">
                    <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded border-blue-400 mr-2" />
                    <span className="text-sm font-bold text-blue-900">深夜料金なし</span>
                  </label>
                  <label className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg justify-center">
                    <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded border-blue-400 mr-2" />
                    <span className="text-sm font-bold text-blue-900">夜間対応可</span>
                  </label>
                  <label className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg justify-center">
                    <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded border-blue-400 mr-2" />
                    <span className="text-sm font-bold text-blue-900">作業外注なし</span>
                  </label>
                  <label className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg justify-center">
                    <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded border-blue-400 mr-2" />
                    <span className="text-sm font-bold text-blue-900">マスク着用</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 hover:bg-gray-50 rounded-lg justify-center">
                    <input type="checkbox" className="form-checkbox text-blue-600 rounded border-gray-300 mr-2" />
                    <span className="text-sm font-medium text-gray-700">女性スタッフ同行</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 hover:bg-gray-50 rounded-lg justify-center">
                    <input type="checkbox" className="form-checkbox text-blue-600 rounded border-gray-300 mr-2" />
                    <span className="text-sm font-medium text-gray-700">英語対応可</span>
                  </label>
                </div>
              </section>

              {/* Service Areas */}
              <section>
                <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-800">対応エリア</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <span className="font-bold text-gray-800 text-sm">【東京都】</span>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      大田区 / 品川区 / 世田谷区 / 目黒区 / 狛江区 / 稲城市 / 港区 / 調布市 / 町田市 / 三鷹市 / 多摩市 / 杉並区 / 中野区 / 府中市 / 新宿区
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <span className="font-bold text-gray-800 text-sm">【神奈川県】</span>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      横浜市 / 川崎市 / 相模原市 / 横須賀市 / 平塚市 / 鎌倉市 / 藤沢市 / 小田原市
                    </p>
                  </div>
                  <button className="text-sm text-blue-600 font-bold flex items-center hover:underline mt-2">
                    <Plus className="h-4 w-4 mr-1" /> 対応エリアの追加・編集
                  </button>
                </div>
              </section>

              {/* Extra Options */}
              <section>
                <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
                  <Plus className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-800">追加可能なオプション（有料）</h3>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                     <input type="text" defaultValue="エコ洗剤使用" className="flex-1 border-gray-300 rounded focus:ring-blue-500 text-sm p-2 border" />
                     <div className="flex items-center">
                       <input type="number" defaultValue="1000" className="w-24 border-gray-300 rounded text-right focus:ring-blue-500 text-sm p-2 border" />
                       <span className="ml-2 text-sm text-gray-600 text-nowrap">円 / 台</span>
                     </div>
                     <button className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                   </div>
                   <div className="flex items-center gap-3">
                     <input type="text" defaultValue="消臭除菌コート" className="flex-1 border-gray-300 rounded focus:ring-blue-500 text-sm p-2 border" />
                     <div className="flex items-center">
                       <input type="number" defaultValue="1000" className="w-24 border-gray-300 rounded text-right focus:ring-blue-500 text-sm p-2 border" />
                       <span className="ml-2 text-sm text-gray-600 text-nowrap">円 / 台</span>
                     </div>
                     <button className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                   </div>
                   <div className="flex items-center gap-3">
                     <input type="text" defaultValue="ウイルス除菌" className="flex-1 border-gray-300 rounded focus:ring-blue-500 text-sm p-2 border" />
                     <div className="flex items-center">
                       <input type="number" defaultValue="1000" className="w-24 border-gray-300 rounded text-right focus:ring-blue-500 text-sm p-2 border" />
                       <span className="ml-2 text-sm text-gray-600 text-nowrap">円 / 台</span>
                     </div>
                     <button className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                   </div>
                   <button className="text-sm text-blue-600 font-bold flex items-center hover:underline mt-2">
                    <Plus className="h-4 w-4 mr-1" /> オプション行を追加
                  </button>
                </div>
              </section>

              {/* Payment Methods */}
              <section>
                <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
                  <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-800">対応可能な支払い方法</h3>
                </div>
                <div className="flex flex-wrap gap-4 cursor-pointer">
                  <label className="flex items-center p-3 border border-green-500 bg-green-50 rounded-lg justify-center min-w-[140px]">
                    <input type="checkbox" defaultChecked className="form-checkbox text-green-600 rounded border-green-400 mr-2" />
                    <span className="text-sm font-bold text-green-900">クレジットカード</span>
                  </label>
                  <label className="flex items-center p-3 border border-green-500 bg-green-50 rounded-lg justify-center min-w-[140px]">
                    <input type="checkbox" defaultChecked className="form-checkbox text-green-600 rounded border-green-400 mr-2" />
                    <span className="text-sm font-bold text-green-900">現地決済</span>
                  </label>
                  <label className="flex items-center p-3 border border-green-500 bg-green-50 rounded-lg justify-center min-w-[140px]">
                    <input type="checkbox" defaultChecked className="form-checkbox text-green-600 rounded border-green-400 mr-2" />
                    <span className="text-sm font-bold text-green-900 flex flex-col">
                      後払い
                      <span className="text-[10px] text-green-700 font-normal">利用後14日以内でのお支払い</span>
                    </span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 hover:bg-gray-50 rounded-lg justify-center min-w-[140px]">
                    <input type="checkbox" className="form-checkbox text-green-600 rounded border-gray-300 mr-2" />
                    <span className="text-sm font-medium text-gray-700">銀行振込</span>
                  </label>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
