'use strict';
import * as vscode from 'vscode';
import { DebuggerCounter } from './debugger-counter';
import { DebuggerCounterController } from './debugger-controller';


export function activate(context: vscode.ExtensionContext) {

    console.log('Yay! No more debuggers in your commits');

    let debuggerCounter = new DebuggerCounter();
    let debuggerController = new DebuggerCounterController(debuggerCounter);

    context.subscriptions.push(debuggerController);
    context.subscriptions.push(debuggerCounter)
}

export function deactivate() {
}

