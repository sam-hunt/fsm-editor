import { FsmInput } from './fsm-input.interface';

export const fsmInputToJs = (fsm: FsmInput) => {
    const methods = fsm.transitions.map(t => `on${t.name[0].toUpperCase()}${t.name.slice(1)}`);

    const [maxName, maxFrom, maxTo] = ['name', 'from', 'to'].map(k => Math.max(...fsm.transitions.map((t: any) => t[k].length)));
    const maxMethods = Math.max(...methods.map(k => k.length));

    return ''+
`const fsm = new StateMachine({
    init: '${fsm.init}',
    transitions: [
       ${fsm.transitions
            .map(t => `{ name: '${`${t.name}',`.padEnd(maxName+2)} from: '${`${t.from}',`.padEnd(maxFrom+2)} to: '${`${t.to}'`.padEnd(maxTo+2)}},`)
            .join('\n       ')
        }
    ],
    methods: {
       ${methods
            .map(m => `{ ${(m+':').padEnd(maxMethods+2)}() => { console.log('${m} called'); ${''.padEnd(maxMethods-m.length)}},`)
            .join('\n       ')
        }
    },
});`;
};