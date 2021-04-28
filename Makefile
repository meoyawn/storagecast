deploy:
	yarn lint
	vercel --prod
	say "front deployed"
