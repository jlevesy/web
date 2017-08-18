DOCKER_REMOTE_OPTS=--tlsverify \
		   --tlscacert=${DOCKER_CLIENT_TLS_PATH}/docker-ca.pem \
		   --tlscert=${DOCKER_CLIENT_TLS_PATH}/docker-client-cert.pem \
		   --tlskey=${DOCKER_CLIENT_TLS_PATH}/key.pem \
		   --host="${DOMAIN}:2376"

all: print_env deliver_admin deliver_web

.PHONY: log_web
log_web:
	@cd stacks/web && docker-compose ${DOCKER_REMOTE_OPTS} logs -f

.PHONY: deliver_web
deliver_web: build_web push_web deploy_web

.PHONY: deploy_web
deploy_web:
	@cd stacks/web && \
		docker-compose ${DOCKER_REMOTE_OPTS} pull --parallel && \
       		docker-compose ${DOCKER_REMOTE_OPTS} up -d --force-recreate --no-build

.PHONY: push_web
push_web:
	@cd stacks/web && docker-compose push

.PHONY: build_web
build_web:
	@cd stacks/web && docker-compose build

.PHONY: log_admin
log_admin:
	@cd stacks/admin && docker-compose ${DOCKER_REMOTE_OPTS} logs

.PHONY: logf_admin
logf_admin:
	@cd stacks/admin && docker-compose ${DOCKER_REMOTE_OPTS} logs -f

.PHONY: deliver_admin
deliver_admin: build_admin push_admin deploy_admin

.PHONY: deploy_admin
deploy_admin:
	@cd stacks/admin && \
		docker-compose ${DOCKER_REMOTE_OPTS} pull --parallel && \
       		docker-compose ${DOCKER_REMOTE_OPTS} up -d --force-recreate --no-build

.PHONY: push_admin
push_admin:
	@cd stacks/admin && docker-compose push

.PHONY: build_admin
build_admin:
	@cd stacks/admin && docker-compose build

.PHONY: log_monitoring
log_monitoring:
	@cd stacks/monitoring && docker-compose ${DOCKER_REMOTE_OPTS} logs

.PHONY: logf_monitoring
logf_monitoring:
	@cd stacks/monitoring && docker-compose ${DOCKER_REMOTE_OPTS} logs -f

.PHONY: deliver_monitoring
deliver_monitoring: build_monitoring push_monitoring deploy_monitoring

.PHONY: deploy_monitoring
deploy_monitoring:
	@cd stacks/monitoring && \
		docker-compose ${DOCKER_REMOTE_OPTS} pull --parallel && \
       		docker-compose ${DOCKER_REMOTE_OPTS} up -d --force-recreate --no-build

.PHONY: push_monitoring
push_monitoring:
	@cd stacks/monitoring && docker-compose push

.PHONY: build_monitoring
build_monitoring:
	@cd stacks/monitoring && docker-compose build

.PHONY: remote_status
remote_status:
	@docker ${DOCKER_REMOTE_OPTS} ps

provision:
	@cd infra && \
	  ansible-playbook -i hosts main.yml \
	  -e "ansible_user=${MACHINE_PRIMARY_USER}" \
	  -e "ansible_become_pass=${MACHINE_PRIMARY_PASSWORD}"

.PHONY: test_remote_daemon
print_env:
	@echo "===== Current environment ====="
	@echo "Registry: ${REGISTRY}"
	@echo "Host: ${DOMAIN}:2376"
	@echo "TLS Path: ${DOCKER_CLIENT_TLS_PATH}"
	@echo "==============================="

.PHONY: check_env
check_env:
ifndef DOMAIN
	$(error DOMAIN is undefined)
endif
ifndef REGISTRY
  	$(error REGISTRY is undefined)
endif
ifndef DOCKER_CLIENT_TLS_PATH
  	$(error DOCKER_CLIENT_TLS_PATH is undefined)
endif

-include check_env
