---
lesson_id: frontend.ch01.l03
title: "1.3 The terminal"
chapter: 1
order: 3
estimated_minutes: 40
prerequisites:
  - frontend.ch01.l02
---

# 1.3 The terminal

You have clicked folders open with a mouse your whole life. The terminal does the
same jobs by typing. It feels slow at first. Then it becomes the fastest way to
move around your computer. Developers live in it.

## What you'll know by the end

- What a terminal is, and why developers use it
- The different terminal apps on Windows and macOS, and which to use
- How to read the prompt, the text already sitting there
- The everyday commands for moving and making files
- How to make it your own, with colours and a few fun commands

---

## What a terminal is

A terminal is a window where you type commands instead of clicking. You type one
line, press Enter, and the computer does it. The program that reads your line and
runs it is called a **shell** (Roman Urdu: woh program jo terminal mein tumhari
command parh kar chalata hai).

Why bother, when clicking works? Three reasons. It is faster once you know it.
It works the same on every machine. And almost every developer tool, like Git
and Node, expects you to use it.

<figure markdown>
<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-terminal-title" style="max-width:100%;height:auto">
  <title id="svg-terminal-title">A terminal window mockup. It labels the prompt, the current folder shown in the prompt, the command you typed, and the output printed below.</title>
  <g>
    <rect x="30" y="40" width="740" height="240" rx="10" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <line x1="30" y1="74" x2="770" y2="74" stroke="#1f1f1c" stroke-width="1.5"/>
    <circle cx="52" cy="57" r="5" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <circle cx="72" cy="57" r="5" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
    <circle cx="92" cy="57" r="5" fill="#ffffff" stroke="#1f1f1c" stroke-width="1.5"/>
  </g>
  <g font-family="Inter, sans-serif">
    <text x="400" y="62" font-size="13" fill="#6b6b65" text-anchor="middle">Ubuntu (bash)</text>
  </g>
  <g font-family="JetBrains Mono, monospace" font-size="15" fill="#1f1f1c">
    <text x="52" y="118"><tspan font-weight="700">ali@laptop</tspan>:<tspan font-weight="700">~/projects</tspan>$ ls</text>
    <text x="52" y="148">notes.txt   site   images</text>
    <text x="52" y="178"><tspan font-weight="700">ali@laptop</tspan>:<tspan font-weight="700">~/projects</tspan>$</text>
  </g>
  <defs>
    <marker id="bq-arrow-term" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#bq-arrow-term)">
    <line x1="97" y1="300" x2="97" y2="126"/>
    <line x1="205" y1="300" x2="196" y2="126"/>
    <line x1="345" y1="300" x2="268" y2="126"/>
    <line x1="545" y1="300" x2="270" y2="152"/>
  </g>
  <g fill="currentColor" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
    <text x="97" y="314">the prompt</text>
    <text x="205" y="314">current folder</text>
    <text x="345" y="314">command you typed</text>
    <text x="545" y="314">the output below</text>
  </g>
</svg>
<figcaption>A terminal window. The prompt waits for you. It shows who you are and the current folder. You type a command, press Enter, and the output prints below.</figcaption>
</figure>

---

## Reading the prompt

When you open the terminal, there is already some text sitting there, ending in a
`$`. That is the **prompt**, and it is not random. It tells you who and where you
are. A typical Linux prompt looks like this:

```text
ali@laptop:~/projects$
```

Here is what each part means:

| Part | What it means |
| --- | --- |
| `ali` | your username on the computer |
| `@laptop` | the name of the computer you are on |
| `~` | your home folder, your starting place |
| `~/projects` | the `projects` folder inside your home folder |
| `$` | the prompt symbol; you type your command right after it |

So `ali@laptop:~/projects$` simply says: "Ali, on the laptop, currently inside the
projects folder, ready for a command." After you type and press Enter, the answer
prints below, and a fresh prompt appears.

??? note urdu "اردو میں مزید وضاحت"
    ٹرمینل کھولتے ہی جو لکھائی پہلے سے موجود ہوتی ہے، اسے پرامپٹ کہتے ہیں۔ اس میں
    آپ کا یوزر نیم، کمپیوٹر کا نام، اور وہ فولڈر دکھائی دیتا ہے جس میں آپ اس وقت
    ہیں۔ `~` کا مطلب آپ کا ہوم فولڈر ہے۔ `$` کے بعد آپ اپنی کمانڈ لکھتے ہیں اور
    Enter دباتے ہیں۔

---

## Which terminal app should I open?

Different systems give you different terminal apps. Pick your tab.

=== ":material-microsoft-windows: Windows"

    Windows actually has a few, which confuses beginners:

    - **Command Prompt (cmd)** is the old, basic one. It still works, but it is limited.
    - **PowerShell** is Microsoft's newer, more powerful shell.
    - **Windows Terminal** is a modern app that holds all of them in tabs: PowerShell, Command Prompt, and your Ubuntu (WSL) shell. If you do not have it, install **Windows Terminal** free from the Microsoft Store.
    - For this course you use the **Ubuntu (bash)** shell from WSL. Open it by typing `wsl` in any terminal, or by opening **Ubuntu** from :material-microsoft-windows: Start.

=== ":material-apple: macOS"

    macOS comes with the built-in **Terminal** app. Open it with `Cmd + Space`, then type `Terminal`. It runs a Unix shell called **zsh**, which is very close to bash, so every command in this course works. (iTerm2 is a popular fancier option, but it is optional.)

=== ":material-linux: Linux"

    Your system has a terminal app already, usually opened with `Ctrl + Alt + T`. It runs **bash** or **zsh**. The commands in this course are made for it.

We use **bash** in this course for one simple reason: almost every tutorial, error
guide, and teammate online speaks bash. When you copy a command from the
internet, it usually expects bash.

---

## What can you do with the terminal?

A lot. Here are the everyday jobs you will use it for:

- Move around your files and folders, faster than clicking.
- Create, copy, move, and delete files.
- Install tools, the way you installed Node.js and Git in the last lesson.
- Run your projects, with commands like `npm run dev`.
- Use Git to save and share your code.
- Run small helpful programs, and a few fun ones too.

---

## The everyday commands

Here are the commands you will use every day. Try each one as you read. Type it,
press Enter, and watch what happens.

`pwd` prints the folder you are in right now. The letters mean "print working
directory".

```bash
# show the full path of where you are
pwd
```

`ls` lists what is inside the current folder.

```bash
# list files and folders here
ls
```

`cd` changes the folder you are in. The letters mean "change directory".

```bash
# move into a folder called projects
cd projects
# go back up one level to the parent folder
cd ..
```

`mkdir` makes a new folder.

```bash
# make a folder called site
mkdir site
```

`touch` makes a new empty file.

```bash
# make an empty file called index.html
touch index.html
```

`rm` removes a file.

```bash
# delete a file called old.txt
rm old.txt
```

!!! warning "rm does not use the Recycle Bin"
    When you delete a file with `rm`, it is gone. There is no Recycle Bin to get
    it back. Read the file name twice before you press Enter.

`cp` copies a file. You give it the source first, then the new name.

```bash
# copy notes.txt to a new file called backup.txt
cp notes.txt backup.txt
```

`mv` moves or renames a file. Same shape: old name first, new name second.

```bash
# rename draft.txt to final.txt
mv draft.txt final.txt
```

---

## Send output with a pipe and a redirect

Two small symbols make the terminal feel powerful. You will meet them often.

A **pipe** (Roman Urdu: woh `|` nishan jo ek command ka natija dusri command ko
deta hai) is the `|` symbol. It takes the output of one command and feeds it into
the next. Think of it as a tube between two commands.

```bash
# list files, then count how many lines that list has
ls | wc -l
```

The `>` symbol redirects output into a file instead of the screen. If the file
exists, it gets overwritten.

```bash
# write the text into a new file called hello.txt
echo "Salaam dunya" > hello.txt
```

After that second command, open `hello.txt` and you will see your text inside. The
words never printed on screen. They went straight into the file.

---

## Read an error message calmly

Errors look scary. They are not. An error message is the computer telling you
exactly what stopped it. The trick is simple: read the last line first.

```bash
# try to enter a folder that does not exist
cd projcts
```

```text
bash: cd: projcts: No such file or directory
```

Read the last part: "No such file or directory". The folder name is wrong. You
typed `projcts` instead of `projects`. Fix the spelling and try again. Most
errors are this small.

---

## Make it yours: colours and fun

The terminal does not have to be a plain black box. Making it pretty makes you
want to spend time in it, and spending time in it is how you get fast.

### Change the colours

=== ":material-microsoft-windows: Windows"

    In **Windows Terminal**, press `Ctrl + ,` to open Settings, choose your profile, and pick a **Color scheme** like "One Half Dark" or "Campbell". In VS Code's built-in terminal, the colours follow your editor theme.

=== ":material-apple: macOS"

    Open **Terminal**, then **Terminal > Settings > Profiles**, and pick a theme like "Pro" or "Homebrew". Click the default button to keep it.

=== ":material-linux: Linux"

    Open your terminal app's **Preferences** or **Profile** settings and choose a colour scheme. Most terminals ship with several.

### Run a few fun commands

These little programs are pure fun, and they prove your terminal works. On Ubuntu
or Linux, install three of them at once:

```bash
# install three playful tools
sudo apt install cowsay figlet lolcat
```

Now try them:

```bash
# a cow says whatever you type
cowsay "Salaam, BanoQabil!"
# turn text into big ASCII letters
figlet "Hello"
# add rainbow colours by piping into lolcat
figlet "Hello" | lolcat
```

`cowsay` draws a cow with a speech bubble, `figlet` makes giant letters out of
text, and `lolcat` paints anything you pipe into it in rainbow colours. Notice the
`|` pipe from the last section doing real work.

!!! tip "Show off your machine"
    Try `neofetch` (install with `sudo apt install neofetch`). It prints your
    system details next to a piece of logo art. If your system does not have it,
    its modern replacement is `fastfetch`. On macOS, install these with
    `brew install cowsay figlet` instead of `apt`.

---

### Try this (5 minutes)

Open your terminal and follow along. Type each line, press Enter, and watch the
result.

```bash
# make a folder to practice in
mkdir practice
# move into it
cd practice
# create an empty file
touch hello.txt
# list the folder to see your file
ls
# remove the file (remember: no Recycle Bin)
rm hello.txt
```

If `ls` showed `hello.txt`, you did it right. You just made a folder, entered it,
created a file, listed it, and removed it. That is the daily work of the terminal.
For a reward, run `cowsay "I can use the terminal"` and enjoy.

---

## Knowledge check

Don't write anything down. Just answer these in your head. If you can't, scroll
back up.

1. In the prompt `ali@laptop:~/projects$`, what does the `~` mean?
2. On Windows, what is the difference between Command Prompt and Windows Terminal?
3. What does the `pwd` command tell you?
4. Why is there no Recycle Bin when you use `rm`?
5. What does the `|` symbol do between two commands?

---

## What's next

You can move around your computer by typing now. Next you will open the browser's
built-in tools, where you inspect a live web page and watch it change.

[Next lesson: 1.4 Browser DevTools &rarr;](1-4-devtools.md){ .next-lesson }

---

## Going deeper (optional)

These are for the curious. You don't need them to continue.

- Ubuntu: [The Linux command line for beginners](https://ubuntu.com/tutorials/command-line-for-beginners) a gentle tour of bash.
- The Odin Project: [Command line basics](https://www.theodinproject.com/lessons/foundations-command-line-basics) more practice with the same commands.
- MDN: [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) the developer view of the terminal.

---

<!-- The Mark Complete button is injected here automatically by the site template. -->

<!-- Glossary tooltips used in this lesson. -->
*[terminal]: A window where you type commands instead of clicking. (Roman Urdu: woh window jahan tum mouse ke bajaye command type karte ho)
*[shell]: The program inside the terminal that reads your command and runs it. Bash is one shell. (Roman Urdu: woh program jo terminal mein tumhari command parh kar chalata hai)
*[prompt]: The text already in the terminal, ending in $, that shows who and where you are and waits for your command. (Roman Urdu: terminal mein pehle se mojood likhai jo tumhari command ka intezar karti hai)
*[command]: One typed instruction you give the shell, like ls or cd. (Roman Urdu: ek likhi hui hidayat jo tum shell ko dete ho)
*[directory]: Another word for a folder, used a lot in the terminal. (Roman Urdu: folder ka dusra naam, terminal mein aksar istemaal hota hai)
*[pipe]: The | symbol that sends one command's output into the next command. (Roman Urdu: woh | nishan jo ek command ka natija dusri command ko deta hai)
