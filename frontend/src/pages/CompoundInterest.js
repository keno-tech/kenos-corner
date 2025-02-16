import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../styles/CompoundInterest.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CompoundInterest() {
  const [principal, setPrincipal] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compound, setCompound] = useState('12');
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const calculateInterest = (e) => {
    e.preventDefault();
    
    const p = parseFloat(principal);
    const pmt = parseFloat(monthlyContribution);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);

    // Generate data points for the graph
    const years = [];
    const principalData = [];
    const contributionsData = [];
    const totalData = [];
    
    let totalContributions = p;
    let currentAmount = p;

    for (let i = 0; i <= t; i += 0.5) {
      years.push(i);
      principalData.push(p);
      
      // Calculate amount with monthly contributions
      if (i === 0) {
        currentAmount = p;
        totalContributions = p;
      } else {
        // Add monthly contributions for this period
        const monthsInPeriod = 6; // Since we're incrementing by 0.5 years
        for (let m = 0; m < monthsInPeriod; m++) {
          currentAmount = (currentAmount + pmt) * Math.pow(1 + (r / n), n/12);
          totalContributions += pmt;
        }
      }
      
      contributionsData.push(totalContributions);
      totalData.push(currentAmount);
    }

    const finalAmount = currentAmount;
    const totalContributionAmount = totalContributions;
    const interestEarned = finalAmount - totalContributionAmount;

    setChartData({
      labels: years,
      datasets: [
        {
          label: 'Initial Principal',
          data: principalData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderDash: [5, 5],
        },
        {
          label: 'Total Contributions',
          data: contributionsData,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          borderDash: [5, 5],
        },
        {
          label: 'Total Amount with Interest',
          data: totalData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    });

    setResult({
      finalAmount: finalAmount.toFixed(2),
      totalContributions: totalContributionAmount.toFixed(2),
      interestEarned: interestEarned.toFixed(2)
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Compound Interest Growth Over Time',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ฿${context.parsed.y.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (฿)'
        },
        ticks: {
          callback: (value) => `฿${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="calculator-container">
      <h1>Compound Interest Calculator</h1>
      
      <form onSubmit={calculateInterest} className="calculator-form">
        <div className="input-group">
          <label>Initial Principal (฿)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter initial amount"
            required
          />
        </div>

        <div className="input-group">
          <label>Monthly Contribution (฿)</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="Enter monthly contribution"
            required
          />
        </div>

        <div className="input-group">
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter interest rate"
            step="0.01"
            required
          />
        </div>

        <div className="input-group">
          <label>Time (years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time in years"
            step="0.1"
            required
          />
        </div>

        <div className="input-group">
          <label>Compound Frequency</label>
          <select 
            value={compound} 
            onChange={(e) => setCompound(e.target.value)}
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <button type="submit">Calculate</button>
      </form>

      {result && (
        <>
          <div className="results">
            <h2>Results</h2>
            <div className="result-item">
              <span>Final Amount:</span>
              <span className="amount">฿{parseFloat(result.finalAmount).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span>Total Contributions:</span>
              <span className="amount">฿{parseFloat(result.totalContributions).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span>Interest Earned:</span>
              <span className="amount">฿{parseFloat(result.interestEarned).toLocaleString()}</span>
            </div>
          </div>

          <div className="chart-container">
            <Line options={chartOptions} data={chartData} />
          </div>
        </>
      )}
    </div>
  );
}

export default CompoundInterest; 