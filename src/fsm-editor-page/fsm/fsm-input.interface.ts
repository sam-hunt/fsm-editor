export interface FsmTransition<T, S> {
    name: T;
    from: S;
    to: S;
};

export interface FsmInput<S extends string, T extends string> {
    name?: string;
    init: S;
    transitions: FsmTransition<T, S>[];
    methods: {
        [method in `on${Capitalize<T>}`]: () => void;
    },
};