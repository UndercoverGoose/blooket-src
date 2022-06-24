async function getTourneys() {
    const res = await fetch("https://www.benstewartyt.com/api/tourneys", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "authorization": localStorage.token,
        },
        "referrer": "https://www.benstewartyt.com/tournaments",
        "body": null,
        "method": "GET",
    });
    const data = await res.json();
    return data;
};


async function joinTournament(id) {
    const res = await fetch("https://www.benstewartyt.com/api/tourneys/enter", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "authorization": localStorage.token,
            "content-type": "application/json",
        },
        "referrer": "https://www.benstewartyt.com/tournaments",
        "body": JSON.stringify({
            "tourneyId": id
        }),
        "method": "PUT",
    });
    const data = await res.json();
    return data;
};

async function joinValidTournament() {
    try {
        const tourneys = (await getTourneys())['tourneys'];
        const valid = (tourneys.filter( (t)=>{
            console.log(t)
            const d = new Date(t.startTime);
            return d > new Date();
        }));
        const jt = await joinTournament(valid[0]._id);
        if (jt.msg === "Already in a tourney.") {
            console.log(`%cFailed to join tournament! You are already in one!`, "color: #3cd687; font-size:12.5px; font-weight:bolder;");
        } else {
            console.log(`%cJoined tournament: ${valid[0].name}.`, "color: #3cd687; font-size:12.5px; font-weight:bolder;");
        };
    } catch (err) {
        console.log(err);
    };
};

setInterval( async () => {
    await joinValidTournament();
}, 1800000);
