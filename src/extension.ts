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

	console.log('main ext func.');
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

	// Select ASCII font and convert selected text into ASCII art.
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
			convertToAscii(fontSelection.label);
		});
		console.log('convertToAscii End');
	});

	// Convert to ASCII using user's config (favorite) settings.
	let disposableConvertToAscii_Favorite = vscode.commands.registerCommand('extension.convertToAscii_Favorite', () => 
	{
		console.log('func_favorite()');
		//var figlet = require('figlet');

		// Get user config settings
		let userConfig = vscode.workspace.getConfiguration('convertToAscii');
		let favoriteFont = userConfig.get('favoriteFont');
		let temp2:string = String(favoriteFont);

		convertToAscii(temp2);

		console.log('func_favorite() end.');
	});

	// Converts selected text into ASCII using the given fontSelection.
	function convertToAscii(fontSelection: string|undefined)
	{
		console.log('convertToAscii: ' + fontSelection);

		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			
			// Get user config settings
			let userConfig = vscode.workspace.getConfiguration('convertToAscii');
			//let favoriteFont = userConfig.get('favoriteFont');
			let favoriteHorizontalLayout = userConfig.get('favoriteHorizontalLayout');
			let favoriteVerticalLayout = userConfig.get('favoriteVerticalLayout');

			let asciiWord = figlet.textSync(word, {font: fontSelection
													, horizontalLayout: favoriteHorizontalLayout
													, verticalLayout: favoriteVerticalLayout
												});

			editor.edit(editBuilder => {
				editBuilder.replace(selection, asciiWord);
			});
		}
	}

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableConvertToAscii);
	context.subscriptions.push(disposableConvertToAscii_Favorite);
}

// this method is called when your extension is deactivated
export function deactivate() {}
