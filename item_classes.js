// vim: set et sw=4 ts=4 ft=javascript:

var ItemClasses = new function () {
    this.disabled = ['A'];

    this.types = {
        'set-item': {
            'A': ['Titan', 'Brave', 'Faith', 'Seraphim', 'Hades', 'Phantom',
            'Destroy', 'Royal', 'Queen'],
            'B': ['Aura', 'Ashcrow', 'Lilium', 'Aura', 'Dragon Knight', 'Venom Mist',
            'Sylphid Ray', 'Iris', 'Volcano', 'Valiant', 'Sunlight',
            'Eclipse', 'Glorious'],
            'C': ['Dark Phoenix', 'Great Dragon', 'Dark Soul', 'Red Spirit',
            'Dark Master', 'Thunder Hawk', 'Hurricane', 'Black Rose'],
            'D': ['Black Dragon', 'Grand Soul', 'Light Plate', 'Dark Steel',
            'Adamantine', 'Storm Crow', 'Divine', 'Ancient (Summoner set)'],
            'E': ['Brass', 'Scale', 'Bone', 'Sphinx', 'Spirit', 'Silk', 'Legendary',
            'Guardian', 'Dragon', 'Plate', 'Red Wing', 'Wind'],
            'F': ['Bronze', 'Leather', 'Vine', 'Pad', 'Violet wind']
        },
        'weapon': {
            'A': ['Sword Breaker', 'Flame Sword', 'Imperial Sword', 'Imperial Staff',
            'Deadly Staff', 'Merlin Staff', 'Chroma ticks Staff', 'Raven Staff',
            'Frost Mace', 'Dark Stinger Bow', 'Air Lyn Bow', 'Absolute Scepter',
            'Beuroba Spear', 'Stryker Scepter'],

            'B': ['Bone Blade', 'Daybreaker', 'Valiant Sword', 'Explosion Blade',
            'Albatross Bow', 'Sylph Wind Bow', 'Platina Wing Staff', 'Viper Staff',
            'Shining Scepter', 'Soley Scepter', 'Lilium Staff', 'Aura Staff'],

            'C': ['Dragon Spear', 'Sword of Archangel', 'Knight Blade', 'Rune Blade',
            'Black Reign Blade', 'Crossbow of Archangel', 'Great Reign Crossbow',
            'Viper Bow', 'Saint Crossbow', 'Staff of Archangel', 'Kundun Staff',
            'Scepter of Archangel', 'Great Lord Scepter'],

            'D': ['Elemental Mace', 'Chaos Dragon Axe', 'Great Scythe',
            'Bill of Balrog', 'Sword of Destruction', 'Thunder Blade',
            'Book of Ghost Phantom', 'Book of Neil', 'Book of Sahamut',
            'Aqua Gold Crossbow', 'Chaos Nature Bow', 'Celestial Bow',
            'Grand Soul Staff', 'Staff of Destruction', 'Chaos Lighting Staff',
            'Great Scepter', 'Lord Scepter', 'Black Rose Staff'],

            'E': ['Nikea Axe', 'Larkan Axe', 'Crescent Axe', 'Morning Star',
            'Crystal Morning Star', 'Crystal Sword', 'Berdysh', 'Great Hummer',
            'Sword of Salamander', 'Double Poleage', 'Serpent Sword',
            'Lighting Sword', 'Silver Bow', 'Light Crossbow', 'Golden Crossbow',
            'Battle Bow', 'Tiger Bow', 'Blue Wing Crossbow', 'Legendary Staff',
            'Resurrection Staff', 'Gorgon Staff', 'Battle Scepter',
            'Lighting spear', 'Master Scepter', 'Ancient Staff', 'Double Blade'],

            'F': ['Small Axe', 'Hand Axe', 'Double Axe', 'Tomahawk', 'Mace',
            'Flail', 'Elven Axe', 'Battle Axe', 'Short Sword', 'Assassin Sword',
            'Katana', 'Kriss', 'Rapier', 'Gladius', 'Blade', 'Falchion',
            'Great Trident', 'Halberd', 'Spear', 'Dragon Lance', 'Bow', 'Short Bow',
            'Elven Bow', 'Arquebus', 'Crossbow', 'Serpent Crossbow', 'Skull Staff',
            'Serpent Sfaff', 'Angelic Staff', 'Thunder Staff', 'Mistery Staff',
            'Violent Wind Staff' ]
        },
        'wings': {
            '2nd': ['2nd'],
            '3rd': ['3rd'],
        },
        'misc': {
            'misc': ['misc'],
        },

        'shield': {
            'A': ['Crimson Glory', 'Frost Barrier', 'Salamander', 'Guardian'],
            'C': ['Dragon Slayer', 'Dragon', 'Grand Soul', 'Bronze', 'Elemental'],
            'D': ['Spiked', 'Large Round', 'Legendary', 'Serpent', 'Tower'],
            'E': ['Kite', 'Skull', 'Plate'],
            'F': ['Small', 'Horn', 'Buckler', 'Elven']
        },
    };
};
