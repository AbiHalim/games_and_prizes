// Trivia questions in English (en), Simplified Chinese (zh) and Malay (ms).
// Mix: about 70% general knowledge, 30% Singapore / nostalgia (marked "SG" below).
// Each entry lists the correct answer first; options are shuffled with a fixed seed
// below so every laptop shows the same A–D order.
// Please have a native speaker check the Chinese and Malay text before the event.

const L = (en, zh, ms) => ({ en, zh, ms });

const RAW = [
  {
    q: L('Who painted the Mona Lisa?', '《蒙娜丽莎》是谁画的？', 'Siapakah yang melukis Mona Lisa?'),
    a: L('Leonardo da Vinci', '达·芬奇', 'Leonardo da Vinci'),
    w: [L('Michelangelo', '米开朗基罗', 'Michelangelo'), L('Pablo Picasso', '毕加索', 'Pablo Picasso'), L('Vincent van Gogh', '梵高', 'Vincent van Gogh')],
    fact: L(
      'The painting is smaller than most people expect – only about 77 cm by 53 cm. It hangs in the Louvre museum in Paris.',
      '这幅画比很多人想象的小，只有大约77厘米乘53厘米，收藏在巴黎的卢浮宫。',
      'Lukisan ini lebih kecil daripada yang disangka ramai – hanya kira-kira 77 cm kali 53 cm. Ia tergantung di Muzium Louvre, Paris.',
    ),
  },
  // SG
  {
    q: L(
      'At the kopitiam, what makes "kopi-C" different from a plain "kopi"?',
      '在咖啡店，“Kopi-C”和普通的“Kopi”有什么不同？',
      'Di kedai kopi, apakah beza "kopi-C" dengan "kopi" biasa?',
    ),
    a: L('It uses evaporated milk instead of condensed milk', '用淡奶代替炼奶', 'Menggunakan susu cair, bukan susu pekat'),
    w: [
      L('It has no sugar', '不加糖', 'Tanpa gula'),
      L('It is served with ice', '加冰', 'Dihidang dengan ais'),
      L('It is extra strong', '特别浓', 'Lebih pekat'),
    ],
    fact: L(
      'Many say the "C" comes from Carnation, a popular brand of evaporated milk. And "siew dai" means less sugar.',
      '很多人说“C”来自一个很受欢迎的淡奶品牌——Carnation。另外，“siew dai”（少甜）就是少糖。',
      'Ramai mengatakan "C" berasal daripada Carnation, jenama susu cair yang popular. "Siew dai" pula bermaksud kurang manis.',
    ),
  },
  {
    q: L('Which is the largest planet in our solar system?', '太阳系中最大的行星是哪一颗？', 'Planet manakah yang paling besar dalam sistem suria kita?'),
    a: L('Jupiter', '木星', 'Musytari'),
    w: [L('Saturn', '土星', 'Zuhal'), L('Earth', '地球', 'Bumi'), L('Neptune', '海王星', 'Neptun')],
    fact: L(
      'More than 1,300 Earths could fit inside Jupiter!',
      '木星里面可以装下1300多个地球！',
      'Lebih daripada 1,300 buah Bumi boleh muat di dalam Musytari!',
    ),
  },
  {
    q: L(
      'Which country gave the Statue of Liberty to the United States as a gift?',
      '自由女神像是哪个国家送给美国的礼物？',
      'Negara manakah yang menghadiahkan Patung Liberty kepada Amerika Syarikat?',
    ),
    a: L('France', '法国', 'Perancis'),
    w: [L('Britain', '英国', 'Britain'), L('Spain', '西班牙', 'Sepanyol'), L('Italy', '意大利', 'Itali')],
    fact: L(
      'The statue was finished in 1886. It is made of copper, which slowly turned green over the years.',
      '自由女神像于1886年落成，是用铜做的，日子久了就慢慢变成了绿色。',
      'Patung ini siap pada tahun 1886. Ia diperbuat daripada tembaga yang lama-kelamaan bertukar menjadi hijau.',
    ),
  },
  // SG
  {
    q: L('What was Sentosa island called before 1972?', '圣淘沙在1972年以前叫什么名字？', 'Apakah nama Pulau Sentosa sebelum tahun 1972?'),
    a: 'Pulau Blakang Mati',
    w: ['Pulau Ubin', 'Pulau Tekong', 'Pulau Brani'],
    fact: L(
      'The new name "Sentosa" means peace and tranquillity.',
      '新名字“Sentosa”的意思是“和平安宁”。',
      'Nama baharu "Sentosa" bermaksud aman dan damai.',
    ),
  },
  {
    q: L(
      'The Singapore Grand Prix made history as the first Formula 1 race ever held…?',
      '新加坡F1大奖赛创下了历史，是世界上第一场在什么情况下举行的F1赛车？',
      'Grand Prix Singapura mencipta sejarah sebagai perlumbaan Formula 1 pertama yang diadakan…?',
    ),
    a: L('At night', '在晚上', 'Pada waktu malam'),
    w: [L('In the rain', '在雨中', 'Dalam hujan'), L('On a beach', '在海滩上', 'Di tepi pantai'), L('Without any spectators', '没有观众', 'Tanpa penonton')],
    fact: L(
      'It was first held in 2008 on the streets around Marina Bay, with more than a thousand lights lighting up the track.',
      '它在2008年首次在滨海湾一带的街道上举行，赛道由一千多盏灯照亮。',
      'Ia mula diadakan pada tahun 2008 di jalan-jalan sekitar Marina Bay, dengan lebih seribu lampu menerangi litar.',
    ),
  },
  {
    q: L('How many hearts does an octopus have?', '章鱼有几颗心脏？', 'Berapakah bilangan jantung seekor sotong kurita?'),
    a: '3',
    w: ['1', '2', '8'],
    fact: L('An octopus also has blue blood!', '章鱼的血还是蓝色的呢！', 'Sotong kurita juga mempunyai darah berwarna biru!'),
  },
  // SG
  {
    q: L(
      'Before television was common, many homes listened to "Rediffusion". What was it?',
      '在电视还不普及的年代，很多家庭都听“丽的呼声”（Rediffusion）。它是什么？',
      'Sebelum televisyen menjadi biasa, banyak rumah mendengar "Rediffusion". Apakah itu?',
    ),
    a: L('A cable radio service', '有线广播电台', 'Perkhidmatan radio kabel'),
    w: [L('A newspaper', '报纸', 'Akhbar'), L('A cinema', '电影院', 'Pawagam'), L('A record shop', '唱片行', 'Kedai piring hitam')],
    fact: L(
      "Rediffusion started in Singapore in 1949. Storyteller Lee Dai Sor's Cantonese stories were a big favourite.",
      '丽的呼声于1949年在新加坡开播。讲古大师李大傻的粤语讲古节目非常受欢迎。',
      'Rediffusion bermula di Singapura pada tahun 1949. Cerita-cerita Kantonis oleh pencerita Lee Dai Sor amat digemari.',
    ),
  },
  {
    q: L('What is the capital city of Australia?', '澳大利亚的首都是哪个城市？', 'Apakah ibu negara Australia?'),
    a: L('Canberra', '堪培拉', 'Canberra'),
    w: [L('Sydney', '悉尼', 'Sydney'), L('Melbourne', '墨尔本', 'Melbourne'), L('Perth', '珀斯', 'Perth')],
    fact: L(
      'Sydney and Melbourne both wanted to be the capital, so Canberra was chosen as a compromise.',
      '因为悉尼和墨尔本都想当首都，最后折中选了堪培拉。',
      'Sydney dan Melbourne masing-masing mahu menjadi ibu negara, jadi Canberra dipilih sebagai jalan tengah.',
    ),
  },
  {
    q: L('Who wrote the play "Romeo and Juliet"?', '《罗密欧与朱丽叶》是谁写的？', 'Siapakah yang menulis drama "Romeo dan Juliet"?'),
    a: L('William Shakespeare', '莎士比亚', 'William Shakespeare'),
    w: [L('Charles Dickens', '狄更斯', 'Charles Dickens'), L('Jane Austen', '简·奥斯汀', 'Jane Austen'), L('Mark Twain', '马克·吐温', 'Mark Twain')],
    fact: L(
      'Shakespeare wrote it more than 400 years ago, in the 1590s.',
      '莎士比亚在400多年前（16世纪90年代）写了这部剧。',
      'Shakespeare menulisnya lebih 400 tahun dahulu, pada tahun 1590-an.',
    ),
  },
  // SG
  {
    q: L('"Teh halia" is tea made with…?', '“Teh halia”是加了什么的茶？', '"Teh halia" ialah teh yang dibuat dengan…?'),
    a: L('Ginger', '姜', 'Halia'),
    w: [L('Lime', '酸柑', 'Limau nipis'), L('Pandan', '香兰叶', 'Pandan'), L('Honey', '蜜糖', 'Madu')],
    fact: L(
      '"Halia" is the Malay word for ginger. Many people believe ginger tea is good for the stomach.',
      '“Halia”是马来语“姜”的意思。很多人相信姜茶能暖胃。',
      'Ramai percaya teh halia baik untuk perut dan memanaskan badan.',
    ),
  },
  {
    q: L('What is the hardest natural material on Earth?', '地球上最坚硬的天然物质是什么？', 'Apakah bahan semula jadi yang paling keras di Bumi?'),
    a: L('Diamond', '钻石', 'Berlian'),
    w: [L('Gold', '黄金', 'Emas'), L('Iron', '铁', 'Besi'), L('Granite', '花岗岩', 'Granit')],
    fact: L(
      'Diamonds are made of carbon – the same material as the "lead" in a pencil!',
      '钻石是由碳组成的——跟铅笔芯的材料一样！',
      'Berlian diperbuat daripada karbon – bahan yang sama dengan isi pensel!',
    ),
  },
  {
    q: L(
      'Which famous ship hit an iceberg and sank on its very first voyage – a story later made into a hit movie?',
      '哪一艘著名的船在首航时撞上冰山沉没，后来它的故事还被拍成了一部大热电影？',
      'Kapal terkenal manakah yang melanggar bongkah ais dan karam dalam pelayaran pertamanya – kisahnya kemudian dijadikan filem popular?',
    ),
    a: L('Titanic', '泰坦尼克号', 'Titanic'),
    w: [L('Queen Mary', '玛丽皇后号', 'Queen Mary'), L('Mayflower', '五月花号', 'Mayflower'), L('Bismarck', '俾斯麦号', 'Bismarck')],
    fact: L(
      'It sank in the North Atlantic Ocean in 1912. The 1997 movie starred Leonardo DiCaprio and Kate Winslet.',
      '它在1912年沉没于北大西洋。1997年的电影由莱昂纳多·迪卡普里奥和凯特·温斯莱特主演。',
      'Ia karam di Lautan Atlantik Utara pada tahun 1912. Filem pada tahun 1997 itu dibintangi Leonardo DiCaprio dan Kate Winslet.',
    ),
  },
  // SG
  {
    q: L('Great World, New World and Gay World were all…?', '大世界、新世界和快乐世界都是什么地方？', 'Great World, New World dan Gay World semuanya ialah…?'),
    a: L('Amusement parks', '游乐场', 'Taman hiburan'),
    w: [L('Department stores', '百货公司', 'Gedung beli-belah'), L('Cinemas', '电影院', 'Pawagam'), L('Hotels', '酒店', 'Hotel')],
    fact: L(
      'They had cabaret, Chinese opera, cinemas, rides and food stalls. City Square Mall now stands where New World used to be.',
      '那里有歌舞厅、戏曲、电影院、游乐设施和小吃摊。新世界的旧址现在是City Square购物中心。',
      'Di situ ada kabaret, opera Cina, pawagam, permainan dan gerai makanan. City Square Mall kini terletak di tapak New World.',
    ),
  },
  {
    q: L('About how many bones does an adult human have?', '成年人身上大约有多少块骨头？', 'Kira-kira berapakah bilangan tulang dalam badan orang dewasa?'),
    a: '206',
    w: ['106', '306', '506'],
    fact: L(
      'Babies are born with about 300 bones – some of them join together as we grow.',
      '婴儿出生时大约有300块骨头，长大时有些骨头会长在一起。',
      'Bayi dilahirkan dengan kira-kira 300 tulang – sebahagiannya bercantum apabila kita membesar.',
    ),
  },
  {
    q: L('Which country has the most people in the world today?', '现在世界上人口最多的国家是哪一个？', 'Negara manakah yang mempunyai penduduk paling ramai di dunia hari ini?'),
    a: L('India', '印度', 'India'),
    w: [L('China', '中国', 'China'), L('United States', '美国', 'Amerika Syarikat'), L('Indonesia', '印度尼西亚', 'Indonesia')],
    fact: L(
      'India overtook China in 2023. Each country has more than 1.4 billion people.',
      '印度在2023年超越了中国。两国人口都超过14亿。',
      'India mengatasi China pada tahun 2023. Setiap negara mempunyai lebih 1.4 bilion penduduk.',
    ),
  },
  // SG
  {
    q: L(
      'Haw Par Villa was built by the brothers who made which famous product?',
      '虎豹别墅是由哪种著名产品的创办兄弟建造的？',
      'Haw Par Villa dibina oleh adik-beradik yang menghasilkan produk terkenal manakah?',
    ),
    a: L('Tiger Balm', '虎标万金油', 'Tiger Balm'),
    w: [
      L('Khong Guan biscuits', '康元饼干', 'Biskut Khong Guan'),
      L('White Rabbit sweets', '大白兔奶糖', 'Gula-gula White Rabbit'),
      L("Yeo's drinks", '杨协成饮料', "Minuman Yeo's"),
    ],
    fact: L(
      'The name comes from the brothers Aw Boon Haw and Aw Boon Par, who built it in 1937.',
      '名字来自胡文虎和胡文豹两兄弟，他们在1937年建造了它。',
      'Namanya diambil daripada adik-beradik Aw Boon Haw dan Aw Boon Par, yang membinanya pada tahun 1937.',
    ),
  },
  {
    q: L('Who is credited with inventing the telephone?', '电话是谁发明的？', 'Siapakah yang dikenali sebagai pencipta telefon?'),
    a: L('Alexander Graham Bell', '贝尔', 'Alexander Graham Bell'),
    w: [L('Thomas Edison', '爱迪生', 'Thomas Edison'), L('Henry Ford', '福特', 'Henry Ford'), L('Isaac Newton', '牛顿', 'Isaac Newton')],
    fact: L('Bell received the patent for the telephone in 1876.', '贝尔在1876年获得电话的专利。', 'Bell menerima paten untuk telefon pada tahun 1876.'),
  },
  {
    q: L(
      'The Sahara, the largest hot desert in the world, is on which continent?',
      '世界上最大的热沙漠——撒哈拉沙漠位于哪个洲？',
      'Sahara, gurun panas terbesar di dunia, terletak di benua manakah?',
    ),
    a: L('Africa', '非洲', 'Afrika'),
    w: [L('Asia', '亚洲', 'Asia'), L('Australia', '澳洲', 'Australia'), L('South America', '南美洲', 'Amerika Selatan')],
    fact: L(
      'The Sahara is almost as big as the whole of China!',
      '撒哈拉沙漠几乎和整个中国一样大！',
      'Gurun Sahara hampir sama besar dengan seluruh negara China!',
    ),
  },
  // SG
  {
    q: L(
      'The old "Thieves\' Market" at Sungei Road was famous for selling…?',
      '结霜桥（Sungei Road）的“贼仔市”以卖什么闻名？',
      'Pasar "Thieves\' Market" di Sungei Road terkenal kerana menjual…?',
    ),
    a: L('Second-hand goods', '二手旧货', 'Barangan terpakai'),
    w: [L('Fresh seafood', '新鲜海鲜', 'Makanan laut segar'), L('Wedding gowns', '婚纱', 'Gaun pengantin'), L('Pets', '宠物', 'Haiwan peliharaan')],
    fact: L(
      'This flea market ran for decades, until it closed in 2017.',
      '这个跳蚤市场经营了几十年，直到2017年才关闭。',
      'Pasar lambak ini beroperasi selama berdekad-dekad sehingga ditutup pada tahun 2017.',
    ),
  },
  {
    q: L(
      'Which vitamin does our body make when our skin gets sunlight?',
      '皮肤晒太阳时，身体会制造哪一种维生素？',
      'Vitamin manakah yang dihasilkan oleh badan apabila kulit terkena cahaya matahari?',
    ),
    a: L('Vitamin D', '维生素D', 'Vitamin D'),
    w: [L('Vitamin C', '维生素C', 'Vitamin C'), L('Vitamin A', '维生素A', 'Vitamin A'), L('Vitamin B12', '维生素B12', 'Vitamin B12')],
    fact: L(
      'Vitamin D helps our bones absorb calcium and stay strong.',
      '维生素D帮助骨骼吸收钙质，让骨骼更强壮。',
      'Vitamin D membantu tulang menyerap kalsium dan kekal kuat.',
    ),
  },
  {
    q: L('In which country did the Olympic Games begin?', '奥运会起源于哪个国家？', 'Di negara manakah Sukan Olimpik bermula?'),
    a: L('Greece', '希腊', 'Yunani'),
    w: [L('Italy', '意大利', 'Itali'), L('Egypt', '埃及', 'Mesir'), L('France', '法国', 'Perancis')],
    fact: L(
      'The ancient Olympics began more than 2,700 years ago. The first modern Olympics were held in Athens in 1896.',
      '古代奥运会始于2700多年前。第一届现代奥运会于1896年在雅典举行。',
      'Sukan Olimpik purba bermula lebih 2,700 tahun dahulu. Sukan Olimpik moden pertama diadakan di Athens pada tahun 1896.',
    ),
  },
  // SG
  {
    q: L(
      "In which year did Singapore's first MRT trains start running?",
      '新加坡第一列地铁（MRT）在哪一年开始行驶？',
      'Pada tahun berapakah tren MRT pertama Singapura mula beroperasi?',
    ),
    a: '1987',
    w: ['1977', '1981', '1995'],
    fact: L(
      'The first stretch ran from Yio Chu Kang to Toa Payoh, with just 5 stations.',
      '第一段路线从杨厝港到大巴窑，只有5个车站。',
      'Laluan pertama dari Yio Chu Kang ke Toa Payoh, dengan hanya 5 stesen.',
    ),
  },
  {
    q: L(
      'Which martial arts legend starred in the kung fu movie "Enter the Dragon"?',
      '哪位功夫巨星主演了电影《龙争虎斗》（Enter the Dragon）？',
      'Legenda seni mempertahankan diri manakah yang membintangi filem kung fu "Enter the Dragon"?',
    ),
    a: L('Bruce Lee', '李小龙', 'Bruce Lee'),
    w: [L('Jackie Chan', '成龙', 'Jackie Chan'), L('Jet Li', '李连杰', 'Jet Li'), L('Chow Yun-fat', '周润发', 'Chow Yun-fat')],
    fact: L(
      'Bruce Lee was born in San Francisco in 1940 and grew up in Hong Kong. "Enter the Dragon" came out in 1973.',
      '李小龙1940年在旧金山出生，在香港长大。《龙争虎斗》于1973年上映。',
      'Bruce Lee dilahirkan di San Francisco pada tahun 1940 dan membesar di Hong Kong. "Enter the Dragon" ditayangkan pada tahun 1973.',
    ),
  },
  {
    q: L('What is the tallest mountain in the world?', '世界上最高的山是哪一座？', 'Apakah gunung yang paling tinggi di dunia?'),
    a: L('Mount Everest', '珠穆朗玛峰', 'Gunung Everest'),
    w: [L('K2', '乔戈里峰（K2）', 'K2'), L('Mount Kilimanjaro', '乞力马扎罗山', 'Gunung Kilimanjaro'), L('Mount Fuji', '富士山', 'Gunung Fuji')],
    fact: L(
      'Everest is about 8,849 metres tall and sits on the border of Nepal and China.',
      '珠穆朗玛峰高约8849米，位于尼泊尔和中国的边界上。',
      'Everest setinggi kira-kira 8,849 meter dan terletak di sempadan Nepal dan China.',
    ),
  },
  // SG
  {
    q: L(
      'Getai, the lively outdoor song shows, are mostly held during which festival?',
      '热闹的露天歌台大多在哪个节日期间举行？',
      'Getai, persembahan nyanyian di luar, kebanyakannya diadakan semasa perayaan apa?',
    ),
    a: L('Hungry Ghost Festival', '中元节（农历七月）', 'Pesta Hantu Lapar'),
    w: [L('Chinese New Year', '农历新年', 'Tahun Baru Cina'), L('Mid-Autumn Festival', '中秋节', 'Pesta Kuih Bulan'), L('Qing Ming', '清明节', 'Cheng Beng')],
    fact: L(
      'Getai are held in the seventh lunar month. By tradition, the front row of seats is left empty for the "spirit guests".',
      '歌台在农历七月举行。按照传统，第一排座位要留空给“好兄弟”。',
      'Getai diadakan pada bulan ketujuh kalendar lunar. Mengikut tradisi, barisan kerusi hadapan dibiarkan kosong untuk "tetamu ghaib".',
    ),
  },
  {
    q: L(
      'Which of these famous songs was sung by The Beatles?',
      '以下哪首著名歌曲是披头士乐队（The Beatles）唱的？',
      'Antara lagu terkenal berikut, yang manakah dinyanyikan oleh The Beatles?',
    ),
    a: '"Hey Jude"',
    w: ['"My Way"', '"Bohemian Rhapsody"', '"Hotel California"'],
    fact: L(
      'The Beatles – John, Paul, George and Ringo – came from Liverpool, England. "My Way" was a hit for Frank Sinatra.',
      '披头士乐队的四位成员约翰、保罗、乔治和林戈来自英国利物浦。《My Way》则是法兰克·辛纳屈的名曲。',
      'The Beatles – John, Paul, George dan Ringo – berasal dari Liverpool, England. "My Way" pula ialah lagu popular Frank Sinatra.',
    ),
  },
  {
    q: L(
      'Which famous scientist came up with the equation E = mc²?',
      '哪位著名科学家提出了E = mc²这个公式？',
      'Saintis terkenal manakah yang mencipta persamaan E = mc²?',
    ),
    a: L('Albert Einstein', '爱因斯坦', 'Albert Einstein'),
    w: [L('Isaac Newton', '牛顿', 'Isaac Newton'), L('Charles Darwin', '达尔文', 'Charles Darwin'), L('Galileo Galilei', '伽利略', 'Galileo Galilei')],
    fact: L(
      'Einstein won the Nobel Prize in 1921 – but for explaining how light behaves (the photoelectric effect), not for E = mc².',
      '爱因斯坦在1921年获得诺贝尔奖，但不是因为E = mc²，而是因为解释了光电效应。',
      'Einstein memenangi Hadiah Nobel pada tahun 1921 – tetapi kerana menerangkan kesan fotoelektrik, bukan kerana E = mc².',
    ),
  },
  // SG
  {
    q: L('P. Ramlee was famous as a…?', 'P. Ramlee以什么闻名？', 'P. Ramlee terkenal sebagai…?'),
    a: L('Malay film star and singer', '马来电影明星兼歌手', 'Bintang filem dan penyanyi Melayu'),
    w: [L('Footballer', '足球员', 'Pemain bola sepak'), L('Badminton champion', '羽毛球冠军', 'Juara badminton'), L('Politician', '政治人物', 'Ahli politik')],
    fact: L(
      "Many of his best-loved films were made in Singapore, at the Shaw Brothers' studio on Jalan Ampas.",
      '他许多最受欢迎的电影都是在新加坡惹兰安拔（Jalan Ampas）的邵氏片厂拍摄的。',
      'Banyak filem beliau yang paling diminati dibuat di Singapura, di studio Shaw Brothers di Jalan Ampas.',
    ),
  },
  {
    q: L(
      'Which gas do plants take in from the air to make their food?',
      '植物从空气中吸收哪一种气体来制造养分？',
      'Gas apakah yang diambil oleh tumbuhan dari udara untuk membuat makanan?',
    ),
    a: L('Carbon dioxide', '二氧化碳', 'Karbon dioksida'),
    w: [L('Oxygen', '氧气', 'Oksigen'), L('Nitrogen', '氮气', 'Nitrogen'), L('Helium', '氦气', 'Helium')],
    fact: L(
      'In return, plants release the oxygen that we breathe.',
      '植物同时会释放出我们呼吸的氧气。',
      'Sebagai balasan, tumbuhan membebaskan oksigen yang kita sedut.',
    ),
  },
  {
    q: L('In which country is the Taj Mahal?', '泰姬陵在哪个国家？', 'Di negara manakah terletaknya Taj Mahal?'),
    a: L('India', '印度', 'India'),
    w: [L('Pakistan', '巴基斯坦', 'Pakistan'), L('Iran', '伊朗', 'Iran'), L('Turkey', '土耳其', 'Turki')],
    fact: L(
      'Emperor Shah Jahan built it in memory of his beloved wife, Mumtaz Mahal. It took about 20 years to build.',
      '沙贾汗皇帝为纪念爱妻慕塔芝·玛哈而建，花了大约20年才建成。',
      'Maharaja Shah Jahan membinanya untuk mengenang isteri tercinta, Mumtaz Mahal. Ia mengambil masa kira-kira 20 tahun untuk dibina.',
    ),
  },
  // SG
  {
    q: L(
      'Which famous Singapore dish was first sold from a pushcart near the Kallang River in the 1950s, by Madam Cher Yam Tian?',
      '哪一道著名的新加坡菜，是Cher Yam Tian女士在1950年代于加冷河边的手推车上开始卖的？',
      'Hidangan terkenal Singapura manakah yang mula-mula dijual dari kereta sorong berhampiran Sungai Kallang pada tahun 1950-an oleh Puan Cher Yam Tian?',
    ),
    a: L('Chilli crab', '辣椒螃蟹', 'Ketam cili'),
    w: [L('Hainanese chicken rice', '海南鸡饭', 'Nasi ayam Hainan'), L('Laksa', '叻沙', 'Laksa'), L('Fish head curry', '咖喱鱼头', 'Kari kepala ikan')],
    fact: L(
      'Her chilli crab became so popular that she and her husband opened a restaurant, Palm Beach.',
      '她的辣椒螃蟹大受欢迎，后来她和丈夫开了一家餐馆——Palm Beach。',
      'Ketam cilinya menjadi begitu popular sehingga beliau dan suaminya membuka sebuah restoran bernama Palm Beach.',
    ),
  },
  {
    q: L('Which city is nicknamed "the Big Apple"?', '哪个城市被称为“大苹果”？', 'Bandar manakah yang digelar "Big Apple"?'),
    a: L('New York', '纽约', 'New York'),
    w: [L('London', '伦敦', 'London'), L('Los Angeles', '洛杉矶', 'Los Angeles'), L('Paris', '巴黎', 'Paris')],
    fact: L(
      'New York is the biggest city in the United States, with more than 8 million people.',
      '纽约是美国最大的城市，人口超过800万。',
      'New York ialah bandar terbesar di Amerika Syarikat, dengan lebih 8 juta penduduk.',
    ),
  },
  {
    q: L('Sushi rolls are usually wrapped in…?', '寿司卷通常用什么包起来？', 'Sushi gulung biasanya dibalut dengan…?'),
    a: L('Seaweed', '海苔', 'Rumpai laut'),
    w: [L('Lettuce', '生菜', 'Daun salad'), L('Rice paper', '米纸', 'Kertas beras'), L('Banana leaf', '香蕉叶', 'Daun pisang')],
    fact: L('The dried seaweed is called "nori" in Japanese.', '这种干海苔在日语里叫“nori”。', 'Rumpai laut kering ini dipanggil "nori" dalam bahasa Jepun.'),
  },
  // SG
  {
    q: L(
      "Singapore's first banknotes, from 1967, showed which flower?",
      '新加坡1967年发行的第一套钞票印的是什么花？',
      'Wang kertas pertama Singapura pada tahun 1967 memaparkan bunga apa?',
    ),
    a: L('Orchids', '胡姬花', 'Orkid'),
    w: [L('Hibiscus', '大红花', 'Bunga raya'), L('Lotus', '莲花', 'Teratai'), L('Frangipani', '鸡蛋花', 'Bunga kemboja')],
    fact: L(
      "Later series showed birds (1976) and ships (1984). Today's notes show President Yusof Ishak (since 1999).",
      '后来的系列分别印上了鸟类（1976年）和船只（1984年）。现在的钞票印的是尤索夫·伊萨总统（1999年起）。',
      'Siri seterusnya memaparkan burung (1976) dan kapal (1984). Wang kertas hari ini memaparkan Presiden Yusof Ishak (sejak 1999).',
    ),
  },
  {
    q: L(
      'How long is a normal football match, not counting extra time?',
      '一场正常的足球比赛（不算加时）有多长？',
      'Berapa lamakah satu perlawanan bola sepak biasa, tidak termasuk masa tambahan?',
    ),
    a: L('90 minutes', '90分钟', '90 minit'),
    w: [L('60 minutes', '60分钟', '60 minit'), L('80 minutes', '80分钟', '80 minit'), L('120 minutes', '120分钟', '120 minit')],
    fact: L('It is played in two halves of 45 minutes each.', '比赛分上下半场，各45分钟。', 'Ia dimainkan dalam dua separuh masa, setiap satu 45 minit.'),
  },
  {
    q: L(
      'Which of these is the only mammal that can truly fly?',
      '以下哪种动物是唯一真正会飞的哺乳动物？',
      'Antara berikut, yang manakah satu-satunya mamalia yang benar-benar boleh terbang?',
    ),
    a: L('Bat', '蝙蝠', 'Kelawar'),
    w: [L('Flying squirrel', '飞鼠', 'Tupai terbang'), L('Eagle', '老鹰', 'Helang'), L('Flying fish', '飞鱼', 'Ikan terbang')],
    fact: L(
      'Flying squirrels can only glide. Bats really fly by flapping their wings.',
      '飞鼠只能滑翔，蝙蝠才是真的会拍翅膀飞。',
      'Tupai terbang hanya boleh meluncur. Kelawar benar-benar terbang dengan mengepakkan sayapnya.',
    ),
  },
  // SG
  {
    q: L('In the game of chapteh, what do players kick?', '玩“Chapteh”时，玩家用脚踢的是什么？', 'Dalam permainan capteh, apakah yang disepak oleh pemain?'),
    a: L('A feathered shuttlecock', '插着羽毛的毽子', 'Bulu ayam bertapak getah'),
    w: [L('A rattan ball', '藤球', 'Bola rotan'), L('A rubber ball', '橡胶球', 'Bola getah'), L('A bean bag', '沙包', 'Pundi kacang')],
    fact: L(
      'Players try to keep it in the air for as long as possible, using only their feet.',
      '玩家只用脚，尽量让毽子在空中不掉下来。',
      'Pemain cuba memastikan ia terus di udara selama mungkin dengan hanya menggunakan kaki.',
    ),
  },
  {
    q: L('Which country invented paper?', '纸是哪个国家发明的？', 'Negara manakah yang mencipta kertas?'),
    a: L('China', '中国', 'China'),
    w: [L('Egypt', '埃及', 'Mesir'), L('Greece', '希腊', 'Yunani'), L('India', '印度', 'India')],
    fact: L(
      'Papermaking is credited to Cai Lun, a Chinese court official, around the year 105. Ancient Egyptians wrote on papyrus, made from reeds.',
      '造纸术一般归功于东汉的蔡伦（约公元105年）。古埃及人则在用芦苇做的纸莎草纸上写字。',
      'Pembuatan kertas dikaitkan dengan Cai Lun, seorang pegawai istana China, sekitar tahun 105. Orang Mesir purba menulis di atas papirus yang dibuat daripada sejenis rumput air.',
    ),
  },
  {
    q: L('What is the currency of Japan?', '日本的货币叫什么？', 'Apakah mata wang Jepun?'),
    a: L('Yen', '日元', 'Yen'),
    w: [L('Won', '韩元', 'Won'), L('Yuan', '人民币', 'Yuan'), L('Baht', '泰铢', 'Baht')],
    fact: L(
      'The won is used in South Korea, the yuan in China and the baht in Thailand.',
      '韩国用韩元，中国用人民币，泰国用泰铢。',
      'Won digunakan di Korea Selatan, yuan di China dan baht di Thailand.',
    ),
  },
  // SG
  {
    q: L(
      'The famous "Kallang Roar" was the sound of crowds cheering at…?',
      '著名的“加冷怒吼”（Kallang Roar）是在什么场合的观众欢呼声？',
      '"Kallang Roar" yang terkenal ialah sorakan penonton di…?',
    ),
    a: L('Malaysia Cup football matches', '马来西亚杯足球赛', 'Perlawanan bola sepak Piala Malaysia'),
    w: [
      L('National Day Parades', '国庆庆典', 'Perbarisan Hari Kebangsaan'),
      L('Dragon boat races', '龙舟赛', 'Perlumbaan perahu naga'),
      L('Horse races', '赛马', 'Lumba kuda'),
    ],
    fact: L(
      'Fans packed the old National Stadium at Kallang, which opened in 1973. Fandi Ahmad was one of the star players.',
      '球迷挤满了1973年启用的旧加冷国家体育场。冯迪·阿末（Fandi Ahmad）是当年的球星之一。',
      'Peminat memenuhi Stadium Nasional lama di Kallang yang dibuka pada tahun 1973. Fandi Ahmad ialah salah seorang pemain bintangnya.',
    ),
  },
  {
    q: L('Which country is shaped like a boot?', '哪个国家的形状像一只靴子？', 'Negara manakah yang berbentuk seperti but?'),
    a: L('Italy', '意大利', 'Itali'),
    w: [L('Spain', '西班牙', 'Sepanyol'), L('Greece', '希腊', 'Yunani'), L('Portugal', '葡萄牙', 'Portugal')],
    fact: L(
      'The "toe" of the boot points towards the island of Sicily.',
      '靴子的“脚尖”正对着西西里岛。',
      '"Hujung kaki" but itu menghala ke Pulau Sicily.',
    ),
  },
  {
    q: L(
      'Which Indian leader was famous for leading peaceful, non-violent protests?',
      '哪位印度领袖以领导和平、非暴力抗争而闻名？',
      'Pemimpin India manakah yang terkenal kerana memimpin bantahan secara aman tanpa keganasan?',
    ),
    a: L('Mahatma Gandhi', '甘地', 'Mahatma Gandhi'),
    w: [
      L('Jawaharlal Nehru', '尼赫鲁', 'Jawaharlal Nehru'),
      L('Rabindranath Tagore', '泰戈尔', 'Rabindranath Tagore'),
      L('Subhas Chandra Bose', '苏巴斯·钱德拉·鲍斯', 'Subhas Chandra Bose'),
    ],
    fact: L(
      'His birthday, 2 October, is now the International Day of Non-Violence.',
      '他的生日10月2日，现在是“国际非暴力日”。',
      'Hari lahirnya, 2 Oktober, kini ialah Hari Antarabangsa Tanpa Keganasan.',
    ),
  },
  // SG
  {
    q: L('What is Chingay?', '“Chingay”是什么？', 'Apakah itu Chingay?'),
    a: L('A colourful street parade', '色彩缤纷的街头游行', 'Perarakan jalanan yang berwarna-warni'),
    w: [L('A type of kueh', '一种糕点', 'Sejenis kuih'), L('A board game', '一种棋类游戏', 'Permainan papan'), L('A Chinese opera song', '一首戏曲', 'Lagu opera Cina')],
    fact: L(
      "Singapore's first Chingay parade was held in 1973 – partly to bring back the festive mood after firecrackers were banned in 1972.",
      '新加坡第一次妆艺大游行在1973年举行，部分原因是为了在1972年禁放鞭炮后，重新带回过年的热闹气氛。',
      'Perarakan Chingay pertama di Singapura diadakan pada tahun 1973 – sebahagiannya untuk mengembalikan suasana meriah selepas mercun diharamkan pada tahun 1972.',
    ),
  },
  {
    q: L('Which planet is closest to the Sun?', '哪颗行星离太阳最近？', 'Planet manakah yang paling dekat dengan Matahari?'),
    a: L('Mercury', '水星', 'Utarid'),
    w: [L('Venus', '金星', 'Zuhrah'), L('Mars', '火星', 'Marikh'), L('Earth', '地球', 'Bumi')],
    fact: L('A year on Mercury lasts only 88 Earth days.', '水星上的一年只有88个地球日。', 'Setahun di Utarid hanya 88 hari Bumi.'),
  },
  {
    q: L(
      "Roughly how much of an adult's body is made up of water?",
      '成年人的身体大约有多少是水？',
      'Kira-kira berapa banyakkah badan orang dewasa terdiri daripada air?',
    ),
    a: L('About 60%', '大约60%', 'Kira-kira 60%'),
    w: [L('About 10%', '大约10%', 'Kira-kira 10%'), L('About 30%', '大约30%', 'Kira-kira 30%'), L('About 90%', '大约90%', 'Kira-kira 90%')],
    fact: L(
      "That's why it is important to drink enough water every day, especially in hot weather!",
      '所以每天喝足够的水很重要，尤其是在炎热的天气！',
      'Sebab itulah penting untuk minum air secukupnya setiap hari, terutamanya dalam cuaca panas!',
    ),
  },
  {
    q: L(
      'Who was the first person to travel into space, in 1961?',
      '1961年，谁是第一个进入太空的人？',
      'Siapakah orang pertama yang mengembara ke angkasa lepas pada tahun 1961?',
    ),
    a: L('Yuri Gagarin', '尤里·加加林', 'Yuri Gagarin'),
    w: [L('Neil Armstrong', '尼尔·阿姆斯特朗', 'Neil Armstrong'), L('Buzz Aldrin', '巴兹·奥尔德林', 'Buzz Aldrin'), L('John Glenn', '约翰·格伦', 'John Glenn')],
    fact: L(
      'His trip around the Earth took just 108 minutes. Neil Armstrong walked on the Moon 8 years later, in 1969.',
      '他绕地球一圈只用了108分钟。8年后，阿姆斯特朗在1969年登上月球。',
      'Perjalanannya mengelilingi Bumi hanya mengambil masa 108 minit. Neil Armstrong berjalan di Bulan 8 tahun kemudian, pada tahun 1969.',
    ),
  },
  {
    q: L('"Big Ben" is a famous clock tower in which city?', '“大笨钟”是哪个城市的著名钟楼？', '"Big Ben" ialah menara jam terkenal di bandar manakah?'),
    a: L('London', '伦敦', 'London'),
    w: [L('Paris', '巴黎', 'Paris'), L('Rome', '罗马', 'Rom'), L('Sydney', '悉尼', 'Sydney')],
    fact: L(
      'Strictly speaking, "Big Ben" is the name of the giant bell inside – the tower was renamed Elizabeth Tower in 2012.',
      '严格来说，“大笨钟”是钟楼里大钟的名字，这座塔在2012年改名为“伊丽莎白塔”。',
      'Sebenarnya, "Big Ben" ialah nama loceng gergasi di dalamnya – menara itu dinamakan semula Menara Elizabeth pada tahun 2012.',
    ),
  },
  {
    q: L('Prunes are which fruit, dried?', '西梅干（Prune）是用哪种水果晒干做成的？', 'Prun ialah buah apa yang dikeringkan?'),
    a: L('Plums', '李子', 'Plum'),
    w: [L('Grapes', '葡萄', 'Anggur'), L('Dates', '枣子', 'Kurma'), L('Figs', '无花果', 'Buah tin')],
    fact: L('Dried grapes, on the other hand, are raisins.', '晒干的葡萄则是葡萄干（提子干）。', 'Anggur kering pula ialah kismis.'),
  },
  {
    q: L(
      'Which language has the most native speakers in the world?',
      '世界上以哪种语言为母语的人最多？',
      'Bahasa manakah yang mempunyai penutur asli paling ramai di dunia?',
    ),
    a: L('Mandarin Chinese', '华语（普通话）', 'Bahasa Mandarin'),
    w: [L('English', '英语', 'Bahasa Inggeris'), L('Spanish', '西班牙语', 'Bahasa Sepanyol'), L('Hindi', '印地语', 'Bahasa Hindi')],
    fact: L(
      'But if you also count everyone who has learned it as a second language, English is spoken by the most people.',
      '不过如果把学过这门语言的人也算进去，说英语的人最多。',
      'Namun jika dikira semua yang mempelajarinya sebagai bahasa kedua, bahasa Inggeris dituturkan oleh paling ramai orang.',
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
