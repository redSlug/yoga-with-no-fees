# Deploy

```bash
docker login
# create tunnel
ssh bdettmer@broome.cluster.recurse.com -N -L 6443:localhost:6443 
docker buildx build --platform linux/amd64 -f Dockerfile -t bdettmer/yoga-with-friends . && docker push bdettmer/yoga-with-friends && kubectl rollout restart -n yoga-with-friends deployment/yoga-with-friends
````

## Copy token.json server
cat backend/token.json | base64 | pbcopy
paste into `yoga-with-friends-credentials.yaml` then deploy
kubectl apply -f k8s/secrets/yoga-with-friends-credentials.yaml -f k8s/yoga-with-friends/deployment.yaml

## Troubleshooting
* `Unable to connect to the server: tls: failed to verify certificate: x509` likely means something with the cluster changed, and the fix is to `rm -rf ~/.kube` and then `scp -r bdettmer@broome.cluster.recurse.com:.kube ~/.kube`

### Helpful commands
```bash
kubectl get nodes -n yoga-with-friends
kubectl get pods -n yoga-with-friends
kubectl get deployments -n yoga-with-friends
kubectl logs deployment/yoga-with-friends -n yoga-with-friends
kubectl get ingress -n yoga-with-friends
kubectl get services -n yoga-with-friends
kubectl get pods -n yoga-with-friends 
kubectl describe pod yoga-with-friends-POD_ID -n yoga-with-friends
kubectl logs yoga-with-friends-POD_ID -n yoga-with-friends
kubectl delete pod yoga-with-friends-POD_ID -n yoga-with-friends
docker buildx build --no-cache -f Dockerfile -t bdettmer/yoga-with-friends .
kubectl exec -n yoga-with-friends -it yoga-with-friends-POD_ID /bin/s
```
