function sleep(ms) {return new Promise((r) => setTimeout(r, ms))}

async function getCards(price, offense, defense, speed, energy, goalkeeping) {
  const url = `https://www.benstewartyt.com/api/sales/market?num=500&price[]=${price[0]}&price[]=${price[1]}&offense[]=${offense}&offense[]=100&defense[]=${defense}&defense[]=100&speed[]=${speed}&speed[]=100&goalkeeping[]=${goalkeeping}&goalkeeping[]=100&energy[]=${energy}&energy[]=100&sort=1`;
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      Authorization: localStorage.token,
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
    },
    referrer: 'https://www.benstewartyt.com/market',
    method: 'GET',
    mode: 'cors',
  });
  const data = await res.json();
  return data;
}
async function purchaseCard(id) {
  const res = await fetch('https://www.benstewartyt.com/api/sales/buy', {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: localStorage.token,
      'Content-Type': 'application/json',
    },
    referrer: 'https://www.benstewartyt.com/market',
    body: JSON.stringify({
      saleId: id
    }),
    method: 'PUT',
  });
  const data = await res.json();
  return data;
}
async function snipe(pricemin, pricemax, stats) {
  const cards = await getCards(
    [pricemin, pricemax],
    stats.offense || 0,
    stats.defense || 0,
    stats.speed || 0,
    stats.energy || 0,
    stats.goalkeeping || 0
  );

  if (cards.length === 0) {
    await sleep(250);
    console.log('No cards found');
    snipe(pricemin, pricemax, stats);
    return;
  }
  
  if (cards[0].country !== stats.country && (stats.country ?? -1) !== -1) {
    let bought = false;
    cards.forEach(async (card) => {
      if ((card.country === stats.country && !bought) || stats.buyExtra) {
        bought = true;
        console.log('%cBuying card...', 'color:red');
        console.log('%cPrice: ', 'color:violet', card.price);
        console.log('Offense: ', card.offense);
        console.log('Defense: ', card.defense);
        console.log('Speed: ', card.speed);
        console.log('Goalkeeping: ', card.goalkeeping);
        console.log('Energy: ', card.energy);
        const data = await purchaseCard(card._id);
        console.log(data);
        if(stats.buyExtra) {
          bought = false;
        }
      }
    });
    if (!bought || stats.buyExtra) {
      await sleep(250);
      console.log('Found matching, wrong country');
      snipe(pricemin, pricemax, stats);
    }
    return;
  }
  console.log('%cBuying card...', 'color:red');
  console.log('%cPrice: ', 'color:violet', cards[0].price);
  console.log('Offense: ', cards[0].offense);
  console.log('Defense: ', cards[0].defense);
  console.log('Speed: ', cards[0].speed);
  console.log('Goalkeeping: ', cards[0].goalkeeping);
  console.log('Energy: ', cards[0].energy);
  const data = await purchaseCard(cards[0]._id);
  console.log(data);
}

await snipe(
  0, // minimum price
  100, // maximum price
  {
    country: -1, // -1 means any, otherwise you need specific country code
    buyExtra: false, // buys until specific country card is bought
    offense: 80, // minimum stat requirements
    defense: 0,
    speed: 0,
    energy: 0,
    goalkeeping: 0,
  }
);
