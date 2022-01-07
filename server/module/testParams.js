function testParams(queryParams) {
      let nameRX = /^\D+$/; // a-zA-Z 1+ character
      let genderRX = /^M|F$/; // M|F
      let ageRX = /^[12]?[0-9]$/; // 0-25 ?
      let transferRX =/^true|false$/;

      console.log('in testing params');
      console.log('testing name',nameRX.test(queryParams[0]),queryParams[0]);
      console.log('testing gender',genderRX.test(queryParams[1]),queryParams[1]);
      console.log('testing age',ageRX.test(queryParams[2]),queryParams[2]);
      console.log('testing transfer',transferRX.test(queryParams[3]),queryParams[3]);
      if (nameRX.test(queryParams[0]) 
            && genderRX.test(queryParams[1]) 
            && ageRX.test(queryParams[2])
            && transferRX.test(queryParams[3])) {
                  return true;
            } else { return false;}
};

module.exports = testParams;