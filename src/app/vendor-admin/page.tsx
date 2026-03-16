"use client";

import { useState } from "react";
import Link from "next/link";
import { getQuestionnaireForCategory } from "../../data/questionnaireData";

export default function VendorAdminSettings() {
  // Demo state: assuming the logged in vendor operates in "定期清掃" and "写真撮影 / 動画撮影"
  const [activeTab, setActiveTab] = useState("プロフィール・資格設定");
  const tabs = ["プロフィール・資格設定", "定期清掃", "写真撮影 / 動画撮影"];

  // Mock qualifications state
  const [qualifications, setQualifications] = useState<string[]>(['行政書士']);
  const availableQualifications = [
    '行政書士', '司法書士', '一級建築士', '二級建築士', 
    '宅地建物取引士', '消防設備士', 'マンション管理士', 'インテリアコーディネーター'
  ];

  // Mock initial pricing state
  const [pricing, setPricing] = useState<Record<string, Record<string, number>>>({
    "定期清掃": {
      "base_1R": 4000,
      "base_1LDK": 5000,
      "base_2LDK": 6500,
      "base_3LDK": 8000,
      "base_4LDK+": 10000,
      "unit_faceTowel": 100,
      "unit_bathTowel": 150,
      "unit_bedSheets": 300
    },
    "写真撮影 / 動画撮影": {
      "base_tier1": 25000,
      "base_tier2": 35000,
      "base_tier3": 45000,
      "base_with_video": 70000
    }
  });

  const activeQuestions = getQuestionnaireForCategory(activeTab);

  // Extract variables that need pricing configured
  const baseOptions = activeQuestions.find(q => q.options?.some(o => o.isBaseMultiplier))?.options?.filter(o => o.isBaseMultiplier) || [];
  const quantityItems = activeQuestions.filter(q => q.type === 'number' && q.options?.some(o => o.isQuantityItem)).map(q => q.options?.find(o => o.isQuantityItem));

  const handlePriceChange = (category: string, key: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setPricing(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: numValue
      }
    }));
  };

  const toggleQualification = (qual: string) => {
    setQualifications(prev => 
      prev.includes(qual) ? prev.filter(q => q !== qual) : [...prev, qual]
    );
  };

  const handleSave = () => {
    alert("料金表を保存しました。この単価設定がユーザー側の一括見積もりに反映されます。");
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', paddingBottom: '50px' }}>
      <header style={{ background: 'white', padding: '15px 30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#EA580C' }}>見つける君 for Vendors</h1>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>業者用管理ダッシュボード</span>
        </div>
        <Link href="/" style={{ color: '#666', textDecoration: 'none', fontWeight: 'bold' }}>&larr; ユーザーサイトへ戻る</Link>
      </header>

      <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#333' }}>自動見積もり 単価設定</h2>
          <button 
            onClick={handleSave}
            style={{ padding: '12px 30px', background: '#EA580C', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 6px rgba(234, 88, 12, 0.2)' }}
          >
            設定を保存する
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #ddd', background: '#fafafa', overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '15px 30px',
                  background: activeTab === tab ? 'white' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid #EA580C' : '3px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  color: activeTab === tab ? '#EA580C' : '#666',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ padding: '30px' }}>
            {activeTab === "プロフィール・資格設定" ? (
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#333', borderBottom: '2px solid #EA580C', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>
                  保有資格バッジの設定
                </h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  保有している国家資格等を設定すると、検索結果やプロフィール画面に「資格バッジ」として表示され、オーナーからの信頼度がアップします。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                  {availableQualifications.map(qual => (
                    <label 
                      key={qual} 
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', 
                        border: '1px solid', borderColor: qualifications.includes(qual) ? '#EA580C' : '#ddd',
                        background: qualifications.includes(qual) ? '#fffaf5' : '#fff',
                        borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={qualifications.includes(qual)}
                        onChange={() => toggleQualification(qual)}
                        style={{ width: '18px', height: '18px', accentColor: '#EA580C' }}
                      />
                      <span style={{ fontWeight: qualifications.includes(qual) ? 'bold' : 'normal', color: qualifications.includes(qual) ? '#EA580C' : '#444' }}>
                        {qual}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                  ユーザーがトップページから条件を入力して見積もりをリクエストした際、ここで設定した単価に基づく合計金額が自動で提示されます。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  
                  {/* Base Multipliers Section */}
                  {baseOptions.length > 0 && (
                    <section>
                      <h3 style={{ fontSize: '1.2rem', color: '#333', borderBottom: '2px solid #EA580C', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>
                        基本料金設定
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {baseOptions.map(opt => (
                          <div key={opt.value} style={{ background: '#f9f9f9', padding: '15px 20px', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '500', color: '#444' }}>{opt.label}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#888' }}>¥</span>
                              <input 
                                type="number" 
                                value={pricing[activeTab]?.[`base_${opt.value}`] || ""}
                                onChange={(e) => handlePriceChange(activeTab, `base_${opt.value}`, e.target.value)}
                                style={{ width: '100px', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', textAlign: 'right', fontSize: '1rem' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Quantity Items Section */}
                  {quantityItems.length > 0 && (
                    <section>
                      <h3 style={{ fontSize: '1.2rem', color: '#333', borderBottom: '2px solid #EA580C', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>
                        従量課金設定（単価）
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {quantityItems.map(item => item && (
                          <div key={item.value} style={{ background: '#f9f9f9', padding: '15px 20px', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '500', color: '#444' }}>{item.label} <span style={{fontSize: '0.85rem', color: '#888', marginLeft:'5px'}}>/ 1単位</span></span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#888' }}>¥</span>
                              <input 
                                type="number" 
                                value={pricing[activeTab]?.[`unit_${item.value}`] || ""}
                                onChange={(e) => handlePriceChange(activeTab, `unit_${item.value}`, e.target.value)}
                                style={{ width: '100px', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', textAlign: 'right', fontSize: '1rem' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {baseOptions.length === 0 && quantityItems.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px', color: '#888' }}>
                      このカテゴリには設定可能な自動計算用の単価項目がありません。<br/>
                      基本の料金表または都度見積もりとしてユーザーには表示されます。
                    </div>
                  )}

                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
