"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getQuestionnaireForCategory, QuestionnaireStep } from "../../data/questionnaireData";
import { Check, ChevronRight, ArrowLeft } from "lucide-react";

interface QuoteWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

// 追加の「ユーザー登録ステップ」を定義
const AUTH_STEP_ID = "progressive_auth";

export default function QuoteWizardModal({ isOpen, onClose, category }: QuoteWizardModalProps) {
  const router = useRouter();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [steps, setSteps] = useState<QuestionnaireStep[]>([]);
  // アニメーション用の状態
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const commonSteps: QuestionnaireStep[] = [
        {
          id: "prop_zipcode",
          title: "物件の郵便番号",
          description: "対応エリアや正確な概算を出すために郵便番号を入力してください。",
          type: "text",
          group: "details",
          required: true,
          placeholder: "例：160-0022"
        },
        {
          id: "prop_type",
          title: "物件のタイプ",
          description: "依頼対象となる物件の種類を選択してください。",
          type: "radio",
          group: "details",
          required: true,
          options: [
            { label: "マンション・アパート（区分）", value: "mansion" },
            { label: "一戸建て", value: "house" },
            { label: "その他（店舗・ビル等）", value: "other" }
          ]
        },
        {
          id: "prop_size",
          title: "おおよ子の広さ（平米数）",
          description: "分かればで構いません。",
          type: "number",
          group: "numerical",
          required: false,
          placeholder: "例：40",
          unitLabel: "平米"
        }
      ];

      const serviceSteps = getQuestionnaireForCategory(category);
      
      // 動的ステップのあとに、プログレッシブ・プロファイリング（会員登録）ステップを差し込む
      const authStep: QuestionnaireStep = {
        id: AUTH_STEP_ID,
        title: "最後に見積もり結果の受け取り先を教えてください",
        description: "入力いただいた条件で複数業者に一括で見積もり依頼を送信します。\nアカウントを無料作成して、結果をチャットで受け取りましょう。",
        type: "text", // 特殊処理用のダミーtype
        group: "details",
        required: true
      };

      setSteps([...commonSteps, ...serviceSteps, authStep]);
      setCurrentStepIdx(0);
      setAnswers({});
      setIsTransitioning(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, category]);

  if (!isOpen) return null;

  // 依存関係を考慮して表示可能なステップだけをフィルタリング
  const visibleSteps = steps.filter(step => {
    if (!step.dependsOn) return true;
    const ans = answers[step.dependsOn.stepId];
    if (ans === undefined || ans === null) return false;
    if (Array.isArray(step.dependsOn.value)) {
      return step.dependsOn.value.includes(ans);
    }
    return ans === step.dependsOn.value;
  });

  const currentStep = visibleSteps[currentStepIdx];
  const isLastStep = currentStepIdx === visibleSteps.length - 1;

  const goToNextStep = () => {
    if (isTransitioning) return;

    // バリデーション
    if (currentStep.required && currentStep.id !== AUTH_STEP_ID) {
      const val = answers[currentStep.id];
      if (!val || (Array.isArray(val) && val.length === 0)) {
        alert("この項目は入力必須です。");
        return;
      }
    }

    if (isLastStep) {
      // 最終ステップ（Auth）の送信処理
      router.push('/thanks');
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
        setIsTransitioning(false);
      }, 300); // アニメーションの尺と合わせる
    }
  };

  const goToPrevStep = () => {
    if (isTransitioning || currentStepIdx === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStepIdx(prev => prev - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const updateAnswer = (val: any, autoAdvance: boolean = false) => {
    setAnswers(prev => ({ ...prev, [currentStep.id]: val }));
    if (autoAdvance) {
      // ラジオボタン等で即時遷移させる場合、少しディレイを入れてUXを向上
      setTimeout(() => goToNextStep(), 300);
    }
  };

  const updateArrayAnswer = (val: string, checked: boolean) => {
    setAnswers(prev => {
      const currentArr = prev[currentStep.id] || [];
      if (checked) {
        return { ...prev, [currentStep.id]: [...currentArr, val] };
      } else {
        return { ...prev, [currentStep.id]: currentArr.filter((i: string) => i !== val) };
      }
    });
  };

  // ----- Progressive Profiling (Auth Form) 描画用 -----
  const renderAuthForm = () => {
    const authData = answers[AUTH_STEP_ID] || { name: '', email: '', password: '' };
    const handleAuthChange = (field: string, val: string) => {
      setAnswers(prev => ({
        ...prev,
        [AUTH_STEP_ID]: { ...authData, [field]: val }
      }));
    };

    return (
      <div className="flex flex-col gap-4 mt-4 w-full max-w-sm mx-auto animate-fade-in">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 text-left">お名前</label>
          <input 
            type="text" 
            placeholder="例：山田 太郎"
            className="w-full border-2 border-gray-200 rounded-xl p-4 text-base focus:border-orange-500 focus:ring-0 transition-colors"
            value={authData.name}
            onChange={e => handleAuthChange('name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 text-left">メールアドレス</label>
          <input 
            type="email" 
            placeholder="例：yamada@example.com"
            className="w-full border-2 border-gray-200 rounded-xl p-4 text-base focus:border-orange-500 focus:ring-0 transition-colors"
            value={authData.email}
            onChange={e => handleAuthChange('email', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 text-left">パスワード設定</label>
          <input 
            type="password" 
            placeholder="6文字以上の英数字"
            className="w-full border-2 border-gray-200 rounded-xl p-4 text-base focus:border-orange-500 focus:ring-0 transition-colors"
            value={authData.password}
            onChange={e => handleAuthChange('password', e.target.value)}
          />
        </div>
      </div>
    );
  };

  // ----- 通常の質問フォーム 描画用 -----
  const renderInput = () => {
    if (!currentStep) return null;
    
    // Auth Step の特別処理
    if (currentStep.id === AUTH_STEP_ID) {
      return renderAuthForm();
    }

    const val = answers[currentStep.id] || "";

    switch (currentStep.type) {
      case "radio":
        return (
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            {currentStep.options?.map(opt => {
              const isSelected = val === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAnswer(opt.value, true)} // true = Auto Advance
                  className={`w-full relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 group text-left
                    ${isSelected 
                      ? "border-orange-500 bg-orange-50/50 shadow-sm" 
                      : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/20"
                    }
                  `}
                >
                  <span className={`font-bold text-lg ${isSelected ? "text-orange-900" : "text-gray-700 group-hover:text-gray-900"}`}>
                    {opt.label}
                  </span>
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors
                    ${isSelected ? "border-orange-500 bg-orange-500" : "border-gray-300 group-hover:border-orange-300"}
                  `}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case "checkbox": {
        const arrVal = answers[currentStep.id] || [];
        return (
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            {currentStep.options?.map(opt => {
              const isSelected = arrVal.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`w-full relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group
                    ${isSelected 
                      ? "border-orange-500 bg-orange-50/50 shadow-sm" 
                      : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/20"
                    }
                  `}
                >
                  <input 
                    type="checkbox"
                    className="hidden"
                    value={opt.value}
                    checked={isSelected}
                    onChange={(e) => updateArrayAnswer(e.target.value, e.target.checked)}
                  />
                  <div className={`flex items-center justify-center w-6 h-6 rounded-md border-2 mr-4 transition-colors shrink-0
                    ${isSelected ? "border-orange-500 bg-orange-500" : "border-gray-300 group-hover:border-orange-300"}
                  `}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`font-bold text-lg ${isSelected ? "text-orange-900" : "text-gray-700 group-hover:text-gray-900"}`}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        );
      }

      case "select":
        return (
          <div className="w-full max-w-sm mx-auto">
             <select 
               className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg font-bold text-gray-800 focus:border-orange-500 focus:ring-0 transition-colors bg-white cursor-pointer"
               value={val}
               onChange={(e) => updateAnswer(e.target.value)}
             >
               <option value="">選択してください</option>
               {currentStep.options?.map(opt => (
                 <option key={opt.value} value={opt.value}>{opt.label}</option>
               ))}
             </select>
          </div>
        );

      case "text":
      case "number":
      case "date":
      case "time":
        return (
          <div className="w-full max-w-sm mx-auto flex items-center justify-center gap-3">
            <input 
              type={currentStep.type} 
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-xl font-bold text-center text-gray-800 focus:border-orange-500 focus:ring-0 transition-colors bg-white shadow-inner"
              placeholder={currentStep.placeholder}
              value={val}
              onChange={(e) => updateAnswer(e.target.value)}
            />
            {currentStep.unitLabel && (
              <span className="text-xl font-bold text-gray-500 shrink-0">{currentStep.unitLabel}</span>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="w-full max-w-lg mx-auto">
            <textarea 
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg font-medium text-gray-800 focus:border-orange-500 focus:ring-0 transition-colors bg-white shadow-inner min-h-[160px] resize-none"
              placeholder={currentStep.placeholder}
              value={val}
              onChange={(e) => updateAnswer(e.target.value)}
            />
          </div>
        );

      case "file":
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
            <label className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/20 transition-all group">
               <input 
                 type="file" 
                 multiple
                 className="hidden"
                 onChange={(e) => {
                   if (e.target.files && e.target.files.length > 0) {
                     const fileNames = Array.from(e.target.files).map(f => f.name).join(', ');
                     updateAnswer(fileNames);
                   } else {
                     updateAnswer("");
                   }
                 }}
               />
               <div className="w-12 h-12 bg-gray-100 group-hover:bg-orange-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                  <svg className="w-6 h-6 text-gray-500 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
               </div>
               <span className="font-bold text-gray-600 group-hover:text-orange-600">ファイルを選択する</span>
               <span className="text-sm text-gray-400 mt-1">またはドラッグ＆ドロップ</span>
            </label>
            {val && (
              <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg border border-emerald-200 text-sm font-bold flex items-center">
                 <Check className="w-4 h-4 mr-2" />
                 {val} (選択済み)
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const progressPct = ((currentStepIdx) / (visibleSteps.length - 1)) * 100;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm sm:p-6 transition-all">
      <div className="bg-gradient-to-b from-white to-orange-50/30 sm:rounded-3xl shadow-2xl w-full h-full sm:h-[85vh] sm:max-h-[800px] max-w-3xl flex flex-col overflow-hidden relative border border-white/50">
        
        {/* Header (Top Bar with Close and Progress) */}
        <div className="px-6 py-5 flex items-center justify-between shrink-0 relative z-10 w-full">
          <div className="flex-1">
             <button 
               onClick={onClose} 
               className="text-gray-400 hover:text-gray-700 transition-colors p-2 -ml-2 rounded-full hover:bg-gray-100"
             >
               <ArrowLeft className="w-6 h-6" />
             </button>
          </div>
          
          <div className="flex-1 flex justify-center w-full max-w-[200px]">
             {/* Progress Bar Container */}
             <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-out" 
                 style={{ width: `${progressPct}%` }}
               />
             </div>
          </div>

          <div className="flex-1 flex justify-end">
            {/* Skip or something could go here, for now empty for balance */}
          </div>
        </div>

        {/* Main Content Area (Slide Animation Container) */}
        <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center px-6 pb-20 sm:pb-6 w-full">
          
          <div className={`w-full max-w-2xl flex flex-col items-center justify-center pb-10 transition-all duration-300 
            ${isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}
          `}>
             
             {/* Step Info */}
             <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center justify-center px-3 py-1 bg-orange-100 text-orange-800 text-sm font-bold rounded-full">
                  {currentStepIdx === visibleSteps.length - 1 ? 'Last Step 🏁' : `${currentStepIdx + 1} / ${visibleSteps.length - 1}`}
                </span>
             </div>

             {/* Question Title */}
             <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-4 leading-tight">
               {currentStep?.title}
               {currentStep?.required && currentStep?.id !== AUTH_STEP_ID && <span className="text-red-500 ml-2">*</span>}
             </h2>

             {/* Question Description */}
             {currentStep?.description && (
               <p className="text-base text-gray-500 text-center mb-8 max-w-lg mx-auto whitespace-pre-wrap leading-relaxed">
                 {currentStep.description}
               </p>
             )}

             {/* Question Input */}
             <div className="w-full mt-4">
               {renderInput()}
             </div>

          </div>
        </div>

        {/* Bottom Navigation / Action Area (Fixed) */}
        {/* ラジオボタン以外(=Auto Advanceしないもの)や、必須じゃない・最終ステップの場合は明示的なNextボタンを出す */}
        {(currentStep?.type !== 'radio' || currentStep.id === AUTH_STEP_ID) && (
          <div className={`absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex justify-between items-center bg-gradient-to-t from-white via-white to-transparent transition-opacity duration-300
             ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            <div>
              {currentStepIdx > 0 && (
                <button 
                  onClick={goToPrevStep}
                  className="font-bold text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100"
                >
                  少し戻る
                </button>
              )}
            </div>
            
            <button 
              onClick={goToNextStep}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-lg transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(234,88,12,0.3)]
                ${isLastStep 
                  ? 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-105' 
                  : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105'
                }
              `}
            >
              {isLastStep ? '無料ではじめる' : 'つぎへ'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
