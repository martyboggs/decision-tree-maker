var arr = [
    {
        'Are you dead?': [
            {
                done: 'you can stay home'
            }
        ]
    },
    {
        'Are you sick?': [
            {
                'Can you get out of bed?': [
                    {
                        done: 'go to work'
                    }
                ]
            },
            {
                'Are you unable to get out of bed?': [
                    {
                        'Is there a hostage situation?': [
                            {
                                done: 'kill bad guy, go to work'
                            }
                        ]
                    },
                    {
                        'Are you vomiting blood?': [
                            {
                                done: 'go to work'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        'Are you well?': [
            {
                'Can you get out of bed?': [
                    {
                        done: 'go to work'
                    }
                ]
            },
            {
                'Are you unable to get out of bed?': [
                    {
                        'Is there a hostage situation?': [
                            {
                                done: 'kill bad guy, go to work'
                            }
                        ]
                    },
                    {
                        'Do you just not feel like it?': [
                            {
                                done: 'go to work'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

// create your format and parser
var a = [
    '=Are you dead?',
    '*You can stay home.',
    '=Are you sick?',
    '==Are you able to get out of bed?',
    '*Go to work.',
    '==Are you unable to get out of bed?',
    '===Is it a hostage situation?',
    '*Kill the bad guy. Go to work.',
    '===Are you vomiting blood?',
    '*Go to work.',
    '=Are you well?',
    '==Are you able to get out of bed?',
    '*Go to work.',
    '==Are you unable to get out of bed?',
    '===Is it a hostage situation?',
    '*Kill the bad guy. Go to work.',
    '===Do you just not feel like it?',
    '*Go to work.',
];

function tree(a, id) { // this works oppositely to other method
    var container = $('#' + id);
    container.append('<ul></ul>');
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

var more = [];
var next = [];
var m;



$(function () {
    tree(a, 'a');

    $('a').on('click', function () {
        if ($(this).next('ul').css('display') === 'none') {
            $(this).next('ul').css('display', 'block');
            $(this).children().first().removeClass('fa-arrow-circle-right').addClass('fa-arrow-circle-down');
        } else {
            $(this).next('ul').css('display', 'none');
            $(this).children().first().addClass('fa-arrow-circle-right').removeClass('fa-arrow-circle-down');
        }
    });

    var from = arr;
    var to = $('#b');
    buildLevel(from, to);
    if (next.length > 0) {
        subBranch();
    }
});


function subBranch() {
    more = next.concat();
    next.length = 0;
    m = 0;
    $('.more').each(function () {
        to = $(this);
        to.removeClass('more');
        from = more[m];
        buildLevel(from, to);
        m += 1;
    });
    if (next.length > 0) {
        subBranch();
    }
}

function buildLevel(from, to) {
    to.append('<ul></ul>');
    to = to.find('ul');
    for (var i = 0; i < from.length; i += 1) {
        for (prop in from[i]) {
            if ('done' in from[i][prop][0]) {
                to.append('<li><a href="#"><i class="fa fa-arrow-circle-right"></i>' + prop + '</a><ul><li>' + from[i][prop][0]['done'] + '</li></ul></li>');
            } else {
                to.append('<li class="more"><a href="#"><i class="fa fa-arrow-circle-right"></i>' + prop + '</a></li>');
                next.push(from[i][prop]);
            }
        }
    }
}
