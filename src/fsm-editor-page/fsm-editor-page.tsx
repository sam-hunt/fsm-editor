import * as React from 'react';
import { FsmInput } from './fsm/fsm-input.interface';
import { fsmInputToJs } from './fsm/fsm-input-to-js';
import PrismCode from './prism-code/PrismCode';
import D3FsmRenderer2 from './d3-fsm-renderer/d3-fsm-renderer-2';
import FsmFormEditor from './fsm-form-editor/fms-form-editor';
import './fsm-editor-page.css';

const exampleFsmInput: FsmInput = {
    init: 'solid',
    transitions: [
        { name: 'melt', from: 'solid', to: 'liquid' },
        { name: 'freeze', from: 'liquid', to: 'solid' },
        { name: 'vaporize', from: 'liquid', to: 'gas' },
        { name: 'condense', from: 'gas', to: 'liquid' },
    ],
};

const FsmEditorPage: React.FC = () => {
    const [fsmInput, setFsmInput] = React.useState<FsmInput>(exampleFsmInput);
    return (
        <main>
            <h1>Finite State Machine Editor</h1>
            <section className="bordered">
                <D3FsmRenderer2 fsmInput={fsmInput}></D3FsmRenderer2>
            </section>
            <section>
                <FsmFormEditor input={fsmInput} handleSave={(fsmInput: FsmInput) => setFsmInput(fsmInput)}></FsmFormEditor>
            </section>
            <section>
                Javascript Output:
                <PrismCode code={fsmInputToJs(fsmInput)}></PrismCode>
            </section>
        </main>
    );
};

export default FsmEditorPage;
