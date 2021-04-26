deploy:
	rm -rf .next
	yarn build
	say "front deployed"
