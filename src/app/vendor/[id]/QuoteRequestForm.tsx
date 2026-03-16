"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuoteFormProps {
  vendorId: string;
  basePrice: number;
}

export default function QuoteRequestForm({ vendorId, basePrice }: QuoteFormProps) {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState("1LDK");
  const [size, setSize] = useState("");
  const [linens, setLinens] = useState({
    faceTowel: 0,
    bathTowel: 0,
    largeTowel: 0,
    bedSheets: 0,
  });
  const [options, setOptions] = useState({
    trash: false,
    keyDelivery: false,
  });

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const updateLinen = (item: keyof typeof linens, delta: number) => {
    setLinens(prev => {
      const newVal = prev[item] + delta;
      if (newVal < 0) return prev;
      return { ...prev, [item]: newVal };
    });
  };

  const calculateTotal = () => {
    let total = basePrice;
    if (propertyType === "2LDK") total += 2000;
    if (propertyType === "3LDK") total += 4000;
    if (propertyType === "4LDK+") total += 6000;
    
    if (linens.faceTowel > 0) total += 100 * linens.faceTowel;
    if (linens.bathTowel > 0) total += 100 * linens.bathTowel;
    if (linens.largeTowel > 0) total += 150 * linens.largeTowel;
    if (linens.bedSheets > 0) total += 260 * linens.bedSheets;
    
    if (options.trash) total += 1000;
    if (options.keyDelivery) total += 3000;

    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the quote details to the DB before redirecting
    router.push('/thanks');
  };

  return (
    <div style={{ marginTop: '25px', borderTop: '1px solid #eaeaea', paddingTop: '20px' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>見積もり条件を入力</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>間取り</label>
          <select 
            className="form-control" 
            style={{ fontSize: '0.9rem', padding: '8px' }}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="1R/1K">1R / 1K</option>
            <option value="1LDK">1LDK</option>
            <option value="2LDK">2LDK</option>
            <option value="3LDK">3LDK</option>
            <option value="4LDK+">4LDK以上 / 一軒家</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>広さ (平米) ※任意</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="例: 45" 
            style={{ fontSize: '0.9rem', padding: '8px' }}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px' }}>追加オプション</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
            <div style={{ fontSize: '0.9rem', color: '#444', marginBottom: '5px', borderBottom: '1px solid #eaeaea', paddingBottom: '5px' }}>リネン類・消耗品</div>
            
            {[
              { id: 'faceTowel', label: 'フェイスタオル', price: 100 },
              { id: 'bathTowel', label: 'バスタオル', price: 100 },
              { id: 'largeTowel', label: '大判バスタオル', price: 150 },
              { id: 'bedSheets', label: 'ベッドシーツ(セット)', price: 260 },
            ].map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem' }}>{item.label} <span style={{ color: '#888' }}>(¥{item.price}/枚)</span></span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button type="button" onClick={() => updateLinen(item.id as keyof typeof linens, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #ccc', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>-</button>
                  <span style={{ width: '20px', textAlign: 'center', fontSize: '0.9rem' }}>{linens[item.id as keyof typeof linens]}</span>
                  <button type="button" onClick={() => updateLinen(item.id as keyof typeof linens, 1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.9rem', color: '#444', marginBottom: '5px', borderBottom: '1px solid #eaeaea', paddingBottom: '5px' }}>その他オプション</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={options.trash} onChange={() => handleOptionChange('trash')} />
              <span>ゴミ捨て代行 (+¥1,000)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={options.keyDelivery} onChange={() => handleOptionChange('keyDelivery')} />
              <span>鍵の受け渡し (+¥3,000)</span>
            </label>
          </div>
        </div>

        <div style={{ marginTop: '10px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>概算お見積り金額</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            ¥{calculateTotal().toLocaleString()} <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>〜</span>
          </div>
        </div>

        <button type="submit" className="btn-quote-large" style={{ marginTop: '10px' }}>
          この条件で見積もりをお願いする
        </button>
      </form>
    </div>
  );
}
