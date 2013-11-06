// vim: set et sw=4 ts=4 ft=javascript:
$(function () {
    var recalc = function () {
        var invoice = '';
        invoice += 'Recalculated ... <br />';
        $('#order .itemBlock').each(function(){
            var type = $('.itemTypes', this).val();
            var cls = $('.itemNames :selected', this).attr('data-cls');
            var cnt = $('.itemCount', this).val();
            $('.options input:checked').each(function() {
                invoice += cnt + ' &times; ' + $(this).val() + ' for class' + cls + ' ' + type;
                invoice += '<br />';
            });
        });
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

    //var collectOptions = function (itemType,) {
    //    var options = [];
    //    var first_
    //    for (opt in prices_green[itemType]
    //};
    //
    //
    var fillItemTypes = function (typeSelect) {
        for (typeName in classes) {
            typeSelect.append('<option>'+typeName+'</option>');
        }
    };

    var fillItemNames = function (type, nameSelect) {

        nameSelect.empty();
        for (cls in classes[type]) {
            var clsGroup = $('<optgroup label="Class '+cls+'"></optgroup>');
            for (itemIdx in classes[type][cls]) {
                item = classes[type][cls][itemIdx];
                clsGroup.append('<option data-cls="'+cls+'">'+item+'</option>');
            };
            sortOptions(clsGroup);
            nameSelect.append(clsGroup);
        }
        //sortOptions(nameSelect);
        $('option', nameSelect).eq(0).prop('selected', true);
        nameSelect.change();
    };

    var pickOptions = function (type, cls) {
        var opts = [];
        for (grp in prices) {
            console.log('Walking over opts for '+cls+'/'+type);
            if ( prices[grp][type] == undefined || prices[grp][type][cls] == undefined ) {
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
        if (prices_green[type] == undefined || prices_green[type][cls] == undefined) {
            optionsBlock.append('<strong>Prices for '+type+' of class '+cls+' not defined yet.</strong>');
            return;
        }
        options = pickOptions(type, cls);
        for (opt in options) {
            optionsBlock.append($('<label><input type="checkbox"' +
                        ' value="'+options[opt]+'">'+options[opt]+'</label><br />'));
        }
        $('input', optionsBlock).change(recalc);
        recalc();
    };

    var addItemBlock = function () {
        block = $('<div id="itemBlock_' + $('.itemBlock').length + '" class="itemBlock"></div>');
        block.append('<div>Select type of items: <select class="itemTypes"></select></div>' +
            '<div>Select item name: <select class="itemNames"></select></div>' +
            '<div>Specify item count: <input type="text" class="itemCount" value="1"></div>' +
            '<div>Select wanted options: <div class="options"></div></div>'
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

        //itemNames.change(function() {
        //});
        $('.itemCount', block).change(recalc);

        itemTypes.change();
        $('#order').append(block);
    };
    var removeItemBlock = function (blockNum) {
        $('#itemBlock_' + blockNum).remove();
    };
    var removeAllItemBlocks = function () {
        $('.itemBlock').remove();
    };

    $('#resetOrder').click(function() { removeAllItemBlocks(); addItemBlock(); });
    $('#addItemBlock').click(addItemBlock);
    $('#recalculate').click(recalc);

    $('#resetOrder').click();
});
