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
  visitors: number; // in thousands (K)
  pageviews: number; // in thousands (K)
  engagement: number; // in percentage %
}

const SPORTS_ROOM_IMPACT_DATA: MetricPoint[] = [
  { month: 'May', visitors: 14.2, pageviews: 42.5, engagement: 62 },
  { month: 'Jun', visitors: 28.5, pageviews: 89.2, engagement: 68 },
  { month: 'Jul', visitors: 56.4, pageviews: 182.0, engagement: 74 },
  { month: 'Aug', visitors: 98.7, pageviews: 310.5, engagement: 81 },
  { month: 'Sep', visitors: 164.0, pageviews: 520.8, engagement: 86 },
  { month: 'Oct', visitors: 248.6, pageviews: 795.0, engagement: 89 },
];

export const SportsRoomImpactChart: React.FC = () => {
  return (
    <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-[#07130d] via-[#090e18] to-[#0d0a1b] border border-emerald-500/30 shadow-xl shadow-emerald-950/30 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>PROJECT IMPACT & ANALYTICS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-wide flex items-center gap-2">
            <span>The Sports Room Growth Telemetry</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Live engagement trajectory representing active unique monthly visitors (in thousands) and organic fan retention since deployment.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-emerald-500/20 text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Peak Reach</span>
            <span className="text-base sm:text-lg font-black font-display text-emerald-300">248K+ / mo</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-cyan-500/20 text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Growth</span>
            <span className="text-base sm:text-lg font-black font-display text-cyan-300">+1,650%</span>
          </div>
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-64 sm:h-72 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={SPORTS_ROOM_IMPACT_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="sportsRoomBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.95} />
                <stop offset="50%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#065f46" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.07)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}K`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as MetricPoint;
                  return (
                    <div className="glass-card rounded-2xl p-3 border border-emerald-500/40 bg-[#090e18]/95 shadow-xl text-xs space-y-1.5 font-mono">
                      <div className="font-bold text-white font-display border-b border-white/10 pb-1">
                        {label} 2026 Overview
                      </div>
                      <div className="flex items-center justify-between gap-4 text-emerald-300">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> Unique Visitors:
                        </span>
                        <span className="font-bold">{data.visitors}K</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-cyan-300">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Total Pageviews:
                        </span>
                        <span className="font-bold">{data.pageviews}K</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-purple-300">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" /> Fan Retention:
                        </span>
                        <span className="font-bold">{data.engagement}%</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="visitors"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            >
              {SPORTS_ROOM_IMPACT_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === SPORTS_ROOM_IMPACT_DATA.length - 1
                      ? 'url(#sportsRoomBarGradient)'
                      : '#10b981'
                  }
                  opacity={0.7 + (index / SPORTS_ROOM_IMPACT_DATA.length) * 0.3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 mt-2 border-t border-white/10 relative z-10 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-2.5">
          <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-bold block">SEO Dominance</span>
            <span className="text-slate-400 text-[11px]">Ranked for high-intent sports queries across cricket and football.</span>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-2.5">
          <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-bold block">Telemetry & Scores</span>
            <span className="text-slate-400 text-[11px]">Real-time match data pipeline handling thousands of concurrent queries.</span>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-2.5">
          <Users className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-bold block">Viral Fan Engagement</span>
            <span className="text-slate-400 text-[11px]">Daily interactive quizzes and fan leaderboards driving return traffic.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
