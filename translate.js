
var Translate = new function () {
    this.table = {};
    this.lang = 'cz';
    this.known_langs = {
        // those which really exists
        'en':1, 'cz':1,
        // mapping of different lang. codes:
        'cs':'cz',
        'en-us':'en', 'en-gb':'en'
    };

    this.init = function () {
        var _en = this.adder('en');
        var _cz = this.adder('cz');

        _en('Unofficial DaeMU price list');
        _cz('Unofficial DaeMU price list', 'Neoficialni cenik DaeMU');

        _en('Reset item list');
        _cz('Reset item list', 'Vymazat seznam predmetu');

        _en('Add new item(s)');
        _cz('Add new item(s)', 'Pridat novy predmet');

        _en('remove');
        _cz('remove', 'odebrat');

        _en('Recalculate');
        _cz('Recalculate', 'Prepocitat');

        _en('Recalculated');
        _cz('Recalculated', 'Prepocitano');

        _en('for');
        _cz('for', 'pro');

        _en('Class');
        _cz('Class', 'Trida');

        _en('Prices for');
        _en('of class');
        _en('not defined yet');
        _cz('Prices for', 'Ceny za');
        _cz('of class', 'tridy');
        _cz('not defined yet', 'jeste nejsou zpracovany');

        _en('Select type of items');
        _cz('Select type of items', 'Vyber typ predmetu');

        _en('Select item name');
        _cz('Select item name', 'Vyber nazev predmetu');

        _en('Specify item count');
        _cz('Specify item count', 'Zadej pocet kusu');

        _en('Select wanted options');
        _cz('Select wanted options', 'Zvol pozadovane opty');

        _en('set-item');
        _cz('set-item', 'setovy predmet');

        _en('weapon');
        _cz('weapon', 'zbran');

        _en('wings');
        _cz('wings', 'kridla');

        _en('misc');
        _cz('misc', 'ostatni');

        _en('shield');
        _cz('shield', 'stit');

        _en('Ancient (Summoner set)');
        _cz('Ancient (Summoner set)', 'Ancient (set na Summonera)');

        _en('credit', 'credits');
        _cz('credit', 'zlatých');

        _en('opts/creation', 'creation');
        _cz('opts/creation', 'vyroba');

        _en('opts/excel', 'excel');
        _cz('opts/excel', 'excelace');

        _en('opts/fenrir-red', 'fenrir-red');
        _cz('opts/fenrir-red', 'fenrir-cerveny');

        _en('opts/fenrir-blue', 'fenrir-blue');
        _cz('opts/fenrir-blue', 'fenrir-modry');

        _en('opts/fenrir-black', 'fenrir-black');
        _cz('opts/fenrir-black', 'fenrir-cerny');

        _en('opts/fenrir-gold', 'fenrir-gold');
        _cz('opts/fenrir-gold', 'fenrir-zlaty');

        _en('opts/nick-change', 'nick-change');
        _cz('opts/nick-change', 'prejmenovani-postavy');

        _en('opts/gain-3rd-quest', 'gain-3rd-quest');
        _cz('opts/gain-3rd-quest', 'provedeni-3rd-questu');

        _en('opts/guild-transfer', 'guild-transfer');
        _cz('opts/guild-transfer', 'predani-guildy');
    };

    this.has = function (lang_code) {
        // Detect if language is supported.
        //
        // return language id (our code) or false
        // if provided language code (like from Accept-Language header)
        // is known by us
        if (this.known_langs[lang_code] == undefined) {
            return false;
        }
        var map = this.known_langs[lang_code];
        if (map == 1) {
            map = lang_code;
        } else {
            map = this.known_langs[map];
        }
        return map;
    };

    this.add = function (lang, key, text) {
        // Add translated text for provided key and language.
        if (text == undefined) {
            text = key; // default translation is the key itself
        }
        if (this.table[key] == undefined) {
            this.table[key] = {};
        }
        this.table[key][lang] = text;
    };

    this.adder = function (lang) {
        // Wrapper to simplify repeated calls to tr_add().
        //
        // tr_add('en', 'k1', 'first key')
        // tr_add('en', 'k2', 'second key')
        // ---- is same as:
        // _en = tr_adder('en')
        // _en('k1', 'first key')
        // _en('k2', 'second key')
        //
        var this_ = this;
        return function (key, text) {
            return this_.add(lang, key, text);
        };
    }

    this.translate = function (key, lang, default_value) {
        // Returns translation of provided key and language.
        //
        // If lang is not specified uses the currently active one (tr_current_lang).
        if (lang == undefined) {
            lang = this.lang;
        }

        if (this.table[key] == undefined || this.table[key][lang] == undefined) {
            if (default_value === true) {
                return key;
            }
            if (default_value != undefined) {
                return default_value;
            }
            return 'NO_TRANSLATION['+key+'/'+lang+']';
        }
        return this.table[key][lang];
    };

    this.translate_def = function (key, default_val) {
        if (default_val == undefined) {
            default_val = key;
        }
        return this.translate(key, undefined, default_val);
    };

    this.init();
};

