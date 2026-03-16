"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getQuestionnaireForCategory, QuestionnaireStep } from "../../data/questionnaireData";

interface QuoteWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function QuoteWizardModal({ isOpen, onClose, category }: QuoteWizardModalProps) {
  const router = useRouter();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [steps, setSteps] = useState<QuestionnaireStep[]>([]);

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
            { label: "その他（店舗・ビル・まるごと一棟など）", value: "other" }
          ]
        },
        {
          id: "prop_size",
          title: "おおよその広さ（平米数）",
          description: "分かればで構いません。",
          type: "number",
          group: "numerical",
          required: false,
          placeholder: "例：40",
          unitLabel: "平米"
        }
      ];

      const serviceSteps = getQuestionnaireForCategory(category);
      setSteps([...commonSteps, ...serviceSteps]);
      setCurrentStepIdx(0);
      setAnswers({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, category]);

  if (!isOpen) return null;

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

  const handleNext = () => {
    // Basic validation (if required)
    if (currentStep.required) {
      const val = answers[currentStep.id];
      if (!val || (Array.isArray(val) && val.length === 0)) {
        alert("この項目は入力必須です。");
        return;
      }
    }
    if (isLastStep) {
      // Submit logic
      // In a real app we'd save `answers` to a DB
      router.push('/thanks');
    } else {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIdx(prev => Math.max(0, prev - 1));
  };

  const updateAnswer = (val: any) => {
    setAnswers(prev => ({ ...prev, [currentStep.id]: val }));
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

  const renderInput = () => {
    if (!currentStep) return null;
    const val = answers[currentStep.id] || "";

    switch (currentStep.type) {
      case "select":
        return (
          <select 
            className="form-control" 
            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
            value={val}
            onChange={(e) => updateAnswer(e.target.value)}
          >
            <option value="">選択してください</option>
            {currentStep.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentStep.options?.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', cursor: 'pointer', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', background: val === opt.value ? '#fff3ed' : 'white', borderColor: val === opt.value ? '#EA580C' : '#ddd' }}>
                <input 
                  type="radio" 
                  name={currentStep.id} 
                  value={opt.value}
                  checked={val === opt.value}
                  onChange={(e) => updateAnswer(e.target.value)}
                  style={{ width: '18px', height: '18px' }}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );
      case "checkbox": {
        const arrVal = answers[currentStep.id] || [];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentStep.options?.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', cursor: 'pointer', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', background: arrVal.includes(opt.value) ? '#fff3ed' : 'white', borderColor: arrVal.includes(opt.value) ? '#EA580C' : '#ddd' }}>
                <input 
                  type="checkbox" 
                  value={opt.value}
                  checked={arrVal.includes(opt.value)}
                  onChange={(e) => updateArrayAnswer(e.target.value, e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );
      }
      case "number":
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="number" 
              className="form-control"
              style={{ width: '150px', padding: '12px', fontSize: '1rem' }}
              placeholder={currentStep.placeholder}
              value={val}
              onChange={(e) => updateAnswer(e.target.value)}
            />
            {currentStep.unitLabel && <span style={{ fontSize: '1rem' }}>{currentStep.unitLabel}</span>}
          </div>
        );
      case "text":
        return (
          <input 
            type="text" 
            className="form-control"
            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
            placeholder={currentStep.placeholder}
            value={val}
            onChange={(e) => updateAnswer(e.target.value)}
          />
        );
      case "textarea":
        return (
          <textarea 
            className="form-control"
            style={{ width: '100%', padding: '12px', fontSize: '1rem', minHeight: '120px' }}
            placeholder={currentStep.placeholder}
            value={val}
            onChange={(e) => updateAnswer(e.target.value)}
          />
        );
      case "date":
        return (
          <input 
            type="date" 
            className="form-control"
            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
            value={val}
            onChange={(e) => updateAnswer(e.target.value)}
          />
        );
      case "time":
        return (
          <input 
            type="time" 
            className="form-control"
            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
            value={val}
            onChange={(e) => updateAnswer(e.target.value)}
          />
        );
      case "file":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="file" 
              multiple
              className="form-control"
              style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
              onChange={(e) => {
                // Mocking file upload
                if (e.target.files && e.target.files.length > 0) {
                  const fileNames = Array.from(e.target.files).map(f => f.name).join(', ');
                  updateAnswer(fileNames);
                } else {
                  updateAnswer("");
                }
              }}
            />
            {val && <span style={{ fontSize: '0.9rem', color: '#16a34a', fontWeight: 'bold' }}>✓ 選択済み: {val}</span>}
          </div>
        );
      default:
        return null;
    }
  };

  const progressPct = ((currentStepIdx + 1) / visibleSteps.length) * 100;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#333' }}>
            {category} のお見積り条件
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>
        </div>

        {/* Progress Bar */}
        <div style={{ height: '4px', background: '#eee', width: '100%' }}>
          <div style={{ height: '100%', background: '#EA580C', width: `${progressPct}%`, transition: 'width 0.3s ease' }}></div>
        </div>

        {/* Body content */}
        <div style={{ padding: '30px 25px', overflowY: 'auto', flex: 1 }}>
          <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '10px', textAlign: 'center' }}>
            質問 {currentStepIdx + 1} / {visibleSteps.length}
          </div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', textAlign: 'center', color: '#111' }}>
            {currentStep?.title}
          </h3>
          {currentStep?.description && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '25px', textAlign: 'center' }}>
              {currentStep.description}
            </p>
          )}

          <div style={{ marginTop: '20px', maxWidth: '400px', margin: '0 auto' }}>
            {renderInput()}
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ padding: '20px 25px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', background: '#fff' }}>
          <button 
            type="button" 
            onClick={handleBack} 
            disabled={currentStepIdx === 0}
            style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: currentStepIdx === 0 ? 'not-allowed' : 'pointer', color: currentStepIdx === 0 ? '#ccc' : '#333', fontWeight: 'bold' }}
          >
            戻る
          </button>
          <button 
            type="button" 
            onClick={handleNext} 
            style={{ padding: '12px 30px', background: '#EA580C', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.05rem', boxShadow: '0 4px 10px rgba(234, 88, 12, 0.3)' }}
          >
            {isLastStep ? '見積もりを依頼する' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  );
}
