# Gingko to Markdown

Do you know [Gingko](https://gingkoapp.com/)? If you don't here's a quick two word description: hierarchichal writing.

Basically, it allows you to write down content and organize your ideas in a hierarchical and non-linear way, opposed to streamlined word processors. It works using Markdown formatting so it's pretty easy to operate and it has manageable shortcuts so its easy to master.

I am using it myself and I wanted to have my updates being exported and uploaded to another GitHub repository, so as a part of this, I have made a quick script that will export a _tree_ and write it down as a set of Markdown files.

## What it does right now:

- Downloads the whole tree
- Saves it as markdown files
- Indicates the hierarchy of each markdown section in 
- Configurable username and password through ENV variables
- Configurable output directory

## Roadmap

- Tables of contents
- Downloading images from the web
- A few replacement macros maybe? Not sure...

## How to use

```console
USERNAME="your@email.com"
PASSWORD="yourpassword"

./run.sh <treeId> <outputDirectory>
```

Alternatively, you can modify the `loadCredentials.sh` file so that your credentials are loaded automatically.

If you want an example of the output it generates, you can check my repository [Building git](https://github.com/AlphaGit/building-git).

