import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const getLanguageFromUrl = () => {
	if (typeof window !== 'undefined') {
		const url = window.location.pathname;
		return url.startsWith('/en') ? 'en' : 'pl';
	}
	return 'pl';
};

i18next.use(initReactI18next).init({
	resources: {
		pl: {
			translation: {
				// film categories component
				'Popular films': 'Popularne filmy',
				'Lastly added films': 'Ostatnio dodane filmy',
				'Last added': 'Ostatnio dodane',
				'Popular action films': 'Popularne filmy akcji',
				'Popular comedies': 'Popularne komedie',
				'Popular horrors': 'Popularne horrory',
				'Popular polish films': 'Popularne polskie filmy',
				'Popular serials': 'Popularne seriale',
				// film titles
				'Snowy brotherhood': 'Śnieżne bractwo',
				Lift: 'Skok w przestworzach',
				'Aquaman and the Lost Kingdom': 'Aquaman i Zaginione Królestwo',
				'Role play': 'Zabójcza gra',
				'The Family Plan': 'Plan wycieczki',
				'Rebel Moon - Part One: A Child of Fire': 'Rebel Moon - część 1: Dziecko Ognia',
				Wish: 'Życzenie',
				'The Creeping': 'Dotyk zła',
				'Everyone lies': 'Każdy kłamie',
				'Spider web': 'Pajęczyna',
				'Departing Seniors': 'Zabójcza lekcja',
				'Trunk - Locked In': 'Bagażnik - uwięziona',
				'Hunters from the ruins': 'Myśliwi z ruin',
				Bastard: 'Bękart',
				Visions: 'Wizje',
				'Million days': 'Milion dni',
				'One more shot': 'Jeszcze jeden strzał',
				'The Hunger Games: The Ballad of Songbirds & Snakes': 'Igrzyska śmierci: Ballada ptaków i węży',
				'Fast X': 'Szybcy i wściekli 10',
				'Spider-Man: Across the Spider-Verse': 'Spider-Man: Poprzez multiwersum',
				'Spider-Man: No Way Home': 'Spider-Man: Bez drogi do domu',
				'Transformers: Rise of the Beasts': 'Transformers: Przebudzenie bestii',
				'Trolls Band Together': 'Trolle 3',
				'Puss in Boots: The Last Wish': 'Kot w butach: Ostatnie życzenie',
				Elemental: 'Między nami żywiołami',
				"Five Nights at Freddy's": 'Pięć koszmarnych nocy',
				Thanksgiving: 'Noc Dziękczynienia',
				'Meg 2: The Trench': 'Meg 2: Głębia',
				'Saw X': 'Piła X',
				'All Fun and Games': 'Raz, dwa, trzy... wchodzisz do gry!',
				'The Exorcist: Believer': 'Egzorcysta: Wyznawca',
				'The Nun II': 'Zakonnica II',
				"The Pope's Exorcist": 'Egzorcysta Papieża',
				'Evil Dead Rise': 'Martwe Zło: Przebudzenie',
				'Margaret I: Queen of the North': 'Małgorzata I: Królowa Północy',
				'Taming of the Shrew 2': 'Poskromienie złośnicy 2',
				Quack: 'Znachor',
				Peasants: 'Chłopi',
				'Web of suspicion': 'Sieć podejrzeń',
				Timetable: 'Plan lekcji',
				'Love squared': 'Miłość do kwadratu',
				Warning: 'Przestroga',
				'Citizen Jones': 'Obywatel Jones',
				'Rick and Morty': 'Rick i Morty',
				'Monarch: a legacy of monsters': 'Monarch: dziedzitwo potworów',
				Euphoria: 'Euforia',
				Invincible: 'Niezwyciężony',
				'Mayor of Kingstown': 'Burmistrz Kingstown',
				'BLUE EYE SAMURAI': 'Niebieskooki samuraj',
				'The Night Agent': 'Nocny agent',
				'The Equalizer': 'Agentka McCall',
				"NCIS: Hawai'i": 'Agenci NCIS: Hawaje',
				// heading component
				'October 13, 1972 Uruguayan Air Force Flight 571, chartered to take a rugby team to Chile, crashes into a glacier in the heart of the Andes Mountains.':
					'13 października 1972 r. lot 571 urugwajskich sił powietrznych, wyczarterowany w celu zabrania drużyny rugby do Chile, rozbija się o lodowiec w sercu Andów.',

				"The film Napoleon will tell the story of Napoleon Bonaparte's ruthless rise to power and his obsessive love for his wife, Empress Josephine.":
					'Film Napoleon opowie historię bezwzględnego dojścia Napoleona Bonaparte do władzy i jego obsesyjnej miłości do żony, cesarzowej Józefiny.',

				'An international team of thieves undertakes a mission to stop a terrorist attack. They must pull off a heist on a plane in flight.':
					'Międzynarodowa ekipa złodziei podejmuje się misji powstrzymania ataku terrorystycznego. Muszą dokonać skoku na samolot w trakcie lotu.',

				"Previously, Black Manta failed to defeat Aquaman. However, he still wants to avenge his father's death and so he will stop at nothing to deal with Aquaman once and for all. This time Black Manta is more powerful than before. He has possessed the power of the mythical Black Trident, which hides an ancient and sinister force. To defeat him, Aquaman unexpectedly asks for help from Orm, his imprisoned brother and the former king of Atlantis. The two must forget their differences to protect the kingdom and save Aquaman's family and the entire world from irreversible destruction.":
					'Poprzednio Czarna Manta nie zdołał pokonać Aquamana. Wciąż jednak pragnie pomścić śmierć ojca i dlatego nie cofnie się przed niczym, żeby rozprawić się z Aquamanem raz na zawsze. Tym razem Czarna Manta jest potężniejszy niż dotąd. Posiadł moc mitycznego Czarnego Trójzęba, który kryje w sobie starożytną i złowrogą siłę. Aby go pokonać, Aquaman nieoczekiwanie prosi o pomoc Orma, swojego uwięzionego brata i poprzedniego króla Atlantydy. Obaj muszą zapomnieć o różnicach, żeby ochronić królestwo oraz ocalić rodzinę Aquamana i cały świat przed nieodwracalnym zniszczeniem.',

				'While performing her duties, Carol Danvers - Captain Marvel - ends up with a Kree revolutionary. Her powers combine with those of superfan Kamala Khan - Ms. Marvel - and Carol\'s niece, now S.A.B.E.R astronaut Captain Monica Rambeau. Now this unaligned trio must give a real showdown and save the world together as "The Marvels."':
					'Skupiając się na młodym Willym Wonce i tym, jak spotkał Oompa-Loompas podczas jednej ze swoich najwcześniejszych przygód.',

				'Focusing on young Willy Wonka and how he met the Oompa-Loompas during one of his earliest adventures.':
					'Pełniąc swoje obowiązki, Carol Danvers – Kapitan Marvel – trafia do rewolucjonisty Kree. Jej moce łączą się z mocami superfanki Kamali Khan – Ms. Marvel – oraz z siostrzenicą Carol, obecnie astronautką S.A.B.E.R, kapitan Monicą Rambeau. Teraz to niezgrane trio musi dać prawdziwy popis i wspólnie uratować świat jako „The Marvels”.',

				'Emma and Dave plan to spice up their wedding anniversary with a spicy party with strangers in New York. However, the situation turns dangerous when Bob exposes the secret life of Emma, an international paid assassin unknown to Dave, putting her family at risk. Emma must rely on deadly skills and determination to protect her loved ones.':
					'Emma i Dave zamierzają urozmaicić rocznicę ślubu pikantną zabawą w nieznajomych w Nowym Jorku. Sytuacja staje się jednak niebezpieczna, kiedy Bob demaskuje nieznane Dave’owi sekretne życie Emmy, międzynarodowej płatnej zabójczyni, narażając tym samym jej rodzinę. Emma musi polegać na śmiercionośnych umiejętnościach i determinacji, aby ochronić bliskich.',

				'Oppenheimer was director of the "Manhattan" nuclear weapons development program during World War II. In addition to his work on atomic weapons, Oppenheimer had tremendous achievements in other areas of physics, including the study of black holes and cosmic radiation. He devoted the rest of his life after developing the atomic bomb to nuclear containment activities. He was accused by the U.S. government and services of ties to the communist movement and espionage activities. In the 1950s he was denied access to classified documents. It was not until President Kennedy that he was politically rehabilitated. Oppenheimer is today considered one of the symbols of pacifism and opposition to nuclear proliferation.':
					'Oppenheimer w czasie II Wojny Światowej był dyrektorem programu rozwoju broni jądrowej "Manhattan". Poza działalnością związaną z bronią atomową Oppenheimer miał ogromne osiągnięcia w innych dziedzinach fizyki, między innymi w badaniach czarnych dziur oraz promieniowania kosmicznego. Resztę życia po opracowaniu bomby atomowej poświęcił na działalność na rzecz ograniczania rozprzestrzeniania się broni jądrowej. Był oskarżany przez amerykański rząd i służby o powiązania z ruchem komunistycznym oraz działalność szpiegowską. W latach 50. został pozbawiony dostępu do tajnych dokumentów. Dopiero prezydent Kennedy dokonał jego politycznej rehabilitacji. Oppenheimer jest dziś uznawany za jeden z symboli pacyfizmu i sprzeciwu wobec rozprzestrzeniania broni atomowej.',
				'"Super Mario Bros. The Movie" is the latest animation from Illumination studio, which created the much-loved "Minions" and "Sing." The Minions have been loved by audiences of all ages around the world. They are among the most popular animated characters. Now Illumination studio has created an animation about a computer game character and is sure to give viewers a lot of great thrills. The production is based on the iconic 1980s computer game "Super Mario Bros." The game has many fans to this day and is one of the most popular ever.':
					'"Super Mario Bros. Film" to najnowsza animacja studia Illumination, które stworzyło uwielbiane przez wszystkich "Minionki" oraz "Sing". Minionki pokochali widzowie w każdym wieku na całym świecie. Są jednymi z najpopularniejszych animowanych postaci. Teraz studio Illumination stworzyło animację o bohaterze gry komputerowej i z pewnością dostarczą widzom wielu wspaniałych emocji. Produkcja jest oparta na kultowej grze komputerowej z lat osiemdziesiątych "Super Mario Bros". Gra ma wielu fanów do dziś i jest jedną najpopularniejszych w historii.',
				'Dan Morgan has many roles: he is a devoted husband, a loving father, a popular car salesman. He is also a former assassin. When his past makes itself known, he is forced to take his unsuspecting family on a once-in-a-lifetime trip.':
					'Dan Morgan ma wiele ról: jest oddanym mężem, kochającym ojcem, popularnym sprzedawcą samochodów. Jest też byłym zabójcą. Kiedy jego przeszłość daje o sobie znać, zostaje zmuszony zabrać niczego nie podejrzewającą rodzinę na jedyną w swoim rodzaju wycieczkę.',
				"When a peaceful colony on the edge of the galaxy faces an attack from a tyrant's army, the mysterious Kora becomes the residents' greatest hope for survival. Trying to enlist allies for an impossible mission, Kora gathers a small group of warriors - outsiders, insurgents, villagers and war orphans from different worlds - who share a common desire for revenge and redemption. When the shadow of a powerful kingdom falls on the most unlikely of moons, a battle erupts for the fate of the galaxy, in the fire of which a new army of heroes is forged.":
					'Kiedy pokojowa kolonia na krańcu galaktyki staje w obliczu ataku ze strony armii tyrana, tajemnicza Kora staje się największą nadzieją mieszkańców na przetrwanie. Próbując pozyskać sojuszników do niemożliwej misji, Kora gromadzi niewielką grupę wojowników – outsiderów, powstańców, wieśniaków i sierot wojennych z różnych światów – których łączy wspólne pragnienie zemsty i odkupienia. Gdy cień potężnego królestwa pada na najbardziej nieprawdopodobny z księżyców, wybucha bitwa o losy galaktyki, w której ogniu wykuwa się nowa armia bohaterów.',
				'17-year-old Asha and her goat Valentino navigate Rosas, the land of wishes, where wishes can literally come true.':
					'17-letnia Asha i jej koza Valentino poruszają się po Rosas, krainie życzeń, w której życzenia mogą się dosłownie spełnić.',
				'Zaid, after 7 years in prison, begins going undercover for the police in exchange for his release and a chance to see his 7-year-old son, with whom he was separated. He desperately tries to combine his life as an undercover source in a violent gang while building a relationship with his son, but eventually the two worlds collide. After being exposed, he must do everything in his power to protect his son.':
					'Zaid po 7 latach spędzonych w więzieniu zaczyna działać pod przykrywką dla policji w zamian za zwolnienie i możliwość zobaczenia się z 7-letnim synem, z którym był w separacji. Desperacko próbuje połączyć swoje życie tajnego źródła w brutalnym gangu, budując relacje z synem, ale ostatecznie oba światy się zderzają. Po zdemaskowaniu musi zrobić wszystko, co w jego mocy, aby chronić syna.',
				'"Darkland" is the story of a well-known doctor Zaida (played by Dar Salim), who loses his brother during a gang attack. The man decides to abandon his orderly life and avenge the family member. He puts on a black helmet and, as a masked warrior on a motorcycle, begins to dispense justice.':
					'"Darkland" to opowieść o znanym lekarzu Zaidzie (w tej roli Dar Salim), który w czasie napadu gangu traci brata. Mężczyzna postanawia porzucić swoje uporządkowane życie i pomścić członka rodziny. Przywdziewa czarny kask i jako zamaskowany wojownik na motorze zaczyna wymierzać sprawiedliwość.',
				"A young woman comes to her grandmother's house to care for her. Soon, however, she comes to fight a sinister force....":
					'Młoda kobieta przyjeżdża do domu swojej babci, by się nią opiekować. Wkrótce jednak przyjdzie jej walczyć ze złowrogą siłą...',
				'A young prosecutor persuades a former police officer to join a new group responsible for investigating "sensitive" cases.':
					'Młody prokurator nakłania byłego policjanta do przyłączenia się do nowej grupy odpowiedzialnej za prowadzenie dochodzeń w „delikatnych” sprawach.',
				'The 1970s, South Korea. Director Kim tries to change the ending of his latest film. Standing in the way are the censorship office, a reluctant producer and a confused cast.':
					'Lata 70., Korea Południowa. Reżyser Kim próbuje zmienić zakończenie swojego najnowszego filmu. Na przeszkodzie stają urząd cenzury, niechętny producent oraz zdezorientowana obsada.',
				'A boy who was bullied at school suffers an injury and is hospitalized. After the incident, he begins to have visions.':
					'Chłopak, nad którym znęcano się w szkole, doznaje urazu i trafia do szpitala. Po tym zdarzeniu zaczyna mieć wizje.',
				"The Eternals are a band of ancient aliens who have lived in secret on Earth for thousands of years. When an unexpected tragedy brings them out of the shadows, they are forced to reunite against humanity's oldest enemy, the Deviants.":
					'Eternals to zespół starożytnych kosmitów, którzy żyją w tajemnicy na Ziemi od tysięcy lat. Kiedy niespodziewana tragedia wyprowadza ich z cienia, są zmuszeni ponownie zjednoczyć się przeciwko najstarszemu wrogowi ludzkości, Deviantom.',
				'28-year-old medical student Malina wakes up in a locked trunk and realizes, to her horror, that she is missing more than just her memories of what happened. As only a phone connects her to the outside world, the young woman fights a desperate battle for survival while the vehicle speeds steadily toward the terrible secret.':
					'28-letnia studentka medycyny Malina budzi się w zamkniętym bagażniku i zdaje sobie sprawę, ku swemu przerażeniu, że brakuje jej nie tylko wspomnień tego, co się stało. Jako że tylko telefon łączy ją ze światem zewnętrznym, młoda kobieta prowadzi desperacką walkę o przeżycie, podczas gdy pojazd pędzi nieustannie ku strasznej tajemnicy.',
				'A deadly earthquake turns Seoul into a ruin devoid of all rights. In such a world, a brave hunter tries to rescue a teenage girl kidnapped by a mad doctor.':
					'Zabójcze trzęsienie ziemi obraca Seul w pozbawioną wszelkich praw ruinę. W takim świecie odważny myśliwy próbuje uratować nastolatkę porwaną przez szalonego doktora.',
				"It is a thrilling drama about the conquest of the Danish moors. It is a film about man's unconquerable nature, big dreams and even bigger sacrifices. About revenge, discipline, love and loss. It's a story about a proud and unconquerable man and the woman who becomes his ally in the fight against evil, death and damnation.":
					'Jest to porywający dramat o podboju duńskich wrzosowisk. To film o niepoddającej się człowiekowi naturze, wielkich marzeniach i jeszcze większym poświęceniu. O zemście, dyscyplinie, miłości i stracie. To historia o dumnym i niepoddającym się przeciwnościom mężczyźnie oraz o kobiecie, która zostaje jego sprzymierzeńcem w walce ze złem, śmiercią i potępieniem.',
				'Estelle, an airline pilot, leads a perfect life alongside her husband, Guillaume, a taken doctor. Their marriage is put to the test when Estelle accidentally meets Ana, her former love. As their romance intensifies, Estelle begins to experience mysterious visions. The line between reality and fantasy becomes increasingly blurred. The psychological thriller features a cast that includes Diane Kruger, Mathieu Kassovitz and Marta Nieto.':
					"Estelle, pilotka linii lotniczych, wiedzie perfekcyjne życie u boku swojego męża, Guillaume'a, wziętego lekarza. Ich małżeństwo zostaje poddane próbie, gdy Estelle przypadkowo spotyka Anę, swoją dawną miłość. W miarę jak ich romans nabiera intensywności, Estelle zaczyna doświadczać tajemniczych wizji. Granica między rzeczywistością a fantazją coraz bardziej się zaciera. Thriller psychologiczny, w którego obsadzie znaleźli się Diane Kruger, Mathieu Kassovitz oraz Marta Nieto.",
				"Overnight, the astronaut must decide whether to continue his life's work.":
					'W ciągu jednej nocy astronauta musi zdecydować, czy kontynuować dzieło swojego życia.',
				'Navy SEAL commando Jake Harris (Scott Adkins) is tasked with transporting a criminal from a secret prison in Poland. On the spot, he and his squad are ambushed and must use their battle-acquired skills to survive an attack aimed at recapturing suspected terrorist Amin Mansur. Meanwhile, a bomb is about to be detonated during a speech by the US president, and Mansur is the only one who may know its location. Having lost his entire squad, Harris must now protect the man at all costs. The film, which looks like it was shot in one take, also features Michael Jai White, Alexis Knapp and Tom Berenger.':
					'Komandos Navy SEAL Jake Harris (Scott Adkins) ma za zadanie przetransportować kryminalistę z tajnego więzienia w Polsce. Na miejscu wpada z oddziałem w zasadzkę i musi wykorzystać swoje nabyte w boju umiejętności, aby przeżyć atak, którego celem jest odbicie podejrzanego o terroryzm Amina Mansura. Tymczasem podczas wystąpienia prezydenta USA ma dojść do detonacji bomby, a Mansur jako jedyny może znać jej lokalizację. Straciwszy cały oddział, Harris musi teraz za wszelką cenę chronić mężczyznę. W filmie, który wygląda jak nakręcony jednym ujęciem, występują także Michael Jai White, Alexis Knapp oraz Tom Berenger.',
				'Every saga has a beginning, and every rebellion needs a first spark. This is the Tenth Hunger Games. In the Capitol, 18-year-old Coriolanus Snow intends to seize the chance to become a mentor and make a name for himself.':
					'Każda saga ma swój początek, a każdy bunt potrzebuje pierwszej iskry. Oto Dziesiąte Głodowe Igrzyska. W Kapitolu osiemnastoletni Coriolanus Snow zamierza skorzystać z szansy, jaką jest rola mentora i zdobyć sławę.',
				'Ever since Dom Toretto (Vin Diesel) began his foray into the world of illegal racing on the streets of Los Angeles, he and his family have had to overcome incredible odds to outwit and outperform every rival. When his team took out a vicious Brazilian mafioso, he had no idea that his son Dante (Jason Momoa) was watching from the sidelines. Now Dante becomes a new adversary, much more dangerous than the previous ones. He is eager for revenge and determined to destroy everything and everyone Dom loves.':
					'Od kiedy Dom Toretto (Vin Diesel) rozpoczął swoją przygodę w świecie nielegalnych wyścigów po ulicach Los Angeles, razem z rodziną musiał pokonać niebywałe trudności, aby przechytrzyć i prześcignąć każdego rywala. Gdy jego zespół wyprowadził w pole podłego brazylijskiego mafiosa, nie miał pojęcia, że z boku przygląda się temu jego syn Dante (Jason Momoa). Teraz Dante staje się nowym przeciwnikiem, o wiele groźniejszym niż dotychczasowi. Jest żądny zemsty i zdeterminowany, by zniszczyć wszystko i każdego, kogo kocha Dom.',
				'From Brooklyn, Miles finds himself in the multiverse. Along with Gwen Stacy, they meet other Spider-Men who are tasked with protecting the world from threats. As the heroes argue over how to deal with new dangers, Miles must redefine what it means to be a hero and how to save the people he loves.':
					'Z Brooklynu Miles trafia do multiwersum. Razem z Gwen Stacy, spotykają innych Spider-Man’ów, którzy mają za zadanie ochronę świata przed zagrożeniami. Kiedy bohaterowie spierają się o to, jak poradzić sobie z nowymi niebezpieczeństwami, Miles musi na nowo zdefiniować, co to znaczy być bohaterem i jak ocalić ludzi, których kocha.',
				"For the first time in Spider-Man's cinematic history, our friendly neighborhood hero is unmasked and no longer able to separate his normal life from the high stakes of being a superhero. When he asks Doctor Strange for help, the stakes become even more dangerous, forcing him to discover what it really means to be Spider-Man.":
					"Po raz pierwszy w kinowej historii Spider-Mana nasz przyjazny bohater z sąsiedztwa zostaje zdemaskowany i nie jest już w stanie oddzielić swojego normalnego życia od wysokiej stawki bycia superbohaterem. Kiedy prosi o pomoc Doktora Strange'a, stawka staje się jeszcze bardziej niebezpieczna, zmuszając go do odkrycia, co to naprawdę znaczy być Spider-Manem.",
				'OPTIMUS PRIME and the AUTOBOTS in a new adrenaline-filled adventure. With danger threatening the planet, the Transformers must join forces with the powerful Maximals faction to take part in the final battle to save Earth. With the fate of humanity at stake, Noah and Elena will do whatever they can to help in the final battle to save Earth in an exciting new chapter in the TRANSFORMERS saga':
					'OPTIMUS PRIME i AUTOBOTY w nowej, pełnej adrenaliny przygodzie. W obliczu grożącego planecie niebezpieczeństwa Transformersi muszą połączyć siły z potężną frakcją Maximali, aby wziąć udział w ostatecznej bitwie o ocalenie Ziemi. Gdy los ludzkości będzie zagrożony, Noah i Elena zrobią co tylko w ich mocy, by pomóc w ostatecznej walce o ocalenie Ziemi w nowym, ekscytującym rozdziale sagi z cyklu TRANSFORMERS',
				"Prices are going up, so also the stakes for the head of the legendary assassin John Wick have already pierced the ceiling. Facing the final duel that could give him the freedom he craves and a well-deserved retirement, John knows he can only count on himself. For him, this is nothing new. What's changed this time is that he has an entire international organization of top paid assassins against him, and its new boss Marquis de Gramond is as sophisticated as he is ruthless. Before John comes face to face with him, he will have to visit several continents measuring himself against a whole bunch of tough guys who know all about killing. Just before the grand finale of this murderous symphony, John Wick will hit the trail of his distant family, whose members may have a decisive influence on the outcome of the whole game.":
					'Ceny idą w górę, więc także stawka za głowę legendarnego zabójcy, Johna Wicka przebiła już sufit. Stając do ostatecznego pojedynku, który może dać mu upragnioną wolność i zasłużoną emeryturę, John wie, że może liczyć tylko na siebie. Dla niego, to nic nowego. To co zmieniło się tym razem, to fakt, że przeciwko sobie ma całą międzynarodową organizację najlepszych płatnych zabójców, a jej nowy szef Markiz de Gramond jest równie wyrafinowany, co bezlitosny. Zanim John stanie z nim oko w oko, będzie musiał odwiedzić kilka kontynentów mierząc się z całą plejadą twardzieli, którzy wiedzą wszystko o zabijaniu. Tuż przed wielkim finałem tej morderczej symfonii, John Wick trafi na trop swojej dalekiej rodziny, której członkowie mogą mieć decydujący wpływ na wynik całej rozgrywki.',
				"Barbieland is a fairytale land where every Barbie is incredibly successful, leading a fairytale life full of fun, glitter and beautiful creations! Inherent in every doll's daily life is joy and a candy-coated existence without worries. Everything changes when the stereotypical Barbie experiences her first sleepy nightmares, which gradually turn into an existential crisis....":
					'Barbieland to bajkowa kraina, w której każda Barbie odnosi niesamowite sukcesy, wiodąc bajkowe życie pełne zabawy, brokatu i pięknych kreacji! Nieodłącznym elementem codzienności każdej lalki jest radość i tocząca się dookoła niej egzystencja w cukierkowym świecie pozbawionym zmartwień. Wszystko zmienia się kiedy stereotypowa Barbie doświadcza pierwszych sennych koszmarów, które stopniowo przeradzają się w egzystencjalny kryzys…',
				"After two films of true friendship and flirting, Poppy and Raven are now officially a couple! Poppy discovers that Raven has a secret past. He was once part of the phenomenal boy band, BroZone, along with his four brothers Floyd, John Dory, Spruce and Clay. BroZone broke up, and Mruk hasn't seen his brothers since. Raven and Poppy embark on an emotional journey to reunite the brothers.":
					'Po dwóch filmach prawdziwej przyjaźni i flirtowania, Poppy i Mruk są teraz oficjalnie parą! Poppy odkrywa, że Mruk ma sekretną przeszłość. Był kiedyś częścią fenomenalnego boysbandu, BroZone, wraz ze swoimi czterema braćmi: Floydem, Johnem Dory, Sprucem i Clayem. BroZone rozpadł się, a Mruk od tamtej pory nie widział swoich braci. Mruk i Poppy wyruszają w pełną emocji podróż, aby zjednoczyć braci.',
				"An Oxford University student is drawn into the world of a charming and aristocratic classmate who invites him to his eccentric family's sprawling estate for a summer he will never forget.":
					'Student Uniwersytetu Oksfordzkiego zostaje wciągnięty w świat czarującego i arystokratycznego kolegi z klasy, który zaprasza go do rozległej posiadłości swojej ekscentrycznej rodziny na lato, którego nigdy nie zapomni.',
				'An animated musical comedy about growing up, telling the story of the last year of elementary school as seen through the eyes of the class pet. Actor and comedian Adam Sandler is completely in his element lending his voice to a 74-year-old lizard named Leo. This life-weary reptile has been in the same classroom for decades, sharing a terrarium with his turtle buddy (Bill Burr). When Leo learns that he only has a year left to live, he decides to escape to freedom, but instead gets caught up in the problems of nervous students and a certain impossibly mean educator. Thus, the list of things he should do before he dies turns out to be extremely bizarre, but how fascinating....':
					'Animowana komedia muzyczna o dorastaniu, opowiadająca o ostatnim roku szkoły podstawowej widzianym oczami klasowego zwierzaka. Aktor i komik Adam Sandler jest całkowicie w swoim żywiole użyczając głosu 74-letniej jaszczurce o imieniu Leo. Ten zmęczony życiem gad od dekad przebywa w tej samej sali lekcyjnej, dzieląc terrarium z żółwim kumplem (Bill Burr). Gdy Leo dowiaduje się, że został mu tylko rok życia, postanawia uciec na wolność, ale zamiast tego zostaje wplątany w problemy nerwowych uczniów i pewnego niemożebnie wrednego pedagoga. Tym samym lista rzeczy, które powinien zrobić przed śmiercią, okazuje się wyjątkowo dziwaczna, ale za to jakże fascynująca...',
				'The Cat in Boots will discover that he is passionate about adventure. He has already used up all eight of his nine lives. He decides to embark on a journey to find the mythical "Last Wish" and restore his nine lives.':
					'Kot w Butach odkryje, że jest pasjonatem przygód. Wykorzystał już wszystkie swoje osiem z dziewięciu istnień. Postanawia wyruszyć w podróż, aby znaleźć mityczne „Ostatnie Życzenie” i przywrócić swoje dziewięć żyć.',
				'Mason Pettis (John Cena), a former special forces agent, takes on a dangerous but well-paid assignment. He must provide private protection for a journalist during her trip to interview an eccentric dictator. Unlucky for him, a military coup erupts during the interview, and all three end up in the jungle on their own. Their only mission is to survive and not kill each other.':
					'Mason Pettis (John Cena), były agent sił specjalnych podejmuje się niebezpiecznego, ale dobrze płatnego zlecenia. Musi zapewnić prywatną ochronę dziennikarce podczas jej wyjazdu na wywiad z ekscentrycznym dyktatorem. Pech chce, że w trakcie rozmowy wybucha wojskowy zamach stanu, a cała trójka ląduje w dżungli zdana sama na siebie. Ich jedyną misją jest przeżyć i nie pozabijać się nawzajem.',
				'"Between Us Elements" is the latest animation from Disney and Pixar. The film is set in the Elements, a city inhabited by representatives of fire, water, earth and air. Spark is a tough, clever and fiery girl who, against her father\'s wishes, befriends a funny, flowing boy named Wodek. Their acquaintance turns Iskra\'s world upside down and causes the characters to rediscover the world around them.':
					'„Między nami żywiołami” to najnowsza animacja Disneya i Pixara. Akcja filmu rozgrywa się w Żywiołowie, mieście zamieszkanym przez przedstawicieli ognia, wody, ziemi i powietrza. Iskra to twarda, sprytna i ognista dziewczyna, która wbrew woli ojca zaprzyjaźnia się z zabawnym, płynącym z prądem chłopakiem imieniem Wodek. Ich znajomość wywraca świat Iskry do góry nogami i sprawia, że bohaterowie zaczynają na nowo odkrywać otaczający ich świat.',
				'Following the recent death of their father, the two sisters, who are separated, are stalked by a sinister entity known as The Jester. Revealing himself as little more than a man in a mask, the evil being begins to torment the residents of this small town even more on Halloween night. The road to defeating this ungodly monster lies in the hands of two sisters who realize that the only way to survive is to figure out how to right the wrong done to them by their dark past.':
					'Po niedawnej śmierci ojca dwie siostry, będące w separacji, są prześladowane przez złowrogą istotę znaną jako The Jester. Ujawniając się jako coś więcej niż tylko człowiek w masce, zła istota zaczyna w noc Halloween jeszcze bardziej dręczyć mieszkańców tego małego miasteczka. Droga do pokonania tego bezbożnego potwora leży w rękach dwóch sióstr, które zdają sobie sprawę, że jedynym sposobem na przetrwanie jest wymyślenie, jak naprawić zło, które wyrządziła im mroczna przeszłość.',
				"The story of a night watchman who starts working at Freddy Fazbear's Pizza. On the very first night, he realizes that this job at Freddy's will not be so easy.":
					"Historia stróża nocnego, który rozpoczyna pracę w Freddy Fazbear's Pizza. Już pierwszej nocy zdaje sobie sprawę, że ta praca u Freddy'ego nie będzie taka łatwa.",
				'After the tragic Black Friday riots, a killer inspired by Thanksgiving begins the slaughter. He chooses the residents of Plymouth, Massachusetts, as his target. This is the city recognized as the origin of the holiday.':
					'Po tragicznych zamieszkach w Czarny Piątek, zainspirowany Świętem Dziękczynnienia zabójca rozpoczyna rzeź. Za swój cel wybiera mieszkańców Plymouth w stanie Massachusetts. To miasto uznane za miejsce powstania tego święta.',
				'Dive into uncharted waters with Jason Statham and global action movie star Wu Jing as they lead a team of daring researchers on a voyage of discovery into the deepest abysses of the ocean. But the research turns into chaos when a ruthless mining operation threatens the mission and forces the participants to fight for survival. Struggling with giant sharks and relentless environmental destroyers, the heroes must outrun and outsmart the merciless predators in a frantic race against time.':
					'Zanurz się w nieznane wody z Jasonem Stathamem i światową gwiazdą kina akcji Wu Jingiem, którzy prowadzą zespół śmiałych badaczy na odkrywczą wyprawę w najgłębsze otchłanie oceanu. Badania zmieniają się jednak w chaos, kiedy bezwzględnie prowadzona operacja wydobywcza zagraża misji i zmusza jej uczestników do walki o przetrwanie. Zmagając się z gigantycznymi rekinami i nieustępliwymi niszczycielami środowiska, bohaterowie muszą prześcignąć i przechytrzyć bezlitosne drapieżniki w szaleńczym wyścigu z czasem.',
				"Suffering from cancer, John travels to Mexico to undergo an experimental treatment that is his last chance for survival. After the treatment, he discovers that he has fallen prey to medical fraudsters who are making a fortune out of human suffering. What they don't know is that they have messed with a man who is an expert in matters of suffering. John gets to work constructing a set of the most complicated, insane and cruel traps you've ever seen.":
					'Cierpiący na chorobę nowotworową John wyrusza do Meksyku, by poddać się eksperymentalnemu leczeniu, które jest dla niego ostatnią szansą na przeżycie. Po zabiegu odkrywa, że padł ofiarą medycznych oszustów, którzy zbijają majątek na ludzkim cierpieniu. Nie wiedzą, że zadarli z człowiekiem, który w kwestiach cierpienia jest ekspertem. John zabiera się do pracy konstruując zestaw najbardziej skomplikowanych, szalonych i okrutnych pułapek jakie kiedykolwiek widzieliście.',
				'A group of teenagers in the town of Salem discovers a cursed knife with a provocative spell. The unleashed demon forces them to play gruesome, deadly versions of childhood games, issuing a terrifying ultimatum: you play or die.':
					'Grupa nastolatków z miasteczka Salem odkrywa przeklęty nóż z prowokującym zaklęciem. Uwolniony demon zmusza ich do grania w makabryczne, śmiercionośne wersje gier z dzieciństwa, stawiając przerażające ultimatum: grasz lub giniesz.',
				'Residents of a small rural town discover that a demon is about to be born in their midst. They desperately try to escape before the evil is born, but it may be too late.':
					'Mieszkańcy małego wiejskiego miasteczka odkrywają, że demon ma się narodzić pośród nich. Rozpaczliwie próbują uciec, zanim zło się narodzi, ale może być już za późno.',
				'Sequel to the 1973 film about a 12-year-old girl possessed by a mysterious demonic entity who forces her mother to seek help from two priests to save her.':
					'Sequel filmu z 1973 roku o 12-letniej dziewczynce opętanej przez tajemniczą demoniczną istotę, która zmusza matkę do szukania pomocy u dwóch księży, aby ją uratować.',
				'1956, France. A priest is murdered. Evil spreads throughout the world. The sequel to the global hit tells the story of Sister Irene, who once again comes face to face with Valak, a demonic nun.':
					'Rok 1956, Francja. Pewien ksiądz zostaje zamordowany. Zło rozprzestrzenia się po świecie. Sequel globalnego przeboju opowiada o siostrze Irene, która raz jeszcze staje twarzą w twarz z Valak, demoniczną zakonnicą.',
				"Since the day he moved into his new home, eight-year-old Peter has been experiencing a terrifying presence every night. At first it's a mysterious, disturbing tapping behind the bedroom wall that only he can hear. Later, the nightmare escalates, with the appearance of harrowing visions. Worst of all, however, is the fact that the parents ignore their son's fears, claiming that he is tormented by the products of his own exuberant imagination. Doomed to confront the demonic force alone, Peter begins to suspect that those closest to him are hiding a terrible family secret from him.":
					'Od dnia przeprowadzki do nowego domu, ośmioletni Peter co noc doświadcza przerażającej obecności. Na początku jest to tajemnicze, niepokojące stukanie za ścianą sypialni, które słyszy tylko on. Później koszmar narasta, wraz z pojawieniem się wstrząsających wizji. Najgorszy jest jednak fakt, że rodzice lekceważą strach syna, twierdząc, że dręczą go wytwory własnej, wybujałej wyobraźni. Skazany na samotną konfrontację z demoniczną siłą, Peter zaczyna podejrzewać, że najbliżsi ukrywają przed nim straszną rodzinną tajemnicę.',
				'Based on true memoirs, the film "The Pope\'s Exorcist," directed by Julius Avery, will tell the story of legendary Italian priest Gabriel Amorth. Amoth performed exorcisms for the Vatican. The role of Amorth will be played by Russell Crowe. Amorth, who died in 2016, left behind a wealth of additional accounts of exorcisms around the world. The production is based on a book written by Gabriele Amorth. In Poland, it was published under the title "Confessions of an Exorcist."':
					'Oparty na prawdziwych wspomnieniach, film "Egzorcysta Papieża" w reżyserii Juliusa Avery\'ego opowie o legendarnym, włoskim księdzu Gabrielu Amorth. Amoth przeprowadzał egzorcyzmy dla Watykanu. W roli Amortha zobaczymy Russella Crowe. Amorth, który zmarł w 2016 roku, pozostawił po sobie mnóstwo dodatkowych relacji z egzorcyzmów na całym świecie. Produkcja jest zrealizowana na podstawie książki autorstwa Gabriele Amorth’a. W Polsce ukazała się pod tytułem "Wyznania egzorcysty".',
				'The plot of the film "Dead Evil: The Awakening" moves from the forest to the city. The plot tells the story of two sisters (played by Sutherland and Sullivan) who do not keep in touch with each other. Their meeting is interrupted by the appearance of demons that can take control of human bodies. Faced with the most nightmarish version of their family imaginable, the sisters are forced to engage in a brutal struggle for survival.':
					'Akcja filmu "Martwe zło: Przebudzenie" przenosi się z lasu do miasta. Fabuła opowiada o dwóch nieutrzymujących ze sobą kontaktu siostrach (w ich rolach Sutherland i Sullivan). Ich spotkanie zostaje przerwane pojawieniem się demonów, które potrafią przejmować panowanie nad ludzkimi ciałami. W obliczu najkoszmarniejszej wersji rodziny, jaką można sobie wyobrazić, siostry zmuszone są podjąć brutalną walkę o przetrwanie.',
				"The year is 1402, and Queen Margrethe (Trine Dyrholm), who united Denmark, Sweden and Norway, rules through her adopted son Erik (Morten Hee Andersen). However, the union she created begins to be threatened. To fend off an attack by her enemies, the ruler plans her son's marriage to an English princess. The alliance with England should ensure her empire's survival and status as an emerging European power. Immediately, however, her opponents form a conspiracy. They find that Margaret's supposedly dead son is alive. The torn woman must face her emotions and fight for the survival of the kingdom.":
					'Rok 1402. Królowa Małgorzata (Trine Dyrholm), która zjednoczyła Danię, Szwecję i Norwegię, rządziza pośrednictwem swego adoptowanego syna, Erika (Morten Hee Andersen). Stworzonej przez niej unii zaczyna jednak zagrażać niebezpieczeństwo. By odeprzeć atak wrogów, władczyni planuje małżeństwo syna z angielską księżniczką. Sojusz z Anglią powinien zapewnić jej imperium przetrwanie i status wschodzącej europejskiej potęgi. Niebawem jednak jej przeciwnicy zawiązują spisek. Stwierdzają, że rzekomo zmarły syn Małgorzaty żyje. Rozdarta kobieta musi zmierzyć się ze swoimi emocjami i walczyć o przetrwanie królestwa.',
				"Kaśka and Patrick's love is put to the test, as they both suspect each other of infidelity. As if that wasn't enough, the neighbors keep interfering in their affairs.":
					'Miłość Kaśki i Patryka zostaje poddana próbie, bo oboje podejrzewają się nawzajem o niewierność. Jakby tego było mało, sąsiedzi wciąż wtrącają się w ich sprawy.',
				"In this adaptation of Tadeusz Dolęga-Mostowicz's novel, former respected surgeon Professor Rafal Wilczur tries to regain his lost memory and his daughter, who does not recognize him.":
					'W tej adaptacji powieści Tadeusza Dołęgi-Mostowicza były szanowany chirurg profesor Rafał Wilczur próbuje odzyskać utraconą pamięć oraz córkę, która go nie rozpoznaje.',
				'Trying to make money to record his debut album, a promising street rapper and his friend get into trouble when a big drug deal ends in total disaster for them.':
					'Próbując zarobić na nagranie debiutanckiej płyty, obiecujący uliczny raper i jego przyjaciel wpadają w tarapaty, kiedy duża transakcja sprzedaży narkotyków kończy się dla nich totalną katastrofą.',
				'Pam Bales embarks on a solo hike to Mount Washington, the highest elevation of the unpredictable, ice-torn White Mountains in the US state of New Hampshire. This hike is her ritual and a way to cope with dramatic memories. And on the very day she feels most vulnerable, she will have to demonstrate heroic strength. For she meets an exhausted man, completely unprepared for an expedition to such a dangerous place. If she does not help him, he will most likely die. On the other hand, if she chooses to do so, she herself may die.':
					'Pam Bales wyrusza na samotną wędrówkę na Górę Waszyngtona, najwyższe wzniesienie nieprzewidywalnych, targanych lodowatymi wichurami Gór Białych w amerykańskim stanie New Hampshire. Ta wyprawa to jej rytuał i sposób na poradzenie sobie z dramatycznymi wspomnieniami. I właśnie w dniu, w którym czuje się najsłabsza, będzie musiała wykazać się heroiczną siłą. Spotyka bowiem wyczerpanego mężczyznę, zupełnie nieprzygotowanego na wyprawę w tak niebezpieczne miejsce. Jeśli nie udzieli mu pomocy, najpewniej umrze. Z kolei gdy się na to zdecyduje, sama może zginąć.',
				'Against the backdrop of the changing seasons and seasonal field work, the fate of the Borin family and the beautiful, mysterious Jagna is played out. It is the women, especially the tragic figure of Jagna, who will be at the heart of the plot. The unique micro-world of the rural community will become a pretext for telling a universal and incredibly timely story. A story about tragic love and life in a small community, where rules and brutal rules of the game assign everyone a certain place in the group, and stepping outside the tight confines risks humiliation and rejection.':
					'Na tle zmieniających się pór roku i sezonowych prac polowych rozgrywają się losy rodziny Borynów i pięknej, tajemniczej Jagny. To właśnie kobiety, w szczególności tragiczna postać Jagny, znajdą się w sercu fabuły. Unikalny mikroświat wiejskiej wspólnoty stanie się pretekstem do opowiedzenia uniwersalnej i niesamowicie aktualnej historii. Historii o tragicznej miłości i życiu w małej społeczności, gdzie reguły i brutalne zasady gry wyznaczają każdemu określone miejsce w grupie, a wyjście poza ciasne ramy grozi upokorzeniem i odrzuceniem.',
				"Evan Birch (Guy Pearce) is a seemingly happy man, leading an idyllic life. However, the charming and handsome professor also has a second face, a womanizer who romances female students. When a young woman dies, Evan becomes the prime suspect. The investigation is led by local detective Robert Malloy (Pierce Brosnan), whose investigation not only proves the professor's bad reputation, but also heavily incriminates him. Evan's past reveals that he is capable of committing crimes. In time, his wife Ellen (Minnie Driver) also begins to doubt her husband's innocence.":
					'Evan Birch (Guy Pearce) to z pozoru szczęśliwy mężczyzna, wiodący idylliczne życie. Czarujący i przystojny profesor ma jednak również drugie oblicze, kobieciarza romansującego ze studentkami. Gdy ginie młoda kobieta, Evan zostaje głównym podejrzanym. Śledztwo prowadzi lokalny detektyw Robert Malloy (Pierce Brosnan), którego dochodzenie nie tylko dowodzi złej reputacji profesora, ale również mocno go obciąża. Przeszłość Evana ujawnia, iż jest on zdolny do popełnienia zbrodni. Z czasem w niewinność męża zaczyna powątpiewać także jego żona, Ellen (Minnie Driver).',
				'After the death of a teacher, his friend and former police officer takes a job at the school to confront the gang suspected of killing him.':
					'Po śmierci nauczyciela jego przyjaciel i były policjant podejmuje pracę w szkole, aby zmierzyć się z gangiem podejrzewanym o jego zabójstwo.',
				'At an exclusive hotel in the Swiss Alps, an exotic mix of wealthy guests, pampered by the hotel staff, face the last day of the passing millennium. Some fear the end of the world, others look forward to the dawn of a glorious new future.':
					'W ekskluzywnym hotelu w szwajcarskich Alpach, egzotyczna mieszanka zamożnych gości, rozpieszczanych przez obsługę hotelową, stawia czoła ostatniemu dniu mijającego milenium. Niektórzy boją się końca świata, inni nie mogą doczekać się świtu nowej, wspaniałej przyszłości.',
				'"Love squared" is a romantic comedy about a teacher Monica, who leads a double life. One day (during a photo shoot as model Klaudia) she meets a popular flirt named Enzo. This meeting begins a complicated formula for love, for which no lesson has prepared them....':
					'"Miłość do kwadratu" to komedia romantyczna o prowadzącej podwójne życie nauczycielce Monice. Pewnego dnia (podczas sesji zdjęciowej jako modelka Klaudia) poznaje ona popularnego flirciarza o imieniu Enzo. Spotkanie to rozpoczyna skomplikowany wzór na miłość, do którego nie przygotowała ich żadna lekcja...',
				"The film is set in the near future and explores the consequences facing humanity. When a global storm causes electronics to go crazy, the world turns upside down. What at first glance should not be alarming begins to turn people's lives into a real nightmare.":
					'Akcja filmu rozgrywa się w niedalekiej przyszłości i bada konsekwencje z jaką boryka się ludzkość. Gdy globalna burza powoduje, że elektronika wariuje, świat wywraca się do góry nogami. To, co na pierwszy rzut oka nie powinno niepokoić, zaczyna zamieniać ludzkie życie w prawdziwy koszmar.',
				'Gareth Jones arrives in the USSR, wanting to interview Stalin. On the spot, he learns about the scourge of famine in Ukraine. Shocked and outraged, he will do anything to let the world know the truth. But will the world listen to him? Agnieszka Holland presents a historical film with echoes of contemporary events.':
					'Gareth Jones przybywa do ZSRR, chcąc przeprowadzić wywiad ze Stalinem. Na miejscu dowiaduje się o pladze głodu na Ukrainie. Zszokowany i oburzony, zrobi wszystko, aby świat poznał prawdę. Czy jednak świat będzie go słuchał? Agnieszka Holland przedstawia film historyczny, w którym pobrzmiewają echa współczesnych wydarzeń.',
				'The main characters are a grandfather and a grandson. The grandfather, Rick, is a mad inventor who travels through distant worlds with the kind of freedom that other grandfathers walk in the park. The grandson, Morty, is an ordinary kid, in love with a classmate and skipping more and more classes because of the adventures he has with his grandfather.':
					'Głównymi bohaterami są dziadek i wnuczek. Dziadek, Rick, to szalony wynalazca, który podróżuje przez odległe światy z taką swobodą, z jaką inni dziadkowie spacerują po parku. Wnuczek, Morty, to zwykły dzieciak, zakochany w koleżance z klasy i opuszczający coraz więcej lekcji z powodu przygód, które przeżywa z dziadkiem.',
				"Cate manages to survive Godzilla's attack on San Francisco, then experiences another shock when she discovers a shocking secret. Facing monstrous threats, she embarks on an adventurous journey to learn the truth about her family and a mysterious organization called Monarch.":
					'Cate udaje się przetrwać atak Godzilli na San Francisco, po czym przeżywa kolejny wstrząs, gdy odkrywa szokujący sekret. Stawiając czoła potwornym zagrożeniom, wyrusza w pełną przygód podróż, aby poznać prawdę o swojej rodzinie i tajemniczej organizacji zwanej Monarch.',
				'After stealing the Tesseract, Loki travels back in time changing human history trapped in his own crime thriller.':
					'Po kradzieży Tesseraktu Loki podróżuje w czasie zmieniając historię ludzkości uwięziony we własnym thrillerze kryminalnym.',
				'A spin-off of "The Walking Dead" series. The action begins in Los Angeles shortly before the zombie outbreak.':
					'Spin-off serialu "The Walking Dead". Akcja rozpoczyna się w Los Angeles na krótko przed wybuchem epidemii zombie.',
				"A drug-addicted teenager's life changes when she meets a transgender girl who has come to town.":
					'Życie uzależnionej od narkotyków nastolatki zmienia się, gdy poznaje transseksualną dziewczynę, która przybyła do miasta.',
				'The story of a teenager whose father is the most powerful superhero.':
					'Historia nastolatka, którego ojciec jest najpotężniejszym superbohaterem.',
				'The story is set in a small town in Michigan, where the only thriving industry is federal, state and private prisons. The story follows the McClusky family, intermediaries between police, criminals, prisoners, prison guards and politicians, in a town completely dependent on prisons and the inmates they hold.':
					'Akcja rozgrywa się w małym miasteczku w stanie Michigan, gdzie jedyną kwitnącą gałęzią gospodarki są federalne, stanowe i prywatne więzienia. Historia opowiada o rodzinie McClusky, pośrednikach między policją, przestępcami, więźniami, strażnikami więziennymi i politykami, w mieście całkowicie zależnym od więzień i przetrzymywanych w nich więźniów.',
				'The son of a respected judge is involved in an accident, leading to lies and difficult choices.':
					'Syn szanowanego sędziego jest zamieszany w wypadek, co prowadzi do kłamstw i trudnych wyborów.',
				'Seeking deliverance in revenge against those who made her an outcast in Edo period Japan, the young warrior follows a bloody path toward destiny.':
					'Szukając wybawienia w zemście na tych, którzy uczynili ją wyrzutkiem w Japonii okresu Edo, młoda wojowniczka podąża krwawą ścieżką ku przeznaczeniu.',
				'While monitoring an alarm line, an alert FBI agent receives a phone call that implicates him in a deadly conspiracy involving a spy operating in the White House.':
					'Podczas monitorowania linii alarmowej czujny agent FBI odbiera telefon, który wciąga go w śmiertelnie niebezpieczny spisek z udziałem szpiega działającego w Białym Domu.',
				'The adventures of Robyn McCall, a former CIA agent who uses her many talents to help innocent people in desperate need of help. She is a single mother busy raising her teenage daughter Delilahi, but when injustices occur, she does not hesitate to take part in more secret missions.':
					'Perypetie Robyn McCall, byłej agentki CIA, która wykorzystuje swoje liczne talenty, by pomagać niewinnym ludziom, desperacko potrzebującym pomocy. Jest ona samotną matką zajętą wychowywaniem nastoletniej córki Delilahi, jednak, gdy dochodzi do niesprawiedliwości, nie waha się brać udziału w kolejnych tajnych misjach.',
				'The NCIS team in Hawaii is investigating high-stakes crimes related to military operations, national security and many other secrets of the paradise islands, among others.':
					'Zespół NCIS na Hawajach bada przestępstwa o wysokiej stawce, związane między innymi z działaniami wojskowymi, bezpieczeństwem narodowym i wieloma innymi tajemnicami rajskich wysp.',

				Next: 'Następne',
				'Watch this': 'Obejrzyj to',
				Rules: 'Regulamin',
				Contact: 'Kontakt',
				english: 'angielski',
				polish: 'polski',
				Source: 'Źródło',
				'My profile': 'Mój profil',
				Logout: 'Wyloguj sie',
				'Search movie or serial': 'Szukaj filmu lub serialu',
				Films: 'Filmy',
				Serials: 'Seriale',
				Continue: 'Kontynuuj',
				'Free films and serials online!': 'Darmowe filmy i seriale online!',
				'vvaciej.app is a popular database with movies and series fully free of charge': 'vvaciej.app to popularna baza z filmami i serialami w pełni za darmo',
				'Take me there!': 'Zabierz mnie tam!',
				'Not found': 'Nie znaleziono',
				'Sorry about that! Please visit our homepage to get where you need to go.':
					'Przepraszamy za to! Odwiedź naszą stronę główną, aby dostać się tam, gdzie chcesz.',
				"It looks like you've found the door to a big nothing.":
					'Wygląda na to, że znalazłeś drzwi do wielkiego niczego.',
				'Account settings': 'Ustawienia konta',
				'Update informations about your account.': 'Zaktualizuj informacje o swoim koncie.',
				Informations: 'Informacje',
				'Social login': 'Logowanie przez inne portale',
				Login: 'Zaloguj sie',
				Password: 'Hasło',
				'Two-factor authentication': 'Uwierzytelnienia dwuskładnikowe',
				'Active sessions': 'Aktywne sesje',
				'Country and language': 'Kraj i język',
				'Delete account': 'Usuń konto',
				'Update your name or profile picture.': 'Zaktualizuj imię nazwisko lub zdjęcie profilowe.',
				Name: 'Imię',
				Surname: 'Nazwisko',
				'Profile picture': 'Zdjecie profilowe',
				'Delete picture': 'Usuń zdjęcie',
				Save: 'Zapisz',
				'Login through social networks': 'Logowanie poprzez portale społecznościowe',
				'Google account': 'Konto Google',
				Disabled: 'Wyłączone',
				'Turn on': 'Włącz',
				'If you disable social logins, you will still be able to log in with your e-mail and password.':
					'Jeśli wyłączysz loginy społecznościowe, nadal będziesz mógł zalogować się za pomocą wiadomości e-mail i hasła.',
				'Confirm password': 'Potwierdź hasło',
				'Update password and informations': 'Zaktualizuj hasło i dane',
				'Update password': 'Zaktualizuj hasło',
				"When you enable two-factor authentication, you will be asked for a secure, random token during authentication. You can get this token from your phone's Google Authenticator app.":
					'Po włączeniu uwierzytelniania dwuskładnikowego zostaniesz poproszony o bezpieczny, losowy token podczas uwierzytelniania. Możesz uzyskać ten token z aplikacji Google Authenticator swojego telefonu.',
				'You have not enabled two-factor authentication.': 'Nie włączyłeś uwierzytelniania dwuskładnikowego.',
				'If necessary, you can log out of all other browser sessions on all devices. Your most recent sessions are listed below. If you think someone else has logged into your account, you should also update your password. (Locations and IP addresses may not be what they actually are due to the use of a VPN. This keeps every user of our site safe and anonymous.':
					'W razie potrzeby możesz wylogować się ze wszystkich innych sesji przeglądarki na wszystkich urządzeniach. Twoje ostatnie sesje są wymienione poniżej. Jeśli uważasz, że ktoś inny zalogował sie na twoje konto, powinieneś również zaktualizować swoje hasło. (Lokalizacje i adresy IP mogą być inne niż w rzeczywistości z powodu używania sieci VPN. Dzięki temu każdy użytkownik naszej strony jest bezpieczny i anonimowy.',
				'IP address...': 'Adres IP...',
				'this device': 'to urządzenie',
				'Logout from other sessions': 'Wyloguj z innych sesji',
				'Date, time and language': 'Data, czas i język',
				Language: 'Język',
				Country: 'Kraj',
				'Time zone': 'Strefa czasowa',
				Poland: 'Polska',
				Norway: 'Norwegia',
				England: 'Anglia',
				Warsaw: 'Warszawa',
				'Dangerous zone': 'Niebezpieczna strefa',
				'Most popular': 'Najbardziej popularne',
				'Highest rating': 'Najlepiej oceniane',
				'Highest profit': 'Najwiekszy przychod',
				'Highest budget': 'Najwiekszy budzet',
				'Lastly added': 'Ostatnio dodane',
				Mesh: 'Siatka',
				Landscape: 'Pejzaz',
				List: 'Lista',
				'Rate this': 'Oceń to',
				Cancel: 'Anuluj',
				'Issue reported successfully': 'Zgłoszenie wysłano pomyślnie',
				Add: 'Dodaj',
				Review: 'Recenzja',
				Title: 'Tytuł',
				'Add a review': 'Dodaj recenzję',
				'Review by': 'Recenzja przez',
				Latest: 'Najnowsze',
				Newest: 'Najnowsze',
				Reviews: 'Recenzje',
				'Enter your email address to receive a link to reset your password.':
					'Wprowadź swój adres email aby otrzymać link do zresetowania hasła.',
				"Don't have an account?": 'Nie masz konta?',
				'Sign up': 'Zaloguj sie',
				English: 'Angielski',
				Crime: 'Kryminał',
				Historic: 'Historyczny',
				'Action and Adventure': 'Akcja I Przygoda',
				Sensational: 'Sensacyjny',
				Mysterious: 'Tajemnica',
				Drama: 'Dramat',
				Animation: 'Animacja',
				Action: 'Akcja',
				Comedy: 'Komedia',
				'Love Story': 'Romans',
				Fantasy: 'Fantazja',
				Family: 'Familijny',
				Adventure: 'Przygodowy',
				Musically: 'Muzyczny',
				'Sci-Fi & Fantasy': 'Sci-Fi & Fantazja',
				'Historic drama': 'Dramat Historyczny',
				Restricted: 'zastrzeżone',
				'Movies and serials': 'filmy i seriale',
				Keyword: 'słowo kluczowe',
				'Get in touch': 'Skontaktuj się',
				'Use the form below to send us a message, and we will contact you as soon as possible.':
					'Użyj poniższego formularza, aby przesłać nam wiadomość, a my skontaktujemy się z Tobą jak najszybciej.',
				Message: 'Wiadomość',
				Send: 'Wyślij',
				Logging: 'Logowanie',
				'Forgot password?': 'Zapomniałeś hasła?',
				'Or login by': 'Lub zaloguj się przez',
				'Sign up': 'Zarejestruj się',
				Remember: 'Zapamiętaj',
				'Login by your account': 'Zaloguj się na swoje konto',
				Films: 'Filmy',
				'Search engine': 'Wyszukiwarka filmów',
				Rules: 'Regulamin',
				'Sign in': 'Rejestracja',
				'Create new account': 'Stwórz nowe konto',
				'Create account': 'Stwórz konto',
				'Or signin by': 'Lub zarejestruj sie przez',
				'Already have an account?': 'Masz już konto?',
				'Free films and serials': 'Darmowe filmy i seriale',
				'films and serials': 'filmy i seriale',
				Search: 'Szukaj',

				'Search results:': 'Wyniki wyszukiwania:',
				Movies: 'Filmy',
				'Search serials': 'Wyszukiwarka seriali',
				Serials: 'Seriale',
				Polish: 'Polski',
				War: 'Wojenny',
				Thriller: 'Dreszczowiec',
				'Watch later': 'Obejrzyj potem',
				Share: 'Udostępnij',
				'Copy link': 'Skopiuj link',
				'Share on facebook': 'Udostępnij na facebooku',
				'Share on twitter': 'Udostępnij na twitterze',
				'Original language': 'Oryginalny język',
				'Original title': 'Oryginalny tytuł',
				Budget: 'Budżet',
				Profit: 'Przychód',
				Portrait: 'Portret',
				'Filmed in': 'Nakręcono w',
				Keywords: 'Słowa kluczowe',
				Latest: 'Najnowsze',
				'Register is required': 'Wymagana jest rejestracja',
				or: 'lub',
				'create account': 'stwórz konto',
				'to add review': 'aby dodać recenzje',
				Sources: 'Źródła',
				'Full video': 'Pełne video',
				'Alike films': 'Podobne filmy',
				'Copied link to clipboard': 'Skopiowano link do schowka',
				'Your account': 'Twoje konto',
				'Edit profile': 'Edytuj profil',
				Followers: 'Obserwujący',
				Following: 'Obserwuje',
				Lists: 'Listy',
				Grades: 'Oceny',
				Comments: 'Komentarze',
				Follow: 'Zaobserwuj',
				'for updates on lists they create in the future.': 'o aktualizacje list, które utworzą w przyszłości.',
				'No list': 'Brak list',
				'No grades': 'Brak ocen',
				'No reviews': 'Brak recenzji',
				'No comments': 'Brak komentarzy',
				'No followers': 'Brak obserwujących',
				'Be the first to follow': 'Bądź pierwszym obserwującym',
				'No followers yet': 'Nikogo jeszcze nie obserwuje',
				'Check back later to see users': 'Sprawdź później, aby zobaczyć użytkowników',
				'is following': 'obserwujących',
				'Seems a little quiet over here': 'Troche tu cicho',
				'Be the first to comment': 'Bądź pierwszym komentującym',
				Alike: 'Podobne',
				'The vote has been cast': 'Głos został oddany',
				Watchlist: 'Do obejrzenia',
			},
		},
	},
	lng: getLanguageFromUrl(),
});

export default i18next;
