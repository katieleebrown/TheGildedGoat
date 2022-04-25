// Loading Characters from LocalStorage on Page Load
document.addEventListener("DOMContentLoaded", showCharacterCards)

//Event Listeners
document.querySelector('#magicItemButton').addEventListener('click', getMagicItem)
document.querySelector('#monsterButton').addEventListener('click', getMonster)
document.querySelector('#npcNameButton').addEventListener('click', getNPC)


// For Random Magic Item by Rarity
function getMagicItem() {
  let itemRarity = document.querySelector('#selectRarity').value
  if (itemRarity === 'veryRare') {
    itemRarity = 'very rare'
  }

  fetch('https://api.open5e.com/magicitems/?limit=250')
    .then(res => res.json())
    .then(data => {
      let random = Math.floor(Math.random() * data.results.length)

      while (data.results[random].rarity !== itemRarity) {
        random = Math.floor(Math.random() * data.results.length)
      }

      document.querySelector('.magicItem').innerText = data.results[random].name
      document.querySelector('.rarity').innerHTML = `<strong>Rarity:</strong> ${data.results[random].rarity}`
      document.querySelector('.itemType').innerHTML = `<strong>Type:</strong> ${data.results[random].type}`
      document.querySelector('.itemDescription').innerText = data.results[random].desc
    })

    .catch(err => {
      console.log(`error ${err}`)
    });
}


// For Random Monster by Monster Type
function getMonster() {
  let url
  let monsterType = document.querySelector('#selectCR').value
  document.querySelector('.monsterAttacks').innerHTML = ``

  monsterType ? url = `https://api.open5e.com/monsters/?type=${monsterType}` : url = "https://api.open5e.com/monsters/?limit=1100"

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const random = Math.floor(Math.random() * data.results.length)

      document.querySelector('.monsterName').innerText = data.results[random].name
      document.querySelector('.monsterChallengeRating').innerHTML = `<strong>Challenge Rating:</strong> ${data.results[random].challenge_rating}`
      document.querySelector('.monsterHP').innerHTML = `<strong>Hit Points:</strong> ${data.results[random].hit_points}`
      document.querySelector('.monsterSize').innerHTML = `<strong>Size:</strong> ${data.results[random].size}`
      document.querySelector('.monsterType').innerHTML = `<strong>Type:</strong> ${data.results[random].type}`

      for (let i = 0; i < data.results[random].actions.length; i++) {
        let arrPath = data.results[random].actions[i]
        document.querySelector('.monsterAttacks').innerHTML += `<p><strong>${arrPath.name}</strong></p><p>${arrPath.desc}</p>`
      }
    })

    .catch(err => {
      console.log(`error ${err} `)
    });
}


// Get Random NPC Info
// https://github.com/bvezilic/DnD-name-generator/tree/master/data
function getNPC() {
  // Random Name Based on Race and Gender
  let npcRace = document.querySelector('#chooseRace').value
  let npcGender = document.querySelector('#chooseGender').value
  let randomName

  if (npcGender === 'female' && npcRace === 'dragonborn') {
    let femaleDragonborn = ['Artana', 'Kalas', 'Khagra', 'Leytra', 'Myrka', 'Naya', 'Osayah', 'Sarcha', 'Shirren', 'Sirivistra', 'Sufana', 'Tamara', 'Vrumadi', 'Zovra', 'Akra', 'Aasathra', 'Antrara', 'Arava', 'Biri', 'Blendaeth', 'Burana', 'Chassath', 'Daar', 'Dentratha', 'Doudra', 'Driindar', 'Eggren', 'Farideh', 'Findex', 'Furrele', 'Gesrethe', 'Gilkass', 'Harann', 'Havilar', 'Hethress', 'Hillanot', 'Jaxi', 'Jezean', 'Jheri', 'Kadana', 'Kava', 'Korinn', 'Megren', 'Mijira', 'Mishann', 'Nala', 'Nuthra', 'Perra', 'Pogranix', 'Pyxrin', 'Quespa', 'Raiann', 'Rezena', 'Ruloth', 'Saphara', 'Savaran', 'Sora', 'Surina', 'Synthrin', 'Tatyan', 'Thava', 'Uadjit', 'Vezera', 'Zykroff']
    randomName = femaleDragonborn[Math.floor(Math.random() * femaleDragonborn.length)]
  } else if (npcGender === 'male' && npcRace === 'dragonborn') {
    let maleDragonborn = ['Andujar', 'Andujar', 'Armagan', 'Armek', 'Arzan', 'Axaran', 'Belaxarim', 'Brevarr', 'Djemidor', 'Draxan', 'Fayal', 'Grax', 'Iojad', 'Inzul', 'Khiraj', 'Kreytzen', 'Lejek', 'Malakith', 'Mar', 'Nazir', 'Nedam', 'Nevek', 'Ravaran', 'Razaan', 'Sarax', 'Sarram', 'Savaxis', 'Siangar', 'Sirizan', 'Sunan', 'Szuran', 'Tajan', 'Tamajon', 'Tenahn', 'Toxal', 'Tzegyr', 'Vantajar', 'Vharkus', 'Xafiq', 'Zarkhil', 'Zakhijin', 'Adrex', 'Arjhan', 'Azzakh', 'Balasar', 'Baradad', 'Bharash', 'Bidreked', 'Dadalan', 'Dazzazn', 'Direcris', 'Donaar', 'Fax', 'Gargax', 'Ghesh', 'Gorbundus', 'Greethen', 'Heskan', 'Hirrathak', 'Ildrex', 'Kaladan', 'Kerkad', 'Kiirith', 'Kriv', 'Maagog', 'Medrash', 'Mehen', 'Mozikth', 'Mreksh', 'Mugrunden', 'Nadarr', 'Nithther', 'Norkruuth', 'Nykkan', 'Pandjed', 'Patrin', 'Pijjirik', 'Quarethon', 'Rathkran', 'Rhogar', 'Rivaan', 'Sethrekar', 'Shamash', 'Shedinn', 'Srorthen', 'Tarhun', 'Torinn', 'Trynnicus', 'Valorean', 'Vrondiss', 'Zedaar']
    randomName = maleDragonborn[Math.floor(Math.random() * maleDragonborn.length)]
  } else if (npcGender === 'female' && npcRace === 'dwarf') {
    let femaleDwarf = ['Beyla', 'Fenryl', 'Freyde', 'Grenenzel', 'Krystolari', 'Lokara', 'Lurka', 'Marnia', 'Praxana', 'Rokel', 'Roksana', 'Thurlfara', 'Vauldra', 'Veklani', 'Vronwe', 'Zebel', 'Amber', 'Artin', 'Audhild', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth', 'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja', 'Hlin', 'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn', 'Sannl', 'Torbera', 'Torgga', 'Vistra', 'Anbera', 'Artin', 'Audhild', 'Balifra', 'Barbena', 'Bardryn', 'Bolhild', 'Dagnal', 'Dariff', 'Delre', 'Diesa', 'Eldeth', 'Eridred', 'Falkrunn', 'Fallthra', 'Finellen', 'Gillydd', 'Gunnloda', 'Gurdis', 'Helgret', 'Helja', 'Hlin', 'Ilde', 'Jarana', 'Kathra', 'Kilia', 'Kristryd', 'Liftrasa', 'Marastyr', 'Mardred', 'Morana', 'Nalaed', 'Nora', 'Nurkara', 'Oriff', 'Ovina', 'Riswynn', 'Sannl', 'Therlin', 'Thodris', 'Torbera', 'Tordrid', 'Torgga', 'Urshar', 'Valida', 'Vistra', 'Vonana', 'Werydd', 'Whurdred', 'Yurgunn']
    randomName = femaleDwarf[Math.floor(Math.random() * femaleDwarf.length)]
  } else if (npcGender === 'male' && npcRace === 'dwarf') {
    let maleDwarf = ['Agaro', 'Arnan', 'Arval', 'Auxlan', 'Avamir', 'Baelnar', 'Balfam', 'Bariken', 'Borkul', 'Darkul', 'Dolmen', 'Dyrnar', 'Erag', 'Ezegan', 'Ferrek', 'Garmul', 'Glint', 'Ghorvas', 'Grimmalk', 'Haeltar', 'Hagan', 'Halagmar', 'Halzar', 'Hlant', 'Korlag', 'Krag', 'Krim', 'Kurman', 'Lurtrum', 'Malagar', 'Mardam', 'Maulnar', 'Melgar', 'Morak', 'Orobok', 'Radek', 'Rogath', 'Roken', 'Rozag', 'Sabakzar', 'Sharak', 'Smethykk', 'Swargar', 'Thorbalt', 'Thorin', 'Tredigar', 'Vabul', 'Vistrum', 'Wolvar', 'Adrik', 'Alberich', 'Baern', 'Barendd', 'Brottor', 'Bruenor', 'Dain', 'Darrak', 'Delg', 'Eberk', 'Einkil', 'Fargrim', 'Flint', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Oskar', 'Rangrim', 'Rurik', 'Taklinn', 'Thoradin', 'Thorin', 'Tordek', 'Traubon', 'Travok', 'Ulfgar', 'Veit', 'Vondal', 'Adrik', 'Alberich', 'Baern', 'Barendd', 'Beloril', 'Brottor', 'Dain', 'Dalgal', 'Darrak', 'Delg', 'Duergath', 'Dworic', 'Eberk', 'Einkil', 'Elaim', 'Erias', 'Fallond', 'Fargrim', 'Gardain', 'Gilthur', 'Gimgen', 'Gimurt', 'Harbek', 'Kildrak', 'Kilvar', 'Morgran', 'Morkral', 'Nalral', 'Nordak', 'Nuraval', 'Oloric', 'Olunt', 'Orsik', 'Oskar', 'Rangrim', 'Reirak', 'Rurik', 'Taklinn', 'Thoradin', 'Thorin', 'Thradal', 'Tordek', 'Traubon', 'Travok', 'Ulfgar', 'Uraim', 'Veit', 'Vonbin', 'Vondal', 'Whurbin']
    randomName = maleDwarf[Math.floor(Math.random() * maleDwarf.length)]
  } else if (npcGender === 'female' && npcRace === 'elf') {
    let femaleElf = ['Aryllan', 'Atalya', 'Ayrthwil', 'Clorinda', 'Irva', 'Lyfalia', 'Milena', 'Olethea', 'Ronefel', 'Shayndel', 'Thirya', 'Velene', 'Venefiq', 'Zereni', 'Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna', 'Birel', 'Caelynn', 'Drusilia', 'Enna', 'Felosial', 'Ielenia', 'Jelenneth', 'Keyleth', 'Leshanna', 'Lia', 'Meriele', 'Mialee', 'Naivara', 'Quelenna', 'Quillathe', 'Sariel', 'Shanairra', 'Shava', 'Silaqui', 'Theirastra', 'Thia', 'Vadania', 'Valanthe', 'Xanaphia', 'Adrie', 'Ahinar', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Arara', 'Baelitae', 'Bethrynna', 'Birel', 'Caelynn', 'Chaedi', 'Claira', 'Dara', 'Drusilia', 'Elama', 'Enna', 'Faral', 'Felosial', 'Hatae', 'Ielenia', 'Ilanis', 'Irann', 'Jarsali', 'Jelenneth', 'Keyleth', 'Leshanna', 'Lia', 'Maiathah', 'Malquis', 'Meriele', 'Mialee', 'Myathethil', 'Naivara', 'Quelenna', 'Quillathe', 'Ridaro', 'Sariel', 'Shanairla', 'Shava', 'Silaqui', 'Sumnes', 'Theirastra', 'Thiala', 'Tiaathque', 'Traulam', 'Vadania', 'Valanthe', 'Valna', 'Xanaphia']
    randomName = femaleElf[Math.floor(Math.random() * femaleElf.length)]
  } else if (npcGender === 'male' && npcRace === 'elf') {
    let maleElf = ['Alarcion', 'Alathar', 'Ariandar', 'Arromar', 'Borel', 'Bvachan', 'Carydion', 'Callis', 'Cyprian', 'Dusan', 'Elgoth', 'Farlien', 'Ferel', 'Gaerlan', 'Iafalior', 'Kaelthorn', 'Laethan', 'Leliar', 'Leodor', 'Lorak', 'Lorifir', 'Morian', 'Miklos', 'Oleran', 'Rylef', 'Savian', 'Seylas', 'Tevior', 'Veyas', 'Adran', 'Aelar', 'Aramil', 'Arannis', 'Aust', 'Beiro', 'Berrian', 'Carric', 'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Hadarai', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Laucian', 'Mindartis', 'Paelias', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Theren', 'Varis', 'Adran', 'Aelar', 'Aerdeth', 'Ahvain', 'Aramil', 'Arannis', 'Aust', 'Azaki', 'Beiro', 'Berrian', 'Caeldrim', 'Carric', 'Dayereth', 'Dreali', 'Efferil', 'Eiravel', 'Enialis', 'Erdan', 'Erevan', 'Fivin', 'Galinndan', 'Gennal', 'Hadarai', 'Halimath', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Korfel', 'Lamlis', 'Laucian', 'Lucan', 'Mindartis', 'Naal', 'Nutae', 'Paelias', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Soveliss', 'Suhnae', 'Thamior', 'Tharivol', 'Theren', 'Theriatis', 'Thervan', 'Uthemar', 'Vanuath', 'Varis']
    randomName = maleElf[Math.floor(Math.random() * maleElf.length)]
  } else if (npcGender === 'female' && npcRace === 'halfling') {
    let femaleHalfling = ['Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna', 'Caliope', 'Emily', 'Piper', 'Rixi', 'Sabretha', 'Teg', 'Tilly', 'Toira', 'Vexia', 'Vil', 'Vzani', 'Zanthe', 'Ziza', 'Alain', 'Andry', 'Anne', 'Bella', 'Blossom', 'Bree', 'Callie', 'Chenna', 'Cora', 'Dee', 'Dell', 'Eida', 'Eran', 'Euphemia', 'Georgina', 'Gynnie', 'Harriet', 'Jasmine', 'Jillian', 'Jo', 'Kithri', 'Lavinia', 'Lidda', 'Maegan', 'Marigold', 'Merla', 'Myria', 'Nedda', 'Nikki', 'Nora', 'Olivia', 'Paela', 'Pearl', 'Pennie', 'Philomena', 'Portia', 'Robbie', 'Rose', 'Saral', 'Seraphina', 'Shaena', 'Stacee', 'Tawna', 'Thea', 'Trym', 'Tyna', 'Vani', 'Verna', 'Wella', 'Willow']
    randomName = femaleHalfling[Math.floor(Math.random() * femaleHalfling.length)]
  } else if (npcGender === 'male' && npcRace === 'halfling') {
    let maleHalfling = ['Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby', 'Arthan', 'Carvin', 'Corby', 'Cullen', 'Egen', 'Ernest', 'Gedi', 'Heron', 'Jeryl', 'Keffen', 'Kylem', 'Kynt', 'Leskyn', 'Neff', 'Orne', 'Quarrel', 'Rabbit', 'Rilkin', 'Snakebait', 'Tarfen', 'Titch', 'Tuck', 'Whim', 'Alton', 'Ander', 'Bernie', 'Bobbin', 'Cade', 'Callus', 'Corrin', 'Dannad', 'Danniel', 'Eddie', 'Egart', 'Eldon', 'Errich', 'Fildo', 'Finnan', 'Franklin', 'Garret', 'Garth', 'Gilbert', 'Gob', 'Harol', 'Igor', 'Jasper', 'Keith', 'Kevin', 'Lazam', 'Lerry', 'Lindal', 'Lyle', 'Merric', 'Mican', 'Milo', 'Morrin', 'Nebin', 'Nevil', 'Osborn', 'Ostran', 'Oswalt', 'Perrin', 'Poppy', 'Reed', 'Roscoe', 'Sam', 'Shardon', 'Tye', 'Ulmo', 'Wellby', 'Wendel', 'Wenner', 'Wes']
    randomName = maleHalfling[Math.floor(Math.random() * maleHalfling.length)]
  } else if (npcGender === 'female' && npcRace === 'halfOrc') {
    let femaleHalfOrc = ['Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen', 'Yevelda', 'Arha', 'Bendoo', 'Bilga', 'Brakka', 'Creega', 'Drenna', 'Ekk', 'Emen', 'Engong', 'Fistula', 'Gaaki', 'Gorga', 'Grai', 'Greeba', 'Grigi', 'Gynk', 'Hrathy', 'Huru', 'Ilga', 'Kabbarg', 'Kansif', 'Lagazi', 'Lezre', 'Murgen', 'Murook', 'Myev', 'Nagrette', 'Neega', 'Nella', 'Nogu', 'Oolah', 'Ootah', 'Ovak', 'Ownka', 'Puyet', 'Reeza', 'Shautha', 'Silgre', 'Sutha', 'Tagga', 'Tawar', 'Tomph', 'Ubada', 'Vanchu', 'Vola', 'Volen', 'Vorka', 'Yevelda', 'Zagga']
    randomName = femaleHalfOrc[Math.floor(Math.random() * femaleHalfOrc.length)]
  } else if (npcGender === 'male' && npcRace === 'halfOrc') {
    let maleHalfOrc = ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk', 'Argran', 'Braak', 'Brug', 'Cagak', 'Dench', 'Dorn', 'Dren', 'Druuk', 'Feng', 'Gell', 'Gnarsh', 'Grumbar', 'Gubrash', 'Hagren', 'Henk', 'Hogar', 'Holg', 'Imsh', 'Karash', 'Karg', 'Keth', 'Korag', 'Krusk', 'Lubash', 'Megged', 'Mhurren', 'Mord', 'Morg', 'Nil', 'Nybarg', 'Odorr', 'Ohr', 'Rendar', 'Resh', 'Ront', 'Rrath', 'Sark', 'Scrag', 'Sheggen', 'Shump', 'Tanglar', 'Tarak', 'Thar', 'Thokk', 'Trag', 'Ugarth', 'Varg', 'Vilberg', 'Yurk', 'Zed']
    randomName = maleHalfOrc[Math.floor(Math.random() * maleHalfOrc.length)]
  } else if (npcGender === 'female' && npcRace === 'human') {
    let femaleHuman = ['Azura', 'Axelle', 'Brey', 'Brynna', 'Carlen', 'Clotilda', 'Druella', 'Eloise', 'Eliska', 'Enye', 'Giselle', 'Hallan', 'Kasaki', 'Lida', 'Lorelei', 'Megan', 'Millicent', 'Mirabel', 'Natalie', 'Nicola', 'Nydia', 'Pharana', 'Remora', 'Rolanda', 'Rosalyn', 'Rudelle', 'Sachil', 'Saidi', 'Tanika', 'Tura', 'Tylsa', 'Vencia', 'Veronica', 'Wilhelmina', 'Xandrilla', 'Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida', 'Arveene', 'Esvele', 'Jhessail', 'Kerri', 'Lureene', 'Miri', 'Rowan', 'Shandri', 'Tessele', 'Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma', 'Tana', 'Zora', 'Amafrey', 'Betha', 'Cefrey', 'Kethra', 'Mara', 'Olga', 'Silifrey', 'Westra', 'Arizima', 'Chathi', 'Nephis', 'Nulara', 'Murithi', 'Sefris', 'Thola', 'Umara', 'Zolis', 'Fyevarra', 'Hulmarra', 'Immith', 'Imzel', 'Navarra', 'Shevarra', 'Tammith', 'Yuldra', 'Bai', 'Chao', 'Jia', 'Lei', 'Mei', 'Qiao', 'Shui', 'Tai', 'Balama', 'Dona', 'Faila', 'Jalana', 'Luisa', 'Marta', 'Quara']
    randomName = femaleHuman[Math.floor(Math.random() * femaleHuman.length)]
  } else if (npcGender === 'male' && npcRace === 'human') {
    let maleHuman = ['Adler', 'Admon', 'Adolph', 'Ahren', 'Aimery', 'Alard', 'Alaric', 'Aldous', 'Alwyn', 'Ambert', 'Anlow', 'Arando', 'Bram', 'Bedrich', 'Bertram', 'Benvolio', 'Bennett', 'Cale', 'Conrad', 'Dalkon', 'Daylen', 'Dedric', 'Del', 'Derek', 'Dexter', 'Dian', 'Dirke', 'Dodd', 'Dungarth', 'Dyrk', 'Eandro', 'Falken', 'Feck', 'Fenton', 'Gallus', 'Garvin', 'Griswold', 'Gryphero', 'Hagar', 'Hamlin', 'Helmut', 'Hew', 'Jeras', 'Krynt', 'Lavant', 'Leyten', 'Madian', 'Malfier', 'Markus', 'Meklan', 'Milos', 'Namen', 'Navaren', 'Nerle', 'Nilus', 'Ningyan', 'Norris', 'Quentin', 'Raeburn', 'Raynard', 'Ritter', 'Rudolph', 'Semil', 'Sevenson', 'Steveren', 'Talfen', 'Tamond', 'Taran', 'Tavon', 'Tegan', 'Vanan', 'Vincent', 'Wendell', 'Wolfram', 'Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir', 'Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn', 'Randal', 'Stedd', 'Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef', 'Mival', 'Orel', 'Pavel', 'Sergor', 'Ander', 'Blath', 'Bran', 'Frath', 'Geth', 'Lander', 'Luth', 'Malcer', 'Stor', 'Taman', 'Urth', 'Aoth', 'Bareris', 'Ehput-Ki', 'Kethoth', 'Mumed', 'Ramas', 'So-Kehur', 'Thazar-De', 'Urhur', 'Borivik', 'Faurgar', 'Jandar', 'Kanithar', 'Madislak', 'Ralmevik', 'Shaumar', 'Vladislak', 'Hulmarra', 'Immith', 'Imzel', 'Navarra', 'Shevarra', 'Tammith', 'Yuldra', 'An', 'Chen', 'Chi', 'Fai', 'Jiang', 'Jun', 'Lian', 'Long', 'Meng', 'On', 'Shan', 'Shui', 'Wen', 'Anton', 'Diero', 'Marcon', 'Pieron', 'Rimardo', 'Romero', 'Salazar', 'Umbero']
    randomName = maleHuman[Math.floor(Math.random() * maleHuman.length)]
  } else if (npcGender === 'female' && npcRace === 'tiefling') {
    let femaleTiefling = ['Affyria', 'Cataclysmia', 'Domitia', 'Dorethau', 'Excellence', 'Hacari', 'Iritra', 'Lachira', 'Levatra', 'Mecretia', 'Milvia', 'Nericia', 'Precious', 'Rain', 'Samantia', 'Sunshine', 'Tenerife', 'Traya', 'Velavia', 'Zaidi', 'Zethaya', 'Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea', 'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta', 'Akta', 'Anakis', 'Armara', 'Astaro', 'Aym', 'Azza', 'Beleth', 'Bryseis', 'Bune', 'Criella', 'Damaia', 'Decarabia', 'Ea', 'Gadreel', 'Gomory', 'Hecat', 'Ishte', 'Jezebeth', 'Kali', 'Kallista', 'Kasdeya', 'Lerissa', 'Lilith', 'Makaria', 'Manea', 'Markosian', 'Mastema', 'Naamah', 'Nemeia', 'Nija', 'Orianna', 'Osah', 'Phelaia', 'Prosperine', 'Purah', 'Pyra', 'Rieta', 'Ronobe', 'Ronwe', 'Seddit', 'Seere', 'Sekhmet', 'Semyaza', 'Shava', 'Shax', 'Sorath', 'Uzza', 'Vapula', 'Vepar', 'Verin']
    randomName = femaleTiefling[Math.floor(Math.random() * femaleTiefling.length)]
  } else if (npcGender === 'male' && npcRace === 'tielfing') {
    let maleTiefling = ['Ankhus', 'Arkadi', 'Armarius', 'Armillius', 'Archidius', 'Balmoloch', 'Calderax', 'Cavian', 'Cenereth', 'Chorum', 'Corynax', 'Dacian', 'Daelius', 'Damaceus', 'Decimeth', 'Demedor', 'Demerian', 'Dynachus', 'Grassus', 'Halius', 'Heleph', 'Incirion', 'Kalaradian', 'Kamien', 'Kazimir', 'Kzandro', 'Machem', 'Maetheus', 'Malfias', 'Marchion', 'Menerus', 'Namazeus', 'Nensis', 'Prismeus', 'Pyranikus', 'Razortail', 'Sejanus', 'Severian', 'Suffer', 'Syken', 'Tarkus', 'Vaius', 'Xerek', 'Zeth', 'Zevon', 'Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon', 'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios', 'Skamos', 'Therai', 'Abad', 'Ahrim', 'Akmen', 'Amnon', 'Andram', 'Astar', 'Balam', 'Barakas', 'Bathin', 'Caim', 'Chem', 'Cimer', 'Cressel', 'Damakos', 'Ekemon', 'Euron', 'Fenriz', 'Forcas', 'Habor', 'Iados', 'Kairon', 'Leucis', 'Mamnen', 'Mantus', 'Marbas', 'Melech', 'Merihim', 'Modean', 'Mordai', 'Mormo', 'Morthos', 'Nicor', 'Nirgel', 'Oriax', 'Paymon', 'Pelaios', 'Purson', 'Qemuel', 'Raam', 'Rimmon', 'Sammal', 'Skamos', 'Tethren', 'Thamuz', 'Therai', 'Valafar', 'Vassago', 'Xappan', 'Zepar', 'Zephan']
    randomName = maleTiefling[Math.floor(Math.random() * maleTiefling.length)]
  }

  document.querySelector('.npcName').innerText = randomName

  // Random Age for NPC Based on Race  
  let age
  switch (npcRace) {
    case 'dragonborn':
      age = Math.floor((Math.random() * 80) + 3)
      break
    case 'dwarf':
      age = Math.floor((Math.random() * 350) + 25)
      break
    case 'elf':
      age = Math.floor((Math.random() * 750) + 50)
      break
    case 'halfling':
      age = Math.floor((Math.random() * 150) + 10)
      break
    case 'halfOrc':
      age = Math.floor((Math.random() * 75) + 12)
      break
    case 'human':
      age = Math.floor((Math.random() * 80) + 5)
      break
    case 'tiefling':
      age = Math.floor((Math.random() * 100) + 8)
      break
  }
  document.querySelector('.npcAge').innerText = `Age: ${age}`

  //Random Background for NPC
  backgrounds = ['acolyte', 'charlatan', 'criminal/spy', 'entertainer', 'folk hero', 'gladiator', 'guild artisan/merchant', 'hermit', 'knight', 'noble', 'outlander', 'pirate', 'sage', 'sailor', 'soldier', 'urchin']
  document.querySelector('.npcBackground').innerText = `Background: ${backgrounds[Math.floor(Math.random() * backgrounds.length)]}`


  // Random Alignment for NPC
  alignment = ['lawful good', 'neutral good', 'chaotic good', 'lawful neutral', 'true neutral', 'chaotic neutral', 'lawful evil', 'neutral evil', 'chaotic evil']
  document.querySelector('.npcAlignment').innerText = `Alignment: ${alignment[Math.floor(Math.random() * alignment.length)]}`
}


// For Character Builder
// Updating Subclass Options Based on Class Selection
// TODO FIX VALUE SAVING ISSUE
// document.querySelector('#subclassSelect').addEventListener('click', updateSubclassDropdown)

function updateSubclassDropdown() {
  let selectedClass = document.querySelector('#classSelect').value
  let dropdown = document.querySelector('#subclassSelect')
  dropdown.length = 0

  let defaultOption = document.createElement('option')
  defaultOption.text = 'Random'
  defaultOption.value = 'random'

  dropdown.add(defaultOption)
  dropdown.selectedIndex = 0

  let url = `https://www.dnd5eapi.co/api/classes/${selectedClass}/subclasses`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let option

      for (let i = 0; i < data.results.length; i++) {
        option = document.createElement('option')
        option.text = data.results[i].name
        option.value = data.results[i].index
        dropdown.add(option)
      }
    })
}

// Pulls Character Info on Page Load, calls create a card function for each character
function showCharacterCards() {
  if (localStorage.getItem('characterList') !== null) {
    characterList = JSON.parse(localStorage.getItem('characterList'))

    characterList.forEach(character => {
      createCard(character)
    })
  }
}

// Creates a card
function createCard(character) {
  let idName = character.characterName.split(' ').join('')

    let newSection = document.createElement('section')
    newSection.classList.add('characterCard')
    newSection.style.boxShadow = `3px 3px 3px ${character.accentColor}`

    let heading = document.createElement('h2')
    heading.setAttribute('id', `${idName}header`)
    newSection.appendChild(heading)

    let image = document.createElement('img')
    image.setAttribute('src', `${character.characterImg}`)
    image.setAttribute('alt', `${character.characterName}`)
    image.style.borderColor = character.accentColor
    newSection.appendChild(image)

    let paragraph = document.createElement('p')
    paragraph.setAttribute('id', `${idName}class`)
    newSection.appendChild(paragraph)

    // Need to get value from created dropdown stuff for this to work
    // let nextParagraph = document.createElement('p')
    // nextParagraph.setAttribute('id', `${idName}subclass`)
    // newSection.appendChild(nextParagraph)

    let anotherParagraph = document.createElement('p')
    anotherParagraph.setAttribute('id', `${idName}race`)
    newSection.appendChild(anotherParagraph)

    let lastParagraph = document.createElement('p')
    lastParagraph.setAttribute('id', `${idName}level`)
    newSection.appendChild(lastParagraph)

    let cardHolder = document.querySelector('#characterHolder')
    cardHolder.appendChild(newSection)

    document.querySelector(`#${idName}header`).innerText = character.characterName
    document.querySelector(`#${idName}header`).style.background = character.accentColor
    document.querySelector(`#${idName}class`).innerHTML = `<strong>Class: </strong> ${character.charClass}`
    // document.querySelector(`#${idName}subclass`).innerHTML = `<strong>Sublass: </strong> ${character.charSublass}`
    document.querySelector(`#${idName}race`).innerHTML = `<strong>Race: </strong> ${character.charRace}`
    document.querySelector(`#${idName}level`).innerHTML = `<strong>Level: </strong> ${character.charLevel}`
}

// Make a New Character
document.querySelector('#charBuilderButton').addEventListener('click', makeCharacter)

function makeCharacter() {
  // Determining if characters currently exist in storage, pulling from storage if so
  let characterList = []
  if (localStorage.getItem('characterList') !== null) {
    characterList = JSON.parse(localStorage.getItem('characterList'))
  }

  // Creating a new object for new character
  let character = {
    'characterName': document.querySelector('#characterName').value,
    'characterImg': document.querySelector('#imgUrl').value,
    'accentColor': document.querySelector('#characterColor').value,
    'charLevel': document.querySelector('#level').value,
    'charClass': document.querySelector('#classSelect').value,
    'charRace' : document.querySelector('#raceSelect').value,
    //'charSubclass': document.querySelector('#subclassSelect').value,
  }

  if (character.charClass === 'random') {
    let randomNumber = Math.floor(Math.random() * 12)
    let classOptions = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']

    character.charClass = classOptions[randomNumber]
  }

  if (character.charRace === 'random') {
    let randomNumber = Math.floor(Math.random() * 9)
    let raceOptions = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Halfling', 'HalfElf', 'HalfOrc', 'Human', 'Tiefling']

    character.charRace = raceOptions[randomNumber]
  }

  // Adding new character to character list
  characterList.push(character)
  let charString = JSON.stringify(characterList)
  console.log(characterList)
  console.log(charString)
  localStorage.setItem('characterList', charString)

  // Creating a new card for this character
  createCard(character)

  //Clear Card to add new Characters
  document.querySelector('.characterBuilder').reset()
}

//TODO:Need random selections to roll a random character. Random Button ? 