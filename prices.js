// vim: set et sw=4 ts=4 ft=javascript:

// - copy paste from forum
// - remove empty lines
// :%s/^\n//
// - mass transform to suitable version
// :%s/^[0-9]\. [^(0-9]\+ (\?\([A-Z+0-9)\/]\+\) \+\([0-9]\+\) .*/'\L\1': \2/
// - mass transform luck/skill/etc
// :%s/[0-9]\+\. .*\([Ll]uck\|[Ss]kill\|excel\).* \([0-9]\+\) .*/'\L\1': \2/
// - convert block labels
// :%s/.*Třída \([A-Z]\)/'\1': {/
// - convert remaining brackets
// :%s/)'/'/
// - add commas after prices
// :%s/\([0-9]\)$/\1,/
// - replace block end commas with brackets
// :%s/,\n\('[A-Z]': \)/\r},\r\1/
// - manualy finish ([J]oin, end of last block...)


var Prices = new function () {
    this.credit_exchange_rate = 5;
    this.credit_exchange_curr = ',- Kc'; 
    this.groups = {
        /*
        'green': {
            'set-item': {
                'B': {
                    'rate': 75, 'dd': 70, 'ref': 68, 'zen': 65,
                    'maxhp': 60, 'maxmana': 60, '+11': 70
                },
                'C': {
                    'rate': 55, 'dd': 50, 'ref': 48, 'zen': 45,
                    'maxhp': 40, 'maxmana': 40, '+11': 50
                },
                'D': {
                    'rate': 45, 'dd': 40, 'ref': 38, 'zen': 35,
                    'maxhp': 30, 'maxmana': 30, '+11': 40
                },
                'E': {
                    'rate': 35, 'dd': 30, 'ref': 28, 'zen': 25,
                    'maxhp': 20, 'maxmana': 20, '+11': 30
                },
                'F': {
                    'rate': 25, 'dd': 20, 'ref': 18, 'zen': 15,
                    'maxhp': 10, 'maxmana': 10, '+11': 20
                }
            },
            'weapon': {
                'B': {
                    'rate': 80, 'id': 75, 'speed': 73, 'id/lvl': 70,
                    'lifehunt': 65, 'manahunt': 65, '+11': 75
                },
                'C': {
                    'rate': 60, 'id': 55, 'speed': 53, 'id/lvl': 50,
                    'lifehunt': 45, 'manahunt': 45, '+11': 55
                },
                'D': {
                    'rate': 50, 'id': 45, 'speed': 43, 'id/lvl': 40,
                    'lifehunt': 35, 'manahunt': 35, '+11': 45
                },
                'E': {
                    'rate': 40, 'id': 35, 'speed': 33, 'id/lvl': 30,
                    'lifehunt': 25, 'manahunt': 25, '+11': 35
                },
                'F': {
                    'rate': 30, 'id': 25, 'speed': 23, 'id/lvl': 20,
                    'lifehunt': 15, 'manahunt': 15, '+11': 25
                }
            },
            'wings': {
                '2nd': {
                    'ignore': 50, 'speed': 40, 'stamina': 35,
                    'hp': 35, 'mana': 35, '+11': 40
                },
                '3rd': {
                    'ignore': 80, 'full-reflect': 70, 'hp-replen': 50,
                    'mana-replen': 50, '+11': 70
                }
            },
            'misc': {
                //'ring': { /* as class C, set-item * /
                    'rate': 55, 'dd': 50, 'ref': 48, 'zen': 45,
                    'maxhp': 40, 'maxmana': 40, '+11': 50
                },
                //'pendant': { /* as class C, weapon * /
                    'rate': 60, 'id': 55, 'speed': 53, 'id/lvl': 50,
                    'lifehunt': 45, 'manahunt': 45, '+11': 55
                }
            }
        },
        'bol': {
            'set-item': {
                'B': {'luck': 20},
                'C': {'luck': 15},
                'D': {'luck': 10},
                'E': {'luck': 5},
                'F': {'luck': 0}
            },
            'weapon': {
                'B': {'luck': 20},
                'C': {'luck': 15},
                'D': {'luck': 10},
                'E': {'luck': 5},
                'F': {'luck': 3}
            },
        },
        */
        'credit': {
            'set-item': {
                'A': {
                    'rate': 18, 'dd': 16, 'ref': 16, 'zen': 15,
                    'maxhp': 13, 'maxmana': 13,
                    'excel': 18, 'create_nonexc': 3,
                    '+11': 7, '+13': 18,
                    'luck': 9, 'joh_opt': 9
                },
                'B': {
                    'rate': 12, 'dd': 11, 'ref': 11, 'zen': 10,
                    'maxhp': 9, 'maxmana': 9,
                    'excel': 12,
                    '+11': 5, '+13': 10,
                    'luck': 6, 'joh_opt': 6
                },
                'C': {
                    'rate': 8, 'dd': 7, 'ref': 7, 'zen': 6,
                    'maxhp': 5, 'maxmana': 5,
                    'excel': 8,
                    '+11': 4, '+13': 7,
                    'luck': 4, 'joh_opt': 4
                },
                'D': {
                    'rate': 5, 'dd': 4, 'ref': 4, 'zen': 4,
                    'maxhp': 3, 'maxmana': 3,
                    'excel': 5,
                    '+11': 2, '+13': 4,
                    'luck': 2, 'joh_opt': 2
                }
            },
            'weapon': {
                'A': {
                    'rate': 20, 'id': 18, 'speed': 18, 'id/lvl': 17,
                    'lifehunt': 15, 'manahunt': 15,
                    'excel': 20, 'create_nonexc': 5,
                    '+11': 8, '+13': 17, 'luck': 10, 'skill': 10,
                    'jog_opt': 15, 'joh_opt': 10
                },
                'B': {
                    'rate': 13, 'id': 12, 'speed': 12, 'id/lvl': 11,
                    'lifehunt': 10, 'manahunt': 10,
                    'excel': 13,
                    '+11': 5, '+13': 11, 'luck': 6, 'skill': 6,
                    'joh_opt': 7
                },
                'C': {
                    'rate': 9, 'id': 8, 'speed': 8, 'id/lvl': 8,
                    'lifehunt': 7, 'manahunt': 7,
                    'excel': 9,
                    '+11': 4, '+13': 8, 'luck': 4, 'skill': 4,
                    'joh_opt': 5
                },
                'D': {
                    'rate': 6, 'id': 5, 'speed': 5, 'id/lvl': 5,
                    'lifehunt': 4, 'manahunt': 4,
                    'excel': 6,
                    '+11': 3, '+13': 5, 'luck': 2, 'skill': 2,
                    'joh_opt': 3
                }
            },
            'wings': {
                '1st': {
                    '+11': 2, '+13': 4,
                    'luck': 2, '7life-opt': 2,
                    'creation': 3
                },
                '2nd': {
                    'ignore': 10,
                    'speed': 4, 'stamina': 4, 'hp': 4, 'mana': 4,
                    '+11': 4, '+13': 7,
                    'luck': 4, '7life-opt': 4,
                    'creation': 10
                },
                '3rd': {
                    'ignore': 50,
                    'speed': 15, 'full-reflect': 15,
                    'hp-replen': 15, 'mana-replen': 15,
                    '+11': 15, '+13': 30,
                    'luck': 10, '7life-opt': 10,
                    'creation': 50
                }
            }
            /*
            },
            'misc': {
                'misc': {
                    'fenrir-red': 40, 'fenrir-blue': 60,
                    'fenrir-black': 60, 'fenrir-gold': 120,
                    'nick-change': 20, 'gain-3rd-quest': 20,
                    'guild-transfer': 20
                },
                'ring': { /* as class C, set-item * /
                    'rate': 20, 'dd': 18, 'ref': 17, 'zen': 14,
                    'maxhp': 11, 'maxmana': 11, '+13': 18,
                    'excel': 20
                },
                'pendant': { /* as class C, weapon * /
                    'rate': 24, 'id': 22, 'speed': 21, 'id/lvl': 19,
                    'lifehunt': 15, 'manahunt': 15, '+13': 22,
                    'skill': 15, 'excel': 24
                }
            }*/
        }
    };

    /*
    this.groups['green']['shield'] = this.groups['green']['set-item'];
    this.groups['bol']['shield'] = this.groups['bol']['set-item'];
    */
    this.groups['credit']['shield'] = this.groups['credit']['set-item'];

    this.find_options = function (type, cls) {
        // find available options for given class
        var opts = [];
        for (grp in this.groups) {
            if ( this.groups[grp][type] == undefined
                    || this.groups[grp][type][cls] == undefined ) {
                console.log('- none');
                continue;
            }
            for (opt in this.groups[grp][type][cls]) {
                if (opts.indexOf(opt) == -1) {
                    opts[opts.length] = opt;
                }
            }
        }
        return opts;
    };

    this.find_prices = function (type, cls, opt_name) {
        // return dict with prices for item specified
        var p = {};
        for (grp_id in this.groups) {
            grp = this.groups[grp_id];
            val = 0;
            if (grp[type] != undefined) {
                if (grp[type][cls] != undefined) {
                    if (grp[type][cls][opt_name] != undefined) {
                        val = grp[type][cls][opt_name];
                    }
                }
            }
            p[grp_id] = val;
        }
        return p;
    };

    this.format_prices = function (item_prices) {
        // format item_prices (as returned by find()) into string
        var s = '';
        for (grp in item_prices) {
            s += item_prices[grp] + ' ' + Translate.translate_def(grp);
            s += ', ';
        }
        return s;
    };

    this.Sum = function () {
        for (grp in Prices.groups) {
            this[grp] = 0;
        }
        this.add = function (other_sum) {
            for (grp in Prices.groups) {
                this[grp] += other_sum[grp];
            }
        };
        this.format = function (css_class) {
            if (css_class == undefined) {
                css_class = 'blockSum';
            }
            var res = '<div class="'+css_class+'">';

            for (grp in Prices.groups) {
                res += ('<strong>' +
                        String(this[grp]) +
                        ' ' + Translate.translate_def(grp) +
                        '</strong> ');
                if (grp == 'credit') {
                    res += ('<strong>' +
                            String(this[grp] * Prices.credit_exchange_rate) +
                            ' ' + Prices.credit_exchange_curr +
                            '</strong> ');
                }
            }

            res += '</div>';
            return res;
        };
    };
};

