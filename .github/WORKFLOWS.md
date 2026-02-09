# Code-to-Cloud Enterprise – Workflows

## Before first run

1. **Add these GitHub Secrets** (Settings → Secrets and variables → Actions) with **no trailing newlines or spaces**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `GH_PAT` – GitHub Personal Access Token with `repo` (and `actions: write` if using workflow dispatch). Used for ArgoCD repo access so the hub can clone this repo.
   - Hub and spoke cluster access use **EKS** in the same AWS account (`aws eks update-kubeconfig`); no `KUBECONFIG_HUB` or `KUBECONFIG_SPOKE` needed if both clusters are EKS.

   Pasting secrets with trailing newlines can cause **"Invalid header value"** errors. To avoid that:
   - Paste each secret on a single line with no extra spaces or newlines, or
   - For kubeconfig: run `echo -n "$(cat your-kubeconfig)" | base64 -w0` and paste the output (no line breaks).

2. **Run the Bootstrap workflow first**  
   In the Actions tab, run **Bootstrap Infrastructure - claritywithai-0209** once. It creates ECR, namespaces, ECR pull secret, ArgoCD repo secret, and applies the ArgoCD application.

3. **Then run CI/CD**  
   After bootstrap succeeds, run **CI Build & Push - claritywithai-0209 (dev)** or push to `main` to trigger it.

---

## Workflows

| Workflow | Purpose |
|----------|---------|
| `bootstrap-infrastructure-claritywithai-0209.yaml` | One-time setup: ECR, Opsera config, ArgoCD repo registration, ArgoCD application. Run first. |
| `ci-build-push-claritywithai-0209-dev.yaml` | Build, push image, update manifests, deploy to dev, then trigger landscape. |
| `opsera-deploy-claritywithai-0209.yml` | Reusable/manual deploy (e.g. re-deploy dev). |
| `deployment-landscape.yaml` | Post-deploy landscape snapshot and commit (called by CI or manually). |
