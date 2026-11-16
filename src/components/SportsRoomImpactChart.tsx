import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendingUp, Users, Eye, Activity, Award } from 'lucide-react';

interface MetricPoint {
  month: string;
  engagementIndex: number;
  contentVelocity: number;
  retentionRate: number;
}

const SPORTS_ROOM_IMPACT_DATA: MetricPoint[] = [
  { month: 'May', engagementIndex: 22, contentVelocity: 38, retentionRate: 58 },
  { month: 'Jun', engagementIndex: 35, contentVelocity: 54, retentionRate: 64 },
  { month: 'Jul', engagementIndex: 49, contentVelocity: 70, retentionRate: 69 },
  { month: 'Aug', engagementIndex: 66, contentVelocity: 84, retentionRate: 75 },
  { month: 'Sep', engagementIndex: 82, contentVelocity: 92, retentionRate: 81 },
  { month: 'Oct', engagementIndex: 96, contentVelocity: 100, retentionRate: 85 },
];

export const SportsRoomImpactChart: React.FC = () => {
  return (
    <div className="mb-8 p-6 rounded-3xl bg-white/[0.04] border border-white/[0.12] relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-[#3B82F6] font-mono text-[11px] font-semibold mb-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Project Impact &amp; Platform Overview</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-display text-[#F8FAFC]">
            The Sports Room Engagement Progression
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl leading-relaxed">
            Illustrative monthly engagement index (0–100 scale) reflecting content output cadence, SEO topic coverage, and interactive fan participation across cricket and football hubs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <div className="px-3.5 py-2 rounded-2xl bg-[#080D1B]/80 border border-white/[0.12] text-right">
            <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">Primary Scope</span>
            <span className="text-xs sm:text-sm font-bold font-display text-[#F8FAFC]">Sports Media &amp; SEO</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-[#080D1B]/80 border border-white/[0.12] text-right">
            <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">Role</span>
            <span className="text-xs sm:text-sm font-bold font-display text-[#8B5CF6]">Co-Founder &amp; AI Dev</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0 bg-[#080D1B]/75 rounded-2xl border border-white/[0.1] p-3">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={230}>
          <BarChart
            data={SPORTS_ROOM_IMPACT_DATA}
            margin={{ top: 10, right: 12, left: -18, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.14)' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as MetricPoint;
                  return (
                    <div className="rounded-2xl p-3 border border-white/[0.16] bg-[#0D1425]/95 backdrop-blur-xl shadow-2xl text-xs space-y-1.5 font-mono text-[#94A3B8]">
                      <div className="font-bold text-[#F8FAFC] font-display border-b border-white/[0.1] pb-1">
                        {label} Snapshot
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#3B82F6]">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> Engagement Index:
                        </span>
                        <span className="font-bold">{data.engagementIndex} / 100</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#8B5CF6]">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Topic Coverage Index:
                        </span>
                        <span className="font-bold">{data.contentVelocity} / 100</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#F8FAFC]">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" /> Return Activity Score:
                        </span>
                        <span className="font-bold">{data.retentionRate}%</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="engagementIndex" radius={[8, 8, 0, 0]} animationDuration={900}>
              {SPORTS_ROOM_IMPACT_DATA.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === SPORTS_ROOM_IMPACT_DATA.length - 1 ? '#8B5CF6' : '#3B82F6'}
                  opacity={0.68 + (index / SPORTS_ROOM_IMPACT_DATA.length) * 0.32}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-2 relative z-10 text-xs">
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-start gap-2.5">
          <Award className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#F8FAFC] font-bold block">SEO &amp; AEO Architecture</span>
            <span className="text-[#94A3B8] text-[11px] leading-relaxed">
              Structured match hubs, Schema.org markup, and topic-clustered sports editorial guides.
            </span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-start gap-2.5">
          <Activity className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#F8FAFC] font-bold block">Cricket Telemetry &amp; Stats</span>
            <span className="text-[#94A3B8] text-[11px] leading-relaxed">
              Live match coverage workflows, player comparison modules, and tactical breakdowns.
            </span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-start gap-2.5">
          <Users className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#F8FAFC] font-bold block">Interactive Fan Loops</span>
            <span className="text-[#94A3B8] text-[11px] leading-relaxed">
              Daily sports quizzes and monthly leaderboards designed for repeat community visits.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
