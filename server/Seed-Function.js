const pool=require("./database");
const models=[
    {"slug":"people/cedric-buchet","image":"2016/11/610539/610539-80tn.jpg","name":"Cedric Buchet","type":"Photographer"},
    {"slug":"people/cedric-jolivet","image":"2020/6/1351536/1351536-80tn.jpg","name":"Cedric Jolivet","type":"Makeup Artist"},
    {"slug":"people/cecilia-romero","image":"2017/10/782613/782613-80tn.jpg","name":"Cecilia Romero","type":"Hair Stylist"},
    {"slug":"people/celia-burton","image":"2016/11/611833/611833-80tn.jpg","name":"Celia Burton","type":"Makeup Artist"},
    {"slug":"people/celia-azoulay","image":"2019/8/1176951/1176951-80tn.jpg","name":"Celia Azoulay","type":"Fashion Editor/Stylist"},
    {"slug":"people/celestine-cooney","image":"2018/11/1023065/1023065-80tn.jpg","name":"Celestine Cooney","type":"Fashion Editor/Stylist"},
    {"slug":"models/celine-bouly","image":"2018/10/1000403/1000403-80tn.jpg","name":"Celine Bouly","type":"Model"},
    {"slug":"people/cecile-paravina","image":"2019/4/1112496/1112496-80tn.jpg","name":"Cécile Paravina","type":"Makeup Artist"},
    {"slug":"models/celine-delaugere","image":"2018/11/1013507/1013507-80tn.jpg","name":"Celine Delaugere","type":"Model"},
    {"slug":"people/celine-martin","image":"2019/5/1127265/1127265-80tn.jpg","name":"Celine Martin","type":"Makeup Artist"}
]
for(let i=0;i<models.length;i++){
    pool.query("INSERT INTO models (slug,image,name,type) VALUES ($1,$2,$3,$4)",[models[i].slug,models[i].image,models[i].name,models[i].type])
    .then()
    .catch(err=>console.log(err))
}