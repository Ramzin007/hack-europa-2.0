import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './app/Layout';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { StatsSection } from './components/landing/StatsSection';
import { RegistrationView } from './components/registration/RegistrationView';

type View = 'landing' | 'registration';

function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <div key="landing">
            <HeroSection onNavigateRegistration={() => setView('registration')} />
            <StatsSection />
            <AboutSection />
          </div>
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
