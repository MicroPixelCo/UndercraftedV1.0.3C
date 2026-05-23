import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { WorldLobby } from './components/WorldLobby';
import { Settings } from './components/Settings';
import { Singleplayer } from './components/Singleplayer';

function AppContent() {
  const { user, loading } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showSingleplayer, setShowSingleplayer] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div
          className="text-stone-400 text-lg animate-pulse"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
          `
        }}
      >
        <Login />
      </div>
    );
  }

  return (
    <>
      <WorldLobby
        onSettingsClick={() => setShowSettings(true)}
        onSingleplayerClick={() => setShowSingleplayer(true)}
      />

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showSingleplayer && <Singleplayer onClose={() => setShowSingleplayer(false)} />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
