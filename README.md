# Decision Tree Maker
pass an array of strings and get a clickable decision tree

First, create your element to which Decision Tree Maker will be added:

```
<div id="tree"></div>
```

Include the script after jQuery and optionally Font Awesome:

```
<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<script src="decisionTreeMaker.js"></script>
```

Create your array in a JS file:

```
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
```

Run it!
Argument 1: Array of strings
Argument 2: Id of HTML element

```
tree(a, 'tree');
```

You can use this CSS too

```
body {
    font-size: 24px;
    font-family: sans-serif;
}
a {
    color: purple;
    text-decoration: none;
}
a:hover {
    color: black;
}
ul ul {
    display: none;
}
ul li {
    list-style-type: none;
}
i {
    margin-right: 10px;
}
```
