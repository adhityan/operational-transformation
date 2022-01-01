import { useState } from 'react';
import * as Diff from 'diff';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [pending, addPending] = useState([]);
    const [pendingCounter, setPendingCounter] = useState(0);
    const [operations, addOperation] = useState([]);
    const [operationsCounter, setOperationsCounter] = useState(0);

    function getDiff(original, latest) {
        const diffs = Diff.diffChars(original, latest);

        let i = 0;
        const result = [];
        diffs.forEach((diff) => {
            if (diff.added || diff.removed) {
                result.push({
                    start: i,
                    end: i + diff.count,
                    parameters: {
                        value: diff.value,
                    },
                });
            }

            i += diff.count;
        });

        console.log(diffs, result);
        return result;
    }

    function handleChange(event) {
        const diff = getDiff(text, event.target.value);
        addPending([...pending, { data: diff, id: pendingCounter }]);
        setPendingCounter(pendingCounter + 1);
        setText(event.target.value);
    }

    return (
        <div className="App">
            <div className="Data">
                <textarea type="text" name="name" onChange={handleChange} value={text} className="TextArea" />

                <div className="Pending">
                    <div>Pending:</div>
                    {pending.map(function (op) {
                        return (
                            <div key={op.id}>
                                {JSON.stringify(op.data)}
                                <br />
                            </div>
                        );
                    })}
                </div>

                <div className="Details">
                    <div>Server Log:</div>
                    {operations.map(function (op) {
                        return (
                            <div key={op.id}>
                                {JSON.stringify(op.data)}
                                <br />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
