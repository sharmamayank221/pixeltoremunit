// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let decorationType: vscode.TextEditorDecorationType | undefined;


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('pixelstorem.pixeltorem', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	pixelstorem();
		

	// });
	const disposable2 = vscode.commands.registerCommand('pixelstorem.showRemValueforPx', () => {
		showRemValueforPx();
		});

//	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// function pixelstorem() {
// 	const editor = vscode.window.activeTextEditor;
// 	if (!editor) {
// 		vscode.window.showErrorMessage("No active editor found");
// 		return;
// 	}
// 	if (decorationType) {
//     editor.setDecorations(decorationType, []);
//   }
// 	const searchpxineveryline = editor.document.getText();
// 	let pxcount = 0;
// 	let updatedText = searchpxineveryline.replace(/(\d+)px/g, (match, p1) => {
// 		pxcount++;
// 		return `${p1 / 16}rem`;
// 	});

// 	if (pxcount === 0) {
// 		vscode.window.showInformationMessage("No px found in the document");
// 		return;
// 	}

// 	editor.edit((editBuilder) => {
// 		const entireRange = new vscode.Range(
// 			editor.document.positionAt(0),
// 			editor.document.positionAt(searchpxineveryline.length)
// 		);
// 		editBuilder.replace(entireRange, updatedText);
// 	});
// }

function showRemValueforPx() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage("No active editor found");
        return;
    }

    const document = editor.document;
    const text = document.getText();
    const regex = /(\d+)px/g;
    let match;

    const decorations: vscode.DecorationOptions[] = [];

    while ((match = regex.exec(text)) !== null) {
        const pxValue = match[0];
        const value = parseFloat(match[1]);
        const remValue = value / 16;
        const remText = ` (${remValue}rem)`;

        const startPos = document.positionAt(match.index + pxValue.length);
        const endPos = startPos;

        const decoration = {
            range: new vscode.Range(startPos, endPos),
            renderOptions: {
                after: {
                    contentText: remText,
                    color: 'gray',
                    fontStyle: 'italic'
                }
            }
        };

        decorations.push(decoration);
    }

    const decorationType = vscode.window.createTextEditorDecorationType({});
    editor.setDecorations(decorationType, decorations);
}

// This method is called when your extension is deactivated
export function deactivate() {}
