let offset = require('../lib/offset');

module.exports = function ($templateCache, element, attr) {

  function createPopoverELement() {
    let templateString = $templateCache.get(attr.popoverTemplate);
    let $wrapper = angular.element('<div class="fo-popover"></div>');

    if (attr.popoverId) {
      $wrapper[0].id = attr.popoverId;
    }

    $wrapper.addClass(attr.popoverClass);
    $wrapper.css('width', attr.popoverWidth);

    return angular.element($wrapper).append(templateString);
  }

  function closeAllPopover() {
    angular.element(document.querySelectorAll('.fo-popover')).removeClass('open');
  }

  function placePopover(popoverElement) {
    let besideOption = {
      me: element[0],
      you: popoverElement[0],
      where: 'bottom center',
      offset: '0 0',
    };

    var position = attr.popoverPosition.split(' ').join('_');

    besideOption = angular.extend(besideOption, { offset: offset[position] });

    if (attr.popoverTarget) {
      besideOption = angular.extend(besideOption, {
        me: document.getElementById(attr.popoverTarget),
      });
    }

    besideOption = angular.extend(besideOption, {
      where: attr.popoverPosition,
    });

    if (attr.popoverOffset) {
      var popoverOffset = attr.popoverOffset.split(' ');
      var defaultOffset = offset[position].split(' ');
      var offsetX = parseInt(popoverOffset[0], 10) + parseInt(defaultOffset[0], 10);
      var offsetY = parseInt(popoverOffset[1], 10) + parseInt(defaultOffset[1], 10);
      var newOffset = offsetX + 'px ' + offsetY + 'px';

      besideOption = angular.extend(besideOption, {
        offset: newOffset,
      });
    }

    beside.init(besideOption);
  }

  this.element = createPopoverELement();

  this.isOpened = function () {
    return this.element.hasClass('open');
  }.bind(this);

  this.open = function () {
    closeAllPopover();
    this.element.addClass('open');
    placePopover(this.element);
  }.bind(this);

  this.close = function () {
    this.element.removeClass('open');
  }.bind(this);

};
