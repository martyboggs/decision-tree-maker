function tree(a, id) {
    var container = $('#' + id);
    container.append('<ul class="decision-tree-maker"></ul>');
    var previous = [container.find('ul')];
    var level = 1;
    for (var i = 0; i < a.length; i += 1) {
        var equals = a[i].match(/^(=)+/);
        var asterisk = a[i].match(/^\*/);
        if (equals) {
            var content = a[i].slice(equals[0].length);
            if (equals[0].length === level) { // same level
                previous[level-1].append('<li><a href="#"><i class="fa fa-arrow-circle-right"></i>' + content + '</a></li>');
            } else if (equals[0].length - level === 1) { // next level
                previous[level-1].find('li:last').append('<ul><li><a href="#"><i class="fa fa-arrow-circle-right"></i>' + content + '</a></li></ul>');
                previous[level] = previous[level-1].find('ul:last');//problem
                level += 1;
            } else if (equals[0].length < level) { // back 1 or more levels
                level = equals[0].length;
                previous[level-1].append('<li><a href="#"><i class="fa fa-arrow-circle-right"></i>' + content + '</a></li>');
            } else {
                console.log('you skipped a level');
            }
        } else if (asterisk) {
            var content = a[i].slice(asterisk[0].length);
            previous[level-1].find('li:last').append('<ul><li>' + content + '</li></ul>');
        } else {
            console.log('parse error, each line must have = or * at the beginning');
        }
    }
}

$(function () {
    $('.decision-tree-maker a').on('click', function () {
        if ($(this).next('ul').css('display') === 'none') {
            $(this).next('ul').css('display', 'block');
            $(this).children().first().removeClass('fa-arrow-circle-right').addClass('fa-arrow-circle-down');
        } else {
            $(this).next('ul').css('display', 'none');
            $(this).children().first().addClass('fa-arrow-circle-right').removeClass('fa-arrow-circle-down');
        }
    });
});
