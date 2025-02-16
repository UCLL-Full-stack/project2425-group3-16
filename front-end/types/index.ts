// src/types.ts (front-end)

export type Role = 'admin' | 'player' | 'coach' | 'guest';

export type User = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  fullname?: string;
};

export type Coach = {
  id?: number;
  user?: User;
  expertise?: string;
  games?: Game[];
};

export type Player = {
  id?: number;
  user?: User;
  playerNumber?: string;
};

export type Game = {
  id?: number;
  name?: string;
  description?: string;
  home?: boolean;
  season?: number;
};

export type Schedule = {
  id?: number;
  start?: Date;
  end?: Date;
  game?: Game;
  coach?: Coach;
  players?: Player[];
};

export type Enrollment = {
  schedule: Schedule;
  players: Player[];
};


export type AuthenticationRequest = {
  username: string;
  password: string;
};


export type AuthenticationResponse = {
  message?: string;
  token?: string;
  username?: string;
  role?: string;
  fullname?: string;
};

export type StatusMessage = {
  message: string;
  type: 'error' | 'success';
};
