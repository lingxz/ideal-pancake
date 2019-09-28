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
    })
    .catch(console.log)
}

function checkMatch() {
  fetch(api_endpoint + "/everyone", {
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000', method: 'GET' }
  })
}
