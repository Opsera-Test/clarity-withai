# US-EAST-1 Infrastructure Setup

Standalone infrastructure setup for Route 53 → ALB → NGINX Ingress → Application Pods in us-east-1.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Route 53 (DNS)                                 │
│                    *.agent.opsera.dev → ALB DNS Name                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Application Load Balancer (ALB)                          │
│                    Created by AWS Load Balancer Controller                  │
│                    Terminates TLS with ACM Certificate                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NGINX Ingress Controller                              │
│                  (NodePort Service behind ALB)                              │
│                    Handles routing & TLS passthrough                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Application Pods                                     │
│                    ClusterIP Services per namespace                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Prerequisites

The following GitHub org-level secrets must be configured:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key with permissions for EKS, ALB, Route53 |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key |
| `GH_PAT` | GitHub Personal Access Token (for ArgoCD repo access) |

## Workflow Execution Order

Run these workflows in sequence:

### 1. Bootstrap Infrastructure
```bash
gh workflow run infra-use1-bootstrap.yaml -f proceed=true
```
This workflow:
- Verifies EKS cluster exists (`opsera-use1-np`)
- Installs AWS Load Balancer Controller
- Installs NGINX Ingress Controller with ALB
- Installs cert-manager for TLS
- Creates necessary IAM service accounts

### 2. Setup DNS
```bash
gh workflow run infra-use1-dns.yaml -f domain=agent.opsera.dev
```
This workflow:
- Gets the ALB DNS name from NGINX Ingress
- Creates wildcard Route53 CNAME record
- Verifies DNS propagation

### 3. Deploy Application (Optional)
```bash
gh workflow run infra-use1-deploy-app.yaml -f app_name=cwa-4 -f environment=dev
```

## Configuration

### Cluster Details
| Setting | Value |
|---------|-------|
| **Region** | us-east-1 |
| **Cluster** | opsera-use1-np |
| **VPC** | Auto-detected from cluster |

### NGINX Ingress Configuration
- **Service Type**: NodePort (ALB routes to node ports)
- **ALB Type**: Application Load Balancer (internet-facing)
- **SSL Policy**: ELBSecurityPolicy-TLS-1-2-2017-01
- **Health Check**: /healthz on port 10254

### Helm Charts Used
| Component | Chart | Version |
|-----------|-------|---------|
| AWS LB Controller | eks/aws-load-balancer-controller | 1.7.1 |
| NGINX Ingress | ingress-nginx/ingress-nginx | 4.9.0 |
| cert-manager | jetstack/cert-manager | v1.14.0 |

## Files Structure

```
.infra-use1/
├── README.md                          # This file
├── workflows/
│   ├── infra-use1-bootstrap.yaml     # Main bootstrap workflow
│   ├── infra-use1-dns.yaml           # DNS setup workflow
│   ├── infra-use1-diagnostics.yaml   # Diagnostics/troubleshooting
│   └── infra-use1-destroy.yaml       # Cleanup workflow
├── helm-values/
│   ├── aws-lb-controller.yaml        # AWS LB Controller values
│   ├── nginx-ingress.yaml            # NGINX Ingress values
│   └── cert-manager.yaml             # cert-manager values
└── policies/
    └── aws-lb-controller-policy.json # IAM policy for LB controller
```

## Troubleshooting

### Check Infrastructure Status
```bash
gh workflow run infra-use1-diagnostics.yaml
```

### Common Issues

1. **ALB not created**: Check AWS Load Balancer Controller logs
   ```bash
   kubectl logs -n kube-system -l app.kubernetes.io/name=aws-load-balancer-controller
   ```

2. **DNS not resolving**: Allow 5-10 minutes for propagation
   ```bash
   dig +short *.agent.opsera.dev
   ```

3. **TLS certificate issues**: Check cert-manager
   ```bash
   kubectl get certificates -A
   kubectl describe certificate <name> -n <namespace>
   ```

## Architecture Decisions

### Why ALB instead of NLB?
- ALB provides layer 7 routing capabilities
- Native integration with AWS WAF
- Better cost efficiency for HTTP/HTTPS traffic
- Supports path-based routing at the LB level

### Why AWS Load Balancer Controller?
- Native Kubernetes integration via annotations
- Automatic ALB provisioning from Ingress resources
- Supports TargetGroupBinding for fine-grained control
- Handles ALB lifecycle management

---
*Independent infrastructure setup for us-east-1*
