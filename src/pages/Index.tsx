
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Shield, Sword, Brain, Target } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <h1 className="text-5xl font-bold mb-2 text-center">
        Warrior-Scientist Quest
      </h1>
      <p className="text-xl mb-8 text-slate-300 max-w-lg text-center">
        Battle of knowledge and strategy where warriors and scientists work together to defeat their opponents.
      </p>

      <div className="flex space-x-6 mb-12">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-team-a flex items-center justify-center mb-3">
            <Sword size={64} className="text-white" />
          </div>
          <p className="text-lg font-semibold">Warriors</p>
          <p className="text-sm text-slate-300">Fight with weapons</p>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-team-b flex items-center justify-center mb-3">
            <Brain size={64} className="text-white" />
          </div>
          <p className="text-lg font-semibold">Scientists</p>
          <p className="text-sm text-slate-300">Challenge with questions</p>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-sm">
        <Button 
          className="w-full h-14 text-lg bg-gradient-to-r from-team-a to-team-b hover:opacity-90 transition-opacity" 
          onClick={() => navigate('/game')}
        >
          Start Game
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-14 text-lg border-white/20 text-white/90 hover:bg-white/10" 
          onClick={() => navigate('/rules')}
        >
          How to Play
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center">
        <Shield className="mr-2" size={20} />
        <span className="text-sm opacity-70">v1.0</span>
      </div>
    </div>
  );
};

export default Index;
