const get_film_ratings = require('./get_film_ratings').handle;
const get_user_ratings = require('./get_user_ratings').handle;
const list_film =  require('./list_film').handle;
const get = require('./get').handle;


function sim (user1, user2,user1_ratings,user2_ratings) {
    const av1 = user1.rating.mean;
    const av2 = user2.rating.mean;
    var norm1 = 0;
    var norm2 = 0;

    for (rating in user1_ratings) {
        norm1 += (user1_ratings[rating] - av1)**2
    };
    
    norm1 = Math.sqrt(norm1);
    for (rating in user2_ratings) {
        norm2 += (user2_ratings[rating] - av2)**2
    };
    norm2 = Math.sqrt(norm2); 
   
    var result = 0;
    for (rating in user1_ratings) {
        if (typeof user2_ratings[rating] != "undefined") {
            result += (user1_ratings[rating] - av1)*(user2_ratings[rating] - av2)
        };
    };
    if ((norm1 === 0) || (norm2 === 0)) {
        result = 0;
    } else {
        result = result/(norm1*norm2);
    };
    // console.log("0000")
    // console.log(film1)
    // console.log(film2)
    // console.log(result)
    // console.log("1111")
    return result;
}

function sortByValue(jsObj){
    var sortedArray =[];
    for(var i in jsObj) {
        sortedArray.push([jsObj[i],i]);
    }
};


function check_film(film_id, ratings){
    var s = false;
    for (x in ratings){
        // console.log(x);
        // console.log(user_id);
        if (x === user_id) {
            s = true
        }; };
    return s
};


async function k_voisin (user, user_ratings, k, film_id) {
    // var list = JSON.parse((await list_film()).body);
    list = JSON.parse((await list_user()).body);
    var list_film = [];
    for (var i = 0; i < Object.values(list).length; i++){
        const autre_user = list[i];
        const autre_user_ratings = (await get_user_ratings({"uuid" : autre_user.uuid})).body;         

        if (check_user(film_id,autre_user_ratings)) {
            list_film[i] = list[i]
            list_film[i].sim = sim(user,autre_user,user_ratings,autre_user_ratings);
        }
    };
    list_user.sort(function (a,b) {
        return a.sim > b.sim;
    });
    return  list_film.slice(0,(k));

};
module.exports.estimation = async event => {
    const data = (event.body); 
    // remettre JSON.parese quand on déploy
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    };
    const film_id = data.film_id;
    const user_id = data.user_id;

    const film = JSON.parse((await get({"pathParameters" : {"id":film_id}})).body);
    const film_rating = (await get_film_ratings(({"uuid" : film_id}))).body;
    const user_rating = (await get_user_ratings(({"user_id" : user_id}))).body;
 

    var voisin = await k_voisin(user, user_rating, 2, film_id);
   
    var estimation = 0;
    var somme_sim = 0;
 
    for (var i = 0; i < Object.values(voisin).length; i++){
        // console.log(voisin[i]);
        const autre_user = voisin[i];

        estimation +=  voisin[i].sim*(film_rating[voisin[i].uuid] - autre_user.rating.mean);
        somme_sim += Math.abs(voisin[i].sim);
    };
    return user.rating.mean + estimation/somme_sim;
}
