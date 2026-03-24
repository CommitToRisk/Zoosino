export type User = {
    username: string;
    balance: number;
    isGuest: boolean;
};

export type BetType = "red" | "black" | "even" | "odd" | number;