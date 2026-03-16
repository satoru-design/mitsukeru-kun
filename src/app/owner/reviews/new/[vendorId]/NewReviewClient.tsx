"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { Star, MessageSquare, Save, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NewReviewClient({ params }: { params: Promise<{ vendorId: string }> }) {
  const resolvedParams = use(params);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const vendorName = "株式会社リベンライズ"; // Mock specific to the current flow

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("星評価を選択してください");
      return;
    }
    // API mock submission
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-10 max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">投稿が完了しました</h1>
          <p className="text-gray-600 text-sm mb-8">
            {vendorName} への口コミありがとうございました。<br/>いただいた評価はプロフィールの「口コミ」タブに反映されます。
          </p>
          <Link 
            href={`/vendor/${resolvedParams.vendorId}`}
            className="block w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
          >
            プロのプロフィールに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href={`/vendor/${resolvedParams.vendorId}`} className="text-gray-500 hover:text-gray-800 flex items-center text-sm font-bold">
             <ArrowLeft className="w-4 h-4 mr-1" />
             戻る
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-white">
            <h1 className="text-xl font-bold text-gray-900">口コミ・レビューの投稿</h1>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-bold text-blue-800">{vendorName}</span> の対応について、評価をお願いします。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Rating section */}
            <div className="text-center">
              <label className="block text-sm font-bold text-gray-700 mb-4">総合評価 <span className="text-red-500">*</span></label>
              <div 
                className="flex items-center justify-center gap-2 cursor-pointer"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-12 h-12 transition-all duration-150 ${
                      (hoverRating || rating) >= star 
                        ? 'fill-orange-400 text-orange-400 transform scale-110' 
                        : 'text-gray-300 hover:text-orange-200'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                  />
                ))}
              </div>
              <div className="mt-3 text-orange-500 font-bold">
                {rating === 1 && "1. 不満"}
                {rating === 2 && "2. やや不満"}
                {rating === 3 && "3. 普通"}
                {rating === 4 && "4. 満足"}
                {rating === 5 && "5. 大変満足"}
                {rating === 0 && <span className="text-gray-400 font-normal">タップして評価してください</span>}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Comment Section */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 mt-4 flex items-center">
                <MessageSquare className="w-4 h-4 mr-1.5 text-gray-400" />
                口コミの内容
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows={6}
                placeholder="例：事前のメッセージのやり取りから丁寧でした。清掃も細かいところまで行き届いており、また次回も依頼したいと思います。"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">※投稿された内容は、業者のプロフィールページ等で公開されます。個人を特定できる情報（住所、電話番号など）は書き込まないでください。</p>
            </div>

            <div className="bg-yellow-50 rounded p-4 flex items-start text-sm text-yellow-800 border border-yellow-100">
               <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
               <p>
                 口コミは一度投稿すると修正できません。内容をよくご確認の上、送信してください。悪質な口コミや事実と反する投稿は、ガイドライン違反として削除される場合があります。
               </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center transition-colors shadow-sm
                  ${rating > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                disabled={rating === 0}
              >
                口コミを投稿する
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
