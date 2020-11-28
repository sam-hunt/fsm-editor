import * as React from 'react';
import { FsmInput } from './fsm/fsm-input.interface';
import { fsmInputToJs } from './fsm/fsm-input-to-js';
import PrismCode from './prism-code/PrismCode';
import VisualFsmEditor from './visual-fsm-editor/visual-fsm-editor';
import './fsm-editor-page.css';

const fsmInput: FsmInput<string, string> = {
    init: 'solid',
    transitions: [
        { name: 'melt', from: 'solid', to: 'liquid' },
        { name: 'freeze', from: 'liquid', to: 'solid' },
        { name: 'vaporize', from: 'liquid', to: 'gas' },
        { name: 'condense', from: 'gas', to: 'liquid' },
    ],
    methods: {
        onMelt: () => { console.log('I melted'); },
        onFreeze: () => { console.log('I froze'); },
        onVaporize: () => { console.log('I vaporized'); },
        onCondense: () => { console.log('I condensed'); },
    },
};

const FsmEditorPage = () => (<>
    <main>
        <h1>Finite State Machine Editor</h1>
        <PrismCode code={fsmInputToJs(fsmInput)}></PrismCode>
        <VisualFsmEditor fsmInput={fsmInput}></VisualFsmEditor>
    </main>
    </>
);

export default FsmEditorPage;
