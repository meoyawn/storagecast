deploy:
	yarn lint
	vercel --prod
	say "deployed"
