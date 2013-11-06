// vim: set et sw=4 ts=4 ft=javascript:

var prices_green = {
    'set': {
        'B': {
            'rate': 75,
            'dd': 70,
            'ref': 68,
            'zen': 65,
            'maxhp': 60,
            'maxmana': 60,
            '+11': 70
        },
        'E': {
            'rate': 35,
            'dd': 30,
            'ref': 28,
            'zen': 25,
            'hp': 20,
            'maxmana': 20,
            '+11': 30
        }
    }
};

var prices_bol = {
    'set': {
        'B': {'luck': 20},
        'E': {'luck': 5}
    }
};
        
    
var prices_donate = {
    'set': {
        'B': {
            'rate': 30,
            'dd': 28,
            'ref': 27,
            'zen': 24,
            '+13': 28,
            'excel': 30
        },
        'E': {
            'rate': 10,
            'dd': 9,
            'ref': 8,
            'zen': 5,
            'maxhp': 3,
            'maxmana': 3,
            '+13': 9,
            'luck': 3,
            'excel': 10
        }
    }
};

var prices = [prices_green, prices_bol, prices_donate];
