"use client";

import { useState } from "react";
import { getQuestionnaireForCategory } from "../../data/questionnaireData";
import { categoriesData } from "../../data/mockData";

export default function VendorPricingSettings() {
  // 選択されているカテゴリ（初期値は1番目の大カテゴリの1番目の中カテゴリ）
  const initialCategory = categoriesData[0]?.items[0] || "定期清掃";
  const [activeTab, setActiveTab] = useState(initialCategory);
  
  // 開閉状態を管理する大カテ（グループ）
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    [categoriesData[0]?.group || ""]: true
  });

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

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
    // その他のカテゴリは随時保存される想定
  });

  const activeQuestions = getQuestionnaireForCategory(activeTab);

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

  const handleSave = () => {
    alert("料金表を保存しました！\nマッチング（自動見積もりシステム）に即時反映されます。");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Settings Header */}
      <div style={{ padding: '20px 30px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>メニュー・単価設定</h2>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>自動見積もりエンジンが使用する単価マスタです。</p>
        </div>
        <button 
          onClick={handleSave}
          style={{ padding: '10px 24px', background: '#f97316', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(249, 115, 22, 0.2)' }}
        >
          変更を保存
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar: Categories Tree */}
        <div style={{ width: '280px', borderRight: '1px solid #e2e8f0', background: '#f8fafc', overflowY: 'auto' }}>
          {categoriesData.map((groupData, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <div 
                onClick={() => toggleGroup(groupData.group)}
                style={{
                  padding: '15px 20px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: expandedGroups[groupData.group] ? '#f1f5f9' : 'transparent',
                  color: '#334155',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  transition: 'background 0.2s'
                }}
              >
                {groupData.group}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expandedGroups[groupData.group] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              
              {expandedGroups[groupData.group] && (
                <div style={{ padding: '5px 0 10px 0', background: 'white' }}>
                  {groupData.items.map(item => (
                    <div 
                      key={item}
                      onClick={() => setActiveTab(item)}
                      style={{
                        padding: '10px 20px 10px 40px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: activeTab === item ? '#f97316' : '#64748b',
                        fontWeight: activeTab === item ? 'bold' : 'normal',
                        background: activeTab === item ? '#fff7ed' : 'transparent',
                        borderLeft: activeTab === item ? '3px solid #f97316' : '3px solid transparent'
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Main Area: Forms */}
        <div style={{ flex: 1, background: 'white', padding: '30px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '30px', paddingBottom: '15px', borderBottom: '2px solid #f1f5f9' }}>
            <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#1e293b' }}>{activeTab}</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {baseOptions.length > 0 && (
              <section>
                <h3 style={{ fontSize: '1.05rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
                  <span style={{ color: '#f97316', marginRight: '8px' }}>■</span>基本料金（ベース料金）
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                  {baseOptions.map(opt => (
                    <div key={opt.value} style={{ background: '#f8fafc', padding: '12px 15px', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>{opt.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>¥</span>
                        <input 
                          type="number" 
                          value={pricing[activeTab]?.[`base_${opt.value}`] || ""}
                          onChange={(e) => handlePriceChange(activeTab, `base_${opt.value}`, e.target.value)}
                          placeholder="0"
                          style={{ width: '100px', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'right', fontSize: '0.95rem', color: '#1e293b' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {quantityItems.length > 0 && (
              <section>
                <h3 style={{ fontSize: '1.05rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
                  <span style={{ color: '#f97316', marginRight: '8px' }}>■</span>従量課金アイテム（1単位あたり）
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                  {quantityItems.map(item => item && (
                    <div key={item.value} style={{ background: '#f8fafc', padding: '12px 15px', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>{item.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>¥</span>
                        <input 
                          type="number" 
                          value={pricing[activeTab]?.[`unit_${item.value}`] || ""}
                          onChange={(e) => handlePriceChange(activeTab, `unit_${item.value}`, e.target.value)}
                          placeholder="0"
                          style={{ width: '100px', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'right', fontSize: '0.95rem', color: '#1e293b' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* General Options Pricing */}
            {activeQuestions.filter(q => ['radio', 'select', 'checkbox'].includes(q.type) && q.options && q.options.length > 0).map(question => {
              // Exclude options that are already rendered as base multipliers or quantity items above
              const standardOptions = question.options!.filter(opt => !opt.isBaseMultiplier && !opt.isQuantityItem);
              if (standardOptions.length === 0) return null;

              return (
                <section key={question.id}>
                  <h3 style={{ fontSize: '1.05rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
                    <span style={{ color: '#f97316', marginRight: '8px' }}>■</span>{question.title} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'normal' }}>(追加料金 / オプション単価)</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '15px' }}>
                    {standardOptions.map(opt => (
                      <div key={opt.value} style={{ background: '#f8fafc', padding: '12px 15px', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500', maxWidth: '60%' }}>{opt.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>¥</span>
                          <input 
                            type="number" 
                            value={pricing[activeTab]?.[`opt_${question.id}_${opt.value}`] || ""}
                            onChange={(e) => handlePriceChange(activeTab, `opt_${question.id}_${opt.value}`, e.target.value)}
                            placeholder="0"
                            style={{ width: '100px', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'right', fontSize: '0.95rem', color: '#1e293b' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {baseOptions.length === 0 && quantityItems.length === 0 && activeQuestions.filter(q => ['radio', 'select', 'checkbox'].includes(q.type) && q.options && q.options.length > 0).length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', color: '#94a3b8', border: '1px dashed #e2e8f0' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: '15px', color: '#cbd5e1' }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b' }}>このカテゴリには自動計算用の単価項目が定義されていません。<br/>案件の依頼内容に紐づいた個別見積もり提示となります。</p>
              </div>
            )}
          </div>

          {/* Bottom Save Action Area */}
          <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleSave}
              style={{ 
                padding: '14px 30px', 
                background: '#f97316', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: 'bold', 
                fontSize: '1.05rem', 
                boxShadow: '0 4px 6px rgba(249, 115, 22, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              このカテゴリの設定を保存する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
