
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionTheme, Team } from '@/types/game';
import { Brain, BookOpen, Calculator, Code, Languages, Lightbulb, Sparkles } from 'lucide-react';

interface QuestionSelectorProps {
  turn: Team;
  onSelectTheme: (theme: QuestionTheme) => void;
  questionsAsked: number;
  maxQuestions: number;
}

export const QuestionSelector = ({ turn, onSelectTheme, questionsAsked, maxQuestions }: QuestionSelectorProps) => {
  const themes: Array<{ id: QuestionTheme; name: string; icon: React.ReactNode; description: string }> = [
    { 
      id: 'general-knowledge', 
      name: 'General Knowledge', 
      icon: <Sparkles size={20} />, 
      description: 'Current trending topics and facts' 
    },
    { 
      id: 'logical-reasoning', 
      name: 'Logical Reasoning', 
      icon: <Lightbulb size={20} />, 
      description: 'Ages, relationships, and puzzles' 
    },
    { 
      id: 'programming', 
      name: 'Programming', 
      icon: <Code size={20} />, 
      description: 'Code snippets and output statements' 
    },
    { 
      id: 'vocabulary', 
      name: 'Vocabulary', 
      icon: <BookOpen size={20} />, 
      description: 'Synonyms, antonyms, and word meanings' 
    },
    { 
      id: 'grammar', 
      name: 'English Grammar', 
      icon: <Languages size={20} />, 
      description: 'Active/passive voice, articles, tenses' 
    },
    { 
      id: 'mathematics', 
      name: 'Basic Mathematics', 
      icon: <Calculator size={20} />, 
      description: 'Addition, subtraction, and operations' 
    }
  ];

  const remainingQuestions = maxQuestions - questionsAsked;

  return (
    <Card className="w-full bg-slate-800/70 border-slate-700">
      <CardHeader>
        <CardTitle className={`text-center ${turn === 'A' ? 'text-team-a-light' : 'text-team-b-light'}`}>
          <div className="flex items-center justify-center">
            <Brain className="mr-2" />
            Team {turn} Scientist
          </div>
        </CardTitle>
        <CardDescription className="text-center">
          Choose a question theme to challenge the opponent
          {remainingQuestions < maxQuestions && (
            <div className="mt-1 text-amber-400">
              {remainingQuestions} question{remainingQuestions !== 1 ? 's' : ''} left
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              variant="outline"
              onClick={() => onSelectTheme(theme.id)}
              className={`h-auto py-3 flex flex-col items-center justify-center border-slate-600 bg-slate-700/50 hover:bg-slate-700 hover:border-slate-500 transition-colors`}
            >
              <div className={`mb-1 ${turn === 'A' ? 'text-team-a-light' : 'text-team-b-light'}`}>
                {theme.icon}
              </div>
              <span className="font-semibold text-sm">{theme.name}</span>
              <span className="text-xs text-slate-400 mt-1 line-clamp-1">{theme.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
