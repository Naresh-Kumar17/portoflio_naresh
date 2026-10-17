import { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, ScatterChart as ScatterIcon, Code, Database } from 'lucide-react';
import './DataVisualizer.css';

interface DataPoint {
  x: number;
  y: number;
  label: string;
  category: string;
}

export function DataVisualizer() {
  const [dataset, setDataset] = useState<'study-grades' | 'housing' | 'churn'>('study-grades');
  const [chartType, setChartType] = useState<'scatter' | 'bar'>('scatter');
  const [activeTab, setActiveTab] = useState<'chart' | 'code' | 'summary'>('chart');
  const [noiseLevel, setNoiseLevel] = useState<number>(15);

  // Generate synthetic but realistic dataset based on selection
  const rawData: DataPoint[] = useMemo(() => {
    const points: DataPoint[] = [];
    if (dataset === 'study-grades') {
      // Study hours vs exam score
      const categories = ['Group A', 'Group B', 'Group C'];
      for (let i = 1; i <= 24; i++) {
        const hours = 2 + (i * 0.8) + (Math.sin(i) * 0.5);
        const noise = ((i * 7) % 19 - 9) * (noiseLevel / 20);
        const score = Math.min(100, Math.max(30, Math.round(45 + hours * 2.8 + noise)));
        points.push({
          x: Math.round(hours * 10) / 10,
          y: score,
          label: `Student ${i}`,
          category: categories[i % 3],
        });
      }
    } else if (dataset === 'housing') {
      // Square footage (hundreds) vs Price ($k)
      for (let i = 1; i <= 20; i++) {
        const sqft = 8 + i * 1.5;
        const noise = ((i * 13) % 23 - 11) * (noiseLevel / 15);
        const price = Math.round(150 + sqft * 12 + noise * 5);
        points.push({
          x: Math.round(sqft * 100),
          y: price,
          label: `House ${i}`,
          category: i % 2 === 0 ? 'Suburban' : 'Urban',
        });
      }
    } else {
      // Tenure months vs Customer Satisfaction (1-10)
      for (let i = 1; i <= 22; i++) {
        const tenure = 2 + i * 2.5;
        const noise = ((i * 11) % 17 - 8) * (noiseLevel / 30);
        const sat = Math.min(10, Math.max(1, Math.round((4 + Math.log(tenure) * 1.6 + noise) * 10) / 10));
        points.push({
          x: Math.round(tenure),
          y: sat,
          label: `User ${i}`,
          category: sat > 6 ? 'Retained' : 'At Risk',
        });
      }
    }
    return points;
  }, [dataset, noiseLevel]);

  // Derived statistics
  const stats = useMemo(() => {
    const xs = rawData.map((d) => d.x);
    const ys = rawData.map((d) => d.y);
    const n = rawData.length;

    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;

    // Pearson correlation
    let num = 0;
    let denX = 0;
    let denY = 0;
    for (let i = 0; i < n; i++) {
      const dx = xs[i] - meanX;
      const dy = ys[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }
    const r = denX > 0 && denY > 0 ? num / Math.sqrt(denX * denY) : 0;

    return {
      count: n,
      meanX: meanX.toFixed(1),
      meanY: meanY.toFixed(1),
      correlation: r.toFixed(3),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
    };
  }, [rawData]);

  // Python equivalent code snippet
  const pythonCode = useMemo(() => {
    return `# Replicating this analysis in Python with pandas & seaborn
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load dataset
df = pd.DataFrame([
    # ${stats.count} records loaded from ${dataset}
])

# Summary Statistics
print(df.describe())
print(f"Pearson Correlation (r): {df['x'].corr(df['y']):.3f}")

# Plotting
plt.figure(figsize=(8, 5))
sns.regplot(
    data=df, x='x', y='y',
    scatter_kws={'alpha': 0.7, 'color': '#06b6d4'},
    line_kws={'color': '#8b5cf6', 'linewidth': 2}
)
plt.title('${dataset.replace('-', ' ').toUpperCase()} Analysis')
plt.grid(True, linestyle='--', alpha=0.3)
plt.show()`;
  }, [dataset, stats]);

  // Scalers for SVG rendering
  const minX = stats.minX;
  const maxX = stats.maxX;
  const minY = stats.minY;
  const maxY = stats.maxY;

  const svgWidth = 600;
  const svgHeight = 280;
  const padding = 45;

  const getSvgX = (x: number) => {
    if (maxX === minX) return padding;
    return padding + ((x - minX) / (maxX - minX)) * (svgWidth - padding * 2);
  };

  const getSvgY = (y: number) => {
    if (maxY === minY) return svgHeight / 2;
    return (
      svgHeight -
      padding -
      ((y - minY) / (maxY - minY)) * (svgHeight - padding * 2)
    );
  };

  return (
    <div className="data-visualizer card">
      <div className="data-visualizer__header">
        <div>
          <div className="data-visualizer__badge">
            <TrendingUp size={14} />
            <span>Interactive Data Sandbox</span>
          </div>
          <h3 className="data-visualizer__title">Live Exploratory Data Engine</h3>
          <p className="data-visualizer__subtitle">
            Experiment with sample distributions, calculate correlations on the fly, and inspect the underlying Python code.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="data-visualizer__tabs">
          <button
            type="button"
            className={`dv-tab ${activeTab === 'chart' ? 'dv-tab--active' : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            <BarChart3 size={15} />
            <span>Visual</span>
          </button>
          <button
            type="button"
            className={`dv-tab ${activeTab === 'summary' ? 'dv-tab--active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            <Database size={15} />
            <span>Stats</span>
          </button>
          <button
            type="button"
            className={`dv-tab ${activeTab === 'code' ? 'dv-tab--active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <Code size={15} />
            <span>Python</span>
          </button>
        </div>
      </div>

      {/* Control bar */}
      <div className="data-visualizer__controls">
        <div className="dv-control-group">
          <label htmlFor="dv-dataset-select" className="dv-label">Dataset:</label>
          <select
            id="dv-dataset-select"
            value={dataset}
            onChange={(e) => setDataset(e.target.value as any)}
            className="dv-select"
          >
            <option value="study-grades">Study Hours vs. Exam Score</option>
            <option value="housing">House Size (sqft) vs. Price ($k)</option>
            <option value="churn">Customer Tenure vs. Satisfaction</option>
          </select>
        </div>

        <div className="dv-control-group">
          <label htmlFor="dv-chart-type-select" className="dv-label">Chart:</label>
          <div className="dv-btn-toggle" id="dv-chart-type-select">
            <button
              type="button"
              className={`dv-toggle-btn ${chartType === 'scatter' ? 'dv-toggle-btn--active' : ''}`}
              onClick={() => setChartType('scatter')}
              title="Scatter Plot"
            >
              <ScatterIcon size={14} />
              <span>Scatter</span>
            </button>
            <button
              type="button"
              className={`dv-toggle-btn ${chartType === 'bar' ? 'dv-toggle-btn--active' : ''}`}
              onClick={() => setChartType('bar')}
              title="Bar Chart"
            >
              <BarChart3 size={14} />
              <span>Bar</span>
            </button>
          </div>
        </div>

        <div className="dv-control-group dv-control-group--slider">
          <label htmlFor="dv-noise-slider" className="dv-label">
            Variance: <span className="dv-val">{noiseLevel}%</span>
          </label>
          <input
            id="dv-noise-slider"
            type="range"
            min="0"
            max="40"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(Number(e.target.value))}
            className="dv-slider"
            aria-label="Dataset Variance / Noise level"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="data-visualizer__content">
        {activeTab === 'chart' && (
          <div className="dv-chart-container">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="dv-svg"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Interactive Data Chart"
            >
              {/* Background gridlines */}
              <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="var(--border-secondary)" strokeDasharray="3 3" />
              <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="var(--border-secondary)" strokeDasharray="3 3" />
              <line x1={padding} y1={(svgHeight) / 2} x2={svgWidth - padding} y2={(svgHeight) / 2} stroke="var(--border-secondary)" strokeDasharray="2 4" strokeOpacity="0.5" />
              <line x1={(svgWidth) / 2} y1={padding} x2={(svgWidth) / 2} y2={svgHeight - padding} stroke="var(--border-secondary)" strokeDasharray="2 4" strokeOpacity="0.5" />

              {/* Axis labels */}
              <text x={padding} y={svgHeight - 15} fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-mono)">
                min: {minX}
              </text>
              <text x={svgWidth - padding - 40} y={svgHeight - 15} fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-mono)">
                max: {maxX}
              </text>
              <text x={10} y={padding + 5} fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-mono)">
                {maxY}
              </text>
              <text x={10} y={svgHeight - padding} fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-mono)">
                {minY}
              </text>

              {/* Trendline for scatter */}
              {chartType === 'scatter' && (
                <line
                  x1={getSvgX(minX)}
                  y1={getSvgY(Number(stats.meanY) - (Number(stats.correlation) * (maxY - minY) * 0.35))}
                  x2={getSvgX(maxX)}
                  y2={getSvgY(Number(stats.meanY) + (Number(stats.correlation) * (maxY - minY) * 0.35))}
                  stroke="var(--accent-primary)"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  opacity="0.9"
                />
              )}

              {/* Points or Bars */}
              {chartType === 'scatter' ? (
                rawData.map((d, i) => {
                  const cx = getSvgX(d.x);
                  const cy = getSvgY(d.y);
                  return (
                    <g key={i} className="dv-point-group">
                      <circle
                        cx={cx}
                        cy={cy}
                        r="6"
                        className="dv-point"
                      />
                      <title>{`${d.label}: (${d.x}, ${d.y})`}</title>
                    </g>
                  );
                })
              ) : (
                rawData.slice(0, 16).map((d, i) => {
                  const barWidth = ((svgWidth - padding * 2) / 16) - 6;
                  const bx = padding + i * (((svgWidth - padding * 2) / 16)) + 3;
                  const barHeight = Math.max(4, ((d.y - minY) / (maxY - minY || 1)) * (svgHeight - padding * 2));
                  const by = svgHeight - padding - barHeight;

                  return (
                    <g key={i} className="dv-bar-group">
                      <rect
                        x={bx}
                        y={by}
                        width={barWidth}
                        height={barHeight}
                        rx="3"
                        className="dv-bar"
                      />
                      <title>{`${d.label}: ${d.y}`}</title>
                    </g>
                  );
                })
              )}
            </svg>

            {/* Quick Metrics Overlay */}
            <div className="dv-metrics-strip">
              <div className="dv-metric-item">
                <span className="dv-metric-label">Data Points (N)</span>
                <span className="dv-metric-val">{stats.count}</span>
              </div>
              <div className="dv-metric-item">
                <span className="dv-metric-label">Mean Y</span>
                <span className="dv-metric-val">{stats.meanY}</span>
              </div>
              <div className="dv-metric-item">
                <span className="dv-metric-label">Correlation (r)</span>
                <span className="dv-metric-val dv-metric-val--highlight">{stats.correlation}</span>
              </div>
              <div className="dv-metric-item">
                <span className="dv-metric-label">Relationship</span>
                <span className="dv-metric-val">
                  {Number(stats.correlation) > 0.6
                    ? 'Strong Positive'
                    : Number(stats.correlation) > 0.3
                    ? 'Moderate Positive'
                    : 'Weak / Non-linear'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="dv-summary-container">
            <table className="dv-table">
              <thead>
                <tr>
                  <th>Observation</th>
                  <th>Feature X</th>
                  <th>Feature Y</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {rawData.slice(0, 8).map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.label}</td>
                    <td>{row.x}</td>
                    <td>{row.y}</td>
                    <td>
                      <span className="dv-chip">{row.category}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="dv-table-footnote">Showing top 8 rows of {rawData.length} total records.</p>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="dv-code-container">
            <pre className="dv-code">
              <code>{pythonCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
