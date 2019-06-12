// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Window = vscode.window;
import QuickPickItem = vscode.QuickPickItem;

var figlet = require('figlet');

function function1()
{
	console.log('function1');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "converttoascii" is now active!');

	function1();
	function2();
	console.log('testing1');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');

		console.log('Hello World function');
		function1();
		function2();
		console.log('Hello World function end');
	});

	function function2()
	{
		console.log('function2');
	}

	//
	let disposableConvertToAscii = vscode.commands.registerCommand('extension.convertToAscii', () => 
	{
		console.log('convertToAscii Start');

		var items: QuickPickItem[] = [];
		
		figlet.fontsSync().forEach(function (font: string) {
			items.push({ label: font, description: "Use the " + font + " font" });
		});

		Window.showQuickPick(items).then(function (fontSelection) {
			if (!fontSelection) {
				return;
			}
			console.log('convertToAscii in showQuickPick');
			//processSelection(e, d, sel, figlet.textSync, [selection.label]);
			//fontSelection.label
			funcConvertToAscii(fontSelection.label);
		});
		console.log('convertToAscii End');
	});

	function funcConvertToAscii(fontSelection: string)
	{
		console.log('funcConvertToAscii: ' + fontSelection);

		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			
			let asciiWord = figlet.textSync(word, {font: fontSelection});

			editor.edit(editBuilder => {
				editBuilder.replace(selection, asciiWord);
			});
		}
	}

	// Convert to ASCII using user's config (favorite) settings.
	let disposableConvertToAscii_Favorite = vscode.commands.registerCommand('extension.convertToAscii_Favorite', () => 
	{
		//var figlet = require('figlet');

		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			
			// Get user config settings
			let userConfig = vscode.workspace.getConfiguration('convertToAscii');
			let favoriteFont = userConfig.get('favoriteFont');
			let favoriteHorizontalLayout = userConfig.get('favoriteHorizontalLayout');
			let favoriteVerticalLayout = userConfig.get('favoriteVerticalLayout');
			
			let asciiWord = figlet.textSync(word, {font: favoriteFont
												, horizontalLayout: favoriteHorizontalLayout
												, verticalLayout: favoriteVerticalLayout
											});

			editor.edit(editBuilder => {
				editBuilder.replace(selection, asciiWord);
			});
		}

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableConvertToAscii);
	context.subscriptions.push(disposableConvertToAscii_Favorite);
}

// this method is called when your extension is deactivated
export function deactivate() {}
