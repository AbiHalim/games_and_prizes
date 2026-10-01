// Trivia questions in English (en), Simplified Chinese (zh) and Malay (ms).
// Each entry lists the correct answer first; options are shuffled with a fixed seed
// below so every laptop shows the same A–D order.
// Please have a native speaker check the Chinese and Malay text before the event.

const L = (en, zh, ms) => ({ en, zh, ms });

const RAW = [
  {
    q: L('Which is the fastest land animal in the world?', '世界上跑得最快的陆地动物是什么？', 'Apakah haiwan darat yang paling laju di dunia?'),
    a: L('Cheetah', '猎豹', 'Cheetah'),
    w: [L('Lion', '狮子', 'Singa'), L('Horse', '马', 'Kuda'), L('Kangaroo', '袋鼠', 'Kanggaru')],
    fact: L(
      'A cheetah can run at about 100 km/h in short bursts – faster than cars on the expressway!',
      '猎豹短距离冲刺时速可达约100公里，比高速公路上的汽车还快！',
      'Cheetah boleh berlari kira-kira 100 km sejam dalam jarak dekat – lebih laju daripada kereta di lebuh raya!',
    ),
  },
  {
    q: L('The Merlion has the head of a lion and the body of a…?', '鱼尾狮有狮子的头，它的身体是什么？', 'Merlion mempunyai kepala singa dan badan…?'),
    a: L('Fish', '鱼', 'Ikan'),
    w: [L('Bird', '鸟', 'Burung'), L('Horse', '马', 'Kuda'), L('Dragon', '龙', 'Naga')],
    fact: L(
      "The fish body stands for Singapore's beginnings as a fishing village, and the lion head stands for 'Singapura', the Lion City.",
      '鱼身代表新加坡最初是一个渔村，狮头则代表“Singapura”——狮城。',
      "Badan ikan melambangkan asal usul Singapura sebagai perkampungan nelayan, dan kepala singa melambangkan 'Singapura', Kota Singa.",
    ),
  },
  {
    q: L('How many legs does a spider have?', '蜘蛛有几条腿？', 'Berapakah bilangan kaki labah-labah?'),
    a: '8',
    w: ['6', '10', '4'],
    fact: L(
      'Insects have 6 legs, so spiders are not insects – they belong to a group called arachnids.',
      '昆虫有6条腿，所以蜘蛛不是昆虫，而是属于蛛形纲动物。',
      'Serangga mempunyai 6 kaki, jadi labah-labah bukan serangga – ia tergolong dalam kumpulan araknid.',
    ),
  },
  {
    q: L('How many colours are there in a rainbow?', '彩虹有几种颜色？', 'Berapakah bilangan warna dalam pelangi?'),
    a: '7',
    w: ['5', '6', '9'],
    fact: L(
      'Red, orange, yellow, green, blue, indigo and violet.',
      '红、橙、黄、绿、蓝、靛、紫。',
      'Merah, jingga, kuning, hijau, biru, nila dan ungu.',
    ),
  },
  {
    q: L("Which fruit is known as the 'King of Fruits'?", '哪一种水果被称为“水果之王”？', "Buah apakah yang dikenali sebagai 'Raja Buah'?"),
    a: L('Durian', '榴梿', 'Durian'),
    w: [L('Mango', '芒果', 'Mangga'), L('Banana', '香蕉', 'Pisang'), L('Rambutan', '红毛丹', 'Rambutan')],
    fact: L(
      "Durian smells so strong that it is not allowed on the MRT! The mangosteen is called the 'Queen of Fruits'.",
      '榴梿气味太浓，不能带上地铁！山竹则被称为“水果之后”。',
      "Bau durian sangat kuat sehingga ia tidak dibenarkan dibawa ke dalam MRT! Manggis pula digelar 'Ratu Buah'.",
    ),
  },
  {
    q: L('What is the largest animal in the world?', '世界上最大的动物是什么？', 'Apakah haiwan yang paling besar di dunia?'),
    a: L('Blue whale', '蓝鲸', 'Ikan paus biru'),
    w: [L('Elephant', '大象', 'Gajah'), L('Giraffe', '长颈鹿', 'Zirafah'), L('Shark', '鲨鱼', 'Ikan yu')],
    fact: L(
      'A blue whale can grow up to 30 metres long – longer than two buses! It is even bigger than the dinosaurs were.',
      '蓝鲸可以长到30米，比两辆巴士还长！它甚至比恐龙还大。',
      'Ikan paus biru boleh membesar sehingga 30 meter – lebih panjang daripada dua buah bas! Ia lebih besar daripada dinosaur.',
    ),
  },
  {
    q: L('Bees build their honeycomb with cells shaped like a…?', '蜜蜂的蜂巢是由什么形状的小格子组成的？', 'Lebah membina sarang madu dengan petak berbentuk…?'),
    a: L('Hexagon (6 sides)', '六边形', 'Heksagon (6 sisi)'),
    w: [L('Circle', '圆形', 'Bulatan'), L('Triangle', '三角形', 'Segi tiga'), L('Square', '正方形', 'Segi empat sama')],
    fact: L(
      'Hexagons fit together with no gaps, so bees can store the most honey using the least wax.',
      '六边形能紧密拼在一起，没有空隙，让蜜蜂用最少的蜂蜡储存最多的蜂蜜。',
      'Heksagon boleh disusun rapat tanpa ruang kosong, jadi lebah boleh menyimpan paling banyak madu dengan lilin yang paling sedikit.',
    ),
  },
  {
    q: L('How is teh tarik made nice and frothy?', '拉茶是怎样做出泡沫的？', 'Bagaimanakah teh tarik dibuat supaya berbuih?'),
    a: L('Pouring it back and forth between two cups', '在两个杯子之间来回倒', 'Dituang berulang kali antara dua cawan'),
    w: [L('Adding ice cream', '加冰淇淋', 'Tambah aiskrim'), L('Shaking it in a bottle', '放在瓶子里摇', 'Digoncang dalam botol'), L('Blowing on it', '用嘴吹', 'Ditiup')],
    fact: L(
      "'Tarik' means 'pull' in Malay – the tea is 'pulled' from one cup to another, which also cools it down.",
      '“Tarik”在马来语里是“拉”的意思——茶在两个杯子之间被“拉”来拉去，也能让茶变凉一些。',
      "Teh 'ditarik' dari satu cawan ke cawan lain – cara ini juga menyejukkan teh.",
    ),
  },
  {
    q: L('Which of these birds cannot fly?', '以下哪种鸟不会飞？', 'Antara burung berikut, yang manakah tidak boleh terbang?'),
    a: L('Penguin', '企鹅', 'Penguin'),
    w: [L('Eagle', '老鹰', 'Helang'), L('Sparrow', '麻雀', 'Burung pipit'), L('Parrot', '鹦鹉', 'Burung kakak tua')],
    fact: L(
      "Penguins use their wings like flippers to 'fly' through the water.",
      '企鹅把翅膀当作鳍，在水中“飞翔”。',
      "Penguin menggunakan sayapnya seperti sirip untuk 'terbang' di dalam air.",
    ),
  },
  {
    q: L('How many days are there in a leap year?', '闰年有多少天？', 'Berapakah bilangan hari dalam tahun lompat?'),
    a: '366',
    w: ['365', '364', '360'],
    fact: L(
      'The extra day is 29 February, which comes once every 4 years. The next leap year is 2028.',
      '多出来的一天是2月29日，每4年才有一次。下一个闰年是2028年。',
      'Hari tambahan itu ialah 29 Februari, yang datang setiap 4 tahun. Tahun lompat seterusnya ialah 2028.',
    ),
  },
  {
    q: L('The Great Wall is in which country?', '长城位于哪个国家？', 'Tembok Besar terletak di negara mana?'),
    a: L('China', '中国', 'China'),
    w: [L('Japan', '日本', 'Jepun'), L('India', '印度', 'India'), L('Egypt', '埃及', 'Mesir')],
    fact: L(
      'The Great Wall is over 20,000 km long. But contrary to popular belief, you cannot see it from the Moon with your eyes alone.',
      '长城总长超过2万公里。不过，和很多人想的不一样，从月球上用肉眼是看不到长城的。',
      'Tembok Besar China panjangnya lebih 20,000 km. Tetapi, berbeza dengan kepercayaan ramai, ia tidak boleh dilihat dari Bulan dengan mata kasar.',
    ),
  },
  {
    q: L("What is Singapore's national flower?", '新加坡的国花是什么？', 'Apakah bunga kebangsaan Singapura?'),
    a: L('Orchid (Vanda Miss Joaquim)', '胡姬花（卓锦·万代兰）', 'Orkid (Vanda Miss Joaquim)'),
    w: [L('Rose', '玫瑰', 'Mawar'), L('Lotus', '莲花', 'Teratai'), L('Sunflower', '向日葵', 'Bunga matahari')],
    fact: L(
      'The Vanda Miss Joaquim orchid was chosen as the national flower in 1981. It is a hybrid first grown in Singapore.',
      '卓锦·万代兰于1981年被选为国花，它是最早在新加坡培育出来的杂交兰花。',
      'Orkid Vanda Miss Joaquim dipilih sebagai bunga kebangsaan pada tahun 1981. Ia ialah orkid kacukan yang mula-mula ditanam di Singapura.',
    ),
  },
  {
    q: L("Which planet is known as the 'Red Planet'?", '哪一颗行星被称为“红色星球”？', "Planet manakah yang dikenali sebagai 'Planet Merah'?"),
    a: L('Mars', '火星', 'Marikh'),
    w: [L('Jupiter', '木星', 'Musytari'), L('Venus', '金星', 'Zuhrah'), L('Saturn', '土星', 'Zuhal')],
    fact: L(
      'Mars looks red because its soil contains a lot of rusty iron.',
      '火星看起来是红色的，因为它的土壤含有大量生锈的铁。',
      'Marikh kelihatan merah kerana tanahnya mengandungi banyak besi yang berkarat.',
    ),
  },
  {
    q: L('Chicken rice gets its fragrant taste because the rice is cooked with…?', '海南鸡饭的饭很香，是因为用什么来煮？', 'Nasi ayam wangi dan sedap kerana nasinya dimasak dengan…?'),
    a: L('Chicken stock and chicken fat', '鸡汤和鸡油', 'Sup ayam dan lemak ayam'),
    w: [L('Coconut milk', '椰浆', 'Santan'), L('Curry', '咖喱', 'Kari'), L('Tea', '茶', 'Teh')],
    fact: L(
      'Chicken rice was brought to Singapore by immigrants from Hainan Island in China. Rice cooked in coconut milk is used for nasi lemak instead.',
      '海南鸡饭是由来自中国海南岛的移民带到新加坡的。用椰浆煮的饭则是椰浆饭（Nasi Lemak）。',
      'Nasi ayam dibawa ke Singapura oleh pendatang dari Pulau Hainan, China. Nasi yang dimasak dengan santan pula ialah nasi lemak.',
    ),
  },
  {
    q: L('What is the tallest animal in the world?', '世界上最高的动物是什么？', 'Apakah haiwan yang paling tinggi di dunia?'),
    a: L('Giraffe', '长颈鹿', 'Zirafah'),
    w: [L('Elephant', '大象', 'Gajah'), L('Camel', '骆驼', 'Unta'), L('Ostrich', '鸵鸟', 'Burung unta')],
    fact: L(
      "A giraffe's long neck has only 7 bones – the same number as in a human neck!",
      '长颈鹿的长脖子只有7块骨头——跟人类脖子的骨头数量一样！',
      'Leher zirafah yang panjang hanya mempunyai 7 tulang – sama seperti leher manusia!',
    ),
  },
  {
    q: L('Which animal carries its baby in a pouch?', '哪种动物把宝宝放在育儿袋里？', 'Haiwan manakah yang membawa anaknya di dalam kantung?'),
    a: L('Kangaroo', '袋鼠', 'Kanggaru'),
    w: [L('Monkey', '猴子', 'Monyet'), L('Bear', '熊', 'Beruang'), L('Elephant', '大象', 'Gajah')],
    fact: L(
      "A baby kangaroo is called a 'joey'. Kangaroos live in Australia.",
      '袋鼠宝宝叫做“joey”。袋鼠生活在澳大利亚。',
      "Anak kanggaru dipanggil 'joey'. Kanggaru tinggal di Australia.",
    ),
  },
  {
    q: L("What does the name 'Singapura' mean?", '“Singapura”这个名字是什么意思？', "Apakah maksud nama 'Singapura'?"),
    a: L('Lion City', '狮城', 'Kota Singa'),
    w: [L('Sea Town', '海城', 'Kota Laut'), L('Garden City', '花园城市', 'Bandar Taman'), L('Island of Gold', '黄金岛', 'Pulau Emas')],
    fact: L(
      "Legend says Prince Sang Nila Utama saw an animal he believed was a lion, and named the island 'Singapura' – 'Lion City'.",
      '传说桑尼拉乌他马王子看到一只他以为是狮子的动物，于是把这个岛取名为“Singapura”——狮城。',
      "Menurut legenda, Sang Nila Utama ternampak seekor binatang yang disangkanya singa, lalu menamakan pulau ini 'Singapura' – Kota Singa.",
    ),
  },
  {
    q: L('Which food is eaten during the Mid-Autumn Festival?', '中秋节吃什么？', 'Makanan apakah yang dimakan semasa Pesta Pertengahan Musim Luruh?'),
    a: L('Mooncakes', '月饼', 'Kuih bulan'),
    w: [L('Rice dumplings', '粽子', 'Bakcang'), L('Ketupat', '马来粽（Ketupat）', 'Ketupat'), L('Pineapple tarts', '凤梨挞', 'Tat nanas')],
    fact: L(
      'Children also carry colourful lanterns. Rice dumplings are eaten at the Dragon Boat Festival instead.',
      '小朋友还会提着五颜六色的灯笼。粽子则是在端午节吃的。',
      'Kanak-kanak juga membawa tanglung yang berwarna-warni. Bakcang pula dimakan semasa Pesta Perahu Naga.',
    ),
  },
  {
    q: L('The famous Pyramids of Giza are in which country?', '著名的吉萨金字塔在哪个国家？', 'Piramid Giza yang terkenal terletak di negara mana?'),
    a: L('Egypt', '埃及', 'Mesir'),
    w: [L('Mexico', '墨西哥', 'Mexico'), L('Greece', '希腊', 'Yunani'), L('India', '印度', 'India')],
    fact: L(
      'The Great Pyramid was built about 4,500 years ago, and it was the tallest building in the world for thousands of years.',
      '大金字塔大约建于4500年前，在几千年里一直是世界上最高的建筑。',
      'Piramid Besar dibina kira-kira 4,500 tahun dahulu, dan ia merupakan bangunan tertinggi di dunia selama beribu-ribu tahun.',
    ),
  },
  {
    q: L('What colour do you get when you mix blue and yellow?', '蓝色和黄色混在一起会变成什么颜色？', 'Apakah warna yang terhasil apabila biru dan kuning dicampurkan?'),
    a: L('Green', '绿色', 'Hijau'),
    w: [L('Purple', '紫色', 'Ungu'), L('Orange', '橙色', 'Jingga'), L('Pink', '粉红色', 'Merah jambu')],
    fact: L(
      'Mixing red and yellow makes orange, and mixing red and blue makes purple.',
      '红色加黄色变成橙色，红色加蓝色变成紫色。',
      'Merah dan kuning menjadi jingga, manakala merah dan biru menjadi ungu.',
    ),
  },
  {
    q: L('Kaya, the sweet spread on kaya toast, is made mainly from…?', '咖椰（Kaya）主要是用什么做的？', 'Kaya, sapuan manis pada roti bakar, dibuat terutamanya daripada…?'),
    a: L('Coconut milk, eggs and sugar', '椰浆、鸡蛋和糖', 'Santan, telur dan gula'),
    w: [L('Peanuts', '花生', 'Kacang tanah'), L('Durian', '榴梿', 'Durian'), L('Red beans', '红豆', 'Kacang merah')],
    fact: L(
      "'Kaya' means 'rich' in Malay. Pandan leaves are often added, giving kaya a green colour.",
      '“Kaya”在马来语中是“丰富”的意思。人们常加入香兰叶，让咖椰变成绿色。',
      'Daun pandan sering ditambah, menjadikan kaya berwarna hijau. Roti kaya selalunya dimakan bersama telur separuh masak dan kopi.',
    ),
  },
  {
    q: L('Who was the first person to walk on the Moon?', '第一个在月球上行走的人是谁？', 'Siapakah orang pertama yang berjalan di Bulan?'),
    a: L('Neil Armstrong', '尼尔·阿姆斯特朗', 'Neil Armstrong'),
    w: [L('Yuri Gagarin', '尤里·加加林', 'Yuri Gagarin'), L('Albert Einstein', '爱因斯坦', 'Albert Einstein'), L('Isaac Newton', '牛顿', 'Isaac Newton')],
    fact: L(
      'Neil Armstrong walked on the Moon in July 1969. Yuri Gagarin was the first person to go to space, in 1961.',
      '阿姆斯特朗于1969年7月登上月球。加加林则是在1961年第一个进入太空的人。',
      'Neil Armstrong berjalan di Bulan pada Julai 1969. Yuri Gagarin pula ialah orang pertama ke angkasa lepas pada tahun 1961.',
    ),
  },
  {
    q: L('Which of these do bees make?', '蜜蜂会制造以下哪一样东西？', 'Antara berikut, yang manakah dihasilkan oleh lebah?'),
    a: L('Honey', '蜂蜜', 'Madu'),
    w: [L('Milk', '牛奶', 'Susu'), L('Silk', '丝绸', 'Sutera'), L('Butter', '牛油', 'Mentega')],
    fact: L(
      'One worker bee makes only about 1/12 of a teaspoon of honey in its whole life.',
      '一只工蜂一生只能酿造大约十二分之一茶匙的蜂蜜。',
      'Seekor lebah pekerja hanya menghasilkan kira-kira 1/12 sudu teh madu sepanjang hayatnya.',
    ),
  },
  {
    q: L('How many official languages does Singapore have?', '新加坡有几种官方语言？', 'Berapakah bilangan bahasa rasmi di Singapura?'),
    a: '4',
    w: ['2', '3', '5'],
    fact: L(
      'English, Mandarin, Malay and Tamil. Malay is the national language, which is why the national anthem is sung in Malay.',
      '英语、华语、马来语和淡米尔语。马来语是国语，所以国歌是用马来语唱的。',
      'Bahasa Inggeris, Mandarin, Melayu dan Tamil. Bahasa Melayu ialah bahasa kebangsaan, sebab itulah lagu kebangsaan dinyanyikan dalam bahasa Melayu.',
    ),
  },
  {
    q: L('A caterpillar grows up to become a…?', '毛毛虫长大后会变成什么？', 'Ulat beluncas akan membesar menjadi…?'),
    a: L('Butterfly', '蝴蝶', 'Rama-rama'),
    w: [L('Bee', '蜜蜂', 'Lebah'), L('Bird', '小鸟', 'Burung'), L('Frog', '青蛙', 'Katak')],
    fact: L(
      'Butterflies taste their food using their feet!',
      '蝴蝶是用脚来品尝食物的味道的！',
      'Rama-rama merasa makanan menggunakan kakinya!',
    ),
  },
  {
    q: L('At what temperature does water boil?', '水在多少度会沸腾？', 'Pada suhu berapakah air mendidih?'),
    a: '100°C',
    w: ['50°C', '80°C', '200°C'],
    fact: L('Water freezes into ice at 0°C.', '水在0°C会结成冰。', 'Air membeku menjadi ais pada suhu 0°C.'),
  },
  {
    q: L(
      'Which fragrant leaf gives many local kueh and cakes their green colour?',
      '哪一种香叶让很多糕点变成绿色？',
      'Daun wangi manakah yang memberikan warna hijau kepada banyak kuih dan kek?',
    ),
    a: L('Pandan leaf', '香兰叶（班兰叶）', 'Daun pandan'),
    w: [L('Banana leaf', '香蕉叶', 'Daun pisang'), L('Curry leaf', '咖喱叶', 'Daun kari'), L('Mint leaf', '薄荷叶', 'Daun pudina')],
    fact: L(
      "Pandan is sometimes called the 'vanilla of Asia'. Pandan chiffon cake is a favourite souvenir from Singapore.",
      '香兰叶有时被称为“亚洲的香草”。香兰戚风蛋糕是很受欢迎的新加坡伴手礼。',
      "Pandan kadangkala digelar 'vanila Asia'. Kek chiffon pandan ialah cenderamata kegemaran dari Singapura.",
    ),
  },
  {
    q: L('How many animals are there in the Chinese zodiac?', '生肖一共有几种动物？', 'Berapakah bilangan haiwan dalam zodiak Cina?'),
    a: '12',
    w: ['9', '10', '15'],
    fact: L(
      '2026 is the Year of the Horse. Next year, 2027, will be the Year of the Goat.',
      '2026年是马年，2027年是羊年。',
      'Tahun 2026 ialah Tahun Kuda, dan tahun 2027 ialah Tahun Kambing.',
    ),
  },
  {
    q: L('Which animal comes FIRST in the Chinese zodiac?', '生肖排名第一的是哪种动物？', 'Haiwan manakah yang PERTAMA dalam zodiak Cina?'),
    a: L('Rat', '鼠', 'Tikus'),
    w: [L('Ox', '牛', 'Lembu'), L('Dragon', '龙', 'Naga'), L('Tiger', '虎', 'Harimau')],
    fact: L(
      "Legend says the clever rat rode on the ox's back during the Great Race, then jumped off to finish first!",
      '传说在比赛中，聪明的老鼠骑在牛背上，最后跳下来抢先到达终点！',
      'Menurut legenda, tikus yang bijak menumpang di belakang lembu semasa perlumbaan, lalu melompat turun untuk tiba di tempat pertama!',
    ),
  },
  {
    q: L('The Eiffel Tower is in which city?', '埃菲尔铁塔在哪个城市？', 'Menara Eiffel terletak di bandar mana?'),
    a: L('Paris', '巴黎', 'Paris'),
    w: [L('London', '伦敦', 'London'), L('Rome', '罗马', 'Rom'), L('New York', '纽约', 'New York')],
    fact: L(
      "The Eiffel Tower was built in 1889 for a World's Fair and was only meant to stand for 20 years!",
      '埃菲尔铁塔建于1889年，原本只打算保留20年！',
      'Menara Eiffel dibina pada tahun 1889 untuk sebuah pameran dunia dan pada asalnya hanya akan berdiri selama 20 tahun!',
    ),
  },
  {
    q: L("What is the name of Singapore's main international airport today?", '新加坡现在的主要国际机场叫什么名字？', 'Apakah nama lapangan terbang antarabangsa utama Singapura hari ini?'),
    a: L('Changi Airport', '樟宜机场', 'Lapangan Terbang Changi'),
    w: [
      L('Kallang Airport', '加冷机场', 'Lapangan Terbang Kallang'),
      L('Paya Lebar Airport', '巴耶利峇机场', 'Lapangan Terbang Paya Lebar'),
      L('Seletar Airport', '实里达机场', 'Lapangan Terbang Seletar'),
    ],
    fact: L(
      "Changi Airport opened in 1981. Before that, Singapore's main airports were at Kallang and then Paya Lebar.",
      '樟宜机场于1981年启用。在那之前，新加坡的主要机场先是加冷机场，后来是巴耶利峇机场。',
      'Lapangan Terbang Changi dibuka pada tahun 1981. Sebelum itu, lapangan terbang utama Singapura terletak di Kallang dan kemudian di Paya Lebar.',
    ),
  },
  {
    q: L('What are baby frogs called?', '青蛙的宝宝叫什么？', 'Apakah nama anak katak?'),
    a: L('Tadpoles', '蝌蚪', 'Berudu'),
    w: [L('Kittens', '小猫', 'Anak kucing'), L('Chicks', '小鸡', 'Anak ayam'), L('Ducklings', '小鸭', 'Anak itik')],
    fact: L(
      'Tadpoles live in water and have tails. As they grow, they grow legs and lose their tails.',
      '蝌蚪住在水里，有尾巴。长大后会长出腿，尾巴也会消失。',
      'Berudu hidup di dalam air dan mempunyai ekor. Apabila membesar, ia akan tumbuh kaki dan ekornya hilang.',
    ),
  },
  {
    q: L('What is the largest organ of the human body?', '人体最大的器官是什么？', 'Apakah organ yang paling besar dalam badan manusia?'),
    a: L('Skin', '皮肤', 'Kulit'),
    w: [L('Heart', '心脏', 'Jantung'), L('Liver', '肝脏', 'Hati'), L('Brain', '大脑', 'Otak')],
    fact: L(
      'Our skin is always renewing itself – we grow a new outer layer of skin about once a month.',
      '我们的皮肤一直在更新，大约每个月就会长出新的表层皮肤。',
      'Kulit kita sentiasa diperbaharui – lapisan luar kulit yang baharu tumbuh kira-kira sebulan sekali.',
    ),
  },
  {
    q: L('Deepavali is also known as the Festival of…?', '屠妖节（Deepavali）又被称为什么节日？', 'Deepavali juga dikenali sebagai Pesta…?'),
    a: L('Lights', '灯光节', 'Cahaya'),
    w: [L('Lanterns', '灯笼节', 'Tanglung'), L('Flowers', '花节', 'Bunga'), L('Music', '音乐节', 'Muzik')],
    fact: L(
      'Families light small oil lamps to celebrate the victory of light over darkness, and decorate their homes with colourful kolam patterns.',
      '家家户户会点起小油灯，象征光明战胜黑暗，并用色彩缤纷的“kolam”图案装饰家门。',
      'Keluarga menyalakan pelita kecil untuk meraikan kemenangan cahaya atas kegelapan, dan menghias rumah dengan corak kolam yang berwarna-warni.',
    ),
  },
  {
    q: L('Which is the largest ocean in the world?', '世界上最大的海洋是哪一个？', 'Lautan manakah yang paling besar di dunia?'),
    a: L('Pacific Ocean', '太平洋', 'Lautan Pasifik'),
    w: [L('Atlantic Ocean', '大西洋', 'Lautan Atlantik'), L('Indian Ocean', '印度洋', 'Lautan Hindi'), L('Arctic Ocean', '北冰洋', 'Lautan Artik')],
    fact: L(
      'The Pacific Ocean is so big that all the land on Earth could fit inside it!',
      '太平洋非常大，地球上所有的陆地加起来都可以放进去！',
      'Lautan Pasifik sangat besar sehingga semua daratan di Bumi boleh muat di dalamnya!',
    ),
  },
  {
    q: L("What is the name of Singapore's national anthem?", '新加坡的国歌叫什么？', 'Apakah nama lagu kebangsaan Singapura?'),
    a: 'Majulah Singapura',
    w: ['Count On Me, Singapore', 'Home', 'Stand Up for Singapore'],
    fact: L(
      "'Majulah Singapura' means 'Onward Singapore'. It was written by Zubir Said in 1958.",
      '“Majulah Singapura”的意思是“前进吧，新加坡”，由Zubir Said于1958年创作。',
      "'Majulah Singapura' dicipta oleh Zubir Said pada tahun 1958.",
    ),
  },
  {
    q: L("Which animal is called the 'King of the Jungle'?", '哪种动物被称为“百兽之王”？', "Haiwan manakah yang digelar 'Raja Rimba'?"),
    a: L('Lion', '狮子', 'Singa'),
    w: [L('Elephant', '大象', 'Gajah'), L('Monkey', '猴子', 'Monyet'), L('Crocodile', '鳄鱼', 'Buaya')],
    fact: L(
      "Lions actually live in grasslands, not jungles! A lion's roar can be heard up to 8 km away.",
      '其实狮子住在草原上，而不是森林里！狮子的吼声在8公里外也能听到。',
      'Sebenarnya singa tinggal di padang rumput, bukan di hutan! Ngauman singa boleh didengar sejauh 8 km.',
    ),
  },
  {
    q: L('How many teeth does an adult usually have?', '成年人通常有多少颗牙齿？', 'Berapakah bilangan gigi orang dewasa biasanya?'),
    a: '32',
    w: ['20', '40', '52'],
    fact: L(
      "That includes the 4 wisdom teeth. Children have 20 'baby teeth', which fall out to make room for adult teeth.",
      '这包括4颗智齿。小孩子有20颗乳牙，乳牙脱落后才长出恒牙。',
      'Ini termasuk 4 batang gigi bongsu. Kanak-kanak mempunyai 20 batang gigi susu yang akan tanggal untuk memberi ruang kepada gigi kekal.',
    ),
  },
  {
    q: L('Kimchi, the spicy pickled cabbage, comes from which country?', '辛辣的泡菜（Kimchi）来自哪个国家？', 'Kimchi, kubis jeruk pedas, berasal dari negara mana?'),
    a: L('Korea', '韩国', 'Korea'),
    w: [L('Japan', '日本', 'Jepun'), L('Thailand', '泰国', 'Thailand'), L('India', '印度', 'India')],
    fact: L(
      'Koreans eat kimchi with almost every meal, and there are many kinds – made with cabbage, radish, cucumber and more.',
      '韩国人几乎每餐都吃泡菜，泡菜种类很多，可以用白菜、萝卜、黄瓜等来做。',
      'Orang Korea makan kimchi hampir setiap kali makan, dan ada banyak jenis – dibuat daripada kubis, lobak, timun dan lain-lain.',
    ),
  },
  {
    q: L(
      'During Hari Raya, many families eat ketupat. What is ketupat?',
      '开斋节（Hari Raya）期间，很多家庭会吃“Ketupat”。Ketupat是什么？',
      'Semasa Hari Raya, banyak keluarga makan ketupat. Apakah ketupat?',
    ),
    a: L('Rice cooked in a woven coconut-leaf pouch', '用椰叶编成的小袋包着煮熟的米饭', 'Nasi yang dimasak dalam sarung anyaman daun kelapa'),
    w: [L('Fried noodles', '炒面', 'Mi goreng'), L('A sweet cake', '甜蛋糕', 'Kek manis'), L('A kind of soup', '一种汤', 'Sejenis sup')],
    fact: L(
      'Hari Raya Puasa marks the end of Ramadan, the fasting month. Ketupat is often eaten with rendang or sayur lodeh.',
      '开斋节标志着斋戒月（Ramadan）的结束。Ketupat常常配仁当（Rendang）或杂菜椰浆（Sayur Lodeh）一起吃。',
      'Hari Raya Puasa menandakan berakhirnya bulan Ramadan. Ketupat selalunya dimakan bersama rendang atau sayur lodeh.',
    ),
  },
  {
    q: L("In which month is Singapore's National Day?", '新加坡国庆日在几月？', 'Hari Kebangsaan Singapura disambut pada bulan apa?'),
    a: L('August', '八月', 'Ogos'),
    w: [L('July', '七月', 'Julai'), L('September', '九月', 'September'), L('June', '六月', 'Jun')],
    fact: L('Singapore became independent on 9 August 1965.', '新加坡于1965年8月9日独立。', 'Singapura mencapai kemerdekaan pada 9 Ogos 1965.'),
  },
  {
    q: L(
      'How many players does each football (soccer) team have on the field?',
      '足球比赛中，每队在场上有几名球员？',
      'Berapakah bilangan pemain bagi setiap pasukan bola sepak di padang?',
    ),
    a: '11',
    w: ['7', '9', '15'],
    fact: L(
      'That includes the goalkeeper – the only player allowed to touch the ball with their hands.',
      '这包括守门员——唯一可以用手碰球的球员。',
      'Ini termasuk penjaga gol – satu-satunya pemain yang boleh menyentuh bola dengan tangan.',
    ),
  },
  {
    q: L('Mount Fuji is in which country?', '富士山在哪个国家？', 'Gunung Fuji terletak di negara mana?'),
    a: L('Japan', '日本', 'Jepun'),
    w: [L('China', '中国', 'China'), L('Korea', '韩国', 'Korea'), L('Nepal', '尼泊尔', 'Nepal')],
    fact: L(
      "Mount Fuji is Japan's highest mountain at 3,776 metres. It is actually a volcano – it last erupted in 1707.",
      '富士山高3776米，是日本最高的山。它其实是一座火山，上一次喷发是在1707年。',
      'Gunung Fuji ialah gunung tertinggi di Jepun, setinggi 3,776 meter. Ia sebenarnya gunung berapi – kali terakhir meletus pada tahun 1707.',
    ),
  },
  {
    q: L(
      "Which Singapore building is nicknamed 'the Durian' because of its spiky roof?",
      '新加坡哪一座建筑因为尖尖的屋顶而被称为“榴梿”？',
      "Bangunan Singapura manakah yang digelar 'Durian' kerana bumbungnya yang berduri?",
    ),
    a: L('Esplanade', '滨海艺术中心', 'Esplanade'),
    w: [L('Marina Bay Sands', '滨海湾金沙', 'Marina Bay Sands'), L('Raffles Hotel', '莱佛士酒店', 'Hotel Raffles'), L('Fullerton Hotel', '富丽敦酒店', 'Hotel Fullerton')],
    fact: L(
      'The Esplanade – Theatres on the Bay opened in 2002. The spikes are actually sunshades that help keep the building cool.',
      '滨海艺术中心于2002年开幕。那些“刺”其实是遮阳板，能让建筑保持凉爽。',
      "Esplanade – Theatres on the Bay dibuka pada tahun 2002. 'Duri-duri' itu sebenarnya pelindung matahari yang membantu menyejukkan bangunan.",
    ),
  },
  {
    q: L('How many rings are there on the Olympic flag?', '奥运会旗上有几个圆环？', 'Berapakah bilangan gelang pada bendera Olimpik?'),
    a: '5',
    w: ['3', '4', '6'],
    fact: L(
      'The five rings are blue, yellow, black, green and red, linked together to show the world coming together through sport.',
      '五个圆环分别是蓝、黄、黑、绿、红色，环环相扣，象征全世界通过体育团结在一起。',
      'Lima gelang itu berwarna biru, kuning, hitam, hijau dan merah, dan saling bertaut melambangkan dunia yang bersatu melalui sukan.',
    ),
  },
  {
    q: L('Which musical instrument has black and white keys?', '哪种乐器有黑色和白色的琴键？', 'Alat muzik manakah yang mempunyai kekunci hitam dan putih?'),
    a: L('Piano', '钢琴', 'Piano'),
    w: [L('Guitar', '吉他', 'Gitar'), L('Violin', '小提琴', 'Biola'), L('Drum', '鼓', 'Dram')],
    fact: L(
      'A standard piano has 88 keys – 52 white and 36 black.',
      '一般的钢琴有88个琴键——52个白键和36个黑键。',
      'Piano biasa mempunyai 88 kekunci – 52 putih dan 36 hitam.',
    ),
  },
  {
    q: L('Which is the largest continent in the world?', '世界上最大的洲是哪一个？', 'Benua manakah yang paling besar di dunia?'),
    a: L('Asia', '亚洲', 'Asia'),
    w: [L('Africa', '非洲', 'Afrika'), L('Europe', '欧洲', 'Eropah'), L('Australia', '澳洲', 'Australia')],
    fact: L(
      'About 6 out of every 10 people in the world live in Asia.',
      '全世界大约每10个人中就有6个住在亚洲。',
      'Kira-kira 6 daripada setiap 10 orang di dunia tinggal di Asia.',
    ),
  },
  {
    q: L(
      'Ang ku kueh is a soft, sweet kueh shaped like a tortoise shell. What colour is it usually?',
      '这种龟壳形状的传统糕点（Ang Ku Kueh）通常是什么颜色？',
      'Ang ku kueh ialah kuih lembut berbentuk tempurung kura-kura. Apakah warnanya yang biasa?',
    ),
    a: L('Red', '红色', 'Merah'),
    w: [L('Blue', '蓝色', 'Biru'), L('Black', '黑色', 'Hitam'), L('Purple', '紫色', 'Ungu')],
    fact: L(
      "'Ang ku' means 'red tortoise' in Hokkien. Red stands for good luck, and the tortoise stands for long life.",
      '“Ang Ku”在福建话里是“红龟”的意思。红色代表好运，乌龟则象征长寿。',
      "'Ang ku' bermaksud 'kura-kura merah' dalam bahasa Hokkien. Merah melambangkan tuah, dan kura-kura melambangkan umur panjang.",
    ),
  },
  {
    q: L('What is the closest star to the Earth?', '离地球最近的恒星是什么？', 'Apakah bintang yang paling dekat dengan Bumi?'),
    a: L('The Sun', '太阳', 'Matahari'),
    w: [L('The Moon', '月亮', 'Bulan'), L('The North Star', '北极星', 'Bintang Utara'), L('Mars', '火星', 'Marikh')],
    fact: L(
      "Sunlight takes about 8 minutes to reach Earth. The Moon is not a star – it shines because it reflects the Sun's light.",
      '阳光大约需要8分钟才能到达地球。月亮不是恒星，它发亮是因为反射了太阳光。',
      'Cahaya matahari mengambil masa kira-kira 8 minit untuk sampai ke Bumi. Bulan bukan bintang – ia bercahaya kerana memantulkan cahaya matahari.',
    ),
  },
  {
    q: L(
      'Trick question! How many months of the year have 28 days?',
      '脑筋急转弯！一年中有几个月有28天？',
      'Soalan helah! Berapa bulankah dalam setahun yang mempunyai 28 hari?',
    ),
    a: L('All 12', '全部12个月', 'Kesemua 12'),
    w: ['1', '2', '6'],
    fact: L(
      'Every month has at least 28 days! February is the only month with just 28 (or 29) days.',
      '每个月都至少有28天！只有二月只有28天（或29天）。',
      'Setiap bulan mempunyai sekurang-kurangnya 28 hari! Februari satu-satunya bulan yang hanya ada 28 (atau 29) hari.',
    ),
  },
];

// Small seeded PRNG so the shuffled A–D order is identical on every laptop.
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const QUESTIONS = RAW.map((item, i) => {
  const rng = mulberry32(2062 + i * 97);
  const options = [item.a, ...item.w];
  const order = [0, 1, 2, 3];
  for (let k = order.length - 1; k > 0; k--) {
    const j = Math.floor(rng() * (k + 1));
    [order[k], order[j]] = [order[j], order[k]];
  }
  return {
    q: item.q,
    options: order.map((o) => options[o]),
    answer: order.indexOf(0),
    fact: item.fact,
  };
});
