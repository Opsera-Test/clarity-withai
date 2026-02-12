# Code-to-Cloud Enterprise - cwa-021226

## Quick Setup Summary

- **App**: cwa-021226
- **Tenant**: opsera
- **Environment**: dev
- **Cluster**: opsera-usw2-np (AWS us-west-2)

## Required Secrets

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | AWS access for ECR and EKS |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `GH_PAT` | GitHub PAT (repo + workflow scopes) |

## Deployment Order

### 1. Bootstrap (one-time)

```bash
gh workflow run 1-bootstrap-infrastructure-cwa-021226.yaml
gh run watch
```

### 2. CI/CD (every commit)

```bash
gh workflow run 2-ci-build-push-cwa-021226-dev.yaml
```

## App URL

After deployment: https://cwa-021226-dev.agent.opsera.dev
