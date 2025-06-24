
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Team } from '@/types/game';
import { Trophy, RefreshCw, Home, Sword, Shield } from 'lucide-react';

interface GameOverProps {
  winner?: Team;
  teamAHealth: number;
  teamBHealth: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

export const GameOver = ({ winner, teamAHealth, teamBHealth, onPlayAgain, onHome }: GameOverProps) => {
  const isDraw = !winner;
  
  return (
    <Card className="w-full bg-slate-800/70 border-slate-700">
      <CardHeader>
        <CardTitle className="text-center text-2xl flex justify-center items-center">
          <Trophy className={`mr-3 ${winner === 'A' ? 'text-team-a-light' : winner === 'B' ? 'text-team-b-light' : 'text-yellow-500'}`} size={28} />
          {isDraw ? 'Game Ended in a Draw' : `Team ${winner} Wins!`}
        </CardTitle>
        <CardDescription className="text-center">
          {isDraw 
            ? 'Both teams fought valiantly!'
            : `Team ${winner} successfully defeated their opponents!`
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-md ${winner === 'A' ? 'bg-team-a/20 border border-team-a/30' : 'bg-slate-700/30'}`}>
            <h3 className="font-semibold text-center text-lg text-team-a-light mb-2">Team A</h3>
            <div className="flex justify-center items-center mb-3 space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Shield 
                  key={i} 
                  size={20} 
                  className={i < teamAHealth ? 'text-team-a' : 'text-gray-600'} 
                />
              ))}
            </div>
            <p className="text-center text-sm">
              {winner === 'A' 
                ? 'Victory!'
                : winner === 'B'
                  ? 'Defeated'
                  : 'Drew the battle'
              }
            </p>
          </div>
          
          <div className={`p-4 rounded-md ${winner === 'B' ? 'bg-team-b/20 border border-team-b/30' : 'bg-slate-700/30'}`}>
            <h3 className="font-semibold text-center text-lg text-team-b-light mb-2">Team B</h3>
            <div className="flex justify-center items-center mb-3 space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Shield 
                  key={i} 
                  size={20} 
                  className={i < teamBHealth ? 'text-team-b' : 'text-gray-600'} 
                />
              ))}
            </div>
            <p className="text-center text-sm">
              {winner === 'B' 
                ? 'Victory!'
                : winner === 'A'
                  ? 'Defeated'
                  : 'Drew the battle'
              }
            </p>
          </div>
        </div>
        
        {/* Stats could go here in a real implementation */}
        <div className="text-center">
          <p className="text-lg font-semibold">
            {isDraw 
              ? 'What an epic battle!'
              : `Team ${winner} warriors and scientists worked together for the win!`
            }
          </p>
          <p className="text-sm mt-2 text-slate-400">
            Knowledge and strategy led to victory.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button 
          onClick={onPlayAgain} 
          className="w-full bg-gradient-to-r from-team-a to-team-b hover:opacity-90"
        >
          <RefreshCw className="mr-2" size={16} />
          Play Again
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-white/20 text-white/90 hover:bg-white/10"
          onClick={onHome}
        >
          <Home className="mr-2" size={16} />
          Return to Home
        </Button>
      </CardFooter>
    </Card>
  );
};
