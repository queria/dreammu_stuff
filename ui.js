// vim: set et sw=4 ts=4 ft=javascript:
$(function () {

    var _ = function (key, lang, ign) {
        return Translate.translate(key, lang, ign);
    };

    var __ = function (key, default_val) {
        return Translate.translate_def(key, default_val);
    };

    var recalc = function () {
        var invoice = '';
        var total_sum = new Prices.Sum();
        $('#order .itemBlock').each(function(){
            var type = $('.itemTypes', this).val();
            var cls = $('.itemNames :selected', this).attr('data-cls');
            var name = $('.itemNames :selected', this).val();
            var cnt = $('.itemCount', this).val();
            var block_sum = new Prices.Sum();
            invoice += '<div class="itemBlock">';
            invoice += ('<strong class="title">' + __(name) + ' - ' + _(type) + ' ' + _('of class') + ' ' + __(cls) + '</strong><br />');
            $('.options input:checked', this).each(function() {
                var opt = $(this).val();
                item_prices = Prices.find_prices(type, cls, opt);

                invoice += ' <span class="optMark">+</span> ' + __('opts/'+opt, opt) + ':<br />';
                for (grp in item_prices) {
                    if (item_prices[grp]) {
                        opt_price = item_prices[grp] * cnt;
                        invoice = (invoice +
                            '<span class="optLine"> &nbsp; &nbsp; ' + cnt + '&times;'+item_prices[grp] + ' = ' +
                            opt_price + ' ' + __(grp) + '</span><br />');
                        block_sum[grp] += Number(opt_price);
                    }
                }
            });
            total_sum.add(block_sum);
            invoice += block_sum.format();
            invoice += '</div>';
        });

        invoice += total_sum.format('totalSum');

        $('#invoice .results').html(invoice);
    };

    var InnerValueSort = function (a, b) {
        return (a.innerHTML > b.innerHTML) ? 1 : -1;
    };

    var sortOptions = function (select) {
        var items = $('option', select).detach();
        items = items.sort(InnerValueSort);
        select.append(items);
    };

    var fillItemTypes = function (typeSelect) {
        for (typeName in ItemClasses.types) {
            typeSelect.append('<option value="'+typeName+'">'+_(typeName)+'</option>');
        }
    };

    var fillItemNames = function (type, nameSelect) {

        nameSelect.empty();
        for (cls in ItemClasses.types[type]) {
            if (ItemClasses.disabled.indexOf(cls) != -1) { continue; }
            var clsGroup = $('<optgroup label="'+_('Class')+' '+__(cls)+'"></optgroup>');
            for (itemIdx in ItemClasses.types[type][cls]) {
                item = ItemClasses.types[type][cls][itemIdx];
                clsGroup.append('<option data-cls="'+cls+'">'+__(item)+'</option>');
            };
            sortOptions(clsGroup);
            nameSelect.append(clsGroup);
        }
        $('option', nameSelect).eq(0).prop('selected', true);
        nameSelect.change();
    };

    var fillOptions = function (type, cls, optionsBlock) {
        optionsBlock.empty();
        console.log('Creating options for '+type+'/'+cls);
        options = Prices.find_options(type, cls);
        if (options.length < 1) {
            optionsBlock.append('<strong>' + _('Prices for') + ' ' +
                    __(type) + ' ' + _('of class') + ' ' +
                    __(cls) + ' ' + _('not defined yet') + '.</strong>');
            return;
        }
        for (opt in options) {
            optionsBlock.append($('<label><input type="checkbox"' +
                        ' value="'+options[opt]+'">' +
                        __('opts/'+options[opt], options[opt]) +
                        '</label>'));
        }
        $('input', optionsBlock).change(function() {
            if ($(this).prop('checked')) {
                $(this).parent().addClass('checked');
            } else {
                $(this).parent().removeClass('checked');
            }
            recalc();
        });
        recalc();
    };

    var addItemBlock = function () {
        var blockNum = $('.itemBlock', $('#order')).length;
        block = $('<div id="itemBlock_' + blockNum + '" class="itemBlock"></div>');
        block.append('<div>' +
                ' <input type="text" class="itemCount" value="1" size="3">' +
                ' &times; <select class="itemTypes"></select>' +
                ' <select class="itemNames"></select>' +
                ' <button class="remove">'+_('remove')+'</button>' +
                '</div>' +
                '<div class="options"></div>'
                );
        var itemTypes = $('.itemTypes', block);
        var itemNames = $('.itemNames', block);
        var options = $('.options', block);

        fillItemTypes(itemTypes);

        itemTypes.change(function() {
            fillItemNames(itemTypes.val(), itemNames);
        });
        itemNames.change(function() {
            fillOptions(
                itemTypes.val(),
                $(':selected', itemNames).attr('data-cls'),
                options);
        });

        $('.itemCount', block).change(recalc);
        $('.remove', block).click(function () {
            removeItemBlock(blockNum);
        });

        itemTypes.change();
        $('#order').append(block);
        recalc();
    };
    var removeItemBlock = function (blockNum) {
        if ($('.itemBlock', $('#order')).length < 2) {
            removeAllItemBlocks();
        } else {
            $('#itemBlock_' + blockNum).remove();
            recalc();
        }
    };
    var removeAllItemBlocks = function () {
        $('.itemBlock', $('#order')).remove();
        addItemBlock();
    };

    var reinitUI = function () {
        $('h1').text(_('Unofficial DaeMU price list'));
        document.title = _('Unofficial DaeMU price list')
        $('#resetOrder').text(_('Reset item list'));
        $('#addItemBlock').text(_('Add new item(s)'));
        $('#resetOrder').click();
        $('#footer .langBlock a').each(function() {
            if($(this).text() == Translate.lang) {
                $(this).removeAttr('href');
            } else {
                $(this).attr('href', '#'+$(this).text());
            }
        });
    };

    var initLangLinks = function () {
        var lang_block = $('<div class="langBlock"></div>');
        var delim = '';
        for (lang in Translate.known_langs) {
            if (Translate.known_langs[lang] == 1) {
                var link = $('<a>'+lang+'</a> ');
                link.click(function () {
                    Translate.lang = $(this).text();
                    reinitUI();
                    return false;
                });
                lang_block.append(delim);
                delim = ' | ';
                lang_block.append(link);
            }
        }
        $('#footer').append(lang_block);
    };

    $('#resetOrder').click(function() { removeAllItemBlocks(); });
    $('#addItemBlock').click(addItemBlock);

    initLangLinks();
    reinitUI();
});
