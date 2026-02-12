# Code-to-Cloud Enterprise - cwa-0212

## Quick Setup Summary

- **App**: cwa-0212
- **Tenant**: opsera
- **Environment**: dev
- **Cluster**: opsera-usw2-np (AWS us-west-2)

## Required Secrets

Configure in GitHub: Settings → Secrets and variables → Actions

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | AWS access for ECR and EKS |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `GH_PAT` | GitHub PAT (repo + workflow scopes) |

## Deployment Order

### 1. Bootstrap (one-time)

```bash
gh workflow run 1-bootstrap-infrastructure-cwa-0212.yaml
gh run watch
```

Creates: ECR repo, ArgoCD repo/cluster registration, namespaces, folder structure.

### 2. CI/CD (every commit)

Triggers on push to `main` (app source changes). Or manually:

```bash
gh workflow run 2-ci-build-push-cwa-0212-dev.yaml
```

## App URL

After deployment: https://cwa-0212-dev.agent.opsera.dev
