
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sword, Target, Crosshair } from 'lucide-react';
import { Team } from '@/types/game';

interface WeaponThrowProps {
  turn: Team;
  angle: number;
  power: number;
  setAngle: (value: number) => void;
  setPower: (value: number) => void;
  onThrowWeapon: () => void;
  weaponsAvailable: number;
}

export const WeaponThrow = ({ 
  turn, 
  angle, 
  power, 
  setAngle, 
  setPower, 
  onThrowWeapon,
  weaponsAvailable 
}: WeaponThrowProps) => {
  return (
    <Card className="w-full bg-slate-800/70 border-slate-700 backdrop-blur">
      <CardHeader className="border-b border-slate-700/50">
        <CardTitle className={`text-center ${turn === 'A' ? 'text-team-a-light' : 'text-team-b-light'}`}>
          <div className="flex items-center justify-center">
            <Crosshair className="mr-2 animate-pulse" size={18} />
            Team {turn} - Throw Your Weapon!
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${turn === 'A' ? 'bg-team-a/50' : 'bg-team-b/50'} mr-2`}></div>
              Angle: {angle}°
            </span>
            <span className="text-sm text-slate-400">(0-90°)</span>
          </div>
          <Slider
            value={[angle]}
            min={0}
            max={90}
            step={1}
            onValueChange={(value) => setAngle(value[0])}
            className={`py-4 ${turn === 'A' ? '[&>*]:bg-team-a [&>*>*]:bg-team-a-light' : '[&>*]:bg-team-b [&>*>*]:bg-team-b-light'}`}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${turn === 'A' ? 'bg-team-a/50' : 'bg-team-b/50'} mr-2`}></div>
              Power: {power}%
            </span>
            <span className="text-sm text-slate-400">(1-100%)</span>
          </div>
          <Slider
            value={[power]}
            min={1}
            max={100}
            step={1}
            onValueChange={(value) => setPower(value[0])}
            className={`py-4 ${turn === 'A' ? '[&>*]:bg-team-a [&>*>*]:bg-team-a-light' : '[&>*]:bg-team-b [&>*>*]:bg-team-b-light'}`}
          />
        </div>

        <div className="bg-slate-700/50 rounded-md p-4">
          <div className="flex items-center">
            <Target className={`mr-2 ${turn === 'A' ? 'text-team-a-light' : 'text-team-b-light'}`} size={18} />
            <span className="font-semibold">Battlefield Trajectory:</span>
          </div>
          <div className="h-20 mt-2 relative border-b border-dotted border-slate-600">
            <div className={`absolute bottom-0 left-0 h-1 ${turn === 'A' ? 'bg-team-a-light/70' : 'bg-team-b-light/70'} origin-bottom-left`} 
              style={{ 
                width: '100%', 
                transform: `rotate(-${angle}deg) scaleX(${power/100})` 
              }} 
            />
            <div className="absolute bottom-0 left-0 h-2 w-2 rounded-full bg-amber-500"></div>
            <div className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${turn === 'A' ? 'bg-team-b' : 'bg-team-a'}`}></div>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            <strong>Note:</strong> The enemy soldier is moving to dodge your attack!
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onThrowWeapon} 
          className={`w-full ${turn === 'A' ? 'bg-team-a' : 'bg-team-b'} hover:opacity-90 transition-all ${weaponsAvailable <= 0 ? 'opacity-50' : ''}`}
          disabled={weaponsAvailable <= 0}
        >
          <Sword className="mr-2 animate-pulse" size={18} />
          {weaponsAvailable <= 0 ? 'No Weapons Available' : 'Throw Weapon'}
          {weaponsAvailable > 0 && <span className="ml-2 bg-white bg-opacity-20 px-1 rounded text-sm">{weaponsAvailable}</span>}
        </Button>
      </CardFooter>
    </Card>
  );
};
