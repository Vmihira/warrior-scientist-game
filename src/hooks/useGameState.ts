import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GameState, Team, QuestionTheme, Question } from '@/types/game';
import { mockQuestions } from '@/data/questions';
import { useSound } from '@/hooks/useSound';

const INITIAL_GAME_STATE: GameState = {
  turn: 'A', // Start with Team A
  phase: 'team-selection', // New phase for team selection
  characters: {
    'A-warrior': {
      team: 'A',
      role: 'warrior',
      health: 3,
      weapons: 0,
      position: { x: 100, y: 400 }
    },
    'A-scientist': {
      team: 'A',
      role: 'scientist',
      health: 3,
      weapons: 0,
      position: { x: 200, y: 400 }
    },
    'B-warrior': {
      team: 'B',
      role: 'warrior',
      health: 3,
      weapons: 0,
      position: { x: 700, y: 400 }
    },
    'B-scientist': {
      team: 'B',
      role: 'scientist',
      health: 3,
      weapons: 0,
      position: { x: 600, y: 400 }
    }
  },
  questionsAsked: 0,
  maxQuestions: 5,
  maxHealth: 3,
  playerTeam: undefined, // Track which team the player selected
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const { playSound } = useSound();
  
  const getRandomQuestion = (theme: QuestionTheme): Question => {
    const themeQuestions = mockQuestions.filter(q => q.theme === theme);
    const randomIndex = Math.floor(Math.random() * themeQuestions.length);
    return themeQuestions[randomIndex];
  };

  const selectTeam = (team: Team) => {
    setGameState({
      ...gameState,
      phase: 'question-selection',
      playerTeam: team,
      turn: team // Player always goes first
    });
    toast.success(`You've joined Team ${team}!`);
  };
  
  const selectTheme = (theme: QuestionTheme) => {
    setGameState({
      ...gameState,
      selectedTheme: theme,
      phase: 'question-answer',
      currentQuestion: getRandomQuestion(theme)
    });
  };

  const answerQuestion = (selectedOption: number) => {
    if (!gameState.currentQuestion) return;
    
    const isCorrect = selectedOption === gameState.currentQuestion.correctAnswer;
    const currentWarrior = `${gameState.turn}-warrior`;
    
    if (isCorrect) {
      playSound('targeting');
      toast.success("Correct answer! You earned a weapon!");
      setGameState(prev => ({
        ...prev,
        characters: {
          ...prev.characters,
          [currentWarrior]: {
            ...prev.characters[currentWarrior],
            weapons: prev.characters[currentWarrior].weapons + 1
          }
        },
        phase: 'weapon-throw',
        questionsAsked: prev.questionsAsked + 1,
      }));
    } else {
      playSound('miss');
      toast.error("Wrong answer! No weapon for you this turn.");
      
      const nextTurn: Team = gameState.turn === 'A' ? 'B' : 'A';
      
      setGameState(prev => ({
        ...prev,
        phase: 'question-selection',
        turn: nextTurn,
        questionsAsked: prev.questionsAsked + 1,
      }));
    }
  };

  const calculateHit = (angle: number, power: number): boolean => {
    const angleFactor = 1 - Math.abs(45 - angle) / 45;
    const powerFactor = power / 100;
    const movementDifficulty = 0.7;
    const hitProbability = angleFactor * powerFactor * movementDifficulty;
    
    return Math.random() < hitProbability;
  };

  const throwWeapon = (angle: number, power: number) => {
    const attackingTeam = gameState.turn;
    const defendingTeam: Team = attackingTeam === 'A' ? 'B' : 'A';
    const attackingWarrior = `${attackingTeam}-warrior`;
    const defendingWarrior = `${defendingTeam}-warrior`;
    
    playSound('throw');
    
    setTimeout(() => {
      const isHit = calculateHit(angle, power);
      
      if (isHit) {
        playSound('hit');
        toast.success("Direct hit!");
        const updatedDefenderHealth = gameState.characters[defendingWarrior].health - 1;
        
        const nextTurn: Team = gameState.turn === 'A' ? 'B' : 'A';
        
        const updatedGameState: GameState = {
          ...gameState,
          characters: {
            ...gameState.characters,
            [attackingWarrior]: {
              ...gameState.characters[attackingWarrior],
              weapons: gameState.characters[attackingWarrior].weapons - 1
            },
            [defendingWarrior]: {
              ...gameState.characters[defendingWarrior],
              health: updatedDefenderHealth
            }
          },
          phase: 'question-selection',
          turn: nextTurn
        };
        
        if (updatedDefenderHealth <= 0) {
          updatedGameState.phase = 'game-over';
          updatedGameState.winner = attackingTeam;
        }
        
        setGameState(updatedGameState);
      } else {
        playSound('miss');
        toast.error("Missed the target! The warrior dodged your attack!");
        const nextTurn: Team = gameState.turn === 'A' ? 'B' : 'A';
        
        setGameState({
          ...gameState,
          characters: {
            ...gameState.characters,
            [attackingWarrior]: {
              ...gameState.characters[attackingWarrior],
              weapons: gameState.characters[attackingWarrior].weapons - 1
            }
          },
          phase: 'question-selection',
          turn: nextTurn
        });
      }
    }, 800);
  };

  const checkGameEnd = () => {
    if (gameState.questionsAsked >= gameState.maxQuestions && gameState.phase !== 'game-over') {
      const teamAHealth = gameState.characters['A-warrior'].health;
      const teamBHealth = gameState.characters['B-warrior'].health;
      
      let winner: Team | undefined;
      
      if (teamAHealth > teamBHealth) {
        winner = 'A';
      } else if (teamBHealth > teamAHealth) {
        winner = 'B';
      }
      
      setGameState({
        ...gameState,
        phase: 'game-over',
        winner
      });
    }
  };
  
  useEffect(() => {
    if (gameState.playerTeam && 
        gameState.turn !== gameState.playerTeam && 
        gameState.phase === 'question-selection') {
      
      const aiThinkingDelay = setTimeout(() => {
        const themes: QuestionTheme[] = [
          'general-knowledge', 'logical-reasoning', 'programming',
          'vocabulary', 'grammar', 'mathematics'
        ];
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        selectTheme(randomTheme);
        
        setTimeout(() => {
          const aiCorrect = Math.random() < 0.7;
          const aiSelectedOption = aiCorrect 
            ? gameState.currentQuestion!.correctAnswer
            : Math.floor(Math.random() * 4);
          
          answerQuestion(aiSelectedOption);
          
          if (aiCorrect) {
            setTimeout(() => {
              const aiAngle = Math.floor(Math.random() * 90);
              const aiPower = Math.floor(Math.random() * 100) + 1;
              throwWeapon(aiAngle, aiPower);
            }, 1500);
          }
        }, 1500);
      }, 2000);
      
      return () => clearTimeout(aiThinkingDelay);
    }
  }, [gameState.turn, gameState.phase, gameState.playerTeam]);

  return {
    gameState,
    selectTeam,
    selectTheme,
    answerQuestion,
    throwWeapon,
    checkGameEnd
  };
};
