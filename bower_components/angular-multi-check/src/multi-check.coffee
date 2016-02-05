angular.module 'multi-check', []
.directive 'multiCheck', ->
  restrict: 'EA'
  require: 'ngModel'
  transclude: true
  replace: true
  scope: 
    ngModel: '='
  template: '<div class="multi-check"><ng-transclude></ng-transclude></div>'
  link: (scope, elem, attrs, ngModel) ->
    scope.$watch 'ngModel', (val) ->
      if not val
        val = []
      if not angular.isArray val
        val = [val + '']
      scope.model = val
      ngModel.$setPristine()
      return
    , true
    scope.updateModel = (id, value) ->
      if not value
        if scope.model.indexOf(id) isnt -1
          scope.model.splice scope.model.indexOf(id), 1
        else
          scope.model.splice scope.model.indexOf(parseInt(id)), 1
      else
        scope.model.push id
      ngModel.$setViewValue(scope.model)
      ngModel.$setDirty()
      return
.directive 'multiCheckItem', ->
  restrict: 'EA'
  transclude: true
  replace: true
  template: '<div class="check-item"><input type="checkbox" id="{{id}}" ng-model="value" ng-change="change()" ><label for="{{id}}"><ng-transclude></ng-transclude></label></div>'
  link: (scope, elem, attrs) ->
    scope.id = 'ndxcbi' + attrs.value
    scope.$watch ->
      scope.$parent.$parent.model
    , (n) ->
      if n
        scope.value = n.indexOf(attrs.value) isnt -1 or n.indexOf(parseInt(attrs.value)) isnt -1
    , true
    scope.change = ->
      scope.$parent.$parent.updateModel attrs.value, scope.value