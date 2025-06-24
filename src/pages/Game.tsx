
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Changed from card to button
import { ArrowLeft, Target, Sword, Shield } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { Battlefield } from '@/components/Battlefield';
import { QuestionSelector } from '@/components/QuestionSelector';
import { QuestionCard } from '@/components/QuestionCard';
import { GameOver } from '@/components/GameOver';
import { WeaponThrow } from '@/components/WeaponThrow';
import { TeamStatus } from '@/components/TeamStatus';
import { Card, CardContent } from "@/components/ui/card";
import { Team } from '@/types/game';

const Game = () => {
  const navigate = useNavigate();
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(50);
  
  const { 
    gameState, 
    selectTeam,
    selectTheme, 
    answerQuestion, 
    throwWeapon,
    checkGameEnd
  } = useGameState();

  useEffect(() => {
    checkGameEnd();
  }, [gameState.questionsAsked]);

  const handleThrowWeapon = () => {
    throwWeapon(angle, power);
  };

  // Team selection component
  const TeamSelectionScreen = () => (
    <div className="flex flex-col items-center justify-center h-[70vh] w-full">
      <h2 className="text-2xl font-bold mb-8">Choose Your Team</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <Card 
          className="border-team-a/30 hover:bg-team-a/10 transition-colors cursor-pointer"
          onClick={() => selectTeam('A')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <div className="w-24 h-24 rounded-full bg-team-a flex items-center justify-center mb-4">
              <Sword size={36} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-team-a-light">Team A</h3>
            <p className="text-center mt-2 text-slate-300">The Blue Warriors</p>
            <Button className="mt-4 bg-team-a hover:bg-team-a/80">
              Select Team A
            </Button>
          </CardContent>
        </Card>
        
        <Card 
          className="border-team-b/30 hover:bg-team-b/10 transition-colors cursor-pointer"
          onClick={() => selectTeam('B')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <div className="w-24 h-24 rounded-full bg-team-b flex items-center justify-center mb-4">
              <Shield size={36} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-team-b-light">Team B</h3>
            <p className="text-center mt-2 text-slate-300">The Red Defenders</p>
            <Button className="mt-4 bg-team-b hover:bg-team-b/80">
              Select Team B
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGameContent = () => {
    switch (gameState.phase) {
      case 'team-selection':
        return <TeamSelectionScreen />;
      case 'question-selection':
        return (
          <QuestionSelector 
            turn={gameState.turn}
            onSelectTheme={selectTheme}
            questionsAsked={gameState.questionsAsked}
            maxQuestions={gameState.maxQuestions}
          />
        );
      case 'question-answer':
        return (
          <QuestionCard 
            question={gameState.currentQuestion!}
            turn={gameState.turn}
            onAnswer={answerQuestion}
          />
        );
      case 'weapon-throw':
        return (
          <WeaponThrow
            turn={gameState.turn}
            angle={angle}
            power={power}
            setAngle={setAngle}
            setPower={setPower}
            onThrowWeapon={handleThrowWeapon}
            weaponsAvailable={gameState.characters[`${gameState.turn}-warrior`].weapons}
          />
        );
      case 'game-over':
        return (
          <GameOver 
            winner={gameState.winner} 
            teamAHealth={gameState.characters['A-warrior'].health}
            teamBHealth={gameState.characters['B-warrior'].health}
            onPlayAgain={() => navigate(0)}
            onHome={() => navigate('/')}
          />
        );
      default:
        return null;
    }
  };

  // Show simplified layout during team selection
  if (gameState.phase === 'team-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2" size={16} />
              Exit Game
            </Button>
            
            <div className="px-4 py-1 rounded-md bg-slate-800/50 flex items-center">
              <span className="text-sm text-slate-300">Warrior-Scientist Battlefield</span>
            </div>
          </div>
          
          {renderGameContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2" size={16} />
            Exit Game
          </Button>
          
          <div className="flex items-center">
            <div className="px-4 py-1 rounded-md bg-slate-800 flex items-center">
              <span className="text-sm text-slate-300 mr-2">Questions:</span>
              <span className="font-semibold">{gameState.questionsAsked}/{gameState.maxQuestions}</span>
            </div>
            
            {gameState.playerTeam && (
              <div className="ml-4 px-4 py-1 rounded-md bg-slate-800 flex items-center">
                <span className="text-sm text-slate-300 mr-2">Your Team:</span>
                <span className={`font-semibold ${gameState.playerTeam === 'A' ? 'text-team-a-light' : 'text-team-b-light'}`}>
                  Team {gameState.playerTeam}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Battlefield 
              characters={gameState.characters}
              currentTeam={gameState.turn}
              angle={angle}
              power={power}
              playerTeam={gameState.playerTeam}
            />
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <TeamStatus 
                teamId="A"
                warriorCharacter={gameState.characters['A-warrior']}
                scientistCharacter={gameState.characters['A-scientist']}
                maxHealth={gameState.maxHealth}
              />
              
              <TeamStatus 
                teamId="B"
                warriorCharacter={gameState.characters['B-warrior']}
                scientistCharacter={gameState.characters['B-scientist']}
                maxHealth={gameState.maxHealth}
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className={`p-3 mb-4 rounded-md ${gameState.turn === 'A' ? 'bg-team-a/20 border border-team-a/30' : 'bg-team-b/20 border border-team-b/30'}`}>
              <h2 className="text-lg font-bold flex items-center">
                <Target className="mr-2" size={18} /> 
                Team {gameState.turn}'s Turn
                {gameState.playerTeam === gameState.turn ? " (You)" : " (Opponent)"}
              </h2>
            </div>
            
            {renderGameContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
