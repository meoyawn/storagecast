deploy:
	rm -rf .next
	vercel --prod
	say "front deployed"
