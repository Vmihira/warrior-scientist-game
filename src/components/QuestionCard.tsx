
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, Team } from '@/types/game';
import { Brain, HelpCircle, Clock } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  turn: Team;
  onAnswer: (selectedOption: number) => void;
}

export const QuestionCard = ({ question, turn, onAnswer }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  
  // In a real implementation, you would have a countdown timer
  // This is just a placeholder for the UI
  
  return (
    <Card className="w-full bg-slate-800/70 border-slate-700">
      <CardHeader className="border-b border-slate-700/50">
        <CardTitle className="flex items-center">
          <div className={`mr-2 ${turn === 'A' ? 'text-team-a-light' : 'text-team-b-light'}`}>
            <HelpCircle size={18} />
          </div>
          <span className={turn === 'A' ? 'text-team-a-light' : 'text-team-b-light'}>
            Team {turn} Warrior
          </span>
        </CardTitle>
        <CardDescription>
          Answer this question correctly to earn a weapon
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex justify-between items-center px-2">
          <span className="text-xs uppercase tracking-wider text-slate-300 font-medium">
            {question.theme.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
          <div className="flex items-center text-amber-400 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{timeRemaining}s</span>
          </div>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-md">
          <p className="font-semibold text-lg text-white">{question.text}</p>
        </div>
        
        <RadioGroup 
          value={selectedOption !== null ? String(selectedOption) : undefined}
          onValueChange={(value) => setSelectedOption(parseInt(value))}
          className="space-y-3 mt-4"
        >
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 bg-slate-700/30 hover:bg-slate-700/50 transition-colors p-3 rounded-md cursor-pointer border border-slate-700 ${selectedOption === index ? (turn === 'A' ? 'border-team-a' : 'border-team-b') : ''}`}
              onClick={() => setSelectedOption(index)}
            >
              <RadioGroupItem 
                value={String(index)} 
                id={`option-${index}`} 
                className={`${turn === 'A' ? 'text-team-a border-team-a' : 'text-team-b border-team-b'}`} 
              />
              <Label htmlFor={`option-${index}`} className="flex-1 font-normal cursor-pointer text-slate-200 break-words">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="pt-2 p-4">
        <Button 
          onClick={() => selectedOption !== null && onAnswer(selectedOption)}
          className={`w-full ${turn === 'A' ? 'bg-team-a hover:bg-team-a/80' : 'bg-team-b hover:bg-team-b/80'}`}
          disabled={selectedOption === null}
        >
          Submit Answer
        </Button>
      </CardFooter>
    </Card>
  );
};
