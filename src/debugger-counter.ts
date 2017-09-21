import { StatusBarItem, window, StatusBarAlignment, TextDocument } from "vscode";

export class DebuggerCounter {
    private _statusBarItem : StatusBarItem;

    public updateDebuggerCounter(){
        if(!this._statusBarItem){
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        let editor = window.activeTextEditor;
        if(!editor){
            this._statusBarItem.hide();
            return;
        }

        let doc = editor.document;

        if(doc.languageId === 'typescript'){
            let debuggerCount = this.getDebuggerCount(doc);
            
            this._statusBarItem.text = debuggerCount !== 1 ? `${debuggerCount} Debuggers` : '1 Debugger';
            this._statusBarItem.show();
        } else {
            this._statusBarItem.hide();
        }
    }

    public getDebuggerCount(doc: TextDocument) : number {
        let docContent = doc.getText();
        return docContent != "" ? docContent.split(/\bdebugger\b/g).length > 0 ? docContent.split(/\bdebugger\b/g).length - 1 : docContent.split(/\bdebugger\b/g).length : 0;
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}