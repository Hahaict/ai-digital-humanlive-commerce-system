// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Play,
  Pause,
  SkipForward,
  Square,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Mic,
  Send,
  Sparkles,
  FileText,
  History,
  AlertTriangle,
  Sliders,
  Lock,
} from 'lucide-react';

export interface DrillPresenterOption {
  id: string;
  name: string;
  role?: string;
}

export interface DrillProductOption {
  id: string;
  name: string;
  price?: number;
}

export interface SavedDrillRecord {
  id: string;
  createdAt: string;
  targetType: 'ai' | 'human';
  presenterName: string;
  productName: string;
  intensity: 'low' | 'medium' | 'high';
  status: 'completed' | 'emergency_stopped';
  overallScore: number;
  avgResponseTimeSec: number;
  complianceRate: number;
  emotionalStabilityScore: number;
  deescalationScore: number;
  solutionCompletenessScore: number;
  scriptQualityScore: number;
  suggestions: string[];
  transcript: {
    comment: string;
    category: string;
    reply: string;
    compliant: boolean;
    score: number;
  }[];
}

interface CrisisDrillModuleProps {
  presenters: DrillPresenterOption[];
  products: DrillProductOption[];
  externalRecords?: SavedDrillRecord[];
  onSaveRecord?: (record: SavedDrillRecord) => void;
}

type NegativeType = 'price' | 'competitor' | 'after_sales' | 'skepticism' | 'usage';

const NEGATIVE_TYPE_LABELS: Record<NegativeType, string> = {
  price: '價格質疑',
  competitor: '競品對比',
  after_sales: '售後問題',
  skepticism: '功效/真實性質疑',
  usage: '使用抱怨',
};

const SAMPLE_COMMENT_BANK: Record<NegativeType, { user: string; text: string; altText: string }[]> = {
  price: [
    {
      user: '觀眾_阿明',
      text: '這個定價是不是比上次直播貴了一點？現在買划算嗎？',
      altText: '請問這組現在的組合價跟單買差多少？有沒有優惠說明？',
    },
    {
      user: '路過網友',
      text: '同樣規格我看別家促銷好像更便宜，為什麼你們賣這個價？',
      altText: '想了解一下這個價格包含哪些售後或贈品服務？',
    },
  ],
  competitor: [
    {
      user: '比價小達人',
      text: '某知名品牌同類款好像更有名，你們跟它比到底差在哪？',
      altText: '這款跟市面上常見同類型產品相比，主要差異點是什麼？',
    },
  ],
  after_sales: [
    {
      user: '買家_林小姐',
      text: '上次下單的出貨進度有點慢，如果收到不合適退換貨會不會很麻煩？',
      altText: '想確認一下這批商品的出貨時間與退換貨流程是如何處理的？',
    },
  ],
  skepticism: [
    {
      user: '理性吃瓜',
      text: '直播講得這麼好，實際效果真的像說的那樣嗎？會不會只是話術？',
      altText: '請問這項產品的成分或使用限制有公開資料可以參考嗎？',
    },
  ],
  usage: [
    {
      user: '新手用戶',
      text: '我第一次用這類產品，怕抓不準用量或步驟，會不會很難上手？',
      altText: '初次使用有哪些需要注意的步驟或建議頻率？',
    },
  ],
};

// 安全內容過濾：僅保留合理負評/質疑/抱怨/競品/價格/售後，過濾不當字眼
const BLOCKED_TERMS = ['辱罵', '威脅', '歧視', '騷擾', '違法', '去死', '白痴', '垃圾'];

function sanitizeSimulatedComment(raw: string): { text: string; filtered: boolean } {
  let cleaned = raw;
  let filtered = false;
  for (const term of BLOCKED_TERMS) {
    if (cleaned.includes(term)) {
      cleaned = cleaned.split(term).join('**');
      filtered = true;
    }
  }
  return { text: cleaned, filtered };
}

function generateAiPresenterReply(category: string, commentText: string, productName: string): {
  reply: string;
  compliant: boolean;
  escalated: boolean;
  hasSolution: boolean;
  score: number;
  suggestion: string;
} {
  const safeReply = `感謝您的提問！針對「${productName}」這部分的疑慮（${category}），我們會如實說明目前方案與配套，並提供清楚的客服確認管道，讓您在充分了解後再做決定。`;
  return {
    reply: safeReply,
    compliant: true,
    escalated: false,
    hasSolution: true,
    score: 90,
    suggestion: '可再補上一句具體的確認步驟或可查閱資訊位置，讓回覆更具體。',
  };
}

function evaluateHumanReply(replyText: string): {
  compliant: boolean;
  escalated: boolean;
  hasSolution: boolean;
  score: number;
  suggestion: string;
} {
  const trimmed = replyText.trim();
  const hasAggressiveTone = /你懂什麼|自己看|愛買不買|別吵|廢話/.test(trimmed);
  const hasSolution = /客服|退換|說明|方案|確認|協助|提供|建議|步驟/.test(trimmed);
  const compliant = !hasAggressiveTone && trimmed.length >= 4;
  const escalated = hasAggressiveTone;

  let score = 75;
  if (compliant) score += 10;
  if (hasSolution) score += 10;
  if (escalated) score -= 35;
  score = Math.max(20, Math.min(98, score));

  const suggestion = escalated
    ? '語氣偏防衛，建議先接住對方疑問，再用中性、可驗證的說明回覆，避免激化矛盾。'
    : hasSolution
    ? '有嘗試提出處理方向，若能補充具體時間或確認方式，說服力會更高。'
    : '建議在安撫情緒後，明確指出下一步可提供的協助或說明，避免只停留在表態。';

  return { compliant, escalated, hasSolution, score, suggestion };
}

export const CrisisDrillModule: React.FC<CrisisDrillModuleProps> = ({
  presenters,
  products,
  externalRecords = [],
  onSaveRecord,
}) => {
  const [stage, setStage] = useState<'setup' | 'live' | 'report' | 'history'>('setup');

  // 1. 預演配置狀態
  const [targetType, setTargetType] = useState<'ai' | 'human'>('ai');
  const [presenterId, setPresenterId] = useState<string>(presenters[0]?.id || 'default-presenter');
  const [productId, setProductId] = useState<string>(products[0]?.id || 'default-product');
  const [scenario, setScenario] = useState<'flash_sale' | 'new_launch' | 'routine_live'>('flash_sale');
  const [selectedTypes, setSelectedTypes] = useState<NegativeType[]>([
    'price',
    'competitor',
    'after_sales',
  ]);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [frequencySec, setFrequencySec] = useState<number>(5);
  const [burstMode, setBurstMode] = useState<boolean>(false);
  const [includeCrisisPack, setIncludeCrisisPack] = useState<boolean>(true);
  const [safetyConfirmed, setSafetyConfirmed] = useState<boolean>(true);

  // 2. 演練直播狀態
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [streamStopped, setStreamStopped] = useState<boolean>(false);
  const [activeComments, setActiveComments] = useState<
    {
      id: string;
      user: string;
      category: string;
      text: string;
      altText: string;
      approved: boolean;
      reply?: string;
      responseTimeSec?: number;
      compliant?: boolean;
      escalated?: boolean;
      hasSolution?: boolean;
      score?: number;
      suggestion?: string;
      arrivedAt: number;
    }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [humanInput, setHumanInput] = useState<string>('');
  const [voiceSimActive, setVoiceSimActive] = useState<boolean>(false);

  // 3. 報告與紀錄狀態
  const [localRecords, setLocalRecords] = useState<SavedDrillRecord[]>([]);
  const [latestReport, setLatestReport] = useState<SavedDrillRecord | null>(null);
  const bankCursorRef = useRef<number>(0);

  const selectedPresenter =
    presenters.find((p) => p.id === presenterId)?.name ||
    (targetType === 'ai' ? 'AI 數字人主播' : '人類主播示範');
  const selectedProduct =
    products.find((p) => p.id === productId)?.name || '示範直播商品';

  const allRecords = [...localRecords, ...externalRecords];

  const toggleNegativeType = (type: NegativeType) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.length > 1 ? prev.filter((item) => item !== type) : prev;
      }
      return [...prev, type];
    });
  };

  const buildNextComment = (isBurstExtra = false) => {
    const poolTypes: NegativeType[] = [...selectedTypes];
    if (includeCrisisPack) {
      if (!poolTypes.includes('competitor')) poolTypes.push('competitor');
      if (!poolTypes.includes('after_sales')) poolTypes.push('after_sales');
    }
    const chosenType = poolTypes[bankCursorRef.current % poolTypes.length];
    const items = SAMPLE_COMMENT_BANK[chosenType];
    const template = items[bankCursorRef.current % items.length];
    bankCursorRef.current += 1;

    const clean = sanitizeSimulatedComment(template.text);
    const cleanAlt = sanitizeSimulatedComment(template.altText);

    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user: isBurstExtra ? `${template.user}（突發刷屏）` : template.user,
      category: NEGATIVE_TYPE_LABELS[chosenType],
      text: clean.text,
      altText: cleanAlt.text,
      approved: true,
      arrivedAt: Date.now(),
    };
  };

  const startDrill = () => {
    if (!safetyConfirmed) return;
    bankCursorRef.current = 0;
    setIsPaused(false);
    setStreamStopped(false);
    setHumanInput('');
    setVoiceSimActive(false);

    const initialCount = intensity === 'high' ? 2 : 1;
    const firstBatch = Array.from({ length: initialCount }, (_, idx) =>
      buildNextComment(burstMode && idx > 0)
    );
    setActiveComments(firstBatch);
    setCurrentIndex(0);
    setStage('live');
  };

  // 定時生成模擬負評彈幕
  useEffect(() => {
    if (stage !== 'live' || isPaused || streamStopped) return;

    const effectiveIntervalMs =
      intensity === 'high'
        ? Math.max(2200, frequencySec * 650)
        : intensity === 'low'
        ? frequencySec * 1250
        : frequencySec * 1000;

    const timer = window.setInterval(() => {
      setActiveComments((prev) => {
        if (prev.length >= 12) return prev;
        const nextItem = buildNextComment(false);
        if (burstMode && Math.random() > 0.55) {
          const burstItem = buildNextComment(true);
          return [...prev, nextItem, burstItem];
        }
        return [...prev, nextItem];
      });
    }, effectiveIntervalMs);

    return () => window.clearInterval(timer);
  }, [stage, isPaused, streamStopped, intensity, frequencySec, burstMode, selectedTypes, includeCrisisPack]);

  // AI 主播自動回應尚未回覆的彈幕
  useEffect(() => {
    if (stage !== 'live' || isPaused || streamStopped || targetType !== 'ai') return;

    const unrepliedIndex = activeComments.findIndex((c) => c.approved && !c.reply);
    if (unrepliedIndex === -1) return;

    const autoTimer = window.setTimeout(() => {
      setActiveComments((prev) =>
        prev.map((item, idx) => {
          if (idx !== unrepliedIndex || item.reply) return item;
          const elapsedSec = Number(
            Math.max(1.2, (Date.now() - item.arrivedAt) / 1000).toFixed(1)
          );
          const evalResult = generateAiPresenterReply(item.category, item.text, selectedProduct);
          return {
            ...item,
            reply: evalResult.reply,
            responseTimeSec: elapsedSec,
            compliant: evalResult.compliant,
            escalated: evalResult.escalated,
            hasSolution: evalResult.hasSolution,
            score: evalResult.score,
            suggestion: evalResult.suggestion,
          };
        })
      );
    }, 1200);

    return () => window.clearTimeout(autoTimer);
  }, [stage, isPaused, streamStopped, targetType, activeComments, selectedProduct]);

  const handleReplaceComment = (id: string) => {
    setActiveComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const swapped = c.text === c.altText ? buildNextComment(false).text : c.altText;
        return { ...c, text: swapped, reply: undefined, score: undefined };
      })
    );
  };

  const handleDeleteComment = (id: string) => {
    setActiveComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSkipCurrent = () => {
    setActiveComments((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(1);
    });
  };

  const handleHumanSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!humanInput.trim()) return;
    const targetIdx = activeComments.findIndex((c) => c.approved && !c.reply);
    const idxToUse = targetIdx >= 0 ? targetIdx : activeComments.length - 1;
    if (idxToUse < 0) return;

    const replyText = humanInput.trim();
    const evalResult = evaluateHumanReply(replyText);

    setActiveComments((prev) =>
      prev.map((item, idx) => {
        if (idx !== idxToUse) return item;
        const elapsedSec = Number(
          Math.max(1.0, (Date.now() - item.arrivedAt) / 1000).toFixed(1)
        );
        return {
          ...item,
          reply: replyText,
          responseTimeSec: elapsedSec,
          compliant: evalResult.compliant,
          escalated: evalResult.escalated,
          hasSolution: evalResult.hasSolution,
          score: evalResult.score,
          suggestion: evalResult.suggestion,
        };
      })
    );
    setHumanInput('');
    setVoiceSimActive(false);
  };

  const finalizeDrill = (isEmergencyStop: boolean) => {
    setStreamStopped(true);
    setIsPaused(true);

    const answered = activeComments.filter((c) => Boolean(c.reply));
    const totalCount = Math.max(1, answered.length);

    const avgResponseTimeSec = Number(
      (
        answered.reduce((acc, item) => acc + (item.responseTimeSec || 3.0), 0) / totalCount
      ).toFixed(1)
    );

    const complianceRate = Math.round(
      (answered.filter((item) => item.compliant !== false).length / totalCount) * 100
    );

    const escalatedCount = answered.filter((item) => item.escalated).length;
    const emotionalStabilityScore = Math.max(
      35,
      Math.min(98, 92 - escalatedCount * 18 - (intensity === 'high' ? 4 : 0))
    );

    const deescalationScore = Math.max(
      40,
      Math.min(98, 90 - escalatedCount * 20)
    );

    const solutionCount = answered.filter((item) => item.hasSolution).length;
    const solutionCompletenessScore = Math.round((solutionCount / totalCount) * 100) || 75;

    const scriptQualityScore = Math.round(
      answered.reduce((acc, item) => acc + (item.score || 80), 0) / totalCount
    );

    const overallScore = Math.round(
      complianceRate * 0.25 +
        emotionalStabilityScore * 0.2 +
        deescalationScore * 0.2 +
        solutionCompletenessScore * 0.15 +
        scriptQualityScore * 0.2
    );

    const suggestions: string[] = [];
    if (isEmergencyStop) {
      suggestions.push('本次演練觸發了緊急停止，建議先降低彈幕強度或改為低頻率，分段練習關鍵異議。');
    }
    if (complianceRate < 100) {
      suggestions.push('部分回覆語氣或表述需再收斂，建議避免絕對化承諾或情緒化反駁。');
    }
    if (solutionCompletenessScore < 80) {
      suggestions.push('面對價格、競品或售後質疑時，建議主動補充查核依據、退換規則或客服協助路徑。');
    }
    if (suggestions.length === 0) {
      suggestions.push('整體應對節奏穩定、合規度良好，可進一步開啟「突發刷屏」測試高壓連續切換情境。');
    }

    const record: SavedDrillRecord = {
      id: `DRILL-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString(),
      targetType,
      presenterName: selectedPresenter,
      productName: selectedProduct,
      intensity,
      status: isEmergencyStop ? 'emergency_stopped' : 'completed',
      overallScore,
      avgResponseTimeSec,
      complianceRate,
      emotionalStabilityScore,
      deescalationScore,
      solutionCompletenessScore,
      scriptQualityScore,
      suggestions,
      transcript: activeComments.map((c) => ({
        comment: c.text,
        category: c.category,
        reply: c.reply || '（尚未回覆即結束演練）',
        compliant: c.compliant !== false,
        score: c.score || 75,
      })),
    };

    setLatestReport(record);
    setLocalRecords((prev) => [record, ...prev]);
    if (onSaveRecord) {
      onSaveRecord(record);
    }
    setStage('report');
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-700/70 bg-slate-900/90 p-5 text-slate-100">
      {/* 頂部導覽與安全提示橫幅 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="h-6 w-6 text-amber-400" />
          <div>
            <h2 className="text-lg font-bold text-white">
              AI 危機預演 / 抗壓測試中心（內部訓練模擬）
            </h2>
            <p className="text-xs text-slate-400">
              僅模擬合理負評、價格/競品質疑與售後情境；不含辱罵、威脅、歧視或違法內容，演練紀錄僅供內部訓練與復盤。
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStage('setup')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
              stage === 'setup'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            預演配置
          </button>
          <button
            type="button"
            onClick={() => setStage('live')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
              stage === 'live'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            演練直播
          </button>
          <button
            type="button"
            onClick={() => setStage('report')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
              stage === 'report'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            復盤報告
          </button>
          <button
            type="button"
            onClick={() => setStage('history')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
              stage === 'history'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <History className="h-3.5 w-3.5" />
            預演紀錄 ({allRecords.length})
          </button>
        </div>
      </div>

      {/* 心理安全與內部使用提示 */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-950/30 p-3.5 text-xs text-amber-200">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <div className="space-y-1">
          <p className="font-semibold">心理安全與內部使用聲明</p>
          <p className="text-amber-100/85">
            高強度或突發刷屏演練可能帶來壓力，演練期間可隨時點擊「暫停」、「跳過」或「緊急停止」。所有模擬負評與評分資料僅作內部抗壓與話術訓練使用，不對外公開傳播。
          </p>
        </div>
      </div>

      {/* 頁面 1：預演配置頁 */}
      {stage === 'setup' && (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold text-white">1. 測試對象與直播情境</h3>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">測試對象</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetType('ai')}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                    targetType === 'ai'
                      ? 'border-indigo-500 bg-indigo-600/25 text-white'
                      : 'border-slate-700 bg-slate-900 text-slate-300'
                  }`}
                >
                  AI 主播（自動生成回應）
                </button>
                <button
                  type="button"
                  onClick={() => setTargetType('human')}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                    targetType === 'human'
                      ? 'border-indigo-500 bg-indigo-600/25 text-white'
                      : 'border-slate-700 bg-slate-900 text-slate-300'
                  }`}
                >
                  人類主播（文字/語音回應）
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">選擇主播</label>
              <select
                value={presenterId}
                onChange={(e) => setPresenterId(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              >
                {presenters.length > 0 ? (
                  presenters.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.role ? `(${p.role})` : ''}
                    </option>
                  ))
                ) : (
                  <option value="default-presenter">預設直播主播</option>
                )}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">關聯商品</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              >
                {products.length > 0 ? (
                  products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))
                ) : (
                  <option value="default-product">預設示範商品</option>
                )}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">直播場景</label>
              <select
                value={scenario}
                onChange={(e) =>
                  setScenario(e.target.value as 'flash_sale' | 'new_launch' | 'routine_live')
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              >
                <option value="flash_sale">限時搶購專場</option>
                <option value="new_launch">新品首發直播</option>
                <option value="routine_live">日常帶貨互動</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold text-white">2. 負評類型、彈幕強度與危機開關</h3>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">
                負評類型（僅限合理質疑/抱怨/比較/售後）
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(NEGATIVE_TYPE_LABELS) as NegativeType[]).map((type) => {
                  const active = selectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleNegativeType(type)}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        active
                          ? 'border-rose-500/80 bg-rose-500/20 text-rose-200'
                          : 'border-slate-700 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {NEGATIVE_TYPE_LABELS[type]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs text-slate-400">彈幕強度</label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                >
                  <option value="low">低強度（溫和提問）</option>
                  <option value="medium">中強度（常態負評）</option>
                  <option value="high">高強度（密集刁難）</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-slate-400">
                  彈幕頻率（每 {frequencySec} 秒）
                </label>
                <input
                  type="range"
                  min={2}
                  max={10}
                  value={frequencySec}
                  onChange={(e) => setFrequencySec(Number(e.target.value))}
                  className="mt-2 w-full accent-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <label className="flex items-center gap-2 text-slate-200">
                <input
                  type="checkbox"
                  checked={burstMode}
                  onChange={(e) => setBurstMode(e.target.checked)}
                  className="rounded border-slate-600"
                />
                是否開啟「突發刷屏」波次
              </label>
              <label className="flex items-center gap-2 text-slate-200">
                <input
                  type="checkbox"
                  checked={includeCrisisPack}
                  onChange={(e) => setIncludeCrisisPack(e.target.checked)}
                  className="rounded border-slate-600"
                />
                是否加入「競品對比 / 售後危機」組合
              </label>
              <label className="flex items-center gap-2 text-amber-200">
                <input
                  type="checkbox"
                  checked={safetyConfirmed}
                  onChange={(e) => setSafetyConfirmed(e.target.checked)}
                  className="rounded border-amber-500"
                />
                我已了解心理安全提示，且本演練僅供內部訓練使用
              </label>
            </div>

            <button
              type="button"
              disabled={!safetyConfirmed}
              onClick={startDrill}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              開始危機預演
            </button>
          </div>
        </div>
      )}

      {/* 頁面 2：演練直播頁 */}
      {stage === 'live' && (
        <div className="space-y-4">
          {/* 控制列：暫停 / 跳過 / 緊急停止 / 結束生成報告 */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
            <div className="text-xs text-slate-300">
              測試對象：<strong className="text-white">{selectedPresenter}</strong>（
              {targetType === 'ai' ? 'AI 主播' : '人類主播'}）｜ 商品：
              <strong className="text-white">{selectedProduct}</strong> ｜ 強度：
              <strong className="uppercase text-amber-300">{intensity}</strong>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-white hover:bg-slate-700"
              >
                {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                {isPaused ? '繼續' : '暫停'}
              </button>
              <button
                type="button"
                onClick={handleSkipCurrent}
                className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-white hover:bg-slate-700"
              >
                <SkipForward className="h-3.5 w-3.5" />
                跳過
              </button>
              <button
                type="button"
                onClick={() => finalizeDrill(true)}
                className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500"
              >
                <Square className="h-3.5 w-3.5" />
                緊急停止
              </button>
              <button
                type="button"
                onClick={() => finalizeDrill(false)}
                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                完成並生成報告
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* 左側：模擬直播畫面與回應區 */}
            <div className="flex flex-col justify-between space-y-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                  <span>模擬直播視窗</span>
                  <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-indigo-300">
                    {isPaused ? '已暫停' : streamStopped ? '已停止' : '演練進行中'}
                  </span>
                </div>
                <div className="flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 p-4 text-center">
                  <Sparkles className="mb-2 h-7 w-7 text-indigo-400" />
                  <p className="text-sm font-semibold text-white">{selectedPresenter}</p>
                  <p className="mt-1 text-xs text-slate-300">
                    正在應對「{selectedProduct}」相關負評與危機模擬
                  </p>
                </div>
              </div>

              {targetType === 'human' ? (
                <form onSubmit={handleHumanSubmitReply} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>人類主播實時回應</span>
                    <button
                      type="button"
                      onClick={() => {
                        setVoiceSimActive((v) => !v);
                        if (!humanInput) {
                          setHumanInput(
                            '感謝您的回饋，這部分我們會協助核對訂單與說明規則，請放心。'
                          );
                        }
                      }}
                      className={`flex items-center gap-1 rounded px-2 py-0.5 ${
                        voiceSimActive
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Mic className="h-3 w-3" />
                      {voiceSimActive ? '語音轉文字示範中' : '模擬語音輸入'}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={humanInput}
                      onChange={(e) => setHumanInput(e.target.value)}
                      placeholder="輸入你的安撫與解決方案話術..."
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500"
                    >
                      <Send className="h-3.5 w-3.5" />
                      送出
                    </button>
                  </div>
                </form>
              ) : (
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-300">
                  AI 主播模式已啟用：系統會自動生成合規、降級矛盾且包含處理方向的回應。
                </div>
              )}
            </div>

            {/* 右側：AI 負評彈幕流（支援替換、刪除、人工審核） */}
            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  AI 模擬負評彈幕流（已過濾安全違規內容）
                </h3>
                <span className="text-xs text-slate-400">共 {activeComments.length} 條</span>
              </div>

              <div className="max-h-[340px] space-y-2.5 overflow-y-auto pr-1">
                {activeComments.map((item) => (
                  <div
                    key={item.id}
                    className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/90 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-rose-300">{item.user}</span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleReplaceComment(item.id)}
                          title="替換彈幕"
                          className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200 hover:bg-slate-700"
                        >
                          <RefreshCw className="inline h-3 w-3" /> 替換
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(item.id)}
                          title="刪除彈幕"
                          className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-rose-300 hover:bg-slate-700"
                        >
                          <XCircle className="inline h-3 w-3" /> 刪除
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-100">{item.text}</p>

                    {item.reply && (
                      <div className="rounded border-l-2 border-emerald-400 bg-emerald-950/30 p-2 text-emerald-100">
                        <div className="mb-0.5 flex items-center justify-between text-[11px] text-emerald-300">
                          <span>主播回應（響應 {item.responseTimeSec}s）</span>
                          <span>得分：{item.score}</span>
                        </div>
                        <p>{item.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 頁面 3：復盤報告頁 */}
      {stage === 'report' && (
        <div className="space-y-4">
          {!latestReport ? (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 text-center text-xs text-slate-400">
              尚未有剛完成的演練報告，請先完成一次「演練直播」或前往「預演紀錄」查看歷史報告。
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div>
                  <span className="text-xs text-slate-400">演練編號：{latestReport.id}</span>
                  <h3 className="text-base font-bold text-white">
                    {latestReport.presenterName} × {latestReport.productName} — 抗壓與話術復盤報告
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-indigo-400">
                    {latestReport.overallScore} 分
                  </div>
                  <div className="text-xs text-slate-400">
                    狀態：{latestReport.status === 'emergency_stopped' ? '緊急停止' : '正常完成'}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">平均響應時間</div>
                  <div className="mt-1 text-lg font-bold text-white">
                    {latestReport.avgResponseTimeSec}s
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">回應合規率</div>
                  <div className="mt-1 text-lg font-bold text-emerald-300">
                    {latestReport.complianceRate}%
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">情緒穩定性</div>
                  <div className="mt-1 text-lg font-bold text-white">
                    {latestReport.emotionalStabilityScore}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">矛盾化解能力</div>
                  <div className="mt-1 text-lg font-bold text-white">
                    {latestReport.deescalationScore}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">解決方案完整度</div>
                  <div className="mt-1 text-lg font-bold text-white">
                    {latestReport.solutionCompletenessScore}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">話術質量</div>
                  <div className="mt-1 text-lg font-bold text-indigo-300">
                    {latestReport.scriptQualityScore}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  改進建議
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-200">
                  {latestReport.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}

      {/* 頁面 4：後台預演與評分紀錄 */}
      {stage === 'history' && (
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              內部預演與評分紀錄（僅供內部訓練使用，不對外公開）
            </h3>
            <span className="text-xs text-slate-400">共 {allRecords.length} 筆</span>
          </div>

          {allRecords.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-400">
              目前尚無預演紀錄。完成一次演練後，紀錄會自動保存在此。
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="py-2 pr-3">編號</th>
                    <th className="py-2 pr-3">時間</th>
                    <th className="py-2 pr-3">對象</th>
                    <th className="py-2 pr-3">強度</th>
                    <th className="py-2 pr-3">合規率</th>
                    <th className="py-2 pr-3">綜合評分</th>
                    <th className="py-2">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {allRecords.map((rec) => (
                    <tr key={rec.id}>
                      <td className="py-2 pr-3 font-mono text-slate-300">{rec.id}</td>
                      <td className="py-2 pr-3 text-slate-400">{rec.createdAt}</td>
                      <td className="py-2 pr-3 text-white">{rec.presenterName}</td>
                      <td className="py-2 pr-3 uppercase text-amber-300">{rec.intensity}</td>
                      <td className="py-2 pr-3 text-emerald-300">{rec.complianceRate}%</td>
                      <td className="py-2 pr-3 font-bold text-indigo-300">{rec.overallScore}</td>
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLatestReport(rec);
                            setStage('report');
                          }}
                          className="rounded bg-slate-800 px-2.5 py-1 text-[11px] text-white hover:bg-slate-700"
                        >
                          查看報告
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};