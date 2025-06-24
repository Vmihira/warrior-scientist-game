
import { Card, CardContent } from "@/components/ui/card";
import { Sword, Brain, Shield } from 'lucide-react';
import { Character } from '@/types/game';

interface TeamStatusProps {
  teamId: 'A' | 'B';
  warriorCharacter: Character;
  scientistCharacter: Character;
  maxHealth: number;
}

export const TeamStatus = ({ teamId, warriorCharacter, scientistCharacter, maxHealth }: TeamStatusProps) => {
  return (
    <Card className={`bg-team-${teamId.toLowerCase()}/10 border-team-${teamId.toLowerCase()}/30`}>
      <CardContent className="pt-4">
        <h3 className={`font-bold text-team-${teamId.toLowerCase()}-light mb-2`}>Team {teamId}</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full bg-team-${teamId.toLowerCase()}/40 flex items-center justify-center mr-2`}>
              <Sword size={12} className={`text-team-${teamId.toLowerCase()}-light`} />
            </div>
            <span>Little Soldier:</span>
          </div>
          <div className="flex items-center">
            <div className="flex">
              {Array.from({ length: maxHealth }).map((_, i) => (
                <Shield 
                  key={i} 
                  size={16} 
                  className={i < warriorCharacter.health ? `text-team-${teamId.toLowerCase()}-light` : 'text-gray-600'} 
                />
              ))}
            </div>
            <span className="ml-2">
              {warriorCharacter.weapons} <Sword size={12} className="inline" />
            </span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full bg-team-${teamId.toLowerCase()}/40 flex items-center justify-center mr-2`}>
              <Brain size={12} className={`text-team-${teamId.toLowerCase()}-light`} />
            </div>
            <span>Scientist</span>
          </div>
          <div className="flex items-center">
            <span className={`inline-block h-2 w-2 rounded-full mr-2 ${warriorCharacter.health > 0 ? `bg-team-${teamId.toLowerCase()}-light` : 'bg-gray-600'}`}></span>
            <span>Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
