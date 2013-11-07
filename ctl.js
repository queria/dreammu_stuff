// vim: set et sw=4 ts=4 ft=javascript:
$(function () {

    var find_prices = function (type, cls, opt_name) {
        var p = {};
        for (grp_id in prices) {
            grp = prices[grp_id];
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

    var prices2str = function(item_prices) {
        var s = '';
        for (grp in item_prices) {
            s += item_prices[grp] + ' ' + grp;
            s += ', ';
        }
        return s;
    };

    var empty_sum = function () {
        var sum = {};
        for (grp in prices) {
            sum[grp] = 0;
        }
        return sum;
    };

    var add_sum = function (sumA, sumB) {
        for (idx in sumB) {
            sumA[idx] += sumB[idx];
        }
        return sumA;
    };

    var format_sum = function (sum, css_class) {
        if (css_class == undefined) {
            css_class = 'blockSum';
        }
        var res = '<div class="'+css_class+'">';

        for (grp in sum) {
            res += ('<strong>' +
                    String(sum[grp]) +
                    ' ' + grp +
                    '</strong> ');
            if (grp == 'credit') {
                res += ('<strong>' +
                        String(sum[grp] * prices_credit_exchange) +
                        ' ' + prices_credit_exchange_curr +
                        '</strong> ');
            }
        }

        res += '</div>';
        return res;
    };

    var recalc = function () {
        var invoice = '';
        var total_sum = empty_sum();
        $('#order .itemBlock').each(function(){
            var type = $('.itemTypes', this).val();
            var cls = $('.itemNames :selected', this).attr('data-cls');
            var name = $('.itemNames :selected', this).val();
            var cnt = $('.itemCount', this).val();
            var block_sum = empty_sum();
            invoice += '<div class="itemBlock">';
            invoice += ('<strong class="title">' + name + ' ' + type + ' ' + tr('of class') + ' ' + cls + '</strong><br />');
            $('.options input:checked', this).each(function() {
                var opt = $(this).val();
                item_prices = find_prices(type, cls, opt);

                invoice += ' + ' + opt + ':<br />';
                for (grp in item_prices) {
                    if (item_prices[grp]) {
                        opt_price = item_prices[grp] * cnt;
                        invoice = (invoice +
                            ' &nbsp; &nbsp; ' + cnt + '&times;'+item_prices[grp] + ' = ' +
                            opt_price + ' ' + grp + '<br />');
                        block_sum[grp] += Number(opt_price);
                    }
                }
            });
            invoice += format_sum(block_sum);
            add_sum(total_sum, block_sum);
            invoice += '</div>';
        });

        invoice += format_sum(total_sum, 'totalSum');

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
        for (typeName in classes) {
            typeSelect.append('<option>'+typeName+'</option>');
        }
    };

    var fillItemNames = function (type, nameSelect) {

        nameSelect.empty();
        for (cls in classes[type]) {
            if (disabled_classes.indexOf(cls) != -1) { continue; }
            var clsGroup = $('<optgroup label="'+tr('Class')+' '+cls+'"></optgroup>');
            for (itemIdx in classes[type][cls]) {
                item = classes[type][cls][itemIdx];
                clsGroup.append('<option data-cls="'+cls+'">'+item+'</option>');
            };
            sortOptions(clsGroup);
            nameSelect.append(clsGroup);
        }
        $('option', nameSelect).eq(0).prop('selected', true);
        nameSelect.change();
    };

    var pickOptions = function (type, cls) {
        var opts = [];
        for (grp in prices) {
            console.log('Walking over opts for '+type+'/'+cls+' in ' + grp + ' prices');
            if ( prices[grp][type] == undefined || prices[grp][type][cls] == undefined ) {
                console.log('- none');
                continue;
            }
            for (opt in prices[grp][type][cls]) {
                if (opts.indexOf(opt) == -1) {
                    opts[opts.length] = opt;
                }
            }
        }
        return opts;
    };
    var fillOptions = function (type, cls, optionsBlock) {
        optionsBlock.empty();
        console.log('Creating options for '+type+'/'+cls);
        options = pickOptions(type, cls);
        if (options.length < 1) {
            optionsBlock.append('<strong>' + tr('Prices for') + ' ' +
                    type + ' ' + tr('of class') + ' ' +
                    cls + ' ' + tr('not defined yet') + '.</strong>');
            return;
        }
        for (opt in options) {
            optionsBlock.append($('<label><input type="checkbox"' +
                        ' value="'+options[opt]+'">'+options[opt]+'</label>'));
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
                ' <button class="remove">'+tr('remove')+'</button>' +
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
        $('h1').text(tr('Unofficial DreamMU price list'));
        document.title = tr('Unofficial DreamMU price list')
        $('#resetOrder').text(tr('Reset item list'));
        $('#addItemBlock').text(tr('Add new item(s)'));
        $('#resetOrder').click();
        $('#footer .langBlock a').each(function() {
            if($(this).text() == tr_current_lang) {
                $(this).removeAttr('href');
            } else {
                $(this).attr('href', '#'+$(this).text());
            }
        });
    };

    var initLangLinks = function () {
        var lang_block = $('<div class="langBlock"></div>');
        var delim = '';
        for (lang in tr_known_langs) {
            if (tr_known_langs[lang] == 1) {
                var link = $('<a>'+lang+'</a> ');
                link.click(function () {
                    tr_current_lang = $(this).text();
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
