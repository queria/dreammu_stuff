
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

        _en('Unofficial DreamMU price list');
        _cz('Unofficial DreamMU price list', 'Neoficialni cenik DreamMU');

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

    this.translate = function (key, lang) {
        // Returns translation of provided key and language.
        //
        // If lang is not specified uses the currently active one (tr_current_lang).
        if (lang == undefined) {
            lang = this.lang;
        }

        if (this.table[key] == undefined || this.table[key][lang] == undefined) {
            return 'NO_TRANSLATION['+key+'/'+lang+']';
        }
        return this.table[key][lang];
    };

    this.init();
};

