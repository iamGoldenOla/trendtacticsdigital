# Workspace Rules for Git and GitHub Accounts

## Multi-Account GitHub Push Check
The user has three active GitHub accounts used for different projects:
1. `iamGoldenOla` (https://github.com/iamGoldenOla/)
2. `4poesy` (https://github.com/4poesy)
3. `jediark` (https://github.com/jediark)

### Agent Behavior Rule
Before performing any `git push` or GitHub CLI (`gh`) operations:
1. Identify the owner of the remote repository (e.g. `iamGoldenOla`).
2. Run `gh auth status` to check which GitHub account is currently active in the CLI.
3. If the active account does not match the repository owner, check if the other accounts are logged in.
4. **Always ask the user** which account they want to use to push, and confirm if they want to switch using `gh auth switch --user <username>` before executing the push.
