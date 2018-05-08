'use strict';

if (typeof Promise === 'undefined') {
  // 拒绝跟踪阻止了一个常见的问题
  // 不一致的状态由于错误，但它被承诺所吞噬，
  // 而且用户也不知道是什么导致了反应不稳定的未来行为。
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill 进行API调用。
require('whatwg-fetch');

// Object.assign() 通常与react一起使用
// 它将使用本机实现，如果它存在，并且没有bug。
Object.assign = require('object-assign');

// 在测试中，polyfill requestAnimationFrame因为jsdom还没有提供它。
// 我们不会在浏览器中填充它——这是用户的责任。
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}
