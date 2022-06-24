const US_LOCATIONS = [
  {
    text: 'None'
  },
  {
    text: 'Autauga, AL'
  },
  {
    text: 'Baldwin, AL'
  },
  {
    text: 'Barbour, AL'
  },
  {
    text: 'Bibb, AL'
  },
  {
    text: 'Blount, AL'
  },
  {
    text: 'Bullock, AL'
  },
  {
    text: 'Butler, AL'
  },
  {
    text: 'Calhoun, AL'
  },
  {
    text: 'Chambers, AL'
  },
  {
    text: 'Cherokee, AL'
  },
  {
    text: 'Chilton, AL'
  },
  {
    text: 'Choctaw, AL'
  },
  {
    text: 'Clarke, AL'
  },
  {
    text: 'Clay, AL'
  },
  {
    text: 'Cleburne, AL'
  },
  {
    text: 'Coffee, AL'
  },
  {
    text: 'Colbert, AL'
  },
  {
    text: 'Conecuh, AL'
  },
  {
    text: 'Coosa, AL'
  },
  {
    text: 'Covington, AL'
  },
  {
    text: 'Crenshaw, AL'
  },
  {
    text: 'Cullman, AL'
  },
  {
    text: 'Dale, AL'
  },
  {
    text: 'Dallas, AL'
  },
  {
    text: 'DeKalb, AL'
  },
  {
    text: 'Elmore, AL'
  },
  {
    text: 'Escambia, AL'
  },
  {
    text: 'Etowah, AL'
  },
  {
    text: 'Fayette, AL'
  },
  {
    text: 'Franklin, AL'
  },
  {
    text: 'Geneva, AL'
  },
  {
    text: 'Greene, AL'
  },
  {
    text: 'Hale, AL'
  },
  {
    text: 'Henry, AL'
  },
  {
    text: 'Houston, AL'
  },
  {
    text: 'Jackson, AL'
  },
  {
    text: 'Jefferson, AL'
  },
  {
    text: 'Lamar, AL'
  },
  {
    text: 'Lauderdale, AL'
  },
  {
    text: 'Lawrence, AL'
  },
  {
    text: 'Lee, AL'
  },
  {
    text: 'Limestone, AL'
  },
  {
    text: 'Lowndes, AL'
  },
  {
    text: 'Macon, AL'
  },
  {
    text: 'Madison, AL'
  },
  {
    text: 'Marengo, AL'
  },
  {
    text: 'Marion, AL'
  },
  {
    text: 'Marshall, AL'
  },
  {
    text: 'Mobile, AL'
  },
  {
    text: 'Monroe, AL'
  },
  {
    text: 'Montgomery, AL'
  },
  {
    text: 'Morgan, AL'
  },
  {
    text: 'Perry, AL'
  },
  {
    text: 'Pickens, AL'
  },
  {
    text: 'Pike, AL'
  },
  {
    text: 'Randolph, AL'
  },
  {
    text: 'Russell, AL'
  },
  {
    text: 'St. Clair, AL'
  },
  {
    text: 'Shelby, AL'
  },
  {
    text: 'Sumter, AL'
  },
  {
    text: 'Talladega, AL'
  },
  {
    text: 'Tallapoosa, AL'
  },
  {
    text: 'Tuscaloosa, AL'
  },
  {
    text: 'Walker, AL'
  },
  {
    text: 'Washington, AL'
  },
  {
    text: 'Wilcox, AL'
  },
  {
    text: 'Winston, AL'
  },
  {
    text: 'Auburn, AL'
  },
  {
    text: 'Birmingham, AL'
  },
  {
    text: 'Decatur, AL'
  },
  {
    text: 'Dothan, AL'
  },
  {
    text: 'Hoover, AL'
  },
  {
    text: 'Huntsville, AL'
  },
  {
    text: 'Madison, AL'
  },
  {
    text: 'Mobile, AL'
  },
  {
    text: 'Montgomery, AL'
  },
  {
    text: 'Tuscaloosa, AL'
  },
  {
    text: 'Aleutians East, AK'
  },
  {
    text: 'Aleutians West, AK'
  },
  {
    text: 'Anchorage, AK'
  },
  {
    text: 'Bethel, AK'
  },
  {
    text: 'Bristol Bay, AK'
  },
  {
    text: 'Denali, AK'
  },
  {
    text: 'Dillingham, AK'
  },
  {
    text: 'Fairbanks North Star, AK'
  },
  {
    text: 'Haines, AK'
  },
  {
    text: 'Hoonah-Angoon, AK'
  },
  {
    text: 'Juneau, AK'
  },
  {
    text: 'Kenai Peninsula, AK'
  },
  {
    text: 'Ketchikan Gateway, AK'
  },
  {
    text: 'Kodiak Island, AK'
  },
  {
    text: 'Lake and Peninsula, AK'
  },
  {
    text: 'Matanuska-Susitna, AK'
  },
  {
    text: 'Nome, AK'
  },
  {
    text: 'North Slope, AK'
  },
  {
    text: 'Northwest Arctic, AK'
  },
  {
    text: 'Petersburg, AK'
  },
  {
    text: 'Prince of Wales-Hyder, AK'
  },
  {
    text: 'Sitka, AK'
  },
  {
    text: 'Skagway, AK'
  },
  {
    text: 'Southeast Fairbanks, AK'
  },
  {
    text: 'Valdez-Cordova, AK'
  },
  {
    text: 'Wade Hampton, AK'
  },
  {
    text: 'Wrangell, AK'
  },
  {
    text: 'Yakutat, AK'
  },
  {
    text: 'Yukon-Koyukuk, AK'
  },
  {
    text: 'Anchorage, AK'
  },
  {
    text: 'Apache, AZ'
  },
  {
    text: 'Cochise, AZ'
  },
  {
    text: 'Coconino, AZ'
  },
  {
    text: 'Gila, AZ'
  },
  {
    text: 'Graham, AZ'
  },
  {
    text: 'Greenlee, AZ'
  },
  {
    text: 'La Paz, AZ'
  },
  {
    text: 'Maricopa, AZ'
  },
  {
    text: 'Mohave, AZ'
  },
  {
    text: 'Navajo, AZ'
  },
  {
    text: 'Pima, AZ'
  },
  {
    text: 'Pinal, AZ'
  },
  {
    text: 'Santa Cruz, AZ'
  },
  {
    text: 'Yavapai, AZ'
  },
  {
    text: 'Yuma, AZ'
  },
  {
    text: 'Apache Junction, AZ'
  },
  {
    text: 'Avondale, AZ'
  },
  {
    text: 'Buckeye, AZ'
  },
  {
    text: 'Bullhead City, AZ'
  },
  {
    text: 'Casa Grande, AZ'
  },
  {
    text: 'Casas Adobes, AZ'
  },
  {
    text: 'Catalina Foothills, AZ'
  },
  {
    text: 'Chandler, AZ'
  },
  {
    text: 'Flagstaff, AZ'
  },
  {
    text: 'Gilbert, AZ'
  },
  {
    text: 'Glendale, AZ'
  },
  {
    text: 'Goodyear, AZ'
  },
  {
    text: 'Lake Havasu City, AZ'
  },
  {
    text: 'Maricopa, AZ'
  },
  {
    text: 'Mesa, AZ'
  },
  {
    text: 'Oro Valley, AZ'
  },
  {
    text: 'Peoria, AZ'
  },
  {
    text: 'Phoenix, AZ'
  },
  {
    text: 'Prescott, AZ'
  },
  {
    text: 'Prescott Valley, AZ'
  },
  {
    text: 'San Tan Valley, AZ'
  },
  {
    text: 'Scottsdale, AZ'
  },
  {
    text: 'Sierra Vista, AZ'
  },
  {
    text: 'Surprise, AZ'
  },
  {
    text: 'Tempe, AZ'
  },
  {
    text: 'Tucson, AZ'
  },
  {
    text: 'Yuma, AZ'
  },
  {
    text: 'Arkansas, AR'
  },
  {
    text: 'Ashley, AR'
  },
  {
    text: 'Baxter, AR'
  },
  {
    text: 'Benton, AR'
  },
  {
    text: 'Boone, AR'
  },
  {
    text: 'Bradley, AR'
  },
  {
    text: 'Calhoun, AR'
  },
  {
    text: 'Carroll, AR'
  },
  {
    text: 'Chicot, AR'
  },
  {
    text: 'Clark, AR'
  },
  {
    text: 'Clay, AR'
  },
  {
    text: 'Cleburne, AR'
  },
  {
    text: 'Cleveland, AR'
  },
  {
    text: 'Columbia, AR'
  },
  {
    text: 'Conway, AR'
  },
  {
    text: 'Craighead, AR'
  },
  {
    text: 'Crawford, AR'
  },
  {
    text: 'Crittenden, AR'
  },
  {
    text: 'Cross, AR'
  },
  {
    text: 'Dallas, AR'
  },
  {
    text: 'Desha, AR'
  },
  {
    text: 'Drew, AR'
  },
  {
    text: 'Faulkner, AR'
  },
  {
    text: 'Franklin, AR'
  },
  {
    text: 'Fulton, AR'
  },
  {
    text: 'Garland, AR'
  },
  {
    text: 'Grant, AR'
  },
  {
    text: 'Greene, AR'
  },
  {
    text: 'Hempstead, AR'
  },
  {
    text: 'Hot Spring, AR'
  },
  {
    text: 'Howard, AR'
  },
  {
    text: 'Independence, AR'
  },
  {
    text: 'Izard, AR'
  },
  {
    text: 'Jackson, AR'
  },
  {
    text: 'Jefferson, AR'
  },
  {
    text: 'Johnson, AR'
  },
  {
    text: 'Lafayette, AR'
  },
  {
    text: 'Lawrence, AR'
  },
  {
    text: 'Lee, AR'
  },
  {
    text: 'Lincoln, AR'
  },
  {
    text: 'Little River, AR'
  },
  {
    text: 'Logan, AR'
  },
  {
    text: 'Lonoke, AR'
  },
  {
    text: 'Madison, AR'
  },
  {
    text: 'Marion, AR'
  },
  {
    text: 'Miller, AR'
  },
  {
    text: 'Mississippi, AR'
  },
  {
    text: 'Monroe, AR'
  },
  {
    text: 'Montgomery, AR'
  },
  {
    text: 'Nevada, AR'
  },
  {
    text: 'Newton, AR'
  },
  {
    text: 'Ouachita, AR'
  },
  {
    text: 'Perry, AR'
  },
  {
    text: 'Phillips, AR'
  },
  {
    text: 'Pike, AR'
  },
  {
    text: 'Poinsett, AR'
  },
  {
    text: 'Polk, AR'
  },
  {
    text: 'Pope, AR'
  },
  {
    text: 'Prairie, AR'
  },
  {
    text: 'Pulaski, AR'
  },
  {
    text: 'Randolph, AR'
  },
  {
    text: 'St. Francis, AR'
  },
  {
    text: 'Saline, AR'
  },
  {
    text: 'Scott, AR'
  },
  {
    text: 'Searcy, AR'
  },
  {
    text: 'Sebastian, AR'
  },
  {
    text: 'Sevier, AR'
  },
  {
    text: 'Sharp, AR'
  },
  {
    text: 'Stone, AR'
  },
  {
    text: 'Union, AR'
  },
  {
    text: 'Van Buren, AR'
  },
  {
    text: 'Washington, AR'
  },
  {
    text: 'White, AR'
  },
  {
    text: 'Woodruff, AR'
  },
  {
    text: 'Yell, AR'
  },
  {
    text: 'Conway, AR'
  },
  {
    text: 'Fayetteville, AR'
  },
  {
    text: 'Fort Smith, AR'
  },
  {
    text: 'Jonesboro, AR'
  },
  {
    text: 'Little Rock, AR'
  },
  {
    text: 'North Little Rock, AR'
  },
  {
    text: 'Pine Bluff, AR'
  },
  {
    text: 'Rogers, AR'
  },
  {
    text: 'Springdale, AR'
  },
  {
    text: 'Alameda, CA'
  },
  {
    text: 'Alpine, CA'
  },
  {
    text: 'Amador, CA'
  },
  {
    text: 'Butte, CA'
  },
  {
    text: 'Calaveras, CA'
  },
  {
    text: 'Colusa, CA'
  },
  {
    text: 'Contra Costa, CA'
  },
  {
    text: 'Del Norte, CA'
  },
  {
    text: 'El Dorado, CA'
  },
  {
    text: 'Fresno, CA'
  },
  {
    text: 'Glenn, CA'
  },
  {
    text: 'Humboldt, CA'
  },
  {
    text: 'Imperial, CA'
  },
  {
    text: 'Inyo, CA'
  },
  {
    text: 'Kern, CA'
  },
  {
    text: 'Kings, CA'
  },
  {
    text: 'Lake, CA'
  },
  {
    text: 'Lassen, CA'
  },
  {
    text: 'Los Angeles, CA'
  },
  {
    text: 'Madera, CA'
  },
  {
    text: 'Marin, CA'
  },
  {
    text: 'Mariposa, CA'
  },
  {
    text: 'Mendocino, CA'
  },
  {
    text: 'Merced, CA'
  },
  {
    text: 'Modoc, CA'
  },
  {
    text: 'Mono, CA'
  },
  {
    text: 'Monterey, CA'
  },
  {
    text: 'Napa, CA'
  },
  {
    text: 'Nevada, CA'
  },
  {
    text: 'Orange, CA'
  },
  {
    text: 'Placer, CA'
  },
  {
    text: 'Plumas, CA'
  },
  {
    text: 'Riverside, CA'
  },
  {
    text: 'Sacramento, CA'
  },
  {
    text: 'San Benito, CA'
  },
  {
    text: 'San Bernardino, CA'
  },
  {
    text: 'San Diego, CA'
  },
  {
    text: 'San Francisco, CA'
  },
  {
    text: 'San Joaquin, CA'
  },
  {
    text: 'San Luis Obispo, CA'
  },
  {
    text: 'San Mateo, CA'
  },
  {
    text: 'Santa Barbara, CA'
  },
  {
    text: 'Santa Clara, CA'
  },
  {
    text: 'Santa Cruz, CA'
  },
  {
    text: 'Shasta, CA'
  },
  {
    text: 'Sierra, CA'
  },
  {
    text: 'Siskiyou, CA'
  },
  {
    text: 'Solano, CA'
  },
  {
    text: 'Sonoma, CA'
  },
  {
    text: 'Stanislaus, CA'
  },
  {
    text: 'Sutter, CA'
  },
  {
    text: 'Tehama, CA'
  },
  {
    text: 'Trinity, CA'
  },
  {
    text: 'Tulare, CA'
  },
  {
    text: 'Tuolumne, CA'
  },
  {
    text: 'Ventura, CA'
  },
  {
    text: 'Yolo, CA'
  },
  {
    text: 'Yuba, CA'
  },
  {
    text: 'Alameda, CA'
  },
  {
    text: 'Alhambra, CA'
  },
  {
    text: 'Aliso Viejo, CA'
  },
  {
    text: 'Altadena, CA'
  },
  {
    text: 'Anaheim, CA'
  },
  {
    text: 'Antelope North Rd, CA'
  },
  {
    text: 'Antioch, CA'
  },
  {
    text: 'Apple Valley, CA'
  },
  {
    text: 'Arcadia, CA'
  },
  {
    text: 'Arden-Arcade, CA'
  },
  {
    text: 'Azusa, CA'
  },
  {
    text: 'Bakersfield, CA'
  },
  {
    text: 'Baldwin Park, CA'
  },
  {
    text: 'Beaumont, CA'
  },
  {
    text: 'Bellflower, CA'
  },
  {
    text: 'Bell Gardens, CA'
  },
  {
    text: 'Berkeley, CA'
  },
  {
    text: 'Brentwood, CA'
  },
  {
    text: 'Buena Park, CA'
  },
  {
    text: 'Burbank, CA'
  },
  {
    text: 'Calexico, CA'
  },
  {
    text: 'Camarillo, CA'
  },
  {
    text: 'Carlsbad, CA'
  },
  {
    text: 'Carmichael, CA'
  },
  {
    text: 'Carson, CA'
  },
  {
    text: 'Castro Valley, CA'
  },
  {
    text: 'Cathedral City, CA'
  },
  {
    text: 'Ceres, CA'
  },
  {
    text: 'Cerritos, CA'
  },
  {
    text: 'Chico, CA'
  },
  {
    text: 'Chino, CA'
  },
  {
    text: 'Chino Hills, CA'
  },
  {
    text: 'Chula Vista, CA'
  },
  {
    text: 'Citrus Heights, CA'
  },
  {
    text: 'Clovis, CA'
  },
  {
    text: 'Coachella, CA'
  },
  {
    text: 'Colton, CA'
  },
  {
    text: 'Compton, CA'
  },
  {
    text: 'Concord, CA'
  },
  {
    text: 'Corona, CA'
  },
  {
    text: 'Costa Mesa, CA'
  },
  {
    text: 'Covina, CA'
  },
  {
    text: 'Cupertino, CA'
  },
  {
    text: 'Cypress, CA'
  },
  {
    text: 'Daly City, CA'
  },
  {
    text: 'Danville, CA'
  },
  {
    text: 'Davis, CA'
  },
  {
    text: 'Delano, CA'
  },
  {
    text: 'Diamond Bar, CA'
  },
  {
    text: 'Downey, CA'
  },
  {
    text: 'Dublin, CA'
  },
  {
    text: 'East Los Angeles, CA'
  },
  {
    text: 'Los Angeles, CA'
  },
  {
    text: 'El Cajon, CA'
  },
  {
    text: 'El Centro, CA'
  },
  {
    text: 'El Dorado Hills, CA'
  },
  {
    text: 'Elk Grove, CA'
  },
  {
    text: 'El Monte, CA'
  },
  {
    text: 'Encinitas, CA'
  },
  {
    text: 'Escondido, CA'
  },
  {
    text: 'Fairfield, CA'
  },
  {
    text: 'Florence-Graham, CA'
  },
  {
    text: 'Florin, CA'
  },
  {
    text: 'Folsom, CA'
  },
  {
    text: 'Fontana, CA'
  },
  {
    text: 'Fountain Valley, CA'
  },
  {
    text: 'Fremont, CA'
  },
  {
    text: 'Fresno, CA'
  },
  {
    text: 'Fullerton, CA'
  },
  {
    text: 'Gardena, CA'
  },
  {
    text: 'Garden Grove, CA'
  },
  {
    text: 'Glendale, CA'
  },
  {
    text: 'Glendora, CA'
  },
  {
    text: 'Hacienda Heights, CA'
  },
  {
    text: 'Hawthorne, CA'
  },
  {
    text: 'Hayward, CA'
  },
  {
    text: 'Hemet, CA'
  },
  {
    text: 'Hesperia, CA'
  },
  {
    text: 'Highland, CA'
  },
  {
    text: 'Huntington Beach, CA'
  },
  {
    text: 'Huntington Park, CA'
  },
  {
    text: 'Indio, CA'
  },
  {
    text: 'Inglewood, CA'
  },
  {
    text: 'Irvine, CA'
  },
  {
    text: 'Laguna Niguel, CA'
  },
  {
    text: 'La Habra, CA'
  },
  {
    text: 'Lake Elsinore, CA'
  },
  {
    text: 'Lake Forest, CA'
  },
  {
    text: 'Lakewood, CA'
  },
  {
    text: 'La Mesa, CA'
  },
  {
    text: 'La Mirada, CA'
  },
  {
    text: 'Lancaster, CA'
  },
  {
    text: 'La Quinta, CA'
  },
  {
    text: 'Lincoln, CA'
  },
  {
    text: 'Livermore, CA'
  },
  {
    text: 'Lodi, CA'
  },
  {
    text: 'Lompoc, CA'
  },
  {
    text: 'Long Beach, CA'
  },
  {
    text: 'Lynwood, CA'
  },
  {
    text: 'Madera, CA'
  },
  {
    text: 'Manteca, CA'
  },
  {
    text: 'Menifee, CA'
  },
  {
    text: 'Merced, CA'
  },
  {
    text: 'Milpitas, CA'
  },
  {
    text: 'Mission Viejo, CA'
  },
  {
    text: 'Modesto, CA'
  },
  {
    text: 'Montebello, CA'
  },
  {
    text: 'Monterey Park, CA'
  },
  {
    text: 'Moreno Valley, CA'
  },
  {
    text: 'Mountain View, CA'
  },
  {
    text: 'Murrieta, CA'
  },
  {
    text: 'Napa, CA'
  },
  {
    text: 'National City, CA'
  },
  {
    text: 'Newark, CA'
  },
  {
    text: 'Newport Beach, CA'
  },
  {
    text: 'North Highlands, CA'
  },
  {
    text: 'Norwalk, CA'
  },
  {
    text: 'Novato, CA'
  },
  {
    text: 'Oakland, CA'
  },
  {
    text: 'Oceanside, CA'
  },
  {
    text: 'Ontario, CA'
  },
  {
    text: 'Orange, CA'
  },
  {
    text: 'Oxnard, CA'
  },
  {
    text: 'Palmdale, CA'
  },
  {
    text: 'Palm Desert, CA'
  },
  {
    text: 'Palm Springs, CA'
  },
  {
    text: 'Palo Alto, CA'
  },
  {
    text: 'Paramount, CA'
  },
  {
    text: 'Pasadena, CA'
  },
  {
    text: 'Perris, CA'
  },
  {
    text: 'Petaluma, CA'
  },
  {
    text: 'Pico Rivera, CA'
  },
  {
    text: 'Pittsburg, CA'
  },
  {
    text: 'Placentia, CA'
  },
  {
    text: 'Pleasanton, CA'
  },
  {
    text: 'Pomona, CA'
  },
  {
    text: 'Poway, CA'
  },
  {
    text: 'Rancho Cordova, CA'
  },
  {
    text: 'Rancho Cucamonga, CA'
  },
  {
    text: 'Rancho Palos Verdes, CA'
  },
  {
    text: 'Rancho Santa Margarita, CA'
  },
  {
    text: 'Redding, CA'
  },
  {
    text: 'Redlands, CA'
  },
  {
    text: 'Redondo Beach, CA'
  },
  {
    text: 'Redwood City, CA'
  },
  {
    text: 'Rialto, CA'
  },
  {
    text: 'Richmond, CA'
  },
  {
    text: 'Riverside, CA'
  },
  {
    text: 'Rocklin, CA'
  },
  {
    text: 'Rohnert Park, CA'
  },
  {
    text: 'Rosemead, CA'
  },
  {
    text: 'Roseville, CA'
  },
  {
    text: 'Rowland Heights, CA'
  },
  {
    text: 'Sacramento, CA'
  },
  {
    text: 'Salinas, CA'
  },
  {
    text: 'San Bernardino, CA'
  },
  {
    text: 'San Bruno, CA'
  },
  {
    text: 'Ventura, CA'
  },
  {
    text: 'San Clemente, CA'
  },
  {
    text: 'San Diego, CA'
  },
  {
    text: 'San Francisco, CA'
  },
  {
    text: 'San Jacinto, CA'
  },
  {
    text: 'San Jose, CA'
  },
  {
    text: 'San Leandro, CA'
  },
  {
    text: 'San Lorenzo, CA'
  },
  {
    text: 'San Luis Obispo, CA'
  },
  {
    text: 'San Marcos, CA'
  },
  {
    text: 'San Mateo, CA'
  },
  {
    text: 'San Rafael, CA'
  },
  {
    text: 'San Ramon, CA'
  },
  {
    text: 'Santa Ana, CA'
  },
  {
    text: 'Santa Barbara, CA'
  },
  {
    text: 'Santa Clara, CA'
  },
  {
    text: 'Santa Clarita, CA'
  },
  {
    text: 'Santa Cruz, CA'
  },
  {
    text: 'Santa Maria, CA'
  },
  {
    text: 'Santa Monica, CA'
  },
  {
    text: 'Santa Rosa, CA'
  },
  {
    text: 'Santee, CA'
  },
  {
    text: 'Simi Valley, CA'
  },
  {
    text: 'South Gate, CA'
  },
  {
    text: 'South San Francisco, CA'
  },
  {
    text: 'South Whittier, CA'
  },
  {
    text: 'Stockton, CA'
  },
  {
    text: 'Sunnyvale, CA'
  },
  {
    text: 'Temecula, CA'
  },
  {
    text: 'Thousand Oaks, CA'
  },
  {
    text: 'Torrance, CA'
  },
  {
    text: 'Tracy, CA'
  },
  {
    text: 'Turlock, CA'
  },
  {
    text: 'Tustin, CA'
  },
  {
    text: 'Union City, CA'
  },
  {
    text: 'Upland, CA'
  },
  {
    text: 'Vacaville, CA'
  },
  {
    text: 'Vallejo, CA'
  },
  {
    text: 'Victorville, CA'
  },
  {
    text: 'Visalia, CA'
  },
  {
    text: 'Vista, CA'
  },
  {
    text: 'Walnut Creek, CA'
  },
  {
    text: 'Watsonville, CA'
  },
  {
    text: 'West Covina, CA'
  },
  {
    text: 'Westminster, CA'
  },
  {
    text: 'West Sacramento, CA'
  },
  {
    text: 'Whittier, CA'
  },
  {
    text: 'Woodland, CA'
  },
  {
    text: 'Yorba Linda, CA'
  },
  {
    text: 'Yuba City, CA'
  },
  {
    text: 'Yucaipa, CA'
  },
  {
    text: 'Adams, CO'
  },
  {
    text: 'Alamosa, CO'
  },
  {
    text: 'Arapahoe, CO'
  },
  {
    text: 'Archuleta, CO'
  },
  {
    text: 'Baca, CO'
  },
  {
    text: 'Bent, CO'
  },
  {
    text: 'Boulder, CO'
  },
  {
    text: 'Broomfield, CO'
  },
  {
    text: 'Chaffee, CO'
  },
  {
    text: 'Cheyenne, CO'
  },
  {
    text: 'Clear Creek, CO'
  },
  {
    text: 'Conejos, CO'
  },
  {
    text: 'Costilla, CO'
  },
  {
    text: 'Crowley, CO'
  },
  {
    text: 'Custer, CO'
  },
  {
    text: 'Delta, CO'
  },
  {
    text: 'Denver, CO'
  },
  {
    text: 'Dolores, CO'
  },
  {
    text: 'Douglas, CO'
  },
  {
    text: 'Eagle, CO'
  },
  {
    text: 'Elbert, CO'
  },
  {
    text: 'El Paso, CO'
  },
  {
    text: 'Fremont, CO'
  },
  {
    text: 'Garfield, CO'
  },
  {
    text: 'Gilpin, CO'
  },
  {
    text: 'Grand, CO'
  },
  {
    text: 'Gunnison, CO'
  },
  {
    text: 'Hinsdale, CO'
  },
  {
    text: 'Huerfano, CO'
  },
  {
    text: 'Jackson, CO'
  },
  {
    text: 'Jefferson, CO'
  },
  {
    text: 'Kiowa, CO'
  },
  {
    text: 'Kit Carson, CO'
  },
  {
    text: 'Lake, CO'
  },
  {
    text: 'La Plata, CO'
  },
  {
    text: 'Larimer, CO'
  },
  {
    text: 'Las Animas, CO'
  },
  {
    text: 'Lincoln, CO'
  },
  {
    text: 'Logan, CO'
  },
  {
    text: 'Mesa, CO'
  },
  {
    text: 'Mineral, CO'
  },
  {
    text: 'Moffat, CO'
  },
  {
    text: 'Montezuma, CO'
  },
  {
    text: 'Montrose, CO'
  },
  {
    text: 'Morgan, CO'
  },
  {
    text: 'Otero, CO'
  },
  {
    text: 'Ouray, CO'
  },
  {
    text: 'Park, CO'
  },
  {
    text: 'Phillips, CO'
  },
  {
    text: 'Pitkin, CO'
  },
  {
    text: 'Prowers, CO'
  },
  {
    text: 'Pueblo, CO'
  },
  {
    text: 'Rio Blanco, CO'
  },
  {
    text: 'Rio Grande, CO'
  },
  {
    text: 'Routt, CO'
  },
  {
    text: 'Saguache, CO'
  },
  {
    text: 'San Juan, CO'
  },
  {
    text: 'San Miguel, CO'
  },
  {
    text: 'Sedgwick, CO'
  },
  {
    text: 'Summit, CO'
  },
  {
    text: 'Teller, CO'
  },
  {
    text: 'Washington, CO'
  },
  {
    text: 'Weld, CO'
  },
  {
    text: 'Yuma, CO'
  },
  {
    text: 'Arvada, CO'
  },
  {
    text: 'Aurora, CO'
  },
  {
    text: 'Boulder, CO'
  },
  {
    text: 'Broomfield, CO'
  },
  {
    text: 'Castle Rock, CO'
  },
  {
    text: 'Centennial, CO'
  },
  {
    text: 'Colorado Springs, CO'
  },
  {
    text: 'Commerce City, CO'
  },
  {
    text: 'Denver, CO'
  },
  {
    text: 'Fort Collins, CO'
  },
  {
    text: 'Grand Junction, CO'
  },
  {
    text: 'Greeley, CO'
  },
  {
    text: 'Highlands Ranch, CO'
  },
  {
    text: 'Lakewood, CO'
  },
  {
    text: 'Littleton, CO'
  },
  {
    text: 'Longmont, CO'
  },
  {
    text: 'Loveland, CO'
  },
  {
    text: 'Parker, CO'
  },
  {
    text: 'Pueblo, CO'
  },
  {
    text: 'Thornton, CO'
  },
  {
    text: 'Westminster, CO'
  },
  {
    text: 'Fairfield, CT'
  },
  {
    text: 'Hartford, CT'
  },
  {
    text: 'Litchfield, CT'
  },
  {
    text: 'Middlesex, CT'
  },
  {
    text: 'New Haven, CT'
  },
  {
    text: 'New London, CT'
  },
  {
    text: 'Tolland, CT'
  },
  {
    text: 'Windham, CT'
  },
  {
    text: 'Bridgeport, CT'
  },
  {
    text: 'Bristol, CT'
  },
  {
    text: 'Danbury, CT'
  },
  {
    text: 'East Hartford, CT'
  },
  {
    text: 'Hartford, CT'
  },
  {
    text: 'Meriden, CT'
  },
  {
    text: 'Middletown, CT'
  },
  {
    text: 'Milford, CT'
  },
  {
    text: 'New Britain, CT'
  },
  {
    text: 'New Haven, CT'
  },
  {
    text: 'Norwalk, CT'
  },
  {
    text: 'Stamford, CT'
  },
  {
    text: 'Stratford, CT'
  },
  {
    text: 'Waterbury, CT'
  },
  {
    text: 'West Hartford, CT'
  },
  {
    text: 'West Haven, CT'
  },
  {
    text: 'Kent, DE'
  },
  {
    text: 'New Castle, DE'
  },
  {
    text: 'Sussex, DE'
  },
  {
    text: 'Wilmington, DE'
  },
  {
    text: 'Alachua, FL'
  },
  {
    text: 'Baker, FL'
  },
  {
    text: 'Bay, FL'
  },
  {
    text: 'Bradford, FL'
  },
  {
    text: 'Brevard, FL'
  },
  {
    text: 'Broward, FL'
  },
  {
    text: 'Calhoun, FL'
  },
  {
    text: 'Charlotte, FL'
  },
  {
    text: 'Citrus, FL'
  },
  {
    text: 'Clay, FL'
  },
  {
    text: 'Collier, FL'
  },
  {
    text: 'Columbia, FL'
  },
  {
    text: 'DeSoto, FL'
  },
  {
    text: 'Dixie, FL'
  },
  {
    text: 'Duval, FL'
  },
  {
    text: 'Escambia, FL'
  },
  {
    text: 'Flagler, FL'
  },
  {
    text: 'Franklin, FL'
  },
  {
    text: 'Gadsden, FL'
  },
  {
    text: 'Gilchrist, FL'
  },
  {
    text: 'Glades, FL'
  },
  {
    text: 'Gulf, FL'
  },
  {
    text: 'Hamilton, FL'
  },
  {
    text: 'Hardee, FL'
  },
  {
    text: 'Hendry, FL'
  },
  {
    text: 'Hernando, FL'
  },
  {
    text: 'Highlands, FL'
  },
  {
    text: 'Hillsborough, FL'
  },
  {
    text: 'Holmes, FL'
  },
  {
    text: 'Indian River, FL'
  },
  {
    text: 'Jackson, FL'
  },
  {
    text: 'Jefferson, FL'
  },
  {
    text: 'Lafayette, FL'
  },
  {
    text: 'Lake, FL'
  },
  {
    text: 'Lee, FL'
  },
  {
    text: 'Leon, FL'
  },
  {
    text: 'Levy, FL'
  },
  {
    text: 'Liberty, FL'
  },
  {
    text: 'Madison, FL'
  },
  {
    text: 'Manatee, FL'
  },
  {
    text: 'Marion, FL'
  },
  {
    text: 'Martin, FL'
  },
  {
    text: 'Miami-Dade, FL'
  },
  {
    text: 'Monroe, FL'
  },
  {
    text: 'Nassau, FL'
  },
  {
    text: 'Okaloosa, FL'
  },
  {
    text: 'Okeechobee, FL'
  },
  {
    text: 'Orange, FL'
  },
  {
    text: 'Osceola, FL'
  },
  {
    text: 'Palm Beach, FL'
  },
  {
    text: 'Pasco, FL'
  },
  {
    text: 'Pinellas, FL'
  },
  {
    text: 'Polk, FL'
  },
  {
    text: 'Putnam, FL'
  },
  {
    text: 'St. Johns, FL'
  },
  {
    text: 'St. Lucie, FL'
  },
  {
    text: 'Santa Rosa, FL'
  },
  {
    text: 'Sarasota, FL'
  },
  {
    text: 'Seminole, FL'
  },
  {
    text: 'Sumter, FL'
  },
  {
    text: 'Suwannee, FL'
  },
  {
    text: 'Taylor, FL'
  },
  {
    text: 'Union, FL'
  },
  {
    text: 'Volusia, FL'
  },
  {
    text: 'Wakulla, FL'
  },
  {
    text: 'Walton, FL'
  },
  {
    text: 'Washington, FL'
  },
  {
    text: 'Alafaya, FL'
  },
  {
    text: 'Altamonte Springs, FL'
  },
  {
    text: 'Apopka, FL'
  },
  {
    text: 'Boca Raton, FL'
  },
  {
    text: 'Bonita Springs, FL'
  },
  {
    text: 'Boynton Beach, FL'
  },
  {
    text: 'Bradenton, FL'
  },
  {
    text: 'Brandon, FL'
  },
  {
    text: 'Cape Coral, FL'
  },
  {
    text: 'Clearwater, FL'
  },
  {
    text: 'Coconut Creek, FL'
  },
  {
    text: 'Coral Gables, FL'
  },
  {
    text: 'Coral Springs, FL'
  },
  {
    text: 'Country Club, FL'
  },
  {
    text: 'Cutler Bay, FL'
  },
  {
    text: 'Davie, FL'
  },
  {
    text: 'Daytona Beach, FL'
  },
  {
    text: 'Deerfield Beach, FL'
  },
  {
    text: 'Delray Beach, FL'
  },
  {
    text: 'Deltona, FL'
  },
  {
    text: 'Doral, FL'
  },
  {
    text: 'Fort Lauderdale, FL'
  },
  {
    text: 'Fort Myers, FL'
  },
  {
    text: 'Fort Pierce, FL'
  },
  {
    text: 'Fountainbleau, FL'
  },
  {
    text: 'Gainesville, FL'
  },
  {
    text: 'Hialeah, FL'
  },
  {
    text: 'Hollywood, FL'
  },
  {
    text: 'Homestead, FL'
  },
  {
    text: 'Jacksonville, FL'
  },
  {
    text: 'Jupiter, FL'
  },
  {
    text: 'Kendale Lakes, FL'
  },
  {
    text: 'Kendall, FL'
  },
  {
    text: 'Kissimmee, FL'
  },
  {
    text: 'Lakeland, FL'
  },
  {
    text: 'Largo, FL'
  },
  {
    text: 'Lauderhill, FL'
  },
  {
    text: 'Lehigh Acres, FL'
  },
  {
    text: 'Margate, FL'
  },
  {
    text: 'Melbourne, FL'
  },
  {
    text: 'Miami, FL'
  },
  {
    text: 'Miami Gardens, FL'
  },
  {
    text: 'Miramar, FL'
  },
  {
    text: 'North Lauderdale, FL'
  },
  {
    text: 'North Miami, FL'
  },
  {
    text: 'North Miami Beach, FL'
  },
  {
    text: 'North Port, FL'
  },
  {
    text: 'Oakland Park, FL'
  },
  {
    text: 'Ocala, FL'
  },
  {
    text: 'Orlando, FL'
  },
  {
    text: 'Palm Bay, FL'
  },
  {
    text: 'Palm Beach Gardens, FL'
  },
  {
    text: 'Palm Coast, FL'
  },
  {
    text: 'Palm Harbor, FL'
  },
  {
    text: 'Pembroke Pines, FL'
  },
  {
    text: 'Pensacola, FL'
  },
  {
    text: 'Pine Hills, FL'
  },
  {
    text: 'Pinellas Park, FL'
  },
  {
    text: 'Plantation, FL'
  },
  {
    text: 'Poinciana, FL'
  },
  {
    text: 'Pompano Beach, FL'
  },
  {
    text: 'Port Charlotte, FL'
  },
  {
    text: 'Port Orange, FL'
  },
  {
    text: 'Port St Lucie, FL'
  },
  {
    text: 'Riverview, FL'
  },
  {
    text: 'St Petersburg, FL'
  },
  {
    text: 'Sanford, FL'
  },
  {
    text: 'Sarasota, FL'
  },
  {
    text: 'Spring Hill, FL'
  },
  {
    text: 'Sunrise, FL'
  },
  {
    text: 'Tallahassee, FL'
  },
  {
    text: 'Tamarac, FL'
  },
  {
    text: 'Tamiami, FL'
  },
  {
    text: 'Tampa, FL'
  },
  {
    text: 'The Hammocks, FL'
  },
  {
    text: 'The Villages, FL'
  },
  {
    text: 'Titusville, FL'
  },
  {
    text: 'Town n Country, FL'
  },
  {
    text: 'Valrico, FL'
  },
  {
    text: 'Wellington, FL'
  },
  {
    text: 'Wesley Chapel, FL'
  },
  {
    text: 'Weston, FL'
  },
  {
    text: 'West Palm Beach, FL'
  },
  {
    text: 'Appling, GA'
  },
  {
    text: 'Atkinson, GA'
  },
  {
    text: 'Bacon, GA'
  },
  {
    text: 'Baker, GA'
  },
  {
    text: 'Baldwin, GA'
  },
  {
    text: 'Banks, GA'
  },
  {
    text: 'Barrow, GA'
  },
  {
    text: 'Bartow, GA'
  },
  {
    text: 'Ben Hill, GA'
  },
  {
    text: 'Berrien, GA'
  },
  {
    text: 'Bibb, GA'
  },
  {
    text: 'Bleckley, GA'
  },
  {
    text: 'Brantley, GA'
  },
  {
    text: 'Brooks, GA'
  },
  {
    text: 'Bryan, GA'
  },
  {
    text: 'Bulloch, GA'
  },
  {
    text: 'Burke, GA'
  },
  {
    text: 'Butts, GA'
  },
  {
    text: 'Calhoun, GA'
  },
  {
    text: 'Camden, GA'
  },
  {
    text: 'Candler, GA'
  },
  {
    text: 'Carroll, GA'
  },
  {
    text: 'Catoosa, GA'
  },
  {
    text: 'Charlton, GA'
  },
  {
    text: 'Chatham, GA'
  },
  {
    text: 'Chattahoochee, GA'
  },
  {
    text: 'Chattooga, GA'
  },
  {
    text: 'Cherokee, GA'
  },
  {
    text: 'Clarke, GA'
  },
  {
    text: 'Clay, GA'
  },
  {
    text: 'Clayton, GA'
  },
  {
    text: 'Clinch, GA'
  },
  {
    text: 'Cobb, GA'
  },
  {
    text: 'Coffee, GA'
  },
  {
    text: 'Colquitt, GA'
  },
  {
    text: 'Columbia, GA'
  },
  {
    text: 'Cook, GA'
  },
  {
    text: 'Coweta, GA'
  },
  {
    text: 'Crawford, GA'
  },
  {
    text: 'Crisp, GA'
  },
  {
    text: 'Dade, GA'
  },
  {
    text: 'Dawson, GA'
  },
  {
    text: 'Decatur, GA'
  },
  {
    text: 'DeKalb, GA'
  },
  {
    text: 'Dodge, GA'
  },
  {
    text: 'Dooly, GA'
  },
  {
    text: 'Dougherty, GA'
  },
  {
    text: 'Douglas, GA'
  },
  {
    text: 'Early, GA'
  },
  {
    text: 'Echols, GA'
  },
  {
    text: 'Effingham, GA'
  },
  {
    text: 'Elbert, GA'
  },
  {
    text: 'Emanuel, GA'
  },
  {
    text: 'Evans, GA'
  },
  {
    text: 'Fannin, GA'
  },
  {
    text: 'Fayette, GA'
  },
  {
    text: 'Floyd, GA'
  },
  {
    text: 'Forsyth, GA'
  },
  {
    text: 'Franklin, GA'
  },
  {
    text: 'Fulton, GA'
  },
  {
    text: 'Gilmer, GA'
  },
  {
    text: 'Glascock, GA'
  },
  {
    text: 'Glynn, GA'
  },
  {
    text: 'Gordon, GA'
  },
  {
    text: 'Grady, GA'
  },
  {
    text: 'Greene, GA'
  },
  {
    text: 'Gwinnett, GA'
  },
  {
    text: 'Habersham, GA'
  },
  {
    text: 'Hall, GA'
  },
  {
    text: 'Hancock, GA'
  },
  {
    text: 'Haralson, GA'
  },
  {
    text: 'Harris, GA'
  },
  {
    text: 'Hart, GA'
  },
  {
    text: 'Heard, GA'
  },
  {
    text: 'Henry, GA'
  },
  {
    text: 'Houston, GA'
  },
  {
    text: 'Irwin, GA'
  },
  {
    text: 'Jackson, GA'
  },
  {
    text: 'Jasper, GA'
  },
  {
    text: 'Jeff Davis, GA'
  },
  {
    text: 'Jefferson, GA'
  },
  {
    text: 'Jenkins, GA'
  },
  {
    text: 'Johnson, GA'
  },
  {
    text: 'Jones, GA'
  },
  {
    text: 'Lamar, GA'
  },
  {
    text: 'Lanier, GA'
  },
  {
    text: 'Laurens, GA'
  },
  {
    text: 'Lee, GA'
  },
  {
    text: 'Liberty, GA'
  },
  {
    text: 'Lincoln, GA'
  },
  {
    text: 'Long, GA'
  },
  {
    text: 'Lowndes, GA'
  },
  {
    text: 'Lumpkin, GA'
  },
  {
    text: 'McDuffie, GA'
  },
  {
    text: 'McIntosh, GA'
  },
  {
    text: 'Macon, GA'
  },
  {
    text: 'Madison, GA'
  },
  {
    text: 'Marion, GA'
  },
  {
    text: 'Meriwether, GA'
  },
  {
    text: 'Miller, GA'
  },
  {
    text: 'Mitchell, GA'
  },
  {
    text: 'Monroe, GA'
  },
  {
    text: 'Montgomery, GA'
  },
  {
    text: 'Morgan, GA'
  },
  {
    text: 'Murray, GA'
  },
  {
    text: 'Muscogee, GA'
  },
  {
    text: 'Newton, GA'
  },
  {
    text: 'Oconee, GA'
  },
  {
    text: 'Oglethorpe, GA'
  },
  {
    text: 'Paulding, GA'
  },
  {
    text: 'Peach, GA'
  },
  {
    text: 'Pickens, GA'
  },
  {
    text: 'Pierce, GA'
  },
  {
    text: 'Pike, GA'
  },
  {
    text: 'Polk, GA'
  },
  {
    text: 'Pulaski, GA'
  },
  {
    text: 'Putnam, GA'
  },
  {
    text: 'Quitman, GA'
  },
  {
    text: 'Rabun, GA'
  },
  {
    text: 'Randolph, GA'
  },
  {
    text: 'Richmond, GA'
  },
  {
    text: 'Rockdale, GA'
  },
  {
    text: 'Schley, GA'
  },
  {
    text: 'Screven, GA'
  },
  {
    text: 'Seminole, GA'
  },
  {
    text: 'Spalding, GA'
  },
  {
    text: 'Stephens, GA'
  },
  {
    text: 'Stewart, GA'
  },
  {
    text: 'Sumter, GA'
  },
  {
    text: 'Talbot, GA'
  },
  {
    text: 'Taliaferro, GA'
  },
  {
    text: 'Tattnall, GA'
  },
  {
    text: 'Taylor, GA'
  },
  {
    text: 'Telfair, GA'
  },
  {
    text: 'Terrell, GA'
  },
  {
    text: 'Thomas, GA'
  },
  {
    text: 'Tift, GA'
  },
  {
    text: 'Toombs, GA'
  },
  {
    text: 'Towns, GA'
  },
  {
    text: 'Treutlen, GA'
  },
  {
    text: 'Troup, GA'
  },
  {
    text: 'Turner, GA'
  },
  {
    text: 'Twiggs, GA'
  },
  {
    text: 'Union, GA'
  },
  {
    text: 'Upson, GA'
  },
  {
    text: 'Walker, GA'
  },
  {
    text: 'Walton, GA'
  },
  {
    text: 'Ware, GA'
  },
  {
    text: 'Warren, GA'
  },
  {
    text: 'Washington, GA'
  },
  {
    text: 'Wayne, GA'
  },
  {
    text: 'Webster, GA'
  },
  {
    text: 'Wheeler, GA'
  },
  {
    text: 'White, GA'
  },
  {
    text: 'Whitfield, GA'
  },
  {
    text: 'Wilcox, GA'
  },
  {
    text: 'Wilkes, GA'
  },
  {
    text: 'Wilkinson, GA'
  },
  {
    text: 'Worth, GA'
  },
  {
    text: 'Albany, GA'
  },
  {
    text: 'Alpharetta, GA'
  },
  {
    text: 'Athens, GA'
  },
  {
    text: 'Atlanta, GA'
  },
  {
    text: 'Augusta, GA'
  },
  {
    text: 'Columbus, GA'
  },
  {
    text: 'Dunwoody, GA'
  },
  {
    text: 'Johns Creek, GA'
  },
  {
    text: 'Macon, GA'
  },
  {
    text: 'Marietta, GA'
  },
  {
    text: 'North Atlanta, GA'
  },
  {
    text: 'Roswell, GA'
  },
  {
    text: 'Sandy Springs, GA'
  },
  {
    text: 'Savannah, GA'
  },
  {
    text: 'Smyrna, GA'
  },
  {
    text: 'Valdosta, GA'
  },
  {
    text: 'Warner Robins, GA'
  },
  {
    text: 'Hawaiʻi, HI'
  },
  {
    text: 'Honolulu, HI'
  },
  {
    text: 'Kalawao, HI'
  },
  {
    text: 'Kauaʻi, HI'
  },
  {
    text: 'Maui, HI'
  },
  {
    text: 'Honolulu, HI'
  },
  {
    text: 'Hilo, HI'
  },
  {
    text: 'Pearl City, HI'
  },
  {
    text: 'Ada, ID'
  },
  {
    text: 'Adams, ID'
  },
  {
    text: 'Bannock, ID'
  },
  {
    text: 'Bear Lake, ID'
  },
  {
    text: 'Benewah, ID'
  },
  {
    text: 'Bingham, ID'
  },
  {
    text: 'Blaine, ID'
  },
  {
    text: 'Boise, ID'
  },
  {
    text: 'Bonner, ID'
  },
  {
    text: 'Bonneville, ID'
  },
  {
    text: 'Boundary, ID'
  },
  {
    text: 'Butte, ID'
  },
  {
    text: 'Camas, ID'
  },
  {
    text: 'Canyon, ID'
  },
  {
    text: 'Caribou, ID'
  },
  {
    text: 'Cassia, ID'
  },
  {
    text: 'Clark, ID'
  },
  {
    text: 'Clearwater, ID'
  },
  {
    text: 'Custer, ID'
  },
  {
    text: 'Elmore, ID'
  },
  {
    text: 'Franklin, ID'
  },
  {
    text: 'Fremont, ID'
  },
  {
    text: 'Gem, ID'
  },
  {
    text: 'Gooding, ID'
  },
  {
    text: 'Idaho, ID'
  },
  {
    text: 'Jefferson, ID'
  },
  {
    text: 'Jerome, ID'
  },
  {
    text: 'Kootenai, ID'
  },
  {
    text: 'Latah, ID'
  },
  {
    text: 'Lemhi, ID'
  },
  {
    text: 'Lewis, ID'
  },
  {
    text: 'Lincoln, ID'
  },
  {
    text: 'Madison, ID'
  },
  {
    text: 'Minidoka, ID'
  },
  {
    text: 'Nez Perce, ID'
  },
  {
    text: 'Oneida, ID'
  },
  {
    text: 'Owyhee, ID'
  },
  {
    text: 'Payette, ID'
  },
  {
    text: 'Power, ID'
  },
  {
    text: 'Shoshone, ID'
  },
  {
    text: 'Teton, ID'
  },
  {
    text: 'Twin Falls, ID'
  },
  {
    text: 'Valley, ID'
  },
  {
    text: 'Washington, ID'
  },
  {
    text: 'Boise, ID'
  },
  {
    text: 'Caldwell, ID'
  },
  {
    text: 'Coeur dAlene, ID'
  },
  {
    text: 'Idaho Falls, ID'
  },
  {
    text: 'Meridian, ID'
  },
  {
    text: 'Nampa, ID'
  },
  {
    text: 'Pocatello, ID'
  },
  {
    text: 'Twin Falls, ID'
  },
  {
    text: 'Adams, IL'
  },
  {
    text: 'Alexander, IL'
  },
  {
    text: 'Bond, IL'
  },
  {
    text: 'Boone, IL'
  },
  {
    text: 'Brown, IL'
  },
  {
    text: 'Bureau, IL'
  },
  {
    text: 'Calhoun, IL'
  },
  {
    text: 'Carroll, IL'
  },
  {
    text: 'Cass, IL'
  },
  {
    text: 'Champaign, IL'
  },
  {
    text: 'Christian, IL'
  },
  {
    text: 'Clark, IL'
  },
  {
    text: 'Clay, IL'
  },
  {
    text: 'Clinton, IL'
  },
  {
    text: 'Coles, IL'
  },
  {
    text: 'Cook, IL'
  },
  {
    text: 'Crawford, IL'
  },
  {
    text: 'Cumberland, IL'
  },
  {
    text: 'DeKalb, IL'
  },
  {
    text: 'De Witt, IL'
  },
  {
    text: 'Douglas, IL'
  },
  {
    text: 'DuPage, IL'
  },
  {
    text: 'Edgar, IL'
  },
  {
    text: 'Edwards, IL'
  },
  {
    text: 'Effingham, IL'
  },
  {
    text: 'Fayette, IL'
  },
  {
    text: 'Ford, IL'
  },
  {
    text: 'Franklin, IL'
  },
  {
    text: 'Fulton, IL'
  },
  {
    text: 'Gallatin, IL'
  },
  {
    text: 'Greene, IL'
  },
  {
    text: 'Grundy, IL'
  },
  {
    text: 'Hamilton, IL'
  },
  {
    text: 'Hancock, IL'
  },
  {
    text: 'Hardin, IL'
  },
  {
    text: 'Henderson, IL'
  },
  {
    text: 'Henry, IL'
  },
  {
    text: 'Iroquois, IL'
  },
  {
    text: 'Jackson, IL'
  },
  {
    text: 'Jasper, IL'
  },
  {
    text: 'Jefferson, IL'
  },
  {
    text: 'Jersey, IL'
  },
  {
    text: 'Jo Daviess, IL'
  },
  {
    text: 'Johnson, IL'
  },
  {
    text: 'Kane, IL'
  },
  {
    text: 'Kankakee, IL'
  },
  {
    text: 'Kendall, IL'
  },
  {
    text: 'Knox, IL'
  },
  {
    text: 'Lake, IL'
  },
  {
    text: 'La Salle, IL'
  },
  {
    text: 'Lawrence, IL'
  },
  {
    text: 'Lee, IL'
  },
  {
    text: 'Livingston, IL'
  },
  {
    text: 'Logan, IL'
  },
  {
    text: 'McDonough, IL'
  },
  {
    text: 'McHenry, IL'
  },
  {
    text: 'McLean, IL'
  },
  {
    text: 'Macon, IL'
  },
  {
    text: 'Macoupin, IL'
  },
  {
    text: 'Madison, IL'
  },
  {
    text: 'Marion, IL'
  },
  {
    text: 'Marshall, IL'
  },
  {
    text: 'Mason, IL'
  },
  {
    text: 'Massac, IL'
  },
  {
    text: 'Menard, IL'
  },
  {
    text: 'Mercer, IL'
  },
  {
    text: 'Monroe, IL'
  },
  {
    text: 'Montgomery, IL'
  },
  {
    text: 'Morgan, IL'
  },
  {
    text: 'Moultrie, IL'
  },
  {
    text: 'Ogle, IL'
  },
  {
    text: 'Peoria, IL'
  },
  {
    text: 'Perry, IL'
  },
  {
    text: 'Piatt, IL'
  },
  {
    text: 'Pike, IL'
  },
  {
    text: 'Pope, IL'
  },
  {
    text: 'Pulaski, IL'
  },
  {
    text: 'Putnam, IL'
  },
  {
    text: 'Randolph, IL'
  },
  {
    text: 'Richland, IL'
  },
  {
    text: 'Rock Island, IL'
  },
  {
    text: 'St. Clair, IL'
  },
  {
    text: 'Saline, IL'
  },
  {
    text: 'Sangamon, IL'
  },
  {
    text: 'Schuyler, IL'
  },
  {
    text: 'Scott, IL'
  },
  {
    text: 'Shelby, IL'
  },
  {
    text: 'Stark, IL'
  },
  {
    text: 'Stephenson, IL'
  },
  {
    text: 'Tazewell, IL'
  },
  {
    text: 'Union, IL'
  },
  {
    text: 'Vermilion, IL'
  },
  {
    text: 'Wabash, IL'
  },
  {
    text: 'Warren, IL'
  },
  {
    text: 'Washington, IL'
  },
  {
    text: 'Wayne, IL'
  },
  {
    text: 'White, IL'
  },
  {
    text: 'Whiteside, IL'
  },
  {
    text: 'Will, IL'
  },
  {
    text: 'Williamson, IL'
  },
  {
    text: 'Winnebago, IL'
  },
  {
    text: 'Woodford, IL'
  },
  {
    text: 'Arlington Heights, IL'
  },
  {
    text: 'Aurora, IL'
  },
  {
    text: 'Bartlett, IL'
  },
  {
    text: 'Belleville, IL'
  },
  {
    text: 'Berwyn, IL'
  },
  {
    text: 'Bloomington, IL'
  },
  {
    text: 'Bolingbrook, IL'
  },
  {
    text: 'Buffalo Grove, IL'
  },
  {
    text: 'Champaign, IL'
  },
  {
    text: 'Chicago, IL'
  },
  {
    text: 'Cicero, IL'
  },
  {
    text: 'Crystal Lake, IL'
  },
  {
    text: 'Decatur, IL'
  },
  {
    text: 'DeKalb, IL'
  },
  {
    text: 'Des Plaines, IL'
  },
  {
    text: 'Downers Grove, IL'
  },
  {
    text: 'Elgin, IL'
  },
  {
    text: 'Elmhurst, IL'
  },
  {
    text: 'Evanston, IL'
  },
  {
    text: 'Glenview, IL'
  },
  {
    text: 'Hoffman Estates, IL'
  },
  {
    text: 'Joliet, IL'
  },
  {
    text: 'Lombard, IL'
  },
  {
    text: 'Moline, IL'
  },
  {
    text: 'Mt Prospect, IL'
  },
  {
    text: 'Naperville, IL'
  },
  {
    text: 'Normal, IL'
  },
  {
    text: 'Oak Lawn, IL'
  },
  {
    text: 'Oak Park, IL'
  },
  {
    text: 'Orland Park, IL'
  },
  {
    text: 'Palatine, IL'
  },
  {
    text: 'Peoria, IL'
  },
  {
    text: 'Plainfield, IL'
  },
  {
    text: 'Rockford, IL'
  },
  {
    text: 'Romeoville, IL'
  },
  {
    text: 'Schaumburg, IL'
  },
  {
    text: 'Skokie, IL'
  },
  {
    text: 'Springfield, IL'
  },
  {
    text: 'Tinley Park, IL'
  },
  {
    text: 'Urbana, IL'
  },
  {
    text: 'Waukegan, IL'
  },
  {
    text: 'Wheaton, IL'
  },
  {
    text: 'Adams, IN'
  },
  {
    text: 'Allen, IN'
  },
  {
    text: 'Bartholomew, IN'
  },
  {
    text: 'Benton, IN'
  },
  {
    text: 'Blackford, IN'
  },
  {
    text: 'Boone, IN'
  },
  {
    text: 'Brown, IN'
  },
  {
    text: 'Carroll, IN'
  },
  {
    text: 'Cass, IN'
  },
  {
    text: 'Clark, IN'
  },
  {
    text: 'Clay, IN'
  },
  {
    text: 'Clinton, IN'
  },
  {
    text: 'Crawford, IN'
  },
  {
    text: 'Daviess, IN'
  },
  {
    text: 'Dearborn, IN'
  },
  {
    text: 'Decatur, IN'
  },
  {
    text: 'DeKalb, IN'
  },
  {
    text: 'Delaware, IN'
  },
  {
    text: 'Dubois, IN'
  },
  {
    text: 'Elkhart, IN'
  },
  {
    text: 'Fayette, IN'
  },
  {
    text: 'Floyd, IN'
  },
  {
    text: 'Fountain, IN'
  },
  {
    text: 'Franklin, IN'
  },
  {
    text: 'Fulton, IN'
  },
  {
    text: 'Gibson, IN'
  },
  {
    text: 'Grant, IN'
  },
  {
    text: 'Greene, IN'
  },
  {
    text: 'Hamilton, IN'
  },
  {
    text: 'Hancock, IN'
  },
  {
    text: 'Harrison, IN'
  },
  {
    text: 'Hendricks, IN'
  },
  {
    text: 'Henry, IN'
  },
  {
    text: 'Howard, IN'
  },
  {
    text: 'Huntington, IN'
  },
  {
    text: 'Jackson, IN'
  },
  {
    text: 'Jasper, IN'
  },
  {
    text: 'Jay, IN'
  },
  {
    text: 'Jefferson, IN'
  },
  {
    text: 'Jennings, IN'
  },
  {
    text: 'Johnson, IN'
  },
  {
    text: 'Knox, IN'
  },
  {
    text: 'Kosciusko, IN'
  },
  {
    text: 'LaGrange, IN'
  },
  {
    text: 'Lake, IN'
  },
  {
    text: 'LaPorte, IN'
  },
  {
    text: 'Lawrence, IN'
  },
  {
    text: 'Madison, IN'
  },
  {
    text: 'Marion, IN'
  },
  {
    text: 'Marshall, IN'
  },
  {
    text: 'Martin, IN'
  },
  {
    text: 'Miami, IN'
  },
  {
    text: 'Monroe, IN'
  },
  {
    text: 'Montgomery, IN'
  },
  {
    text: 'Morgan, IN'
  },
  {
    text: 'Newton, IN'
  },
  {
    text: 'Noble, IN'
  },
  {
    text: 'Ohio, IN'
  },
  {
    text: 'Orange, IN'
  },
  {
    text: 'Owen, IN'
  },
  {
    text: 'Parke, IN'
  },
  {
    text: 'Perry, IN'
  },
  {
    text: 'Pike, IN'
  },
  {
    text: 'Porter, IN'
  },
  {
    text: 'Posey, IN'
  },
  {
    text: 'Pulaski, IN'
  },
  {
    text: 'Putnam, IN'
  },
  {
    text: 'Randolph, IN'
  },
  {
    text: 'Ripley, IN'
  },
  {
    text: 'Rush, IN'
  },
  {
    text: 'St. Joseph, IN'
  },
  {
    text: 'Scott, IN'
  },
  {
    text: 'Shelby, IN'
  },
  {
    text: 'Spencer, IN'
  },
  {
    text: 'Starke, IN'
  },
  {
    text: 'Steuben, IN'
  },
  {
    text: 'Sullivan, IN'
  },
  {
    text: 'Switzerland, IN'
  },
  {
    text: 'Tippecanoe, IN'
  },
  {
    text: 'Tipton, IN'
  },
  {
    text: 'Union, IN'
  },
  {
    text: 'Vanderburgh, IN'
  },
  {
    text: 'Vermillion, IN'
  },
  {
    text: 'Vigo, IN'
  },
  {
    text: 'Wabash, IN'
  },
  {
    text: 'Warren, IN'
  },
  {
    text: 'Warrick, IN'
  },
  {
    text: 'Washington, IN'
  },
  {
    text: 'Wayne, IN'
  },
  {
    text: 'Wells, IN'
  },
  {
    text: 'White, IN'
  },
  {
    text: 'Whitley, IN'
  },
  {
    text: 'Anderson, IN'
  },
  {
    text: 'Bloomington, IN'
  },
  {
    text: 'Carmel, IN'
  },
  {
    text: 'Columbus, IN'
  },
  {
    text: 'Elkhart, IN'
  },
  {
    text: 'Evansville, IN'
  },
  {
    text: 'Fishers, IN'
  },
  {
    text: 'Fort Wayne, IN'
  },
  {
    text: 'Gary, IN'
  },
  {
    text: 'Greenwood, IN'
  },
  {
    text: 'Hammond, IN'
  },
  {
    text: 'Indianapolis, IN'
  },
  {
    text: 'Jeffersonville, IN'
  },
  {
    text: 'Kokomo, IN'
  },
  {
    text: 'Lafayette, IN'
  },
  {
    text: 'Lawrence, IN'
  },
  {
    text: 'Mishawaka, IN'
  },
  {
    text: 'Muncie, IN'
  },
  {
    text: 'Noblesville, IN'
  },
  {
    text: 'South Bend, IN'
  },
  {
    text: 'Terre Haute, IN'
  },
  {
    text: 'Adair, IA'
  },
  {
    text: 'Adams, IA'
  },
  {
    text: 'Allamakee, IA'
  },
  {
    text: 'Appanoose, IA'
  },
  {
    text: 'Audubon, IA'
  },
  {
    text: 'Benton, IA'
  },
  {
    text: 'Black Hawk, IA'
  },
  {
    text: 'Boone, IA'
  },
  {
    text: 'Bremer, IA'
  },
  {
    text: 'Buchanan, IA'
  },
  {
    text: 'Buena Vista, IA'
  },
  {
    text: 'Butler, IA'
  },
  {
    text: 'Calhoun, IA'
  },
  {
    text: 'Carroll, IA'
  },
  {
    text: 'Cass, IA'
  },
  {
    text: 'Cedar, IA'
  },
  {
    text: 'Cerro Gordo, IA'
  },
  {
    text: 'Cherokee, IA'
  },
  {
    text: 'Chickasaw, IA'
  },
  {
    text: 'Clarke, IA'
  },
  {
    text: 'Clay, IA'
  },
  {
    text: 'Clayton, IA'
  },
  {
    text: 'Clinton, IA'
  },
  {
    text: 'Crawford, IA'
  },
  {
    text: 'Dallas, IA'
  },
  {
    text: 'Davis, IA'
  },
  {
    text: 'Decatur, IA'
  },
  {
    text: 'Delaware, IA'
  },
  {
    text: 'Des Moines, IA'
  },
  {
    text: 'Dickinson, IA'
  },
  {
    text: 'Dubuque, IA'
  },
  {
    text: 'Emmet, IA'
  },
  {
    text: 'Fayette, IA'
  },
  {
    text: 'Floyd, IA'
  },
  {
    text: 'Franklin, IA'
  },
  {
    text: 'Fremont, IA'
  },
  {
    text: 'Greene, IA'
  },
  {
    text: 'Grundy, IA'
  },
  {
    text: 'Guthrie, IA'
  },
  {
    text: 'Hamilton, IA'
  },
  {
    text: 'Hancock, IA'
  },
  {
    text: 'Hardin, IA'
  },
  {
    text: 'Harrison, IA'
  },
  {
    text: 'Henry, IA'
  },
  {
    text: 'Howard, IA'
  },
  {
    text: 'Humboldt, IA'
  },
  {
    text: 'Ida, IA'
  },
  {
    text: 'Iowa, IA'
  },
  {
    text: 'Jackson, IA'
  },
  {
    text: 'Jasper, IA'
  },
  {
    text: 'Jefferson, IA'
  },
  {
    text: 'Johnson, IA'
  },
  {
    text: 'Jones, IA'
  },
  {
    text: 'Keokuk, IA'
  },
  {
    text: 'Kossuth, IA'
  },
  {
    text: 'Lee, IA'
  },
  {
    text: 'Linn, IA'
  },
  {
    text: 'Louisa, IA'
  },
  {
    text: 'Lucas, IA'
  },
  {
    text: 'Lyon, IA'
  },
  {
    text: 'Madison, IA'
  },
  {
    text: 'Mahaska, IA'
  },
  {
    text: 'Marion, IA'
  },
  {
    text: 'Marshall, IA'
  },
  {
    text: 'Mills, IA'
  },
  {
    text: 'Mitchell, IA'
  },
  {
    text: 'Monona, IA'
  },
  {
    text: 'Monroe, IA'
  },
  {
    text: 'Montgomery, IA'
  },
  {
    text: 'Muscatine, IA'
  },
  {
    text: 'OBrien, IA'
  },
  {
    text: 'Osceola, IA'
  },
  {
    text: 'Page, IA'
  },
  {
    text: 'Palo Alto, IA'
  },
  {
    text: 'Plymouth, IA'
  },
  {
    text: 'Pocahontas, IA'
  },
  {
    text: 'Polk, IA'
  },
  {
    text: 'Pottawattamie, IA'
  },
  {
    text: 'Poweshiek, IA'
  },
  {
    text: 'Ringgold, IA'
  },
  {
    text: 'Sac, IA'
  },
  {
    text: 'Scott, IA'
  },
  {
    text: 'Shelby, IA'
  },
  {
    text: 'Sioux, IA'
  },
  {
    text: 'Story, IA'
  },
  {
    text: 'Tama, IA'
  },
  {
    text: 'Taylor, IA'
  },
  {
    text: 'Union, IA'
  },
  {
    text: 'Van Buren, IA'
  },
  {
    text: 'Wapello, IA'
  },
  {
    text: 'Warren, IA'
  },
  {
    text: 'Washington, IA'
  },
  {
    text: 'Wayne, IA'
  },
  {
    text: 'Webster, IA'
  },
  {
    text: 'Winnebago, IA'
  },
  {
    text: 'Winneshiek, IA'
  },
  {
    text: 'Woodbury, IA'
  },
  {
    text: 'Worth, IA'
  },
  {
    text: 'Wright, IA'
  },
  {
    text: 'Ames, IA'
  },
  {
    text: 'Ankeny, IA'
  },
  {
    text: 'Cedar Rapids, IA'
  },
  {
    text: 'Council Bluffs, IA'
  },
  {
    text: 'Davenport, IA'
  },
  {
    text: 'Des Moines, IA'
  },
  {
    text: 'Dubuque, IA'
  },
  {
    text: 'Iowa City, IA'
  },
  {
    text: 'Sioux City, IA'
  },
  {
    text: 'Urbandale, IA'
  },
  {
    text: 'Waterloo, IA'
  },
  {
    text: 'West Des Moines, IA'
  },
  {
    text: 'Allen, KS'
  },
  {
    text: 'Anderson, KS'
  },
  {
    text: 'Atchison, KS'
  },
  {
    text: 'Barber, KS'
  },
  {
    text: 'Barton, KS'
  },
  {
    text: 'Bourbon, KS'
  },
  {
    text: 'Brown, KS'
  },
  {
    text: 'Butler, KS'
  },
  {
    text: 'Chase, KS'
  },
  {
    text: 'Chautauqua, KS'
  },
  {
    text: 'Cherokee, KS'
  },
  {
    text: 'Cheyenne, KS'
  },
  {
    text: 'Clark, KS'
  },
  {
    text: 'Clay, KS'
  },
  {
    text: 'Cloud, KS'
  },
  {
    text: 'Coffey, KS'
  },
  {
    text: 'Comanche, KS'
  },
  {
    text: 'Cowley, KS'
  },
  {
    text: 'Crawford, KS'
  },
  {
    text: 'Decatur, KS'
  },
  {
    text: 'Dickinson, KS'
  },
  {
    text: 'Doniphan, KS'
  },
  {
    text: 'Douglas, KS'
  },
  {
    text: 'Edwards, KS'
  },
  {
    text: 'Elk, KS'
  },
  {
    text: 'Ellis, KS'
  },
  {
    text: 'Ellsworth, KS'
  },
  {
    text: 'Finney, KS'
  },
  {
    text: 'Ford, KS'
  },
  {
    text: 'Franklin, KS'
  },
  {
    text: 'Geary, KS'
  },
  {
    text: 'Gove, KS'
  },
  {
    text: 'Graham, KS'
  },
  {
    text: 'Grant, KS'
  },
  {
    text: 'Gray, KS'
  },
  {
    text: 'Greeley, KS'
  },
  {
    text: 'Greenwood, KS'
  },
  {
    text: 'Hamilton, KS'
  },
  {
    text: 'Harper, KS'
  },
  {
    text: 'Harvey, KS'
  },
  {
    text: 'Haskell, KS'
  },
  {
    text: 'Hodgeman, KS'
  },
  {
    text: 'Jackson, KS'
  },
  {
    text: 'Jefferson, KS'
  },
  {
    text: 'Jewell, KS'
  },
  {
    text: 'Johnson, KS'
  },
  {
    text: 'Kearny, KS'
  },
  {
    text: 'Kingman, KS'
  },
  {
    text: 'Kiowa, KS'
  },
  {
    text: 'Labette, KS'
  },
  {
    text: 'Lane, KS'
  },
  {
    text: 'Leavenworth, KS'
  },
  {
    text: 'Lincoln, KS'
  },
  {
    text: 'Linn, KS'
  },
  {
    text: 'Logan, KS'
  },
  {
    text: 'Lyon, KS'
  },
  {
    text: 'McPherson, KS'
  },
  {
    text: 'Marion, KS'
  },
  {
    text: 'Marshall, KS'
  },
  {
    text: 'Meade, KS'
  },
  {
    text: 'Miami, KS'
  },
  {
    text: 'Mitchell, KS'
  },
  {
    text: 'Montgomery, KS'
  },
  {
    text: 'Morris, KS'
  },
  {
    text: 'Morton, KS'
  },
  {
    text: 'Nemaha, KS'
  },
  {
    text: 'Neosho, KS'
  },
  {
    text: 'Ness, KS'
  },
  {
    text: 'Norton, KS'
  },
  {
    text: 'Osage, KS'
  },
  {
    text: 'Osborne, KS'
  },
  {
    text: 'Ottawa, KS'
  },
  {
    text: 'Pawnee, KS'
  },
  {
    text: 'Phillips, KS'
  },
  {
    text: 'Pottawatomie, KS'
  },
  {
    text: 'Pratt, KS'
  },
  {
    text: 'Rawlins, KS'
  },
  {
    text: 'Reno, KS'
  },
  {
    text: 'Republic, KS'
  },
  {
    text: 'Rice, KS'
  },
  {
    text: 'Riley, KS'
  },
  {
    text: 'Rooks, KS'
  },
  {
    text: 'Rush, KS'
  },
  {
    text: 'Russell, KS'
  },
  {
    text: 'Saline, KS'
  },
  {
    text: 'Scott, KS'
  },
  {
    text: 'Sedgwick, KS'
  },
  {
    text: 'Seward, KS'
  },
  {
    text: 'Shawnee, KS'
  },
  {
    text: 'Sheridan, KS'
  },
  {
    text: 'Sherman, KS'
  },
  {
    text: 'Smith, KS'
  },
  {
    text: 'Stafford, KS'
  },
  {
    text: 'Stanton, KS'
  },
  {
    text: 'Stevens, KS'
  },
  {
    text: 'Sumner, KS'
  },
  {
    text: 'Thomas, KS'
  },
  {
    text: 'Trego, KS'
  },
  {
    text: 'Wabaunsee, KS'
  },
  {
    text: 'Wallace, KS'
  },
  {
    text: 'Washington, KS'
  },
  {
    text: 'Wichita, KS'
  },
  {
    text: 'Wilson, KS'
  },
  {
    text: 'Woodson, KS'
  },
  {
    text: 'Wyandotte, KS'
  },
  {
    text: 'Hutchinson, KS'
  },
  {
    text: 'Kansas City, KS'
  },
  {
    text: 'Lawrence, KS'
  },
  {
    text: 'Lenexa, KS'
  },
  {
    text: 'Manhattan, KS'
  },
  {
    text: 'Olathe, KS'
  },
  {
    text: 'Overland Park, KS'
  },
  {
    text: 'Salina, KS'
  },
  {
    text: 'Shawnee, KS'
  },
  {
    text: 'Sheridan, KS'
  },
  {
    text: 'Sherman, KS'
  },
  {
    text: 'Smith, KS'
  },
  {
    text: 'Stafford, KS'
  },
  {
    text: 'Stanton, KS'
  },
  {
    text: 'Stevens, KS'
  },
  {
    text: 'Sumner, KS'
  },
  {
    text: 'Thomas, KS'
  },
  {
    text: 'Trego, KS'
  },
  {
    text: 'Wabaunsee, KS'
  },
  {
    text: 'Wallace, KS'
  },
  {
    text: 'Washington, KS'
  },
  {
    text: 'Wichita, KS'
  },
  {
    text: 'Wilson, KS'
  },
  {
    text: 'Woodson, KS'
  },
  {
    text: 'Wyandotte, KS'
  },
  {
    text: 'Hutchinson, KS'
  },
  {
    text: 'Kansas City, KS'
  },
  {
    text: 'Lawrence, KS'
  },
  {
    text: 'Lenexa, KS'
  },
  {
    text: 'Manhattan, KS'
  },
  {
    text: 'Olathe, KS'
  },
  {
    text: 'Overland Park, KS'
  },
  {
    text: 'Salina, KS'
  },
  {
    text: 'Shawnee, KS'
  },
  {
    text: 'Topeka, KS'
  },
  {
    text: 'Wichita, KS'
  },
  {
    text: 'Adair, KY'
  },
  {
    text: 'Allen, KY'
  },
  {
    text: 'Anderson, KY'
  },
  {
    text: 'Ballard, KY'
  },
  {
    text: 'Barren, KY'
  },
  {
    text: 'Bath, KY'
  },
  {
    text: 'Bell, KY'
  },
  {
    text: 'Boone, KY'
  },
  {
    text: 'Bourbon, KY'
  },
  {
    text: 'Boyd, KY'
  },
  {
    text: 'Boyle, KY'
  },
  {
    text: 'Bracken, KY'
  },
  {
    text: 'Breathitt, KY'
  },
  {
    text: 'Breckinridge, KY'
  },
  {
    text: 'Bullitt, KY'
  },
  {
    text: 'Butler, KY'
  },
  {
    text: 'Caldwell, KY'
  },
  {
    text: 'Calloway, KY'
  },
  {
    text: 'Campbell, KY'
  },
  {
    text: 'Carlisle, KY'
  },
  {
    text: 'Carroll, KY'
  },
  {
    text: 'Carter, KY'
  },
  {
    text: 'Casey, KY'
  },
  {
    text: 'Christian, KY'
  },
  {
    text: 'Clark, KY'
  },
  {
    text: 'Clay, KY'
  },
  {
    text: 'Clinton, KY'
  },
  {
    text: 'Crittenden, KY'
  },
  {
    text: 'Cumberland, KY'
  },
  {
    text: 'Daviess, KY'
  },
  {
    text: 'Edmonson, KY'
  },
  {
    text: 'Elliott, KY'
  },
  {
    text: 'Estill, KY'
  },
  {
    text: 'Fayette, KY'
  },
  {
    text: 'Fleming, KY'
  },
  {
    text: 'Floyd, KY'
  },
  {
    text: 'Franklin, KY'
  },
  {
    text: 'Fulton, KY'
  },
  {
    text: 'Gallatin, KY'
  },
  {
    text: 'Garrard, KY'
  },
  {
    text: 'Grant, KY'
  },
  {
    text: 'Graves, KY'
  },
  {
    text: 'Grayson, KY'
  },
  {
    text: 'Green, KY'
  },
  {
    text: 'Greenup, KY'
  },
  {
    text: 'Hancock, KY'
  },
  {
    text: 'Hardin, KY'
  },
  {
    text: 'Harlan, KY'
  },
  {
    text: 'Harrison, KY'
  },
  {
    text: 'Hart, KY'
  },
  {
    text: 'Henderson, KY'
  },
  {
    text: 'Henry, KY'
  },
  {
    text: 'Hickman, KY'
  },
  {
    text: 'Hopkins, KY'
  },
  {
    text: 'Jackson, KY'
  },
  {
    text: 'Jefferson, KY'
  },
  {
    text: 'Jessamine, KY'
  },
  {
    text: 'Johnson, KY'
  },
  {
    text: 'Kenton, KY'
  },
  {
    text: 'Knott, KY'
  },
  {
    text: 'Knox, KY'
  },
  {
    text: 'Larue, KY'
  },
  {
    text: 'Laurel, KY'
  },
  {
    text: 'Lawrence, KY'
  },
  {
    text: 'Lee, KY'
  },
  {
    text: 'Leslie, KY'
  },
  {
    text: 'Letcher, KY'
  },
  {
    text: 'Lewis, KY'
  },
  {
    text: 'Lincoln, KY'
  },
  {
    text: 'Livingston, KY'
  },
  {
    text: 'Logan, KY'
  },
  {
    text: 'Lyon, KY'
  },
  {
    text: 'McCracken, KY'
  },
  {
    text: 'McCreary, KY'
  },
  {
    text: 'McLean, KY'
  },
  {
    text: 'Madison, KY'
  },
  {
    text: 'Magoffin, KY'
  },
  {
    text: 'Marion, KY'
  },
  {
    text: 'Marshall, KY'
  },
  {
    text: 'Martin, KY'
  },
  {
    text: 'Mason, KY'
  },
  {
    text: 'Meade, KY'
  },
  {
    text: 'Menifee, KY'
  },
  {
    text: 'Mercer, KY'
  },
  {
    text: 'Metcalfe, KY'
  },
  {
    text: 'Monroe, KY'
  },
  {
    text: 'Montgomery, KY'
  },
  {
    text: 'Morgan, KY'
  },
  {
    text: 'Muhlenberg, KY'
  },
  {
    text: 'Nelson, KY'
  },
  {
    text: 'Nicholas, KY'
  },
  {
    text: 'Ohio, KY'
  },
  {
    text: 'Oldham, KY'
  },
  {
    text: 'Owen, KY'
  },
  {
    text: 'Owsley, KY'
  },
  {
    text: 'Pendleton, KY'
  },
  {
    text: 'Perry, KY'
  },
  {
    text: 'Pike, KY'
  },
  {
    text: 'Powell, KY'
  },
  {
    text: 'Pulaski, KY'
  },
  {
    text: 'Robertson, KY'
  },
  {
    text: 'Rockcastle, KY'
  },
  {
    text: 'Rowan, KY'
  },
  {
    text: 'Russell, KY'
  },
  {
    text: 'Scott, KY'
  },
  {
    text: 'Shelby, KY'
  },
  {
    text: 'Simpson, KY'
  },
  {
    text: 'Spencer, KY'
  },
  {
    text: 'Taylor, KY'
  },
  {
    text: 'Todd, KY'
  },
  {
    text: 'Trigg, KY'
  },
  {
    text: 'Trimble, KY'
  },
  {
    text: 'Union, KY'
  },
  {
    text: 'Warren, KY'
  },
  {
    text: 'Washington, KY'
  },
  {
    text: 'Wayne, KY'
  },
  {
    text: 'Webster, KY'
  },
  {
    text: 'Whitley, KY'
  },
  {
    text: 'Wolfe, KY'
  },
  {
    text: 'Woodford, KY'
  },
  {
    text: 'Bowling Green, KY'
  },
  {
    text: 'Lexington, KY'
  },
  {
    text: 'Louisville, KY'
  },
  {
    text: 'Owensboro, KY'
  },
  {
    text: 'Acadia, LA'
  },
  {
    text: 'Allen, LA'
  },
  {
    text: 'Ascension, LA'
  },
  {
    text: 'Assumption, LA'
  },
  {
    text: 'Avoyelles, LA'
  },
  {
    text: 'Beauregard, LA'
  },
  {
    text: 'Bienville, LA'
  },
  {
    text: 'Bossier, LA'
  },
  {
    text: 'Caddo, LA'
  },
  {
    text: 'Calcasieu, LA'
  },
  {
    text: 'Caldwell, LA'
  },
  {
    text: 'Cameron, LA'
  },
  {
    text: 'Catahoula, LA'
  },
  {
    text: 'Claiborne, LA'
  },
  {
    text: 'Concordia, LA'
  },
  {
    text: 'De Soto, LA'
  },
  {
    text: 'East Baton Rouge, LA'
  },
  {
    text: 'East Carroll, LA'
  },
  {
    text: 'East Feliciana, LA'
  },
  {
    text: 'Evangeline, LA'
  },
  {
    text: 'Franklin, LA'
  },
  {
    text: 'Grant, LA'
  },
  {
    text: 'Iberia, LA'
  },
  {
    text: 'Iberville, LA'
  },
  {
    text: 'Jackson, LA'
  },
  {
    text: 'Jefferson, LA'
  },
  {
    text: 'Jefferson Davis, LA'
  },
  {
    text: 'Lafayette, LA'
  },
  {
    text: 'Lafourche, LA'
  },
  {
    text: 'La Salle, LA'
  },
  {
    text: 'Lincoln, LA'
  },
  {
    text: 'Livingston, LA'
  },
  {
    text: 'Madison, LA'
  },
  {
    text: 'Morehouse, LA'
  },
  {
    text: 'Natchitoches, LA'
  },
  {
    text: 'Orleans, LA'
  },
  {
    text: 'Ouachita, LA'
  },
  {
    text: 'Plaquemines, LA'
  },
  {
    text: 'Pointe Coupee, LA'
  },
  {
    text: 'Rapides, LA'
  },
  {
    text: 'Red River, LA'
  },
  {
    text: 'Richland, LA'
  },
  {
    text: 'Sabine, LA'
  },
  {
    text: 'St. Bernard, LA'
  },
  {
    text: 'St. Charles, LA'
  },
  {
    text: 'St. Helena, LA'
  },
  {
    text: 'St. James, LA'
  },
  {
    text: 'St. John the Baptist, LA'
  },
  {
    text: 'St. Landry, LA'
  },
  {
    text: 'St. Martin, LA'
  },
  {
    text: 'St. Mary, LA'
  },
  {
    text: 'St. Tammany, LA'
  },
  {
    text: 'Tangipahoa, LA'
  },
  {
    text: 'Tensas, LA'
  },
  {
    text: 'Terrebonne, LA'
  },
  {
    text: 'Union, LA'
  },
  {
    text: 'Vermilion, LA'
  },
  {
    text: 'Vernon, LA'
  },
  {
    text: 'Washington, LA'
  },
  {
    text: 'Webster, LA'
  },
  {
    text: 'West Baton Rouge, LA'
  },
  {
    text: 'West Carroll, LA'
  },
  {
    text: 'West Feliciana, LA'
  },
  {
    text: 'Winn, LA'
  },
  {
    text: 'Alexandria, LA'
  },
  {
    text: 'Baton Rouge, LA'
  },
  {
    text: 'Bossier City, LA'
  },
  {
    text: 'Kenner, LA'
  },
  {
    text: 'Lafayette, LA'
  },
  {
    text: 'Lake Charles, LA'
  },
  {
    text: 'Metairie, LA'
  },
  {
    text: 'Monroe, LA'
  },
  {
    text: 'New Orleans, LA'
  },
  {
    text: 'Shreveport, LA'
  },
  {
    text: 'Androscoggin, ME'
  },
  {
    text: 'Aroostook, ME'
  },
  {
    text: 'Cumberland, ME'
  },
  {
    text: 'Franklin, ME'
  },
  {
    text: 'Hancock, ME'
  },
  {
    text: 'Kennebec, ME'
  },
  {
    text: 'Knox, ME'
  },
  {
    text: 'Lincoln, ME'
  },
  {
    text: 'Oxford, ME'
  },
  {
    text: 'Penobscot, ME'
  },
  {
    text: 'Piscataquis, ME'
  },
  {
    text: 'Sagadahoc, ME'
  },
  {
    text: 'Somerset, ME'
  },
  {
    text: 'Waldo, ME'
  },
  {
    text: 'Washington, ME'
  },
  {
    text: 'York, ME'
  },
  {
    text: 'Portland, ME'
  },
  {
    text: 'Allegany, MD'
  },
  {
    text: 'Anne Arundel, MD'
  },
  {
    text: 'Baltimore, MD'
  },
  {
    text: 'Calvert, MD'
  },
  {
    text: 'Caroline, MD'
  },
  {
    text: 'Carroll, MD'
  },
  {
    text: 'Cecil, MD'
  },
  {
    text: 'Charles, MD'
  },
  {
    text: 'Dorchester, MD'
  },
  {
    text: 'Frederick, MD'
  },
  {
    text: 'Garrett, MD'
  },
  {
    text: 'Harford, MD'
  },
  {
    text: 'Howard, MD'
  },
  {
    text: 'Kent, MD'
  },
  {
    text: 'Montgomery, MD'
  },
  {
    text: 'Prince Georges, MD'
  },
  {
    text: 'Queen Annes, MD'
  },
  {
    text: 'St. Marys, MD'
  },
  {
    text: 'Somerset, MD'
  },
  {
    text: 'Talbot, MD'
  },
  {
    text: 'Washington, MD'
  },
  {
    text: 'Wicomico, MD'
  },
  {
    text: 'Worcester, MD'
  },
  {
    text: 'Aspen Hill, MD'
  },
  {
    text: 'Baltimore, MD'
  },
  {
    text: 'Bel Air South, MD'
  },
  {
    text: 'Bethesda, MD'
  },
  {
    text: 'Bowie, MD'
  },
  {
    text: 'Catonsville, MD'
  },
  {
    text: 'Columbia, MD'
  },
  {
    text: 'Dundalk, MD'
  },
  {
    text: 'Ellicott City, MD'
  },
  {
    text: 'Frederick, MD'
  },
  {
    text: 'Gaithersburg, MD'
  },
  {
    text: 'Germantown, MD'
  },
  {
    text: 'Glen Burnie, MD'
  },
  {
    text: 'North Bethesda, MD'
  },
  {
    text: 'Odenton, MD'
  },
  {
    text: 'Potomac, MD'
  },
  {
    text: 'Rockville, MD'
  },
  {
    text: 'Severn, MD'
  },
  {
    text: 'Silver Spring, MD'
  },
  {
    text: 'Towson, MD'
  },
  {
    text: 'Waldorf, MD'
  },
  {
    text: 'Wheaton, MD'
  },
  {
    text: 'Barnstable, MA'
  },
  {
    text: 'Berkshire, MA'
  },
  {
    text: 'Bristol, MA'
  },
  {
    text: 'Dukes, MA'
  },
  {
    text: 'Essex, MA'
  },
  {
    text: 'Franklin, MA'
  },
  {
    text: 'Hampden, MA'
  },
  {
    text: 'Hampshire, MA'
  },
  {
    text: 'Middlesex, MA'
  },
  {
    text: 'Nantucket, MA'
  },
  {
    text: 'Norfolk, MA'
  },
  {
    text: 'Plymouth, MA'
  },
  {
    text: 'Suffolk, MA'
  },
  {
    text: 'Worcester, MA'
  },
  {
    text: 'Arlington, MA'
  },
  {
    text: 'Attleboro, MA'
  },
  {
    text: 'Barnstable, MA'
  },
  {
    text: 'Billerica, MA'
  },
  {
    text: 'Boston, MA'
  },
  {
    text: 'Brockton, MA'
  },
  {
    text: 'Brookline, MA'
  },
  {
    text: 'Cambridge, MA'
  },
  {
    text: 'Chicopee, MA'
  },
  {
    text: 'Everett, MA'
  },
  {
    text: 'Fall River, MA'
  },
  {
    text: 'Framingham, MA'
  },
  {
    text: 'Haverhill, MA'
  },
  {
    text: 'Lawrence, MA'
  },
  {
    text: 'Lowell, MA'
  },
  {
    text: 'Lynn, MA'
  },
  {
    text: 'Malden, MA'
  },
  {
    text: 'Medford, MA'
  },
  {
    text: 'Methuen, MA'
  },
  {
    text: 'New Bedford, MA'
  },
  {
    text: 'Newton, MA'
  },
  {
    text: 'North Attleboro, MA'
  },
  {
    text: 'Peabody, MA'
  },
  {
    text: 'Pittsfield, MA'
  },
  {
    text: 'Quincy, MA'
  },
  {
    text: 'Revere, MA'
  },
  {
    text: 'Salem, MA'
  },
  {
    text: 'Somerville, MA'
  },
  {
    text: 'Springfield, MA'
  },
  {
    text: 'Taunton, MA'
  },
  {
    text: 'Waltham, MA'
  },
  {
    text: 'Westfield, MA'
  },
  {
    text: 'Weymouth, MA'
  },
  {
    text: 'Worcester, MA'
  },
  {
    text: 'Alcona, MI'
  },
  {
    text: 'Alger, MI'
  },
  {
    text: 'Allegan, MI'
  },
  {
    text: 'Alpena, MI'
  },
  {
    text: 'Antrim, MI'
  },
  {
    text: 'Arenac, MI'
  },
  {
    text: 'Baraga, MI'
  },
  {
    text: 'Barry, MI'
  },
  {
    text: 'Bay, MI'
  },
  {
    text: 'Benzie, MI'
  },
  {
    text: 'Berrien, MI'
  },
  {
    text: 'Branch, MI'
  },
  {
    text: 'Calhoun, MI'
  },
  {
    text: 'Cass, MI'
  },
  {
    text: 'Charlevoix, MI'
  },
  {
    text: 'Cheboygan, MI'
  },
  {
    text: 'Chippewa, MI'
  },
  {
    text: 'Clare, MI'
  },
  {
    text: 'Clinton, MI'
  },
  {
    text: 'Crawford, MI'
  },
  {
    text: 'Delta, MI'
  },
  {
    text: 'Dickinson, MI'
  },
  {
    text: 'Eaton, MI'
  },
  {
    text: 'Emmet, MI'
  },
  {
    text: 'Genesee, MI'
  },
  {
    text: 'Gladwin, MI'
  },
  {
    text: 'Gogebic, MI'
  },
  {
    text: 'Grand Traverse, MI'
  },
  {
    text: 'Gratiot, MI'
  },
  {
    text: 'Hillsdale, MI'
  },
  {
    text: 'Houghton, MI'
  },
  {
    text: 'Huron, MI'
  },
  {
    text: 'Ingham, MI'
  },
  {
    text: 'Ionia, MI'
  },
  {
    text: 'Iosco, MI'
  },
  {
    text: 'Iron, MI'
  },
  {
    text: 'Isabella, MI'
  },
  {
    text: 'Jackson, MI'
  },
  {
    text: 'Kalamazoo, MI'
  },
  {
    text: 'Kalkaska, MI'
  },
  {
    text: 'Kent, MI'
  },
  {
    text: 'Keweenaw, MI'
  },
  {
    text: 'Lake, MI'
  },
  {
    text: 'Lapeer, MI'
  },
  {
    text: 'Leelanau, MI'
  },
  {
    text: 'Lenawee, MI'
  },
  {
    text: 'Livingston, MI'
  },
  {
    text: 'Luce, MI'
  },
  {
    text: 'Mackinac, MI'
  },
  {
    text: 'Macomb, MI'
  },
  {
    text: 'Manistee, MI'
  },
  {
    text: 'Marquette, MI'
  },
  {
    text: 'Mason, MI'
  },
  {
    text: 'Mecosta, MI'
  },
  {
    text: 'Menominee, MI'
  },
  {
    text: 'Midland, MI'
  },
  {
    text: 'Missaukee, MI'
  },
  {
    text: 'Monroe, MI'
  },
  {
    text: 'Montcalm, MI'
  },
  {
    text: 'Montmorency, MI'
  },
  {
    text: 'Muskegon, MI'
  },
  {
    text: 'Newaygo, MI'
  },
  {
    text: 'Oakland, MI'
  },
  {
    text: 'Oceana, MI'
  },
  {
    text: 'Ogemaw, MI'
  },
  {
    text: 'Ontonagon, MI'
  },
  {
    text: 'Osceola, MI'
  },
  {
    text: 'Oscoda, MI'
  },
  {
    text: 'Otsego, MI'
  },
  {
    text: 'Ottawa, MI'
  },
  {
    text: 'Presque Isle, MI'
  },
  {
    text: 'Roscommon, MI'
  },
  {
    text: 'Saginaw, MI'
  },
  {
    text: 'St. Clair, MI'
  },
  {
    text: 'St. Joseph, MI'
  },
  {
    text: 'Sanilac, MI'
  },
  {
    text: 'Schoolcraft, MI'
  },
  {
    text: 'Shiawassee, MI'
  },
  {
    text: 'Tuscola, MI'
  },
  {
    text: 'Van Buren, MI'
  },
  {
    text: 'Washtenaw, MI'
  },
  {
    text: 'Wayne, MI'
  },
  {
    text: 'Wexford, MI'
  },
  {
    text: 'Ann Arbor, MI'
  },
  {
    text: 'Battle Creek, MI'
  },
  {
    text: 'Dearborn, MI'
  },
  {
    text: 'Dearborn Heights, MI'
  },
  {
    text: 'Detroit, MI'
  },
  {
    text: 'East Lansing, MI'
  },
  {
    text: 'Farmington Hills, MI'
  },
  {
    text: 'Flint, MI'
  },
  {
    text: 'Grand Rapids, MI'
  },
  {
    text: 'Grand Rapids Charter Township, MI'
  },
  {
    text: 'Kalamazoo, MI'
  },
  {
    text: 'Kentwood, MI'
  },
  {
    text: 'Lansing, MI'
  },
  {
    text: 'Lansing Charter Township, MI'
  },
  {
    text: 'Livonia, MI'
  },
  {
    text: 'Midland, MI'
  },
  {
    text: 'Novi, MI'
  },
  {
    text: 'Pontiac, MI'
  },
  {
    text: 'Portage, MI'
  },
  {
    text: 'Portage Township, MI'
  },
  {
    text: 'Rochester Hills, MI'
  },
  {
    text: 'Roseville, MI'
  },
  {
    text: 'Royal Oak, MI'
  },
  {
    text: 'Saginaw, MI'
  },
  {
    text: 'St Clair Shores, MI'
  },
  {
    text: 'Southfield, MI'
  },
  {
    text: 'Sterling Heights, MI'
  },
  {
    text: 'Taylor, MI'
  },
  {
    text: 'Troy, MI'
  },
  {
    text: 'Warren, MI'
  },
  {
    text: 'Westland, MI'
  },
  {
    text: 'Wyoming, MI'
  },
  {
    text: 'Aitkin, MN'
  },
  {
    text: 'Anoka, MN'
  },
  {
    text: 'Becker, MN'
  },
  {
    text: 'Beltrami, MN'
  },
  {
    text: 'Benton, MN'
  },
  {
    text: 'Big Stone, MN'
  },
  {
    text: 'Blue Earth, MN'
  },
  {
    text: 'Brown, MN'
  },
  {
    text: 'Carlton, MN'
  },
  {
    text: 'Carver, MN'
  },
  {
    text: 'Cass, MN'
  },
  {
    text: 'Chippewa, MN'
  },
  {
    text: 'Chisago, MN'
  },
  {
    text: 'Clay, MN'
  },
  {
    text: 'Clearwater, MN'
  },
  {
    text: 'Cook, MN'
  },
  {
    text: 'Cottonwood, MN'
  },
  {
    text: 'Crow Wing, MN'
  },
  {
    text: 'Dakota, MN'
  },
  {
    text: 'Dodge, MN'
  },
  {
    text: 'Douglas, MN'
  },
  {
    text: 'Faribault, MN'
  },
  {
    text: 'Fillmore, MN'
  },
  {
    text: 'Freeborn, MN'
  },
  {
    text: 'Goodhue, MN'
  },
  {
    text: 'Grant, MN'
  },
  {
    text: 'Hennepin, MN'
  },
  {
    text: 'Houston, MN'
  },
  {
    text: 'Hubbard, MN'
  },
  {
    text: 'Isanti, MN'
  },
  {
    text: 'Itasca, MN'
  },
  {
    text: 'Jackson, MN'
  },
  {
    text: 'Kanabec, MN'
  },
  {
    text: 'Kandiyohi, MN'
  },
  {
    text: 'Kittson, MN'
  },
  {
    text: 'Koochiching, MN'
  },
  {
    text: 'Lac qui Parle, MN'
  },
  {
    text: 'Lake, MN'
  },
  {
    text: 'Lake of the Woods, MN'
  },
  {
    text: 'Le Sueur, MN'
  },
  {
    text: 'Lincoln, MN'
  },
  {
    text: 'Lyon, MN'
  },
  {
    text: 'McLeod, MN'
  },
  {
    text: 'Mahnomen, MN'
  },
  {
    text: 'Marshall, MN'
  },
  {
    text: 'Martin, MN'
  },
  {
    text: 'Meeker, MN'
  },
  {
    text: 'Mille Lacs, MN'
  },
  {
    text: 'Morrison, MN'
  },
  {
    text: 'Mower, MN'
  },
  {
    text: 'Murray, MN'
  },
  {
    text: 'Nicollet, MN'
  },
  {
    text: 'Nobles, MN'
  },
  {
    text: 'Norman, MN'
  },
  {
    text: 'Olmsted, MN'
  },
  {
    text: 'Otter Tail, MN'
  },
  {
    text: 'Pennington, MN'
  },
  {
    text: 'Pine, MN'
  },
  {
    text: 'Pipestone, MN'
  },
  {
    text: 'Polk, MN'
  },
  {
    text: 'Pope, MN'
  },
  {
    text: 'Ramsey, MN'
  },
  {
    text: 'Red Lake, MN'
  },
  {
    text: 'Redwood, MN'
  },
  {
    text: 'Renville, MN'
  },
  {
    text: 'Rice, MN'
  },
  {
    text: 'Rock, MN'
  },
  {
    text: 'Roseau, MN'
  },
  {
    text: 'St. Louis, MN'
  },
  {
    text: 'Scott, MN'
  },
  {
    text: 'Sherburne, MN'
  },
  {
    text: 'Sibley, MN'
  },
  {
    text: 'Stearns, MN'
  },
  {
    text: 'Steele, MN'
  },
  {
    text: 'Stevens, MN'
  },
  {
    text: 'Swift, MN'
  },
  {
    text: 'Todd, MN'
  },
  {
    text: 'Traverse, MN'
  },
  {
    text: 'Wabasha, MN'
  },
  {
    text: 'Wadena, MN'
  },
  {
    text: 'Waseca, MN'
  },
  {
    text: 'Washington, MN'
  },
  {
    text: 'Watonwan, MN'
  },
  {
    text: 'Wilkin, MN'
  },
  {
    text: 'Winona, MN'
  },
  {
    text: 'Wright, MN'
  },
  {
    text: 'Yellow Medicine, MN'
  },
  {
    text: 'Apple Valley, MN'
  },
  {
    text: 'Blaine, MN'
  },
  {
    text: 'Bloomington, MN'
  },
  {
    text: 'Brooklyn Park, MN'
  },
  {
    text: 'Burnsville, MN'
  },
  {
    text: 'Coon Rapids, MN'
  },
  {
    text: 'Duluth, MN'
  },
  {
    text: 'Eagan, MN'
  },
  {
    text: 'Eden Prairie, MN'
  },
  {
    text: 'Edina, MN'
  },
  {
    text: 'Lakeville, MN'
  },
  {
    text: 'Maple Grove, MN'
  },
  {
    text: 'Minneapolis, MN'
  },
  {
    text: 'Minnetonka, MN'
  },
  {
    text: 'Plymouth, MN'
  },
  {
    text: 'Rochester, MN'
  },
  {
    text: 'St Cloud, MN'
  },
  {
    text: 'St Louis Park, MN'
  },
  {
    text: 'St Paul, MN'
  },
  {
    text: 'Shakopee, MN'
  },
  {
    text: 'Woodbury, MN'
  },
  {
    text: 'Adams, MS'
  },
  {
    text: 'Alcorn, MS'
  },
  {
    text: 'Amite, MS'
  },
  {
    text: 'Attala, MS'
  },
  {
    text: 'Benton, MS'
  },
  {
    text: 'Bolivar, MS'
  },
  {
    text: 'Calhoun, MS'
  },
  {
    text: 'Carroll, MS'
  },
  {
    text: 'Chickasaw, MS'
  },
  {
    text: 'Choctaw, MS'
  },
  {
    text: 'Claiborne, MS'
  },
  {
    text: 'Clarke, MS'
  },
  {
    text: 'Clay, MS'
  },
  {
    text: 'Coahoma, MS'
  },
  {
    text: 'Copiah, MS'
  },
  {
    text: 'Covington, MS'
  },
  {
    text: 'DeSoto, MS'
  },
  {
    text: 'Forrest, MS'
  },
  {
    text: 'Franklin, MS'
  },
  {
    text: 'George, MS'
  },
  {
    text: 'Greene, MS'
  },
  {
    text: 'Grenada, MS'
  },
  {
    text: 'Hancock, MS'
  },
  {
    text: 'Harrison, MS'
  },
  {
    text: 'Hinds, MS'
  },
  {
    text: 'Holmes, MS'
  },
  {
    text: 'Humphreys, MS'
  },
  {
    text: 'Issaquena, MS'
  },
  {
    text: 'Itawamba, MS'
  },
  {
    text: 'Jackson, MS'
  },
  {
    text: 'Jasper, MS'
  },
  {
    text: 'Jefferson, MS'
  },
  {
    text: 'Jefferson Davis, MS'
  },
  {
    text: 'Jones, MS'
  },
  {
    text: 'Kemper, MS'
  },
  {
    text: 'Lafayette, MS'
  },
  {
    text: 'Lamar, MS'
  },
  {
    text: 'Lauderdale, MS'
  },
  {
    text: 'Lawrence, MS'
  },
  {
    text: 'Leake, MS'
  },
  {
    text: 'Lee, MS'
  },
  {
    text: 'Leflore, MS'
  },
  {
    text: 'Lincoln, MS'
  },
  {
    text: 'Lowndes, MS'
  },
  {
    text: 'Madison, MS'
  },
  {
    text: 'Marion, MS'
  },
  {
    text: 'Marshall, MS'
  },
  {
    text: 'Monroe, MS'
  },
  {
    text: 'Montgomery, MS'
  },
  {
    text: 'Neshoba, MS'
  },
  {
    text: 'Newton, MS'
  },
  {
    text: 'Noxubee, MS'
  },
  {
    text: 'Oktibbeha, MS'
  },
  {
    text: 'Panola, MS'
  },
  {
    text: 'Pearl River, MS'
  },
  {
    text: 'Perry, MS'
  },
  {
    text: 'Pike, MS'
  },
  {
    text: 'Pontotoc, MS'
  },
  {
    text: 'Prentiss, MS'
  },
  {
    text: 'Quitman, MS'
  },
  {
    text: 'Rankin, MS'
  },
  {
    text: 'Scott, MS'
  },
  {
    text: 'Sharkey, MS'
  },
  {
    text: 'Simpson, MS'
  },
  {
    text: 'Smith, MS'
  },
  {
    text: 'Stone, MS'
  },
  {
    text: 'Sunflower, MS'
  },
  {
    text: 'Tallahatchie, MS'
  },
  {
    text: 'Tate, MS'
  },
  {
    text: 'Tippah, MS'
  },
  {
    text: 'Tishomingo, MS'
  },
  {
    text: 'Tunica, MS'
  },
  {
    text: 'Union, MS'
  },
  {
    text: 'Walthall, MS'
  },
  {
    text: 'Warren, MS'
  },
  {
    text: 'Washington, MS'
  },
  {
    text: 'Wayne, MS'
  },
  {
    text: 'Webster, MS'
  },
  {
    text: 'Wilkinson, MS'
  },
  {
    text: 'Winston, MS'
  },
  {
    text: 'Yalobusha, MS'
  },
  {
    text: 'Yazoo, MS'
  },
  {
    text: 'Biloxi, MS'
  },
  {
    text: 'Gulfport, MS'
  },
  {
    text: 'Hattiesburg, MS'
  },
  {
    text: 'Jackson, MS'
  },
  {
    text: 'Meridian, MS'
  },
  {
    text: 'Southaven, MS'
  },
  {
    text: 'Adair, MO'
  },
  {
    text: 'Andrew, MO'
  },
  {
    text: 'Atchison, MO'
  },
  {
    text: 'Audrain, MO'
  },
  {
    text: 'Barry, MO'
  },
  {
    text: 'Barton, MO'
  },
  {
    text: 'Bates, MO'
  },
  {
    text: 'Benton, MO'
  },
  {
    text: 'Bollinger, MO'
  },
  {
    text: 'Boone, MO'
  },
  {
    text: 'Buchanan, MO'
  },
  {
    text: 'Butler, MO'
  },
  {
    text: 'Caldwell, MO'
  },
  {
    text: 'Callaway, MO'
  },
  {
    text: 'Camden, MO'
  },
  {
    text: 'Cape Girardeau, MO'
  },
  {
    text: 'Carroll, MO'
  },
  {
    text: 'Carter, MO'
  },
  {
    text: 'Cass, MO'
  },
  {
    text: 'Cedar, MO'
  },
  {
    text: 'Chariton, MO'
  },
  {
    text: 'Christian, MO'
  },
  {
    text: 'Clark, MO'
  },
  {
    text: 'Clay, MO'
  },
  {
    text: 'Clinton, MO'
  },
  {
    text: 'Cole, MO'
  },
  {
    text: 'Cooper, MO'
  },
  {
    text: 'Crawford, MO'
  },
  {
    text: 'Dade, MO'
  },
  {
    text: 'Dallas, MO'
  },
  {
    text: 'Daviess, MO'
  },
  {
    text: 'DeKalb, MO'
  },
  {
    text: 'Dent, MO'
  },
  {
    text: 'Douglas, MO'
  },
  {
    text: 'Dunklin, MO'
  },
  {
    text: 'Franklin, MO'
  },
  {
    text: 'Gasconade, MO'
  },
  {
    text: 'Gentry, MO'
  },
  {
    text: 'Greene, MO'
  },
  {
    text: 'Grundy, MO'
  },
  {
    text: 'Harrison, MO'
  },
  {
    text: 'Henry, MO'
  },
  {
    text: 'Hickory, MO'
  },
  {
    text: 'Holt, MO'
  },
  {
    text: 'Howard, MO'
  },
  {
    text: 'Howell, MO'
  },
  {
    text: 'Iron, MO'
  },
  {
    text: 'Jackson, MO'
  },
  {
    text: 'Jasper, MO'
  },
  {
    text: 'Jefferson, MO'
  },
  {
    text: 'Johnson, MO'
  },
  {
    text: 'Knox, MO'
  },
  {
    text: 'Laclede, MO'
  },
  {
    text: 'Lafayette, MO'
  },
  {
    text: 'Lawrence, MO'
  },
  {
    text: 'Lewis, MO'
  },
  {
    text: 'Lincoln, MO'
  },
  {
    text: 'Linn, MO'
  },
  {
    text: 'Livingston, MO'
  },
  {
    text: 'McDonald, MO'
  },
  {
    text: 'Macon, MO'
  },
  {
    text: 'Madison, MO'
  },
  {
    text: 'Maries, MO'
  },
  {
    text: 'Marion, MO'
  },
  {
    text: 'Mercer, MO'
  },
  {
    text: 'Miller, MO'
  },
  {
    text: 'Mississippi, MO'
  },
  {
    text: 'Moniteau, MO'
  },
  {
    text: 'Monroe, MO'
  },
  {
    text: 'Montgomery, MO'
  },
  {
    text: 'Morgan, MO'
  },
  {
    text: 'New Madrid, MO'
  },
  {
    text: 'Newton, MO'
  },
  {
    text: 'Nodaway, MO'
  },
  {
    text: 'Oregon, MO'
  },
  {
    text: 'Osage, MO'
  },
  {
    text: 'Ozark, MO'
  },
  {
    text: 'Pemiscot, MO'
  },
  {
    text: 'Perry, MO'
  },
  {
    text: 'Pettis, MO'
  },
  {
    text: 'Phelps, MO'
  },
  {
    text: 'Pike, MO'
  },
  {
    text: 'Platte, MO'
  },
  {
    text: 'Polk, MO'
  },
  {
    text: 'Pulaski, MO'
  },
  {
    text: 'Putnam, MO'
  },
  {
    text: 'Ralls, MO'
  },
  {
    text: 'Randolph, MO'
  },
  {
    text: 'Ray, MO'
  },
  {
    text: 'Reynolds, MO'
  },
  {
    text: 'Ripley, MO'
  },
  {
    text: 'St. Charles, MO'
  },
  {
    text: 'St. Clair, MO'
  },
  {
    text: 'Ste. Genevieve, MO'
  },
  {
    text: 'St. Francois, MO'
  },
  {
    text: 'St. Louis, MO'
  },
  {
    text: 'Saline, MO'
  },
  {
    text: 'Schuyler, MO'
  },
  {
    text: 'Scotland, MO'
  },
  {
    text: 'Scott, MO'
  },
  {
    text: 'Shannon, MO'
  },
  {
    text: 'Shelby, MO'
  },
  {
    text: 'Stoddard, MO'
  },
  {
    text: 'Stone, MO'
  },
  {
    text: 'Sullivan, MO'
  },
  {
    text: 'Taney, MO'
  },
  {
    text: 'Texas, MO'
  },
  {
    text: 'Vernon, MO'
  },
  {
    text: 'Warren, MO'
  },
  {
    text: 'Washington, MO'
  },
  {
    text: 'Wayne, MO'
  },
  {
    text: 'Webster, MO'
  },
  {
    text: 'Worth, MO'
  },
  {
    text: 'Wright, MO'
  },
  {
    text: 'Blue Springs, MO'
  },
  {
    text: 'Chesterfield, MO'
  },
  {
    text: 'Columbia, MO'
  },
  {
    text: 'Florissant, MO'
  },
  {
    text: 'Independence, MO'
  },
  {
    text: 'Jefferson City, MO'
  },
  {
    text: 'Joplin, MO'
  },
  {
    text: 'Kansas City, MO'
  },
  {
    text: 'Lees Summit, MO'
  },
  {
    text: 'OFallon, MO'
  },
  {
    text: 'St Charles, MO'
  },
  {
    text: 'St Joseph, MO'
  },
  {
    text: 'St Louis, MO'
  },
  {
    text: 'St Peters, MO'
  },
  {
    text: 'Springfield, MO'
  },
  {
    text: 'Beaverhead, MT'
  },
  {
    text: 'Big Horn, MT'
  },
  {
    text: 'Blaine, MT'
  },
  {
    text: 'Broadwater, MT'
  },
  {
    text: 'Carbon, MT'
  },
  {
    text: 'Carter, MT'
  },
  {
    text: 'Cascade, MT'
  },
  {
    text: 'Chouteau, MT'
  },
  {
    text: 'Custer, MT'
  },
  {
    text: 'Daniels, MT'
  },
  {
    text: 'Dawson, MT'
  },
  {
    text: 'Deer Lodge, MT'
  },
  {
    text: 'Fallon, MT'
  },
  {
    text: 'Fergus, MT'
  },
  {
    text: 'Flathead, MT'
  },
  {
    text: 'Gallatin, MT'
  },
  {
    text: 'Garfield, MT'
  },
  {
    text: 'Glacier, MT'
  },
  {
    text: 'Golden Valley, MT'
  },
  {
    text: 'Granite, MT'
  },
  {
    text: 'Hill, MT'
  },
  {
    text: 'Jefferson, MT'
  },
  {
    text: 'Judith Basin, MT'
  },
  {
    text: 'Lake, MT'
  },
  {
    text: 'Lewis and Clark, MT'
  },
  {
    text: 'Liberty, MT'
  },
  {
    text: 'Lincoln, MT'
  },
  {
    text: 'McCone, MT'
  },
  {
    text: 'Madison, MT'
  },
  {
    text: 'Meagher, MT'
  },
  {
    text: 'Mineral, MT'
  },
  {
    text: 'Missoula, MT'
  },
  {
    text: 'Musselshell, MT'
  },
  {
    text: 'Park, MT'
  },
  {
    text: 'Petroleum, MT'
  },
  {
    text: 'Phillips, MT'
  },
  {
    text: 'Pondera, MT'
  },
  {
    text: 'Powder River, MT'
  },
  {
    text: 'Powell, MT'
  },
  {
    text: 'Prairie, MT'
  },
  {
    text: 'Ravalli, MT'
  },
  {
    text: 'Richland, MT'
  },
  {
    text: 'Roosevelt, MT'
  },
  {
    text: 'Rosebud, MT'
  },
  {
    text: 'Sanders, MT'
  },
  {
    text: 'Sheridan, MT'
  },
  {
    text: 'Silver Bow, MT'
  },
  {
    text: 'Stillwater, MT'
  },
  {
    text: 'Sweet Grass, MT'
  },
  {
    text: 'Teton, MT'
  },
  {
    text: 'Toole, MT'
  },
  {
    text: 'Treasure, MT'
  },
  {
    text: 'Valley, MT'
  },
  {
    text: 'Wheatland, MT'
  },
  {
    text: 'Wibaux, MT'
  },
  {
    text: 'Yellowstone, MT'
  },
  {
    text: 'Billings, MT'
  },
  {
    text: 'Great Falls, MT'
  },
  {
    text: 'Missoula, MT'
  },
  {
    text: 'Adams, NE'
  },
  {
    text: 'Antelope, NE'
  },
  {
    text: 'Arthur, NE'
  },
  {
    text: 'Banner, NE'
  },
  {
    text: 'Blaine, NE'
  },
  {
    text: 'Boone, NE'
  },
  {
    text: 'Box Butte, NE'
  },
  {
    text: 'Boyd, NE'
  },
  {
    text: 'Brown, NE'
  },
  {
    text: 'Buffalo, NE'
  },
  {
    text: 'Burt, NE'
  },
  {
    text: 'Butler, NE'
  },
  {
    text: 'Cass, NE'
  },
  {
    text: 'Cedar, NE'
  },
  {
    text: 'Chase, NE'
  },
  {
    text: 'Cherry, NE'
  },
  {
    text: 'Cheyenne, NE'
  },
  {
    text: 'Clay, NE'
  },
  {
    text: 'Colfax, NE'
  },
  {
    text: 'Cuming, NE'
  },
  {
    text: 'Custer, NE'
  },
  {
    text: 'Dakota, NE'
  },
  {
    text: 'Dawes, NE'
  },
  {
    text: 'Dawson, NE'
  },
  {
    text: 'Deuel, NE'
  },
  {
    text: 'Dixon, NE'
  },
  {
    text: 'Dodge, NE'
  },
  {
    text: 'Douglas, NE'
  },
  {
    text: 'Dundy, NE'
  },
  {
    text: 'Fillmore, NE'
  },
  {
    text: 'Franklin, NE'
  },
  {
    text: 'Frontier, NE'
  },
  {
    text: 'Furnas, NE'
  },
  {
    text: 'Gage, NE'
  },
  {
    text: 'Garden, NE'
  },
  {
    text: 'Garfield, NE'
  },
  {
    text: 'Gosper, NE'
  },
  {
    text: 'Grant, NE'
  },
  {
    text: 'Greeley, NE'
  },
  {
    text: 'Hall, NE'
  },
  {
    text: 'Hamilton, NE'
  },
  {
    text: 'Harlan, NE'
  },
  {
    text: 'Hayes, NE'
  },
  {
    text: 'Hitchcock, NE'
  },
  {
    text: 'Holt, NE'
  },
  {
    text: 'Hooker, NE'
  },
  {
    text: 'Howard, NE'
  },
  {
    text: 'Jefferson, NE'
  },
  {
    text: 'Johnson, NE'
  },
  {
    text: 'Kearney, NE'
  },
  {
    text: 'Keith, NE'
  },
  {
    text: 'Keya Paha, NE'
  },
  {
    text: 'Kimball, NE'
  },
  {
    text: 'Knox, NE'
  },
  {
    text: 'Lancaster, NE'
  },
  {
    text: 'Lincoln, NE'
  },
  {
    text: 'Logan, NE'
  },
  {
    text: 'Loup, NE'
  },
  {
    text: 'McPherson, NE'
  },
  {
    text: 'Madison, NE'
  },
  {
    text: 'Merrick, NE'
  },
  {
    text: 'Morrill, NE'
  },
  {
    text: 'Nance, NE'
  },
  {
    text: 'Nemaha, NE'
  },
  {
    text: 'Nuckolls, NE'
  },
  {
    text: 'Otoe, NE'
  },
  {
    text: 'Pawnee, NE'
  },
  {
    text: 'Perkins, NE'
  },
  {
    text: 'Phelps, NE'
  },
  {
    text: 'Pierce, NE'
  },
  {
    text: 'Platte, NE'
  },
  {
    text: 'Polk, NE'
  },
  {
    text: 'Red Willow, NE'
  },
  {
    text: 'Richardson, NE'
  },
  {
    text: 'Rock, NE'
  },
  {
    text: 'Saline, NE'
  },
  {
    text: 'Sarpy, NE'
  },
  {
    text: 'Saunders, NE'
  },
  {
    text: 'Scotts Bluff, NE'
  },
  {
    text: 'Seward, NE'
  },
  {
    text: 'Sheridan, NE'
  },
  {
    text: 'Sherman, NE'
  },
  {
    text: 'Sioux, NE'
  },
  {
    text: 'Stanton, NE'
  },
  {
    text: 'Thayer, NE'
  },
  {
    text: 'Thomas, NE'
  },
  {
    text: 'Thurston, NE'
  },
  {
    text: 'Valley, NE'
  },
  {
    text: 'Washington, NE'
  },
  {
    text: 'Wayne, NE'
  },
  {
    text: 'Webster, NE'
  },
  {
    text: 'Wheeler, NE'
  },
  {
    text: 'York, NE'
  },
  {
    text: 'Bellevue, NE'
  },
  {
    text: 'Grand Island, NE'
  },
  {
    text: 'Lincoln, NE'
  },
  {
    text: 'Omaha, NE'
  },
  {
    text: 'Churchill, NV'
  },
  {
    text: 'Clark, NV'
  },
  {
    text: 'Douglas, NV'
  },
  {
    text: 'Elko, NV'
  },
  {
    text: 'Esmeralda, NV'
  },
  {
    text: 'Eureka, NV'
  },
  {
    text: 'Humboldt, NV'
  },
  {
    text: 'Lander, NV'
  },
  {
    text: 'Lincoln, NV'
  },
  {
    text: 'Lyon, NV'
  },
  {
    text: 'Mineral, NV'
  },
  {
    text: 'Nye, NV'
  },
  {
    text: 'Pershing, NV'
  },
  {
    text: 'Storey, NV'
  },
  {
    text: 'Washoe, NV'
  },
  {
    text: 'White Pine, NV'
  },
  {
    text: 'Carson City, NV'
  },
  {
    text: 'Enterprise, NV'
  },
  {
    text: 'Henderson, NV'
  },
  {
    text: 'Las Vegas, NV'
  },
  {
    text: 'North Las Vegas, NV'
  },
  {
    text: 'Paradise, NV'
  },
  {
    text: 'Reno, NV'
  },
  {
    text: 'Sparks, NV'
  },
  {
    text: 'Spring Valley, NV'
  },
  {
    text: 'Sunrise Manor, NV'
  },
  {
    text: 'Whitney, NV'
  },
  {
    text: 'Belknap, NH'
  },
  {
    text: 'Carroll, NH'
  },
  {
    text: 'Cheshire, NH'
  },
  {
    text: 'Coos, NH'
  },
  {
    text: 'Grafton, NH'
  },
  {
    text: 'Hillsborough, NH'
  },
  {
    text: 'Merrimack, NH'
  },
  {
    text: 'Rockingham, NH'
  },
  {
    text: 'Strafford, NH'
  },
  {
    text: 'Sullivan, NH'
  },
  {
    text: 'Concord, NH'
  },
  {
    text: 'Manchester, NH'
  },
  {
    text: 'Nashua, NH'
  },
  {
    text: 'Atlantic, NJ'
  },
  {
    text: 'Bergen, NJ'
  },
  {
    text: 'Burlington, NJ'
  },
  {
    text: 'Camden, NJ'
  },
  {
    text: 'Cape May, NJ'
  },
  {
    text: 'Cumberland, NJ'
  },
  {
    text: 'Essex, NJ'
  },
  {
    text: 'Gloucester, NJ'
  },
  {
    text: 'Hudson, NJ'
  },
  {
    text: 'Hunterdon, NJ'
  },
  {
    text: 'Mercer, NJ'
  },
  {
    text: 'Middlesex, NJ'
  },
  {
    text: 'Monmouth, NJ'
  },
  {
    text: 'Morris, NJ'
  },
  {
    text: 'Ocean, NJ'
  },
  {
    text: 'Passaic, NJ'
  },
  {
    text: 'Salem, NJ'
  },
  {
    text: 'Somerset, NJ'
  },
  {
    text: 'Sussex, NJ'
  },
  {
    text: 'Union, NJ'
  },
  {
    text: 'Warren, NJ'
  },
  {
    text: 'Bayonne, NJ'
  },
  {
    text: 'Camden, NJ'
  },
  {
    text: 'Clifton, NJ'
  },
  {
    text: 'East Orange, NJ'
  },
  {
    text: 'Elizabeth, NJ'
  },
  {
    text: 'Hackensack, NJ'
  },
  {
    text: 'Hoboken, NJ'
  },
  {
    text: 'Jersey City, NJ'
  },
  {
    text: 'Kearny, NJ'
  },
  {
    text: 'Lakewood Township, NJ'
  },
  {
    text: 'Newark, NJ'
  },
  {
    text: 'New Brunswick, NJ'
  },
  {
    text: 'Passaic, NJ'
  },
  {
    text: 'Paterson, NJ'
  },
  {
    text: 'Perth Amboy, NJ'
  },
  {
    text: 'Plainfield, NJ'
  },
  {
    text: 'Sayreville, NJ'
  },
  {
    text: 'Toms River, NJ'
  },
  {
    text: 'Trenton, NJ'
  },
  {
    text: 'Union City, NJ'
  },
  {
    text: 'Union, NJ'
  },
  {
    text: 'Vineland, NJ'
  },
  {
    text: 'West New York, NJ'
  },
  {
    text: 'Bernalillo, NM'
  },
  {
    text: 'Catron, NM'
  },
  {
    text: 'Chaves, NM'
  },
  {
    text: 'Cibola, NM'
  },
  {
    text: 'Colfax, NM'
  },
  {
    text: 'Curry, NM'
  },
  {
    text: 'De Baca, NM'
  },
  {
    text: 'Dona Ana, NM'
  },
  {
    text: 'Eddy, NM'
  },
  {
    text: 'Grant, NM'
  },
  {
    text: 'Guadalupe, NM'
  },
  {
    text: 'Harding, NM'
  },
  {
    text: 'Hidalgo, NM'
  },
  {
    text: 'Lea, NM'
  },
  {
    text: 'Lincoln, NM'
  },
  {
    text: 'Los Alamos, NM'
  },
  {
    text: 'Luna, NM'
  },
  {
    text: 'McKinley, NM'
  },
  {
    text: 'Mora, NM'
  },
  {
    text: 'Otero, NM'
  },
  {
    text: 'Quay, NM'
  },
  {
    text: 'Rio Arriba, NM'
  },
  {
    text: 'Roosevelt, NM'
  },
  {
    text: 'Sandoval, NM'
  },
  {
    text: 'San Juan, NM'
  },
  {
    text: 'San Miguel, NM'
  },
  {
    text: 'Santa Fe, NM'
  },
  {
    text: 'Sierra, NM'
  },
  {
    text: 'Socorro, NM'
  },
  {
    text: 'Taos, NM'
  },
  {
    text: 'Torrance, NM'
  },
  {
    text: 'Union, NM'
  },
  {
    text: 'Valencia, NM'
  },
  {
    text: 'Albuquerque, NM'
  },
  {
    text: 'Farmington, NM'
  },
  {
    text: 'Las Cruces, NM'
  },
  {
    text: 'Rio Rancho, NM'
  },
  {
    text: 'Roswell, NM'
  },
  {
    text: 'Santa Fe, NM'
  },
  {
    text: 'South Valley, NM'
  },
  {
    text: 'Albany, NY'
  },
  {
    text: 'Allegany, NY'
  },
  {
    text: 'Bronx, NY'
  },
  {
    text: 'Broome, NY'
  },
  {
    text: 'Cattaraugus, NY'
  },
  {
    text: 'Cayuga, NY'
  },
  {
    text: 'Chautauqua, NY'
  },
  {
    text: 'Chemung, NY'
  },
  {
    text: 'Chenango, NY'
  },
  {
    text: 'Clinton, NY'
  },
  {
    text: 'Columbia, NY'
  },
  {
    text: 'Cortland, NY'
  },
  {
    text: 'Delaware, NY'
  },
  {
    text: 'Dutchess, NY'
  },
  {
    text: 'Erie, NY'
  },
  {
    text: 'Essex, NY'
  },
  {
    text: 'Franklin, NY'
  },
  {
    text: 'Fulton, NY'
  },
  {
    text: 'Genesee, NY'
  },
  {
    text: 'Greene, NY'
  },
  {
    text: 'Hamilton, NY'
  },
  {
    text: 'Herkimer, NY'
  },
  {
    text: 'Jefferson, NY'
  },
  {
    text: 'Kings, NY'
  },
  {
    text: 'Lewis, NY'
  },
  {
    text: 'Livingston, NY'
  },
  {
    text: 'Madison, NY'
  },
  {
    text: 'Monroe, NY'
  },
  {
    text: 'Montgomery, NY'
  },
  {
    text: 'Nassau, NY'
  },
  {
    text: 'New York, NY'
  },
  {
    text: 'Niagara, NY'
  },
  {
    text: 'Oneida, NY'
  },
  {
    text: 'Onondaga, NY'
  },
  {
    text: 'Ontario, NY'
  },
  {
    text: 'Orange, NY'
  },
  {
    text: 'Orleans, NY'
  },
  {
    text: 'Oswego, NY'
  },
  {
    text: 'Otsego, NY'
  },
  {
    text: 'Putnam, NY'
  },
  {
    text: 'Queens, NY'
  },
  {
    text: 'Rensselaer, NY'
  },
  {
    text: 'Richmond, NY'
  },
  {
    text: 'Rockland, NY'
  },
  {
    text: 'St. Lawrence, NY'
  },
  {
    text: 'Saratoga, NY'
  },
  {
    text: 'Schenectady, NY'
  },
  {
    text: 'Schoharie, NY'
  },
  {
    text: 'Schuyler, NY'
  },
  {
    text: 'Seneca, NY'
  },
  {
    text: 'Steuben, NY'
  },
  {
    text: 'Suffolk, NY'
  },
  {
    text: 'Sullivan, NY'
  },
  {
    text: 'Tioga, NY'
  },
  {
    text: 'Tompkins, NY'
  },
  {
    text: 'Ulster, NY'
  },
  {
    text: 'Warren, NY'
  },
  {
    text: 'Washington, NY'
  },
  {
    text: 'Wayne, NY'
  },
  {
    text: 'Westchester, NY'
  },
  {
    text: 'Wyoming, NY'
  },
  {
    text: 'Yates, NY'
  },
  {
    text: 'Albany, NY'
  },
  {
    text: 'Binghamton, NY'
  },
  {
    text: 'Brentwood, NY'
  },
  {
    text: 'Buffalo, NY'
  },
  {
    text: 'Cheektowaga, NY'
  },
  {
    text: 'Freeport, NY'
  },
  {
    text: 'Hempstead, NY'
  },
  {
    text: 'Hicksville, NY'
  },
  {
    text: 'Irondequoit, NY'
  },
  {
    text: 'Levittown, NY'
  },
  {
    text: 'Mt Vernon, NY'
  },
  {
    text: 'New Rochelle, NY'
  },
  {
    text: 'New York, NY'
  },
  {
    text: 'Manhattan, NY'
  },
  {
    text: 'Niagara Falls, NY'
  },
  {
    text: 'Rochester, NY'
  },
  {
    text: 'Schenectady, NY'
  },
  {
    text: 'Syracuse, NY'
  },
  {
    text: 'Troy, NY'
  },
  {
    text: 'Utica, NY'
  },
  {
    text: 'West Babylon, NY'
  },
  {
    text: 'West Seneca, NY'
  },
  {
    text: 'White Plains, NY'
  },
  {
    text: 'Yonkers, NY'
  },
  {
    text: 'Alamance, NC'
  },
  {
    text: 'Alexander, NC'
  },
  {
    text: 'Alleghany, NC'
  },
  {
    text: 'Anson, NC'
  },
  {
    text: 'Ashe, NC'
  },
  {
    text: 'Avery, NC'
  },
  {
    text: 'Beaufort, NC'
  },
  {
    text: 'Bertie, NC'
  },
  {
    text: 'Bladen, NC'
  },
  {
    text: 'Brunswick, NC'
  },
  {
    text: 'Buncombe, NC'
  },
  {
    text: 'Burke, NC'
  },
  {
    text: 'Cabarrus, NC'
  },
  {
    text: 'Caldwell, NC'
  },
  {
    text: 'Camden, NC'
  },
  {
    text: 'Carteret, NC'
  },
  {
    text: 'Caswell, NC'
  },
  {
    text: 'Catawba, NC'
  },
  {
    text: 'Chatham, NC'
  },
  {
    text: 'Cherokee, NC'
  },
  {
    text: 'Chowan, NC'
  },
  {
    text: 'Clay, NC'
  },
  {
    text: 'Cleveland, NC'
  },
  {
    text: 'Columbus, NC'
  },
  {
    text: 'Craven, NC'
  },
  {
    text: 'Cumberland, NC'
  },
  {
    text: 'Currituck, NC'
  },
  {
    text: 'Dare, NC'
  },
  {
    text: 'Davidson, NC'
  },
  {
    text: 'Davie, NC'
  },
  {
    text: 'Duplin, NC'
  },
  {
    text: 'Durham, NC'
  },
  {
    text: 'Edgecombe, NC'
  },
  {
    text: 'Forsyth, NC'
  },
  {
    text: 'Franklin, NC'
  },
  {
    text: 'Gaston, NC'
  },
  {
    text: 'Gates, NC'
  },
  {
    text: 'Graham, NC'
  },
  {
    text: 'Granville, NC'
  },
  {
    text: 'Greene, NC'
  },
  {
    text: 'Guilford, NC'
  },
  {
    text: 'Halifax, NC'
  },
  {
    text: 'Harnett, NC'
  },
  {
    text: 'Haywood, NC'
  },
  {
    text: 'Henderson, NC'
  },
  {
    text: 'Hertford, NC'
  },
  {
    text: 'Hoke, NC'
  },
  {
    text: 'Hyde, NC'
  },
  {
    text: 'Iredell, NC'
  },
  {
    text: 'Jackson, NC'
  },
  {
    text: 'Johnston, NC'
  },
  {
    text: 'Jones, NC'
  },
  {
    text: 'Lee, NC'
  },
  {
    text: 'Lenoir, NC'
  },
  {
    text: 'Lincoln, NC'
  },
  {
    text: 'McDowell, NC'
  },
  {
    text: 'Macon, NC'
  },
  {
    text: 'Madison, NC'
  },
  {
    text: 'Martin, NC'
  },
  {
    text: 'Mecklenburg, NC'
  },
  {
    text: 'Mitchell, NC'
  },
  {
    text: 'Montgomery, NC'
  },
  {
    text: 'Moore, NC'
  },
  {
    text: 'Nash, NC'
  },
  {
    text: 'New Hanover, NC'
  },
  {
    text: 'Northampton, NC'
  },
  {
    text: 'Onslow, NC'
  },
  {
    text: 'Orange, NC'
  },
  {
    text: 'Pamlico, NC'
  },
  {
    text: 'Pasquotank, NC'
  },
  {
    text: 'Pender, NC'
  },
  {
    text: 'Perquimans, NC'
  },
  {
    text: 'Person, NC'
  },
  {
    text: 'Pitt, NC'
  },
  {
    text: 'Polk, NC'
  },
  {
    text: 'Randolph, NC'
  },
  {
    text: 'Richmond, NC'
  },
  {
    text: 'Robeson, NC'
  },
  {
    text: 'Rockingham, NC'
  },
  {
    text: 'Rowan, NC'
  },
  {
    text: 'Rutherford, NC'
  },
  {
    text: 'Sampson, NC'
  },
  {
    text: 'Scotland, NC'
  },
  {
    text: 'Stanly, NC'
  },
  {
    text: 'Stokes, NC'
  },
  {
    text: 'Surry, NC'
  },
  {
    text: 'Swain, NC'
  },
  {
    text: 'Transylvania, NC'
  },
  {
    text: 'Tyrrell, NC'
  },
  {
    text: 'Union, NC'
  },
  {
    text: 'Vance, NC'
  },
  {
    text: 'Wake, NC'
  },
  {
    text: 'Warren, NC'
  },
  {
    text: 'Washington, NC'
  },
  {
    text: 'Watauga, NC'
  },
  {
    text: 'Wayne, NC'
  },
  {
    text: 'Wilkes, NC'
  },
  {
    text: 'Wilson, NC'
  },
  {
    text: 'Yadkin, NC'
  },
  {
    text: 'Yancey, NC'
  },
  {
    text: 'Apex, NC'
  },
  {
    text: 'Asheville, NC'
  },
  {
    text: 'Burlington, NC'
  },
  {
    text: 'Cary, NC'
  },
  {
    text: 'Chapel Hill, NC'
  },
  {
    text: 'Charlotte, NC'
  },
  {
    text: 'Concord, NC'
  },
  {
    text: 'Durham, NC'
  },
  {
    text: 'Fayetteville, NC'
  },
  {
    text: 'Gastonia, NC'
  },
  {
    text: 'Greensboro, NC'
  },
  {
    text: 'Greenville, NC'
  },
  {
    text: 'High Point, NC'
  },
  {
    text: 'Huntersville, NC'
  },
  {
    text: 'Jacksonville, NC'
  },
  {
    text: 'Kannapolis, NC'
  },
  {
    text: 'Raleigh, NC'
  },
  {
    text: 'Rocky Mt, NC'
  },
  {
    text: 'Wilmington, NC'
  },
  {
    text: 'Wilson, NC'
  },
  {
    text: 'Winston-Salem, NC'
  },
  {
    text: 'Adams, ND'
  },
  {
    text: 'Barnes, ND'
  },
  {
    text: 'Benson, ND'
  },
  {
    text: 'Billings, ND'
  },
  {
    text: 'Bottineau, ND'
  },
  {
    text: 'Bowman, ND'
  },
  {
    text: 'Burke, ND'
  },
  {
    text: 'Burleigh, ND'
  },
  {
    text: 'Cass, ND'
  },
  {
    text: 'Cavalier, ND'
  },
  {
    text: 'Dickey, ND'
  },
  {
    text: 'Divide, ND'
  },
  {
    text: 'Dunn, ND'
  },
  {
    text: 'Eddy, ND'
  },
  {
    text: 'Emmons, ND'
  },
  {
    text: 'Foster, ND'
  },
  {
    text: 'Golden Valley, ND'
  },
  {
    text: 'Grand Forks, ND'
  },
  {
    text: 'Grant, ND'
  },
  {
    text: 'Griggs, ND'
  },
  {
    text: 'Hettinger, ND'
  },
  {
    text: 'Kidder, ND'
  },
  {
    text: 'LaMoure, ND'
  },
  {
    text: 'Logan, ND'
  },
  {
    text: 'McHenry, ND'
  },
  {
    text: 'McIntosh, ND'
  },
  {
    text: 'McKenzie, ND'
  },
  {
    text: 'McLean, ND'
  },
  {
    text: 'Mercer, ND'
  },
  {
    text: 'Morton, ND'
  },
  {
    text: 'Mountrail, ND'
  },
  {
    text: 'Nelson, ND'
  },
  {
    text: 'Oliver, ND'
  },
  {
    text: 'Pembina, ND'
  },
  {
    text: 'Pierce, ND'
  },
  {
    text: 'Ramsey, ND'
  },
  {
    text: 'Ransom, ND'
  },
  {
    text: 'Renville, ND'
  },
  {
    text: 'Richland, ND'
  },
  {
    text: 'Rolette, ND'
  },
  {
    text: 'Sargent, ND'
  },
  {
    text: 'Sheridan, ND'
  },
  {
    text: 'Sioux, ND'
  },
  {
    text: 'Slope, ND'
  },
  {
    text: 'Stark, ND'
  },
  {
    text: 'Steele, ND'
  },
  {
    text: 'Stutsman, ND'
  },
  {
    text: 'Towner, ND'
  },
  {
    text: 'Traill, ND'
  },
  {
    text: 'Walsh, ND'
  },
  {
    text: 'Ward, ND'
  },
  {
    text: 'Wells, ND'
  },
  {
    text: 'Williams, ND'
  },
  {
    text: 'Bismarck, ND'
  },
  {
    text: 'Fargo, ND'
  },
  {
    text: 'Grand Forks, ND'
  },
  {
    text: 'Minot, ND'
  },
  {
    text: 'Adams, OH'
  },
  {
    text: 'Allen, OH'
  },
  {
    text: 'Ashland, OH'
  },
  {
    text: 'Ashtabula, OH'
  },
  {
    text: 'Athens, OH'
  },
  {
    text: 'Auglaize, OH'
  },
  {
    text: 'Belmont, OH'
  },
  {
    text: 'Brown, OH'
  },
  {
    text: 'Butler, OH'
  },
  {
    text: 'Carroll, OH'
  },
  {
    text: 'Champaign, OH'
  },
  {
    text: 'Clark, OH'
  },
  {
    text: 'Clermont, OH'
  },
  {
    text: 'Clinton, OH'
  },
  {
    text: 'Columbiana, OH'
  },
  {
    text: 'Coshocton, OH'
  },
  {
    text: 'Crawford, OH'
  },
  {
    text: 'Cuyahoga, OH'
  },
  {
    text: 'Darke, OH'
  },
  {
    text: 'Defiance, OH'
  },
  {
    text: 'Delaware, OH'
  },
  {
    text: 'Erie, OH'
  },
  {
    text: 'Fairfield, OH'
  },
  {
    text: 'Fayette, OH'
  },
  {
    text: 'Franklin, OH'
  },
  {
    text: 'Fulton, OH'
  },
  {
    text: 'Gallia, OH'
  },
  {
    text: 'Geauga, OH'
  },
  {
    text: 'Greene, OH'
  },
  {
    text: 'Guernsey, OH'
  },
  {
    text: 'Hamilton, OH'
  },
  {
    text: 'Hancock, OH'
  },
  {
    text: 'Hardin, OH'
  },
  {
    text: 'Harrison, OH'
  },
  {
    text: 'Henry, OH'
  },
  {
    text: 'Highland, OH'
  },
  {
    text: 'Hocking, OH'
  },
  {
    text: 'Holmes, OH'
  },
  {
    text: 'Huron, OH'
  },
  {
    text: 'Jackson, OH'
  },
  {
    text: 'Jefferson, OH'
  },
  {
    text: 'Knox, OH'
  },
  {
    text: 'Lake, OH'
  },
  {
    text: 'Lawrence, OH'
  },
  {
    text: 'Licking, OH'
  },
  {
    text: 'Logan, OH'
  },
  {
    text: 'Lorain, OH'
  },
  {
    text: 'Lucas, OH'
  },
  {
    text: 'Madison, OH'
  },
  {
    text: 'Mahoning, OH'
  },
  {
    text: 'Marion, OH'
  },
  {
    text: 'Medina, OH'
  },
  {
    text: 'Meigs, OH'
  },
  {
    text: 'Mercer, OH'
  },
  {
    text: 'Miami, OH'
  },
  {
    text: 'Monroe, OH'
  },
  {
    text: 'Montgomery, OH'
  },
  {
    text: 'Morgan, OH'
  },
  {
    text: 'Morrow, OH'
  },
  {
    text: 'Muskingum, OH'
  },
  {
    text: 'Noble, OH'
  },
  {
    text: 'Ottawa, OH'
  },
  {
    text: 'Paulding, OH'
  },
  {
    text: 'Perry, OH'
  },
  {
    text: 'Pickaway, OH'
  },
  {
    text: 'Pike, OH'
  },
  {
    text: 'Portage, OH'
  },
  {
    text: 'Preble, OH'
  },
  {
    text: 'Putnam, OH'
  },
  {
    text: 'Richland, OH'
  },
  {
    text: 'Ross, OH'
  },
  {
    text: 'Sandusky, OH'
  },
  {
    text: 'Scioto, OH'
  },
  {
    text: 'Seneca, OH'
  },
  {
    text: 'Shelby, OH'
  },
  {
    text: 'Stark, OH'
  },
  {
    text: 'Summit, OH'
  },
  {
    text: 'Trumbull, OH'
  },
  {
    text: 'Tuscarawas, OH'
  },
  {
    text: 'Union, OH'
  },
  {
    text: 'Van Wert, OH'
  },
  {
    text: 'Vinton, OH'
  },
  {
    text: 'Warren, OH'
  },
  {
    text: 'Washington, OH'
  },
  {
    text: 'Wayne, OH'
  },
  {
    text: 'Williams, OH'
  },
  {
    text: 'Wood, OH'
  },
  {
    text: 'Wyandot, OH'
  },
  {
    text: 'Akron, OH'
  },
  {
    text: 'Beavercreek, OH'
  },
  {
    text: 'Canton, OH'
  },
  {
    text: 'Centerville, OH'
  },
  {
    text: 'Cincinnati, OH'
  },
  {
    text: 'Cleveland, OH'
  },
  {
    text: 'Cleveland Heights, OH'
  },
  {
    text: 'Columbus, OH'
  },
  {
    text: 'Cuyahoga Falls, OH'
  },
  {
    text: 'Dayton, OH'
  },
  {
    text: 'Dublin, OH'
  },
  {
    text: 'Elyria, OH'
  },
  {
    text: 'Euclid, OH'
  },
  {
    text: 'Fairfield, OH'
  },
  {
    text: 'Hamilton, OH'
  },
  {
    text: 'Kettering, OH'
  },
  {
    text: 'Lakewood, OH'
  },
  {
    text: 'Lorain, OH'
  },
  {
    text: 'Mansfield, OH'
  },
  {
    text: 'Mentor, OH'
  },
  {
    text: 'Middletown, OH'
  },
  {
    text: 'Newark, OH'
  },
  {
    text: 'Parma, OH'
  },
  {
    text: 'Springfield, OH'
  },
  {
    text: 'Strongsville, OH'
  },
  {
    text: 'Toledo, OH'
  },
  {
    text: 'Youngstown, OH'
  },
  {
    text: 'Adair, OK'
  },
  {
    text: 'Alfalfa, OK'
  },
  {
    text: 'Atoka, OK'
  },
  {
    text: 'Beaver, OK'
  },
  {
    text: 'Beckham, OK'
  },
  {
    text: 'Blaine, OK'
  },
  {
    text: 'Bryan, OK'
  },
  {
    text: 'Caddo, OK'
  },
  {
    text: 'Canadian, OK'
  },
  {
    text: 'Carter, OK'
  },
  {
    text: 'Cherokee, OK'
  },
  {
    text: 'Choctaw, OK'
  },
  {
    text: 'Cimarron, OK'
  },
  {
    text: 'Cleveland, OK'
  },
  {
    text: 'Coal, OK'
  },
  {
    text: 'Comanche, OK'
  },
  {
    text: 'Cotton, OK'
  },
  {
    text: 'Craig, OK'
  },
  {
    text: 'Creek, OK'
  },
  {
    text: 'Custer, OK'
  },
  {
    text: 'Delaware, OK'
  },
  {
    text: 'Dewey, OK'
  },
  {
    text: 'Ellis, OK'
  },
  {
    text: 'Garfield, OK'
  },
  {
    text: 'Garvin, OK'
  },
  {
    text: 'Grady, OK'
  },
  {
    text: 'Grant, OK'
  },
  {
    text: 'Greer, OK'
  },
  {
    text: 'Harmon, OK'
  },
  {
    text: 'Harper, OK'
  },
  {
    text: 'Haskell, OK'
  },
  {
    text: 'Hughes, OK'
  },
  {
    text: 'Jackson, OK'
  },
  {
    text: 'Jefferson, OK'
  },
  {
    text: 'Johnston, OK'
  },
  {
    text: 'Kay, OK'
  },
  {
    text: 'Kingfisher, OK'
  },
  {
    text: 'Kiowa, OK'
  },
  {
    text: 'Latimer, OK'
  },
  {
    text: 'Le Flore, OK'
  },
  {
    text: 'Lincoln, OK'
  },
  {
    text: 'Logan, OK'
  },
  {
    text: 'Love, OK'
  },
  {
    text: 'McClain, OK'
  },
  {
    text: 'McCurtain, OK'
  },
  {
    text: 'McIntosh, OK'
  },
  {
    text: 'Major, OK'
  },
  {
    text: 'Marshall, OK'
  },
  {
    text: 'Mayes, OK'
  },
  {
    text: 'Murray, OK'
  },
  {
    text: 'Muskogee, OK'
  },
  {
    text: 'Noble, OK'
  },
  {
    text: 'Nowata, OK'
  },
  {
    text: 'Okfuskee, OK'
  },
  {
    text: 'Oklahoma, OK'
  },
  {
    text: 'Okmulgee, OK'
  },
  {
    text: 'Osage, OK'
  },
  {
    text: 'Ottawa, OK'
  },
  {
    text: 'Pawnee, OK'
  },
  {
    text: 'Payne, OK'
  },
  {
    text: 'Pittsburg, OK'
  },
  {
    text: 'Pontotoc, OK'
  },
  {
    text: 'Pottawatomie, OK'
  },
  {
    text: 'Pushmataha, OK'
  },
  {
    text: 'Roger Mills, OK'
  },
  {
    text: 'Rogers, OK'
  },
  {
    text: 'Seminole, OK'
  },
  {
    text: 'Sequoyah, OK'
  },
  {
    text: 'Stephens, OK'
  },
  {
    text: 'Texas, OK'
  },
  {
    text: 'Tillman, OK'
  },
  {
    text: 'Tulsa, OK'
  },
  {
    text: 'Wagoner, OK'
  },
  {
    text: 'Washington, OK'
  },
  {
    text: 'Washita, OK'
  },
  {
    text: 'Woods, OK'
  },
  {
    text: 'Woodward, OK'
  },
  {
    text: 'Broken Arrow, OK'
  },
  {
    text: 'Edmond, OK'
  },
  {
    text: 'Enid, OK'
  },
  {
    text: 'Lawton, OK'
  },
  {
    text: 'Midwest City, OK'
  },
  {
    text: 'Moore, OK'
  },
  {
    text: 'Norman, OK'
  },
  {
    text: 'Oklahoma City, OK'
  },
  {
    text: 'Stillwater, OK'
  },
  {
    text: 'Tulsa, OK'
  },
  {
    text: 'Baker, OR'
  },
  {
    text: 'Benton, OR'
  },
  {
    text: 'Clackamas, OR'
  },
  {
    text: 'Clatsop, OR'
  },
  {
    text: 'Columbia, OR'
  },
  {
    text: 'Coos, OR'
  },
  {
    text: 'Crook, OR'
  },
  {
    text: 'Curry, OR'
  },
  {
    text: 'Deschutes, OR'
  },
  {
    text: 'Douglas, OR'
  },
  {
    text: 'Gilliam, OR'
  },
  {
    text: 'Grant, OR'
  },
  {
    text: 'Harney, OR'
  },
  {
    text: 'Hood River, OR'
  },
  {
    text: 'Jackson, OR'
  },
  {
    text: 'Jefferson, OR'
  },
  {
    text: 'Josephine, OR'
  },
  {
    text: 'Klamath, OR'
  },
  {
    text: 'Lake, OR'
  },
  {
    text: 'Lane, OR'
  },
  {
    text: 'Lincoln, OR'
  },
  {
    text: 'Linn, OR'
  },
  {
    text: 'Malheur, OR'
  },
  {
    text: 'Marion, OR'
  },
  {
    text: 'Morrow, OR'
  },
  {
    text: 'Multnomah, OR'
  },
  {
    text: 'Polk, OR'
  },
  {
    text: 'Sherman, OR'
  },
  {
    text: 'Tillamook, OR'
  },
  {
    text: 'Umatilla, OR'
  },
  {
    text: 'Union, OR'
  },
  {
    text: 'Wallowa, OR'
  },
  {
    text: 'Wasco, OR'
  },
  {
    text: 'Washington, OR'
  },
  {
    text: 'Wheeler, OR'
  },
  {
    text: 'Yamhill, OR'
  },
  {
    text: 'Albany, OR'
  },
  {
    text: 'Aloha, OR'
  },
  {
    text: 'Beaverton, OR'
  },
  {
    text: 'Bend, OR'
  },
  {
    text: 'Corvallis, OR'
  },
  {
    text: 'Eugene, OR'
  },
  {
    text: 'Gresham, OR'
  },
  {
    text: 'Hillsboro, OR'
  },
  {
    text: 'Medford, OR'
  },
  {
    text: 'Portland, OR'
  },
  {
    text: 'Salem, OR'
  },
  {
    text: 'Springfield, OR'
  },
  {
    text: 'Tigard, OR'
  },
  {
    text: 'Adams, PA'
  },
  {
    text: 'Allegheny, PA'
  },
  {
    text: 'Armstrong, PA'
  },
  {
    text: 'Beaver, PA'
  },
  {
    text: 'Bedford, PA'
  },
  {
    text: 'Berks, PA'
  },
  {
    text: 'Blair, PA'
  },
  {
    text: 'Bradford, PA'
  },
  {
    text: 'Bucks, PA'
  },
  {
    text: 'Butler, PA'
  },
  {
    text: 'Cambria, PA'
  },
  {
    text: 'Cameron, PA'
  },
  {
    text: 'Carbon, PA'
  },
  {
    text: 'Centre, PA'
  },
  {
    text: 'Chester, PA'
  },
  {
    text: 'Clarion, PA'
  },
  {
    text: 'Clearfield, PA'
  },
  {
    text: 'Clinton, PA'
  },
  {
    text: 'Columbia, PA'
  },
  {
    text: 'Crawford, PA'
  },
  {
    text: 'Cumberland, PA'
  },
  {
    text: 'Dauphin, PA'
  },
  {
    text: 'Delaware, PA'
  },
  {
    text: 'Elk, PA'
  },
  {
    text: 'Erie, PA'
  },
  {
    text: 'Fayette, PA'
  },
  {
    text: 'Forest, PA'
  },
  {
    text: 'Franklin, PA'
  },
  {
    text: 'Fulton, PA'
  },
  {
    text: 'Greene, PA'
  },
  {
    text: 'Huntingdon, PA'
  },
  {
    text: 'Indiana, PA'
  },
  {
    text: 'Jefferson, PA'
  },
  {
    text: 'Juniata, PA'
  },
  {
    text: 'Lackawanna, PA'
  },
  {
    text: 'Lancaster, PA'
  },
  {
    text: 'Lawrence, PA'
  },
  {
    text: 'Lebanon, PA'
  },
  {
    text: 'Lehigh, PA'
  },
  {
    text: 'Luzerne, PA'
  },
  {
    text: 'Lycoming, PA'
  },
  {
    text: 'McKean, PA'
  },
  {
    text: 'Mercer, PA'
  },
  {
    text: 'Mifflin, PA'
  },
  {
    text: 'Monroe, PA'
  },
  {
    text: 'Montgomery, PA'
  },
  {
    text: 'Montour, PA'
  },
  {
    text: 'Northampton, PA'
  },
  {
    text: 'Northumberland, PA'
  },
  {
    text: 'Perry, PA'
  },
  {
    text: 'Philadelphia, PA'
  },
  {
    text: 'Pike, PA'
  },
  {
    text: 'Potter, PA'
  },
  {
    text: 'Schuylkill, PA'
  },
  {
    text: 'Snyder, PA'
  },
  {
    text: 'Somerset, PA'
  },
  {
    text: 'Sullivan, PA'
  },
  {
    text: 'Susquehanna, PA'
  },
  {
    text: 'Tioga, PA'
  },
  {
    text: 'Union, PA'
  },
  {
    text: 'Venango, PA'
  },
  {
    text: 'Warren, PA'
  },
  {
    text: 'Washington, PA'
  },
  {
    text: 'Wayne, PA'
  },
  {
    text: 'Westmoreland, PA'
  },
  {
    text: 'Wyoming, PA'
  },
  {
    text: 'York, PA'
  },
  {
    text: 'Allentown, PA'
  },
  {
    text: 'Altoona, PA'
  },
  {
    text: 'Bethlehem, PA'
  },
  {
    text: 'Erie, PA'
  },
  {
    text: 'Harrisburg, PA'
  },
  {
    text: 'Lancaster, PA'
  },
  {
    text: 'Levittown, PA'
  },
  {
    text: 'Philadelphia, PA'
  },
  {
    text: 'California-Kirkbride, PA'
  },
  {
    text: 'Pittsburgh, PA'
  },
  {
    text: 'Reading, PA'
  },
  {
    text: 'Scranton, PA'
  },
  {
    text: 'State College, PA'
  },
  {
    text: 'Wilkes-Barre, PA'
  },
  {
    text: 'York, PA'
  },
  {
    text: 'Bristol, RI'
  },
  {
    text: 'Kent, RI'
  },
  {
    text: 'Newport, RI'
  },
  {
    text: 'Providence, RI'
  },
  {
    text: 'Washington, RI'
  },
  {
    text: 'Cranston, RI'
  },
  {
    text: 'East Providence, RI'
  },
  {
    text: 'Pawtucket, RI'
  },
  {
    text: 'Providence, RI'
  },
  {
    text: 'Warwick, RI'
  },
  {
    text: 'Woonsocket, RI'
  },
  {
    text: 'Abbeville, SC'
  },
  {
    text: 'Aiken, SC'
  },
  {
    text: 'Allendale, SC'
  },
  {
    text: 'Anderson, SC'
  },
  {
    text: 'Bamberg, SC'
  },
  {
    text: 'Barnwell, SC'
  },
  {
    text: 'Beaufort, SC'
  },
  {
    text: 'Berkeley, SC'
  },
  {
    text: 'Calhoun, SC'
  },
  {
    text: 'Charleston, SC'
  },
  {
    text: 'Cherokee, SC'
  },
  {
    text: 'Chester, SC'
  },
  {
    text: 'Chesterfield, SC'
  },
  {
    text: 'Clarendon, SC'
  },
  {
    text: 'Colleton, SC'
  },
  {
    text: 'Darlington, SC'
  },
  {
    text: 'Dillon, SC'
  },
  {
    text: 'Dorchester, SC'
  },
  {
    text: 'Edgefield, SC'
  },
  {
    text: 'Fairfield, SC'
  },
  {
    text: 'Florence, SC'
  },
  {
    text: 'Georgetown, SC'
  },
  {
    text: 'Greenville, SC'
  },
  {
    text: 'Greenwood, SC'
  },
  {
    text: 'Hampton, SC'
  },
  {
    text: 'Horry, SC'
  },
  {
    text: 'Jasper, SC'
  },
  {
    text: 'Kershaw, SC'
  },
  {
    text: 'Lancaster, SC'
  },
  {
    text: 'Laurens, SC'
  },
  {
    text: 'Lee, SC'
  },
  {
    text: 'Lexington, SC'
  },
  {
    text: 'McCormick, SC'
  },
  {
    text: 'Marion, SC'
  },
  {
    text: 'Marlboro, SC'
  },
  {
    text: 'Newberry, SC'
  },
  {
    text: 'Oconee, SC'
  },
  {
    text: 'Orangeburg, SC'
  },
  {
    text: 'Pickens, SC'
  },
  {
    text: 'Richland, SC'
  },
  {
    text: 'Saluda, SC'
  },
  {
    text: 'Spartanburg, SC'
  },
  {
    text: 'Sumter, SC'
  },
  {
    text: 'Union, SC'
  },
  {
    text: 'Williamsburg, SC'
  },
  {
    text: 'York, SC'
  },
  {
    text: 'Charleston, SC'
  },
  {
    text: 'Columbia, SC'
  },
  {
    text: 'Greenville, SC'
  },
  {
    text: 'Mt Pleasant, SC'
  },
  {
    text: 'North Charleston, SC'
  },
  {
    text: 'Rock Hill, SC'
  },
  {
    text: 'Summerville, SC'
  },
  {
    text: 'Aurora, SD'
  },
  {
    text: 'Beadle, SD'
  },
  {
    text: 'Bennett, SD'
  },
  {
    text: 'Bon Homme, SD'
  },
  {
    text: 'Brookings, SD'
  },
  {
    text: 'Brown, SD'
  },
  {
    text: 'Brule, SD'
  },
  {
    text: 'Buffalo, SD'
  },
  {
    text: 'Butte, SD'
  },
  {
    text: 'Campbell, SD'
  },
  {
    text: 'Charles Mix, SD'
  },
  {
    text: 'Clark, SD'
  },
  {
    text: 'Clay, SD'
  },
  {
    text: 'Codington, SD'
  },
  {
    text: 'Corson, SD'
  },
  {
    text: 'Custer, SD'
  },
  {
    text: 'Davison, SD'
  },
  {
    text: 'Day, SD'
  },
  {
    text: 'Deuel, SD'
  },
  {
    text: 'Dewey, SD'
  },
  {
    text: 'Douglas, SD'
  },
  {
    text: 'Edmunds, SD'
  },
  {
    text: 'Fall River, SD'
  },
  {
    text: 'Faulk, SD'
  },
  {
    text: 'Grant, SD'
  },
  {
    text: 'Gregory, SD'
  },
  {
    text: 'Haakon, SD'
  },
  {
    text: 'Hamlin, SD'
  },
  {
    text: 'Hand, SD'
  },
  {
    text: 'Hanson, SD'
  },
  {
    text: 'Harding, SD'
  },
  {
    text: 'Hughes, SD'
  },
  {
    text: 'Hutchinson, SD'
  },
  {
    text: 'Hyde, SD'
  },
  {
    text: 'Jackson, SD'
  },
  {
    text: 'Jerauld, SD'
  },
  {
    text: 'Jones, SD'
  },
  {
    text: 'Kingsbury, SD'
  },
  {
    text: 'Lake, SD'
  },
  {
    text: 'Lawrence, SD'
  },
  {
    text: 'Lincoln, SD'
  },
  {
    text: 'Lyman, SD'
  },
  {
    text: 'McCook, SD'
  },
  {
    text: 'McPherson, SD'
  },
  {
    text: 'Marshall, SD'
  },
  {
    text: 'Meade, SD'
  },
  {
    text: 'Mellette, SD'
  },
  {
    text: 'Miner, SD'
  },
  {
    text: 'Minnehaha, SD'
  },
  {
    text: 'Moody, SD'
  },
  {
    text: 'Pennington, SD'
  },
  {
    text: 'Perkins, SD'
  },
  {
    text: 'Potter, SD'
  },
  {
    text: 'Roberts, SD'
  },
  {
    text: 'Sanborn, SD'
  },
  {
    text: 'Shannon, SD'
  },
  {
    text: 'Spink, SD'
  },
  {
    text: 'Stanley, SD'
  },
  {
    text: 'Sully, SD'
  },
  {
    text: 'Todd, SD'
  },
  {
    text: 'Tripp, SD'
  },
  {
    text: 'Turner, SD'
  },
  {
    text: 'Union, SD'
  },
  {
    text: 'Walworth, SD'
  },
  {
    text: 'Yankton, SD'
  },
  {
    text: 'Ziebach, SD'
  },
  {
    text: 'Rapid City, SD'
  },
  {
    text: 'Sioux Falls, SD'
  },
  {
    text: 'Anderson, TN'
  },
  {
    text: 'Bedford, TN'
  },
  {
    text: 'Benton, TN'
  },
  {
    text: 'Bledsoe, TN'
  },
  {
    text: 'Blount, TN'
  },
  {
    text: 'Bradley, TN'
  },
  {
    text: 'Campbell, TN'
  },
  {
    text: 'Cannon, TN'
  },
  {
    text: 'Carroll, TN'
  },
  {
    text: 'Carter, TN'
  },
  {
    text: 'Cheatham, TN'
  },
  {
    text: 'Chester, TN'
  },
  {
    text: 'Claiborne, TN'
  },
  {
    text: 'Clay, TN'
  },
  {
    text: 'Cocke, TN'
  },
  {
    text: 'Coffee, TN'
  },
  {
    text: 'Crockett, TN'
  },
  {
    text: 'Cumberland, TN'
  },
  {
    text: 'Davidson, TN'
  },
  {
    text: 'Decatur, TN'
  },
  {
    text: 'DeKalb, TN'
  },
  {
    text: 'Dickson, TN'
  },
  {
    text: 'Dyer, TN'
  },
  {
    text: 'Fayette, TN'
  },
  {
    text: 'Fentress, TN'
  },
  {
    text: 'Franklin, TN'
  },
  {
    text: 'Gibson, TN'
  },
  {
    text: 'Giles, TN'
  },
  {
    text: 'Grainger, TN'
  },
  {
    text: 'Greene, TN'
  },
  {
    text: 'Grundy, TN'
  },
  {
    text: 'Hamblen, TN'
  },
  {
    text: 'Hamilton, TN'
  },
  {
    text: 'Hancock, TN'
  },
  {
    text: 'Hardeman, TN'
  },
  {
    text: 'Hardin, TN'
  },
  {
    text: 'Hawkins, TN'
  },
  {
    text: 'Haywood, TN'
  },
  {
    text: 'Henderson, TN'
  },
  {
    text: 'Henry, TN'
  },
  {
    text: 'Hickman, TN'
  },
  {
    text: 'Houston, TN'
  },
  {
    text: 'Humphreys, TN'
  },
  {
    text: 'Jackson, TN'
  },
  {
    text: 'Jefferson, TN'
  },
  {
    text: 'Johnson, TN'
  },
  {
    text: 'Knox, TN'
  },
  {
    text: 'Lake, TN'
  },
  {
    text: 'Lauderdale, TN'
  },
  {
    text: 'Lawrence, TN'
  },
  {
    text: 'Lewis, TN'
  },
  {
    text: 'Lincoln, TN'
  },
  {
    text: 'Loudon, TN'
  },
  {
    text: 'McMinn, TN'
  },
  {
    text: 'McNairy, TN'
  },
  {
    text: 'Macon, TN'
  },
  {
    text: 'Madison, TN'
  },
  {
    text: 'Marion, TN'
  },
  {
    text: 'Marshall, TN'
  },
  {
    text: 'Maury, TN'
  },
  {
    text: 'Meigs, TN'
  },
  {
    text: 'Monroe, TN'
  },
  {
    text: 'Montgomery, TN'
  },
  {
    text: 'Moore, TN'
  },
  {
    text: 'Morgan, TN'
  },
  {
    text: 'Obion, TN'
  },
  {
    text: 'Overton, TN'
  },
  {
    text: 'Perry, TN'
  },
  {
    text: 'Pickett, TN'
  },
  {
    text: 'Polk, TN'
  },
  {
    text: 'Putnam, TN'
  },
  {
    text: 'Rhea, TN'
  },
  {
    text: 'Roane, TN'
  },
  {
    text: 'Robertson, TN'
  },
  {
    text: 'Rutherford, TN'
  },
  {
    text: 'Scott, TN'
  },
  {
    text: 'Sequatchie, TN'
  },
  {
    text: 'Sevier, TN'
  },
  {
    text: 'Shelby, TN'
  },
  {
    text: 'Smith, TN'
  },
  {
    text: 'Stewart, TN'
  },
  {
    text: 'Sullivan, TN'
  },
  {
    text: 'Sumner, TN'
  },
  {
    text: 'Tipton, TN'
  },
  {
    text: 'Trousdale, TN'
  },
  {
    text: 'Unicoi, TN'
  },
  {
    text: 'Union, TN'
  },
  {
    text: 'Van Buren, TN'
  },
  {
    text: 'Warren, TN'
  },
  {
    text: 'Washington, TN'
  },
  {
    text: 'Wayne, TN'
  },
  {
    text: 'Weakley, TN'
  },
  {
    text: 'White, TN'
  },
  {
    text: 'Williamson, TN'
  },
  {
    text: 'Wilson, TN'
  },
  {
    text: 'Bartlett, TN'
  },
  {
    text: 'Chattanooga, TN'
  },
  {
    text: 'Clarksville, TN'
  },
  {
    text: 'Cleveland, TN'
  },
  {
    text: 'Collierville, TN'
  },
  {
    text: 'Franklin, TN'
  },
  {
    text: 'Hendersonville, TN'
  },
  {
    text: 'Jackson, TN'
  },
  {
    text: 'Johnson City, TN'
  },
  {
    text: 'Kingsport, TN'
  },
  {
    text: 'Knoxville, TN'
  },
  {
    text: 'Memphis, TN'
  },
  {
    text: 'Murfreesboro, TN'
  },
  {
    text: 'Nashville, TN'
  },
  {
    text: 'Smyrna, TN'
  },
  {
    text: 'Anderson, TX'
  },
  {
    text: 'Andrews, TX'
  },
  {
    text: 'Angelina, TX'
  },
  {
    text: 'Aransas, TX'
  },
  {
    text: 'Archer, TX'
  },
  {
    text: 'Armstrong, TX'
  },
  {
    text: 'Atascosa, TX'
  },
  {
    text: 'Austin, TX'
  },
  {
    text: 'Bailey, TX'
  },
  {
    text: 'Bandera, TX'
  },
  {
    text: 'Bastrop, TX'
  },
  {
    text: 'Baylor, TX'
  },
  {
    text: 'Bee, TX'
  },
  {
    text: 'Bell, TX'
  },
  {
    text: 'Bexar, TX'
  },
  {
    text: 'Blanco, TX'
  },
  {
    text: 'Borden, TX'
  },
  {
    text: 'Bosque, TX'
  },
  {
    text: 'Bowie, TX'
  },
  {
    text: 'Brazoria, TX'
  },
  {
    text: 'Brazos, TX'
  },
  {
    text: 'Brewster, TX'
  },
  {
    text: 'Briscoe, TX'
  },
  {
    text: 'Brooks, TX'
  },
  {
    text: 'Brown, TX'
  },
  {
    text: 'Burleson, TX'
  },
  {
    text: 'Burnet, TX'
  },
  {
    text: 'Caldwell, TX'
  },
  {
    text: 'Calhoun, TX'
  },
  {
    text: 'Callahan, TX'
  },
  {
    text: 'Cameron, TX'
  },
  {
    text: 'Camp, TX'
  },
  {
    text: 'Carson, TX'
  },
  {
    text: 'Cass, TX'
  },
  {
    text: 'Castro, TX'
  },
  {
    text: 'Chambers, TX'
  },
  {
    text: 'Cherokee, TX'
  },
  {
    text: 'Childress, TX'
  },
  {
    text: 'Clay, TX'
  },
  {
    text: 'Cochran, TX'
  },
  {
    text: 'Coke, TX'
  },
  {
    text: 'Coleman, TX'
  },
  {
    text: 'Collin, TX'
  },
  {
    text: 'Collingsworth, TX'
  },
  {
    text: 'Colorado, TX'
  },
  {
    text: 'Comal, TX'
  },
  {
    text: 'Comanche, TX'
  },
  {
    text: 'Concho, TX'
  },
  {
    text: 'Cooke, TX'
  },
  {
    text: 'Coryell, TX'
  },
  {
    text: 'Cottle, TX'
  },
  {
    text: 'Crane, TX'
  },
  {
    text: 'Crockett, TX'
  },
  {
    text: 'Crosby, TX'
  },
  {
    text: 'Culberson, TX'
  },
  {
    text: 'Dallam, TX'
  },
  {
    text: 'Dallas, TX'
  },
  {
    text: 'Dawson, TX'
  },
  {
    text: 'Deaf Smith, TX'
  },
  {
    text: 'Delta, TX'
  },
  {
    text: 'Denton, TX'
  },
  {
    text: 'DeWitt, TX'
  },
  {
    text: 'Dickens, TX'
  },
  {
    text: 'Dimmit, TX'
  },
  {
    text: 'Donley, TX'
  },
  {
    text: 'Duval, TX'
  },
  {
    text: 'Eastland, TX'
  },
  {
    text: 'Ector, TX'
  },
  {
    text: 'Edwards, TX'
  },
  {
    text: 'Ellis, TX'
  },
  {
    text: 'El Paso, TX'
  },
  {
    text: 'Erath, TX'
  },
  {
    text: 'Falls, TX'
  },
  {
    text: 'Fannin, TX'
  },
  {
    text: 'Fayette, TX'
  },
  {
    text: 'Fisher, TX'
  },
  {
    text: 'Floyd, TX'
  },
  {
    text: 'Foard, TX'
  },
  {
    text: 'Fort Bend, TX'
  },
  {
    text: 'Franklin, TX'
  },
  {
    text: 'Freestone, TX'
  },
  {
    text: 'Frio, TX'
  },
  {
    text: 'Gaines, TX'
  },
  {
    text: 'Galveston, TX'
  },
  {
    text: 'Garza, TX'
  },
  {
    text: 'Gillespie, TX'
  },
  {
    text: 'Glasscock, TX'
  },
  {
    text: 'Goliad, TX'
  },
  {
    text: 'Gonzales, TX'
  },
  {
    text: 'Gray, TX'
  },
  {
    text: 'Grayson, TX'
  },
  {
    text: 'Gregg, TX'
  },
  {
    text: 'Grimes, TX'
  },
  {
    text: 'Guadalupe, TX'
  },
  {
    text: 'Hale, TX'
  },
  {
    text: 'Hall, TX'
  },
  {
    text: 'Hamilton, TX'
  },
  {
    text: 'Hansford, TX'
  },
  {
    text: 'Hardeman, TX'
  },
  {
    text: 'Hardin, TX'
  },
  {
    text: 'Harris, TX'
  },
  {
    text: 'Harrison, TX'
  },
  {
    text: 'Hartley, TX'
  },
  {
    text: 'Haskell, TX'
  },
  {
    text: 'Hays, TX'
  },
  {
    text: 'Hemphill, TX'
  },
  {
    text: 'Henderson, TX'
  },
  {
    text: 'Hidalgo, TX'
  },
  {
    text: 'Hill, TX'
  },
  {
    text: 'Hockley, TX'
  },
  {
    text: 'Hood, TX'
  },
  {
    text: 'Hopkins, TX'
  },
  {
    text: 'Houston, TX'
  },
  {
    text: 'Howard, TX'
  },
  {
    text: 'Hudspeth, TX'
  },
  {
    text: 'Hunt, TX'
  },
  {
    text: 'Hutchinson, TX'
  },
  {
    text: 'Irion, TX'
  },
  {
    text: 'Jack, TX'
  },
  {
    text: 'Jackson, TX'
  },
  {
    text: 'Jasper, TX'
  },
  {
    text: 'Jeff Davis, TX'
  },
  {
    text: 'Jefferson, TX'
  },
  {
    text: 'Jim Hogg, TX'
  },
  {
    text: 'Jim Wells, TX'
  },
  {
    text: 'Johnson, TX'
  },
  {
    text: 'Jones, TX'
  },
  {
    text: 'Karnes, TX'
  },
  {
    text: 'Kaufman, TX'
  },
  {
    text: 'Kendall, TX'
  },
  {
    text: 'Kenedy, TX'
  },
  {
    text: 'Kent, TX'
  },
  {
    text: 'Kerr, TX'
  },
  {
    text: 'Kimble, TX'
  },
  {
    text: 'King, TX'
  },
  {
    text: 'Kinney, TX'
  },
  {
    text: 'Kleberg, TX'
  },
  {
    text: 'Knox, TX'
  },
  {
    text: 'Lamar, TX'
  },
  {
    text: 'Lamb, TX'
  },
  {
    text: 'Lampasas, TX'
  },
  {
    text: 'La Salle, TX'
  },
  {
    text: 'Lavaca, TX'
  },
  {
    text: 'Lee, TX'
  },
  {
    text: 'Leon, TX'
  },
  {
    text: 'Liberty, TX'
  },
  {
    text: 'Limestone, TX'
  },
  {
    text: 'Lipscomb, TX'
  },
  {
    text: 'Live Oak, TX'
  },
  {
    text: 'Llano, TX'
  },
  {
    text: 'Loving, TX'
  },
  {
    text: 'Lubbock, TX'
  },
  {
    text: 'Lynn, TX'
  },
  {
    text: 'McCulloch, TX'
  },
  {
    text: 'McLennan, TX'
  },
  {
    text: 'McMullen, TX'
  },
  {
    text: 'Madison, TX'
  },
  {
    text: 'Marion, TX'
  },
  {
    text: 'Martin, TX'
  },
  {
    text: 'Mason, TX'
  },
  {
    text: 'Matagorda, TX'
  },
  {
    text: 'Maverick, TX'
  },
  {
    text: 'Medina, TX'
  },
  {
    text: 'Menard, TX'
  },
  {
    text: 'Midland, TX'
  },
  {
    text: 'Milam, TX'
  },
  {
    text: 'Mills, TX'
  },
  {
    text: 'Mitchell, TX'
  },
  {
    text: 'Montague, TX'
  },
  {
    text: 'Montgomery, TX'
  },
  {
    text: 'Moore, TX'
  },
  {
    text: 'Morris, TX'
  },
  {
    text: 'Motley, TX'
  },
  {
    text: 'Nacogdoches, TX'
  },
  {
    text: 'Navarro, TX'
  },
  {
    text: 'Newton, TX'
  },
  {
    text: 'Nolan, TX'
  },
  {
    text: 'Nueces, TX'
  },
  {
    text: 'Ochiltree, TX'
  },
  {
    text: 'Oldham, TX'
  },
  {
    text: 'Orange, TX'
  },
  {
    text: 'Palo Pinto, TX'
  },
  {
    text: 'Panola, TX'
  },
  {
    text: 'Parker, TX'
  },
  {
    text: 'Parmer, TX'
  },
  {
    text: 'Pecos, TX'
  },
  {
    text: 'Polk, TX'
  },
  {
    text: 'Potter, TX'
  },
  {
    text: 'Presidio, TX'
  },
  {
    text: 'Rains, TX'
  },
  {
    text: 'Randall, TX'
  },
  {
    text: 'Reagan, TX'
  },
  {
    text: 'Real, TX'
  },
  {
    text: 'Red River, TX'
  },
  {
    text: 'Reeves, TX'
  },
  {
    text: 'Refugio, TX'
  },
  {
    text: 'Roberts, TX'
  },
  {
    text: 'Robertson, TX'
  },
  {
    text: 'Rockwall, TX'
  },
  {
    text: 'Runnels, TX'
  },
  {
    text: 'Rusk, TX'
  },
  {
    text: 'Sabine, TX'
  },
  {
    text: 'San Augustine, TX'
  },
  {
    text: 'San Jacinto, TX'
  },
  {
    text: 'San Patricio, TX'
  },
  {
    text: 'San Saba, TX'
  },
  {
    text: 'Schleicher, TX'
  },
  {
    text: 'Scurry, TX'
  },
  {
    text: 'Shackelford, TX'
  },
  {
    text: 'Shelby, TX'
  },
  {
    text: 'Sherman, TX'
  },
  {
    text: 'Smith, TX'
  },
  {
    text: 'Somervell, TX'
  },
  {
    text: 'Starr, TX'
  },
  {
    text: 'Stephens, TX'
  },
  {
    text: 'Sterling, TX'
  },
  {
    text: 'Stonewall, TX'
  },
  {
    text: 'Sutton, TX'
  },
  {
    text: 'Swisher, TX'
  },
  {
    text: 'Tarrant, TX'
  },
  {
    text: 'Taylor, TX'
  },
  {
    text: 'Terrell, TX'
  },
  {
    text: 'Terry, TX'
  },
  {
    text: 'Throckmorton, TX'
  },
  {
    text: 'Titus, TX'
  },
  {
    text: 'Tom Green, TX'
  },
  {
    text: 'Travis, TX'
  },
  {
    text: 'Trinity, TX'
  },
  {
    text: 'Tyler, TX'
  },
  {
    text: 'Upshur, TX'
  },
  {
    text: 'Upton, TX'
  },
  {
    text: 'Uvalde, TX'
  },
  {
    text: 'Val Verde, TX'
  },
  {
    text: 'Van Zandt, TX'
  },
  {
    text: 'Victoria, TX'
  },
  {
    text: 'Walker, TX'
  },
  {
    text: 'Waller, TX'
  },
  {
    text: 'Ward, TX'
  },
  {
    text: 'Washington, TX'
  },
  {
    text: 'Webb, TX'
  },
  {
    text: 'Wharton, TX'
  },
  {
    text: 'Wheeler, TX'
  },
  {
    text: 'Wichita, TX'
  },
  {
    text: 'Wilbarger, TX'
  },
  {
    text: 'Willacy, TX'
  },
  {
    text: 'Williamson, TX'
  },
  {
    text: 'Wilson, TX'
  },
  {
    text: 'Winkler, TX'
  },
  {
    text: 'Wise, TX'
  },
  {
    text: 'Wood, TX'
  },
  {
    text: 'Yoakum, TX'
  },
  {
    text: 'Young, TX'
  },
  {
    text: 'Zapata, TX'
  },
  {
    text: 'Zavala, TX'
  },
  {
    text: 'Abilene, TX'
  },
  {
    text: 'Allen, TX'
  },
  {
    text: 'Amarillo, TX'
  },
  {
    text: 'Arlington, TX'
  },
  {
    text: 'Atascocita, TX'
  },
  {
    text: 'Austin, TX'
  },
  {
    text: 'Baytown, TX'
  },
  {
    text: 'Beaumont, TX'
  },
  {
    text: 'Bedford, TX'
  },
  {
    text: 'Brownsville, TX'
  },
  {
    text: 'Bryan, TX'
  },
  {
    text: 'Carrollton, TX'
  },
  {
    text: 'Cedar Hill, TX'
  },
  {
    text: 'Cedar Park, TX'
  },
  {
    text: 'College Station, TX'
  },
  {
    text: 'Conroe, TX'
  },
  {
    text: 'Corpus Christi, TX'
  },
  {
    text: 'Dallas, TX'
  },
  {
    text: 'Denton, TX'
  },
  {
    text: 'DeSoto, TX'
  },
  {
    text: 'Edinburg, TX'
  },
  {
    text: 'El Paso, TX'
  },
  {
    text: 'Euless, TX'
  },
  {
    text: 'Flower Mound, TX'
  },
  {
    text: 'Fort Worth, TX'
  },
  {
    text: 'Frisco, TX'
  },
  {
    text: 'Galveston, TX'
  },
  {
    text: 'Garland, TX'
  },
  {
    text: 'Georgetown, TX'
  },
  {
    text: 'Grand Prairie, TX'
  },
  {
    text: 'Grapevine, TX'
  },
  {
    text: 'Haltom City, TX'
  },
  {
    text: 'Harlingen, TX'
  },
  {
    text: 'Houston, TX'
  },
  {
    text: 'Irving, TX'
  },
  {
    text: 'Keller, TX'
  },
  {
    text: 'Killeen, TX'
  },
  {
    text: 'Laredo, TX'
  },
  {
    text: 'League City, TX'
  },
  {
    text: 'Lewisville, TX'
  },
  {
    text: 'Longview, TX'
  },
  {
    text: 'Lubbock, TX'
  },
  {
    text: 'McAllen, TX'
  },
  {
    text: 'McKinney, TX'
  },
  {
    text: 'Mansfield, TX'
  },
  {
    text: 'Mesquite, TX'
  },
  {
    text: 'Midland, TX'
  },
  {
    text: 'Mission, TX'
  },
  {
    text: 'Missouri City, TX'
  },
  {
    text: 'New Braunfels, TX'
  },
  {
    text: 'North Richland Hills, TX'
  },
  {
    text: 'Odessa, TX'
  },
  {
    text: 'Pasadena, TX'
  },
  {
    text: 'Pearland, TX'
  },
  {
    text: 'Pflugerville, TX'
  },
  {
    text: 'Pharr, TX'
  },
  {
    text: 'Plano, TX'
  },
  {
    text: 'Port Arthur, TX'
  },
  {
    text: 'Richardson, TX'
  },
  {
    text: 'Rockwall, TX'
  },
  {
    text: 'Round Rock, TX'
  },
  {
    text: 'Rowlett, TX'
  },
  {
    text: 'San Angelo, TX'
  },
  {
    text: 'San Antonio, TX'
  },
  {
    text: 'San Marcos, TX'
  },
  {
    text: 'Spring, TX'
  },
  {
    text: 'Sugar Land, TX'
  },
  {
    text: 'Temple, TX'
  },
  {
    text: 'Texas City, TX'
  },
  {
    text: 'The Woodlands, TX'
  },
  {
    text: 'Tyler, TX'
  },
  {
    text: 'Victoria, TX'
  },
  {
    text: 'Waco, TX'
  },
  {
    text: 'Wichita Falls, TX'
  },
  {
    text: 'Wylie, TX'
  },
  {
    text: 'Beaver, UT'
  },
  {
    text: 'Box Elder, UT'
  },
  {
    text: 'Cache, UT'
  },
  {
    text: 'Carbon, UT'
  },
  {
    text: 'Daggett, UT'
  },
  {
    text: 'Davis, UT'
  },
  {
    text: 'Duchesne, UT'
  },
  {
    text: 'Emery, UT'
  },
  {
    text: 'Garfield, UT'
  },
  {
    text: 'Grand, UT'
  },
  {
    text: 'Iron, UT'
  },
  {
    text: 'Juab, UT'
  },
  {
    text: 'Kane, UT'
  },
  {
    text: 'Millard, UT'
  },
  {
    text: 'Morgan, UT'
  },
  {
    text: 'Piute, UT'
  },
  {
    text: 'Rich, UT'
  },
  {
    text: 'Salt Lake, UT'
  },
  {
    text: 'San Juan, UT'
  },
  {
    text: 'Sanpete, UT'
  },
  {
    text: 'Sevier, UT'
  },
  {
    text: 'Summit, UT'
  },
  {
    text: 'Tooele, UT'
  },
  {
    text: 'Uintah, UT'
  },
  {
    text: 'Utah, UT'
  },
  {
    text: 'Wasatch, UT'
  },
  {
    text: 'Washington, UT'
  },
  {
    text: 'Wayne, UT'
  },
  {
    text: 'Weber, UT'
  },
  {
    text: 'Bountiful, UT'
  },
  {
    text: 'Draper, UT'
  },
  {
    text: 'Layton, UT'
  },
  {
    text: 'Lehi, UT'
  },
  {
    text: 'Logan, UT'
  },
  {
    text: 'Millcreek, UT'
  },
  {
    text: 'Murray, UT'
  },
  {
    text: 'Ogden, UT'
  },
  {
    text: 'Orem, UT'
  },
  {
    text: 'Provo, UT'
  },
  {
    text: 'Riverton, UT'
  },
  {
    text: 'St George, UT'
  },
  {
    text: 'Salt Lake City, UT'
  },
  {
    text: 'Sandy, UT'
  },
  {
    text: 'South Jordan, UT'
  },
  {
    text: 'Taylorsville, UT'
  },
  {
    text: 'West Jordan, UT'
  },
  {
    text: 'West Valley City, UT'
  },
  {
    text: 'Addison, VT'
  },
  {
    text: 'Bennington, VT'
  },
  {
    text: 'Caledonia, VT'
  },
  {
    text: 'Chittenden, VT'
  },
  {
    text: 'Essex, VT'
  },
  {
    text: 'Franklin, VT'
  },
  {
    text: 'Grand Isle, VT'
  },
  {
    text: 'Lamoille, VT'
  },
  {
    text: 'Orange, VT'
  },
  {
    text: 'Orleans, VT'
  },
  {
    text: 'Rutland, VT'
  },
  {
    text: 'Washington, VT'
  },
  {
    text: 'Windham, VT'
  },
  {
    text: 'Windsor, VT'
  },
  {
    text: 'Burlington, VT'
  },
  {
    text: 'Accomack, VA'
  },
  {
    text: 'Albemarle, VA'
  },
  {
    text: 'Alleghany, VA'
  },
  {
    text: 'Amelia, VA'
  },
  {
    text: 'Amherst, VA'
  },
  {
    text: 'Appomattox, VA'
  },
  {
    text: 'Arlington, VA'
  },
  {
    text: 'Augusta, VA'
  },
  {
    text: 'Bath, VA'
  },
  {
    text: 'Bedford, VA'
  },
  {
    text: 'Bland, VA'
  },
  {
    text: 'Botetourt, VA'
  },
  {
    text: 'Brunswick, VA'
  },
  {
    text: 'Buchanan, VA'
  },
  {
    text: 'Buckingham, VA'
  },
  {
    text: 'Campbell, VA'
  },
  {
    text: 'Caroline, VA'
  },
  {
    text: 'Carroll, VA'
  },
  {
    text: 'Charles City, VA'
  },
  {
    text: 'Charlotte, VA'
  },
  {
    text: 'Chesterfield, VA'
  },
  {
    text: 'Clarke, VA'
  },
  {
    text: 'Craig, VA'
  },
  {
    text: 'Culpeper, VA'
  },
  {
    text: 'Cumberland, VA'
  },
  {
    text: 'Dickenson, VA'
  },
  {
    text: 'Dinwiddie, VA'
  },
  {
    text: 'Essex, VA'
  },
  {
    text: 'Fairfax, VA'
  },
  {
    text: 'Fauquier, VA'
  },
  {
    text: 'Floyd, VA'
  },
  {
    text: 'Fluvanna, VA'
  },
  {
    text: 'Franklin, VA'
  },
  {
    text: 'Frederick, VA'
  },
  {
    text: 'Giles, VA'
  },
  {
    text: 'Gloucester, VA'
  },
  {
    text: 'Goochland, VA'
  },
  {
    text: 'Grayson, VA'
  },
  {
    text: 'Greene, VA'
  },
  {
    text: 'Greensville, VA'
  },
  {
    text: 'Halifax, VA'
  },
  {
    text: 'Hanover, VA'
  },
  {
    text: 'Henrico, VA'
  },
  {
    text: 'Henry, VA'
  },
  {
    text: 'Highland, VA'
  },
  {
    text: 'Isle of Wight, VA'
  },
  {
    text: 'James City, VA'
  },
  {
    text: 'King and Queen, VA'
  },
  {
    text: 'King George, VA'
  },
  {
    text: 'King William, VA'
  },
  {
    text: 'Lancaster, VA'
  },
  {
    text: 'Lee, VA'
  },
  {
    text: 'Loudoun, VA'
  },
  {
    text: 'Louisa, VA'
  },
  {
    text: 'Lunenburg, VA'
  },
  {
    text: 'Madison, VA'
  },
  {
    text: 'Mathews, VA'
  },
  {
    text: 'Mecklenburg, VA'
  },
  {
    text: 'Middlesex, VA'
  },
  {
    text: 'Montgomery, VA'
  },
  {
    text: 'Nelson, VA'
  },
  {
    text: 'New Kent, VA'
  },
  {
    text: 'Northampton, VA'
  },
  {
    text: 'Northumberland, VA'
  },
  {
    text: 'Nottoway, VA'
  },
  {
    text: 'Orange, VA'
  },
  {
    text: 'Page, VA'
  },
  {
    text: 'Patrick, VA'
  },
  {
    text: 'Pittsylvania, VA'
  },
  {
    text: 'Powhatan, VA'
  },
  {
    text: 'Prince Edward, VA'
  },
  {
    text: 'Prince George, VA'
  },
  {
    text: 'Prince William, VA'
  },
  {
    text: 'Pulaski, VA'
  },
  {
    text: 'Rappahannock, VA'
  },
  {
    text: 'Richmond, VA'
  },
  {
    text: 'Roanoke, VA'
  },
  {
    text: 'Rockbridge, VA'
  },
  {
    text: 'Rockingham, VA'
  },
  {
    text: 'Russell, VA'
  },
  {
    text: 'Scott, VA'
  },
  {
    text: 'Shenandoah, VA'
  },
  {
    text: 'Smyth, VA'
  },
  {
    text: 'Southampton, VA'
  },
  {
    text: 'Spotsylvania, VA'
  },
  {
    text: 'Stafford, VA'
  },
  {
    text: 'Surry, VA'
  },
  {
    text: 'Sussex, VA'
  },
  {
    text: 'Tazewell, VA'
  },
  {
    text: 'Warren, VA'
  },
  {
    text: 'Washington, VA'
  },
  {
    text: 'Westmoreland, VA'
  },
  {
    text: 'Wise, VA'
  },
  {
    text: 'Wythe, VA'
  },
  {
    text: 'York, VA'
  },
  {
    text: 'Alexandria, VA'
  },
  {
    text: 'Bristol, VA'
  },
  {
    text: 'Buena Vista, VA'
  },
  {
    text: 'Charlottesville, VA'
  },
  {
    text: 'Chesapeake, VA'
  },
  {
    text: 'Colonial Heights, VA'
  },
  {
    text: 'Covington, VA'
  },
  {
    text: 'Danville, VA'
  },
  {
    text: 'Emporia, VA'
  },
  {
    text: 'Falls Church, VA'
  },
  {
    text: 'Fredericksburg, VA'
  },
  {
    text: 'Galax, VA'
  },
  {
    text: 'Hampton, VA'
  },
  {
    text: 'Harrisonburg, VA'
  },
  {
    text: 'Hopewell, VA'
  },
  {
    text: 'Lexington, VA'
  },
  {
    text: 'Lynchburg, VA'
  },
  {
    text: 'Manassas, VA'
  },
  {
    text: 'Manassas Park, VA'
  },
  {
    text: 'Martinsville, VA'
  },
  {
    text: 'Newport News, VA'
  },
  {
    text: 'Norfolk, VA'
  },
  {
    text: 'Norton, VA'
  },
  {
    text: 'Petersburg, VA'
  },
  {
    text: 'Poquoson, VA'
  },
  {
    text: 'Portsmouth, VA'
  },
  {
    text: 'Radford, VA'
  },
  {
    text: 'Salem, VA'
  },
  {
    text: 'Staunton, VA'
  },
  {
    text: 'Suffolk, VA'
  },
  {
    text: 'Virginia Beach, VA'
  },
  {
    text: 'Waynesboro, VA'
  },
  {
    text: 'Williamsburg, VA'
  },
  {
    text: 'Winchester, VA'
  },
  {
    text: 'Alexandria, VA'
  },
  {
    text: 'Arlington, VA'
  },
  {
    text: 'Ashburn, VA'
  },
  {
    text: 'Blacksburg, VA'
  },
  {
    text: 'Centreville, VA'
  },
  {
    text: 'Charlottesville, VA'
  },
  {
    text: 'Chesapeake, VA'
  },
  {
    text: 'Dale City, VA'
  },
  {
    text: 'Danville, VA'
  },
  {
    text: 'Hampton, VA'
  },
  {
    text: 'Harrisonburg, VA'
  },
  {
    text: 'Lake Ridge, VA'
  },
  {
    text: 'Leesburg, VA'
  },
  {
    text: 'Linton Hall, VA'
  },
  {
    text: 'Lynchburg, VA'
  },
  {
    text: 'McLean, VA'
  },
  {
    text: 'Newport News, VA'
  },
  {
    text: 'Norfolk, VA'
  },
  {
    text: 'Portsmouth, VA'
  },
  {
    text: 'Reston, VA'
  },
  {
    text: 'Richmond, VA'
  },
  {
    text: 'Roanoke, VA'
  },
  {
    text: 'Suffolk, VA'
  },
  {
    text: 'Tuckahoe, VA'
  },
  {
    text: 'Virginia Beach, VA'
  },
  {
    text: 'Adams, WA'
  },
  {
    text: 'Asotin, WA'
  },
  {
    text: 'Benton, WA'
  },
  {
    text: 'Chelan, WA'
  },
  {
    text: 'Clallam, WA'
  },
  {
    text: 'Clark, WA'
  },
  {
    text: 'Columbia, WA'
  },
  {
    text: 'Cowlitz, WA'
  },
  {
    text: 'Douglas, WA'
  },
  {
    text: 'Ferry, WA'
  },
  {
    text: 'Franklin, WA'
  },
  {
    text: 'Garfield, WA'
  },
  {
    text: 'Grant, WA'
  },
  {
    text: 'Grays Harbor, WA'
  },
  {
    text: 'Island, WA'
  },
  {
    text: 'Jefferson, WA'
  },
  {
    text: 'King, WA'
  },
  {
    text: 'Kitsap, WA'
  },
  {
    text: 'Kittitas, WA'
  },
  {
    text: 'Klickitat, WA'
  },
  {
    text: 'Lewis, WA'
  },
  {
    text: 'Lincoln, WA'
  },
  {
    text: 'Mason, WA'
  },
  {
    text: 'Okanogan, WA'
  },
  {
    text: 'Pacific, WA'
  },
  {
    text: 'Pend Oreille, WA'
  },
  {
    text: 'Pierce, WA'
  },
  {
    text: 'San Juan, WA'
  },
  {
    text: 'Skagit, WA'
  },
  {
    text: 'Skamania, WA'
  },
  {
    text: 'Snohomish, WA'
  },
  {
    text: 'Spokane, WA'
  },
  {
    text: 'Stevens, WA'
  },
  {
    text: 'Thurston, WA'
  },
  {
    text: 'Wahkiakum, WA'
  },
  {
    text: 'Walla Walla, WA'
  },
  {
    text: 'Whatcom, WA'
  },
  {
    text: 'Whitman, WA'
  },
  {
    text: 'Yakima, WA'
  },
  {
    text: 'Auburn, WA'
  },
  {
    text: 'Bellevue, WA'
  },
  {
    text: 'Bellingham, WA'
  },
  {
    text: 'Everett, WA'
  },
  {
    text: 'Federal Way, WA'
  },
  {
    text: 'Kennewick, WA'
  },
  {
    text: 'Kent, WA'
  },
  {
    text: 'Kirkland, WA'
  },
  {
    text: 'Lacey, WA'
  },
  {
    text: 'Lakewood, WA'
  },
  {
    text: 'Marysville, WA'
  },
  {
    text: 'Olympia, WA'
  },
  {
    text: 'Pasco, WA'
  },
  {
    text: 'Redmond, WA'
  },
  {
    text: 'Renton, WA'
  },
  {
    text: 'Richland, WA'
  },
  {
    text: 'Sammamish, WA'
  },
  {
    text: 'Seattle, WA'
  },
  {
    text: 'Shoreline, WA'
  },
  {
    text: 'South Hill, WA'
  },
  {
    text: 'Spokane, WA'
  },
  {
    text: 'Spokane Valley, WA'
  },
  {
    text: 'Tacoma, WA'
  },
  {
    text: 'Vancouver, WA'
  },
  {
    text: 'Yakima, WA'
  },
  {
    text: 'Barbour, WV'
  },
  {
    text: 'Berkeley, WV'
  },
  {
    text: 'Boone, WV'
  },
  {
    text: 'Braxton, WV'
  },
  {
    text: 'Brooke, WV'
  },
  {
    text: 'Cabell, WV'
  },
  {
    text: 'Calhoun, WV'
  },
  {
    text: 'Clay, WV'
  },
  {
    text: 'Doddridge, WV'
  },
  {
    text: 'Fayette, WV'
  },
  {
    text: 'Gilmer, WV'
  },
  {
    text: 'Grant, WV'
  },
  {
    text: 'Greenbrier, WV'
  },
  {
    text: 'Hampshire, WV'
  },
  {
    text: 'Hancock, WV'
  },
  {
    text: 'Hardy, WV'
  },
  {
    text: 'Harrison, WV'
  },
  {
    text: 'Jackson, WV'
  },
  {
    text: 'Jefferson, WV'
  },
  {
    text: 'Kanawha, WV'
  },
  {
    text: 'Lewis, WV'
  },
  {
    text: 'Lincoln, WV'
  },
  {
    text: 'Logan, WV'
  },
  {
    text: 'McDowell, WV'
  },
  {
    text: 'Marion, WV'
  },
  {
    text: 'Marshall, WV'
  },
  {
    text: 'Mason, WV'
  },
  {
    text: 'Mercer, WV'
  },
  {
    text: 'Mineral, WV'
  },
  {
    text: 'Mingo, WV'
  },
  {
    text: 'Monongalia, WV'
  },
  {
    text: 'Monroe, WV'
  },
  {
    text: 'Morgan, WV'
  },
  {
    text: 'Nicholas, WV'
  },
  {
    text: 'Ohio, WV'
  },
  {
    text: 'Pendleton, WV'
  },
  {
    text: 'Pleasants, WV'
  },
  {
    text: 'Pocahontas, WV'
  },
  {
    text: 'Preston, WV'
  },
  {
    text: 'Putnam, WV'
  },
  {
    text: 'Raleigh, WV'
  },
  {
    text: 'Randolph, WV'
  },
  {
    text: 'Ritchie, WV'
  },
  {
    text: 'Roane, WV'
  },
  {
    text: 'Summers, WV'
  },
  {
    text: 'Taylor, WV'
  },
  {
    text: 'Tucker, WV'
  },
  {
    text: 'Tyler, WV'
  },
  {
    text: 'Upshur, WV'
  },
  {
    text: 'Wayne, WV'
  },
  {
    text: 'Webster, WV'
  },
  {
    text: 'Wetzel, WV'
  },
  {
    text: 'Wirt, WV'
  },
  {
    text: 'Wood, WV'
  },
  {
    text: 'Wyoming, WV'
  },
  {
    text: 'Charleston, WV'
  },
  {
    text: 'Huntington, WV'
  },
  {
    text: 'Adams, WI'
  },
  {
    text: 'Ashland, WI'
  },
  {
    text: 'Barron, WI'
  },
  {
    text: 'Bayfield, WI'
  },
  {
    text: 'Brown, WI'
  },
  {
    text: 'Buffalo, WI'
  },
  {
    text: 'Burnett, WI'
  },
  {
    text: 'Calumet, WI'
  },
  {
    text: 'Chippewa, WI'
  },
  {
    text: 'Clark, WI'
  },
  {
    text: 'Columbia, WI'
  },
  {
    text: 'Crawford, WI'
  },
  {
    text: 'Dane, WI'
  },
  {
    text: 'Dodge, WI'
  },
  {
    text: 'Door, WI'
  },
  {
    text: 'Douglas, WI'
  },
  {
    text: 'Dunn, WI'
  },
  {
    text: 'Eau Claire, WI'
  },
  {
    text: 'Florence, WI'
  },
  {
    text: 'Fond du Lac, WI'
  },
  {
    text: 'Forest, WI'
  },
  {
    text: 'Grant, WI'
  },
  {
    text: 'Green, WI'
  },
  {
    text: 'Green Lake, WI'
  },
  {
    text: 'Iowa, WI'
  },
  {
    text: 'Iron, WI'
  },
  {
    text: 'Jackson, WI'
  },
  {
    text: 'Jefferson, WI'
  },
  {
    text: 'Juneau, WI'
  },
  {
    text: 'Kenosha, WI'
  },
  {
    text: 'Kewaunee, WI'
  },
  {
    text: 'La Crosse, WI'
  },
  {
    text: 'Lafayette, WI'
  },
  {
    text: 'Langlade, WI'
  },
  {
    text: 'Lincoln, WI'
  },
  {
    text: 'Manitowoc, WI'
  },
  {
    text: 'Marathon, WI'
  },
  {
    text: 'Marinette, WI'
  },
  {
    text: 'Marquette, WI'
  },
  {
    text: 'Menominee, WI'
  },
  {
    text: 'Milwaukee, WI'
  },
  {
    text: 'Monroe, WI'
  },
  {
    text: 'Oconto, WI'
  },
  {
    text: 'Oneida, WI'
  },
  {
    text: 'Outagamie, WI'
  },
  {
    text: 'Ozaukee, WI'
  },
  {
    text: 'Pepin, WI'
  },
  {
    text: 'Pierce, WI'
  },
  {
    text: 'Polk, WI'
  },
  {
    text: 'Portage, WI'
  },
  {
    text: 'Price, WI'
  },
  {
    text: 'Racine, WI'
  },
  {
    text: 'Richland, WI'
  },
  {
    text: 'Rock, WI'
  },
  {
    text: 'Rusk, WI'
  },
  {
    text: 'St. Croix, WI'
  },
  {
    text: 'Sauk, WI'
  },
  {
    text: 'Sawyer, WI'
  },
  {
    text: 'Shawano, WI'
  },
  {
    text: 'Sheboygan, WI'
  },
  {
    text: 'Taylor, WI'
  },
  {
    text: 'Trempealeau, WI'
  },
  {
    text: 'Vernon, WI'
  },
  {
    text: 'Vilas, WI'
  },
  {
    text: 'Walworth, WI'
  },
  {
    text: 'Washburn, WI'
  },
  {
    text: 'Washington, WI'
  },
  {
    text: 'Waukesha, WI'
  },
  {
    text: 'Waupaca, WI'
  },
  {
    text: 'Waushara, WI'
  },
  {
    text: 'Winnebago, WI'
  },
  {
    text: 'Wood, WI'
  },
  {
    text: 'Appleton, WI'
  },
  {
    text: 'Eau Claire, WI'
  },
  {
    text: 'Fond du Lac, WI'
  },
  {
    text: 'Green Bay, WI'
  },
  {
    text: 'Janesville, WI'
  },
  {
    text: 'Kenosha, WI'
  },
  {
    text: 'La Crosse, WI'
  },
  {
    text: 'Madison, WI'
  },
  {
    text: 'Milwaukee, WI'
  },
  {
    text: 'Oshkosh, WI'
  },
  {
    text: 'Racine, WI'
  },
  {
    text: 'Sheboygan, WI'
  },
  {
    text: 'Waukesha, WI'
  },
  {
    text: 'Wauwatosa, WI'
  },
  {
    text: 'West Allis, WI'
  },
  {
    text: 'Casper, WY'
  },
  {
    text: 'Cheyenne, WY'
  },
  {
    text: 'Albany, WY'
  },
  {
    text: 'Big Horn, WY'
  },
  {
    text: 'Campbell, WY'
  },
  {
    text: 'Carbon, WY'
  },
  {
    text: 'Converse, WY'
  },
  {
    text: 'Crook, WY'
  },
  {
    text: 'Fremont, WY'
  },
  {
    text: 'Goshen, WY'
  },
  {
    text: 'Hot Springs, WY'
  },
  {
    text: 'Johnson, WY'
  },
  {
    text: 'Laramie, WY'
  },
  {
    text: 'Lincoln, WY'
  },
  {
    text: 'Natrona, WY'
  },
  {
    text: 'Niobrara, WY'
  },
  {
    text: 'Park, WY'
  },
  {
    text: 'Platte, WY'
  },
  {
    text: 'Sheridan, WY'
  },
  {
    text: 'Sublette, WY'
  },
  {
    text: 'Sweetwater, WY'
  },
  {
    text: 'Teton, WY'
  },
  {
    text: 'Uinta, WY'
  },
  {
    text: 'Washakie, WY'
  },
  {
    text: 'Weston, WY'
  }
];

export default { US_LOCATIONS };
