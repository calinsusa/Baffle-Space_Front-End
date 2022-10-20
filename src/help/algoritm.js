const validation = 10000;
const tiketPrice = 2;
let playersTiketAmount = [];
let userNumberOfTikets = 100;

const minPlayerNum = 1;
let maxPlayerNum = 100;
const minTiketAmount = 1;
let maxTiketAmount = 1000;
let maxNumberOfTiketsSellByNFTAllOwners;
let percentValueOfEachTiketsSellAmount = [];
let incomePerOwner = [];
let totalSellValueWithoutValidation;
let numberOfPlayers;

// functia asta creaza un numar random de jucatori dupa care aloca fiecarui jucator un numar random de bilete vandute

//dupa care adauga in arrayul de bilete o valoarea care este va venii dintrun imput exterior - cine foloseste asta va introduce cate bilete crede el //ca o sa vanda

//functia percentCalculation() calculeaza procentul pe care il reprezinta numarul de bilete vandute de un jucator raportat la numarul mtotal de
//bilete

//functia amountOfMoneyByTiketsSell() calculeaza cat reprezinta procentul de bilete vandute din suma in bani totala a biletelor
// asta da suma de bani care ii revine fiecarui jucator

const random = () => {
  let playerNumber = Math.floor(
    Math.random() * (maxPlayerNum - minPlayerNum + 1)
  );
  numberOfPlayers = playerNumber;

  for (i = 0; i < playerNumber; i++) {
    let tiketAmountPerPlayer = Math.floor(
      Math.random() * (maxTiketAmount - minTiketAmount + 1)
    );
    playersTiketAmount.push(tiketAmountPerPlayer);
  }
  playersTiketAmount = [...playersTiketAmount, userNumberOfTikets];
  const sum = playersTiketAmount.reduce((prevValue, currentValue) => {
    return prevValue + currentValue;
  }, 0);

  console.log("numarul de bilete" + playersTiketAmount.length);

  maxNumberOfTiketsSellByNFTAllOwners = sum;
  let totalTiketsSellPrice = sum * tiketPrice - validation;

  console.log("costul total al biletelor " + totalTiketsSellPrice + " $");
  totalSellValueOutValidation = totalTiketsSellPrice;

  percentCalculation();
  amountOfMoneyByTiketsSell();
  getUserIncome();
};

const percentCalculation = () => {
  for (i = 0; i < playersTiketAmount.length; i++) {
    let percent =
      (playersTiketAmount[i] / maxNumberOfTiketsSellByNFTAllOwners) * 100;
    percentValueOfEachTiketsSellAmount.push(percent);
  }
  console.log("numarul de jucatori" + playersTiketAmount.length);
  console.log("lungime array % - " + percentValueOfEachTiketsSellAmount.length);
  console.log("numarul de jucatori din random " + numberOfPlayers);
};

const amountOfMoneyByTiketsSell = () => {
  for (i = 0; i < percentValueOfEachTiketsSellAmount.length; i++) {
    incomePerOwner.push(
      (percentValueOfEachTiketsSellAmount[i] * totalSellValueOutValidation) /
        100
    );
  }
  console.log(
    "suma aferenta fiecarui nft owner in functie de procentaj - " +
      incomePerOwner
  );
};

const getUserIncome = () => {
  let income = incomePerOwner.slice(-1);
  console.log(
    "daca vinde - " +
      userNumberOfTikets +
      " de bilete userul va castiga - " +
      income +
      "la un numar total de bilete vandute de " +
      maxNumberOfTiketsSellByNFTAllOwners +
      " si un numar de nft owneri de " +
      numberOfPlayers +
      " care au vandut bilete"
  );
};

random();

console.log(`biletele vandute de fiecare NFT - ${playersTiketAmount}`);
console.log(
  "numarul total de bilete vandute - " + maxNumberOfTiketsSellByNFTAllOwners
);
console.log(
  "procentul fiecarui pachet de bilete vandute de fiecare NFT - " +
    percentValueOfEachTiketsSellAmount
);
