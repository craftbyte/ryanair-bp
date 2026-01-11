export default {
    fetch(request) {
        const url = new URL(request.url);
        switch (url.pathname) {
            case "/boarding-pass":
                return getBoardingPass(request);
			case "/apple-wallet-pass":
				return getAppleWalletPass(request);
			case "/google-wallet-pass":
				return getGoogleWalletPass(request);
        }
        return new Response(null, { status: 404 });
    },
} satisfies ExportedHandler<Env>;

async function getBoardingPass(request: Request): Promise<Response> {
	let passData = await fetch("https://mntappbp.ryanair.com/v1/boardingpass", {
		method: 'POST',
		body: await request.text(),
		headers: {
			'Content-Type': 'application/json',
			'client': 'trans-rights'
		}
	})

    return new Response(passData.body, {
        headers: { "Content-Type": passData.headers.get("Content-Type") || "application/json" },
		status: passData.status,
		statusText: passData.statusText
    });
}

async function getAppleWalletPass(request: Request): Promise<Response> {
	let passData = await fetch('https://mawbp.ryanair.com/v1/downloadpass', {
		method: 'POST',
		body: await request.text(),
		headers: {
			'Accept': 'application/vnd.apple.pkpass',
			'Content-Type': 'application/json',
			'client': 'trans-rights'
		}
	})
	return new Response(passData.body, {
		headers: { "Content-Type": "application/vnd.apple.pkpass" },
		status: passData.status,
		statusText: passData.statusText
	})
}

async function getGoogleWalletPass(request: Request): Promise<Response> {
	let passData = await fetch('https://mgpbp.ryanair.com/v1/boardingpass', {
		method: 'PUT',
		body: await request.text(),
		headers: {
			'Content-Type': 'application/json',
			'client': 'trans-rights'
		}
	})
	return new Response(passData.body, {
		headers: { "Content-Type": passData.headers.get("Content-Type") || "application/json" },
		status: passData.status,
		statusText: passData.statusText
	})
}
