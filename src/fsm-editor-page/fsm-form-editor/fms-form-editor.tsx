import * as React from 'react';
import ChipsInput from './chips-input/chips-input';
import { FsmInput, FsmTransition } from '../fsm/fsm-input.interface';

interface IFsmFormEditorProps {
    input: FsmInput;
    handleSave: (fsmInput: FsmInput) => void;
};

const removeTransition = (fsmInput: FsmInput, transitionName: string): FsmInput => {
    const transitions = fsmInput.transitions.filter(t => t.name !== transitionName);
    return { init: fsmInput.init, transitions };
};

const removeState = (fsmInput: FsmInput, stateName: string): FsmInput => {
    const transitions = fsmInput.transitions.filter(t => !([t.to, t.from].includes(stateName))  );
    const states = Array.from(new Set(transitions.flatMap(t => ([t.from, t.to]))))
    const init = fsmInput.init || states[0] || '';
    return { init, transitions };
}

const pushTransition = (fsmInput: FsmInput, transition: FsmTransition<string, string>): FsmInput => {
    const transitions = fsmInput.transitions.concat(transition);
    return { init: fsmInput.init, transitions };
};

const FsmFormEditor: React.FC<IFsmFormEditorProps> = ({ input, handleSave }) => {

    const [name, setName] = React.useState<string>('')
    const [from, setFrom] = React.useState<string>('')
    const [to, setTo] = React.useState<string>('')

    const states = Array.from(new Set(input.transitions.flatMap(t => ([t.from, t.to]))))

    return (
        <form>
            Current States:&nbsp;
            <ChipsInput
                placeholder="Add a new state"
                items={states}
                onDelete={(item) => handleSave(removeState(input, item))}
            >
            </ChipsInput>
            <br/><br/>

            Transitions:
            <ul>
                {input.transitions.map(transition => <li key={transition.name}>
                    <span>
                    <span style={{color: 'var(--accent-color)'}}>{transition.name}</span>: {transition.from} ⟶ {transition.to}
                    <button
                        type='button'
                        className='button'
                        onClick={() => handleSave(removeTransition(input, transition.name))}
                    >&times;</button>
                    </span>
                </li>)}
                <li key="new-transition">
                    <span className="new-transition">
                        <input type="text" name="name" placeholder="name" onChange={(e) => setName(e.target.value)}></input>
                        <select name="from" id="from" defaultValue="" onChange={(e) => setFrom(e.target.value)}>
                            <option value="" key={""} disabled>from</option>
                            {states.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                        <select name="to" id="to" defaultValue="" onChange={(e) => setTo(e.target.value)}>
                            <option value="" key={""} disabled>to</option>
                            {states.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                        <button
                            type='button'
                            className='button'
                            onClick={() => handleSave(pushTransition(input, { name, from, to }))}
                        >+</button>
                    </span>
                </li>
            </ul>
        </form>
    );
};

export default FsmFormEditor;