// @ts-nocheck
import { CrisisDrillModule } from './CrisisDrillModule';
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Video,
  ShoppingBag,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Sparkles,
  Play,
  Pause,
  Settings,
  FileText,
  Search,
  RefreshCw,
  Sliders,
  MessageSquare,
  Eye,
  Heart,
  ShoppingCart,
  X,
  Lock,
  Edit3,
  Activity,
  Volume2,
  Zap,
  Mic,
  ArrowRight,
  AlertOctagon,
  Check,
  Tag
} from 'lucide-react';

// ==========================================
// 1. TRADITIONAL CHINESE & ENGLISH DICTIONARY
// ==========================================
const translations = {
  zh: {
    nav: {
      brand: "智人領航 AI數字人直播平台",
      tagline: "合規·高效·全天候",
      home: "首頁概覽",
      catalog: "商品商城",
      presenters: "數字人角色庫",
      liveroom: "直播間預覽",
      adminCompliance: "敏感詞與不雅用語檢測",
      adminConfig: "直播推流配置",
      adminLogs: "合規審計日誌",
      lang: "English",
      cart: "購物車",
      startLive: "開啟數字人直播",
      crisisDrill: "危機預演"
    },
    hero: {
      badge: "保健品·美妝·特色小店合規專用 AI 真實數字人直播引擎",
      title1: "全天候 24/7 智能直播",
      title2: "合規無憂 驅動電商高倍轉化",
      desc: "專為保健營養品、美妝護膚及在地特色小店打造。結合超逼真數字人人設、即時語氣控場與嚴格的保健/美妝廣告法及社群公約敏感詞、不雅用語即時監測改寫，協助品牌與商家零違規風險開播。",
      ctaPrimary: "進入合規檢測台",
      ctaSecondary: "體驗數字人直播間",
      stat1: "違規率降低",
      stat1Val: "99.4%",
      stat2: "直播人效提升",
      stat2Val: "10x",
      stat3: "全天候運營覆蓋",
      stat3Val: "24/7",
      stat4: "累計安全開播",
      stat4Val: "150,000+ 小時"
    },
    presenters: {
      title: "真實數字人角色庫",
      subtitle: "涵蓋資深營養保健顧問、美妝護膚達人與特色小店選品主理人，精準匹配多元商品",
      select: "選擇此角色開播",
      selected: "當前直播選中角色",
      previewVoice: "試聽音色",
      style: "風格路線",
      voiceTone: "音色特徵",
      language: "支持語言",
      suitability: "推薦帶貨品類",
      activeRate: "動作擬真度",
      complianceScore: "歷史合規率"
    },
    catalog: {
      title: "商品與特色商家商城 (Product Catalog)",
      subtitle: "管理保健品、美妝及特色小店商品，一鍵推送至數字人話術與直播畫中畫展示",
      searchPlaceholder: "搜尋商品名稱、品牌小店或 SKU...",
      filterAll: "全部商品",
      filterSupplements: "保健營養品",
      filterCosmetics: "美妝護膚品",
      filterRetailers: "特色小店/職人手作",
      price: "售價",
      originalPrice: "原價",
      stock: "庫存",
      margin: "預計傭金/利潤率",
      statusLive: "直播推流中",
      actionPush: "推送至直播間",
      actionDetail: "查看詳情"
    },
    liveRoom: {
      badgeCompliant: "合規與不雅用語監測：即時運行中",
      statusLive: "直播中 (LIVE)",
      onlineViewers: "在線觀看",
      pinnedProduct: "講解中商品",
      buyNow: "立即搶購",
      addToCart: "加入購物車",
      liveChatTitle: "直播間彈幕互動",
      sendChat: "發送",
      placeholderChat: "與數字人主播互動發彈幕...",
      speechBubble: "即時解說腳本 (讀稿機)",
      likeCount: "點贊數"
    },
    compliance: {
      title: "保健·美妝·小店雙語敏感詞與不雅用語檢測引擎",
      subtitle: "即時分析中/英文直播腳本，精準識別保健品違規療效、美妝誇大誇張宣稱、小店未經證實標籤及不雅粗話，並提供AI合規改寫方案。",
      noticeGuardrailTitle: "平台合規守則",
      noticeGuardrailDesc: "本系統嚴禁並絕不提供任何規避、繞過直播平台審核機制的功能。所有改寫旨在輔助營運人員符合法規與社群規範，降低違規封禁風險。",
      inputLabel: "直播口播腳本 / 預演話術 (支持中/英文)",
      btnTest: "即時合規與不雅用語檢測",
      presetSamples: "載入快速測試樣本：",
      riskFound: "檢測到違規風險與不雅用語",
      noRisk: "話術合規性良好，未發現不雅用語或違規詞！",
      humanConfirmBtn: "人工確認並應用合規腳本",
      humanConfirmedStatus: "已人工確認審核並同步至直播端",
      originalText: "原文風險標註",
      suggestedRewrite: "AI 合規改寫建議",
      reason: "違規原因與社群規範分析",
      severityTitle: "危害等級",
      categoryTitle: "違規類型"
    },
    admin: {
      configTitle: "直播中控台配置",
      configSubtitle: "編排數字人角色、商品講解順序與合規話術隊列",
      selectPresenter: "綁定數字人主播",
      selectProduct: "綁定主推商品",
      speechRate: "語速調節",
      pitch: "音調起伏",
      emotion: "情緒擬真度",
      logsTitle: "合規審計與操作日誌",
      logsSubtitle: "全程可追溯的數字人開播、不雅用語攔截、保健美妝違規改寫及人工確認合規記錄",
      logTime: "操作時間",
      logUser: "操作員",
      logAction: "操作類型",
      logDetail: "詳細記錄",
      logStatus: "狀態"
    }
  },
  en: {
    nav: {
      brand: "ZhiRen AI Live Commerce Platform",
      tagline: "Compliant · Efficient · 24/7",
      home: "Overview",
      catalog: "Product Catalog",
      presenters: "Digital Humans",
      liveroom: "Live Room",
      adminCompliance: "Profanity & Sensitive Word Filter",
      adminConfig: "Stream Control",
      adminLogs: "Audit Logs",
      lang: "繁體中文",
      cart: "Cart",
      startLive: "Start AI Live Stream",
      crisisDrill: "Crisis Drill"
    },
    hero: {
      badge: "AI Digital Human Live Engine for Supplements, Cosmetics & Local Artisans",
      title1: "24/7 Autonomous AI Live Streaming",
      title2: "Zero Violation Risk, High ROI Sales",
      desc: "Tailored for Health Supplements, Skincare Brands, and Local Artisans. Powered by hyper-realistic avatars, dynamic tone controls, and compliance guardrails against health law violations and profanity.",
      ctaPrimary: "Open Compliance Console",
      ctaSecondary: "Enter Live Room Preview",
      stat1: "Violation Rate Drop",
      stat1Val: "99.4%",
      stat2: "Efficiency Boost",
      stat2Val: "10x",
      stat3: "Operation Coverage",
      stat3Val: "24/7",
      stat4: "Safe Streaming Hours",
      stat4Val: "150,000+"
    },
    presenters: {
      title: "Digital Human Presenters",
      subtitle: "Featuring Wellness Consultants, Beauty Specialists, and Artisan Storytellers.",
      select: "Select for Streaming",
      selected: "Currently Active Avatar",
      previewVoice: "Preview Voice",
      style: "Persona Style",
      voiceTone: "Tone Profile",
      language: "Languages",
      suitability: "Best Category Fit",
      activeRate: "Motion Realism",
      complianceScore: "Compliance Score"
    },
    catalog: {
      title: "Supplements, Cosmetics & Small Retailer Catalog",
      subtitle: "Manage inventory, highlight local artisan brands, and push items to live stream teleprompter.",
      searchPlaceholder: "Search product, brand shop, or SKU...",
      filterAll: "All Items",
      filterSupplements: "Supplements",
      filterCosmetics: "Cosmetics & Skincare",
      filterRetailers: "Local Artisans & Shops",
      price: "Price",
      originalPrice: "MSRP",
      stock: "Stock",
      margin: "Est. Profit Margin",
      statusLive: "Live Streamed",
      actionPush: "Push to Live",
      actionDetail: "Details"
    },
    liveRoom: {
      badgeCompliant: "Moderation & Compliance Guardrail: Active",
      statusLive: "LIVE",
      onlineViewers: "Viewers",
      pinnedProduct: "Featured Item",
      buyNow: "Buy Now",
      addToCart: "Add to Cart",
      liveChatTitle: "Live Chat Feed",
      sendChat: "Send",
      placeholderChat: "Chat with AI digital avatar...",
      speechBubble: "Live Script Teleprompter",
      likeCount: "Likes"
    },
    compliance: {
      title: "Bilingual Health, Cosmetic & Artisan Policy Engine",
      subtitle: "Real-time moderation for Chinese & English script text. Detects profanity, illegal health disease claims, cosmetic miracle exaggerations, and unverified organic labels.",
      noticeGuardrailTitle: "Platform Compliance Policy",
      noticeGuardrailDesc: "This system strictly refrains from bypassing platform moderation algorithms. All automated rewrites aid operators in abiding by legal statutes and community standards.",
      inputLabel: "Live Stream Script Text (Supports Traditional Chinese & English)",
      btnTest: "Analyze Compliance & Profanity",
      presetSamples: "Load Quick Test Samples:",
      riskFound: "Violations & Profanity Detected",
      noRisk: "Script is clean and fully compliant!",
      humanConfirmBtn: "Human Confirm & Apply Script",
      humanConfirmedStatus: "Human Verified & Pushed to Live Stream Engine",
      originalText: "Flagged Script Text",
      suggestedRewrite: "AI Compliant Rewrite Suggestion",
      reason: "Policy & Guideline Analysis",
      severityTitle: "Severity",
      categoryTitle: "Category"
    },
    admin: {
      configTitle: "Live Studio Config Panel",
      configSubtitle: "Synthesize avatar voice dynamics, item rotation, and teleprompter sequence.",
      selectPresenter: "Bind Digital Avatar",
      selectProduct: "Bind Featured Product",
      speechRate: "Speech Speed",
      pitch: "Voice Pitch",
      emotion: "Emotion Expressiveness",
      logsTitle: "Audit Logs & Compliance Trail",
      logsSubtitle: "Traceable records of avatar switches, profanity blocks, risk rewrites, and human operator confirmations.",
      logTime: "Timestamp",
      logUser: "Operator",
      logAction: "Action",
      logDetail: "Audit Detail",
      logStatus: "Status"
    }
  }
};

// ==========================================
// 2. DATA MODELS (UPDATED FOR 3 VERTICALS)
// ==========================================
const initialPresenters = [
  {
    id: 'avatar-1',
    nameZh: '葉沛涵 (Sophia)',
    nameEn: 'Sophia Ye',
    roleZh: '資深營養保健顧問',
    roleEn: 'Certified Wellness & Nutrition Specialist',
    avatarBg: 'from-emerald-600 to-teal-800',
    avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    styleZh: '專業嚴謹 / 機理剖析 / 溫和科普',
    styleEn: 'Professional & Science-Backed',
    voiceToneZh: '知性沉穩 (專業 30歲女性音)',
    voiceToneEn: 'Articulate & Reassuring (30yo Female)',
    languages: ['中文 (普通話)', 'English', '粵語'],
    suitabilityZh: '高純度魚油、益生菌、膠原蛋白飲、維他命系列',
    suitabilityEn: 'Omega-3 Fish Oil, Probiotics, Collagen Drinks, Vitamins',
    realism: '99.4%',
    complianceScore: '100%',
    sampleSpeechZh: '大家晚上好，今天為大家解說這款深海魚油。其 Omega-3 濃度達 85% 以上，能作為日常膳食營養的補充，維護每日健康活力。',
    sampleSpeechEn: 'Good evening! Today I am introducing our premium Deep Sea Fish Oil with over 85% Omega-3 concentration to support your daily dietary wellness.'
  },
  {
    id: 'avatar-2',
    nameZh: '林曉雅 (Grace)',
    nameEn: 'Grace Lin',
    roleZh: '潮流美妝護膚達人',
    roleEn: 'Skincare & Cosmetics Creator',
    avatarBg: 'from-pink-500 to-rose-600',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    styleZh: '親和歡快 / 成分黨評測 / 沉浸式試妝',
    styleEn: 'Vibrant & Ingredient-Focused',
    voiceToneZh: '清脆甜美 (活力 26歲女性音)',
    voiceToneEn: 'Clear & Sweet (26yo Female Host)',
    languages: ['中文', 'English'],
    suitabilityZh: '玻尿酸精華液、菸鹼醯胺面霜、霧面唇釉、抗老修護',
    suitabilityEn: 'Hyaluronic Serums, Niacinamide Creams, Velvet Lip Tints',
    realism: '99.2%',
    complianceScore: '99.8%',
    sampleSpeechZh: '寶貝們看這個質地！這款玻尿酸修護精華水潤感滿分，搭配植萃成分，塗抹後肌膚透亮飽水，今天直播間優惠別錯過！',
    sampleSpeechEn: 'Look at this velvety texture! This hyaluronic serum deeply hydrates your skin barrier with gentle botanical extracts.'
  },
  {
    id: 'avatar-3',
    nameZh: '陸子豪 (Arthur)',
    nameEn: 'Arthur Lu',
    roleZh: '特色小店選品主理人',
    roleEn: 'Indie Shop & Local Artisan Storyteller',
    avatarBg: 'from-amber-600 to-orange-800',
    avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    styleZh: '人文溫暖 / 故事敘事 / 職人手作鑑賞',
    styleEn: 'Warm & Warmhearted Storyteller',
    voiceToneZh: '磁性溫暖 (人文 31歲男聲)',
    voiceToneEn: 'Warm Magnetic (31yo Male Host)',
    languages: ['中文', 'English', '日本語'],
    suitabilityZh: '手作香氛蠟燭、小農冷壓蜂蜜、粗陶手沖咖啡濾杯',
    suitabilityEn: 'Hand-Poured Soy Candles, Artisanal Osmanthus Honey, Ceramic Drippers',
    realism: '99.1%',
    complianceScore: '99.7%',
    sampleSpeechZh: '點燃這款雪松佛手柑香氛蠟燭，感受南投小農手作的溫暖。天然大豆蠟伴隨輕柔木質調，讓居家時刻更加治癒。',
    sampleSpeechEn: 'Light up this hand-poured cedarwood soy candle crafted by local artisans. Enjoy a cozy, healing atmosphere at home.'
  }
];

const initialProducts = [
  // Vertical 1: Health Supplements (保健營養品)
  {
    id: 'prod-supp-1',
    nameZh: '深海高純度 Omega-3 魚油軟膠囊 90粒',
    nameEn: 'Deep Sea High-Purity Omega-3 Fish Oil Capsules 90s',
    category: 'supplements',
    categoryZh: '保健營養品',
    categoryEn: 'Health Supplements',
    vendorZh: '養生專研所',
    vendorEn: 'Certified Wellness Lab',
    price: 320,
    originalPrice: 480,
    stock: 1450,
    margin: '45%',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '85% rTG 型高吸收率，豐富 rTG-EPA/DHA 比例，支持日常精神煥發與營養補給。',
    descriptionEn: '85% high-absorption rTG form EPA/DHA to support daily vitality and essential nutrient intake.',
    isLivePinned: true
  },
  {
    id: 'prod-supp-2',
    nameZh: '植物萃取益生菌與綜合酵素粉 30包',
    nameEn: 'Plant-Based Probiotics & Enzyme Complex Powder 30s',
    category: 'supplements',
    categoryZh: '保健營養品',
    categoryEn: 'Health Supplements',
    vendorZh: '養生專研所',
    vendorEn: 'Certified Wellness Lab',
    price: 260,
    originalPrice: 390,
    stock: 980,
    margin: '40%',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '專利 15 支包埋菌株與 66 種蔬果酵素，維持消化道機能與順暢體驗。',
    descriptionEn: '15 patented microencapsulated probiotic strains with 66 fruit & veg digestive enzymes.',
    isLivePinned: false
  },
  {
    id: 'prod-supp-3',
    nameZh: '海洋膠原蛋白胜肽飲 50ml*10支',
    nameEn: 'Marine Collagen Peptides Drink 50ml*10',
    category: 'supplements',
    categoryZh: '保健營養品',
    categoryEn: 'Health Supplements',
    vendorZh: '養生專研所',
    vendorEn: 'Certified Wellness Lab',
    price: 380,
    originalPrice: 560,
    stock: 620,
    margin: '48%',
    image: 'https://images.unsplash.com/photo-1550572017-edf70612072c?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '2000 道爾頓小分子魚膠原蛋白，搭配維生素 C 與西印度櫻桃萃取。',
    descriptionEn: '2000 Da low-molecular fish collagen peptides combined with Vitamin C and acerola cherry.',
    isLivePinned: false
  },

  // Vertical 2: Cosmetics (美妝護膚品)
  {
    id: 'prod-cosm-1',
    nameZh: '玻尿酸深層保濕修護精華液 50ml',
    nameEn: 'Hyaluronic Acid Hydrating Barrier Serum 50ml',
    category: 'cosmetics',
    categoryZh: '美妝護膚品',
    categoryEn: 'Cosmetic Products',
    vendorZh: '植萃美研社',
    vendorEn: 'Botanical Beauty Studio',
    price: 240,
    originalPrice: 360,
    stock: 1800,
    margin: '52%',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '5 重分子量玻尿酸搭配積雪草萃取，密集補水鎖水，舒緩乾燥不適。',
    descriptionEn: '5-D hyaluronic acid coupled with Centella Asiatica for intensive moisture locking.',
    isLivePinned: false
  },
  {
    id: 'prod-cosm-2',
    nameZh: '植萃菸鹼醯胺透亮面霜 50g',
    nameEn: 'Botanical Niacinamide Brightening Cream 50g',
    category: 'cosmetics',
    categoryZh: '美妝護膚品',
    categoryEn: 'Cosmetic Products',
    vendorZh: '植萃美研社',
    vendorEn: 'Botanical Beauty Studio',
    price: 210,
    originalPrice: 320,
    stock: 890,
    margin: '46%',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '高純度 5% 菸鹼醯胺與傳明酸，均勻膚色，賦予肌膚自然光澤。',
    descriptionEn: 'Formulated with 5% Niacinamide and Tranexamic Acid to even skin tone naturally.',
    isLivePinned: false
  },
  {
    id: 'prod-cosm-3',
    nameZh: '絲絨霧面保濕唇釉 (柔焦蜜桃色)',
    nameEn: 'Silk Velvet Matte Lip Tint (Soft Peach)',
    category: 'cosmetics',
    categoryZh: '美妝護膚品',
    categoryEn: 'Cosmetic Products',
    vendorZh: '植萃美研社',
    vendorEn: 'Botanical Beauty Studio',
    price: 130,
    originalPrice: 190,
    stock: 2300,
    margin: '55%',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '空氣感質地不顯唇紋，加入霍霍巴籽油，持久顯色不卡粉。',
    descriptionEn: 'Featherlight velvet formula infused with Jojoba seed oil for hydrated matte wear.',
    isLivePinned: false
  },

  // Vertical 3: Small Retailers / Local Artisans (特色小店/職人手作)
  {
    id: 'prod-shop-1',
    nameZh: '手作雪松佛手柑天然大豆香氛蠟燭 200g',
    nameEn: 'Hand-Poured Cedarwood & Bergamot Soy Candle 200g',
    category: 'retailers',
    categoryZh: '特色小店商品',
    categoryEn: 'Small Retailer Goods',
    vendorZh: '職人手作工坊',
    vendorEn: 'Local Artisan Workshop',
    price: 180,
    originalPrice: 270,
    stock: 310,
    margin: '42%',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '南投獨立工作室手工灌注，天然大豆蠟與精油，無毒無鉛棉芯。',
    descriptionEn: 'Small-batch soy wax candle crafted by local independent studio with pure essential oils.',
    isLivePinned: false
  },
  {
    id: 'prod-shop-2',
    nameZh: '小農冷壓桂花釀純蜂蜜 350g',
    nameEn: 'Small-Batch Cold-Pressed Osmanthus Honey 350g',
    category: 'retailers',
    categoryZh: '特色小店商品',
    categoryEn: 'Small Retailer Goods',
    vendorZh: '鄉土選物誌',
    vendorEn: 'Local Specialty Shop',
    price: 150,
    originalPrice: 220,
    stock: 540,
    margin: '38%',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '台灣本地養蜂場純采龍眼蜜浸潤乾燥桂花，香氣濃郁優雅。',
    descriptionEn: 'Raw cold-pressed Longan honey infused with hand-harvested dried osmanthus blossoms.',
    isLivePinned: false
  },
  {
    id: 'prod-shop-3',
    nameZh: '職人手作粗陶手沖咖啡濾杯 (古樸灰)',
    nameEn: 'Artisan Ceramic Pour-Over Coffee Dripper (Rustic Grey)',
    category: 'retailers',
    categoryZh: '特色小店商品',
    categoryEn: 'Small Retailer Goods',
    vendorZh: '職人手作工坊',
    vendorEn: 'Local Artisan Workshop',
    price: 220,
    originalPrice: 330,
    stock: 190,
    margin: '40%',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
    descriptionZh: '陶藝師柴燒拉坯製作，獨特螺紋流道設計，萃取均衡風味。',
    descriptionEn: 'Handcrafted stoneware coffee dripper featuring custom spiral ribs for balanced extraction.',
    isLivePinned: false
  }
];

// Preset BILINGUAL Test Scripts (Tailored for Supplements, Cosmetics & Small Retailers + Profanity)
const sampleScripts = [
  {
    id: 'sample-supplements',
    langTag: '保健品違規',
    titleZh: '樣本 1：保健品宣稱「降血壓/治癒疾病」+ 粗口',
    titleEn: 'Sample 1: Supplement Cure Claims & Profanity',
    text: '這款深海魚油簡直太操蛋神了！能100%根治高血壓跟心臟病，降血壓效果全網第一！不買的白痴傻子去買那些垃圾西藥吧！'
  },
  {
    id: 'sample-cosmetics',
    langTag: '美妝違規',
    titleZh: '樣本 2：美妝誇大「7天徹底祛斑/永久美白」',
    titleEn: 'Sample 2: Cosmetic Permanent Whitening Claims',
    text: '這款精華液是醫學級換膚！7天徹底祛斑，永久美白，效果堪比打肉毒桿菌！其他品牌都是 bullshit scam！'
  },
  {
    id: 'sample-retailers',
    langTag: '特色小店違規',
    titleZh: '樣本 3：小店宣稱「全網最低價/純天然無副作用」',
    titleEn: 'Sample 3: Unverified Lowest Price & Organic Claim',
    text: '我們小農蜂蜜全網最低價！100%純天然絕對無任何副作用，不買真的 fucking stupid，別家都是假貨騙子！'
  },
  {
    id: 'sample-en-health',
    langTag: 'English Violations',
    titleZh: '樣本 4：英文保健/美妝違規 (EN)',
    titleEn: 'Sample 4: English Disease Treat & Botox in Bottle Claims',
    text: 'This omega-3 is a 100% cure for arthritis and high blood pressure! Lowest price on internet! Other brands are fucking garbage scams, buy now!'
  }
];

// Initial Audit Logs (Updated to match Health/Cosmetic/Shop domain)
const initialAuditLogs = [
  {
    id: 'log-101',
    timestamp: '2026-11-22 14:32:05',
    operator: '保健品營運員 (Op-08)',
    actionZh: '人工確認合規與去不雅語腳本',
    actionEn: 'Human Verified Supplement Script',
    detailZh: '攔截粗口「操蛋/白痴」並將保健違規「100%根治高血壓」改寫為「輔助日常健康與營養補給」，已同步至數字人。',
    detailEn: 'Filtered profanity and replaced illegal disease cure claim "100% cure for high blood pressure" with "supports daily dietary wellness".',
    status: 'Pass'
  },
  {
    id: 'log-102',
    timestamp: '2026-11-22 14:15:20',
    operator: '美妝風控引擎',
    actionZh: '觸發美妝極限詞與不雅用語預警',
    actionEn: 'Cosmetic Claim Alert Triggered',
    detailZh: '捕獲美妝腳本中「7天徹底祛斑/永久美白/botox in a bottle」等誇大醫美宣稱，掛起自動渲染。',
    detailEn: 'Captured exaggerated claims "7-day permanent whitening / botox in a bottle", suspended render.',
    status: 'Warning'
  },
  {
    id: 'log-103',
    timestamp: '2026-11-22 13:50:00',
    operator: '小店負責人 (Op-02)',
    actionZh: '切換數字人主播',
    actionEn: 'Presenter Swapped',
    detailZh: '直播間主播切換至 [陸子豪 Arthur] (特色小店選品主理人)，綁定商品：手作雪松大豆香氛蠟燭。',
    detailEn: 'Swapped live avatar to [Arthur Lu] bound to Handmade Soy Candle.',
    status: 'Success'
  }
];

export default function App() {
  // Global State
  const [lang, setLang] = useState('zh');
  const [activeTab, setActiveTab] = useState('home');
  const [presenters, setPresenters] = useState(initialPresenters);
  const [activePresenterId, setActivePresenterId] = useState('avatar-1');
  const [products, setProducts] = useState(initialProducts);
  const [pinnedProductId, setPinnedProductId] = useState('prod-supp-1');
  const [catalogCategory, setCatalogCategory] = useState('all'); // 'all', 'supplements', 'cosmetics', 'retailers'
  const [cartCount, setCartCount] = useState(0);
  const [cartToast, setCartToast] = useState('');

  // Compliance Engine State
  const [scriptInput, setScriptInput] = useState(sampleScripts[0].text);
  const [complianceResult, setComplianceResult] = useState(null);
  const [humanConfirmed, setHumanConfirmed] = useState(false);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);

  // Live Stream Simulation State
  const [isPlayingLive, setIsPlayingLive] = useState(true);
  const [liveLikes, setLiveLikes] = useState(14280);
  const [liveChatList, setLiveChatList] = useState([
    { id: 1, user: '健康生活家', textZh: '這款魚油有通過重金屬檢驗嗎？', textEn: 'Is this fish oil tested for heavy metals?' },
    { id: 2, user: ' BeautyGlow_TW', textZh: '數字人主播說話好流利！質地解說好詳細！', textEn: 'The digital avatar explains ingredient textures so well!' },
    { id: 3, user: '手作控小陳', textZh: '支持在地小農！已下單兩瓶蜂蜜！', textEn: 'Supporting local honey farmers! Ordered 2 jars!' }
  ]);
  const [userChatInput, setUserChatInput] = useState('');
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  const t = translations[lang];
  const activePresenter = presenters.find(p => p.id === activePresenterId) || presenters[0];
  const activeProduct = products.find(p => p.id === pinnedProductId) || products[0];

  // Filter products by category tab
  const filteredProducts = products.filter(p => {
    if (catalogCategory === 'all') return true;
    return p.category === catalogCategory;
  });

  // Automated Chat Simulation
  useEffect(() => {
    let interval;
    if (activeTab === 'liveroom' && isPlayingLive) {
      interval = setInterval(() => {
        const randomUsers = ['養生小達人', 'Sophia_M', '美容愛好者', '小店支持者', 'Alex_Wellness'];
        const randomZhMsg = [
          '請問孕婦可以補充這款益生菌嗎？',
          '這款精華液會黏膩嗎？',
          '手工蠟燭香味很持久！推推！',
          '主播解說好專業且遵守規範！'
        ];
        const randomEnMsg = [
          'Is this supplement certified organic?',
          'Does the serum suit sensitive skin?',
          'Love the artisan candle packaging!'
        ];

        const newUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const newZh = randomZhMsg[Math.floor(Math.random() * randomZhMsg.length)];
        const newEn = randomEnMsg[Math.floor(Math.random() * randomEnMsg.length)];

        setLiveChatList(prev => [
          ...prev.slice(-6),
          { id: Date.now(), user: newUser, textZh: newZh, textEn: newEn }
        ]);
        setLiveLikes(prev => prev + Math.floor(Math.random() * 5 + 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [activeTab, isPlayingLive]);

  // ==========================================
  // COMPREHENSIVE BILINGUAL COMPLIANCE & PROFANITY ENGINE
  // (Tailored for Supplements, Cosmetics & Small Retailers)
  // ==========================================
  const runComplianceCheck = () => {
    const text = scriptInput;
    const detectedRisks = [];

    const complianceRules = [
      // 1. PROFANITY & VULGARITY - CRITICAL
      {
        category: 'Profanity',
        categoryZh: '不雅用語與粗言穢語',
        categoryEn: 'Profanity & Vulgarity',
        severity: 'CRITICAL',
        pattern: /fucking|fuck|shit|bullshit|damn|idiot|scam|crap|bitch|stupid|操蛋|傻子|垃圾|騙子|靠北|幹|操|廢物|白痴|三小|媽的|死人/gi,
        reasonZh: '嚴禁在直播間使用粗言穢語或侮辱性詞彙，違反平台社群公約與主播行為規範。',
        reasonEn: 'Strictly prohibits profane or derogatory language in live streams under platform rules.',
        replaceZh: '',
        replaceEn: ''
      },
      // 2. HEALTH SUPPLEMENT VIOLATIONS (醫療療效/治癒疾病宣稱) - HIGH
      {
        category: 'SupplementClaims',
        categoryZh: '保健品醫療療效宣稱',
        categoryEn: 'Prohibited Supplement Health Claims',
        severity: 'HIGH',
        pattern: /100%根治|根治高血壓|降血壓|治癒心臟病|預防糖尿病|抗癌|100% cure|cure for arthritis|cure high blood pressure|treat disease/gi,
        reasonZh: '食品與保健營養品嚴禁宣稱預防、治療、根治疾病或具備醫療療效。',
        reasonEn: 'Dietary supplements are forbidden from claiming medical cures or disease treatment.',
        replaceZh: '輔助日常健康與營養補給',
        replaceEn: 'supports daily dietary wellness'
      },
      // 3. COSMETIC MIRACLE & BOTICAL CLAIMS (美妝誇大/醫美級宣稱) - HIGH
      {
        category: 'CosmeticClaims',
        categoryZh: '美妝誇大與醫美級宣稱',
        categoryEn: 'Exaggerated Cosmetic Claims',
        severity: 'HIGH',
        pattern: /醫學級換膚|7天徹底祛斑|永久美白|打肉毒桿菌|比肉毒有效|botox in a bottle|permanent whitening|7-day spot removal/gi,
        reasonZh: '化妝品嚴禁宣稱具備醫療/整形手術效果（如永久美白、徹底祛斑、媲美肉毒）。',
        reasonEn: 'Cosmetic products cannot claim medical procedure effects like permanent whitening or medical Botox equivalence.',
        replaceZh: '溫和亮膚與修護肌膚光澤',
        replaceEn: 'gently brightens and revitalizes skin radiance'
      },
      // 4. SMALL RETAILER / AD LAW VIOLATIONS (極限詞與未經證實標籤) - MEDIUM
      {
        category: 'RetailerAdClaims',
        categoryZh: '廣告法極限詞與未證實標籤',
        categoryEn: 'Unverified Ad & Lowest Price Claims',
        severity: 'MEDIUM',
        pattern: /全網最低價|史上最低|絕對無任何副作用|100%純天然零添加|lowest price on internet|100% organic guaranteed/gi,
        reasonZh: '禁止使用未經證實的「全網最低價」或無科學檢驗憑證的「零副作用/100%有機」極限宣稱。',
        reasonEn: 'Prohibits unverified absolute claims like lowest price or guaranteed zero side effects.',
        replaceZh: '小店直播專屬優質好物',
        replaceEn: 'featured live value selection'
      }
    ];

    let rewrittenText = text;

    complianceRules.forEach(rule => {
      const matches = text.match(rule.pattern);
      if (matches) {
        const uniqueMatches = Array.from(new Set(matches));
        uniqueMatches.forEach(word => {
          detectedRisks.push({
            word: word,
            categoryZh: rule.categoryZh,
            categoryEn: rule.categoryEn,
            severity: rule.severity,
            reasonZh: rule.reasonZh,
            reasonEn: rule.reasonEn
          });
        });
      }
    });

    if (detectedRisks.length > 0) {
      rewrittenText = rewrittenText
        // Profanity replacements
        .replace(/fucking\s?/gi, '')
        .replace(/bullshit\s?/gi, 'unverified ')
        .replace(/damn\s?/gi, '')
        .replace(/idiot|bitch|stupid/gi, 'viewer')
        .replace(/scams?/gi, 'other brands')
        .replace(/操蛋|白痴|傻子|廢物/g, '朋友')
        .replace(/垃圾|騙子/g, '一般產品')
        .replace(/媽的|靠北|幹|操|三小/g, '')
        // Health Supplement replacements
        .replace(/100%根治高血壓跟心臟病|100%根治|根治高血壓/g, '調節生理機能與營養補充')
        .replace(/降血壓效果全網第一|降血壓/g, '維護每日健康活力')
        .replace(/100% cure for arthritis and high blood pressure|100% cure|cure for arthritis/gi, 'supports joint and daily dietary wellness')
        .replace(/treat disease/gi, 'support wellness')
        // Cosmetic replacements
        .replace(/醫學級換膚/g, '深層滋養修護')
        .replace(/7天徹底祛斑/g, '細緻撫紋亮膚')
        .replace(/永久美白/g, '展現自然透亮光澤')
        .replace(/效果堪比打肉毒桿菌|打肉毒桿菌/g, '幫助肌膚保持彈力')
        .replace(/botox in a bottle|7-day spot removal|permanent whitening/gi, 'revitalizing skincare formula')
        // Small Retailer replacements
        .replace(/全網最低價|史上最低/g, '直播間優惠限量價')
        .replace(/絕對無任何副作用|100%純天然零添加/g, '溫和植萃配方')
        .replace(/lowest price on internet/gi, 'special live stream price')
        .replace(/100% organic guaranteed/gi, 'carefully selected natural ingredients');

      rewrittenText = rewrittenText.replace(/\s+/g, ' ').trim();

      setComplianceResult({
        hasRisk: true,
        risks: detectedRisks,
        suggestedRewrite: rewrittenText
      });
      setHumanConfirmed(false);
    } else {
      setComplianceResult({
        hasRisk: false,
        risks: [],
        suggestedRewrite: text
      });
      setHumanConfirmed(true);
    }
  };

  const handleHumanConfirm = () => {
    if (!complianceResult) return;
    setHumanConfirmed(true);

    const newLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString('zh-TW'),
      operator: '人工合規專員 (HumanOp-09)',
      actionZh: '人工確認合規與去不雅語腳本',
      actionEn: 'Human Verified Script Rewrite',
      detailZh: `審核並確認改寫腳本：「${complianceResult.suggestedRewrite.slice(0, 32)}...」`,
      detailEn: `Verified and pushed clean script: "${complianceResult.suggestedRewrite.slice(0, 32)}..."`,
      status: 'Pass'
    };

    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleSelectPresenter = (id) => {
    setActivePresenterId(id);
    const pres = presenters.find(p => p.id === id);
    const newLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString('zh-TW'),
      operator: '直播控制台',
      actionZh: '切換數字人主播',
      actionEn: 'Avatar Switch',
      detailZh: `主播已切換至：${pres.nameZh} (${pres.roleZh})`,
      detailEn: `Active avatar changed to: ${pres.nameEn} (${pres.roleEn})`,
      status: 'Success'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handlePinProduct = (prodId) => {
    setPinnedProductId(prodId);
    setProducts(products.map(p => ({
      ...p,
      isLivePinned: p.id === prodId
    })));
    const prod = products.find(p => p.id === prodId);
    const newLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString('zh-TW'),
      operator: '商品營運',
      actionZh: '推流商品更換',
      actionEn: 'Pinned Product Switch',
      detailZh: `主推商品已關聯：${prod.nameZh}`,
      detailEn: `Live stream pinned product set to: ${prod.nameEn}`,
      status: 'Success'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleAddToCart = (productName) => {
    setCartCount(prev => prev + 1);
    setCartToast(lang === 'zh' ? `已將 [${productName}] 加入購物車` : `Added [${productName}] to Cart`);
    setTimeout(() => setCartToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      
      {/* Toast Notification */}
      {cartToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce border border-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="font-medium text-sm">{cartToast}</span>
        </div>
      )}

      {/* TOP GLOBAL HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {t.nav.brand}
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Enterprise AI
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">{t.nav.tagline}</p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'catalog' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {t.nav.catalog}
            </button>
            <button
              onClick={() => setActiveTab('presenters')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'presenters' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              {t.nav.presenters}
            </button>
            <button
              onClick={() => setActiveTab('liveroom')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'liveroom' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <Video className="w-4 h-4" />
              {t.nav.liveroom}
            </button>
            
            <button
            onClick={() => setActiveTab('crisis-drill')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'crisis-drill'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {t.nav.crisisDrill || '危機預演'}
          </button>

            <div className="h-4 w-[1px] bg-slate-800 mx-1" />

            {/* Admin Console Direct Nav */}
            <button
              onClick={() => setActiveTab('admin-compliance')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab.startsWith('admin') ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              {t.nav.adminCompliance}
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold">{t.nav.lang}</span>
            </button>

            {/* Quick Cart */}
            <button 
              onClick={() => setActiveTab('catalog')}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Live CTA */}
            <button
              onClick={() => setActiveTab('liveroom')}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {t.nav.startLive}
            </button>
          </div>
        </div>

        {/* Mobile Subnav */}
        <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-2 bg-slate-950 border-t border-slate-800 text-xs no-scrollbar">
          <button onClick={() => setActiveTab('home')} className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>{t.nav.home}</button>
          <button onClick={() => setActiveTab('catalog')} className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'catalog' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>{t.nav.catalog}</button>
          <button onClick={() => setActiveTab('presenters')} className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'presenters' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>{t.nav.presenters}</button>
          <button onClick={() => setActiveTab('liveroom')} className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'liveroom' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>{t.nav.liveroom}</button>
          <button onClick={() => setActiveTab('crisis-drill')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
    activeTab === 'crisis-drill'
      ? 'bg-amber-600 text-white font-medium'
      : 'text-slate-400 hover:text-white'
  }`}
>
  {t.nav.crisisDrill || '危機預演'}
</button>
          <button onClick={() => setActiveTab('admin-compliance')} className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab.startsWith('admin') ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>{t.nav.adminCompliance}</button>
        </div>
      </header>

      {/* ADMIN SUB-BAR */}
      {activeTab.startsWith('admin') && (
        <div className="bg-slate-900 border-b border-slate-800 py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-sm text-slate-200">
                {lang === 'zh' ? '後台營運與合規風控控制台' : 'Operations & Compliance Admin'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveTab('admin-compliance')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === 'admin-compliance' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-semibold' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {t.nav.adminCompliance}
              </button>
              <button
                onClick={() => setActiveTab('admin-config')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === 'admin-config' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40 font-semibold' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {t.nav.adminConfig}
              </button>
              <button
                onClick={() => setActiveTab('admin-logs')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === 'admin-logs' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40 font-semibold' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {t.nav.adminLogs}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* ========================================= */}
        {/* VIEW 1: HOME OVERVIEW (DEFAULT VIEW) */}
        {/* ========================================= */}
        {activeTab === 'home' && (
          <div className="space-y-12 pb-8">
            {/* HERO SECTION */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 p-6 sm:p-10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span>{t.hero.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {t.hero.title1} <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
                    {t.hero.title2}
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t.hero.desc}
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('liveroom')}
                    className="bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-xl shadow-indigo-600/25 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {t.hero.ctaSecondary}
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-compliance')}
                    className="bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {t.hero.ctaPrimary}
                  </button>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-indigo-400" />
                    {lang === 'zh' ? '瀏覽商品商城' : 'Explore Catalog'}
                  </button>
                </div>

                {/* Hero Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                  <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">{t.hero.stat1}</span>
                    <span className="text-xl font-extrabold text-emerald-400">{t.hero.stat1Val}</span>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">{t.hero.stat2}</span>
                    <span className="text-xl font-extrabold text-indigo-400">{t.hero.stat2Val}</span>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">{t.hero.stat3}</span>
                    <span className="text-xl font-extrabold text-rose-400">{t.hero.stat3Val}</span>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">{t.hero.stat4}</span>
                    <span className="text-xl font-extrabold text-amber-400">{t.hero.stat4Val}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* THREE CORE VERTICALS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Tag className="w-5 h-5 text-indigo-400" />
                    {lang === 'zh' ? '三大核心適用帶貨品類' : 'Three Core Industry Verticals'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {lang === 'zh' ? '針對保健品、美妝護膚及在地特色小店量身打造合規推流' : 'Optimized live streaming and moderation rules for specific sectors'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Supplement Vertical Card */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-all p-6 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                      🌿
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {lang === 'zh' ? '保健營養品 (Health Supplements)' : 'Health Supplements'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {lang === 'zh'
                        ? '自動攔截「根治疾病/降血壓/抗癌」等違規醫療宣稱，改寫為符合法規的膳食營養補充話術。'
                        : 'Automatically filters illegal medical disease treatment claims and replaces them with compliant nutrition messaging.'}
                    </p>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs space-y-1">
                      <span className="text-emerald-400 font-semibold block text-[11px]">
                        {lang === 'zh' ? '代表主播：葉沛涵 Sophia (資深營養顧問)' : 'Featured Avatar: Sophia Ye'}
                      </span>
                      <span className="text-slate-400 text-[10px] block">
                        {lang === 'zh' ? '熱銷：深海 Omega-3 魚油、植物益生菌' : 'Top Items: Omega-3 Fish Oil, Probiotics'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCatalogCategory('supplements');
                      setActiveTab('catalog');
                    }}
                    className="w-full bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white py-2.5 rounded-xl text-xs font-semibold border border-slate-700 hover:border-emerald-500 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'zh' ? '查看保健品目錄' : 'View Supplements'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Cosmetic Vertical Card */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 hover:border-pink-500/50 transition-all p-6 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-2xl">
                      ✨
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                      {lang === 'zh' ? '美妝護膚品 (Cosmetic Products)' : 'Cosmetics & Skincare'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {lang === 'zh'
                        ? '嚴格過濾「7天永久美白/媲美肉毒桿菌」誇大醫美字眼，保留質地描繪與成分科技質感。'
                        : 'Filters exaggerated cosmetic terms like permanent whitening or medical botox equivalency.'}
                    </p>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs space-y-1">
                      <span className="text-pink-400 font-semibold block text-[11px]">
                        {lang === 'zh' ? '代表主播：林曉雅 Grace (美妝護膚達人)' : 'Featured Avatar: Grace Lin'}
                      </span>
                      <span className="text-slate-400 text-[10px] block">
                        {lang === 'zh' ? '熱銷：玻尿酸保濕精華、菸鹼醯胺面霜' : 'Top Items: Hyaluronic Serum, Niacinamide Cream'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCatalogCategory('cosmetics');
                      setActiveTab('catalog');
                    }}
                    className="w-full bg-slate-800 hover:bg-pink-600 text-slate-200 hover:text-white py-2.5 rounded-xl text-xs font-semibold border border-slate-700 hover:border-pink-500 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'zh' ? '查看美妝品目錄' : 'View Cosmetics'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Small Retailers Vertical Card */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-all p-6 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                      🏬
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {lang === 'zh' ? '特色小店/職人手作 (Small Retailers)' : 'Small Retailers & Artisans'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {lang === 'zh'
                        ? '協助在地獨立店主過濾「全網最低價」與不雅粗口，傳遞暖心品牌故事與職人工藝價值。'
                        : 'Helps local artisan shops eliminate profanity and illegal lowest-price claims while highlighting handcraft value.'}
                    </p>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs space-y-1">
                      <span className="text-amber-400 font-semibold block text-[11px]">
                        {lang === 'zh' ? '代表主播：陸子豪 Arthur (選品主理人)' : 'Featured Avatar: Arthur Lu'}
                      </span>
                      <span className="text-slate-400 text-[10px] block">
                        {lang === 'zh' ? '熱銷：手作雪松大豆蠟燭、小農冷壓蜂蜜' : 'Top Items: Handmade Soy Candles, Osmanthus Honey'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCatalogCategory('retailers');
                      setActiveTab('catalog');
                    }}
                    className="w-full bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white py-2.5 rounded-xl text-xs font-semibold border border-slate-700 hover:border-amber-500 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'zh' ? '查看小店商品' : 'View Artisan Goods'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* HUMAN-IN-THE-LOOP WORKFLOW DIAGRAM */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  {lang === 'zh' ? '四步完成合規推流 (Human-in-the-Loop Workflow)' : '4-Step Compliant Live Streaming Workflow'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'zh' ? '人工營運與 AI 雙重審核，確保全天候直播零違規風險' : 'Dual AI moderation and explicit human verification workflow'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2 relative">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 inline-block">Step 1</span>
                  <h4 className="font-bold text-sm text-white">{lang === 'zh' ? '選定數字人與商品' : 'Select Avatar & Item'}</h4>
                  <p className="text-xs text-slate-400">{lang === 'zh' ? '由角色庫匹配最佳營養師、美妝師或小店主理人' : 'Bind suitable Digital Human avatar and pinned product'}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2 relative">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block">Step 2</span>
                  <h4 className="font-bold text-sm text-white">{lang === 'zh' ? '輸入口播腳本' : 'Input Script Text'}</h4>
                  <p className="text-xs text-slate-400">{lang === 'zh' ? '貼入宣傳稿或直播推流文案（支持中/英文）' : 'Paste sales script in Traditional Chinese or English'}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2 relative">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block">Step 3</span>
                  <h4 className="font-bold text-sm text-white">{lang === 'zh' ? 'AI 粗口與風險檢測' : 'AI Moderation Engine'}</h4>
                  <p className="text-xs text-slate-400">{lang === 'zh' ? '秒級識別醫療療效、誇大宣稱與不雅用語' : 'Instant detection of profanity, health cures & ad law claims'}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 space-y-2 relative">
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 inline-block">Step 4</span>
                  <h4 className="font-bold text-sm text-white">{lang === 'zh' ? '人工確認推流' : 'Human Confirmation'}</h4>
                  <p className="text-xs text-slate-400">{lang === 'zh' ? '人工點擊確認後，即時同步至數字人直播提詞器' : 'Operator verifies and pushes clean text to live teleprompter'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW 2: PRODUCT CATALOG (WITH CATEGORY FILTERS & RETAILER TAGS) */}
        {/* ========================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-indigo-400" />
                  {t.catalog.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{t.catalog.subtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={t.catalog.searchPlaceholder}
                    className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-64"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setCatalogCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  catalogCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {t.catalog.filterAll}
              </button>
              <button
                onClick={() => setCatalogCategory('supplements')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  catalogCategory === 'supplements'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                🌿 {t.catalog.filterSupplements}
              </button>
              <button
                onClick={() => setCatalogCategory('cosmetics')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  catalogCategory === 'cosmetics'
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                ✨ {t.catalog.filterCosmetics}
              </button>
              <button
                onClick={() => setCatalogCategory('retailers')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  catalogCategory === 'retailers'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                🏬 {t.catalog.filterRetailers}
              </button>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => {
                const isPinned = prod.id === pinnedProductId;
                return (
                  <div
                    key={prod.id}
                    className={`bg-slate-900 rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                      isPinned ? 'border-rose-500/80 shadow-xl shadow-rose-500/10' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="relative aspect-video bg-slate-950 overflow-hidden">
                        <img
                          src={prod.image}
                          alt={prod.nameZh}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (!img.dataset.fallbackApplied) {
                              img.dataset.fallbackApplied = 'true';
                              img.src = 'https://placehold.co/600x400/1e293b/94a3b8?text=Product+Preview';
                            }
                          }}
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-1.5">
                          <span className="bg-slate-900/90 text-slate-300 text-[10px] px-2 py-1 rounded-md font-semibold border border-slate-700">
                            {lang === 'zh' ? prod.categoryZh : prod.categoryEn}
                          </span>
                          <span className="bg-indigo-950/90 text-indigo-300 text-[10px] px-2 py-1 rounded-md font-bold border border-indigo-500/30">
                            🏷️ {lang === 'zh' ? prod.vendorZh : prod.vendorEn}
                          </span>
                        </div>
                        {isPinned && (
                          <span className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 animate-pulse">
                            <Video className="w-3 h-3" />
                            {t.catalog.statusLive}
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-slate-100 line-clamp-1">
                          {lang === 'zh' ? prod.nameZh : prod.nameEn}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2">
                          {lang === 'zh' ? prod.descriptionZh : prod.descriptionEn}
                        </p>

                        <div className="pt-2 flex items-baseline justify-between">
                          <div>
                            <span className="text-xs text-slate-400">{t.catalog.price}: </span>
                            <span className="text-lg font-extrabold text-rose-400">NT$ {prod.price * 4}</span>
                            <span className="text-xs text-slate-500 line-through ml-2">NT$ {prod.originalPrice * 4}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                              {t.catalog.margin} {prod.margin}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                          <span>{t.catalog.stock}: <strong className="text-slate-200">{prod.stock}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 space-y-2">
                      <button
                        onClick={() => handlePinProduct(prod.id)}
                        className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isPinned
                            ? 'bg-rose-600/20 text-rose-300 border border-rose-500/40 cursor-default'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        {isPinned ? (lang === 'zh' ? '推流中 (當前掛載)' : 'Currently Live') : t.catalog.actionPush}
                      </button>

                      <button
                        onClick={() => setSelectedProductModal(prod)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
                      >
                        {t.catalog.actionDetail}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Product Detail Modal */}
            {selectedProductModal && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in duration-200">
                  <button
                    onClick={() => setSelectedProductModal(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img src={selectedProductModal.image} alt="Detail" className="w-full h-48 object-cover" />
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      {lang === 'zh' ? selectedProductModal.nameZh : selectedProductModal.nameEn}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {lang === 'zh' ? selectedProductModal.descriptionZh : selectedProductModal.descriptionEn}
                    </p>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>SKU ID:</span>
                        <span className="text-slate-200 font-mono">{selectedProductModal.id}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{t.catalog.price}:</span>
                        <span className="text-rose-400 font-bold">NT$ {selectedProductModal.price * 4}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{t.catalog.stock}:</span>
                        <span className="text-slate-200">{selectedProductModal.stock} pcs</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{t.catalog.margin}:</span>
                        <span className="text-emerald-400 font-bold">{selectedProductModal.margin}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          handlePinProduct(selectedProductModal.id);
                          setSelectedProductModal(null);
                        }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-semibold"
                      >
                        {t.catalog.actionPush}
                      </button>
                      <button
                        onClick={() => {
                          handleAddToCart(lang === 'zh' ? selectedProductModal.nameZh : selectedProductModal.nameEn);
                          setSelectedProductModal(null);
                        }}
                        className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-xl text-xs font-semibold"
                      >
                        {t.liveRoom.addToCart}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW 3: DIGITAL HUMAN PRESENTERS */}
        {/* ========================================= */}
        {activeTab === 'presenters' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-indigo-400" />
                {t.presenters.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">{t.presenters.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {presenters.map((pres) => {
                const isSelected = pres.id === activePresenterId;
                return (
                  <div
                    key={pres.id}
                    className={`bg-slate-900 rounded-3xl border transition-all overflow-hidden flex flex-col justify-between ${
                      isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/30 shadow-2xl' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className={`relative h-56 bg-gradient-to-br ${pres.avatarBg} overflow-hidden`}>
                        <img
                          src={pres.avatarImg}
                          alt={pres.nameZh}
                          className="w-full h-full object-cover mix-blend-overlay opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="bg-slate-950/80 backdrop-blur text-indigo-300 text-[10px] px-2.5 py-1 rounded-full border border-indigo-500/30 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            AI Digital Human
                          </span>
                        </div>

                        {isSelected && (
                          <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-md">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            {t.presenters.selected}
                          </span>
                        )}

                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">
                            {lang === 'zh' ? pres.nameZh : pres.nameEn}
                          </h3>
                          <p className="text-xs text-indigo-200 font-medium">
                            {lang === 'zh' ? pres.roleZh : pres.roleEn}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-800/60">
                            <span className="text-slate-400">{t.presenters.style}:</span>
                            <span className="text-slate-200 font-medium">{lang === 'zh' ? pres.styleZh : pres.styleEn}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-800/60">
                            <span className="text-slate-400">{t.presenters.voiceTone}:</span>
                            <span className="text-slate-200 font-medium">{lang === 'zh' ? pres.voiceToneZh : pres.voiceToneEn}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-800/60">
                            <span className="text-slate-400">{t.presenters.suitability}:</span>
                            <span className="text-emerald-400 font-medium text-right line-clamp-1">{lang === 'zh' ? pres.suitabilityZh : pres.suitabilityEn}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-[10px] block">{t.presenters.activeRate}</span>
                            <span className="text-indigo-400 font-bold text-sm">{pres.realism}</span>
                          </div>
                          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-[10px] block">{t.presenters.complianceScore}</span>
                            <span className="text-emerald-400 font-bold text-sm">{pres.complianceScore}</span>
                          </div>
                        </div>

                        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Mic className="w-3.5 h-3.5 text-indigo-400" />
                              {t.presenters.previewVoice}
                            </span>
                            <Volume2 className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
                          </div>
                          <p className="text-[11px] text-slate-300 italic line-clamp-2">
                            "{lang === 'zh' ? pres.sampleSpeechZh : pres.sampleSpeechEn}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => handleSelectPresenter(pres.id)}
                        disabled={isSelected}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            {t.presenters.selected}
                          </>
                        ) : (
                          t.presenters.select
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

{/* ============================================================ */}
        {/* VIEW 4.5: AI CRISIS DRILL / STRESS TEST                      */}
        {/* ============================================================ */}
        {activeTab === 'crisis-drill' && (
          <CrisisDrillModule presenters={[]} products={[]} />
        )}

        {/* ========================================= */}
        {/* VIEW 4: LIVE STREAM ROOM */}
        {/* ========================================= */}
        {activeTab === 'liveroom' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Video className="w-6 h-6 text-rose-500" />
                  {t.liveRoom.statusLive} - {lang === 'zh' ? activePresenter.nameZh : activePresenter.nameEn}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'zh' ? `當前推流數字人: ${activePresenter.nameZh} (${activePresenter.roleZh})` : `Active Avatar: ${activePresenter.nameEn}`}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                {t.liveRoom.badgeCompliant}
              </div>
            </div>

            {/* Video Screen & Chat Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center group">
                  <img
                    src={activePresenter.avatarImg}
                    alt="Digital Presenter"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                  {/* Top Overlay Bar */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                      <span className="font-bold text-rose-400">{t.liveRoom.statusLive}</span>
                      <span className="text-slate-400">|</span>
                      <Eye className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-slate-200 font-medium">14,280 {t.liveRoom.onlineViewers}</span>
                    </div>

                    <button 
                      onClick={() => setIsPlayingLive(!isPlayingLive)}
                      className="bg-black/60 backdrop-blur p-2 rounded-full border border-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      {isPlayingLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Dynamic Speech Teleprompter */}
                  <div className="absolute bottom-24 left-6 right-6 z-10">
                    <div className="bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-2xl space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.liveRoom.speechBubble} ({lang === 'zh' ? '已完成合規與去粗話檢測' : 'Clean & Verified'})</span>
                      </div>
                      <p className="text-sm font-medium text-slate-100 leading-snug">
                        {humanConfirmed && complianceResult
                          ? complianceResult.suggestedRewrite
                          : (lang === 'zh' ? activePresenter.sampleSpeechZh : activePresenter.sampleSpeechEn)}
                      </p>
                    </div>
                  </div>

                  {/* Pinned Product Banner */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={activeProduct.image} alt="Pinned Product" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">{t.liveRoom.pinnedProduct}</span>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{lang === 'zh' ? activeProduct.nameZh : activeProduct.nameEn}</h4>
                        <div className="text-xs font-extrabold text-rose-400">NT$ {activeProduct.price * 4} <span className="text-[10px] text-slate-500 line-through">NT$ {activeProduct.originalPrice * 4}</span></div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(lang === 'zh' ? activeProduct.nameZh : activeProduct.nameEn)}
                      className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {t.liveRoom.buyNow}
                    </button>
                  </div>
                </div>

                {/* Bottom Stream Status Bar */}
                <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setLiveLikes(l => l + 1)}
                      className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                      <span className="font-bold">{liveLikes}</span>
                    </button>
                    <span className="text-slate-400">{lang === 'zh' ? '推流延遲: 42ms' : 'Latency: 42ms'}</span>
                  </div>

                  <button 
                    onClick={() => setActiveTab('admin-compliance')}
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {lang === 'zh' ? '去後台改寫口播腳本' : 'Edit Script Compliance'}
                  </button>
                </div>
              </div>

              {/* Chat Feed Panel */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 flex flex-col justify-between h-[520px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      {t.liveRoom.liveChatTitle}
                    </h3>
                    <span className="text-[10px] text-slate-400">{lang === 'zh' ? '即時彈幕' : 'Live Chat'}</span>
                  </div>

                  <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                    {liveChatList.map((chat) => (
                      <div key={chat.id} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-850 space-y-0.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-indigo-300 text-[11px]">{chat.user}</span>
                          <span className="text-[9px] text-slate-500">Just now</span>
                        </div>
                        <p className="text-slate-200 text-xs">
                          {lang === 'zh' ? chat.textZh : chat.textEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!userChatInput.trim()) return;
                    setLiveChatList(prev => [
                      ...prev,
                      { id: Date.now(), user: lang === 'zh' ? '您 (觀眾)' : 'You (Viewer)', textZh: userChatInput, textEn: userChatInput }
                    ]);
                    setUserChatInput('');
                  }}
                  className="flex items-center gap-2 pt-3 border-t border-slate-800"
                >
                  <input
                    type="text"
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    placeholder={t.liveRoom.placeholderChat}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3.5 py-2 rounded-xl text-xs"
                  >
                    {t.liveRoom.sendChat}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW 5: ADMIN - BILINGUAL PROFANITY & SENSITIVE WORD DETECTOR */}
        {/* ========================================= */}
        {activeTab === 'admin-compliance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  {t.compliance.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{t.compliance.subtitle}</p>
              </div>
            </div>

            {/* Platform Compliance Policy Guardrail Banner */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-emerald-300">{t.compliance.noticeGuardrailTitle}</h4>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  {t.compliance.noticeGuardrailDesc}
                </p>
              </div>
            </div>

            {/* Preset Test Case Chips Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                {t.compliance.presetSamples}
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleScripts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setScriptInput(s.text);
                      setComplianceResult(null);
                      setHumanConfirmed(false);
                    }}
                    className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-indigo-500/50 px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left"
                  >
                    <span className="text-[10px] text-indigo-400 font-bold block">{s.langTag}</span>
                    <span>{lang === 'zh' ? s.titleZh : s.titleEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Script Input Box */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-indigo-400" />
                    {t.compliance.inputLabel}
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">{scriptInput.length} chars</span>
                </div>

                <textarea
                  rows={8}
                  value={scriptInput}
                  onChange={(e) => {
                    setScriptInput(e.target.value);
                    setComplianceResult(null);
                    setHumanConfirmed(false);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                  placeholder="在此處輸入或貼上直播解說腳本（支持中/英文，包含不雅粗話、誇大詞、醫療宣稱等）..."
                />

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={runComplianceCheck}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    {t.compliance.btnTest}
                  </button>

                  {humanConfirmed && (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {t.compliance.humanConfirmedStatus}
                    </span>
                  )}
                </div>
              </div>

              {/* Analysis Result & Human Confirmation Gate */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    {lang === 'zh' ? '風控與不雅用語檢測結果' : 'Risk & Moderation Analysis'}
                  </h3>

                  {!complianceResult && (
                    <div className="bg-slate-950/60 rounded-2xl p-8 text-center border border-dashed border-slate-800 space-y-2 text-slate-500">
                      <ShieldCheck className="w-10 h-10 mx-auto text-slate-700" />
                      <p className="text-xs">{lang === 'zh' ? '請在左側輸入話術並點擊「即時合規與不雅用語檢測」' : 'Enter script on left and click "Analyze Compliance & Profanity"'}</p>
                    </div>
                  )}

                  {complianceResult && (
                    <div className="space-y-4">
                      {/* Alert Header */}
                      {complianceResult.hasRisk ? (
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-rose-400 font-bold">
                            <AlertOctagon className="w-4 h-4" />
                            <span>{t.compliance.riskFound} ({complianceResult.risks.length})</span>
                          </div>
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full font-mono font-bold">
                            High Priority Filter
                          </span>
                        </div>
                      ) : (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-2 text-emerald-400 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.compliance.noRisk}</span>
                        </div>
                      )}

                      {/* Risks Breakdown */}
                      {complianceResult.hasRisk && (
                        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                          {complianceResult.risks.map((risk, idx) => {
                            const isCritical = risk.severity === 'CRITICAL';
                            return (
                              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-rose-400 font-extrabold">【{risk.word}】</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                      isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    }`}>
                                      {risk.severity}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-medium">
                                    {lang === 'zh' ? risk.categoryZh : risk.categoryEn}
                                  </span>
                                </div>
                                <p className="text-slate-300 text-[11px] leading-relaxed">
                                  <strong>{t.compliance.reason}:</strong> {lang === 'zh' ? risk.reasonZh : risk.reasonEn}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* AI Suggested Clean Rewrite */}
                      <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                          {t.compliance.suggestedRewrite}
                        </span>
                        <p className="text-xs text-slate-100 font-medium leading-relaxed">
                          {complianceResult.suggestedRewrite}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Explicit Human Confirmation Button */}
                {complianceResult && (
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={handleHumanConfirm}
                      disabled={humanConfirmed}
                      className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        humanConfirmed
                          ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      {humanConfirmed ? t.compliance.humanConfirmedStatus : t.compliance.humanConfirmBtn}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW 6: ADMIN - STREAM CONFIGURATION */}
        {/* ========================================= */}
        {activeTab === 'admin-config' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sliders className="w-6 h-6 text-indigo-400" />
                {t.admin.configTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-1">{t.admin.configSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  {lang === 'zh' ? '數字人渲染與音色參數' : 'Avatar Engine Parameters'}
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-medium block mb-2">{t.admin.selectPresenter}</label>
                    <select
                      value={activePresenterId}
                      onChange={(e) => handleSelectPresenter(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      {presenters.map(p => (
                        <option key={p.id} value={p.id}>
                          {lang === 'zh' ? `${p.nameZh} - ${p.roleZh}` : `${p.nameEn} - ${p.roleEn}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-medium block mb-2">{t.admin.selectProduct}</label>
                    <select
                      value={pinnedProductId}
                      onChange={(e) => handlePinProduct(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {lang === 'zh' ? `${p.nameZh} (NT$ ${p.price * 4})` : `${p.nameEn}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>{t.admin.speechRate}</span>
                      <span className="font-mono text-indigo-400">1.05x</span>
                    </div>
                    <input type="range" min="0.8" max="1.4" step="0.05" defaultValue="1.05" className="w-full accent-indigo-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>{t.admin.emotion}</span>
                      <span className="font-mono text-indigo-400">High Realism (95%)</span>
                    </div>
                    <input type="range" min="50" max="100" defaultValue="95" className="w-full accent-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-amber-400" />
                    {lang === 'zh' ? '推流引擎激活狀態' : 'Stream Engine Active Specs'}
                  </h3>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === 'zh' ? '當前已綁定主播' : 'Bound Avatar'}:</span>
                      <span className="text-white font-bold">{lang === 'zh' ? activePresenter.nameZh : activePresenter.nameEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === 'zh' ? '講解商品' : 'Pinned Product'}:</span>
                      <span className="text-white font-bold">{lang === 'zh' ? activeProduct.nameZh : activeProduct.nameEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === 'zh' ? '不雅用語與敏感詞過濾' : 'Profanity & Policy Filter'}:</span>
                      <span className="text-emerald-400 font-bold">{lang === 'zh' ? '雙語強約束開啟' : 'Bilingual Active'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('liveroom')}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  {lang === 'zh' ? '保存並返回直播間預覽' : 'Save & View Live Room'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW 7: ADMIN - COMPLIANCE AUDIT LOGS */}
        {/* ========================================= */}
        {activeTab === 'admin-logs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-400" />
                {t.admin.logsTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-1">{t.admin.logsSubtitle}</p>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">{t.admin.logTime}</th>
                      <th className="py-3.5 px-4">{t.admin.logUser}</th>
                      <th className="py-3.5 px-4">{t.admin.logAction}</th>
                      <th className="py-3.5 px-4">{t.admin.logDetail}</th>
                      <th className="py-3.5 px-4">{t.admin.logStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-850/50 transition-colors">
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-200">{log.operator}</td>
                        <td className="py-3.5 px-4 text-indigo-400 font-semibold">{lang === 'zh' ? log.actionZh : log.actionEn}</td>
                        <td className="py-3.5 px-4 text-slate-300 font-sans max-w-md">{lang === 'zh' ? log.detailZh : log.detailEn}</td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {log.status === 'Pass' && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">PASS</span>}
                          {log.status === 'Warning' && <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">WARNING</span>}
                          {log.status === 'Success' && <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">SUCCESS</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>© 2026 ZhiRen AI. Enterprise Digital Human Live E-Commerce Platform. Compliant & Audited.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-300 cursor-pointer">{lang === 'zh' ? '平台合規指南' : 'Compliance Rules'}</span>
          <span className="hover:text-slate-300 cursor-pointer">{lang === 'zh' ? '社群與不雅用語規範' : 'Profanity Guidelines'}</span>
        </div>
      </footer>
    </div>
  );
}