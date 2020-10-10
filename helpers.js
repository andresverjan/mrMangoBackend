const User = require("./models/user");

const getCurrentDateTime = () => {
  const d = new Date();
  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0];
  return `${date} ${time}`;
};

const getNearestShop = (arrComercios, userCoord) => {
  const EARTH_RADIUS = 6371;
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nearestComercio = arrComercios[0];

  arrComercios.forEach((comercio) => {
    const userLat = userCoord.lat;
    const userLng = userCoord.lng;
    const shopLat = comercio.lat;
    const shopLng = comercio.lng;

    const deltLat = Number(shopLat) - Number(userLat);
    const deltLng = Number(shopLng) - Number(userLng);

    const a =
      Math.pow(Math.sin(deltLat / 2), 2) +
      Math.cos(Number(userLat)) *
      Math.cos(Number(shopLat)) *
      Math.pow(Math.sin(deltLng / 2), 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = EARTH_RADIUS * c;

    if (dist < minDistance) {
      minDistance = dist;
      nearestComercio = comercio;
    }
  });

  return nearestComercio;
};

const getUserByJwt = async (ctx) => {
  let token = ctx.headers.authorization;
  token = token.replace("Bearer ", "");
  let userData;
  try {
    userData = await User.findOne({ jwt: token });
  } catch (error) {
    console.log(error);
    throw new Error("Usuario no encontrado");
  }

  return userData;
};

const getFilterFormObject = (object) => {
  let result = [];  
  for (let key of Object.keys(object)) {
    let valor = object[key];
    if(!isNaN(valor)) {
      var obj = {};
      obj[key] = Number(valor);
      result.push(obj);  
    } else if (valor != null && valor != "" && valor != undefined) {
      var obj = {};
      obj[key] = { $regex: valor, $options: "i" };
      result.push(obj);
    }
  }  
  return result.length>0 ?   { $or: result }: {}; 
};


const getOrderFromObject = (object) => {
  for (let key of Object.keys(object)) {
    let valor = object[key];
    if (valor != null && valor != "" && valor != undefined) {
      if (valor.toLowerCase() == "asc" ) {
        object[key] = "1";
      } else {
        object[key] = "-1";
      }
    }
  }
  return object;
};

module.exports = {
  getNearestShop,
  getUserByJwt,
  getCurrentDateTime,
  getFilterFormObject,
  getOrderFromObject
};
