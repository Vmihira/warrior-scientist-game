
import { useMemo, useEffect, useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Sword, Brain, Target, Crosshair } from 'lucide-react';
import { Character, Team } from '@/types/game';
import { useSound } from '@/hooks/useSound';

interface BattlefieldProps {
  characters: Record<string, Character>;
  currentTeam: Team;
  angle: number;
  power: number;
  playerTeam?: Team;
}

export const Battlefield = ({ characters, currentTeam, angle, power, playerTeam }: BattlefieldProps) => {
  // Sound effects
  const { playSound } = useSound();
  
  // State for animated positions of warriors
  const [animatedPositions, setAnimatedPositions] = useState<Record<string, {x: number, y: number}>>({
    'A-warrior': characters['A-warrior'].position,
    'B-warrior': characters['B-warrior'].position,
  });
  
  // Reference for tracking if we should apply evasive movement
  const targetedTeam = useMemo(() => {
    return currentTeam === 'A' ? 'B' : 'A';
  }, [currentTeam]);
  
  // Animation logic for warriors with enhanced evasive movement
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimatedPositions(prev => {
        const newPositions = {...prev};
        
        // Team A warrior animation
        const warriorA = characters['A-warrior'];
        // Base oscillation
        let xOffsetA = Math.sin(Date.now() / 1000) * 10;
        
        // Enhanced evasive movement when targeted
        if (targetedTeam === 'A' && characters['A-warrior'].health > 0) {
          const evasionSpeedA = 1500; // Faster when evading
          const evasionAmplitudeA = 30; // Larger movements when evading
          xOffsetA = Math.sin(Date.now() / evasionSpeedA) * evasionAmplitudeA;
          // Add vertical movement when evading
          const yOffsetA = Math.cos(Date.now() / 1000) * 15;
          newPositions['A-warrior'] = {
            x: warriorA.position.x + xOffsetA,
            y: warriorA.position.y + yOffsetA
          };
        } else {
          newPositions['A-warrior'] = {
            x: warriorA.position.x + xOffsetA,
            y: warriorA.position.y
          };
        }
        
        // Team B warrior animation
        const warriorB = characters['B-warrior'];
        // Base oscillation with phase offset
        let xOffsetB = Math.sin(Date.now() / 1000 + Math.PI) * 10; 
        
        // Enhanced evasive movement when targeted
        if (targetedTeam === 'B' && characters['B-warrior'].health > 0) {
          const evasionSpeedB = 1500; // Faster when evading
          const evasionAmplitudeB = 30; // Larger movements when evading
          xOffsetB = Math.sin(Date.now() / evasionSpeedB) * evasionAmplitudeB;
          // Add vertical movement when evading
          const yOffsetB = Math.cos(Date.now() / 1000) * 15;
          newPositions['B-warrior'] = {
            x: warriorB.position.x + xOffsetB,
            y: warriorB.position.y + yOffsetB
          };
        } else {
          newPositions['B-warrior'] = {
            x: warriorB.position.x + xOffsetB,
            y: warriorB.position.y
          };
        }
        
        return newPositions;
      });
    }, 50); // Update position every 50ms for smooth animation
    
    return () => clearInterval(animationInterval);
  }, [characters, targetedTeam]);

  // Calculate trajectory path points
  const trajectoryPoints = useMemo(() => {
    if (currentTeam && angle && power) {
      const attacker = characters[`${currentTeam}-warrior`];
      const startX = attacker.position.x;
      const startY = attacker.position.y;
      
      // Convert angle to radians (and invert since y is inverted in HTML canvas)
      const angleRad = (angle * Math.PI) / 180;
      
      // Calculate target based on angle and power
      const distance = power * 5; // Scale power to pixels
      const targetX = startX + (currentTeam === 'A' ? distance : -distance) * Math.cos(angleRad);
      const targetY = startY - distance * Math.sin(angleRad);
      
      // Play targeting sound when trajectory is calculated
      playSound('targeting');
      
      return { startX, startY, targetX, targetY };
    }
    return null;
  }, [characters, currentTeam, angle, power, playSound]);
  
  return (
    <Card className="w-full h-[500px] overflow-hidden relative border-slate-600">
      {/* Dramatic battlefield background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cpath fill=\"%23222831\" d=\"M0 0h100v100H0z\"/%3E%3Cpath fill=\"%23393E46\" d=\"M30 40h40v20H30z\"/%3E%3Cpath fill=\"%23121212\" d=\"M10 10h10v10H10zm70 0h10v10H80zm0 70h10v10H80zm-70 0h10v10H10z\"/%3E%3C/svg%3E')",
          filter: 'contrast(1.2) brightness(0.7)'
        }}
      >
        {/* Battlefield overlay with craters and debris */}
        <div className="absolute inset-0 bg-battlefield opacity-30 mix-blend-overlay"></div>
        
        {/* Smoke effects */}
        <div className="absolute left-[20%] top-[30%] w-24 h-24 bg-slate-700/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute right-[30%] top-[50%] w-32 h-16 bg-slate-700/20 rounded-full blur-xl animate-pulse" style={{animationDelay: "1.5s"}}></div>
        
        {/* Crater details */}
        <div className="absolute top-[60%] left-[15%] w-16 h-4 rounded-full bg-slate-900/30 transform rotate-45 blur-sm"></div>
        <div className="absolute top-[40%] right-[25%] w-20 h-5 rounded-full bg-slate-900/30 transform -rotate-12 blur-sm"></div>
        
        {/* Battlefield terrain */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900/80"></div>
        
        {/* Distant explosions */}
        <div className="absolute top-[15%] left-[75%] w-8 h-8 bg-orange-500/20 rounded-full animate-pulse blur-lg"></div>
        <div className="absolute top-[25%] left-[10%] w-10 h-10 bg-orange-500/10 rounded-full animate-pulse blur-lg" style={{animationDelay: "2.7s"}}></div>
      </div>
      
      {/* Render characters */}
      {Object.entries(characters).map(([id, character]) => {
        // Use animated position for warriors, static for scientists
        const position = character.role === 'warrior' 
          ? animatedPositions[id] || character.position 
          : character.position;
          
        // Check if this character is being targeted (for visual effects)
        const isTargeted = character.team === targetedTeam && character.role === 'warrior';
          
        return (
          <div 
            key={id}
            className={`absolute ${character.role === 'warrior' ? 'w-16 h-16' : 'w-12 h-12'} transform -translate-x-1/2 -translate-y-1/2 ${isTargeted ? 'filter drop-shadow-[0_0_5px_rgba(255,0,0,0.7)]' : ''}`}
            style={{
              left: position.x,
              top: position.y
            }}
          >
            <div 
              className={`
                flex items-center justify-center rounded-full shadow-lg
                ${character.team === 'A' ? 'bg-team-a' : 'bg-team-b'}
                ${character.role === 'warrior' ? 'w-full h-full' : 'w-full h-full'}
                ${character.health <= 0 ? 'opacity-50 grayscale' : ''}
                ${isTargeted ? 'ring-4 ring-red-500 animate-pulse' : ''}
              `}
            >
              {character.role === 'warrior' ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Enhanced boy warrior costume */}
                  <div className="absolute w-8 h-8 rounded-full bg-amber-200 top-2"></div> {/* Head */}
                  <div className="absolute w-7 h-2 bg-slate-700 top-6 left-4 rounded-full"></div> {/* Helmet */}
                  <div className="absolute w-10 h-5 bg-green-800 top-9 rounded-sm"></div> {/* Body/Armor */}
                  <div className="absolute h-3 w-10 bg-amber-800/70 top-[3.25rem] rounded-md"></div> {/* Belt */}
                  <div className="absolute w-2 h-4 bg-slate-700 left-3 top-12"></div> {/* Left leg */}
                  <div className="absolute w-2 h-4 bg-slate-700 right-3 top-12"></div> {/* Right leg */}
                  <div className="absolute w-4 h-2 bg-green-800 left-1 top-10 rotate-45"></div> {/* Left arm */}
                  <div className="absolute w-4 h-2 bg-green-800 right-1 top-10 -rotate-45"></div> {/* Right arm */}
                  
                  {/* Facial features */}
                  <div className="absolute w-1 h-[0.1rem] bg-slate-800 top-4 left-4"></div> {/* Left eye */}
                  <div className="absolute w-1 h-[0.1rem] bg-slate-800 top-4 right-4"></div> {/* Right eye */}
                  <div className="absolute w-2 h-[0.1rem] bg-slate-800 top-5 left-[4.5rem] transform -translate-x-1/2"></div> {/* Mouth */}
                  
                  {/* Weapon */}
                  <Sword size={14} className="absolute right-1 top-9 text-slate-300" /> {/* Small sword */}
                  
                  {/* Add targeting indicator when targeted */}
                  {isTargeted && (
                    <>
                      <Crosshair size={24} className="absolute text-red-500 animate-pulse" />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-0.5 text-xs font-bold rounded-md whitespace-nowrap animate-bounce">
                        TARGET
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Enhanced scientist character */}
                  <div className="absolute w-7 h-7 rounded-full bg-amber-200 top-1"></div> {/* Head */}
                  <div className="absolute w-4 h-2 bg-white top-3 left-4 rounded-sm"></div> {/* Glasses */}
                  <div className="absolute w-8 h-6 bg-white top-7 rounded-sm"></div> {/* Lab coat */}
                  <div className="absolute w-2 h-3 bg-amber-200 left-3 top-12"></div> {/* Left leg */}
                  <div className="absolute w-2 h-3 bg-amber-200 right-3 top-12"></div> {/* Right leg */}
                  
                  <Brain size={18} className="absolute text-slate-800 top-4" />
                </div>
              )}
            </div>
            
            {/* Health indicator for warriors */}
            {character.role === 'warrior' && (
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i < character.health ? (character.team === 'A' ? 'bg-team-a-light' : 'bg-team-b-light') : 'bg-slate-600'}`}
                  />
                ))}
              </div>
            )}

            {/* Weapon count for warriors */}
            {character.role === 'warrior' && character.weapons > 0 && (
              <div className={`absolute -right-2 -top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${character.team === 'A' ? 'bg-team-a-light' : 'bg-team-b-light'}`}>
                {character.weapons}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Enhanced trajectory line with animated target marker */}
      {trajectoryPoints && currentTeam && (
        <>
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <line
              x1={trajectoryPoints.startX}
              y1={trajectoryPoints.startY}
              x2={trajectoryPoints.targetX}
              y2={trajectoryPoints.targetY}
              stroke={currentTeam === 'A' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(239, 68, 68, 0.7)'}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
          
          {/* Animated target marker */}
          <div 
            className="absolute w-8 h-8 animate-pulse pointer-events-none"
            style={{
              left: trajectoryPoints.targetX,
              top: trajectoryPoints.targetY,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Target 
              size={32} 
              className={currentTeam === 'A' ? 'text-team-a-light' : 'text-team-b-light'} 
            />
          </div>
        </>
      )}
      
      {/* Team indicators with fortifications */}
      <div className="absolute top-2 left-2 text-xs font-semibold text-team-a-light bg-slate-800/70 px-2 py-1 rounded flex items-center">
        <div className="w-2 h-6 bg-slate-700 mr-2 rounded"></div>
        <div className="w-2 h-4 bg-slate-700 mr-2 rounded"></div>
        Team A Base
      </div>
      <div className="absolute top-2 right-2 text-xs font-semibold text-team-b-light bg-slate-800/70 px-2 py-1 rounded flex items-center">
        Team B Base
        <div className="w-2 h-4 bg-slate-700 ml-2 rounded"></div>
        <div className="w-2 h-6 bg-slate-700 ml-2 rounded"></div>
      </div>
      
      {/* Clear targeting indication text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800/80 px-3 py-1 rounded-md text-sm font-medium text-white border border-slate-700">
        {targetedTeam === 'A' ? (
          <span className="text-team-a-light">Team A Warrior</span>
        ) : (
          <span className="text-team-b-light">Team B Warrior</span>
        )} is the current target
      </div>
    </Card>
  );
};
