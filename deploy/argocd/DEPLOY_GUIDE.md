# Jaejadle ArgoCD 배포 가이드

## 전제조건

- ✅ ArgoCD 설치됨
- ✅ K3s 클러스터 실행 중
- ✅ GHCR에 이미지 푸시 권한
- ✅ MariaDB/MySQL 데이터베이스 준비됨 (RDS)
- ✅ AWS S3 버킷 준비됨

## 현재 리소스 설정

```yaml
Jaejadle Pod:
  replicas: 1
  resources:
    requests:
      memory: 256Mi
      cpu: 100m
    limits:
      memory: 512Mi
      cpu: 300m
```

### 예상 메모리 사용량

```
시스템:              ~300Mi
K3s:                 ~300Mi
ArgoCD:              ~800Mi
Traefik:             ~50Mi
Jaejadle:            ~256Mi (최대 512Mi)
────────────────────────────
총합:                ~1,706Mi
여유:                ~300Mi  ⚠️  (DB 사용으로 메모리 여유 적음)
```

## 배포 단계

### 1. Secret 생성 (필수!)

Jaejadle은 DB와 AWS S3를 사용하므로 Secret을 먼저 생성해야 합니다.

```bash
# jaejadle namespace 생성 (ArgoCD가 자동으로 생성하지만 미리 만들어도 됨)
kubectl create namespace jaejadle

# Secret 생성
kubectl create secret generic jaejadle-secret \
  --namespace=jaejadle \
  --from-literal=jwt-secret='YOUR_JWT_SECRET' \
  --from-literal=database-url='mysql://user:password@host:3306/database' \
  --from-literal=aws-region='ap-northeast-2' \
  --from-literal=aws-s3-bucket-name='YOUR_BUCKET_NAME' \
  --from-literal=aws-s3-bucket-url='https://YOUR_BUCKET.s3.ap-northeast-2.amazonaws.com' \
  --from-literal=aws-access-key-id='YOUR_ACCESS_KEY' \
  --from-literal=aws-secret-access-key='YOUR_SECRET_KEY'

# Secret 확인
kubectl get secret jaejadle-secret -n jaejadle
```

### 2. ArgoCD에 Application 등록

```bash
cd /Users/minjo/home/mayne/projects/jaejadle

# Application 생성
kubectl apply -f deploy/argocd/application.yaml
```

### 3. 배포 상태 확인

```bash
# Application 상태 확인
kubectl get application jaejadle -n argocd

# 출력 예시:
# NAME       SYNC STATUS   HEALTH STATUS
# jaejadle   Synced        Healthy
```

### 4. Pod 상태 확인

```bash
# Jaejadle namespace의 Pod 확인
kubectl get pods -n jaejadle

# 상세 로그 확인
kubectl logs -n jaejadle -l app=jaejadle-app -f
```

### 5. Service 확인

```bash
# Service 정보 확인
kubectl get svc -n jaejadle

# 출력:
# NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)
# jaejadle-service   ClusterIP   10.43.xxx.xxx   <none>        80/TCP
```

## ArgoCD UI 접근

### 포트포워딩으로 접근

```bash
# ArgoCD 서버 포트포워딩
kubectl port-forward svc/argocd-server -n argocd 8080:443

# 브라우저에서 https://localhost:8080 접속
```

### 초기 비밀번호 확인

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
echo
```

- **Username**: `admin`
- **Password**: 위 명령어 출력값

## 배포 워크플로우

```
1. 개발자가 코드 변경 후 main 브랜치에 push
   ↓
2. GitHub Actions가 Docker 이미지 빌드 & GHCR에 푸시
   (태그: latest, main, main-{sha})
   ↓
3. GitHub Actions가 kustomization.yaml의 newTag 업데이트
   ↓
4. ArgoCD가 매니페스트 변경 감지 (3분마다)
   ↓
5. 자동으로 Kubernetes에 배포 (selfHeal: true)
   ↓
6. Rolling Update로 무중단 배포
```

## 수동 동기화

필요 시 수동으로 동기화:

```bash
# kubectl 사용
kubectl patch app jaejadle -n argocd --type merge -p '{"operation":{"sync":{}}}'

# 또는 ArgoCD CLI 사용 (설치되어 있다면)
argocd app sync jaejadle
```

## 이미지 업데이트

### 방법 1: GitHub Actions (자동 - 권장)

```yaml
# .github/workflows/build.yml이 자동으로:
# 1. 이미지 빌드
# 2. GHCR에 푸시 (latest, main-sha-{commit} 태그)
# 3. kustomization.yaml의 newTag를 새 SHA 태그로 업데이트
# 4. ArgoCD가 자동 감지하여 배포
```

### 방법 2: 수동 이미지 태그 변경

```bash
# kustomization.yaml 수정
cd deploy/k8s/overlays/prod
vi kustomization.yaml

# newTag를 원하는 버전으로 변경
images:
  - name: ghcr.io/mayne0213/jaejadle
    newTag: main-sha-abc1234  # ← 변경

# Git에 커밋 & 푸시
git add .
git commit -m "Update jaejadle to main-sha-abc1234"
git push

# ArgoCD가 자동으로 감지하여 배포
```

## Ingress 및 도메인 설정

### 도메인

- **Domain**: `jaejadle.kro.kr`
- **TLS**: Let's Encrypt (cert-manager 자동 발급)

### Ingress 확인

```bash
# Ingress 상태 확인
kubectl get ingress -n jaejadle

# 상세 정보
kubectl describe ingress jaejadle-ingress -n jaejadle

# TLS 인증서 확인
kubectl get certificate -n jaejadle
```

## 트러블슈팅

### Pod가 CrashLoopBackOff 상태

```bash
# Pod 로그 확인
kubectl logs -n jaejadle -l app=jaejadle-app --tail=100

# Pod 상세 정보
kubectl describe pod -n jaejadle -l app=jaejadle-app

# 일반적인 원인:
# 1. 이미지를 찾을 수 없음 → GHCR 권한 확인
# 2. 환경변수/Secret 누락 → Secret 확인
# 3. DB 연결 실패 → DATABASE_URL 확인
# 4. Health check 실패 → 포트 3000 확인
```

### Secret 관련 오류

```bash
# Secret 존재 확인
kubectl get secret jaejadle-secret -n jaejadle

# Secret 내용 확인 (base64 디코딩)
kubectl get secret jaejadle-secret -n jaejadle -o jsonpath='{.data.database-url}' | base64 -d
echo

# Secret 재생성이 필요한 경우
kubectl delete secret jaejadle-secret -n jaejadle
# 그 후 위의 "Secret 생성" 단계 다시 실행
```

### DB 연결 실패

```bash
# Pod에서 DB 연결 테스트
kubectl exec -it -n jaejadle deployment/jaejadle-app -- sh

# Pod 내부에서
apk add mysql-client  # Alpine Linux
mysql -h YOUR_DB_HOST -u YOUR_USER -p

# 연결이 안 되면:
# 1. DB 보안그룹 확인 (K3s 노드 IP 허용 필요)
# 2. DATABASE_URL 형식 확인
# 3. DB 서버 상태 확인
```

### ArgoCD Sync 실패

```bash
# Application 상태 확인
kubectl get app jaejadle -n argocd -o yaml

# ArgoCD 로그 확인
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller --tail=100
```

### 메모리 부족 (OOMKilled)

```bash
# Pod 상태 확인
kubectl get pod -n jaejadle -l app=jaejadle-app

# 마지막 종료 이유 확인
kubectl describe pod -n jaejadle -l app=jaejadle-app | grep -A 5 "Last State"

# OOMKilled가 보이면 리소스 증가 필요:
# deploy/k8s/overlays/prod/deployment-patch.yaml 수정
resources:
  limits:
    memory: "768Mi"  # 512Mi → 768Mi로 증가
```

## 롤백

### ArgoCD UI에서 롤백

1. ArgoCD UI 접속
2. `jaejadle` 애플리케이션 클릭
3. `HISTORY` 탭
4. 이전 버전 선택 후 `ROLLBACK` 클릭

### CLI로 롤백

```bash
# 히스토리 확인
kubectl get app jaejadle -n argocd -o yaml | grep -A 10 "history:"

# 특정 리비전으로 롤백 (예: revision 3)
argocd app rollback jaejadle 3

# 또는 kustomization.yaml을 이전 SHA 태그로 수정 후 push
```

## 모니터링

### 리소스 사용량 확인

```bash
# Pod 리소스 사용량
kubectl top pod -n jaejadle

# Node 전체 리소스 사용량
kubectl top node

# 출력 예시:
# NAME                 CPU(cores)   MEMORY(bytes)
# jaejadle-app-xxx     50m          280Mi
```

### 메모리 압박 확인

```bash
# 전체 메모리 사용량 모니터링
watch -n 5 'kubectl top node && echo "---" && kubectl top pod -A | head -20'
```

### 로그 스트리밍

```bash
# 실시간 로그 확인
kubectl logs -n jaejadle -l app=jaejadle-app -f --tail=100

# 여러 Pod의 로그를 모두 보기
kubectl logs -n jaejadle -l app=jaejadle-app --all-containers=true -f
```

### DB 쿼리 로그 확인

```bash
# Application 로그에서 DB 관련 에러 찾기
kubectl logs -n jaejadle -l app=jaejadle-app | grep -i "database\|mysql\|prisma"
```

## 정리 (삭제)

```bash
# ArgoCD Application 삭제 (리소스도 함께 삭제됨)
kubectl delete -f deploy/argocd/application.yaml

# 또는 직접 삭제
kubectl delete app jaejadle -n argocd

# Secret도 삭제
kubectl delete secret jaejadle-secret -n jaejadle

# Namespace도 삭제하려면
kubectl delete namespace jaejadle
```

## 보안 권장사항

1. **Secret 관리**
   - Secret은 절대 Git에 커밋하지 않기
   - 주기적으로 credentials 교체
   - AWS IAM Role 사용 권장 (Access Key 대신)

2. **DB 보안**
   - DB 보안그룹을 K3s 노드 IP만 허용
   - SSL/TLS 연결 사용 권장
   - 읽기 전용 복제본 사용 고려

3. **S3 보안**
   - 버킷 정책으로 접근 제한
   - IAM 역할 사용 권장
   - 버킷 암호화 활성화

## 다음 단계

메모리가 충분해지면 (4GB+):

1. **Replica 증가**
   ```yaml
   spec:
     replicas: 2  # 고가용성
   ```

2. **리소스 증가**
   ```yaml
   resources:
     requests:
       memory: "512Mi"
     limits:
       memory: "1Gi"
   ```

3. **DB Connection Pool 최적화**
   - Prisma connection pool 설정 조정
   - PgBouncer 같은 connection pooler 추가

4. **Monitoring Stack 추가**
   - Prometheus
   - Grafana
   - Alert Manager
   - DB 메트릭 수집
