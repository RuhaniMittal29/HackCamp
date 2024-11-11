import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './dashboard.css';

// Icons can be imported from a package like react-icons or defined as SVG components
const Icons = {
  Droplet: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Utensils: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18M3 12h18M3 7h18"/>
    </svg>
  ),
  Activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
};

const PASTEL_COLORS = {
  water: '#A8E6CF',
  sleep: '#DCEDC1',
  meals: '#FFD3B6',
  exercise: '#FFAAA5'
};

const wellnessData = {
  water: Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, value: Math.floor(Math.random() * 10) + 1 })),
  sleep: Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, value: Math.floor(Math.random() * 4) + 5 })),
  meals: Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, value: Math.floor(Math.random() * 3) + 1 })),
  exercise: Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, value: Math.floor(Math.random() * 60) + 15 }))
};

const getMetricIcon = (metric) => {
  switch (metric) {
    case 'water':
      return <Icons.Droplet />;
    case 'sleep':
      return <Icons.Moon />;
    case 'meals':
      return <Icons.Utensils />;
    case 'exercise':
      return <Icons.Activity />;
    default:
      return null;
  }
};

const getMetricUnit = (metric) => {
  const units = {
    water: 'glasses',
    sleep: 'hours',
    meals: 'meals',
    exercise: 'minutes'
  };
  return units[metric] || '';
};

const getStreakIcons = (metric, streak) => {
  const icons = [];
  const maxIcons = 7;
  const filledIcons = Math.min(streak, maxIcons);
  const emojis = {
    water: '🥛',
    sleep: '🌙',
    meals: '🍎',
    exercise: '🏋️'
  };

  for (let i = 0; i < maxIcons; i++) {
    icons.push(
      <span 
        key={i} 
        className={`streak-icon ${i < filledIcons ? 'active' : ''}`}
      >
        {emojis[metric]}
      </span>
    );
  }
  return icons;
};

function WellnessDashboard() {
  const [activeMetric, setActiveMetric] = useState('water');

  const getStreakCount = (metric) => {
    const data = wellnessData[metric];
    let streak = 0;
    const targets = { water: 8, sleep: 7, meals: 3, exercise: 30 };
    
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].value >= targets[metric]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getMonthlyAverage = (metric) => {
    const data = wellnessData[metric];
    const sum = data.reduce((acc, day) => acc + day.value, 0);
    return (sum / data.length).toFixed(1);
  };

  const getWeeklyData = (metric) => {
    return wellnessData[metric].slice(-7);
  };

  const getMonthlyPieData = (metric) => {
    const data = wellnessData[metric];
    const targets = { water: 8, sleep: 7, meals: 3, exercise: 30 };
    const target = targets[metric];
    const metTarget = data.filter(day => day.value >= target).length;
    const belowTarget = data.length - metTarget;
    return [
      { name: 'Met Target', value: metTarget },
      { name: 'Below Target', value: belowTarget }
    ];
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="metric-buttons">
          {['water', 'sleep', 'meals', 'exercise'].map((metric) => (
            <button
              key={metric}
              className={`metric-button ${activeMetric === metric ? 'active' : ''}`}
              onClick={() => setActiveMetric(metric)}
              style={{
                '--button-color': PASTEL_COLORS[metric]
              }}
            >
              {getMetricIcon(metric)}
            </button>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Weekly Progress</h2>
              <div className="weekly-chart">
                {getWeeklyData(activeMetric).map((day, index) => (
                  <div key={index} className="bar-container">
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill"
                        style={{
                          height: `${(day.value / Math.max(...getWeeklyData(activeMetric).map(d => d.value))) * 100}%`,
                          backgroundColor: PASTEL_COLORS[activeMetric]
                        }}
                      ></div>
                    </div>
                    <span className="bar-label">{day.date.slice(-2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Monthly Progress</h2>
              <div className="pie-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getMonthlyPieData(activeMetric)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill={PASTEL_COLORS[activeMetric]}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell key="cell-0" fill={PASTEL_COLORS[activeMetric]} />
                      <Cell key="cell-1" fill="#E0E0E0" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Current Streak</h2>
              <div className="streak-container">
                <div className="streak-icons">
                  {getStreakIcons(activeMetric, getStreakCount(activeMetric))}
                </div>
                <div className="streak-count">{getStreakCount(activeMetric)} days</div>
                <div className="streak-message">
                  Keep up your {activeMetric} streak!
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Monthly Average</h2>
              <div className="average-container">
                <div 
                  className="average-value"
                  style={{ color: PASTEL_COLORS[activeMetric] }}
                >
                  {getMonthlyAverage(activeMetric)}
                </div>
                <div className="average-unit">
                  {getMetricUnit(activeMetric)} per day
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card overview-card">
          <div className="card-content">
            <h2 className="card-title">Overview</h2>
            <div className="overview-grid">
              {['water', 'sleep', 'meals', 'exercise'].map((metric) => (
                <div key={metric} className="overview-item">
                  <div 
                    className="overview-icon"
                    style={{ backgroundColor: PASTEL_COLORS[metric] }}
                  >
                    {getMetricIcon(metric)}
                  </div>
                  <div className="overview-metric">{metric.charAt(0).toUpperCase() + metric.slice(1)}</div>
                  <div className="overview-value">{getMonthlyAverage(metric)}</div>
                  <div className="overview-unit">{getMetricUnit(metric)} per day</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WellnessDashboard;
