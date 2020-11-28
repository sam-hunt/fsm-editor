import { FsmInput } from './fsm-input.interface';

export const fsmInputToJs = <S extends string, T extends string>(fsm: FsmInput<S, T>) => {
    const [name, from, to] = ['name', 'from', 'to'].map(k => Math.max(...fsm.transitions.map((t: any) => t[k].length)));
    const methods = Math.max(...Object.keys(fsm.methods).map(k => k.length));
    return `
const fsm = new StateMachine({
    init: '${fsm.init}',
    transitions: [
       ${fsm.transitions
            .map(t => `{ name: '${`${t.name}',`.padEnd(name+2)} from: '${`${t.from}',`.padEnd(from+2)} to: '${`${t.to}'`.padEnd(to+2)}},`)
            .join('\n       ')
        }
    ],
    methods: {
       ${Object.keys(fsm.methods)
            .map(m => `{ ${(m+':').padEnd(methods+2)}() => { console.log('${m} called'); ${''.padEnd(methods-m.length)}},`)
            .join('\n       ')
        }
    },
});`;
};