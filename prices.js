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
                'ring': { /* as class C, set-item */
                    'rate': 55, 'dd': 50, 'ref': 48, 'zen': 45,
                    'maxhp': 40, 'maxmana': 40, '+11': 50
                },
                'pendant': { /* as class C, weapon */
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
        'credit': {
            'set-item': {
                'B': {
                    'rate': 30, 'dd': 28, 'ref': 27, 'zen': 24,
                    'maxhp': 20, 'maxmana': 20, '+13': 28, 'luck': 20,
                    'excel': 30
                },
                'C': {
                    'rate': 20, 'dd': 18, 'ref': 17, 'zen': 14,
                    'maxhp': 11, 'maxmana': 11, '+13': 18, 'luck': 11,
                    'excel': 20
                },
                'D': {
                    'rate': 15, 'dd': 14, 'ref': 13, 'zen': 11,
                    'maxhp': 9, 'maxmana': 9, '+13': 14, 'luck': 9,
                    'excel': 15
                },
                'E': {
                    'rate': 10, 'dd': 9, 'ref': 8, 'zen': 5,
                    'maxhp': 3, 'maxmana': 3, '+13': 9, 'luck': 3,
                    'excel': 10
                },
                'F': {
                    'rate': 5, 'dd': 4, 'ref': 4, 'zen': 3,
                    'maxhp': 2, 'maxmana': 2, '+13': 4, 'luck': 2,
                    'excel': 5
                }
            },
            'weapon': {
                'B': {
                    'rate': 35, 'id': 33, 'speed': 32, 'id/lvl': 30,
                    'lifehunt': 25, 'manahunt': 25, '+13': 33, 'luck': 25,
                    'skill': 25, 'excel': 35
                },
                'C': {
                    'rate': 24, 'id': 22, 'speed': 21, 'id/lvl': 19,
                    'lifehunt': 15, 'manahunt': 15, '+13': 22, 'luck': 15,
                    'skill': 15, 'excel': 24
                },
                'D': {
                    'rate': 18, 'id': 16, 'speed': 15, 'id/lvl': 13,
                    'lifehunt': 10, 'manahunt': 10, '+13': 16, 'luck': 10,
                    'skill': 10, 'excel': 18
                },
                'E': {
                    'rate': 13, 'id': 11, 'speed': 10, 'id/lvl': 8,
                    'lifehunt': 5, 'manahunt': 5, '+13': 11, 'luck': 5,
                    'skill': 5, 'excel': 13
                },
                'F': {
                    'rate': 8, 'id': 7, 'speed': 6, 'id/lvl': 5,
                    'lifehunt': 3, 'manahunt': 3, '+13': 7, 'luck': 3,
                    'skill': 3, 'excel': 8
                }
            },
            'wings': {
                '2nd': {
                    'ignore': 10, 'speed': 8, 'stamina': 7,
                    'hp': 5, 'mana': 5, '+13': 8,
                    'luck': 5, 'creation': 7
                },
                '3rd': {
                    'ignore': 30, 'speed': 20, 'full-reflect': 20,
                    'hp-replen': 15, 'mana-replen': 15, '+13': 30,
                    'luck': 20, 'creation': 25
                }
            },
            'misc': {
                'misc': {
                    'fenrir-red': 40, 'fenrir-blue': 60,
                    'fenrir-black': 60, 'fenrir-gold': 120,
                    'nick-change': 20, 'gain-3rd-quest': 20,
                    'guild-transfer': 20
                },
                'ring': { /* as class C, set-item */
                    'rate': 20, 'dd': 18, 'ref': 17, 'zen': 14,
                    'maxhp': 11, 'maxmana': 11, '+13': 18,
                    'excel': 20
                },
                'pendant': { /* as class C, weapon */
                    'rate': 24, 'id': 22, 'speed': 21, 'id/lvl': 19,
                    'lifehunt': 15, 'manahunt': 15, '+13': 22,
                    'skill': 15, 'excel': 24
                }
            }
        }
    };

    this.groups['green']['shield'] = this.groups['green']['set-item'];
    this.groups['bol']['shield'] = this.groups['bol']['set-item'];
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

