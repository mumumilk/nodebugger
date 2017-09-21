'use strict';
import * as vscode from 'vscode';
import { DebuggerCounter } from './debugger-counter';
import { DebuggerCounterController } from './debugger-controller';


export function activate(context: vscode.ExtensionContext) {

    console.log('Yay! No more debuggers in your commits');

    var commandClearAll = vscode.commands.registerCommand('extension.clearAllDebuggers', () => {
        vscode.window.showInformationMessage('clear all ');
    });
    var commandClearFile = vscode.commands.registerCommand('extension.clearFileDubuggers', () => {
        vscode.window.showInformationMessage('clear file');
    });

    context.subscriptions.push(commandClearAll);
    context.subscriptions.push(commandClearFile);

    let debuggerCounter = new DebuggerCounter();
    let debuggerController = new DebuggerCounterController(debuggerCounter);

    context.subscriptions.push(debuggerController);
    context.subscriptions.push(debuggerCounter);


}

export function deactivate() {
}

