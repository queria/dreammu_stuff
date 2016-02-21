// vim: set et sw=4 ts=4 ft=javascript:

var ItemClasses = new function () {
    this.disabled = ['X', 'S'];

    this.types = {
        'set-item': {
            'X': ['Titan', 'Brave', 'Faith', 'Seraphim', 'Hades', 'Phantom',
            'Destroy', 'King', 'Queen'],
            'S': ['Ashcrow', 'Dragon Knight',
            'Eclipse', 'Venom Mist',
            'Iris', 'Sylphid Ray',
            'Valiant', 'Volcano',
            'Sunlight', 'Glorious',
            'Lilium', 'Aura'],
            'A': ['Dark Phoenix', 'Great Dragon', 'Dark Soul', 'Red Spirit',
            'Dark Master', 'Thunder Hawk', 'Hurricane', 'Black Rose'],
            'B': ['Black Dragon', 'Grand Soul', 'Light Plate', 'Dark Steel',
            'Adamantine', 'Storm Crow', 'Divine', 'Ancient (Summoner set)'],
            'C': ['Brass', 'Scale', 'Dragon', 'Plate',
            'Bone', 'Sphinx', 'Legendary',
            'Spirit', 'Silk', 'Wind', 'Guardian',
            'Red Wing'],
            'D': ['Bronze', 'Leather', 'Vine', 'Pad', 'Mistery']
        },
        'weapon': {
            'X': ['Sword Breaker', 'Flame Sword', 'Imperial Sword',
            'Imperial Staff', 'Deadly Staff', 'Frost Mace', 'Dark Stinger Bow',
            'Absolute Scepter', 'Stryker Scepter', 'Beuroba Spear',
            'Ari Lyn Bow', 'Merlin Staff', 'Chroma Tics Staff', 'Raven Stick'],

            'S': ['Bone Blade', 'Daybreaker', 'Valiant Sword',
            'Explosion Blade', 'Albatross Bow', 'Sylph Wind Bow',
            'Platina Wing Staff', 'Viper Staff', 'Shining Scepter',
            'Soley Scepter', 'Lilium Staff', 'Book of Ghost Phantom'],
            
            'A': ['Sword of Archangel', 'Knight Blade', 'Rune Blade',
            'Black Reign Blade', 'Great Lord Scepter',
            'Divine Scepter of Archangel', 'Dragon Spear',
            'Crossbow of Archangel', 'Great Reign Crossbow',
            'Arrow Viper Bow', 'Staff of Archangel', 'Kundun Staff',
            'Aura Staff', 'Book of Sahamutt', 'Book of Neil'],

            'B': ['Sword of Destruction', 'Dark Breaker', 'Thunder Blade',
            'Chaos Dragon Axe', 'Elemental Mace', 'Great Scythe',
            'Bill of Balrog', 'Great Scepter', 'Lord Scepter',
            'Chaos Nature Bow', 'Celestial Bow', 'Saint Crossbow',
            'Bluewing Crossbow', 'Aquagold Crossbow', 'Chaos Lighting Staff',
            'Destruction Staff', 'Grand Soul Staff', 'Black Rose Staff'],

            'C': ['Serpent Sword', 'Salamander Sword', 'Light Saber',
            'Legendary Sword', 'Heliacal Sword', 'Double Blade', 'Lighting Sword',
            'Giant Sword', 'Nikea Axe', 'Larkan Axe', 'Crescent Axe',
            'Great Hammer', 'Crystal Morning Star', 'Crystal Sword',
            'Battle Scepter', 'Master Scepter', 'Light Spear', 'Serpent Spear',
            'Berdysh', 'Tiger Bow', 'Silver Bow', 'Battle Bow', 'Light Crossbow',
            'Serpent Crossbow', 'Legendary Staff', 'Resurrection Staff',
            'Red Wing Staff', 'Ancient Staff'],

            'D': ['Kriss', 'Short Sword', 'Rapier', 'Katana', 'Assassin Sword',
            'Blade', 'Gladius', 'Falchion', 'Small Axe', 'Hand Axe', 'Double Axe',
            'Tomahawk', 'Battle Axe', 'Mace', 'Morning Star', 'Flail', 'Spear',
            'Giant Trident', 'Halberd', 'Dragon Lance', 'Double Poleaxe',
            'Short Bow', 'Bow', 'Elven Bow', 'Elven Axe', 'Crossbow',
            'Golden Crossbow', 'Arquebus',
            'Skull Staff', 'Angelic Staff', 'Serpent Staff', 'Thunder Staff',
            'Gorgon Staff', 'Mistery Staff', 'Violent Wind Staff']
        },
        'wings': {
            '1st': ['Satan', 'Fairy', 'Heaven', 'Mistery'],
            '2nd': ['Dragon', 'Archangel', 'Butterfly', 'Despair', 'Darkness',
            'Cape of Lord'],
            '3rd': ['Storm', 'Illusion', 'Space-Time', 'Hurricane', 'Dimension',
            'Mantle of Lord']
        },

        'shield': {
            'D': ['Round Shield', 'Horn Shield', 'Buckler Shield',
            'Fairy Shield'],
            'C': ['Kite Shield', 'Skull Shield', 'Plate Shield'],
            'B': ['Spiked Shield', 'Large Round Shield', 'Legendary Shield',
            'Serpent Shield', 'Elemental Shield'],
            'A': ['Tower Shield', 'Dragon Slayer Shield', 'Dragon Shield',
            'Grand Soul Shield', 'Bronze Shield'],
            'X': ['Crimson Glory Shield', 'Frost Barrier Shield',
            'Salamander Shield', 'Guardian Shield', 'Cross Shield']
        }

        /*
        },
        'misc': {
            'misc': ['misc'],
            'ring': ['ring'],
            'pendant': ['pendant'],
        },
        'ancient': {
            'X': ['TBD']
        }*/
    };
};
