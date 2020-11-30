export interface FsmTransition<T, S> {
    name: T;
    from: S;
    to: S;
};

export interface FsmInputST<S extends string, T extends string> {
    name?: string;
    init: S;
    transitions: FsmTransition<T, S>[];
    methods?: {
        [method in `on${Capitalize<T>}`]: () => void;
    },
};

// type alias as implicit type inference is not strong enough on nested literals
export type FsmInput = FsmInputST<string, string>;