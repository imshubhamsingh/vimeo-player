checkpoint:
	@git add .
	@git commit -m "chore: checkpoint at $$(date '+%Y-%m-%dT%H:%M:%S%z')"
	@git push
	@echo Checkpoint created and pushed to remote