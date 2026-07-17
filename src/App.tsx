import { useState } from 'react';
import UsMap from './components/UsMap';
import MapStats from './components/MapStats';
import YearSlider, { YEAR_MAX } from './components/YearSlider';
import './App.css';

function App() {
  const [year, setYear] = useState(YEAR_MAX);
  const [testMode, setTestMode] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>US Area Codes</h1>
        <p>A history of the North American Numbering Plan, 1947–today</p>
      </header>
      <main>
        {/* In test mode the slider is frozen at its current year and the
            quiz targets that year's map. */}
        <UsMap year={year} testMode={testMode} onTestModeChange={setTestMode} />
        <MapStats year={year} />
      </main>
      <YearSlider year={year} onChange={setYear} disabled={testMode} />
    </div>
  );
}

export default App;
