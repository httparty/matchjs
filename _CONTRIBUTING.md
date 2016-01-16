Checklist
-----------------

- [ ] Did I create my work branch off of **development** (didn't cut new branches from existing feature branches)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
- [ ] Do all of my changes directly relate to this change?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
- [ ] Did I make any requested changes from that code review?

General Workflow
-----------------

#### Checking the state of your code

1. `git status` will tell you if your changes are staged, unstaged, or a clean slate.
2. `git branch -a` will tell you what branch you are currently on.

#### Initial Setup

```
$ git clone https://github.com/polinadotio/trendr.git
$ cd
$ git remote add upstream https://github.com/mks-greenfield/trendr.git
$ git branch -a
```

1. Fork the repo.
1. Clone from the forked version on your Github account to your local machine. `git clone https://github.com/<USER-NAME>/<REPO_NAME>.git`
1. Add a remote pointing to the **original** (upstream) repository. `git remote add upstream https://github.com/<REPOSITORY_NAME>/repository.git`

#### Updating your fork

1. `git pull upstream development`
2. `npm install` to install both NPM and Bower dependencies

#### Writing and Committing Features

```
$ git checkout -b feat-branch origin/development
Branch development set up to track remote branch development from origin.
Switched to a new branch 'feat-branch'
$ git branch -a
$ git pull upstream development
From https://github.com/mks-greenfield/trendr
 * branch            development -> FETCH_HEAD
Already up-to-date.
$ git add -A
$ git status
$ git commit -m "[feat] Add feature"
$ git pull upstream development
$ git push origin feat-branch
```

1. Create a feature branch from your local master. `git checkout -b [name_of_your_new_branch]`
  - Prefix your branch name with what you are working on:
      - Example: `feat-authentication`
      - bug-...
      - feat-...
      - test-...
      - doc-...
      - refactor-...
  - View all branches: `git branch -a`
  - To create a branch off a remote branch that is not master: `git checkout -b [name_of_your_new_branch] origin/[name of remote branch]`
1. Commit every time you implement a working piece of your program. Try not to add 10 lines of code in 1 file and 20 lines in another unrelated file before committing once.
1. To stage files to commit, you can cover your bases by using `git add -A`. However you can use any of the following:
  - `git add -A`: Stage all (new, modified, deleted) files.
  - `git add .`: Stage new and modified files only.
  - `git add -u`: Stage modified and deleted files only.
  - `git add [filename]`: Stage specific file.
1. Use `git status` to verify that you've staged all files you wanted to change.
1. `git commit` to add changes.

#### Merging a Feature Branch and opening a Pull Request

1. Pull updated code from the original source repo into your local clone by running `git pull upstream development`.
1. Push your feature branch to a branch on **your** forked Repository on Github: `git push origin <branch-name>`. 

Commit Message Style
-----------------

1. Use the present tense.
1. When making commits to your feature branch, prefix each commit.
  - Example: `git commit -m '[feat] Add a new feature'`
  - [feat] Add a new feature
  - [fix] Fix inconsistent tests [Fixes #0]
  - [refactor] ...
  - [cleanup] ...
  - [test] ...
  - [doc] ...

Code Review
-----------------

A guide for reviewing code and having your code reviewed.

####Everyone

* Accept that many programming decisions are opinions. Discuss tradeoffs, which
  you prefer, and reach a resolution quickly.
* Ask questions; don't make demands. ("What do you think about naming this
  `user_id`?")
* Ask for clarification. ("I didn't understand. Can you clarify?")
* Avoid selective ownership of code. ("mine", "not mine", "yours")
* Avoid using terms that could be seen as referring to personal traits. ("dumb",
  "stupid"). Assume everyone is attractive, intelligent, and well-meaning.
* Be explicit. Remember people don't always understand your intentions online.
* Be humble. ("I'm not sure - let's look it up.")
* Don't use hyperbole. ("always", "never", "endlessly", "nothing")
* Don't use sarcasm.
* Keep it real.
* Talk in person if there are too many "I didn't understand" or "Alternative
  solution:" comments. Post a follow-up comment summarizing offline discussion.

#### Reviewing Code

Understand why the code is necessary (bug, user experience, refactoring). Then:

* Communicate which ideas you feel strongly about and those you don't.
* Identify ways to simplify the code while still solving the problem.
* If discussions turn too philosophical or academic, move the discussion offline
  to a regular Friday afternoon technique discussion. In the meantime, let the
  author make the final decision on alternative implementations.
* Offer alternative implementations, but assume the author already considered
  them. ("What do you think about using a custom validator here?")
* Seek to understand the author's perspective.
* Sign off on the pull request with a :thumbsup: or "Ready to merge" comment.

#### Having Your Code Reviewed

* Be grateful for the reviewer's suggestions. ("Good call. I'll make that
  change.")
* Don't take it personally. The review is of the code, not you.
* Explain why the code exists. ("It's like that because of these reasons. Would
  it be more clear if I rename this class/file/method/variable?")
* Seek to understand the reviewer's perspective.
* Try to respond to every comment.
* Wait for the Scrum Master to merge your Pull Request.

Resources
-----------------

* [Getting confident with Git Part 1](https://github.com/mks-greenfield/planning/wiki/Getting-Confident-with-Git-Part-1)
* [Getting confident with Git Part 2: Managing History](https://github.com/mks-greenfield/planning/wiki/Getting-Confident-with-Git-Part-2:-Managing-History)
* [Getting confident with Git Part 3: Undoing](https://github.com/mks-greenfield/planning/wiki/Getting-Confident-with-Git-Part-3:-Undoing)