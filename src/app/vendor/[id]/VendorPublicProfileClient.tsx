"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Tag, 
  CreditCard,
  MessageCircle,
  FileText,
  User,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ShieldCheck,
  Check
} from 'lucide-react';
import { mockServices } from "../../../data/mockData";

export default function VendorPublicProfileClient({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Dummy data overriding mockServices for the specific UI shown in the user's screenshot
  const profileData = {
    id: resolvedParams.id,
    name: "株式会社リベンライズ",
    address: "神奈川県横浜市中区扇町",
    rating: 4.9,
    reviewsCount: 345,
    catchphrase: "【定期清掃】定期的な特別清掃は弊社リベンライズにおまかせ下さい。",
    badges: ["事業者確認済み", "適格請求書発行事業者登録番号 T7020001138038"],
    tags: [
      { label: "損害保険あり", icon: <ShieldCheck className="w-4 h-4 text-gray-500 mr-2" /> },
      { label: "クリーニング歴5年以上", icon: <Tag className="w-4 h-4 text-gray-500 mr-2" /> },
      { label: "深夜料金なし", icon: <Tag className="w-4 h-4 text-gray-500 mr-2" /> },
      { label: "夜間対応可", icon: <Tag className="w-4 h-4 text-gray-500 mr-2" /> },
      { label: "作業外注なし", icon: <Tag className="w-4 h-4 text-gray-500 mr-2" /> },
      { label: "マスク着用", icon: <Tag className="w-4 h-4 text-gray-500 mr-2" /> },
    ],
    intro: `こんにちは、株式会社リベンライズと申します。

普段民泊 Airbnb として利用している客室も定期的（3ヶ月〜半年に1度が目安）な特別清掃は必須です。(水回り・窓、冊子、ベランダ、エアコン洗浄など)

蓄積した汚れは普段の簡易清掃では綺麗になりません...そんな時はハウスクリーニング・水回りクリーニングを専門にしている弊社リベンライズにお任せ下さい！

また急なトラブル対応も可能（水栓金具交換、ウォシュレット交換、配管洗浄など）`,
    experienceYears: "5年",
    employeeCount: "6人",
    areas: [
      { name: "【東京都】", details: "大田区 / 品川区 / 世田谷区 / 目黒区 / 狛江市 / 稲城市 / 港区 / 調布市 / 町田市 / 三鷹市 / 多摩市 / 杉並区 / 中野区 / 府中市 / 新宿区" },
      { name: "【千葉県】", details: "もっと見る", isMore: true }
    ],
    features: ["夜間対応可"],
    extraOptions: [
      { name: "エコ洗剤使用", price: "1,000円/台" },
      { name: "消臭除菌コート", price: "1,000円/台" },
      { name: "ウイルス除菌", price: "1,000円/台" }
    ],
    paymentMethods: [
      { name: "クレジットカード", icon: "💳" },
      { name: "現地決済", icon: "👥" },
      { name: "後払い（利用後14日以内のお支払い）", icon: "🧾" }
    ]
  };

  const mockReviews = [
    { id: 1, user: "K.T", rating: 5, date: "2026/03/10", text: "水回りの清掃をお願いしましたが、見違えるほど綺麗になりました。また次回もお願いしたいです。" },
    { id: 2, user: "S.M", rating: 4, date: "2026/02/25", text: "迅速な対応で助かりました。深夜のトラブルにも対応していただけて良かったです。" },
    { id: 3, user: "Y.A", rating: 5, date: "2026/02/10", text: "ゲストからのクレームがなくなり、清掃の品質向上を実感しています。定期清掃をお願いして正解でした。" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Header matching the screenshot */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto">
          {/* Header Info */}
          <div className="flex items-center justify-between px-6 py-3">
             <div className="flex items-center gap-4">
               <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded">交渉中</span>
               <h1 className="text-lg font-bold text-gray-900">{profileData.name}</h1>
               <span className="text-gray-900 font-bold">税込54,950円</span>
             </div>
             <button className="text-blue-500 text-sm font-bold hover:underline">
               確認/変更
             </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex px-6 space-x-8">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex-1 text-center ${activeTab === 'chat' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              チャット
            </button>
            <button 
              onClick={() => setActiveTab('contract')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex-1 text-center ${activeTab === 'contract' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              契約状況
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex-1 text-center ${activeTab === 'profile' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              プロ情報
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex-1 text-center ${activeTab === 'reviews' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              口コミ
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-6">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            
            {/* Gallery and Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Image Gallery Mock */}
              <div className="md:w-1/2">
                <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-3">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-gray-300 relative border-r-2 border-white flex items-center justify-center text-gray-500 font-bold text-xl">
                      Before
                      <div className="absolute top-2 left-2 bg-gray-800/60 text-white px-2 py-0.5 rounded text-sm">Before</div>
                    </div>
                    <div className="w-1/2 bg-blue-100 relative flex items-center justify-center text-blue-500 font-bold text-xl">
                      After ✨
                      <div className="absolute top-2 right-2 bg-blue-500/80 text-white px-2 py-0.5 rounded text-sm">After</div>
                    </div>
                  </div>
                  {/* Slider Buttons */}
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-hidden">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className={`w-12 h-12 rounded bg-gray-200 flex-shrink-0 border-2 ${i===1 ? 'border-blue-500' : 'border-transparent'}`}></div>
                  ))}
                </div>
              </div>

              {/* Profile Info Summary */}
              <div className="md:w-1/2 flex flex-col pt-2">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 border border-gray-200 flex justify-center items-center text-gray-500">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">{profileData.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">{profileData.address}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <div className="flex text-orange-400">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                        <span className="ml-1 text-orange-500 font-bold">{profileData.rating}</span>
                        <span className="ml-2 text-gray-500">(口コミ{profileData.reviewsCount}件)</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:bg-gray-100 rounded-full p-1"><MoreVertical className="w-5 h-5" /></button>
                </div>

                <div className="border border-green-500 bg-green-50/30 rounded-lg p-4 mb-4 relative">
                  <div className="absolute -left-1.5 top-5 w-3 h-3 bg-white border-l border-b border-green-500 rotate-45 transform"></div>
                  <p className="text-green-800 font-medium text-sm leading-relaxed">
                    {profileData.catchphrase}
                  </p>
                </div>

                <div className="space-y-1 mt-auto">
                  {profileData.badges.map((badge, idx) => (
                    <p key={idx} className="flex items-center text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-1.5 flex-shrink-0" />
                      {badge}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 py-6 border-y border-gray-100 mb-10">
              {profileData.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-700 font-medium">
                  {tag.icon} {tag.label}
                </div>
              ))}
            </div>

            {/* Profile Intro */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">プロの紹介</h3>
              <div className="mb-8">
                <h4 className="text-green-600 font-bold text-sm mb-4">自己紹介（事業内容・提供するサービス）</h4>
                <div className="text-gray-800 text-sm leading-loose whitespace-pre-wrap">
                  {profileData.intro}
                </div>
              </div>

              {/* Stats & Areas */}
              <div className="space-y-6">
                 <div>
                   <h4 className="text-green-600 font-bold text-sm mb-2">経験年数</h4>
                   <p className="text-gray-800 text-sm">{profileData.experienceYears}</p>
                 </div>
                 <div>
                   <h4 className="text-green-600 font-bold text-sm mb-2">従業員数</h4>
                   <p className="text-gray-800 text-sm">{profileData.employeeCount}</p>
                 </div>
                 <div>
                   <h4 className="text-green-600 font-bold text-sm mb-2">対応エリア</h4>
                   <div className="space-y-2 text-sm">
                     {profileData.areas.map((area, idx) => (
                       <div key={idx} className={area.isMore ? 'text-gray-400 flex items-center gap-4' : 'text-gray-800'}>
                         <span className="font-bold">{area.name}</span>
                         <span className={area.isMore ? 'text-xs cursor-pointer hover:underline' : ''}>{area.details}</span>
                       </div>
                     ))}
                   </div>
                 </div>
                 <div>
                   <h4 className="text-green-600 font-bold text-sm mb-3">プロの特長</h4>
                   <div className="bg-gray-50 flex items-center p-3 text-sm font-bold text-gray-800 rounded">
                     <Check className="w-4 h-4 text-green-500 mr-2" />
                     夜間対応可
                   </div>
                 </div>
              </div>
            </div>

            {/* Extra Options */}
            <div className="mb-10">
              <h4 className="text-green-600 font-bold text-sm mb-3">追加可能なオプション</h4>
              <div className="bg-green-50/50 rounded-lg overflow-hidden border border-gray-100">
                <div className="bg-green-50 text-green-800 font-bold text-sm px-4 py-2 border-b border-gray-100">有料オプション（税込）</div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profileData.extraOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <span className="text-gray-400 mr-2">•</span>
                      <div>
                        <div className="text-gray-800">{opt.name}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{opt.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">※見積もり料金には含まれておりません。追加オプションが必要な場合はプロにご相談ください。</p>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-green-600 font-bold text-sm mb-3">対応可能な支払い方法</h4>
              <div className="flex flex-wrap gap-4">
                {profileData.paymentMethods.map((method, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-700 bg-white border border-gray-200 rounded px-3 py-2 shadow-sm">
                    <span className="text-green-500 mr-2 text-base">{method.icon}</span>
                    {method.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">口コミ ({profileData.reviewsCount}件)</h2>
              <Link 
                href={`/owner/reviews/new/${profileData.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-green-700 transition"
              >
                口コミを投稿する
              </Link>
            </div>

            <div className="flex items-center mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="text-5xl font-bold text-gray-900 mr-6">{profileData.rating}</div>
              <div className="flex-1">
                <div className="flex text-orange-400 text-2xl mb-2 cursor-default">
                  <Star className="fill-current w-6 h-6" />
                  <Star className="fill-current w-6 h-6" />
                  <Star className="fill-current w-6 h-6" />
                  <Star className="fill-current w-6 h-6" />
                  <Star className="fill-current w-6 h-6" />
                </div>
                <div className="text-sm text-gray-500">全体的に非常に高い評価を得ています</div>
              </div>
            </div>

            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                        {review.user[0]}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{review.user}</div>
                        <div className="flex text-orange-400 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{review.date}</div>
                  </div>
                  <p className="text-gray-700 text-sm mt-3 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="text-green-600 font-bold text-sm bg-white border border-green-600 px-6 py-2 rounded shadow-sm hover:bg-green-50 transition">
                もっと見る
              </button>
            </div>
          </div>
        )}

        {/* Dummy states for other tabs */}
        {(activeTab === 'chat' || activeTab === 'contract') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-16 text-center text-gray-500">
            <p className="text-lg">現在機能開発中です。</p>
            <p className="text-sm mt-2">（チャット機能または見積もり契約ステータス画面が入ります）</p>
          </div>
        )}

      </main>
    </div>
  );
}
