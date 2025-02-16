import React, { useState } from 'react';
import '../styles/BurningRope.css';

function BurningRope() {
  const [step, setStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: "Initial State",
      description: "You have two ropes. Each rope takes exactly 1 hour to burn from end to end, but burns non-uniformly (different sections may burn at different rates)."
    },
    {
      title: "Step 1",
      description: "Light the first rope from both ends and the second rope from one end."
    },
    {
      title: "Step 2",
      description: "When the first rope is completely burned (after 30 minutes), light the other end of the second rope."
    },
    {
      title: "Final Step",
      description: "When the second rope burns completely, exactly 45 minutes have passed! (30 minutes from the first rope + 15 minutes from the second rope)"
    }
  ];

  const handleSimulate = () => {
    setIsAnimating(true);
    setStep(0);
    
    // Animation timeline
    setTimeout(() => setStep(1), 1000);
    setTimeout(() => setStep(2), 4000);
    setTimeout(() => setStep(3), 7000);
    setTimeout(() => setIsAnimating(false), 8000);
  };

  return (
    <div className="burning-rope-container">
      <h1>The Burning Rope Problem</h1>
      
      <div className="problem-statement">
        <h2>Problem:</h2>
        <p>You have two ropes that each take exactly 1 hour to burn from end to end.</p>
        <p>The ropes burn non-uniformly (different sections may burn at different speeds).</p>
        <p>How can you measure exactly 45 minutes using just these ropes and a lighter?</p>
      </div>

      <div className="visualization">
        <div className="ropes">
          <div className="rope-container">
            <div className={`rope rope1 ${
              step >= 1 ? 'burning-both' : ''
            } ${step >= 2 ? 'burned' : ''}`}>
              <div className="flame left"></div>
              <div className="flame right"></div>
            </div>
            <div className="label">Rope 1</div>
          </div>

          <div className="rope-container">
            <div className={`rope rope2 ${
              step >= 1 ? 'burning-left' : ''
            } ${step >= 2 ? 'burning-both' : ''} ${
              step >= 3 ? 'burned' : ''
            }`}>
              <div className="flame left"></div>
              <div className="flame right"></div>
            </div>
            <div className="label">Rope 2</div>
          </div>
        </div>

        <div className="controls">
          <button 
            onClick={handleSimulate}
            disabled={isAnimating}
          >
            {isAnimating ? 'Simulating...' : 'Simulate Solution'}
          </button>
          <button 
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        </div>

        <div className="step-description">
          <h3>{steps[step].title}</h3>
          <p>{steps[step].description}</p>
        </div>

        {showSolution && (
          <div className="solution">
            <h3>Solution Explanation:</h3>
            <ol>
              <li>Light the first rope from both ends and the second rope from one end.</li>
              <li>The first rope will burn completely in 30 minutes (half of its usual time) because it's burning from both ends.</li>
              <li>When the first rope is completely burned (30 minutes mark), light the other end of the second rope.</li>
              <li>The second rope has been burning for 30 minutes from one end, so it has 30 minutes worth of rope left.</li>
              <li>By lighting the other end now, it will burn the remaining rope in 15 minutes (half of the remaining time).</li>
              <li>Total time: 30 minutes (first rope) + 15 minutes (second rope) = 45 minutes</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default BurningRope; 