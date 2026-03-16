const fs = require('fs');
const file = 'c:/Users/strkk/OneDrive/Desktop/mitsukeru-kun/temp_next/src/data/mockData.ts';
const text = fs.readFileSync(file, 'utf8');
const lines = text.split(/\r?\n/);
const goodLines = lines.slice(0, 184);

const phase2 = `
// --- Phase 2: Dual Experience & MyPage Mock Data ---

export const mockUser = {
  id: 'u-001',
  name: '小池 慧',
  avatar: 'https://ui-avatars.com/api/?name=Satoru+Koike&background=0D8ABC&color=fff',
  properties: [
    { id: 'p-1', name: '新宿Luxury Apartment', address: '東京都新宿区〇〇1-2-3', roomType: '1LDK', size: 45 },
    { id: 'p-2', name: '浅草Traditional House', address: '東京都台東区〇〇4-5-6', roomType: '3LDK', size: 85 }
  ],
  favorites: [1, 4, 7] // IDs of mockServices
};

export const mockChats = [
  {
    id: 'c-101',
    vendorId: 1, // クリーンパートナーズ東京
    vendorName: 'クリーンパートナーズ東京',
    vendorAvatar: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=150',
    propertyId: 'p-1',
    propertyName: '新宿Luxury Apartment',
    status: '見積もり提案中', // '見積もり提案中', '交渉中', '成約済', '辞退'
    lastMessage: 'ご希望の日程で対応可能です。詳細なお見積りをご確認ください。',
    updatedAt: '2026-03-15T10:30:00Z',
    unreadCount: 1,
    quote: {
      total: 6500,
      breakdown: [
        { item: '室内清掃（1LDK）', price: 5000 },
        { item: 'リネン交換（2名分）', price: 1000 },
        { item: 'ゴミ処理オプション', price: 500 }
      ]
    },
    messages: [
      { id: 'm-1', sender: 'user', text: '新宿の1LDK物件の定期清掃をお願いしたいです。週2回程度の頻度を想定しています。', timestamp: '2026-03-14T09:00:00Z' },
      { id: 'm-2', sender: 'vendor', text: 'お問い合わせありがとうございます。クリーンパートナーズ東京です。ご希望の日程で対応可能です。詳細なお見積りをご確認ください。', timestamp: '2026-03-15T10:30:00Z' }
    ]
  },
  {
    id: 'c-102',
    vendorId: 3, // Global Host
    vendorName: 'Global Host',
    vendorAvatar: 'https://images.unsplash.com/photo-1556761175-5973e2be1ce4?auto=format&fit=crop&q=80&w=150',
    propertyId: 'p-2',
    propertyName: '浅草Traditional House',
    status: '成約済',
    lastMessage: 'それでは、来月1日からメッセージ代行を開始させていただきます。よろしくお願いいたします。',
    updatedAt: '2026-03-12T15:45:00Z',
    unreadCount: 0,
    quote: {
      total: 30000,
      breakdown: [
        { item: '月額メッセージ代行（英語・中国語）', price: 30000 }
      ]
    },
    messages: [
      { id: 'm-3', sender: 'user', text: '浅草の3LDK物件のメッセージ代行を依頼したいです。', timestamp: '2026-03-10T11:00:00Z' },
      { id: 'm-4', sender: 'vendor', text: '詳細条件承知いたしました。お見積りをお送りします。', timestamp: '2026-03-10T14:00:00Z' },
      { id: 'm-5', sender: 'user', text: 'お見積り確認しました。こちらの条件でお願いします。', timestamp: '2026-03-11T10:00:00Z' },
      { id: 'm-6', sender: 'vendor', text: 'ご成約ありがとうございます。それでは、来月1日からメッセージ代行を開始させていただきます。よろしくお願いいたします。', timestamp: '2026-03-12T15:45:00Z' }
    ]
  }
];
`;

fs.writeFileSync(file, goodLines.join('\n') + phase2, 'utf8');
console.log('Fixed mockData.ts successfully');
