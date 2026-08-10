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
		let asciiQuickPickList = getASCIIFontQuickPickList();

		Window.showQuickPick(asciiQuickPickList).then(function (fontSelection) {
			if (!fontSelection) {
				return;
			}

			convertToAsciiArt(fontSelection.label);
		});

	});

	let disposableConvertToAsciiArt_Comment = vscode.commands.registerCommand('extension.convertToAsciiArt_Comment', () => 
	{
		let asciiQuickPickList = getASCIIFontQuickPickList();
		
		Window.showQuickPick(asciiQuickPickList).then(function(selectedFont){
			if(!selectedFont)
				return;

			convertToAsciiArtComment(selectedFont.label);
		});

	});

	function getASCIIFontQuickPickList(): QuickPickItem[]
	{
		let quickPickList:QuickPickItem[] = [];
		
		figlet.fontsSync().forEach(function(font:string){
			quickPickList.push({label: font, description: "Use the " + font + " font" });
		});

		return quickPickList;
	}

	let disposableConvertToAsciiArt_Favorite = 
		vscode.commands.registerCommand('extension.convertToAsciiArt_Favorite', () => 
	{
		// Get user config settings
		let userConfig = vscode.workspace.getConfiguration('convertToAsciiArt');
		let favoriteFont = userConfig.get('favoriteFont');
		let favoriteFontStr:string = String(favoriteFont); // TODO be better

		// TODO: If favoriteFont is invalid show error
		//Window.showErrorMessage('Testing Error Message');

		//let favoriteFont2 = vscode.workspace.getConfiguration('convertToAsciiArt').get('favoriteFont');

		convertToAsciiArt(favoriteFontStr);
	});

	let disposableConvertToAsciiArt_Favorite_Comment = 
		vscode.commands.registerCommand('extension.convertToAsciiArt_Favorite_Comment', () => 
		{
			let favoriteFontProp = vscode.workspace.getConfiguration('convertToAsciiArt')
									.get('favoriteFont');
			let favoriteFont:string = String(favoriteFontProp);

			convertToAsciiArtComment(favoriteFont);
		});

	/**
	 * Convert current text selection into ASCII art
	 * @param selectedFont ASCII Font
	 * @returns 
	 */
	async function convertToAsciiArt(selectedFont: string|undefined): Promise<vscode.Range | undefined>
	{
		let activeEditor = vscode.window.activeTextEditor;

		if (!activeEditor) {
			return undefined;
		}

		let document = activeEditor.document;

		// Get highlighted selection and highlighted text
		let hlSelection = activeEditor.selection;
		let hlText = document.getText(hlSelection);

		let userConfig = vscode.workspace.getConfiguration('convertToAsciiArt');

		let favoriteHorizontalLayout = userConfig.get<figlet.KerningMethods>('favoriteHorizontalLayout');
		let favoriteVerticalLayout = userConfig.get<figlet.KerningMethods>('favoriteVerticalLayout');

		// get ASCII version of highlightedText
		let asciiText:string = figlet.textSync(hlText, {font: selectedFont
												, horizontalLayout: favoriteHorizontalLayout
												, verticalLayout: favoriteVerticalLayout
											});

		// Compute the line range the new ASCII art will occupy
		let asciiLines = asciiText.split('\n');

		let asciiLineRange = new vscode.Range(
			hlSelection.start.line,
			hlSelection.start.character,
			hlSelection.start.line + asciiLines.length - 1,
			asciiLines[asciiLines.length - 1].length
		);
		
		// replace selected text with ASCII text
		const success = await activeEditor.edit(editBuilder => {
			editBuilder.replace(hlSelection, asciiText);
		});

		return success ? asciiLineRange : undefined;
	}

	/**
	 * Convert text selection into ASCII Art with comment prefix.
	 * @param selectedFont ASCII Font
	 */
	function convertToAsciiArtComment(selectedFont: string) : void
	{
		convertToAsciiArt(selectedFont).then(asciiRange => {
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
	context.subscriptions.push(disposableConvertToAsciiArt_Comment);
	context.subscriptions.push(disposableConvertToAsciiArt_Favorite);
	context.subscriptions.push(disposableConvertToAsciiArt_Favorite_Comment);
}

// this method is called when your extension is deactivated
export function deactivate() {}
