# angular-multi-check 
an angular multi-checkbox directive  
demo [http://codepen.io/ndxbxrme/pen/wKwYBK](http://codepen.io/ndxbxrme/pen/wKwYBK)
### Install
```bash
bower install --save angular-multi-check
```
or if you are using meteor
```bash
meteor add ndxbxrme:angular-multi-check
```
### Usage
add `multi-check` to your angular modules list
```coffeescript
angular.module 'myApp', ['multi-check']
```
use the `multi-check` directive, with a bunch of `multi-check-item`'s inside it
```jade
  multi-check(ng-model='selectedThings')
    multi-check-item(ng-repeat='thing in things', value='{{thing._id}}') {{thing.name}}
```
your controller code should look something like this
```coffeescript
  $scope.things = [
    {_id:'123',name:'Maggie'}
    {_id:'124',name:'Lewis'}
    {_id:125, name:'Barry'}
    {_id:126, name:'Jeff'}
    {_id:127, name:'Brad'}
    {_id:128, name:'Vinny'}
  ]
  $scope.selectedThings = [123, '127']
```
ids can be `strings` or `ints` or a mixture of both (you probably don't want to do that though)  
and you end up with an array of id `strings`  
check out a demo [here](http://codepen.io/ndxbxrme/pen/wKwYBK)
### The CSS is up to you
because I didn't want to impose any of my bad styling on you  
here's an example to get you started
```stylus
.multi-check ng-transclude
  display flex
  flex-flow row wrap
  ng-transclude
    display block
  .check-item
    flex-basis 20%
    position relative
    @media (max-width:1060px)
      flex-basis 33%
    @media (max-width:720px)
      flex-basis 50%
    @media (max-width:520px)
      flex-basis 100%
    label
      padding 1rem
      display flex
      justify-content space-around
      box-shadow inset -2px -2px 20px rgba(0,0,0,0.15)
      transition background 0.16s
    input[type='checkbox']
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      opacity 0
      cursor pointer
    input[type='checkbox']:hover ~ label
      background darken(white, 10%)
    input:checked ~ label
      background slategrey
      span:before
        content '✔'
        position absolute
        left 1rem
    input:checked:hover ~ label
      background darken(slategrey, 10%)
```
### Contributing
if you think you have something cool to add or I've done something crazy, give me a shout
