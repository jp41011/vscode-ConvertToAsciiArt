// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import figlet = require('figlet');
import Window = vscode.window;
import QuickPickItem = vscode.QuickPickItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	figlet.defaults({ fontPath: path.join(context.extensionPath, 'out', 'fonts') });

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

	let disposableConvertToAsciiArt_Favorite_Comment = 
		vscode.commands.registerCommand('extension.convertToAsciiArt_Favorite_Comment', () => 
		{
			let favoriteFontProp = vscode.workspace.getConfiguration('convertToAsciiArt')
									.get('favoriteFont');
			let favoriteFont:string = String(favoriteFontProp);
			convertToAsciiArtComment(favoriteFont);
		});

	// Converts selected text into ASCII using the given fontSelection.
	function convertToAsciiArt(fontSelection: string|undefined): Thenable<vscode.Range | undefined>
	{
		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (!editor) {
			return Promise.resolve(undefined);
		}

		let document = editor.document;
		let selection = editor.selection;

		// Get the selectedText within the selection
		let selectedText = document.getText(selection);
		
		// Get user config settings
		let userConfig = vscode.workspace.getConfiguration('convertToAsciiArt');
		//let favoriteFont = userConfig.get('favoriteFont');
		let favoriteHorizontalLayout = userConfig.get<figlet.KerningMethods>('favoriteHorizontalLayout');
		let favoriteVerticalLayout = userConfig.get<figlet.KerningMethods>('favoriteVerticalLayout');

		// get ASCII text
		let asciiText = figlet.textSync(selectedText, {font: fontSelection
												, horizontalLayout: favoriteHorizontalLayout
												, verticalLayout: favoriteVerticalLayout
											});

		// compute the range the ASCII art will occupy after replacement
		let asciiLines = asciiText.split('\n');
		let asciiRange = new vscode.Range(
			selection.start.line,
			selection.start.character,
			selection.start.line + asciiLines.length - 1,
			asciiLines[asciiLines.length - 1].length
		);
		
		// replace selected text with ASCII text
		return editor.edit(editBuilder => {
			editBuilder.replace(selection, asciiText);
		}).then(success => success ? asciiRange : undefined);
	}

	/**
	 * Convert highlighted text selection into ASCII Art with comment prefix.
	 * @param asciiFontSelection ASCII Font
	 */
	function convertToAsciiArtComment(asciiFontSelection: string) : void
	{
		convertToAsciiArt(asciiFontSelection).then(asciiRange => {
			if (!asciiRange) {
				return;
			}
			var editor = vscode.window.activeTextEditor;
			if (editor) {
				editor.selection = new vscode.Selection(asciiRange.start, asciiRange.end);
				vscode.commands.executeCommand('editor.action.commentLine');
			}
		});
	}

	context.subscriptions.push(disposableConvertToAsciiArt);
	context.subscriptions.push(disposableConvertToAsciiArt_Favorite);
	context.subscriptions.push(disposableConvertToAsciiArt_Favorite_Comment);
}

// this method is called when your extension is deactivated
export function deactivate() {}
