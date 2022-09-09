function sleep(ms){return new Promise(r => setTimeout(r, ms))}

async function getPotions() {
	let r = await fetch("https://www.benstewartyt.com/api/users/verify-token", {
    "credentials": "include",
    "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Authorization": localStorage.token
    },
    "referrer": "https://www.benstewartyt.com/market",
    "method": "GET",
    "mode": "cors"
	});
	r = await r.json();
	return r.potions;
}
async function getSellablePotions() {
	let r = await fetch("https://www.benstewartyt.com/api/customers", {
    "credentials": "include",
    "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Authorization": localStorage.token
    },
    "referrer": "https://www.benstewartyt.com/market",
    "method": "GET",
    "mode": "cors"
	});
	r = await r.json();
	let potions = [];
	r.customers.forEach(d => {potions.push(d.potion)});
	return potions;
}
function sellPotion(name) {
	fetch("https://www.benstewartyt.com/api/customers/sell", {
    "credentials": "include",
    "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Authorization": localStorage.token
    },
    "referrer": "https://www.benstewartyt.com/market",
    "body": JSON.stringify({
        "potion": name
    }),
    "method": "PUT",
    "mode": "cors"
	});
	console.log(`sold ${name}`);
}
async function sellAllPotions() {
	const toSell = await getPotions();
	const canSell = await getSellablePotions();
	const tsKeys = Object.keys(toSell);
	let nts = [];
	for(let i=0;i<tsKeys.length;i++) {
		if(toSell[tsKeys[i]] > 0 && canSell.includes(tsKeys[i])) {
			for(let x=0;x<toSell[tsKeys[i]];x++) {
				nts.push(tsKeys[i]);
			}
		}
	}
	for(let y=0;y<nts.length;y++) {
		sellPotion(nts[y]);
		await sleep(666);
	}
}

await sellAllPotions();
