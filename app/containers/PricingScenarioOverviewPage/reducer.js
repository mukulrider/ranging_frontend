/*
 *
 * PricingScenarioOverviewPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION, OVERVIEW_FETCH_SUCCESS,
  CHECKBOX_CHANGE, URL_PARAMS_DATA, GENERATE_URL_PARAMS_STRING,
  GENERATE_URL_PARAMS_DATA_SUCCESS, GENERATE_URL_PARAMS_DATA, GENERATE_URL_PARAMS_DATA2_SUCCESS
} from './constants';

const initialState = fromJS({
  urlParams: '',
  data: [
    {
    "names": "buying_controller",
    "items": ["Meat Fish and Veg", "Frozen Impulse", "Wines", "Grocery Cereals"]
  }, {
    "names": "buyer",
    "items": ["Meat Fish and Veg__Fruit and Vegetables", "Meat Fish and Veg__Fish", "Meat Fish and Veg__Bbq, Burgers and Sausages", "Meat Fish and Veg__Meat and Poultry", "Frozen Impulse__Yorkshire and Potatoes", "Frozen Impulse__Frozen Pizza and Bread", "Frozen Impulse__World Foods", "Frozen Impulse__Icecream", "Frozen Impulse__Pies and Ready Meals", "Frozen Impulse__Desserts and Party", "Wines__Italy and Sparkling", "Wines__France and Champagne", "Wines__Germany, Fortified and Gift", "Wines__Chile, Argentina and Light", "Wines__South Africa, Smalls and Bib", "Wines__Usa, Rose and Other", "Wines__Australia and Nz", "Wines__Fine Wine and Cases", "Wines__Spain, Portugal and Dessert", "Wines__Wine Other", "Grocery Cereals__Cereals"]
  }, {
    "names": "junior_buyer",
    "items": ["Meat Fish and Veg__Fruit and Vegetables__Vegetarian", "Meat Fish and Veg__Fish__Coated Fish", "Meat Fish and Veg__Bbq, Burgers and Sausages__Frozen BBQ", "Meat Fish and Veg__Fish__Natural Fish", "Meat Fish and Veg__Meat and Poultry__Poultry", "Meat Fish and Veg__Meat and Poultry__Coated Poultry", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables", "Meat Fish and Veg__Meat and Poultry__Meat", "Meat Fish and Veg__Fruit and Vegetables__Free From Frozen", "Meat Fish and Veg__Bbq, Burgers and Sausages__Burgers and Sausages", "Meat Fish and Veg__Fruit and Vegetables__Frozen Fruit", "Frozen Impulse__Yorkshire and Potatoes__Yorkshire Puddings", "Frozen Impulse__Yorkshire and Potatoes__Potato", "Frozen Impulse__Frozen Pizza and Bread__Frozen Pizza and Bread", "Frozen Impulse__World Foods__World Foods Frozen", "Frozen Impulse__Icecream__Icecream", "Frozen Impulse__Pies and Ready Meals__Read Meals", "Frozen Impulse__Desserts and Party__Desserts", "Frozen Impulse__Desserts and Party__Partyfood", "Frozen Impulse__Pies and Ready Meals__Pies", "Frozen Impulse__Desserts and Party__Ice Cubes", "Wines__Italy and Sparkling__Italy", "Wines__France and Champagne__Champagne", "Wines__Germany, Fortified and Gift__Germany", "Wines__Chile, Argentina and Light__Argentina", "Wines__South Africa, Smalls and Bib__Wine in a Box", "Wines__France and Champagne__France", "Wines__Chile, Argentina and Light__Chile", "Wines__Usa, Rose and Other__North America", "Wines__Australia and Nz__New Zealand", "Wines__Italy and Sparkling__Sparkling Wines", "Wines__Chile, Argentina and Light__Lighter Styles", "Wines__Fine Wine and Cases__Fine Wines", "Wines__Germany, Fortified and Gift__Fortified Wines", "Wines__Usa, Rose and Other__Rose", "Wines__South Africa, Smalls and Bib__South Africa", "Wines__South Africa, Smalls and Bib__Small Wines", "Wines__Germany, Fortified and Gift__Wine Gift Packs", "Wines__Spain, Portugal and Dessert__Spain", "Wines__Australia and Nz__Australia", "Wines__Fine Wine and Cases__Wine Cases", "Wines__Spain, Portugal and Dessert__Portugal", "Wines__Spain, Portugal and Dessert__Dessert Wines", "Wines__Usa, Rose and Other__Other Wines", "Wines__Wine Other__Wines", "Grocery Cereals__Cereals__Cereal", "Grocery Cereals__Cereals__Poridge and On The Go"]
  }, {
    "names": "product_sub_group_description",
    "items": ["Meat Fish and Veg__Fruit and Vegetables__Vegetarian__FZN VEGETARIAN&MEAT FREE", "Meat Fish and Veg__Fish__Coated Fish__FRZ FISHCAKES/KIDS", "Meat Fish and Veg__Bbq, Burgers and Sausages__Frozen BBQ__FROZEN BBQ MEAT", "Meat Fish and Veg__Fish__Natural Fish__FRZ NATURAL FISH and SEAFO", "Meat Fish and Veg__Meat and Poultry__Poultry__FROZEN CHICKEN PORTIONS", "Meat Fish and Veg__Meat and Poultry__Coated Poultry__FROZEN COATED POULTRY", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables__FROZEN PEAS", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables__FROZEN CONVENIENCE", "Meat Fish and Veg__Meat and Poultry__Meat__FROZ MINCE and PREPRD MEAT", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables__FROZEN ROAST VEG", "Meat Fish and Veg__Fish__Coated Fish__FRZ BREADED FISH", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables__FROZEN INGREDIENTS", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables__HEALTH", "Meat Fish and Veg__Fish__Coated Fish__FRZ BATTERED FISH", "Meat Fish and Veg__Meat and Poultry__Meat__FROZEN LAMB", "Meat Fish and Veg__Fish__Natural Fish__FRZ RECIPE FISH/SEAFOOD", "Meat Fish and Veg__Fruit and Vegetables__Free From Frozen__FROZEN FREE FROM", "Meat Fish and Veg__Fish__Natural Fish__PRAWNS", "Meat Fish and Veg__Meat and Poultry__Poultry__FROZEN TURKEY", "Meat Fish and Veg__Bbq, Burgers and Sausages__Burgers and Sausages__FROZEN SAUSAGES", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables__FROZEN VEG / MIX", "Meat Fish and Veg__Bbq, Burgers and Sausages__Burgers and Sausages__FRZ BURGERS GRILLSTEAKS", "Meat Fish and Veg__Fish__Coated Fish__FRZ FISH/FINGERS", "Meat Fish and Veg__Meat and Poultry__Poultry__FROZEN JOINTS", "Meat Fish and Veg__Meat and Poultry__Meat__SEASONAL ACCOMPANIMENTS", "Meat Fish and Veg__Meat and Poultry__Meat__FROZEN BACON AND MEAT JO", "Meat Fish and Veg__Meat and Poultry__Poultry__FROZEN POULTRY JOINTS", "Meat Fish and Veg__Fruit and Vegetables__Frozen Fruit__FROZEN FRUIT", "Meat Fish and Veg__Fish__Coated Fish__FRZ SCAMPI", "Meat Fish and Veg__Fruit and Vegetables__Frozen Vegetables__FROZEN PASTRIES", "Meat Fish and Veg__Meat and Poultry__Poultry__FROZEN WHOLE CHICKEN", "Frozen Impulse__Yorkshire and Potatoes__Yorkshire Puddings__FRZ YORKSHIRE PUDDINGS", "Frozen Impulse__Yorkshire and Potatoes__Potato__ADDED VAL POTATO PRODS", "Frozen Impulse__Yorkshire and Potatoes__Potato__FROZEN CHIPS", "Frozen Impulse__Frozen Pizza and Bread__Frozen Pizza and Bread__FROZEN PIZZA", "Frozen Impulse__World Foods__World Foods Frozen__ICE CREAM and DESSERTS", "Frozen Impulse__Icecream__Icecream__LOCAL AND REGIONAL", "Frozen Impulse__Pies and Ready Meals__Read Meals__FROZEN READY MEALS", "Frozen Impulse__World Foods__World Foods Frozen__VEGETABLES", "Frozen Impulse__Desserts and Party__Desserts__FRZ PIES/PUDS/STRUDELS", "Frozen Impulse__Desserts and Party__Partyfood__FRZ SAUS ROLLS/PARTYFOOD", "Frozen Impulse__Icecream__Icecream__CHOCOLATE STICKS and BARS", "Frozen Impulse__Icecream__Icecream__CONES", "Frozen Impulse__World Foods__World Foods Frozen__BREADED POULTRY", "Frozen Impulse__Desserts and Party__Desserts__PASTRY and HOMEBAKING", "Frozen Impulse__World Foods__World Foods Frozen__FROZEN ORIENTAL", "Frozen Impulse__Icecream__Icecream__HEALTHY OPTIONS AND 100%", "Frozen Impulse__Icecream__Icecream__CHILDREN\'S LOLLIES AND I", "Frozen Impulse__Desserts and Party__Desserts__LUXURY DESSERTS", "Frozen Impulse__Icecream__Icecream__LUXURY and SORBET", "Frozen Impulse__World Foods__World Foods Frozen__FISH", "Frozen Impulse__World Foods__World Foods Frozen__FROZEN POLISH FOODS", "Frozen Impulse__World Foods__World Foods Frozen__BREADS and PIZZAS", "Frozen Impulse__World Foods__World Foods Frozen__FROZEN HMC PRODUCTS", "Frozen Impulse__Icecream__Icecream__SINGLES", "Frozen Impulse__Frozen Pizza and Bread__Frozen Pizza and Bread__FROZEN BREADS", "Frozen Impulse__World Foods__World Foods Frozen__READY MEALS", "Frozen Impulse__World Foods__World Foods Frozen__HALAL BURG SAUS KEBAB", "Frozen Impulse__World Foods__World Foods Frozen__SAMOSAS", "Frozen Impulse__Pies and Ready Meals__Pies__FROZEN PIES and QUICHES", "Frozen Impulse__Desserts and Party__Desserts__FRZ CAKES AND GATEAUX", "Frozen Impulse__Desserts and Party__Desserts__FROZEN CHEESECAKE", "Frozen Impulse__Icecream__Icecream__EVERYDAY PREMIUM TUBS", "Frozen Impulse__World Foods__World Foods Frozen__FRZ AFRO CARRIBEAN SPEC", "Frozen Impulse__Icecream__Icecream__ICE CREAM DESSERTS", "Frozen Impulse__World Foods__World Foods Frozen__FINGER FOOD", "Frozen Impulse__Desserts and Party__Ice Cubes__ICE CUBES", "Frozen Impulse__Icecream__Icecream__MINI ICE CREAM POTS", "Frozen Impulse__World Foods__World Foods Frozen__HALAL CHICKEN and LAMB", "Frozen Impulse__Icecream__Icecream__EVERYDAY 2 LITRE TUBS", "Frozen Impulse__Desserts and Party__Ice Cubes__FROZEN COCKTAILS", "Frozen Impulse__World Foods__World Foods Frozen__FROZEN ASIAN SPECIALITY", "Frozen Impulse__Desserts and Party__Desserts__HEALTHY LIVING DESSERTS", "Frozen Impulse__World Foods__World Foods Frozen__FROZEN ASIAN FISH", "Wines__Italy and Sparkling__Italy__WHITE WINE ITALIAN", "Wines__France and Champagne__Champagne__INTERNET EXC CHAMPAGNE", "Wines__Italy and Sparkling__Italy__FIN UPMKT RED ITALY", "Wines__Germany, Fortified and Gift__Germany__RED GERMAN ONLINE EXCLUS", "Wines__Chile, Argentina and Light__Argentina__ARGENTINIAN RED", "Wines__South Africa, Smalls and Bib__Wine in a Box__WHITE WINE IN A BOX", "Wines__Italy and Sparkling__Italy__RED WINE ITALIAN", "Wines__France and Champagne__France__FIN UPMKT WHITE DESSERT", "Wines__Chile, Argentina and Light__Chile__CHILEAN WHITE", "Wines__Usa, Rose and Other__North America__OL BULK WHT NORTH AMERIC", "Wines__Germany, Fortified and Gift__Germany__WHITE WINE GERMAN", "Wines__Australia and Nz__New Zealand__WHITE WINE NEW ZEALAND", "Wines__Italy and Sparkling__Sparkling Wines__SPARKLING WINE", "Wines__France and Champagne__France__FRENCH RED WINE", "Wines__Chile, Argentina and Light__Lighter Styles__LIGHT and FRUIT PERRY", "Wines__South Africa, Smalls and Bib__Wine in a Box__RED WINE BAG IN BOX", "Wines__Usa, Rose and Other__North America__RED WINE NORTH AMERICAN", "Wines__France and Champagne__France__FRENCH WHITE WINE", "Wines__Chile, Argentina and Light__Chile__CHILEAN RED", "Wines__Fine Wine and Cases__Fine Wines__FINE WINE DOTCOM EXCL", "Wines__France and Champagne__Champagne__CHAMPAGNE", "Wines__Germany, Fortified and Gift__Fortified Wines__PORT", "Wines__Usa, Rose and Other__Rose__ROSE WINE", "Wines__South Africa, Smalls and Bib__South Africa__WHITE WINE SOUTH AFRICAN", "Wines__South Africa, Smalls and Bib__Small Wines__WHITE WINE 25CL BOTTLES", "Wines__France and Champagne__France__WHITE FRENCH ONLINE EXCL", "Wines__Germany, Fortified and Gift__Wine Gift Packs__SEAS ALCOHOL GIFT PACKS", "Wines__Chile, Argentina and Light__Argentina__WHITE ARGENTINIAN ONLINE", "Wines__Spain, Portugal and Dessert__Spain__WHITE WINE SPANISH", "Wines__France and Champagne__France__RED FRENCH ONLINE EXCLUS", "Wines__Spain, Portugal and Dessert__Spain__EXCLUDED WHITE WINE SPAN", "Wines__Australia and Nz__Australia__WHITE WINE AUSTRALIAN", "Wines__Chile, Argentina and Light__Argentina__RED ARGENTINIAN ONLINE E", "Wines__Italy and Sparkling__Italy__RED ITALIAN ONLINE EXCLU", "Wines__Germany, Fortified and Gift__Germany__OL BULK WHITE GERMANY", "Wines__Italy and Sparkling__Sparkling Wines__INTERNET EXC SPARKLING", "Wines__Germany, Fortified and Gift__Fortified Wines__OTHER FORTIFIED WINES", "Wines__Germany, Fortified and Gift__Fortified Wines__SHERRY", "Wines__Australia and Nz__Australia__RED WINE AUSTRALIAN", "Wines__Australia and Nz__Australia__INTERNET ONLY WHITE WINE", "Wines__Fine Wine and Cases__Wine Cases__INTERNET MIXED CASES", "Wines__South Africa, Smalls and Bib__South Africa__RED WINE SOUTH AFRICAN", "Wines__Germany, Fortified and Gift__Fortified Wines__FORTIFIED BRITISH WINE", "Wines__Spain, Portugal and Dessert__Portugal__RED PORTUGUSE ONLINE EXC", "Wines__Chile, Argentina and Light__Chile__WHITE CHILEAN ONLINE EXC", "Wines__Spain, Portugal and Dessert__Spain__RED WINE SPANISH", "Wines__South Africa, Smalls and Bib__South Africa__WHITE SOUTH AFRICAN ONLI", "Wines__Australia and Nz__New Zealand__RED WINE NEW ZEALAND", "Wines__Spain, Portugal and Dessert__Dessert Wines__DESSERT WINE", "Wines__Fine Wine and Cases__Fine Wines__FINE WINES", "Wines__Spain, Portugal and Dessert__Spain__WHITE SPANISH ONLINE EXC", "Wines__Spain, Portugal and Dessert__Spain__RED SPANISH ONLINE EXCLU", "Wines__Usa, Rose and Other__Rose__ROSE WINES ONLINE EXCLUS", "Wines__Spain, Portugal and Dessert__Spain__EXCLUDED RED WINE SPANIS", "Wines__Usa, Rose and Other__North America__WHTE WINE NORTH AMERICAN", "Wines__Usa, Rose and Other__North America__WHITE NORTH AMERICAN ONL", "Wines__Usa, Rose and Other__Rose__EXCLUDED ROSE WINE", "Wines__Germany, Fortified and Gift__Wine Gift Packs__WINE GIFT PACKS", "Wines__South Africa, Smalls and Bib__Wine in a Box__OL BULK RED BOX", "Wines__Germany, Fortified and Gift__Fortified Wines__VERMOUTHS", "Wines__Usa, Rose and Other__North America__OL BULK RED NTH AMERICA", "Wines__South Africa, Smalls and Bib__Wine in a Box__BM1 WHITE BOX", "Wines__South Africa, Smalls and Bib__South Africa__SOUTH AFRICA ENTRY LEVE", "Wines__Chile, Argentina and Light__Argentina__ARGENTINIAN WHITE", "Wines__Usa, Rose and Other__Other Wines__OL BULK WHITE OTHER", "Wines__Spain, Portugal and Dessert__Spain__OL BULK RED SPAIN", "Wines__Fine Wine and Cases__Wine Cases__INTERNET ONLY RED WINE", "Wines__Usa, Rose and Other__North America__RED NORTH AMERICAN ONLIN", "Wines__Chile, Argentina and Light__Chile__RED CHILEAN ONLINE EXCLU", "Wines__Spain, Portugal and Dessert__Portugal__RED WINE PORTUGESE", "Wines__Australia and Nz__Australia__OL BULK WHITE AUSTRALIA", "Wines__Usa, Rose and Other__Other Wines__OTHER RED WINE", "Wines__Usa, Rose and Other__Other Wines__OTHER WHITE WINE", "Wines__Italy and Sparkling__Italy__FIN UPMKT WHITE ITALY", "Wines__Spain, Portugal and Dessert__Portugal__WHITE WINE PORTUGESE", "Wines__Australia and Nz__New Zealand__WHITE NEW ZEELANDER ONLI", "Wines__Australia and Nz__Australia__WHITE AUSTRALIAN ONLINE", "Wines__Australia and Nz__Australia__RED AUSTRALIAN ONLINE EX", "Wines__South Africa, Smalls and Bib__South Africa__OL BULK RED SOUTH AFRICA", "Wines__South Africa, Smalls and Bib__Small Wines__RED WINE 25CL BOTTLES", "Wines__Australia and Nz__New Zealand__RED NEW ZEELANDER ONLINE", "Wines__Usa, Rose and Other__Other Wines__OL BULK RED OTHER", "Wines__France and Champagne__Champagne__CHAMPAGNE CONVENIENCE CH", "Wines__France and Champagne__France__FIN UPMKT RED FRANCE", "Wines__Chile, Argentina and Light__Chile__OL BULK RED CHILE", "Wines__Australia and Nz__Australia__OL BULK RED AUSTRALIA", "Wines__Chile, Argentina and Light__Chile__BM1 WHITE CHILE", "Wines__South Africa, Smalls and Bib__South Africa__RED SOUTH AFRICAN ONLINE", "Wines__Italy and Sparkling__Italy__WHITE ITALIAN ONLINE EXC", "Wines__Spain, Portugal and Dessert__Portugal__OL BULK WHITE PORTUGAL", "Wines__Italy and Sparkling__Sparkling Wines__SPARKLING WINE GERMAN", "Wines__Germany, Fortified and Gift__Germany__WHITE GERMAN ONLINE EXCL", "Wines__Spain, Portugal and Dessert__Portugal__WHITE PORTUGESE ONLINE E", "Wines__France and Champagne__France__BM2 DOTCOM EXCL WHITE", "Wines__Wine Other__Wines__BM1 RED PORTUGAL", "Wines__France and Champagne__France__BM2 DOTCOM EXCL RED", "Wines__Chile, Argentina and Light__Argentina__OL BULK WHITE ARGENTINA", "Wines__Usa, Rose and Other__Rose__OL BULK ROSE", "Wines__Spain, Portugal and Dessert__Spain__OL BULK WHITE SPAIN", "Wines__Germany, Fortified and Gift__Fortified Wines__EXCLUDED FORTIFIED", "Grocery Cereals__Cereals__Cereal__KIDS CEREALS", "Grocery Cereals__Cereals__Cereal__MUESLI, GRANOLA and CLUSTE", "Grocery Cereals__Cereals__Cereal__EVERYDAY CEREALS", "Grocery Cereals__Cereals__Poridge and On The Go__ON THE GO BREAKFAST", "Grocery Cereals__Cereals__Cereal__FUNCTIONAL HEALTH CEREAL", "Grocery Cereals__Cereals__Cereal__SHAPE CEREALS", "Grocery Cereals__Cereals__Poridge and On The Go__PORRIDGE", "Grocery Cereals__Cereals__Cereal__FAMILY FAVOURITE CEREALS"]
  }],

  data2: [
    {
      "names": "buying_controller",
      "items": [
        "Wines"
      ]
    },
    {
      "names": "buyer",
      "items": [
        "Wines__Australia and Nz",
        "Wines__France and Champagne",
        "Wines__Chile, Argentina and Light",
        "Wines__Fine Wine and Cases",
        "Wines__Germany, Fortified and Gift",
        "Wines__Italy and Sparkling",
        "Wines__Usa, Rose and Other",
        "Wines__South Africa, Smalls and Bib",
        "Wines__Spain, Portugal and Dessert",
        "Wines__Wine Other"
      ]
    },
    {
      "names": "junior_buyer",
      "items": [
        "Wines__Australia and Nz__Australia",
        "Wines__France and Champagne__Champagne",
        "Wines__Australia and Nz__New Zealand",
        "Wines__Chile, Argentina and Light__Argentina",
        "Wines__Chile, Argentina and Light__Chile",
        "Wines__Chile, Argentina and Light__Lighter Styles",
        "Wines__Fine Wine and Cases__Fine Wines",
        "Wines__Fine Wine and Cases__Wine Cases",
        "Wines__France and Champagne__France",
        "Wines__Germany, Fortified and Gift__Fortified Wines",
        "Wines__Italy and Sparkling__Italy",
        "Wines__Germany, Fortified and Gift__Germany",
        "Wines__Italy and Sparkling__Sparkling Wines",
        "Wines__Usa, Rose and Other__North America",
        "Wines__South Africa, Smalls and Bib__Small Wines",
        "Wines__South Africa, Smalls and Bib__South Africa",
        "Wines__Usa, Rose and Other__Rose",
        "Wines__South Africa, Smalls and Bib__Wine in a Box",
        "Wines__Spain, Portugal and Dessert__Dessert Wines",
        "Wines__Spain, Portugal and Dessert__Portugal",
        "Wines__Spain, Portugal and Dessert__Spain",
        "Wines__Usa, Rose and Other__Other Wines",
        "Wines__Wine Other__Wines"
      ]
    },
    {
      "names": "product_sub_group_description",
      "items": [
        "Wines__Australia and Nz__Australia__OL BULK RED AUSTRALIA",
        "Wines__Australia and Nz__Australia__RED WINE AUSTRALIAN",
        "Wines__France and Champagne__Champagne__CHAMPAGNE",
        "Wines__Australia and Nz__Australia__OL BULK WHITE AUSTRALIA",
        "Wines__Australia and Nz__Australia__WHITE WINE AUSTRALIAN",
        "Wines__Australia and Nz__Australia__WHITE AUSTRALIAN ONLINE",
        "Wines__Australia and Nz__Australia__RED AUSTRALIAN ONLINE EX",
        "Wines__Australia and Nz__Australia__INTERNET ONLY WHITE WINE",
        "Wines__Australia and Nz__New Zealand__RED WINE NEW ZEALAND",
        "Wines__Australia and Nz__New Zealand__WHITE WINE NEW ZEALAND",
        "Wines__Australia and Nz__New Zealand__WHITE NEW ZEELANDER ONLI",
        "Wines__Australia and Nz__New Zealand__RED NEW ZEELANDER ONLINE",
        "Wines__Chile, Argentina and Light__Argentina__ARGENTINIAN RED",
        "Wines__Chile, Argentina and Light__Argentina__ARGENTINIAN WHITE",
        "Wines__Chile, Argentina and Light__Argentina__WHITE ARGENTINIAN ONLINE",
        "Wines__Chile, Argentina and Light__Argentina__RED ARGENTINIAN ONLINE E",
        "Wines__Chile, Argentina and Light__Chile__OL BULK RED CHILE",
        "Wines__Chile, Argentina and Light__Chile__CHILEAN RED",
        "Wines__Chile, Argentina and Light__Chile__BM1 WHITE CHILE",
        "Wines__Chile, Argentina and Light__Chile__CHILEAN WHITE",
        "Wines__Chile, Argentina and Light__Chile__WHITE CHILEAN ONLINE EXC",
        "Wines__Chile, Argentina and Light__Chile__RED CHILEAN ONLINE EXCLU",
        "Wines__Chile, Argentina and Light__Lighter Styles__LIGHT and FRUIT PERRY",
        "Wines__Fine Wine and Cases__Fine Wines__FINE WINES",
        "Wines__Fine Wine and Cases__Fine Wines__FINE WINE DOTCOM EXCL",
        "Wines__Fine Wine and Cases__Wine Cases__INTERNET ONLY RED WINE",
        "Wines__France and Champagne__Champagne__CHAMPAGNE CONVENIENCE CH",
        "Wines__France and Champagne__Champagne__INTERNET EXC CHAMPAGNE",
        "Wines__France and Champagne__France__FIN UPMKT RED FRANCE",
        "Wines__France and Champagne__France__FRENCH RED WINE",
        "Wines__France and Champagne__France__FIN UPMKT WHITE DESSERT",
        "Wines__France and Champagne__France__FRENCH WHITE WINE",
        "Wines__France and Champagne__France__BM2 DOTCOM EXCL WHITE",
        "Wines__France and Champagne__France__WHITE FRENCH ONLINE EXCL",
        "Wines__France and Champagne__France__RED FRENCH ONLINE EXCLUS",
        "Wines__Germany, Fortified and Gift__Fortified Wines__SHERRY",
        "Wines__Germany, Fortified and Gift__Fortified Wines__EXCLUDED FORTIFIED",
        "Wines__Germany, Fortified and Gift__Fortified Wines__FORTIFIED BRITISH WINE",
        "Wines__Italy and Sparkling__Italy__RED WINE ITALIAN",
        "Wines__Germany, Fortified and Gift__Fortified Wines__PORT",
        "Wines__Germany, Fortified and Gift__Fortified Wines__VERMOUTHS",
        "Wines__Germany, Fortified and Gift__Fortified Wines__OTHER FORTIFIED WINES",
        "Wines__Germany, Fortified and Gift__Germany__WHITE WINE GERMAN",
        "Wines__Germany, Fortified and Gift__Germany__OL BULK WHITE GERMANY",
        "Wines__Italy and Sparkling__Italy__FIN UPMKT RED ITALY",
        "Wines__Italy and Sparkling__Italy__WHITE WINE ITALIAN",
        "Wines__Italy and Sparkling__Italy__FIN UPMKT WHITE ITALY",
        "Wines__Italy and Sparkling__Italy__WHITE ITALIAN ONLINE EXC",
        "Wines__Italy and Sparkling__Italy__RED ITALIAN ONLINE EXCLU",
        "Wines__Italy and Sparkling__Sparkling Wines__SPARKLING WINE",
        "Wines__Usa, Rose and Other__North America__RED WINE NORTH AMERICAN",
        "Wines__Italy and Sparkling__Sparkling Wines__INTERNET EXC SPARKLING",
        "Wines__South Africa, Smalls and Bib__Small Wines__RED WINE 25CL BOTTLES",
        "Wines__South Africa, Smalls and Bib__Small Wines__WHITE WINE 25CL BOTTLES",
        "Wines__South Africa, Smalls and Bib__South Africa__OL BULK RED SOUTH AFRICA",
        "Wines__South Africa, Smalls and Bib__South Africa__RED WINE SOUTH AFRICAN",
        "Wines__South Africa, Smalls and Bib__South Africa__WHITE WINE SOUTH AFRICAN",
        "Wines__Usa, Rose and Other__Rose__OL BULK ROSE",
        "Wines__South Africa, Smalls and Bib__South Africa__SOUTH AFRICA  ENTRY LEVE",
        "Wines__South Africa, Smalls and Bib__South Africa__WHITE SOUTH AFRICAN ONLI",
        "Wines__South Africa, Smalls and Bib__South Africa__RED SOUTH AFRICAN ONLINE",
        "Wines__South Africa, Smalls and Bib__Wine in a Box__RED WINE BAG IN BOX",
        "Wines__South Africa, Smalls and Bib__Wine in a Box__OL BULK RED BOX",
        "Wines__South Africa, Smalls and Bib__Wine in a Box__WHITE WINE IN A BOX",
        "Wines__South Africa, Smalls and Bib__Wine in a Box__BM1 WHITE BOX",
        "Wines__Spain, Portugal and Dessert__Dessert Wines__DESSERT WINE",
        "Wines__Spain, Portugal and Dessert__Portugal__RED WINE PORTUGESE",
        "Wines__Spain, Portugal and Dessert__Portugal__WHITE WINE PORTUGESE",
        "Wines__Spain, Portugal and Dessert__Portugal__WHITE PORTUGESE ONLINE E",
        "Wines__Spain, Portugal and Dessert__Portugal__RED PORTUGUSE ONLINE EXC",
        "Wines__Spain, Portugal and Dessert__Spain__RED WINE SPANISH",
        "Wines__Spain, Portugal and Dessert__Spain__EXCLUDED RED WINE SPANIS",
        "Wines__Spain, Portugal and Dessert__Spain__OL BULK RED SPAIN",
        "Wines__Spain, Portugal and Dessert__Spain__WHITE WINE SPANISH",
        "Wines__Spain, Portugal and Dessert__Spain__EXCLUDED WHITE WINE SPAN",
        "Wines__Spain, Portugal and Dessert__Spain__OL BULK WHITE SPAIN",
        "Wines__Spain, Portugal and Dessert__Spain__WHITE SPANISH ONLINE EXC",
        "Wines__Spain, Portugal and Dessert__Spain__RED SPANISH ONLINE EXCLU",
        "Wines__Usa, Rose and Other__North America__OL BULK RED NTH AMERICA",
        "Wines__Usa, Rose and Other__North America__OL BULK WHT NORTH AMERIC",
        "Wines__Usa, Rose and Other__North America__WHTE WINE NORTH AMERICAN",
        "Wines__Usa, Rose and Other__North America__WHITE NORTH AMERICAN ONL",
        "Wines__Usa, Rose and Other__North America__RED NORTH AMERICAN ONLIN",
        "Wines__Usa, Rose and Other__Other Wines__OTHER RED WINE",
        "Wines__Usa, Rose and Other__Other Wines__OL BULK RED OTHER",
        "Wines__Usa, Rose and Other__Other Wines__OTHER WHITE WINE",
        "Wines__Usa, Rose and Other__Other Wines__OL BULK WHITE OTHER",
        "Wines__Usa, Rose and Other__Rose__AB ROSE",
        "Wines__Usa, Rose and Other__Rose__ROSE WINE",
        "Wines__Usa, Rose and Other__Rose__EXCLUDED ROSE WINE",
        "Wines__Usa, Rose and Other__Rose__ROSE WINES ONLINE EXCLUS",
        "Wines__Wine Other__Wines__BM1 RED PORTUGAL"
      ]
    }
  ],

  urlParamsString:''
});

function pricingScenarioOverviewPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case URL_PARAMS_DATA:
      return state.set('urlData', action.data);
    case CHECKBOX_CHANGE:
      return state.set('urlParams', action.data);
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);
    case OVERVIEW_FETCH_SUCCESS:
      return state.set('overview', action.data);
    case GENERATE_URL_PARAMS_DATA_SUCCESS:
      return state.set('urlParamsData', action.data);
    case GENERATE_URL_PARAMS_DATA2_SUCCESS:
      return state.set('urlParamsData2', action.data);

    default:
      return state;
  }
}

export default pricingScenarioOverviewPageReducer;
