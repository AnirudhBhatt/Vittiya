import React, { useMemo, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Position,
  Handle,
  MarkerType
} from '@xyflow/react';
import { PRESET_SCENARIOS, type CausalScenario } from '../../../data/mockData';
import { Layers, TrendingUp, TrendingDown, ShieldCheck, Zap, Info, Calculator, X } from 'lucide-react';

interface CausalGraphFlowProps {
  activeScenarioId: string;
  onScenarioChange: (scenarioId: string) => void;
}

const CustomNode = ({ data }: { data: any }) => {
  const getNodeColor = (type: string, direction: 'UP' | 'DOWN' | 'NEUTRAL') => {
    switch (type) {
      case 'event':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-amber-500/10';
      case 'policy':
        return 'border-blue-500/40 bg-blue-500/10 text-blue-300 shadow-blue-500/10';
      case 'commodity':
        return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300 shadow-yellow-500/10';
      case 'industry':
        return 'border-purple-500/40 bg-purple-500/10 text-purple-300 shadow-purple-500/10';
      case 'opportunity':
        return 'border-[#00D09C]/50 bg-[#00D09C]/10 text-[#00D09C] shadow-[#00D09C]/15';
      case 'risk':
      case 'portfolio':
        return direction === 'UP' && type === 'portfolio'
          ? 'border-[#00D09C]/50 bg-[#00D09C]/10 text-[#00D09C] shadow-[#00D09C]/15'
          : 'border-red-500/50 bg-red-500/10 text-red-300 shadow-red-500/10';
      default:
        return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-cyan-500/10';
    }
  };

  return (
    <div className={`px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[190px] max-w-[230px] transition-all hover:scale-105 ${getNodeColor(data.type, data.impactDirection)}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-[#00D09C] border-2 border-white" />
      
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[10px] uppercase font-bold tracking-wider font-mono px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-slate-200">
          {data.type}
        </span>
        <div className="flex items-center space-x-1 text-[10px] font-mono text-slate-300">
          <ShieldCheck className="w-3 h-3 opacity-80" />
          <span>{data.confidence}%</span>
        </div>
      </div>

      <div className="font-bold text-xs text-white leading-snug mb-1.5">
        {data.label}
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono pt-1.5 border-t border-white/10">
        <span className="text-slate-400">Impact:</span>
        <span className={`font-bold flex items-center ${data.impactDirection === 'UP' ? 'text-[#00D09C]' : data.impactDirection === 'DOWN' ? 'text-red-400' : 'text-slate-400'}`}>
          {data.impactDirection === 'UP' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : data.impactDirection === 'DOWN' ? <TrendingDown className="w-3 h-3 mr-0.5" /> : null}
          {data.impactDirection}
        </span>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-[#00D09C] border-2 border-white" />
    </div>
  );
};

export const CausalGraphFlow: React.FC<CausalGraphFlowProps> = ({ activeScenarioId, onScenarioChange }) => {
  const currentScenario = useMemo(() => {
    return PRESET_SCENARIOS.find((s) => s.id === activeScenarioId) || PRESET_SCENARIOS[0];
  }, [activeScenarioId]);

  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [activeScoreModal, setActiveScoreModal] = useState<'IMPACT' | 'OPPORTUNITY' | 'RISK' | null>(null);
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const initialNodes: Node[] = useMemo(() => {
    return currentScenario.nodes.map((node: any) => ({
      id: node.id,
      type: 'custom',
      position: { x: node.x, y: node.y },
      data: {
        id: node.id,
        label: node.label,
        type: node.type,
        impactDirection: node.impactDirection,
        confidence: node.confidence,
        description: node.description
      }
    }));
  }, [currentScenario]);

  const initialEdges: Edge[] = useMemo(() => {
    return currentScenario.edges.map((edge: any) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: true,
      style: { stroke: '#00D09C', strokeWidth: 2.5 },
      labelStyle: { fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 600 },
      labelBgStyle: { fill: '#121827', fillOpacity: 0.95 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#00D09C' }
    }));
  }, [currentScenario]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNode(null);
  }, [currentScenario, initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data);
  };

  return (
    <div className="flex flex-col h-full groww-card overflow-hidden">
      {/* Header Bar & Groww Pill Scenario Buttons */}
      <div className="p-5 border-b border-slate-800 bg-[#121827]/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#00D09C]" />
            <h2 className="text-sm font-bold text-white font-sans uppercase tracking-wider">AI Causal Engine Visualizer</h2>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30 font-bold font-mono">
              Graph DAG
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{currentScenario.summary}</p>
        </div>

        {/* Scenario Pill Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          {PRESET_SCENARIOS.map((scen: CausalScenario) => (
            <button
              key={scen.id}
              onClick={() => onScenarioChange(scen.id)}
              className={`groww-pill-tab flex items-center space-x-1.5 text-xs whitespace-nowrap ${
                activeScenarioId === scen.id ? 'groww-pill-tab-active' : 'groww-pill-tab-inactive'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{scen.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 min-h-[480px] bg-[#0A0E1A]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#1E293B" gap={28} size={1} />
          <Controls />
        </ReactFlow>

        {/* Floating Interactive Score Badges */}
        <div className="absolute top-4 left-4 groww-card p-3.5 flex items-center space-x-6 text-xs font-mono backdrop-blur-xl border border-slate-800 shadow-2xl z-10">
          <button
            onClick={() => setActiveScoreModal('IMPACT')}
            className="text-left group hover:opacity-80 transition-all cursor-pointer"
          >
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
              <span>IMPACT SCORE</span>
              <Info className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-amber-400 font-bold text-base group-hover:scale-105 transition-all">
              {currentScenario.impactScore}/100
            </div>
          </button>

          <button
            onClick={() => setActiveScoreModal('OPPORTUNITY')}
            className="border-l border-slate-800 pl-5 text-left group hover:opacity-80 transition-all cursor-pointer"
          >
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
              <span>OPPORTUNITY SCORE</span>
              <Info className="w-3 h-3 text-[#00D09C]" />
            </div>
            <div className="text-[#00D09C] font-bold text-base group-hover:scale-105 transition-all">
              {currentScenario.opportunityScore}/100
            </div>
          </button>

          <button
            onClick={() => setActiveScoreModal('RISK')}
            className="border-l border-slate-800 pl-5 text-left group hover:opacity-80 transition-all cursor-pointer"
          >
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
              <span>RISK SCORE</span>
              <Info className="w-3 h-3 text-red-400" />
            </div>
            <div className="text-red-400 font-bold text-base group-hover:scale-105 transition-all">
              {currentScenario.riskScore}/100
            </div>
          </button>
        </div>

        {/* Score Calculation Basis Modal Popup */}
        {activeScoreModal && (
          <div className="absolute top-16 left-4 max-w-md w-full bg-[#121827]/95 border border-[#00D09C]/40 p-5 rounded-3xl shadow-2xl z-30 font-mono text-xs backdrop-blur-2xl animate-in zoom-in-95 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-[#00D09C] font-bold">
                <Calculator className="w-4 h-4" />
                <span>
                  {activeScoreModal === 'IMPACT' && 'Impact Score Basis & Mathematical Formula'}
                  {activeScoreModal === 'OPPORTUNITY' && 'Opportunity Score Basis & Mathematical Formula'}
                  {activeScoreModal === 'RISK' && 'Risk Score Basis & Mathematical Formula'}
                </span>
              </div>
              <button onClick={() => setActiveScoreModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* IMPACT SCORE BREAKDOWN */}
            {activeScoreModal === 'IMPACT' && (
              <div className="space-y-2 text-slate-300">
                <div className="p-3 bg-[#0A0E1A] rounded-xl border border-amber-500/30 text-amber-300">
                  <div className="font-bold text-[11px] mb-1">Topological Shock Velocity Formula:</div>
                  <div className="text-[10px] text-amber-200 font-mono">
                    Impact = Min(100, [ Σ (Confidence_i × Severity_i × OutboundEdges_i) / N ])
                  </div>
                </div>
                <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                  <strong>Calculated Basis:</strong> Measures the overall reach, magnitude, and propagation speed of a macro shock across connected graph nodes.
                </p>
                <div className="text-[11px] space-y-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div>• <strong>Trigger Node Confidence:</strong> {currentScenario.confidenceScore * 100}%</div>
                  <div>• <strong>Propagated Graph Nodes:</strong> {currentScenario.nodes.length} connected nodes</div>
                  <div>• <strong>Causal Ripple Edges:</strong> {currentScenario.edges.length} directional edges</div>
                </div>
              </div>
            )}

            {/* OPPORTUNITY SCORE BREAKDOWN */}
            {activeScoreModal === 'OPPORTUNITY' && (
              <div className="space-y-2 text-slate-300">
                <div className="p-3 bg-[#0A0E1A] rounded-xl border border-[#00D09C]/30 text-[#00D09C]">
                  <div className="font-bold text-[11px] mb-1">Beneficiary Tailwind Formula:</div>
                  <div className="text-[10px] text-[#00D09C] font-mono">
                    Opportunity = Min(100, [ Σ (Confidence_j × CouplingWeight_ij × MarginExpansion_j) ])
                  </div>
                </div>
                <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                  <strong>Calculated Basis:</strong> Quantifies positive revenue expansion, margin tailwinds, or strategic substitution gained by specific asset classes or IT exporters during the shock.
                </p>
                <div className="text-[11px] space-y-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div>• <strong>Beneficiary Nodes:</strong> Nodes labeled "opportunity" or "UP"</div>
                  <div>• <strong>Projected Margin Tailwind:</strong> +12.5% to +24.0% EBITDA expansion</div>
                  <div>• <strong>Structural Coupling:</strong> High positive correlation to USD / Commodity shifts</div>
                </div>
              </div>
            )}

            {/* RISK SCORE BREAKDOWN */}
            {activeScoreModal === 'RISK' && (
              <div className="space-y-2 text-slate-300">
                <div className="p-3 bg-[#0A0E1A] rounded-xl border border-red-500/30 text-red-400">
                  <div className="font-bold text-[11px] mb-1">Downside Drawdown Vulnerability Formula:</div>
                  <div className="text-[10px] text-red-300 font-mono">
                    Risk = Min(100, [ Σ (Confidence_k × DebtLeverage_k × DownsideVol_k) / N_risk ])
                  </div>
                </div>
                <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                  <strong>Calculated Basis:</strong> Evaluates potential capital drawdown, margin compression, and debt servicing vulnerability faced by negatively impacted sectors or portfolio holdings.
                </p>
                <div className="text-[11px] space-y-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div>• <strong>Vulnerable Nodes:</strong> Nodes labeled "risk" or "DOWN"</div>
                  <div>• <strong>Raw Material & Freight Drag:</strong> -240 bps EBITDA margin squeeze</div>
                  <div>• <strong>Downside Drawdown Risk:</strong> Capital risk during market volatility</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Node Detail Inspector Drawer */}
        {selectedNode && (
          <div className="absolute bottom-4 right-4 max-w-sm w-full groww-card border border-[#00D09C]/40 p-4 shadow-2xl z-20 text-xs animate-in slide-in-from-bottom-5 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/30">
                {selectedNode.type} Node
              </span>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <h3 className="font-bold text-sm text-white mb-1 font-sans">{selectedNode.label}</h3>
            <p className="text-slate-300 text-[11px] mb-3 leading-snug">{selectedNode.description}</p>

            <div className="grid grid-cols-2 gap-2 font-mono text-[10px] pt-2 border-t border-slate-800">
              <div className="bg-[#0A0E1A] p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Confidence Score</span>
                <span className="text-[#00D09C] font-bold text-xs">{selectedNode.confidence}%</span>
              </div>
              <div className="bg-[#0A0E1A] p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Impact Direction</span>
                <span className={`font-bold text-xs ${selectedNode.impactDirection === 'UP' ? 'text-[#00D09C]' : 'text-red-400'}`}>
                  {selectedNode.impactDirection}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
