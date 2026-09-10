# CI/CD and production releases

## CI

The `CI` workflow runs type-checking, linting, unit tests, and a production build for pull requests targeting `trunk` and for direct pushes to `trunk`. Configure the repository branch-protection rule for `trunk` to require the `Verify application` check before merging.

Internal pull requests also create a Netlify deploy preview and smoke-test its deployed URL. Create a GitHub `preview` environment containing `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`. Pull requests from forks intentionally do not receive preview secrets.

## Releasing

After the desired version has been committed to `trunk`, run the `Create release` workflow. It checks out and validates `trunk`, then creates the annotated `vX.Y.Z` tag and its GitHub Release before dispatching `Deploy production`. Deployments also run when a maintainer pushes a matching `v*` tag. Both paths require approval from the protected `production` environment.

Create the `production` environment with required reviewers and place `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` in that environment. The deployment workflows use the pinned Netlify CLI version declared in their workflow files.

## Rollback

Run `Roll back production`, set `release_ref` to an immutable release tag such as `v5.2.2` (or a full commit SHA), and type `ROLLBACK` as the confirmation. The workflow requires production approval, deploys that exact revision, smoke-tests the result, and records the version, commit, Netlify deploy ID, and URL in the workflow summary.
