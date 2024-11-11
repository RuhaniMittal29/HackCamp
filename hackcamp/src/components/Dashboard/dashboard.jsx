import React, { useState, useEffect } from 'react';
import './dashboard.css';

const PASTEL_COLORS = {
  water: '#A8E6CF',
  sleep: '#DCEDC1',
  meals: '#FFD3B6',
  exercise: '#FFAAA5'
};

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

const getMetricIcon = (metric) => {
  const IconComponent = Icons[{
    water: 'Droplet',
    sleep: 'Moon',
    meals: 'Utensils',
    exercise: 'Activity'
  }[metric]];
  return IconComponent ? <IconComponent /> : null;
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

const getMetricLabel = (metric) => {
  const labels = {
    water: 'Water Intake',
    sleep: 'Sleep Duration',
    meals: 'Healthy Meals',
    exercise: 'Exercise Duration'
  };
  return labels[metric] || metric;
};

function WellnessDashboard() {
  const [activeMetric, setActiveMetric] = useState('water');
  const [wellnessData, setWellnessData] = useState(() => {
    const savedData = localStorage.getItem('wellnessData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {};
  });
  const [todayInputs, setTodayInputs] = useState({
    water: [],
    sleep: [],
    meals: [],
    exercise: []
  });

  useEffect(() => {
    localStorage.setItem('wellnessData', JSON.stringify(wellnessData));
  }, [wellnessData]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getToday = () => formatDate(new Date());

  const handleInputChange = (metric, value) => {
    setTodayInputs(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = getToday();
    
    const newData = { ...wellnessData };
    Object.keys(todayInputs).forEach(metric => {
      if (!newData[metric]) {
        newData[metric] = [];
      }
      // Remove existing entry for today if it exists
      newData[metric] = newData[metric].filter(entry => entry.date !== today);
      // Add new entry
      if (todayInputs[metric] !== '') {
        newData[metric].push({
          date: today,
          value: parseFloat(todayInputs[metric])
        });
      }
    });

    setWellnessData(newData);
    setTodayInputs({
      water: '',
      sleep: '',
      meals: '',
      exercise: ''
    });
  };

  const getLast7Days = (metric) => {
    const data = wellnessData[metric] || [];
    return data.slice(-7);
  };

  const getMetricProgress = (metric) => {
    const data = wellnessData[metric] || [];
    if (data.length === 0) return 0;

    const targets = { water: 8, sleep: 7, meals: 3, exercise: 30 };
    const target = targets[metric];
    const metTarget = data.filter(day => day.value >= target).length;
    return Math.round((metTarget / data.length) * 100);
  };

  const getStreakCount = (metric) => {
    const data = wellnessData[metric] || [];
    if (data.length === 0) return 0;

    let streak = 0;
    const targets = { water: 8, sleep: 7, meals: 3, exercise: 30 };
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i].value >= targets[metric]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getMonthlyAverage = (metric) => {
    const data = wellnessData[metric] || [];
    if (data.length === 0) return 0;
    
    const sum = data.reduce((acc, day) => acc + day.value, 0);
    return (sum / data.length).toFixed(1);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Wellness Dashboard</h1>

        {/* Input Form */}
        <div className="card input-card">
          <div className="card-content">
            <h2 className="card-title">Log Today's Activities</h2>
            <form onSubmit={handleSubmit} className="input-form">
              <div className="input-grid">
                {['water', 'sleep', 'meals', 'exercise'].map((metric) => (
                  <div key={metric} className="input-group">
                    <label htmlFor={metric} className="input-label">
                      {getMetricLabel(metric)} ({getMetricUnit(metric)})
                    </label>
                    <input
                      type="number"
                      id={metric}
                      value={todayInputs[metric]}
                      onChange={(e) => handleInputChange(metric, e.target.value)}
                      placeholder={`Enter ${metric} amount`}
                      min="0"
                      step={metric === 'sleep' ? "0.5" : "1"}
                      className="metric-input"
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="submit-button">
                Log Today's Progress
              </button>
            </form>
          </div>
        </div>

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
                {getLast7Days(activeMetric).map((day, index) => (
                  <div key={index} className="bar-container">
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill"
                        style={{
                          height: `${(day.value / Math.max(...getLast7Days(activeMetric).map(d => d.value))) * 100}%`,
                          backgroundColor: PASTEL_COLORS[activeMetric]
                        }}
                      ></div>
                    </div>
                    <span className="bar-label">{11}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Monthly Progress</h2>
              <div className="progress-chart-container">
                <div className="circle-progress">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle
                      className="circle-bg"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#E0E0E0"
                      strokeWidth="8"
                    />
                    <circle
                      className="circle-progress-bar"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={PASTEL_COLORS[activeMetric]}
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - getMetricProgress(activeMetric) / 100)}
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="50" textAnchor="middle" dy=".3em" className="circle-text">
                      {getMetricProgress(activeMetric)}%
                    </text>
                  </svg>
                </div>
                <div className="progress-label">of days met target</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Current Streak</h2>
              <div className="streak-container">
                <div className="streak-value">
                  {getStreakCount(activeMetric)} days
                </div>
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
      </div>
    </div>
  );
}

export default WellnessDashboard;