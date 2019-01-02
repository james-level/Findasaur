from random import choice
import json
import requests
from bs4 import BeautifulSoup
import threading
from functools import wraps


def delay(delay=0.):
    def wrap(f):
        @wraps(f)
        def delayed(*args, **kwargs):
            timer = threading.Timer(delay, f, args=args, kwargs=kwargs)
            timer.start()
        return delayed
    return wrap


class Timer():
    toClearTimer = False
    def setTimeout(self, fn, time):
        isInvocationCancelled = False
        @delay(time)
        def some_fn():
                if (self.toClearTimer is False):
                        fn()
                else:
                    print('Invocation cleared.')
        some_fn()
        return isInvocationCancelled
    def setClearTimer(self):
        self.toClearTimer = True

_user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
    'Mozilla/5.0 (X11; NetBSD) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36',
    'Mozilla/5.0 (X11; CrOS i686 3912.101.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.60 Safari/537.17',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1309.0 Safari/537.17',
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15',
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.14 (KHTML, like Gecko) Chrome/24.0.1292.0 Safari/537.14',
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13',
    'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1284.0 Safari/537.13',
    'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.6 Safari/537.11',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.6 Safari/537.11',
    'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.26 Safari/537.11',
    'Mozilla/5.0 (Windows NT 6.0) yi; AppleWebKit/345667.12221 (KHTML, like Gecko) Chrome/23.0.1271.26 Safari/453667.1221',
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.17 Safari/537.11',
    'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_0) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1',
    'Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6'
]


class NaturalHistoryMuseumScraper:

    def __init__(self, user_agents=_user_agents, proxy=None):
        self.user_agents = user_agents
        self.proxy = proxy

    def __random_agent(self):
        if self.user_agents and isinstance(self.user_agents, list):
            return choice(self.user_agents)
        return choice(_user_agents)


    def __request_url(self, url):
        try:
            self.__random_agent()
            response = requests.get(url, headers={'User-Agent': self.__random_agent()}, proxies={'http': self.proxy,
                                                                                                 'https': self.proxy})
            response.raise_for_status()
        except requests.HTTPError:
                return response.text
        except requests.RequestException:
            raise requests.RequestException
        else:
            return response.text

    @staticmethod
    def extract_meaning_json_data(html):
        soup = BeautifulSoup(html, 'html.parser')
        meaning = soup.find('dd', class_="dinosaur--meaning")
        return meaning

    @staticmethod
    def extract_pronunciation_json_data(html):
        soup = BeautifulSoup(html, 'html.parser')
        pronunciation = soup.find('dd', class_="dinosaur--pronunciation")
        return pronunciation

    @staticmethod
    def extract_length_json_data(html):
        soup = BeautifulSoup(html, 'html.parser')
        div = soup.find('div', class_="dinosaur--description-container small-12 medium-12 large-5 columns")
        if div is None:
            div = soup.find('div', class_="dinosaur--description-container")
        if div is not None:
            length = div.find_all('dd')[1]
            return length
        else:
            return

    @staticmethod
    def extract_type_json_data(html):
        soup = BeautifulSoup(html, 'html.parser')
        div = soup.find('div', class_="dinosaur--description-container small-12 medium-12 large-5 columns")
        if div is None:
            div = soup.find('div', class_="dinosaur--description-container")
        if div is not None:
            type = div.find_all('dd')[0]
            link = type.find('a')
            return link
        else:
            return

    def scrape_dinosaur_name_meanings(self, dinosaur_name):
        url = 'http://www.nhm.ac.uk/discover/dino-directory/' + dinosaur_name[0].lower() + dinosaur_name[1:] + '.html'
        response = self.__request_url(url)
        meaning = self.extract_meaning_json_data(response)
        if meaning is not None:
            return meaning.text
        else:
            return meaning

    def scrape_dinosaur_name_pronunciations(self, dinosaur_name):
        url = 'http://www.nhm.ac.uk/discover/dino-directory/' + dinosaur_name[0].lower() + dinosaur_name[1:] + '.html'
        response = self.__request_url(url)
        pronunciation = self.extract_pronunciation_json_data(response)
        if pronunciation is not None:
            return pronunciation.text
        else:
            return pronunciation

    def scrape_dinosaur_length(self, dinosaur_name):
        url = 'http://www.nhm.ac.uk/discover/dino-directory/' + dinosaur_name[0].lower() + dinosaur_name[1:] + '.html'
        response = self.__request_url(url)
        length = self.extract_length_json_data(response)
        if length is not None:
            return length
        else:
            return

    def scrape_dinosaur_type(self, dinosaur_name):
        url = 'http://www.nhm.ac.uk/discover/dino-directory/' + dinosaur_name[0].lower() + dinosaur_name[1:] + '.html'
        response = self.__request_url(url)
        type = self.extract_type_json_data(response)
        if type is not None:
            return type
        else:
            return

    def print_meaning(self, dinosaur):
        meaning = self.scrape_dinosaur_name_meanings(dinosaur)
        if meaning is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + meaning + ";")
            return
        meaning = self.scrape_dinosaur_name_meanings(dinosaur)
        if meaning is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + meaning + ";")
            return
        meaning = self.scrape_dinosaur_name_meanings(dinosaur)
        if meaning is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + meaning + ";")
            return
        meaning = self.scrape_dinosaur_name_meanings(dinosaur)
        if meaning is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + meaning + ";")
            return
        meaning = self.scrape_dinosaur_name_meanings(dinosaur)
        if meaning is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + meaning + ";")
            return
        meaning = self.scrape_dinosaur_name_meanings(dinosaur)
        if meaning is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + meaning + ";")
            return

    def print_pronunciation(self, dinosaur):
        pronunciation = self.scrape_dinosaur_name_pronunciations(dinosaur)
        if pronunciation is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + pronunciation + "'" + ";")
            return
        pronunciation = self.scrape_dinosaur_name_meanings(dinosaur)
        if pronunciation is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + pronunciation + "'" + ";")
            return
        pronunciation = self.scrape_dinosaur_name_meanings(dinosaur)
        if pronunciation is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + pronunciation + "'" + ";")
            return
        pronunciation = self.scrape_dinosaur_name_meanings(dinosaur)
        if pronunciation is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + pronunciation + "'" + ";")
            return
        pronunciation = self.scrape_dinosaur_name_meanings(dinosaur)
        if pronunciation is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + pronunciation + "'"  + ";")
            return
        pronunciation = self.scrape_dinosaur_name_meanings(dinosaur)
        if pronunciation is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + pronunciation + "'" + ";")
            return

    def print_length(self, dinosaur):
        length = self.scrape_dinosaur_length(dinosaur)
        if length is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + length.text + "'" + ";")
            return
        length = self.scrape_dinosaur_length(dinosaur)
        if length is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + length.text + "'" + ";")
            return
        length = self.scrape_dinosaur_length(dinosaur)
        if length is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + length.text + "'" + ";")
            return
        length = self.scrape_dinosaur_length(dinosaur)
        if length is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + length.text + "'" + ";")
            return

    def print_type(self, dinosaur):
        type = self.scrape_dinosaur_type(dinosaur)
        if type is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + type.text + "'" + ";")
            return
        type = self.scrape_dinosaur_length(dinosaur)
        if type is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + type.text + "'" + ";")
            return
        type = self.scrape_dinosaur_length(dinosaur)
        if type is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + type.text + "'" + ";")
            return
        type = self.scrape_dinosaur_length(dinosaur)
        if type is not None:
            print("case " + "'" + dinosaur + "'" + ": return " + "'" + type.text + "'" + ";")
            return

    def meanings(self):
        dinosaur_names = [
           "Aardonyx",
           "Abelisaurus",
           "Achelousaurus",
           "Achillobator",
           "Acrocanthosaurus",
           "Aegyptosaurus",
           "Afrovenator",
           "Agilisaurus",
           "Alamosaurus",
           "Albertaceratops",
           "Albertosaurus",
           "Alectrosaurus",
           "Alioramus",
           "Allosaurus",
           "Alvarezsaurus",
           "Amargasaurus",
           "Ammosaurus",
           "Ampelosaurus",
           "Amygdalodon",
           "Anchiceratops",
           "Anchisaurus",
           "Ankylosaurus",
           "Anserimimus",
           "Antarctosaurus",
           "Apatosaurus",
           "Aragosaurus",
           "Aralosaurus",
           "Archaeoceratops",
           "Archaeopteryx",
           "Archaeornithomimus",
           "Argentinosaurus",
           "Arrhinoceratops",
           "Atlascopcosaurus",
           "Aucasaurus",
           "Austrosaurus",
           "Avaceratops",
           "Avimimus",
           "Bactrosaurus",
           "Bagaceratops",
           "Bambiraptor",
           "Barapasaurus",
           "Barosaurus",
           "Baryonyx",
           "Becklespinax",
           "Beipiaosaurus",
           "Bellusaurus",
           "Borogovia",
           "Brachiosaurus",
           "Brachylophosaurus",
           "Brachytrachelopan",
           "Buitreraptor",
           "Camarasaurus",
           "Camptosaurus",
           "Carcharodontosaurus",
           "Carnotaurus",
           "Caudipteryx",
           "Cedarpelta",
           "Centrosaurus",
           "Ceratosaurus",
           "Cetiosauriscus",
           "Cetiosaurus",
           "Chaoyangsaurus",
           "Chasmosaurus",
           "Chindesaurus",
           "Chinshakiangosaurus",
           "Chirostenotes",
           "Chubutisaurus",
           "Chungkingosaurus",
           "Citipati",
           "Coelophysis",
           "Coelurus",
           "Coloradisaurus",
           "Compsognathus",
           "Conchoraptor",
           "Confuciusornis",
           "Corythosaurus",
           "Cryolophosaurus",
           "Dacentrurus",
           "Daspletosaurus",
           "Datousaurus",
           "Deinocheirus",
           "Deltadromeus",
           "Dicraeosaurus",
           "Dilophosaurus",
           "Diplodocus",
           "Dromaeosaurus",
           "Dromiceiomimus",
           "Dryosaurus",
           "Dryptosaurus",
           "Edmontonia",
           "Edmontosaurus",
           "Einiosaurus",
           "Elaphrosaurus",
           "Emausaurus",
           "Eoraptor",
           "Eotyrannus",
           "Erketu",
           "Erlikosaurus",
           "Euhelopus",
           "Euoplocephalus",
           "Europasaurus",
           "Eustreptospondylus",
           "Fukuiraptor",
           "Fukuisauru",
           "Gallimimus",
           "Gargoyleosaurus",
           "Garudimimus",
           "Gasosaurus",
           "Gasparinisaura",
           "Gastonia",
           "Giganotosaurus",
           "Gilmoreosaurus",
           "Giraffatitan",
           "Gobisaurus",
           "Gorgosaurus",
           "Goyocephale",
           "Gryposaurus",
           "Guaibasaurus",
           "Guanlong",
           "Hadrosaurus",
           "Hagryphus",
           "Haplocanthosaurus",
           "Harpymimus",
           "Herrerasaurus",
           "Hesperosaurus",
           "Heterodontosaurus",
           "Heyuannia",
           "Homalocephale",
           "Huayangosaurus",
           "Hylaeosaurus",
           "Hypacrosaurus",
           "Hypsilophodon",
           "Iguanodon",
           "Indosuchus",
           "Irritator",
           "Janenschia",
           "Jaxartosaurus",
           "Jingshanosaurus",
           "Jobaria",
           "Juravenator",
           "Kentrosaurus",
           "Khaan",
           "Kotasaurus",
           "Kritosaurus",
           "Lambeosaurus",
           "Leaellynasaura",
           "Leptoceratops",
           "Ligabuesaurus",
           "Liliensternus",
           "Lophorhothon",
           "Lophostropheus",
           "Lufengosaurus",
           "Lurdusaurus",
           "Lycorhinus",
           "Magyarosaurus",
           "Maiasaura",
           "Majungasaurus",
           "Malawisaurus",
           "Mamenchisaurus",
           "Mapusaurus",
           "Marshosaurus",
           "Masiakasaurus",
           "Massospondylus",
           "Maxakalisaurus",
           "Megalosaurus",
           "Melanorosaurus",
           "Metriacanthosaurus",
           "Microceratus",
           "Micropachycephalosaurus",
           "Microraptor",
           "Minmi",
           "Monolophosaurus",
           "Mononykus",
           "Mussaurus",
           "Muttaburrasaurus",
           "Nanshiungosaurus",
           "Nedoceratops",
           "Nemegtosaurus",
           "Neovenator",
           "Neuquenosaurus",
           "Nigersaurus",
           "Noasaurus",
           "Nodosaurus",
           "Nomingia",
           "Nothronychus",
           "Nqwebasaurus",
           "Omeisaurus",
           "Opisthocoelicaudia",
           "Ornitholestes",
           "Ornithomimus",
           "Orodromeus",
           "Oryctodromeus",
           "Othnielia",
           "Ouranosaurus",
           "Oviraptor",
           "Pachycephalosaurus",
           "Pachyrhinosaurus",
           "Panoplosaurus",
           "Pantydraco",
           "Paralititan",
           "Parasaurolophus",
           "Parksosaurus",
           "Patagosaurus",
           "Pelicanimimus",
           "Pentaceratops",
           "Piatnitzkysauru",
           "Pinacosauru",
           "Plateosauru",
           "Podokesauru",
           "Poekilopleuro",
           "Polacanthu",
           "Prenocephal",
           "Probactrosauru",
           "Proceratosauru",
           "Procompsognathu",
           "Prosaurolophu",
           "Protarchaeoptery",
           "Protoceratop",
           "Protohadro",
           "Psittacosauru",
           "Quaesitosauru",
           "Rebbachisauru",
           "Rhabdodo",
           "Rhoetosauru",
           "Rincheni",
           "Riojasauru",
           "Saichania",
           "Saltasaurus",
           "Sarcosaurus",
           "Saurolophus",
           "Sauropelta",
           "Saurophaganax",
           "Saurornithoides",
           "Scelidosaurus",
           "Scutellosaurus",
           "Secernosaurus",
           "Segisaurus",
           "Segnosaurus",
           "Shanag",
           "Shantungosaurus",
           "Shunosaurus",
           "Shuvuuia",
           "Silvisaurus",
           "Sinocalliopteryx",
           "Sinornithosaurus",
           "Sinosauropteryx",
           "Sinovenator",
           "Sinraptor",
           "Sonidosaurus",
           "Spinosaurus",
           "Staurikosaurus",
           "Stegoceras",
           "Stegosaurus",
           "Stenopelix",
           "Struthiomimus",
           "Struthiosaurus",
           "Styracosaurus",
           "Suchomimus",
           "Supersaurus",
           "Talarurus",
           "Tarbosaurus",
           "Tarchia",
           "Telmatosaurus",
           "Tenontosaurus",
           "Thecodontosaurus",
           "Thescelosaurus",
           "Torosaurus",
           "Torvosaurus",
           "Triceratops",
           "Troodon",
           "Tsintaosaurus",
           "Tuojiangosaurus",
           "Tylocephale",
           "Tyrannosaurus",
           "Unenlagia",
           "Urbacodon",
           "Utahraptor",
           "Valdosaurus",
           "Velociraptor",
           "Vulcanodon",
           "Yandusaurus",
           "Yangchuanosaurus",
           "Yimenosaurus",
           "Yinlong",
           "Yuanmousaurus",
           "Yunnanosaurus",
           "Zalmoxes",
           "Zephyrosaurus"
           ]
        timer = Timer()
        for dinosaur in dinosaur_names:
            timer.setTimeout(self.print_meaning(dinosaur), 1000)


    def pronunciations(self):
        dinosaur_names = [
               "Aardonyx",
               "Abelisaurus",
               "Achelousaurus",
               "Achillobator",
               "Acrocanthosaurus",
               "Aegyptosaurus",
               "Afrovenator",
               "Agilisaurus",
               "Alamosaurus",
               "Albertaceratops",
               "Albertosaurus",
               "Alectrosaurus",
               "Alioramus",
               "Allosaurus",
               "Alvarezsaurus",
               "Amargasaurus",
               "Ammosaurus",
               "Ampelosaurus",
               "Amygdalodon",
               "Anchiceratops",
               "Anchisaurus",
               "Ankylosaurus",
               "Anserimimus",
               "Antarctosaurus",
               "Apatosaurus",
               "Aragosaurus",
               "Aralosaurus",
               "Archaeoceratops",
               "Archaeopteryx",
               "Archaeornithomimus",
               "Argentinosaurus",
               "Arrhinoceratops",
               "Atlascopcosaurus",
               "Aucasaurus",
               "Austrosaurus",
               "Avaceratops",
               "Avimimus",
               "Bactrosaurus",
               "Bagaceratops",
               "Bambiraptor",
               "Barapasaurus",
               "Barosaurus",
               "Baryonyx",
               "Becklespinax",
               "Beipiaosaurus",
               "Bellusaurus",
               "Borogovia",
               "Brachiosaurus",
               "Brachylophosaurus",
               "Brachytrachelopan",
               "Buitreraptor",
               "Camarasaurus",
               "Camptosaurus",
               "Carcharodontosaurus",
               "Carnotaurus",
               "Caudipteryx",
               "Cedarpelta",
               "Centrosaurus",
               "Ceratosaurus",
               "Cetiosauriscus",
               "Cetiosaurus",
               "Chaoyangsaurus",
               "Chasmosaurus",
               "Chindesaurus",
               "Chinshakiangosaurus",
               "Chirostenotes",
               "Chubutisaurus",
               "Chungkingosaurus",
               "Citipati",
               "Coelophysis",
               "Coelurus",
               "Coloradisaurus",
               "Compsognathus",
               "Conchoraptor",
               "Confuciusornis",
               "Corythosaurus",
               "Cryolophosaurus",
               "Dacentrurus",
               "Daspletosaurus",
               "Datousaurus",
               "Deinocheirus",
               "Deltadromeus",
               "Dicraeosaurus",
               "Dilophosaurus",
               "Diplodocus",
               "Dromaeosaurus",
               "Dromiceiomimus",
               "Dryosaurus",
               "Dryptosaurus",
               "Edmontonia",
               "Edmontosaurus",
               "Einiosaurus",
               "Elaphrosaurus",
               "Emausaurus",
               "Eoraptor",
               "Eotyrannus",
               "Erketu",
               "Erlikosaurus",
               "Euhelopus",
               "Euoplocephalus",
               "Europasaurus",
               "Eustreptospondylus",
               "Fukuiraptor",
               "Fukuisauru",
               "Gallimimus",
               "Gargoyleosaurus",
               "Garudimimus",
               "Gasosaurus",
               "Gasparinisaura",
               "Gastonia",
               "Giganotosaurus",
               "Gilmoreosaurus",
               "Giraffatitan",
               "Gobisaurus",
               "Gorgosaurus",
               "Goyocephale",
               "Gryposaurus",
               "Guaibasaurus",
               "Guanlong",
               "Hadrosaurus",
               "Hagryphus",
               "Haplocanthosaurus",
               "Harpymimus",
               "Herrerasaurus",
               "Hesperosaurus",
               "Heterodontosaurus",
               "Heyuannia",
               "Homalocephale",
               "Huayangosaurus",
               "Hylaeosaurus",
               "Hypacrosaurus",
               "Hypsilophodon",
               "Iguanodon",
               "Indosuchus",
               "Irritator",
               "Janenschia",
               "Jaxartosaurus",
               "Jingshanosaurus",
               "Jobaria",
               "Juravenator",
               "Kentrosaurus",
               "Khaan",
               "Kotasaurus",
               "Kritosaurus",
               "Lambeosaurus",
               "Leaellynasaura",
               "Leptoceratops",
               "Ligabuesaurus",
               "Liliensternus",
               "Lophorhothon",
               "Lophostropheus",
               "Lufengosaurus",
               "Lurdusaurus",
               "Lycorhinus",
               "Magyarosaurus",
               "Maiasaura",
               "Majungasaurus",
               "Malawisaurus",
               "Mamenchisaurus",
               "Mapusaurus",
               "Marshosaurus",
               "Masiakasaurus",
               "Massospondylus",
               "Maxakalisaurus",
               "Megalosaurus",
               "Melanorosaurus",
               "Metriacanthosaurus",
               "Microceratus",
               "Micropachycephalosaurus",
               "Microraptor",
               "Minmi",
               "Monolophosaurus",
               "Mononykus",
               "Mussaurus",
               "Muttaburrasaurus",
               "Nanshiungosaurus",
               "Nedoceratops",
               "Nemegtosaurus",
               "Neovenator",
               "Neuquenosaurus",
               "Nigersaurus",
               "Noasaurus",
               "Nodosaurus",
               "Nomingia",
               "Nothronychus",
               "Nqwebasaurus",
               "Omeisaurus",
               "Opisthocoelicaudia",
               "Ornitholestes",
               "Ornithomimus",
               "Orodromeus",
               "Oryctodromeus",
               "Othnielia",
               "Ouranosaurus",
               "Oviraptor",
               "Pachycephalosaurus",
               "Pachyrhinosaurus",
               "Panoplosaurus",
               "Pantydraco",
               "Paralititan",
               "Parasaurolophus",
               "Parksosaurus",
               "Patagosaurus",
               "Pelicanimimus",
               "Pentaceratops",
               "Piatnitzkysauru",
               "Pinacosauru",
               "Plateosauru",
               "Podokesauru",
               "Poekilopleuro",
               "Polacanthu",
               "Prenocephal",
               "Probactrosauru",
               "Proceratosauru",
               "Procompsognathu",
               "Prosaurolophu",
               "Protarchaeoptery",
               "Protoceratop",
               "Protohadro",
               "Psittacosauru",
               "Quaesitosauru",
               "Rebbachisauru",
               "Rhabdodo",
               "Rhoetosauru",
               "Rincheni",
               "Riojasauru",
               "Saichania",
               "Saltasaurus",
               "Sarcosaurus",
               "Saurolophus",
               "Sauropelta",
               "Saurophaganax",
               "Saurornithoides",
               "Scelidosaurus",
               "Scutellosaurus",
               "Secernosaurus",
               "Segisaurus",
               "Segnosaurus",
               "Shanag",
               "Shantungosaurus",
               "Shunosaurus",
               "Shuvuuia",
               "Silvisaurus",
               "Sinocalliopteryx",
               "Sinornithosaurus",
               "Sinosauropteryx",
               "Sinovenator",
               "Sinraptor",
               "Sonidosaurus",
               "Spinosaurus",
               "Staurikosaurus",
               "Stegoceras",
               "Stegosaurus",
               "Stenopelix",
               "Struthiomimus",
               "Struthiosaurus",
               "Styracosaurus",
               "Suchomimus",
               "Supersaurus",
               "Talarurus",
               "Tarbosaurus",
               "Tarchia",
               "Telmatosaurus",
               "Tenontosaurus",
               "Thecodontosaurus",
               "Thescelosaurus",
               "Torosaurus",
               "Torvosaurus",
               "Triceratops",
               "Troodon",
               "Tsintaosaurus",
               "Tuojiangosaurus",
               "Tylocephale",
               "Tyrannosaurus",
               "Unenlagia",
               "Urbacodon",
               "Utahraptor",
               "Valdosaurus",
               "Velociraptor",
               "Vulcanodon",
               "Yandusaurus",
               "Yangchuanosaurus",
               "Yimenosaurus",
               "Yinlong",
               "Yuanmousaurus",
               "Yunnanosaurus",
               "Zalmoxes",
               "Zephyrosaurus"
               ]
        timer = Timer()
        for dinosaur in dinosaur_names:
            timer.setTimeout(self.print_pronunciation(dinosaur), 1000)

    def lengths_and_types(self):
        dinosaur_names = [
               "Aardonyx",
               "Abelisaurus",
               "Achelousaurus",
               "Achillobator",
               "Acrocanthosaurus",
               "Aegyptosaurus",
               "Afrovenator",
               "Agilisaurus",
               "Alamosaurus",
               "Albertaceratops",
               "Albertosaurus",
               "Alectrosaurus",
               "Alioramus",
               "Allosaurus",
               "Alvarezsaurus",
               "Amargasaurus",
               "Ammosaurus",
               "Ampelosaurus",
               "Amygdalodon",
               "Anchiceratops",
               "Anchisaurus",
               "Ankylosaurus",
               "Anserimimus",
               "Antarctosaurus",
               "Apatosaurus",
               "Aragosaurus",
               "Aralosaurus",
               "Archaeoceratops",
               "Archaeopteryx",
               "Archaeornithomimus",
               "Argentinosaurus",
               "Arrhinoceratops",
               "Atlascopcosaurus",
               "Aucasaurus",
               "Austrosaurus",
               "Avaceratops",
               "Avimimus",
               "Bactrosaurus",
               "Bagaceratops",
               "Bambiraptor",
               "Barapasaurus",
               "Barosaurus",
               "Baryonyx",
               "Becklespinax",
               "Beipiaosaurus",
               "Bellusaurus",
               "Borogovia",
               "Brachiosaurus",
               "Brachylophosaurus",
               "Brachytrachelopan",
               "Buitreraptor",
               "Camarasaurus",
               "Camptosaurus",
               "Carcharodontosaurus",
               "Carnotaurus",
               "Caudipteryx",
               "Cedarpelta",
               "Centrosaurus",
               "Ceratosaurus",
               "Cetiosauriscus",
               "Cetiosaurus",
               "Chaoyangsaurus",
               "Chasmosaurus",
               "Chindesaurus",
               "Chinshakiangosaurus",
               "Chirostenotes",
               "Chubutisaurus",
               "Chungkingosaurus",
               "Citipati",
               "Coelophysis",
               "Coelurus",
               "Coloradisaurus",
               "Compsognathus",
               "Conchoraptor",
               "Confuciusornis",
               "Corythosaurus",
               "Cryolophosaurus",
               "Dacentrurus",
               "Daspletosaurus",
               "Datousaurus",
               "Deinocheirus",
               "Deltadromeus",
               "Dicraeosaurus",
               "Dilophosaurus",
               "Diplodocus",
               "Dromaeosaurus",
               "Dromiceiomimus",
               "Dryosaurus",
               "Dryptosaurus",
               "Edmontonia",
               "Edmontosaurus",
               "Einiosaurus",
               "Elaphrosaurus",
               "Emausaurus",
               "Eoraptor",
               "Eotyrannus",
               "Erketu",
               "Erlikosaurus",
               "Euhelopus",
               "Euoplocephalus",
               "Europasaurus",
               "Eustreptospondylus",
               "Fukuiraptor",
               "Fukuisauru",
               "Gallimimus",
               "Gargoyleosaurus",
               "Garudimimus",
               "Gasosaurus",
               "Gasparinisaura",
               "Gastonia",
               "Giganotosaurus",
               "Gilmoreosaurus",
               "Giraffatitan",
               "Gobisaurus",
               "Gorgosaurus",
               "Goyocephale",
               "Gryposaurus",
               "Guaibasaurus",
               "Guanlong",
               "Hadrosaurus",
               "Hagryphus",
               "Haplocanthosaurus",
               "Harpymimus",
               "Herrerasaurus",
               "Hesperosaurus",
               "Heterodontosaurus",
               "Heyuannia",
               "Homalocephale",
               "Huayangosaurus",
               "Hylaeosaurus",
               "Hypacrosaurus",
               "Hypsilophodon",
               "Iguanodon",
               "Indosuchus",
               "Irritator",
               "Janenschia",
               "Jaxartosaurus",
               "Jingshanosaurus",
               "Jobaria",
               "Juravenator",
               "Kentrosaurus",
               "Khaan",
               "Kotasaurus",
               "Kritosaurus",
               "Lambeosaurus",
               "Leaellynasaura",
               "Leptoceratops",
               "Ligabuesaurus",
               "Liliensternus",
               "Lophorhothon",
               "Lophostropheus",
               "Lufengosaurus",
               "Lurdusaurus",
               "Lycorhinus",
               "Magyarosaurus",
               "Maiasaura",
               "Majungasaurus",
               "Malawisaurus",
               "Mamenchisaurus",
               "Mapusaurus",
               "Marshosaurus",
               "Masiakasaurus",
               "Massospondylus",
               "Maxakalisaurus",
               "Megalosaurus",
               "Melanorosaurus",
               "Metriacanthosaurus",
               "Microceratus",
               "Micropachycephalosaurus",
               "Microraptor",
               "Minmi",
               "Monolophosaurus",
               "Mononykus",
               "Mussaurus",
               "Muttaburrasaurus",
               "Nanshiungosaurus",
               "Nedoceratops",
               "Nemegtosaurus",
               "Neovenator",
               "Neuquenosaurus",
               "Nigersaurus",
               "Noasaurus",
               "Nodosaurus",
               "Nomingia",
               "Nothronychus",
               "Nqwebasaurus",
               "Omeisaurus",
               "Opisthocoelicaudia",
               "Ornitholestes",
               "Ornithomimus",
               "Orodromeus",
               "Oryctodromeus",
               "Othnielia",
               "Ouranosaurus",
               "Oviraptor",
               "Pachycephalosaurus",
               "Pachyrhinosaurus",
               "Panoplosaurus",
               "Pantydraco",
               "Paralititan",
               "Parasaurolophus",
               "Parksosaurus",
               "Patagosaurus",
               "Pelicanimimus",
               "Pentaceratops",
               "Piatnitzkysauru",
               "Pinacosauru",
               "Plateosauru",
               "Podokesauru",
               "Poekilopleuro",
               "Polacanthu",
               "Prenocephal",
               "Probactrosauru",
               "Proceratosauru",
               "Procompsognathu",
               "Prosaurolophu",
               "Protarchaeoptery",
               "Protoceratop",
               "Protohadro",
               "Psittacosauru",
               "Quaesitosauru",
               "Rebbachisauru",
               "Rhabdodo",
               "Rhoetosauru",
               "Rincheni",
               "Riojasauru",
               "Saichania",
               "Saltasaurus",
               "Sarcosaurus",
               "Saurolophus",
               "Sauropelta",
               "Saurophaganax",
               "Saurornithoides",
               "Scelidosaurus",
               "Scutellosaurus",
               "Secernosaurus",
               "Segisaurus",
               "Segnosaurus",
               "Shanag",
               "Shantungosaurus",
               "Shunosaurus",
               "Shuvuuia",
               "Silvisaurus",
               "Sinocalliopteryx",
               "Sinornithosaurus",
               "Sinosauropteryx",
               "Sinovenator",
               "Sinraptor",
               "Sonidosaurus",
               "Spinosaurus",
               "Staurikosaurus",
               "Stegoceras",
               "Stegosaurus",
               "Stenopelix",
               "Struthiomimus",
               "Struthiosaurus",
               "Styracosaurus",
               "Suchomimus",
               "Supersaurus",
               "Talarurus",
               "Tarbosaurus",
               "Tarchia",
               "Telmatosaurus",
               "Tenontosaurus",
               "Thecodontosaurus",
               "Thescelosaurus",
               "Torosaurus",
               "Torvosaurus",
               "Triceratops",
               "Troodon",
               "Tsintaosaurus",
               "Tuojiangosaurus",
               "Tylocephale",
               "Tyrannosaurus",
               "Unenlagia",
               "Urbacodon",
               "Utahraptor",
               "Valdosaurus",
               "Velociraptor",
               "Vulcanodon",
               "Yandusaurus",
               "Yangchuanosaurus",
               "Yimenosaurus",
               "Yinlong",
               "Yuanmousaurus",
               "Yunnanosaurus",
               "Zalmoxes",
               "Zephyrosaurus"
               ]
        timer = Timer()
        for dinosaur in dinosaur_names:
            timer.setTimeout(self.print_type(dinosaur), 1000)
        for dinosaur in dinosaur_names:
            timer.setTimeout(self.print_length(dinosaur), 1000)


if __name__ == '__main__':
    scraper = NaturalHistoryMuseumScraper()
    print("Dinosaur lengths and types below:")
    scraper.lengths_and_types()
    print("Dinosaur name pronunciations below:")
    scraper.pronunciations()
    print("Dinosaur name meanings below:")
    scraper.meanings()
