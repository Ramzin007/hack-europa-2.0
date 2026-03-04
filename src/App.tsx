import { useState, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './app/Layout';

// New Modular Sections
import IntroScroll from './components/sections/intro-scroll';
import CountdownSection from './components/sections/countdown';
import AboutSection from './components/sections/about';
import ScheduleSection from './components/sections/schedule';

import { FinalCTASection } from './components/landing/FinalCTASection';
import { RegistrationView } from './components/registration/RegistrationView';

type View = 'landing' | 'registration';

const LandingPage = memo(({ onRegister }: { onRegister: () => void }) => {
  return (
    <div key="landing-content" className="relative">
      <IntroScroll />
      <CountdownSection onRegister={onRegister} />
      <AboutSection />
      <ScheduleSection />
      <FinalCTASection onRegister={onRegister} />
    </div>
  );
});

function App() {
  const [view, setView] = useState<View>('landing');

  const handleRegister = () => {
    window.location.assign('https://docs.google.com/forms/u/0/');
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingPage key="landing" onRegister={handleRegister} />
        ) : (
          <div key="registration">
            <RegistrationView onBack={() => setView('landing')} />
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
