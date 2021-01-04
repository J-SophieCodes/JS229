var _ = function(element) {
  var u = {
    first: function() {
      return element[0];
    },

    last: function() {
      return element[element.length - 1];
    },

    without: function(...args) {
      return element.filter(item => !args.includes(item));
    },

    lastIndexOf: function(value) {
      return element.lastIndexOf(value);
    },

    sample: function(num) {
      let copy = element.slice();
      let randomItem = () => {
        let idx = Math.floor(Math.random() * copy.length);
        let item = copy.splice(idx, 1)[0];
        return item;
      };

      if (arguments.length === 0) {
        return randomItem();
      } else {
        return new Array(num).fill().map(randomItem);
      }
    },

    findWhere: function(match) {
      return element.find(obj => {
          return Object.keys(match).every(item => match[item] === obj[item]);
        });
      // return this.where(match)[0]; // slower?
    },

    where: function(match) {
      return element.filter(obj => {
        return Object.keys(match).every(item => match[item] === obj[item]);
      });
    },

    pluck: function(key) {
      return element.filter(obj => _(obj).has(key)).map(obj => obj[key]);
    },

    keys: function() {
      return Object.keys(element);
    },

    values: function() {
      return Object.values(element);
    },

    pick: function(...properties) {
      return properties.reduce((obj, property) => {
        if(this.has(property)) {
          obj[property] = element[property];
        }
        return obj;
      } ,{})
    },

    omit: function(...properties) {
      // return this.keys().reduce((obj, property) => {
      //   if(!properties.includes(property)) {
      //     obj[property] = element[property];
      //   }
      //   return obj;
      // } ,{})
      return this.pick(..._(this.keys()).without(...properties));
    },

    has: function(property) {
      // return this.keys().includes(property);
      return {}.hasOwnProperty.call(element, property);
    },
  };

  utilities = ['isElement', 'isArray', 'isObject', 'isFunction', 'isString', 'isNumber', 'isBoolean'];
  utilities.forEach(utility => {
    u[utility] = function() {
      return _[utility].call(this, element);
    };
  })

  return u;
};

_.range = function(idx1, idx2) {
  if (arguments.length === 1) {
    [idx1, idx2] = [0, idx1];
  }

  return new Array(idx2 - idx1)
    .fill(idx1)
    .map((value, idx) => value + idx);
};

_.extend = function(target, ...sources) {
  Object.assign(target, ...sources);
  return target;
};

_.isArray = function(obj) {
  return Array.isArray(obj);
};

_.isObject = function(obj) {
  return typeof obj === 'object' || this.isFunction(obj);
};

_.isFunction = function(obj) {
  return obj.constructor === Function;
};

_.isString = function(obj) {
  return obj.constructor === String;
};

_.isNumber = function(obj) {
  return obj.constructor === Number;
};

_.isBoolean = function(obj) {
  return obj.constructor === Boolean;
};

_.isElement = function(obj) {
  return obj && obj.nodeType === 1;
};