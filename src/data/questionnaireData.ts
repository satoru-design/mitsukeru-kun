export type QuestionGroup = "numerical" | "rules" | "scope" | "details" | "preferences" | "files";

export type QuestionType = 'select' | 'radio' | 'checkbox' | 'number' | 'text' | 'textarea' | 'time' | 'date' | 'file';

export interface QuestionOption {
  label: string;
  value: string;
  // If true, this option acts as a fundamental multiplier (e.g., room size base rate)
  isBaseMultiplier?: boolean; 
  // If true, this represents a quantity that needs to be multiplied by unit price
  isQuantityItem?: boolean;
}

export interface QuestionnaireStep {
  id: string; // The variable name used for pricing
  title: string;
  description?: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
  unitLabel?: string; // e.g. "枚", "平米", "ヶ所"
  group?: QuestionGroup; // For grouping UI sections
  dependsOn?: {
    stepId: string;
    value: string | string[]; // If string[], matches any of the values
  };
}

// Category -> Array of Steps
export const serviceQuestionnaires: Record<string, QuestionnaireStep[]> = {
  // ----- 【Phase 6 追加: 物件探し・適法性調査関連】 -----
  "候補物件の適法性リサーチ（用途地域・法令・消防チェック）": [
    { id: "propertyStatus", title: "現在の物件検討状況", type: "radio", group: "details", required: true,
      options: [
        { label: "すでに目星の物件がある（住所等特定可能）", value: "have_candidate" },
        { label: "エリアだけ決まっている", value: "area_only" },
        { label: "全くの白紙（提案からしてほしい）", value: "none" }
      ]
    },
    { id: "targetCandidateAddress", title: "候補物件の住所・URL", type: "textarea", group: "details", required: true,
      placeholder: "物件の住所やポータルサイトのURLを記入してください",
      dependsOn: { stepId: "propertyStatus", value: "have_candidate" }
    },
    { id: "targetCandidateFiles", title: "図面・マイソク等の資料", type: "file", group: "files",
      dependsOn: { stepId: "propertyStatus", value: "have_candidate" }
    },
    { id: "targetCandidatePhotos", title: "現地写真・内観写真等", type: "file", group: "files",
      dependsOn: { stepId: "propertyStatus", value: "have_candidate" }
    },
    { id: "operationType", title: "希望する運営形態", type: "radio", group: "rules", required: true,
      options: [
        { label: "旅館業許可（365日フル稼働）を希望", value: "ryokan" },
        { label: "民泊新法（年間180日制限）でも可", value: "minpaku" },
        { label: "特区民泊をご希望（該当エリアの場合）", value: "tokku" },
        { label: "よくわからないので相談して決めたい", value: "consult" }
      ]
    },
    { id: "propertySearchArea", title: "検討エリア（都道府県・市区町村など）", type: "text", group: "details", required: true,
      placeholder: "例：東京都新宿区周辺、大阪メトロ御堂筋線沿線など"
    },
    { id: "consultingStyle", title: "希望する相談のスタイル", type: "radio", group: "preferences", required: true,
      options: [
        { label: "オンライン面談での説明希望", value: "online" },
        { label: "報告書（PDF等）とチャットでのやりとりのみで可", value: "chat_report" },
        { label: "現地同行・直接面談を希望", value: "offline" }
      ]
    }
  ],

  "民泊可能物件の提案・リサーチ代行": [
    { id: "propertyStatus", title: "現在の物件検討状況", type: "radio", group: "details", required: true,
      options: [
        { label: "全くの白紙（提案してほしい）", value: "none" },
        { label: "エリアだけ決まっている", value: "area_only" },
        { label: "すでに目星の物件がある（リサーチも兼ねて提案してほしい）", value: "have_candidate" }
      ]
    },
    { id: "targetCandidateAddress", title: "候補物件の住所・URL", type: "textarea", group: "details", required: true,
      placeholder: "物件の住所やポータルサイトのURLを記入してください",
      dependsOn: { stepId: "propertyStatus", value: "have_candidate" }
    },
    { id: "operationType", title: "希望する運営形態", type: "select", group: "rules", required: true,
      options: [
        { label: "旅館業許可（365日稼働）が取得できる物件", value: "ryokan" },
        { label: "民泊新法（180日制限）の物件でも可", value: "minpaku" },
        { label: "特区民泊が可能な物件", value: "tokku" },
        { label: "こだわらない／相談して決めたい", value: "consult" }
      ]
    },
    { id: "propertyType", title: "希望する物件種別", type: "radio", group: "details", required: true,
      options: [
        { label: "一戸建て", value: "house" },
        { label: "マンション・アパート（区分）", value: "mansion" },
        { label: "ビル一棟やアパート一棟", value: "building" },
        { label: "特に問わない（収益性重視）", value: "any" }
      ]
    },
    { id: "propertySearchArea", title: "検討エリア（複数可）", type: "text", group: "details", required: true,
      placeholder: "例：東京23区内、京都駅アクセス良好な場所"
    },
    { id: "budgetRange", title: "予算感（賃料目安 / 購入予算）", type: "text", group: "numerical", required: true,
      placeholder: "例：家賃15万円以内、初期費用100万円など"
    },
    { id: "consultingStyle", title: "希望する相談のスタイル", type: "radio", group: "preferences", required: true,
      options: [
        { label: "オンライン面談希望", value: "online" },
        { label: "チャットベースでの物件提案希望", value: "chat" }
      ]
    }
  ],

  "内見同行・専門家（建築士等）による物理的チェック": [
    { id: "propertyStatus", title: "現在の物件状況", type: "radio", group: "details", required: true,
      options: [
        { label: "すでに目星の物件がある（内見の予約済み・予定あり）", value: "have_candidate" },
        { label: "物件探し中だが、見つかり次第すぐ同行できる人を探している", value: "searching" }
      ]
    },
    { id: "targetCandidateAddress", title: "候補物件の住所・URL", type: "textarea", group: "details", required: true,
      placeholder: "物件の住所をご記入ください",
      dependsOn: { stepId: "propertyStatus", value: "have_candidate" }
    },
    { id: "preferredDate", title: "内見同行の希望日（決まっていれば）", type: "date", group: "numerical", required: false,
      dependsOn: { stepId: "propertyStatus", value: "have_candidate" }
    },
    { id: "propertyType", title: "物件種別", type: "radio", group: "details", required: true,
      options: [
        { label: "一戸建て", value: "house" },
        { label: "マンション・アパート（区分）", value: "mansion" },
        { label: "その他借地・一棟ビル等", value: "other" }
      ]
    },
    { id: "operationType", title: "想定している取得許可", type: "radio", group: "rules", required: true,
      options: [
        { label: "旅館業許可（用途変更の可否等）", value: "ryokan" },
        { label: "民泊新法・特区民泊", value: "minpaku" },
        { label: "未定", value: "unsure" }
      ]
    },
    { id: "expertNeeds", title: "専門家に特にチェックしてほしいポイント", type: "checkbox", group: "scope", required: true,
      options: [
        { label: "用途変更（建築基準法）が必要かどうかの判断", value: "zoning" },
        { label: "消防設備（火災報知器・誘導灯など）の設置可否と概算費用", value: "fire_system" },
        { label: "建物の劣化状況（リフォームが必要な箇所）", value: "renovation" },
        { label: "その他（備考に記載）", value: "other" }
      ]
    }
  ],

  // ----------------------------------------------------

  "定期清掃": [
    // --- 【数値・時間関連】 ---
    { id: "bedCount", title: "ベッド数", type: "number", required: true, unitLabel: "台", group: "numerical" },
    { id: "beddingCount", title: "寝具数（布団含む）", type: "number", required: true, unitLabel: "組", group: "numerical" },
    { id: "bathCount", title: "浴室数", type: "number", required: true, unitLabel: "室", group: "numerical" },
    { id: "toiletCount", title: "トイレ数", type: "number", required: true, unitLabel: "室", group: "numerical" },
    { id: "washroomCount", title: "洗面台数", type: "number", required: true, unitLabel: "台", group: "numerical" },
    { id: "preferredDate", title: "清掃希望日", type: "date", required: true, group: "numerical" },
    { id: "preferredStartTime", title: "清掃希望開始時間", type: "time", required: true, group: "numerical" },
    { id: "checkoutTime", title: "チェックアウト時刻", type: "time", required: true, group: "numerical" },
    { id: "nextCheckinTime", title: "次回チェックイン時刻", type: "time", required: true, group: "numerical" },

    // --- 【清掃・リネンの運用ルール】 ---
    {
      id: "trashDisposalRule", title: "ゴミ処理", type: "select", required: true, group: "rules",
      options: [
        { label: "室内回収のみ", value: "indoor_only" },
        { label: "分別まで", value: "sort" },
        { label: "指定場所搬出まで", value: "carry_out" },
        { label: "持ち帰り相談", value: "takeaway_consult" }
      ]
    },
    {
      id: "linenSupplyMethod", title: "リネン支給方法", type: "select", required: true, group: "rules",
      options: [
        { label: "オーナー支給", value: "owner" },
        { label: "業者手配", value: "vendor" },
        { label: "未定", value: "undecided" }
      ]
    },
    {
      id: "amenityRestockRule", title: "アメニティ補充ルール", type: "select", required: true, group: "rules",
      options: [
        { label: "毎回満タン補充", value: "full" },
        { label: "減っていれば補充", value: "on_demand" },
        { label: "指定数量のみ", value: "fixed_quantity" }
      ]
    },
    {
      id: "inventoryShortageRule", title: "在庫不足時の対応", type: "select", required: true, group: "rules",
      options: [
        { label: "報告のみ", value: "report_only" },
        { label: "立替購入可", value: "purchase_allowed" },
        { label: "事前承認後購入", value: "purchase_with_approval" }
      ]
    },
    {
      id: "cancelPolicy", title: "キャンセルポリシー希望", type: "select", required: true, group: "rules",
      options: [
        { label: "前日無料", value: "free_1day" },
        { label: "24時間以内有料", value: "paid_24h" },
        { label: "当日100%", value: "100_sameday" },
        { label: "業者提案可", value: "consult" }
      ]
    },

    // --- 【作業範囲の指定】 ---
    { id: "bedMake", title: "ベッドメイク", type: "radio", group: "scope", required: true, options: [{label: "必須", value: "required"}, {label: "不要", value: "not_required"}] },
    { id: "linenChange", title: "リネン交換", type: "radio", group: "scope", required: true, options: [{label: "必須", value: "required"}, {label: "必要時のみ", value: "as_needed"}, {label: "不要", value: "not_required"}] },
    { id: "laundryTask", title: "洗濯作業", type: "radio", group: "scope", required: true, options: [{label: "必須", value: "required"}, {label: "不要", value: "not_required"}, {label: "現場状況次第", value: "depends"}] },
    { id: "dryingTask", title: "乾燥作業", type: "radio", group: "scope", required: true, options: [{label: "必須", value: "required"}, {label: "不要", value: "not_required"}, {label: "現場状況次第", value: "depends"}] },
    { id: "amenityRefillTask", title: "消耗品補充の有無", type: "radio", group: "scope", required: true, options: [{label: "あり", value: "yes"}, {label: "なし", value: "no"}] },
    { id: "photoReport", title: "写真報告", type: "radio", group: "scope", required: true, options: [{label: "必須", value: "required"}, {label: "任意", value: "optional"}, {label: "不要", value: "not_required"}] },
    { id: "incidentReport", title: "異常報告", type: "radio", group: "scope", required: true, options: [{label: "必須", value: "required"}, {label: "任意", value: "optional"}, {label: "不要", value: "not_required"}] },

    // --- 【詳細な清掃箇所の指定】 ---
    {
      id: "indoorCleaningDetails", title: "室内清掃", type: "checkbox", group: "details",
      options: [
        { label: "床清掃", value: "floor" },
        { label: "掃除機", value: "vacuum" },
        { label: "モップ", value: "mop" },
        { label: "拭き上げ", value: "wipe" },
        { label: "ホコリ除去", value: "dust" }
      ]
    },
    {
      id: "wetAreaDetails", title: "水回り清掃", type: "checkbox", group: "details",
      options: [
        { label: "浴室", value: "bath" },
        { label: "トイレ", value: "toilet" },
        { label: "洗面台", value: "washroom" },
        { label: "キッチン", value: "kitchen" }
      ]
    },
    {
      id: "refillTargets", title: "補充対象", type: "checkbox", group: "details",
      options: [
        { label: "トイペ", value: "tp" },
        { label: "ティッシュ", value: "tissue" },
        { label: "ソープ類", value: "soap" },
        { label: "ゴミ袋", value: "trashbag" },
        { label: "洗剤", value: "detergent" },
        { label: "お茶・コーヒー等", value: "drinks" }
      ]
    },

    // --- 【業者への希望条件】 ---
    { id: "foreignLang", title: "外国語対応要否", type: "radio", group: "preferences", required: true, options: [{label: "必須", value: "required"}, {label: "任意", value: "optional"}, {label: "不要", value: "not_required"}] },
    { id: "femaleStaff", title: "女性スタッフ希望", type: "radio", group: "preferences", required: true, options: [{label: "必須", value: "required"}, {label: "希望", value: "preferable"}, {label: "不要", value: "not_required"}] },
    { id: "insuranceReq", title: "損害保険加入業者限定", type: "radio", group: "preferences", required: true, options: [{label: "はい", value: "yes"}, {label: "いいえ", value: "no"}] },
    { id: "invoiceReq", title: "インボイス要否", type: "radio", group: "preferences", required: true, options: [{label: "必須", value: "required"}, {label: "不要", value: "not_required"}] },

    // --- 【ファイル添付】 ---
    { id: "manualFile", title: "清掃マニュアル", type: "file", group: "files" },
    { id: "floorPlanFile", title: "間取り図", type: "file", group: "files" },
    { id: "roomPhotos", title: "室内写真", type: "file", group: "files" }
  ],

  "現地サポート": [
    // --- 【トラブルの基本情報】 ---
    { id: "troubleType", title: "トラブル・駆けつけの内容", type: "select", group: "details", required: true,
      options: [
        { label: "鍵の紛失・開錠トラブル", value: "key" },
        { label: "騒音クレーム・近隣トラブル対応", value: "noise" },
        { label: "備品の破損・水漏れ対応", value: "facility" },
        { label: "ゲストの道迷い・病人対応など", value: "guide_health" },
        { label: "警察や消防の対応立ち会い", value: "police_fire" },
        { label: "その他（詳細に記入）", value: "other" }
      ]
    },
    { id: "urgency", title: "駆けつけの緊急度", type: "radio", group: "numerical", required: true,
      options: [
        { label: "いますぐ（30分〜1時間以内）", value: "immediate" },
        { label: "本日中（数時間以内）", value: "today" },
        { label: "明日以降または時間指定", value: "scheduled" }
      ]
    },
    { id: "supportDate", title: "対応希望日", type: "date", group: "numerical", required: false },
    { id: "supportTime", title: "対応希望時間", type: "time", group: "numerical", required: false },

    // --- 【ゲスト・状況の詳細】 ---
    { id: "guestStatus", title: "ゲストの現状", type: "radio", group: "details", required: true,
      options: [
        { label: "チェックイン前 / 外に締め出されている", value: "locked_out" },
        { label: "滞在中（在室）", value: "staying" },
        { label: "不在（外出中）", value: "out" },
        { label: "チェックアウト済み / 空室", value: "empty" },
      ]
    },
    { id: "foreignLangSupport", title: "外国語対応の必要性", type: "radio", group: "preferences", required: true,
      options: [
        { label: "必須（英語などでの直接対話が必要）", value: "required" },
        { label: "翻訳ツール等の使用で可", value: "translation_ok" },
        { label: "不要（ゲスト不在、日本人ゲスト等）", value: "not_required" }
      ]
    },
    { id: "moneyCollection", title: "現地での金銭・ペナルティ等の徴収", type: "radio", group: "rules", required: true,
      options: [
        { label: "あり（現金・クレカ等で徴収希望）", value: "yes" },
        { label: "なし", value: "no" }
      ]
    },

    // --- 【入室と報告ルール】 ---
    { id: "entryMethod", title: "物件への入室方法", type: "select", group: "rules", required: true,
      options: [
        { label: "ゲストが開ける", value: "guest" },
        { label: "キーボックス（暗証番号共有）", value: "keybox" },
        { label: "スマートロック（遠隔開錠 / PIN共有）", value: "smartlock" },
        { label: "ポストや消火栓などの隠し鍵", value: "hidden_key" }
      ]
    },
    { id: "reportFormat", title: "報告希望形式", type: "checkbox", group: "rules", required: true,
      options: [
        { label: "作業完了後の写真", value: "photo" },
        { label: "動画での状況報告", value: "video" },
        { label: "電話での即時報告", value: "call" },
        { label: "テキスト（メッセージ）での報告", value: "text" }
      ]
    },

    // --- 【詳細と添付ファイル】 ---
    { id: "troubleDetails", title: "トラブルの詳細状況", type: "textarea", group: "details", placeholder: "できるだけ詳しく状況や、到着後の具体的な指示をご記入ください", required: true },
    { id: "troublePhotos", title: "現場の写真・スクショ等（あれば）", type: "file", group: "files" }
  ],

  "エアコントラブル": [
    // --- 【機器情報】 ---
    { id: "acType", title: "エアコンのタイプ", type: "radio", group: "details", required: true,
      options: [
        { label: "壁掛け（通常）", value: "wall" },
        { label: "壁掛け（お掃除機能付き）", value: "wall_auto" },
        { label: "天井埋め込み型", value: "ceiling" },
        { label: "窓用・床置き型など", value: "other" }
      ]
    },
    { id: "acLocation", title: "設置場所", type: "select", group: "details", required: true,
      options: [
        { label: "リビング", value: "living" },
        { label: "寝室", value: "bedroom" },
        { label: "その他（和室・廊下等）", value: "other" }
      ]
    },
    { id: "makerModel", title: "メーカー・型番", type: "text", group: "details", placeholder: "例: ダイキン AN22VES-W" },
    { id: "installYear", title: "使用・設置年数", type: "select", group: "details", required: true,
      options: [
        { label: "5年未満", value: "under_5" },
        { label: "5年〜10年", value: "5_to_10" },
        { label: "10年以上（買い替えの可能性あり）", value: "over_10" },
        { label: "不明", value: "unknown" }
      ]
    },

    // --- 【症状と緊急度】 ---
    { id: "acTroubleDetail", title: "不具合の症状（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "冷えない / 暖まらない", value: "no_temp" },
        { label: "室内機から水漏れしている", value: "water_leak" },
        { label: "異音がする / 悪臭がする", value: "noise_smell" },
        { label: "電源が入らない / エラーランプ点滅", value: "no_power" },
        { label: "リモコンが効かない", value: "remote_error" }
      ]
    },
    { id: "errorCode", title: "エラーコード表示（あれば）", type: "text", group: "details", placeholder: "例: U4, H16など" },
    { id: "urgencyAc", title: "修理の緊急度", type: "radio", group: "numerical", required: true,
      options: [
        { label: "ゲスト滞在中・クレームあり（至急）", value: "urgent_guest" },
        { label: "次の予約が迫っている（1〜2日以内）", value: "urgent_next" },
        { label: "現在は空室（数日以内で可）", value: "empty" }
      ]
    },

    // --- 【対応ルール】 ---
    { id: "budgetLimit", title: "修理・部品交換の事前承認ルール", type: "select", group: "rules", required: true,
      options: [
        { label: "1万円以内なら事後報告で対応可", value: "limit_10k" },
        { label: "3万円以内なら事後報告で対応可", value: "limit_30k" },
        { label: "金額にかかわらず必ず事前に見積もり・承認必須", value: "consult_always" },
        { label: "古ければ修理せず新品交換の提案がほしい", value: "suggest_new" }
      ]
    },
    { id: "acPhotos", title: "エアコン本体・リモコン・型番シールの写真", type: "file", group: "files", required: true }
  ],

  "鍵交換": [
    // --- 【現在のドア・鍵の状況】 ---
    { id: "currentKey", title: "現在の鍵の種類", type: "radio", group: "details", required: true,
      options: [
        { label: "シリンダーキー（ギザギザ）", value: "standard_cylinder" },
        { label: "ディンプルキー（くぼみ）", value: "dimple" },
        { label: "電子錠・スマートロック（既存）", value: "smartlock" },
        { label: "不明（写真で判断してほしい）", value: "unknown" }
      ]
    },
    { id: "keyHoles", title: "鍵穴（シリンダー）の数", type: "radio", group: "details", required: true,
      options: [
        { label: "1ヶ所（シングルロック）", value: "1" },
        { label: "2ヶ所（ダブルロック）", value: "2" }
      ]
    },
    { id: "autoLockSync", title: "マンションのオートロックと連動しているか", type: "radio", group: "details", required: true,
      options: [
        { label: "連動している（共用部と同じ鍵）", value: "yes" },
        { label: "連動していない（部屋単独の鍵）", value: "no" },
        { label: "わからない", value: "unknown" }
      ]
    },

    // --- 【新設・交換の希望】 ---
    { id: "newKeyRequest", title: "新しく設置したい鍵の希望", type: "select", group: "preferences", required: true,
      options: [
        { label: "現状と同じタイプの鍵に交換（安価）", value: "same" },
        { label: "防犯性の高いディンプルキーに交換", value: "upgrade_dimple" },
        { label: "物理鍵不要のスマートロック・暗証番号錠にしたい", value: "new_smartlock" },
        { label: "業者に見積もりと提案をお願いしたい", value: "consult" }
      ]
    },
    { id: "keyDisposal", title: "取り外した古い鍵の処分", type: "radio", group: "rules", required: true,
      options: [
        { label: "業者に処分してほしい", value: "vendor" },
        { label: "オーナー自身で保管する（引き渡し希望）", value: "owner" }
      ]
    },

    // --- 【日程と写真】 ---
    { id: "exchangeDate", title: "交換希望日", type: "date", group: "numerical", required: true },
    { id: "exchangeTime", title: "交換希望時間帯", type: "time", group: "numerical", required: false },
    { id: "doorPhotos", title: "ドア全体、鍵穴のアップ、ドア側面の金属盤（刻印）の写真", type: "file", group: "files", required: true }
  ],

  "ゲスト電話対応（多言語）": [
    // --- 【対応スコープと規模】 ---
    { id: "languages", title: "対応が必要な言語（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "英語", value: "english" },
        { label: "中国語（簡体・繁体）", value: "chinese" },
        { label: "韓国語", value: "korean" },
        { label: "スペイン語", value: "spanish" },
        { label: "フランス語", value: "french" },
        { label: "日本語（国内ゲスト対応）", value: "japanese" }
      ]
    },
    { id: "supportType", title: "希望するサポート時間帯", type: "radio", group: "numerical", required: true,
      options: [
        { label: "24時間 365日対応", value: "24_7" },
        { label: "夜間・休日のみ対応", value: "night_holiday" },
        { label: "緊急トラブル発覚時等のスポット通訳のみ", value: "spot" }
      ]
    },
    { id: "monthlyCallVolume", title: "月間の想定コール数（1物件あたり目安）", type: "select", group: "numerical", required: true,
      options: [
        { label: "0〜10件（ほぼ鳴らない）", value: "0_10" },
        { label: "11〜30件", value: "11_30" },
        { label: "31件〜100件", value: "31_100" },
        { label: "100件以上（道案内等で頻繁に鳴る）", value: "over_100" }
      ]
    },

    // --- 【システム設定と連携ルール】 ---
    { id: "phoneNumberSetup", title: "ゲスト向け電話番号の用意", type: "radio", group: "rules", required: true,
      options: [
        { label: "代行業者が専用の050番号等を発行してほしい", value: "vendor_issues" },
        { label: "オーナーが用意した番号から業者へ転送する", value: "owner_forwards" }
      ]
    },
    { id: "escalationRule", title: "深刻なトラブル（騒音・警察等）の際のエスカレーション", type: "select", group: "rules", required: true,
      options: [
        { label: "夜間でも必ずオーナーに即時電話連絡する", value: "call_owner_always" },
        { label: "業者の判断で解決を試み、事後報告で手配する", value: "vendor_solves_first" },
        { label: "事前に取り決めた緊急連絡網（現地の別業者等）へ連絡する", value: "call_local_support" }
      ]
    },
    { id: "localDispatch", title: "電話で解決できず現場対応が必要な場合", type: "radio", group: "rules", required: true,
      options: [
        { label: "電話代行業者にそのまま駆けつけ手配も依頼したい", value: "vendor_dispatches" },
        { label: "オーナーが自身で現地へ行く（または別の業者を手配する）", value: "owner_handles" }
      ]
    },
    { id: "manualStatus", title: "物件情報・Q&Aマニュアルの用意状況", type: "select", group: "files", required: true,
      options: [
        { label: "PDF等の詳しいマニュアルが完備されている", value: "ready" },
        { label: "テキストのメモ程度はある", value: "partial" },
        { label: "ないため、業者側でひな形を用意して作成してほしい", value: "none" }
      ]
    },
    { id: "manualFile", title: "既存の物件マニュアル（あれば）", type: "file", group: "files" }
  ],

  "メッセージ代行": [
    // --- 【対応スコープと規模】 ---
    { id: "msgLanguages", title: "ゲスト対応希望言語（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "日本語", value: "ja" },
        { label: "英語", value: "en" },
        { label: "中国語（簡体・繁体）", value: "zh" },
        { label: "韓国語", value: "ko" },
        { label: "スペイン語などその他", value: "other" }
      ]
    },
    { id: "monthlyReservations", title: "現在の月間予約件数・問い合わせ数（目安）", type: "select", group: "numerical", required: true,
      options: [
        { label: "0〜10件", value: "0_10" },
        { label: "11〜30件", value: "11_30" },
        { label: "31件〜50件", value: "31_50" },
        { label: "51件以上", value: "over_51" }
      ]
    },
    { id: "platforms", title: "利用しているプラットフォーム", type: "checkbox", group: "details", required: true,
      options: [
        { label: "Airbnb", value: "airbnb" },
        { label: "Booking.com", value: "booking" },
        { label: "Agoda", value: "agoda" },
        { label: "Expedia", value: "expedia" },
        { label: "自社サイト・Google等", value: "direct" }
      ]
    },

    // --- 【運用ルール】 ---
    { id: "supportHours", title: "稼働希望時間帯", type: "radio", group: "numerical", required: true,
      options: [
        { label: "24時間 365日フル対応", value: "24_7" },
        { label: "日中のみ（夜間はオーナー対応等）", value: "daytime" },
        { label: "深夜・早朝のみのスポット代行", value: "night_only" }
      ]
    },
    { id: "reviewReply", title: "ゲストへのレビュー返信の要否", type: "radio", group: "rules", required: true,
      options: [
        { label: "代行業者にてレビュー投稿・返答まで行ってほしい", value: "required" },
        { label: "レビュー対応はオーナー自身で行う", value: "not_required" }
      ]
    },
    { id: "guideDistribution", title: "宿泊ガイドやアクセス手順の自動送信設定", type: "radio", group: "rules", required: true,
      options: [
        { label: "業者側のシステム・ツールを使って送信してほしい", value: "vendor_tool" },
        { label: "Airbnb等の予約サイト内チャットのみで手動送信", value: "manual_chat" },
        { label: "すでにオーナー側で自動送信ツールを導入済み（Beds24等）", value: "owner_tool_used" }
      ]
    },
    { id: "manualStatusMsg", title: "対応マニュアルの整備状況", type: "select", group: "files", required: true,
      options: [
        { label: "Q&A集などのテキストマニュアルあり", value: "ready" },
        { label: "これから業者と相談して作成したい", value: "none" }
      ]
    }
  ],

  "完全代行": [
    // --- 【委託と状況の共有】 ---
    { id: "delegationScope", title: "特に重視して委託・改善したい業務", type: "checkbox", group: "details", required: true,
      options: [
        { label: "サイトへの掲載作成（写真・文章プロデュース）", value: "listing" },
        { label: "メッセージ・レビュー等のゲスト対応全般", value: "messaging" },
        { label: "ダイナミックプライシング（価格最適化・売上UP）", value: "pricing" },
        { label: "清掃業者の手配・品質コントロール", value: "cleaning_management" },
        { label: "緊急駆けつけ・現場のトラブル対応", value: "emergency" },
        { label: "行政への届出や消防等のコンプライアンス管理", value: "compliance" }
      ]
    },
    { id: "currentOperation", title: "現在の運用状況", type: "radio", group: "details", required: true,
      options: [
        { label: "これから民泊を始める（立ち上げ前）", value: "before_launch" },
        { label: "現在自主運用しているが、手間なので任せたい", value: "self_running" },
        { label: "現在の代行業者から切り替えを検討している", value: "changing_vendor" }
      ]
    },
    { id: "ownershipType", title: "物件の所有・運営形態", type: "select", group: "rules", required: true,
      options: [
        { label: "自己所有物件（オーナー業）", value: "own" },
        { label: "賃貸借り上げ（転貸・サブリース許可あり）", value: "sublease" },
        { label: "友人・知人等からの運用委託", value: "entrusted" }
      ]
    },

    // --- 【条件と数値詳細】 ---
    { id: "feeStructure", title: "希望する報酬体系", type: "radio", group: "rules", required: true,
      options: [
        { label: "売上連動型（手数料15〜20%等の成果報酬）", value: "revenue_share" },
        { label: "月額固定型（売上に関わらず定額支払い）", value: "fixed_fee" },
        { label: "業者と面談して提案を受けたい", value: "consult" }
      ]
    },
    { id: "salesRecord", title: "直近の月間売上実績・稼働率など（運用中の場合のみ）", type: "textarea", group: "numerical", placeholder: "例：月間売上40万円、稼働率70% 等。立ち上げ前の場合は「なし」とご記入ください。" },
    { id: "appealPoint", title: "物件の強み、ターゲット層、課題など", type: "textarea", group: "details", placeholder: "例：ファミリー層を獲得したいが、現在の写真がいまいち等" },
    { id: "meetingPreference", title: "面談の希望形式", type: "radio", group: "preferences", required: true,
      options: [
        { label: "オンライン面談希望", value: "online" },
        { label: "対面での面談（物件視察も兼ねて）希望", value: "offline" },
        { label: "どちらでも良い", value: "any" }
      ]
    }
  ],
  
  "写真撮影 / 動画撮影": [
    // --- 【撮影内容】 ---
    { id: "photoRoomType", title: "対象物件の間取り", type: "select", group: "numerical", required: true,
      options: [
        { label: "1R / 1K", value: "1R" },
        { label: "1LDK ~ 2LDK", value: "1LDK_2LDK" },
        { label: "3LDK以上 ~ 大型戸建", value: "3LDK_plus" }
      ]
    },
    { id: "photoCount", title: "撮影希望納品枚数", type: "select", group: "numerical", required: true,
      options: [
        { label: "10〜15枚（基本セット）", value: "tier1" },
        { label: "15〜25枚（詳細カット含む）", value: "tier2" },
        { label: "25〜40枚（大型物件・外観・周辺環境含む）", value: "tier3" }
      ]
    },
    { id: "videoEdit", title: "動画撮影と編集の希望", type: "radio", group: "details", required: true,
      options: [
        { label: "写真撮影のみ（動画不要）", value: "photo_only" },
        { label: "SNS用ショート動画（縦型）の撮影・編集希望", value: "shorts_video" },
        { label: "リスティング用ルームツアー動画（横型）の撮影・編集希望", value: "long_video" }
      ]
    },

    // --- 【クオリティとオプション】 ---
    { id: "retouchLevel", title: "レタッチ（画像補正）レベル", type: "select", group: "preferences", required: true,
      options: [
        { label: "基本補正のみ（明るさ・色合い調整）", value: "basic" },
        { label: "窓外の景色合成(HDR)など高度な補正必須", value: "advanced" },
        { label: "夜景・夕景への変色レタッチ希望", value: "day_to_night" }
      ]
    },
    { id: "drone", title: "ドローン空撮の希望", type: "radio", group: "scope", required: true,
      options: [
        { label: "希望する（外観周辺や景観のアピール）", value: "yes" },
        { label: "希望しない", value: "no" }
      ]
    },
    { id: "propStyling", title: "小物・インテリアなどのスタイリング手配", type: "radio", group: "scope", required: true,
      options: [
        { label: "カメラマン・業者に小物を持ち込んでセットしてほしい", value: "vendor_bring" },
        { label: "物件にあるものだけで撮影する", value: "use_existing" }
      ]
    },
    { id: "surroundingShoot", title: "周辺環境・最寄駅からの道順などの撮影要否", type: "radio", group: "scope", required: true,
      options: [
        { label: "必要（ハウスガイド作成などに使うため）", value: "yes" },
        { label: "不要（室内と外観のみでOK）", value: "no" }
      ]
    },
    { id: "shootDate", title: "撮影希望日（家具セットアップ完了予定日）", type: "date", group: "numerical", required: true }
  ],

  "スマートロック設置・設定": [
    // --- 【ドアと通信環境の情報】 ---
    { id: "doorType", title: "現在のドアノブ・シリンダーの種類", type: "select", group: "details", required: true,
      options: [
        { label: "プッシュプル錠（押し引きタイプ）", value: "pushpull" },
        { label: "サムラッチ錠（親指で下げるタイプ）", value: "thumb" },
        { label: "レバーハンドル錠", value: "lever" },
        { label: "ドアノブ（握り玉タイプ）", value: "knob" },
        { label: "不明なので写真を見て判断してほしい", value: "unknown" }
      ]
    },
    { id: "wifiEnvironment", title: "物件内のWi-Fi・インターネット環境", type: "radio", group: "details", required: true,
      options: [
        { label: "既にWi-Fiが開通しており利用可能", value: "ready" },
        { label: "まだないが、開通予定である", value: "preparing" },
        { label: "Wi-Fiなし（Bluetooth接続等のモデル限定）", value: "none" }
      ]
    },
    { id: "autoLockSyncLock", title: "エントランスのオートロックとの連携必要性", type: "radio", group: "rules", required: true,
      options: [
        { label: "オートロックあり（エントランス解錠ソリューションが必要）", value: "needed" },
        { label: "オートロックなし（自室のみの施工でOK）", value: "not_needed" }
      ]
    },

    // --- 【機能と予算の希望】 ---
    { id: "unlockMethods", title: "希望する解錠方法（複数選択可）", type: "checkbox", group: "preferences", required: true,
      options: [
        { label: "暗証番号キーパッド", value: "pin" },
        { label: "ICカード / 交通系IC", value: "ic" },
        { label: "スマホアプリ / Bluetooth", value: "app" },
        { label: "遠隔からの解錠操作（Wi-Fiハブ必須）", value: "remote" },
        { label: "物理鍵も併用できるように残したい", value: "physical" }
      ]
    },
    { id: "powerType", title: "スマートロックの電源タイプ", type: "radio", group: "preferences", required: true,
      options: [
        { label: "電池式（工事不要・安価）", value: "battery" },
        { label: "100V電源・有線式（電池切れの心配なし・工事費高め）", value: "wired" },
        { label: "業者に相談して決めたい", value: "consult" }
      ]
    },
    { id: "smartLockBudget", title: "機器＋工事費用の想定予算", type: "select", group: "numerical", required: true,
      options: [
        { label: "3万円未満（簡易的な後付けタイプ）", value: "under_30k" },
        { label: "3万〜7万円（標準的な暗証番号タイプ）", value: "30_to_70k" },
        { label: "7万円以上（堅牢な交換タイプ・有線など）", value: "over_70k" },
        { label: "見積もりを見て決めたい", value: "consult" }
      ]
    },

    // --- 【詳細数値・ファイル】 ---
    { id: "doorThickness", title: "ドアの厚み・バックセット寸法（ミリ単位・分かれば）", type: "text", group: "numerical", placeholder: "例：厚み40mm、バックセット64mm" },
    { id: "doorLockPhotos", title: "ドア全体、現在の鍵の表裏アップ、ドア側面の金属盤（刻印）の写真", type: "file", group: "files", required: true }
  ],

  "不用品回収": [
    // --- 【物量と建物の状況】 ---
    { id: "junkVolume", title: "回収を希望する不用品の量（目安）", type: "select", group: "numerical", required: true,
      options: [
        { label: "軽トラック1台分（少なめ）", value: "light_truck" },
        { label: "1.5t〜2tトラック1台分（標準）", value: "standard_truck" },
        { label: "2tトラック2台分以上（一軒家丸ごと等）", value: "large" },
        { label: "単品（ベッドのみ、冷蔵庫のみ等）", value: "single" }
      ]
    },
    { id: "buildingFloor", title: "建物の階数・エレベーター有無", type: "select", group: "details", required: true,
      options: [
        { label: "一戸建て / 1階", value: "floor_1" },
        { label: "2階以上（エレベーターあり）", value: "elevator_yes" },
        { label: "2階（エレベーターなし・階段作業）", value: "stairs_2" },
        { label: "3階以上（エレベーターなし・階段作業）", value: "stairs_3" }
      ]
    },
    { id: "parkingSpace", title: "トラックの駐車スペース有無", type: "radio", group: "details", required: true,
      options: [
        { label: "敷地内・目の前に駐車可能", value: "yes" },
        { label: "なし（近隣のコインパーキング等を利用）", value: "no" }
      ]
    },

    // --- 【作業内容と希望日】 ---
    { id: "dismantlingRequired", title: "大型家具の解体・取り外し作業の有無", type: "radio", group: "scope", required: true,
      options: [
        { label: "あり（二段ベッドの解体、エアコン取り外し等）", value: "yes" },
        { label: "なし（そのまま運び出せる状態）", value: "no" }
      ]
    },
    { id: "pickupDate", title: "回収希望日", type: "date", group: "numerical", required: true },
    { id: "junkPhotos", title: "回収対象物すべてと搬出経路の写真", type: "file", group: "files", required: true }
  ],

  "リネンサプライ": [
    // --- 【量と配送サイクル】 ---
    { id: "linenFrequency", title: "希望する配送・回収頻度", type: "select", group: "numerical", required: true,
      options: [
        { label: "都度配送（清掃の都度入れ替え）", value: "on_demand" },
        { label: "週1回まとめて配送・回収", value: "weekly" },
        { label: "月2回定期配送・回収", value: "biweekly" }
      ]
    },
    { id: "bedSizeLinen", title: "ベッドのサイズと数", type: "textarea", group: "numerical", placeholder: "例: シングル2台、ダブル1台、ソファベッド1台", required: true },
    { id: "linenItems", title: "必要なリネンの種類（複数選択可）", type: "checkbox", group: "scope", required: true,
      options: [
        { label: "シーツ・布団カバー・枕カバー一式", value: "bedding" },
        { label: "バスタオル・フェイスタオル", value: "towels" },
        { label: "バスマット", value: "bathmat" },
        { label: "浴衣などのナイトウェア", value: "nightwear" }
      ]
    },

    // --- 【運用ルール】 ---
    { id: "deliveryMethod", title: "配送・回収の方法", type: "radio", group: "rules", required: true,
      options: [
        { label: "物件前・ドア前での受け渡し（置き配含む）", value: "door_to_door" },
        { label: "室内への搬入・リネン庫への収納まで", value: "inside_room" },
        { label: "専用のリネン回収ボックスを利用", value: "box" }
      ]
    },
    { id: "storageSpace", title: "予備リネンの保管スペース有無", type: "radio", group: "details", required: true,
      options: [
        { label: "あり（物件内に専用スペースあり）", value: "yes" },
        { label: "なし（毎回ジャストの枚数が必要）", value: "no" }
      ]
    },
    { id: "linenQuality", title: "クリーニング品質の希望", type: "radio", group: "preferences", required: true,
      options: [
        { label: "標準品質（一般的な民泊向け・コスト重視）", value: "standard" },
        { label: "ホテル仕様（高温アイロン・のり付け等の高品質）", value: "hotel_grade" }
      ]
    },
    { id: "contractType", title: "契約・利用の想定", type: "select", group: "rules", required: true,
      options: [
        { label: "継続利用（月額契約等）", value: "ongoing_monthly" },
        { label: "お試し・スポット利用", value: "spot" }
      ]
    }
  ],

  "水回りクリーニング / エアコンクリーニング": [
    // --- 【清掃範囲と状況】 ---
    { id: "cleaningTargetsExt", title: "専門クリーニングを希望する箇所（複数選択可）", type: "checkbox", group: "scope", required: true,
      options: [
        { label: "お風呂（浴室全体・エプロン裏・鏡ウロコ取り等）", value: "bath" },
        { label: "トイレ・洗面所", value: "toilet_washroom" },
        { label: "キッチン周り・換気扇（油汚れ分解）", value: "kitchen" },
        { label: "エアコン（壁掛け・フィルター清掃）", value: "ac_wall" },
        { label: "エアコン（お掃除機能付き・完全分解洗浄）", value: "ac_robot" }
      ]
    },
    { id: "dirtLevel", title: "汚れの状況（目安）", type: "select", group: "details", required: true,
      options: [
        { label: "定期清掃では落ちない程度の水垢・軽度の汚れ", value: "light" },
        { label: "カビや頑固な水垢・油汚れが目立つ", value: "medium" },
        { label: "長期間放置されておりかなりひどい（悪臭あり等）", value: "heavy" }
      ]
    },
    { id: "wetAreaSize", title: "水回り設備の広さ・規模感", type: "select", group: "numerical", required: true,
      options: [
        { label: "小規模（1R・単身用マンションサイズ）", value: "small" },
        { label: "標準（一般的なファミリー向けサイズ）", value: "standard" },
        { label: "大型（大型戸建・アイランドキッチン・複数トイレ等）", value: "large" }
      ]
    },

    // --- 【条件と日程】 ---
    { id: "parkingSpaceWater", title: "作業車の駐車スペース有無", type: "radio", group: "details", required: true,
      options: [
        { label: "敷地内に駐車可能", value: "yes" },
        { label: "なし（近隣コインパーキング利用）", value: "no" }
      ]
    },
    { id: "cleaningPresence", title: "現地での立ち会いの有無", type: "radio", group: "rules", required: true,
      options: [
        { label: "立ち会いあり（オーナーが解錠・確認する）", value: "present" },
        { label: "無人対応（キーボックス等で解錠し、写真・動画で報告完了）", value: "unattended" }
      ]
    },
    { id: "ecoDetergent", title: "洗剤の指定（エコ洗剤等の希望）", type: "radio", group: "preferences", required: true,
      options: [
        { label: "指定なし（業者の標準洗剤でOK）", value: "none" },
        { label: "エコ洗剤・天然由来成分の洗剤を使用してほしい", value: "eco" }
      ]
    },
    { id: "specialCleaningDate", title: "施工希望日", type: "date", group: "numerical", required: true }
  ],

  "SNS集客・運用": [
    // --- 【アカウント状況とターゲット】 ---
    { id: "accountStatus", title: "運用対象のアカウント状況", type: "radio", group: "details", required: true,
      options: [
        { label: "まだない（ゼロから立ち上げたい）", value: "none" },
        { label: "アカウントはあるが、フォロワーは少なく放置気味", value: "exist_idle" },
        { label: "運用中だが、ある程度から伸び悩んでいる", value: "exist_active" }
      ]
    },
    { id: "snsTarget", title: "獲得したいメインターゲットの客層（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "国内の若年層（女子会・カップル等）", value: "domestic_youth" },
        { label: "国内のファミリー・グループ層", value: "domestic_family" },
        { label: "訪日外国人（インバウンド）", value: "inbound" },
        { label: "企業合宿・ワーケーション等", value: "corporate" }
      ]
    },

    // --- 【運用スコープと予算】 ---
    { id: "snsPlatforms", title: "強化したいSNSプラットフォーム", type: "checkbox", group: "scope", required: true,
      options: [
        { label: "Instagram", value: "instagram" },
        { label: "TikTok", value: "tiktok" },
        { label: "X (旧Twitter)", value: "x" },
        { label: "YouTube (Shorts等含む)", value: "youtube" },
        { label: "その他・業者に提案してほしい", value: "consult" }
      ]
    },
    { id: "snsOperationType", title: "希望するサポート範囲", type: "radio", group: "scope", required: true,
      options: [
        { label: "アカウント立ち上げ・初期構築・コンサルのみ", value: "setup" },
        { label: "継続的な投稿作成・日々の運用代行", value: "operation" },
        { label: "インフルエンサーのキャスティング手配のみ", value: "influencer" },
        { label: "SNS広告の運用代行", value: "ads" }
      ]
    },
    { id: "snsBudget", title: "月額の想定予算感", type: "select", group: "numerical", required: true,
      options: [
        { label: "5万円未満", value: "under_50k" },
        { label: "5万〜10万円", value: "50k_to_100k" },
        { label: "10万〜20万円", value: "100k_to_200k" },
        { label: "20万円以上", value: "over_200k" }
      ]
    },
    { id: "postFrequency", title: "希望する投稿頻度（運用代行の場合）", type: "select", group: "rules", required: false,
      options: [
        { label: "週1回程度", value: "weekly" },
        { label: "週2〜3回程度", value: "2_3_times" },
        { label: "毎日投稿", value: "daily" }
      ]
    },
    { id: "snsMaterials", title: "投稿用の写真・動画素材の有無", type: "radio", group: "files", required: true,
      options: [
        { label: "素材は豊富にある（オーナー側で提供可能）", value: "exists" },
        { label: "撮影や素材収集から業者にお願いしたい", value: "need_shooting" }
      ]
    }
  ],

  "ハウスガイド制作": [
    // --- 【言語と形式】 ---
    { id: "guideLanguagesExt", title: "作成したい言語（複数選択可）", type: "checkbox", group: "scope", required: true,
      options: [
        { label: "日本語", value: "ja" },
        { label: "英語", value: "en" },
        { label: "中国語（簡体字）", value: "zh_cn" },
        { label: "中国語（繁体字）", value: "zh_tw" },
        { label: "韓国語", value: "ko" },
        { label: "その他（備考欄へ）", value: "other" }
      ]
    },
    { id: "guideFormatExt", title: "希望する納品形式", type: "select", group: "preferences", required: true,
      options: [
        { label: "PDFデータ（印刷・送信両用）", value: "pdf" },
        { label: "Notionや専用Webページでのオンラインガイド", value: "web" },
        { label: "ラミネート加工や冊子化された印刷現物の納品", value: "printed" }
      ]
    },
    { id: "designTaste", title: "希望するデザインのテイスト", type: "select", group: "preferences", required: true,
      options: [
        { label: "シンプル・スタイリッシュ（万能）", value: "simple" },
        { label: "ポップ・カラフル（若年層・ファミリー向け）", value: "pop" },
        { label: "ラグジュアリー・高級感", value: "luxury" },
        { label: "和風・ジャパニーズモダン", value: "japanese" },
        { label: "丸投げ（物件の写真を見てお任せ）", value: "auto" }
      ]
    },

    // --- 【掲載内容と素材】 ---
    { id: "ruleAmount", title: "物件の独自ルールや特記事項の多さ", type: "radio", group: "details", required: true,
      options: [
        { label: "標準的（ゴミ出し、騒音注意程度）", value: "standard" },
        { label: "多い（楽器禁止、特殊な家電の使い方、入館ルールなど）", value: "many_rules" }
      ]
    },
    { id: "surroundingInfo", title: "周辺情報（おすすめ飲食店・病院等）の記載要否", type: "radio", group: "scope", required: true,
      options: [
        { label: "必要（業者側でリサーチして記載してほしい）", value: "research_needed" },
        { label: "必要（オーナーが指定した店舗を綺麗に載せてほしい）", value: "owner_specify" },
        { label: "不要（ハウスルールと家電の使い方等のみでOK）", value: "no" }
      ]
    },
    { id: "manuscriptStatus", title: "現在の原稿（テキストベース）や手持ち写真の有無", type: "radio", group: "files", required: true,
      options: [
        { label: "原稿も写真もすべて揃っている（デザインと翻訳のみ希望）", value: "all_ready" },
        { label: "一部はあるが、足りない部分は作成・撮影してほしい", value: "partial" },
        { label: "まったくないため、ゼロからヒアリングして作ってほしい", value: "none" }
      ]
    },
    { id: "existingDraft", title: "既存のドラフト資料や写真（あれば）", type: "file", group: "files" }
  ],

  "宿泊施設ページ制作（Airbnb等）": [
    // --- 【プラットフォームとスコープ】 ---
    { id: "listingPlatform", title: "作成対象のプラットフォーム（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "Airbnb", value: "airbnb" },
        { label: "Booking.com", value: "booking_com" },
        { label: "Agoda", value: "agoda" },
        { label: "楽天トラベル / じゃらんなど国内OTA", value: "domestic" },
        { label: "自社オリジナルの予約サイト構築", value: "custom" }
      ]
    },
    { id: "additionalSetup", title: "ページ制作と同時に希望するセットアップ業務", type: "checkbox", group: "scope", required: true,
      options: [
        { label: "リスティングのアカウント作成・本人確認代行", value: "account_setup" },
        { label: "自動メッセージツールの設定代行", value: "auto_message" },
        { label: "ダイナミックプライシング（価格調整ツール）の導入", value: "pricing_tool" },
        { label: "ハウスガイド（PDF等）の同時制作", value: "house_guide" }
      ]
    },

    // --- 【ターゲットとコンセプト】 ---
    { id: "targetGuestListing", title: "想定しているメインターゲット層（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "インバウンド（訪日外国人）のファミリー層", value: "inbound_family" },
        { label: "インバウンドのカップル・少人数", value: "inbound_small" },
        { label: "国内の若年層（女子会や推し活など）", value: "domestic_youth" },
        { label: "ワーケーション・ビジネス層", value: "business" }
      ]
    },
    { id: "conceptAppeal", title: "物件のアピールポイント・独自コンセプト", type: "textarea", group: "details", placeholder: "例：和モダンなインテリアで揃えた一軒家、プロジェクター完備、など", required: true },
    { id: "viewingAvailability", title: "現地での内見・詳細確認の可否", type: "radio", group: "rules", required: true,
      options: [
        { label: "オンラインでのやり取りのみ希望", value: "online_only" },
        { label: "業者に現地へ来てもらい、直接打ち合わせ・確認してほしい", value: "offline_ok" }
      ]
    },

    // --- 【素材の状況】 ---
    { id: "listingAssetStatus", title: "写真や文章などの素材の準備状況", type: "radio", group: "files", required: true,
      options: [
        { label: "プロが撮影した写真等の素材は完全に揃っている", value: "ready" },
        { label: "スマホ等で撮った簡易的な写真やメモはある", value: "partial" },
        { label: "全くなし（プロの撮影や文章作成から全てお願いしたい）", value: "none" }
      ]
    },
    { id: "existingPhotos", title: "手持ちの写真素材・物件資料（あれば）", type: "file", group: "files" }
  ],

  "家具・家電選定": [
    // --- 【規模とターゲット】 ---
    { id: "furnitureLayout", title: "設置予定の物件の広さ・間取り", type: "select", group: "numerical", required: true,
      options: [
        { label: "1R / 1K（〜30平米）", value: "1R" },
        { label: "1LDK（30〜50平米）", value: "1LDK" },
        { label: "2LDK / 3LDK（50〜100平米）", value: "2LDK" },
        { label: "大型一戸建て・ヴィラ（100平米〜）", value: "house" }
      ]
    },
    { id: "furnitureTarget", title: "想定しているゲストのメインターゲット層", type: "select", group: "details", required: true,
      options: [
        { label: "少人数のカップル・友人（デザイン性重視）", value: "couple" },
        { label: "ファミリー層（安全性と利便性重視）", value: "family" },
        { label: "大人数グループ（大きめのダイニングや複数ベッド重視）", value: "large_group" },
        { label: "ビジネス・ワーケーション（デスク等の設備重視）", value: "business" },
        { label: "まだ決まっていないので相談したい", value: "consult" }
      ]
    },

    // --- 【デザインと予算】 ---
    { id: "furnitureTaste", title: "希望するインテリアのデザイン・コンセプト", type: "select", group: "preferences", required: true,
      options: [
        { label: "シンプル・ナチュラル（無印良品・IKEA風）", value: "simple" },
        { label: "北欧モダン・スタイリッシュ", value: "nordic" },
        { label: "ラグジュアリー・高級ホテルライク", value: "luxury" },
        { label: "和風・ジャパニーズモダン", value: "japanese" },
        { label: "物件に合ったものを業者に提案してほしい", value: "auto" }
      ]
    },
    { id: "furnitureBudget", title: "家具・家電の想定購入予算（実費）", type: "select", group: "numerical", required: true,
      options: [
        { label: "30万円未満（コスト最優先・最低限で揃えたい）", value: "under_300k" },
        { label: "30万〜60万円（標準的な民泊クオリティ）", value: "300k_to_600k" },
        { label: "60万〜100万円（少し良い家具を入れたい）", value: "600k_to_1m" },
        { label: "100万円以上（高級感・写真映えを徹底したい）", value: "over_1m" }
      ]
    },

    // --- 【依頼範囲と現状】 ---
    { id: "furnitureScope", title: "選定と購入の依頼範囲", type: "radio", group: "scope", required: true,
      options: [
        { label: "URLリストの作成のみ（購入はオーナー自身が実施）", value: "list_only" },
        { label: "リスト作成から購入代行（立て替え・手配）まで全て", value: "proxy_purchase" }
      ]
    },
    { id: "currentFurniture", title: "現在の家具の有無", type: "radio", group: "details", required: true,
      options: [
        { label: "何もない（空室からのフルセットアップ）", value: "empty" },
        { label: "一部の家具家電は残置物や手持ちのものを使う", value: "partial" },
        { label: "既存の家具を一新したい（リニューアル）", value: "replacing" }
      ]
    },
    { id: "floorPlanFileFurn", title: "物件の間取り図（必須）", type: "file", group: "files", required: true }
  ],

  "家具組み立て・設置": [
    // --- 【作業量と建物の状況】 ---
    { id: "assemblyVolume", title: "組み立て・設置する家具の量（おおよそ）", type: "select", group: "numerical", required: true,
      options: [
        { label: "少量（ベッド1〜2台や棚1つ程度）", value: "small" },
        { label: "中量（一般的な1LDKひと部屋分を丸ごと）", value: "medium" },
        { label: "大量（3LDK以上の大型戸建や複数部屋の丸ごと）", value: "large" }
      ]
    },
    { id: "heavyFurniture", title: "特に大型・重量のある家具の有無", type: "checkbox", group: "details", required: true,
      options: [
        { label: "2段ベッドやロフトベッド", value: "bunk_bed" },
        { label: "大型のソファ・ダイニングテーブル", value: "large_sofa_table" },
        { label: "壁面収納や天井までの大型本棚", value: "wall_storage" },
        { label: "特になし（一般的なシングルベッドや小型家具のみ）", value: "none" }
      ]
    },
    { id: "buildingFloorAssm", title: "建物の階数・エレベーターの有無", type: "select", group: "details", required: true,
      options: [
        { label: "一戸建て（主に1階作業）", value: "house_1f" },
        { label: "一戸建て（2階以上への吊り上げや階段搬入あり）", value: "house_2f" },
        { label: "マンション 2階以上（エレベーターあり）", value: "mansion_ev" },
        { label: "マンション 2階以上（エレベーターなし・階段手運び）", value: "mansion_stairs" }
      ]
    },

    // --- 【作業スコープと日程】 ---
    { id: "assemblyCarryIn", title: "搬入・荷解き・ゴミ回収の希望", type: "radio", group: "scope", required: true,
      options: [
        { label: "組み立て作業のみでOK（搬入とゴミ出しはオーナーがやる）", value: "assembly_only" },
        { label: "商品の受け取り・搬出から段ボール等のゴミ回収まですべて任せたい", value: "full_service" }
      ]
    },
    { id: "assemblyDate", title: "組み立て・設置の希望日（家具の配送予定日）", type: "date", group: "numerical", required: true },
    { id: "furnitureList", title: "購入予定の家具リスト・URLなど（あれば）", type: "textarea", group: "details", placeholder: "IKEAのベッドフレーム○○、ニトリの○○など" }
  ],

  "家具・家電の受取": [
    { id: "receivingDateType", title: "受取希望日（複数日対応の可否）", type: "radio", group: "numerical", required: true,
      options: [
        { label: "指定の1日のみで全て受け取る（同日配送手配済み）", value: "single_day" },
        { label: "複数日（例：土日の2日間等）にまたがって受け取りが必要", value: "multiple_days" },
        { label: "業者のスケジュールに合わせて配送日を調整したい", value: "consult" }
      ]
    },
    { id: "receivingVolume", title: "受け取る分量（おおよそ）", type: "select", group: "numerical", required: true,
      options: [
        { label: "小口（段ボール数個レベル）", value: "small" },
        { label: "中量（1LDK分程度・家電含む複数個）", value: "medium" },
        { label: "大量（一軒家丸ごとセット・大型家具多数）", value: "large" }
      ]
    },
    { id: "unpackingTask", title: "開梱・段ボール処理の希望", type: "radio", group: "scope", required: true,
      options: [
        { label: "受け取りのみ（玄関先等に置くだけ）", value: "receive_only" },
        { label: "室内への搬入と、開梱・段ボールの持ち帰り処分まで希望", value: "unpacking_disposal" },
        { label: "開梱と簡単な組み立て（脚の取り付け等）までやってほしい", value: "unpacking_assemble" }
      ]
    },
    { id: "buildingFloorReceiving", title: "建物の階数・エレベーター有無", type: "select", group: "details", required: true,
      options: [
        { label: "1階 / エレベーターあり", value: "easy_access" },
        { label: "2階（階段のみ）", value: "stairs_2f" },
        { label: "3階以上（階段のみ）", value: "stairs_3f_over" }
      ]
    },
    { id: "preferredReceivingDate", title: "受取希望日（第一希望）", type: "date", group: "numerical", required: true },
    { id: "receivingDetails", title: "配送業者や購入店についての詳細情報", type: "textarea", group: "details", placeholder: "例：Amazonから複数個口、ヨドバシカメラから冷蔵庫等" }
  ],

  "インターネット・Wi-Fi手配": [
    // --- 【回線の種類と環境】 ---
    { id: "wifiType", title: "希望するインターネット回線の種類", type: "radio", group: "details", required: true,
      options: [
        { label: "光回線（高速・安定・制限なし・要工事）", value: "optical" },
        { label: "ホームルーター（コンセントに挿すだけ・工事なしの手軽さ重視）", value: "home_router" },
        { label: "ポケットWi-Fi（ゲストが外出時に持ち出し可能な利便性重視）", value: "pocket_wifi" },
        { label: "物件の規模やゲスト層に合った最適なものを相談したい", value: "consult" }
      ]
    },
    { id: "currentInternet", title: "現在の物件のネット環境状況", type: "radio", group: "details", required: true,
      options: [
        { label: "ネット環境なし・新規契約が必要", value: "none" },
        { label: "無料のマンションWi-Fiがあるが遅いので別回線を引きたい", value: "change_needed" },
        { label: "光コンセントなどの設備はあるか不明", value: "unsure" }
      ]
    },

    // --- 【条件と日程】 ---
    { id: "multilingualSupport", title: "ゲスト向けの多言語設定・サポートマニュアルの必要性", type: "radio", group: "scope", required: true,
      options: [
        { label: "ルーターの英語表記やゲスト向けSSID/PASSガイドの作成までお願いしたい", value: "needed" },
        { label: "回線の手配だけで良い（ガイドは自分で作る）", value: "not_needed" }
      ]
    },
    { id: "contractPeriodLimit", title: "契約期間・縛りに関する希望", type: "radio", group: "preferences", required: true,
      options: [
        { label: "いつでも解約できる縛りなしのプランを希望", value: "no_limit" },
        { label: "1〜2年縛りでも良いので月額費用を安く抑えたい", value: "discount_plan" },
        { label: "業者に提案を任せる", value: "consult" }
      ]
    },
    { id: "wifiTiming", title: "利用開始希望時期（入居・オープン予定日など）", type: "select", group: "numerical", required: true,
      options: [
        { label: "大至急（1〜2週間以内）※工事なしプラン推奨", value: "urgent" },
        { label: "通常（約1ヶ月以内）", value: "normal" },
        { label: "まだ先（物件内見・準備段階）", value: "future" }
      ]
    }
  ],

  "民泊新法届出 / 旅館業許可申請": [
    // --- 【許可の種類と物件構造】 ---
    { id: "licenseType", title: "申請したい許可の種類", type: "select", group: "details", required: true,
      options: [
        { label: "住宅宿泊事業法（民泊新法・年間180日制限あり）", value: "minpaku" },
        { label: "国家戦略特別区域外国人滞在施設経営事業（特区民泊・日数制限なし・最低2泊〜等）", value: "tokku" },
        { label: "旅館業法・簡易宿所営業（日数制限なし・通年営業）", value: "ryokan" },
        { label: "どの許可が取れるか物件や用途地域の事前調査・コンサルから依頼したい", value: "investigate" }
      ]
    },
    { id: "buildingTypeLicense", title: "対象物件の構造（建物の種類）", type: "radio", group: "details", required: true,
      options: [
        { label: "分譲・賃貸マンション・アパートの1室", value: "mansion" },
        { label: "一戸建て", value: "house" },
        { label: "ビル・空き店舗・倉庫等のコンバージョン（用途変更あり）", value: "commercial" }
      ]
    },
    { id: "propertyAddress", title: "物件の所在地（市区町村までで可）", type: "text", group: "details", required: true, placeholder: "例：東京都新宿区新宿" },

    // --- 【現状と許可】 ---
    { id: "fireSystemStatus", title: "消防設備（火災報知器・誘導灯など）の設置状況", type: "radio", group: "details", required: true,
      options: [
        { label: "すでに民泊・旅館業基準で設置済み・消防法令適合通知書あり", value: "ready" },
        { label: "これから設置が必要（消防署への事前相談から依頼したい）", value: "none" },
        { label: "わからないので確認してほしい", value: "unsure" }
      ]
    },
    { id: "managementSystem", title: "家主不在型の場合の管理業者の委託予定", type: "radio", group: "rules", required: true,
      options: [
        { label: "登録済みの住宅宿泊管理業者へ委託する予定（業者は決定済み）", value: "entrusted" },
        { label: "管理業者も紹介・同時に手配してほしい", value: "need_vendor" },
        { label: "自身で管理業者としての登録も行い、自主管理する", value: "self" }
      ]
    },
    { id: "ownerPermission", title: "不動産オーナーや管理組合の承諾状況（転貸・民泊利用の許可）", type: "radio", group: "rules", required: true,
      options: [
        { label: "許可取得済み（契約書や規約に明記されている）", value: "permitted" },
        { label: "現在交渉中", value: "negotiating" },
        { label: "自己所有物件のため承諾不要", value: "own_property" }
      ]
    },
    { id: "drawingAvailability", title: "物件の建築図面や間取り図の有無", type: "radio", group: "files", required: true,
      options: [
        { label: "寸法の入った正確な図面がある", value: "exists" },
        { label: "不動産屋でもらった簡易な間取り図（マイソク）のみ", value: "simple_layout" },
        { label: "図面がないため、現地測量と図面作成からお願いしたい", value: "need_drafting" }
      ]
    },
    { id: "propertyDrawings", title: "既存の図面や写真（あれば）", type: "file", group: "files" }
  ],

  "消防設備設置工事": [
    // --- 【工事内容と規模】 ---
    { id: "fireSystemType", title: "必要と思われる消防設備・工事の内容（復数選択可・不明ならコンサル希望へ）", type: "checkbox", group: "scope", required: true,
      options: [
        { label: "自動火災報知設備（自火報）の新設・増設・特定小規模施設の特例対応", value: "alarm" },
        { label: "誘導灯の設置", value: "guidance_light" },
        { label: "非常用照明・消火器の設置", value: "extinguisher" },
        { label: "防炎物品（防炎カーテン・絨毯等）の導入手配と防炎ラベル", value: "flameproof" },
        { label: "消防署への着工届・設置届・消防検査の立ち会い・適合通知書の取得代行のみ", value: "document_only" }
      ]
    },
    { id: "fireBuildingSize", title: "建物の規模（おおよそ）", type: "select", group: "numerical", required: true,
      options: [
        { label: "小規模（〜150平米未満の区分マンションや一般的な戸建て）", value: "small" },
        { label: "中規模（150平米以上の大型戸建て・長屋等）", value: "medium" },
        { label: "大規模（300平米以上のビル一棟丸ごと等）", value: "large" }
      ]
    },
    { id: "applicationType", title: "取得予定の許可の種類（基準が変わるため）", type: "radio", group: "details", required: true,
      options: [
        { label: "民泊新法（住宅宿泊事業法）", value: "minpaku" },
        { label: "旅館業法（簡易宿所・特区民泊等）", value: "ryokan" }
      ]
    },

    // --- 【状況と日程】 ---
    { id: "fireConsultationStatus", title: "管轄の消防署への事前相談の有無", type: "radio", group: "details", required: true,
      options: [
        { label: "すでに消防署へ相談に行き、必要な設備の指導を受けた（書類等あり）", value: "consulted" },
        { label: "まだ行っていない（消防署への相談同行・事前確認からお願いしたい）", value: "not_yet" }
      ]
    },
    { id: "fireWorkTiming", title: "施工・適合通知書取得の希望時期", type: "select", group: "numerical", required: true,
      options: [
        { label: "急ぎ（1ヶ月以内に保健所等へ本申請を行いたい）", value: "urgent" },
        { label: "通常（1〜2ヶ月以内程度で余裕あり）", value: "normal" },
        { label: "まだ未定・見積もりを見てから考えたい", value: "future" }
      ]
    },
    { id: "fireDrawings", title: "寸法の入った正確な建築図面（必須）", type: "file", group: "files", required: true }
  ],

  "コンサルティング": [
    // --- 【現状と課題】 ---
    { id: "consultingPhase", title: "現在のあなたのフェーズ（状況）", type: "radio", group: "details", required: true,
      options: [
        { label: "これから物件を探す・民泊の始め方を基本から知りたい（ゼロイチ段階）", value: "planning" },
        { label: "物件は確保したが、セットアップや許認可、インテリアで悩んでいる", value: "setup" },
        { label: "既に運用中だが、予約率や単価が低いため売上を改善したい（テコ入れ）", value: "improving" },
        { label: "複数物件への横展開や、業務の自動化・組織化について相談したい", value: "scaling" }
      ]
    },
    { id: "consultingTopic", title: "最も重点的に相談したいテーマ（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "物件選定・エリアマーケティング・収益シミュレーション", value: "property" },
        { label: "写真映えするインテリアデザイン・コンセプト設計", value: "design" },
        { label: "利益を最大化する価格戦略・ダイナミックプライシング", value: "pricing" },
        { label: "ゲスト対応の品質向上と高レビュー獲得ノウハウ", value: "review" },
        { label: "トラブル予防・清掃手配などの自動化システムの構築（PMS等の導入）", value: "automation" }
      ]
    },
    { id: "experienceLevel", title: "民泊や不動産投資の過去の経験", type: "radio", group: "details", required: true,
      options: [
        { label: "全くの未経験（初心者向けのサポート希望）", value: "novice" },
        { label: "不動産投資の経験はあるが民泊は初めて", value: "real_estate" },
        { label: "すでに民泊運営の経験がある（中〜上級者向けのアドバイス希望）", value: "experienced" }
      ]
    },

    // --- 【目標と面談形式】 ---
    { id: "targetRevenue", title: "目標とする月間収益・利回り、または具体的な相談のゴール", type: "text", group: "numerical", required: true, placeholder: "例：自己資金300万で月20万のキャッシュフロー等、手取りで〇〇万円いきたい" },
    { id: "consultingFormat", title: "希望するコンサルティングの形式と期間", type: "select", group: "scope", required: true,
      options: [
        { label: "単発のスポット面談（1〜2時間程度でのアドバイス）", value: "spot" },
        { label: "開業までの伴走型サポート（1ヶ月〜数ヶ月の継続支援）", value: "launch_support" },
        { label: "運用代行も兼ねた継続的なプロデュース顧問契約", value: "advisor" }
      ]
    },
    { id: "meetingTypeConsult", title: "面談形式の希望", type: "radio", group: "preferences", required: true,
      options: [
        { label: "オンライン面談（Zoom等）", value: "online" },
        { label: "対面での面談や物件同行（必要に応じて交通費等発生）", value: "offline" }
      ]
    },
    { id: "specificWorry", title: "具体的に解決したい悩み・事前情報", type: "textarea", group: "details", placeholder: "できるだけ詳しく今の状況や悩みをご記入いただくと、より有益なアドバイスが可能です。", required: true }
  ],

  // --- 【Phase 6 追加カテゴリ群】 ---
  "収益シミュレーションの作成": [
    { id: "operationType", title: "想定する運営形態", type: "radio", group: "rules", required: true,
      options: [
        { label: "家主不在型（完全貸切）", value: "unhosted" },
        { label: "家主居住型", value: "hosted" },
        { label: "ハイブリッド", value: "hybrid" }
      ]
    },
    { id: "targetAudience", title: "ターゲット層", type: "radio", group: "details", required: true,
      options: [
        { label: "インバウンド家族", value: "inbound_family" },
        { label: "国内カップル", value: "domestic_couple" },
        { label: "大人数グループ", value: "large_group" }
      ]
    },
    { id: "initialBudget", title: "物件の初期費用予算（万円）", type: "number", group: "numerical", required: true, unitLabel: "万円" },
    { id: "providedInfoFiles", title: "提供可能な情報（物件URL・図面・周辺の競合物件情報など）", type: "file", group: "files" }
  ],

  "フルコーディネート提案・買付代行": [
    { id: "taste", title: "希望テイスト", type: "select", group: "preferences", required: true, 
      options: [
        { label: "和モダン", value: "japanese_modern" },
        { label: "北欧・IKEA風", value: "nordic" },
        { label: "インダストリアル", value: "industrial" },
        { label: "ホテルライク", value: "hotel_like" },
        { label: "おまかせ", value: "omakase" }
      ]
    },
    { id: "budget", title: "予算感（家具家電総額の目安）", type: "number", group: "numerical", required: true, unitLabel: "万円" },
    { id: "roomSize", title: "部屋の広さ・間取り", type: "text", group: "details", required: true, placeholder: "例: 1LDK 40平米" }
  ],

  "家具の組み立て・設置のみ": [
    { id: "taste", title: "希望テイスト", type: "select", group: "preferences", required: true, 
      options: [
        { label: "和モダン", value: "japanese_modern" },
        { label: "北欧・IKEA風", value: "nordic" },
        { label: "インダストリアル", value: "industrial" },
        { label: "ホテルライク", value: "hotel_like" },
        { label: "おまかせ", value: "omakase" }
      ]
    },
    { id: "budget", title: "予算感（家具家電総額の目安）", type: "number", group: "numerical", required: true, unitLabel: "万円" },
    { id: "roomSize", title: "部屋の広さ・間取り", type: "text", group: "details", required: true, placeholder: "例: 1LDK 40平米" },
    { id: "assemblyItems", title: "組み立て作業の場合のアイテム数", type: "text", group: "numerical", placeholder: "例: 大型家具3点（ベッド、ソファ、ダイニング）" }
  ],

  "スマートロック取付・API連携": [
    { id: "installLocation", title: "導入希望の箇所", type: "checkbox", group: "details", required: true,
      options: [
        { label: "玄関ドア", value: "front_door" },
        { label: "エントランス共用部", value: "entrance" },
        { label: "室内", value: "indoor" }
      ]
    },
    { id: "doorKeyPhotos", title: "ドア・鍵の形状（サムターン画像の添付必須）", type: "file", group: "files", required: true },
    { id: "pmsName", title: "連携させたいPMS（サイトコントローラー）の名称", type: "text", group: "details", placeholder: "例: Beds24, ねっぱん！ 等" },
    { id: "powerSupply", title: "電源の確保状況", type: "radio", group: "details", required: true,
      options: [
        { label: "近くにコンセントあり", value: "outlet_near" },
        { label: "電池式希望", value: "battery_preferred" },
        { label: "配線工事から希望", value: "wiring_needed" }
      ]
    }
  ],

  "騒音センサー設定": [
    { id: "installLocation", title: "導入希望の箇所", type: "checkbox", group: "details", required: true,
      options: [
        { label: "玄関ドア", value: "front_door" },
        { label: "エントランス共用部", value: "entrance" },
        { label: "室内", value: "indoor" }
      ]
    },
    { id: "pmsName", title: "連携させたいPMS（サイトコントローラー）の名称", type: "text", group: "details", placeholder: "例: Beds24, ねっぱん！ 等" },
    { id: "powerSupply", title: "電源の確保状況", type: "radio", group: "details", required: true,
      options: [
        { label: "近くにコンセントあり", value: "outlet_near" },
        { label: "電池式希望", value: "battery_preferred" },
        { label: "配線工事から希望", value: "wiring_needed" }
      ]
    }
  ],

  "防犯カメラ設置": [
    { id: "installLocation", title: "導入希望の箇所", type: "checkbox", group: "details", required: true,
      options: [
        { label: "玄関ドア", value: "front_door" },
        { label: "エントランス共用部", value: "entrance" },
        { label: "室内", value: "indoor" }
      ]
    },
    { id: "powerSupply", title: "電源の確保状況", type: "radio", group: "details", required: true,
      options: [
        { label: "近くにコンセントあり", value: "outlet_near" },
        { label: "電池式希望", value: "battery_preferred" },
        { label: "配線工事から希望", value: "wiring_needed" }
      ]
    }
  ],

  "新規ページ作成代行": [
    { id: "otaPlatforms", title: "掲載予定・掲載中のOTA（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "Airbnb", value: "airbnb" },
        { label: "Booking.com", value: "booking" },
        { label: "Agoda", value: "agoda" },
        { label: "楽天トラベル", value: "rakuten" },
        { label: "その他", value: "other" }
      ]
    },
    { id: "targetLangs", title: "翻訳希望言語（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "英語", value: "en" },
        { label: "中国語（簡体）", value: "zh_cn" },
        { label: "中国語（繁体）", value: "zh_tw" },
        { label: "韓国語", value: "ko" }
      ]
    },
    { id: "appealPoints", title: "アピールしたい物件の強み", type: "textarea", group: "details", required: true,
      placeholder: "例：駅近、サウナ付き、大画面プロジェクター等" }
  ],

  "既存ページのSEO・写真並び替え": [
    { id: "otaPlatforms", title: "掲載予定・掲載中のOTA（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "Airbnb", value: "airbnb" },
        { label: "Booking.com", value: "booking" },
        { label: "Agoda", value: "agoda" },
        { label: "楽天トラベル", value: "rakuten" },
        { label: "その他", value: "other" }
      ]
    },
    { id: "targetLangs", title: "翻訳希望言語（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "英語", value: "en" },
        { label: "中国語（簡体）", value: "zh_cn" },
        { label: "中国語（繁体）", value: "zh_tw" },
        { label: "韓国語", value: "ko" }
      ]
    },
    { id: "appealPoints", title: "アピールしたい物件の強み", type: "textarea", group: "details", required: true,
      placeholder: "例：駅近、サウナ付き、大画面プロジェクター等" }
  ],

  "多言語翻訳": [
    { id: "otaPlatforms", title: "掲載予定・掲載中のOTA（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "Airbnb", value: "airbnb" },
        { label: "Booking.com", value: "booking" },
        { label: "Agoda", value: "agoda" },
        { label: "楽天トラベル", value: "rakuten" },
        { label: "その他", value: "other" }
      ]
    },
    { id: "targetLangs", title: "翻訳希望言語（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "英語", value: "en" },
        { label: "中国語（簡体）", value: "zh_cn" },
        { label: "中国語（繁体）", value: "zh_tw" },
        { label: "韓国語", value: "ko" }
      ]
    },
    { id: "appealPoints", title: "アピールしたい物件の強み", type: "textarea", group: "details", required: true,
      placeholder: "例：駅近、サウナ付き、大画面プロジェクター等" }
  ],

  "定期回収の契約手配": [
    { id: "frequency", title: "回収希望頻度", type: "radio", group: "numerical", required: true,
      options: [
        { label: "週1回", value: "weekly_1" },
        { label: "週2回", value: "weekly_2" },
        { label: "都度回収", value: "on_demand" }
      ]
    },
    { id: "stationAvailability", title: "ゴミステーション・一時保管場所の有無", type: "radio", group: "details", required: true,
      options: [
        { label: "敷地内あり", value: "on_site" },
        { label: "室内保管", value: "indoor" }
      ]
    },
    { id: "sortingStatus", title: "分別の状況", type: "radio", group: "details", required: true,
      options: [
        { label: "ゲスト任せ", value: "by_guest" },
        { label: "清掃業者が分別済み", value: "sorted_by_cleaner" }
      ]
    }
  ],

  "スポット粗大ゴミ回収": [
    { id: "stationAvailability", title: "ゴミステーション・一時保管場所の有無", type: "radio", group: "details", required: true,
      options: [
        { label: "敷地内あり", value: "on_site" },
        { label: "室内保管", value: "indoor" }
      ]
    },
    { id: "sortingStatus", title: "分別の状況", type: "radio", group: "details", required: true,
      options: [
        { label: "ゲスト任せ", value: "by_guest" },
        { label: "清掃業者が分別済み", value: "sorted_by_cleaner" }
      ]
    }
  ],

  // ----- 【Phase 8 追加: 助成金・補助金申請支援】 -----
  "各種助成金・補助金等の申請サポート": [
    { id: "currentOperationPhase", title: "現在の運営フェーズ", type: "radio", group: "details", required: true,
      options: [
        { label: "これから民泊を始める（開業前・物件取得前）", value: "pre_opening" },
        { label: "現在運営中（リニューアル・設備投資検討）", value: "operating" },
        { label: "現在運営中で、さらに別物件の新規立ち上げを検討中", value: "both" }
      ]
    },
    { id: "consultationContent", title: "検討中の内容・目的（複数選択可）", type: "checkbox", group: "details", required: true,
      options: [
        { label: "施設のバリアフリー化・改修工事（スロープ設置、手すり等）", value: "barrier_free" },
        { label: "ITツール（スマートロック・自動チェックイン機・PMS等）の導入", value: "it_tools" },
        { label: "省エネ設備（高効率エアコン・LED照明等）の導入", value: "energy_saving" },
        { label: "多言語対応（翻訳・多言語ウェブサイト制作等）", value: "multilingual" },
        { label: "その他・まずは相談して対象になるか知りたい", value: "other" }
      ]
    },
    { id: "consultationDetails", title: "具体的な検討内容の詳細", type: "textarea", group: "details", required: false,
      placeholder: "例：車椅子対応のリフォームを考えている、業務効率化のためにシステムを入れたい等、決まっている範囲でご記入ください"
    },
    { id: "estimatedBudget", title: "想定している全体の事業予算（自己資金＋補助金などの総額）", type: "select", group: "numerical", required: true,
      options: [
        { label: "100万円未満", value: "under_1m" },
        { label: "100万円〜300万円", value: "1m_to_3m" },
        { label: "300万円〜500万円", value: "3m_to_5m" },
        { label: "500万円〜1000万円", value: "5m_to_10m" },
        { label: "1000万円以上", value: "over_10m" },
        { label: "未定（要件に応じた事業計画から相談して決めたい）", value: "undecided" }
      ]
    }
  ]
};

// If a category isn't defined explicitly, we use a fallback generic formulation
export const genericQuestionnaire: QuestionnaireStep[] = [
  {
    id: "genericDetail",
    title: "ご依頼の詳細",
    description: "ご希望の作業内容や現状の課題をできるだけ詳しくご記入ください。",
    type: "textarea",
    required: true,
    placeholder: "例：来月から民泊を開業予定ですが、○○についてお願いしたいです..."
  },
  {
    id: "budget",
    title: "想定しているご予算",
    type: "select",
    options: [
      { label: "なるべく安く抑えたい", value: "cheap" },
      { label: "相場感に合わせて相談したい", value: "standard" },
      { label: "品質重視（予算に余裕あり）", value: "premium" }
    ]
  }
];

export const getQuestionnaireForCategory = (category: string): QuestionnaireStep[] => {
  return serviceQuestionnaires[category] || genericQuestionnaire;
};
