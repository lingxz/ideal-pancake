const api_endpoint = "http://localhost:8080";


export function matchTwoPeople(user1, user2) {
  fetch(api_endpoint + '/user/' + user1 + '/profile', {
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000', method: 'GET' }
    })
    .then(res => res.json())
    .then((data) => {
      if (data["selected"] === undefined) {
        data["selected"] = [user2];
      } else {
        data["selected"].push(user2)
      }
      data["selected"] = [...new Set(data["selected"])];
      fetch(api_endpoint + '/user/' + user1 + '/profile', {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "text/plain",
        },
        method: 'POST',
        body: JSON.stringify(data),
      }).catch(console.log);
      console.log("updated match");
      checkMatch();
    })
    .catch(console.log)
}

function checkMatch() {
  fetch(api_endpoint + "/everyone", {
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000', method: 'GET' }
  })
  .then(res => res.json())
  .then((data) => {
    let allMatches = [];
    console.log("checkMatch resluts", data.results);
    let useridToUserMap = new Map(data.results.map(item => [item.id, item]));
    console.log("map", useridToUserMap); 
    for (let i = 0; i < data.results.length; i++) {
      let matches = [];
      let currentUser = data.results[i].id;
      let selected = data.results[i].selected;
      if (selected == undefined) { selected = [];}
      for (let j = 0; j < selected.length; j++) {
        if (useridToUserMap.get(selected[j]) == undefined) {
          continue
        }
        let other_selected = useridToUserMap.get(selected[j]).selected;
        if (other_selected == undefined) {
          continue
        }
        if (other_selected.includes(currentUser)) {
          matches.push(selected[j]);
        }
      }
      if (matches.length > 0) {
        allMatches.push({"userId": currentUser, "matches": matches});
      }
    }
    console.log("all matches", allMatches);
    return allMatches;
  })
  .then(allMatches => {
    for (let i = 0; i < allMatches.length; i++) {
      fetch(api_endpoint + '/basket/' + allMatches[i].userId, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "text/plain",
        },
        method: 'POST',
        body: JSON.stringify({"matches": allMatches[i].matches}),
      }).catch(console.log); 
    }
  })
}
