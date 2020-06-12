const get_film_ratings = require('./get_film_ratings').handle;
const get_user_ratings = require('./get_user_ratings').handle;
const list_film =  require('./list_film').handle;
const get = require('./get').handle;


function sim (film1, film2,film1_ratings,film2_ratings) {
    const av1 = film1.rating.mean;
    const av2 = film2.rating.mean;
    var norm1 = 0;
    var norm2 = 0;

    for (rating in film1_ratings) {
        norm1 += (film1_ratings[rating] - av1)**2
    };
    
    norm1 = Math.sqrt(norm1);
    for (rating in film2_ratings) {
        norm2 += (film2_ratings[rating] - av2)**2
    };
    norm2 = Math.sqrt(norm2); 
   
    var result = 0;
    for (rating in film1_ratings) {
        if (typeof film2_ratings[rating] != "undefined") {
            result += (film1_ratings[rating] - av1)*(film2_ratings[rating] - av2)
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


function check_user(user_id, ratings){
    var s = false;
    for (x in ratings){
        // console.log(x);
        // console.log(user_id);
        if (x === user_id) {
            s = true
        }; };
    return s
};


async function k_voisin (film, film_ratings, k, user_id) {
    // var list = JSON.parse((await list_film()).body);
    list = JSON.parse((await list_film()).body);
    var list_user = [];
    for (var i = 0; i < Object.values(list).length; i++){
        const autre_film = list[i];
        const autre_film_ratings = (await get_film_ratings({"uuid" : autre_film.uuid})).body;         

        if (check_user(user_id,autre_film_ratings)) {
            list_user[i] = list[i]
            list_user[i].sim = sim(film,autre_film,film_ratings,autre_film_ratings);
        }
    };
    list_user.sort(function (a,b) {
        return a.sim > b.sim;
    });
    return  list_user.slice(0,(k));

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
 

    var voisin = await k_voisin(film, film_rating, 5, user_id);
   
    var estimation = 0;
    var somme_sim = 0;
 
    for (var i = 0; i < Object.values(voisin).length; i++){
        // console.log(voisin[i]);
        const autre_film = voisin[i];

        estimation +=  voisin[i].sim*(user_rating[voisin[i].uuid] - autre_film.rating.mean);
        somme_sim += Math.abs(voisin[i].sim);
    };
    return film.rating.mean + estimation/somme_sim;
}
