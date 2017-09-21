import { DebuggerCounter } from "./debugger-counter";
import { Disposable, window } from "vscode";

export class DebuggerCounterController {
    
        private _debuggerCounter: DebuggerCounter;
        private _disposable: Disposable;
    
        constructor(debuggerCounter : DebuggerCounter) {
            this._debuggerCounter = debuggerCounter;
    
            let subscriptions: Disposable[] = [];
            window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
            window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
    
            this._debuggerCounter.updateDebuggerCounter();
     
            this._disposable = Disposable.from(...subscriptions);
        }
    
        dispose() {
            this._disposable.dispose();
        }
    
        private _onEvent() {
            this._debuggerCounter.updateDebuggerCounter();
        }
    }