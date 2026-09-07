import React, { useState } from 'react';
import {
  Layers,
  Server,
  Cloud,
  ArrowRightLeft,
  ShieldCheck,
  Cpu,
  FileCode2,
  Table,
  CheckCircle2
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hybrid' | 'suite' | 'plugandplay' | 'pricing' | 'policy'>('hybrid');

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
            IMPIX ArcOS 백서
          </span>
          <span className="text-xs text-slate-500">
            하이브리드 아키텍처 · Plug & Play 표준 규약 · 3층 과금 모델 · 무중단 패치
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
          ArcOS 플랫폼 마켓플레이스 기획 & 아키텍처 명세
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          공정 데이터 사내 격리 원칙, 24종 Smart Factory 조합 구조, AI 에이전트 매니페스트 규약 등 핵심 설계 원칙을 인터랙티브하게 확인합니다.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-medium">
        {[
          { id: 'hybrid', label: '1. 하이브리드 배포 모델', icon: Cloud },
          { id: 'suite', label: '2. Smart Factory & AI 2-SKU', icon: Layers },
          { id: 'plugandplay', label: '3. Plug & Play 규약', icon: FileCode2 },
          { id: 'pricing', label: '4. 3층 과금 & 성장 축', icon: Table },
          { id: 'policy', label: '5. 운영 정책 & 읽기전용 보존', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'hybrid' && (
          <div className="space-y-5">
            {/* Visual Boundary Diagram */}
            <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-blue-400 font-semibold uppercase">
                  Data Boundary Architecture
                </span>
                <span className="text-xs text-slate-400">
                  제약·식품 고객사 보안 심사 필수 통과 기준
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                {/* Control Plane */}
                <div className="md:col-span-3 bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <Cloud className="w-4 h-4" />
                    <span>제어 평면 (Control Plane - SaaS)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    SaaS 상에서 테넌트, 가입, 과금, 카탈로그 및 배포 오케스트레이션을 총괄합니다.
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-700/60">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>ArcOS 포털 (테넌트 SSO, 사용자 권한)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>앱 카탈로그 및 4대 조건 사전 점검</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>메타·모델 레지스트리 (컨테이너 이미지, 매니페스트)</span>
                    </li>
                  </ul>
                  <div className="text-[11px] text-red-300 font-semibold bg-red-950/40 p-2 rounded border border-red-900/50">
                    ⚠️ 원본 도메인 데이터는 SaaS에 절대 저장되지 않음
                  </div>
                </div>

                {/* Tunnel Bridge */}
                <div className="md:col-span-1 flex flex-col items-center justify-center py-2 text-center">
                  <div className="w-full flex md:flex-col items-center justify-center gap-2">
                    <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-blue-500/50"></div>
                    <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                      <ArrowRightLeft className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-blue-500/50"></div>
                  </div>
                  <span className="text-[11px] font-mono text-blue-300 mt-2 font-bold">
                    ArcTunnel
                  </span>
                  <span className="text-[10px] text-slate-400">mTLS 암호화</span>
                </div>

                {/* Data Plane */}
                <div className="md:col-span-3 bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Server className="w-4 h-4" />
                    <span>데이터 평면 (Data Plane - 온프레미스)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    지역별 온프레미스 사업장 노드 방화벽 내부에서 데이터 원본과 sLM 모델을 보호합니다.
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-700/60">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>B²LAB 데이터레이크 (AAS/OPC-UA 온톨로지 표준)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>도메인 DB 원본 (MES, ERP, 설비 PLC, 내부 문서)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>학습·추론 런타임 (사내 GPU 노드에서 sLM 추론)</span>
                    </li>
                  </ul>
                  <div className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                    🔒 공정 데이터·사내 문서 원본 외부 유출 원천 차단
                  </div>
                </div>
              </div>

              {/* Data crossing the boundary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-blue-300 font-semibold block mb-1">
                    ↓ SaaS에서 온프레미스로 내려가는 것:
                  </span>
                  <p className="text-slate-400">
                    앱 컨테이너 이미지, 환경 설정 매니페스트, AI 모델 파라미터 정의, 배포 명령
                  </p>
                </div>
                <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-emerald-300 font-semibold block mb-1">
                    ↑ 온프레미스에서 SaaS로 올라가는 것:
                  </span>
                  <p className="text-slate-400">
                    실행 상태 하트비트, 가동률 성능 메트릭, 보안 감사 로그, 과금 정산용 사용량 카운터
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suite' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                1. Smart Factory 24가지 조합 구조적 근거
              </h3>
              <p className="text-slate-600 leading-relaxed">
                MES 3종(제약 특화, 식품·화장품 특화, 일반 제조)은 공정 규제와 밸리데이션 요구사항이 상이하여
                <strong>상호 배타적(하나만 선택)</strong>입니다. 반면 품질·기록·공급망을 담당하는 EBRS, REMS, SCM은
                <strong>자유 조합</strong>입니다.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-slate-800 border border-slate-200">
                실질 조합 수 = MES (3종 중 1개) × 확장 모듈 (2³ = 8가지) = <strong>총 24가지</strong>
              </div>
              <p className="text-slate-500">
                업종별 고정 번들 패키지만으로는 이 24가지 고객 수요를 모두 충족할 수 없으므로,
                <strong>모듈 개별 과금</strong>을 채택하는 구조적 근거가 됩니다.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                2. AI 계층의 2개 SKU 분리 (A²LAB vs 슈퍼바이저)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-blue-50/60 rounded-lg border border-blue-200 space-y-1.5">
                  <div className="font-bold text-blue-900 text-xs">A²LAB (에이전트 모듈 생성기)</div>
                  <p className="text-slate-600">
                    품질 예측, 설비 예지, 규정 검토 같은 도메인 에이전트 모듈을 제작·학습시키는 <strong>공장</strong> 역할입니다.
                  </p>
                </div>
                <div className="p-3.5 bg-indigo-50/60 rounded-lg border border-indigo-200 space-y-1.5">
                  <div className="font-bold text-indigo-900 text-xs">다중 AI Agent 슈퍼바이저 (오케스트레이션)</div>
                  <p className="text-slate-600">
                    만들어진 개별 에이전트들의 판단을 교차 검증하고 충돌을 조율하는 <strong>지휘 런타임</strong>입니다.
                  </p>
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed">
                에이전트가 1~2개일 때는 오케스트레이션이 필요 없으므로 초기에는 A²LAB 상위 티어에 포함시키고,
                사내 에이전트가 3개 이상 가동되는 대규모 고객부터 별도 SKU로 분리 판매하는 경로를 제공합니다.
              </p>
            </div>

            {/* ArcMind vs MES Distinction */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>3. ArcMind (노코드 빌더) vs 기성 스마트팩토리 스위트의 명확한 역할 구분</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                <strong>ArcMind</strong>는 사내 IT/소프트웨어 전담 인력을 보유한 기업이 기성 MES 제품에 종속되지 않고, 
                자체적으로 No-Code/Low-Code 컴포넌트를 드래그앤드롭하여 공장별 맞춤형 Smart Factory 플랫폼을 직접 구축할 수 있는 전문 빌더입니다.
              </p>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 text-xs">
                <strong>💡 중복 구매 방지 정책:</strong> 기성 MES 스위트를 도입하는 경우 대부분의 공정·배치·설비 화면이 이미 완성되어 공급되므로, ArcMind와의 중복 구성을 방지하기 위해 마켓플레이스와 견적 시뮬레이터에서 상호 배타적 검토 및 분리 가이드를 제공합니다.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plugandplay' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-blue-600" />
                <span>새 모듈 추가에 기존 코드 수정이 없는 5대 Plug & Play 규약</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">① 패키징 규약 (Container + Manifest)</span>
                  <p className="text-slate-600">
                    모든 앱은 OCI 표준 컨테이너 이미지와 JSON 매니페스트로 등록됩니다. 매니페스트에 요구 데이터 스키마, 노출 API, 의존 앱을 선언합니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">② 데이터 규약 (AAS, OPC-UA, KS X 9101)</span>
                  <p className="text-slate-600">
                    앱은 레거시 DB를 직접 보지 않고 B²LAB 온톨로지 계층만 조회합니다. 고객사마다 상이한 DB 구조를 앱이 알 필요가 없습니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">③ 인증·권한 규약 (ArcOS Tenant SSO)</span>
                  <p className="text-slate-600">
                    테넌트 단위 통합 SSO를 ArcOS가 독점 소유하며, 앱별 권한 매트릭스는 ArcMind 컴포넌트 레벨까지 일관되게 제어됩니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">④ 이벤트 규약 (공통 Pub/Sub Event Bus)</span>
                  <p className="text-slate-600">
                    앱 간 통신은 직접 결합하지 않고 이벤트 버스를 통합니다. 설비 알람 이벤트에 컨센스봇이 구독하는 방식으로 상호 연동됩니다.
                  </p>
                </div>
              </div>

              {/* AI Agent Manifest */}
              <div className="p-3.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] space-y-1">
                <span className="text-blue-400 font-bold block mb-1">
                  A²LAB 생성 에이전트 매니페스트 예시 (JSON Spec):
                </span>
                <pre className="overflow-x-auto text-slate-300">
{`{
  "agent_id": "agent-quality-prediction-v2",
  "judgement_target": "압출 공정 두께 불량 사전 예측",
  "required_inputs": ["tag.sensor.thickness.stream", "tag.motor.temp"],
  "confidence_output_format": { "score": "float[0..1]", "basis_factors": "array" }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                3층 과금 모델 & 모듈별 자연 성장 축
              </h3>
              <p className="text-slate-600 leading-relaxed">
                단가는 고정하고 할인은 볼륨 구간에서만 제공합니다. 고객이 최소 조합으로 시작해도
                사업 성장에 따라 청구액이 자연스럽게 연동되는 구조입니다.
              </p>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">모듈</th>
                      <th className="p-2.5">자연 성장 축</th>
                      <th className="p-2.5">과금 기준</th>
                      <th className="p-2.5">성장 메커니즘</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-semibold">플랫폼 기본료</td>
                      <td className="p-2.5 text-slate-500">데이터 저장 용량 구간</td>
                      <td className="p-2.5 font-mono">월 300만원 (1TB 포함)</td>
                      <td className="p-2.5">고정 앵커로 기본 진입 장벽 확보</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">MES 3종</td>
                      <td className="p-2.5 font-bold text-blue-700">생산 라인 수</td>
                      <td className="p-2.5 font-mono">라인당 40~80만원</td>
                      <td className="p-2.5">공장 증설 시 라인 추가 구독</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">EBRS</td>
                      <td className="p-2.5 font-bold text-blue-700">배치 기록 건수</td>
                      <td className="p-2.5 font-mono">월 120만원 (기본 배치)</td>
                      <td className="p-2.5">생산량 증가 시 종량 초과</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">REMS / A.ESG</td>
                      <td className="p-2.5 font-bold text-blue-700">센서 계측점 수</td>
                      <td className="p-2.5 font-mono">월 90~130만원</td>
                      <td className="p-2.5">계측 센서 설치 구역 확대</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">A²LAB</td>
                      <td className="p-2.5 font-bold text-blue-700">추론 호출 수</td>
                      <td className="p-2.5 font-mono">월 150만원 + 호출 종량</td>
                      <td className="p-2.5">AI 모듈 상시 가동량 비례</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">컨센스봇</td>
                      <td className="p-2.5 font-bold text-blue-700">사용자 수</td>
                      <td className="p-2.5 font-mono">월 180만원 (동시 20유저)</td>
                      <td className="p-2.5">QA/QC/생산 관리 인원 확대</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policy' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                운영 정책: 규제 데이터 [읽기 전용 보존] & 런타임 지원 정책
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
                  <span className="font-bold text-amber-900 text-xs block">
                    1. 제3의 상태: [읽기 전용 보존] 상태
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    EBRS나 품질 모듈을 해지했을 때, 이미 생성된 전자 제조기록은 제약·식품 규제상 5~10년간 법적 보존 의무가 있습니다.
                    따라서 단순 ‘활성’과 ‘해지’ 외에, 저렴한 유지비용으로 데이터 무결성을 보존하는
                    <strong>[읽기 전용 보존] 상태</strong>와 보존 요금을 운영합니다.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-xs block">
                    2. N, N-1 버전 이중 지원 원칙
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    고객사 온프레미스 런타임 갱신 시점이 저마다 다르므로, SaaS 제어 평면은
                    <strong>현재 버전(v4.2)과 직전 버전(v4.1) 2개 버전</strong>만을 동시 지원합니다.
                    이 원칙이 없으면 2~3년 뒤 하위 호환성 유지 비용으로 제품이 붕괴합니다.
                  </p>
                </div>
                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2">
                  <span className="font-bold text-blue-900 text-xs block">
                    3. 24/7 무중단 롤링 패치 원칙
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    24시간 가동되는 제조 라인의 특성상 유지보수를 위한 다운타임은 허용되지 않습니다.
                    Blue/Green 및 온프레미스 노드 롤링 업데이트로 <strong>무중단 핫픽스</strong>를 적용하며, 
                    플랫폼 내 '무중단 패치노트' 메뉴에서 변경 이력과 롤백 보증 상태를 즉시 추적합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
