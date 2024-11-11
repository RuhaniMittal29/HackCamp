import { useState, useEffect } from 'react';
import './dashboard.css';

const PASTEL_COLORS = {
  water: '#A8E6CF',
  sleep: '#DCEDC1',
  meals: '#FFD3B6',
  exercise: '#FFAAA5'
};

function WellnessDashboard() {
  const [metricData, setMetricData] = useState({
    water: [],
    exercise: [],
    sleep: [],
    meals: []
  });
  const [chartUrls, setChartUrls] = useState({});

  useEffect(() => {
    // Retrieve and set metric data from localStorage
    const updatedData = {};
    ['water', 'exercise', 'sleep', 'meals'].forEach(type => {
      const val = JSON.parse(localStorage.getItem(type)) || [];
      updatedData[type] = val.map(Number); // Convert each entry to a number
    });
    setMetricData(updatedData);

    // Generate chart URLs using QuickChart
    const newChartUrls = {};
    ['water', 'exercise', 'sleep', 'meals'].forEach(metric => {
      newChartUrls[metric] = generateChartUrl(metric, updatedData[metric]);
    });
    setChartUrls(newChartUrls);
  }, []);

  // Function to generate a QuickChart URL for a given metric and its data
  const generateChartUrl = (metric, data) => {
    const chartConfig = {
      type: 'bar',
      data: {
        labels: Array.from({ length: data.length }, (_, i) => `Day ${i + 1}`),
        datasets: [
          {
            label: `${metric.charAt(0).toUpperCase() + metric.slice(1)} Intake`,
            data: data,
            backgroundColor: PASTEL_COLORS[metric],
            borderColor: PASTEL_COLORS[metric],
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: `${metric.charAt(0).toUpperCase() + metric.slice(1)} Intake Over Time`
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const chartConfigString = encodeURIComponent(JSON.stringify(chartConfig));
    return `https://quickchart.io/chart?c=${chartConfigString}`;
  };

  return (
    <div className="dashboard">
      <h2>Your Wellness Dashboard</h2>
      {Object.entries(metricData).map(([metric, values]) => (
        <div key={metric} className="metric-section">
          <h3>{metric.charAt(0).toUpperCase() + metric.slice(1)}</h3>
          {values.length > 0 ? (
            <img
              src={chartUrls[metric]}
              alt={`${metric} intake chart`}
              className="metric-chart"
            />
          ) : (
            <p>No data available</p>
          )}
        </div>
      ))}
    </div>
  

    // <div className="dashboard">
    //   <div className="dashboard-container">
    //     <h1 className="dashboard-title">Wellness Dashboard</h1>

    //     <div className="metric-buttons">
    //       {['water', 'sleep', 'meals', 'exercise'].map((metric) => (
    //         <button
    //           key={metric}
    //           className={`metric-button ${activeMetric === metric ? 'active' : ''}`}
    //           onClick={() => setActiveMetric(metric)}
    //           style={{
    //             '--button-color': PASTEL_COLORS[metric]
    //           }}
    //         >
    //           {getMetricIcon(metric)}
    //         </button>
    //       ))}
    //     </div>

    //     <div className="dashboard-grid">
    //       <div className="card">
    //         <div className="card-content">
    //           <h2 className="card-title">Weekly Progress</h2>
    //           <div className="weekly-chart">
    //             {getWeeklyData(activeMetric).map((day, index) => (
    //               <div key={index} className="bar-container">
    //                 <div className="bar-wrapper">
    //                   <div 
    //                     className="bar-fill"
    //                     style={{
    //                       height: `${(day.value / Math.max(...getWeeklyData(activeMetric).map(d => d.value))) * 100}%`,
    //                       backgroundColor: PASTEL_COLORS[activeMetric]
    //                     }}
    //                   ></div>
    //                 </div>
    //                 <span className="bar-label">{day.date.slice(-2)}</span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="card">
    //         <div className="card-content">
    //           <h2 className="card-title">Monthly Progress</h2>
    //           <div className="pie-chart">
    //             <ResponsiveContainer width="100%" height="100%">
    //               <PieChart>
    //                 <Pie
    //                   data={getMonthlyPieData(activeMetric)}
    //                   cx="50%"
    //                   cy="50%"
    //                   outerRadius={80}
    //                   fill={PASTEL_COLORS[activeMetric]}
    //                   dataKey="value"
    //                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
    //                 >
    //                   <Cell key="cell-0" fill={PASTEL_COLORS[activeMetric]} />
    //                   <Cell key="cell-1" fill="#E0E0E0" />
    //                 </Pie>
    //               </PieChart>
    //             </ResponsiveContainer>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="card">
    //         <div className="card-content">
    //           <h2 className="card-title">Current Streak</h2>
    //           <div className="streak-container">
    //             <div className="streak-icons">
    //               {getStreakIcons(activeMetric, getStreakCount(activeMetric))}
    //             </div>
    //             <div className="streak-count">{getStreakCount(activeMetric)} days</div>
    //             <div className="streak-message">
    //               Keep up your {activeMetric} streak!
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="card">
    //         <div className="card-content">
    //           <h2 className="card-title">Monthly Average</h2>
    //           <div className="average-container">
    //             <div 
    //               className="average-value"
    //               style={{ color: PASTEL_COLORS[activeMetric] }}
    //             >
    //               {getMonthlyAverage(activeMetric)}
    //             </div>
    //             <div className="average-unit">
    //               {getMetricUnit(activeMetric)} per day
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="card overview-card">
    //       <div className="card-content">
    //         <h2 className="card-title">Overview</h2>
    //         <div className="overview-grid">
    //           {['water', 'sleep', 'meals', 'exercise'].map((metric) => (
    //             <div key={metric} className="overview-item">
    //               <div 
    //                 className="overview-icon"
    //                 style={{ backgroundColor: PASTEL_COLORS[metric] }}
    //               >
    //                 {getMetricIcon(metric)}
    //               </div>
    //               <div className="overview-metric">{metric.charAt(0).toUpperCase() + metric.slice(1)}</div>
    //               <div className="overview-value">{getMonthlyAverage(metric)}</div>
    //               <div className="overview-unit">{getMetricUnit(metric)} per day</div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default WellnessDashboard;