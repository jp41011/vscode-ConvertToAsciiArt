[![](https://vsmarketplacebadges.dev/downloads/BitBelt.converttoasciiart.png)](https://marketplace.visualstudio.com/items?itemName=BitBelt.converttoasciiart)

## Feautres

Converts text to ASCII art.

Go from this:
```
The cake
is a lie!
```
To this:
```
████████╗██╗  ██╗███████╗     ██████╗ █████╗ ██╗  ██╗███████╗
╚══██╔══╝██║  ██║██╔════╝    ██╔════╝██╔══██╗██║ ██╔╝██╔════╝
   ██║   ███████║█████╗      ██║     ███████║█████╔╝ █████╗  
   ██║   ██╔══██║██╔══╝      ██║     ██╔══██║██╔═██╗ ██╔══╝  
   ██║   ██║  ██║███████╗    ╚██████╗██║  ██║██║  ██╗███████╗
   ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                                             
██╗███████╗     █████╗     ██╗     ██╗███████╗██╗            
██║██╔════╝    ██╔══██╗    ██║     ██║██╔════╝██║            
██║███████╗    ███████║    ██║     ██║█████╗  ██║            
██║╚════██║    ██╔══██║    ██║     ██║██╔══╝  ╚═╝            
██║███████║    ██║  ██║    ███████╗██║███████╗██╗            
╚═╝╚══════╝    ╚═╝  ╚═╝    ╚══════╝╚═╝╚══════╝╚═╝            
```
(font: ANSI Shadow)

## Extension Activation

`Ctrl+Alt+a`: Activate extention to convert selected text.
![Activate Extension](resources/activateExtension.gif)


`Ctrl+Alt+1`: Convert selected text using favorite ASCII font settings.
![Activate Extension with favorite font](resources/activateExtension_keyboardShortcut.gif)

## Extension Commands
|Command|Keybinding|
|--|--|
|`Convert to ASCII Art`| `Ctrl+Alt+a` (default)|
|`Convert to ASCII Art (Comment)`| empty|
|`Convert to ASCII Art with Favorite Font`| `Ctrl+Alt+1` (default)|
|`Convert to ASCII Art with Favorite Font (Comment)`| empty|

## Extension Settings

This extension contributes the following settings:

* `convertToAsciiArt.favoriteFont` : Favorite font (case sensitive).
* `convertToAsciiArt.favoriteHorizontalLayout` : Favorite horizontal layout setting.
* `convertToAsciiArt.favoriteVerticalLayout` : Favorite vertical layout setting.

**Enjoy!**