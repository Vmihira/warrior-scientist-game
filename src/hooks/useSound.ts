
import { useCallback, useEffect, useRef } from 'react';

// Define the available sound types
type SoundType = 'targeting' | 'throw' | 'hit' | 'miss';

// Create audio elements for each sound
const createAudioElements = (): Record<SoundType, HTMLAudioElement | null> => {
  // We're in a browser environment
  if (typeof window !== 'undefined') {
    return {
      targeting: new Audio("data:audio/wav;base64,UklGRnQFAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YU8FAACB/4H/gf+C/4T/hf+G/4b/hf+F/4T/g/+C/4D/f/9+/37/f/+A/4H/gf+B/4D/f/9+/37/ff98/3z/e/96/3r/ef95/3r/e/98/33/ff99/33/fP98/3v/e/97/3z/fP99/37/fv9+/33/ff98/3z/fP99/37/f/+A/4D/gP+A/4D/gP+A/3//f/9//3//gP+B/4L/g/+D/4P/g/+D/4L/gf+A/3//f/9//3//gP+B/4L/gv+C/4L/gv+B/4H/gf+A/4D/f/9//3//f/+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/f/9//3//f/9//3//f/9//3//f/9//4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gf+B/4L/g/+D/4T/hP+E/4P/gv+B/4D/f/9+/33/ff99/33/ff9+/3//f/+A/4D/gP+A/4D/gP+A/4D/f/9//3//f/9+/37/ff99/33/ff9+/37/f/+A/4D/gf+B/4H/gf+B/4H/gf+B/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+B/4H/gv+C/4L/gv+C/4L/gf+B/4D/f/9+/33/fP98/3z/fP99/33/fv9+/37/fv9+/37/fv9+/37/f/9//3//f/9//3//f/9//3//f/9//3//gP+A/4D/gP+A/4D/gP+A/4H/gf+C/4L/g/+D/4P/gv+C/4H/gP9//37/ff98/3z/e/97/3v/e/98/33/fv9//4D/gf+C/4P/g/+D/4P/gv+C/4H/gf+A/4D/f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/3//f/9//3//f/9//3//f/9//3//gP+A/4H/gf+C/4L/g/+D/4P/g/+C/4L/gf+A/4D/f/9//3//f/9//3//f/+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4H/gf+C/4L/gv+C/4L/gv+B/4H/gP+A/3//f/9//3//f/+A/4D/gP+B/4H/gf+B/4H/gf+B/4H/gf+B/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4H/gf+C/4L/g/+D/4P/g/+D/4L/gv+B/4D/gP9//37/fv9+/37/fv9//3//gP+B/4H/gf+C/4L/gv+B/4H/gf+A/4D/f/9//3//f/9//3//f/9//4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/f/9//3//f/9//3//f/9//3//f/9//3//f/9//4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/4D/gP+A/3//f/9//3//f/9//3//f/9//3//f/9//3//"),
      throw: new Audio("data:audio/wav;base64,UklGRs4CAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YaoCAACAf39+fn59fH18fHx8fH19fn5/f4CAf39/f35+fn1+fX19fXx9fH19fX1+fn5+f39/f39/f39/f39/f39/f31+fX19fX19fX1+fn5+f4CAf39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f35/fn5+fn5+fn5+fn5+f39/f39/f39/f39/f39/f39/f39/f39+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+f39/f39/f39/f39/f39/f39/fn5+fn5+fn5+fn5+fn5+fn5+f39/f39/f39/f39/f39/f35/fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn19fX19fX19fX19fX19fX19fX19fX19fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+"),
      hit: new Audio("data:audio/wav;base64,UklGRuIEAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YdAEAAB+fHl4dnV1dXR0dHN0dHV2d3l7fX+BgoKDg4OCgYB/fXt5d3Z0c3JxcG9vb29vcHFyc3V3eXt9f4GCg4SFhYWEg4KAf316eHZ0cnBubGtqaWlpa2xtb3FzdXd6fH6AgoSFh4iIiIiHhoSCgH58eXd0cm9ta2lnZmVlZWZnaGptb3J0d3p8f4GEhoeJiouLi4qJh4WDgX97eXdzb21qaGZkY2JiYmNkaGlrbXBzdnl8f4GEhomLjI6PkI+OjYuJhoSAfXp2c29saWZjYV9dXFxcXV5gYmVobG9zeHt+gYSHio2Pj5CRkZCPjYuIhYJ/e3h0cG1pZWJfXFpYV1dXWFpdYGNmbHBzdnp+gYWIi46Qk5SVlZWUko+MiIWAfHh0cGxoZGFdWVZUUlFRUlRWWVxgZGhsb3N3e36BhYmNkJOVl5iYmJeVkomGg396dnJtaWVhXVlVUlBOTU1OUFFUWFtfY2drcHR4fICEiI2Qk5aYmpubmpiWk46KhoJ+eXVwbGdkX1tYVFBPTUtLS0xOUFNXW19jaW1xdXl9gYWJjZGUl5qcnZ2cm5mWko2JhYF9eHRvbGdkX1tXVFFOTEtLTE1PUVRXWl5iZmtvdHh8gISIjJCTlpmbnZ6enZuZlpKNiYWBfHh0b2xoZGBcWFRRT05NTVBSV15kbHJ4foSJjpOXm56hpKWlpKKfnJmUj4qFgHt2cm5qZmNfXFhVU1FOTlBSV19kbHJ4foSJjpOXm56hpKWlo6GempaSjomEf3t2cm5qZmNfXFhVUlFPTlBTV19jbHF3fYOIjZGVmZyfoKGhoJ6cmZaPi4eDf3t3c29raGVjX11aWFdWV1hZW15hZWhscHN3e36BhIeKjY+Rk5SVlZWUk5KQjouJhoN/fXp4dnRzcXBubGtqaWlpa2xtb3FzdXd5e3x/gIKEhoiJioqLi4uLioqJiIeGhIOBgH9+fHt6eXh3dnV1dHR0dHR1dXZ2eHh5e31/gIKDhIaHh4iIiYmJiYmIh4aFhIOCgYB/fn18e3p5eHd2dnV1dXV2dnd3eXp7fH5/gIGDhIWFhoaGhoaHhoaGhYWEg4KBgIB/fn18e3p5eXh3d3Z2dnd3eHl6e3x9f3+BgoOEhISFhYWFhYWFhYSEg4KBgYCAf359fHt7enp5eXl4eHh4eXl6e3t8fn9/gIGCgoODhISEhISEhISEg4OCgoGAgH9/fn18e3t6enl5eXl5eXl6ent8fX5/f4CBgoKDhISEhISEhISEhIOCgoKBgYB/f359fHx7enp6eXl5eXl6ent7fH1+f3+AQA=="),
      miss: new Audio("data:audio/wav;base64,UklGRjIBAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YRAAAAB+fn19fHx6eXl3dnVzcnFxcHFwcXJydHV2eHl7fH5/gIGCg4ODg4KBgH9+fXt6eXh2dXRzcXFwb29vb3BxcnN0dnh5e3x+f4CBgoODhISEg4OCgYB/fXx7enh3dnVzcnFwb29vb3BxcnN1dnd5ent9fn+AgYKDg4SEhISDgoGAf359fHp5eHd1dHNycXBvb29vcHFyc3R2eHl7fH1/gICCg4ODhISEg4OCgYB/fXx7enh3dnV0c3Jwb29vb3BxcnN1dnd5ent9fn+AgYKDg4SEhISDgoGAf359fHp5eHd1dHNycXBvb29vcHFyc3R2eHl6fH1+f4CBgoODhISEg4OCgYB/fXx7enh3dnV0c3Jwb29vb3BxcnN1dnd5ent9fn+AgYKDg4SEhISDgoGAf359fHp5eHd1dHNycXBvb29vcHFyc3R1d3l6")
    };
  }
  return {
    targeting: null,
    throw: null,
    hit: null,
    miss: null
  };
};

export const useSound = () => {
  const audioElements = useRef<Record<SoundType, HTMLAudioElement | null>>(null);
  
  useEffect(() => {
    // Initialize audio elements on client side only
    if (!audioElements.current) {
      audioElements.current = createAudioElements();
    }
    
    // Clean up
    return () => {
      if (audioElements.current) {
        Object.values(audioElements.current).forEach(audio => {
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        });
      }
    };
  }, []);
  
  const playSound = useCallback((type: SoundType) => {
    if (audioElements.current && audioElements.current[type]) {
      const audio = audioElements.current[type];
      if (audio) {
        // Reset the audio to start from beginning if it's already playing
        audio.currentTime = 0;
        
        // Play the sound
        audio.play().catch(err => {
          // Silently handle auto-play restrictions
          console.log("Sound play error (likely auto-play restriction):", err);
        });
      }
    }
  }, []);
  
  return { playSound };
};
