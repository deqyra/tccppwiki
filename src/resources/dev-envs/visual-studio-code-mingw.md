# Setting up Visual Studio Code for Windows

Visual Studio Code (abbreviated VS Code) is an open-source text editor developed by Microsoft. It is highly configurable
and allows developers to tweak every bit of their workflow to their liking. Configuring it however can quickly get
involved, which for beginners can be a deal breaker. Windows users in particular may choose to go with
**[Visual Studio Community](/resources/dev-envs/visual-studio-community)** for a smoother experience.

## What's the difference between VS Code and Visual Studio Community?
<VisualStudio /> Visual Studio Community is an IDE for Windows. When you install it, you get all big three components of
any respectable C++ development environment at once: an editor, a compiler, and a debugger. All three of them are set up
to work together, which means you can get to writing, compiling and debugging code right away.  

<VSCode /> VS Code is a text editor on steroids. It's available on every major OS, packs a lot of developer-oriented
features and provides facilities to interact with other tooling. On its own, VS Code is about as good as any other
decent text editor, leaving up to you all the extra steps that there are to compiling and debugging C++ code. In order
to get closer to an IDE experience like that of Visual Studio Community, you need to install a compiler and a debugger
separately, and then configure VS Code to work with them. It's more work, but you end up with a more flexible and 
customizable setup, and you get acquainted with your toolchain along the way.

---

This entire page will guide you through installing and configuring all the tools you need to use VS Code as a C++-ready
IDE. Be aware though that it is going to be a fairly long read. The amount of new information was kept at a minimum, but
it can still be lots to take in. Take breaks if you feel like you need them. This page isn't going anywhere. 🙂

::: info About this page
The instructions which follow are largely sampled from **[HolyBlackCat's repository of C++ tutorials]**. Feel free to
visit it for a more in-depth tour of the options you have and the rationale behind the choice of tools we will be
installing.
:::

## Installing a C++ toolchain
A toolchain is a set of tools which when used together can turn C++ code into an executable file. This section explains
how to install Clang and its associated tools through MSYS2, a distribution of MinGW.

::: tip Quick glossary
**MinGW**, an acronym for _"Minimalist GNU for Windows"_, is a set of common Linux tools which were ported to Windows to
provide a Linux-like environment on Windows. MinGW does not have an official installation binary, instead we get to
choose from different distributions of MinGW.  

**MSYS2** is one such packaging of MinGW. It is complete, convenient, up-to-date and still maitained today.  

**Clang** is a compiler. It can compile C++ code but does not produce an executable file -- another tool has to run 
before the compiled code becomes an executable file. Installing Clang through MSYS2 allows us to have the entire suite
of Clang-related tools installed with it.
:::

1. **Download the installer** from the [MSYS2 website] and run it.  
Leave the default install location unchanged. If for some reason you _must_ change it, make sure it contains only
unaccentuated Latin characters and no spaces.  
If you run into any strange issues during installation (or later), try disabling your antivirus software or adding
the MSYS2 install location (`C:\msys64` by default) as an exception in its settings.  
Uncheck the `Run MSYS2 now` option at the end of installation, or close the window that the installer opens.

2. **Start MSYS2**  
The Windows Start menu will have several different shortcuts. Select the one which reads `MSYS2 CLANG64`.  
![MSYS2 environments in the Windows Start menu](/assets/msys2-env-shortcuts.png)

The window that opens is called a "terminal" or a "console". You can type commands in there to interact with the MSYS2
environment.  
**Make sure** the prompt reads `CLANG64` in purple text. If it says something else, you used the wrong shortcut. Close
that terminal and start the correct one instead.  

3. **Update MSYS2**  
The following commands should all be run in the MSYS2 CLANG64 terminal. First, run **`pacman -Syu`**.

::: warning Pasting commands in the MSYS2 terminal
<kbd>Ctrl</kbd>+<kbd>V</kbd> doesn't work in the MSYS2 terminal. Instead, use <kbd>Shift</kbd>+<kbd>Insert</Kbd>, or
right-click anywhere and select "Paste".
:::

When you run the command above, you will eventually asked to confirm the operation:
``` :no-line-numbers
:: Proceed with installation? [Y/n]
```
Press <kbd>Enter</kbd> to continue.  

It is possible that you get this message sometimes:
```
:: To complete this update all MSYS2 processes including this terminal will be closed. Confirm to proceed [Y/n]
```
Press <kbd>Enter</kbd> and the terminal will close. **If this happens, restart the MSYS2 terminal and run `pacman -Syu`
again to finish the update.**

::: tip What is `pacman`?
`pacman` is the package manager for the MSYS2 environment. Packages can be anything ranging from programs and libraries
to text files, and `pacman` is a convenient utility which knows where to fetch packages from, how and where to install
them, how to update them, how they depend on one another so you don't have to figure that out yourself.

This command you just ran updated `pacman`'s package database (the list of places where it can fetch packages from) and
upgraded all installed packages to newer versions if some were found to be outdated. It's a good idea to run this
command every once in a while to keep your tools up-to-date.
:::

4. **Install the Clang toolchain**
Run `pacman -S mingw-w64-clang-x86_64-clang` to install the entire Clang toolchain. Press <kbd>Enter</kbd> when asked to
confirm. You'll notice that a fair amount of stuff is getting installed. This is `pacman` working its magic to install
not just Clang and its associated tools but also every other package required for them to properly function.

After a short while, the installation will be over. Now, type `clang++ --version`. You should see something like this:

``` :no-line-numbers
clang version 20.1.0
Target: x86_64-w64-windows-gnu
Thread model: posix
InstalledDir: C:/msys64/clang64/bin
```

This means you successfully installed Clang.

## Installing VS Code

Go the [VS Code website], download the installer, and run it to install VS Code. This doesn't require any special
instructions, just make your way through the installer.

## Configuring VS Code

Now that VS Code is installed, we need to tell it how to work with all the tools we installed in the previous sections.
We'll begin with the terminal. Start your freshly installed VS Code.

### First encounter with the VS Code terminal

VS Code has a built-in terminal, which you can open by selecting `View`→`Terminal` in the top bar. In the panel which
appears, you should see a prompt that resembles the following:
``` :no-line-numbers
PS C:\Users\user>
```

If you go ahead and try to run `clang++` in it, like you did above, you are going to get an error:
``` :no-line-numbers
PS C:\Users\user> clang++ --version
clang++ : The term 'clang++' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is
correct and try again.
At line:1 char:1
+ clang++ --version
+ ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (clang++:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```

That is because this terminal instance uses a different shell, in this case PowerShell, as is displayed by VS Code
in the top-right corner of the terminal pane.

::: tip What is a shell?
A **shell** is a program that accepts commands from you (such as `clang++ --version`, which you ran above) and executes
them (often by running other programs, in this case by running the Clang compiler).

A **terminal** is a dumb program that displays text. A shell is what actually understands the commands you type.

A shell and a terminal are usually used together: the terminal **provides the window and draws text in it**, while the
shell **interprets the user commands**. The MSYS2 terminal from before uses a shell named Bash.
:::

You can usually recognize a shell by its _prompt_ (the text it prints when asking you for a command). You have to know
which shell you're using, because as you noticed the difference can matter: you can run `clang++` in MSYS2 Bash but not
in PowerShell **_by default_**.

When you ran `clang++ --version` in the MSYS2 terminal, it ended up running a program named `clang++.exe` located at
`C:\msys64\clang64\bin`:
![An Explorer window showing where Clang++ is located](/assets/clang-exe-location.png)

The reason why the MSYS2 shell knew to look there for `clang++.exe` is because of a setting called `PATH`.

### The `PATH` environment variable

`PATH` is a list of directories that will be searched by a shell when it needs to run a program. To see the contents of
`PATH`, run `echo $env:PATH` in VS Code's PowerShell and `echo $PATH` in the MSYS2 terminal. The commands
are different because the shells that you run them into are different, and expect things to be in a slightly different
format. You should see this:
![PATH printed in both MSYS2 Bash and PowerShell](/assets/default-shell-paths.png)

We get two different lists of directories.  

In MSYS2, the first one is `/clang64/bin`. The `/` at the beginning refers to the MSYS2 installation directory, so this
entire path actually translates to `C:\msys64\clang64\bin`. This directory is where `clang++.exe` is located, and this
is why the MSYS2 shell knows what to do when asked to run a command like `clang++ --version`. In PowerShell however,
this directory isn't listed at all, which is the reason PowerShell doesn't understand such commands... yet.

Luckily, the fix is simple: we only need to change the value of `PATH` in Windows.

To do so, type `env` in the Windows search bar, and choose _Edit the system environment variables_. Then in the window
which opens, click the button which reads `Environment Variables...`.

You will see two lists of variables, with `Path` in both of them. The top list (_User variables_) applies only to the
Windows user whose session is currently open, while the bottom (_System variables_) applies to every user on this
computer. In this case, you want to modify the _System variables_, and add the `C:\msys64\clang64\bin` directory **at
the very beginning of the list**. Doing so gives it the most priority, which will spare you a bunch of trouble in the
future.
![Modifying the value of PATH in Windows](/assets/modifying-path.png)

When you're done modifying `PATH`, **restart VS Code**. This is needed for the changes to be propagated to the built-in
terminal. Now if you try to run `clang++ --version` again in the VS Code terminal, it should give you the same output as
it did in the MSYS2 terminal. If you run `echo $env:PATH` again, it should now list `C:\msys64\clang64\bin` as the first
entry in the list:
![New value of PATH in PowerShell](/assets/powershell-updated-path.png)

At this point, you are ready to write C++ code and compile it with the terminal, all from VS Code.

### Your first C++ program

Finally, it's time. On the welcome page in VS Code, select the "Open folder" option. If you closed the welcome page, you
can bring bring it back by selecting `Help`→`Welcome` in the top bar. Alternatively, you can tell VS Code to open a
folder with the key chord <kbd>Ctrl</kbd>+<kbd>K</kbd>, <kbd>Ctrl</kbd>+<kbd>O</kbd>.

::: tip Pressing key chords
Sometimes, usual key shortcuts like <kbd>Ctrl</kbd>+<kbd>S</kbd> or <kbd>Ctrl</kbd>+<kbd>Z</kbd> are not
enough, and specific actions call for slightly more complex shortcuts. That's what key chords are.

When you see something like <kbd>Ctrl</kbd>+<kbd>K</kbd>, <kbd>Ctrl</kbd>+<kbd>O</kbd>, you need to press
<kbd>Ctrl</kbd>+<kbd>K</kbd> first, and then press <kbd>Ctrl</kbd>+<kbd>O</kbd>. You can keep the <kbd>Ctrl</kbd> key
pressed for the entire duration of the chord and simply press <kbd>K</kbd> and then <kbd>O</kbd> in quick succession.

VS Code is full of those. Some of them are more useful than others, but all of them can be customized to your liking.
:::

In the Explorer window which opens, browse to a location you can easily find back later  and create a new directory for
your first C++ project. You can give this directory any name you like, but avoid spaces and accented or non-Latin
characters, as some tools tend to choke on those. Once created, select your project directory and click the "Select
folder" button at the bottom-right of the Explorer window.

At this point, VS Code might be asking you whether you trust the authors of the project whose directory you're trying to
open. This is only a concern when you're working on projects that you fetched online from untrustworthy sources. Click
the button which reads "Yes, I trust the authors".

Your window should now look like the following:
![Empty project in VS Code](/assets/vscode-empty-project.png)

Not much has changed, except for the left sidebar. It's labeled _Explorer_, and its job is to show the files and 
directories that your project is made of. At the moment there are none, that's why it's completely blank except for the
name of the project directory (`CPP_DEMO` in the screenshot above). Let's fix that right now by adding some files.

If you hover on the sidebar, which we will now refer to as the _file explorer_, you'll see a bunch of icons showing up
in the top-right corner:
![File explorer icons in VS Code](/assets/vscode-file-explorer-icons.png)

Click on the leftmost icon to add a file to the project. VS Code will add an entry underneath and will wait for you to give it a name. It can be anything, as long as it does not contain spaces, nor accented or non-Latin characters, and it
should also have the `.cpp` extension.

::: tip File extensions
Conventionally, the extension of a file is the bit which comes after the last dot in the file name. It can be
arbitrarily long or small, and it's even possible to have a file without an extension. In any case, the extension of a
file is supposed to give an idea of what that file contains.

By giving our new file the extension `.cpp`, we tell VS Code that this file is meant to contain C++ code. As a
consequence, VS Code will apply C++ syntax highlighting to any code we write in this file.
:::

Once you're happy with your new file's name, press <kbd>Enter</kbd>. VS Code creates the file and immediately opens it
in the editor for you.

::: warning
It is possible at this point that VS Code might be trying to be smarter than it really is, by suggesting that you 
install the "C/C++ extension pack". **Ignore that suggestion and dismiss the pop-up. Do not install the extension
pack.** We will get to that in a short time.
:::

Paste the following bit of C++ code in your newly created file:
```cpp
#include <iostream>

int main()
{
    std::cout << "Hello!\n";
}
```

What this code means is not important for now, the goal is simply to test that your setup works. Save your file by
pressing <kbd>Ctrl</kbd>+<kbd>S</kbd> while the editor is focused.

::: warning Saving files
What VS Code shows you on-screen might not be the actual contents of the file on your disk _until you save it_. If you
forget to save your file and then compile it, you'll actually be compiling a previous version of your file, and the
results will not be consistent with your expectations. This is a common source of confusion among beginner programmers.

VS Code shows the status of the file next to its name in the editor tab at the top. 
![Display differences between saved and unsaved files in VS Code](/assets/vscode-unsaved-file.png)
A white dot in place of the cross button indicates that the file has _unsaved modifications_. Such modifications are not
present on disk and cannot be compiled until you save the file, by pressing <kbd>Ctrl</kbd>+<kbd>S</kbd> while having
the file open and focused in the editor.
:::

The next step is to actually compile your file. Open the terminal again by selecting `View`→`Terminal` in the top bar.

[HolyBlackCat's repository of C++ tutorials]: https://github.com/HolyBlackCat/cpp-tutorials?tab=readme-ov-file
[MSYS2 website]: https://www.msys2.org/
[VS Code website]: https://code.visualstudio.com/