
export type Role = 'admin' | 'player' | 'coach' | 'guest';

export type UserInput = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
};

export type CoachInput = {
    id?: number;
    user?: UserInput;
    expertise?: string;
};

export type PlayerInput = {
    id?: number;
    user?: UserInput;
    playerNumber?: string;
};

export type GameInput = {
    id?: number;
    name?: string;
    description?: string;
    home?: boolean;
    season?: number;
};

export type ScheduleInput = {
    id?: number;
    start?: Date;
    end?: Date;
    game?: GameInput;
    coach?: CoachInput;
    players?: PlayerInput[];
};

/**
 * Used to enroll players into a schedule.
 */
export type EnrollmentInput = {
    schedule: ScheduleInput;
    players: PlayerInput[];
};

export type AuthenticationRequest = {
    username: string;
    password: string;
};

export type AuthenticationResponse = {
    message?: string;
    token?: string;
    username?: string;
    role?:string;
    fullname?: string;
};
