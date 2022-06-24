const purchases = [];
const ints = {};

async function getItem(name, quantity, max) {
	let r = await fetch(`https://www.benstewartyt.com/api/sales/search?text=${name}&num=${quantity}`, {
    "credentials": "include",
    "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Authorization": localStorage.token
    },
    "referrer": "https://www.benstewartyt.com/bazaar?s=" + name,
    "method": "GET",
    "mode": "cors"
  });
	r = await r.json();
	r.forEach(stock => {
		if(stock.price <= max) {
			buyItem(name, stock);
			//buyItem(stock._id, stock.price, name);
		}
	})
}
async function buyItem(name, stock) {
	if(!purchases.includes(stock._id)) {
		purchases.push(stock._id);
        let r = await fetch("https://www.benstewartyt.com/api/sales/buy", {
            "credentials": "include",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.5",
                "Authorization": localStorage.token
            },
            "referrer": "https://www.benstewartyt.com/bazaar?s=",
            "body": JSON.stringify({
                "saleId": stock._id
            }),
            "method": "PUT",
            "mode": "cors"
        });
        r = await r.json();
        if(r.success) {
            console.log(`%cBought %c${name} %cfor %c${stock.price} gold %c[${stock._id}]`,'color:violet','color:#77ff77','color:violet','color:#ff7777','color:white');
        }
    }
}

function start(item, max) {
	ints[Math.random()] = setInterval(() => {getItem(item, 5, max)},1000);
}
function stop() {
	Object.keys(ints).forEach(key => {
		clearInterval(ints[key]);
	})
}
