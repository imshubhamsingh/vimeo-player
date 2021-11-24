# https://gist.github.com/aweary/747bf5c197fe9f1d776fe41fc5ac0137
checkpoint:
	@git add .
	@git commit -m "chore: checkpoint at $$(date '+%Y-%m-%dT%H:%M:%S%z')"
	@git push
	@echo Checkpoint created and pushed to remote