// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Window = vscode.window;
import QuickPickItem = vscode.QuickPickItem;

var figlet = require('figlet');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "converttoasciiart" is now active!');
	//console.log('main func.');
	//console.error('testing error');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	// Select ASCII Art font and convert selected text into ASCII Art.
	let disposableConvertToAsciiArt = vscode.commands.registerCommand('extension.convertToAsciiArt', () => 
	{
		var items: QuickPickItem[] = [];
		
		// Get list of fonts and add them to items array.
		figlet.fontsSync().forEach(function (font: string) {
			items.push({ label: font, description: "Use the " + font + " font" });
		});

		Window.showQuickPick(items).then(function (fontSelection) {
			if (!fontSelection) {
				return;
			}

			convertToAsciiArt(fontSelection.label);
		});

	});

	// Get user's favorite settings and convert selected text into ASCII Art.
	let disposableConvertToAsciiArt_Favorite = vscode.commands.registerCommand('extension.convertToAsciiArt_Favorite', () => 
	{
		// Get user config settings
		let userConfig = vscode.workspace.getConfiguration('convertToAsciiArt');
		let favoriteFont = userConfig.get('favoriteFont');
		let temp2:string = String(favoriteFont); // TODO be better

		// TODO: If favoriteFont is invalid show error
		//Window.showErrorMessage('Testing Error Message');

		convertToAsciiArt(temp2);
	});

	// Converts selected text into ASCII using the given fontSelection.
	function convertToAsciiArt(fontSelection: string|undefined)
	{
		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Get the selectedText within the selection
			let selectedText = document.getText(selection);
			
			// Get user config settings
			let userConfig = vscode.workspace.getConfiguration('convertToAsciiArt');
			//let favoriteFont = userConfig.get('favoriteFont');
			let favoriteHorizontalLayout = userConfig.get('favoriteHorizontalLayout');
			let favoriteVerticalLayout = userConfig.get('favoriteVerticalLayout');

			// get ASCII text
			let asciiText = figlet.textSync(selectedText, {font: fontSelection
													, horizontalLayout: favoriteHorizontalLayout
													, verticalLayout: favoriteVerticalLayout
												});
			
			// replace selected text with ASCII text
			editor.edit(editBuilder => {
				editBuilder.replace(selection, asciiText);
			});
		}
	}

	context.subscriptions.push(disposableConvertToAsciiArt);
	context.subscriptions.push(disposableConvertToAsciiArt_Favorite);
}

// this method is called when your extension is deactivated
export function deactivate() {}
