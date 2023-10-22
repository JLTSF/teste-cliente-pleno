FROM redis
CMD ["/bin/bash", "-c", "echo 'yes' | redis-cli --cluster create 165.34.0.10:7000 165.34.0.11:7001 165.34.0.12:7002 --cluster-replicas 0"]