export type Set = {
  name?: string;
  duration?: number; // in seconds
  repetitions?: number;
  isRest?: boolean;
  onClick?: () => void;
  isActive?: boolean;
};

export type Workout = {
  name: string;
  sets: Set[];
};

