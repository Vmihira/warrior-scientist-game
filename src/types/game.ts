
export type Team = 'A' | 'B';

export type Role = 'warrior' | 'scientist';

export type QuestionTheme = 
  | 'general-knowledge' 
  | 'logical-reasoning'
  | 'programming'
  | 'vocabulary'
  | 'grammar'
  | 'mathematics';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  theme: QuestionTheme;
}

export interface Character {
  team: Team;
  role: Role;
  health: number;
  weapons: number;
  position: {
    x: number;
    y: number;
  };
}

export interface GameState {
  turn: Team;
  phase: 'team-selection' | 'question-selection' | 'question-answer' | 'weapon-throw' | 'game-over';
  characters: Record<string, Character>;
  currentQuestion?: Question;
  selectedTheme?: QuestionTheme;
  questionsAsked: number;
  winner?: Team;
  maxQuestions: number;
  maxHealth: number;
  playerTeam?: Team; // New property to track which team the player selected
}
