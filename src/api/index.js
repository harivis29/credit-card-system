const basePath = "http://localhost:8080/";
function addCard(cardData, callback) {
    let addCard = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      };

      fetch(`${basePath}addCard`, addCard) 
      .then( res => res.json()).then( resObj => {
        if(callback && typeof callback === "function"){
          callback(resObj.data)
        }
      })
        .catch(function() {
    });
}

function getExistingCards(callback){
  let fetchData = {
    method: "GET",
    headers: new Headers()
  };
  fetch(`${basePath}fetchCards`, fetchData)
    .then( res => res.json()).then( resObj => {
      if(callback && typeof callback === "function"){
        callback(resObj.data)
      }
    })
    .catch(function() {
  });
}

export { addCard, getExistingCards };