"use strict";
/**
 * @author liuyuan
 * @date 2022-09-20 17:41
 * @since 1.0.0
 */
exports.__esModule = true;
exports.Promise = void 0;
var PromiseEnum;
(function (PromiseEnum) {
    PromiseEnum["Pending"] = "pending";
    PromiseEnum["Fulfilled"] = "fulfilled";
    PromiseEnum["Reject"] = "rejected";
})(PromiseEnum || (PromiseEnum = {}));
function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        throw TypeError('Chaining cycle detected for promise');
    }
    // 如果是Promise实例直接调用then方法，免去了后面判断thenable、取then方法的操作
    if (x instanceof Promise) {
        x = x;
        return x.then(resolve, reject);
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        var then = void 0, called_1;
        try {
            then = x.then;
        }
        catch (e) {
            // 一定要写return，如果访问then报错就不走后面判断then的逻辑了
            return reject(e);
        }
        if (typeof then === 'function') {
            try {
                then.call(x, function (y) {
                    if (!called_1) {
                        called_1 = true;
                        resolvePromise(promise, y, resolve, reject);
                    }
                }, function (r) {
                    if (!called_1) {
                        called_1 = true;
                        reject(r);
                    }
                });
            }
            catch (e) {
                if (!called_1) {
                    reject(e);
                }
            }
        }
        else {
            resolve(x);
        }
    }
    else {
        resolve(x);
    }
}
function Promise(executor) {
    var self = this;
    self.status = PromiseEnum.Pending;
    self.value = void 0;
    self.reason = void 0;
    self.resolvedCallbacks = [];
    self.rejectedCallbacks = [];
    function resolve(value) {
        // 调用resolvePromise处理value为thenable的情况
        resolvePromise(self, value, function (v) {
            if (self.status === PromiseEnum.Pending) {
                self.status = PromiseEnum.Fulfilled;
                self.value = v;
                for (var i = 0; i < self.resolvedCallbacks.length; i++) {
                    self.resolvedCallbacks[i]();
                }
            }
        }, reject);
    }
    function reject(reason) {
        if (self.status === PromiseEnum.Pending) {
            self.status = PromiseEnum.Reject;
            self.reason = reason;
            for (var i = 0; i < self.rejectedCallbacks.length; i++) {
                self.rejectedCallbacks[i]();
            }
        }
    }
    try {
        executor(resolve, reject);
    }
    catch (e) {
        reject(e);
    }
}
exports.Promise = Promise;
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled =
        typeof onFulfilled === 'function'
            ? onFulfilled
            : function (value) {
                return value;
            };
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : function (reason) {
                throw reason;
            };
    var self = this;
    var promise2 = new Promise(function (resolve, reject) {
        function handleOnFulfilled() {
            setTimeout(function () {
                try {
                    var x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 0);
        }
        function handleOnRejected() {
            setTimeout(function () {
                try {
                    var x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (self.status === PromiseEnum.Fulfilled) {
            handleOnFulfilled();
        }
        if (self.status === PromiseEnum.Reject) {
            handleOnRejected();
        }
        if (self.status === PromiseEnum.Pending) {
            self.resolvedCallbacks.push(handleOnFulfilled);
            self.rejectedCallbacks.push(handleOnRejected);
        }
    });
    return promise2;
};
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled =
        typeof onFulfilled === 'function'
            ? onFulfilled
            : function (value) {
                return value;
            };
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : function (reason) {
                throw reason;
            };
    var self = this;
    var promise2 = new Promise(function (resolve, reject) {
        function handleOnFulfilled() {
            setTimeout(function () {
                try {
                    var x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 0);
            // asap(function () {
            //   try {
            //     let x = onFulfilled(self.value)
            //     resolvePromise(promise2, x, resolve, reject)
            //   } catch (e) {
            //     reject(e)
            //   }
            // })
        }
        function handleOnRejected() {
            setTimeout(function () {
                try {
                    var x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 0);
            // asap(function () {
            //   try {
            //     let x = onRejected(self.reason)
            //     resolvePromise(promise2, x, resolve, reject)
            //   } catch (e) {
            //     reject(e)
            //   }
            // })
        }
        if (self.status === PromiseEnum.Fulfilled) {
            handleOnFulfilled();
        }
        if (self.status === PromiseEnum.Reject) {
            handleOnRejected();
        }
        if (self.status === PromiseEnum.Pending) {
            self.resolvedCallbacks.push(handleOnFulfilled);
            self.rejectedCallbacks.push(handleOnRejected);
        }
    });
    return promise2;
};
Promise.deferred = Promise.defer = function () {
    var dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = Promise;
