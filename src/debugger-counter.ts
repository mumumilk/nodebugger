import { StatusBarItem, window, StatusBarAlignment, TextDocument, workspace } from "vscode";

export class DebuggerCounter {
    private _statusBarItem : StatusBarItem;

    public updateDebuggerCounter(){
        if(!this._statusBarItem){
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        this._statusBarItem.text =  "Debuggers: " ;

        let editor = window.activeTextEditor;

        if(!editor){
            this._statusBarItem.hide();
            return;
        } else {
            let currentDocumentDebuggers = this.getDebuggersCount(editor.document);

            this._statusBarItem.text +=  `This: ${currentDocumentDebuggers} ` ;
            this._statusBarItem.show();
        }

        if(workspace.textDocuments.length > 1){
            let allDocumentsDebuggers : number = 0;
            workspace.textDocuments.forEach(doc => {allDocumentsDebuggers += this.getDebuggersCount(doc)})
            this._statusBarItem.text +=  `Total: ${allDocumentsDebuggers} ` ;
        } 

        this._statusBarItem.show();
    }

    public getDebuggersCount(doc: TextDocument) : number {
        let docContent = doc.getText();
        return docContent != "" ? docContent.split(/\bdebugger\b/g).length > 0 ? docContent.split(/\bdebugger\b/g).length - 1 : docContent.split(/\bdebugger\b/g).length : 0;
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}