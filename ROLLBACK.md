# Rollback to the previous website design

A snapshot of the **original design** is saved as the git tag `legacy-design`.

## To roll back (say "roll back" to the assistant, or run these commands)

```bash
cd ~/Projects/paul-seager-voice
git checkout legacy-design -- .
git commit -m "Rollback to legacy website design"
git push
```

Wait for the GitHub Actions deploy to finish, then hard-refresh your browser.

## What gets restored

Everything exactly as it was at tag `legacy-design` (layout, styling, and components).

## To return to the new design after a rollback

```bash
git revert HEAD
git push
```

Or ask the assistant to re-apply the redesign.
