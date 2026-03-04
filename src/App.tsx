import { useState, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './app/Layout';
import { IntroSection } from './components/landing/IntroSection';
import { EventSection } from './components/landing/EventSection';
import { AboutUsSection } from './components/landing/AboutUsSection';
import { ScheduleSection } from './components/landing/ScheduleSection';
import { FinalCTASection } from './components/landing/FinalCTASection';
import { RegistrationView } from './components/registration/RegistrationView';

type View = 'landing' | 'registration';

const LandingPage = memo(({ onRegister }: { onRegister: () => void }) => {
  return (
    <div key="landing-content" className="relative">
      <IntroSection />
      <EventSection onRegister={onRegister} />
      <AboutUsSection />
      <ScheduleSection />
      <FinalCTASection onRegister={onRegister} />
    </div>
  );
});

function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingPage key="landing" onRegister={() => setView('registration')} />
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
