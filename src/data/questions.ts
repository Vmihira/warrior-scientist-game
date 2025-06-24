
import { Question } from '@/types/game';

// In a real implementation, these would come from the Gemini API
export const mockQuestions: Question[] = [
  // General Knowledge Questions
  {
    id: 'gk-1',
    text: 'Which country hosted the 2022 FIFA World Cup?',
    options: ['Brazil', 'Qatar', 'Russia'],
    correctAnswer: 1,
    theme: 'general-knowledge'
  },
  {
    id: 'gk-2',
    text: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean'],
    correctAnswer: 2,
    theme: 'general-knowledge'
  },
  {
    id: 'gk-3',
    text: 'Which company created the iPhone?',
    options: ['Samsung', 'Apple', 'Google'],
    correctAnswer: 1,
    theme: 'general-knowledge'
  },
  {
    id: 'gk-4',
    text: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra'],
    correctAnswer: 2,
    theme: 'general-knowledge'
  },

  // Logical Reasoning Questions
  {
    id: 'lr-1',
    text: 'If Sally is 10 years old and her brother is half her age, how old will her brother be when Sally is 20?',
    options: ['10 years old', '15 years old', '20 years old'],
    correctAnswer: 1,
    theme: 'logical-reasoning'
  },
  {
    id: 'lr-2',
    text: 'If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?',
    options: ['Yes', 'No', 'Cannot determine'],
    correctAnswer: 2,
    theme: 'logical-reasoning'
  },
  {
    id: 'lr-3',
    text: 'In a certain code, COMPUTER is written as RFUVQNPC. How will PRINTER be written?',
    options: ['QSJOSWF', 'SFUOJSQ', 'QSJOUFS'],
    correctAnswer: 2,
    theme: 'logical-reasoning'
  },

  // Programming Questions
  {
    id: 'prog-1',
    text: 'What will be the output of: console.log(2 + "2");',
    options: ['4', '22', 'Error'],
    correctAnswer: 1,
    theme: 'programming'
  },
  {
    id: 'prog-2',
    text: 'In JavaScript, which method is used to remove the last element from an array?',
    options: ['pop()', 'push()', 'shift()'],
    correctAnswer: 0,
    theme: 'programming'
  },
  {
    id: 'prog-3',
    text: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System'],
    correctAnswer: 1,
    theme: 'programming'
  },

  // Vocabulary Questions
  {
    id: 'vocab-1',
    text: 'What is the antonym of "benevolent"?',
    options: ['Malevolent', 'Generous', 'Kind'],
    correctAnswer: 0,
    theme: 'vocabulary'
  },
  {
    id: 'vocab-2',
    text: 'Which word is a synonym for "lethargic"?',
    options: ['Energetic', 'Sluggish', 'Quick'],
    correctAnswer: 1,
    theme: 'vocabulary'
  },
  {
    id: 'vocab-3',
    text: 'What does "ubiquitous" mean?',
    options: ['Rare', 'Present everywhere', 'Unclear'],
    correctAnswer: 1,
    theme: 'vocabulary'
  },

  // Grammar Questions
  {
    id: 'gram-1',
    text: 'Choose the correct passive form: "She writes a letter."',
    options: ['A letter written by her.', 'A letter is written by her.', 'A letter was writes by her.'],
    correctAnswer: 1,
    theme: 'grammar'
  },
  {
    id: 'gram-2',
    text: 'Which article should fill this blank: "I bought ___ new car yesterday"?',
    options: ['a', 'an', 'the'],
    correctAnswer: 0,
    theme: 'grammar'
  },
  {
    id: 'gram-3',
    text: 'Which sentence uses punctuation correctly?',
    options: ['Johns, dog is brown.', 'John\'s dog, is brown.', 'John\'s dog is brown.'],
    correctAnswer: 2,
    theme: 'grammar'
  },

  // Mathematics Questions
  {
    id: 'math-1',
    text: 'What is 15% of 200?',
    options: ['30', '20', '15'],
    correctAnswer: 0,
    theme: 'mathematics'
  },
  {
    id: 'math-2',
    text: 'If 3x + 5 = 20, what is the value of x?',
    options: ['5', '15', '5/3'],
    correctAnswer: 0,
    theme: 'mathematics'
  },
  {
    id: 'math-3',
    text: 'What is the next number in the sequence: 2, 4, 8, 16, ...?',
    options: ['24', '32', '20'],
    correctAnswer: 1,
    theme: 'mathematics'
  }
];
