
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Sword, Brain, Target } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const Rules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <Button 
        variant="ghost" 
        className="mb-6 text-white/70 hover:text-white hover:bg-white/10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Home
      </Button>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">How to Play</h1>
        
        <div className="space-y-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Sword className="mr-3" /> Game Overview
              </h2>
              <p className="text-slate-300">
                Warrior-Scientist Quest is a battle of knowledge and strategy. 
                Each team has two key roles: Warrior and Scientist. As a player, you'll perform both roles during the game.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Brain className="mr-3" /> Teams & Roles
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li><span className="font-semibold text-team-a-light">Team A (Blue)</span> - Has a Warrior and a Scientist</li>
                <li><span className="font-semibold text-team-b-light">Team B (Red)</span> - Has a Warrior and a Scientist</li>
                <li><span className="font-semibold">Warriors</span> - Fight with weapons and try to defeat the opposing Warrior</li>
                <li><span className="font-semibold">Scientists</span> - Challenge the opposing Warrior with questions</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Target className="mr-3" /> Game Rules
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>Warriors start with zero weapons.</li>
                <li>To earn weapons, Warriors must answer questions posed by the opposing team's Scientist.</li>
                <li>If a Warrior answers correctly, they earn a weapon.</li>
                <li>Warriors can throw weapons at specific angles to hit the opposing Warrior.</li>
                <li>A Warrior loses when hit by weapons 3 times.</li>
                <li>Each Scientist can ask a maximum of 5 different questions.</li>
                <li>Questions are selected from different themes: General Knowledge, Logical Reasoning, Programming, Vocabulary, English Grammar, and Basic Mathematics.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Shield className="mr-3" /> Winning & Losing
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li>If a Warrior can hit the opposing Warrior 3 times, they win.</li>
                <li>If a Warrior fails to earn weapons (by answering incorrectly) or misses their throws, they may lose.</li>
                <li>The game ends when one Warrior is hit 3 times or all questions have been asked.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            className="bg-gradient-to-r from-team-a to-team-b hover:opacity-90 transition-opacity px-8 py-6 h-auto text-lg"
            onClick={() => navigate('/game')}
          >
            Start Playing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
