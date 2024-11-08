# db/seeds.rb

# Define the list of appliance manufacturers
manufacturers = [
  "Whirlpool", "GE Appliances", "Samsung", "LG Electronics", "Bosch",
  "Frigidaire", "KitchenAid", "Maytag", "Amana", "Electrolux",
  "Sub-Zero", "Wolf", "Viking", "Thermador", "Miele",
  "JennAir", "Fisher & Paykel", "Dacor", "Haier", "Hotpoint",
  "Magic Chef", "Kenmore", "Speed Queen", "Asko", "Blomberg",
  "Bertazzoni", "BlueStar", "Café", "Monogram", "Summit",
  "Avanti", "Danby", "Gaggenau", "Hestan", "Ilve",
  "La Cornue", "Liebherr", "AGA", "Heartland", "Marvel",
  "Perlick", "Smeg", "True Residential", "U-Line", "ZLINE",
  "Thor Kitchen", "Fulgor Milano", "Verona", "Bosch-Siemens Hausgeräte", "Sharp",
  "Panasonic", "Toshiba", "Hitachi", "Daewoo", "Hisense",
  "Insignia", "Oster", "Hamilton Beach", "Cuisinart", "Breville",
  "Ninja", "Keurig", "De'Longhi", "Krups", "Braun",
  "Black+Decker", "Sunbeam", "Westinghouse", "Proctor Silex", "Waring",
  "Blendtec", "Vitamix", "Instant Pot", "Nesco", "Presto",
  "Zojirushi", "Rowenta", "T-fal", "Calphalon", "Anova",
  "Chefman", "Dash", "Emeril Lagasse", "George Foreman", "Holmes",
  "Honeywell", "Lasko", "Vornado", "Dyson", "Bissell",
  "Eureka", "Hoover", "Shark", "iRobot", "Neato",
  "Midea", "Winia", "Galanz", "EdgeStar", "Koldfront",
  "NewAir", "Whynter", "Sunpentown", "Costway", "Magic Mill"
]

# Seed the manufacturers
manufacturers.each do |name|
  Manufacturer.find_or_create_by(name: name)
end

appliances = [
  "Refrigerators", "Freezers", "Washing Machines", "Dryers",
  "Dishwashers", "Ovens", "Stoves and Cooktops", "Microwaves",
  "Garbage Disposals", "Ice Makers", "Trash Compactors", "Water Heaters"
]

appliances.each do |name|
  Appliance.find_or_create_by(name: name)
end

zip_to_city_map = {
  "30040" => "Cumming",
  "30022" => "Alpharetta",
  "30328" => "Sandy Springs",
  "30060" => "Marietta",
  "30066" => "Marietta",
  "30114" => "Canton",
  "30096" => "Duluth",
  "30519" => "Buford",
  "30518" => "Buford",
  "30062" => "Marietta",
  "30305" => "Atlanta",
  "30319" => "Brookhaven",
  "30005" => "Alpharetta",
  "30041" => "Cumming"
}

zip_to_city_map.each do |zip_code, city|
  ZipCodeMapping.find_or_create_by(zip_code: zip_code, city: city)
end
